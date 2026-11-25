import _0x15baeb from 'fs';
import {getBotName} from '../../lib/botname.js';
import _0x20da12 from 'path';
import {fileURLToPath} from 'url';
import {getOwnerName} from '../../lib/menuHelper.js';
import _0x37fafa from '../../lib/database.js';
const __dirname = _0x20da12.dirname(fileURLToPath(import.meta.url)), footerFile = _0x20da12.join(__dirname, "../../data/footer.json");
function ensureDir() {
  const _0x5a3e77 = _0x20da12.dirname(footerFile);
  if (!_0x15baeb.existsSync(_0x5a3e77)) _0x15baeb.mkdirSync(_0x5a3e77, {
    recursive: true
  });
}
function getFooter() {
  try {
    if (_0x15baeb.existsSync(footerFile)) return JSON.parse(_0x15baeb.readFileSync(footerFile, "utf8")).footer;
  } catch {}
  return getBotName() + " · VIP Edition";
}
function setFooter(_0x3d13d5) {
  ensureDir();
  const _0x362528 = {
    footer: _0x3d13d5,
    updatedAt: new Date().toISOString()
  };
  (_0x15baeb.writeFileSync(footerFile, JSON.stringify(_0x362528, null, 2)), _0x37fafa.setConfig('footer_config', _0x362528).catch(() => {}));
}
export default {
  name: 'setfooter',
  alias: ["footer", 'setcaption', "defaultcaption"],
  description: "Set default footer/caption for downloads (viewonce, tiktok, instagram, video downloads)",
  category: "owner",
  async execute(_0x6c0ff2, _0x32ee0f, _0x253577, _0x53b3b5, _0x12d42a) {
    const _0x5a3180 = _0x32ee0f.key.remoteJid, {jidManager: _0x5ac758} = _0x12d42a, _0xabb0dd = _0x12d42a?.isSudo ? _0x12d42a.isSudo() : false;
    if (!_0x5ac758.isOwner(_0x32ee0f) && !_0xabb0dd) return _0x6c0ff2.sendMessage(_0x5a3180, {
      text: _0x10bd7e.ERROR + " *Owner Only Command!*"
    }, {
      quoted: _0x32ee0f
    });
    if (_0x253577.length === 0 || _0x253577[0]?.toLowerCase() === "help") {
      const _0x1ac760 = getFooter();
      return _0x6c0ff2.sendMessage(_0x5a3180, {
        text: "╭┄〔 " + _0x10bd7e.NOTE + " *SET FOOTER* 〕┄╮\n┆\n┆ " + _0x10bd7e.PIN + " Current: " + _0x1ac760 + "\n┆ ✦ *" + _0x53b3b5 + "setfooter <text>*\n┆   ◦ Set footer text\n┆ ✦ *" + _0x53b3b5 + "setfooter reset*\n┆   ◦ Reset to default\n╰┄ " + getFooter(_0x32ee0f.key.participant || _0x32ee0f.key.remoteJid)
      }, {
        quoted: _0x32ee0f
      });
    }
    if (_0x253577[0]?.toLowerCase() === 'reset') return (setFooter(getBotName() + " · VIP Edition"), _0x6c0ff2.sendMessage(_0x5a3180, {
      text: _0x10bd7e.SUCCESS + " *Footer Reset!*\n\n" + _0x10bd7e.NOTE + " Default: " + getBotName() + " · VIP Edition"
    }, {
      quoted: _0x32ee0f
    }));
    const _0x42046b = _0x253577.join('\x20').trim();
    if (_0x42046b.length > 200) return _0x6c0ff2.sendMessage(_0x5a3180, {
      text: _0x10bd7e.ERROR + " Footer too long! Max 200 characters."
    }, {
      quoted: _0x32ee0f
    });
    (setFooter(_0x42046b), await _0x6c0ff2.sendMessage(_0x5a3180, {
      text: _0x10bd7e.SUCCESS + " *Footer Updated!*\n\n" + _0x10bd7e.NOTE + " *New Footer:*\n> " + _0x42046b + '\x0a\x0a' + "This will appear on all downloads."
    }, {
      quoted: _0x32ee0f
    }));
  }
};
import _0x10bd7e from '../../lib/emojis.js';
