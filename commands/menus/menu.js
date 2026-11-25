import _0xafa4fa from 'os';
import _0x228e43 from 'fs';
import _0x52a19a from 'path';
import {fileURLToPath} from 'url';
import {execFile as _0x21903f} from 'child_process';
import {promisify} from 'util';
const _execFileAsync = promisify(_0x21903f);
import _0xf5ec70 from '../../lib/ffmpegPath.js';
import {getCurrentMenuStyle} from './menustyle.js';
import {setLastMenu, getAllFieldsStatus} from '../menus/menuToggles.js';
import {getBotName as _0x1be8df} from '../../lib/botname.js';
import {getPlatformInfo} from '../../lib/platformDetect.js';
import {getOwnerName as _0x206882, getFooter, getBotMode} from '../../lib/menuHelper.js';
import {getTimezoneFromPhone} from '../../lib/phoneTimezone.js';
import {generateWAMessageFromContent} from 'wolfsocket';
import {REPO_URL} from '../../lib/repoConfig.js';
import {getBoxStyleCommands} from './commandList.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x52a19a.dirname(__filename), DEFAULT_MENU_IMAGE_URL = "https://i.ibb.co/Gvkt4q9d/Chat-GPT-Image-Feb-21-2026-12-47-33-AM.png";
let _cachedMenuImage = null, _cachedMenuImageTime = 0, _cachedMenuGif = null, _cachedMenuGifMp4 = null, _menuGifConversionPromise = null;
const CACHE_TTL = 10 * 60 * 1000;
async function getMenuMedia() {
  const _0x89554 = Date.now(), _0x4dffab = [_0x52a19a.join(process.cwd(), 'data', 'vipbot_menu_custom.gif'), _0x52a19a.join(process.cwd(), 'data', 'wolfbot_menu_custom.gif')].find(_0xf => _0x228e43.existsSync(_0xf)), _0x293994 = [_0x52a19a.join(process.cwd(), "data", "vipbot_menu_custom.jpg"), _0x52a19a.join(process.cwd(), "data", "wolfbot_menu_custom.jpg")].find(_0xf => _0x228e43.existsSync(_0xf)), _0x97d95a = [_0x52a19a.join(__dirname, "media", 'vipbot.gif'), _0x52a19a.join(__dirname, "media", 'wolfbot.gif')].find(_0xf => _0x228e43.existsSync(_0xf)), _0x39a63c = [_0x52a19a.join(__dirname, "../media/vipbot.gif"), _0x52a19a.join(__dirname, "../media/wolfbot.gif")].find(_0xf => _0x228e43.existsSync(_0xf)), _0x559967 = [_0x52a19a.join(__dirname, "media", 'vipbot.jpg'), _0x52a19a.join(__dirname, "media", 'wolfbot.jpg')].find(_0xf => _0x228e43.existsSync(_0xf)), _0x2c7bd6 = [_0x52a19a.join(__dirname, "../media/vipbot.jpg"), _0x52a19a.join(__dirname, "../media/wolfbot.jpg")].find(_0xf => _0x228e43.existsSync(_0xf)), _0x2a7c6b = _0x4dffab || _0x97d95a || _0x39a63c || null, _0x77e5eb = _0x293994 || _0x559967 || _0x2c7bd6 || null;
  if (_0x2a7c6b) {
    if (!_cachedMenuGif || _0x89554 - _cachedMenuImageTime > CACHE_TTL) try {
      (_cachedMenuGif = _0x228e43.readFileSync(_0x2a7c6b), _cachedMenuGifMp4 = null, _cachedMenuImageTime = _0x89554);
      if (!_menuGifConversionPromise) {
        const _0x1853f6 = _0x52a19a.join(process.cwd(), "tmp");
        if (!_0x228e43.existsSync(_0x1853f6)) _0x228e43.mkdirSync(_0x1853f6, {
          recursive: true
        });
        const _0x5cd6ef = _0x52a19a.join(_0x1853f6, "menu_gif_cached_" + process.pid + '_' + _0x89554 + ".mp4");
        _menuGifConversionPromise = (async () => {
          try {
            (await _execFileAsync(_0xf5ec70, ['-y', '-i', _0x2a7c6b, "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", "-pix_fmt", 'yuv420p', "-preset", "fast", "-crf", '23', "-movflags", "+faststart", '-an', _0x5cd6ef], {
              timeout: 25000,
              windowsHide: true
            }), _cachedMenuGifMp4 = _0x228e43.readFileSync(_0x5cd6ef));
          } catch {
            _cachedMenuGifMp4 = null;
          } finally {
            try {
              _0x228e43.unlinkSync(_0x5cd6ef);
            } catch {}
            _menuGifConversionPromise = null;
          }
        })();
      }
    } catch {}
    if (_menuGifConversionPromise) await _menuGifConversionPromise;
    if (_cachedMenuGifMp4) return {
      type: 'gif',
      buffer: _cachedMenuGif,
      mp4Buffer: _cachedMenuGifMp4
    };
  }
  if (_0x77e5eb) {
    if (!_cachedMenuImage || _0x89554 - _cachedMenuImageTime > CACHE_TTL) try {
      (_cachedMenuImage = _0x228e43.readFileSync(_0x77e5eb), _cachedMenuImageTime = _0x89554);
    } catch {}
    return {
      type: "image",
      buffer: _cachedMenuImage
    };
  }
  return null;
}
export function invalidateMenuImageCache() {
  (_cachedMenuImage = null, _cachedMenuGif = null, _cachedMenuGifMp4 = null, _cachedMenuImageTime = 0);
}
export default {
  name: 'menu',
  description: "Shows the VIPBOT Command Center in various styles",
  async execute(_0x3e4b45, _0x1713d7, _0x295d00) {
    const _0x37f239 = _0x1713d7.key.remoteJid, _0x3d523e = getCurrentMenuStyle();
    if (_0x3d523e === 5) {
      const _0xd84a7e = _0x1be8df();
      await _0x3e4b45.sendMessage(_0x37f239, {
        text: '⚡\x20' + _0xd84a7e + " menu loading...",
        _skipChannelMode: true
      }, {
        quoted: _0x1713d7
      });
      const _0x426ef5 = _0x206882(), _0x3fb91d = global.prefix || process.env.PREFIX || '.', _0x4c4c42 = Math.floor(process.uptime()), _0x31951d = Math.floor(_0x4c4c42 / 3600), _0x52f401 = Math.floor(_0x4c4c42 % 3600 / 60), _0xb0c865 = _0x4c4c42 % 60, _0x6e797 = process.memoryUsage();
      let _0x286823 = "unknown";
      try {
        _0x286823 = JSON.parse(_0x228e43.readFileSync(_0x52a19a.join(process.cwd(), 'package.json'), "utf8")).version || _0x286823;
      } catch {}
      const _0x3f2b1a = getPlatformInfo(), _0x5c488d = getBoxStyleCommands(_0x1713d7), _0xe052f3 = [];
      let _0x10dae5 = null;
      for (const _0x493c89 of _0x5c488d.split(/\r?\n/)) {
        const _0x355d41 = _0x493c89.match(/\*\s*([^*]+?)\s*\*/);
        if (_0x355d41) {
          const _0x5a34b3 = _0x355d41[1].replace(/\s+/g, '\x20').trim();
          _0x5a34b3 && !(/^(prefix|mode|total commands|type|available styles)/i).test(_0x5a34b3) && (_0x10dae5 = {
            title: _0x5a34b3,
            commands: []
          }, _0xe052f3.push(_0x10dae5));
          continue;
        }
        if (_0x10dae5 && (/[•â€¢]/).test(_0x493c89)) {
          const _0x3ba6ee = _0x493c89.match(/([a-z][a-z0-9_-]*)\s*$/i)?.[1];
          if (_0x3ba6ee) _0x10dae5.commands.push(_0x3ba6ee.toLowerCase());
        }
      }
      const _0x33d032 = Array.from({
        length: 550
      }, (_0x5f08ec, _0x553bb4) => ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff'][_0x553bb4 % 7]).join(''), _0x5d0169 = _0xe052f3.filter(_0x2c2223 => _0x2c2223.commands.length).map(_0x32a171 => "╭┄〔 ✦ " + _0x32a171.title + " ✦ 〕┄╮\n\n" + _0x32a171.commands.map(_0x4ecaae => '✦ ' + _0x4ecaae).join('\n') + '\n\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯'), _0x10fa4b = "╭┄〔 💎 " + _0xd84a7e + " 💎 〕┄╮\n\n┆ ✦ Name: " + _0xd84a7e + "\n┆ 👑 Owner: " + _0x426ef5 + "\n┆ ⚜️ Mode: " + getBotMode() + "\n┆ ✦ Prefix: " + _0x3fb91d + "\n┆ ✦ Version: " + _0x286823 + "\n┆ ✦ Platform: " + _0x3f2b1a.name + "\n┆ ✦ Uptime: " + _0x31951d + 'h ' + _0x52f401 + 'm ' + _0xb0c865 + "s\n┆ ✦ Runtime: " + process.version + "\n┆ ✦ Memory: " + (_0x6e797.heapUsed / 1024 / 1024).toFixed(1) + " MB\n\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯", _0x4e9066 = '' + _0x10fa4b + _0x33d032 + '\n\n' + _0x5d0169.join('\n\n') + '\n\n' + getFooter(_0x1713d7.key.participant || _0x37f239), _0x188ae2 = await getMenuMedia();
      if (_0x188ae2?.type === 'gif' && _0x188ae2.mp4Buffer) return _0x3e4b45.sendMessage(_0x37f239, {
        video: _0x188ae2.mp4Buffer,
        gifPlayback: true,
        caption: _0x4e9066,
        mimetype: "video/mp4"
      }, {
        quoted: _0x1713d7
      }); else return _0x188ae2?.buffer ? _0x3e4b45.sendMessage(_0x37f239, {
        image: _0x188ae2.buffer,
        caption: _0x4e9066,
        mimetype: "image/jpeg"
      }, {
        quoted: _0x1713d7
      }) : _0x3e4b45.sendMessage(_0x37f239, {
        text: _0x4e9066
      }, {
        quoted: _0x1713d7
      });
    }
    const _0x18ac85 = _0x3d523e === 1 ? 1 : _0x3d523e === 2 ? 2 : 3, _0x31f58d = _0x3d523e === 3;
    setLastMenu(_0x3d523e);
    try {
      switch (_0x18ac85) {
        case 1:
          {
            const _0x1412b7 = _0x1be8df(), _0xf22a4f = _0x1e1970 => {
              const _0xfe9493 = _0x1e1970.key.participant?.split('@')[0] || _0x1e1970.key.remoteJid.split('@')[0];
              return {
                key: {
                  remoteJid: "status@broadcast",
                  fromMe: false,
                  id: "VIPBOT-X"
                },
                message: {
                  contactMessage: {
                    displayName: _0x1412b7,
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:" + _0x1412b7 + "\nitem1.TEL;waid=" + _0xfe9493 + ':' + _0xfe9493 + '\x0aitem1.X-ABLabel:Ponsel\x0aEND:VCARD'
                  }
                },
                participant: "0@s.whatsapp.net"
              };
            }, _0x448ebf = _0xf22a4f(_0x1713d7);
            (await _0x3e4b45.sendMessage(_0x37f239, {
              text: '⚡\x20' + _0x1412b7 + '\x20menu\x20loading...',
              _skipChannelMode: true
            }, {
              quoted: _0x1713d7
            }), await new Promise(_0x507071 => setTimeout(_0x507071, 800)));
            let _0x4d810b = '';
            const _0x204866 = _0x1d87ca => {
              const _0x391675 = ['‍', '‌', '⁠', '\ufeff'], _0x5755a4 = Array.from({
                length: 90
              }, (_0x2bb453, _0x35bfbe) => _0x391675[_0x35bfbe % _0x391675.length]).join('');
              return '' + _0x5755a4 + _0x1d87ca;
            }, _0x466c7e = (_0x5027f0, _0x2e7e7b) => {
              const _0x3fc4eb = ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff'], _0x476c17 = Array.from({
                length: 550
              }, (_0x2419d0, _0xc3144e) => _0x3fc4eb[_0xc3144e % _0x3fc4eb.length]).join('');
              return '' + _0x5027f0 + _0x476c17 + '\x0a' + _0x2e7e7b;
            }, _0x5cb3fe = () => {
              try {
                const _0x234760 = ['./bot_mode.json', _0x52a19a.join(__dirname, "bot_mode.json"), _0x52a19a.join(__dirname, "../bot_mode.json"), _0x52a19a.join(__dirname, "../../bot_mode.json"), _0x52a19a.join(__dirname, "../../../bot_mode.json"), _0x52a19a.join(__dirname, "../commands/owner/bot_mode.json")];
                for (const _0x38ba1f of _0x234760) {
                  if (_0x228e43.existsSync(_0x38ba1f)) try {
                    const _0x24a1da = JSON.parse(_0x228e43.readFileSync(_0x38ba1f, "utf8"));
                    if (_0x24a1da.mode) {
                      let _0x3edf57;
                      switch (_0x24a1da.mode.toLowerCase()) {
                        case "public":
                          _0x3edf57 = '🌍\x20Public';
                          break;
                        case "silent":
                          _0x3edf57 = "🔇 Silent";
                          break;
                        case "private":
                          _0x3edf57 = '🔒\x20Private';
                          break;
                        case 'group-only':
                          _0x3edf57 = "👥 Group Only";
                          break;
                        case 'maintenance':
                          _0x3edf57 = "🛠️ Maintenance";
                          break;
                        default:
                          _0x3edf57 = "⚙️ " + (_0x24a1da.mode.charAt(0).toUpperCase() + _0x24a1da.mode.slice(1));
                      }
                      return _0x3edf57;
                    }
                  } catch (_0x4a6fad) {}
                }
                if (global.BOT_MODE) return global.BOT_MODE === "silent" ? '🔇\x20Silent' : '🌍\x20Public';
                if (global.mode) return global.mode === "silent" ? '🔇\x20Silent' : '🌍\x20Public';
                if (process.env.BOT_MODE) return process.env.BOT_MODE === "silent" ? '🔇\x20Silent' : "🌍 Public";
              } catch (_0x120578) {}
              return "🌍 Public";
            }, _0x429825 = () => {
              try {
                const _0x20c164 = ["./bot_settings.json", _0x52a19a.join(__dirname, 'bot_settings.json'), _0x52a19a.join(__dirname, '../bot_settings.json'), _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x59bb3c of _0x20c164) {
                  if (_0x228e43.existsSync(_0x59bb3c)) try {
                    const _0x4ad275 = _0x228e43.readFileSync(_0x59bb3c, 'utf8'), _0x54600c = JSON.parse(_0x4ad275);
                    if (_0x54600c.ownerName && _0x54600c.ownerName.trim() !== '') return _0x54600c.ownerName.trim();
                  } catch (_0x734b46) {}
                }
                const _0x2d2a2d = _0x52a19a.join(__dirname, "../../owner.json");
                if (_0x228e43.existsSync(_0x2d2a2d)) {
                  const _0x3c08fe = _0x228e43.readFileSync(_0x2d2a2d, "utf8"), _0x59e1c0 = JSON.parse(_0x3c08fe);
                  if (_0x59e1c0.owner && _0x59e1c0.owner.trim() !== '') return _0x59e1c0.owner.trim(); else {
                    if (_0x59e1c0.number && _0x59e1c0.number.trim() !== '') return _0x59e1c0.number.trim(); else {
                      if (_0x59e1c0.phone && _0x59e1c0.phone.trim() !== '') return _0x59e1c0.phone.trim(); else {
                        if (_0x59e1c0.contact && _0x59e1c0.contact.trim() !== '') return _0x59e1c0.contact.trim(); else {
                          if (Array.isArray(_0x59e1c0) && _0x59e1c0.length > 0) {
                            const _0x15ff24 = typeof _0x59e1c0[0] === "string" ? _0x59e1c0[0] : "Lupin Stanley";
                            return _0x15ff24;
                          }
                        }
                      }
                    }
                  }
                }
                if (global.OWNER_NAME) return global.OWNER_NAME;
                if (global.owner) return global.owner;
                if (process.env.OWNER_NUMBER) return process.env.OWNER_NUMBER;
              } catch (_0x2a295d) {}
              return "Lupin Stanley";
            }, _0x2abaca = () => {
              try {
                const _0x449980 = ["./bot_settings.json", _0x52a19a.join(__dirname, "bot_settings.json"), _0x52a19a.join(__dirname, "../bot_settings.json"), _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x451f94 of _0x449980) {
                  if (_0x228e43.existsSync(_0x451f94)) try {
                    const _0x4759b9 = _0x228e43.readFileSync(_0x451f94, "utf8"), _0x5ed3ba = JSON.parse(_0x4759b9);
                    if (_0x5ed3ba.prefix && _0x5ed3ba.prefix.trim() !== '') return _0x5ed3ba.prefix.trim();
                  } catch (_0x3c5345) {}
                }
                if (global.prefix) return global.prefix;
                if (process.env.PREFIX) return process.env.PREFIX;
              } catch (_0x5cb72f) {}
              return '.';
            }, _0x1a4b72 = () => {
              try {
                if (global.VERSION) return global.VERSION;
                if (global.version) return global.version;
                if (process.env.VERSION) return process.env.VERSION;
                const _0x561f03 = _0x52a19a.join(__dirname, "../../owner.json");
                if (_0x228e43.existsSync(_0x561f03)) {
                  const _0x5b69a7 = _0x228e43.readFileSync(_0x561f03, "utf8"), _0x16664f = JSON.parse(_0x5b69a7);
                  if (_0x16664f.version && _0x16664f.version.trim() !== '') return _0x16664f.version.trim();
                }
                const _0x5c6967 = ["./bot_settings.json", _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x28d9b9 of _0x5c6967) {
                  if (_0x228e43.existsSync(_0x28d9b9)) try {
                    const _0x447688 = _0x228e43.readFileSync(_0x28d9b9, "utf8"), _0x197735 = JSON.parse(_0x447688);
                    if (_0x197735.version && _0x197735.version.trim() !== '') return _0x197735.version.trim();
                  } catch (_0x3f558e) {}
                }
              } catch (_0x5f01a5) {}
              return "1.1.7";
            }, _0x347175 = () => {
              if (process.env.HEROKU_APP_NAME || process.env.DYNO || process.env.HEROKU_API_KEY || process.env.PORT && process.env.PORT !== '3000' && process.env.PORT !== '8080') return {
                name: "Heroku",
                status: "Active",
                icon: '🦸'
              }; else {
                if (process.env.RENDER_SERVICE_ID || process.env.RENDER_SERVICE_NAME || process.env.RENDER) return {
                  name: "Render",
                  status: 'Active',
                  icon: '⚡'
                }; else {
                  if (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_NAME || process.env.RAILWAY_SERVICE_NAME) return {
                    name: "Railway",
                    status: "Active",
                    icon: '🚂'
                  }; else {
                    if (process.env.REPL_ID || process.env.REPLIT_DB_URL || process.env.REPLIT_USER || process.env.REPL_SLUG) return {
                      name: 'Replit',
                      status: "Active",
                      icon: '🌀'
                    }; else {
                      if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL) return {
                        name: "Vercel",
                        status: 'Active',
                        icon: '▲'
                      }; else {
                        if (process.env.GLITCH_PROJECT_REMIX || process.env.PROJECT_REMIX_CHAIN || process.env.GLITCH) return {
                          name: 'Glitch',
                          status: 'Active',
                          icon: '🎏'
                        }; else {
                          if (process.env.KOYEB_APP || process.env.KOYEB_REGION || process.env.KOYEB_SERVICE) return {
                            name: "Koyeb",
                            status: "Active",
                            icon: '☁️'
                          }; else {
                            if (process.env.CYCLIC_URL || process.env.CYCLIC_APP_ID || process.env.CYCLIC_DB) return {
                              name: "Cyclic",
                              status: "Active",
                              icon: '🔄'
                            }; else {
                              if (process.env.PANEL || process.env.PTERODACTYL || process.env.NODE_ENV === 'production' && (process.platform === "linux" && !process.env.SSH_CONNECTION)) return {
                                name: "Panel/VPS",
                                status: 'Active',
                                icon: "🖥️"
                              }; else {
                                if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.platform === "linux" && process.env.USER === "root") return {
                                  name: "VPS/SSH",
                                  status: "Active",
                                  icon: '🖥️'
                                }; else {
                                  if (process.platform === "win32") return {
                                    name: "Windows PC",
                                    status: "Active",
                                    icon: '💻'
                                  }; else {
                                    if (process.platform === "darwin") return {
                                      name: "MacOS",
                                      status: "Active",
                                      icon: '🍎'
                                    }; else return process.platform === "linux" ? {
                                      name: 'Linux\x20Local',
                                      status: "Active",
                                      icon: '🐧'
                                    } : {
                                      name: 'Local\x20Machine',
                                      status: "Active",
                                      icon: '🏠'
                                    };
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }, _0x3894cf = new Date(), _0x43ee1f = globalThis._timezone || "UTC", _0x5c8421 = _0x3894cf.toLocaleTimeString("en-US", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: _0x43ee1f
            }), _0x12211e = _0x3894cf.toLocaleDateString('en-US', {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: _0x43ee1f
            }), _0x16f540 = _0x429825(), _0x474f34 = _0x2abaca(), _0x19a97a = _0x1a4b72(), _0x260162 = _0x5cb3fe(), _0x2e21b5 = getPlatformInfo(), _0x29470e = _0x99d384 => {
              const _0x7d1f4f = Math.floor(_0x99d384 / 3600), _0x14449b = Math.floor(_0x99d384 % 3600 / 60), _0x4a4144 = Math.floor(_0x99d384 % 60);
              if (_0x7d1f4f > 0) return _0x7d1f4f + 'h\x20' + _0x14449b + 'm\x20' + _0x4a4144 + 's'; else return _0x14449b > 0 ? _0x14449b + 'm\x20' + _0x4a4144 + 's' : _0x4a4144 + 's';
            }, _0x19b3f9 = () => {
              try {
                const _0x4cdb02 = process.memoryUsage(), _0x5ca1de = _0x4cdb02.heapUsed / 1024 / 1024, _0x569383 = _0x4cdb02.heapTotal / 1024 / 1024, _0x9c4c2a = Math.round(_0x5ca1de / _0x569383 * 100), _0x1ee8c7 = 10, _0x31834e = Math.round(_0x9c4c2a / 100 * _0x1ee8c7), _0x225f47 = _0x1ee8c7 - _0x31834e, _0x4cea60 = '█', _0x3862bf = '░', _0x34bb7d = _0x4cea60.repeat(_0x31834e) + _0x3862bf.repeat(_0x225f47);
                let _0xc953f4 = _0xafa4fa.totalmem() / 1024 / 1024 / 1024, _0x53e35b = (_0xafa4fa.totalmem() - _0xafa4fa.freemem()) / 1024 / 1024 / 1024, _0x4f3e12 = Math.round(_0x53e35b / _0xc953f4 * 100);
                return {
                  bar: _0x34bb7d,
                  percent: _0x9c4c2a,
                  usedMB: Math.round(_0x5ca1de),
                  totalMB: Math.round(_0x569383),
                  systemPercent: _0x4f3e12,
                  systemUsedGB: Math.round(_0x53e35b * 100) / 100,
                  systemTotalGB: Math.round(_0xc953f4 * 100) / 100
                };
              } catch (_0x49cbde) {
                return {
                  bar: "░░░░░░░░░░",
                  percent: 0,
                  usedMB: 0,
                  totalMB: 0,
                  systemPercent: 0,
                  systemUsedGB: 0,
                  systemTotalGB: 0
                };
              }
            }, _0x584c49 = _0x19b3f9();
            let _0x473f75 = "╭┄〔 💎 " + _0x1412b7 + " 〕┄╮\n┆ ✦ User: " + (_0x1713d7.pushName || "VIP User") + "\n┆ ✦ Owner: " + _0x16f540 + "\n┆ ✦ Mode: " + _0x260162 + "\n┆ ✦ Prefix: [ " + _0x474f34 + " ]\n┆ ✦ Version: " + _0x19a97a + "\n┆ ✦ Platform: " + _0x2e21b5.name + "\n┆ ✦ Timezone: " + getTimezoneFromPhone(_0x1713d7.key.participant || _0x1713d7.key.remoteJid || '') + "\n┆ ✦ Uptime: " + _0x29470e(process.uptime()) + "\n┆ ✦ RAM: " + _0x584c49.bar + " " + _0x584c49.percent + "%\n┆ ✦ Memory: " + _0x584c49.usedMB + "MB / " + _0x584c49.totalMB + "MB\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯";
            const _0x147bb0 = _0x204866(_0x473f75), _0x144470 = '╭─⊷\x20*🏠\x20GROUP\x20MANAGEMENT*\x0a│\x0a├─⊷\x20*🛡️\x20ADMIN\x20&\x20MODERATION*\x0a│\x20\x20•\x20add\x0a│\x20\x20•\x20promote\x0a│\x20\x20•\x20promoteall\x0a│\x20\x20•\x20demote\x0a│\x20\x20•\x20demoteall\x0a│\x20\x20•\x20kick\x0a│\x20\x20•\x20kickall\x0a│\x20\x20•\x20ban\x0a│\x20\x20•\x20unban\x0a│\x20\x20•\x20ex\x0a│\x20\x20•\x20clearbanlist\x0a│\x20\x20•\x20warn\x0a│\x20\x20•\x20resetwarn\x0a│\x20\x20•\x20setwarn\x0a│\x20\x20•\x20warnings\x0a│\x20\x20•\x20mute\x0a│\x20\x20•\x20unmute\x0a│\x20\x20•\x20gctime\x0a│\x20\x20•\x20antilink\x0a│\x20\x20•\x20addbadword\x0a│\x20\x20•\x20removebadword\x0a│\x20\x20•\x20listbadword\x0a│\x20\x20•\x20welcome\x0a│\x20\x20•\x20goodbye\x0a│\x20\x20•\x20joinapproval\x0a│\x20\x20•\x20onlyadmins\x0a│\x20\x20•\x20leave\x0a│\x20\x20•\x20creategroup\x0a│\x0a├─⊷\x20*🚫\x20AUTO-MODERATION*\x0a│\x20\x20•\x20antisticker\x0a│\x20\x20•\x20antiimage\x0a│\x20\x20•\x20antivideo\x0a│\x20\x20•\x20antiaudio\x0a│\x20\x20•\x20antimention\x0a│\x20\x20•\x20antistatusmention\x0a│\x20\x20•\x20antigrouplink\x0a│\x20\x20•\x20antidemote\x0a│\x20\x20•\x20antipromote\x0a│\x20\x20•\x20antibadword\x0a│\x20\x20•\x20antigroupcall\x0a│\x20\x20•\x20antispam\x0a│\x0a├─⊷\x20*📊\x20GROUP\x20INFO\x20&\x20TOOLS*\x0a│\x20\x20•\x20groupinfo\x0a│\x20\x20•\x20grouplink\x0a│\x20\x20•\x20tagadmin\x0a│\x20\x20•\x20tagall\x0a│\x20\x20•\x20hidetag\x0a│\x20\x20•\x20link\x0a│\x20\x20•\x20invite\x0a│\x20\x20•\x20revoke\x0a│\x20\x20•\x20setdesc\x0a│\x20\x20•\x20fangtrace\x0a│\x20\x20•\x20getgpp\x0a│\x20\x20•\x20getdesc\x0a│\x20\x20•\x20listadmins\x0a│\x20\x20•\x20togstatus\x0a│\x20\x20•\x20getparticipants\x0a│\x20\x20•\x20listonline\x0a│\x20\x20•\x20listinactive\x0a│\x20\x20•\x20approveall\x0a│\x20\x20•\x20rejectall\x0a│\x20\x20•\x20stickerpack\x0a│\x20\x20•\x20disp\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🎨\x20MENU\x20COMMANDS*\x0a│\x0a│\x20\x20•\x20menu\x0a│\x20\x20•\x20menustyle\x0a│\x20\x20•\x20togglemenuinfo\x0a│\x20\x20•\x20setmenuimage\x0a│\x20\x20•\x20restoremenuimage\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*👑\x20OWNER\x20CONTROLS*\x0a│\x0a├─⊷\x20*⚡\x20CORE\x20MANAGEMENT*\x0a│\x20\x20•\x20setbotname\x0a│\x20\x20•\x20resetbotname\x0a│\x20\x20•\x20setowner\x0a│\x20\x20•\x20resetowner\x0a│\x20\x20•\x20setprefix\x0a│\x20\x20•\x20prefix\x0a│\x20\x20•\x20iamowner\x0a│\x20\x20•\x20about\x0a│\x20\x20•\x20owner\x0a│\x20\x20•\x20block\x0a│\x20\x20•\x20unblock\x0a│\x20\x20•\x20blockdetect\x0a│\x20\x20•\x20blockall\x0a│\x20\x20•\x20unblockall\x0a│\x20\x20•\x20silent\x0a│\x20\x20•\x20anticall\x0a│\x20\x20•\x20mode\x0a│\x20\x20•\x20setpp\x0a│\x20\x20•\x20setfooter\x0a│\x20\x20•\x20repo\x0a│\x20\x20•\x20pair\x0a│\x20\x20•\x20antidelete\x0a│\x20\x20•\x20antideletestatus\x0a│\x20\x20•\x20antiedit\x0a│\x20\x20•\x20chatbot\x0a│\x20\x20•\x20shutdown\x0a│\x20\x20•\x20broadcast\x0a│\x0a├─⊷\x20*📡\x20CHANNEL\x20MODE*\x0a│\x20\x20•\x20setchannel\x0a│\x20\x20•\x20resetchannel\x0a│\x0a├─⊷\x20*🔄\x20SYSTEM\x20&\x20MAINTENANCE*\x0a│\x20\x20•\x20restart\x0a│\x20\x20•\x20workingreload\x0a│\x20\x20•\x20reloadenv\x0a│\x20\x20•\x20getsettings\x0a│\x20\x20•\x20setsetting\x0a│\x20\x20•\x20test\x0a│\x20\x20•\x20disk\x0a│\x20\x20•\x20hostip\x0a│\x20\x20•\x20findcommands\x0a│\x20\x20•\x20latestupdates\x0a│\x20\x20•\x20platform\x0a│\x20\x20•\x20deploy\x0a│\x20\x20•\x20debugchat\x0a│\x20\x20•\x20ls\x0a│\x20\x20•\x20pwd\x0a│\x20\x20•\x20cat\x0a│\x20\x20•\x20head\x0a│\x20\x20•\x20tail\x0a│\x20\x20•\x20find\x0a│\x20\x20•\x20grep\x0a│\x20\x20•\x20stat\x0a│\x20\x20•\x20du\x0a│\x20\x20•\x20df\x0a│\x20\x20•\x20ps\x0a│\x20\x20•\x20envkeys\x0a│\x20\x20•\x20exec\x0a│\x20\x20•\x20package\x0a│\x0a├─⊷\x20*🔒\x20PRIVACY\x20CONTROLS*\x0a│\x20\x20•\x20online\x0a│\x20\x20•\x20privacy\x0a│\x20\x20•\x20receipt\x0a│\x20\x20•\x20profilepic\x0a│\x20\x20•\x20viewer\x0a│\x20\x20•\x20lastseen\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🖥️\x20CPANEL*\x0a│\x0a│\x20\x20•\x20setlink\x0a│\x20\x20•\x20setkey\x0a│\x20\x20•\x20nestconfig\x0a│\x20\x20•\x20createuser\x0a│\x20\x20•\x20createpanel\x0a│\x20\x20•\x20createunlimited\x0a│\x20\x20•\x20setpayment\x0a│\x20\x20•\x20prompt\x0a│\x20\x20•\x20cpanelmenu\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*👥\x20SUDO*\x0a│\x0a│\x20\x20•\x20addsudo\x0a│\x20\x20•\x20delsudo\x0a│\x20\x20•\x20listsudo\x0a│\x20\x20•\x20getsudo\x0a│\x20\x20•\x20checksudo\x0a│\x20\x20•\x20clearsudo\x0a│\x20\x20•\x20sudomode\x0a│\x20\x20•\x20sudoinfo\x0a│\x20\x20•\x20mysudo\x0a│\x20\x20•\x20sudodebug\x0a│\x20\x20•\x20linksudo\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*⚙️\x20AUTOMATION*\x0a│\x0a│\x20\x20•\x20autoread\x0a│\x20\x20•\x20autotyping\x0a│\x20\x20•\x20autorecording\x0a│\x20\x20•\x20autorecordtyping\x0a│\x20\x20•\x20autoreact\x0a│\x20\x20•\x20autoreactstatus\x0a│\x20\x20•\x20autoviewstatus\x0a│\x20\x20•\x20autobio\x0a│\x20\x20•\x20autorec\x0a│\x20\x20•\x20reactowner\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*✨\x20GENERAL\x20UTILITIES*\x0a│\x0a├─⊷\x20*🔍\x20INFO\x20&\x20SEARCH*\x0a│\x20\x20•\x20alive\x0a│\x20\x20•\x20ping\x0a│\x20\x20•\x20ping2\x0a│\x20\x20•\x20time\x0a│\x20\x20•\x20uptime\x0a│\x20\x20•\x20videocall\x0a│\x20\x20•\x20voicecall\x0a│\x20\x20•\x20define\x0a│\x20\x20•\x20remind\x0a│\x20\x20•\x20sessioninfo\x0a│\x20\x20•\x20genmusic\x0a│\x20\x20•\x20genlyrics\x0a│\x20\x20•\x20musicprompt\x0a│\x20\x20•\x20news\x0a│\x20\x20•\x20covid\x0a│\x20\x20•\x20weather\x0a│\x20\x20•\x20wiki\x0a│\x20\x20•\x20translate\x0a│\x20\x20•\x20iplookup\x0a│\x20\x20•\x20getip\x0a│\x20\x20•\x20getpp\x0a│\x20\x20•\x20getgpp\x0a│\x20\x20•\x20getdesc\x0a│\x20\x20•\x20listadmins\x0a│\x20\x20•\x20prefixinfo\x0a│\x20\x20•\x20platform\x0a│\x20\x20•\x20onwhatsapp\x0a│\x20\x20•\x20country\x0a│\x0a├─⊷\x20*🔗\x20CONVERSION\x20&\x20MEDIA*\x0a│\x20\x20•\x20shorturl\x0a│\x20\x20•\x20url\x0a│\x20\x20•\x20fetch\x0a│\x20\x20•\x20qrencode\x0a│\x20\x20•\x20take\x0a│\x20\x20•\x20imgbb\x0a│\x20\x20•\x20tiktok\x0a│\x20\x20•\x20twitter\x0a│\x20\x20•\x20tgsticker\x0a│\x20\x20•\x20save\x0a│\x20\x20•\x20rename\x0a│\x20\x20•\x20screenshot\x0a│\x20\x20•\x20inspect\x0a│\x20\x20•\x20toimage\x0a│\x20\x20•\x20tosticker\x0a│\x20\x20•\x20toaudio\x0a│\x20\x20•\x20tovoice\x0a│\x20\x20•\x20tts\x0a│\x20\x20•\x20trebleboost\x0a│\x20\x20•\x20jarvis\x0a│\x20\x20•\x20topdf\x0a│\x20\x20•\x20extractpdf\x0a│\x20\x20•\x20toword\x0a│\x20\x20•\x20extractword\x0a│\x20\x20•\x20toexcel\x0a│\x20\x20•\x20extractexcel\x0a│\x20\x20•\x20toppt\x0a│\x20\x20•\x20extractppt\x0a│\x0a├─⊷\x20*📇\x20CONTACT\x20TOOLS*\x0a│\x20\x20•\x20vcf\x0a│\x20\x20•\x20viewvcf\x0a│\x20\x20•\x20vv\x0a│\x20\x20•\x20vv2\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🎵\x20MUSIC\x20&\x20MEDIA*\x0a│\x0a│\x20\x20•\x20play\x0a│\x20\x20•\x20song\x0a│\x20\x20•\x20video\x0a│\x20\x20•\x20videodoc\x0a│\x20\x20•\x20lyrics\x0a│\x20\x20•\x20shazam\x0a│\x20\x20•\x20spotify\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*⬇️\x20MEDIA\x20DOWNLOADS*\x0a│\x0a│\x20\x20•\x20tiktok\x0a│\x20\x20•\x20instagram\x0a│\x20\x20•\x20facebook\x0a│\x20\x20•\x20snapchat\x0a│\x20\x20•\x20apk\x0a│\x20\x20•\x20yts\x0a│\x20\x20•\x20ytplay\x0a│\x20\x20•\x20ytmp3\x0a│\x20\x20•\x20ytv\x0a│\x20\x20•\x20ytmp4\x0a│\x20\x20•\x20ytvdoc\x0a│\x20\x20•\x20videodl\x0a│\x20\x20•\x20playlist\x0a│\x20\x20•\x20xvideos\x0a│\x20\x20•\x20xnxx\x0a│\x20\x20•\x20mediafire\x0a│\x20\x20•\x20downloadurl\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🤖\x20AI\x20COMMANDS*\x0a│\x0a├─⊷\x20*💬\x20MAJOR\x20AI\x20MODELS*\x0a│\x20\x20•\x20gpt\x0a│\x20\x20•\x20chatgpt\x0a│\x20\x20•\x20gemini\x0a│\x20\x20•\x20cohere\x0a│\x20\x20•\x20copilot\x0a│\x20\x20•\x20bing\x0a│\x20\x20•\x20bard\x0a│\x20\x20•\x20claudeai\x0a│\x20\x20•\x20grok\x0a│\x20\x20•\x20groq\x0a│\x20\x20•\x20blackbox\x0a│\x20\x20•\x20mistral\x0a│\x20\x20•\x20metai\x0a│\x20\x20•\x20perplexity\x0a│\x20\x20•\x20qwenai\x0a│\x20\x20•\x20ilama\x0a│\x20\x20•\x20venice\x0a│\x20\x20•\x20wormgpt\x0a│\x20\x20•\x20deepseek\x0a│\x20\x20•\x20chatbot\x0a│\x0a├─⊷\x20*🧠\x20OPEN\x20SOURCE\x20AI*\x0a│\x20\x20•\x20falcon\x0a│\x20\x20•\x20wizard\x0a│\x20\x20•\x20vicuna\x0a│\x20\x20•\x20zephyr\x0a│\x20\x20•\x20mixtral\x0a│\x20\x20•\x20dolphin\x0a│\x20\x20•\x20phi\x0a│\x20\x20•\x20nous\x0a│\x20\x20•\x20openchat\x0a│\x20\x20•\x20orca\x0a│\x20\x20•\x20codellama\x0a│\x20\x20•\x20solar\x0a│\x20\x20•\x20starcoder\x0a│\x20\x20•\x20yi\x0a│\x20\x20•\x20internlm\x0a│\x20\x20•\x20chatglm\x0a│\x20\x20•\x20nemotron\x0a│\x20\x20•\x20neural\x0a│\x20\x20•\x20openhermes\x0a│\x20\x20•\x20command\x0a│\x20\x20•\x20tinyllama\x0a│\x20\x20•\x20replitai\x0a│\x0a├─⊷\x20*🎨\x20AI\x20GENERATION*\x0a│\x20\x20•\x20imagine\x0a│\x20\x20•\x20imagegen\x0a│\x20\x20•\x20flux\x0a│\x20\x20•\x20analyze\x0a│\x20\x20•\x20suno\x0a│\x20\x20•\x20speechwriter\x0a│\x20\x20•\x20humanizer\x0a│\x20\x20•\x20summarize\x0a│\x20\x20•\x20totext\x0a│\x20\x20•\x20removebg\x0a│\x20\x20•\x20enlarger\x0a│\x20\x20•\x20erase\x0a│\x20\x20•\x20vision\x0a│\x20\x20•\x20visionpro\x0a│\x0a├─⊷\x20*🎬\x20AI\x20TOOLS*\x0a│\x20\x20•\x20videogen\x0a│\x20\x20•\x20aiscanner\x0a│\x20\x20•\x20aimenu\x0a│\x20\x20•\x20brandlogo\x0a│\x20\x20•\x20companylogo\x0a│\x20\x20•\x20logoai\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🎬\x20AI\x20VIDEO\x20EFFECTS*\x0a│\x0a│\x20\x20•\x20tigervideo\x0a│\x20\x20•\x20introvideo\x0a│\x20\x20•\x20lightningpubg\x0a│\x20\x20•\x20lovevideo\x0a│\x20\x20•\x20videogen\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🖼️\x20IMAGE\x20TOOLS*\x0a│\x0a│\x20\x20•\x20image\x0a│\x20\x20•\x20imagegen\x0a│\x20\x20•\x20imagine\x0a│\x20\x20•\x20anime\x0a│\x20\x20•\x20art\x0a│\x20\x20•\x20real\x0a│\x20\x20•\x20remini\x0a│\x20\x20•\x20vision\x0a│\x20\x20•\x20visionpro\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🏆\x20SPORTS*\x0a│\x0a│\x20\x20•\x20football\x0a│\x20\x20•\x20matchstats\x0a│\x20\x20•\x20sportsnews\x0a│\x20\x20•\x20teamnews\x0a│\x20\x20•\x20basketball\x0a│\x20\x20•\x20cricket\x0a│\x20\x20•\x20f1\x0a│\x20\x20•\x20nfl\x0a│\x20\x20•\x20mma\x0a│\x20\x20•\x20tennis\x0a│\x20\x20•\x20baseball\x0a│\x20\x20•\x20hockey\x0a│\x20\x20•\x20golf\x0a│\x20\x20•\x20sportsmenu\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🛡️\x20ETHICAL\x20HACKING*\x0a│\x0a│\x20\x20•\x20whois\x0a│\x20\x20•\x20dnslookup\x0a│\x20\x20•\x20subdomain\x0a│\x20\x20•\x20reverseip\x0a│\x20\x20•\x20geoip\x0a│\x20\x20•\x20portscan\x0a│\x20\x20•\x20headers\x0a│\x20\x20•\x20traceroute\x0a│\x20\x20•\x20asnlookup\x0a│\x20\x20•\x20shodan\x0a│\x20\x20•\x20pinghost\x0a│\x20\x20•\x20latency\x0a│\x20\x20•\x20sslcheck\x0a│\x20\x20•\x20tlsinfo\x0a│\x20\x20•\x20openports\x0a│\x20\x20•\x20firewallcheck\x0a│\x20\x20•\x20maclookup\x0a│\x20\x20•\x20bandwidthtest\x0a│\x20\x20•\x20securityheaders\x0a│\x20\x20•\x20wafdetect\x0a│\x20\x20•\x20robotscheck\x0a│\x20\x20•\x20sitemap\x0a│\x20\x20•\x20cmsdetect\x0a│\x20\x20•\x20techstack\x0a│\x20\x20•\x20cookiescan\x0a│\x20\x20•\x20redirectcheck\x0a│\x20\x20•\x20xsscheck\x0a│\x20\x20•\x20sqlicheck\x0a│\x20\x20•\x20csrfcheck\x0a│\x20\x20•\x20clickjackcheck\x0a│\x20\x20•\x20directoryscan\x0a│\x20\x20•\x20exposedfiles\x0a│\x20\x20•\x20misconfigcheck\x0a│\x20\x20•\x20cvecheck\x0a│\x20\x20•\x20hashidentify\x0a│\x20\x20•\x20hashcheck\x0a│\x20\x20•\x20bcryptcheck\x0a│\x20\x20•\x20passwordstrength\x0a│\x20\x20•\x20leakcheck\x0a│\x20\x20•\x20metadata\x0a│\x20\x20•\x20filehash\x0a│\x20\x20•\x20malwarecheck\x0a│\x20\x20•\x20urlscan\x0a│\x20\x20•\x20phishcheck\x0a│\x20\x20•\x20nmap\x0a│\x20\x20•\x20ipinfo\x0a│\x20\x20•\x20nglattack\x0a│\x20\x20•\x20securitymenu\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🕵️\x20STALKER\x20COMMANDS*\x0a│\x0a│\x20\x20•\x20wachannel\x0a│\x20\x20•\x20tiktokstalk\x0a│\x20\x20•\x20twitterstalk\x0a│\x20\x20•\x20ipstalk\x0a│\x20\x20•\x20igstalk\x0a│\x20\x20•\x20npmstalk\x0a│\x20\x20•\x20gitstalk\x0a│\x20\x20•\x20stalkermenu\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🎨\x20LOGO\x20DESIGN\x20STUDIO*\x0a│\x0a│\x20\x20•\x20goldlogo\x0a│\x20\x20•\x20silverlogo\x0a│\x20\x20•\x20platinumlogo\x0a│\x20\x20•\x20chromelogo\x0a│\x20\x20•\x20diamondlogo\x0a│\x20\x20•\x20bronzelogo\x0a│\x20\x20•\x20steelogo\x0a│\x20\x20•\x20copperlogo\x0a│\x20\x20•\x20titaniumlogo\x0a│\x20\x20•\x20firelogo\x0a│\x20\x20•\x20icelogo\x0a│\x20\x20•\x20iceglowlogo\x0a│\x20\x20•\x20lightninglogo\x0a│\x20\x20•\x20rainbowlogo\x0a│\x20\x20•\x20sunlogo\x0a│\x20\x20•\x20moonlogo\x0a│\x20\x20•\x20dragonlogo\x0a│\x20\x20•\x20phoenixlogo\x0a│\x20\x20•\x20wizardlogo\x0a│\x20\x20•\x20crystallogo\x0a│\x20\x20•\x20darkmagiclogo\x0a│\x20\x20•\x20shadowlogo\x0a│\x20\x20•\x20smokelogo\x0a│\x20\x20•\x20bloodlogo\x0a│\x20\x20•\x20neonlogo\x0a│\x20\x20•\x20glowlogo\x0a│\x20\x20•\x20gradientlogo\x0a│\x20\x20•\x20matrixlogo\x0a│\x20\x20•\x20aqualogo\x0a│\x20\x20•\x20logomenu\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🐙\x20GITHUB\x20COMMANDS*\x0a│\x0a│\x20\x20•\x20gitclone\x0a│\x20\x20•\x20repanalyze\x0a│\x20\x20•\x20zip\x0a│\x20\x20•\x20update\x0a│\x20\x20•\x20repo\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🌸\x20ANIME\x20COMMANDS*\x0a│\x0a│\x20\x20•\x20animemenu\x0a│\x20\x20•\x20awoo\x0a│\x20\x20•\x20bully\x0a│\x20\x20•\x20cringe\x0a│\x20\x20•\x20cry\x0a│\x20\x20•\x20cuddle\x0a│\x20\x20•\x20dance\x0a│\x20\x20•\x20glomp\x0a│\x20\x20•\x20highfive\x0a│\x20\x20•\x20hug\x0a│\x20\x20•\x20kill\x0a│\x20\x20•\x20kiss\x0a│\x20\x20•\x20lick\x0a│\x20\x20•\x20megumin\x0a│\x20\x20•\x20neko\x0a│\x20\x20•\x20pat\x0a│\x20\x20•\x20shinobu\x0a│\x20\x20•\x20trap\x0a│\x20\x20•\x20trap2\x0a│\x20\x20•\x20waifu\x0a│\x20\x20•\x20wink\x0a│\x20\x20•\x20yeet\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🎮\x20GAMES*\x0a│\x0a│\x20\x20•\x20wordle\x0a│\x20\x20•\x20hangman\x0a│\x20\x20•\x20numberguess\x0a│\x20\x20•\x20memory\x0a│\x20\x20•\x20slots\x0a│\x20\x20•\x20blackjack\x0a│\x20\x20•\x20trivia\x0a│\x20\x20•\x20chess\x0a│\x20\x20•\x20snake\x0a│\x20\x20•\x20quiz\x0a│\x20\x20•\x20tictactoe\x0a│\x20\x20•\x20emojimix\x0a│\x20\x20•\x20truth\x0a│\x20\x20•\x20dare\x0a│\x20\x20•\x20truthdetector\x0a│\x20\x20•\x20joke\x0a│\x20\x20•\x20quote\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*🎭\x20FUN\x20&\x20TOOLS*\x0a│\x0a│\x20\x20•\x20bf\x0a│\x20\x20•\x20gf\x0a│\x20\x20•\x20couple\x0a│\x20\x20•\x20gay\x0a│\x20\x20•\x20getjid\x0a│\x20\x20•\x20device\x0a│\x20\x20•\x20movie\x0a│\x20\x20•\x20trailer\x0a│\x20\x20•\x20readsite\x0a│\x20\x20•\x20goodmorning\x0a│\x20\x20•\x20goodnight\x0a│\x20\x20•\x20channelstatus\x0a│\x20\x20•\x20hack\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*💰\x20ECONOMY*\x0a│\x0a│\x20\x20•\x20balance\x0a│\x20\x20•\x20daily\x0a│\x20\x20•\x20work\x0a│\x20\x20•\x20deposit\x0a│\x20\x20•\x20withdraw\x0a│\x20\x20•\x20pay\x0a│\x20\x20•\x20rob\x0a│\x20\x20•\x20gamble\x0a│\x20\x20•\x20leaderboard\x0a│\x20\x20•\x20profile\x0a│\x20\x20•\x20economymenu\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*⚡\x20QUICK\x20COMMANDS*\x0a│\x0a│\x0a╰─⊷\x0a\x0a╭─⊷\x20*✨\x20EPHOTO\x20TEXT\x20EFFECTS*\x0a│\x0a├─⊷\x20*💡\x20NEON\x20&\x20GLOW*\x0a│\x20\x20•\x20neon\x0a│\x20\x20•\x20colorfulglow\x0a│\x20\x20•\x20advancedglow\x0a│\x20\x20•\x20neononline\x0a│\x20\x20•\x20blueneon\x0a│\x20\x20•\x20neontext\x0a│\x20\x20•\x20neonlight\x0a│\x20\x20•\x20greenneon\x0a│\x20\x20•\x20greenlightneon\x0a│\x20\x20•\x20blueneonlogo\x0a│\x20\x20•\x20galaxyneon\x0a│\x20\x20•\x20retroneon\x0a│\x20\x20•\x20multicolorneon\x0a│\x20\x20•\x20hackerneon\x0a│\x20\x20•\x20devilwings\x0a│\x20\x20•\x20glowtext\x0a│\x20\x20•\x20blackpinkneon\x0a│\x20\x20•\x20neonglitch\x0a│\x20\x20•\x20colorfulneonlight\x0a│\x0a├─⊷\x20*🧊\x203D\x20TEXT\x20EFFECTS*\x0a│\x20\x20•\x20wooden3d\x0a│\x20\x20•\x20cubic3d\x0a│\x20\x20•\x20wooden3donline\x0a│\x20\x20•\x20water3d\x0a│\x20\x20•\x20cuongthi3d\x0a│\x20\x20•\x20text3d\x0a│\x20\x20•\x20graffiti3d\x0a│\x20\x20•\x20silver3d\x0a│\x20\x20•\x20style3d\x0a│\x20\x20•\x20metal3d\x0a│\x20\x20•\x20ruby3d\x0a│\x20\x20•\x20birthday3d\x0a│\x20\x20•\x20metallogo3d\x0a│\x20\x20•\x20pig3d\x0a│\x20\x20•\x20avengers3d\x0a│\x20\x20•\x20hologram3d\x0a│\x20\x20•\x20gradient3d\x0a│\x20\x20•\x20stone3d\x0a│\x20\x20•\x20space3d\x0a│\x20\x20•\x20sand3d\x0a│\x20\x20•\x20gradienttext3d\x0a│\x20\x20•\x20lightbulb3d\x0a│\x20\x20•\x20snow3d\x0a│\x20\x20•\x20papercut3d\x0a│\x20\x20•\x20underwater3d\x0a│\x20\x20•\x20shinymetallic3d\x0a│\x20\x20•\x20gradientstyle3d\x0a│\x20\x20•\x20beach3d\x0a│\x20\x20•\x20crack3d\x0a│\x20\x20•\x20wood3d\x0a│\x20\x20•\x20americanflag3d\x0a│\x20\x20•\x20christmas3d\x0a│\x20\x20•\x20nigeriaflag3d\x0a│\x20\x20•\x20christmassnow3d\x0a│\x20\x20•\x20goldenchristmas3d\x0a│\x20\x20•\x20decorativemetal3d\x0a│\x20\x20•\x20colorfulpaint3d\x0a│\x20\x20•\x20glossysilver3d\x0a│\x20\x20•\x20balloon3d\x0a│\x20\x20•\x20comic3d\x0a│\x0a├─⊷\x20*📋\x20MENU:*\x20ephotomenu\x0a│\x0a╰─⊷\x0a\x0a' + getFooter(_0x1713d7.key.participant || _0x1713d7.key.remoteJid);
            _0x4d810b = _0x466c7e(_0x147bb0, _0x144470);
            const _0xae04c6 = await getMenuMedia();
            if (!_0xae04c6) {
              await _0x3e4b45.sendMessage(_0x37f239, {
                text: "⚠️ Menu media not found!"
              }, {
                quoted: _0x448ebf
              });
              return;
            }
            _0xae04c6.type === 'gif' && _0xae04c6.mp4Buffer ? await _0x3e4b45.sendMessage(_0x37f239, {
              video: _0xae04c6.mp4Buffer,
              gifPlayback: true,
              caption: _0x4d810b,
              mimetype: "video/mp4"
            }, {
              quoted: _0x448ebf
            }) : await _0x3e4b45.sendMessage(_0x37f239, {
              image: _0xae04c6.buffer,
              caption: _0x4d810b,
              mimetype: "image/jpeg"
            }, {
              quoted: _0x448ebf
            });
            break;
          }
        case 2:
          {
            const _0x1c9bae = _0x1be8df(), _0x445c5d = _0x5c85d0 => {
              const _0x43ebca = _0x5c85d0.key.participant?.split('@')[0] || _0x5c85d0.key.remoteJid.split('@')[0];
              return {
                key: {
                  remoteJid: "status@broadcast",
                  fromMe: false,
                  id: 'VIPBOT-X'
                },
                message: {
                  contactMessage: {
                    displayName: _0x1c9bae,
                    vcard: 'BEGIN:VCARD\x0aVERSION:3.0\x0aN:Sy;Bot;;;\x0aFN:' + _0x1c9bae + "\nitem1.TEL;waid=" + _0x43ebca + ':' + _0x43ebca + "\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
                  }
                },
                participant: "0@s.whatsapp.net"
              };
            }, _0x2459ff = _0x445c5d(_0x1713d7);
            try {
              const _0x331970 = generateWAMessageFromContent(_0x37f239, {
                viewOnceMessage: {
                  message: {
                    interactiveMessage: {
                      body: {
                        text: null
                      },
                      footer: {
                        text: '⚡\x20' + _0x1c9bae + " menu loading..."
                      },
                      nativeFlowMessage: {
                        buttons: [{
                          text: null
                        }]
                      }
                    }
                  }
                }
              }, {
                quoted: _0x2459ff,
                userJid: _0x3e4b45.user?.id || _0x37f239
              });
              await _0x3e4b45.relayMessage(_0x37f239, _0x331970.message, {
                messageId: _0x331970.key.id
              });
            } catch {
              await _0x3e4b45.sendMessage(_0x37f239, {
                text: '⚡\x20' + _0x1c9bae + '\x20menu\x20loading...',
                _skipChannelMode: true
              }, {
                quoted: _0x2459ff
              });
            }
            await new Promise(_0xd15c91 => setTimeout(_0xd15c91, 800));
            let _0x48e98b = '';
            const _0x2dc959 = (_0x228859, _0x5b3356) => {
              const _0x51d716 = ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff'], _0x4a3c84 = Array.from({
                length: 550
              }, (_0x34c1a4, _0xc7b1b9) => _0x51d716[_0xc7b1b9 % _0x51d716.length]).join('');
              return '' + _0x228859 + _0x4a3c84 + '\x0a' + _0x5b3356;
            }, _0x128475 = () => {
              try {
                const _0x53ab4d = ['./bot_mode.json', _0x52a19a.join(__dirname, 'bot_mode.json'), _0x52a19a.join(__dirname, "../bot_mode.json"), _0x52a19a.join(__dirname, '../../bot_mode.json'), _0x52a19a.join(__dirname, "../../../bot_mode.json"), _0x52a19a.join(__dirname, '../commands/owner/bot_mode.json')];
                for (const _0x21ba88 of _0x53ab4d) {
                  if (_0x228e43.existsSync(_0x21ba88)) try {
                    const _0x395d8c = JSON.parse(_0x228e43.readFileSync(_0x21ba88, "utf8"));
                    if (_0x395d8c.mode) {
                      let _0x120cef;
                      switch (_0x395d8c.mode.toLowerCase()) {
                        case "public":
                          _0x120cef = "🌍 Public";
                          break;
                        case "silent":
                          _0x120cef = "🔇 Silent";
                          break;
                        case 'private':
                          _0x120cef = '🔒\x20Private';
                          break;
                        case "group-only":
                          _0x120cef = '👥\x20Group\x20Only';
                          break;
                        case "maintenance":
                          _0x120cef = '🛠️\x20Maintenance';
                          break;
                        default:
                          _0x120cef = "⚙️ " + (_0x395d8c.mode.charAt(0).toUpperCase() + _0x395d8c.mode.slice(1));
                      }
                      return _0x120cef;
                    }
                  } catch (_0x1aa2a7) {}
                }
                if (global.BOT_MODE) return global.BOT_MODE === 'silent' ? "🔇 Silent" : "🌍 Public";
                if (global.mode) return global.mode === 'silent' ? "🔇 Silent" : "🌍 Public";
                if (process.env.BOT_MODE) return process.env.BOT_MODE === 'silent' ? "🔇 Silent" : "🌍 Public";
              } catch (_0x488396) {}
              return "🌍 Public";
            }, _0x50d31d = () => {
              try {
                const _0x59a040 = ['./bot_settings.json', _0x52a19a.join(__dirname, "bot_settings.json"), _0x52a19a.join(__dirname, '../bot_settings.json'), _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x275db6 of _0x59a040) {
                  if (_0x228e43.existsSync(_0x275db6)) try {
                    const _0x49aa86 = _0x228e43.readFileSync(_0x275db6, "utf8"), _0x59d069 = JSON.parse(_0x49aa86);
                    if (_0x59d069.ownerName && _0x59d069.ownerName.trim() !== '') return _0x59d069.ownerName.trim();
                  } catch (_0x34633b) {}
                }
                const _0x11a13f = _0x52a19a.join(__dirname, '../../owner.json');
                if (_0x228e43.existsSync(_0x11a13f)) {
                  const _0x2224c2 = _0x228e43.readFileSync(_0x11a13f, "utf8"), _0x40f118 = JSON.parse(_0x2224c2);
                  if (_0x40f118.owner && _0x40f118.owner.trim() !== '') return _0x40f118.owner.trim(); else {
                    if (_0x40f118.number && _0x40f118.number.trim() !== '') return _0x40f118.number.trim(); else {
                      if (_0x40f118.phone && _0x40f118.phone.trim() !== '') return _0x40f118.phone.trim(); else {
                        if (_0x40f118.contact && _0x40f118.contact.trim() !== '') return _0x40f118.contact.trim(); else {
                          if (Array.isArray(_0x40f118) && _0x40f118.length > 0) {
                            const _0x56c607 = typeof _0x40f118[0] === "string" ? _0x40f118[0] : "Lupin Stanley";
                            return _0x56c607;
                          }
                        }
                      }
                    }
                  }
                }
                if (global.OWNER_NAME) return global.OWNER_NAME;
                if (global.owner) return global.owner;
                if (process.env.OWNER_NUMBER) return process.env.OWNER_NUMBER;
              } catch (_0x5994e9) {}
              return "Lupin Stanley";
            }, _0x10dde1 = () => {
              try {
                const _0xc57a89 = ["./bot_settings.json", _0x52a19a.join(__dirname, "bot_settings.json"), _0x52a19a.join(__dirname, "../bot_settings.json"), _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x4cb190 of _0xc57a89) {
                  if (_0x228e43.existsSync(_0x4cb190)) try {
                    const _0xf2778f = _0x228e43.readFileSync(_0x4cb190, "utf8"), _0x5d534f = JSON.parse(_0xf2778f);
                    if (_0x5d534f.prefix && _0x5d534f.prefix.trim() !== '') return _0x5d534f.prefix.trim();
                  } catch (_0x4ce817) {}
                }
                if (global.prefix) return global.prefix;
                if (process.env.PREFIX) return process.env.PREFIX;
              } catch (_0x1cbe9f) {}
              return '.';
            }, _0x22a9c8 = () => {
              try {
                if (global.VERSION) return global.VERSION;
                if (global.version) return global.version;
                if (process.env.VERSION) return process.env.VERSION;
                const _0x17de9e = _0x52a19a.join(__dirname, "../../owner.json");
                if (_0x228e43.existsSync(_0x17de9e)) {
                  const _0x261abc = _0x228e43.readFileSync(_0x17de9e, 'utf8'), _0x28c9ba = JSON.parse(_0x261abc);
                  if (_0x28c9ba.version && _0x28c9ba.version.trim() !== '') return _0x28c9ba.version.trim();
                }
                const _0x10e260 = ["./bot_settings.json", _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x39e144 of _0x10e260) {
                  if (_0x228e43.existsSync(_0x39e144)) try {
                    const _0x446526 = _0x228e43.readFileSync(_0x39e144, "utf8"), _0x23391e = JSON.parse(_0x446526);
                    if (_0x23391e.version && _0x23391e.version.trim() !== '') return _0x23391e.version.trim();
                  } catch (_0xe02ed9) {}
                }
              } catch (_0x3a340b) {}
              return "1.1.7";
            }, _0x2e617e = () => {
              if (process.env.HEROKU_APP_NAME || process.env.DYNO || process.env.HEROKU_API_KEY) return {
                name: "Heroku",
                icon: '🦸',
                status: "Active"
              };
              if (process.env.RENDER_SERVICE_ID || process.env.RENDER_SERVICE_NAME || process.env.RENDER) return {
                name: 'Render',
                icon: '⚡',
                status: "Active"
              };
              if (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_NAME || process.env.RAILWAY_SERVICE_NAME) return {
                name: 'Railway',
                icon: '🚂',
                status: "Active"
              };
              if (process.env.REPL_ID || process.env.REPLIT_DB_URL || process.env.REPLIT_USER || process.env.REPL_SLUG) return {
                name: "Replit",
                icon: '🌀',
                status: "Active"
              };
              if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL) return {
                name: "Vercel",
                icon: '▲',
                status: "Active"
              };
              if (process.env.GLITCH_PROJECT_REMIX || process.env.PROJECT_REMIX_CHAIN || process.env.GLITCH) return {
                name: "Glitch",
                icon: '🎏',
                status: "Active"
              };
              if (process.env.KOYEB_APP || process.env.KOYEB_REGION || process.env.KOYEB_SERVICE) return {
                name: "Koyeb",
                icon: '☁️',
                status: "Active"
              };
              if (process.env.CYCLIC_URL || process.env.CYCLIC_APP_ID || process.env.CYCLIC_DB) return {
                name: "Cyclic",
                icon: '🔄',
                status: "Active"
              };
              if (process.env.PANEL || process.env.PTERODACTYL) return {
                name: "Panel/Pterodactyl",
                icon: '🖥️',
                status: "Active"
              };
              if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.platform === "linux" && process.env.USER === 'root') return {
                name: "VPS/SSH",
                icon: '🖥️',
                status: 'Active'
              };
              if (process.platform === "win32") return {
                name: "Windows PC",
                icon: '💻',
                status: 'Active'
              };
              if (process.platform === 'darwin') return {
                name: "MacOS",
                icon: '🍎',
                status: "Active"
              };
              if (process.platform === "android") return {
                name: "Termux (Android)",
                icon: '📱',
                status: "Active"
              };
              if (process.platform === "linux") return {
                name: "Linux",
                icon: '🐧',
                status: "Active"
              };
              return {
                name: "Unknown",
                icon: '🏠',
                status: "Active"
              };
            }, _0x3ff962 = new Date(), _0x24a176 = globalThis._timezone || "UTC", _0xc0133a = _0x3ff962.toLocaleTimeString("en-US", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: _0x24a176
            }), _0x2a9910 = _0x3ff962.toLocaleDateString('en-US', {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: _0x24a176
            }), _0x3f895d = _0x50d31d(), _0xd19fe5 = _0x10dde1(), _0xd87a1f = _0x22a9c8(), _0x581b72 = _0x128475(), _0x4f3caa = getPlatformInfo(), _0xb1a89e = getAllFieldsStatus(_0x3d523e);
            let _0x3093bd = false;
            _0xb1a89e && typeof _0xb1a89e === "object" ? _0x3093bd = Object.values(_0xb1a89e).some(_0x368810 => _0x368810) : _0x3093bd = true;
            let _0x10b970 = '';
            if (_0x3093bd) {
              const _0x566187 = performance.now(), _0x2f6dc3 = process.uptime(), _0x899f01 = Math.floor(_0x2f6dc3 / 3600), _0x3ab1d7 = Math.floor(_0x2f6dc3 % 3600 / 60), _0x225ec9 = Math.floor(_0x2f6dc3 % 60), _0x21f711 = _0x899f01 + 'h\x20' + _0x3ab1d7 + 'm\x20' + _0x225ec9 + 's', _0x2dbf45 = (performance.now() - _0x566187).toFixed(2), _0x4ee1ae = process.memoryUsage(), _0x23386c = _0x4ee1ae.heapUsed / 1024 / 1024, _0xb94ff5 = _0x4ee1ae.heapTotal / 1024 / 1024, _0x2e08fc = _0x23386c.toFixed(1), _0x15caa7 = _0xb94ff5.toFixed(1), _0x1ff094 = Math.round(_0x23386c / _0xb94ff5 * 100), _0x39ab7f = _0x1ff094, _0x4b042e = Math.round(_0x1ff094 / 100 * 10), _0x53c56c = 10 - _0x4b042e, _0x36a41c = ('█').repeat(_0x4b042e) + ('░').repeat(_0x53c56c), _0x4e53cf = _0x2dbf45 + 'ms', _0x28f2ef = [];
              if (_0xb1a89e && _0xb1a89e.user || !_0xb1a89e) _0x28f2ef.push('┆ ✦ User: ' + (_0x1713d7.pushName || 'VIP User'));
              if (_0xb1a89e && _0xb1a89e.owner || !_0xb1a89e) _0x28f2ef.push("┆ ✦ Owner: " + _0x3f895d);
              if (_0xb1a89e && _0xb1a89e.mode || !_0xb1a89e) _0x28f2ef.push("┆ ✦ Mode: " + _0x581b72);
              if (_0xb1a89e && _0xb1a89e.prefix || !_0xb1a89e) _0x28f2ef.push("┆ ✦ Prefix: [ " + _0xd19fe5 + ' ]');
              if (_0xb1a89e && _0xb1a89e.version || !_0xb1a89e) _0x28f2ef.push('┆ ✦ Version: ' + _0xd87a1f);
              (_0xb1a89e && _0xb1a89e.host || !_0xb1a89e) && _0x28f2ef.push("┆ ✦ Platform: " + _0x4f3caa.icon + ' ' + _0x4f3caa.name);
              if (_0xb1a89e && _0xb1a89e.uptime || !_0xb1a89e) _0x28f2ef.push("┆ ✦ Uptime: " + _0x21f711);
              (_0xb1a89e && _0xb1a89e.ram || !_0xb1a89e) && _0x28f2ef.push("┆ ✦ RAM: " + _0x36a41c + ' ' + _0x39ab7f + '%');
              if (_0xb1a89e && _0xb1a89e.usage || !_0xb1a89e) _0x28f2ef.push('┆ ✦ Memory: ' + _0x2e08fc + "MB / " + _0x15caa7 + 'MB');
              ((_0xb1a89e && _0xb1a89e.timezone || !_0xb1a89e) && _0x28f2ef.push("┆ ✦ Timezone: " + getTimezoneFromPhone(_0x1713d7.key.participant || _0x1713d7.key.remoteJid || '')), _0x28f2ef.length > 0 && (_0x10b970 = "╭┄〔 💎 `" + _0x1c9bae + "` 〕┄╮\n" + _0x28f2ef.join('\n') + "\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n"));
            } else _0x10b970 = "*No additional information is enabled.*\n*Use .togglemenuinfo to customize*\n\n";
            const _0x27455f = ["┌──⌈ `GROUP MANAGEMENT` ⌋\n│ add\n│ promote\n│ promoteall\n│ demote\n│ demoteall\n│ kick\n│ kickall\n│ ban\n│ unban\n│ clearbanlist\n│ warn\n│ resetwarn\n│ setwarn\n│ warnings\n│ mute\n│ unmute\n│ gctime\n│ antilink\n│ addbadword\n│ removebadword\n│ listbadword\n│ welcome\n│ goodbye\n│ joinapproval\n│ onlyadmins\n│ leave\n│ creategroup\n└───────────────", "┌──⌈ `AUTO MODERATION` ⌋\n│ antisticker\n│ antiimage\n│ antivideo\n│ antiaudio\n│ antimention\n│ antistatusmention\n│ antigrouplink\n│ antidemote\n│ antipromote\n│ antibadword\n│ antigroupcall\n│ antispam\n└───────────────", '┌──⌈\x20`GROUP\x20INFO\x20&\x20TOOLS`\x20⌋\x0a│\x20groupinfo\x0a│\x20grouplink\x0a│\x20tagadmin\x0a│\x20tagall\x0a│\x20hidetag\x0a│\x20link\x0a│\x20invite\x0a│\x20revoke\x0a│\x20setdesc\x0a│\x20fangtrace\x0a│\x20getgpp\x0a│\x20getdesc\x0a│\x20listadmins\x0a│\x20togstatus\x0a│\x20getparticipants\x0a│\x20listonline\x0a│\x20listinactive\x0a│\x20approveall\x0a│\x20rejectall\x0a│\x20disp\x0a└───────────────', "┌──⌈ `MENU SETTINGS` ⌋\n│ menu\n│ menu2\n│ menustyle\n│ togglemenuinfo\n│ setmenuimage\n│ restoremenuimage\n└───────────────", "┌──⌈ `OWNER CONTROLS` ⌋\n│ setbotname\n│ resetbotname\n│ setowner\n│ resetowner\n│ setprefix\n│ prefix\n│ iamowner\n│ about\n│ owner\n│ block\n│ unblock\n│ blockdetect\n│ blockall\n│ unblockall\n│ silent\n│ anticall\n│ mode\n│ setpp\n│ setfooter\n│ repo\n│ pair\n│ antidelete\n│ antideletestatus\n│ antiedit\n│ chatbot\n│ shutdown\n│ broadcast\n└───────────────", "┌──⌈ `CHANNEL MODE` ⌋\n│ setchannel\n│ resetchannel\n└───────────────", '┌──⌈\x20`SYSTEM\x20&\x20MAINTENANCE`\x20⌋\x0a│\x20restart\x0a│\x20workingreload\x0a│\x20reloadenv\x0a│\x20getsettings\x0a│\x20setsetting\x0a│\x20test\x0a│\x20disk\x0a│\x20hostip\x0a│\x20findcommands\x0a│\x20latestupdates\x0a│\x20panel\x0a│\x20debugchat\x0a│\x20ls\x0a│\x20pwd\x0a│\x20cat\x0a│\x20head\x0a│\x20tail\x0a│\x20find\x0a│\x20grep\x0a│\x20stat\x0a│\x20du\x0a│\x20df\x0a│\x20ps\x0a│\x20envkeys\x0a│\x20exec\x0a│\x20package\x0a└───────────────', '┌──⌈\x20`SUDO`\x20⌋\x0a│\x20addsudo\x0a│\x20delsudo\x0a│\x20listsudo\x0a│\x20getsudo\x0a│\x20checksudo\x0a│\x20clearsudo\x0a│\x20sudomode\x0a│\x20sudoinfo\x0a│\x20mysudo\x0a│\x20sudodebug\x0a│\x20linksudo\x0a└───────────────', '┌──⌈\x20`CPANEL`\x20⌋\x0a│\x20setlink\x0a│\x20setkey\x0a│\x20nestconfig\x0a│\x20createuser\x0a│\x20createpanel\x0a│\x20createunlimited\x0a│\x20setpayment\x0a│\x20prompt\x0a│\x20cpanelmenu\x0a└───────────────', "┌──⌈ `AUTOMATION` ⌋\n│ autoread\n│ autotyping\n│ autorecording\n│ autorecordtyping\n│ autoreact\n│ autoreactstatus\n│ autoviewstatus\n│ autobio\n│ autorec\n│ reactowner\n└───────────────", "┌──⌈ `PRIVACY CONTROLS` ⌋\n│ online\n│ privacy\n│ receipt\n│ profilepic\n│ viewer\n│ lastseen\n└───────────────", "┌──⌈ `GENERAL UTILITIES` ⌋\n│ alive\n│ ping\n│ ping2\n│ time\n│ uptime\n│ videocall\n│ voicecall\n│ define\n│ remind\n│ sessioninfo\n│ genmusic\n│ genlyrics\n│ musicprompt\n│ news\n│ covid\n│ weather\n│ wiki\n│ translate\n│ iplookup\n│ getip\n│ getpp\n│ getgpp\n│ getdesc\n│ listadmins\n│ prefixinfo\n│ platform\n│ onwhatsapp\n│ country\n└───────────────", "┌──⌈ `CONVERSION & MEDIA` ⌋\n│ shorturl\n│ url\n│ fetch\n│ qrencode\n│ take\n│ imgbb\n│ save\n│ rename\n│ screenshot\n│ inspect\n│ toimage\n│ tosticker\n│ toaudio\n│ tovoice\n│ tts\n│ trebleboost\n│ jarvis\n│ topdf\n│ extractpdf\n│ toword\n│ extractword\n│ toexcel\n│ extractexcel\n│ toppt\n│ extractppt\n└───────────────", '┌──⌈\x20`CONTACT\x20TOOLS`\x20⌋\x0a│\x20vcf\x0a│\x20viewvcf\x0a│\x20vv\x0a│\x20vv2\x0a└───────────────', '┌──⌈\x20`MUSIC`\x20⌋\x0a│\x20play\x0a│\x20song\x0a│\x20video\x0a│\x20videodoc\x0a│\x20lyrics\x0a│\x20shazam\x0a│\x20spotify\x0a└───────────────', "┌──⌈ `MEDIA DOWNLOADS` ⌋\n│ tiktok\n│ instagram\n│ facebook\n│ snapchat\n│ apk\n│ yts\n│ ytplay\n│ ytmp3\n│ ytv\n│ ytmp4\n│ ytvdoc\n│ videodl\n│ playlist\n│ xvideos\n│ xnxx\n│ mediafire\n│ downloadurl\n└───────────────", "┌──⌈ `AI COMMANDS` ⌋\n│ gpt\n│ chatgpt\n│ gemini\n│ cohere\n│ copilot\n│ bing\n│ bard\n│ claudeai\n│ grok\n│ groq\n│ blackbox\n│ mistral\n│ metai\n│ perplexity\n│ qwenai\n│ ilama\n│ venice\n│ wormgpt\n│ deepseek\n│ chatbot\n├─ Open Source AI ─\n│ falcon\n│ wizard\n│ vicuna\n│ zephyr\n│ mixtral\n│ dolphin\n│ phi\n│ nous\n│ openchat\n│ orca\n│ codellama\n│ solar\n│ starcoder\n│ yi\n│ internlm\n│ chatglm\n│ nemotron\n│ neural\n│ openhermes\n│ command\n│ tinyllama\n│ replitai\n└───────────────", "┌──⌈ `AI GENERATION` ⌋\n│ imagine\n│ imagegen\n│ flux\n│ analyze\n│ suno\n│ speechwriter\n│ humanizer\n│ summarize\n│ totext\n│ removebg\n│ enlarger\n│ erase\n│ vision\n│ visionpro\n└───────────────", '┌──⌈\x20`AI\x20TOOLS`\x20⌋\x0a│\x20videogen\x0a│\x20aiscanner\x0a│\x20aimenu\x0a│\x20brandlogo\x0a│\x20companylogo\x0a│\x20logoai\x0a└───────────────', '┌──⌈\x20`AI\x20VIDEO\x20EFFECTS`\x20⌋\x0a│\x20tigervideo\x0a│\x20introvideo\x0a│\x20lightningpubg\x0a│\x20lovevideo\x0a│\x20videogen\x0a└───────────────', "┌──⌈ `IMAGE TOOLS` ⌋\n│ image\n│ imagegen\n│ imagine\n│ anime\n│ art\n│ real\n│ remini\n│ vision\n│ visionpro\n└───────────────", '┌──⌈\x20`SPORTS`\x20⌋\x0a│\x20football\x0a│\x20matchstats\x0a│\x20sportsnews\x0a│\x20teamnews\x0a│\x20basketball\x0a│\x20cricket\x0a│\x20f1\x0a│\x20nfl\x0a│\x20mma\x0a│\x20tennis\x0a│\x20baseball\x0a│\x20hockey\x0a│\x20golf\x0a│\x20sportsmenu\x0a└───────────────', "┌──⌈ `ETHICAL HACKING` ⌋\n│ whois\n│ dnslookup\n│ subdomain\n│ reverseip\n│ geoip\n│ portscan\n│ headers\n│ traceroute\n│ asnlookup\n│ shodan\n│ pinghost\n│ latency\n│ sslcheck\n│ tlsinfo\n│ openports\n│ firewallcheck\n│ maclookup\n│ bandwidthtest\n│ securityheaders\n│ wafdetect\n│ robotscheck\n│ sitemap\n│ cmsdetect\n│ techstack\n│ cookiescan\n│ redirectcheck\n│ xsscheck\n│ sqlicheck\n│ csrfcheck\n│ clickjackcheck\n│ directoryscan\n│ exposedfiles\n│ misconfigcheck\n│ cvecheck\n│ hashidentify\n│ hashcheck\n│ bcryptcheck\n│ passwordstrength\n│ leakcheck\n│ metadata\n│ filehash\n│ malwarecheck\n│ urlscan\n│ phishcheck\n│ nmap\n│ ipinfo\n│ nglattack\n│ securitymenu\n└───────────────", "┌──⌈ `LOGO DESIGN STUDIO` ⌋\n│ goldlogo\n│ silverlogo\n│ platinumlogo\n│ chromelogo\n│ diamondlogo\n│ bronzelogo\n│ steellogo\n│ copperlogo\n│ titaniumlogo\n│ firelogo\n│ icelogo\n│ iceglowlogo\n│ lightninglogo\n│ aqualogo\n│ rainbowlogo\n│ sunlogo\n│ moonlogo\n│ dragonlogo\n│ phoenixlogo\n│ wizardlogo\n│ crystallogo\n│ darkmagiclogo\n│ shadowlogo\n│ smokelogo\n│ bloodlogo\n│ neonlogo\n│ glowlogo\n│ gradientlogo\n│ matrixlogo\n└───────────────", '┌──⌈\x20`GITHUB\x20TOOLS`\x20⌋\x0a│\x20gitclone\x0a│\x20repanalyze\x0a│\x20zip\x0a│\x20update\x0a│\x20repo\x0a└───────────────', "┌──⌈ `ANIME REACTIONS` ⌋\n│ animemenu\n│ awoo\n│ bully\n│ cringe\n│ cry\n│ cuddle\n│ dance\n│ glomp\n│ highfive\n│ hug\n│ kill\n│ kiss\n│ lick\n│ megumin\n│ neko\n│ pat\n│ shinobu\n│ trap\n│ trap2\n│ waifu\n│ wink\n│ yeet\n└───────────────", '┌──⌈\x20`GAMES`\x20⌋\x0a│\x20wordle\x0a│\x20hangman\x0a│\x20numberguess\x0a│\x20memory\x0a│\x20slots\x0a│\x20blackjack\x0a│\x20trivia\x0a│\x20chess\x0a│\x20snake\x0a│\x20quiz\x0a│\x20tictactoe\x0a│\x20emojimix\x0a│\x20truth\x0a│\x20dare\x0a│\x20truthdetector\x0a│\x20joke\x0a│\x20quote\x0a└───────────────', "┌──⌈ `FUN & TOOLS` ⌋\n│ bf\n│ gf\n│ couple\n│ gay\n│ getjid\n│ device\n│ movie\n│ trailer\n│ readsite\n│ goodmorning\n│ goodnight\n│ channelstatus\n│ hack\n└───────────────", '┌──⌈\x20`ECONOMY`\x20⌋\x0a│\x20balance\x0a│\x20daily\x0a│\x20work\x0a│\x20deposit\x0a│\x20withdraw\x0a│\x20pay\x0a│\x20rob\x0a│\x20gamble\x0a│\x20leaderboard\x0a│\x20profile\x0a│\x20economymenu\x0a└───────────────', "┌──⌈ `QUICK COMMANDS` ⌋\n│ p\n│ up\n└───────────────", "┌──⌈ `EPHOTO TEXT EFFECTS` ⌋\n│ neon\n│ colorfulglow\n│ advancedglow\n│ neononline\n│ blueneon\n│ neontext\n│ neonlight\n│ greenneon\n│ greenlightneon\n│ blueneonlogo\n│ galaxyneon\n│ retroneon\n│ multicolorneon\n│ hackerneon\n│ devilwings\n│ glowtext\n│ blackpinkneon\n│ neonglitch\n│ colorfulneonlight\n│ wooden3d\n│ cubic3d\n│ wooden3donline\n│ water3d\n│ cuongthi3d\n│ text3d\n│ graffiti3d\n│ silver3d\n│ style3d\n│ metal3d\n│ ruby3d\n│ birthday3d\n│ metallogo3d\n│ pig3d\n│ avengers3d\n│ hologram3d\n│ gradient3d\n│ stone3d\n│ space3d\n│ sand3d\n│ gradienttext3d\n│ lightbulb3d\n│ snow3d\n│ papercut3d\n│ underwater3d\n│ shinymetallic3d\n│ gradientstyle3d\n│ beach3d\n│ crack3d\n│ wood3d\n│ americanflag3d\n│ christmas3d\n│ nigeriaflag3d\n│ christmassnow3d\n│ goldenchristmas3d\n│ decorativemetal3d\n│ colorfulpaint3d\n│ glossysilver3d\n│ balloon3d\n│ comic3d\n│ ephotomenu\n└───────────────", '' + getFooter(_0x1713d7.key.participant || _0x1713d7.key.remoteJid)], _0x55bdb2 = Array.from({
              length: 550
            }, (_0x59d61c, _0x53b6a9) => ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff'][_0x53b6a9 % 7]).join(''), _0xb7756c = _0x27455f.join('\x0a' + _0x55bdb2 + '\x0a'), _0x424287 = '' + _0x10b970 + _0x55bdb2 + '\x0a' + _0xb7756c;
            try {
              let _0xf6b6d = generateWAMessageFromContent(_0x37f239, {
                viewOnceMessage: {
                  message: {
                    interactiveMessage: {
                      body: {
                        text: null
                      },
                      footer: {
                        text: _0x424287
                      },
                      nativeFlowMessage: {
                        buttons: [{
                          text: null
                        }]
                      }
                    }
                  }
                }
              }, {
                quoted: _0x2459ff,
                userJid: _0x3e4b45.user?.id || _0x37f239
              });
              (await _0x3e4b45.relayMessage(_0x37f239, _0xf6b6d.message, {
                messageId: _0xf6b6d.key.id
              }), console.log('✅\x20' + _0x1c9bae + " menu sent as interactive message"));
            } catch (_0x359780) {
              (console.error("Error sending interactive menu:", _0x359780), await _0x3e4b45.sendMessage(_0x37f239, {
                text: _0x424287
              }, {
                quoted: _0x2459ff
              }), console.log('✅\x20' + _0x1c9bae + " menu sent as text (fallback from interactive)"));
            }
            break;
          }
        case 3:
          {
            const _0x28c41d = _0x1be8df();
            (await _0x3e4b45.sendMessage(_0x37f239, {
              text: '⚡\x20' + _0x28c41d + " menu loading...",
              _skipChannelMode: true
            }, {
              quoted: _0x1713d7
            }), await new Promise(_0x4910ee => setTimeout(_0x4910ee, 800)));
            let _0x449607 = '';
            const _0x375ba3 = (_0x1871ee, _0x4c80fc) => {
              const _0x4e5165 = ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff'], _0x28714b = Array.from({
                length: 550
              }, (_0x11aebc, _0x51e59e) => _0x4e5165[_0x51e59e % _0x4e5165.length]).join('');
              return '' + _0x1871ee + _0x28714b + '\x0a' + _0x4c80fc;
            }, _0x40af3b = () => {
              try {
                const _0x561957 = ["./bot_mode.json", _0x52a19a.join(__dirname, 'bot_mode.json'), _0x52a19a.join(__dirname, '../bot_mode.json'), _0x52a19a.join(__dirname, "../../bot_mode.json"), _0x52a19a.join(__dirname, "../../../bot_mode.json"), _0x52a19a.join(__dirname, "../commands/owner/bot_mode.json")];
                for (const _0x1197c8 of _0x561957) {
                  if (_0x228e43.existsSync(_0x1197c8)) try {
                    const _0x14bc79 = JSON.parse(_0x228e43.readFileSync(_0x1197c8, "utf8"));
                    if (_0x14bc79.mode) {
                      let _0x40e103;
                      switch (_0x14bc79.mode.toLowerCase()) {
                        case "public":
                          _0x40e103 = '🌍\x20Public';
                          break;
                        case "silent":
                          _0x40e103 = "🔇 Silent";
                          break;
                        case "private":
                          _0x40e103 = "🔒 Private";
                          break;
                        case "group-only":
                          _0x40e103 = "👥 Group Only";
                          break;
                        case "maintenance":
                          _0x40e103 = "🛠️ Maintenance";
                          break;
                        default:
                          _0x40e103 = "⚙️ " + (_0x14bc79.mode.charAt(0).toUpperCase() + _0x14bc79.mode.slice(1));
                      }
                      return _0x40e103;
                    }
                  } catch (_0x555fa7) {}
                }
                if (global.BOT_MODE) return global.BOT_MODE === 'silent' ? "🔇 Silent" : '🌍\x20Public';
                if (global.mode) return global.mode === 'silent' ? "🔇 Silent" : "🌍 Public";
                if (process.env.BOT_MODE) return process.env.BOT_MODE === "silent" ? "🔇 Silent" : "🌍 Public";
              } catch (_0x194b7c) {}
              return "🌍 Public";
            }, _0x441a58 = () => {
              try {
                const _0xc14633 = ["./bot_settings.json", _0x52a19a.join(__dirname, "bot_settings.json"), _0x52a19a.join(__dirname, "../bot_settings.json"), _0x52a19a.join(__dirname, '../../bot_settings.json')];
                for (const _0x25352f of _0xc14633) {
                  if (_0x228e43.existsSync(_0x25352f)) try {
                    const _0x19b60c = _0x228e43.readFileSync(_0x25352f, "utf8"), _0x21e45e = JSON.parse(_0x19b60c);
                    if (_0x21e45e.ownerName && _0x21e45e.ownerName.trim() !== '') return _0x21e45e.ownerName.trim();
                  } catch (_0x1d9238) {}
                }
                const _0x4aa835 = _0x52a19a.join(__dirname, "../../owner.json");
                if (_0x228e43.existsSync(_0x4aa835)) {
                  const _0x1ca4ca = _0x228e43.readFileSync(_0x4aa835, "utf8"), _0x2c2dcc = JSON.parse(_0x1ca4ca);
                  if (_0x2c2dcc.owner && _0x2c2dcc.owner.trim() !== '') return _0x2c2dcc.owner.trim(); else {
                    if (_0x2c2dcc.number && _0x2c2dcc.number.trim() !== '') return _0x2c2dcc.number.trim(); else {
                      if (_0x2c2dcc.phone && _0x2c2dcc.phone.trim() !== '') return _0x2c2dcc.phone.trim(); else {
                        if (_0x2c2dcc.contact && _0x2c2dcc.contact.trim() !== '') return _0x2c2dcc.contact.trim(); else {
                          if (Array.isArray(_0x2c2dcc) && _0x2c2dcc.length > 0) {
                            const _0xb64535 = typeof _0x2c2dcc[0] === "string" ? _0x2c2dcc[0] : "Lupin Stanley";
                            return _0xb64535;
                          }
                        }
                      }
                    }
                  }
                }
                if (global.OWNER_NAME) return global.OWNER_NAME;
                if (global.owner) return global.owner;
                if (process.env.OWNER_NUMBER) return process.env.OWNER_NUMBER;
              } catch (_0x76d400) {}
              return "Lupin Stanley";
            }, _0x10a691 = () => {
              try {
                const _0x4b3def = ["./bot_settings.json", _0x52a19a.join(__dirname, "bot_settings.json"), _0x52a19a.join(__dirname, "../bot_settings.json"), _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x978dbc of _0x4b3def) {
                  if (_0x228e43.existsSync(_0x978dbc)) try {
                    const _0xccf886 = _0x228e43.readFileSync(_0x978dbc, "utf8"), _0x216876 = JSON.parse(_0xccf886);
                    if (_0x216876.prefix && _0x216876.prefix.trim() !== '') return _0x216876.prefix.trim();
                  } catch (_0x3755c0) {}
                }
                if (global.prefix) return global.prefix;
                if (process.env.PREFIX) return process.env.PREFIX;
              } catch (_0x2c8821) {}
              return '.';
            }, _0x139e9d = () => {
              try {
                if (global.VERSION) return global.VERSION;
                if (global.version) return global.version;
                if (process.env.VERSION) return process.env.VERSION;
                const _0x34271b = _0x52a19a.join(__dirname, "../../owner.json");
                if (_0x228e43.existsSync(_0x34271b)) {
                  const _0x5e31f6 = _0x228e43.readFileSync(_0x34271b, "utf8"), _0xf75ccd = JSON.parse(_0x5e31f6);
                  if (_0xf75ccd.version && _0xf75ccd.version.trim() !== '') return _0xf75ccd.version.trim();
                }
                const _0x16c8e2 = ["./bot_settings.json", _0x52a19a.join(__dirname, "../../bot_settings.json")];
                for (const _0x318a9c of _0x16c8e2) {
                  if (_0x228e43.existsSync(_0x318a9c)) try {
                    const _0x191dd4 = _0x228e43.readFileSync(_0x318a9c, "utf8"), _0x4ba024 = JSON.parse(_0x191dd4);
                    if (_0x4ba024.version && _0x4ba024.version.trim() !== '') return _0x4ba024.version.trim();
                  } catch (_0x3c700a) {}
                }
              } catch (_0xbc1bd1) {}
              return "1.1.7";
            }, _0x5e892c = () => {
              if (process.env.HEROKU_APP_NAME || process.env.DYNO || process.env.HEROKU_API_KEY || process.env.PORT && process.env.PORT !== "3000" && process.env.PORT !== "8080") return {
                name: "Heroku",
                status: 'Active',
                icon: '🦸'
              }; else {
                if (process.env.RENDER_SERVICE_ID || process.env.RENDER_SERVICE_NAME || process.env.RENDER) return {
                  name: 'Render',
                  status: "Active",
                  icon: '⚡'
                }; else {
                  if (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_NAME || process.env.RAILWAY_SERVICE_NAME) return {
                    name: "Railway",
                    status: "Active",
                    icon: '🚂'
                  }; else {
                    if (process.env.REPL_ID || process.env.REPLIT_DB_URL || process.env.REPLIT_USER || process.env.REPL_SLUG) return {
                      name: "Replit",
                      status: "Active",
                      icon: '🌀'
                    }; else {
                      if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.VERCEL_URL) return {
                        name: 'Vercel',
                        status: "Active",
                        icon: '▲'
                      }; else {
                        if (process.env.GLITCH_PROJECT_REMIX || process.env.PROJECT_REMIX_CHAIN || process.env.GLITCH) return {
                          name: "Glitch",
                          status: "Active",
                          icon: '🎏'
                        }; else {
                          if (process.env.KOYEB_APP || process.env.KOYEB_REGION || process.env.KOYEB_SERVICE) return {
                            name: 'Koyeb',
                            status: "Active",
                            icon: '☁️'
                          }; else {
                            if (process.env.CYCLIC_URL || process.env.CYCLIC_APP_ID || process.env.CYCLIC_DB) return {
                              name: "Cyclic",
                              status: "Active",
                              icon: '🔄'
                            }; else {
                              if (process.env.PANEL || process.env.PTERODACTYL || process.env.NODE_ENV === "production" && (process.platform === "linux" && !process.env.SSH_CONNECTION)) return {
                                name: "Panel/VPS",
                                status: "Active",
                                icon: "🖥️"
                              }; else {
                                if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.platform === "linux" && process.env.USER === 'root') return {
                                  name: "VPS/SSH",
                                  status: "Active",
                                  icon: '🖥️'
                                }; else {
                                  if (process.platform === "win32") return {
                                    name: "Windows PC",
                                    status: "Active",
                                    icon: '💻'
                                  }; else {
                                    if (process.platform === 'darwin') return {
                                      name: "MacOS",
                                      status: "Active",
                                      icon: '🍎'
                                    }; else return process.platform === "linux" ? {
                                      name: 'Linux\x20Local',
                                      status: "Active",
                                      icon: '🐧'
                                    } : {
                                      name: "Local Machine",
                                      status: "Active",
                                      icon: '🏠'
                                    };
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }, _0x5b8374 = _0x441a58(), _0x30ddbe = _0x10a691(), _0x5a228e = _0x139e9d(), _0x1f5975 = _0x40af3b(), _0x38342f = getPlatformInfo();
            let _0x220bd9 = '';
            const _0x25e779 = getAllFieldsStatus(_0x3d523e);
            let _0xf78ac4 = false;
            _0x25e779 && typeof _0x25e779 === "object" ? _0xf78ac4 = Object.values(_0x25e779).some(_0x3ca895 => _0x3ca895) : _0xf78ac4 = true;
            if (_0xf78ac4) {
              const _0x2e8c01 = process.uptime(), _0xe6513b = Math.floor(_0x2e8c01 / 3600), _0x33a36c = Math.floor(_0x2e8c01 % 3600 / 60), _0x30732d = Math.floor(_0x2e8c01 % 60), _0x5921b7 = _0xe6513b + 'h\x20' + _0x33a36c + 'm\x20' + _0x30732d + 's', _0x21b5bc = process.memoryUsage(), _0x5e571c = _0x21b5bc.heapUsed / 1024 / 1024, _0x5bd731 = _0x21b5bc.heapTotal / 1024 / 1024, _0x3e6de3 = _0x5e571c.toFixed(1), _0x12ee9f = _0x5bd731.toFixed(1), _0x168340 = Math.round(_0x5e571c / _0x5bd731 * 100), _0x36bd5e = _0x168340, _0xffc6d3 = Math.round(_0x168340 / 100 * 10), _0x25828f = 10 - _0xffc6d3, _0x415e5c = ('█').repeat(_0xffc6d3) + ('░').repeat(_0x25828f), _0x18c806 = [];
              if (_0x25e779 && _0x25e779.user || !_0x25e779) _0x18c806.push('┆ ✦ User: ' + (_0x1713d7.pushName || "VIP User"));
              if (_0x25e779 && _0x25e779.owner || !_0x25e779) _0x18c806.push("┆ ✦ Owner: " + _0x5b8374);
              if (_0x25e779 && _0x25e779.mode || !_0x25e779) _0x18c806.push("┆ ✦ Mode: " + _0x1f5975);
              if (_0x25e779 && _0x25e779.prefix || !_0x25e779) _0x18c806.push("┆ ✦ Prefix: [ " + _0x30ddbe + ' ]');
              if (_0x25e779 && _0x25e779.version || !_0x25e779) _0x18c806.push("┆ ✦ Version: " + _0x5a228e);
              (_0x25e779 && _0x25e779.host || !_0x25e779) && _0x18c806.push("┆ ✦ Platform: " + _0x38342f.icon + ' ' + _0x38342f.name);
              (_0x25e779 && _0x25e779.timezone || !_0x25e779) && _0x18c806.push("┆ ✦ Timezone: " + getTimezoneFromPhone(_0x1713d7.key.participant || _0x1713d7.key.remoteJid || ''));
              if (_0x25e779 && _0x25e779.uptime || !_0x25e779) _0x18c806.push("┆ ✦ Uptime: " + _0x5921b7);
              if (_0x25e779 && _0x25e779.ram || !_0x25e779) _0x18c806.push("┆ ✦ RAM: " + _0x415e5c + ' ' + _0x36bd5e + '%');
              if (_0x25e779 && _0x25e779.usage || !_0x25e779) _0x18c806.push('┆ ✦ Memory: ' + _0x3e6de3 + 'MB / ' + _0x12ee9f + 'MB');
              _0x18c806.length > 0 && (_0x220bd9 = "╭┄〔 💎 `" + _0x28c41d + "` 〕┄╮\n" + _0x18c806.join('\n') + "\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n");
            } else _0x220bd9 = '*No\x20additional\x20information\x20is\x20enabled.*\x0a*Use\x20.togglemenuinfo\x20to\x20customize*\x0a\x0a';
            const _0x5d233e = ["┌──⌈ `GROUP MANAGEMENT` ⌋\n│ add\n│ promote\n│ promoteall\n│ demote\n│ demoteall\n│ kick\n│ kickall\n│ ban\n│ unban\n│ clearbanlist\n│ warn\n│ resetwarn\n│ setwarn\n│ warnings\n│ mute\n│ unmute\n│ gctime\n│ antilink\n│ addbadword\n│ removebadword\n│ listbadword\n│ welcome\n│ goodbye\n│ joinapproval\n│ onlyadmins\n│ leave\n│ creategroup\n└───────────────", "┌──⌈ `AUTO MODERATION` ⌋\n│ antisticker\n│ antiimage\n│ antivideo\n│ antiaudio\n│ antimention\n│ antistatusmention\n│ antigrouplink\n│ antidemote\n│ antipromote\n│ antibadword\n│ antigroupcall\n│ antispam\n└───────────────", "┌──⌈ `GROUP INFO & TOOLS` ⌋\n│ groupinfo\n│ grouplink\n│ tagadmin\n│ tagall\n│ hidetag\n│ link\n│ invite\n│ revoke\n│ setdesc\n│ fangtrace\n│ getgpp\n│ getdesc\n│ listadmins\n│ togstatus\n│ getparticipants\n│ listonline\n│ listinactive\n│ approveall\n│ rejectall\n│ disp\n└───────────────", '┌──⌈\x20`MENU\x20SETTINGS`\x20⌋\x0a│\x20menu\x0a│\x20menu2\x0a│\x20menustyle\x0a│\x20togglemenuinfo\x0a│\x20setmenuimage\x0a│\x20restoremenuimage\x0a└───────────────', "┌──⌈ `OWNER CONTROLS` ⌋\n│ setbotname\n│ resetbotname\n│ setowner\n│ resetowner\n│ setprefix\n│ prefix\n│ iamowner\n│ about\n│ owner\n│ block\n│ unblock\n│ blockdetect\n│ blockall\n│ unblockall\n│ silent\n│ anticall\n│ mode\n│ setpp\n│ setfooter\n│ repo\n│ pair\n│ antidelete\n│ antideletestatus\n│ antiedit\n│ chatbot\n│ shutdown\n│ broadcast\n└───────────────", "┌──⌈ `CHANNEL MODE` ⌋\n│ setchannel\n│ resetchannel\n└───────────────", "┌──⌈ `SYSTEM & MAINTENANCE` ⌋\n│ restart\n│ workingreload\n│ reloadenv\n│ getsettings\n│ setsetting\n│ test\n│ disk\n│ hostip\n│ findcommands\n│ latestupdates\n│ panel\n│ debugchat\n│ ls\n│ pwd\n│ cat\n│ head\n│ tail\n│ find\n│ grep\n│ stat\n│ du\n│ df\n│ ps\n│ envkeys\n│ exec\n│ package\n└───────────────", "┌──⌈ `CPANEL` ⌋\n│ setlink\n│ setkey\n│ nestconfig\n│ createuser\n│ createpanel\n│ createunlimited\n│ setpayment\n│ prompt\n│ cpanelmenu\n└───────────────", '┌──⌈\x20`SUDO`\x20⌋\x0a│\x20addsudo\x0a│\x20delsudo\x0a│\x20listsudo\x0a│\x20getsudo\x0a│\x20checksudo\x0a│\x20clearsudo\x0a│\x20sudomode\x0a│\x20sudoinfo\x0a│\x20mysudo\x0a│\x20sudodebug\x0a│\x20linksudo\x0a└───────────────', "┌──⌈ `AUTOMATION` ⌋\n│ autoread\n│ autotyping\n│ autorecording\n│ autorecordtyping\n│ autoreact\n│ autoreactstatus\n│ autoviewstatus\n│ autobio\n│ autorec\n│ reactowner\n└───────────────", '┌──⌈\x20`PRIVACY\x20CONTROLS`\x20⌋\x0a│\x20online\x0a│\x20privacy\x0a│\x20receipt\x0a│\x20profilepic\x0a│\x20viewer\x0a│\x20lastseen\x0a└───────────────', "┌──⌈ `GENERAL UTILITIES` ⌋\n│ alive\n│ ping\n│ ping2\n│ time\n│ uptime\n│ videocall\n│ voicecall\n│ define\n│ remind\n│ sessioninfo\n│ genmusic\n│ genlyrics\n│ musicprompt\n│ news\n│ covid\n│ weather\n│ wiki\n│ translate\n│ iplookup\n│ getip\n│ getpp\n│ getgpp\n│ getdesc\n│ listadmins\n│ prefixinfo\n│ platform\n│ onwhatsapp\n│ country\n└───────────────", '┌──⌈\x20`CONVERSION\x20&\x20MEDIA`\x20⌋\x0a│\x20shorturl\x0a│\x20url\x0a│\x20fetch\x0a│\x20qrencode\x0a│\x20take\x0a│\x20imgbb\x0a│\x20save\x0a│\x20rename\x0a│\x20screenshot\x0a│\x20inspect\x0a│\x20toimage\x0a│\x20tosticker\x0a│\x20toaudio\x0a│\x20tovoice\x0a│\x20tts\x0a│\x20trebleboost\x0a│\x20jarvis\x0a│\x20topdf\x0a│\x20extractpdf\x0a│\x20toword\x0a│\x20extractword\x0a│\x20toexcel\x0a│\x20extractexcel\x0a│\x20toppt\x0a│\x20extractppt\x0a└───────────────', "┌──⌈ `CONTACT TOOLS` ⌋\n│ vcf\n│ viewvcf\n│ vv\n│ vv2\n└───────────────", "┌──⌈ `MUSIC` ⌋\n│ play\n│ song\n│ video\n│ videodoc\n│ lyrics\n│ shazam\n│ spotify\n└───────────────", '┌──⌈\x20`MEDIA\x20DOWNLOADS`\x20⌋\x0a│\x20tiktok\x0a│\x20instagram\x0a│\x20facebook\x0a│\x20snapchat\x0a│\x20apk\x0a│\x20yts\x0a│\x20ytplay\x0a│\x20ytmp3\x0a│\x20ytv\x0a│\x20ytmp4\x0a│\x20ytvdoc\x0a│\x20videodl\x0a│\x20playlist\x0a│\x20xvideos\x0a│\x20xnxx\x0a│\x20mediafire\x0a│\x20downloadurl\x0a└───────────────', '┌──⌈\x20`AI\x20COMMANDS`\x20⌋\x0a│\x20gpt\x0a│\x20chatgpt\x0a│\x20gemini\x0a│\x20cohere\x0a│\x20copilot\x0a│\x20bing\x0a│\x20bard\x0a│\x20claudeai\x0a│\x20grok\x0a│\x20groq\x0a│\x20blackbox\x0a│\x20mistral\x0a│\x20metai\x0a│\x20perplexity\x0a│\x20qwenai\x0a│\x20ilama\x0a│\x20venice\x0a│\x20wormgpt\x0a│\x20deepseek\x0a│\x20chatbot\x0a├─\x20Open\x20Source\x20AI\x20─\x0a│\x20falcon\x0a│\x20wizard\x0a│\x20vicuna\x0a│\x20zephyr\x0a│\x20mixtral\x0a│\x20dolphin\x0a│\x20phi\x0a│\x20nous\x0a│\x20openchat\x0a│\x20orca\x0a│\x20codellama\x0a│\x20solar\x0a│\x20starcoder\x0a│\x20yi\x0a│\x20internlm\x0a│\x20chatglm\x0a│\x20nemotron\x0a│\x20neural\x0a│\x20openhermes\x0a│\x20command\x0a│\x20tinyllama\x0a│\x20replitai\x0a└───────────────', "┌──⌈ `AI GENERATION` ⌋\n│ imagine\n│ imagegen\n│ flux\n│ analyze\n│ suno\n│ speechwriter\n│ humanizer\n│ summarize\n│ totext\n│ removebg\n│ enlarger\n│ erase\n│ vision\n│ visionpro\n└───────────────", "┌──⌈ `AI TOOLS` ⌋\n│ videogen\n│ aiscanner\n│ aimenu\n│ brandlogo\n│ companylogo\n│ logoai\n└───────────────", "┌──⌈ `AI VIDEO EFFECTS` ⌋\n│ tigervideo\n│ introvideo\n│ lightningpubg\n│ lovevideo\n│ videogen\n└───────────────", "┌──⌈ `IMAGE TOOLS` ⌋\n│ image\n│ imagegen\n│ imagine\n│ anime\n│ art\n│ real\n│ remini\n│ vision\n│ visionpro\n└───────────────", "┌──⌈ `SPORTS` ⌋\n│ football\n│ matchstats\n│ sportsnews\n│ teamnews\n│ basketball\n│ cricket\n│ f1\n│ nfl\n│ mma\n│ tennis\n│ baseball\n│ hockey\n│ golf\n│ sportsmenu\n└───────────────", '┌──⌈\x20`ETHICAL\x20HACKING`\x20⌋\x0a│\x20whois\x0a│\x20dnslookup\x0a│\x20subdomain\x0a│\x20reverseip\x0a│\x20geoip\x0a│\x20portscan\x0a│\x20headers\x0a│\x20traceroute\x0a│\x20asnlookup\x0a│\x20shodan\x0a│\x20pinghost\x0a│\x20latency\x0a│\x20sslcheck\x0a│\x20tlsinfo\x0a│\x20openports\x0a│\x20firewallcheck\x0a│\x20maclookup\x0a│\x20bandwidthtest\x0a│\x20securityheaders\x0a│\x20wafdetect\x0a│\x20robotscheck\x0a│\x20sitemap\x0a│\x20cmsdetect\x0a│\x20techstack\x0a│\x20cookiescan\x0a│\x20redirectcheck\x0a│\x20xsscheck\x0a│\x20sqlicheck\x0a│\x20csrfcheck\x0a│\x20clickjackcheck\x0a│\x20directoryscan\x0a│\x20exposedfiles\x0a│\x20misconfigcheck\x0a│\x20cvecheck\x0a│\x20hashidentify\x0a│\x20hashcheck\x0a│\x20bcryptcheck\x0a│\x20passwordstrength\x0a│\x20leakcheck\x0a│\x20metadata\x0a│\x20filehash\x0a│\x20malwarecheck\x0a│\x20urlscan\x0a│\x20phishcheck\x0a│\x20nmap\x0a│\x20ipinfo\x0a│\x20nglattack\x0a│\x20securitymenu\x0a└───────────────', "┌──⌈ `LOGO DESIGN STUDIO` ⌋\n│ goldlogo\n│ silverlogo\n│ platinumlogo\n│ chromelogo\n│ diamondlogo\n│ bronzelogo\n│ steellogo\n│ copperlogo\n│ titaniumlogo\n│ firelogo\n│ icelogo\n│ iceglowlogo\n│ lightninglogo\n│ aqualogo\n│ rainbowlogo\n│ sunlogo\n│ moonlogo\n│ dragonlogo\n│ phoenixlogo\n│ wizardlogo\n│ crystallogo\n│ darkmagiclogo\n│ shadowlogo\n│ smokelogo\n│ bloodlogo\n│ neonlogo\n│ glowlogo\n│ gradientlogo\n│ matrixlogo\n└───────────────", '┌──⌈\x20`GITHUB\x20TOOLS`\x20⌋\x0a│\x20gitclone\x0a│\x20repanalyze\x0a│\x20zip\x0a│\x20update\x0a│\x20repo\x0a└───────────────', "┌──⌈ `ANIME REACTIONS` ⌋\n│ animemenu\n│ awoo\n│ bully\n│ cringe\n│ cry\n│ cuddle\n│ dance\n│ glomp\n│ highfive\n│ hug\n│ kill\n│ kiss\n│ lick\n│ megumin\n│ neko\n│ pat\n│ shinobu\n│ trap\n│ trap2\n│ waifu\n│ wink\n│ yeet\n└───────────────", "┌──⌈ `GAMES` ⌋\n│ wordle\n│ hangman\n│ numberguess\n│ memory\n│ slots\n│ blackjack\n│ trivia\n│ chess\n│ snake\n│ quiz\n│ tictactoe\n│ emojimix\n│ truth\n│ dare\n│ truthdetector\n│ joke\n│ quote\n└───────────────", "┌──⌈ `FUN & TOOLS` ⌋\n│ bf\n│ gf\n│ couple\n│ gay\n│ getjid\n│ device\n│ movie\n│ trailer\n│ readsite\n│ goodmorning\n│ goodnight\n│ channelstatus\n│ hack\n└───────────────", "┌──⌈ `ECONOMY` ⌋\n│ balance\n│ daily\n│ work\n│ deposit\n│ withdraw\n│ pay\n│ rob\n│ gamble\n│ leaderboard\n│ profile\n│ economymenu\n└───────────────", "┌──⌈ `QUICK COMMANDS` ⌋\n│ p\n│ up\n└───────────────", "┌──⌈ `EPHOTO TEXT EFFECTS` ⌋\n│ neon\n│ colorfulglow\n│ advancedglow\n│ neononline\n│ blueneon\n│ neontext\n│ neonlight\n│ greenneon\n│ greenlightneon\n│ blueneonlogo\n│ galaxyneon\n│ retroneon\n│ multicolorneon\n│ hackerneon\n│ devilwings\n│ glowtext\n│ blackpinkneon\n│ neonglitch\n│ colorfulneonlight\n│ wooden3d\n│ cubic3d\n│ wooden3donline\n│ water3d\n│ cuongthi3d\n│ text3d\n│ graffiti3d\n│ silver3d\n│ style3d\n│ metal3d\n│ ruby3d\n│ birthday3d\n│ metallogo3d\n│ pig3d\n│ avengers3d\n│ hologram3d\n│ gradient3d\n│ stone3d\n│ space3d\n│ sand3d\n│ gradienttext3d\n│ lightbulb3d\n│ snow3d\n│ papercut3d\n│ underwater3d\n│ shinymetallic3d\n│ gradientstyle3d\n│ beach3d\n│ crack3d\n│ wood3d\n│ americanflag3d\n│ christmas3d\n│ nigeriaflag3d\n│ christmassnow3d\n│ goldenchristmas3d\n│ decorativemetal3d\n│ colorfulpaint3d\n│ glossysilver3d\n│ balloon3d\n│ comic3d\n│ ephotomenu\n└───────────────", '' + getFooter(_0x1713d7.key.participant || _0x1713d7.key.remoteJid)], _0x2c1872 = Array.from({
              length: 550
            }, (_0x2d9442, _0xdba8a4) => ['‎', '‏', '​', '‌', '‍', '⁠', '\ufeff'][_0xdba8a4 % 7]).join(''), _0x2a7957 = _0x5d233e.join('\x0a' + _0x2c1872 + '\x0a');
            _0x449607 = '' + _0x220bd9 + _0x2c1872 + '\x0a' + _0x2a7957;
            const _0x4ba42c = await getMenuMedia();
            if (!_0x4ba42c) {
              await _0x3e4b45.sendMessage(_0x37f239, {
                text: '⚠️\x20Menu\x20media\x20not\x20found!'
              }, {
                quoted: _0x1713d7
              });
              return;
            }
            if (_0x31f58d) {
              const _0x2dd729 = [{
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: "Open Repository",
                  url: REPO_URL,
                  merchant_url: REPO_URL
                })
              }, {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: "Deploy with nodeX",
                  url: "https://nodex.wolvarex.com",
                  merchant_url: "https://nodex.wolvarex.com"
                })
              }], {sendInteractiveWithImage: _0x30ee15} = await import("../../lib/buttonHelper.js");
              await _0x30ee15(_0x3e4b45, _0x37f239, {
                bodyText: _0x449607,
                footerText: '',
                buttons: _0x2dd729,
                imageBuffer: _0x4ba42c.type === "image" ? _0x4ba42c.buffer : null,
                videoBuffer: _0x4ba42c.type === "gif" && _0x4ba42c.mp4Buffer ? _0x4ba42c.mp4Buffer : null
              });
            } else _0x4ba42c.type === "gif" && _0x4ba42c.mp4Buffer ? await _0x3e4b45.sendMessage(_0x37f239, {
              video: _0x4ba42c.mp4Buffer,
              gifPlayback: true,
              caption: _0x449607,
              mimetype: "video/mp4"
            }, {
              quoted: _0x1713d7
            }) : await _0x3e4b45.sendMessage(_0x37f239, {
              image: _0x4ba42c.buffer,
              caption: _0x449607,
              mimetype: "image/jpeg"
            }, {
              quoted: _0x1713d7
            });
            console.log('✅\x20' + _0x28c41d + " menu sent with \"Read more\" effect");
            break;
          }
      }
      console.log("\u001b[32m✅ Menu sent\u001b[0m");
    } catch (_0x1ea4f4) {
      if (_0x1ea4f4?.code === "ENOSPC") throw _0x1ea4f4;
      console.error("❌ [MENU] ERROR:", _0x1ea4f4);
      try {
        await _0x3e4b45.sendMessage(_0x37f239, {
          text: '⚠\x20Failed\x20to\x20load\x20menu.'
        }, {
          quoted: _0x1713d7
        });
      } catch {}
    }
  }
};
