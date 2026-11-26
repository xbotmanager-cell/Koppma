import _0x456106 from '../../lib/emojis.js';
import {existsSync, readFileSync} from 'fs';
import _0x2a7541 from 'path';
import {fileURLToPath} from 'url';
import {getBotName} from '../../lib/botname.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x2a7541.dirname(__filename);
export default {
  name: "checkbotname",
  alias: ["botnamedebug", 'namecheck'],
  description: "Debug bot name loading",
  async execute(_0x2f1f53, _0x40416f, _0x1c7bd2, _0x237897) {
    const _0x47810f = _0x40416f.key.remoteJid;
    let _0x21ff2c = _0x456106.SEARCH + " *BOT NAME DEBUG INFO*\n\n";
    (_0x21ff2c += _0x456106.CHART + " *Global Variables:*\n", _0x21ff2c += '├─\x20global.BOT_NAME:\x20' + (global.BOT_NAME || (_0x456106.ERROR + " Not set")) + '\x0a', _0x21ff2c += '└─\x20process.env.BOT_NAME:\x20' + (process.env.BOT_NAME || (_0x456106.ERROR + " Not set")) + '\x0a\x0a', _0x21ff2c += _0x456106.FOLDER + " *File Checks:*\n");
    const _0x5e318f = [{
      name: "Root",
      path: "./bot_settings.json"
    }, {
      name: "Commands dir",
      path: _0x2a7541.join(__dirname, "../bot_settings.json")
    }, {
      name: "Owner commands",
      path: _0x2a7541.join(__dirname, "../owner/bot_settings.json")
    }, {
      name: 'Current\x20dir',
      path: _0x2a7541.join(__dirname, "bot_settings.json")
    }, {
      name: "Menu dir",
      path: _0x2a7541.join(__dirname, "../../bot_settings.json")
    }];
    for (const _0x4394cd of _0x5e318f) {
      if (existsSync(_0x4394cd.path)) try {
        const _0x335039 = JSON.parse(readFileSync(_0x4394cd.path, 'utf8'));
        (_0x21ff2c += _0x456106.SUCCESS + '\x20' + _0x4394cd.name + ':\x20' + _0x4394cd.path + '\x0a', _0x21ff2c += "   └─ Bot Name: " + (_0x335039.botName || (_0x456106.ERROR + ' Not found')) + '\x0a', _0x21ff2c += "   └─ Updated: " + (_0x335039.updatedAt || "Unknown") + '\x0a');
      } catch (_0x557b73) {
        _0x21ff2c += _0x456106.ERROR + '\x20' + _0x4394cd.name + ':\x20' + _0x4394cd.path + '\x20(Parse\x20error)\x0a';
      } else _0x21ff2c += _0x456106.ERROR + '\x20' + _0x4394cd.name + ':\x20' + _0x4394cd.path + " (Not found)\n";
    }
    const _0x3df641 = this.getBotNameForMenu();
    (_0x21ff2c += '\x0a' + _0x456106.PHONE + " *Menu will show:* \"" + _0x3df641 + '\x22', await _0x2f1f53.sendMessage(_0x47810f, {
      text: _0x21ff2c
    }, {
      quoted: _0x40416f
    }));
  },
  getBotNameForMenu() {
    try {
      const _0x12e814 = ["./bot_settings.json", _0x2a7541.join(__dirname, "../../bot_settings.json"), _0x2a7541.join(__dirname, "../owner/bot_settings.json")];
      for (const _0x73bdbd of _0x12e814) {
        if (existsSync(_0x73bdbd)) {
          const _0x5b3458 = JSON.parse(readFileSync(_0x73bdbd, "utf8"));
          if (_0x5b3458.botName && _0x5b3458.botName.trim() !== '') return _0x5b3458.botName.trim();
        }
      }
      return global.BOT_NAME || getBotName();
    } catch (_0x581e5a) {
      return 'Error\x20loading';
    }
  }
};
