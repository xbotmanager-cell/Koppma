import _0x28331b from 'os';
import {getPlatformInfo} from '../../lib/platformDetect.js';
import _0x3cd576 from 'fs';
import _0x1325fe from 'path';
import {fileURLToPath} from 'url';
import {getBotName} from '../../lib/botname.js';
import {GROUP} from '../../lib/emojis.js';
export {getBotName};
const __filename = fileURLToPath(import.meta.url), __dirname = _0x1325fe.dirname(__filename);
export const getBotMode = () => {
  try {
    const _0x2fe859 = ["./bot_mode.json", _0x1325fe.join(__dirname, "bot_mode.json"), _0x1325fe.join(__dirname, '../bot_mode.json'), _0x1325fe.join(__dirname, "../../bot_mode.json"), _0x1325fe.join(__dirname, "../../../bot_mode.json"), _0x1325fe.join(__dirname, '../commands/owner/bot_mode.json')];
    for (const _0x40c01b of _0x2fe859) {
      if (_0x3cd576.existsSync(_0x40c01b)) try {
        const _0x306c51 = JSON.parse(_0x3cd576.readFileSync(_0x40c01b, 'utf8'));
        if (_0x306c51.mode) {
          let _0x16cd13;
          switch (_0x306c51.mode.toLowerCase()) {
            case 'public':
              _0x16cd13 = GROUP.GLOBE + " Public";
              break;
            case "silent":
              _0x16cd13 = GROUP.MUTE + " Silent";
              break;
            case "private":
              _0x16cd13 = GROUP.LOCK + " Private";
              break;
            case "group-only":
              _0x16cd13 = GROUP.PEOPLE + " Group Only";
              break;
            case "maintenance":
              _0x16cd13 = GROUP.TOOL + " Maintenance";
              break;
            default:
              _0x16cd13 = GROUP.SETTINGS + '\x20' + (_0x306c51.mode.charAt(0).toUpperCase() + _0x306c51.mode.slice(1));
          }
          return _0x16cd13;
        }
      } catch (_0x471570) {}
    }
    if (global.BOT_MODE) return global.BOT_MODE === "silent" ? GROUP.MUTE + " Silent" : GROUP.GLOBE + '\x20Public';
    if (global.mode) return global.mode === "silent" ? GROUP.MUTE + '\x20Silent' : GROUP.GLOBE + '\x20Public';
    if (process.env.BOT_MODE) return process.env.BOT_MODE === "silent" ? GROUP.MUTE + " Silent" : GROUP.GLOBE + " Public";
  } catch (_0x130e07) {}
  return GROUP.GLOBE + " Public";
};
export const getOwnerName = () => {
  try {
    const _0x500d6f = ["./bot_settings.json", _0x1325fe.join(__dirname, "bot_settings.json"), _0x1325fe.join(__dirname, "../bot_settings.json"), _0x1325fe.join(__dirname, '../../bot_settings.json')];
    for (const _0x4f8196 of _0x500d6f) {
      if (_0x3cd576.existsSync(_0x4f8196)) try {
        const _0x2b9766 = _0x3cd576.readFileSync(_0x4f8196, 'utf8'), _0x4faf1a = JSON.parse(_0x2b9766);
        if (_0x4faf1a.ownerName && _0x4faf1a.ownerName.trim() !== '') return _0x4faf1a.ownerName.trim();
      } catch (_0x560579) {}
    }
    const _0x1879af = _0x1325fe.join(__dirname, "owner.json");
    if (_0x3cd576.existsSync(_0x1879af)) {
      const _0x29b29d = _0x3cd576.readFileSync(_0x1879af, "utf8"), _0x112251 = JSON.parse(_0x29b29d);
      if (_0x112251.owner && _0x112251.owner.trim() !== '') return _0x112251.owner.trim(); else {
        if (_0x112251.number && _0x112251.number.trim() !== '') return _0x112251.number.trim(); else {
          if (_0x112251.phone && _0x112251.phone.trim() !== '') return _0x112251.phone.trim(); else {
            if (_0x112251.contact && _0x112251.contact.trim() !== '') return _0x112251.contact.trim(); else {
              if (Array.isArray(_0x112251) && _0x112251.length > 0) {
                const _0x2b4783 = typeof _0x112251[0] === "string" ? _0x112251[0] : 'Unknown';
                return _0x2b4783;
              }
            }
          }
        }
      }
    }
    if (global.OWNER_NAME) return global.OWNER_NAME;
    if (global.owner) return global.owner;
    if (process.env.OWNER_NUMBER) return process.env.OWNER_NUMBER;
  } catch (_0x41eb28) {}
  return "Lupin Stanley";
};
export const getBotPrefix = () => {
  try {
    const _0x1c81d8 = ["./bot_settings.json", _0x1325fe.join(__dirname, "bot_settings.json"), _0x1325fe.join(__dirname, "../bot_settings.json"), _0x1325fe.join(__dirname, "../../bot_settings.json")];
    for (const _0x34e6e7 of _0x1c81d8) {
      if (_0x3cd576.existsSync(_0x34e6e7)) try {
        const _0x4b3449 = _0x3cd576.readFileSync(_0x34e6e7, 'utf8'), _0x22db1d = JSON.parse(_0x4b3449);
        if (_0x22db1d.prefix && _0x22db1d.prefix.trim() !== '') return _0x22db1d.prefix.trim();
      } catch (_0xc1f12d) {}
    }
    if (global.prefix) return global.prefix;
    if (process.env.PREFIX) return process.env.PREFIX;
  } catch (_0xb765e4) {}
  return '.';
};
export const getBotVersion = () => {
  try {
    const _0x42ee90 = _0x1325fe.join(__dirname, "owner.json");
    if (_0x3cd576.existsSync(_0x42ee90)) {
      const _0x309691 = _0x3cd576.readFileSync(_0x42ee90, 'utf8'), _0x219296 = JSON.parse(_0x309691);
      if (_0x219296.version && _0x219296.version.trim() !== '') return _0x219296.version.trim();
    }
    const _0x1b37f5 = ['./bot_settings.json', _0x1325fe.join(__dirname, "bot_settings.json"), _0x1325fe.join(__dirname, "../bot_settings.json")];
    for (const _0x3fce8a of _0x1b37f5) {
      if (_0x3cd576.existsSync(_0x3fce8a)) try {
        const _0x71e92a = _0x3cd576.readFileSync(_0x3fce8a, 'utf8'), _0x2c2f9e = JSON.parse(_0x71e92a);
        if (_0x2c2f9e.version && _0x2c2f9e.version.trim() !== '') return _0x2c2f9e.version.trim();
      } catch (_0x36a87a) {}
    }
    if (global.VERSION) return global.VERSION;
    if (global.version) return global.version;
    if (process.env.VERSION) return process.env.VERSION;
  } catch (_0x3a3e2e) {}
  return "v1.0.0";
};
export const getDeploymentPlatform = () => getPlatformInfo();
export const formatUptime = _0x577790 => {
  const _0x118343 = Math.floor(_0x577790 / 3600), _0x434377 = Math.floor(_0x577790 % 3600 / 60), _0x3a1155 = Math.floor(_0x577790 % 60);
  if (_0x118343 > 0) return _0x118343 + 'h\x20' + _0x434377 + 'm\x20' + _0x3a1155 + 's'; else return _0x434377 > 0 ? _0x434377 + 'm\x20' + _0x3a1155 + 's' : _0x3a1155 + 's';
};
export const getRAMUsage = () => {
  try {
    const _0x334f0d = process.memoryUsage(), _0x2ebc1f = _0x334f0d.heapUsed / 1024 / 1024, _0x1d8e1a = _0x334f0d.heapTotal / 1024 / 1024, _0x4a3388 = Math.round(_0x2ebc1f / _0x1d8e1a * 100), _0x3cec1b = 10, _0x864912 = Math.round(_0x4a3388 / 100 * _0x3cec1b), _0x84defb = _0x3cec1b - _0x864912, _0x26d72c = '█', _0x1d8e91 = '░', _0x305703 = _0x26d72c.repeat(_0x864912) + _0x1d8e91.repeat(_0x84defb);
    return {
      bar: _0x305703,
      percent: _0x4a3388,
      usedMB: Math.round(_0x2ebc1f * 100) / 100,
      totalMB: Math.round(_0x1d8e1a * 100) / 100
    };
  } catch (_0x14648e) {
    return {
      bar: "░░░░░░░░░░",
      percent: 0,
      usedMB: 0,
      totalMB: 0
    };
  }
};
export const createFadedEffect = _0x5b2cef => {
  const _0x965f4e = ['‍', '‌', '⁠', '\ufeff'], _0x459cd4 = Array.from({
    length: 90
  }, (_0x58438c, _0x3dac84) => _0x965f4e[_0x3dac84 % _0x965f4e.length]).join('');
  return '' + _0x459cd4 + _0x5b2cef;
};
export const createReadMoreEffect = (_0x1e7c97, _0x2c2df6) => {
  const _0x333e58 = ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff', '᠎', '‪', '‫', '‬', '‭', '‮'], _0x301d87 = Array.from({
    length: 680
  }, (_0x590f82, _0x1605a7) => _0x333e58[_0x1605a7 % _0x333e58.length]).join('');
  return '' + _0x1e7c97 + _0x301d87 + '\x0a\x0a' + _0x2c2df6;
};
export const createFakeContact = _0x59b1fb => {
  const _0x3d92d2 = _0x59b1fb.key.participant?.split('@')[0] || _0x59b1fb.key.remoteJid.split('@')[0];
  return {
    key: {
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "VIPBOT"
    },
    message: {
      contactMessage: {
        displayName: getBotName(),
        vcard: 'BEGIN:VCARD\x0aVERSION:3.0\x0aN:Sy;Bot;;;\x0aFN:' + getBotName() + "\nitem1.TEL;waid=" + _0x3d92d2 + ':' + _0x3d92d2 + "\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
      }
    },
    participant: "0@s.whatsapp.net"
  };
};
