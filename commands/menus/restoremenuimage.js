import _0x51f6ca from 'fs';
import _0x1c6549 from 'path';
import {fileURLToPath} from 'url';
import {invalidateMenuImageCache} from './menu.js';
import {invalidateMenuHelperCache} from '../../lib/menuHelper.js';
import {GROUP} from '../../lib/emojis.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x1c6549.dirname(__filename);
export default {
  name: 'restoremenuimage',
  aliases: ["restoreimg", "resetmenuimage", 'resetmenuimg', "menuimgreset", "rmi"],
  description: "Restore default menu image or from backup",
  async execute(_0x372c06, _0x2c5e44, _0x841bcb) {
    const _0x5451f4 = _0x2c5e44.key.remoteJid, _0x35b962 = _0x2c5e44.sender === global.owner || _0x2c5e44.sender === process.env.OWNER_NUMBER;
    if (!_0x35b962) {
      await _0x372c06.sendMessage(_0x5451f4, {
        text: GROUP.ERROR + " Owner only!"
      }, {
        quoted: _0x2c5e44
      });
      return;
    }
    const _0x3626f0 = _0x1c6549.join(process.cwd(), "data"), _0x446571 = _0x1c6549.join(_0x3626f0, "vipbot_menu_custom.jpg"), _0x41a13a = _0x1c6549.join(_0x3626f0, "vipbot_menu_custom.gif"), _0xlegJpg = _0x1c6549.join(_0x3626f0, "wolfbot_menu_custom.jpg"), _0xlegGif = _0x1c6549.join(_0x3626f0, "wolfbot_menu_custom.gif"), _0x14466c = _0x1c6549.join(_0x3626f0, "menu_backups"), _0xvipDef = _0x1c6549.join(__dirname, 'media', "vipbot.jpg"), _0x274763 = _0x51f6ca.existsSync(_0xvipDef) ? _0xvipDef : _0x1c6549.join(__dirname, 'media', "wolfbot.jpg");
    try {
      if (_0x841bcb.length === 0) {
        const _0x3c3ac3 = _0x51f6ca.existsSync(_0x446571) || _0x51f6ca.existsSync(_0x41a13a) || _0x51f6ca.existsSync(_0xlegJpg) || _0x51f6ca.existsSync(_0xlegGif);
        if (!_0x3c3ac3) {
          const _0x2ca29f = _0x51f6ca.existsSync(_0x274763) ? _0x51f6ca.readFileSync(_0x274763) : null;
          _0x2ca29f ? await _0x372c06.sendMessage(_0x5451f4, {
            image: _0x2ca29f,
            caption: GROUP.INFO + '\x20*Already\x20on\x20default\x20image.*\x0a\x0aUse\x20' + global.prefix + "menu to see it."
          }, {
            quoted: _0x2c5e44
          }) : await _0x372c06.sendMessage(_0x5451f4, {
            text: GROUP.INFO + " Already on default image."
          }, {
            quoted: _0x2c5e44
          });
          return;
        }
        await _0x372c06.sendMessage(_0x5451f4, {
          react: {
            text: GROUP.LOADING,
            key: _0x2c5e44.key
          }
        });
        if (!_0x51f6ca.existsSync(_0x14466c)) _0x51f6ca.mkdirSync(_0x14466c, {
          recursive: true
        });
        const _0x2e1eb8 = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        if (_0x51f6ca.existsSync(_0x41a13a)) {
          try {
            _0x51f6ca.copyFileSync(_0x41a13a, _0x1c6549.join(_0x14466c, 'vipbot-backup-' + _0x2e1eb8 + ".gif"));
          } catch {}
          try {
            _0x51f6ca.unlinkSync(_0x41a13a);
          } catch {}
        }
        if (_0x51f6ca.existsSync(_0x446571)) {
          try {
            _0x51f6ca.copyFileSync(_0x446571, _0x1c6549.join(_0x14466c, "vipbot-backup-" + _0x2e1eb8 + ".jpg"));
          } catch {}
          try {
            _0x51f6ca.unlinkSync(_0x446571);
          } catch {}
        }
        if (_0x51f6ca.existsSync(_0xlegGif)) { try { _0x51f6ca.unlinkSync(_0xlegGif); } catch {} }
        if (_0x51f6ca.existsSync(_0xlegJpg)) { try { _0x51f6ca.unlinkSync(_0xlegJpg); } catch {} }
        try {
          const _0x4c8d3f = _0x1c6549.join(_0x3626f0, "menuimage.json");
          if (_0x51f6ca.existsSync(_0x4c8d3f)) _0x51f6ca.unlinkSync(_0x4c8d3f);
        } catch {}
        try {
          invalidateMenuImageCache();
        } catch {}
        try {
          invalidateMenuHelperCache();
        } catch {}
        (console.log(GROUP.SUCCESS + '\x20Custom\x20menu\x20image\x20removed\x20—\x20falling\x20back\x20to\x20default'), await _0x372c06.sendMessage(_0x5451f4, {
          react: {
            text: GROUP.SUCCESS,
            key: _0x2c5e44.key
          }
        }));
        const _0x415abf = _0x51f6ca.existsSync(_0x274763) ? _0x51f6ca.readFileSync(_0x274763) : null;
        _0x415abf ? await _0x372c06.sendMessage(_0x5451f4, {
          image: _0x415abf,
          caption: GROUP.SUCCESS + '\x20*Restored\x20Successfully!*\x0a\x0aMenu\x20image\x20is\x20back\x20to\x20default.\x0aUse\x20' + global.prefix + "menu to see it."
        }, {
          quoted: _0x2c5e44
        }) : await _0x372c06.sendMessage(_0x5451f4, {
          text: GROUP.SUCCESS + " *Restored Successfully!*\n\nMenu image is back to default.\nUse " + global.prefix + "menu to see it."
        }, {
          quoted: _0x2c5e44
        });
        return;
      }
      if (_0x841bcb[0] === "list" || _0x841bcb[0] === 'backups') {
        if (!_0x51f6ca.existsSync(_0x14466c)) {
          await _0x372c06.sendMessage(_0x5451f4, {
            text: GROUP.ERROR + " No backups found!"
          }, {
            quoted: _0x2c5e44
          });
          return;
        }
        const _0xa2d5f1 = _0x51f6ca.readdirSync(_0x14466c).filter(_0x4adaa8 => (_0x4adaa8.startsWith('vipbot-backup-') || _0x4adaa8.startsWith('wolfbot-backup-')) && (_0x4adaa8.endsWith(".jpg") || _0x4adaa8.endsWith('.png') || _0x4adaa8.endsWith(".webp") || _0x4adaa8.endsWith('.gif'))).sort().reverse().slice(0, 10);
        if (_0xa2d5f1.length === 0) {
          await _0x372c06.sendMessage(_0x5451f4, {
            text: GROUP.FOLDER + '\x20No\x20backups\x20found!'
          }, {
            quoted: _0x2c5e44
          });
          return;
        }
        let _0x119003 = GROUP.FOLDER + " *Backups* (" + _0xa2d5f1.length + ")\n\n";
        (_0xa2d5f1.forEach((_0xa2e307, _0x1f4fb2) => {
          const _0x2268f8 = _0x1c6549.join(_0x14466c, _0xa2e307), _0x3f3c97 = _0x51f6ca.statSync(_0x2268f8), _0xb1e73c = (_0x3f3c97.size / 1024 / 1024).toFixed(2), _0x286eae = _0xa2e307.endsWith(".gif");
          (_0x119003 += _0x1f4fb2 + 1 + '.\x20' + (_0x286eae ? GROUP.VIDEO : GROUP.IMAGE) + '\x20' + _0xa2e307 + '\x0a', _0x119003 += "   " + GROUP.CHART + '\x20' + _0xb1e73c + 'MB\x0a\x0a');
        }), _0x119003 += GROUP.IDEA + '\x20' + global.prefix + "restoremenuimage <number>", await _0x372c06.sendMessage(_0x5451f4, {
          text: _0x119003
        }, {
          quoted: _0x2c5e44
        }));
        return;
      }
      const _0x4eed32 = parseInt(_0x841bcb[0]) - 1;
      if (!_0x51f6ca.existsSync(_0x14466c)) {
        await _0x372c06.sendMessage(_0x5451f4, {
          text: GROUP.ERROR + '\x20No\x20backups\x20found!'
        }, {
          quoted: _0x2c5e44
        });
        return;
      }
      const _0x3b8f8a = _0x51f6ca.readdirSync(_0x14466c).filter(_0x4a677b => (_0x4a677b.startsWith("vipbot-backup-") || _0x4a677b.startsWith("wolfbot-backup-")) && (_0x4a677b.endsWith(".jpg") || _0x4a677b.endsWith(".png") || _0x4a677b.endsWith(".webp") || _0x4a677b.endsWith(".gif"))).sort().reverse();
      if (_0x3b8f8a.length === 0) {
        await _0x372c06.sendMessage(_0x5451f4, {
          text: GROUP.ERROR + '\x20No\x20backups\x20found!'
        }, {
          quoted: _0x2c5e44
        });
        return;
      }
      if (isNaN(_0x4eed32) || _0x4eed32 < 0 || _0x4eed32 >= _0x3b8f8a.length) {
        await _0x372c06.sendMessage(_0x5451f4, {
          text: GROUP.ERROR + " Invalid! Use 1-" + _0x3b8f8a.length
        }, {
          quoted: _0x2c5e44
        });
        return;
      }
      const _0x46ebb0 = _0x3b8f8a[_0x4eed32], _0x199c2c = _0x1c6549.join(_0x14466c, _0x46ebb0), _0x5e4000 = _0x46ebb0.endsWith(".gif");
      await _0x372c06.sendMessage(_0x5451f4, {
        react: {
          text: GROUP.LOADING,
          key: _0x2c5e44.key
        }
      });
      if (_0x5e4000) {
        try {
          if (_0x51f6ca.existsSync(_0x446571)) _0x51f6ca.unlinkSync(_0x446571);
        } catch {}
        _0x51f6ca.copyFileSync(_0x199c2c, _0x41a13a);
      } else {
        try {
          if (_0x51f6ca.existsSync(_0x41a13a)) _0x51f6ca.unlinkSync(_0x41a13a);
        } catch {}
        _0x51f6ca.copyFileSync(_0x199c2c, _0x446571);
      }
      try {
        invalidateMenuImageCache();
      } catch {}
      try {
        invalidateMenuHelperCache();
      } catch {}
      (console.log(GROUP.SUCCESS + " Menu " + (_0x5e4000 ? "GIF" : "image") + " restored from backup: " + _0x46ebb0), await _0x372c06.sendMessage(_0x5451f4, {
        react: {
          text: GROUP.SUCCESS,
          key: _0x2c5e44.key
        }
      }), await _0x372c06.sendMessage(_0x5451f4, {
        text: GROUP.SUCCESS + " *Restored Successfully!*\n\nBackup #" + (_0x4eed32 + 1) + '\x20is\x20now\x20active.\x0aUse\x20' + global.prefix + "menu to see it."
      }, {
        quoted: _0x2c5e44
      }));
    } catch (_0x1de1b1) {
      (console.error(GROUP.ERROR + " [RESTOREMENUIMAGE] ERROR:", _0x1de1b1), await _0x372c06.sendMessage(_0x5451f4, {
        react: {
          text: GROUP.ERROR,
          key: _0x2c5e44.key
        }
      }), await _0x372c06.sendMessage(_0x5451f4, {
        text: GROUP.ERROR + " Restore failed"
      }, {
        quoted: _0x2c5e44
      }));
    }
  }
};
