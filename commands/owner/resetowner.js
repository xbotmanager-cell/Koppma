import {writeFileSync, readFileSync, existsSync} from 'fs';
import _0xe5877d from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url), __dirname = _0xe5877d.dirname(__filename);
export default {
  name: "resetowner",
  alias: ["defaultowner", "clearowner", 'restoreowner'],
  category: "owner",
  description: "Reset owner display name to original",
  ownerOnly: true,
  async execute(_0x24c2c8, _0x4e5e91, _0x26d75f, _0xf8a282, _0x5332fc) {
    const _0x48f717 = _0x4e5e91.key.remoteJid, {jidManager: _0x5cfa4a} = _0x5332fc;
    if (!_0x5cfa4a.isOwner(_0x4e5e91)) return _0x24c2c8.sendMessage(_0x48f717, {
      text: _0x57e147.ERROR + '\x20*Owner\x20Only\x20Command!*'
    }, {
      quoted: _0x4e5e91
    });
    try {
      const _0x36c938 = _0x4e5e91.key.participant || _0x48f717, _0x7678a5 = _0x5cfa4a.cleanJid(_0x36c938), _0x4c3595 = this.getOriginalOwner(), _0x3f9891 = this.getCurrentOwnerName();
      if (_0x3f9891 === _0x4c3595) return _0x24c2c8.sendMessage(_0x48f717, {
        text: _0x57e147.HELP + " *Already Using Original*\n\nCurrent display name is already the original owner: *" + _0x4c3595 + '*'
      }, {
        quoted: _0x4e5e91
      });
      const _0x2d68c8 = _0xe5877d.join(__dirname, "bot_settings.json");
      let _0x1a56fc = {};
      if (existsSync(_0x2d68c8)) try {
        _0x1a56fc = JSON.parse(readFileSync(_0x2d68c8, "utf8"));
      } catch (_0x3d1fd2) {
        console.error("Error reading settings:", _0x3d1fd2);
      }
      (delete _0x1a56fc.ownerName, delete _0x1a56fc.ownerSetBy, delete _0x1a56fc.ownerSetAt, writeFileSync(_0x2d68c8, JSON.stringify(_0x1a56fc, null, 2)));
      const _0x3e9322 = "./bot_settings.json";
      writeFileSync(_0x3e9322, JSON.stringify(_0x1a56fc, null, 2));
      typeof global !== "undefined" && delete global.OWNER_NAME;
      let _0x2f0709 = _0x57e147.SUCCESS + '\x20*Owner\x20Display\x20Name\x20Reset!*\x0a\x0a';
      (_0x2f0709 += _0x57e147.NOTE + " Previous Display: *" + _0x3f9891 + '*\x0a', _0x2f0709 += _0x57e147.REFRESH + " Reset to Original: *" + _0x4c3595 + "*\n\n", _0x2f0709 += _0x57e147.SUCCESS + " Custom display name removed.\n\n", _0x2f0709 += _0x57e147.INFO + " Menu will now show the original owner from owner.json.", await _0x24c2c8.sendMessage(_0x48f717, {
        text: _0x2f0709
      }, {
        quoted: _0x4e5e91
      }), console.log(_0x57e147.SUCCESS + " Owner display name reset from \"" + _0x3f9891 + "\" to \"" + _0x4c3595 + '\x22\x20by\x20' + _0x7678a5.cleanNumber));
    } catch (_0x4db73f) {
      (console.error("Error resetting owner name:", _0x4db73f), await _0x24c2c8.sendMessage(_0x48f717, {
        text: _0x57e147.ERROR + " Error resetting owner name: " + _0x4db73f.message
      }, {
        quoted: _0x4e5e91
      }));
    }
  },
  getCurrentOwnerName() {
    try {
      const _0x3c272f = [_0xe5877d.join(__dirname, "bot_settings.json"), "./bot_settings.json"];
      for (const _0x41f952 of _0x3c272f) {
        if (existsSync(_0x41f952)) {
          const _0x4368c5 = JSON.parse(readFileSync(_0x41f952, 'utf8'));
          if (_0x4368c5.ownerName && _0x4368c5.ownerName.trim() !== '') return _0x4368c5.ownerName.trim();
        }
      }
      return this.getOriginalOwner();
    } catch (_0xeb270b) {
      return this.getOriginalOwner();
    }
  },
  getOriginalOwner() {
    try {
      const _0x90f101 = _0xe5877d.join(__dirname, "owner.json");
      if (existsSync(_0x90f101)) {
        const _0x347f31 = JSON.parse(readFileSync(_0x90f101, 'utf8'));
        if (_0x347f31.owner && _0x347f31.owner.trim() !== '') return _0x347f31.owner.trim(); else {
          if (_0x347f31.number && _0x347f31.number.trim() !== '') return _0x347f31.number.trim();
        }
      }
      return global.owner || 'Lupin Stanley';
    } catch (_0x4b066e) {
      return global.owner || 'Lupin Stanley';
    }
  }
};
import _0x57e147 from '../../lib/emojis.js';
