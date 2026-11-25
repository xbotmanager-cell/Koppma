import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {DESIGN, STATUS} from '../../lib/emojis.js';
export default {
  name: "aqualogo",
  description: "Create stunning aquatic text logos with water effects and ocean themes",
  async execute(_0x292817, _0x183803, _0x3957a2) {
    const _0x17db40 = _0x183803.key.remoteJid;
    try {
      if (_0x3957a2.length === 0) {
        await _0x292817.sendMessage(_0x17db40, {
          text: "╭─⌈ " + DESIGN.AQUA + '\x20*AQUA\x20LOGO*\x20⌋\x0a│\x0a├─⊷\x20*aqualogo*\x0a│\x20\x20└⊷\x20aqualogo\x20<text>\x0a│\x0a├─⊷\x20*Example:*\x0a│\x20\x20└⊷\x20aqualogo\x20OCEAN\x0a│\x20\x20└⊷\x20aqualogo\x20WATER\x0a│\x20\x20└⊷\x20aqualogo\x20MARINE\x0a│\x0a╰⊷\x20' + getFooter(_0x183803.key.participant || _0x183803.key.remoteJid)
        }, {
          quoted: _0x183803
        });
        return;
      }
      const _0x23f13d = _0x3957a2.join('\x20');
      if (_0x23f13d.length > 10) {
        await _0x292817.sendMessage(_0x17db40, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 10 characters\n│  └⊷ Your text: \"" + _0x23f13d + "\" (" + _0x23f13d.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x183803
        });
        return;
      }
      await _0x292817.sendMessage(_0x17db40, {
        react: {
          text: STATUS.LOADING,
          key: _0x183803.key
        }
      });
      const _0x1607a1 = await generateAquaLogo(_0x23f13d);
      (await _0x292817.sendMessage(_0x17db40, {
        image: _0x1607a1,
        caption: DESIGN.AQUA + " *Aqua Logo Generated!*\nText: " + _0x23f13d + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x183803
      }), await _0x292817.sendMessage(_0x17db40, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x183803.key
        }
      }));
    } catch (_0xc28458) {
      (console.error(STATUS.ERROR + " [AQUALOGO] ERROR:", _0xc28458), await _0x292817.sendMessage(_0x17db40, {
        react: {
          text: STATUS.ERROR,
          key: _0x183803.key
        }
      }).catch(() => {}), await _0x292817.sendMessage(_0x17db40, {
        text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0xc28458.message + '\x0a│\x20\x20└⊷\x20Please\x20try\x20again\x20with\x20shorter\x20text\x0a│\x0a╰───'
      }, {
        quoted: _0x183803
      }));
    }
  }
};
async function generateAquaLogo(_0x4ad27c) {
  const _0x15b4b1 = 800, _0x42f078 = 400, _0x5cf6ca = createCanvas(_0x15b4b1, _0x42f078), _0x876227 = _0x5cf6ca.getContext('2d');
  return (createUnderwaterBackground(_0x876227, _0x15b4b1, _0x42f078), addWaterSurface(_0x876227, _0x15b4b1, _0x42f078), drawWaterText(_0x876227, _0x4ad27c, _0x15b4b1, _0x42f078), addBubbles(_0x876227, _0x15b4b1, _0x42f078), addAquaticLife(_0x876227, _0x15b4b1, _0x42f078), addLightRays(_0x876227, _0x15b4b1, _0x42f078), addCaustics(_0x876227, _0x15b4b1, _0x42f078), addWaterDistortion(_0x876227, _0x15b4b1, _0x42f078), drawAquaticBorder(_0x876227, _0x15b4b1, _0x42f078), addAquaSignature(_0x876227, _0x15b4b1, _0x42f078), addWatermark(_0x876227, _0x15b4b1, _0x42f078), _0x5cf6ca.toBuffer("image/png"));
}
function createUnderwaterBackground(_0x4f2e74, _0x5eb467, _0x3b89a4) {
  const _0x51f2b6 = _0x4f2e74.createLinearGradient(0, 0, 0, _0x3b89a4);
  (_0x51f2b6.addColorStop(0, "#006994"), _0x51f2b6.addColorStop(0.3, "#005a7a"), _0x51f2b6.addColorStop(0.6, "#004a66"), _0x51f2b6.addColorStop(1, "#00394d"), _0x4f2e74.fillStyle = _0x51f2b6, _0x4f2e74.fillRect(0, 0, _0x5eb467, _0x3b89a4), addOceanDepthTexture(_0x4f2e74, _0x5eb467, _0x3b89a4), addCoralReefs(_0x4f2e74, _0x5eb467, _0x3b89a4));
}
function addOceanDepthTexture(_0x5f20b5, _0x312ef8, _0x4cac7b) {
  (_0x5f20b5.save(), _0x5f20b5.globalAlpha = 0.1);
  for (let _0x57d063 = 0; _0x57d063 < 500; _0x57d063++) {
    const _0x55fd5b = Math.random() * _0x312ef8, _0x4e4858 = Math.random() * _0x4cac7b, _0x136918 = 2 + Math.random() * 8, _0x28989e = 30 + Math.random() * 40;
    (_0x5f20b5.fillStyle = "rgba(" + _0x28989e + ',\x20' + (_0x28989e + 50) + ',\x20' + (_0x28989e + 70) + ',\x200.3)', _0x5f20b5.beginPath(), _0x5f20b5.arc(_0x55fd5b, _0x4e4858, _0x136918, 0, Math.PI * 2), _0x5f20b5.fill());
  }
  (_0x5f20b5.strokeStyle = "rgba(0, 80, 120, 0.2)", _0x5f20b5.lineWidth = 1);
  for (let _0x32ec70 = 50; _0x32ec70 < _0x4cac7b; _0x32ec70 += 40) {
    (_0x5f20b5.beginPath(), _0x5f20b5.moveTo(0, _0x32ec70), _0x5f20b5.lineTo(_0x312ef8, _0x32ec70), _0x5f20b5.stroke());
  }
  _0x5f20b5.restore();
}
function addWaterSurface(_0x5a4773, _0x2210fe, _0x1f1208) {
  _0x5a4773.save();
  const _0x52f1b7 = _0x5a4773.createLinearGradient(0, 0, 0, _0x1f1208 * 0.3);
  (_0x52f1b7.addColorStop(0, "rgba(0, 150, 200, 0.6)"), _0x52f1b7.addColorStop(0.5, "rgba(0, 100, 150, 0.3)"), _0x52f1b7.addColorStop(1, 'transparent'), _0x5a4773.fillStyle = _0x52f1b7, _0x5a4773.fillRect(0, 0, _0x2210fe, _0x1f1208 * 0.3), drawSurfaceWaves(_0x5a4773, _0x2210fe, _0x1f1208), addSunlightPenetration(_0x5a4773, _0x2210fe, _0x1f1208), _0x5a4773.restore());
}
function drawSurfaceWaves(_0x463a74, _0x58f9e9, _0x48c2b9) {
  (_0x463a74.save(), _0x463a74.globalAlpha = 0.4);
  for (let _0x3a1a61 = 0; _0x3a1a61 < 3; _0x3a1a61++) {
    const _0x4e4f98 = 5 + _0x3a1a61 * 3, _0x1d9a35 = _0x48c2b9 * 0.1 + _0x3a1a61 * 15;
    (_0x463a74.strokeStyle = "rgba(255, 255, 255, " + (0.3 - _0x3a1a61 * 0.1) + ')', _0x463a74.lineWidth = 1, _0x463a74.beginPath());
    for (let _0x350ed3 = 0; _0x350ed3 <= _0x58f9e9; _0x350ed3 += 2) {
      const _0x35d293 = _0x1d9a35 + Math.sin(_0x350ed3 * 0.02 + _0x3a1a61) * _0x4e4f98;
      _0x350ed3 === 0 ? _0x463a74.moveTo(_0x350ed3, _0x35d293) : _0x463a74.lineTo(_0x350ed3, _0x35d293);
    }
    _0x463a74.stroke();
  }
  (_0x463a74.strokeStyle = "rgba(255, 255, 255, 0.6)", _0x463a74.lineWidth = 1, _0x463a74.beginPath());
  for (let _0x10890b = 0; _0x10890b <= _0x58f9e9; _0x10890b += 3) {
    const _0x503969 = _0x48c2b9 * 0.08 + Math.sin(_0x10890b * 0.015) * 8;
    _0x10890b === 0 ? _0x463a74.moveTo(_0x10890b, _0x503969) : _0x463a74.lineTo(_0x10890b, _0x503969);
  }
  (_0x463a74.stroke(), _0x463a74.restore());
}
function addSunlightPenetration(_0x160d08, _0xf657d0, _0x1bb8e4) {
  (_0x160d08.save(), _0x160d08.globalCompositeOperation = "screen", _0x160d08.globalAlpha = 0.2);
  const _0x31a993 = _0x160d08.createRadialGradient(_0xf657d0 * 0.5, 0, 0, _0xf657d0 * 0.5, 0, _0xf657d0 * 0.8);
  (_0x31a993.addColorStop(0, "rgba(255, 255, 200, 0.6)"), _0x31a993.addColorStop(0.5, "rgba(200, 230, 255, 0.3)"), _0x31a993.addColorStop(1, 'transparent'), _0x160d08.fillStyle = _0x31a993, _0x160d08.fillRect(0, 0, _0xf657d0, _0x1bb8e4 * 0.5));
  for (let _0x1c713c = 0; _0x1c713c < 8; _0x1c713c++) {
    const _0x261995 = _0xf657d0 * 0.2 + _0x1c713c / 7 * _0xf657d0 * 0.6, _0x597a7d = 20 + Math.random() * 30, _0x2e3060 = _0x160d08.createLinearGradient(_0x261995, 0, _0x261995, _0x1bb8e4);
    (_0x2e3060.addColorStop(0, "rgba(255, 255, 220, 0.4)"), _0x2e3060.addColorStop(0.3, "rgba(200, 230, 255, 0.2)"), _0x2e3060.addColorStop(1, "transparent"), _0x160d08.fillStyle = _0x2e3060, _0x160d08.fillRect(_0x261995 - _0x597a7d / 2, 0, _0x597a7d, _0x1bb8e4));
  }
  _0x160d08.restore();
}
function drawWaterText(_0x50b3a9, _0x5c9999, _0x2061aa, _0x53f2cf) {
  const _0x353334 = _0x2061aa * 0.5, _0x2f66d7 = _0x53f2cf * 0.6;
  (_0x50b3a9.save(), _0x50b3a9.shadowColor = 'rgba(0,\x20150,\x20200,\x200.8)', _0x50b3a9.shadowBlur = 30);
  const _0x351f5e = _0x50b3a9.createLinearGradient(_0x353334 - 100, _0x2f66d7 - 50, _0x353334 + 100, _0x2f66d7 + 50);
  (_0x351f5e.addColorStop(0, "#ffffff"), _0x351f5e.addColorStop(0.3, "#aaddff"), _0x351f5e.addColorStop(0.6, "#66bbff"), _0x351f5e.addColorStop(1, "#3399ff"), _0x50b3a9.font = "bold 68px \"Arial\"", _0x50b3a9.textAlign = "center", _0x50b3a9.textBaseline = "middle", _0x50b3a9.fillStyle = _0x351f5e, _0x50b3a9.fillText(_0x5c9999.toUpperCase(), _0x353334, _0x2f66d7), addWaterDroplets(_0x50b3a9, _0x5c9999, _0x353334, _0x2f66d7), _0x50b3a9.shadowColor = 'transparent', _0x50b3a9.strokeStyle = "rgba(255, 255, 255, 0.8)", _0x50b3a9.lineWidth = 2, _0x50b3a9.strokeText(_0x5c9999.toUpperCase(), _0x353334, _0x2f66d7), _0x50b3a9.fillStyle = 'rgba(200,\x20230,\x20255,\x200.6)', _0x50b3a9.fillText(_0x5c9999.toUpperCase(), _0x353334, _0x2f66d7), addTextDistortion(_0x50b3a9, _0x5c9999, _0x353334, _0x2f66d7), _0x50b3a9.restore());
}
function addWaterDroplets(_0x341b8f, _0x48e12d, _0x301b47, _0x420a7a) {
  (_0x341b8f.save(), _0x341b8f.globalCompositeOperation = "screen");
  const _0x35b39b = _0x341b8f.measureText(_0x48e12d.toUpperCase()), _0x2033fd = _0x35b39b.width, _0x254b59 = 68;
  for (let _0x4eabf0 = 0; _0x4eabf0 < 20; _0x4eabf0++) {
    const _0x230ad2 = _0x301b47 - _0x2033fd / 2 + Math.random() * _0x2033fd, _0x30d036 = _0x420a7a - _0x254b59 / 2 + Math.random() * _0x254b59, _0x5d8c6e = 2 + Math.random() * 8;
    if (Math.random() > 0.3) {
      (_0x341b8f.fillStyle = 'rgba(255,\x20255,\x20255,\x200.9)', _0x341b8f.beginPath(), _0x341b8f.arc(_0x230ad2, _0x30d036, _0x5d8c6e * 0.3, 0, Math.PI * 2), _0x341b8f.fill());
      const _0x487d3d = _0x341b8f.createRadialGradient(_0x230ad2, _0x30d036, 0, _0x230ad2, _0x30d036, _0x5d8c6e);
      (_0x487d3d.addColorStop(0, 'rgba(150,\x20200,\x20255,\x200.8)'), _0x487d3d.addColorStop(1, "rgba(100, 150, 255, 0.4)"), _0x341b8f.fillStyle = _0x487d3d, _0x341b8f.beginPath(), _0x341b8f.arc(_0x230ad2, _0x30d036, _0x5d8c6e, 0, Math.PI * 2), _0x341b8f.fill(), _0x341b8f.fillStyle = "rgba(0, 50, 100, 0.3)", _0x341b8f.beginPath(), _0x341b8f.arc(_0x230ad2 + _0x5d8c6e * 0.3, _0x30d036 + _0x5d8c6e * 0.3, _0x5d8c6e * 0.8, 0, Math.PI * 2), _0x341b8f.fill());
    }
  }
  _0x341b8f.restore();
}
function addTextDistortion(_0x49781e, _0x1fb094, _0x58cf1a, _0x43942c) {
  (_0x49781e.save(), _0x49781e.globalAlpha = 0.3);
  const _0x2d6977 = _0x49781e.measureText(_0x1fb094.toUpperCase()), _0x3ff43d = _0x2d6977.width;
  for (let _0x3acd44 = _0x58cf1a - _0x3ff43d / 2; _0x3acd44 < _0x58cf1a + _0x3ff43d / 2; _0x3acd44 += 10) {
    const _0xf454f4 = 2 + Math.sin(_0x3acd44 * 0.1) * 5, _0x35872a = _0x43942c + 35 + _0xf454f4;
    (_0x49781e.strokeStyle = "rgba(255, 255, 255, 0.4)", _0x49781e.lineWidth = 1, _0x49781e.beginPath(), _0x49781e.moveTo(_0x3acd44, _0x43942c + 35), _0x49781e.lineTo(_0x3acd44, _0x35872a), _0x49781e.stroke());
  }
  _0x49781e.restore();
}
function addBubbles(_0x5df7d9, _0x45b99e, _0x39d14f) {
  _0x5df7d9.save();
  for (let _0xcf8613 = 0; _0xcf8613 < 15; _0xcf8613++) {
    const _0x4db58a = Math.random() * _0x45b99e, _0x379e69 = _0x39d14f * 0.2 + Math.random() * _0x39d14f * 0.7, _0x50a943 = 8 + Math.random() * 25;
    drawBubble(_0x5df7d9, _0x4db58a, _0x379e69, _0x50a943);
  }
  for (let _0x1c1e73 = 0; _0x1c1e73 < 30; _0x1c1e73++) {
    const _0x45482c = Math.random() * _0x45b99e, _0x51bf2f = _0x39d14f * 0.3 + Math.random() * _0x39d14f * 0.6, _0x79a515 = 4 + Math.random() * 12;
    drawBubble(_0x5df7d9, _0x45482c, _0x51bf2f, _0x79a515);
  }
  for (let _0x5ac6e3 = 0; _0x5ac6e3 < 100; _0x5ac6e3++) {
    const _0x311542 = Math.random() * _0x45b99e, _0x1f7e41 = _0x39d14f * 0.4 + Math.random() * _0x39d14f * 0.5, _0x59ff0a = 1 + Math.random() * 6;
    drawBubble(_0x5df7d9, _0x311542, _0x1f7e41, _0x59ff0a);
  }
  (addBubbleStreams(_0x5df7d9, _0x45b99e, _0x39d14f), _0x5df7d9.restore());
}
function drawBubble(_0x303a62, _0x119a70, _0x236425, _0x309835) {
  const _0x41e557 = _0x303a62.createRadialGradient(_0x119a70, _0x236425, 0, _0x119a70, _0x236425, _0x309835);
  (_0x41e557.addColorStop(0, "rgba(255, 255, 255, 0.9)"), _0x41e557.addColorStop(0.7, "rgba(200, 230, 255, 0.6)"), _0x41e557.addColorStop(1, 'rgba(150,\x20200,\x20255,\x200.3)'), _0x303a62.fillStyle = _0x41e557, _0x303a62.beginPath(), _0x303a62.arc(_0x119a70, _0x236425, _0x309835, 0, Math.PI * 2), _0x303a62.fill(), _0x303a62.fillStyle = "rgba(255, 255, 255, 0.8)", _0x303a62.beginPath(), _0x303a62.arc(_0x119a70 - _0x309835 * 0.3, _0x236425 - _0x309835 * 0.3, _0x309835 * 0.4, 0, Math.PI * 2), _0x303a62.fill(), _0x303a62.fillStyle = "rgba(255, 255, 255, 0.4)", _0x303a62.beginPath(), _0x303a62.arc(_0x119a70 + _0x309835 * 0.2, _0x236425 + _0x309835 * 0.2, _0x309835 * 0.3, 0, Math.PI * 2), _0x303a62.fill());
}
function addBubbleStreams(_0x2c8cf6, _0x5dac3b, _0x27ef41) {
  (_0x2c8cf6.save(), _0x2c8cf6.globalAlpha = 0.6);
  const _0x40490f = [{
    x: _0x5dac3b * 0.2,
    count: 12
  }, {
    x: _0x5dac3b * 0.4,
    count: 8
  }, {
    x: _0x5dac3b * 0.6,
    count: 10
  }, {
    x: _0x5dac3b * 0.8,
    count: 15
  }];
  (_0x40490f.forEach(_0x20b158 => {
    for (let _0x55af85 = 0; _0x55af85 < _0x20b158.count; _0x55af85++) {
      const _0x3087ac = _0x27ef41 * 0.7 + _0x55af85 / _0x20b158.count * _0x27ef41 * 0.3, _0x331e60 = 3 + Math.random() * 8, _0x425c5c = (Math.random() - 0.5) * 20;
      drawBubble(_0x2c8cf6, _0x20b158.x + _0x425c5c, _0x3087ac, _0x331e60);
    }
  }), _0x2c8cf6.restore());
}
function addAquaticLife(_0x5493eb, _0x473306, _0x5df8eb) {
  _0x5493eb.save();
  for (let _0x417b1c = 0; _0x417b1c < 6; _0x417b1c++) {
    const _0x5eccf6 = _0x473306 * 0.1 + Math.random() * _0x473306 * 0.8, _0x275aed = _0x5df8eb * 0.3 + Math.random() * _0x5df8eb * 0.5, _0x2d8428 = 15 + Math.random() * 20, _0x74fa34 = Math.random() > 0.5 ? 1 : -1;
    drawFish(_0x5493eb, _0x5eccf6, _0x275aed, _0x2d8428, _0x74fa34);
  }
  (addSeaweed(_0x5493eb, _0x473306, _0x5df8eb), _0x5493eb.restore());
}
function drawFish(_0x56bb59, _0x5f53f6, _0x13c00a, _0x5e2fcd, _0x32c344) {
  (_0x56bb59.save(), _0x56bb59.globalAlpha = 0.7);
  const _0xbfeeb2 = _0x56bb59.createLinearGradient(_0x5f53f6 - _0x5e2fcd * _0x32c344, _0x13c00a, _0x5f53f6 + _0x5e2fcd * _0x32c344, _0x13c00a);
  (_0xbfeeb2.addColorStop(0, "#ff6b6b"), _0xbfeeb2.addColorStop(0.5, "#ff8e8e"), _0xbfeeb2.addColorStop(1, "#ff5252"), _0x56bb59.fillStyle = _0xbfeeb2, _0x56bb59.beginPath(), _0x56bb59.ellipse(_0x5f53f6, _0x13c00a, _0x5e2fcd, _0x5e2fcd * 0.5, 0, 0, Math.PI * 2), _0x56bb59.fill(), _0x56bb59.fillStyle = "#ff4444", _0x56bb59.beginPath(), _0x56bb59.moveTo(_0x5f53f6 + _0x5e2fcd * _0x32c344, _0x13c00a), _0x56bb59.lineTo(_0x5f53f6 + _0x5e2fcd * 1.5 * _0x32c344, _0x13c00a - _0x5e2fcd * 0.5), _0x56bb59.lineTo(_0x5f53f6 + _0x5e2fcd * 1.5 * _0x32c344, _0x13c00a + _0x5e2fcd * 0.5), _0x56bb59.closePath(), _0x56bb59.fill(), _0x56bb59.fillStyle = 'black', _0x56bb59.beginPath(), _0x56bb59.arc(_0x5f53f6 - _0x5e2fcd * 0.5 * _0x32c344, _0x13c00a, _0x5e2fcd * 0.15, 0, Math.PI * 2), _0x56bb59.fill(), _0x56bb59.fillStyle = "#ff7777", _0x56bb59.beginPath(), _0x56bb59.moveTo(_0x5f53f6 - _0x5e2fcd * 0.2 * _0x32c344, _0x13c00a - _0x5e2fcd * 0.3), _0x56bb59.lineTo(_0x5f53f6 + _0x5e2fcd * 0.3 * _0x32c344, _0x13c00a - _0x5e2fcd * 0.6), _0x56bb59.lineTo(_0x5f53f6 + _0x5e2fcd * 0.1 * _0x32c344, _0x13c00a - _0x5e2fcd * 0.3), _0x56bb59.closePath(), _0x56bb59.fill(), _0x56bb59.restore());
}
function addSeaweed(_0x5830a7, _0x526026, _0x19652b) {
  (_0x5830a7.save(), _0x5830a7.globalAlpha = 0.6);
  const _0x294b59 = [{
    x: _0x526026 * 0.1,
    height: 80
  }, {
    x: _0x526026 * 0.9,
    height: 120
  }, {
    x: _0x526026 * 0.3,
    height: 90
  }, {
    x: _0x526026 * 0.7,
    height: 110
  }];
  (_0x294b59.forEach(_0x362bbe => {
    (_0x5830a7.strokeStyle = "#2e8b57", _0x5830a7.lineWidth = 3, _0x5830a7.lineCap = "round", _0x5830a7.beginPath(), _0x5830a7.moveTo(_0x362bbe.x, _0x19652b - 20));
    for (let _0x51759f = 0; _0x51759f <= 10; _0x51759f++) {
      const _0x5abd05 = _0x19652b - 20 - _0x51759f / 10 * _0x362bbe.height, _0x3c1dd5 = Math.sin(_0x51759f * 0.8) * 15;
      _0x5830a7.lineTo(_0x362bbe.x + _0x3c1dd5, _0x5abd05);
    }
    (_0x5830a7.stroke(), _0x5830a7.strokeStyle = '#3cb371', _0x5830a7.lineWidth = 2);
    for (let _0x449ba6 = 2; _0x449ba6 <= 8; _0x449ba6 += 2) {
      const _0x57e1d2 = _0x19652b - 20 - _0x449ba6 / 10 * _0x362bbe.height, _0x1dc4f3 = Math.sin(_0x449ba6 * 0.8) * 15;
      (_0x5830a7.beginPath(), _0x5830a7.moveTo(_0x362bbe.x + _0x1dc4f3, _0x57e1d2), _0x5830a7.lineTo(_0x362bbe.x + _0x1dc4f3 + 20, _0x57e1d2 - 15), _0x5830a7.stroke(), _0x5830a7.beginPath(), _0x5830a7.moveTo(_0x362bbe.x + _0x1dc4f3, _0x57e1d2), _0x5830a7.lineTo(_0x362bbe.x + _0x1dc4f3 - 20, _0x57e1d2 - 10), _0x5830a7.stroke());
    }
  }), _0x5830a7.restore());
}
function addLightRays(_0x5085cf, _0x10a31b, _0x21f62e) {
  (_0x5085cf.save(), _0x5085cf.globalCompositeOperation = "screen", _0x5085cf.globalAlpha = 0.15);
  for (let _0x559306 = 0; _0x559306 < 5; _0x559306++) {
    const _0xa3519 = _0x10a31b * 0.2 + _0x559306 / 4 * _0x10a31b * 0.6, _0x1f58ec = 15 + Math.random() * 25, _0x55d658 = _0x5085cf.createLinearGradient(_0xa3519, 0, _0xa3519, _0x21f62e);
    (_0x55d658.addColorStop(0, "rgba(255, 255, 220, 0.6)"), _0x55d658.addColorStop(0.5, "rgba(200, 230, 255, 0.3)"), _0x55d658.addColorStop(1, "transparent"), _0x5085cf.fillStyle = _0x55d658, _0x5085cf.fillRect(_0xa3519 - _0x1f58ec / 2, 0, _0x1f58ec, _0x21f62e));
  }
  _0x5085cf.restore();
}
function addCaustics(_0x14a8e8, _0x5a6608, _0x468f0f) {
  (_0x14a8e8.save(), _0x14a8e8.globalCompositeOperation = "screen", _0x14a8e8.globalAlpha = 0.1);
  for (let _0x5e7f62 = _0x468f0f * 0.3; _0x5e7f62 < _0x468f0f; _0x5e7f62 += 40) {
    for (let _0x5d0a46 = 0; _0x5d0a46 < _0x5a6608; _0x5d0a46 += 50) {
      const _0x30c742 = 0.3 + Math.sin(_0x5d0a46 * 0.02 + _0x5e7f62 * 0.01) * 0.3, _0x46cc54 = 20 + Math.sin(_0x5d0a46 * 0.03) * 10;
      (_0x14a8e8.fillStyle = 'rgba(255,\x20255,\x20255,\x20' + _0x30c742 + ')', _0x14a8e8.beginPath(), _0x14a8e8.arc(_0x5d0a46 + Math.sin(_0x5e7f62 * 0.02) * 10, _0x5e7f62, _0x46cc54, 0, Math.PI * 2), _0x14a8e8.fill());
    }
  }
  _0x14a8e8.restore();
}
function addCoralReefs(_0x45d185, _0x5aeccc, _0x508a40) {
  (_0x45d185.save(), _0x45d185.globalAlpha = 0.3);
  const _0x2c1b3d = [{
    x: _0x5aeccc * 0.05,
    y: _0x508a40 * 0.8,
    color: '#ff6b6b',
    size: 30
  }, {
    x: _0x5aeccc * 0.15,
    y: _0x508a40 * 0.75,
    color: "#ffa726",
    size: 25
  }, {
    x: _0x5aeccc * 0.85,
    y: _0x508a40 * 0.82,
    color: '#ab47bc',
    size: 35
  }, {
    x: _0x5aeccc * 0.95,
    y: _0x508a40 * 0.78,
    color: "#26c6da",
    size: 28
  }];
  (_0x2c1b3d.forEach(_0x24b91c => {
    _0x45d185.fillStyle = _0x24b91c.color;
    for (let _0x1097ac = 0; _0x1097ac < 5; _0x1097ac++) {
      const _0x57b4c8 = _0x1097ac / 5 * Math.PI * 2, _0x54f6b8 = _0x24b91c.size * (0.5 + Math.random() * 0.5);
      (_0x45d185.beginPath(), _0x45d185.moveTo(_0x24b91c.x, _0x24b91c.y), _0x45d185.lineTo(_0x24b91c.x + Math.cos(_0x57b4c8) * _0x54f6b8, _0x24b91c.y + Math.sin(_0x57b4c8) * _0x54f6b8), _0x45d185.stroke(), _0x45d185.beginPath(), _0x45d185.arc(_0x24b91c.x + Math.cos(_0x57b4c8) * _0x54f6b8, _0x24b91c.y + Math.sin(_0x57b4c8) * _0x54f6b8, _0x24b91c.size * 0.2, 0, Math.PI * 2), _0x45d185.fill());
    }
  }), _0x45d185.restore());
}
function addWaterDistortion(_0x4c6541, _0x189df8, _0x137d8e) {
  (_0x4c6541.save(), _0x4c6541.globalAlpha = 0.05);
  for (let _0x47d1f6 = 0; _0x47d1f6 < 8; _0x47d1f6++) {
    const _0x2f1ab5 = Math.random() * _0x189df8, _0x5e1181 = Math.random() * _0x137d8e, _0x10c756 = 50 + Math.random() * 100;
    (_0x4c6541.strokeStyle = "rgba(255, 255, 255, 0.3)", _0x4c6541.lineWidth = 1);
    for (let _0x3c23e2 = 0; _0x3c23e2 < 3; _0x3c23e2++) {
      const _0x52ec77 = _0x10c756 + _0x3c23e2 * 30;
      (_0x4c6541.beginPath(), _0x4c6541.arc(_0x2f1ab5, _0x5e1181, _0x52ec77, 0, Math.PI * 2), _0x4c6541.stroke());
    }
  }
  _0x4c6541.restore();
}
function drawAquaticBorder(_0x36e9c2, _0x2714f9, _0x4751af) {
  _0x36e9c2.save();
  const _0x34dc2a = _0x36e9c2.createLinearGradient(0, 0, _0x2714f9, _0x4751af);
  (_0x34dc2a.addColorStop(0, "#006994"), _0x34dc2a.addColorStop(0.3, "#0088cc"), _0x34dc2a.addColorStop(0.7, '#00aaff'), _0x34dc2a.addColorStop(1, "#006994"), _0x36e9c2.strokeStyle = _0x34dc2a, _0x36e9c2.lineWidth = 8, _0x36e9c2.shadowColor = "rgba(0, 150, 255, 0.6)", _0x36e9c2.shadowBlur = 20, _0x36e9c2.strokeRect(10, 10, _0x2714f9 - 20, _0x4751af - 20), _0x36e9c2.strokeStyle = "rgba(200, 230, 255, 0.6)", _0x36e9c2.lineWidth = 2, _0x36e9c2.shadowBlur = 10, _0x36e9c2.strokeRect(20, 20, _0x2714f9 - 40, _0x4751af - 40), _0x36e9c2.restore());
}
function addAquaSignature(_0x5699ce, _0x476d62, _0x44841e) {
  _0x5699ce.save();
  const _0x44091a = _0x476d62 - 110, _0x3ee4a5 = _0x44841e - 25;
  (_0x5699ce.font = 'italic\x2014px\x20\x22Arial\x22', _0x5699ce.fillStyle = "rgba(150, 220, 255, 0.9)", _0x5699ce.textAlign = "right", _0x5699ce.textBaseline = "bottom", _0x5699ce.shadowColor = "rgba(0, 150, 255, 0.5)", _0x5699ce.shadowBlur = 15, _0x5699ce.fillText('by\x20Silent\x20Wolf', _0x44091a, _0x3ee4a5));
  const _0x55adc1 = _0x5699ce.createRadialGradient(_0x44091a + 5, _0x3ee4a5 - 8, 0, _0x44091a + 5, _0x3ee4a5 - 8, 6);
  (_0x55adc1.addColorStop(0, "rgba(150, 200, 255, 0.8)"), _0x55adc1.addColorStop(1, "rgba(100, 150, 255, 0.4)"), _0x5699ce.fillStyle = _0x55adc1, _0x5699ce.beginPath(), _0x5699ce.arc(_0x44091a + 5, _0x3ee4a5 - 8, 6, 0, Math.PI * 2), _0x5699ce.fill(), _0x5699ce.fillStyle = "rgba(255, 255, 255, 0.8)", _0x5699ce.beginPath(), _0x5699ce.arc(_0x44091a + 3, _0x3ee4a5 - 10, 2, 0, Math.PI * 2), _0x5699ce.fill(), _0x5699ce.restore());
}
