import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "chromelogo",
  description: "Create shiny chrome reflective text logos",
  async execute(_0x5c5811, _0xf4aeb, _0x376c17) {
    const _0x5454c8 = _0xf4aeb.key.remoteJid;
    try {
      if (_0x376c17.length === 0) {
        await _0x5c5811.sendMessage(_0x5454c8, {
          text: "╭─⌈ " + DESIGN.CHROME + " *CHROME LOGO* ⌋\n│\n├─⊷ *chromelogo*\n│  └⊷ chromelogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ chromelogo WOLF\n│  └⊷ chromelogo CHROME\n│  └⊷ chromelogo SHINE\n│\n╰⊷ " + getFooter(_0xf4aeb.key.participant || _0xf4aeb.key.remoteJid)
        }, {
          quoted: _0xf4aeb
        });
        return;
      }
      const _0x4a30ed = _0x376c17.join('\x20');
      if (_0x4a30ed.length > 15) {
        await _0x5c5811.sendMessage(_0x5454c8, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 15 characters\n│  └⊷ Your text: \"" + _0x4a30ed + '\x22\x20(' + _0x4a30ed.length + " chars)\n│\n╰───"
        }, {
          quoted: _0xf4aeb
        });
        return;
      }
      await _0x5c5811.sendMessage(_0x5454c8, {
        react: {
          text: STATUS.LOADING,
          key: _0xf4aeb.key
        }
      });
      const _0xe67f88 = await generateChromeLogo(_0x4a30ed);
      (await _0x5c5811.sendMessage(_0x5454c8, {
        image: _0xe67f88,
        caption: DESIGN.CHROME + " *Chrome Logo Generated!*\nText: " + _0x4a30ed + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0xf4aeb
      }), await _0x5c5811.sendMessage(_0x5454c8, {
        react: {
          text: STATUS.SUCCESS,
          key: _0xf4aeb.key
        }
      }));
    } catch (_0x4f3376) {
      (console.error(STATUS.ERROR + " [CHROMELOGO] ERROR:", _0x4f3376), await _0x5c5811.sendMessage(_0x5454c8, {
        react: {
          text: STATUS.ERROR,
          key: _0xf4aeb.key
        }
      }).catch(() => {}), await _0x5c5811.sendMessage(_0x5454c8, {
        text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0x4f3376.message + '\x0a│\x20\x20└⊷\x20Please\x20try\x20again\x20with\x20shorter\x20text\x0a│\x0a╰───'
      }, {
        quoted: _0xf4aeb
      }));
    }
  }
};
async function generateChromeLogo(_0x4116f0) {
  const _0x33f2a2 = 800, _0x1bbf32 = 400, _0x8b56cc = createCanvas(_0x33f2a2, _0x1bbf32), _0x52a30e = _0x8b56cc.getContext('2d'), _0x474760 = _0x52a30e.createLinearGradient(0, 0, _0x33f2a2, _0x1bbf32);
  (_0x474760.addColorStop(0, "#2a2a2a"), _0x474760.addColorStop(0.5, "#1a1a1a"), _0x474760.addColorStop(1, "#0a0a0a"), _0x52a30e.fillStyle = _0x474760, _0x52a30e.fillRect(0, 0, _0x33f2a2, _0x1bbf32), drawChromeEnvironment(_0x52a30e, _0x33f2a2, _0x1bbf32));
  const _0x3e0715 = _0x52a30e.createLinearGradient(0, 80, 0, 320);
  return (_0x3e0715.addColorStop(0, '#FFFFFF'), _0x3e0715.addColorStop(0.1, "#F0F0F0"), _0x3e0715.addColorStop(0.2, "#D0D0D0"), _0x3e0715.addColorStop(0.35, '#A0A0A0'), _0x3e0715.addColorStop(0.5, "#707070"), _0x3e0715.addColorStop(0.65, "#404040"), _0x3e0715.addColorStop(0.8, "#202020"), _0x3e0715.addColorStop(0.9, '#000000'), _0x3e0715.addColorStop(1, "#303030"), _0x52a30e.font = "bold 88px \"Arial\"", _0x52a30e.textAlign = "center", _0x52a30e.textBaseline = "middle", createChromeReflectionEffect(_0x52a30e, _0x4116f0, _0x33f2a2, _0x1bbf32, _0x3e0715), addChromeHighlights(_0x52a30e, _0x4116f0, _0x33f2a2, _0x1bbf32), drawChromeBorder(_0x52a30e, _0x33f2a2, _0x1bbf32), addLightSources(_0x52a30e, _0x33f2a2, _0x1bbf32), addChromeImperfections(_0x52a30e, _0x33f2a2, _0x1bbf32), addWatermark(_0x52a30e, _0x33f2a2, _0x1bbf32), _0x8b56cc.toBuffer("image/png"));
}
function drawChromeEnvironment(_0x218199, _0x13206f, _0x232dcf) {
  const _0x3bddf0 = [{
    x: _0x13206f * 0.2,
    y: _0x232dcf * 0.3,
    size: 80,
    color: "rgba(255, 255, 255, 0.1)"
  }, {
    x: _0x13206f * 0.8,
    y: _0x232dcf * 0.2,
    size: 60,
    color: "rgba(255, 255, 255, 0.08)"
  }, {
    x: _0x13206f * 0.3,
    y: _0x232dcf * 0.7,
    size: 70,
    color: 'rgba(255,\x20255,\x20255,\x200.06)'
  }, {
    x: _0x13206f * 0.7,
    y: _0x232dcf * 0.6,
    size: 50,
    color: "rgba(255, 255, 255, 0.05)"
  }];
  (_0x3bddf0.forEach(_0x426bf0 => {
    const _0x55fe4b = _0x218199.createRadialGradient(_0x426bf0.x, _0x426bf0.y, 0, _0x426bf0.x, _0x426bf0.y, _0x426bf0.size);
    (_0x55fe4b.addColorStop(0, _0x426bf0.color), _0x55fe4b.addColorStop(1, 'transparent'), _0x218199.fillStyle = _0x55fe4b, _0x218199.beginPath(), _0x218199.arc(_0x426bf0.x, _0x426bf0.y, _0x426bf0.size, 0, Math.PI * 2), _0x218199.fill());
  }), _0x218199.strokeStyle = 'rgba(100,\x20100,\x20100,\x200.1)', _0x218199.lineWidth = 1);
  for (let _0x5031db = 0; _0x5031db < _0x232dcf; _0x5031db += 40) {
    (_0x218199.beginPath(), _0x218199.moveTo(0, _0x5031db), _0x218199.lineTo(_0x13206f, _0x5031db), _0x218199.stroke());
  }
  for (let _0x2cce0a = 0; _0x2cce0a < _0x13206f; _0x2cce0a += 40) {
    (_0x218199.beginPath(), _0x218199.moveTo(_0x2cce0a, 0), _0x218199.lineTo(_0x2cce0a, _0x232dcf), _0x218199.stroke());
  }
}
function createChromeReflectionEffect(_0x50415f, _0x32db60, _0x3c3c38, _0xfa8571, _0x43334d) {
  const _0x2fe103 = _0x3c3c38 / 2, _0xaded04 = _0xfa8571 / 2;
  (_0x50415f.shadowColor = 'rgba(0,\x200,\x200,\x200.6)', _0x50415f.shadowBlur = 20, _0x50415f.shadowOffsetX = 8, _0x50415f.shadowOffsetY = 8, _0x50415f.fillStyle = "rgba(0, 0, 0, 0.4)", _0x50415f.fillText(_0x32db60.toUpperCase(), _0x2fe103 + 5, _0xaded04 + 5), _0x50415f.shadowColor = "transparent", _0x50415f.shadowBlur = 0, _0x50415f.shadowOffsetX = 0, _0x50415f.shadowOffsetY = 0, _0x50415f.fillStyle = _0x43334d, _0x50415f.fillText(_0x32db60.toUpperCase(), _0x2fe103, _0xaded04), _0x50415f.strokeStyle = "rgba(255, 255, 255, 0.3)", _0x50415f.lineWidth = 1, _0x50415f.strokeText(_0x32db60.toUpperCase(), _0x2fe103, _0xaded04));
}
function addChromeHighlights(_0x58a819, _0x4d6da0, _0x3a60c1, _0x54787c) {
  const _0x3fc41c = _0x3a60c1 / 2, _0x41c617 = _0x54787c / 2;
  _0x58a819.save();
  const _0xce179b = _0x58a819.createLinearGradient(_0x3fc41c - 300, _0x41c617 - 80, _0x3fc41c + 300, _0x41c617 - 20);
  (_0xce179b.addColorStop(0, 'rgba(255,\x20255,\x20255,\x200)'), _0xce179b.addColorStop(0.2, 'rgba(255,\x20255,\x20255,\x200.8)'), _0xce179b.addColorStop(0.4, "rgba(255, 255, 255, 0.9)"), _0xce179b.addColorStop(0.6, "rgba(255, 255, 255, 0.7)"), _0xce179b.addColorStop(0.8, "rgba(255, 255, 255, 0.3)"), _0xce179b.addColorStop(1, 'rgba(255,\x20255,\x20255,\x200)'), _0x58a819.globalCompositeOperation = 'screen', _0x58a819.fillStyle = _0xce179b, _0x58a819.font = "bold 88px \"Arial\"", _0x58a819.textAlign = 'center', _0x58a819.textBaseline = 'middle', _0x58a819.fillText(_0x4d6da0.toUpperCase(), _0x3fc41c, _0x41c617 - 2), _0x58a819.globalCompositeOperation = "source-over");
  const _0x4d6bbb = _0x58a819.measureText(_0x4d6da0.toUpperCase()).width, _0x469d89 = [{
    x: -0.35,
    y: -0.4,
    size: 6,
    alpha: 0.9
  }, {
    x: -0.15,
    y: -0.45,
    size: 8,
    alpha: 0.8
  }, {
    x: 0.05,
    y: -0.4,
    size: 7,
    alpha: 0.85
  }, {
    x: 0.25,
    y: -0.45,
    size: 6,
    alpha: 0.8
  }, {
    x: 0.4,
    y: -0.35,
    size: 5,
    alpha: 0.7
  }];
  (_0x469d89.forEach(_0x14759e => {
    const _0x4e43f6 = _0x3fc41c + _0x14759e.x * _0x4d6bbb / 2, _0x52e53c = _0x41c617 + _0x14759e.y * 45;
    (_0x58a819.fillStyle = "rgba(255, 255, 255, " + _0x14759e.alpha + ')', _0x58a819.beginPath(), _0x58a819.arc(_0x4e43f6, _0x52e53c, _0x14759e.size, 0, Math.PI * 2), _0x58a819.fill(), _0x58a819.shadowColor = "rgba(255, 255, 255, 0.6)", _0x58a819.shadowBlur = 10, _0x58a819.fill());
  }), _0x58a819.restore());
}
function drawChromeBorder(_0x196c69, _0x4d378e, _0x21a72b) {
  const _0xa8b91f = _0x196c69.createLinearGradient(0, 0, _0x4d378e, _0x21a72b);
  (_0xa8b91f.addColorStop(0, "#FFFFFF"), _0xa8b91f.addColorStop(0.15, '#E0E0E0'), _0xa8b91f.addColorStop(0.3, '#A0A0A0'), _0xa8b91f.addColorStop(0.5, "#404040"), _0xa8b91f.addColorStop(0.7, '#A0A0A0'), _0xa8b91f.addColorStop(0.85, "#E0E0E0"), _0xa8b91f.addColorStop(1, "#FFFFFF"), _0x196c69.strokeStyle = _0xa8b91f, _0x196c69.lineWidth = 8, _0x196c69.shadowColor = "rgba(255, 255, 255, 0.3)", _0x196c69.shadowBlur = 15, _0x196c69.strokeRect(12, 12, _0x4d378e - 24, _0x21a72b - 24), _0x196c69.strokeStyle = 'rgba(255,\x20255,\x20255,\x200.5)', _0x196c69.lineWidth = 2, _0x196c69.shadowBlur = 0, _0x196c69.strokeRect(25, 25, _0x4d378e - 50, _0x21a72b - 50), drawChromeCorners(_0x196c69, _0x4d378e, _0x21a72b));
}
function drawChromeCorners(_0x3c2953, _0x4a28f4, _0xc85388) {
  (_0x3c2953.strokeStyle = "rgba(255, 255, 255, 0.6)", _0x3c2953.lineWidth = 3);
  const _0x5b2fa5 = 35;
  (_0x3c2953.beginPath(), _0x3c2953.moveTo(20, 20 + _0x5b2fa5), _0x3c2953.lineTo(20, 20), _0x3c2953.lineTo(20 + _0x5b2fa5, 20), _0x3c2953.stroke(), _0x3c2953.beginPath(), _0x3c2953.moveTo(_0x4a28f4 - 20 - _0x5b2fa5, 20), _0x3c2953.lineTo(_0x4a28f4 - 20, 20), _0x3c2953.lineTo(_0x4a28f4 - 20, 20 + _0x5b2fa5), _0x3c2953.stroke(), _0x3c2953.beginPath(), _0x3c2953.moveTo(20, _0xc85388 - 20 - _0x5b2fa5), _0x3c2953.lineTo(20, _0xc85388 - 20), _0x3c2953.lineTo(20 + _0x5b2fa5, _0xc85388 - 20), _0x3c2953.stroke(), _0x3c2953.beginPath(), _0x3c2953.moveTo(_0x4a28f4 - 20 - _0x5b2fa5, _0xc85388 - 20), _0x3c2953.lineTo(_0x4a28f4 - 20, _0xc85388 - 20), _0x3c2953.lineTo(_0x4a28f4 - 20, _0xc85388 - 20 - _0x5b2fa5), _0x3c2953.stroke());
}
function addLightSources(_0x9a16a4, _0x284f09, _0x5c4ff6) {
  (_0x9a16a4.save(), _0x9a16a4.globalAlpha = 0.3);
  const _0x5ebd2a = [{
    x: _0x284f09 * 0.25,
    y: _0x5c4ff6 * 0.25,
    size: 15
  }, {
    x: _0x284f09 * 0.75,
    y: _0x5c4ff6 * 0.3,
    size: 12
  }, {
    x: _0x284f09 * 0.35,
    y: _0x5c4ff6 * 0.7,
    size: 10
  }, {
    x: _0x284f09 * 0.65,
    y: _0x5c4ff6 * 0.65,
    size: 8
  }];
  (_0x5ebd2a.forEach(_0x2eba33 => {
    const _0x31ea70 = _0x9a16a4.createRadialGradient(_0x2eba33.x, _0x2eba33.y, 0, _0x2eba33.x, _0x2eba33.y, _0x2eba33.size * 3);
    (_0x31ea70.addColorStop(0, 'rgba(255,\x20255,\x20255,\x200.8)'), _0x31ea70.addColorStop(0.5, "rgba(255, 255, 255, 0.3)"), _0x31ea70.addColorStop(1, 'transparent'), _0x9a16a4.fillStyle = _0x31ea70, _0x9a16a4.beginPath(), _0x9a16a4.arc(_0x2eba33.x, _0x2eba33.y, _0x2eba33.size * 3, 0, Math.PI * 2), _0x9a16a4.fill());
  }), _0x9a16a4.restore());
}
function addChromeImperfections(_0x4f459c, _0x3de98e, _0x9c843a) {
  (_0x4f459c.save(), _0x4f459c.globalAlpha = 0.1, _0x4f459c.strokeStyle = "rgba(255, 255, 255, 0.3)", _0x4f459c.lineWidth = 0.5);
  for (let _0x14c43e = 0; _0x14c43e < 20; _0x14c43e++) {
    const _0x2ad17e = Math.random() * _0x3de98e, _0x18b224 = Math.random() * _0x9c843a, _0x4723b6 = 10 + Math.random() * 30, _0x2bb1e2 = Math.random() * Math.PI;
    (_0x4f459c.beginPath(), _0x4f459c.moveTo(_0x2ad17e, _0x18b224), _0x4f459c.lineTo(_0x2ad17e + Math.cos(_0x2bb1e2) * _0x4723b6, _0x18b224 + Math.sin(_0x2bb1e2) * _0x4723b6), _0x4f459c.stroke());
  }
  _0x4f459c.fillStyle = "rgba(255, 255, 255, 0.2)";
  for (let _0xb38604 = 0; _0xb38604 < 30; _0xb38604++) {
    const _0x1502d5 = Math.random() * _0x3de98e, _0x3bc4de = Math.random() * _0x9c843a, _0x4a56f6 = Math.random() * 1.5;
    (_0x4f459c.beginPath(), _0x4f459c.arc(_0x1502d5, _0x3bc4de, _0x4a56f6, 0, Math.PI * 2), _0x4f459c.fill());
  }
  _0x4f459c.restore();
}
async function generateSimpleChromeLogo(_0x5e1a2a) {
  const _0x2930e4 = 600, _0x4dd26d = 300, _0x37b437 = createCanvas(_0x2930e4, _0x4dd26d), _0x5014fe = _0x37b437.getContext('2d');
  (_0x5014fe.fillStyle = "#1a1a1a", _0x5014fe.fillRect(0, 0, _0x2930e4, _0x4dd26d));
  const _0xe2708d = _0x5014fe.createLinearGradient(0, 40, 0, 260);
  return (_0xe2708d.addColorStop(0, '#FFFFFF'), _0xe2708d.addColorStop(0.2, "#E0E0E0"), _0xe2708d.addColorStop(0.4, "#A0A0A0"), _0xe2708d.addColorStop(0.6, "#606060"), _0xe2708d.addColorStop(0.8, "#A0A0A0"), _0xe2708d.addColorStop(1, "#E0E0E0"), _0x5014fe.font = "bold 75px Arial", _0x5014fe.fillStyle = _0xe2708d, _0x5014fe.textAlign = "center", _0x5014fe.textBaseline = "middle", _0x5014fe.shadowColor = "rgba(255, 255, 255, 0.3)", _0x5014fe.shadowBlur = 10, _0x5014fe.fillText(_0x5e1a2a.toUpperCase(), _0x2930e4 / 2, _0x4dd26d / 2), _0x5014fe.strokeStyle = _0xe2708d, _0x5014fe.lineWidth = 4, _0x5014fe.strokeRect(10, 10, _0x2930e4 - 20, _0x4dd26d - 20), _0x37b437.toBuffer('image/png'));
}
