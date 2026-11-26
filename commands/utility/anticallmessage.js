import {UTILITY} from '../../lib/emojis.js';
import _0x15034f from 'fs';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const ANTICALL_FILE = "./anticall.json";
function loadAntiCall() {
  try {
    return JSON.parse(_0x15034f.readFileSync(ANTICALL_FILE, "utf8"));
  } catch {
    return {
      settings: {},
      callLogs: [],
      blockedNumbers: []
    };
  }
}
function saveAntiCall(_0x4917a5) {
  try {
    _0x15034f.writeFileSync(ANTICALL_FILE, JSON.stringify(_0x4917a5, null, 2));
  } catch (_0x3522d0) {
    console.error("[anticallmessage] save error:", _0x3522d0.message);
  }
}
function cleanJid(_0x56219f) {
  if (!_0x56219f) return _0x56219f;
  const _0x34e167 = _0x56219f.split(':')[0];
  return _0x34e167.includes('@') ? _0x34e167 : _0x34e167 + "@s.whatsapp.net";
}
export default {
  name: "anticallmessage",
  alias: ["anticallmsg", "acmsg"],
  description: "Set or view the auto-reply message sent when a call is rejected.",
  ownerOnly: true,
  execute: async (_0x3f415a, _0xbdbd75, _0xdf66f8, _0x3c1ea8, _0x3c36be) => {
    const _0x5a6998 = _0xbdbd75.key.remoteJid, _0x27693f = cleanJid(_0x3f415a.user?.id), _0x37d275 = _0xdf66f8[0]?.toLowerCase(), _0xd8aa9c = getOwnerName(), _0x8e0824 = loadAntiCall();
    !_0x8e0824.settings[_0x27693f] && (_0x8e0824.settings[_0x27693f] = {
      enabled: false,
      mode: 'decline',
      autoMessage: false,
      message: "Sorry, I don't accept calls. Please send a text message instead.",
      lastUpdated: new Date().toISOString()
    });
    const _0x5d33dc = _0x8e0824.settings[_0x27693f];
    if (!_0x37d275 || _0x37d275 !== "off" && _0x37d275 !== "view" && _0x37d275 !== 'clear') {
      const _0x43fff4 = _0xdf66f8.join('\x20').trim();
      if (!_0x43fff4) {
        const _0x30b69a = "╭┄〔 " + UTILITY.CALL + '\x20*ANTICALL\x20MESSAGE*\x20〕┄╮\n┆\n' + ("┆ ✦ *" + _0x3c1ea8 + "anticallmessage [text]*\n┆  ╰┄ Set auto-reply message for calls\n") + ('┆ ✦ *' + _0x3c1ea8 + "anticallmessage off*\n┆  ╰┄ Disable auto-reply message\n") + ("┆ ✦ *" + _0x3c1ea8 + "anticallmessage view*\n┆  ╰┄ View current message\n┆\n") + ("┆ ✦ *Status:* " + (_0x5d33dc.autoMessage ? UTILITY.SUCCESS + " ON" : UTILITY.ERROR + ' OFF') + '\x0a') + (_0x5d33dc.autoMessage ? "┆ ✦ *Message:* _" + _0x5d33dc.message.substring(0, 50) + (_0x5d33dc.message.length > 50 ? '…' : '') + "_\n┆\n" : '┆\x0a') + ("╰┄ " + getFooter(_0xbdbd75.key.participant || _0xbdbd75.key.remoteJid));
        return _0x3f415a.sendMessage(_0x5a6998, {
          text: _0x30b69a
        }, {
          quoted: _0xbdbd75
        });
      }
      (_0x5d33dc.autoMessage = true, _0x5d33dc.message = _0x43fff4, _0x5d33dc.lastUpdated = new Date().toISOString(), _0x8e0824.settings[_0x27693f] = _0x5d33dc, saveAntiCall(_0x8e0824));
      const _0x1cdec1 = "╭┄〔 " + UTILITY.CALL + '\x20*ANTICALL\x20MESSAGE*\x20〕┄╮\n┆\n' + ('┆ ✦ *Auto-reply:*\x20' + UTILITY.SUCCESS + " ON\n") + ('┆ ✦ *Message:*\x20_' + _0x43fff4.substring(0, 50) + (_0x43fff4.length > 50 ? '…' : '') + "_\n┆\n") + "┆ ✦ Sent after every rejected call\n" + ('┆  ╰┄ Use\x20*' + _0x3c1ea8 + "anticall enable* to activate\n┆\n") + ('╰┄ ' + getFooter(_0xbdbd75.key.participant || _0xbdbd75.key.remoteJid));
      return _0x3f415a.sendMessage(_0x5a6998, {
        text: _0x1cdec1
      }, {
        quoted: _0xbdbd75
      });
    }
    if (_0x37d275 === "view") {
      const _0x4d0335 = '╭┄〔\x20' + UTILITY.CALL + " *ANTICALL MESSAGE* 〕┄╮\n┆\n" + ("┆ ✦ *Auto-reply:* " + (_0x5d33dc.autoMessage ? UTILITY.SUCCESS + " ON" : UTILITY.ERROR + " OFF") + '\x0a') + (_0x5d33dc.autoMessage ? '┆ ✦ *Message:*\x20_' + _0x5d33dc.message.substring(0, 50) + (_0x5d33dc.message.length > 50 ? '…' : '') + '_\x0a┆\x0a' : "┆  ╰┄ No message set\n┆\n") + ("╰┄ " + getFooter(_0xbdbd75.key.participant || _0xbdbd75.key.remoteJid));
      return _0x3f415a.sendMessage(_0x5a6998, {
        text: _0x4d0335
      }, {
        quoted: _0xbdbd75
      });
    }
    if (_0x37d275 === "off" || _0x37d275 === 'clear') {
      (_0x5d33dc.autoMessage = false, _0x5d33dc.lastUpdated = new Date().toISOString(), _0x8e0824.settings[_0x27693f] = _0x5d33dc, saveAntiCall(_0x8e0824));
      const _0x9b282c = "╭─⌈ " + UTILITY.CALL + " *ANTICALL MESSAGE* ⌋\n│\n" + ("├─⊷ *Auto-reply:* " + UTILITY.ERROR + '\x20OFF\x0a') + '│\x20\x20└⊷\x20No\x20message\x20will\x20be\x20sent\x20after\x20rejected\x20calls\x0a│\x0a' + ("╰⊷ " + getFooter(_0xbdbd75.key.participant || _0xbdbd75.key.remoteJid));
      return _0x3f415a.sendMessage(_0x5a6998, {
        text: _0x9b282c
      }, {
        quoted: _0xbdbd75
      });
    }
  }
};
