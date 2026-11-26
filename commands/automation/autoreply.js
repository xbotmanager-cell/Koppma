import {AUTOMATION} from '../../lib/emojis.js';
import _0x1c5953 from '../../lib/database.js';
import {getOwnerName} from '../../lib/menuHelper.js';
const CONFIG_DB_KEY = "autoreply_config", DEFAULT_MESSAGE = 'Hello,\x20VIPBOT\x20is\x20online', COOLDOWN_MS = 60000, DEFAULT_SETTINGS = {
  enabled: false,
  message: DEFAULT_MESSAGE
}, replyCache = new Map();
try {
  const _init = _0x1c5953.getConfigSync(CONFIG_DB_KEY, DEFAULT_SETTINGS);
  (globalThis._autoreplyEnabled = !!_init?.enabled, globalThis._autoreplyMessage = _init?.message || DEFAULT_MESSAGE);
} catch {
  globalThis._autoreplyEnabled = false;
}
function loadSettings() {
  try {
    return {
      ...DEFAULT_SETTINGS,
      ..._0x1c5953.getConfigSync(CONFIG_DB_KEY, DEFAULT_SETTINGS)
    };
  } catch {
    return {
      ...DEFAULT_SETTINGS
    };
  }
}
function saveSettings(_0x431dfd) {
  try {
    (_0x1c5953.setConfig(CONFIG_DB_KEY, _0x431dfd).catch(() => {}), globalThis._autoreplyEnabled = !!_0x431dfd?.enabled, globalThis._autoreplyMessage = _0x431dfd?.message || DEFAULT_MESSAGE);
  } catch (_0x232fd6) {
    console.error('[AUTOREPLY]\x20saveSettings\x20error:', _0x232fd6);
  }
}
let autoreplyActive = false, _autoreplyHookedSock = null;
function setupAutoreply(_0x2a8175) {
  if (autoreplyActive && _autoreplyHookedSock === _0x2a8175) return;
  if (_autoreplyHookedSock !== _0x2a8175) autoreplyActive = false;
  (_0x2a8175.ev.on("messages.upsert", async ({messages: _0x5d8d76}) => {
    try {
      const _0x436ca1 = loadSettings();
      if (!_0x436ca1.enabled) return;
      for (const _0x5eb4d6 of _0x5d8d76) {
        if (_0x5eb4d6.key.fromMe) continue;
        const _0x236713 = _0x5eb4d6.key.remoteJid;
        if (!_0x236713 || _0x236713 === "status@broadcast") continue;
        if (_0x236713.endsWith("@g.us")) continue;
        const _0x4de88c = Date.now(), _0x6ac661 = replyCache.get(_0x236713) || 0;
        if (_0x4de88c - _0x6ac661 < COOLDOWN_MS) continue;
        (replyCache.set(_0x236713, _0x4de88c), await _0x2a8175.sendMessage(_0x236713, {
          text: _0x436ca1.message
        }));
      }
    } catch {}
  }), autoreplyActive = true, _autoreplyHookedSock = _0x2a8175, console.log("[AUTOREPLY] Event listener registered"));
}
export function startAutoreply(_0x15529b) {
  (!autoreplyActive || _autoreplyHookedSock !== _0x15529b) && setupAutoreply(_0x15529b);
}
export default {
  name: "autoreply",
  aliases: ['ar', "setreply", 'autoreply'],
  description: "Auto-reply to incoming DMs with a customizable message",
  category: "automation",
  async execute(_0x108d6f, _0x259b7b, _0x47dc46, _0x56feb1, _0x16af89) {
    const _0x462232 = _0x259b7b.key.remoteJid, {jidManager: _0x23e119} = _0x16af89, _0x20b3d7 = _0x16af89?.isSudo ? _0x16af89.isSudo() : false;
    if (!_0x23e119.isOwner(_0x259b7b) && !_0x20b3d7) return _0x108d6f.sendMessage(_0x462232, {
      text: AUTOMATION.U274C + '\x20*Owner\x20Only\x20Command!*\x0a\x0aOnly\x20the\x20bot\x20owner\x20can\x20manage\x20autoreply.'
    }, {
      quoted: _0x259b7b
    });
    (!autoreplyActive || _autoreplyHookedSock !== _0x108d6f) && setupAutoreply(_0x108d6f);
    const _0xea7fa6 = _0x47dc46[0]?.toLowerCase(), _0x224622 = loadSettings();
    if (!_0xea7fa6 || _0xea7fa6 === "status") {
      const _0x22725b = _0x224622.enabled ? AUTOMATION.U1F7E2 + " ON" : AUTOMATION.U1F534 + " OFF", _0x295856 = _0x224622.message.length > 60 ? _0x224622.message.substring(0, 60) + '…' : _0x224622.message;
      return _0x108d6f.sendMessage(_0x462232, {
        text: "╭┄〔 " + AUTOMATION.U1F4AC + " *AUTOREPLY STATUS* 〕┄╮\n┆\n┆ ◎ *Status:* " + _0x22725b + '\x0a┆ ◎\x20*Message:*\x0a┆ \x20\x20' + _0x295856 + "\n┆\n╰┄ *Usage:*\n   • `" + _0x56feb1 + 'autoreply\x20on`\x0a\x20\x20\x20•\x20`' + _0x56feb1 + "autoreply off`\n   • `" + _0x56feb1 + "autoreply message <text>`\n   • `" + _0x56feb1 + "autoreply reset`"
      }, {
        quoted: _0x259b7b
      });
    }
    if (_0xea7fa6 === 'on') return (_0x224622.enabled = true, saveSettings(_0x224622), _0x108d6f.sendMessage(_0x462232, {
      text: AUTOMATION.U2705 + " *Autoreply Enabled!*\n\n" + AUTOMATION.U1F4E8 + '\x20*Reply\x20message:*\x0a' + _0x224622.message + '\x0a\x0a' + AUTOMATION.U1F4A1 + " Tip: Use `" + _0x56feb1 + "autoreply message <text>` to set a custom reply."
    }, {
      quoted: _0x259b7b
    }));
    if (_0xea7fa6 === "off") return (_0x224622.enabled = false, saveSettings(_0x224622), _0x108d6f.sendMessage(_0x462232, {
      text: AUTOMATION.U274C + " *Autoreply Disabled!*\n\nThe bot will no longer auto-reply to incoming DMs."
    }, {
      quoted: _0x259b7b
    }));
    if (_0xea7fa6 === "message" || _0xea7fa6 === "setmsg" || _0xea7fa6 === "msg" || _0xea7fa6 === "set") {
      const _0x131b3a = _0x47dc46.slice(1).join('\x20').trim();
      if (!_0x131b3a) return _0x108d6f.sendMessage(_0x462232, {
        text: AUTOMATION.U26A0_FE0F + " *Please provide a message!*\n\nExample:\n`" + _0x56feb1 + 'autoreply\x20message\x20Hello!\x20I\x27ll\x20get\x20back\x20to\x20you\x20shortly.`'
      }, {
        quoted: _0x259b7b
      });
      return (_0x224622.message = _0x131b3a, saveSettings(_0x224622), _0x108d6f.sendMessage(_0x462232, {
        text: AUTOMATION.U2705 + " *Autoreply message updated!*\n\n" + AUTOMATION.U1F4E8 + " *New message:*\n" + _0x131b3a
      }, {
        quoted: _0x259b7b
      }));
    }
    if (_0xea7fa6 === "reset") return (_0x224622.message = DEFAULT_MESSAGE, saveSettings(_0x224622), _0x108d6f.sendMessage(_0x462232, {
      text: AUTOMATION.U2705 + " *Autoreply message reset to default!*\n\n" + AUTOMATION.U1F4E8 + " *Message:*\n" + DEFAULT_MESSAGE
    }, {
      quoted: _0x259b7b
    }));
    return _0x108d6f.sendMessage(_0x462232, {
      text: "╭┄〔 " + AUTOMATION.U1F4AC + " *AUTOREPLY HELP* 〕┄╮\n┆\n┆  • `" + _0x56feb1 + "autoreply on` — Enable autoreply\n┆  • `" + _0x56feb1 + 'autoreply\x20off`\x20—\x20Disable\x20autoreply\x0a┆ •\x20`' + _0x56feb1 + 'autoreply\x20message\x20<text>`\x20—\x20Set\x20custom\x20message\x0a┆ •\x20`' + _0x56feb1 + "autoreply reset` — Reset to default message\n┆  • `" + _0x56feb1 + "autoreply status` — View current status\n┆\n╰┄ *Default reply:* " + DEFAULT_MESSAGE
    }, {
      quoted: _0x259b7b
    });
  }
};
