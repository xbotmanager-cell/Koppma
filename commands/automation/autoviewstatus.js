import {AUTOMATION} from '../../lib/emojis.js';
import _0x318086 from '../../lib/database.js';
import {getBotName} from '../../lib/botname.js';
const CONFIG_DB_KEY = "autoview_config", DEFAULT_VIEW_CONFIG = {
  enabled: true,
  logs: [],
  totalViewed: 0,
  lastViewed: null,
  consecutiveViews: 0,
  lastSender: null,
  excludedContacts: [],
  settings: {
    rateLimitDelay: 1000,
    markAsSeen: true
  }
}, G = "\u001b[32m", C = "\u001b[36m", Y = "\u001b[33m", R = '\x1b[31m', B = "\u001b[1m", D = "\u001b[2m", X = "\u001b[0m";
function logBox(_0x9dd6c4, _0x690867, _0x44cc75) {
  const _0x91f684 = new Date().toLocaleTimeString('en-US', {
    hour: "2-digit",
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  console.log('' + G + B + AUTOMATION.U1F441_FE0F + "  STATUS" + X + '\x20' + C + _0x9dd6c4 + X + '\x20' + D + _0x690867 + X + '\x20' + G + _0x44cc75 + X + '\x20' + D + _0x91f684 + X);
}
function getMessageType(_0x1a300f) {
  if (!_0x1a300f) return D + "stub" + X;
  const _0xffaf08 = {
    imageMessage: AUTOMATION.U1F5BC_FE0F + "  Image",
    videoMessage: AUTOMATION.U1F3A5 + "  Video",
    extendedTextMessage: AUTOMATION.U1F4DD + "  Text",
    conversation: AUTOMATION.U1F4AC + "  Text",
    audioMessage: AUTOMATION.U1F3B5 + "  Audio",
    stickerMessage: AUTOMATION.U1F3AD + "  Sticker",
    documentMessage: AUTOMATION.U1F4C4 + "  Document",
    reactionMessage: AUTOMATION.U1F62E + "  Reaction",
    protocolMessage: AUTOMATION.U1F527 + "  Protocol"
  }, _0x4dcadd = Object.keys(_0x1a300f)[0];
  return _0xffaf08[_0x4dcadd] || AUTOMATION.U1F4E6 + '\x20\x20' + _0x4dcadd;
}
class AutoViewManager {
  constructor() {
    (this.config = this.loadConfig(), this.lastViewTime = 0, this.queue = [], this._draining = false, this._saveTimer = null, this._pendingViews = new Set(), this._viewedStatuses = new Set());
  }
  ["loadConfig"]() {
    try {
      const _0x2c8b51 = _0x318086.getConfigSync(CONFIG_DB_KEY, DEFAULT_VIEW_CONFIG);
      if (!Array.isArray(_0x2c8b51.excludedContacts)) _0x2c8b51.excludedContacts = [];
      return {
        ...DEFAULT_VIEW_CONFIG,
        ..._0x2c8b51,
        settings: {
          ...DEFAULT_VIEW_CONFIG.settings,
          ..._0x2c8b51.settings || ({})
        }
      };
    } catch {
      return {
        ...DEFAULT_VIEW_CONFIG
      };
    }
  }
  ["saveConfig"]() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      try {
        _0x318086.setConfig(CONFIG_DB_KEY, this.config).catch(() => {});
      } catch {}
      this._saveTimer = null;
    }, 3000);
  }
  ['saveConfigImmediate']() {
    this._saveTimer && (clearTimeout(this._saveTimer), this._saveTimer = null);
    try {
      _0x318086.setConfig(CONFIG_DB_KEY, this.config).catch(() => {});
    } catch {}
  }
  get ['enabled']() {
    return this.config.enabled;
  }
  get ["logs"]() {
    return this.config.logs;
  }
  get ['totalViewed']() {
    return this.config.totalViewed;
  }
  ["_normalizeNum"](_0x59bf1c) {
    return String(_0x59bf1c).replace(/[^0-9]/g, '');
  }
  ["isExcluded"](_0x52ab5a) {
    const _0x418ab4 = this.config.excludedContacts;
    if (!_0x418ab4 || _0x418ab4.length === 0) return false;
    const _0x587511 = (_0x52ab5a.participant || _0x52ab5a.remoteJid || '').split('@')[0].split(':')[0], _0x445e00 = _0x52ab5a.remoteJidAlt ? _0x52ab5a.remoteJidAlt.split('@')[0] : null;
    return _0x418ab4.some(_0x4e9100 => _0x4e9100 === _0x587511 || _0x445e00 && _0x4e9100 === _0x445e00);
  }
  ["excludeContact"](_0xde2c7b) {
    const _0xf067f5 = this._normalizeNum(_0xde2c7b);
    if (!_0xf067f5) return false;
    if (!this.config.excludedContacts.includes(_0xf067f5)) return (this.config.excludedContacts.push(_0xf067f5), this.saveConfigImmediate(), true);
    return false;
  }
  ["includeContact"](_0x2adf3b) {
    const _0x596105 = this._normalizeNum(_0x2adf3b), _0x15996d = this.config.excludedContacts.indexOf(_0x596105);
    if (_0x15996d !== -1) return (this.config.excludedContacts.splice(_0x15996d, 1), this.saveConfigImmediate(), true);
    return false;
  }
  ["toggle"](_0x55c941 = false) {
    return (this.config.enabled = !_0x55c941, this.saveConfigImmediate(), this.config.enabled);
  }
  ["addLog"](_0x4acd92) {
    const _0x43624c = {
      sender: _0x4acd92,
      timestamp: Date.now()
    };
    (this.config.logs.push(_0x43624c), this.config.totalViewed++, this.config.lastViewed = _0x43624c, this.config.consecutiveViews = this.config.lastSender === _0x4acd92 ? this.config.consecutiveViews + 1 : 1, this.config.lastSender = _0x4acd92);
    if (this.config.logs.length > 100) this.config.logs.shift();
    this.saveConfig();
  }
  ["clearLogs"]() {
    (Object.assign(this.config, {
      logs: [],
      totalViewed: 0,
      lastViewed: null,
      consecutiveViews: 0,
      lastSender: null
    }), this.saveConfigImmediate());
  }
  ["getStats"]() {
    return {
      enabled: this.config.enabled,
      totalViewed: this.config.totalViewed,
      lastViewed: this.config.lastViewed,
      consecutiveViews: this.config.consecutiveViews,
      excludedCount: this.config.excludedContacts.length,
      settings: {
        ...this.config.settings
      }
    };
  }
  async ['viewStatus'](_0x454caf, _0x1908e1, _0xa4c859) {
    try {
      if (!_0x1908e1 || _0x1908e1.fromMe) return false;
      const _0x3784db = _0xa4c859 ? Object.keys(_0xa4c859)[0] : null;
      if (_0x3784db === 'reactionMessage' || _0x3784db === "protocolMessage") return false;
      const _0x2ce5a7 = _0x1908e1.participantPn || _0x1908e1.remoteJidAlt || _0x1908e1.participant || _0x1908e1.remoteJid;
      if (!_0x2ce5a7 || !_0x1908e1.id) return false;
      const _0x48937d = '+' + _0x2ce5a7.split('@')[0].split(':')[0], _0x39229b = getMessageType(_0xa4c859);
      if (!this.config.enabled || !this.config.settings.markAsSeen) return (logBox(_0x48937d, _0x39229b, Y + "SKIPPED — autoview OFF" + X), false);
      if (this.isExcluded(_0x1908e1)) return (logBox(_0x48937d, _0x39229b, Y + "SKIPPED — excluded" + X), false);
      const _0xaa637b = _0x1908e1.id + '|' + (_0x1908e1.participantPn || _0x1908e1.remoteJidAlt || _0x1908e1.participant || '');
      if (this._pendingViews.has(_0xaa637b) || this._viewedStatuses.has(_0xaa637b)) return false;
      return (this._pendingViews.add(_0xaa637b), this.queue.push({
        sock: _0x454caf,
        statusKey: _0x1908e1,
        displayId: _0x48937d
      }), this._drain(), true);
    } catch (_0x3e0244) {
      return (console.error("autoviewstatus error:", _0x3e0244.message), false);
    }
  }
  ["_drain"]() {
    if (this._draining) return;
    (this._draining = true, this._processNext().catch(_0x94e186 => {
      (console.error("[AUTOVIEW] Queue error:", _0x94e186.message), this._draining = false);
      if (this.queue.length) setImmediate(() => this._drain());
    }));
  }
  async ['_processNext']() {
    while (this.queue.length > 0) {
      const {sock: _0x7c647b, statusKey: _0x1db9b3, displayId: _0x293134} = this.queue.shift(), _0x2bc0ef = _0x1db9b3.id + '|' + (_0x1db9b3.participantPn || _0x1db9b3.remoteJidAlt || _0x1db9b3.participant || ''), _0x1a09c0 = this.config.settings.rateLimitDelay - (Date.now() - this.lastViewTime);
      if (_0x1a09c0 > 0) await new Promise(_0x5c2a8a => setTimeout(_0x5c2a8a, _0x1a09c0));
      let _0x3d0ae0 = false;
      for (let _0x13785a = 0; _0x13785a < 3 && !_0x3d0ae0; _0x13785a++) {
        if (_0x13785a) await new Promise(_0x12dea6 => setTimeout(_0x12dea6, 1000 * _0x13785a));
        _0x3d0ae0 = await this._sendReceipt(_0x7c647b, _0x1db9b3, _0x293134);
      }
      (this._pendingViews.delete(_0x2bc0ef), _0x3d0ae0 && (this._viewedStatuses.add(_0x2bc0ef), this._viewedStatuses.size > 2000 && (this._viewedStatuses = new Set(Array.from(this._viewedStatuses).slice(-1000)))));
    }
    this._draining = false;
  }
  async ["_sendReceipt"](_0x32e183, _0x3c95fc, _0xc8483a) {
    const _0x2afe2e = _0x3c95fc.participantPn || _0x3c95fc.remoteJidAlt || (_0x3c95fc.participant && !_0x3c95fc.participant.includes("@lid") ? _0x3c95fc.participant : null) || _0x3c95fc.participant || _0x3c95fc.remoteJid, _0x15ed50 = {
      remoteJid: 'status@broadcast',
      id: _0x3c95fc.id,
      fromMe: false,
      participant: _0x2afe2e
    };
    try {
      return (await _0x32e183.readMessages([_0x15ed50]), this.lastViewTime = Date.now(), this.addLog(_0xc8483a), true);
    } catch (_0x5f59c8) {
      return (console.log('' + R + B + AUTOMATION.U274C + " VIEW FAILED for " + _0xc8483a + ':\x20' + _0x5f59c8.message + X), false);
    }
  }
  async ["viewGroupStatusMention"](_0x3c4200, _0x2a2499) {
    try {
      if (!this.config.enabled || !this.config.settings.markAsSeen) return false;
      if (!_0x2a2499?.key || _0x2a2499.key.fromMe) return false;
      const _0x187897 = (_0x2a2499.key.participant || _0x2a2499.key.remoteJid || '').split('@')[0].split(':')[0], _0x3542f3 = '+' + _0x187897;
      if (this.isExcluded(_0x2a2499.key)) return (logBox(_0x3542f3, AUTOMATION.U1F465 + " GSM", Y + 'SKIPPED\x20—\x20excluded' + X), false);
      return (await _0x3c4200.readMessages([{
        remoteJid: _0x2a2499.key.remoteJid,
        id: _0x2a2499.key.id,
        fromMe: false,
        participant: _0x2a2499.key.participant || _0x2a2499.key.remoteJid
      }]), this.lastViewTime = Date.now(), this.addLog(_0x3542f3), logBox(_0x3542f3, AUTOMATION.U1F465 + " GSM", "VIEWED"), true);
    } catch (_0x3508a0) {
      return false;
    }
  }
  ["updateSetting"](_0x5985d0, _0x4c1edc) {
    if (Object.prototype.hasOwnProperty.call(this.config.settings, _0x5985d0)) return (this.config.settings[_0x5985d0] = _0x4c1edc, this.saveConfigImmediate(), true);
    return false;
  }
}
const autoViewManager = new AutoViewManager();
globalThis._autoViewReload = () => {
  try {
    autoViewManager.config = autoViewManager.loadConfig();
  } catch {}
};
export async function handleAutoView(_0x1a0991, _0x5cc7fe, _0x48cd41) {
  return await autoViewManager.viewStatus(_0x1a0991, _0x5cc7fe, _0x48cd41);
}
export {autoViewManager};
export default {
  name: 'autoviewstatus',
  alias: ["autoview", "viewstatus", "statusview", 'vs', "views"],
  desc: "Automatically view (mark as seen) WhatsApp statuses " + AUTOMATION.U1F441_FE0F,
  category: "Automation",
  ownerOnly: false,
  async execute(_0x1a675f, _0x43a7cf, _0x420bd0, _0xcc346a, _0x121016) {
    try {
      const _0x22d04c = _0x121016?.isOwner?.() || false, _0x315710 = _0x332d69 => _0x1a675f.sendMessage(_0x43a7cf.key.remoteJid, {
        text: _0x332d69
      }, {
        quoted: _0x43a7cf
      });
      if (_0x420bd0.length === 0) {
        let _0xfbff66 = "╭─⌈ " + AUTOMATION.U1F441_FE0F + '\x20*AUTOVIEWSTATUS*\x20⌋\x0a│\x0a';
        (_0xfbff66 += "├─⊷ *" + _0xcc346a + "autoviewstatus on/off*\n│  └⊷ Enable / disable\n", _0xfbff66 += "├─⊷ *" + _0xcc346a + 'autoviewstatus\x20exclude\x20<number>*\x0a│\x20\x20└⊷\x20Skip\x20a\x20contact\x0a', _0xfbff66 += '├─⊷\x20*' + _0xcc346a + 'autoviewstatus\x20include\x20<number>*\x0a│\x20\x20└⊷\x20Remove\x20from\x20skip\x20list\x0a', _0xfbff66 += "├─⊷ *" + _0xcc346a + "autoviewstatus excluded*\n│  └⊷ Show skip list\n", _0xfbff66 += "├─⊷ *" + _0xcc346a + 'autoviewstatus\x20stats*\x0a│\x20\x20└⊷\x20Statistics\x0a', _0xfbff66 += '╰⊷\x20*Powered\x20by\x20' + getBotName().toUpperCase() + '*', await _0x315710(_0xfbff66));
        return;
      }
      const _0x19b514 = _0x420bd0[0].toLowerCase();
      switch (_0x19b514) {
        case 'on':
        case 'enable':
        case 'start':
          {
            if (!_0x22d04c) {
              await _0x315710(AUTOMATION.U274C + '\x20Owner\x20only!');
              return;
            }
            (autoViewManager.toggle(false), await _0x315710(AUTOMATION.U2705 + '\x20*AUTOVIEWSTATUS\x20ENABLED*\x0a\x0a' + AUTOMATION.U1F441_FE0F + '\x20Will\x20now\x20automatically\x20view\x20statuses!'));
            break;
          }
        case "off":
        case "disable":
        case "stop":
          {
            if (!_0x22d04c) {
              await _0x315710(AUTOMATION.U274C + '\x20Owner\x20only!');
              return;
            }
            (autoViewManager.toggle(true), await _0x315710(AUTOMATION.U274C + " *AUTOVIEWSTATUS DISABLED*"));
            break;
          }
        case "exclude":
        case "skip":
        case "block":
          {
            if (!_0x22d04c) {
              await _0x315710(AUTOMATION.U274C + " Owner only!");
              return;
            }
            const _0x3a4c56 = _0x420bd0[1];
            if (!_0x3a4c56) {
              await _0x315710("Usage: *" + _0xcc346a + "autoviewstatus exclude <number>*\nExample: " + _0xcc346a + "autoviewstatus exclude 254703123456");
              return;
            }
            if (autoViewManager.excludeContact(_0x3a4c56)) {
              const _0x5b9af0 = _0x3a4c56.replace(/[^0-9]/g, '');
              await _0x315710(AUTOMATION.U2705 + " *Excluded from auto-view*\n\n" + AUTOMATION.U1F6AB + '\x20' + _0x5b9af0 + '\x0a\x0aTheir\x20statuses\x20will\x20be\x20silently\x20skipped.');
            } else await _0x315710(AUTOMATION.U26A0_FE0F + '\x20' + _0x3a4c56.replace(/[^0-9]/g, '') + '\x20is\x20already\x20on\x20the\x20skip\x20list.');
            break;
          }
        case "include":
        case "unexclude":
        case "unblock":
        case "unskip":
          {
            if (!_0x22d04c) {
              await _0x315710(AUTOMATION.U274C + " Owner only!");
              return;
            }
            const _0x37e3a9 = _0x420bd0[1];
            if (!_0x37e3a9) {
              await _0x315710("Usage: *" + _0xcc346a + "autoviewstatus include <number>*");
              return;
            }
            if (autoViewManager.includeContact(_0x37e3a9)) {
              const _0x14dfcf = _0x37e3a9.replace(/[^0-9]/g, '');
              await _0x315710(AUTOMATION.U2705 + " *Removed from skip list*\n\n" + AUTOMATION.U1F441_FE0F + '\x20' + _0x14dfcf + " will now be auto-viewed again.");
            } else await _0x315710(AUTOMATION.U26A0_FE0F + '\x20' + _0x37e3a9.replace(/[^0-9]/g, '') + " was not on the skip list.");
            break;
          }
        case "excluded":
        case "skiplist":
        case 'blocklist':
        case "exclusions":
          {
            const _0x1ad66a = autoViewManager.config.excludedContacts;
            if (!_0x1ad66a.length) {
              await _0x315710(AUTOMATION.U1F4ED + '\x20*No\x20contacts\x20excluded\x20from\x20auto-view.*\x0a\x0aUse\x20*' + _0xcc346a + "autoviewstatus exclude <number>* to skip someone.");
              return;
            }
            let _0x1d344a = AUTOMATION.U1F6AB + " *AUTOVIEW SKIP LIST (" + _0x1ad66a.length + ")*\n\n";
            (_0x1ad66a.forEach((_0x1a71a3, _0x5dcf09) => {
              _0x1d344a += _0x5dcf09 + 1 + ". +" + _0x1a71a3 + '\x0a';
            }), _0x1d344a += '\x0aUse\x20*' + _0xcc346a + "autoviewstatus include <number>* to remove.", await _0x315710(_0x1d344a));
            break;
          }
        case 'stats':
        case "statistics":
        case "info":
          {
            const _0x7912fe = autoViewManager.getStats();
            let _0xd363dc = AUTOMATION.U1F4CA + '\x20*AUTOVIEWSTATUS\x20STATS*\x0a\x0a';
            (_0xd363dc += AUTOMATION.U1F7E2 + " Status   : " + (_0x7912fe.enabled ? 'ACTIVE\x20${AUTOMATION.U2705}' : 'INACTIVE\x20${AUTOMATION.U274C}') + '\x0a', _0xd363dc += AUTOMATION.U1F441_FE0F + " Viewed   : *" + _0x7912fe.totalViewed + '*\x0a', _0xd363dc += AUTOMATION.U1F504 + " Streak   : " + _0x7912fe.consecutiveViews + '\x0a', _0xd363dc += AUTOMATION.U1F6AB + '\x20Excluded\x20:\x20' + _0x7912fe.excludedCount + '\x0a', _0xd363dc += AUTOMATION.U2699_FE0F + " Delay    : " + _0x7912fe.settings.rateLimitDelay + "ms\n");
            if (_0x7912fe.lastViewed) {
              const _0xfd15a4 = Math.floor((Date.now() - _0x7912fe.lastViewed.timestamp) / 60000);
              _0xd363dc += '\x0a' + AUTOMATION.U1F552 + '\x20Last:\x20' + _0x7912fe.lastViewed.sender + '\x20(' + (_0xfd15a4 < 1 ? "just now" : _0xfd15a4 + " min ago") + ')';
            }
            await _0x315710(_0xd363dc);
            break;
          }
        case "logs":
        case "history":
          {
            const _0x4a3f67 = autoViewManager.logs.slice(-10).reverse();
            if (!_0x4a3f67.length) {
              await _0x315710(AUTOMATION.U1F4ED + " No statuses viewed yet.");
              return;
            }
            let _0x17910a = AUTOMATION.U1F4CB + '\x20*RECENT\x20VIEWS*\x0a\x0a';
            (_0x4a3f67.forEach((_0x1084a6, _0x29aa8d) => {
              _0x17910a += _0x29aa8d + 1 + '.\x20' + _0x1084a6.sender + " — " + new Date(_0x1084a6.timestamp).toLocaleTimeString() + '\x0a';
            }), _0x17910a += '\x0a' + AUTOMATION.U1F4CA + " Total: " + autoViewManager.totalViewed, await _0x315710(_0x17910a));
            break;
          }
        case "reset":
          {
            if (!_0x22d04c) {
              await _0x315710(AUTOMATION.U274C + " Owner only!");
              return;
            }
            (autoViewManager.clearLogs(), await _0x315710(AUTOMATION.U1F5D1_FE0F + " Stats reset."));
            break;
          }
        case "delay":
          {
            const _0x11d9bf = parseInt(_0x420bd0[1]);
            if (isNaN(_0x11d9bf) || _0x11d9bf < 200) {
              await _0x315710(AUTOMATION.U274C + " Min 200ms");
              return;
            }
            (autoViewManager.updateSetting("rateLimitDelay", _0x11d9bf), await _0x315710(AUTOMATION.U2705 + " Delay set to " + _0x11d9bf + 'ms'));
            break;
          }
        default:
          await _0x315710("╭─⌈ " + AUTOMATION.U2753 + " *AUTOVIEWSTATUS* ⌋\n│\n├─⊷ *" + _0xcc346a + "autoviewstatus on/off*\n├─⊷ *" + _0xcc346a + 'autoviewstatus\x20exclude\x20<number>*\x0a├─⊷\x20*' + _0xcc346a + "autoviewstatus include <number>*\n├─⊷ *" + _0xcc346a + "autoviewstatus excluded*\n├─⊷ *" + _0xcc346a + "autoviewstatus stats*\n├─⊷ *" + _0xcc346a + "autoviewstatus logs*\n├─⊷ *" + _0xcc346a + "autoviewstatus delay <ms>*\n╰⊷ *Powered by " + getBotName().toUpperCase() + '*');
      }
    } catch (_0x536d95) {
      (console.error("AutoViewStatus error:", _0x536d95), await _0x1a675f.sendMessage(_0x43a7cf.key.remoteJid, {
        text: AUTOMATION.U274C + '\x20' + _0x536d95.message
      }, {
        quoted: _0x43a7cf
      }));
    }
  }
};
