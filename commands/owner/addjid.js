import _0x10a333 from '../../lib/emojis.js';
import _0x1d839a from 'fs';
import _0x333530 from 'path';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const DEV_NUMBERS = ['255780470905'], CONFIG_FILE = "./data/autofollow/extra_channels.json";
function ensureDir() {
  !_0x1d839a.existsSync('./data/autofollow') && _0x1d839a.mkdirSync("./data/autofollow", {
    recursive: true
  });
}
function loadChannels() {
  ensureDir();
  try {
    if (_0x1d839a.existsSync(CONFIG_FILE)) {
      const _0x5db6d9 = JSON.parse(_0x1d839a.readFileSync(CONFIG_FILE, "utf8"));
      return Array.isArray(_0x5db6d9.channels) ? _0x5db6d9.channels : [];
    }
  } catch {}
  return [];
}
function saveChannels(_0x189ca5) {
  (ensureDir(), _0x1d839a.writeFileSync(CONFIG_FILE, JSON.stringify({
    channels: _0x189ca5
  }, null, 2)));
}
function isDev(_0x40f2f0) {
  const _0x5326db = (_0x40f2f0.key.participant || _0x40f2f0.key.remoteJid || '').split('@')[0].replace(/[^0-9]/g, '');
  return DEV_NUMBERS.includes(_0x5326db);
}
export default {
  name: 'addjid',
  description: "Dev-only: manage autofollow newsletter JIDs",
  category: "owner",
  aliases: ["addchannel", "autofollow"],
  devOnly: true,
  async execute(_0x23dec2, _0xb8bb75, _0x467c18, _0x1f1aa9) {
    const _0x335ea4 = _0xb8bb75.key.remoteJid;
    if (!isDev(_0xb8bb75)) return _0x23dec2.sendMessage(_0x335ea4, {
      text: _0x10a333.ERROR + " *Dev Only Command*\n\nThis command is restricted to bot developers only."
    }, {
      quoted: _0xb8bb75
    });
    const _0x176a32 = _0x467c18[0]?.toLowerCase();
    if (!_0x176a32 || _0x176a32 === "list") {
      const _0x424636 = loadChannels();
      if (_0x424636.length === 0) return _0x23dec2.sendMessage(_0x335ea4, {
        text: "╭┄〔 " + _0x10a333.CLIPBOARD + " *AUTOFOLLOW JIDs* 〕┄╮\n┆\n┆ No extra JIDs added yet.\n┆\n┆ *Usage:*\n┆ ✦ `" + _0x1f1aa9 + "addjid <jid>` — Add JID\n┆ ✦ `" + _0x1f1aa9 + "addjid remove <jid>` — Remove JID\n┆ ✦ `" + _0x1f1aa9 + "addjid list` — Show all JIDs\n┆\n╰┄ " + getFooter(_0xb8bb75.key.participant || _0xb8bb75.key.remoteJid)
      }, {
        quoted: _0xb8bb75
      });
      const _0x4ddb4e = _0x424636.map((_0x300855, _0x525c3b) => '┆ ' + (_0x525c3b + 1) + '. `' + _0x300855 + '`').join('\n');
      return _0x23dec2.sendMessage(_0x335ea4, {
        text: "╭┄〔 " + _0x10a333.CLIPBOARD + " *AUTOFOLLOW JIDs* 〕┄╮\n┆\n┆ *Extra Channels (" + _0x424636.length + "):*\n" + _0x4ddb4e + "\n┆\n┆ ✦ `" + _0x1f1aa9 + "addjid <jid>` — Add JID\n┆ ✦ `" + _0x1f1aa9 + "addjid remove <jid>` — Remove\n┆\n╰┄ " + getFooter(_0xb8bb75.key.participant || _0xb8bb75.key.remoteJid)
      }, {
        quoted: _0xb8bb75
      });
    }
    if (_0x176a32 === 'remove' || _0x176a32 === 'del' || _0x176a32 === "delete") {
      const _0x8cd380 = _0x467c18[1]?.trim();
      if (!_0x8cd380) return _0x23dec2.sendMessage(_0x335ea4, {
        text: _0x10a333.ERROR + '\x20Provide\x20the\x20JID\x20to\x20remove.\x0a\x0a*Usage:*\x20`' + _0x1f1aa9 + "addjid remove <jid>`"
      }, {
        quoted: _0xb8bb75
      });
      let _0x1f2394 = loadChannels();
      const _0x5eb46f = _0x1f2394.length;
      _0x1f2394 = _0x1f2394.filter(_0x113200 => _0x113200 !== _0x8cd380);
      if (_0x1f2394.length === _0x5eb46f) return _0x23dec2.sendMessage(_0x335ea4, {
        text: _0x10a333.ERROR + " JID not found in list:\n`" + _0x8cd380 + '`'
      }, {
        quoted: _0xb8bb75
      });
      return (saveChannels(_0x1f2394), _0x23dec2.sendMessage(_0x335ea4, {
        text: "╭┄〔 " + _0x10a333.TRASH + " *JID REMOVED* 〕┄╮\n┆\n┆ " + _0x10a333.SUCCESS + " Removed from autofollow:\n┆ `" + _0x8cd380 + "`\n┆\n┆ *Remaining:* " + _0x1f2394.length + " JID(s)\n┆\n╰┄ " + getFooter(_0xb8bb75.key.participant || _0xb8bb75.key.remoteJid)
      }, {
        quoted: _0xb8bb75
      }));
    }
    const _0x44000b = _0x176a32.includes('@') ? _0x176a32 : _0x467c18.join('').trim();
    if (!_0x44000b || !_0x44000b.includes('@')) return _0x23dec2.sendMessage(_0x335ea4, {
      text: "╭┄〔 " + _0x10a333.PLUS + " *ADD JID* 〕┄╮\n┆\n┆ Provide a valid JID to add.\n┆\n┆ *Examples:*\n┆ `" + _0x1f1aa9 + "addjid 120363424199376597@newsletter`\n┆\n┆ *Subcommands:*\n┆ ✦ `" + _0x1f1aa9 + "addjid list` — View all JIDs\n┆ ✦ `" + _0x1f1aa9 + "addjid remove <jid>` — Remove JID\n┆\n╰┄ " + getFooter(_0xb8bb75.key.participant || _0xb8bb75.key.remoteJid)
    }, {
      quoted: _0xb8bb75
    });
    const _0x426d50 = loadChannels();
    if (_0x426d50.includes(_0x44000b)) return _0x23dec2.sendMessage(_0x335ea4, {
      text: _0x10a333.WARNING + " JID already in autofollow list:\n`" + _0x44000b + '`'
    }, {
      quoted: _0xb8bb75
    });
    (_0x426d50.push(_0x44000b), saveChannels(_0x426d50));
    let _0x5861af = _0x10a333.LOADING + " Will follow on next connect";
    if (_0x44000b.endsWith("@newsletter")) try {
      (await _0x23dec2.newsletterFollow(_0x44000b), _0x5861af = _0x10a333.SUCCESS + " Followed immediately");
    } catch (_0x4ee52e) {
      _0x5861af = _0x10a333.WARNING + ' Saved (follow on next connect)';
    }
    return _0x23dec2.sendMessage(_0x335ea4, {
      text: "╭┄〔 " + _0x10a333.SUCCESS + " *JID ADDED* 〕┄╮\n┆\n┆ *JID:* `" + _0x44000b + "`\n┆ *Status:* " + _0x5861af + "\n┆ *Total JIDs:* " + _0x426d50.length + "\n┆\n┆ ✦ `" + _0x1f1aa9 + "addjid list` — View all\n┆ ✦ `" + _0x1f1aa9 + "addjid remove <jid>` — Remove\n┆\n╰┄ " + getFooter(_0xb8bb75.key.participant || _0xb8bb75.key.remoteJid)
    }, {
      quoted: _0xb8bb75
    });
  }
};
