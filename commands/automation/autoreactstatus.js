import {AUTOMATION} from '../../lib/emojis.js';
import _0x4a822e from '../../lib/database.js';
import {getBotName} from '../../lib/botname.js';
const CONFIG_DB_KEY = "autoreact_config", DEFAULT_REACT_CONFIG = {
  enabled: true,
  onlyOnOwnerReply: false,
  viewMode: "view+react",
  mode: 'fixed',
  fixedEmoji: '' + AUTOMATION.U1F43A,
  reactions: ['' + AUTOMATION.U1F43A, '' + AUTOMATION.U2764_FE0F, '' + AUTOMATION.U1F44D, '' + AUTOMATION.U1F525, '' + AUTOMATION.U1F389, '' + AUTOMATION.U1F602, '' + AUTOMATION.U1F62E, '' + AUTOMATION.U1F44F, '' + AUTOMATION.U1F3AF, '' + AUTOMATION.U1F4AF, '' + AUTOMATION.U1F31F, '' + AUTOMATION.U2728, '' + AUTOMATION.U26A1, '' + AUTOMATION.U1F4A5, '' + AUTOMATION.U1FAF6],
  cycleIndex: 0,
  excludedContacts: [],
  logs: [],
  totalReacted: 0,
  lastReacted: null,
  consecutiveReactions: 0,
  lastSender: null,
  lastReactionTime: 0,
  reactedStatuses: [],
  settings: {
    rateLimitDelay: 2000,
    reactToAll: true,
    ignoreConsecutiveLimit: true,
    noHourlyLimit: true
  }
};
class AutoReactManager {
  constructor() {
    (this.config = this.loadConfig(), this.lastReactionTime = this.config.lastReactionTime || 0, this.reactedStatuses = new Set(this.config.reactedStatuses || []), this._queue = [], this._draining = false, this._pendingReactions = new Set(), this._saveTimer = null, this.cleanupOldReactedStatuses());
  }
  ["loadConfig"]() {
    try {
      const _0x524755 = _0x4a822e.getConfigSync(CONFIG_DB_KEY, DEFAULT_REACT_CONFIG);
      (_0x524755.reactedStatuses = _0x524755.reactedStatuses || [], _0x524755.lastReactionTime = _0x524755.lastReactionTime || 0, _0x524755.viewMode = _0x524755.viewMode || 'view+react', _0x524755.cycleIndex = _0x524755.cycleIndex || 0, _0x524755.onlyOnOwnerReply = Boolean(_0x524755.onlyOnOwnerReply));
      if (!Array.isArray(_0x524755.excludedContacts)) _0x524755.excludedContacts = [];
      return {
        ...DEFAULT_REACT_CONFIG,
        ..._0x524755
      };
    } catch {
      return {
        ...DEFAULT_REACT_CONFIG
      };
    }
  }
  ["saveConfig"]() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      try {
        (this.config.reactedStatuses = Array.from(this.reactedStatuses), this.config.lastReactionTime = this.lastReactionTime, _0x4a822e.setConfig(CONFIG_DB_KEY, this.config).catch(() => {}));
      } catch {}
      this._saveTimer = null;
    }, 3000);
  }
  ["saveConfigImmediate"]() {
    this._saveTimer && (clearTimeout(this._saveTimer), this._saveTimer = null);
    try {
      (this.config.reactedStatuses = Array.from(this.reactedStatuses), this.config.lastReactionTime = this.lastReactionTime, _0x4a822e.setConfig(CONFIG_DB_KEY, this.config).catch(() => {}));
    } catch {}
  }
  ["cleanupOldReactedStatuses"]() {
    const _0x174100 = Date.now();
    let _0x29fe2f = false;
    for (const _0x5c5e94 of Array.from(this.reactedStatuses)) {
      try {
        const _0x4c1ee4 = _0x5c5e94.split('|');
        _0x4c1ee4.length >= 3 && _0x174100 - parseInt(_0x4c1ee4[2]) > 24 * 60 * 60 * 1000 && (this.reactedStatuses.delete(_0x5c5e94), _0x29fe2f = true);
      } catch {
        (this.reactedStatuses.delete(_0x5c5e94), _0x29fe2f = true);
      }
    }
    if (_0x29fe2f) this.saveConfig();
  }
  get ['enabled']() {
    return this.config.enabled;
  }
  get ["viewMode"]() {
    return this.config.viewMode;
  }
  get ["mode"]() {
    return this.config.mode;
  }
  get ["fixedEmoji"]() {
    return this.config.fixedEmoji;
  }
  get ['reactions']() {
    return this.config.reactions;
  }
  get ["logs"]() {
    return this.config.logs;
  }
  get ['totalReacted']() {
    return this.config.totalReacted;
  }
  ['_normalizeNum'](_0x41dd65) {
    return String(_0x41dd65).replace(/[^0-9]/g, '');
  }
  ["isExcluded"](_0x7a1c56) {
    const _0x1ef755 = this.config.excludedContacts;
    if (!_0x1ef755 || _0x1ef755.length === 0) return false;
    const _0x1382e5 = (_0x7a1c56.participant || _0x7a1c56.remoteJid || '').split('@')[0].split(':')[0], _0xd7649f = _0x7a1c56.remoteJidAlt ? _0x7a1c56.remoteJidAlt.split('@')[0] : null;
    return _0x1ef755.some(_0x2dfa44 => _0x2dfa44 === _0x1382e5 || _0xd7649f && _0x2dfa44 === _0xd7649f);
  }
  ["excludeContact"](_0x288075) {
    const _0x5cfb71 = this._normalizeNum(_0x288075);
    if (!_0x5cfb71) return false;
    if (!this.config.excludedContacts.includes(_0x5cfb71)) return (this.config.excludedContacts.push(_0x5cfb71), this.saveConfigImmediate(), true);
    return false;
  }
  ['includeContact'](_0x19d667) {
    const _0x322de7 = this._normalizeNum(_0x19d667), _0x5da678 = this.config.excludedContacts.indexOf(_0x322de7);
    if (_0x5da678 !== -1) return (this.config.excludedContacts.splice(_0x5da678, 1), this.saveConfigImmediate(), true);
    return false;
  }
  ["hasReacted"](_0x50dfa3) {
    const _0x34af7e = this._statusIdentity(_0x50dfa3);
    for (const _0x587e7d of this.reactedStatuses) {
      const [_0x4f4024, _0x121840] = _0x587e7d.split('|');
      if (_0x121840 === String(_0x50dfa3.id) && (_0x4f4024 === _0x34af7e.sender || _0x4f4024 === _0x34af7e.rawSender)) return true;
    }
    return false;
  }
  ["_statusIdentity"](_0x30df0d) {
    const _0xc0e696 = _0x30df0d.participant || _0x30df0d.remoteJid || '', _0x4595ff = _0x30df0d.participantPn || _0x30df0d.remoteJidAlt || _0xc0e696;
    return {
      sender: _0x4595ff,
      rawSender: _0xc0e696,
      id: _0x30df0d.id + '|' + _0x4595ff
    };
  }
  ["markReacted"](_0x1d86f7) {
    const _0xbb0c07 = (_0x1d86f7.participant || _0x1d86f7.remoteJid) + '|' + _0x1d86f7.id + '|' + Date.now();
    this.reactedStatuses.add(_0xbb0c07);
    if (this.reactedStatuses.size > 500) {
      const _0x4b441e = Array.from(this.reactedStatuses);
      this.reactedStatuses = new Set(_0x4b441e.slice(-250));
    }
    this.saveConfig();
  }
  ['toggle'](_0x2c4d90 = false) {
    return (this.config.enabled = !_0x2c4d90, this.saveConfigImmediate(), this.config.enabled);
  }
  ["setOnlyOnOwnerReply"](_0x26bf86) {
    (this.config.onlyOnOwnerReply = !!_0x26bf86, this.saveConfigImmediate());
  }
  ['setViewMode'](_0x198703) {
    if (_0x198703 === "view+react" || _0x198703 === "react-only") return (this.config.viewMode = _0x198703, this.saveConfigImmediate(), true);
    return false;
  }
  ["setMode"](_0x56cd6a) {
    if (_0x56cd6a === "random" || _0x56cd6a === "fixed" || _0x56cd6a === "cycle") return (this.config.mode = _0x56cd6a, this.saveConfigImmediate(), true);
    return false;
  }
  ["resetCycleIndex"]() {
    (this.config.cycleIndex = 0, this.saveConfigImmediate());
  }
  ["setFixedEmoji"](_0x3a9c4e) {
    if ([..._0x3a9c4e].length <= 2) return (this.config.fixedEmoji = _0x3a9c4e, this.saveConfigImmediate(), true);
    return false;
  }
  ["addReaction"](_0xd889ec) {
    if (!this.config.reactions.includes(_0xd889ec) && [..._0xd889ec].length <= 2) return (this.config.reactions.push(_0xd889ec), this.saveConfigImmediate(), true);
    return false;
  }
  ['removeReaction'](_0x13a4a0) {
    const _0x4437db = this.config.reactions.indexOf(_0x13a4a0);
    if (_0x4437db !== -1) return (this.config.reactions.splice(_0x4437db, 1), this.saveConfigImmediate(), true);
    return false;
  }
  ['resetReactions']() {
    (this.config.reactions = ['' + AUTOMATION.U1F43A, '' + AUTOMATION.U2764_FE0F, '' + AUTOMATION.U1F44D, '' + AUTOMATION.U1F525, '' + AUTOMATION.U1F389, '' + AUTOMATION.U1F602, '' + AUTOMATION.U1F62E, '' + AUTOMATION.U1F44F, '' + AUTOMATION.U1F3AF, '' + AUTOMATION.U1F4AF, '' + AUTOMATION.U1F31F, '' + AUTOMATION.U2728, '' + AUTOMATION.U26A1, '' + AUTOMATION.U1F4A5, '' + AUTOMATION.U1FAF6], this.saveConfigImmediate());
  }
  ["addLog"](_0x2b8fd9, _0x7ca10, _0x44cd61) {
    const _0x5733b7 = {
      sender: _0x2b8fd9,
      reaction: _0x7ca10,
      statusId: _0x44cd61,
      timestamp: Date.now()
    };
    (this.config.logs.push(_0x5733b7), this.config.totalReacted++, this.config.lastReacted = _0x5733b7, this.config.consecutiveReactions = this.config.lastSender === _0x2b8fd9 ? this.config.consecutiveReactions + 1 : 1, this.config.lastSender = _0x2b8fd9);
    if (this.config.logs.length > 100) this.config.logs.shift();
    this.saveConfig();
  }
  ["clearLogs"]() {
    (Object.assign(this.config, {
      logs: [],
      totalReacted: 0,
      lastReacted: null,
      consecutiveReactions: 0,
      lastSender: null
    }), this.reactedStatuses.clear(), this.saveConfigImmediate());
  }
  ["getStats"]() {
    return {
      enabled: this.config.enabled,
      onlyOnOwnerReply: this.config.onlyOnOwnerReply,
      viewMode: this.config.viewMode,
      mode: this.config.mode,
      fixedEmoji: this.config.fixedEmoji,
      reactions: [...this.config.reactions],
      totalReacted: this.config.totalReacted,
      lastReacted: this.config.lastReacted,
      consecutiveReactions: this.config.consecutiveReactions,
      reactedStatusesCount: this.reactedStatuses.size,
      excludedCount: this.config.excludedContacts.length,
      settings: {
        ...this.config.settings
      }
    };
  }
  ["getReaction"]() {
    if (this.config.mode === "fixed") return this.config.fixedEmoji;
    if (!this.config.reactions.length) return '' + AUTOMATION.U1F43A;
    if (this.config.mode === "cycle") {
      const _0x4ace59 = this.config.reactions[this.config.cycleIndex % this.config.reactions.length];
      return (this.config.cycleIndex = (this.config.cycleIndex + 1) % this.config.reactions.length, this.saveConfig(), _0x4ace59);
    }
    return this.config.reactions[Math.floor(Math.random() * this.config.reactions.length)];
  }
  ["enqueue"](_0x59a793, _0x5e813f) {
    if (!this.config.enabled || !_0x5e813f?.id) return;
    if (this.hasReacted(_0x5e813f)) return;
    if (this.isExcluded(_0x5e813f)) return;
    const _0x557215 = this._statusIdentity(_0x5e813f);
    if (!_0x557215.sender || this._pendingReactions.has(_0x557215.id)) return;
    this._pendingReactions.add(_0x557215.id);
    const _0x4c3da5 = _0x557215.sender, _0x3544fa = '+' + _0x4c3da5.split('@')[0].split(':')[0];
    (this._queue.push({
      sock: _0x59a793,
      statusKey: _0x5e813f,
      displayId: _0x3544fa,
      identity: _0x557215
    }), this._drain());
  }
  ["_drain"]() {
    if (this._draining) return;
    (this._draining = true, this._processNext().catch(_0x147f19 => {
      (console.error('[AUTOREACT]\x20Queue\x20error:', _0x147f19.message), this._draining = false);
    }));
  }
  async ["_processNext"]() {
    while (this._queue.length > 0) {
      const {sock: _0x14c4f9, statusKey: _0x1bea9d, displayId: _0x52b07c, identity: _0x57fc49} = this._queue.shift(), _0x432924 = this.config.settings.rateLimitDelay - (Date.now() - this.lastReactionTime);
      if (_0x432924 > 0) await new Promise(_0x57858f => setTimeout(_0x57858f, _0x432924));
      let _0x2b9837 = false;
      for (let _0x527eed = 0; _0x527eed < 3 && !_0x2b9837; _0x527eed++) {
        if (_0x527eed) await new Promise(_0x4348a0 => setTimeout(_0x4348a0, 1000 * _0x527eed));
        _0x2b9837 = await this._sendReaction(_0x14c4f9, _0x1bea9d, _0x52b07c);
      }
      this._pendingReactions.delete(_0x57fc49.id);
      if (_0x2b9837) this.markReacted(_0x1bea9d);
    }
    this._draining = false;
  }
  async ["_sendReaction"](_0x59afed, _0x6167fd, _0x5a6504) {
    try {
      const _0x261e1b = _0x6167fd.participantPn || _0x6167fd.remoteJidAlt || (_0x6167fd.participant && !_0x6167fd.participant.includes("@lid") ? _0x6167fd.participant : null) || _0x6167fd.participant || _0x6167fd.remoteJid;
      if (this.config.viewMode === "view+react") try {
        await _0x59afed.readMessages([{
          remoteJid: "status@broadcast",
          id: _0x6167fd.id,
          fromMe: false,
          participant: _0x261e1b
        }]);
      } catch (_0xa994ea) {}
      const _0x2856ff = this.getReaction(), _0x2079b3 = _0x59afed.user?.id || _0x59afed.user?.jid || '', _0x55ce1d = _0x2079b3 ? _0x2079b3.split(':')[0].split('@')[0] + '@s.whatsapp.net' : '';
      return (await _0x59afed.sendMessage("status@broadcast", {
        react: {
          text: _0x2856ff,
          key: {
            remoteJid: "status@broadcast",
            id: _0x6167fd.id,
            participant: _0x261e1b,
            fromMe: false
          }
        }
      }, {
        statusJidList: [...new Set([_0x261e1b, ..._0x55ce1d ? [_0x55ce1d] : []])]
      }), this.lastReactionTime = Date.now(), this.addLog(_0x5a6504, _0x2856ff, _0x6167fd.id), console.log("\u001b[32m" + AUTOMATION.U2705 + " [AUTOREACT] Reacted " + _0x2856ff + " to status from " + _0x5a6504 + "\u001b[0m"), true);
    } catch (_0x3a9a91) {
      return ((_0x3a9a91.message?.includes('rate-overlimit') || _0x3a9a91.message?.includes("rate limit")) && (this.config.settings.rateLimitDelay = Math.min(this.config.settings.rateLimitDelay * 2, 10000), this.saveConfig(), console.log("\u001b[33m" + AUTOMATION.U26A0_FE0F + '\x20[AUTOREACT]\x20Rate\x20limit\x20hit\x20—\x20delay\x20bumped\x20to\x20' + this.config.settings.rateLimitDelay + "ms\u001b[0m")), console.log("\u001b[31m" + AUTOMATION.U274C + " [AUTOREACT] REACT FAILED for " + _0x5a6504 + ':\x20' + _0x3a9a91.message + "\u001b[0m"), false);
    }
  }
}
const autoReactManager = new AutoReactManager();
(globalThis._autoReactManager = autoReactManager, globalThis._autoReactReload = () => {
  try {
    autoReactManager.config = autoReactManager.loadConfig();
  } catch {}
});
export async function handleAutoReact(_0x26e91b, _0x17efbe) {
  if (autoReactManager.config.onlyOnOwnerReply) return;
  autoReactManager.enqueue(_0x26e91b, _0x17efbe);
}
export async function handleAutoReactGsmView(_0x213d0a, _0x54ba3b) {
  try {
    if (!autoReactManager.config.enabled) return false;
    if (!_0x54ba3b?.key || _0x54ba3b.key.fromMe) return false;
    if (autoReactManager.isExcluded(_0x54ba3b.key)) return false;
    await _0x213d0a.readMessages([{
      remoteJid: _0x54ba3b.key.remoteJid,
      id: _0x54ba3b.key.id,
      fromMe: false,
      participant: _0x54ba3b.key.participant || _0x54ba3b.key.remoteJid
    }]);
    const _0x5c5c4a = (_0x54ba3b.key.participant || _0x54ba3b.key.remoteJid || '').split('@')[0].split(':')[0];
    return (console.log("\u001b[32m" + AUTOMATION.U2705 + '\x20[AUTOREACT]\x20GSM\x20viewed\x20from\x20+' + _0x5c5c4a + "\u001b[0m"), true);
  } catch (_0x1fa357) {
    return false;
  }
}
export async function triggerReactFromOwnerReply(_0x4aeca1, _0x145842) {
  autoReactManager.enqueue(_0x4aeca1, _0x145842);
}
export {autoReactManager};
export function wasAutoReacted(_0x51091f) {
  if (!_0x51091f) return false;
  for (const _0x18fcab of autoReactManager.reactedStatuses) {
    if (_0x18fcab.split('|')[1] === _0x51091f) return true;
  }
  return false;
}
async function sendAutoReactHelp(_0x1aa88, _0x5d2298, _0x5e324a, _0x117eb0 = false) {
  const _0x503c8d = _0x5e324a + "autoreactstatus", _0x1ba91b = "*Powered by " + getBotName().toUpperCase() + '*';
  let _0x35d115, _0x151c76;
  if (_0x117eb0) (_0x35d115 = '╭─⌈\x20' + AUTOMATION.U1F43A + " *AUTOREACTSTATUS CUSTOMIZATION* ⌋\n│\n" + ("├─⊷ *" + _0x503c8d + '\x20exclude\x20<number>*\x0a│\x20\x20└⊷\x20Skip\x20a\x20contact\x0a') + ("├─⊷ *" + _0x503c8d + " include <number>*\n│  └⊷ Remove from skip list\n") + ('├─⊷\x20*' + _0x503c8d + " excluded*\n│  └⊷ Show skip list\n") + ("├─⊷ *" + _0x503c8d + " ownerreply*\n│  └⊷ Toggle reacting only when you reply\n") + ("├─⊷ *" + _0x503c8d + '\x20view+react*\x20/\x20*react-only*\x0a│\x20\x20└⊷\x20Choose\x20whether\x20to\x20view\x20statuses\x20before\x20reacting\x0a') + ('├─⊷\x20*' + _0x503c8d + '\x20cycle*\x0a│\x20\x20└⊷\x20Use\x20configured\x20emojis\x20sequentially\x0a') + ("├─⊷ *" + _0x503c8d + '\x20setrandom\x20<emoji,emoji,...>*\x0a│\x20\x20└⊷\x20Set\x20the\x20cycle\x20emoji\x20pool\x0a') + ("├─⊷ *" + _0x503c8d + " fixed*\n│  └⊷ Use the current fixed emoji\n") + ("├─⊷ *" + _0x503c8d + " add <emoji>* / *remove <emoji>*\n│  └⊷ Edit the emoji pool\n") + ("├─⊷ *" + _0x503c8d + " list* / *stats*\n│  └⊷ Show emojis or activity statistics\n") + ("├─⊷ *" + _0x503c8d + " reset*\n│  └⊷ Clear stats and restore default emojis\n│\n") + ("╰⊷ " + _0x1ba91b), _0x151c76 = {
    display_text: "Basic Commands",
    id: _0x503c8d + " basic"
  }); else {
    const _0x41b98c = autoReactManager.getStats();
    (_0x35d115 = "╭─⌈ " + AUTOMATION.U1F43A + " *AUTOREACTSTATUS* ⌋\n│\n" + ('├─⊷\x20*' + _0x503c8d + " on / off*\n│  └⊷ Enable or disable (currently " + (_0x41b98c.enabled ? 'ON' : "OFF") + ')\x0a') + ('├─⊷\x20*' + _0x503c8d + " emoji <emoji>*\n│  └⊷ Set the reaction emoji (current: " + _0x41b98c.fixedEmoji + ')\x0a') + ("├─⊷ *" + _0x503c8d + " random*\n│  └⊷ Pick a random emoji for each status\n│\n") + ('╰⊷\x20' + _0x1ba91b), _0x151c76 = {
      display_text: "More Customization",
      id: _0x503c8d + " customize"
    });
  }
  try {
    const {sendInteractiveMessage: _0x1b0712} = await import("wolfbtns");
    return await _0x1b0712(_0x1aa88, _0x5d2298.key.remoteJid, {
      text: _0x35d115,
      interactiveButtons: [{
        name: "quick_reply",
        buttonParamsJson: JSON.stringify(_0x151c76)
      }],
      quoted: _0x5d2298
    });
  } catch {
    const _0x91fb7b = _0x117eb0 ? "\n\nBasic commands: *" + _0x503c8d + " basic*" : '\x0a\x0aMore\x20Customization:\x20*' + _0x503c8d + '\x20customize*';
    return _0x1aa88.sendMessage(_0x5d2298.key.remoteJid, {
      text: '' + _0x35d115 + _0x91fb7b
    }, {
      quoted: _0x5d2298
    });
  }
}
export default {
  name: "autoreactstatus",
  alias: ["reactstatus", 'statusreact', 'sr', 'reacts'],
  desc: 'Automatically\x20react\x20to\x20WhatsApp\x20statuses\x20' + AUTOMATION.U1F43A,
  category: "Status",
  ownerOnly: false,
  async execute(_0x4cc3ff, _0x309e4e, _0x2540a9, _0x519c61, _0x28e0bd) {
    try {
      const _0x2d4832 = _0x28e0bd?.isOwner?.() || false, _0x5bffb0 = _0x206bfe => _0x4cc3ff.sendMessage(_0x309e4e.key.remoteJid, {
        text: _0x206bfe
      }, {
        quoted: _0x309e4e
      });
      if (_0x2540a9.length === 0) return sendAutoReactHelp(_0x4cc3ff, _0x309e4e, _0x519c61);
      const _0x10c3b2 = _0x2540a9[0].toLowerCase();
      if (_0x10c3b2 === 'customize' || _0x10c3b2 === 'more') return sendAutoReactHelp(_0x4cc3ff, _0x309e4e, _0x519c61, true);
      if (_0x10c3b2 === 'basic') return sendAutoReactHelp(_0x4cc3ff, _0x309e4e, _0x519c61);
      switch (_0x10c3b2) {
        case 'on':
        case "enable":
        case "start":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + '\x20Owner\x20only!');
              return;
            }
            (autoReactManager.toggle(false), await _0x5bffb0(AUTOMATION.U2705 + '\x20*AUTOREACTSTATUS\x20ENABLED*\x0a\x0a' + AUTOMATION.U1F43A + " Will now " + (autoReactManager.viewMode === "view+react" ? 'view\x20then\x20react\x20to' : "react to") + " ALL statuses!\n\nView Mode: " + autoReactManager.viewMode + "\nEmoji: " + autoReactManager.fixedEmoji + "\nMode: " + autoReactManager.mode));
            break;
          }
        case 'off':
        case "disable":
        case "stop":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            (autoReactManager.toggle(true), await _0x5bffb0(AUTOMATION.U274C + " *AUTOREACTSTATUS DISABLED*"));
            break;
          }
        case 'exclude':
        case "skip":
        case "block":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            const _0x4486c7 = _0x2540a9[1];
            if (!_0x4486c7) {
              await _0x5bffb0("Usage: *" + _0x519c61 + "sr exclude <number>*\nExample: " + _0x519c61 + "sr exclude 254703123456");
              return;
            }
            if (autoReactManager.excludeContact(_0x4486c7)) {
              const _0x4021cc = _0x4486c7.replace(/[^0-9]/g, '');
              await _0x5bffb0(AUTOMATION.U2705 + " *Excluded from auto-react*\n\n" + AUTOMATION.U1F6AB + '\x20' + _0x4021cc + '\x0a\x0aTheir\x20statuses\x20will\x20be\x20silently\x20skipped.');
            } else await _0x5bffb0(AUTOMATION.U26A0_FE0F + '\x20' + _0x4486c7.replace(/[^0-9]/g, '') + " is already on the skip list.");
            break;
          }
        case 'include':
        case "unexclude":
        case "unblock":
        case 'unskip':
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            const _0x220b0f = _0x2540a9[1];
            if (!_0x220b0f) {
              await _0x5bffb0("Usage: *" + _0x519c61 + "sr include <number>*");
              return;
            }
            if (autoReactManager.includeContact(_0x220b0f)) {
              const _0x4ccc79 = _0x220b0f.replace(/[^0-9]/g, '');
              await _0x5bffb0(AUTOMATION.U2705 + '\x20*Removed\x20from\x20skip\x20list*\x0a\x0a' + AUTOMATION.U1F43A + '\x20' + _0x4ccc79 + " will now be auto-reacted again.");
            } else await _0x5bffb0(AUTOMATION.U26A0_FE0F + '\x20' + _0x220b0f.replace(/[^0-9]/g, '') + " was not on the skip list.");
            break;
          }
        case "excluded":
        case 'skiplist':
        case "blocklist":
        case 'exclusions':
          {
            const _0xf0bfeb = autoReactManager.config.excludedContacts;
            if (!_0xf0bfeb.length) {
              await _0x5bffb0(AUTOMATION.U1F4ED + " *No contacts excluded from auto-react.*\n\nUse *" + _0x519c61 + "sr exclude <number>* to skip someone.");
              return;
            }
            let _0x403da4 = AUTOMATION.U1F6AB + " *AUTOREACT SKIP LIST (" + _0xf0bfeb.length + ")*\n\n";
            (_0xf0bfeb.forEach((_0x11ce93, _0x27e42a) => {
              _0x403da4 += _0x27e42a + 1 + ". +" + _0x11ce93 + '\x0a';
            }), _0x403da4 += "\nUse *" + _0x519c61 + "sr include <number>* to remove.", await _0x5bffb0(_0x403da4));
            break;
          }
        case "view+react":
        case "viewreact":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            (autoReactManager.setViewMode("view+react"), await _0x5bffb0(AUTOMATION.U1F441_FE0F + " + " + AUTOMATION.U1F43A + '\x20*VIEW+REACT\x20MODE*\x0a\x0aWill\x20view\x20the\x20status\x20first,\x20then\x20react.\x0aSender\x20sees\x20you\x20in\x20their\x20viewers\x20list.'));
            break;
          }
        case "react-only":
        case "reactonly":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            (autoReactManager.setViewMode('react-only'), await _0x5bffb0(AUTOMATION.U1F43A + " *REACT-ONLY MODE*\n\nWill react without marking as viewed.\nSender will NOT see you in their viewers list."));
            break;
          }
        case "setrandom":
        case "setemojis":
        case "setpool":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            const _0x5cc0e0 = _0x2540a9.slice(1).join('\x20').split(',').map(_0x36b42e => _0x36b42e.trim()).filter(Boolean);
            if (!_0x5cc0e0.length) {
              await _0x5bffb0("╭─⌈ " + AUTOMATION.U1F3B2 + " *SETRANDOM* ⌋\n│\n" + "├─⊷ Sets the full random emoji pool\n│\n" + ("├─⊷ *Usage:*\n│  └⊷ " + _0x519c61 + "sr setrandom " + AUTOMATION.U1F43A + ',' + AUTOMATION.U2764_FE0F + ',' + AUTOMATION.U1F525 + ',' + AUTOMATION.U1F4AF + ',' + AUTOMATION.U1F389 + "\n│\n") + ("├─⊷ *Current pool (" + autoReactManager.reactions.length + '):*\x0a') + ("│  └⊷ " + autoReactManager.reactions.join('\x20') + "\n│\n") + "╰⊷ Separate each emoji with a comma");
              return;
            }
            const _0x33e3c3 = [], _0x324125 = [];
            for (const _0x278c67 of _0x5cc0e0) {
              const _0x2676de = [..._0x278c67];
              if (_0x2676de.length >= 1 && _0x2676de.length <= 4 && (/\p{Emoji}/u).test(_0x278c67)) {
                if (!_0x33e3c3.includes(_0x278c67)) _0x33e3c3.push(_0x278c67);
              } else _0x324125.push(_0x278c67);
            }
            if (!_0x33e3c3.length) {
              await _0x5bffb0(AUTOMATION.U274C + " No valid emojis found.\n\nUsage: *" + _0x519c61 + 'sr\x20setrandom\x20' + AUTOMATION.U1F43A + ',' + AUTOMATION.U2764_FE0F + ',' + AUTOMATION.U1F525 + ',' + AUTOMATION.U1F4AF + "*\nSeparate each emoji with a comma.");
              return;
            }
            (autoReactManager.config.reactions = _0x33e3c3, autoReactManager.config.cycleIndex = 0, autoReactManager.setMode('cycle'), autoReactManager.saveConfigImmediate());
            let _0x3767f3 = AUTOMATION.U2705 + " *CYCLE EMOJI POOL SET*\n\n";
            (_0x3767f3 += AUTOMATION.U1F504 + " Mode: CYCLE (in order, looping)\n", _0x3767f3 += AUTOMATION.U1F4E6 + " Pool (" + _0x33e3c3.length + "):\n", _0x33e3c3.forEach((_0x5e18f5, _0xcbed17) => {
              _0x3767f3 += '\x20\x20' + (_0xcbed17 + 1) + '.\x20' + _0x5e18f5 + '\x0a';
            }));
            if (_0x324125.length) _0x3767f3 += '\x0a' + AUTOMATION.U26A0_FE0F + '\x20Skipped\x20(not\x20emoji):\x20' + _0x324125.join('\x20');
            (_0x3767f3 += "\nStatus 1→" + _0x33e3c3[0] + ", Status 2→" + (_0x33e3c3[1] || _0x33e3c3[0]) + ", ...", await _0x5bffb0(_0x3767f3));
            break;
          }
        case "cycle":
        case "sequential":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            (autoReactManager.setMode("cycle"), autoReactManager.resetCycleIndex());
            const _0x4cfa42 = autoReactManager.reactions;
            await _0x5bffb0(AUTOMATION.U1F504 + " *CYCLE MODE*\n\nEmojis used in order, looping.\n\n" + _0x4cfa42.map((_0x214f81, _0x575041) => _0x575041 + 1 + '.\x20' + _0x214f81).join('\x0a') + '\x0a\x0aCounter\x20reset\x20to\x20start.');
            break;
          }
        case 'random':
          {
            (autoReactManager.setMode("random"), await _0x5bffb0(AUTOMATION.U1F3B2 + '\x20*RANDOM\x20MODE*\x0a\x0aOne\x20random\x20emoji\x20per\x20status!\x0a\x0a' + autoReactManager.reactions.join('\x20')));
            break;
          }
        case "fixed":
          {
            (autoReactManager.setMode("fixed"), await _0x5bffb0(AUTOMATION.U1F4CC + '\x20*FIXED\x20MODE*\x0a\x0aWill\x20always\x20react\x20with:\x20' + autoReactManager.fixedEmoji));
            break;
          }
        case "emoji":
          {
            if (!_0x2540a9[1]) {
              await _0x5bffb0("Current emoji: " + autoReactManager.fixedEmoji + "\n\nUsage: *" + _0x519c61 + "sr emoji " + AUTOMATION.U1F43A + '*');
              return;
            }
            const _0x14fe27 = _0x2540a9[1];
            autoReactManager.setFixedEmoji(_0x14fe27) ? (autoReactManager.setMode("fixed"), await _0x5bffb0(AUTOMATION.U2705 + " Emoji set to: " + _0x14fe27)) : await _0x5bffb0(AUTOMATION.U274C + " Invalid emoji.");
            break;
          }
        case "ownerreply":
        case "onlyownerreply":
        case "replymode":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            const _0xfcd63f = autoReactManager.config.onlyOnOwnerReply;
            autoReactManager.setOnlyOnOwnerReply(!_0xfcd63f);
            const _0x153726 = autoReactManager.config.onlyOnOwnerReply;
            _0x153726 ? await _0x5bffb0(AUTOMATION.U2705 + '\x20*OWNER-REPLY\x20MODE\x20ON*\x0a\x0aBot\x20will\x20only\x20react\x20to\x20a\x20status\x20when\x20you\x20reply\x20to\x20it\x20with\x20a\x20text\x20or\x20sticker.\x0aIt\x20will\x20NOT\x20auto-react\x20to\x20all\x20statuses.') : await _0x5bffb0(AUTOMATION.U1F504 + " *AUTO-REACT ALL MODE ON*\n\nBot will now automatically react to every status it receives.");
            break;
          }
        case "stats":
        case "statistics":
        case "info":
          {
            const _0xebbaeb = autoReactManager.getStats(), _0x5e487d = _0xebbaeb.viewMode === "view+react" ? AUTOMATION.U1F441_FE0F + " + " + AUTOMATION.U1F43A + " View then React" : AUTOMATION.U1F43A + " React only";
            let _0x18a747 = AUTOMATION.U1F4CA + " *AUTOREACTSTATUS STATS*\n\n";
            (_0x18a747 += AUTOMATION.U1F7E2 + " Status      : " + (_0xebbaeb.enabled ? 'ACTIVE\x20${AUTOMATION.U2705}' : 'INACTIVE\x20${AUTOMATION.U274C}') + '\x0a', _0x18a747 += AUTOMATION.U1F4AC + " Trigger     : " + (_0xebbaeb.onlyOnOwnerReply ? "Owner-reply only " + AUTOMATION.U1F4E9 : 'Auto-react\x20all\x20' + AUTOMATION.U1F504) + '\x0a', _0x18a747 += AUTOMATION.U1F441_FE0F + " View Mode   : " + _0x5e487d + '\x0a');
            const _0x32f8e5 = _0xebbaeb.mode === 'fixed' ? 'FIXED\x20(' + _0xebbaeb.fixedEmoji + ')' : _0xebbaeb.mode === 'cycle' ? "CYCLE (pos " + (autoReactManager.config.cycleIndex + 1) + '/' + autoReactManager.reactions.length + ')' : "RANDOM";
            (_0x18a747 += AUTOMATION.U1F3AD + " Emoji Mode  : " + _0x32f8e5 + '\x0a', _0x18a747 += AUTOMATION.U1F43A + " Total       : *" + _0xebbaeb.totalReacted + '*\x0a', _0x18a747 += AUTOMATION.U1F4DD + " Tracked     : " + _0xebbaeb.reactedStatusesCount + '\x0a', _0x18a747 += AUTOMATION.U1F504 + '\x20Consecutive\x20:\x20' + _0xebbaeb.consecutiveReactions + '\x0a', _0x18a747 += AUTOMATION.U1F6AB + " Excluded    : " + _0xebbaeb.excludedCount + '\x0a', _0x18a747 += AUTOMATION.U23F1_FE0F + " Queue       : " + autoReactManager._queue.length + " pending\n");
            if (_0xebbaeb.lastReacted) {
              const _0x59b2e0 = Math.floor((Date.now() - _0xebbaeb.lastReacted.timestamp) / 60000);
              _0x18a747 += '\x0a' + AUTOMATION.U1F552 + '\x20Last:\x20' + _0xebbaeb.lastReacted.sender + '\x20' + _0xebbaeb.lastReacted.reaction + '\x20(' + (_0x59b2e0 < 1 ? "just now" : _0x59b2e0 + '\x20min\x20ago') + ')';
            }
            await _0x5bffb0(_0x18a747);
            break;
          }
        case "list":
        case "emojis":
          {
            await _0x5bffb0(AUTOMATION.U1F604 + " *Emoji List (" + autoReactManager.reactions.length + "):*\n\n" + autoReactManager.reactions.join('\x20') + "\n\nMode: " + autoReactManager.mode + " | Fixed: " + autoReactManager.fixedEmoji);
            break;
          }
        case "add":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            if (!_0x2540a9[1]) {
              await _0x5bffb0("Usage: `" + _0x519c61 + "sr add " + AUTOMATION.U2764_FE0F + '`');
              return;
            }
            autoReactManager.addReaction(_0x2540a9[1]) ? await _0x5bffb0(AUTOMATION.U2705 + '\x20' + _0x2540a9[1] + '\x20added.\x0a\x0a' + autoReactManager.reactions.join('\x20')) : await _0x5bffb0(AUTOMATION.U26A0_FE0F + " Already in list or invalid.");
            break;
          }
        case 'remove':
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            if (!_0x2540a9[1]) {
              await _0x5bffb0("Usage: `" + _0x519c61 + "sr remove " + AUTOMATION.U1F525 + '`');
              return;
            }
            autoReactManager.removeReaction(_0x2540a9[1]) ? await _0x5bffb0(AUTOMATION.U2705 + '\x20' + _0x2540a9[1] + " removed.\n\n" + autoReactManager.reactions.join('\x20')) : await _0x5bffb0(AUTOMATION.U274C + " Not found.");
            break;
          }
        case 'reset':
        case "clear":
          {
            if (!_0x2d4832) {
              await _0x5bffb0(AUTOMATION.U274C + " Owner only!");
              return;
            }
            (autoReactManager.clearLogs(), autoReactManager.resetReactions(), await _0x5bffb0(AUTOMATION.U1F504 + '\x20*Reset\x20complete.*\x0a\x0aLogs\x20cleared,\x20reactions\x20reset\x20to\x20defaults.'));
            break;
          }
        default:
          await _0x5bffb0(AUTOMATION.U2753 + " Unknown option. Use *" + _0x519c61 + 'sr*\x20to\x20see\x20available\x20commands.');
      }
    } catch (_0x3274d1) {
      console.error("[AUTOREACTSTATUS] Error:", _0x3274d1.message);
    }
  }
};
