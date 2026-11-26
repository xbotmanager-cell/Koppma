import {createRequire} from 'module';
import {downloadMediaMessage, downloadContentFromMessage, normalizeMessageContent, jidNormalizedUser} from 'wolfsocket';
import {getBotName} from '../../lib/botname.js';
import {WolfLogger} from '../../lib/wolfLogger.js';
import _0x2dac75 from '../../lib/database.js';
import {isButtonModeEnabled} from '../../lib/buttonMode.js';
import {getPhoneFromLid} from '../../lib/sudo-store.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {sendNodeXAd} from '../../lib/nodeXAd.js';
const _requireAds = createRequire(import.meta.url);
let giftedBtnsAds;
async function getGiftedBtnsAds() {
  if (giftedBtnsAds) return giftedBtnsAds;
  try {
    giftedBtnsAds = await import('wolfbtns');
  } catch (_0x3dfc63) {
    giftedBtnsAds = null;
  }
  return giftedBtnsAds;
}
const CACHE_CLEAN_INTERVAL = 1 * 60 * 60 * 1000, MAX_CACHE_AGE = 3 * 60 * 60 * 1000, MAX_STATUS_AGE_FOR_DOWNLOAD = 30 * 60 * 1000, MAX_CONCURRENT_DOWNLOADS = 3;
let _activeDownloads = 0, statusAntideleteState = {
  enabled: true,
  mode: "private",
  ownerJid: null,
  sock: null,
  statusCache: new Map(),
  deletedStatusCache: new Map(),
  mediaCache: new Map(),
  stats: {
    totalStatuses: 0,
    deletedDetected: 0,
    retrieved: 0,
    mediaCaptured: 0,
    sentToDm: 0,
    cacheCleans: 0,
    totalStorageMB: 0
  },
  settings: {
    autoCleanEnabled: true,
    maxAgeHours: 3,
    maxStorageMB: 30,
    ownerOnly: true,
    autoCleanRetrieved: true,
    initialized: false
  },
  cleanupInterval: null
};
const STATUS_PATTERNS = {
  STATUS_JID: "status@broadcast",
  DELETE_STUB_TYPES: [0, 1, 4, 7, 8, 68, 69]
}, defaultSettings = {
  autoCleanEnabled: true,
  maxAgeHours: 3,
  maxStorageMB: 30,
  ownerOnly: true,
  autoCleanRetrieved: true,
  initialized: false
};
async function loadStatusData() {
  try {
    const _0x3a5ff6 = await _0x2dac75.getConfig('antidelete_status_settings', defaultSettings);
    _0x3a5ff6 && (statusAntideleteState.settings = {
      ...statusAntideleteState.settings,
      ..._0x3a5ff6
    });
    const _0x295112 = await _0x2dac75.getConfig("antidelete_status_enabled", true);
    statusAntideleteState.enabled = _0x295112;
    const _0x3ab158 = await _0x2dac75.getConfig("antidelete_status_mode", "private");
    statusAntideleteState.mode = _0x3ab158 || "private";
  } catch (_0x2a275e) {
    console.error("${EMOJI.ERROR} Status Antidelete: Error loading settings from DB:", _0x2a275e.message);
  }
}
async function saveStatusData() {
  try {
    (await _0x2dac75.setConfig("antidelete_status_settings", statusAntideleteState.settings), await _0x2dac75.setConfig("antidelete_status_enabled", statusAntideleteState.enabled), await _0x2dac75.setConfig("antidelete_status_mode", statusAntideleteState.mode || "private"));
  } catch (_0xadb9f5) {
    console.error("${EMOJI.ERROR} Status Antidelete: Error saving settings to DB:", _0xadb9f5.message);
  }
}
async function calculateStorageSize() {
  try {
    let _0x208fa1 = 0;
    for (const [, _0x8734ef] of statusAntideleteState.mediaCache.entries()) {
      _0x208fa1 += _0x8734ef.size || 0;
    }
    statusAntideleteState.stats.totalStorageMB = Math.round(_0x208fa1 / 1024 / 1024);
  } catch (_0x33b301) {
    console.error('${EMOJI.ERROR}\x20Status\x20Antidelete:\x20Error\x20calculating\x20storage:', _0x33b301.message);
  }
}
async function cleanRetrievedStatus(_0xb219ba) {
  try {
    if (!statusAntideleteState.settings.autoCleanRetrieved) return;
    (statusAntideleteState.statusCache.delete(_0xb219ba), statusAntideleteState.mediaCache.delete(_0xb219ba));
    try {
      await _0x2dac75.deleteAntideleteStatus(_0xb219ba);
    } catch {}
  } catch (_0x3a7a1c) {
    console.error('${EMOJI.ERROR}\x20Status\x20Antidelete:\x20Error\x20cleaning\x20retrieved\x20status:', _0x3a7a1c.message);
  }
}
async function autoCleanCache() {
  try {
    if (!statusAntideleteState.settings.autoCleanEnabled) return;
    const _0x9f95a5 = Date.now(), _0x11accb = statusAntideleteState.settings.maxAgeHours * 60 * 60 * 1000;
    let _0x32d1f9 = 0, _0x18ec96 = 0;
    for (const [_0x5cc0fa, _0x1fd9db] of statusAntideleteState.statusCache.entries()) {
      _0x9f95a5 - _0x1fd9db.timestamp > _0x11accb && (statusAntideleteState.statusCache.delete(_0x5cc0fa), _0x32d1f9++);
    }
    for (const [_0x22b290, _0x1dd453] of statusAntideleteState.deletedStatusCache.entries()) {
      _0x9f95a5 - _0x1dd453.timestamp > _0x11accb && (statusAntideleteState.deletedStatusCache.delete(_0x22b290), _0x32d1f9++);
    }
    for (const [_0x25a063, _0x4a9abd] of statusAntideleteState.mediaCache.entries()) {
      _0x9f95a5 - _0x4a9abd.savedAt > _0x11accb && (statusAntideleteState.mediaCache.delete(_0x25a063), _0x18ec96++);
    }
    try {
      await _0x2dac75.cleanOlderThan("antidelete_statuses", "timestamp", _0x11accb);
    } catch {}
    (await calculateStorageSize(), (_0x32d1f9 > 0 || _0x18ec96 > 0) && (statusAntideleteState.stats.cacheCleans++, await saveStatusData()));
  } catch (_0x5c5498) {
    console.error("${EMOJI.ERROR} Status Antidelete: Auto-clean error:", _0x5c5498.message);
  }
}
async function forceCleanup() {
  try {
    const _0x3c0ba3 = Array.from(statusAntideleteState.mediaCache.entries());
    _0x3c0ba3.sort((_0x537d8f, _0x1a509d) => _0x537d8f[1].savedAt - _0x1a509d[1].savedAt);
    let _0x362591 = 0;
    const _0x5a05b6 = statusAntideleteState.settings.maxStorageMB * 1024 * 1024 * 0.8;
    let _0x33c5de = 0;
    for (const [_0x32b1df, _0x152eec] of _0x3c0ba3) {
      if (statusAntideleteState.stats.totalStorageMB * 1024 * 1024 - _0x362591 <= _0x5a05b6) break;
      (statusAntideleteState.mediaCache.delete(_0x32b1df), _0x362591 += _0x152eec.size || 0, _0x33c5de++);
    }
    const _0x5ca38e = Array.from(statusAntideleteState.statusCache.entries());
    _0x5ca38e.sort((_0x25e93e, _0x2f14f9) => _0x25e93e[1].timestamp - _0x2f14f9[1].timestamp);
    for (let _0xba823e = 0; _0xba823e < Math.min(10, _0x5ca38e.length); _0xba823e++) {
      statusAntideleteState.statusCache.delete(_0x5ca38e[_0xba823e][0]);
    }
    (await calculateStorageSize(), await saveStatusData(), console.log(_0x2bc5fd.SUCCESS + '\x20Status\x20force\x20cleanup\x20completed.\x20Removed\x20' + _0x33c5de + '\x20media\x20entries,\x20freed\x20~' + Math.round(_0x362591 / 1024 / 1024) + 'MB'));
  } catch (_0x5451ff) {
    console.error('${EMOJI.ERROR}\x20Status\x20Antidelete:\x20Force\x20cleanup\x20error:', _0x5451ff.message);
  }
}
function startAutoClean() {
  (statusAntideleteState.cleanupInterval && clearInterval(statusAntideleteState.cleanupInterval), statusAntideleteState.cleanupInterval = setInterval(async () => {
    await autoCleanCache();
  }, CACHE_CLEAN_INTERVAL));
}
function getStatusExtensionFromMime(_0xbba7d5) {
  const _0x59f878 = {
    'image/jpeg': '.jpg',
    'image/jpg': ".jpg",
    'image/png': '.png',
    'image/gif': ".gif",
    'image/webp': ".webp",
    'video/mp4': '.mp4',
    'video/3gpp': ".3gp",
    'audio/mpeg': '.mp3',
    'audio/mp4': ".m4a",
    'audio/ogg': ".ogg",
    'audio/aac': '.aac',
    'image/vnd.wap.wbmp': '.wbmp'
  };
  return _0x59f878[_0xbba7d5] || ".bin";
}
function getRealWhatsAppNumber(_0x28298f) {
  if (!_0x28298f) return "Unknown";
  try {
    const _0x2e5614 = _0x28298f.split('@')[0];
    if (_0x28298f.endsWith("@lid")) {
      const _0x18e779 = globalThis.lidPhoneCache;
      if (_0x18e779) {
        const _0x579e96 = _0x18e779.get(_0x2e5614) || _0x18e779.get(_0x28298f);
        if (_0x579e96) return '+' + String(_0x579e96).replace(/^\+/, '');
      }
      const _0x2586b9 = getPhoneFromLid(_0x2e5614);
      if (_0x2586b9) return '+' + _0x2586b9.replace(/^\+/, '');
      if (typeof globalThis.resolvePhoneFromLid === "function") {
        const _0x10f264 = globalThis.resolvePhoneFromLid(_0x28298f);
        if (_0x10f264 && (/^\d+$/).test(String(_0x10f264)) && String(_0x10f264).length >= 7) return '+' + String(_0x10f264).replace(/^\+/, '');
      }
      if (global.contactNames) for (const [_0x3771d9] of Object.entries(global.contactNames)) {
        const _0x2faaa0 = _0x3771d9.split('@')[0];
        if (_0x2faaa0.endsWith(_0x2e5614.slice(-6)) && (/^\d+$/).test(_0x2faaa0) && _0x2faaa0.length >= 10 && _0x2faaa0.length <= 15) return '+' + _0x2faaa0;
      }
      return _0x2e5614;
    }
    let _0x377841 = _0x2e5614.replace(/:/g, '').replace(/[^\d]/g, '');
    if (_0x377841.length >= 10 && _0x377841.length <= 15) return '+' + _0x377841;
    if (_0x2e5614 && (/^\d+$/).test(_0x2e5614) && _0x2e5614.length >= 10) return '+' + _0x2e5614;
    return _0x2e5614 || "Unknown";
  } catch (_0xd99b6b) {
    return "Unknown";
  }
}
const STARTUP_GRACE_MS = 90 * 1000;
async function getStatusMediaBuffer(_0x4080b0) {
  const _0x33ecde = _0x4080b0.rawMessage;
  if (!_0x33ecde) return null;
  const _0x261f89 = _0x4080b0.type === "voice" ? "audio" : _0x4080b0.type, _0xe54637 = {
    level: "silent",
    trace: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    fatal: () => {},
    child: function () {
      return this;
    }
  };
  try {
    const _0x2e4f20 = await Promise.race([downloadMediaMessage(_0x33ecde, 'buffer', {}, {
      logger: _0xe54637,
      reuploadRequest: statusAntideleteState.sock?.updateMediaMessage
    }), new Promise((_0x15a154, _0x15ab06) => setTimeout(() => _0x15ab06(new Error("dl_timeout")), 25000))]);
    if (_0x2e4f20 && _0x2e4f20.length > 0) return {
      buffer: _0x2e4f20,
      mimetype: _0x4080b0.mimetype
    };
  } catch {}
  try {
    const _0x2cbe31 = _0x33ecde?.message;
    if (!_0x2cbe31) return null;
    const _0x11b2aa = _0x261f89 + "Message", _0x465f80 = _0x2cbe31[_0x11b2aa];
    if (!_0x465f80) return null;
    const _0x1da27a = await Promise.race([downloadContentFromMessage(_0x465f80, _0x261f89), new Promise((_0x297760, _0x16b714) => setTimeout(() => _0x16b714(new Error("dl_timeout")), 25000))]), _0x26756b = [];
    let _0x6e5d0 = 0;
    for await (const _0x5c9a09 of _0x1da27a) {
      (_0x26756b.push(_0x5c9a09), _0x6e5d0 += _0x5c9a09.length);
      if (_0x6e5d0 > 20 * 1024 * 1024) break;
    }
    const _0x4d7ec4 = Buffer.concat(_0x26756b);
    if (_0x4d7ec4.length > 0) return {
      buffer: _0x4d7ec4,
      mimetype: _0x4080b0.mimetype
    };
  } catch {}
  return null;
}
async function downloadAndSaveStatusMedia(_0x31d207, _0x113a3c, _0xfa69cd, _0x5de47a, _0x19e231) {
  const _0x1bf409 = globalThis._botConnectionOpenTime || 0;
  if (_0x1bf409 > 0 && Date.now() - _0x1bf409 < STARTUP_GRACE_MS) return null;
  if (_0x19e231 && Date.now() - _0x19e231 > MAX_STATUS_AGE_FOR_DOWNLOAD) return null;
  if (_activeDownloads >= MAX_CONCURRENT_DOWNLOADS) return null;
  _activeDownloads++;
  let _0x229413 = null;
  try {
    _0x229413 = await downloadMediaMessage(_0x113a3c, "buffer", {}, {
      logger: {
        level: 'silent'
      },
      reuploadRequest: statusAntideleteState.sock?.updateMediaMessage
    });
  } catch (_0x2bee9c) {
    const _0x39aa01 = _0x2bee9c.message?.toLowerCase().includes('media\x20key') || _0x2bee9c.message?.toLowerCase().includes('empty') || _0x2bee9c.message?.toLowerCase().includes("decrypt");
    if (_0x39aa01) try {
      const _0x20d66e = normalizeMessageContent(_0x113a3c.message) || _0x113a3c.message;
      let _0x30ca7a = null, _0x17980d = null;
      if (_0x20d66e?.imageMessage) (_0x30ca7a = _0x20d66e.imageMessage, _0x17980d = "image"); else {
        if (_0x20d66e?.videoMessage) (_0x30ca7a = _0x20d66e.videoMessage, _0x17980d = "video"); else _0x20d66e?.audioMessage && (_0x30ca7a = _0x20d66e.audioMessage, _0x17980d = "audio");
      }
      if (_0x30ca7a && _0x17980d) {
        if (statusAntideleteState.sock?.updateMediaMessage) {
          const _0x124b96 = await statusAntideleteState.sock.updateMediaMessage(_0x113a3c), _0x3f539a = normalizeMessageContent(_0x124b96.message) || _0x124b96.message;
          _0x30ca7a = _0x3f539a?.[_0x17980d + 'Message'] || _0x30ca7a;
        }
        const _0xc9661a = await downloadContentFromMessage(_0x30ca7a, _0x17980d), _0x451fc5 = [];
        for await (const _0x495096 of _0xc9661a) _0x451fc5.push(_0x495096);
        _0x229413 = Buffer.concat(_0x451fc5);
      }
    } catch (_0x3c4a04) {
      return (console.error("${EMOJI.ERROR} Status Antidelete: Fallback download failed:", _0x3c4a04.message), null);
    } else return (console.error('${EMOJI.ERROR}\x20Status\x20Antidelete:\x20Media\x20download\x20error:', _0x2bee9c.message), null);
  }
  try {
    if (!_0x229413 || _0x229413.length === 0) return null;
    const _0x56732a = 8 * 1024 * 1024;
    if (_0x229413.length > _0x56732a) return null;
    const _0x446805 = Date.now(), _0x5913e3 = (_0x229413.length / 1024 / 1024).toFixed(2);
    let _0x3d4492 = null;
    try {
      _0x3d4492 = await _0x2dac75.uploadMedia(_0x31d207, _0x229413, _0x5de47a, "statuses");
    } catch {}
    statusAntideleteState.mediaCache.set(_0x31d207, {
      type: _0xfa69cd,
      mimetype: _0x5de47a,
      size: _0x229413.length,
      isStatus: true,
      savedAt: _0x446805,
      dbPath: _0x3d4492 || "statuses/" + _0x31d207
    });
    if (statusAntideleteState.mediaCache.size > 50) {
      const _0x115b26 = statusAntideleteState.mediaCache.keys().next().value;
      statusAntideleteState.mediaCache.delete(_0x115b26);
    }
    return (WolfLogger.statusAD(_0x2bc5fd.SAVE + " Stored " + _0x5913e3 + 'MB', _0xfa69cd, _0x31d207), statusAntideleteState.stats.mediaCaptured++, 'db');
  } catch (_0x37f005) {
    return (console.error("${EMOJI.ERROR} Status Antidelete: Media download error:", _0x37f005.message), null);
  } finally {
    _activeDownloads--;
  }
}
function isStatusMessage(_0x25d540) {
  try {
    const _0x39a9b2 = _0x25d540.key;
    if (!_0x39a9b2) return false;
    if (_0x39a9b2.remoteJid === STATUS_PATTERNS.STATUS_JID) return true;
    return false;
  } catch (_0x2919c9) {
    return false;
  }
}
function extractStatusInfo(_0x20a311) {
  try {
    const _0x33481e = _0x20a311.key, _0x3c67d9 = _0x33481e.participantAlt || _0x33481e.participant || _0x33481e.remoteJid, _0x101938 = _0x20a311.pushName || 'Unknown', _0x24c61e = _0x20a311.messageTimestamp * 1000 || Date.now(), _0xbcd078 = normalizeMessageContent(_0x20a311.message);
    let _0x42150e = 'text', _0x395797 = '', _0x5d733b = false, _0x474310 = null, _0x49a82f = '';
    if (_0xbcd078?.imageMessage) (_0x42150e = 'image', _0x395797 = _0xbcd078.imageMessage.caption || '', _0x5d733b = true, _0x49a82f = _0xbcd078.imageMessage.mimetype || 'image/jpeg', _0x474310 = {
      message: _0x20a311,
      type: "image",
      mimetype: _0x49a82f
    }); else {
      if (_0xbcd078?.videoMessage) (_0x42150e = 'video', _0x395797 = _0xbcd078.videoMessage.caption || '', _0x5d733b = true, _0x49a82f = _0xbcd078.videoMessage.mimetype || "video/mp4", _0x474310 = {
        message: _0x20a311,
        type: "video",
        mimetype: _0x49a82f
      }); else {
        if (_0xbcd078?.audioMessage) (_0x42150e = "audio", _0x5d733b = true, _0x49a82f = _0xbcd078.audioMessage.mimetype || 'audio/mpeg', _0xbcd078.audioMessage.ptt && (_0x42150e = "voice"), _0x474310 = {
          message: _0x20a311,
          type: "audio",
          mimetype: _0x49a82f
        }); else {
          if (_0xbcd078?.extendedTextMessage?.text) (_0x42150e = 'text', _0x395797 = _0xbcd078.extendedTextMessage.text); else _0xbcd078?.conversation && (_0x42150e = "text", _0x395797 = _0xbcd078.conversation);
        }
      }
    }
    return (!_0x395797 && !_0x5d733b && (_0x42150e = "status_update"), {
      senderJid: _0x3c67d9,
      pushName: _0x101938,
      timestamp: _0x24c61e,
      type: _0x42150e,
      text: _0x395797,
      hasMedia: _0x5d733b,
      mediaInfo: _0x474310,
      mimetype: _0x49a82f,
      isStatus: true
    });
  } catch (_0x2d543f) {
    return (console.error("${EMOJI.ERROR} Status Antidelete: Error extracting status info:", _0x2d543f.message), null);
  }
}
const MAX_STATUS_STORE_AGE_MS = 5 * 60 * 1000;
export async function statusAntideleteStoreMessage(_0x1e38de) {
  try {
    if (!statusAntideleteState.sock) return;
    if (!statusAntideleteState.enabled) return;
    if (!isStatusMessage(_0x1e38de)) return;
    const _0x3066c0 = _0x1e38de.key, _0x21b9f5 = _0x3066c0.id;
    if (!_0x21b9f5 || _0x3066c0.fromMe) return;
    const _0x5d7432 = _0x1e38de.messageTimestamp ? (typeof _0x1e38de.messageTimestamp === "object" ? _0x1e38de.messageTimestamp.low || 0 : Number(_0x1e38de.messageTimestamp)) * 1000 : 0;
    if (_0x5d7432 > 0 && Date.now() - _0x5d7432 > MAX_STATUS_STORE_AGE_MS) return;
    const _0xcb28ba = extractStatusInfo(_0x1e38de);
    if (!_0xcb28ba) return;
    const _0x236497 = getRealWhatsAppNumber(_0xcb28ba.senderJid);
    let _0x39bd6d = null;
    if (_0xcb28ba.hasMedia && _0xcb28ba.mediaInfo?.message) try {
      const _0x42f139 = JSON.parse(JSON.stringify(_0xcb28ba.mediaInfo.message)), _0x3acc91 = _0x42f139?.message;
      if (_0x3acc91) for (const _0x280891 of Object.keys(_0x3acc91)) {
        if (_0x3acc91[_0x280891]?.jpegThumbnail) delete _0x3acc91[_0x280891].jpegThumbnail;
        if (_0x3acc91[_0x280891]?.thumbnail) delete _0x3acc91[_0x280891].thumbnail;
      }
      _0x39bd6d = _0x42f139;
    } catch {}
    const _0x50df0c = {
      id: _0x21b9f5,
      chatJid: _0x3066c0.remoteJid,
      senderJid: _0xcb28ba.senderJid,
      senderNumber: _0x236497,
      pushName: _0xcb28ba.pushName,
      timestamp: _0xcb28ba.timestamp,
      type: _0xcb28ba.type,
      text: _0xcb28ba.text || '',
      hasMedia: _0xcb28ba.hasMedia,
      mimetype: _0xcb28ba.mimetype,
      isStatus: true,
      rawMessage: _0x39bd6d
    };
    statusAntideleteState.statusCache.set(_0x21b9f5, _0x50df0c);
    statusAntideleteState.statusCache.size > 300 && statusAntideleteState.statusCache.delete(statusAntideleteState.statusCache.keys().next().value);
    statusAntideleteState.stats.totalStatuses++;
    try {
      await _0x2dac75.storeAntideleteStatus(_0x21b9f5, _0x50df0c);
    } catch {}
    if (_0xcb28ba.hasMedia && _0xcb28ba.mediaInfo) {
      const _0x3e0e21 = Math.random() * 2000 + 1000, _0x3a7315 = _0xcb28ba.timestamp || Date.now();
      setTimeout(async () => {
        try {
          await downloadAndSaveStatusMedia(_0x21b9f5, _0xcb28ba.mediaInfo.message, _0xcb28ba.type, _0xcb28ba.mimetype, _0x3a7315);
        } catch (_0x3fe56a) {
          console.error("${EMOJI.ERROR} Status Antidelete: Async media download failed:", _0x3fe56a.message);
        }
      }, _0x3e0e21);
    }
    return _0x50df0c;
  } catch (_0x18d406) {
    return (console.error("${EMOJI.ERROR} Status Antidelete: Error storing status:", _0x18d406.message), null);
  }
}
const recentlyProcessedStatusDeletions = new Map();
export async function statusAntideleteHandleUpdate(_0x347a0d) {
  try {
    if (!statusAntideleteState.sock) return;
    if (!statusAntideleteState.enabled) return;
    const _0x164f7e = _0x347a0d.key;
    if (!_0x164f7e || !_0x164f7e.id) return;
    const _0x36d4d6 = _0x164f7e.id;
    if (recentlyProcessedStatusDeletions.has(_0x36d4d6)) return;
    (recentlyProcessedStatusDeletions.set(_0x36d4d6, Date.now()), setTimeout(() => recentlyProcessedStatusDeletions.delete(_0x36d4d6), 30000));
    if (_0x164f7e.remoteJid !== STATUS_PATTERNS.STATUS_JID) return;
    const _0x1b4966 = _0x347a0d.update || _0x347a0d, _0x4dc527 = _0x1b4966.messageStubType || _0x347a0d.messageStubType, _0x44d965 = _0x1b4966.message?.protocolMessage || _0x1b4966.protocolMessage, _0x2a4e60 = _0x44d965?.type === 0 || _0x44d965?.type === 4, _0x170a8c = {
      innerMsgNull: _0x1b4966.message === null,
      innerMsgUndefinedWithStub: _0x1b4966.message === undefined && _0x1b4966.messageStubType !== undefined,
      status5: _0x1b4966.status === 5,
      status6: _0x1b4966.status === 6,
      stubMatch: _0x4dc527 !== undefined && STATUS_PATTERNS.DELETE_STUB_TYPES.includes(_0x4dc527),
      protoRevoke: _0x2a4e60,
      updateMsgNull: _0x347a0d.message === null,
      updateStubMatch: _0x347a0d.messageStubType !== undefined && STATUS_PATTERNS.DELETE_STUB_TYPES.includes(_0x347a0d.messageStubType)
    }, _0x1a3d78 = Object.values(_0x170a8c).some(_0x90e04e => _0x90e04e);
    if (!_0x1a3d78) return;
    let _0x5b1983 = statusAntideleteState.statusCache.get(_0x36d4d6);
    if (!_0x5b1983) try {
      _0x5b1983 = await _0x2dac75.getAntideleteStatus(_0x36d4d6);
    } catch {}
    if (!_0x5b1983) return;
    const _0x14f8b4 = _0x347a0d.participant || _0x164f7e.participant || _0x5b1983.senderJid, _0x53b414 = getRealWhatsAppNumber(_0x14f8b4);
    let _0x2099c6 = _0x5b1983.senderNumber;
    (!_0x2099c6 || !_0x2099c6.startsWith('+')) && (_0x2099c6 = getRealWhatsAppNumber(_0x5b1983.senderJid));
    (statusAntideleteState.statusCache.delete(_0x36d4d6), statusAntideleteState.deletedStatusCache.set(_0x36d4d6, {
      ..._0x5b1983,
      deletedAt: Date.now(),
      deletedByNumber: _0x53b414
    }), statusAntideleteState.stats.deletedDetected++);
    const _0x27362c = await sendStatusToOwnerDM(_0x5b1983, _0x53b414);
    (_0x27362c && (statusAntideleteState.stats.sentToDm++, await cleanRetrievedStatus(_0x36d4d6)), statusAntideleteState.stats.retrieved++, await saveStatusData());
  } catch (_0x1ee5f7) {
    console.error("${EMOJI.ERROR} Status Antidelete: Error handling deleted status:", _0x1ee5f7.message);
  }
}
async function retrySend(_0x3079f7, _0x14e9c1 = 5) {
  for (let _0x2e671b = 1; _0x2e671b <= _0x14e9c1; _0x2e671b++) {
    try {
      if (!statusAntideleteState.sock) {
        await new Promise(_0xa98491 => setTimeout(_0xa98491, _0x2e671b * 3000));
        continue;
      }
      return (await _0x3079f7(), true);
    } catch (_0x3f9aad) {
      const _0x38eb79 = (_0x3f9aad.message || '').toLowerCase(), _0x22470e = _0x38eb79.includes("connection closed") || _0x38eb79.includes("connection lost") || _0x38eb79.includes("timed out") || _0x38eb79.includes('not\x20open');
      if (_0x22470e && _0x2e671b < _0x14e9c1) {
        await new Promise(_0x1f3d96 => setTimeout(_0x1f3d96, _0x2e671b * 3000));
        continue;
      }
      throw _0x3f9aad;
    }
  }
  return false;
}
async function sendStatusToOwnerDM(_0x1fa158, _0x536c2c) {
  try {
    if (!statusAntideleteState.sock || !statusAntideleteState.ownerJid) return (console.error('${EMOJI.ERROR}\x20Status\x20Antidelete:\x20Socket\x20or\x20owner\x20JID\x20not\x20set'), false);
    const _0x411565 = statusAntideleteState.ownerJid, _0x4f5cc9 = new Date(_0x1fa158.timestamp).toLocaleString();
    let _0x529e60 = _0x1fa158.senderNumber;
    (!_0x529e60 || !_0x529e60.startsWith('+')) && (_0x529e60 = getRealWhatsAppNumber(_0x1fa158.senderJid));
    const _0x30f23e = _0x1fa158.pushName || "Unknown", _0xc18bd8 = _0x529e60 && _0x529e60.startsWith('+') ? _0x529e60 + '\x20(' + _0x30f23e + ')' : _0x30f23e;
    let _0x278864 = '\x0a\x0a' + _0x2bc5fd.DECORATIVE_STAR + '\x20' + getBotName() + " status antidelete" + _0x2bc5fd.WOLF + '\x0a';
    _0x278864 += _0x2bc5fd.DECORATIVE_STAR + " 𝙿𝚘𝚜𝚝𝚎𝚍 𝙱𝚢 : " + _0xc18bd8 + '\x0a';
    const _0x1c81ef = _0x536c2c && _0x536c2c.startsWith('+') ? _0x536c2c : null;
    _0x1c81ef && _0x1c81ef !== _0x529e60 && (_0x278864 += _0x2bc5fd.DECORATIVE_STAR + '\x20𝙳𝚎𝚕𝚎𝚝𝚎𝚍\x20𝙱𝚢\x20:\x20' + _0x1c81ef + '\x0a');
    (_0x278864 += _0x2bc5fd.DECORATIVE_STAR + " 𝚃𝚒𝚖𝚎 : " + _0x4f5cc9 + '\x0a', _0x278864 += _0x2bc5fd.DECORATIVE_STAR + " 𝚃𝚢𝚙𝚎 : " + _0x1fa158.type.toUpperCase() + '\x0a');
    if (_0x1fa158.text) {
      _0x278864 += '\x0a' + _0x2bc5fd.DECORATIVE_STAR + " 𝗦𝘁𝗮𝘁𝘂𝘀 𝗧𝗲𝘅𝘁:\n" + _0x1fa158.text.substring(0, 1000);
      if (_0x1fa158.text.length > 1000) _0x278864 += '...';
    }
    let _0x177773 = statusAntideleteState.mediaCache.get(_0x1fa158.id);
    if (_0x1fa158.hasMedia) try {
      if (_0x177773?.dbPath) {
        const _0x130bbf = await _0x2dac75.downloadMedia(_0x177773.dbPath);
        _0x130bbf && (_0x177773 = {
          ..._0x177773,
          base64: _0x130bbf.toString("base64")
        });
      }
      if (!_0x177773?.base64) {
        const _0x48c7a6 = _0x1fa158.mimetype?.split('/')[1]?.split(';')[0] || 'bin', _0x10f695 = "statuses/" + _0x1fa158.id + '.' + _0x48c7a6, _0xe81b30 = await _0x2dac75.downloadMedia(_0x10f695);
        _0xe81b30 && (_0x177773 = {
          base64: _0xe81b30.toString("base64"),
          type: _0x1fa158.type,
          mimetype: _0x1fa158.mimetype || "application/octet-stream",
          size: _0xe81b30.length,
          isStatus: true,
          savedAt: Date.now()
        });
      }
      if (!_0x177773?.base64) {
        const _0x4cdfa5 = await _0x2dac75.downloadMedia("statuses/" + _0x1fa158.id);
        _0x4cdfa5 && (_0x177773 = {
          base64: _0x4cdfa5.toString('base64'),
          type: _0x1fa158.type,
          mimetype: _0x1fa158.mimetype || "application/octet-stream",
          size: _0x4cdfa5.length,
          isStatus: true,
          savedAt: Date.now()
        });
      }
    } catch (_0x2c216f) {
      console.error("${EMOJI.ERROR} Status Antidelete: DB media fetch error:", _0x2c216f.message);
    }
    if (_0x1fa158.hasMedia && !_0x177773?.base64) try {
      const _0x12b2d9 = await getStatusMediaBuffer(_0x1fa158);
      _0x12b2d9?.buffer && _0x12b2d9.buffer.length > 0 && (WolfLogger.statusAD(_0x2bc5fd.INBOX + " On-demand fallback ok", _0x1fa158.type, null), _0x177773 = {
        base64: _0x12b2d9.buffer.toString('base64'),
        type: _0x1fa158.type,
        mimetype: _0x12b2d9.mimetype || _0x1fa158.mimetype,
        size: _0x12b2d9.buffer.length,
        isStatus: true,
        savedAt: Date.now()
      });
    } catch {}
    if (_0x1fa158.hasMedia && _0x177773?.base64) {
      let _0x57afe1 = false;
      try {
        const _0x5d175f = Buffer.from(_0x177773.base64, 'base64');
        if (_0x5d175f && _0x5d175f.length > 0) {
          const _0x4d386c = (_0x5d175f.length / 1024 / 1024).toFixed(2);
          WolfLogger.statusAD(_0x2bc5fd.INBOX + " DB recovered " + _0x4d386c + 'MB', _0x1fa158.type, _0x1fa158.id);
          if (_0x1fa158.type === "image") (await retrySend(() => statusAntideleteState.sock.sendMessage(_0x411565, {
            image: _0x5d175f,
            mimetype: _0x177773.mimetype
          })), _0x57afe1 = true); else {
            if (_0x1fa158.type === "video") (await retrySend(() => statusAntideleteState.sock.sendMessage(_0x411565, {
              video: _0x5d175f,
              mimetype: _0x177773.mimetype
            })), _0x57afe1 = true); else (_0x1fa158.type === "audio" || _0x1fa158.type === "voice") && (await retrySend(async () => {
              await statusAntideleteState.sock.sendMessage(_0x411565, {
                audio: _0x5d175f,
                mimetype: _0x177773.mimetype,
                ptt: _0x1fa158.type === "voice"
              });
            }), _0x57afe1 = true);
          }
        } else {}
      } catch (_0x4098a3) {
        console.error('${EMOJI.ERROR}\x20Status\x20Antidelete:\x20Media\x20send\x20error:', _0x4098a3.message);
        try {
          await retrySend(() => statusAntideleteState.sock.sendMessage(_0x411565, {
            text: _0x278864 + ('\x0a\x0a' + _0x2bc5fd.ERROR + " 𝗠𝗲𝗱𝗶𝗮 𝗰𝗼𝘂𝗹𝗱 𝗻𝗼𝘁 𝗯𝗲 𝗿𝗲𝗰𝗼𝘃𝗲𝗿𝗲𝗱")
          }));
        } catch {}
      }
      _0x57afe1 && (statusAntideleteState.mediaCache.delete(_0x1fa158.id), WolfLogger.statusAD("${EMOJI.TRASH} Cleanup done", null, _0x1fa158.id));
    }
    return (await sendNodeXAd(statusAntideleteState.sock, _0x411565, {
      alertText: _0x278864
    }), true);
  } catch (_0x46520f) {
    return (console.error('${EMOJI.ERROR}\x20Status\x20Antidelete:\x20Error\x20sending\x20to\x20owner\x20DM:', _0x46520f.message), false);
  }
}
export async function initStatusAntidelete(_0x7ba2ec) {
  try {
    await loadStatusData();
    _0x7ba2ec.user?.id && (statusAntideleteState.ownerJid = jidNormalizedUser(_0x7ba2ec.user.id));
    statusAntideleteState.sock = _0x7ba2ec;
    if (!statusAntideleteState.mode) statusAntideleteState.mode = "private";
    (statusAntideleteState.settings.autoCleanEnabled && startAutoClean(), statusAntideleteState.settings.initialized = true, await saveStatusData(), globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.statusAntidelete = (statusAntideleteState.enabled ? 'ON' : "OFF") + '\x20(' + (statusAntideleteState.mode || "private").toUpperCase() + ')');
  } catch (_0x28fc25) {
    console.error("${EMOJI.ERROR} Status Antidelete: Initialization error:", _0x28fc25.message);
  }
}
export function updateStatusAntideleteSock(_0x309802) {
  _0x309802 && (statusAntideleteState.sock = _0x309802, _0x309802.user?.id && (statusAntideleteState.ownerJid = jidNormalizedUser(_0x309802.user.id)));
}
export function getStatusAntideleteInfo() {
  return {
    enabled: statusAntideleteState.enabled,
    mode: statusAntideleteState.mode || "private"
  };
}
export default {
  name: "antideletestatus",
  alias: ["statusantidelete", "sad"],
  description: 'Status\x20antidelete\x20system\x20-\x20always\x20on,\x20captures\x20deleted\x20statuses',
  category: "owner",
  ownerOnly: true,
  async execute(_0x26f5ad, _0x2b1720, _0x536c22, _0x4c68dd, _0x13f85b = {}) {
    const _0x6632a8 = _0x2b1720.key.remoteJid, _0x15ac02 = _0x536c22[0]?.toLowerCase() || "status", {jidManager: _0x353466} = _0x13f85b || ({}), _0x35ba4e = _0x13f85b?.isSudo ? _0x13f85b.isSudo() : false;
    if (!_0x353466 || !_0x353466.isOwner(_0x2b1720) && !_0x35ba4e) return _0x26f5ad.sendMessage(_0x6632a8, {
      text: _0x2bc5fd.ERROR + '\x20*Owner\x20Only\x20Command!*\x0a\x0aOnly\x20the\x20bot\x20owner\x20can\x20use\x20status\x20antidelete\x20commands.'
    }, {
      quoted: _0x2b1720
    });
    !statusAntideleteState.sock && (statusAntideleteState.sock = _0x26f5ad);
    !statusAntideleteState.ownerJid && _0x13f85b.OWNER_JID && (statusAntideleteState.ownerJid = _0x13f85b.OWNER_JID);
    switch (_0x15ac02) {
      case "private":
        {
          (statusAntideleteState.enabled = true, statusAntideleteState.mode = 'private', await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
            text: "╭─⌈ " + _0x2bc5fd.SUCCESS + " *STATUS ANTIDELETE: PRIVATE* ⌋\n├─⊷ Deleted statuses sent to owner DM\n╰⊷ " + getFooter(_0x2b1720.key.participant || _0x2b1720.key.remoteJid)
          }, {
            quoted: _0x2b1720
          }));
          break;
        }
      case "public":
        {
          (statusAntideleteState.enabled = true, statusAntideleteState.mode = "public", await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
            text: "╭─⌈ " + _0x2bc5fd.SUCCESS + " *STATUS ANTIDELETE: PUBLIC* ⌋\n├─⊷ Deleted statuses sent to same chat\n╰⊷ " + getFooter(_0x2b1720.key.participant || _0x2b1720.key.remoteJid)
          }, {
            quoted: _0x2b1720
          }));
          break;
        }
      case 'on':
      case "enable":
        {
          (statusAntideleteState.enabled = true, await saveStatusData());
          const _0x49547d = (statusAntideleteState.mode || "private").toUpperCase();
          await _0x26f5ad.sendMessage(_0x6632a8, {
            text: "╭─⌈ " + _0x2bc5fd.SUCCESS + " *STATUS ANTIDELETE: ON (" + _0x49547d + ")* ⌋\n╰⊷ " + getFooter(_0x2b1720.key.participant || _0x2b1720.key.remoteJid)
          }, {
            quoted: _0x2b1720
          });
          break;
        }
      case 'off':
      case "disable":
        {
          (statusAntideleteState.enabled = false, await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
            text: '╭─⌈\x20' + _0x2bc5fd.ERROR + " *STATUS ANTIDELETE: OFF* ⌋\n╰⊷ " + getFooter(_0x2b1720.key.participant || _0x2b1720.key.remoteJid)
          }, {
            quoted: _0x2b1720
          }));
          break;
        }
      case 'status':
      case "stats":
        {
          const _0x1eda57 = statusAntideleteState.enabled ? (statusAntideleteState.mode || "private").toUpperCase() : "OFF", _0x398d4c = "╭─⌈ " + _0x2bc5fd.CHART + " *STATUS ANTIDELETE* ⌋\n" + ("├─⊷ Status: " + _0x1eda57 + '\x0a') + ("├─⊷ Tracked: " + statusAntideleteState.statusCache.size + '\x0a') + ("├─⊷ Deleted: " + statusAntideleteState.stats.deletedDetected + '\x0a') + ("├─⊷ Media: " + statusAntideleteState.stats.mediaCaptured + '\x0a') + ("├─⊷ Sent: " + statusAntideleteState.stats.sentToDm + "\n╰───");
          await _0x26f5ad.sendMessage(_0x6632a8, {
            text: _0x398d4c
          }, {
            quoted: _0x2b1720
          });
          break;
        }
      case "list":
        {
          const _0xb707c8 = Array.from(statusAntideleteState.deletedStatusCache.values()).slice(-10).reverse();
          if (_0xb707c8.length === 0) await _0x26f5ad.sendMessage(_0x6632a8, {
            text: _0x2bc5fd.U1F4ED + " *Recent Deleted Statuses*\n\nNo deleted statuses recorded yet."
          }, {
            quoted: _0x2b1720
          }); else {
            let _0x2404e7 = _0x2bc5fd.PHONE + " *RECENT DELETED STATUSES (Last 10)*\n\n";
            (_0xb707c8.forEach((_0xc6b7d4, _0x5531d8) => {
              const _0x26a91f = new Date(_0xc6b7d4.timestamp).toLocaleTimeString(), _0x4ea315 = _0xc6b7d4.type.toUpperCase(), _0x29bc78 = _0xc6b7d4.text ? _0xc6b7d4.text.substring(0, 30) + (_0xc6b7d4.text.length > 30 ? "..." : '') : "Media only", _0x4b91ff = _0xc6b7d4.senderNumber || getRealWhatsAppNumber(_0xc6b7d4.senderJid);
              (_0x2404e7 += _0x5531d8 + 1 + '.\x20' + _0x4b91ff + '\x20(' + _0xc6b7d4.pushName + ')\x0a', _0x2404e7 += "   " + _0x2bc5fd.CALENDAR + '\x20' + _0x26a91f + " | " + _0x2bc5fd.NOTE + '\x20' + _0x4ea315 + '\x0a', _0x2404e7 += '\x20\x20\x20' + _0x2bc5fd.CHAT + '\x20' + _0x29bc78 + '\x0a', _0x2404e7 += "   ─────\n");
            }), _0x2404e7 += "\nTotal deleted statuses: " + statusAntideleteState.deletedStatusCache.size, await _0x26f5ad.sendMessage(_0x6632a8, {
              text: _0x2404e7
            }, {
              quoted: _0x2b1720
            }));
          }
          break;
        }
      case "clear":
      case "clean":
        {
          const _0xbf6ecf = statusAntideleteState.statusCache.size, _0x58827b = statusAntideleteState.deletedStatusCache.size, _0x43dafa = statusAntideleteState.mediaCache.size;
          (statusAntideleteState.statusCache.clear(), statusAntideleteState.deletedStatusCache.clear(), statusAntideleteState.mediaCache.clear(), statusAntideleteState.stats = {
            totalStatuses: 0,
            deletedDetected: 0,
            retrieved: 0,
            mediaCaptured: 0,
            sentToDm: 0,
            cacheCleans: 0,
            totalStorageMB: 0
          }, await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
            text: _0x2bc5fd.CLEAN + " *Status Cache Cleared*\n\n• Statuses: " + _0xbf6ecf + "\n• Deleted Statuses: " + _0x58827b + "\n• Media files: " + _0x43dafa + '\x0a\x0aAll\x20status\x20data\x20cleared.\x20System\x20remains\x20ACTIVE.'
          }, {
            quoted: _0x2b1720
          }));
          break;
        }
      case "settings":
        {
          const _0x1efd99 = _0x536c22[1]?.toLowerCase();
          if (!_0x1efd99) {
            const _0xc76359 = "╭─⌈ " + _0x2bc5fd.SETTINGS + " *STATUS ANTIDELETE SETTINGS* ⌋\n│\n├─⊷ *" + _0x4c68dd + "ads settings autoclean on/off*\n│  └⊷ Toggle auto-clean\n├─⊷ *" + _0x4c68dd + "ads settings cleanretrieved on/off*\n│  └⊷ Toggle clean mode\n├─⊷ *" + _0x4c68dd + "ads settings maxage <hours>*\n│  └⊷ Set max age\n├─⊷ *" + _0x4c68dd + "ads settings maxstorage <MB>*\n│  └⊷ Set max storage\n╰⊷ " + getFooter(_0x2b1720.key.participant || _0x2b1720.key.remoteJid);
            await _0x26f5ad.sendMessage(_0x6632a8, {
              text: _0xc76359
            }, {
              quoted: _0x2b1720
            });
            return;
          }
          switch (_0x1efd99) {
            case "autoclean":
              {
                const _0x43305e = _0x536c22[2]?.toLowerCase();
                if (_0x43305e === 'on' || _0x43305e === 'enable') (statusAntideleteState.settings.autoCleanEnabled = true, startAutoClean(), await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: _0x2bc5fd.SUCCESS + " Auto-clean enabled."
                }, {
                  quoted: _0x2b1720
                })); else _0x43305e === "off" || _0x43305e === "disable" ? (statusAntideleteState.settings.autoCleanEnabled = false, statusAntideleteState.cleanupInterval && (clearInterval(statusAntideleteState.cleanupInterval), statusAntideleteState.cleanupInterval = null), await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: _0x2bc5fd.SUCCESS + '\x20Auto-clean\x20disabled.'
                }, {
                  quoted: _0x2b1720
                })) : await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: "Usage: `" + _0x4c68dd + "ads settings autoclean on/off`"
                }, {
                  quoted: _0x2b1720
                });
                break;
              }
            case "cleanretrieved":
              {
                const _0x1f29f5 = _0x536c22[2]?.toLowerCase();
                if (_0x1f29f5 === 'on' || _0x1f29f5 === "enable") (statusAntideleteState.settings.autoCleanRetrieved = true, await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: _0x2bc5fd.SUCCESS + " Clean retrieved enabled."
                }, {
                  quoted: _0x2b1720
                })); else _0x1f29f5 === "off" || _0x1f29f5 === "disable" ? (statusAntideleteState.settings.autoCleanRetrieved = false, await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: _0x2bc5fd.SUCCESS + '\x20Clean\x20retrieved\x20disabled.'
                }, {
                  quoted: _0x2b1720
                })) : await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: "Usage: `" + _0x4c68dd + "ads settings cleanretrieved on/off`"
                }, {
                  quoted: _0x2b1720
                });
                break;
              }
            case "maxage":
              {
                const _0x46f662 = parseInt(_0x536c22[2]);
                if (isNaN(_0x46f662) || _0x46f662 < 1 || _0x46f662 > 720) {
                  await _0x26f5ad.sendMessage(_0x6632a8, {
                    text: _0x2bc5fd.ERROR + '\x20Invalid.\x20Use\x201-720\x20hours.'
                  }, {
                    quoted: _0x2b1720
                  });
                  return;
                }
                (statusAntideleteState.settings.maxAgeHours = _0x46f662, await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: _0x2bc5fd.SUCCESS + '\x20Max\x20age\x20set\x20to\x20' + _0x46f662 + '\x20hours.'
                }, {
                  quoted: _0x2b1720
                }));
                break;
              }
            case 'maxstorage':
              {
                const _0x58e193 = parseInt(_0x536c22[2]);
                if (isNaN(_0x58e193) || _0x58e193 < 10 || _0x58e193 > 5000) {
                  await _0x26f5ad.sendMessage(_0x6632a8, {
                    text: _0x2bc5fd.ERROR + " Invalid. Use 10-5000MB."
                  }, {
                    quoted: _0x2b1720
                  });
                  return;
                }
                (statusAntideleteState.settings.maxStorageMB = _0x58e193, await saveStatusData(), await _0x26f5ad.sendMessage(_0x6632a8, {
                  text: _0x2bc5fd.SUCCESS + " Max storage set to " + _0x58e193 + "MB."
                }, {
                  quoted: _0x2b1720
                }));
                break;
              }
            default:
              await _0x26f5ad.sendMessage(_0x6632a8, {
                text: _0x2bc5fd.ERROR + " Unknown setting. Use `" + _0x4c68dd + "ads settings` for options."
              }, {
                quoted: _0x2b1720
              });
          }
          break;
        }
      case "help":
        {
          const _0x147c87 = "╭─⌈ " + _0x2bc5fd.SEARCH + " *STATUS ANTIDELETE* ⌋\n" + ("├─⊷ *" + _0x4c68dd + "ads private/public/off*\n") + ("├─⊷ *" + _0x4c68dd + 'ads\x20stats*\x0a') + ("├─⊷ *" + _0x4c68dd + "ads list*\n") + ("├─⊷ *" + _0x4c68dd + "ads clear*\n") + ('├─⊷\x20*' + _0x4c68dd + "ads settings*\n╰───");
          await _0x26f5ad.sendMessage(_0x6632a8, {
            text: _0x147c87
          }, {
            quoted: _0x2b1720
          });
          break;
        }
      default:
        {
          const _0x18a6d3 = statusAntideleteState.enabled ? (statusAntideleteState.mode || "private").toUpperCase() : "OFF", _0x4c7408 = "╭─⌈ " + _0x2bc5fd.SEARCH + " *STATUS ANTIDELETE* ⌋\n├─⊷ *Mode:* " + _0x18a6d3 + "\n├─⊷ *" + _0x4c68dd + "ads on*\n│  └⊷ Enable tracking\n├─⊷ *" + _0x4c68dd + "ads off*\n│  └⊷ Disable tracking\n├─⊷ *" + _0x4c68dd + "ads status*\n│  └⊷ View stats\n╰⊷ " + getFooter(_0x2b1720.key.participant || _0x2b1720.key.remoteJid), _0xa5867b = await getGiftedBtnsAds();
          if (isButtonModeEnabled() && _0xa5867b?.sendInteractiveMessage) try {
            await _0xa5867b.sendInteractiveMessage(_0x26f5ad, _0x6632a8, {
              body: {
                text: _0x4c7408
              },
              footer: {
                text: "Current: " + _0x18a6d3
              },
              interactiveButtons: [{
                type: "quick_reply",
                display_text: _0x2bc5fd.SUCCESS + " Enable",
                id: _0x4c68dd + "ads on"
              }, {
                type: "quick_reply",
                display_text: _0x2bc5fd.ERROR + " Disable",
                id: _0x4c68dd + 'ads\x20off'
              }, {
                type: "quick_reply",
                display_text: _0x2bc5fd.CHART + " Status",
                id: _0x4c68dd + "ads status"
              }]
            }, {
              quoted: _0x2b1720
            });
            break;
          } catch (_0x1c108d) {}
          await _0x26f5ad.sendMessage(_0x6632a8, {
            text: _0x4c7408
          }, {
            quoted: _0x2b1720
          });
          break;
        }
    }
  }
};
import _0x2bc5fd from '../../lib/emojis.js';
