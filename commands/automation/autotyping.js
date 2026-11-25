import {AUTOMATION} from '../../lib/emojis.js';
import _0x19b6af from '../../lib/database.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const CONFIG_DB_KEY = "autotyping_config", autoTypingConfig = {
  mode: "off",
  duration: 10,
  targetJid: null,
  activeTypers: new Map(),
  botSock: null,
  isHooked: false
};
function loadConfig() {
  try {
    const _0x8d2e57 = _0x19b6af.getConfigSync(CONFIG_DB_KEY, {
      mode: "off",
      duration: 10,
      targetJid: null
    });
    (autoTypingConfig.mode = _0x8d2e57.mode || "off", autoTypingConfig.duration = _0x8d2e57.duration || 10, autoTypingConfig.targetJid = _0x8d2e57.targetJid || null);
  } catch {}
}
function saveConfig() {
  try {
    const _0x1825c0 = {
      mode: autoTypingConfig.mode,
      duration: autoTypingConfig.duration,
      targetJid: autoTypingConfig.targetJid || null
    };
    _0x19b6af.setConfig(CONFIG_DB_KEY, _0x1825c0).catch(() => {});
  } catch {}
}
function normalizeToJid(_0x4436cd) {
  const _0x275ec6 = _0x4436cd.replace(/[^0-9]/g, '');
  if (_0x275ec6.length >= 7) return _0x275ec6 + "@s.whatsapp.net";
  return null;
}
loadConfig();
function shouldTypeInChat(_0x50de25) {
  const _0x579ff5 = autoTypingConfig.mode;
  if (_0x579ff5 === "off") return false;
  if (_0x579ff5 === "single") return _0x50de25 === autoTypingConfig.targetJid;
  const _0x21bde9 = _0x50de25.endsWith("@g.us");
  if (_0x579ff5 === "both") return true;
  if (_0x579ff5 === "groups" && _0x21bde9) return true;
  if (_0x579ff5 === 'dm' && !_0x21bde9) return true;
  return false;
}
class AutoTypingManager {
  static ["initialize"](_0x22394a) {
    (_0x22394a && autoTypingConfig.botSock && autoTypingConfig.botSock !== _0x22394a && (autoTypingConfig.isHooked = false), !autoTypingConfig.isHooked && _0x22394a && (autoTypingConfig.botSock = _0x22394a, this.hookIntoBot(), autoTypingConfig.isHooked = true));
  }
  static ['hookIntoBot']() {
    if (!autoTypingConfig.botSock?.ev) return;
    autoTypingConfig.botSock.ev.on("messages.upsert", async _0x23b03c => {
      await this.handleIncomingMessage(_0x23b03c);
    });
  }
  static async ["handleIncomingMessage"](_0xd22e6) {
    try {
      if (!_0xd22e6?.messages?.length) return;
      const _0x57d577 = _0xd22e6.messages[0], _0x4ccb8d = autoTypingConfig.botSock;
      if (!_0x57d577?.key || _0x57d577.key.fromMe || autoTypingConfig.mode === "off") return;
      const _0x32061b = _0x57d577.message?.conversation || _0x57d577.message?.extendedTextMessage?.text || _0x57d577.message?.imageMessage?.caption || '';
      if (_0x32061b.trim().startsWith('.')) return;
      const _0x53b9e3 = _0x57d577.key.remoteJid;
      if (!_0x53b9e3 || !shouldTypeInChat(_0x53b9e3)) return;
      const _0x4489be = Date.now();
      if (autoTypingConfig.activeTypers.has(_0x53b9e3)) {
        const _0x3654af = autoTypingConfig.activeTypers.get(_0x53b9e3);
        _0x3654af.lastMessageTime = _0x4489be;
        if (_0x3654af.timeoutId) clearTimeout(_0x3654af.timeoutId);
        _0x3654af.timeoutId = setTimeout(async () => {
          await this.stopTypingInChat(_0x53b9e3, _0x4ccb8d);
        }, autoTypingConfig.duration * 1000);
        return;
      }
      await _0x4ccb8d.sendPresenceUpdate("composing", _0x53b9e3);
      const _0x2ed371 = setInterval(async () => {
        try {
          autoTypingConfig.activeTypers.has(_0x53b9e3) && await _0x4ccb8d.sendPresenceUpdate('composing', _0x53b9e3);
        } catch {}
      }, 2000), _0xe3e1de = setTimeout(async () => {
        await this.stopTypingInChat(_0x53b9e3, _0x4ccb8d);
      }, autoTypingConfig.duration * 1000);
      autoTypingConfig.activeTypers.set(_0x53b9e3, {
        intervalId: _0x2ed371,
        timeoutId: _0xe3e1de,
        startTime: _0x4489be,
        lastMessageTime: _0x4489be
      });
    } catch (_0x6ed570) {
      console.error("Auto-typing handler error:", _0x6ed570.message);
    }
  }
  static async ['stopTypingInChat'](_0x2a38f0, _0x129ba5) {
    if (autoTypingConfig.activeTypers.has(_0x2a38f0)) {
      const _0x5c26c8 = autoTypingConfig.activeTypers.get(_0x2a38f0);
      clearInterval(_0x5c26c8.intervalId);
      if (_0x5c26c8.timeoutId) clearTimeout(_0x5c26c8.timeoutId);
      autoTypingConfig.activeTypers.delete(_0x2a38f0);
      try {
        await _0x129ba5.sendPresenceUpdate("paused", _0x2a38f0);
      } catch {}
    }
  }
  static ["clearAllTypers"]() {
    (autoTypingConfig.activeTypers.forEach(_0x5d8549 => {
      clearInterval(_0x5d8549.intervalId);
      if (_0x5d8549.timeoutId) clearTimeout(_0x5d8549.timeoutId);
    }), autoTypingConfig.activeTypers.clear());
  }
}
export default {
  name: "autotyping",
  alias: ["autotype", 'fake', "typingsim", 'typingtoggle', "atype", "typingmode", "typing"],
  desc: "Toggle auto fake typing indicator — can target a specific chat",
  category: 'Owner',
  usage: ".autotyping [dm|groups|both|off|status|<number>|<jid>]",
  async execute(_0x2132a2, _0x55b889, _0x24a979, _0x5194c8, _0x35129c) {
    try {
      const _0x552abb = _0x55b889.key.remoteJid;
      !autoTypingConfig.isHooked && (autoTypingConfig.botSock = _0x2132a2, AutoTypingManager.hookIntoBot(), autoTypingConfig.isHooked = true);
      const _0x544ffb = _0x35129c?.jidManager?.isOwner(_0x55b889) || _0x55b889.key.fromMe;
      if (!_0x544ffb) return _0x2132a2.sendMessage(_0x552abb, {
        text: AUTOMATION.U274C + '\x20*Owner\x20Only\x20Command*'
      }, {
        quoted: _0x55b889
      });
      const _0x4b88da = (_0x24a979[0] || '').toLowerCase().trim();
      if (!_0x4b88da || _0x4b88da === "status" || _0x4b88da === 'info') {
        const _0x416bce = autoTypingConfig.mode, _0x56ec9b = {
          off: AUTOMATION.U274C + " OFF",
          dm: AUTOMATION.U1F4AC + " DMs only",
          groups: AUTOMATION.U1F465 + " Groups only",
          both: AUTOMATION.U1F310 + " DMs + Groups",
          single: AUTOMATION.U1F3AF + '\x20Single\x20chat:\x20' + (autoTypingConfig.targetJid || "none")
        };
        return _0x2132a2.sendMessage(_0x552abb, {
          text: "╭─⌈ " + AUTOMATION.U1F916 + " *AUTO-TYPING* ⌋\n│\n│ Mode: " + (_0x56ec9b[_0x416bce] || _0x416bce) + '\x0a│\x20Duration:\x20' + autoTypingConfig.duration + 's\x0a│\x20Active:\x20' + autoTypingConfig.activeTypers.size + '\x0a│\x0a├─⊷\x20*' + _0x5194c8 + "autotyping <number>*\n│  └⊷ Type only in that person's DM\n│  └⊷ e.g. " + _0x5194c8 + "autotyping 254703397679\n├─⊷ *" + _0x5194c8 + 'autotyping\x20dm*\x0a│\x20\x20└⊷\x20All\x20DMs\x0a├─⊷\x20*' + _0x5194c8 + 'autotyping\x20groups*\x0a│\x20\x20└⊷\x20All\x20groups\x0a├─⊷\x20*' + _0x5194c8 + "autotyping both*\n│  └⊷ DMs + Groups\n├─⊷ *" + _0x5194c8 + "autotyping off*\n│  └⊷ Disable\n├─⊷ *" + _0x5194c8 + "autotyping <1-60>*\n│  └⊷ Set duration\n╰⊷ " + getFooter(_0x55b889.key.participant || _0x55b889.key.remoteJid)
        }, {
          quoted: _0x55b889
        });
      }
      if (['dm', "dms", "private"].includes(_0x4b88da)) return (autoTypingConfig.mode = 'dm', autoTypingConfig.targetJid = null, saveConfig(), AutoTypingManager.clearAllTypers(), _0x2132a2.sendMessage(_0x552abb, {
        text: AUTOMATION.U2705 + " *Auto-Typing: DMs Only*\n\nTyping indicator will show in all private chats.\nDuration: " + autoTypingConfig.duration + 's'
      }, {
        quoted: _0x55b889
      }));
      if (['groups', "group", 'gc'].includes(_0x4b88da)) return (autoTypingConfig.mode = "groups", autoTypingConfig.targetJid = null, saveConfig(), AutoTypingManager.clearAllTypers(), _0x2132a2.sendMessage(_0x552abb, {
        text: AUTOMATION.U2705 + " *Auto-Typing: Groups Only*\n\nTyping indicator will show in all group chats.\nDuration: " + autoTypingConfig.duration + 's'
      }, {
        quoted: _0x55b889
      }));
      if (["both", 'all', 'on', "enable"].includes(_0x4b88da)) return (autoTypingConfig.mode = 'both', autoTypingConfig.targetJid = null, saveConfig(), _0x2132a2.sendMessage(_0x552abb, {
        text: AUTOMATION.U2705 + " *Auto-Typing: DMs + Groups*\n\nTyping indicator will show in all chats.\nDuration: " + autoTypingConfig.duration + 's'
      }, {
        quoted: _0x55b889
      }));
      if (["off", 'disable', 'stop'].includes(_0x4b88da)) return (autoTypingConfig.mode = "off", autoTypingConfig.targetJid = null, saveConfig(), AutoTypingManager.clearAllTypers(), _0x2132a2.sendMessage(_0x552abb, {
        text: AUTOMATION.U274C + " *Auto-Typing Disabled*\n\nTyping indicator is now off for all chats."
      }, {
        quoted: _0x55b889
      }));
      const _0x59a98f = parseInt(_0x4b88da);
      if (!isNaN(_0x59a98f) && _0x59a98f >= 1 && _0x59a98f <= 60) return (autoTypingConfig.duration = _0x59a98f, saveConfig(), _0x2132a2.sendMessage(_0x552abb, {
        text: AUTOMATION.U2705 + '\x20*Duration\x20set\x20to\x20' + _0x59a98f + "s*\n\nCurrent mode: " + autoTypingConfig.mode + (autoTypingConfig.targetJid ? "\nTarget: " + autoTypingConfig.targetJid : '')
      }, {
        quoted: _0x55b889
      }));
      const _0x466c16 = _0x24a979[0].includes('@') ? _0x24a979[0].trim() : normalizeToJid(_0x24a979[0]);
      if (_0x466c16) {
        (autoTypingConfig.mode = "single", autoTypingConfig.targetJid = _0x466c16, saveConfig(), AutoTypingManager.clearAllTypers());
        const _0x50cbb0 = _0x466c16.split('@')[0];
        return _0x2132a2.sendMessage(_0x552abb, {
          text: AUTOMATION.U2705 + '\x20*Auto-Typing:\x20Single\x20Chat*\x0a\x0a' + AUTOMATION.U1F3AF + " Target: *+" + _0x50cbb0 + '*\x0a' + AUTOMATION.U23F1_FE0F + " Duration: " + autoTypingConfig.duration + 's\x0a\x0aTyping\x20will\x20only\x20be\x20simulated\x20in\x20that\x20person\x27s\x20DM.\x0a\x0a•\x20Change\x20target:\x20`' + _0x5194c8 + "autotyping <new_number>`\n• Disable: `" + _0x5194c8 + "autotyping off`"
        }, {
          quoted: _0x55b889
        });
      }
      return _0x2132a2.sendMessage(_0x552abb, {
        text: "╭─⌈ " + AUTOMATION.U1F916 + " *AUTO-TYPING* ⌋\n│\n├─⊷ *" + _0x5194c8 + "autotyping <number>*\n│  └⊷ Target one specific chat\n│  └⊷ e.g. " + _0x5194c8 + "autotyping 254703397679\n├─⊷ *" + _0x5194c8 + "autotyping dm*\n│  └⊷ All DMs\n├─⊷ *" + _0x5194c8 + 'autotyping\x20groups*\x0a│\x20\x20└⊷\x20All\x20groups\x0a├─⊷\x20*' + _0x5194c8 + "autotyping both*\n│  └⊷ DMs + Groups\n├─⊷ *" + _0x5194c8 + "autotyping off*\n│  └⊷ Disable\n├─⊷ *" + _0x5194c8 + "autotyping <1-60>*\n│  └⊷ Set duration\n╰⊷ " + getFooter(_0x55b889.key.participant || _0x55b889.key.remoteJid)
      }, {
        quoted: _0x55b889
      });
    } catch (_0x5435b4) {
      (console.error("AutoTyping error:", _0x5435b4), await _0x2132a2.sendMessage(_0x55b889.key.remoteJid, {
        text: AUTOMATION.U274C + " AutoTyping error: " + _0x5435b4.message
      }, {
        quoted: _0x55b889
      }));
    }
  }
};
globalThis._autoTypingInit = _0x3c7a47 => {
  (loadConfig(), autoTypingConfig.mode !== 'off' && AutoTypingManager.initialize(_0x3c7a47));
};
