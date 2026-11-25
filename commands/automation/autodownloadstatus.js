import {AUTOMATION} from '../../lib/emojis.js';
import {downloadMediaMessage, normalizeMessageContent, jidNormalizedUser} from 'wolfsocket';
import _0x34740c from '../../lib/database.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const CONFIG_DB_KEY = "autodownloadstatus_config", DEFAULT_CONFIG = {
  enabled: false,
  mode: "private",
  publicJid: '',
  ownerJid: '',
  downloadTypes: ["image", "video", 'audio', "document", 'sticker', "text"],
  excludedContacts: [],
  skipOwnerStatus: true,
  totalDownloaded: 0,
  logs: []
};
class AutoDownloadStatusManager {
  constructor() {
    (this.config = this.loadConfig(), this._saveTimer = null, this._downloadedIds = new Set(this.config.downloadedIds || []));
  }
  ['loadConfig']() {
    try {
      const _0x5bdaa1 = _0x34740c.getConfigSync(CONFIG_DB_KEY, DEFAULT_CONFIG);
      if (!Array.isArray(_0x5bdaa1.excludedContacts)) _0x5bdaa1.excludedContacts = [];
      if (!Array.isArray(_0x5bdaa1.downloadTypes)) _0x5bdaa1.downloadTypes = [...DEFAULT_CONFIG.downloadTypes];
      if (!Array.isArray(_0x5bdaa1.logs)) _0x5bdaa1.logs = [];
      return {
        ...DEFAULT_CONFIG,
        ..._0x5bdaa1
      };
    } catch {
      return {
        ...DEFAULT_CONFIG
      };
    }
  }
  ["saveConfig"]() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      try {
        (this.config.downloadedIds = Array.from(this._downloadedIds).slice(-300), _0x34740c.setConfig(CONFIG_DB_KEY, this.config).catch(() => {}));
      } catch {}
      this._saveTimer = null;
    }, 3000);
  }
  ['saveImmediate']() {
    this._saveTimer && (clearTimeout(this._saveTimer), this._saveTimer = null);
    try {
      (this.config.downloadedIds = Array.from(this._downloadedIds).slice(-300), _0x34740c.setConfig(CONFIG_DB_KEY, this.config).catch(() => {}));
    } catch {}
  }
  get ["enabled"]() {
    return this.config.enabled;
  }
  get ["mode"]() {
    return this.config.mode;
  }
  ['_num'](_0xe3c3c8) {
    return String(_0xe3c3c8).replace(/[^0-9]/g, '');
  }
  ["isExcluded"](_0xbf9d70) {
    const _0x2c828b = this.config.excludedContacts;
    if (!_0x2c828b.length) return false;
    const _0x2783ae = (_0xbf9d70.participantPn || _0xbf9d70.participant || _0xbf9d70.remoteJid || '').split('@')[0].split(':')[0], _0x2b6684 = _0xbf9d70.remoteJidAlt ? _0xbf9d70.remoteJidAlt.split('@')[0] : null;
    return _0x2c828b.some(_0x5e7865 => _0x5e7865 === _0x2783ae || _0x2b6684 && _0x5e7865 === _0x2b6684);
  }
  ['hasDownloaded'](_0x275d7d) {
    return this._downloadedIds.has(_0x275d7d);
  }
  ["markDownloaded"](_0x175d0a) {
    this._downloadedIds.add(_0x175d0a);
    if (this._downloadedIds.size > 400) {
      const _0xe39604 = Array.from(this._downloadedIds);
      this._downloadedIds = new Set(_0xe39604.slice(-200));
    }
    this.saveConfig();
  }
  ["addLog"](_0x4e5614, _0x18e33d) {
    const _0x1ca496 = {
      sender: _0x4e5614,
      type: _0x18e33d,
      timestamp: Date.now()
    };
    (this.config.logs.push(_0x1ca496), this.config.totalDownloaded++);
    if (this.config.logs.length > 100) this.config.logs.shift();
    this.saveConfig();
  }
  ["excludeContact"](_0x43c371) {
    const _0x4c0d00 = this._num(_0x43c371);
    if (!_0x4c0d00) return false;
    if (!this.config.excludedContacts.includes(_0x4c0d00)) return (this.config.excludedContacts.push(_0x4c0d00), this.saveImmediate(), true);
    return false;
  }
  ['includeContact'](_0x331d49) {
    const _0x5d9474 = this._num(_0x331d49), _0x1476f0 = this.config.excludedContacts.indexOf(_0x5d9474);
    if (_0x1476f0 !== -1) return (this.config.excludedContacts.splice(_0x1476f0, 1), this.saveImmediate(), true);
    return false;
  }
  ['hasType'](_0x256db4) {
    return this.config.downloadTypes.includes(_0x256db4);
  }
  ["setOwnerJid"](_0x59772c) {
    (this.config.ownerJid = _0x59772c, this.saveImmediate());
  }
  ["getStats"]() {
    return {
      enabled: this.config.enabled,
      mode: this.config.mode,
      publicJid: this.config.publicJid || "not set",
      types: this.config.downloadTypes.join(',\x20'),
      total: this.config.totalDownloaded,
      excluded: this.config.excludedContacts.length,
      lastLog: this.config.logs.at(-1) || null,
      skipOwn: this.config.skipOwnerStatus
    };
  }
}
const manager = new AutoDownloadStatusManager();
export {manager as autoDownloadStatusManager};
globalThis._autoDownloadReload = () => {
  try {
    manager.config = manager.loadConfig();
  } catch {}
};
const _statusCache = new Map(), STATUS_CACHE_MAX = 300, STATUS_CACHE_TTL = 23 * 60 * 60 * 1000;
function _pruneCache() {
  const _0x15e530 = Date.now();
  for (const [_0x5a17f3, _0x55087f] of _statusCache) {
    if (_0x15e530 - _0x55087f.cachedAt > STATUS_CACHE_TTL) _statusCache.delete(_0x5a17f3);
  }
  if (_statusCache.size > STATUS_CACHE_MAX) {
    const _0x1ffb99 = [..._statusCache.keys()].slice(0, _statusCache.size - STATUS_CACHE_MAX);
    _0x1ffb99.forEach(_0x7409b0 => _statusCache.delete(_0x7409b0));
  }
}
export function cacheStatusMessage(_0x5123d7, _0x39c191, _0x431e80) {
  if (!_0x5123d7 || !_0x431e80) return;
  _statusCache.set(_0x5123d7, {
    statusKey: _0x39c191,
    resolvedMessage: _0x431e80,
    cachedAt: Date.now()
  });
  if (_statusCache.size > STATUS_CACHE_MAX + 50) _pruneCache();
}
export function isStatusCached(_0x4e56ee) {
  if (!_0x4e56ee) return false;
  return _statusCache.has(_0x4e56ee);
}
function getMediaInfo(_0x1a3b74) {
  if (!_0x1a3b74) return null;
  if (_0x1a3b74.imageMessage) return {
    type: "image",
    media: _0x1a3b74.imageMessage,
    caption: _0x1a3b74.imageMessage.caption || ''
  };
  if (_0x1a3b74.videoMessage) return {
    type: 'video',
    media: _0x1a3b74.videoMessage,
    caption: _0x1a3b74.videoMessage.caption || ''
  };
  if (_0x1a3b74.audioMessage) return {
    type: 'audio',
    media: _0x1a3b74.audioMessage,
    caption: ''
  };
  if (_0x1a3b74.stickerMessage) return {
    type: "sticker",
    media: _0x1a3b74.stickerMessage,
    caption: ''
  };
  if (_0x1a3b74.documentMessage) return {
    type: "document",
    media: _0x1a3b74.documentMessage,
    caption: _0x1a3b74.documentMessage.caption || ''
  };
  return null;
}
function getTextInfo(_0x119421) {
  if (!_0x119421) return null;
  const _0x390c4a = _0x119421.extendedTextMessage?.text || _0x119421.conversation;
  return _0x390c4a ? {
    type: "text",
    text: _0x390c4a
  } : null;
}
function getRealNumber(_0x56a1fc) {
  if (!_0x56a1fc) return "Unknown";
  const _0x1ab773 = _0x56a1fc.split('@')[0].split(':')[0].replace(/[^\d]/g, '');
  return _0x1ab773.length >= 7 ? '+' + _0x1ab773 : _0x56a1fc.split('@')[0];
}
export async function handleAutoDownloadStatus(_0x410736, _0x36c8a2, _0x3ad9f1) {
  try {
    if (!manager.enabled) return;
    if (!_0x3ad9f1) return;
    if (_0x36c8a2.fromMe) return;
    const _0x235b72 = _0x36c8a2.id;
    if (!_0x235b72) return;
    if (manager.hasDownloaded(_0x235b72)) return;
    if (manager.isExcluded(_0x36c8a2)) return;
    const _0x5b5787 = normalizeMessageContent(_0x3ad9f1) || _0x3ad9f1;
    if (!_0x5b5787) return;
    if (_0x5b5787.protocolMessage || _0x5b5787.reactionMessage || _0x5b5787.messageStubType) return;
    const _0x2b4247 = getMediaInfo(_0x5b5787), _0x2700a1 = getTextInfo(_0x5b5787);
    if (!_0x2b4247 && !_0x2700a1) return;
    const _0x3ae824 = _0x2b4247?.type || 'text';
    if (!manager.hasType(_0x3ae824)) return;
    const _0x48f16f = _0x36c8a2.participantPn || _0x36c8a2.remoteJidAlt || _0x36c8a2.participant || _0x36c8a2.remoteJid, _0x4b97a8 = getRealNumber(_0x48f16f), _0x1148bf = _0x36c8a2.pushName || '';
    if (manager.config.skipOwnerStatus) {
      const _0x1036e1 = (manager.config.ownerJid || global.OWNER_CLEAN_JID || '').split('@')[0], _0x54e5a2 = _0x48f16f.split('@')[0].split(':')[0];
      if (_0x1036e1 && _0x54e5a2 === _0x1036e1) return;
    }
    let _0x750fbd = '';
    if (manager.config.mode === "private") {
      _0x750fbd = manager.config.ownerJid || global.OWNER_CLEAN_JID || '';
      if (!_0x750fbd) return;
      _0x750fbd = jidNormalizedUser(_0x750fbd);
    } else {
      _0x750fbd = manager.config.publicJid;
      if (!_0x750fbd) return;
    }
    manager.markDownloaded(_0x235b72);
    const _0x5c87cf = new Date().toLocaleTimeString(), _0x43becb = _0x1148bf ? _0x1148bf + '\x20(' + _0x4b97a8 + ')' : _0x4b97a8, _0x349cf9 = {
      level: "silent",
      trace: () => {},
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
      fatal: () => {},
      child: () => ({
        level: 'silent',
        trace: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
        fatal: () => {},
        child: () => ({})
      })
    };
    if (_0x2b4247) {
      const _0x16d3ee = {
        ..._0x2b4247.media
      };
      delete _0x16d3ee.viewOnce;
      let _0x2bc9af;
      try {
        const _0x31332b = {
          key: {
            remoteJid: "status@broadcast",
            id: _0x235b72,
            participant: _0x48f16f,
            fromMe: false
          },
          message: {
            [_0x3ae824 + 'Message']: _0x16d3ee
          }
        };
        _0x2bc9af = await Promise.race([downloadMediaMessage(_0x31332b, "buffer", {}, {
          logger: _0x349cf9,
          reuploadRequest: _0x410736.updateMediaMessage
        }), new Promise((_0x2ff8b1, _0x16fb61) => setTimeout(() => _0x16fb61(new Error('dl_timeout')), 20000))]);
      } catch {
        return;
      }
      if (!_0x2bc9af || _0x2bc9af.length === 0) return;
      let _0x593c22 = "╭─⌈ " + AUTOMATION.U1F4F2 + " *STATUS DOWNLOADED* ⌋\n";
      _0x593c22 += '│\x20' + AUTOMATION.U1F464 + " *From:* " + _0x43becb + '\x0a';
      if (_0x2b4247.caption) _0x593c22 += '│\x20' + AUTOMATION.U1F4AC + " *Caption:* " + _0x2b4247.caption + '\x0a';
      (_0x593c22 += '│\x20' + AUTOMATION.U1F4C1 + '\x20*Type:*\x20' + _0x3ae824 + '\x0a', _0x593c22 += "│ ⏰ *Time:* " + _0x5c87cf + '\x0a', _0x593c22 += "╰⊷ " + getFooter(global.OWNER_CLEAN_JID || ''));
      const _0x1bbcc8 = {};
      if (_0x3ae824 === "sticker") _0x1bbcc8.sticker = _0x2bc9af; else {
        if (_0x3ae824 === "document") (_0x1bbcc8.document = _0x2bc9af, _0x1bbcc8.fileName = _0x2b4247.media.fileName || "status_" + _0x235b72 + ".bin", _0x1bbcc8.mimetype = _0x2b4247.media.mimetype || "application/octet-stream", _0x1bbcc8.caption = _0x593c22); else {
          (_0x1bbcc8[_0x3ae824] = _0x2bc9af, _0x1bbcc8.caption = _0x593c22);
          if (_0x2b4247.media.mimetype) _0x1bbcc8.mimetype = _0x2b4247.media.mimetype;
        }
      }
      (await _0x410736.sendMessage(_0x750fbd, _0x1bbcc8), _0x3ae824 === "sticker" && await _0x410736.sendMessage(_0x750fbd, {
        text: _0x593c22
      }));
    } else {
      if (_0x2700a1) {
        let _0x4df3ad = "╭─⌈ " + AUTOMATION.U1F4F2 + " *STATUS DOWNLOADED* ⌋\n";
        (_0x4df3ad += '│\x20' + AUTOMATION.U1F464 + '\x20*From:*\x20' + _0x43becb + '\x0a', _0x4df3ad += '│\x20' + AUTOMATION.U1F4DD + " *Text:* " + _0x2700a1.text + '\x0a', _0x4df3ad += "│ ⏰ *Time:* " + _0x5c87cf + '\x0a', _0x4df3ad += "╰⊷ " + getFooter(global.OWNER_CLEAN_JID || ''), await _0x410736.sendMessage(_0x750fbd, {
          text: _0x4df3ad
        }));
      }
    }
    (manager.addLog(_0x4b97a8, _0x3ae824), console.log('\x1b[36m[AutoDL-Status]\x20' + AUTOMATION.U2705 + '\x20' + _0x3ae824 + " from " + _0x4b97a8 + " → " + _0x750fbd + "\u001b[0m"));
  } catch (_0x5301d2) {
    !_0x5301d2.message?.includes("dl_timeout") && !_0x5301d2.message?.includes("not-authorized") && console.log("\u001b[31m[AutoDL-Status] " + AUTOMATION.U274C + '\x20' + _0x5301d2.message + '\x1b[0m');
  }
}
export async function triggerSaveFromOwnerReply(_0x32cd6e, _0x4077db) {
  try {
    const _0x920bad = _0x4077db?.stanzaId, _0x35cd6d = _0x4077db?.participant;
    if (!_0x920bad) return;
    !manager.config.ownerJid && global.OWNER_CLEAN_JID && manager.setOwnerJid(global.OWNER_CLEAN_JID);
    const _0x457195 = _statusCache.get(_0x920bad);
    if (!_0x457195) {
      const _0x35632e = manager.config.ownerJid || global.OWNER_CLEAN_JID || '';
      _0x35632e && await _0x32cd6e.sendMessage(_0x35632e, {
        text: AUTOMATION.U26A0_FE0F + " *STATUS NOT FOUND*\nThe status you replied to is no longer in memory (too old or bot was restarted). Please view it again or wait for the next one."
      });
      return;
    }
    const _0x10cc3a = {
      ..._0x457195.statusKey,
      id: _0x920bad,
      participant: _0x35cd6d || _0x457195.statusKey.participant,
      fromMe: false
    };
    manager._downloadedIds.delete(_0x920bad);
    const _0x2610a9 = manager.config.enabled;
    manager.config.enabled = true;
    try {
      await handleAutoDownloadStatus(_0x32cd6e, _0x10cc3a, _0x457195.resolvedMessage);
    } finally {
      manager.config.enabled = _0x2610a9;
    }
  } catch (_0x56f1d6) {
    console.log("\u001b[31m[AutoDL-Status] triggerSaveFromOwnerReply error: " + _0x56f1d6.message + "\u001b[0m");
  }
}
export default {
  name: "autodownloadstatus",
  alias: ["autosave", 'autostatussave', "autodlstatus"],
  desc: "Auto-download statuses to private DM or a public chat",
  category: 'automation',
  ownerOnly: true,
  async execute(_0x2070f3, _0x32910a, _0x409eee, _0x394745, _0x1daf98) {
    const _0x4be55b = _0x32910a.key.remoteJid, _0x4d3b04 = _0x1daf98?.isOwner ? _0x1daf98.isOwner() : false, _0x44c3b1 = _0x1daf98?.isSudo ? _0x1daf98.isSudo() : false;
    if (!_0x4d3b04 && !_0x44c3b1) {
      await _0x2070f3.sendMessage(_0x4be55b, {
        text: AUTOMATION.U274C + '\x20Owner\x20only\x20command'
      }, {
        quoted: _0x32910a
      });
      return;
    }
    const _0x3655c3 = _0x19a15f => _0x2070f3.sendMessage(_0x4be55b, {
      text: _0x19a15f
    }, {
      quoted: _0x32910a
    }), _0x4957fe = (_0x409eee[0] || '').toLowerCase(), _0x11cf39 = (_0x409eee[1] || '').toLowerCase(), _0x89f9eb = jidNormalizedUser(_0x32910a.key.participant || _0x4be55b);
    if (!manager.config.ownerJid) manager.setOwnerJid(_0x89f9eb);
    if (!_0x4957fe) {
      const _0x1ec414 = manager.getStats();
      return _0x3655c3("╭─⌈ " + AUTOMATION.U1F4F2 + " *AUTO-DOWNLOAD STATUS* ⌋\n│\n" + ('│\x20Status\x20:\x20' + (_0x1ec414.enabled ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + '\x0a') + ("│ Mode   : " + (_0x1ec414.mode === "private" ? "${AUTOMATION.U1F512} Private (DM)" : AUTOMATION.U1F310 + " Public (" + _0x1ec414.publicJid + ')') + '\x0a') + ("│ Types  : " + _0x1ec414.types + '\x0a') + ("│ Total  : " + _0x1ec414.total + '\x20downloaded\x0a') + ("│ Skip own status: " + (_0x1ec414.skipOwn ? '${AUTOMATION.U2705}' : '${AUTOMATION.U274C}') + '\x0a') + '│\x0a' + ('├─⊷\x20*' + _0x394745 + 'ads\x20on\x20/\x20off*\x0a') + ('├─⊷\x20*' + _0x394745 + "ads private*  → save to your DM\n") + ("├─⊷ *" + _0x394745 + "ads public <groupJid>*  → save to a chat\n") + ("├─⊷ *" + _0x394745 + 'ads\x20types*\x20\x20→\x20show/set\x20media\x20types\x0a') + ("├─⊷ *" + _0x394745 + "ads exclude <number>*\n") + ("├─⊷ *" + _0x394745 + "ads include <number>*\n") + ('├─⊷\x20*' + _0x394745 + "ads skipown on/off*\n") + ("├─⊷ *" + _0x394745 + 'ads\x20stats*\x0a') + ("╰⊷ " + getFooter(_0x32910a.key.participant || _0x32910a.key.remoteJid)));
    }
    if (['on', "enable"].includes(_0x4957fe)) {
      (manager.config.enabled = true, manager.saveImmediate());
      const _0x5162f2 = manager.getStats();
      return _0x3655c3(AUTOMATION.U2705 + " *AUTO-DOWNLOAD STATUS ENABLED*\nMode: " + (_0x5162f2.mode === 'private' ? "Private DM" : 'Public\x20→\x20' + _0x5162f2.publicJid) + "\nTypes: " + _0x5162f2.types);
    }
    if (["off", "disable"].includes(_0x4957fe)) return (manager.config.enabled = false, manager.saveImmediate(), _0x3655c3(AUTOMATION.U274C + " *AUTO-DOWNLOAD STATUS DISABLED*"));
    if (_0x4957fe === "private") return (manager.config.mode = "private", manager.setOwnerJid(_0x89f9eb), manager.saveImmediate(), _0x3655c3(AUTOMATION.U1F512 + " *PRIVATE MODE*\nStatuses will be saved to your DM."));
    if (_0x4957fe === "public") {
      const _0x3f36f7 = _0x409eee[1] || '';
      if (!_0x3f36f7 || !_0x3f36f7.endsWith("@g.us") && !_0x3f36f7.endsWith("@s.whatsapp.net")) return _0x3655c3("Usage: *" + _0x394745 + "ads public <groupJid>*\nExample: " + _0x394745 + "ads public 1234567890-1234567890@g.us\n\nYou can also reply in the target group and use *" + _0x394745 + "ads public here*");
      return (manager.config.mode = "public", manager.config.publicJid = _0x3f36f7, manager.saveImmediate(), _0x3655c3(AUTOMATION.U1F310 + '\x20*PUBLIC\x20MODE*\x0aStatuses\x20will\x20be\x20forwarded\x20to:\x0a' + _0x3f36f7));
    }
    if (_0x4957fe === "public" && _0x11cf39 === "here" || _0x4957fe === "here") return (manager.config.mode = "public", manager.config.publicJid = _0x4be55b, manager.saveImmediate(), _0x3655c3(AUTOMATION.U1F310 + '\x20*PUBLIC\x20MODE*\x0aStatuses\x20will\x20be\x20forwarded\x20to\x20*this\x20chat*.'));
    if (_0x4957fe === "here") return (manager.config.mode = "public", manager.config.publicJid = _0x4be55b, manager.saveImmediate(), _0x3655c3(AUTOMATION.U1F310 + " *PUBLIC MODE*\nStatuses will be forwarded to *this chat*."));
    if (["exclude", "skip", "block"].includes(_0x4957fe)) {
      const _0x4307e2 = _0x409eee[1];
      if (!_0x4307e2) return _0x3655c3("Usage: *" + _0x394745 + "ads exclude <number>*");
      if (manager.excludeContact(_0x4307e2)) return _0x3655c3(AUTOMATION.U2705 + '\x20' + _0x4307e2.replace(/[^0-9]/g, '') + " excluded — their statuses won't be downloaded.");
      return _0x3655c3(AUTOMATION.U26A0_FE0F + " Already excluded.");
    }
    if (["include", "unexclude", "unblock"].includes(_0x4957fe)) {
      const _0x22b1f0 = _0x409eee[1];
      if (!_0x22b1f0) return _0x3655c3('Usage:\x20*' + _0x394745 + "ads include <number>*");
      if (manager.includeContact(_0x22b1f0)) return _0x3655c3(AUTOMATION.U2705 + '\x20' + _0x22b1f0.replace(/[^0-9]/g, '') + " removed from exclusion list.");
      return _0x3655c3(AUTOMATION.U26A0_FE0F + '\x20Not\x20in\x20exclusion\x20list.');
    }
    if (_0x4957fe === "types") {
      const _0x180240 = ['image', "video", "audio", 'document', "sticker", "text"];
      if (!_0x11cf39) return _0x3655c3(AUTOMATION.U1F4C1 + " *MEDIA TYPES*\n\n" + ('Active:\x20' + manager.config.downloadTypes.join(',\x20') + '\x0a\x0a') + ("Add:    *" + _0x394745 + "ads types add image/video/audio/document/sticker/text*\n") + ('Remove:\x20*' + _0x394745 + "ads types remove video*\n") + ("All:    *" + _0x394745 + 'ads\x20types\x20all*\x0a') + ('Reset:\x20\x20*' + _0x394745 + "ads types reset*"));
      const _0x197a11 = _0x409eee[2]?.toLowerCase();
      if (_0x11cf39 === "all") return (manager.config.downloadTypes = [..._0x180240], manager.saveImmediate(), _0x3655c3(AUTOMATION.U2705 + '\x20All\x20types\x20enabled:\x20' + _0x180240.join(',\x20')));
      if (_0x11cf39 === "reset") return (manager.config.downloadTypes = [...DEFAULT_CONFIG.downloadTypes], manager.saveImmediate(), _0x3655c3(AUTOMATION.U1F504 + " Types reset to defaults: " + manager.config.downloadTypes.join(',\x20')));
      if (_0x11cf39 === "add" && _0x197a11) {
        if (!_0x180240.includes(_0x197a11)) return _0x3655c3(AUTOMATION.U274C + " Unknown type. Choose: " + _0x180240.join(',\x20'));
        if (!manager.config.downloadTypes.includes(_0x197a11)) return (manager.config.downloadTypes.push(_0x197a11), manager.saveImmediate(), _0x3655c3(AUTOMATION.U2705 + " Added *" + _0x197a11 + '*.\x20Active:\x20' + manager.config.downloadTypes.join(',\x20')));
        return _0x3655c3(AUTOMATION.U26A0_FE0F + '\x20*' + _0x197a11 + "* already active.");
      }
      if (_0x11cf39 === "remove" && _0x197a11) {
        const _0x5badea = manager.config.downloadTypes.indexOf(_0x197a11);
        if (_0x5badea !== -1) return (manager.config.downloadTypes.splice(_0x5badea, 1), manager.saveImmediate(), _0x3655c3(AUTOMATION.U2705 + " Removed *" + _0x197a11 + "*. Active: " + manager.config.downloadTypes.join(',\x20')));
        return _0x3655c3(AUTOMATION.U26A0_FE0F + '\x20*' + _0x197a11 + "* not active.");
      }
      return _0x3655c3("Usage: *" + _0x394745 + "ads types add/remove/all/reset <type>*");
    }
    if (_0x4957fe === 'skipown') {
      if (!_0x11cf39) return _0x3655c3('Current:\x20' + (manager.config.skipOwnerStatus ? 'ON' : "OFF") + "\nUsage: *" + _0x394745 + "ads skipown on/off*");
      return (manager.config.skipOwnerStatus = _0x11cf39 === 'on', manager.saveImmediate(), _0x3655c3(AUTOMATION.U2705 + '\x20Skip\x20own\x20status:\x20*' + (manager.config.skipOwnerStatus ? 'ON' : 'OFF') + '*'));
    }
    if (["stats", "status", "info"].includes(_0x4957fe)) {
      const _0x24ba1a = manager.getStats();
      let _0x465810 = AUTOMATION.U1F4CA + " *AUTO-DOWNLOAD STATUS STATS*\n\n";
      (_0x465810 += AUTOMATION.U1F7E2 + " Status     : " + (_0x24ba1a.enabled ? 'ACTIVE\x20${AUTOMATION.U2705}' : 'INACTIVE\x20${AUTOMATION.U274C}') + '\x0a', _0x465810 += AUTOMATION.U1F4E4 + " Mode       : " + (_0x24ba1a.mode === "private" ? "Private DM" : 'Public\x20→\x20' + _0x24ba1a.publicJid) + '\x0a', _0x465810 += AUTOMATION.U1F4C1 + " Types      : " + _0x24ba1a.types + '\x0a', _0x465810 += AUTOMATION.U1F4E5 + " Total      : *" + _0x24ba1a.total + '*\x20statuses\x20downloaded\x0a', _0x465810 += AUTOMATION.U1F6AB + " Excluded   : " + _0x24ba1a.excluded + '\x20contacts\x0a', _0x465810 += AUTOMATION.U1F648 + '\x20Skip\x20own\x20\x20\x20:\x20' + (_0x24ba1a.skipOwn ? "Yes" : 'No') + '\x0a');
      if (_0x24ba1a.lastLog) {
        const _0xfa3f5 = Math.floor((Date.now() - _0x24ba1a.lastLog.timestamp) / 60000);
        _0x465810 += '\x0a' + AUTOMATION.U1F552 + " Last: " + _0x24ba1a.lastLog.sender + '\x20(' + _0x24ba1a.lastLog.type + ") — " + (_0xfa3f5 < 1 ? 'just\x20now' : _0xfa3f5 + '\x20min\x20ago');
      }
      return _0x3655c3(_0x465810);
    }
    if (["clear", "reset"].includes(_0x4957fe)) return (manager.config.totalDownloaded = 0, manager.config.logs = [], manager._downloadedIds.clear(), manager.saveImmediate(), _0x3655c3(AUTOMATION.U1F504 + '\x20Download\x20history\x20cleared.'));
    return _0x3655c3(AUTOMATION.U274C + " Unknown option. Use *" + _0x394745 + "ads* to see available commands.");
  }
};
