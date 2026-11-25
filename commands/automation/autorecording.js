import {AUTOMATION} from '../../lib/emojis.js';
import _0x539bd4 from '../../lib/database.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const CONFIG_DB_KEY = "autorecording_config", autoRecordingConfig = {
  mode: "off",
  duration: 10,
  targetJid: null,
  activeRecorders: new Map(),
  botSock: null,
  isHooked: false
};
function loadConfig() {
  try {
    const _0x17e582 = _0x539bd4.getConfigSync(CONFIG_DB_KEY, {
      mode: 'off',
      duration: 10,
      targetJid: null
    });
    (autoRecordingConfig.mode = _0x17e582.mode || "off", autoRecordingConfig.duration = _0x17e582.duration || 10, autoRecordingConfig.targetJid = _0x17e582.targetJid || null);
  } catch {}
}
function saveConfig() {
  try {
    const _0x58660f = {
      mode: autoRecordingConfig.mode,
      duration: autoRecordingConfig.duration,
      targetJid: autoRecordingConfig.targetJid || null
    };
    _0x539bd4.setConfig(CONFIG_DB_KEY, _0x58660f).catch(() => {});
  } catch {}
}
function normalizeToJid(_0x21e1b9) {
  const _0x39c5f5 = _0x21e1b9.replace(/[^0-9]/g, '');
  if (_0x39c5f5.length >= 7) return _0x39c5f5 + "@s.whatsapp.net";
  return null;
}
loadConfig();
function shouldRecordInChat(_0x273296) {
  const _0x24b438 = autoRecordingConfig.mode;
  if (_0x24b438 === "off") return false;
  if (_0x24b438 === "single") return _0x273296 === autoRecordingConfig.targetJid;
  const _0x25b66c = _0x273296.endsWith("@g.us");
  if (_0x24b438 === "both") return true;
  if (_0x24b438 === "groups" && _0x25b66c) return true;
  if (_0x24b438 === 'dm' && !_0x25b66c) return true;
  return false;
}
class AutoRecordingManager {
  static ["initialize"](_0x4572be) {
    (_0x4572be && autoRecordingConfig.botSock && autoRecordingConfig.botSock !== _0x4572be && (autoRecordingConfig.isHooked = false), !autoRecordingConfig.isHooked && _0x4572be && (autoRecordingConfig.botSock = _0x4572be, this.hookIntoBot(), autoRecordingConfig.isHooked = true));
  }
  static ["hookIntoBot"]() {
    if (!autoRecordingConfig.botSock?.ev) return;
    autoRecordingConfig.botSock.ev.on("messages.upsert", async _0x521025 => {
      await this.handleIncomingMessage(_0x521025);
    });
  }
  static async ['handleIncomingMessage'](_0x52757c) {
    try {
      if (!_0x52757c?.messages?.length) return;
      const _0x139ea6 = _0x52757c.messages[0], _0x3b03a0 = autoRecordingConfig.botSock;
      if (!_0x139ea6?.key || _0x139ea6.key.fromMe || autoRecordingConfig.mode === 'off') return;
      const _0x59dd03 = _0x139ea6.message?.conversation || _0x139ea6.message?.extendedTextMessage?.text || _0x139ea6.message?.imageMessage?.caption || '';
      if (_0x59dd03.trim().startsWith('.')) return;
      const _0x4c08d8 = _0x139ea6.key.remoteJid;
      if (!_0x4c08d8 || !shouldRecordInChat(_0x4c08d8)) return;
      const _0x44fdc9 = Date.now();
      if (autoRecordingConfig.activeRecorders.has(_0x4c08d8)) {
        const _0x3b0755 = autoRecordingConfig.activeRecorders.get(_0x4c08d8);
        if (_0x3b0755.timeoutId) clearTimeout(_0x3b0755.timeoutId);
        (_0x3b0755.lastMessageTime = _0x44fdc9, _0x3b0755.timeoutId = setTimeout(async () => {
          await this.stopRecording(_0x4c08d8, _0x3b03a0);
        }, autoRecordingConfig.duration * 1000));
        return;
      }
      await this.startRecording(_0x4c08d8, _0x3b03a0);
    } catch (_0x37eff6) {
      console.error('Auto-recording\x20handler\x20error:', _0x37eff6.message);
    }
  }
  static async ['startRecording'](_0xfdabd2, _0xdeedc9) {
    try {
      await _0xdeedc9.sendPresenceUpdate('recording', _0xfdabd2);
      const _0x1621cd = setInterval(async () => {
        try {
          autoRecordingConfig.activeRecorders.has(_0xfdabd2) && await _0xdeedc9.sendPresenceUpdate("recording", _0xfdabd2);
        } catch {}
      }, 2000), _0x293fd8 = setTimeout(async () => {
        await this.stopRecording(_0xfdabd2, _0xdeedc9);
      }, autoRecordingConfig.duration * 1000);
      autoRecordingConfig.activeRecorders.set(_0xfdabd2, {
        intervalId: _0x1621cd,
        timeoutId: _0x293fd8,
        startTime: Date.now(),
        lastMessageTime: Date.now()
      });
    } catch (_0x229fae) {
      console.error("Start recording error:", _0x229fae.message);
    }
  }
  static async ['stopRecording'](_0x39c049, _0x5e190c) {
    if (!autoRecordingConfig.activeRecorders.has(_0x39c049)) return;
    const _0x3e5bc5 = autoRecordingConfig.activeRecorders.get(_0x39c049);
    clearInterval(_0x3e5bc5.intervalId);
    if (_0x3e5bc5.timeoutId) clearTimeout(_0x3e5bc5.timeoutId);
    autoRecordingConfig.activeRecorders.delete(_0x39c049);
    try {
      const _0x198a8f = _0x5e190c || autoRecordingConfig.botSock;
      await _0x198a8f.sendPresenceUpdate("paused", _0x39c049);
    } catch {}
  }
  static ['clearAllRecorders']() {
    (autoRecordingConfig.activeRecorders.forEach(_0x56e64d => {
      clearInterval(_0x56e64d.intervalId);
      if (_0x56e64d.timeoutId) clearTimeout(_0x56e64d.timeoutId);
    }), autoRecordingConfig.activeRecorders.clear());
  }
}
export default {
  name: "autorecording",
  alias: ['record', "recording", 'voicerec', "audiorec", 'rec', "recsim"],
  desc: 'Toggle\x20auto\x20fake\x20recording\x20indicator\x20—\x20can\x20target\x20a\x20specific\x20chat',
  category: "Owner",
  usage: ".autorecording [dm|groups|both|off|status|<number>|<jid>]",
  async execute(_0x32fa7a, _0x5ac28f, _0xa63b84, _0x4beba7, _0x3a4936) {
    try {
      const _0x50cfd5 = _0x5ac28f.key.remoteJid;
      !autoRecordingConfig.isHooked && (autoRecordingConfig.botSock = _0x32fa7a, AutoRecordingManager.hookIntoBot(), autoRecordingConfig.isHooked = true);
      const _0x231f4d = _0x3a4936?.jidManager?.isOwner(_0x5ac28f) || _0x5ac28f.key.fromMe;
      if (!_0x231f4d) return _0x32fa7a.sendMessage(_0x50cfd5, {
        text: AUTOMATION.U274C + " *Owner Only Command*"
      }, {
        quoted: _0x5ac28f
      });
      const _0x531a50 = (_0xa63b84[0] || '').toLowerCase().trim();
      if (!_0x531a50 || _0x531a50 === "status" || _0x531a50 === "info") {
        const _0x423819 = {
          off: AUTOMATION.U274C + " OFF",
          dm: AUTOMATION.U1F4AC + '\x20DMs\x20only',
          groups: AUTOMATION.U1F465 + " Groups only",
          both: AUTOMATION.U1F310 + " DMs + Groups",
          single: AUTOMATION.U1F3AF + " Single chat: " + (autoRecordingConfig.targetJid || "none")
        };
        return _0x32fa7a.sendMessage(_0x50cfd5, {
          text: "╭─⌈ " + AUTOMATION.U1F3A4 + " *AUTO-RECORDING* ⌋\n│\n│ Mode: " + (_0x423819[autoRecordingConfig.mode] || autoRecordingConfig.mode) + "\n│ Duration: " + autoRecordingConfig.duration + "s\n│ Active: " + autoRecordingConfig.activeRecorders.size + '\x0a│\x0a├─⊷\x20*' + _0x4beba7 + "autorecording <number>*\n│  └⊷ Record only in that person's DM\n│  └⊷ e.g. " + _0x4beba7 + "autorecording 254703397679\n├─⊷ *" + _0x4beba7 + 'autorecording\x20dm*\x0a│\x20\x20└⊷\x20All\x20DMs\x0a├─⊷\x20*' + _0x4beba7 + "autorecording groups*\n│  └⊷ All groups\n├─⊷ *" + _0x4beba7 + "autorecording both*\n│  └⊷ DMs + Groups\n├─⊷ *" + _0x4beba7 + "autorecording off*\n│  └⊷ Disable\n├─⊷ *" + _0x4beba7 + "autorecording <1-120>*\n│  └⊷ Set duration\n╰⊷ " + getFooter(_0x5ac28f.key.participant || _0x5ac28f.key.remoteJid)
        }, {
          quoted: _0x5ac28f
        });
      }
      if (['dm', "dms", "private"].includes(_0x531a50)) return (autoRecordingConfig.mode = 'dm', autoRecordingConfig.targetJid = null, saveConfig(), AutoRecordingManager.clearAllRecorders(), _0x32fa7a.sendMessage(_0x50cfd5, {
        text: AUTOMATION.U2705 + '\x20*Auto-Recording:\x20DMs\x20Only*\x0a\x0aRecording\x20indicator\x20will\x20show\x20in\x20all\x20private\x20chats.\x0aDuration:\x20' + autoRecordingConfig.duration + 's'
      }, {
        quoted: _0x5ac28f
      }));
      if (["groups", "group", 'gc'].includes(_0x531a50)) return (autoRecordingConfig.mode = "groups", autoRecordingConfig.targetJid = null, saveConfig(), AutoRecordingManager.clearAllRecorders(), _0x32fa7a.sendMessage(_0x50cfd5, {
        text: AUTOMATION.U2705 + " *Auto-Recording: Groups Only*\n\nRecording indicator will show in all group chats.\nDuration: " + autoRecordingConfig.duration + 's'
      }, {
        quoted: _0x5ac28f
      }));
      if (["both", "all", 'on', "enable"].includes(_0x531a50)) return (autoRecordingConfig.mode = "both", autoRecordingConfig.targetJid = null, saveConfig(), _0x32fa7a.sendMessage(_0x50cfd5, {
        text: AUTOMATION.U2705 + '\x20*Auto-Recording:\x20DMs\x20+\x20Groups*\x0a\x0aRecording\x20indicator\x20will\x20show\x20in\x20all\x20chats.\x0aDuration:\x20' + autoRecordingConfig.duration + 's'
      }, {
        quoted: _0x5ac28f
      }));
      if (["off", "disable", "stop"].includes(_0x531a50)) return (autoRecordingConfig.mode = "off", autoRecordingConfig.targetJid = null, saveConfig(), AutoRecordingManager.clearAllRecorders(), _0x32fa7a.sendMessage(_0x50cfd5, {
        text: AUTOMATION.U274C + " *Auto-Recording Disabled*\n\nRecording indicator is now off for all chats."
      }, {
        quoted: _0x5ac28f
      }));
      const _0xe873bc = parseInt(_0x531a50);
      if (!isNaN(_0xe873bc) && _0xe873bc >= 1 && _0xe873bc <= 120) return (autoRecordingConfig.duration = _0xe873bc, saveConfig(), _0x32fa7a.sendMessage(_0x50cfd5, {
        text: AUTOMATION.U2705 + '\x20*Duration\x20set\x20to\x20' + _0xe873bc + "s*\n\nCurrent mode: " + autoRecordingConfig.mode + (autoRecordingConfig.targetJid ? "\nTarget: " + autoRecordingConfig.targetJid : '')
      }, {
        quoted: _0x5ac28f
      }));
      const _0x485d0e = _0xa63b84[0].includes('@') ? _0xa63b84[0].trim() : normalizeToJid(_0xa63b84[0]);
      if (_0x485d0e) {
        (autoRecordingConfig.mode = 'single', autoRecordingConfig.targetJid = _0x485d0e, saveConfig(), AutoRecordingManager.clearAllRecorders());
        const _0x1fe179 = _0x485d0e.split('@')[0];
        return _0x32fa7a.sendMessage(_0x50cfd5, {
          text: AUTOMATION.U2705 + " *Auto-Recording: Single Chat*\n\n" + AUTOMATION.U1F3AF + " Target: *+" + _0x1fe179 + '*\x0a' + AUTOMATION.U23F1_FE0F + " Duration: " + autoRecordingConfig.duration + "s\n\nRecording will only be simulated in that person's DM.\n\n• Change target: `" + _0x4beba7 + "autorecording <new_number>`\n• Disable: `" + _0x4beba7 + "autorecording off`"
        }, {
          quoted: _0x5ac28f
        });
      }
      return _0x32fa7a.sendMessage(_0x50cfd5, {
        text: "╭─⌈ " + AUTOMATION.U1F3A4 + " *AUTO-RECORDING* ⌋\n│\n├─⊷ *" + _0x4beba7 + 'autorecording\x20<number>*\x0a│\x20\x20└⊷\x20Target\x20one\x20specific\x20chat\x0a│\x20\x20└⊷\x20e.g.\x20' + _0x4beba7 + 'autorecording\x20254703397679\x0a├─⊷\x20*' + _0x4beba7 + "autorecording dm*\n│  └⊷ All DMs\n├─⊷ *" + _0x4beba7 + "autorecording groups*\n│  └⊷ All groups\n├─⊷ *" + _0x4beba7 + "autorecording both*\n│  └⊷ DMs + Groups\n├─⊷ *" + _0x4beba7 + "autorecording off*\n│  └⊷ Disable\n├─⊷ *" + _0x4beba7 + "autorecording <1-120>*\n│  └⊷ Set duration\n╰⊷ " + getFooter(_0x5ac28f.key.participant || _0x5ac28f.key.remoteJid)
      }, {
        quoted: _0x5ac28f
      });
    } catch (_0x40b22d) {
      (console.error("AutoRecording error:", _0x40b22d), await _0x32fa7a.sendMessage(_0x5ac28f.key.remoteJid, {
        text: AUTOMATION.U274C + " AutoRecording error: " + _0x40b22d.message
      }, {
        quoted: _0x5ac28f
      }));
    }
  }
};
globalThis._autoRecordingInit = _0x21375b => {
  (loadConfig(), autoRecordingConfig.mode !== "off" && AutoRecordingManager.initialize(_0x21375b));
};
