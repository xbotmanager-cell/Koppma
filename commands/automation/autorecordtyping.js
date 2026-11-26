import {AUTOMATION} from '../../lib/emojis.js';
import _0x3a23d5 from '../../lib/database.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const CONFIG_DB_KEY = "autorecordtyping_config", cfg = {
  mode: "off",
  duration: 15,
  switchEvery: 4,
  targetJid: null,
  activeSessions: new Map(),
  botSock: null,
  isHooked: false
};
function loadConfig() {
  try {
    const _0x1c78fa = _0x3a23d5.getConfigSync(CONFIG_DB_KEY, {
      mode: "off",
      duration: 15,
      switchEvery: 4,
      targetJid: null
    });
    (cfg.mode = _0x1c78fa.mode || "off", cfg.duration = _0x1c78fa.duration || 15, cfg.switchEvery = _0x1c78fa.switchEvery || 4, cfg.targetJid = _0x1c78fa.targetJid || null);
  } catch {}
}
function saveConfig() {
  try {
    _0x3a23d5.setConfig(CONFIG_DB_KEY, {
      mode: cfg.mode,
      duration: cfg.duration,
      switchEvery: cfg.switchEvery,
      targetJid: cfg.targetJid || null
    }).catch(() => {});
  } catch {}
}
function normalizeToJid(_0x51393e) {
  const _0x562bd8 = _0x51393e.replace(/[^0-9]/g, '');
  if (_0x562bd8.length >= 7) return _0x562bd8 + "@s.whatsapp.net";
  return null;
}
loadConfig();
function shouldActInChat(_0x156733) {
  if (cfg.mode === 'off') return false;
  if (cfg.mode === "single") return _0x156733 === cfg.targetJid;
  const _0x3f1589 = _0x156733.endsWith("@g.us");
  if (cfg.mode === "both") return true;
  if (cfg.mode === "groups" && _0x3f1589) return true;
  if (cfg.mode === 'dm' && !_0x3f1589) return true;
  return false;
}
class AutoRecordTypingManager {
  static ["initialize"](_0x4dcf43) {
    (_0x4dcf43 && cfg.botSock && cfg.botSock !== _0x4dcf43 && (cfg.isHooked = false), !cfg.isHooked && _0x4dcf43 && (cfg.botSock = _0x4dcf43, this.hookIntoBot(), cfg.isHooked = true));
  }
  static ["hookIntoBot"]() {
    if (!cfg.botSock?.ev) return;
    cfg.botSock.ev.on("messages.upsert", async _0x102f7b => {
      await this.handleIncomingMessage(_0x102f7b);
    });
  }
  static async ['handleIncomingMessage'](_0x3e4b14) {
    try {
      if (!_0x3e4b14?.messages?.length) return;
      const _0x945a77 = _0x3e4b14.messages[0], _0x425328 = cfg.botSock;
      if (!_0x945a77?.key || _0x945a77.key.fromMe || cfg.mode === "off") return;
      const _0x46e6f5 = _0x945a77.message?.conversation || _0x945a77.message?.extendedTextMessage?.text || _0x945a77.message?.imageMessage?.caption || '';
      if (_0x46e6f5.trim().startsWith('.')) return;
      const _0x151428 = _0x945a77.key.remoteJid;
      if (!_0x151428 || !shouldActInChat(_0x151428)) return;
      const _0x230cb5 = Date.now();
      if (cfg.activeSessions.has(_0x151428)) {
        const _0x4e5ee4 = cfg.activeSessions.get(_0x151428);
        if (_0x4e5ee4.stopTimeout) clearTimeout(_0x4e5ee4.stopTimeout);
        (_0x4e5ee4.lastMessageTime = _0x230cb5, _0x4e5ee4.stopTimeout = setTimeout(() => this.stopSession(_0x151428, _0x425328), cfg.duration * 1000));
        return;
      }
      await this.startSession(_0x151428, _0x425328);
    } catch (_0x26ec17) {
      console.error("[AutoRecordTyping] handler error:", _0x26ec17.message);
    }
  }
  static async ["startSession"](_0x3ce104, _0x457d1f) {
    try {
      let _0x1c9cae = false;
      await _0x457d1f.sendPresenceUpdate("composing", _0x3ce104);
      const _0x25045e = setInterval(async () => {
        try {
          if (!cfg.activeSessions.has(_0x3ce104)) return;
          (_0x1c9cae = !_0x1c9cae, await _0x457d1f.sendPresenceUpdate(_0x1c9cae ? 'recording' : 'composing', _0x3ce104));
        } catch {}
      }, cfg.switchEvery * 1000), _0x46d81c = setTimeout(() => this.stopSession(_0x3ce104, _0x457d1f), cfg.duration * 1000);
      cfg.activeSessions.set(_0x3ce104, {
        switchInterval: _0x25045e,
        stopTimeout: _0x46d81c,
        startTime: Date.now(),
        lastMessageTime: Date.now()
      });
    } catch (_0x4d6273) {
      console.error("[AutoRecordTyping] startSession error:", _0x4d6273.message);
    }
  }
  static async ['stopSession'](_0x4471af, _0x1fb0bf) {
    if (!cfg.activeSessions.has(_0x4471af)) return;
    const _0x2fda01 = cfg.activeSessions.get(_0x4471af);
    clearInterval(_0x2fda01.switchInterval);
    if (_0x2fda01.stopTimeout) clearTimeout(_0x2fda01.stopTimeout);
    cfg.activeSessions.delete(_0x4471af);
    try {
      await (_0x1fb0bf || cfg.botSock).sendPresenceUpdate("paused", _0x4471af);
    } catch {}
  }
  static ['clearAllSessions']() {
    (cfg.activeSessions.forEach(_0x5c84f5 => {
      clearInterval(_0x5c84f5.switchInterval);
      if (_0x5c84f5.stopTimeout) clearTimeout(_0x5c84f5.stopTimeout);
    }), cfg.activeSessions.clear());
  }
}
export default {
  name: 'autorecordtyping',
  alias: ["art", "recordtype", "typingrecord", "comborec", "fakecombo", "rtsim"],
  desc: "Alternates between typing and recording indicators on incoming messages",
  category: "Owner",
  usage: ".autorecordtyping [dm|groups|both|off|status|<number>|switch <secs>|<1-120>]",
  async execute(_0x52fc29, _0x1cbb39, _0x1e1384, _0x5861fb, _0x3107cc) {
    try {
      const _0x3f0f7c = _0x1cbb39.key.remoteJid;
      !cfg.isHooked && (cfg.botSock = _0x52fc29, AutoRecordTypingManager.hookIntoBot(), cfg.isHooked = true);
      const _0x5f3525 = _0x3107cc?.jidManager?.isOwner(_0x1cbb39) || _0x1cbb39.key.fromMe;
      if (!_0x5f3525) return _0x52fc29.sendMessage(_0x3f0f7c, {
        text: AUTOMATION.U274C + " *Owner Only Command*"
      }, {
        quoted: _0x1cbb39
      });
      const _0x404b13 = (_0x1e1384[0] || '').toLowerCase().trim(), _0x1e8ca5 = (_0x1e1384[1] || '').toLowerCase().trim(), _0x155e15 = {
        off: AUTOMATION.U274C + " OFF",
        dm: AUTOMATION.U1F4AC + " DMs only",
        groups: AUTOMATION.U1F465 + '\x20Groups\x20only',
        both: AUTOMATION.U1F310 + " DMs + Groups",
        single: AUTOMATION.U1F3AF + " Single: " + (cfg.targetJid || 'none')
      };
      if (!_0x404b13 || _0x404b13 === "status" || _0x404b13 === "info") return _0x52fc29.sendMessage(_0x3f0f7c, {
        text: '╭┄〔 \x20' + AUTOMATION.U1F500 + " *AUTO RECORD+TYPING* 〕┄╮\n" + '┆\x0a' + ("┆ Mode     : " + (_0x155e15[cfg.mode] || cfg.mode) + '\x0a') + ("┆ Duration : " + cfg.duration + 's\x0a') + ("┆ Switches : every " + cfg.switchEvery + 's\x0a') + ("┆ Active   : " + cfg.activeSessions.size + " chat(s)\n") + '┆\x0a' + ("┆ ✦ *" + _0x5861fb + 'autorecordtyping\x20dm*\x0a') + "┆   └─ All DMs\n" + ('┆ ✦ *' + _0x5861fb + 'autorecordtyping\x20groups*\x0a') + "┆   └─ All groups\n" + ("┆ ✦ *" + _0x5861fb + "autorecordtyping both*\n") + "┆   └─ DMs + Groups\n" + ("┆ ✦ *" + _0x5861fb + "autorecordtyping <number>*\n") + '┆ \x20╰┄ \x20Single\x20target\x20chat\x0a' + ("┆ ✦ *" + _0x5861fb + 'autorecordtyping\x20off*\x0a') + "┆   └─ Disable\n" + ('┆ ✦ *' + _0x5861fb + "autorecordtyping <1-120>*\n") + "┆   └─ Set total duration\n" + ('┆ ✦ *' + _0x5861fb + "autorecordtyping switch <1-30>*\n") + "┆   └─ Set how often it switches\n" + ('╰┄ \x20' + getFooter(_0x1cbb39.key.participant || _0x1cbb39.key.remoteJid))
      }, {
        quoted: _0x1cbb39
      });
      if (_0x404b13 === 'switch') {
        const _0x3d5fee = parseInt(_0x1e8ca5);
        if (!isNaN(_0x3d5fee) && _0x3d5fee >= 1 && _0x3d5fee <= 30) return (cfg.switchEvery = _0x3d5fee, saveConfig(), _0x52fc29.sendMessage(_0x3f0f7c, {
          text: AUTOMATION.U2705 + " *Switch interval set to " + _0x3d5fee + "s*\n\nThe indicator will now alternate every *" + _0x3d5fee + " seconds*."
        }, {
          quoted: _0x1cbb39
        }));
        return _0x52fc29.sendMessage(_0x3f0f7c, {
          text: AUTOMATION.U274C + '\x20Please\x20provide\x20a\x20value\x20between\x201–30.\x0aExample:\x20`' + _0x5861fb + "autorecordtyping switch 5`"
        }, {
          quoted: _0x1cbb39
        });
      }
      if (['dm', "dms", "private"].includes(_0x404b13)) return (cfg.mode = 'dm', cfg.targetJid = null, saveConfig(), AutoRecordTypingManager.clearAllSessions(), _0x52fc29.sendMessage(_0x3f0f7c, {
        text: AUTOMATION.U2705 + '\x20*Combo\x20Sim:\x20DMs\x20Only*\x0a\x0aWill\x20alternate\x20typing\x20↔\x20recording\x20in\x20all\x20private\x20chats.\x0aDuration:\x20' + cfg.duration + "s  |  Switch: every " + cfg.switchEvery + 's'
      }, {
        quoted: _0x1cbb39
      }));
      if (["groups", 'group', 'gc'].includes(_0x404b13)) return (cfg.mode = "groups", cfg.targetJid = null, saveConfig(), AutoRecordTypingManager.clearAllSessions(), _0x52fc29.sendMessage(_0x3f0f7c, {
        text: AUTOMATION.U2705 + '\x20*Combo\x20Sim:\x20Groups\x20Only*\x0a\x0aWill\x20alternate\x20typing\x20↔\x20recording\x20in\x20all\x20group\x20chats.\x0aDuration:\x20' + cfg.duration + "s  |  Switch: every " + cfg.switchEvery + 's'
      }, {
        quoted: _0x1cbb39
      }));
      if (["both", 'all', 'on', "enable"].includes(_0x404b13)) return (cfg.mode = "both", cfg.targetJid = null, saveConfig(), _0x52fc29.sendMessage(_0x3f0f7c, {
        text: AUTOMATION.U2705 + " *Combo Sim: DMs + Groups*\n\nWill alternate typing ↔ recording in all chats.\nDuration: " + cfg.duration + "s  |  Switch: every " + cfg.switchEvery + 's'
      }, {
        quoted: _0x1cbb39
      }));
      if (['off', "disable", "stop"].includes(_0x404b13)) return (cfg.mode = "off", cfg.targetJid = null, saveConfig(), AutoRecordTypingManager.clearAllSessions(), _0x52fc29.sendMessage(_0x3f0f7c, {
        text: AUTOMATION.U274C + '\x20*Combo\x20Sim\x20Disabled*\x0a\x0aRecording\x20+\x20Typing\x20simulation\x20is\x20now\x20off.'
      }, {
        quoted: _0x1cbb39
      }));
      const _0x5782c5 = parseInt(_0x404b13);
      if (!isNaN(_0x5782c5) && _0x5782c5 >= 1 && _0x5782c5 <= 120) return (cfg.duration = _0x5782c5, saveConfig(), _0x52fc29.sendMessage(_0x3f0f7c, {
        text: AUTOMATION.U2705 + " *Duration set to " + _0x5782c5 + "s*\n\nCurrent mode: " + cfg.mode + (cfg.targetJid ? '\x0aTarget:\x20' + cfg.targetJid : '') + "\nSwitch: every " + cfg.switchEvery + 's'
      }, {
        quoted: _0x1cbb39
      }));
      const _0x487584 = _0x1e1384[0].includes('@') ? _0x1e1384[0].trim() : normalizeToJid(_0x1e1384[0]);
      if (_0x487584) {
        (cfg.mode = "single", cfg.targetJid = _0x487584, saveConfig(), AutoRecordTypingManager.clearAllSessions());
        const _0x426d07 = _0x487584.split('@')[0];
        return _0x52fc29.sendMessage(_0x3f0f7c, {
          text: AUTOMATION.U2705 + " *Combo Sim: Single Chat*\n\n" + (AUTOMATION.U1F3AF + " Target: *+" + _0x426d07 + '*\x0a') + (AUTOMATION.U23F1_FE0F + '\x20Duration:\x20' + cfg.duration + 's\x0a') + (AUTOMATION.U1F500 + '\x20Switch:\x20every\x20' + cfg.switchEvery + 's\x0a\x0a') + 'Typing\x20↔\x20Recording\x20will\x20alternate\x20only\x20in\x20that\x20person\x27s\x20DM.\x0a\x0a' + ("• Change: `" + _0x5861fb + 'autorecordtyping\x20<new_number>`\x0a') + ("• Disable: `" + _0x5861fb + "autorecordtyping off`")
        }, {
          quoted: _0x1cbb39
        });
      }
      return _0x52fc29.sendMessage(_0x3f0f7c, {
        text: '╭┄〔 \x20' + AUTOMATION.U1F500 + " *AUTO RECORD+TYPING* 〕┄╮\n" + '┆\x0a' + ("┆ ✦ *" + _0x5861fb + "autorecordtyping dm*  — DMs only\n") + ("┆ ✦ *" + _0x5861fb + "autorecordtyping groups*  — Groups only\n") + ("┆ ✦ *" + _0x5861fb + "autorecordtyping both*  — All chats\n") + ("┆ ✦ *" + _0x5861fb + "autorecordtyping <number>*  — One person\n") + ("┆ ✦ *" + _0x5861fb + "autorecordtyping off*  — Stop\n") + ("┆ ✦ *" + _0x5861fb + "autorecordtyping <1-120>*  — Set duration\n") + ("┆ ✦ *" + _0x5861fb + "autorecordtyping switch <1-30>*  — Switch speed\n") + ("╰┄ " + getFooter(_0x1cbb39.key.participant || _0x1cbb39.key.remoteJid))
      }, {
        quoted: _0x1cbb39
      });
    } catch (_0x30f1cf) {
      (console.error("[AutoRecordTyping] execute error:", _0x30f1cf), await _0x52fc29.sendMessage(_0x1cbb39.key.remoteJid, {
        text: AUTOMATION.U274C + " AutoRecordTyping error: " + _0x30f1cf.message
      }, {
        quoted: _0x1cbb39
      }));
    }
  }
};
globalThis._autoRecordTypingInit = _0x3d43b8 => {
  (loadConfig(), cfg.mode !== "off" && AutoRecordTypingManager.initialize(_0x3d43b8));
};
