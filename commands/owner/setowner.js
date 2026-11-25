import {writeFileSync, readFileSync, existsSync} from 'fs';
import _0x5d3908 from 'path';
import {fileURLToPath} from 'url';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x5d3908.dirname(__filename);
export default {
  name: "setowner",
  category: "owner",
  description: 'Set\x20custom\x20owner\x20display\x20name\x20for\x20menu',
  ownerOnly: true,
  async execute(_0x351a93, _0x1be89a, _0x1dbafa, _0x191831, _0x33ee18) {
    const _0xf4a97b = _0x1be89a.key.remoteJid, {jidManager: _0x135cd8} = _0x33ee18;
    if (!_0x135cd8.isOwner(_0x1be89a)) return _0x351a93.sendMessage(_0xf4a97b, {
      text: _0x495cb8.ERROR + " *Owner Only Command!*\n\nOnly the bot owner can change the owner display name."
    }, {
      quoted: _0x1be89a
    });
    if (!_0x1dbafa[0]) {
      const _0x368225 = this.getCurrentOwnerName(), _0x4a4dd9 = this.getOriginalOwner();
      return _0x351a93.sendMessage(_0xf4a97b, {
        text: "╭┄〔 " + _0x495cb8.CROWN + " *SET OWNER* 〕┄╮\n┆\n┆ ✦ *" + _0x191831 + "setowner <name>*\n┆   ◦ Set owner name\n╰┄ " + getFooter(_0x1be89a.key.participant || _0x1be89a.key.remoteJid)
      }, {
        quoted: _0x1be89a
      });
    }
    const _0x26a71e = _0x1dbafa.join('\x20').trim();
    if (_0x26a71e.length < 2) return _0x351a93.sendMessage(_0xf4a97b, {
      text: _0x495cb8.ERROR + " Name too short! Owner name must be at least 2 characters."
    }, {
      quoted: _0x1be89a
    });
    if (_0x26a71e.length > 30) return _0x351a93.sendMessage(_0xf4a97b, {
      text: _0x495cb8.ERROR + " Name too long! Owner name must be less than 30 characters."
    }, {
      quoted: _0x1be89a
    });
    try {
      const _0x38546c = _0x1be89a.key.participant || _0xf4a97b, _0x360123 = _0x135cd8.cleanJid(_0x38546c), _0x38910f = this.getOriginalOwner(), _0x4fd7ef = this.getCurrentOwnerName(), _0x5e5004 = _0x5d3908.join(__dirname, "bot_settings.json");
      let _0x26c0d2 = {};
      if (existsSync(_0x5e5004)) try {
        _0x26c0d2 = JSON.parse(readFileSync(_0x5e5004, 'utf8'));
      } catch (_0x1315e7) {
        console.error("Error reading existing settings:", _0x1315e7);
      }
      (_0x26c0d2.ownerName = _0x26a71e, _0x26c0d2.ownerSetBy = _0x360123.cleanNumber || "Unknown", _0x26c0d2.ownerSetAt = new Date().toISOString(), _0x26c0d2.originalOwner = _0x38910f, _0x26c0d2.lastChange = Date.now(), writeFileSync(_0x5e5004, JSON.stringify(_0x26c0d2, null, 2)));
      const _0x2ef9da = "./bot_settings.json";
      writeFileSync(_0x2ef9da, JSON.stringify(_0x26c0d2, null, 2));
      typeof globalThis._saveConfigCache === "function" && globalThis._saveConfigCache('bot_settings', _0x26c0d2);
      typeof global !== "undefined" && (global.OWNER_NAME = _0x26a71e);
      let _0x2e349a = _0x495cb8.SUCCESS + " *Owner Display Updated!*\n";
      (_0x2e349a += _0x495cb8.NOTE + " Old Display: *" + _0x4fd7ef + '*\x0a', _0x2e349a += _0x495cb8.CROWN + " New Display: *" + _0x26a71e + '*\x0a', '', await _0x351a93.sendMessage(_0xf4a97b, {
        text: _0x2e349a
      }, {
        quoted: _0x1be89a
      }), console.log(_0x495cb8.SUCCESS + '\x20Owner\x20display\x20name\x20changed\x20from\x20\x22' + _0x4fd7ef + "\" to \"" + _0x26a71e + "\" by " + _0x360123.cleanNumber));
    } catch (_0x5aaeb7) {
      (console.error("Error saving owner name:", _0x5aaeb7), await _0x351a93.sendMessage(_0xf4a97b, {
        text: _0x495cb8.ERROR + " Error saving owner name: " + _0x5aaeb7.message + '\x0a\x0aPlease\x20check\x20file\x20permissions.'
      }, {
        quoted: _0x1be89a
      }));
    }
  },
  getCurrentOwnerName() {
    try {
      const _0x4ca28c = [_0x5d3908.join(__dirname, "bot_settings.json"), "./bot_settings.json", "../bot_settings.json"];
      for (const _0x2c46a0 of _0x4ca28c) {
        if (existsSync(_0x2c46a0)) try {
          const _0x15a247 = JSON.parse(readFileSync(_0x2c46a0, 'utf8'));
          if (_0x15a247.ownerName && _0x15a247.ownerName.trim() !== '') return _0x15a247.ownerName.trim();
        } catch (_0x546ecc) {}
      }
      return this.getOriginalOwner();
    } catch (_0x2cf539) {
      return (console.error('Error\x20reading\x20owner\x20name:', _0x2cf539), this.getOriginalOwner());
    }
  },
  getOriginalOwner() {
    try {
      const _0x6e45a8 = _0x5d3908.join(__dirname, "owner.json");
      if (existsSync(_0x6e45a8)) {
        const _0x72d67f = JSON.parse(readFileSync(_0x6e45a8, 'utf8'));
        if (_0x72d67f.owner && _0x72d67f.owner.trim() !== '') return _0x72d67f.owner.trim(); else {
          if (_0x72d67f.number && _0x72d67f.number.trim() !== '') return _0x72d67f.number.trim(); else {
            if (_0x72d67f.phone && _0x72d67f.phone.trim() !== '') return _0x72d67f.phone.trim(); else {
              if (Array.isArray(_0x72d67f) && _0x72d67f.length > 0) return typeof _0x72d67f[0] === "string" ? _0x72d67f[0] : "Lupin Stanley";
            }
          }
        }
      }
      return global.owner || process.env.OWNER_NUMBER || "Lupin Stanley";
    } catch (_0x2df7ba) {
      return (console.error('Error\x20reading\x20original\x20owner:', _0x2df7ba), global.owner || 'Lupin Stanley');
    }
  }
};
import _0x495cb8 from '../../lib/emojis.js';
