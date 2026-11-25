import _0x2011a3 from 'fs';
import _0x267396 from 'path';
import {fileURLToPath} from 'url';
import _0x14f9b5 from 'axios';
import {downloadContentFromMessage} from 'wolfsocket';
import {execFileSync} from 'child_process';
import _0x3b5464 from '../../lib/ffmpegPath.js';
import {invalidateMenuImageCache} from './menu.js';
import {invalidateMenuHelperCache} from '../../lib/menuHelper.js';
import {GROUP} from '../../lib/emojis.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x267396.dirname(__filename);
export default {
  name: "setmenuimage",
  alias: ["smi", 'mi'],
  description: "Set menu image from reply, image, profile pic, or URL",
  category: "owner",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x3efea7, _0xcc755a, _0x276aa1, _0x131b47, _0x5d608f) {
    const _0x250941 = _0xcc755a.key.remoteJid, {jidManager: _0x4b3ce8} = _0x5d608f, _0x2558f3 = _0x4b3ce8.isOwner(_0xcc755a) || _0x5d608f?.isSudo?.(), _0x3c40e8 = _0xcc755a.key.fromMe, _0x204324 = _0xcc755a.key.participant || _0x250941, _0x54758d = _0x4b3ce8.cleanJid(_0x204324);
    if (!_0x2558f3) {
      let _0x157a09 = GROUP.ERROR + " *Owner Only Command!*\n\n";
      (_0x157a09 += "Only the bot owner can set menu image.\n\n", _0x157a09 += GROUP.SEARCH + " *Debug Info:*\n", _0x157a09 += "┆ ✦ Your JID: " + _0x54758d.cleanJid + '\n', _0x157a09 += "┆ ✦ Your Number: " + (_0x54758d.cleanNumber || "N/A") + '\n', _0x157a09 += '┆ ✦ Type: ' + (_0x54758d.isLid ? 'LID ' + GROUP.LINK : "Regular " + GROUP.PHONE) + '\n', _0x157a09 += "┆ ✦ From Me: " + (_0x3c40e8 ? GROUP.SUCCESS + " YES" : GROUP.ERROR + " NO") + '\n');
      const _0x4581b2 = _0x4b3ce8.getOwnerInfo ? _0x4b3ce8.getOwnerInfo() : {};
      _0x157a09 += "╰┄ Owner Number: " + (_0x4581b2.cleanNumber || "Not set") + '\n\n';
      if (_0x54758d.isLid && _0x3c40e8) (_0x157a09 += GROUP.WARNING + '\x20*Issue\x20Detected:*\x0a', _0x157a09 += 'You\x27re\x20using\x20a\x20linked\x20device\x20(LID).\x0a', _0x157a09 += 'Try\x20using\x20`' + _0x131b47 + "fixowner` or `" + _0x131b47 + "forceownerlid`\n"); else !_0x4581b2.cleanNumber && (_0x157a09 += GROUP.WARNING + " *Issue Detected:*\n", _0x157a09 += 'Owner\x20not\x20set\x20in\x20jidManager!\x0a', _0x157a09 += "Try using `" + _0x131b47 + 'debugchat\x20fix`\x0a');
      return _0x3efea7.sendMessage(_0x250941, {
        text: _0x157a09
      }, {
        quoted: _0xcc755a
      });
    }
    const _0x19293b = _0xcc755a.message?.extendedTextMessage?.contextInfo || _0xcc755a.message?.imageMessage?.contextInfo || _0xcc755a.message?.videoMessage?.contextInfo, _0x494b34 = _0x19293b?.quotedMessage;
    let _0x3a2fc7 = _0x494b34?.imageMessage || _0x494b34?.viewOnceMessage?.message?.imageMessage || _0x494b34?.viewOnceMessageV2?.message?.imageMessage, _0x122714 = _0x494b34?.videoMessage;
    const _0x1fcdff = _0xcc755a.message?.imageMessage, _0x37e666 = _0xcc755a.message?.videoMessage, _0x2c6046 = _0x122714 && _0x122714.gifPlayback === true, _0x2fff21 = _0x37e666 && _0x37e666.gifPlayback === true, _0x3457a3 = _0xcc755a.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0], _0x312d17 = _0x19293b?.participant, _0x4aa37c = _0x3457a3 || _0x312d17, _0x577ccc = !!_0x3a2fc7, _0x3fdf17 = !!_0x2c6046, _0xf4248c = !!_0x1fcdff, _0x1580e6 = !!_0x2fff21, _0x5abd8a = _0x276aa1.length > 0 && _0x276aa1[0].startsWith("http"), _0x352a11 = !!_0x4aa37c && !_0x577ccc && !_0x3fdf17;
    if (!_0x577ccc && !_0xf4248c && !_0x5abd8a && !_0x352a11 && !_0x3fdf17 && !_0x1580e6) {
      await _0x3efea7.sendMessage(_0x250941, {
        text: GROUP.IMAGE + '\x20*Set\x20Menu\x20Image*\x0a\x0aUsage:\x0a•\x20Reply\x20to\x20an\x20image:\x20`' + _0x131b47 + "smi`\n• Reply to a GIF: `" + _0x131b47 + 'smi`\x20(animated\x20menu!)\x0a•\x20Reply\x20to\x20a\x20person:\x20`' + _0x131b47 + "smi` (uses their profile pic)\n• Mention someone: `" + _0x131b47 + 'smi\x20@user`\x0a•\x20Send\x20with\x20image:\x20attach\x20image\x20with\x20caption\x20`' + _0x131b47 + "smi`\n• Use URL: `" + _0x131b47 + "smi <image_url>`\n\n" + GROUP.WARNING + '\x20Supports\x20JPG/PNG/WebP/GIF\x20(max\x2010MB)\x0a\x0a' + GROUP.CLIPBOARD + '\x20*Styles\x20that\x20use\x20this\x20image\x20(1–4):*\x0a•\x20Style\x201\x20—\x20Image\x20+\x20Faded\x0a•\x20Style\x203\x20—\x20Image\x20+\x20Read\x20More\x20+\x20Buttons\x0a•\x20Style\x204\x20—\x20Image\x20+\x20Text\x0a\x0a' + GROUP.IDEA + '\x20Use\x20`' + _0x131b47 + 'menustyle`\x20to\x20switch\x20styles.'
      }, {
        quoted: _0xcc755a
      });
      return;
    }
    await _0x3efea7.sendMessage(_0x250941, {
      react: {
        text: GROUP.LOADING,
        key: _0xcc755a.key
      }
    });
    try {
      let _0xc214dc, _0x493a28 = 'image/jpeg', _0x2e81cc = '', _0x5c42b0 = false;
      if (_0x1580e6) {
        (_0x2e81cc = 'attached\x20GIF', _0x5c42b0 = true, console.log(GROUP.VIDEO + '\x20Owner\x20' + _0x54758d.cleanNumber + '\x20setting\x20menu\x20GIF\x20from\x20' + _0x2e81cc));
        const _0x2a0328 = await downloadContentFromMessage(_0x37e666, 'video'), _0x1ec8f1 = [];
        for await (const _0x39e005 of _0x2a0328) {
          _0x1ec8f1.push(_0x39e005);
        }
        (_0xc214dc = Buffer.concat(_0x1ec8f1), _0x493a28 = "video/mp4");
      } else {
        if (_0x3fdf17) {
          (_0x2e81cc = "replied GIF", _0x5c42b0 = true, console.log(GROUP.VIDEO + " Owner " + _0x54758d.cleanNumber + '\x20setting\x20menu\x20GIF\x20from\x20' + _0x2e81cc));
          const _0x46c9e3 = await downloadContentFromMessage(_0x122714, 'video'), _0x4ce213 = [];
          for await (const _0x10fee8 of _0x46c9e3) {
            _0x4ce213.push(_0x10fee8);
          }
          (_0xc214dc = Buffer.concat(_0x4ce213), _0x493a28 = "video/mp4");
        } else {
          if (_0xf4248c) {
            (_0x2e81cc = "attached image", console.log(GROUP.IMAGE + " Owner " + _0x54758d.cleanNumber + '\x20setting\x20menu\x20image\x20from\x20' + _0x2e81cc));
            const _0x5369f5 = await downloadContentFromMessage(_0x1fcdff, 'image'), _0x163793 = [];
            for await (const _0x195a15 of _0x5369f5) {
              _0x163793.push(_0x195a15);
            }
            (_0xc214dc = Buffer.concat(_0x163793), _0x493a28 = _0x1fcdff.mimetype || "image/jpeg");
            if (_0x493a28.toLowerCase() === "image/gif") _0x5c42b0 = true;
          } else {
            if (_0x577ccc) {
              (_0x2e81cc = "replied image", console.log(GROUP.IMAGE + " Owner " + _0x54758d.cleanNumber + '\x20setting\x20menu\x20image\x20from\x20' + _0x2e81cc));
              const _0x32852a = await downloadContentFromMessage(_0x3a2fc7, "image"), _0x27c201 = [];
              for await (const _0x3e9ef7 of _0x32852a) {
                _0x27c201.push(_0x3e9ef7);
              }
              (_0xc214dc = Buffer.concat(_0x27c201), _0x493a28 = _0x3a2fc7.mimetype || "image/jpeg");
              if (_0x493a28.toLowerCase() === "image/gif") _0x5c42b0 = true;
            } else {
              if (_0x352a11) {
                const _0x2569d1 = _0x4b3ce8.cleanJid(_0x4aa37c);
                (_0x2e81cc = 'profile\x20pic\x20of\x20' + (_0x2569d1.cleanNumber || _0x4aa37c), console.log(GROUP.IMAGE + " Owner " + _0x54758d.cleanNumber + " setting menu image from " + _0x2e81cc));
                const _0x1770e1 = new Set();
                if (!_0x2569d1.isLid) {
                  _0x1770e1.add(_0x2569d1.cleanJid);
                  if (_0x2569d1.cleanNumber) _0x1770e1.add(_0x2569d1.cleanNumber + "@s.whatsapp.net");
                } else {
                  _0x1770e1.add(_0x4aa37c);
                  if (_0x2569d1.cleanNumber) _0x1770e1.add(_0x2569d1.cleanNumber + '@s.whatsapp.net');
                }
                _0x1770e1.add(_0x4aa37c);
                let _0x56cb2a;
                for (const _0x420607 of _0x1770e1) {
                  try {
                    (_0x56cb2a = await _0x3efea7.profilePictureUrl(_0x420607, "image"), console.log(GROUP.CAMERA + '\x20Got\x20DP\x20from\x20JID:\x20' + _0x420607));
                    break;
                  } catch {}
                }
                if (!_0x56cb2a) {
                  (await _0x3efea7.sendMessage(_0x250941, {
                    react: {
                      text: GROUP.ERROR,
                      key: _0xcc755a.key
                    }
                  }), await _0x3efea7.sendMessage(_0x250941, {
                    text: GROUP.ERROR + " *Could not fetch profile picture*\n\nThe user may have their profile picture hidden or doesn't have one set."
                  }, {
                    quoted: _0xcc755a
                  }));
                  return;
                }
                const _0x21e57b = await _0x14f9b5({
                  method: "GET",
                  url: _0x56cb2a,
                  responseType: "arraybuffer",
                  timeout: 15000,
                  headers: {
                    'User-Agent': 'Mozilla/5.0'
                  }
                });
                (_0xc214dc = Buffer.from(_0x21e57b.data), _0x493a28 = _0x21e57b.headers["content-type"] || "image/jpeg");
                if (_0x493a28.toLowerCase().split(';')[0].trim() === "image/gif") _0x5c42b0 = true;
              } else {
                let _0x1fb195 = _0x276aa1[0];
                _0x2e81cc = "URL";
                if (!_0x1fb195.startsWith("http")) {
                  (await _0x3efea7.sendMessage(_0x250941, {
                    react: {
                      text: GROUP.ERROR,
                      key: _0xcc755a.key
                    }
                  }), await _0x3efea7.sendMessage(_0x250941, {
                    text: GROUP.ERROR + " Invalid URL! Must start with http:// or https://"
                  }, {
                    quoted: _0xcc755a
                  }));
                  return;
                }
                try {
                  const _0x1fe823 = new URL(_0x1fb195), _0x560874 = ['utm_source', "utm_medium", "utm_campaign", "fbclid", "gclid", "msclkid"];
                  (_0x560874.forEach(_0x2bdef1 => _0x1fe823.searchParams.delete(_0x2bdef1)), _0x1fb195 = _0x1fe823.toString());
                } catch (_0x26f46e) {}
                console.log(GROUP.GLOBE + " Owner " + _0x54758d.cleanNumber + " setting menu image from: " + _0x1fb195);
                const _0x5d427e = await _0x14f9b5({
                  method: "GET",
                  url: _0x1fb195,
                  responseType: 'arraybuffer',
                  timeout: 25000,
                  maxContentLength: 15 * 1024 * 1024,
                  headers: {
                    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    Accept: "image/*,*/*;q=0.8",
                    'Accept-Encoding': 'gzip,\x20deflate,\x20br'
                  },
                  decompress: true,
                  maxRedirects: 5,
                  validateStatus: function (_0x17dccf) {
                    return _0x17dccf >= 200 && _0x17dccf < 400;
                  }
                });
                _0x493a28 = _0x5d427e.headers["content-type"] || "image/jpeg";
                if (!_0x493a28.startsWith("image/")) {
                  const _0x21b347 = _0x1fb195.toLowerCase(), _0x4c0bfb = _0x21b347.includes(".jpg") || _0x21b347.includes(".jpeg") || _0x21b347.includes(".png") || _0x21b347.includes('.webp') || _0x21b347.includes(".gif");
                  if (!_0x4c0bfb) {
                    (await _0x3efea7.sendMessage(_0x250941, {
                      react: {
                        text: GROUP.ERROR,
                        key: _0xcc755a.key
                      }
                    }), await _0x3efea7.sendMessage(_0x250941, {
                      text: GROUP.ERROR + " *Not a valid image URL*\n\nPlease provide a direct link to an image file."
                    }, {
                      quoted: _0xcc755a
                    }));
                    return;
                  }
                }
                _0xc214dc = Buffer.from(_0x5d427e.data);
              }
            }
          }
        }
      }
      const _0x5634d9 = (_0xc214dc.length / 1024 / 1024).toFixed(2);
      if (_0xc214dc.length > 10 * 1024 * 1024) {
        (await _0x3efea7.sendMessage(_0x250941, {
          react: {
            text: GROUP.ERROR,
            key: _0xcc755a.key
          }
        }), await _0x3efea7.sendMessage(_0x250941, {
          text: GROUP.ERROR + " *Image too large!* (" + _0x5634d9 + 'MB\x20>\x2010MB\x20limit)\x0a\x0aPlease\x20use\x20a\x20smaller\x20image.'
        }, {
          quoted: _0xcc755a
        }));
        return;
      }
      if (_0xc214dc.length < 2048) {
        (await _0x3efea7.sendMessage(_0x250941, {
          react: {
            text: GROUP.ERROR,
            key: _0xcc755a.key
          }
        }), await _0x3efea7.sendMessage(_0x250941, {
          text: GROUP.ERROR + " *Image too small or corrupted*\n\nImage file appears to be invalid."
        }, {
          quoted: _0xcc755a
        }));
        return;
      }
      console.log(GROUP.SUCCESS + " Media downloaded: " + _0x5634d9 + "MB, type: " + _0x493a28);
      const _0x16ea70 = _0x267396.join(process.cwd(), "data"), _0xf89b94 = _0x267396.join(_0x16ea70, "vipbot_menu_custom.jpg"), _0x2b370b = _0x267396.join(_0x16ea70, "vipbot_menu_custom.gif"), _0xlegJpg = _0x267396.join(_0x16ea70, "wolfbot_menu_custom.jpg"), _0xlegGif = _0x267396.join(_0x16ea70, "wolfbot_menu_custom.gif"), _0xf82af4 = _0x267396.join(_0x16ea70, "menu_backups");
      if (!_0x2011a3.existsSync(_0x16ea70)) _0x2011a3.mkdirSync(_0x16ea70, {
        recursive: true
      });
      if (!_0x2011a3.existsSync(_0xf82af4)) _0x2011a3.mkdirSync(_0xf82af4, {
        recursive: true
      });
      const _0x474762 = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      if (_0x5c42b0) {
        const _0x31acfd = _0x267396.join(process.cwd(), "tmp");
        if (!_0x2011a3.existsSync(_0x31acfd)) _0x2011a3.mkdirSync(_0x31acfd, {
          recursive: true
        });
        const _0x1d826a = "menuimg_" + Date.now(), _0x4f3a35 = _0x267396.join(_0x31acfd, _0x1d826a + ".mp4"), _0x18b02b = _0x267396.join(_0x31acfd, _0x1d826a + ".gif");
        _0x2011a3.writeFileSync(_0x4f3a35, _0xc214dc);
        try {
          execFileSync(_0x3b5464, ['-y', '-i', _0x4f3a35, "-vf", "fps=15,scale=480:-2:force_original_aspect_ratio=decrease:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer", "-loop", '0', _0x18b02b], {
            timeout: 30000,
            windowsHide: true,
            stdio: "ignore"
          });
          const _0x2beba0 = _0x2011a3.readFileSync(_0x18b02b);
          if (_0x2beba0.length < 10 || _0x2beba0.subarray(0, 3).toString('ascii') !== "GIF") throw new Error("FFmpeg did not produce a valid GIF");
          if (_0x2beba0.length > 10 * 1024 * 1024) throw new Error("Converted GIF exceeds the 10MB menu image limit");
          if (_0x2011a3.existsSync(_0x2b370b)) try {
            _0x2011a3.copyFileSync(_0x2b370b, _0x267396.join(_0xf82af4, "vipbot-backup-" + _0x474762 + ".gif"));
          } catch {}
          _0x2011a3.renameSync(_0x18b02b, _0x2b370b);
          if (_0x2011a3.existsSync(_0xf89b94)) _0x2011a3.unlinkSync(_0xf89b94);
          if (_0x2011a3.existsSync(_0xlegJpg)) try { _0x2011a3.unlinkSync(_0xlegJpg); } catch {}
          if (_0x2011a3.existsSync(_0xlegGif)) try { _0x2011a3.unlinkSync(_0xlegGif); } catch {}
          console.log(GROUP.SUCCESS + " Menu GIF converted and saved: " + _0x2b370b);
        } finally {
          try {
            _0x2011a3.unlinkSync(_0x4f3a35);
          } catch {}
          try {
            _0x2011a3.unlinkSync(_0x18b02b);
          } catch {}
        }
      } else {
        if (_0x2011a3.existsSync(_0xf89b94)) try {
          _0x2011a3.copyFileSync(_0xf89b94, _0x267396.join(_0xf82af4, 'vipbot-backup-' + _0x474762 + ".jpg"));
        } catch {}
        if (_0x2011a3.existsSync(_0x2b370b)) try {
          _0x2011a3.unlinkSync(_0x2b370b);
        } catch {}
        if (_0x2011a3.existsSync(_0xlegJpg)) try { _0x2011a3.unlinkSync(_0xlegJpg); } catch {}
        if (_0x2011a3.existsSync(_0xlegGif)) try { _0x2011a3.unlinkSync(_0xlegGif); } catch {}
        (_0x2011a3.writeFileSync(_0xf89b94, _0xc214dc), console.log(GROUP.SUCCESS + " Menu image saved: " + _0xf89b94));
      }
      const _0x58b2ae = _0x5c42b0 ? _0x2b370b : _0xf89b94, _0x5da860 = _0x2011a3.statSync(_0x58b2ae);
      if (_0x5da860.size === 0) throw new Error('Saved\x20file\x20is\x20empty');
      try {
        invalidateMenuImageCache();
      } catch {}
      try {
        invalidateMenuHelperCache();
      } catch {}
      try {
        const _0x4e0933 = _0x5abd8a ? _0x276aa1[0] : null, _0x552775 = _0x5abd8a ? 'URL' : _0x352a11 ? "Profile pic" : _0x2e81cc;
        _0x2011a3.writeFileSync(_0x267396.join(_0x16ea70, "menuimage.json"), JSON.stringify({
          source: _0x552775,
          url: _0x4e0933,
          updatedAt: new Date().toISOString()
        }, null, 2));
      } catch {}
      (await _0x3efea7.sendMessage(_0x250941, {
        react: {
          text: GROUP.SUCCESS,
          key: _0xcc755a.key
        }
      }), await _0x3efea7.sendMessage(_0x250941, {
        text: GROUP.SUCCESS + " *Menu Image Set Successfully!*\n\nSource: " + _0x2e81cc + "\nUse " + _0x131b47 + 'menu\x20to\x20see\x20it.'
      }, {
        quoted: _0xcc755a
      }), console.log(GROUP.SUCCESS + " Menu image updated successfully by owner " + _0x54758d.cleanNumber));
    } catch (_0x16b334) {
      (console.error(GROUP.ERROR + '\x20[SETMENUIMAGE]\x20ERROR:', _0x16b334), await _0x3efea7.sendMessage(_0x250941, {
        react: {
          text: GROUP.ERROR,
          key: _0xcc755a.key
        }
      }));
      let _0x3ea19c = GROUP.ERROR + '\x20*Failed\x20to\x20set\x20menu\x20image*\x0a\x0a';
      if (_0x16b334.code === "ENOTFOUND") _0x3ea19c += "• Domain not found"; else {
        if (_0x16b334.code === "ETIMEDOUT") _0x3ea19c += "• Download timeout (25s)"; else {
          if (_0x16b334.response?.status === 404) _0x3ea19c += "• Image not found (404)"; else {
            if (_0x16b334.response?.status === 403) _0x3ea19c += '•\x20Access\x20denied\x20(403)'; else {
              if (_0x16b334.message.includes('ENOENT')) _0x3ea19c += "• Could not save image file"; else _0x16b334.message.includes("ECONNREFUSED") ? _0x3ea19c += "• Connection refused" : _0x3ea19c += '•\x20' + _0x16b334.message;
            }
          }
        }
      }
      (_0x3ea19c += "\n\nPlease try again.", await _0x3efea7.sendMessage(_0x250941, {
        text: _0x3ea19c
      }, {
        quoted: _0xcc755a
      }));
    }
  }
};
