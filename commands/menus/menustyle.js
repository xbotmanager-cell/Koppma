import _0xa06b6f from 'fs';
import _0x237c34 from 'path';
import {fileURLToPath} from 'url';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {GROUP} from '../../lib/emojis.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x237c34.dirname(__filename), stylePath = _0x237c34.join(__dirname, 'current_style.json');
export default {
  name: "menustyle",
  alias: ['setmenustyle', 'sm', "changemenustyle", 'cm', "style"],
  description: "Switch between VIPBOT menu styles (1-5)",
  category: "owner",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x40c705, _0x569fe3, _0x14b070, _0x37866e, _0x18c555) {
    const _0x83abe8 = _0x569fe3.key.remoteJid, {jidManager: _0x1183cd} = _0x18c555, _0x4f6292 = _0x18c555?.isPrefixless === true ? '' : String((_0x37866e ?? _0x18c555?.prefix) ?? '.'), _0x27e780 = _0x1183cd.isOwner(_0x569fe3) || _0x18c555?.isSudo?.(), _0x278f78 = _0x569fe3.key.fromMe, _0x58ca37 = _0x569fe3.key.participant || _0x83abe8, _0x26d1bb = _0x1183cd.cleanJid(_0x58ca37);
    if (!_0x27e780) {
      let _0x4ce82a = GROUP.ERROR + " *Owner Only Command!*\n\n";
      (_0x4ce82a += "Only the bot owner can change menu styles.\n\n", _0x4ce82a += GROUP.SEARCH + " *Debug Info:*\n", _0x4ce82a += "┆ ✦ Your JID: " + _0x26d1bb.cleanJid + "\n", _0x4ce82a += "┆ ✦ Your Number: " + (_0x26d1bb.cleanNumber || "N/A") + "\n", _0x4ce82a += "┆ ✦ Type: " + (_0x26d1bb.isLid ? "LID " + GROUP.LINK : "Regular " + GROUP.PHONE) + "\n", _0x4ce82a += "┆ ✦ From Me: " + (_0x278f78 ? GROUP.SUCCESS + " YES" : GROUP.ERROR + " NO") + "\n");
      const _0x43fdf4 = _0x1183cd.getOwnerInfo ? _0x1183cd.getOwnerInfo() : {};
      _0x4ce82a += "╰┄ Owner Number: " + (_0x43fdf4.cleanNumber || "Not set") + "\n\n";
      if (_0x26d1bb.isLid && _0x278f78) (_0x4ce82a += GROUP.WARNING + " *Issue Detected:*\n", _0x4ce82a += "You're using a linked device (LID).\n", _0x4ce82a += "Try using `" + _0x4f6292 + 'fixowner` or `' + _0x4f6292 + "forceownerlid`\n"); else !_0x43fdf4.cleanNumber && (_0x4ce82a += GROUP.WARNING + " *Issue Detected:*\n", _0x4ce82a += "Owner not set in jidManager!\n", _0x4ce82a += "Try using `" + _0x4f6292 + "debugchat fix`\n");
      return _0x40c705.sendMessage(_0x83abe8, {
        text: _0x4ce82a
      }, {
        quoted: _0x569fe3
      });
    }
    if (!_0x14b070[0]) {
      const _0x2f238c = getCurrentMenuStyle();
      let _0x178555 = "╭┄〔 " + GROUP.ART + " *MENU STYLE* 〕┄╮\n┆\n";
      return (_0x178555 += "┆ " + GROUP.CHART + " Current: Style " + _0x2f238c + "\n┆\n", _0x178555 += "┆ ✦ *" + _0x4f6292 + "menustyle <1-5>*\n", _0x178555 += "┆   ◦ 1. Image + Faded\n", _0x178555 += "┆   ◦ 2. Faded + Contact Card\n", _0x178555 += "┆   ◦ 3. Image + Read More + Buttons\n", _0x178555 += "┆   ◦ 4. Image + Text\n", _0x178555 += "┆   ◦ 5. Categorized + Read More\n", _0x178555 += "╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯", _0x40c705.sendMessage(_0x83abe8, {
        text: _0x178555
      }, {
        quoted: _0x569fe3
      }));
    }
    const _0x165fdb = parseInt(_0x14b070[0]);
    if (isNaN(_0x165fdb) || _0x165fdb < 1 || _0x165fdb > 5) return _0x40c705.sendMessage(_0x83abe8, {
      text: "╭┄〔 " + GROUP.ERROR + " *INVALID STYLE* 〕┄╮\n┆\n┆ ✦ *" + _0x4f6292 + "menustyle <1-5>*\n┆   ◦ Valid styles: 1 to 5\n┆\n┆ ✦ *Example:*\n┆   ◦ " + _0x4f6292 + "menustyle 5\n┆\n╰┄ " + getFooter(_0x569fe3.key.participant || _0x569fe3.key.remoteJid)
    }, {
      quoted: _0x569fe3
    });
    try {
      const _0x3f6d3a = {
        current: _0x165fdb,
        styleVersion: 2,
        setBy: _0x26d1bb.cleanNumber || 'Unknown',
        setAt: new Date().toISOString(),
        setFrom: _0x26d1bb.isLid ? "LID Device" : 'Regular\x20Device',
        chatType: _0x83abe8.includes("@g.us") ? "Group" : 'DM'
      };
      _0xa06b6f.writeFileSync(stylePath, JSON.stringify(_0x3f6d3a, null, 2));
      let _0x28c62b = GROUP.SUCCESS + " *Menu Style Updated*\n";
      (_0x28c62b += GROUP.ART + " New Style: *Style " + _0x165fdb + '*\x0a', await _0x40c705.sendMessage(_0x83abe8, {
        text: _0x28c62b
      }, {
        quoted: _0x569fe3
      }), console.log(GROUP.SUCCESS + '\x20Menu\x20style\x20changed\x20to\x20' + _0x165fdb + " by " + _0x26d1bb.cleanJid), _0x26d1bb.isLid && console.log("   ↳ Changed from LID device"));
    } catch (_0x50ec38) {
      (console.error(GROUP.ERROR + " Failed to save menu style:", _0x50ec38), await _0x40c705.sendMessage(_0x83abe8, {
        text: GROUP.ERROR + " Error saving menu style: " + _0x50ec38.message
      }, {
        quoted: _0x569fe3
      }));
    }
  }
};
export function getCurrentMenuStyle() {
  try {
    if (_0xa06b6f.existsSync(stylePath)) {
      const _0x2a5135 = _0xa06b6f.readFileSync(stylePath, "utf8"), _0xd2ddbb = JSON.parse(_0x2a5135), _0xc5f096 = Number(_0xd2ddbb.current);
      if (_0xd2ddbb.styleVersion === 2) return Number.isInteger(_0xc5f096) && _0xc5f096 >= 1 && _0xc5f096 <= 5 ? _0xc5f096 : 1;
      const _0xad7e7b = {
        1: 1,
        3: 2,
        5: 3,
        7: 4
      }, _0x5e46db = _0xad7e7b[_0xc5f096] || 1;
      return (_0xa06b6f.writeFileSync(stylePath, JSON.stringify({
        ..._0xd2ddbb,
        current: _0x5e46db,
        styleVersion: 2,
        ..._0x5e46db !== _0xc5f096 ? {
          migratedFrom: _0xc5f096
        } : {}
      }, null, 2)), _0x5e46db);
    }
    return 1;
  } catch (_0x56b86b) {
    return (console.error(GROUP.ERROR + " Error reading current menu style:", _0x56b86b), 1);
  }
}
