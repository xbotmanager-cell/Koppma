import _0x39c0b2 from 'fs';
import _0x197fa7 from 'path';
import {fileURLToPath} from 'url';
import {execFile as _0x593d4b} from 'child_process';
import {promisify} from 'util';
import {BRAND, EMERGENCY, EPHOTO, MEDIA, SOCIAL, STATUS, UI, UTILITY, LIB} from './emojis.js';
const _execFileAsync = promisify(_0x593d4b);
import _0x6cf5a3 from './ffmpegPath.js';
import _0x201ab7 from 'axios';
import _0x339adf from 'os';
import {getBotName as _0x37bfc6} from './botname.js';
import {getEmoji} from './userEmoji.js';
import {getPlatformInfo as _0xabdad} from './platformDetect.js';
const DEFAULT_MENU_IMAGE_URL = "https://i.ibb.co/Gvkt4q9d/Chat-GPT-Image-Feb-21-2026-12-47-33-AM.png";
let _cachedImage = null, _cachedImageTime = 0, _cachedGif = null, _cachedGifMp4 = null, _gifConversionPromise = null;
const CACHE_TTL = 10 * 60 * 1000;
export function getBotName() {
  return _0x37bfc6();
}
export function getOwnerName() {
  try {
    const _0x2b21b8 = ["./bot_settings.json", _0x197fa7.join(process.cwd(), "bot_settings.json")];
    for (const _0x1263f7 of _0x2b21b8) {
      if (_0x39c0b2.existsSync(_0x1263f7)) try {
        const _0x626c7d = JSON.parse(_0x39c0b2.readFileSync(_0x1263f7, 'utf8'));
        if (_0x626c7d.ownerName && _0x626c7d.ownerName.trim()) return _0x626c7d.ownerName.trim();
      } catch {}
    }
    const _0x494f4b = ['./owner.json', _0x197fa7.join(process.cwd(), 'owner.json')];
    for (const _0x45cbd2 of _0x494f4b) {
      if (_0x39c0b2.existsSync(_0x45cbd2)) try {
        const _0xfb3563 = JSON.parse(_0x39c0b2.readFileSync(_0x45cbd2, 'utf8'));
        if (_0xfb3563.owner && _0xfb3563.owner.trim()) return _0xfb3563.owner.trim();
        if (_0xfb3563.number && _0xfb3563.number.trim()) return _0xfb3563.number.trim();
        if (_0xfb3563.phone && _0xfb3563.phone.trim()) return _0xfb3563.phone.trim();
        if (_0xfb3563.contact && _0xfb3563.contact.trim()) return _0xfb3563.contact.trim();
        if (Array.isArray(_0xfb3563) && _0xfb3563.length > 0) return typeof _0xfb3563[0] === "string" ? _0xfb3563[0] : "Unknown";
      } catch {}
    }
    if (global.OWNER_NAME) return global.OWNER_NAME;
    if (global.owner) return global.owner;
  } catch {}
  return 'Lupin Stanley';
}
export function getFooter(_0x3ea235) {
  const _0x2d9586 = getEmoji(_0x3ea235 || '');
  return _0x2d9586 + " *VIPBOT · " + getOwnerName() + "*";
}
export function getBotMode() {
  try {
    const _0x30b69c = ["./bot_mode.json", _0x197fa7.join(process.cwd(), "bot_mode.json")];
    for (const _0x26312b of _0x30b69c) {
      if (_0x39c0b2.existsSync(_0x26312b)) try {
        const _0xd5bbf1 = JSON.parse(_0x39c0b2.readFileSync(_0x26312b, 'utf8'));
        if (_0xd5bbf1.mode) switch (_0xd5bbf1.mode.toLowerCase()) {
          case "public":
            return SOCIAL.WORLD + '\x20Public';
          case 'silent':
            return STATUS.MUTED + " Silent";
          case "private":
            return STATUS.LOCKED + " Private";
          case "group-only":
            return SOCIAL.PEOPLE + " Group Only";
          case "maintenance":
            return EMERGENCY.TOOLS + '️\x20Maintenance';
          default:
            return UI.SETTINGS + '️\x20' + (_0xd5bbf1.mode.charAt(0).toUpperCase() + _0xd5bbf1.mode.slice(1));
        }
      } catch {}
    }
    if (global.BOT_MODE) return global.BOT_MODE === 'silent' ? STATUS.MUTED + " Silent" : SOCIAL.WORLD + " Public";
    if (global.mode) return global.mode === "silent" ? STATUS.MUTED + " Silent" : SOCIAL.WORLD + " Public";
    if (process.env.BOT_MODE) return process.env.BOT_MODE === "silent" ? STATUS.MUTED + '\x20Silent' : SOCIAL.WORLD + " Public";
  } catch {}
  return SOCIAL.WORLD + '\x20Public';
}
export function getBotVersion() {
  try {
    if (global.VERSION) return global.VERSION;
    const _0x205447 = ['./bot_settings.json', _0x197fa7.join(process.cwd(), "bot_settings.json")];
    for (const _0x38a884 of _0x205447) {
      if (_0x39c0b2.existsSync(_0x38a884)) try {
        const _0x4575e9 = JSON.parse(_0x39c0b2.readFileSync(_0x38a884, "utf8"));
        if (_0x4575e9.version && _0x4575e9.version.trim()) return _0x4575e9.version.trim();
      } catch {}
    }
    if (process.env.VERSION) return process.env.VERSION;
  } catch {}
  return "1.1.7";
}
export function getDeploymentPlatform() {
  const _0x240b0f = _0xabdad();
  if (_0x240b0f.name === "nodeX") return {
    name: _0x240b0f.name,
    icon: _0x240b0f.icon
  };
  if (process.env.HEROKU_APP_NAME || process.env.DYNO || process.env.HEROKU_API_KEY) return {
    name: "Heroku",
    icon: '' + EPHOTO.AVENGERS
  };
  if (process.env.RENDER_SERVICE_ID || process.env.RENDER_SERVICE_NAME || process.env.RENDER) return {
    name: "Render",
    icon: '' + BRAND.LIGHTNING
  };
  if (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_NAME) return {
    name: "Railway",
    icon: '' + STATUS.RAILWAY
  };
  if (process.env.REPL_ID || process.env.REPLIT_DB_URL || process.env.REPLIT_USER || process.env.REPL_SLUG) return {
    name: "Replit",
    icon: '' + UI.SWIRL
  };
  if (process.env.VERCEL || process.env.VERCEL_ENV) return {
    name: "Vercel",
    icon: '▲'
  };
  if (process.env.GLITCH_PROJECT_REMIX || process.env.GLITCH) return {
    name: "Glitch",
    icon: '' + LIB.CARP_STREAMER
  };
  if (process.env.KOYEB_APP || process.env.KOYEB_REGION) return {
    name: 'Koyeb',
    icon: UTILITY.CLOUD + '️'
  };
  if (process.env.PANEL || process.env.PTERODACTYL) return {
    name: "Panel/VPS",
    icon: MEDIA.SCREEN + '️'
  };
  if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT) return {
    name: 'VPS/SSH',
    icon: MEDIA.SCREEN + '️'
  };
  if (process.platform === 'win32') return {
    name: 'Windows\x20PC',
    icon: '' + MEDIA.COMPUTER
  };
  if (process.platform === 'darwin') return {
    name: 'MacOS',
    icon: '' + UTILITY.APPLE
  };
  if (process.platform === "linux") return {
    name: "Linux",
    icon: '' + UTILITY.PENGUIN
  };
  return {
    name: 'Local',
    icon: '' + UI.HOME
  };
}
export function formatUptime(_0x1b2161) {
  const _0x5ccf3c = Math.floor(_0x1b2161 / 3600), _0x1d57c3 = Math.floor(_0x1b2161 % 3600 / 60), _0x5991e3 = Math.floor(_0x1b2161 % 60);
  if (_0x5ccf3c > 0) return _0x5ccf3c + 'h\x20' + _0x1d57c3 + 'm\x20' + _0x5991e3 + 's';
  if (_0x1d57c3 > 0) return _0x1d57c3 + 'm\x20' + _0x5991e3 + 's';
  return _0x5991e3 + 's';
}
export function getRAMUsage() {
  try {
    const _0x51e860 = process.memoryUsage(), _0x24a16b = _0x51e860.heapUsed / 1024 / 1024, _0x3e8809 = _0x51e860.heapTotal / 1024 / 1024, _0x1cac94 = Math.round(_0x24a16b / _0x3e8809 * 100), _0x244ec0 = 10, _0x25342a = Math.round(_0x1cac94 / 100 * _0x244ec0), _0x16ee65 = ('█').repeat(_0x25342a) + ('░').repeat(_0x244ec0 - _0x25342a);
    return {
      bar: _0x16ee65,
      percent: _0x1cac94,
      usedMB: Math.round(_0x24a16b * 10) / 10,
      totalMB: Math.round(_0x3e8809 * 10) / 10
    };
  } catch {
    return {
      bar: "░░░░░░░░░░",
      percent: 0,
      usedMB: 0,
      totalMB: 0
    };
  }
}
export function buildMenuHeader(_0x3613a9, _0x1b8a4c) {
  const _0x4a7ba5 = getBotName(), _0x18cb8f = getOwnerName(), _0x1f25ae = getBotMode(), _0x18b9de = getBotVersion(), _0x38cf23 = getDeploymentPlatform(), _0x3f66ef = formatUptime(process.uptime()), _0x4a5aab = getRAMUsage(), _0x4fc803 = _0x1b8a4c || global.prefix || process.env.PREFIX || '.';
  return "╭┄〔 `" + _0x4a7ba5 + "` 〕┄╮\n┆ ✦ *Menu:* " + _0x3613a9 + "\n┆ 👑 *Owner:* " + _0x18cb8f + "\n┆ ⚜️ *Mode:* " + _0x1f25ae + "\n┆ ✦ *Prefix:* [ " + _0x4fc803 + " ]\n┆ 💎 *Version:* " + _0x18b9de + "\n┆ ⚡ *Panel:* " + _0x38cf23.icon + ' ' + _0x38cf23.name + "\n┆ ✨ *Status:* Elite Active\n┆ ⏱️ *Uptime:* " + _0x3f66ef + "\n┆ 📊 *RAM:* " + _0x4a5aab.bar + ' ' + _0x4a5aab.percent + "%\n┆ 💾 *Memory:* " + _0x4a5aab.usedMB + "MB / " + _0x4a5aab.totalMB + "MB\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯";
}
export function createFakeContact(_0x43ad95) {
  const _0x8585f9 = getBotName(), _0x238749 = _0x43ad95.key.participant?.split('@')[0] || _0x43ad95.key.remoteJid.split('@')[0];
  return {
    key: {
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "VIPBOT"
    },
    message: {
      contactMessage: {
        displayName: _0x8585f9,
        vcard: 'BEGIN:VCARD\x0aVERSION:3.0\x0aN:Sy;Bot;;;\x0aFN:' + _0x8585f9 + '\x0aitem1.TEL;waid=' + _0x238749 + ':' + _0x238749 + "\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
      }
    },
    participant: "0@s.whatsapp.net"
  };
}
export function createFadedEffect(_0x4c0de6) {
  const _0x1a9206 = ['‍', '‌', '⁠', '\ufeff'], _0x31d845 = Array.from({
    length: 90
  }, (_0x2c1310, _0x2cc253) => _0x1a9206[_0x2cc253 % _0x1a9206.length]).join('');
  return '' + _0x31d845 + _0x4c0de6;
}
export function createReadMoreEffect(_0x2cc9d4, _0x21f9af) {
  const _0x4c46bb = ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff'], _0x11d662 = Array.from({
    length: 550
  }, (_0x2b8d3d, _0x2eb25e) => _0x4c46bb[_0x2eb25e % _0x4c46bb.length]).join('');
  return '' + _0x2cc9d4 + _0x11d662 + '\x0a' + _0x21f9af;
}
export async function sendLoadingMessage(_0x55c63b, _0x5e78f0, _0x26116f, _0x1d07ac) {
  const _0x4e2edf = getBotName(), _0x7b1f11 = createFakeContact(_0x1d07ac);
  return (await _0x55c63b.sendMessage(_0x5e78f0, {
    text: BRAND.LIGHTNING + '\x20' + _0x4e2edf + '\x20' + _0x26116f + " loading..."
  }, {
    quoted: _0x7b1f11
  }), await new Promise(_0x49ee27 => setTimeout(_0x49ee27, 800)), _0x7b1f11);
}
export function invalidateMenuHelperCache() {
  (_cachedImage = null, _cachedGif = null, _cachedGifMp4 = null, _cachedImageTime = 0);
}
export async function getMenuMedia() {
  const _0x5965be = Date.now(), _0x3bb75f = _0x197fa7.join(process.cwd(), "data"), _0x3f7c3f = _0x197fa7.join(process.cwd(), "commands", "menus", "media"), _0x2fa274 = _0x197fa7.join(process.cwd(), "commands", "media"), _0x2554a1 = [_0x197fa7.join(_0x3bb75f, "vipbot_menu_custom.gif"), _0x197fa7.join(_0x3bb75f, "wolfbot_menu_custom.gif"), _0x197fa7.join(_0x3f7c3f, "vipbot.gif"), _0x197fa7.join(_0x3f7c3f, "wolfbot.gif"), _0x197fa7.join(_0x2fa274, "vipbot.gif"), _0x197fa7.join(_0x2fa274, 'wolfbot.gif')], _0x4dd394 = [_0x197fa7.join(_0x3bb75f, "vipbot_menu_custom.jpg"), _0x197fa7.join(_0x3bb75f, "wolfbot_menu_custom.jpg"), _0x197fa7.join(_0x3f7c3f, "vipbot.jpg"), _0x197fa7.join(_0x3f7c3f, "wolfbot.jpg"), _0x197fa7.join(_0x2fa274, "vipbot.jpg"), _0x197fa7.join(_0x2fa274, "wolfbot.jpg")], _0x17953c = _0x2554a1.find(_0x18b81e => _0x39c0b2.existsSync(_0x18b81e)) || null, _0x40aa43 = _0x4dd394.find(_0x5a6f3d => _0x39c0b2.existsSync(_0x5a6f3d)) || null;
  if (_0x17953c) {
    if (!_cachedGif || _0x5965be - _cachedImageTime > CACHE_TTL) try {
      (_cachedGif = _0x39c0b2.readFileSync(_0x17953c), _cachedGifMp4 = null, _cachedImageTime = _0x5965be);
      if (!_gifConversionPromise) {
        const _0x2d1163 = _0x197fa7.join(process.cwd(), "tmp");
        if (!_0x39c0b2.existsSync(_0x2d1163)) _0x39c0b2.mkdirSync(_0x2d1163, {
          recursive: true
        });
        const _0x18f43e = _0x197fa7.join(_0x2d1163, "menu_gif_cached_" + process.pid + '_' + _0x5965be + ".mp4");
        _gifConversionPromise = (async () => {
          try {
            (await _execFileAsync(_0x6cf5a3, ['-y', '-i', _0x17953c, "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", '-pix_fmt', "yuv420p", "-preset", "fast", "-crf", '23', "-movflags", "+faststart", "-an", _0x18f43e], {
              timeout: 25000,
              windowsHide: true
            }), _cachedGifMp4 = _0x39c0b2.readFileSync(_0x18f43e));
          } catch {
            _cachedGifMp4 = null;
          } finally {
            try {
              _0x39c0b2.unlinkSync(_0x18f43e);
            } catch {}
            _gifConversionPromise = null;
          }
        })();
      }
    } catch {}
    if (_gifConversionPromise) await _gifConversionPromise;
    if (_cachedGifMp4) return {
      type: "gif",
      buffer: _cachedGif,
      mp4Buffer: _cachedGifMp4
    };
  }
  if (_0x40aa43) {
    if (!_cachedImage || _0x5965be - _cachedImageTime > CACHE_TTL) try {
      (_cachedImage = _0x39c0b2.readFileSync(_0x40aa43), _cachedImageTime = _0x5965be);
    } catch {}
    return {
      type: "image",
      buffer: _cachedImage
    };
  }
  return null;
}
export async function getMenuImageBuffer() {
  const _0x11093d = await getMenuMedia();
  if (_0x11093d) return _0x11093d;
  try {
    const _0x54c604 = await _0x201ab7.get(DEFAULT_MENU_IMAGE_URL, {
      responseType: 'arraybuffer',
      timeout: 10000
    });
    return {
      type: "image",
      buffer: Buffer.from(_0x54c604.data)
    };
  } catch {
    return null;
  }
}
export async function sendMenuMessage(_0x526597, _0xe3a88d, _0x47cf11, _0x58d04f, _0x2d24f2) {
  const _0x31d974 = await sendLoadingMessage(_0x526597, _0xe3a88d, "menu", _0x2d24f2), _0x1ef5ac = createFadedEffect(_0x47cf11), _0x824e2a = getBotName(), _0x604cbb = getOwnerName(), _0x5869b5 = createReadMoreEffect(_0x1ef5ac, _0x58d04f + ('\n\n' + (BRAND.VIP || BRAND.WOLF) + " *VIPBOT · " + _0x604cbb.toUpperCase() + "* " + (BRAND.CROWN || BRAND.PAW))), _0x57adad = await getMenuImageBuffer();
  _0x57adad ? _0x57adad.type === 'gif' && _0x57adad.mp4Buffer ? await _0x526597.sendMessage(_0xe3a88d, {
    video: _0x57adad.mp4Buffer,
    gifPlayback: true,
    caption: _0x5869b5,
    mimetype: "video/mp4"
  }, {
    quoted: _0x31d974
  }) : await _0x526597.sendMessage(_0xe3a88d, {
    image: _0x57adad.buffer,
    caption: _0x5869b5,
    mimetype: "image/jpeg"
  }, {
    quoted: _0x31d974
  }) : await _0x526597.sendMessage(_0xe3a88d, {
    text: _0x5869b5
  }, {
    quoted: _0x31d974
  });
}
export async function sendSubMenu(_0x2c0791, _0xd1f23f, _0x1780de, _0x17159a, _0x40b9e, _0x47217a, _0x50be1f = []) {
  const _0x2b78e5 = getBotName();
  let _0x3e0049 = 1;
  try {
    const _0x4e5607 = _0x197fa7.join(process.cwd(), 'commands', "menus", "current_style.json");
    if (_0x39c0b2.existsSync(_0x4e5607)) {
      const _0x461bd8 = JSON.parse(_0x39c0b2.readFileSync(_0x4e5607, 'utf8'));
      _0x3e0049 = _0x461bd8.current || 1;
    }
  } catch {}
  let _0x48772e = _0x3e0049 === 8;
  if (!_0x48772e) try {
    const {isButtonModeEnabled: _0x53f30a} = await import('./buttonMode.js');
    _0x48772e = _0x53f30a();
  } catch {}
  if (_0x48772e) {
    const _0x3eb2c0 = typeof _0x47217a === "string" && !_0x47217a.includes('╭') ? _0x47217a : global.prefix || process.env.PREFIX || '.';
    let _0x277b91;
    typeof _0x47217a === "string" && _0x47217a.includes('╭') ? _0x277b91 = _0x47217a : _0x277b91 = buildMenuHeader(_0x1780de, _0x3eb2c0);
    const _0x3ec873 = parseCommandsFromText(_0x17159a), _0x3ede06 = _0x277b91 + '\n\n' + _0x17159a + '\n\n' + (BRAND.VIP || BRAND.WOLF) + ' *VIPBOT · ' + getOwnerName().toUpperCase() + '* ' + (BRAND.CROWN || BRAND.PAW);
    try {
      const {sendInteractiveWithImage: _0x505e40} = await import("./buttonHelper.js"), _0x5e7683 = _0x3ec873.slice(0, 8).map(_0x31b3e4 => ({
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '' + _0x3eb2c0 + _0x31b3e4,
          id: '' + _0x3eb2c0 + _0x31b3e4
        })
      }));
      for (const _0x20b1b7 of _0x50be1f) {
        _0x5e7683.push({
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: _0x20b1b7.display_text,
            id: _0x20b1b7.id
          })
        });
      }
      _0x5e7683.push({
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: UI.HOME + '\x20Main\x20Menu',
          id: _0x3eb2c0 + 'menu'
        })
      });
      const _0x1ad5a2 = await getMenuImageBuffer();
      await _0x505e40(_0x2c0791, _0xd1f23f, {
        bodyText: _0x3ede06,
        footerText: (BRAND.VIP || BRAND.WOLF) + ' ' + _0x2b78e5 + " · " + _0x1780de,
        buttons: _0x5e7683,
        imageBuffer: _0x1ad5a2?.type === "gif" ? null : _0x1ad5a2?.buffer || null,
        videoBuffer: _0x1ad5a2?.type === 'gif' ? _0x1ad5a2.mp4Buffer : null,
        mimetype: "image/jpeg"
      });
      return;
    } catch (_0x3304d6) {
      console.log("[SubMenu] Interactive with image failed for " + _0x1780de + ':', _0x3304d6.message);
    }
    const _0x423b20 = createFakeContact(_0x40b9e);
    try {
      const _0xf0740a = await getMenuImageBuffer();
      if (_0xf0740a?.type === "gif" && _0xf0740a.mp4Buffer) await _0x2c0791.sendMessage(_0xd1f23f, {
        video: _0xf0740a.mp4Buffer,
        gifPlayback: true,
        caption: _0x3ede06,
        mimetype: "video/mp4"
      }, {
        quoted: _0x423b20
      }); else _0xf0740a ? await _0x2c0791.sendMessage(_0xd1f23f, {
        image: _0xf0740a.buffer,
        caption: _0x3ede06,
        mimetype: 'image/jpeg'
      }, {
        quoted: _0x423b20
      }) : await _0x2c0791.sendMessage(_0xd1f23f, {
        text: _0x3ede06
      }, {
        quoted: _0x423b20
      });
    } catch (_0x466f1f) {
      (console.log('[SubMenu]\x20Fallback\x20send\x20failed\x20for\x20' + _0x1780de + ':', _0x466f1f.message), await _0x2c0791.sendMessage(_0xd1f23f, {
        text: _0x3ede06
      }, {
        quoted: _0x423b20
      }));
    }
    return;
  }
  const _0x2c0079 = await sendLoadingMessage(_0x2c0791, _0xd1f23f, _0x1780de, _0x40b9e);
  let _0x228a42;
  if (typeof _0x47217a === "string" && _0x47217a.includes('╭')) _0x228a42 = _0x47217a; else {
    const _0x338b80 = typeof _0x47217a === "string" ? _0x47217a : undefined;
    _0x228a42 = buildMenuHeader(_0x1780de, _0x338b80);
  }
  const _0x2c41c9 = createFadedEffect(_0x228a42), _0x22aeb2 = createReadMoreEffect(_0x2c41c9, _0x17159a + ('\n\n' + (BRAND.VIP || BRAND.WOLF) + " *VIPBOT · " + getOwnerName().toUpperCase() + "* " + (BRAND.CROWN || BRAND.PAW))), _0x3d3f27 = await getMenuImageBuffer();
  _0x3d3f27 ? _0x3d3f27.type === 'gif' && _0x3d3f27.mp4Buffer ? await _0x2c0791.sendMessage(_0xd1f23f, {
    video: _0x3d3f27.mp4Buffer,
    gifPlayback: true,
    caption: _0x22aeb2,
    mimetype: 'video/mp4'
  }, {
    quoted: _0x2c0079
  }) : await _0x2c0791.sendMessage(_0xd1f23f, {
    image: _0x3d3f27.buffer,
    caption: _0x22aeb2,
    mimetype: "image/jpeg"
  }, {
    quoted: _0x2c0079
  }) : await _0x2c0791.sendMessage(_0xd1f23f, {
    text: _0x22aeb2
  }, {
    quoted: _0x2c0079
  });
}
function parseCommandsFromText(_0x408461) {
  const _0x46525f = [], _0x2b0938 = _0x408461.matchAll(/•\s*(\S+)/g);
  for (const _0x51c952 of _0x2b0938) {
    let _0x4d57db = _0x51c952[1].trim();
    (_0x4d57db = _0x4d57db.replace(/[^a-zA-Z0-9_+\-]/g, ''), _0x4d57db && _0x4d57db.length > 0 && !_0x46525f.includes(_0x4d57db) && _0x46525f.push(_0x4d57db));
  }
  return _0x46525f;
}
