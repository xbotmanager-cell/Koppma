import {createRequire} from 'module';
import {downloadMediaMessage, normalizeMessageContent, jidNormalizedUser} from 'wolfsocket';
import {getBotName} from '../../lib/botname.js';
import {WolfLogger} from '../../lib/wolfLogger.js';
import _0x217302 from '../../lib/database.js';
import {isButtonModeEnabled} from '../../lib/buttonMode.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {sendNodeXAd} from '../../lib/nodeXAd.js';
const _require = createRequire(import.meta.url);
let giftedBtns;
async function getGiftedBtns() {
  if (giftedBtns) return giftedBtns;
  try {
    giftedBtns = await import('wolfbtns');
  } catch (_0x1ca711) {
    giftedBtns = null;
  }
  return giftedBtns;
}
const CACHE_CLEAN_INTERVAL = 2 * 60 * 60 * 1000, MAX_MESSAGE_CACHE = 200, MAX_CONCURRENT_DOWNLOADS = 3;
let _activeDownloads = 0, antideleteState = {
  enabled: false,
  mode: "private",
  ownerJid: null,
  sock: null,
  messageCache: new Map(),
  mediaCache: new Map(),
  groupCache: new Map(),
  stats: {
    totalMessages: 0,
    deletedDetected: 0,
    retrieved: 0,
    mediaCaptured: 0,
    sentToDm: 0,
    sentToChat: 0,
    cacheCleans: 0,
    totalStorageMB: 0
  },
  settings: {
    autoCleanEnabled: true,
    maxAgeHours: 6,
    maxStorageMB: 50,
    showPhoneNumbers: true,
    ownerOnly: true,
    autoCleanRetrieved: true,
    showGroupNames: true,
    initialized: false
  },
  cleanupInterval: null
};
async function calculateStorageSize() {
  try {
    let _0x103e62 = 0;
    for (const [, _0x2e3b8d] of antideleteState.mediaCache.entries()) {
      _0x103e62 += _0x2e3b8d.size || 0;
    }
    antideleteState.stats.totalStorageMB = Math.round(_0x103e62 / 1024 / 1024);
  } catch (_0x11af15) {
    console.error('${EMOJI.ERROR}\x20Antidelete:\x20Error\x20calculating\x20storage:', _0x11af15.message);
  }
}
async function loadData() {
  try {
    const _0x4cee72 = {
      ...antideleteState.settings
    }, _0x1c4586 = await _0x217302.getConfig('antidelete_settings', _0x4cee72);
    (_0x1c4586 && typeof _0x1c4586 === "object" && (antideleteState.settings = {
      ...antideleteState.settings,
      ..._0x1c4586
    }, typeof _0x1c4586.enabled === "boolean" && (antideleteState.enabled = _0x1c4586.enabled, globalThis._antideleteEnabled = antideleteState.enabled), _0x1c4586.mode && (_0x1c4586.mode === "private" || _0x1c4586.mode === "public") && (antideleteState.mode = _0x1c4586.mode), _0x1c4586.stats && (antideleteState.stats = {
      ...antideleteState.stats,
      ..._0x1c4586.stats
    })), await calculateStorageSize());
  } catch (_0x33fd05) {
    console.error("${EMOJI.ERROR} Antidelete: Error loading data from DB:", _0x33fd05.message);
  }
}
async function saveData() {
  try {
    const _0x4ea4f2 = {
      ...antideleteState.settings,
      enabled: antideleteState.enabled,
      mode: antideleteState.mode,
      stats: antideleteState.stats
    };
    await _0x217302.setConfig("antidelete_settings", _0x4ea4f2);
  } catch (_0x27b29d) {
    console.error("${EMOJI.ERROR} Antidelete: Error saving data to DB:", _0x27b29d.message);
  }
}
function getRealWhatsAppNumber(_0x2fef64) {
  if (!_0x2fef64) return "Unknown";
  try {
    const _0x554c2e = _0x2fef64.split('@')[0];
    let _0x4d0ad0 = _0x554c2e.replace(/[^\d+]/g, '');
    if (_0x4d0ad0.length >= 10 && !_0x4d0ad0.startsWith('+')) {
      if (_0x4d0ad0.length >= 10 && _0x4d0ad0.length <= 15) return '+' + _0x4d0ad0;
    }
    if (_0x4d0ad0.startsWith('+') && _0x4d0ad0.length >= 12) return _0x4d0ad0;
    if (_0x4d0ad0 && (/^\d+$/).test(_0x4d0ad0) && _0x4d0ad0.length >= 10) return '+' + _0x4d0ad0;
    return _0x554c2e || 'Unknown';
  } catch (_0x419c4c) {
    return (console.error("${EMOJI.ERROR} Antidelete: Error extracting real number:", _0x419c4c.message), "Unknown");
  }
}
function getGroupName(_0x3b60fb) {
  if (!_0x3b60fb || !_0x3b60fb.includes("@g.us")) return "Private Chat";
  if (antideleteState.groupCache.has(_0x3b60fb)) {
    const _0x1d05ae = antideleteState.groupCache.get(_0x3b60fb);
    return _0x1d05ae.name || "Group Chat";
  }
  const _0x15cae7 = globalThis.groupMetadataCache;
  if (_0x15cae7) {
    const _0x554f6c = _0x15cae7.get(_0x3b60fb);
    if (_0x554f6c && _0x554f6c.data && _0x554f6c.data.subject) {
      const _0x3b4ed7 = _0x554f6c.data.subject;
      return (antideleteState.groupCache.set(_0x3b60fb, {
        name: _0x3b4ed7,
        subject: _0x554f6c.data.subject,
        id: _0x3b60fb,
        size: _0x554f6c.data.participants?.length || 0,
        cachedAt: Date.now()
      }), _0x3b4ed7);
    }
  }
  return _0x3b60fb.split('@')[0];
}
async function cleanRetrievedMessage(_0x5d44a2) {
  try {
    if (!antideleteState.settings.autoCleanRetrieved) return;
    (antideleteState.messageCache.delete(_0x5d44a2), antideleteState.mediaCache.delete(_0x5d44a2), _0x217302.deleteAntideleteMessage(_0x5d44a2).catch(() => {}));
  } catch (_0x1f80ca) {
    console.error("${EMOJI.ERROR} Antidelete: Error cleaning retrieved message:", _0x1f80ca.message);
  }
}
async function autoCleanCache() {
  try {
    if (!antideleteState.settings.autoCleanEnabled) return;
    const _0x54f035 = Date.now(), _0x2ffc8e = antideleteState.settings.maxAgeHours * 60 * 60 * 1000;
    let _0x2a0f49 = 0, _0x14ae74 = 0;
    for (const [_0x3990c3, _0x140b33] of antideleteState.messageCache.entries()) {
      _0x54f035 - _0x140b33.timestamp > _0x2ffc8e && (antideleteState.messageCache.delete(_0x3990c3), _0x2a0f49++);
    }
    for (const [_0x464318, _0x3331fe] of antideleteState.mediaCache.entries()) {
      _0x54f035 - _0x3331fe.savedAt > _0x2ffc8e && (antideleteState.mediaCache.delete(_0x464318), _0x14ae74++);
    }
    try {
      await _0x217302.cleanOlderThan("antidelete_messages", "timestamp", _0x2ffc8e);
      try {
        if (_0x217302.isAvailable()) {
          const _0x360254 = new Date(Date.now() - _0x2ffc8e).toISOString();
          await _0x217302.removeWhere("media_store", {
            created_at: _0x360254
          });
        }
      } catch {}
    } catch {}
    (await calculateStorageSize(), (_0x2a0f49 > 0 || _0x14ae74 > 0) && (antideleteState.stats.cacheCleans++, await saveData()));
  } catch (_0x3ad57) {
    console.error("${EMOJI.ERROR} Antidelete: Auto-clean error:", _0x3ad57.message);
  }
}
async function forceCleanup() {
  try {
    const _0x545682 = Array.from(antideleteState.mediaCache.entries());
    _0x545682.sort((_0x4296c4, _0x73ffac) => _0x4296c4[1].savedAt - _0x73ffac[1].savedAt);
    let _0x142535 = 0;
    const _0x491a17 = antideleteState.settings.maxStorageMB * 1024 * 1024 * 0.8;
    let _0x47683a = 0;
    for (const [_0x3e0773, _0x17f114] of _0x545682) {
      if (antideleteState.stats.totalStorageMB * 1024 * 1024 - _0x142535 <= _0x491a17) break;
      (antideleteState.mediaCache.delete(_0x3e0773), _0x142535 += _0x17f114.size || 0, _0x47683a++);
    }
    const _0x5486a8 = Array.from(antideleteState.messageCache.entries());
    _0x5486a8.sort((_0x17f19d, _0x4b3af2) => _0x17f19d[1].timestamp - _0x4b3af2[1].timestamp);
    for (let _0x289bd6 = 0; _0x289bd6 < Math.min(10, _0x5486a8.length); _0x289bd6++) {
      antideleteState.messageCache.delete(_0x5486a8[_0x289bd6][0]);
    }
    (await calculateStorageSize(), await saveData(), console.log(_0x4526c9.SUCCESS + '\x20Force\x20cleanup\x20completed.\x20Removed\x20' + _0x47683a + " media entries, freed ~" + Math.round(_0x142535 / 1024 / 1024) + 'MB'));
  } catch (_0x11a491) {
    console.error("${EMOJI.ERROR} Antidelete: Force cleanup error:", _0x11a491.message);
  }
}
function startAutoClean() {
  (antideleteState.cleanupInterval && clearInterval(antideleteState.cleanupInterval), antideleteState.cleanupInterval = setInterval(async () => {
    await autoCleanCache();
  }, CACHE_CLEAN_INTERVAL));
}
function stopAutoClean() {
  antideleteState.cleanupInterval && (clearInterval(antideleteState.cleanupInterval), antideleteState.cleanupInterval = null);
}
function getExtensionFromMime(_0xcbe27f) {
  const _0x59966f = {
    'image/jpeg': ".jpg",
    'image/jpg': ".jpg",
    'image/png': ".png",
    'image/gif': '.gif',
    'image/webp': ".webp",
    'video/mp4': ".mp4",
    'video/3gpp': '.3gp',
    'audio/mpeg': ".mp3",
    'audio/mp4': '.m4a',
    'audio/ogg': ".ogg",
    'audio/aac': ".aac"
  };
  return _0x59966f[_0xcbe27f] || ".bin";
}
const STARTUP_GRACE_MS = 90 * 1000;
async function downloadAndSaveMedia(_0x36af8b, _0x287d23, _0x3689ba, _0x1d195d) {
  const _0x376b69 = globalThis._botConnectionOpenTime || 0;
  if (_0x376b69 > 0 && Date.now() - _0x376b69 < STARTUP_GRACE_MS) return null;
  if (_activeDownloads >= MAX_CONCURRENT_DOWNLOADS) return null;
  _activeDownloads++;
  try {
    const _0x45225d = await downloadMediaMessage(_0x287d23, "buffer", {}, {
      logger: {
        level: "silent"
      },
      reuploadRequest: antideleteState.sock?.updateMediaMessage
    });
    if (!_0x45225d || _0x45225d.length === 0) return null;
    const _0x4fc294 = 3 * 1024 * 1024;
    if (_0x45225d.length > _0x4fc294) return null;
    const _0x4c2e0e = Date.now(), _0x138179 = (_0x45225d.length / 1024 / 1024).toFixed(2);
    antideleteState.mediaCache.set(_0x36af8b, {
      type: _0x3689ba,
      mimetype: _0x1d195d,
      size: _0x45225d.length,
      savedAt: _0x4c2e0e,
      dbPath: "messages/" + _0x36af8b
    });
    if (antideleteState.mediaCache.size > 100) {
      const _0x3c4d24 = antideleteState.mediaCache.keys().next().value;
      antideleteState.mediaCache.delete(_0x3c4d24);
    }
    return (_0x217302.uploadMedia(_0x36af8b, _0x45225d, _0x1d195d, "messages").catch(_0x11ec8e => {
      console.error("${EMOJI.ERROR} Antidelete: DB media upload error:", _0x11ec8e.message);
    }), WolfLogger.antidelete(_0x4526c9.SAVE + " Stored " + _0x138179 + 'MB', _0x3689ba, _0x36af8b), antideleteState.stats.mediaCaptured++, 'db');
  } catch (_0x447e05) {
    return (console.error('${EMOJI.ERROR}\x20Antidelete:\x20Media\x20download\x20error:', _0x447e05.message), null);
  } finally {
    _activeDownloads--;
  }
}
const MAX_ANTIDELETE_AGE_MS = 5 * 60 * 1000;
export async function antideleteStoreMessage(_0x5088a5) {
  try {
    if (!antideleteState.settings.initialized || !antideleteState.enabled || !antideleteState.sock) return;
    const _0x1b350f = _0x5088a5.key;
    if (!_0x1b350f || !_0x1b350f.id || _0x1b350f.fromMe) return;
    const _0x574569 = _0x1b350f.id, _0x16649f = _0x1b350f.remoteJidAlt || _0x1b350f.remoteJid, _0x166f57 = _0x1b350f.participantAlt || _0x1b350f.participant || _0x16649f, _0x53f19e = _0x5088a5.pushName || "Unknown", _0x242b00 = _0x5088a5.messageTimestamp * 1000 || Date.now(), _0x177543 = _0x16649f && !_0x16649f.endsWith("@g.us") && !_0x16649f.endsWith("@newsletter") && _0x16649f !== "status@broadcast";
    if (_0x177543) {
      const _0x47ec44 = globalThis._printAntideleteBox;
      typeof _0x47ec44 === "function" ? _0x47ec44({
        event: "store",
        fields: {
          'Msg\x20ID': _0x574569,
          Chat: _0x16649f,
          Sender: _0x166f57,
          'From\x20Me': _0x1b350f.fromMe
        }
      }) : console.log("[AD-DM-STORE] msgId=" + _0x574569 + '\x20chat=' + _0x16649f + " sender=" + _0x166f57 + " fromMe=" + _0x1b350f.fromMe);
    }
    if (_0x242b00 > 0 && Date.now() - _0x242b00 > MAX_ANTIDELETE_AGE_MS) return;
    if (_0x16649f?.endsWith("@newsletter")) return;
    const _0x127dde = _0x16649f === 'status@broadcast';
    if (_0x127dde) return;
    const _0x876f02 = normalizeMessageContent(_0x5088a5.message);
    let _0x5f3cfb = "text", _0x47fb88 = '', _0x258c2c = false, _0x2f0554 = null, _0x32496a = '';
    if (_0x876f02?.conversation) _0x47fb88 = _0x876f02.conversation; else {
      if (_0x876f02?.extendedTextMessage?.text) _0x47fb88 = _0x876f02.extendedTextMessage.text; else {
        if (_0x876f02?.imageMessage) (_0x5f3cfb = "image", _0x47fb88 = _0x876f02.imageMessage.caption || '', _0x258c2c = true, _0x32496a = _0x876f02.imageMessage.mimetype || "image/jpeg", _0x2f0554 = {
          message: {
            key: _0x5088a5.key,
            message: {
              imageMessage: _0x876f02.imageMessage
            }
          },
          type: 'image',
          mimetype: _0x32496a
        }); else {
          if (_0x876f02?.videoMessage) (_0x5f3cfb = "video", _0x47fb88 = _0x876f02.videoMessage.caption || '', _0x258c2c = true, _0x32496a = _0x876f02.videoMessage.mimetype || "video/mp4", _0x2f0554 = {
            message: {
              key: _0x5088a5.key,
              message: {
                videoMessage: _0x876f02.videoMessage
              }
            },
            type: "video",
            mimetype: _0x32496a
          }); else {
            if (_0x876f02?.audioMessage) (_0x5f3cfb = "audio", _0x258c2c = true, _0x32496a = _0x876f02.audioMessage.mimetype || "audio/mpeg", _0x876f02.audioMessage.ptt && (_0x5f3cfb = "voice"), _0x2f0554 = {
              message: {
                key: _0x5088a5.key,
                message: {
                  audioMessage: _0x876f02.audioMessage
                }
              },
              type: "audio",
              mimetype: _0x32496a
            }); else {
              if (_0x876f02?.documentMessage) (_0x5f3cfb = "document", _0x47fb88 = _0x876f02.documentMessage.fileName || "Document", _0x258c2c = true, _0x32496a = _0x876f02.documentMessage.mimetype || "application/octet-stream", _0x2f0554 = {
                message: {
                  key: _0x5088a5.key,
                  message: {
                    documentMessage: _0x876f02.documentMessage
                  }
                },
                type: "document",
                mimetype: _0x32496a
              }); else _0x876f02?.stickerMessage && (_0x5f3cfb = "sticker", _0x258c2c = true, _0x32496a = _0x876f02.stickerMessage.mimetype || "image/webp", _0x2f0554 = {
                message: {
                  key: _0x5088a5.key,
                  message: {
                    stickerMessage: _0x876f02.stickerMessage
                  }
                },
                type: "sticker",
                mimetype: _0x32496a
              });
            }
          }
        }
      }
    }
    if (!_0x47fb88 && !_0x258c2c) return;
    const _0x53d8cf = getRealWhatsAppNumber(_0x166f57);
    let _0x5dd87a = 'Private\x20Chat';
    if (_0x127dde) _0x5dd87a = 'WhatsApp\x20Status'; else _0x16649f.includes("@g.us") ? _0x5dd87a = getGroupName(_0x16649f) : _0x5dd87a = getRealWhatsAppNumber(_0x16649f);
    let _0x2a3a63 = null;
    if (_0x258c2c && _0x2f0554?.message) try {
      const _0x74df7c = JSON.parse(JSON.stringify(_0x2f0554.message)), _0x8c350f = _0x74df7c?.message;
      if (_0x8c350f) for (const _0x113e82 of Object.keys(_0x8c350f)) {
        if (_0x8c350f[_0x113e82]?.jpegThumbnail) delete _0x8c350f[_0x113e82].jpegThumbnail;
        if (_0x8c350f[_0x113e82]?.thumbnail) delete _0x8c350f[_0x113e82].thumbnail;
      }
      _0x2a3a63 = _0x74df7c;
    } catch {}
    const _0x1a8f42 = {
      id: _0x574569,
      chatJid: _0x16649f,
      chatName: _0x5dd87a,
      senderJid: _0x166f57,
      realNumber: _0x53d8cf,
      pushName: _0x53f19e,
      timestamp: _0x242b00,
      type: _0x5f3cfb,
      text: _0x47fb88 || '',
      hasMedia: _0x258c2c,
      mimetype: _0x32496a,
      isGroup: _0x16649f.includes("@g.us"),
      isStatus: _0x127dde,
      rawMessage: _0x2a3a63
    };
    (antideleteState.messageCache.set(_0x574569, _0x1a8f42), antideleteState.stats.totalMessages++, _0x217302.storeAntideleteMessage(_0x574569, _0x1a8f42).catch(() => {}));
    if (antideleteState.messageCache.size > MAX_MESSAGE_CACHE) {
      const _0x39824d = antideleteState.messageCache.size - MAX_MESSAGE_CACHE, _0x32ac55 = antideleteState.messageCache.keys();
      for (let _0x106215 = 0; _0x106215 < _0x39824d; _0x106215++) {
        const _0x479dba = _0x32ac55.next().value;
        antideleteState.messageCache.delete(_0x479dba);
      }
    }
    return _0x1a8f42;
  } catch (_0x287e20) {
    return (console.error("${EMOJI.ERROR} Antidelete: Error storing message:", _0x287e20.message), null);
  }
}
const recentlyProcessedDeletions = new Map(), publicModeChatCooldowns = new Map(), PUBLIC_MODE_COOLDOWN_MS = 30000, _groupAdminCache = new Map();
export async function antideleteHandleUpdate(_0x3b6f46) {
  try {
    if (!antideleteState.settings.initialized || !antideleteState.enabled || !antideleteState.sock) return;
    const _0x3f5ff1 = _0x3b6f46.key;
    if (!_0x3f5ff1 || !_0x3f5ff1.id) return;
    const _0x4ade96 = _0x3f5ff1.id, _0x5acc90 = _0x3f5ff1.remoteJidAlt || _0x3f5ff1.remoteJid, _0x2be737 = _0x5acc90 && !_0x5acc90.endsWith("@g.us") && !_0x5acc90.endsWith("@newsletter") && _0x5acc90 !== "status@broadcast", _0x123fa4 = (_0x3b6f46.update?.messageStubType ?? _0x3b6f46.messageStubType) ?? "none";
    if (_0x3f5ff1.fromMe) return;
    const _0x2bf3ec = (_0x4a263b, _0x591c7a = {}) => {
      if (!_0x2be737) return;
      const _0x16de24 = globalThis._printAntideleteBox;
      typeof _0x16de24 === "function" ? _0x16de24({
        event: _0x4a263b,
        fields: {
          'Msg\x20ID': _0x4ade96,
          Chat: _0x5acc90,
          ..._0x591c7a
        }
      }) : console.log("[AD-DM-DEL]", _0x4a263b, JSON.stringify(_0x591c7a));
    };
    _0x2bf3ec("enter", {
      Stub: _0x123fa4
    });
    const _0x40ec5d = Date.now();
    if (recentlyProcessedDeletions.has(_0x4ade96)) {
      _0x2bf3ec('skip:\x20already\x20processed');
      return;
    }
    (recentlyProcessedDeletions.set(_0x4ade96, _0x40ec5d), setTimeout(() => recentlyProcessedDeletions.delete(_0x4ade96), 30000));
    const _0x3f4a23 = _0x3f5ff1.remoteJidAlt || _0x3f5ff1.remoteJid;
    if (_0x3f4a23?.endsWith("@newsletter")) {
      _0x2bf3ec("skip: newsletter");
      return;
    }
    const _0x203e1a = _0x3f4a23 === "status@broadcast";
    if (_0x203e1a) {
      _0x2bf3ec("skip: status");
      return;
    }
    const _0x4fc90b = _0x3b6f46.update?.messageStubType === 1 || _0x3b6f46.update?.messageStubType === 2 || _0x3b6f46.messageStubType === 1 || _0x3b6f46.messageStubType === 2;
    if (!_0x4fc90b) {
      _0x2bf3ec("skip: not a delete (no stubType 1/2)");
      return;
    }
    let _0x502dd7 = antideleteState.messageCache.get(_0x4ade96);
    if (!_0x502dd7) {
      _0x502dd7 = await _0x217302.getAntideleteMessage(_0x4ade96);
      if (!_0x502dd7) {
        _0x2bf3ec('skip:\x20no\x20cached\x20message\x20found\x20for\x20this\x20id\x20(was\x20never\x20stored)');
        return;
      }
      _0x2bf3ec("cache miss ${EMOJI.ARROW_RIGHT} loaded from DB");
    } else _0x2bf3ec('cache\x20hit');
    const _0x5282bf = _0x3b6f46.participant || _0x3f5ff1.participant || _0x3f4a23;
    let _0xa77cb6;
    const _0x3d2432 = _0x5282bf.split('@')[0].split(':')[0];
    _0x5282bf.endsWith("@lid") || !(/^\d+$/).test(_0x3d2432) || _0x3d2432.length < 10 ? _0x3d2432 === _0x502dd7.senderJid?.split('@')[0]?.split(':')[0] ? _0xa77cb6 = _0x502dd7.realNumber || getRealWhatsAppNumber(_0x502dd7.senderJid) : _0xa77cb6 = _0x502dd7.realNumber || getRealWhatsAppNumber(_0x502dd7.senderJid) : _0xa77cb6 = getRealWhatsAppNumber(_0x5282bf);
    if (!_0x203e1a) {
      const _0x2fa6ed = antideleteState.ownerJid ? antideleteState.ownerJid.split('@')[0].split(':')[0] : null, _0x37aa1e = _0x502dd7.senderJid ? _0x502dd7.senderJid.split('@')[0].split(':')[0] : null;
      if (_0x2fa6ed && _0x37aa1e === _0x2fa6ed) {
        _0x2bf3ec("skip: senderNumber(" + _0x37aa1e + ") === ownerNumber(" + _0x2fa6ed + ") — looks like owner's own msg");
        return;
      }
    }
    (_0x2bf3ec("processing " + _0x4526c9.ARROW_RIGHT + " mode=" + antideleteState.mode + " sendToOwnerDM"), antideleteState.messageCache.delete(_0x4ade96), antideleteState.mediaCache.delete(_0x4ade96), _0x217302.deleteAntideleteMessage(_0x4ade96).catch(() => {}), antideleteState.stats.deletedDetected++);
    let _0x1a88ed = false;
    if (_0x203e1a || _0x502dd7.isStatus) (_0x1a88ed = await sendToOwnerDM(_0x502dd7, _0xa77cb6), _0x1a88ed && antideleteState.stats.sentToDm++); else {
      if (antideleteState.mode === "private") (_0x1a88ed = await sendToOwnerDM(_0x502dd7, _0xa77cb6), _0x1a88ed && antideleteState.stats.sentToDm++); else {
        if (antideleteState.mode === "public") {
          const _0x29fd9d = publicModeChatCooldowns.get(_0x3f4a23) || 0;
          if (_0x40ec5d - _0x29fd9d < PUBLIC_MODE_COOLDOWN_MS) return;
          publicModeChatCooldowns.set(_0x3f4a23, _0x40ec5d);
          if (publicModeChatCooldowns.size > 200) {
            const _0x2ed6e5 = [...publicModeChatCooldowns.entries()].sort((_0x33aa29, _0x1faa5b) => _0x33aa29[1] - _0x1faa5b[1]).slice(0, 50);
            _0x2ed6e5.forEach(([_0x3c302a]) => publicModeChatCooldowns.delete(_0x3c302a));
          }
          (_0x1a88ed = await sendToChat(_0x502dd7, _0x3f4a23, _0xa77cb6), _0x1a88ed && antideleteState.stats.sentToChat++);
        }
      }
    }
    _0x1a88ed && (antideleteState.stats.retrieved++, await saveData());
  } catch (_0x43cc57) {
    console.error("${EMOJI.ERROR} Antidelete: Error handling deleted message:", _0x43cc57.message);
  }
}
async function retrySend(_0x4d61be, _0x45b6c2 = 5) {
  for (let _0x24d29a = 1; _0x24d29a <= _0x45b6c2; _0x24d29a++) {
    try {
      if (!antideleteState.sock) {
        await new Promise(_0x53f396 => setTimeout(_0x53f396, _0x24d29a * 3000));
        continue;
      }
      return (await _0x4d61be(), true);
    } catch (_0x40a005) {
      const _0x2fadce = (_0x40a005.message || '').toLowerCase(), _0x3a6dda = _0x2fadce.includes("connection closed") || _0x2fadce.includes("connection lost") || _0x2fadce.includes("timed out") || _0x2fadce.includes("not open");
      if (_0x3a6dda && _0x24d29a < _0x45b6c2) {
        await new Promise(_0x127a28 => setTimeout(_0x127a28, _0x24d29a * 3000));
        continue;
      }
      throw _0x40a005;
    }
  }
  return false;
}
async function getMediaBuffer(_0x1d7658) {
  const _0x52ed1d = _0x1d7658.rawMessage;
  if (!_0x52ed1d) return null;
  const _0x43cbb5 = _0x1d7658.type === "voice" ? 'audio' : _0x1d7658.type, _0x168935 = {
    level: "silent",
    trace: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    fatal: () => {},
    child: () => _0x168935
  };
  try {
    const _0x30bf3a = await Promise.race([downloadMediaMessage(_0x52ed1d, "buffer", {}, {
      logger: _0x168935,
      reuploadRequest: antideleteState.sock?.updateMediaMessage
    }), new Promise((_0x2f52b4, _0x19058a) => setTimeout(() => _0x19058a(new Error("dl_timeout")), 20000))]);
    if (_0x30bf3a && _0x30bf3a.length > 0) return {
      buffer: _0x30bf3a,
      mimetype: _0x1d7658.mimetype
    };
  } catch {}
  try {
    const {downloadContentFromMessage: _0x3ab38d} = await import("wolfsocket"), _0x5786db = _0x52ed1d?.message;
    if (!_0x5786db) return null;
    const _0x53f005 = _0x43cbb5 + 'Message', _0x5a1d40 = _0x5786db[_0x53f005];
    if (!_0x5a1d40) return null;
    const _0x3db911 = await Promise.race([_0x3ab38d(_0x5a1d40, _0x43cbb5), new Promise((_0x49e82d, _0x8e228) => setTimeout(() => _0x8e228(new Error("dl_timeout")), 20000))]), _0x5a77ce = [];
    let _0x14ef91 = 0;
    for await (const _0x3141cc of _0x3db911) {
      (_0x5a77ce.push(_0x3141cc), _0x14ef91 += _0x3141cc.length);
      if (_0x14ef91 > 15 * 1024 * 1024) break;
    }
    const _0x704580 = Buffer.concat(_0x5a77ce);
    if (_0x704580.length > 0) return {
      buffer: _0x704580,
      mimetype: _0x1d7658.mimetype
    };
  } catch {}
  return null;
}
async function sendToOwnerDM(_0x514738, _0x3bc18a) {
  try {
    if (!antideleteState.sock || !antideleteState.ownerJid) return (console.error("${EMOJI.ERROR} Antidelete: Socket or owner JID not set"), false);
    const _0x5c4258 = antideleteState.ownerJid, _0x368863 = new Date(_0x514738.timestamp).toLocaleString(), _0x5832aa = _0x514738.realNumber || getRealWhatsAppNumber(_0x514738.senderJid);
    let _0x682506 = _0x514738.chatName || (_0x514738.isGroup ? "Group Chat" : "Private Chat");
    if (_0x514738.isGroup && _0x514738.chatJid?.endsWith('@g.us')) {
      const _0x14abfc = _0x514738.chatJid.split('@')[0];
      if (_0x682506 === _0x14abfc || _0x682506 === "Group Chat") try {
        const _0x233b9c = await antideleteState.sock.groupMetadata(_0x514738.chatJid);
        _0x233b9c?.subject && (_0x682506 = _0x233b9c.subject, antideleteState.groupCache.set(_0x514738.chatJid, {
          name: _0x233b9c.subject,
          subject: _0x233b9c.subject,
          id: _0x514738.chatJid,
          size: _0x233b9c.participants?.length || 0,
          cachedAt: Date.now()
        }));
      } catch {}
    }
    let _0x59a74b;
    _0x514738.isStatus ? (_0x59a74b = '\x0a\x0a' + _0x4526c9.DECORATIVE_STAR + '\x20' + getBotName() + '\x20status\x20antidelete' + _0x4526c9.WOLF + '\x0a', _0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝙿𝚘𝚜𝚝𝚎𝚍 𝙱𝚢 : " + _0x5832aa + '\x20(' + _0x514738.pushName + ')\x0a', _0x3bc18a && _0x3bc18a !== _0x5832aa && (_0x59a74b += _0x4526c9.DECORATIVE_STAR + '\x20𝙳𝚎𝚕𝚎𝚝𝚎𝚍\x20𝙱𝚢\x20:\x20' + _0x3bc18a + '\x0a'), _0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝚃𝚒𝚖𝚎 : " + _0x368863 + '\x0a', _0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝚃𝚢𝚙𝚎 : " + _0x514738.type.toUpperCase() + '\x0a') : (_0x59a74b = '\x0a\x0a' + _0x4526c9.DECORATIVE_STAR + '\x20' + getBotName() + '\x20message\x20antidelete' + _0x4526c9.WOLF + '\x0a', _0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝙵𝚛𝚘𝚖 : " + _0x5832aa + '\x20(' + _0x514738.pushName + ')\x0a', _0x3bc18a && _0x3bc18a !== _0x5832aa && (_0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝙳𝚎𝚕𝚎𝚝𝚎𝚍 𝙱𝚢 : " + _0x3bc18a + '\x0a'), _0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝙲𝚑𝚊𝚝 : " + _0x682506 + '\x0a', _0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝚃𝚒𝚖𝚎 : " + _0x368863 + '\x0a', _0x59a74b += _0x4526c9.DECORATIVE_STAR + " 𝚃𝚢𝚙𝚎 : " + _0x514738.type.toUpperCase() + '\x0a');
    _0x514738.text && (_0x59a74b += _0x514738.isStatus ? '\x0a' + _0x4526c9.DECORATIVE_STAR + " 𝗦𝘁𝗮𝘁𝘂𝘀 𝗧𝗲𝘅𝘁:\n" + _0x514738.text : '\x0a' + _0x4526c9.DECORATIVE_STAR + '\x20𝗠𝗲𝘀𝘀𝗮𝗴𝗲:\x0a' + _0x514738.text);
    let _0x5ae9ed = false;
    if (_0x514738.hasMedia) {
      const _0x14b83d = await getMediaBuffer(_0x514738);
      if (_0x14b83d && _0x14b83d.buffer && _0x14b83d.buffer.length > 0) {
        const _0x11c499 = _0x14b83d.buffer, _0x4151e2 = _0x14b83d.mimetype;
        try {
          const _0x435126 = (_0x11c499.length / 1024 / 1024).toFixed(2);
          WolfLogger.antidelete(_0x4526c9.INBOX + '\x20DM\x20recovered\x20' + _0x435126 + 'MB', _0x514738.type, _0x514738.id);
          if (_0x514738.type === "sticker") await retrySend(async () => {
            const _0x37ae5e = await antideleteState.sock.sendMessage(_0x5c4258, {
              sticker: _0x11c499,
              mimetype: _0x4151e2
            });
            (await sendNodeXAd(antideleteState.sock, _0x5c4258, {
              alertText: _0x59a74b,
              quoted: _0x37ae5e
            }), _0x5ae9ed = true);
          }); else {
            if (_0x514738.type === 'image') (await retrySend(() => antideleteState.sock.sendMessage(_0x5c4258, {
              image: _0x11c499,
              mimetype: _0x4151e2
            })), await sendNodeXAd(antideleteState.sock, _0x5c4258, {
              alertText: _0x59a74b
            }), _0x5ae9ed = true); else {
              if (_0x514738.type === "video") (await retrySend(() => antideleteState.sock.sendMessage(_0x5c4258, {
                video: _0x11c499,
                mimetype: _0x4151e2
              })), await sendNodeXAd(antideleteState.sock, _0x5c4258, {
                alertText: _0x59a74b
              }), _0x5ae9ed = true); else {
                if (_0x514738.type === 'audio' || _0x514738.type === "voice") await retrySend(async () => {
                  (await antideleteState.sock.sendMessage(_0x5c4258, {
                    audio: _0x11c499,
                    mimetype: _0x4151e2,
                    ptt: _0x514738.type === 'voice'
                  }), await sendNodeXAd(antideleteState.sock, _0x5c4258, {
                    alertText: _0x59a74b
                  }), _0x5ae9ed = true);
                }); else _0x514738.type === 'document' ? (await retrySend(() => antideleteState.sock.sendMessage(_0x5c4258, {
                  document: _0x11c499,
                  fileName: _0x514738.text || 'deleted_file',
                  mimetype: _0x4151e2
                })), await sendNodeXAd(antideleteState.sock, _0x5c4258, {
                  alertText: _0x59a74b
                }), _0x5ae9ed = true) : await retrySend(() => antideleteState.sock.sendMessage(_0x5c4258, {
                  text: _0x59a74b + ("\n\n◉ 𝗠𝗲𝗱𝗶𝗮 𝗧𝘆𝗽𝗲: " + _0x514738.type)
                }));
              }
            }
          }
          (antideleteState.mediaCache.delete(_0x514738.id), WolfLogger.antidelete('${EMOJI.TRASH}\x20DM\x20cleanup\x20done', null, _0x514738.id));
        } catch (_0x4238bf) {
          console.error("${EMOJI.ERROR} Antidelete: Media send error:", _0x4238bf.message);
          try {
            await retrySend(() => antideleteState.sock.sendMessage(_0x5c4258, {
              text: _0x59a74b + ('\x0a\x0a' + _0x4526c9.ERROR + " 𝗠𝗲𝗱𝗶𝗮 𝗰𝗼𝘂𝗹𝗱 𝗻𝗼𝘁 𝗯𝗲 𝗿𝗲𝗰𝗼𝘃𝗲𝗿𝗲𝗱")
            }));
          } catch {}
        }
      } else (await retrySend(() => sendNodeXAd(antideleteState.sock, _0x5c4258, {
        alertText: _0x59a74b
      })), _0x5ae9ed = true);
    } else (await retrySend(() => sendNodeXAd(antideleteState.sock, _0x5c4258, {
      alertText: _0x59a74b
    })), _0x5ae9ed = true);
    if (!_0x5ae9ed) await sendNodeXAd(antideleteState.sock, _0x5c4258, {
      alertText: _0x59a74b
    });
    return true;
  } catch (_0x457fb3) {
    return (console.error("${EMOJI.ERROR} Antidelete: Error sending to owner DM:", _0x457fb3.message), false);
  }
}
async function isBotAdminInGroup(_0x12eca6) {
  if (!_0x12eca6?.endsWith('@g.us') || !antideleteState.sock) return false;
  const _0x435ca3 = Date.now(), _0x16ed38 = _groupAdminCache.get(_0x12eca6);
  if (_0x16ed38 && _0x435ca3 - _0x16ed38.ts < 5 * 60 * 1000) return _0x16ed38.isAdmin;
  try {
    const _0x32b12a = await antideleteState.sock.groupMetadata(_0x12eca6), _0xa04793 = antideleteState.sock.user?.id?.split('@')[0]?.split(':')[0], _0x317bcf = !!_0x32b12a?.participants?.some(_0x2977da => {
      const _0x3d5d7c = _0x2977da.id?.split('@')[0]?.split(':')[0];
      return _0x3d5d7c === _0xa04793 && (_0x2977da.admin === 'admin' || _0x2977da.admin === 'superadmin');
    });
    _groupAdminCache.set(_0x12eca6, {
      isAdmin: _0x317bcf,
      ts: _0x435ca3
    });
    if (_groupAdminCache.size > 100) {
      const _0x469062 = _groupAdminCache.keys().next().value;
      _groupAdminCache.delete(_0x469062);
    }
    return _0x317bcf;
  } catch {
    return false;
  }
}
async function sendToChat(_0x545cdf, _0x18fefb, _0x588285) {
  try {
    if (!antideleteState.sock) return false;
    if (_0x18fefb?.endsWith('@g.us')) {
      const _0x6061f3 = await isBotAdminInGroup(_0x18fefb);
      if (!_0x6061f3) return await sendToOwnerDM(_0x545cdf, _0x588285);
    }
    const _0x438aab = new Date(_0x545cdf.timestamp).toLocaleString(), _0x51a0f3 = _0x545cdf.realNumber || getRealWhatsAppNumber(_0x545cdf.senderJid);
    let _0x295887 = '\x0a\x0a' + _0x4526c9.DECORATIVE_STAR + '\x20' + getBotName() + " antidelete" + _0x4526c9.WOLF + '\x0a';
    (_0x295887 += _0x4526c9.DECORATIVE_STAR + " 𝙳𝚎𝚕𝚎𝚝𝚎𝚍 𝙱𝚢 : " + _0x588285 + '\x0a', _0x295887 += _0x4526c9.DECORATIVE_STAR + '\x20𝚂𝚎𝚗𝚝\x20𝚋𝚢\x20:\x20' + _0x51a0f3 + '\x20(' + _0x545cdf.pushName + ')\x0a');
    if (_0x18fefb?.endsWith('@g.us')) {
      let _0x4256fa = getGroupName(_0x18fefb);
      if (_0x4256fa === _0x18fefb.split('@')[0] && antideleteState.sock) try {
        const _0x5ca4a4 = await antideleteState.sock.groupMetadata(_0x18fefb);
        _0x5ca4a4?.subject && (_0x4256fa = _0x5ca4a4.subject, antideleteState.groupCache.set(_0x18fefb, {
          name: _0x5ca4a4.subject,
          subject: _0x5ca4a4.subject,
          id: _0x18fefb,
          size: _0x5ca4a4.participants?.length || 0,
          cachedAt: Date.now()
        }));
      } catch {}
      _0x295887 += _0x4526c9.DECORATIVE_STAR + " 𝙶𝚛𝚘𝚞𝚙 : " + _0x4256fa + '\x0a';
    }
    (_0x295887 += _0x4526c9.DECORATIVE_STAR + " 𝚃𝚒𝚖𝚎 : " + _0x438aab + '\x0a', _0x295887 += _0x4526c9.DECORATIVE_STAR + " 𝚃𝚢𝚙𝚎 : " + _0x545cdf.type.toUpperCase() + '\x0a');
    _0x545cdf.text && (_0x295887 += '\x0a' + _0x4526c9.DECORATIVE_STAR + " 𝕯𝖊𝖑𝖊𝖙𝖊𝖉 𝕸𝖊𝖘𝖘𝖆𝖌𝖊:\n" + _0x545cdf.text);
    if (_0x545cdf.hasMedia) {
      const _0x1f4206 = await getMediaBuffer(_0x545cdf);
      if (_0x1f4206 && _0x1f4206.buffer && _0x1f4206.buffer.length > 0) {
        const _0x2b825a = _0x1f4206.buffer, _0x5e5c96 = _0x1f4206.mimetype;
        try {
          const _0x416631 = (_0x2b825a.length / 1024 / 1024).toFixed(2);
          WolfLogger.antidelete(_0x4526c9.INBOX + " Chat recovered " + _0x416631 + 'MB', _0x545cdf.type, _0x545cdf.id);
          if (_0x545cdf.type === 'sticker') await retrySend(async () => {
            const _0x5558c1 = await antideleteState.sock.sendMessage(_0x18fefb, {
              sticker: _0x2b825a,
              mimetype: _0x5e5c96
            });
            await sendNodeXAd(antideleteState.sock, _0x18fefb, {
              alertText: _0x295887,
              quoted: _0x5558c1
            });
          }); else {
            if (_0x545cdf.type === "image") (_0x295887 = _0x4526c9.WARNING + " Deleted Image\n" + _0x295887, await retrySend(() => antideleteState.sock.sendMessage(_0x18fefb, {
              image: _0x2b825a,
              mimetype: _0x5e5c96
            })), await sendNodeXAd(antideleteState.sock, _0x18fefb, {
              alertText: _0x295887
            })); else {
              if (_0x545cdf.type === "video") (_0x295887 = _0x4526c9.WARNING + " Deleted Video\n" + _0x295887, await retrySend(() => antideleteState.sock.sendMessage(_0x18fefb, {
                video: _0x2b825a,
                mimetype: _0x5e5c96
              })), await sendNodeXAd(antideleteState.sock, _0x18fefb, {
                alertText: _0x295887
              })); else {
                if (_0x545cdf.type === 'audio' || _0x545cdf.type === "voice") await retrySend(async () => {
                  (await antideleteState.sock.sendMessage(_0x18fefb, {
                    audio: _0x2b825a,
                    mimetype: _0x5e5c96,
                    ptt: _0x545cdf.type === "voice"
                  }), await sendNodeXAd(antideleteState.sock, _0x18fefb, {
                    alertText: _0x295887
                  }));
                }); else _0x545cdf.type === "document" ? (_0x295887 = _0x4526c9.WARNING + " Deleted Document\n" + _0x295887, await retrySend(() => antideleteState.sock.sendMessage(_0x18fefb, {
                  document: _0x2b825a,
                  fileName: _0x545cdf.text || 'deleted_file',
                  mimetype: _0x5e5c96
                })), await sendNodeXAd(antideleteState.sock, _0x18fefb, {
                  alertText: _0x295887
                })) : await retrySend(() => antideleteState.sock.sendMessage(_0x18fefb, {
                  text: _0x295887 + ("\n\n◉ 𝗠𝗲𝗱𝗶𝗮 𝗧𝘆𝗽𝗲: " + _0x545cdf.type)
                }));
              }
            }
          }
          (antideleteState.mediaCache.delete(_0x545cdf.id), WolfLogger.antidelete("${EMOJI.TRASH} Chat cleanup done", null, _0x545cdf.id));
        } catch (_0x213f5d) {
          console.error('${EMOJI.ERROR}\x20Antidelete:\x20Media\x20send\x20error:', _0x213f5d.message);
          try {
            await retrySend(() => antideleteState.sock.sendMessage(_0x18fefb, {
              text: _0x295887 + ('\x0a\x0a' + _0x4526c9.ERROR + " 𝗠𝗲𝗱𝗶𝗮 𝗰𝗼𝘂𝗹𝗱 𝗻𝗼𝘁 𝗯𝗲 𝗿𝗲𝗰𝗼𝘃𝗲𝗿𝗲𝗱")
            }));
          } catch {}
        }
      } else (WolfLogger.antidelete("${EMOJI.WARNING} Not recoverable", null, _0x545cdf.id), await retrySend(() => sendNodeXAd(antideleteState.sock, _0x18fefb, {
        alertText: _0x295887
      })));
    } else await retrySend(() => sendNodeXAd(antideleteState.sock, _0x18fefb, {
      alertText: _0x295887
    }));
    return true;
  } catch (_0x32b6de) {
    return (console.error("${EMOJI.ERROR} Antidelete: Error sending to chat:", _0x32b6de.message), false);
  }
}
export async function initAntidelete(_0x469e73) {
  try {
    (await loadData(), antideleteState.sock = _0x469e73, _0x469e73.user?.id && (antideleteState.ownerJid = jidNormalizedUser(_0x469e73.user.id)), antideleteState.settings.autoCleanEnabled && startAutoClean(), antideleteState.settings.initialized = true, await saveData());
  } catch (_0x3a6046) {
    console.error("${EMOJI.ERROR} Antidelete: Initialization error:", _0x3a6046.message);
  }
}
export function updateAntideleteSock(_0x4dae83) {
  _0x4dae83 && (antideleteState.sock = _0x4dae83, _0x4dae83.user?.id && (antideleteState.ownerJid = jidNormalizedUser(_0x4dae83.user.id)));
}
export function getAntideleteMode() {
  return antideleteState.mode;
}
export default {
  name: 'antidelete',
  alias: ["undelete", "antidel", 'ad'],
  description: "Toggle antidelete mode between PRIVATE and PUBLIC - owner only",
  category: 'owner',
  ownerOnly: true,
  async execute(_0x43a0f1, _0x9b38a0, _0x6bc91b, _0x5a0c90, _0x1540a6 = {}) {
    const _0x2b9bfb = _0x9b38a0.key.remoteJid, _0x18745d = _0x6bc91b[0]?.toLowerCase() || "status", {jidManager: _0x5cdace} = _0x1540a6 || ({}), _0x52d3ea = _0x1540a6?.isSudo ? _0x1540a6.isSudo() : false;
    if (!_0x5cdace || !_0x5cdace.isOwner(_0x9b38a0) && !_0x52d3ea) return _0x43a0f1.sendMessage(_0x2b9bfb, {
      text: _0x4526c9.ERROR + " *Owner Only Command!*\n\nOnly the bot owner can use antidelete commands."
    }, {
      quoted: _0x9b38a0
    });
    !antideleteState.sock && (antideleteState.sock = _0x43a0f1);
    !antideleteState.ownerJid && _0x1540a6.OWNER_JID && (antideleteState.ownerJid = _0x1540a6.OWNER_JID);
    switch (_0x18745d) {
      case 'public':
        (antideleteState.enabled = true, globalThis._antideleteEnabled = true, antideleteState.mode = "public", await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
          text: '╭─⌈\x20' + _0x4526c9.SUCCESS + " *ANTIDELETE: PUBLIC* ⌋\n├─⊷ Deleted messages will be resent\n│  └⊷ In the original chat\n╰⊷ " + getFooter(_0x9b38a0.key.participant || _0x9b38a0.key.remoteJid)
        }, {
          quoted: _0x9b38a0
        }));
        break;
      case "private":
      case 'on':
      case 'enable':
        (antideleteState.enabled = true, globalThis._antideleteEnabled = true, antideleteState.mode = "private", await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
          text: "╭─⌈ " + _0x4526c9.SUCCESS + " *ANTIDELETE: PRIVATE* ⌋\n├─⊷ Deleted messages will be\n│  └⊷ Sent to your DM only\n╰⊷ " + getFooter(_0x9b38a0.key.participant || _0x9b38a0.key.remoteJid)
        }, {
          quoted: _0x9b38a0
        }));
        break;
      case "off":
      case "disable":
        (antideleteState.enabled = false, globalThis._antideleteEnabled = false, await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
          text: '╭─⌈\x20' + _0x4526c9.ERROR + '\x20*ANTIDELETE:\x20OFF*\x20⌋\x0a├─⊷\x20Antidelete\x20is\x20now\x20disabled\x0a│\x20\x20└⊷\x20Deleted\x20messages\x20will\x20not\x20be\x20tracked\x0a╰⊷\x20' + getFooter(_0x9b38a0.key.participant || _0x9b38a0.key.remoteJid)
        }, {
          quoted: _0x9b38a0
        }));
        break;
      case "status":
      case "stats":
        const _0x1d84af = antideleteState.enabled ? '${EMOJI.SUCCESS}' : "${EMOJI.ERROR}", _0x57d40b = antideleteState.enabled ? 'ACTIVE' : "OFF", _0x4e4898 = "╭─⌈ " + _0x4526c9.CHART + " *ANTIDELETE* ⌋\n├─⊷ *Mode:* " + (antideleteState.enabled ? antideleteState.mode.toUpperCase() : "OFF") + "\n├─⊷ *" + _0x5a0c90 + 'antidelete\x20on*\x0a│\x20\x20└⊷\x20Enable\x20(private\x20mode)\x0a├─⊷\x20*' + _0x5a0c90 + 'antidelete\x20off*\x0a│\x20\x20└⊷\x20Disable\x20antidelete\x0a├─⊷\x20*' + _0x5a0c90 + 'antidelete\x20public*\x0a│\x20\x20└⊷\x20Show\x20in\x20chat\x0a╰⊷\x20' + getFooter(_0x9b38a0.key.participant || _0x9b38a0.key.remoteJid);
        await _0x43a0f1.sendMessage(_0x2b9bfb, {
          text: _0x4e4898
        }, {
          quoted: _0x9b38a0
        });
        break;
      case 'clear':
      case "clean":
        const _0x50cc64 = antideleteState.messageCache.size, _0x74453a = antideleteState.mediaCache.size, _0x56402d = antideleteState.groupCache.size;
        (antideleteState.messageCache.clear(), antideleteState.mediaCache.clear(), antideleteState.groupCache.clear(), antideleteState.stats = {
          totalMessages: 0,
          deletedDetected: 0,
          retrieved: 0,
          mediaCaptured: 0,
          sentToDm: 0,
          sentToChat: 0,
          cacheCleans: 0,
          totalStorageMB: 0
        });
        try {
          _0x217302.isAvailable() && await _0x217302.clearAllAntideleteData();
        } catch (_0x12b3e5) {
          console.error("${EMOJI.ERROR} Error clearing DB antidelete data:", _0x12b3e5.message);
        }
        (await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
          text: _0x4526c9.CLEAN + " *Cache Cleared*\n\n• Messages: " + _0x50cc64 + "\n• Media files: " + _0x74453a + '\x0a•\x20Group\x20data:\x20' + _0x56402d + '\x0a\x0aAll\x20data\x20has\x20been\x20cleared.\x20Storage\x20reset\x20to\x200MB.\x0a\x0a' + _0x4526c9.SUCCESS + " Antidelete remains ACTIVE (Mode: " + antideleteState.mode.toUpperCase() + ')'
        }, {
          quoted: _0x9b38a0
        }));
        break;
      case "settings":
        const _0x138e02 = _0x6bc91b[1]?.toLowerCase();
        if (!_0x138e02) {
          const _0x57d73d = '╭─⌈\x20' + _0x4526c9.SETTINGS + " *ANTIDELETE SETTINGS* ⌋\n│\n│ " + _0x4526c9.SUCCESS + " System: ALWAYS ACTIVE\n│ Mode: " + antideleteState.mode.toUpperCase() + " | Storage: DB\n│\n│ " + _0x4526c9.TOOL + " Auto-clean: " + (antideleteState.settings.autoCleanEnabled ? "${EMOJI.SUCCESS}" : "${EMOJI.ERROR}") + '\x0a│\x20' + _0x4526c9.TOOL + " Clean Retrieved: " + (antideleteState.settings.autoCleanRetrieved ? '${EMOJI.SUCCESS}' : "${EMOJI.ERROR}") + "\n│ " + _0x4526c9.TOOL + '\x20Max\x20Age:\x20' + antideleteState.settings.maxAgeHours + "h | Max Storage: " + antideleteState.settings.maxStorageMB + "MB\n│ " + _0x4526c9.TOOL + " Group Names: " + (antideleteState.settings.showGroupNames ? "${EMOJI.SUCCESS}" : "${EMOJI.ERROR}") + "\n│\n├─⊷ *" + _0x5a0c90 + "antidelete settings autoclean on/off*\n│  └⊷ Toggle auto-clean\n├─⊷ *" + _0x5a0c90 + "antidelete settings cleanretrieved on/off*\n│  └⊷ Toggle clean retrieved\n├─⊷ *" + _0x5a0c90 + "antidelete settings maxage <hours>*\n│  └⊷ Set max cache age\n├─⊷ *" + _0x5a0c90 + "antidelete settings maxstorage <MB>*\n│  └⊷ Set max storage\n├─⊷ *" + _0x5a0c90 + "antidelete settings groupnames on/off*\n│  └⊷ Toggle group names\n├─⊷ *" + _0x5a0c90 + "antidelete settings save*\n│  └⊷ Save settings\n│\n╰⊷ " + getFooter(_0x9b38a0.key.participant || _0x9b38a0.key.remoteJid);
          await _0x43a0f1.sendMessage(_0x2b9bfb, {
            text: _0x57d73d
          }, {
            quoted: _0x9b38a0
          });
          return;
        }
        switch (_0x138e02) {
          case 'autoclean':
            const _0x3d8b29 = _0x6bc91b[2]?.toLowerCase();
            if (_0x3d8b29 === 'on' || _0x3d8b29 === "enable") (antideleteState.settings.autoCleanEnabled = true, startAutoClean(), await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + " Auto-clean enabled. Cache will be cleaned every 24 hours."
            }, {
              quoted: _0x9b38a0
            })); else _0x3d8b29 === "off" || _0x3d8b29 === "disable" ? (antideleteState.settings.autoCleanEnabled = false, stopAutoClean(), await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + '\x20Auto-clean\x20disabled.'
            }, {
              quoted: _0x9b38a0
            })) : await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: 'Usage:\x20`' + _0x5a0c90 + "antidelete settings autoclean on/off`"
            }, {
              quoted: _0x9b38a0
            });
            break;
          case "cleanretrieved":
            const _0x44b318 = _0x6bc91b[2]?.toLowerCase();
            if (_0x44b318 === 'on' || _0x44b318 === "enable") (antideleteState.settings.autoCleanRetrieved = true, await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + " Clean retrieved messages enabled. Messages will be auto-cleaned after being sent to you."
            }, {
              quoted: _0x9b38a0
            })); else _0x44b318 === "off" || _0x44b318 === "disable" ? (antideleteState.settings.autoCleanRetrieved = false, await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + '\x20Clean\x20retrieved\x20messages\x20disabled.\x20Messages\x20will\x20remain\x20after\x20retrieval.'
            }, {
              quoted: _0x9b38a0
            })) : await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: "Usage: `" + _0x5a0c90 + "antidelete settings cleanretrieved on/off`"
            }, {
              quoted: _0x9b38a0
            });
            break;
          case "groupnames":
            const _0x34e78d = _0x6bc91b[2]?.toLowerCase();
            if (_0x34e78d === 'on' || _0x34e78d === "enable") (antideleteState.settings.showGroupNames = true, await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + " Group names enabled in antidelete notifications."
            }, {
              quoted: _0x9b38a0
            })); else _0x34e78d === "off" || _0x34e78d === 'disable' ? (antideleteState.settings.showGroupNames = false, await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + " Group names disabled in antidelete notifications."
            }, {
              quoted: _0x9b38a0
            })) : await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: 'Usage:\x20`' + _0x5a0c90 + 'antidelete\x20settings\x20groupnames\x20on/off`'
            }, {
              quoted: _0x9b38a0
            });
            break;
          case 'maxage':
            const _0x2d3cca = parseInt(_0x6bc91b[2]);
            if (isNaN(_0x2d3cca) || _0x2d3cca < 1 || _0x2d3cca > 168) {
              await _0x43a0f1.sendMessage(_0x2b9bfb, {
                text: _0x4526c9.ERROR + '\x20Invalid\x20hours.\x20Use\x201-168.\x0aExample:\x20`' + _0x5a0c90 + "antidelete settings maxage 48`"
              }, {
                quoted: _0x9b38a0
              });
              return;
            }
            (antideleteState.settings.maxAgeHours = _0x2d3cca, await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + '\x20Max\x20age\x20set\x20to\x20' + _0x2d3cca + " hours. Old cache will be cleaned automatically."
            }, {
              quoted: _0x9b38a0
            }));
            break;
          case 'maxstorage':
            const _0xce4ce6 = parseInt(_0x6bc91b[2]);
            if (isNaN(_0xce4ce6) || _0xce4ce6 < 10 || _0xce4ce6 > 5000) {
              await _0x43a0f1.sendMessage(_0x2b9bfb, {
                text: _0x4526c9.ERROR + " Invalid storage. Use 10-5000MB.\nExample: `" + _0x5a0c90 + "antidelete settings maxstorage 1000`"
              }, {
                quoted: _0x9b38a0
              });
              return;
            }
            (antideleteState.settings.maxStorageMB = _0xce4ce6, await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + " Max storage set to " + _0xce4ce6 + "MB. Force cleanup will trigger at 80% capacity."
            }, {
              quoted: _0x9b38a0
            }));
            break;
          case "save":
            (await saveData(), await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.SUCCESS + " Settings saved successfully to database."
            }, {
              quoted: _0x9b38a0
            }));
            break;
          default:
            await _0x43a0f1.sendMessage(_0x2b9bfb, {
              text: _0x4526c9.ERROR + " Unknown setting. Use `" + _0x5a0c90 + 'antidelete\x20settings`\x20for\x20options.'
            }, {
              quoted: _0x9b38a0
            });
        }
        break;
      case "help":
        const _0x3b39c8 = "╭─⌈ " + _0x4526c9.CHART + " *ANTIDELETE* ⌋\n├─⊷ *Mode:* " + (antideleteState.enabled ? antideleteState.mode.toUpperCase() : "OFF") + "\n├─⊷ *" + _0x5a0c90 + "antidelete on*\n│  └⊷ Enable (private mode)\n├─⊷ *" + _0x5a0c90 + "antidelete off*\n│  └⊷ Disable antidelete\n├─⊷ *" + _0x5a0c90 + "antidelete public*\n│  └⊷ Show in chat\n╰⊷ " + getFooter(_0x9b38a0.key.participant || _0x9b38a0.key.remoteJid);
        await _0x43a0f1.sendMessage(_0x2b9bfb, {
          text: _0x3b39c8
        }, {
          quoted: _0x9b38a0
        });
        break;
      default:
        {
          const _0x35cc13 = antideleteState.enabled ? antideleteState.mode.toUpperCase() : 'OFF', _0x2beead = '╭─⌈\x20' + _0x4526c9.CHART + " *ANTIDELETE* ⌋\n├─⊷ *Mode:* " + _0x35cc13 + "\n├─⊷ *" + _0x5a0c90 + "antidelete on*\n│  └⊷ Enable (private mode)\n├─⊷ *" + _0x5a0c90 + 'antidelete\x20off*\x0a│\x20\x20└⊷\x20Disable\x20antidelete\x0a├─⊷\x20*' + _0x5a0c90 + "antidelete public*\n│  └⊷ Show in chat\n╰⊷ " + getFooter(_0x9b38a0.key.participant || _0x9b38a0.key.remoteJid), _0x5753c1 = await getGiftedBtns();
          if (isButtonModeEnabled() && _0x5753c1?.sendInteractiveMessage) try {
            await _0x5753c1.sendInteractiveMessage(_0x43a0f1, _0x2b9bfb, {
              body: {
                text: _0x2beead
              },
              footer: {
                text: 'Current:\x20' + _0x35cc13
              },
              interactiveButtons: [{
                type: 'quick_reply',
                display_text: _0x4526c9.LOCKED + " Private Mode",
                id: _0x5a0c90 + 'antidelete\x20private'
              }, {
                type: "quick_reply",
                display_text: _0x4526c9.ANNOUNCE + ' Public Mode',
                id: _0x5a0c90 + "antidelete public"
              }, {
                type: "quick_reply",
                display_text: _0x4526c9.ERROR + ' Turn Off',
                id: _0x5a0c90 + "antidelete off"
              }]
            }, {
              quoted: _0x9b38a0
            });
            break;
          } catch (_0x55e898) {}
          await _0x43a0f1.sendMessage(_0x2b9bfb, {
            text: _0x2beead
          }, {
            quoted: _0x9b38a0
          });
          break;
        }
    }
  }
};
import _0x4526c9 from '../../lib/emojis.js';
