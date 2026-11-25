import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "gradientlogo",
  description: "Create beautiful gradient style text logos",
  async execute(_0x197a71, _0x3e1872, _0x49630f) {
    const _0x489db0 = _0x3e1872.key.remoteJid;
    try {
      if (_0x49630f.length === 0) {
        await _0x197a71.sendMessage(_0x489db0, {
          text: '╭─⌈\x20' + DESIGN.GRADIENT + '\x20*GRADIENT\x20LOGO*\x20⌋\x0a│\x0a├─⊷\x20*gradientlogo*\x0a│\x20\x20└⊷\x20gradientlogo\x20<text>\x0a│\x0a├─⊷\x20*Example:*\x0a│\x20\x20└⊷\x20gradientlogo\x20WOLF\x0a│\x20\x20└⊷\x20gradientlogo\x20GRADIENT\x0a│\x20\x20└⊷\x20gradientlogo\x20COLORFUL\x0a│\x0a╰⊷\x20' + getFooter(_0x3e1872.key.participant || _0x3e1872.key.remoteJid)
        }, {
          quoted: _0x3e1872
        });
        return;
      }
      const _0x3250ec = _0x49630f.join('\x20');
      if (_0x3250ec.length > 15) {
        await _0x197a71.sendMessage(_0x489db0, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 15 characters\n│  └⊷ Your text: \"" + _0x3250ec + "\" (" + _0x3250ec.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x3e1872
        });
        return;
      }
      await _0x197a71.sendMessage(_0x489db0, {
        react: {
          text: STATUS.LOADING,
          key: _0x3e1872.key
        }
      });
      const _0x40af74 = await generateGradientLogo(_0x3250ec);
      (await _0x197a71.sendMessage(_0x489db0, {
        image: _0x40af74,
        caption: DESIGN.GRADIENT + '\x20*Gradient\x20Logo\x20Generated!*\x0aText:\x20' + _0x3250ec + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x3e1872
      }), await _0x197a71.sendMessage(_0x489db0, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x3e1872.key
        }
      }));
    } catch (_0x417e8c) {
      (console.error(STATUS.ERROR + " [GRADIENTLOGO] ERROR:", _0x417e8c), await _0x197a71.sendMessage(_0x489db0, {
        react: {
          text: STATUS.ERROR,
          key: _0x3e1872.key
        }
      }).catch(() => {}), await _0x197a71.sendMessage(_0x489db0, {
        text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0x417e8c.message + '\x0a│\x20\x20└⊷\x20Please\x20try\x20again\x20with\x20shorter\x20text\x0a│\x0a╰───'
      }, {
        quoted: _0x3e1872
      }));
    }
  }
};
async function generateGradientLogo(_0x15fce0) {
  const _0x4c1af1 = 800, _0x422f02 = 400, _0x3255bd = createCanvas(_0x4c1af1, _0x422f02), _0x28b4a5 = _0x3255bd.getContext('2d'), _0x4e531f = getRandomGradientColors(), _0x4424f6 = _0x28b4a5.createLinearGradient(0, 0, _0x4c1af1, _0x422f02);
  (_0x4424f6.addColorStop(0, _0x4e531f[0]), _0x4424f6.addColorStop(0.5, _0x4e531f[1]), _0x4424f6.addColorStop(1, _0x4e531f[2]), _0x28b4a5.fillStyle = _0x4424f6, _0x28b4a5.fillRect(0, 0, _0x4c1af1, _0x422f02), addPatternOverlay(_0x28b4a5, _0x4c1af1, _0x422f02));
  const _0x872fb9 = _0x28b4a5.createLinearGradient(0, 150, 0, 250);
  return (_0x872fb9.addColorStop(0, getContrastColor(_0x4e531f[0])), _0x872fb9.addColorStop(0.5, getContrastColor(_0x4e531f[1])), _0x872fb9.addColorStop(1, getContrastColor(_0x4e531f[2])), _0x28b4a5.font = "bold 80px \"Arial\"", _0x28b4a5.textAlign = "center", _0x28b4a5.textBaseline = "middle", _0x28b4a5.shadowColor = 'rgba(0,\x200,\x200,\x200.5)', _0x28b4a5.shadowBlur = 15, _0x28b4a5.shadowOffsetX = 3, _0x28b4a5.shadowOffsetY = 3, _0x28b4a5.fillStyle = _0x872fb9, _0x28b4a5.fillText(_0x15fce0.toUpperCase(), _0x4c1af1 / 2, _0x422f02 / 2), _0x28b4a5.strokeStyle = "rgba(255, 255, 255, 0.3)", _0x28b4a5.lineWidth = 2, _0x28b4a5.strokeText(_0x15fce0.toUpperCase(), _0x4c1af1 / 2, _0x422f02 / 2), _0x28b4a5.shadowColor = "transparent", _0x28b4a5.shadowBlur = 0, _0x28b4a5.shadowOffsetX = 0, _0x28b4a5.shadowOffsetY = 0, drawModernBorder(_0x28b4a5, _0x4c1af1, _0x422f02, _0x4e531f), addFloatingParticles(_0x28b4a5, _0x4c1af1, _0x422f02, _0x4e531f), addWatermark(_0x28b4a5, _0x4c1af1, _0x422f02), _0x3255bd.toBuffer("image/png"));
}
function getRandomGradientColors() {
  const _0x228a2e = [['#667eea', "#764ba2", "#f093fb"], ['#4facfe', '#00f2fe', "#43e97b"], ["#fa709a", "#fee140", "#ff6b6b"], ["#a8edea", "#fed6e3", "#a8edea"], ["#ff9a9e", "#fecfef", "#fecfef"], ["#a1c4fd", "#c2e9fb", "#a1c4fd"], ["#d4fc79", "#96e6a1", "#d4fc79"], ["#fad0c4", "#ffd1ff", "#fad0c4"], ['#ffecd2', '#fcb69f', "#ffecd2"], ["#a3bded", "#6991c7", "#a3bded"], ["#ff9a8b", "#ff6a88", "#ff99ac"], ['#cd9cf2', '#f6f3ff', "#cd9cf2"], ["#6a11cb", '#2575fc', '#6a11cb'], ['#ff8177', "#ff867a", "#ff8c7f"], ["#74ebd5", "#9face6", '#74ebd5']];
  return _0x228a2e[Math.floor(Math.random() * _0x228a2e.length)];
}
function getContrastColor(_0x4eebe2) {
  const _0x2400f1 = parseInt(_0x4eebe2.slice(1, 3), 16), _0x9671df = parseInt(_0x4eebe2.slice(3, 5), 16), _0x386b68 = parseInt(_0x4eebe2.slice(5, 7), 16), _0x307572 = (0.299 * _0x2400f1 + 0.587 * _0x9671df + 0.114 * _0x386b68) / 255;
  return _0x307572 > 0.5 ? "#000000" : "#FFFFFF";
}
function addPatternOverlay(_0x84d932, _0x5ecdb0, _0x4cf611) {
  (_0x84d932.globalAlpha = 0.1, _0x84d932.strokeStyle = "#FFFFFF", _0x84d932.lineWidth = 1);
  for (let _0x1d8a51 = -_0x5ecdb0; _0x1d8a51 < _0x5ecdb0 * 2; _0x1d8a51 += 25) {
    (_0x84d932.beginPath(), _0x84d932.moveTo(_0x1d8a51, 0), _0x84d932.lineTo(_0x1d8a51 + _0x4cf611, _0x4cf611), _0x84d932.stroke());
  }
  for (let _0x3adb6d = -_0x5ecdb0; _0x3adb6d < _0x5ecdb0 * 2; _0x3adb6d += 25) {
    (_0x84d932.beginPath(), _0x84d932.moveTo(_0x3adb6d, _0x4cf611), _0x84d932.lineTo(_0x3adb6d + _0x4cf611, 0), _0x84d932.stroke());
  }
  _0x84d932.globalAlpha = 1;
}
function drawModernBorder(_0xff8d78, _0x39d025, _0x2f8737, _0x5ed34b) {
  const _0x5797b2 = _0xff8d78.createLinearGradient(0, 0, _0x39d025, _0x2f8737);
  (_0x5797b2.addColorStop(0, _0x5ed34b[0]), _0x5797b2.addColorStop(0.5, _0x5ed34b[1]), _0x5797b2.addColorStop(1, _0x5ed34b[2]), _0xff8d78.strokeStyle = _0x5797b2, _0xff8d78.lineWidth = 6, _0xff8d78.shadowColor = _0x5ed34b[1], _0xff8d78.shadowBlur = 10, _0xff8d78.strokeRect(15, 15, _0x39d025 - 30, _0x2f8737 - 30), _0xff8d78.strokeStyle = "rgba(255, 255, 255, 0.3)", _0xff8d78.lineWidth = 2, _0xff8d78.shadowBlur = 0, _0xff8d78.strokeRect(25, 25, _0x39d025 - 50, _0x2f8737 - 50));
}
function addFloatingParticles(_0x10bbb7, _0xc0e0ed, _0x3d25c8, _0x127957) {
  _0x10bbb7.globalAlpha = 0.6;
  for (let _0xf0487d = 0; _0xf0487d < 30; _0xf0487d++) {
    const _0x6f2d51 = Math.random() * _0xc0e0ed, _0x2ab61e = Math.random() * _0x3d25c8, _0x44fcd2 = Math.random() * 4 + 1, _0x4092a1 = Math.floor(Math.random() * _0x127957.length);
    (_0x10bbb7.fillStyle = _0x127957[_0x4092a1], _0x10bbb7.beginPath(), _0x10bbb7.arc(_0x6f2d51, _0x2ab61e, _0x44fcd2, 0, Math.PI * 2), _0x10bbb7.fill());
  }
  _0x10bbb7.globalAlpha = 1;
}
async function generateCustomGradientLogo(_0x325891, _0x4e1a90, _0x5728c6, _0x46ce25) {
  const _0x2ab240 = 800, _0x6143d2 = 400, _0x29f623 = createCanvas(_0x2ab240, _0x6143d2), _0x27d9db = _0x29f623.getContext('2d'), _0x3730d7 = _0x27d9db.createLinearGradient(0, 0, _0x2ab240, _0x6143d2);
  return (_0x3730d7.addColorStop(0, _0x4e1a90 || '#667eea'), _0x3730d7.addColorStop(0.5, _0x5728c6 || "#764ba2"), _0x3730d7.addColorStop(1, _0x46ce25 || "#f093fb"), _0x27d9db.fillStyle = _0x3730d7, _0x27d9db.fillRect(0, 0, _0x2ab240, _0x6143d2), _0x27d9db.font = "bold 80px \"Arial\"", _0x27d9db.fillStyle = getContrastColor(_0x4e1a90), _0x27d9db.textAlign = "center", _0x27d9db.textBaseline = "middle", _0x27d9db.shadowColor = "rgba(0, 0, 0, 0.5)", _0x27d9db.shadowBlur = 10, _0x27d9db.fillText(_0x325891.toUpperCase(), _0x2ab240 / 2, _0x6143d2 / 2), _0x29f623.toBuffer("image/png"));
}
