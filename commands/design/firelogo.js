import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {createCanvas, registerFont} from '../../lib/canvasWrapper.js';
import _0x30e17c from 'axios';
import {addWatermark} from '../../lib/logo-watermark.js';
export default {
  name: "firelogo",
  description: "Create fire/flame style text logos",
  async execute(_0x29b49f, _0x5f4fbf, _0x1e5c9f) {
    const _0x103cfd = _0x5f4fbf.key.remoteJid;
    try {
      if (!_0x1e5c9f.length) {
        await _0x29b49f.sendMessage(_0x103cfd, {
          text: DESIGN.FIRE + " *Fire Logo*\nUsage: " + global.prefix + "firelogo <text>\nExample:\n" + global.prefix + "firelogo WOLF"
        }, {
          quoted: _0x5f4fbf
        });
        return;
      }
      const _0x2a8c62 = _0x1e5c9f.join('\x20');
      if (_0x2a8c62.length > 15) {
        await _0x29b49f.sendMessage(_0x103cfd, {
          text: STATUS.ERROR + " Text too long! Maximum 15 characters.\nYour text: \"" + _0x2a8c62 + "\" (" + _0x2a8c62.length + " chars)"
        }, {
          quoted: _0x5f4fbf
        });
        return;
      }
      await _0x29b49f.sendMessage(_0x103cfd, {
        react: {
          text: STATUS.LOADING,
          key: _0x5f4fbf.key
        }
      });
      const _0x567d47 = await generateFireLogo(_0x2a8c62);
      (await _0x29b49f.sendMessage(_0x103cfd, {
        image: _0x567d47,
        caption: DESIGN.FIRE + " *Fire Logo Generated!*\nText: " + _0x2a8c62 + '\x0a\x0a_Created\x20by\x20' + getBotName() + '_'
      }, {
        quoted: _0x5f4fbf
      }), await _0x29b49f.sendMessage(_0x103cfd, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x5f4fbf.key
        }
      }));
    } catch (_0x1add48) {
      (console.error(STATUS.ERROR + '\x20[FIRELOGO]\x20ERROR:', _0x1add48), await _0x29b49f.sendMessage(_0x103cfd, {
        react: {
          text: STATUS.ERROR,
          key: _0x5f4fbf.key
        }
      }).catch(() => {}), await _0x29b49f.sendMessage(_0x103cfd, {
        text: STATUS.ERROR + " Error creating fire logo: " + _0x1add48.message + '\x0aTry\x20again\x20with\x20shorter\x20text.'
      }, {
        quoted: _0x5f4fbf
      }));
    }
  }
};
async function generateFireLogo(_0x3892ff) {
  const _0x33fb14 = 800, _0xe67ab4 = 400, _0x449fbf = createCanvas(_0x33fb14, _0xe67ab4), _0xe9d3e9 = _0x449fbf.getContext('2d'), _0xccec25 = _0xe9d3e9.createLinearGradient(0, 0, 0, _0xe67ab4);
  (_0xccec25.addColorStop(0, "#0a0a0a"), _0xccec25.addColorStop(0.4, "#8B0000"), _0xccec25.addColorStop(0.7, "#FF4500"), _0xccec25.addColorStop(0.9, "#FF8C00"), _0xccec25.addColorStop(1, "#0a0a0a"), _0xe9d3e9.fillStyle = _0xccec25, _0xe9d3e9.fillRect(0, 0, _0x33fb14, _0xe67ab4), addFireBackgroundNoise(_0xe9d3e9, _0x33fb14, _0xe67ab4), _0xe9d3e9.font = "bold 80px Arial", _0xe9d3e9.textAlign = "center", _0xe9d3e9.textBaseline = 'middle');
  const _0x2def97 = _0xe9d3e9.createLinearGradient(0, _0xe67ab4 / 2 - 50, 0, _0xe67ab4 / 2 + 50);
  return (_0x2def97.addColorStop(0, "#FFFF00"), _0x2def97.addColorStop(0.3, "#FFA500"), _0x2def97.addColorStop(0.7, '#FF4500'), _0x2def97.addColorStop(1, "#8B0000"), _0xe9d3e9.fillStyle = _0x2def97, _0xe9d3e9.shadowColor = "#FF4500", _0xe9d3e9.shadowBlur = 25, _0xe9d3e9.fillText(_0x3892ff.toUpperCase(), _0x33fb14 / 2, _0xe67ab4 / 2), _0xe9d3e9.shadowColor = '#FFFF00', _0xe9d3e9.shadowBlur = 15, _0xe9d3e9.lineWidth = 2, _0xe9d3e9.strokeStyle = _0x2def97, _0xe9d3e9.strokeText(_0x3892ff.toUpperCase(), _0x33fb14 / 2, _0xe67ab4 / 2), addFireParticles(_0xe9d3e9, _0x33fb14, _0xe67ab4), _0xe9d3e9.strokeStyle = "#FF8C00", _0xe9d3e9.lineWidth = 5, _0xe9d3e9.shadowColor = "#FF4500", _0xe9d3e9.shadowBlur = 20, _0xe9d3e9.strokeRect(10, 10, _0x33fb14 - 20, _0xe67ab4 - 20), _0xe9d3e9.shadowColor = "transparent", _0xe9d3e9.shadowBlur = 0, addWatermark(_0xe9d3e9, _0x33fb14, _0xe67ab4), _0x449fbf.toBuffer('image/png'));
}
function addFireBackgroundNoise(_0x3e7d39, _0x1b7571, _0x9b581) {
  _0x3e7d39.globalAlpha = 0.25;
  for (let _0x1bd7c5 = 0; _0x1bd7c5 < 1200; _0x1bd7c5++) {
    const _0x27903e = Math.random() * _0x1b7571, _0xf1515e = Math.random() * _0x9b581, _0x358bd0 = Math.random() * 3 + 1, _0x1f2b55 = Math.random();
    if (_0x1f2b55 > 0.7) _0x3e7d39.fillStyle = "#FFFF00"; else {
      if (_0x1f2b55 > 0.4) _0x3e7d39.fillStyle = '#FFA500'; else _0x3e7d39.fillStyle = '#FF4500';
    }
    _0x3e7d39.fillRect(_0x27903e, _0xf1515e, _0x358bd0, _0x358bd0);
  }
  _0x3e7d39.globalAlpha = 1;
}
function addFireParticles(_0x4ad3e5, _0x41adc5, _0x2e1c38) {
  _0x4ad3e5.globalAlpha = 0.7;
  for (let _0x3976de = 0; _0x3976de < 250; _0x3976de++) {
    const _0x594f96 = Math.random() * Math.PI * 2, _0x1df51d = Math.random() * 120 + 50, _0x379235 = _0x41adc5 / 2 + Math.cos(_0x594f96) * _0x1df51d, _0x59ccd2 = _0x2e1c38 / 2 + Math.sin(_0x594f96) * _0x1df51d, _0x9f73cc = Math.random() * 4 + 1, _0x415ddf = Math.random();
    if (_0x415ddf > 0.8) _0x4ad3e5.fillStyle = "#FFFF00"; else {
      if (_0x415ddf > 0.5) _0x4ad3e5.fillStyle = '#FFA500'; else _0x4ad3e5.fillStyle = "#FF4500";
    }
    (_0x4ad3e5.beginPath(), _0x4ad3e5.arc(_0x379235, _0x59ccd2, _0x9f73cc, 0, Math.PI * 2), _0x4ad3e5.fill());
  }
  _0x4ad3e5.globalAlpha = 1;
}
