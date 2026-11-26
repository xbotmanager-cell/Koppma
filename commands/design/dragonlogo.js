import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'dragonlogo',
  description: 'Create\x20epic\x20dragon\x20text\x20logos\x20with\x20fantasy\x20and\x20mystical\x20effects',
  async execute(_0x3e6e19, _0x2954a9, _0x195c18) {
    const _0x4ee0f5 = _0x2954a9.key.remoteJid;
    try {
      if (_0x195c18.length === 0) {
        await _0x3e6e19.sendMessage(_0x4ee0f5, {
          text: '╭┄〔 \x20' + DESIGN.DRAGON + " *DRAGON LOGO* 〕┄╮\n┆\n┆ ✦ *dragonlogo*\n┆   └─ dragonlogo <text>\n┆\n┆ ✦ *Example:*\n┆   └─ dragonlogo DRAGON\n┆   └─ dragonlogo FIRE\n┆   └─ dragonlogo WYVERN\n┆\n╰┄ " + getFooter(_0x2954a9.key.participant || _0x2954a9.key.remoteJid)
        }, {
          quoted: _0x2954a9
        });
        return;
      }
      const _0x1023be = _0x195c18.join('\x20');
      if (_0x1023be.length > 10) {
        await _0x3e6e19.sendMessage(_0x4ee0f5, {
          text: "╭┄〔 " + STATUS.ERROR + " *ERROR* 〕┄╮\n┆\n┆ ✦ Text too long!\n┆   └─ Maximum 10 characters\n┆   └─ Your text: \"" + _0x1023be + '\x22\x20(' + _0x1023be.length + '\x20chars)\x0a┆\x0a╰───'
        }, {
          quoted: _0x2954a9
        });
        return;
      }
      await _0x3e6e19.sendMessage(_0x4ee0f5, {
        react: {
          text: STATUS.LOADING,
          key: _0x2954a9.key
        }
      });
      const _0x24ac03 = await generateDragonLogo(_0x1023be);
      (await _0x3e6e19.sendMessage(_0x4ee0f5, {
        image: _0x24ac03,
        caption: DESIGN.DRAGON + " *Dragon Logo Generated!*\nText: " + _0x1023be + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x2954a9
      }), await _0x3e6e19.sendMessage(_0x4ee0f5, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x2954a9.key
        }
      }));
    } catch (_0x200f32) {
      (console.error(STATUS.ERROR + " [DRAGONLOGO] ERROR:", _0x200f32), await _0x3e6e19.sendMessage(_0x4ee0f5, {
        react: {
          text: STATUS.ERROR,
          key: _0x2954a9.key
        }
      }).catch(() => {}), await _0x3e6e19.sendMessage(_0x4ee0f5, {
        text: '╭┄〔 \x20' + STATUS.ERROR + " *ERROR* 〕┄╮\n┆\n┆ ✦ " + _0x200f32.message + '\x0a┆ \x20╰┄ \x20Please\x20try\x20again\x20with\x20shorter\x20text\x0a┆\x0a╰───'
      }, {
        quoted: _0x2954a9
      }));
    }
  }
};
async function generateDragonLogo(_0x56b65e) {
  const _0x14c264 = 800, _0x56d65b = 400, _0xc76cf3 = createCanvas(_0x14c264, _0x56d65b), _0x2e6e41 = _0xc76cf3.getContext('2d');
  createMysticalBackground(_0x2e6e41, _0x14c264, _0x56d65b);
  const _0x37024c = _0x14c264 * 0.7, _0x37d5f5 = _0x56d65b * 0.4;
  return (drawEpicDragon(_0x2e6e41, _0x37024c, _0x37d5f5), addDragonFire(_0x2e6e41, _0x37024c, _0x37d5f5), addDragonScales(_0x2e6e41, _0x37024c, _0x37d5f5), addDragonWings(_0x2e6e41, _0x37024c, _0x37d5f5), drawDragonText(_0x2e6e41, _0x56b65e, _0x14c264, _0x56d65b), addMagicRunes(_0x2e6e41, _0x14c264, _0x56d65b), addMysticalParticles(_0x2e6e41, _0x14c264, _0x56d65b), addTreasurePile(_0x2e6e41, _0x14c264, _0x56d65b), addFantasyElements(_0x2e6e41, _0x14c264, _0x56d65b), drawDragonBorder(_0x2e6e41, _0x14c264, _0x56d65b), addDragonSignature(_0x2e6e41, _0x14c264, _0x56d65b), addWatermark(_0x2e6e41, _0x14c264, _0x56d65b), _0xc76cf3.toBuffer('image/png'));
}
function createMysticalBackground(_0xcee475, _0xa3adeb, _0x9508a7) {
  const _0x303879 = _0xcee475.createLinearGradient(0, 0, 0, _0x9508a7);
  (_0x303879.addColorStop(0, "#1a0a2a"), _0x303879.addColorStop(0.3, "#2d1b4e"), _0x303879.addColorStop(0.6, '#4a2c7a'), _0x303879.addColorStop(1, "#1a0a2a"), _0xcee475.fillStyle = _0x303879, _0xcee475.fillRect(0, 0, _0xa3adeb, _0x9508a7), addMysticalMist(_0xcee475, _0xa3adeb, _0x9508a7), addAncientRuins(_0xcee475, _0xa3adeb, _0x9508a7));
}
function addMysticalMist(_0x5d3bce, _0x161d34, _0x5667e3) {
  (_0x5d3bce.save(), _0x5d3bce.globalAlpha = 0.3, _0x5d3bce.globalCompositeOperation = "screen");
  const _0xa11bd7 = [{
    x: _0x161d34 * 0.2,
    y: _0x5667e3 * 0.3,
    size: 120,
    color: [100, 50, 200]
  }, {
    x: _0x161d34 * 0.7,
    y: _0x5667e3 * 0.2,
    size: 100,
    color: [200, 50, 100]
  }, {
    x: _0x161d34 * 0.4,
    y: _0x5667e3 * 0.6,
    size: 110,
    color: [50, 150, 200]
  }, {
    x: _0x161d34 * 0.8,
    y: _0x5667e3 * 0.7,
    size: 90,
    color: [200, 150, 50]
  }];
  (_0xa11bd7.forEach(_0x65c1ed => {
    const [_0x16d94e, _0x306593, _0x1e30f6] = _0x65c1ed.color, _0x468992 = _0x5d3bce.createRadialGradient(_0x65c1ed.x, _0x65c1ed.y, 0, _0x65c1ed.x, _0x65c1ed.y, _0x65c1ed.size);
    (_0x468992.addColorStop(0, "rgba(" + _0x16d94e + ',\x20' + _0x306593 + ',\x20' + _0x1e30f6 + ", 0.6)"), _0x468992.addColorStop(1, "transparent"), _0x5d3bce.fillStyle = _0x468992, _0x5d3bce.beginPath(), _0x5d3bce.arc(_0x65c1ed.x, _0x65c1ed.y, _0x65c1ed.size, 0, Math.PI * 2), _0x5d3bce.fill());
  }), _0x5d3bce.restore());
}
function addAncientRuins(_0x2e98b0, _0x4cb272, _0x1795f3) {
  (_0x2e98b0.save(), _0x2e98b0.globalAlpha = 0.2, _0x2e98b0.strokeStyle = 'rgba(150,\x20150,\x20200,\x200.4)', _0x2e98b0.lineWidth = 2);
  for (let _0x251bec = 0; _0x251bec < 5; _0x251bec++) {
    const _0x319e4b = _0x4cb272 * 0.1 + _0x251bec * 80, _0x45c29a = _0x1795f3 * 0.6, _0x575f43 = 80 + Math.random() * 40;
    (_0x2e98b0.beginPath(), _0x2e98b0.moveTo(_0x319e4b, _0x45c29a), _0x2e98b0.lineTo(_0x319e4b, _0x45c29a - _0x575f43), _0x2e98b0.stroke(), _0x2e98b0.beginPath(), _0x2e98b0.arc(_0x319e4b, _0x45c29a - _0x575f43, 8, 0, Math.PI * 2), _0x2e98b0.stroke());
  }
  (_0x2e98b0.beginPath(), _0x2e98b0.moveTo(_0x4cb272 * 0.6, _0x1795f3 * 0.7), _0x2e98b0.quadraticCurveTo(_0x4cb272 * 0.7, _0x1795f3 * 0.5, _0x4cb272 * 0.8, _0x1795f3 * 0.7), _0x2e98b0.stroke(), _0x2e98b0.restore());
}
function drawEpicDragon(_0x5857c7, _0x45ef2e, _0x4b9521) {
  _0x5857c7.save();
  const _0x303c3d = _0x5857c7.createLinearGradient(_0x45ef2e - 50, _0x4b9521, _0x45ef2e + 50, _0x4b9521);
  (_0x303c3d.addColorStop(0, '#8B0000'), _0x303c3d.addColorStop(0.5, "#B22222"), _0x303c3d.addColorStop(1, "#DC143C"), _0x5857c7.strokeStyle = _0x303c3d, _0x5857c7.lineWidth = 15, _0x5857c7.lineCap = "round", _0x5857c7.lineJoin = "round", _0x5857c7.beginPath(), _0x5857c7.moveTo(_0x45ef2e - 80, _0x4b9521 + 20), _0x5857c7.bezierCurveTo(_0x45ef2e - 40, _0x4b9521 - 30, _0x45ef2e + 20, _0x4b9521 - 20, _0x45ef2e + 60, _0x4b9521 + 10), _0x5857c7.stroke(), _0x5857c7.beginPath(), _0x5857c7.moveTo(_0x45ef2e + 60, _0x4b9521 + 10), _0x5857c7.bezierCurveTo(_0x45ef2e + 80, _0x4b9521 - 10, _0x45ef2e + 100, _0x4b9521 - 5, _0x45ef2e + 110, _0x4b9521 + 15), _0x5857c7.stroke(), drawDragonHead(_0x5857c7, _0x45ef2e + 110, _0x4b9521 + 15), drawDragonLegs(_0x5857c7, _0x45ef2e, _0x4b9521), drawDragonTail(_0x5857c7, _0x45ef2e - 80, _0x4b9521 + 20), _0x5857c7.restore());
}
function drawDragonHead(_0x1bcd61, _0x52cdd8, _0x452e55) {
  (_0x1bcd61.fillStyle = "#B22222", _0x1bcd61.beginPath(), _0x1bcd61.ellipse(_0x52cdd8, _0x452e55, 20, 15, 0, 0, Math.PI * 2), _0x1bcd61.fill(), _0x1bcd61.fillStyle = "#8B0000", _0x1bcd61.beginPath(), _0x1bcd61.ellipse(_0x52cdd8 + 15, _0x452e55, 10, 8, 0, 0, Math.PI * 2), _0x1bcd61.fill(), _0x1bcd61.strokeStyle = "#FFD700", _0x1bcd61.lineWidth = 3, _0x1bcd61.lineCap = 'round', _0x1bcd61.beginPath(), _0x1bcd61.moveTo(_0x52cdd8 - 5, _0x452e55 - 12), _0x1bcd61.lineTo(_0x52cdd8 - 15, _0x452e55 - 25), _0x1bcd61.stroke(), _0x1bcd61.beginPath(), _0x1bcd61.moveTo(_0x52cdd8 + 5, _0x452e55 - 12), _0x1bcd61.lineTo(_0x52cdd8 + 15, _0x452e55 - 25), _0x1bcd61.stroke(), _0x1bcd61.fillStyle = '#FF4500', _0x1bcd61.beginPath(), _0x1bcd61.arc(_0x52cdd8 - 5, _0x452e55 - 5, 4, 0, Math.PI * 2), _0x1bcd61.fill(), _0x1bcd61.fillStyle = "#FFFF00", _0x1bcd61.beginPath(), _0x1bcd61.arc(_0x52cdd8 - 5, _0x452e55 - 5, 2, 0, Math.PI * 2), _0x1bcd61.fill(), _0x1bcd61.fillStyle = "#8B0000", _0x1bcd61.beginPath(), _0x1bcd61.arc(_0x52cdd8 + 20, _0x452e55 - 2, 2, 0, Math.PI * 2), _0x1bcd61.fill(), _0x1bcd61.beginPath(), _0x1bcd61.arc(_0x52cdd8 + 20, _0x452e55 + 2, 2, 0, Math.PI * 2), _0x1bcd61.fill());
}
function drawDragonLegs(_0x2b84a5, _0x2308d8, _0x252929) {
  (_0x2b84a5.strokeStyle = "#B22222", _0x2b84a5.lineWidth = 8, _0x2b84a5.lineCap = 'round', _0x2b84a5.beginPath(), _0x2b84a5.moveTo(_0x2308d8 + 20, _0x252929 + 5), _0x2b84a5.lineTo(_0x2308d8 + 25, _0x252929 + 30), _0x2b84a5.stroke(), _0x2b84a5.beginPath(), _0x2b84a5.moveTo(_0x2308d8 + 40, _0x252929 + 8), _0x2b84a5.lineTo(_0x2308d8 + 45, _0x252929 + 35), _0x2b84a5.stroke(), _0x2b84a5.beginPath(), _0x2b84a5.moveTo(_0x2308d8 - 40, _0x252929 + 15), _0x2b84a5.lineTo(_0x2308d8 - 35, _0x252929 + 40), _0x2b84a5.stroke(), _0x2b84a5.beginPath(), _0x2b84a5.moveTo(_0x2308d8 - 20, _0x252929 + 18), _0x2b84a5.lineTo(_0x2308d8 - 15, _0x252929 + 45), _0x2b84a5.stroke(), _0x2b84a5.strokeStyle = '#FFD700', _0x2b84a5.lineWidth = 2);
  const _0x2a334d = [{
    x: _0x2308d8 + 25,
    y: _0x252929 + 30
  }, {
    x: _0x2308d8 + 45,
    y: _0x252929 + 35
  }, {
    x: _0x2308d8 - 35,
    y: _0x252929 + 40
  }, {
    x: _0x2308d8 - 15,
    y: _0x252929 + 45
  }];
  _0x2a334d.forEach(_0x140ab3 => {
    for (let _0x5809c0 = 0; _0x5809c0 < 3; _0x5809c0++) {
      const _0x3b7e7c = -0.5 + _0x5809c0 * 0.5, _0x51e6a7 = 8;
      (_0x2b84a5.beginPath(), _0x2b84a5.moveTo(_0x140ab3.x, _0x140ab3.y), _0x2b84a5.lineTo(_0x140ab3.x + Math.cos(_0x3b7e7c) * _0x51e6a7, _0x140ab3.y + Math.sin(_0x3b7e7c) * _0x51e6a7), _0x2b84a5.stroke());
    }
  });
}
function drawDragonTail(_0x1384ff, _0x2b6fa2, _0x1cc06e) {
  (_0x1384ff.strokeStyle = '#B22222', _0x1384ff.lineWidth = 12, _0x1384ff.lineCap = "round", _0x1384ff.beginPath(), _0x1384ff.moveTo(_0x2b6fa2, _0x1cc06e), _0x1384ff.bezierCurveTo(_0x2b6fa2 - 40, _0x1cc06e + 20, _0x2b6fa2 - 60, _0x1cc06e - 10, _0x2b6fa2 - 80, _0x1cc06e + 5), _0x1384ff.stroke(), _0x1384ff.strokeStyle = "#FFD700", _0x1384ff.lineWidth = 4, _0x1384ff.beginPath(), _0x1384ff.moveTo(_0x2b6fa2 - 80, _0x1cc06e + 5), _0x1384ff.lineTo(_0x2b6fa2 - 95, _0x1cc06e - 5), _0x1384ff.stroke());
}
function addDragonWings(_0x42f117, _0x13dd92, _0x6d1cd6) {
  (_0x42f117.save(), _0x42f117.globalAlpha = 0.8);
  const _0x3f984c = _0x42f117.createLinearGradient(_0x13dd92 - 10, _0x6d1cd6 - 20, _0x13dd92 - 60, _0x6d1cd6 - 50);
  (_0x3f984c.addColorStop(0, "rgba(139, 0, 0, 0.9)"), _0x3f984c.addColorStop(1, "rgba(178, 34, 34, 0.6)"), _0x42f117.fillStyle = _0x3f984c, _0x42f117.beginPath(), _0x42f117.moveTo(_0x13dd92 - 10, _0x6d1cd6 - 20), _0x42f117.lineTo(_0x13dd92 - 40, _0x6d1cd6 - 60), _0x42f117.lineTo(_0x13dd92 - 60, _0x6d1cd6 - 30), _0x42f117.lineTo(_0x13dd92 - 30, _0x6d1cd6 - 10), _0x42f117.closePath(), _0x42f117.fill(), _0x42f117.strokeStyle = 'rgba(160,\x2040,\x2040,\x200.8)', _0x42f117.lineWidth = 2, _0x42f117.beginPath(), _0x42f117.moveTo(_0x13dd92 - 10, _0x6d1cd6 - 20), _0x42f117.lineTo(_0x13dd92 - 35, _0x6d1cd6 - 45), _0x42f117.stroke(), _0x42f117.beginPath(), _0x42f117.moveTo(_0x13dd92 - 15, _0x6d1cd6 - 18), _0x42f117.lineTo(_0x13dd92 - 45, _0x6d1cd6 - 35), _0x42f117.stroke(), _0x42f117.fillStyle = _0x3f984c, _0x42f117.beginPath(), _0x42f117.moveTo(_0x13dd92 + 5, _0x6d1cd6 - 15), _0x42f117.lineTo(_0x13dd92 + 25, _0x6d1cd6 - 55), _0x42f117.lineTo(_0x13dd92 + 45, _0x6d1cd6 - 25), _0x42f117.lineTo(_0x13dd92 + 20, _0x6d1cd6 - 5), _0x42f117.closePath(), _0x42f117.fill(), _0x42f117.restore());
}
function addDragonScales(_0x325612, _0x33d3bb, _0x42fdbd) {
  (_0x325612.save(), _0x325612.globalAlpha = 0.7);
  const _0x5eb820 = [{
    x: _0x33d3bb - 60,
    y: _0x42fdbd + 5
  }, {
    x: _0x33d3bb - 40,
    y: _0x42fdbd - 5
  }, {
    x: _0x33d3bb - 20,
    y: _0x42fdbd + 8
  }, {
    x: _0x33d3bb,
    y: _0x42fdbd - 2
  }, {
    x: _0x33d3bb + 20,
    y: _0x42fdbd + 6
  }, {
    x: _0x33d3bb + 40,
    y: _0x42fdbd - 3
  }];
  (_0x5eb820.forEach(_0x4a6cae => {
    (_0x325612.fillStyle = "#FF8C00", _0x325612.beginPath(), _0x325612.ellipse(_0x4a6cae.x, _0x4a6cae.y, 6, 4, 0, 0, Math.PI * 2), _0x325612.fill(), _0x325612.fillStyle = '#FFD700', _0x325612.beginPath(), _0x325612.ellipse(_0x4a6cae.x - 2, _0x4a6cae.y - 1, 2, 1, 0, 0, Math.PI * 2), _0x325612.fill());
  }), _0x325612.restore());
}
function addDragonFire(_0x42fb1e, _0x569512, _0x305117) {
  (_0x42fb1e.save(), _0x42fb1e.globalCompositeOperation = "screen");
  const _0x3152e0 = _0x569512 + 120, _0x1e761d = _0x305117 + 10, _0x6182c0 = _0x42fb1e.createLinearGradient(_0x3152e0, _0x1e761d, _0x3152e0 - 100, _0x1e761d);
  (_0x6182c0.addColorStop(0, "#FFFF00"), _0x6182c0.addColorStop(0.3, '#FF4500'), _0x6182c0.addColorStop(0.7, '#DC143C'), _0x6182c0.addColorStop(1, "#8B0000"), _0x42fb1e.strokeStyle = _0x6182c0, _0x42fb1e.lineWidth = 12, _0x42fb1e.lineCap = "round", _0x42fb1e.beginPath(), _0x42fb1e.moveTo(_0x3152e0, _0x1e761d), _0x42fb1e.bezierCurveTo(_0x3152e0 - 50, _0x1e761d - 20, _0x3152e0 - 80, _0x1e761d + 10, _0x3152e0 - 120, _0x1e761d - 5), _0x42fb1e.stroke());
  for (let _0x359eed = 0; _0x359eed < 3; _0x359eed++) {
    const _0x51737a = (Math.random() - 0.5) * 30;
    (_0x42fb1e.beginPath(), _0x42fb1e.moveTo(_0x3152e0, _0x1e761d), _0x42fb1e.bezierCurveTo(_0x3152e0 - 40, _0x1e761d - 15 + _0x51737a, _0x3152e0 - 70, _0x1e761d + 5 + _0x51737a, _0x3152e0 - 100, _0x1e761d - 10 + _0x51737a), _0x42fb1e.stroke());
  }
  (_0x42fb1e.strokeStyle = "rgba(255, 200, 0, 0.4)", _0x42fb1e.lineWidth = 25, _0x42fb1e.beginPath(), _0x42fb1e.moveTo(_0x3152e0, _0x1e761d), _0x42fb1e.bezierCurveTo(_0x3152e0 - 50, _0x1e761d - 20, _0x3152e0 - 80, _0x1e761d + 10, _0x3152e0 - 120, _0x1e761d - 5), _0x42fb1e.stroke(), addFireSparks(_0x42fb1e, _0x3152e0 - 60, _0x1e761d), _0x42fb1e.restore());
}
function addFireSparks(_0xe2b9, _0x282128, _0x58d27f) {
  (_0xe2b9.save(), _0xe2b9.globalCompositeOperation = 'screen');
  for (let _0x1dd0dd = 0; _0x1dd0dd < 15; _0x1dd0dd++) {
    const _0x360996 = _0x282128 + (Math.random() - 0.5) * 80, _0x15eac8 = _0x58d27f + (Math.random() - 0.5) * 40, _0x43bf50 = 1 + Math.random() * 4, _0x56825f = 0.3 + Math.random() * 0.7;
    (_0xe2b9.fillStyle = 'rgba(255,\x20255,\x20200,\x20' + _0x56825f + ')', _0xe2b9.beginPath(), _0xe2b9.arc(_0x360996, _0x15eac8, _0x43bf50, 0, Math.PI * 2), _0xe2b9.fill());
    const _0x4afbfc = 5 + Math.random() * 10, _0x29d6b5 = Math.random() * Math.PI * 2;
    (_0xe2b9.strokeStyle = "rgba(255, 200, 100, " + _0x56825f * 0.5 + ')', _0xe2b9.lineWidth = _0x43bf50 * 0.5, _0xe2b9.lineCap = "round", _0xe2b9.beginPath(), _0xe2b9.moveTo(_0x360996, _0x15eac8), _0xe2b9.lineTo(_0x360996 + Math.cos(_0x29d6b5) * _0x4afbfc, _0x15eac8 + Math.sin(_0x29d6b5) * _0x4afbfc), _0xe2b9.stroke());
  }
  _0xe2b9.restore();
}
function drawDragonText(_0x176618, _0x3db511, _0x5557db, _0x2882e1) {
  const _0x5b4d19 = _0x5557db * 0.35, _0x4ad4da = _0x2882e1 * 0.6;
  (_0x176618.save(), _0x176618.shadowColor = "rgba(0, 0, 0, 0.7)", _0x176618.shadowBlur = 15, _0x176618.shadowOffsetX = 5, _0x176618.shadowOffsetY = 5);
  const _0x421db2 = _0x176618.createLinearGradient(_0x5b4d19 - 100, _0x4ad4da - 50, _0x5b4d19 + 100, _0x4ad4da + 50);
  (_0x421db2.addColorStop(0, "#FFD700"), _0x421db2.addColorStop(0.3, '#FF8C00'), _0x421db2.addColorStop(0.7, '#B22222'), _0x421db2.addColorStop(1, "#8B0000"), _0x176618.font = 'bold\x2068px\x20\x22Arial\x22', _0x176618.textAlign = 'center', _0x176618.textBaseline = "middle", _0x176618.fillStyle = _0x421db2, _0x176618.fillText(_0x3db511.toUpperCase(), _0x5b4d19, _0x4ad4da), _0x176618.shadowColor = "transparent", _0x176618.shadowBlur = 0, _0x176618.shadowOffsetX = 0, _0x176618.shadowOffsetY = 0, _0x176618.strokeStyle = "rgba(255, 215, 0, 0.8)", _0x176618.lineWidth = 3, _0x176618.strokeText(_0x3db511.toUpperCase(), _0x5b4d19, _0x4ad4da), addTextScaleTexture(_0x176618, _0x3db511, _0x5b4d19, _0x4ad4da), _0x176618.restore());
}
function addTextScaleTexture(_0x5b36a6, _0x196f3a, _0x24c019, _0x188b13) {
  (_0x5b36a6.save(), _0x5b36a6.globalCompositeOperation = "overlay", _0x5b36a6.globalAlpha = 0.3);
  const _0x942253 = _0x5b36a6.measureText(_0x196f3a.toUpperCase()), _0x1f548a = _0x942253.width, _0x3891b5 = 68;
  for (let _0x1881d8 = _0x24c019 - _0x1f548a / 2; _0x1881d8 < _0x24c019 + _0x1f548a / 2; _0x1881d8 += 12) {
    for (let _0xece966 = _0x188b13 - _0x3891b5 / 2; _0xece966 < _0x188b13 + _0x3891b5 / 2; _0xece966 += 10) {
      Math.random() > 0.7 && (_0x5b36a6.fillStyle = "rgba(255, 215, 0, 0.4)", _0x5b36a6.beginPath(), _0x5b36a6.ellipse(_0x1881d8, _0xece966, 4, 2, 0, 0, Math.PI * 2), _0x5b36a6.fill());
    }
  }
  _0x5b36a6.restore();
}
function addMagicRunes(_0x2cc0a3, _0x222c67, _0x35708d) {
  (_0x2cc0a3.save(), _0x2cc0a3.globalAlpha = 0.6, _0x2cc0a3.strokeStyle = "rgba(100, 200, 255, 0.8)", _0x2cc0a3.lineWidth = 2);
  const _0x4ad98e = [{
    x: _0x222c67 * 0.2,
    y: _0x35708d * 0.3
  }, {
    x: _0x222c67 * 0.8,
    y: _0x35708d * 0.2
  }, {
    x: _0x222c67 * 0.3,
    y: _0x35708d * 0.8
  }, {
    x: _0x222c67 * 0.7,
    y: _0x35708d * 0.7
  }];
  (_0x4ad98e.forEach(_0x5a9ee4 => {
    (_0x2cc0a3.beginPath(), _0x2cc0a3.arc(_0x5a9ee4.x, _0x5a9ee4.y, 15, 0, Math.PI * 2), _0x2cc0a3.stroke(), _0x2cc0a3.beginPath(), _0x2cc0a3.moveTo(_0x5a9ee4.x - 8, _0x5a9ee4.y - 8), _0x2cc0a3.lineTo(_0x5a9ee4.x + 8, _0x5a9ee4.y + 8), _0x2cc0a3.stroke(), _0x2cc0a3.beginPath(), _0x2cc0a3.moveTo(_0x5a9ee4.x + 8, _0x5a9ee4.y - 8), _0x2cc0a3.lineTo(_0x5a9ee4.x - 8, _0x5a9ee4.y + 8), _0x2cc0a3.stroke(), _0x2cc0a3.strokeStyle = "rgba(150, 220, 255, 0.4)", _0x2cc0a3.lineWidth = 8, _0x2cc0a3.beginPath(), _0x2cc0a3.arc(_0x5a9ee4.x, _0x5a9ee4.y, 20, 0, Math.PI * 2), _0x2cc0a3.stroke(), _0x2cc0a3.strokeStyle = "rgba(100, 200, 255, 0.8)", _0x2cc0a3.lineWidth = 2);
  }), _0x2cc0a3.restore());
}
function addMysticalParticles(_0x18adf8, _0x1d7086, _0x4e4373) {
  (_0x18adf8.save(), _0x18adf8.globalCompositeOperation = "screen");
  for (let _0x4adb75 = 0; _0x4adb75 < 40; _0x4adb75++) {
    const _0x43a737 = Math.random() * _0x1d7086, _0x3a2bd9 = Math.random() * _0x4e4373, _0x50c02c = 1 + Math.random() * 4, _0x4238cd = 200 + Math.random() * 160;
    (_0x18adf8.fillStyle = "hsla(" + _0x4238cd + ", 100%, 70%, 0.7)", _0x18adf8.beginPath(), _0x18adf8.arc(_0x43a737, _0x3a2bd9, _0x50c02c, 0, Math.PI * 2), _0x18adf8.fill(), _0x18adf8.fillStyle = "hsla(" + _0x4238cd + ", 100%, 70%, 0.3)", _0x18adf8.beginPath(), _0x18adf8.arc(_0x43a737, _0x3a2bd9, _0x50c02c * 2, 0, Math.PI * 2), _0x18adf8.fill());
  }
  _0x18adf8.restore();
}
function addTreasurePile(_0x259e4, _0x35aca1, _0x2ccb22) {
  (_0x259e4.save(), _0x259e4.globalAlpha = 0.8);
  const _0x5a6bbb = _0x35aca1 * 0.2, _0x135dcb = _0x2ccb22 * 0.8;
  for (let _0x566c58 = 0; _0x566c58 < 20; _0x566c58++) {
    const _0x114a77 = _0x5a6bbb + (Math.random() - 0.5) * 60, _0x4ee34f = _0x135dcb + (Math.random() - 0.5) * 30, _0x412fac = 3 + Math.random() * 5;
    (_0x259e4.fillStyle = "#FFD700", _0x259e4.beginPath(), _0x259e4.arc(_0x114a77, _0x4ee34f, _0x412fac, 0, Math.PI * 2), _0x259e4.fill(), _0x259e4.fillStyle = '#FFFF00', _0x259e4.beginPath(), _0x259e4.arc(_0x114a77 - _0x412fac * 0.3, _0x4ee34f - _0x412fac * 0.3, _0x412fac * 0.5, 0, Math.PI * 2), _0x259e4.fill());
  }
  const _0x47f04c = ["#FF0000", "#00FF00", "#0000FF", "#FF00FF"];
  for (let _0x22e0f4 = 0; _0x22e0f4 < 5; _0x22e0f4++) {
    const _0x1ad743 = _0x5a6bbb + (Math.random() - 0.5) * 50, _0xb4e939 = _0x135dcb + (Math.random() - 0.5) * 20, _0x1e9b69 = 4 + Math.random() * 3, _0x5db835 = _0x47f04c[Math.floor(Math.random() * _0x47f04c.length)];
    (_0x259e4.fillStyle = _0x5db835, _0x259e4.beginPath(), _0x259e4.moveTo(_0x1ad743, _0xb4e939 - _0x1e9b69), _0x259e4.lineTo(_0x1ad743 + _0x1e9b69, _0xb4e939), _0x259e4.lineTo(_0x1ad743, _0xb4e939 + _0x1e9b69), _0x259e4.lineTo(_0x1ad743 - _0x1e9b69, _0xb4e939), _0x259e4.closePath(), _0x259e4.fill(), _0x259e4.fillStyle = "#FFFFFF", _0x259e4.beginPath(), _0x259e4.moveTo(_0x1ad743 - _0x1e9b69 * 0.3, _0xb4e939 - _0x1e9b69 * 0.3), _0x259e4.lineTo(_0x1ad743, _0xb4e939 - _0x1e9b69 * 0.1), _0x259e4.lineTo(_0x1ad743 - _0x1e9b69 * 0.1, _0xb4e939), _0x259e4.closePath(), _0x259e4.fill());
  }
  _0x259e4.restore();
}
function addFantasyElements(_0x1d8d2c, _0x3aca43, _0x28d075) {
  (_0x1d8d2c.save(), _0x1d8d2c.globalAlpha = 0.4, _0x1d8d2c.strokeStyle = 'rgba(100,\x20100,\x20150,\x200.6)', _0x1d8d2c.lineWidth = 3);
  for (let _0x172a16 = 0; _0x172a16 < 5; _0x172a16++) {
    const _0x26753c = _0x172a16 * 60, _0x5e7a6c = 30 + Math.random() * 20;
    (_0x1d8d2c.beginPath(), _0x1d8d2c.moveTo(_0x26753c, _0x28d075 * 0.7), _0x1d8d2c.lineTo(_0x26753c + 30, _0x28d075 * 0.7 - _0x5e7a6c), _0x1d8d2c.lineTo(_0x26753c + 60, _0x28d075 * 0.7), _0x1d8d2c.stroke());
  }
  _0x1d8d2c.restore();
}
function drawDragonBorder(_0x394278, _0x569657, _0x4cef47) {
  _0x394278.save();
  const _0x59a508 = _0x394278.createLinearGradient(0, 0, _0x569657, 0);
  (_0x59a508.addColorStop(0, '#8B0000'), _0x59a508.addColorStop(0.3, "#B22222"), _0x59a508.addColorStop(0.5, "#FF8C00"), _0x59a508.addColorStop(0.7, "#B22222"), _0x59a508.addColorStop(1, "#8B0000"), _0x394278.strokeStyle = _0x59a508, _0x394278.lineWidth = 10, _0x394278.shadowColor = "rgba(255, 100, 0, 0.6)", _0x394278.shadowBlur = 20, _0x394278.strokeRect(10, 10, _0x569657 - 20, _0x4cef47 - 20), _0x394278.strokeStyle = "rgba(255, 215, 0, 0.6)", _0x394278.lineWidth = 3, _0x394278.shadowBlur = 15, _0x394278.strokeRect(20, 20, _0x569657 - 40, _0x4cef47 - 40), addDragonClawMarks(_0x394278, _0x569657, _0x4cef47), _0x394278.restore());
}
function addDragonClawMarks(_0x161d95, _0x4772bc, _0x3e1286) {
  (_0x161d95.save(), _0x161d95.strokeStyle = "rgba(255, 215, 0, 0.8)", _0x161d95.lineWidth = 2, _0x161d95.lineCap = "round");
  const _0x52be60 = [{
    x: 25,
    y: 25
  }, {
    x: _0x4772bc - 25,
    y: 25
  }, {
    x: 25,
    y: _0x3e1286 - 25
  }, {
    x: _0x4772bc - 25,
    y: _0x3e1286 - 25
  }];
  (_0x52be60.forEach(_0x2dd94b => {
    for (let _0x1a13b1 = 0; _0x1a13b1 < 3; _0x1a13b1++) {
      const _0x3e9ece = -0.3 + _0x1a13b1 * 0.3, _0x25f4fc = 15;
      (_0x161d95.beginPath(), _0x161d95.moveTo(_0x2dd94b.x, _0x2dd94b.y), _0x161d95.lineTo(_0x2dd94b.x + Math.cos(_0x3e9ece) * _0x25f4fc, _0x2dd94b.y + Math.sin(_0x3e9ece) * _0x25f4fc), _0x161d95.stroke());
    }
  }), _0x161d95.restore());
}
function addDragonSignature(_0x49cfd7, _0x1440cd, _0x5cc6c4) {
  _0x49cfd7.save();
  const _0x39968c = _0x1440cd - 110, _0xa9aeb4 = _0x5cc6c4 - 25;
  (_0x49cfd7.font = "italic 14px \"Arial\"", _0x49cfd7.fillStyle = "rgba(255, 215, 0, 0.9)", _0x49cfd7.textAlign = "right", _0x49cfd7.textBaseline = "bottom", _0x49cfd7.shadowColor = "rgba(255, 100, 0, 0.6)", _0x49cfd7.shadowBlur = 10, _0x49cfd7.fillText('by Lupin Stanley', _0x39968c, _0xa9aeb4), _0x49cfd7.fillStyle = "#FF8C00", _0x49cfd7.beginPath(), _0x49cfd7.ellipse(_0x39968c + 5, _0xa9aeb4 - 8, 6, 3, 0, 0, Math.PI * 2), _0x49cfd7.fill(), _0x49cfd7.fillStyle = "#FFD700", _0x49cfd7.beginPath(), _0x49cfd7.ellipse(_0x39968c + 3, _0xa9aeb4 - 9, 2, 1, 0, 0, Math.PI * 2), _0x49cfd7.fill(), _0x49cfd7.restore());
}
