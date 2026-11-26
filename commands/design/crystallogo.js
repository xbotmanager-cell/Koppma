import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "crystallogo",
  description: 'Create\x20stunning\x20crystal\x20text\x20logos\x20with\x20gemstone\x20and\x20refractive\x20effects',
  async execute(_0x499f0c, _0x30628f, _0x496023) {
    const _0x174e59 = _0x30628f.key.remoteJid;
    try {
      if (_0x496023.length === 0) {
        await _0x499f0c.sendMessage(_0x174e59, {
          text: "╭┄〔 " + DESIGN.CRYSTAL + " *CRYSTAL LOGO* 〕┄╮\n┆\n┆ ✦ *crystallogo*\n┆   └─ crystallogo <text>\n┆\n┆ ✦ *Example:*\n┆   └─ crystallogo CRYSTAL\n┆   └─ crystallogo GEM\n┆   └─ crystallogo DIAMOND\n┆\n╰┄ " + getFooter(_0x30628f.key.participant || _0x30628f.key.remoteJid)
        }, {
          quoted: _0x30628f
        });
        return;
      }
      const _0x5ccda1 = _0x496023.join('\x20');
      if (_0x5ccda1.length > 10) {
        await _0x499f0c.sendMessage(_0x174e59, {
          text: "╭┄〔 " + STATUS.ERROR + " *ERROR* 〕┄╮\n┆\n┆ ✦ Text too long!\n┆   └─ Maximum 10 characters\n┆   └─ Your text: \"" + _0x5ccda1 + "\" (" + _0x5ccda1.length + " chars)\n┆\n╰───"
        }, {
          quoted: _0x30628f
        });
        return;
      }
      await _0x499f0c.sendMessage(_0x174e59, {
        react: {
          text: STATUS.LOADING,
          key: _0x30628f.key
        }
      });
      const _0x455e13 = await generateCrystalLogo(_0x5ccda1);
      (await _0x499f0c.sendMessage(_0x174e59, {
        image: _0x455e13,
        caption: DESIGN.CRYSTAL + '\x20*Crystal\x20Logo\x20Generated!*\x0aText:\x20' + _0x5ccda1 + '\x0a\x0a_Created\x20by\x20' + getBotName() + '_'
      }, {
        quoted: _0x30628f
      }), await _0x499f0c.sendMessage(_0x174e59, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x30628f.key
        }
      }));
    } catch (_0x5a927f) {
      (console.error(STATUS.ERROR + " [CRYSTALLOGO] ERROR:", _0x5a927f), await _0x499f0c.sendMessage(_0x174e59, {
        react: {
          text: STATUS.ERROR,
          key: _0x30628f.key
        }
      }).catch(() => {}), await _0x499f0c.sendMessage(_0x174e59, {
        text: '╭┄〔 \x20' + STATUS.ERROR + '\x20*ERROR*\x20 〕┄╮\x0a┆\x0a┆ ✦ \x20' + _0x5a927f.message + '\x0a┆ \x20╰┄ \x20Please\x20try\x20again\x20with\x20shorter\x20text\x0a┆\x0a╰───'
      }, {
        quoted: _0x30628f
      }));
    }
  }
};
async function generateCrystalLogo(_0x51f44e) {
  const _0x561595 = 800, _0x4324c5 = 400, _0x152777 = createCanvas(_0x561595, _0x4324c5), _0x127916 = _0x152777.getContext('2d');
  createCrystalCave(_0x127916, _0x561595, _0x4324c5);
  const _0x1c7e1a = _0x561595 * 0.75, _0x259087 = _0x4324c5 * 0.6;
  return (drawCrystalCluster(_0x127916, _0x1c7e1a, _0x259087), addCrystalLightBeams(_0x127916, _0x1c7e1a, _0x259087), addCrystalRefractions(_0x127916, _0x561595, _0x4324c5), drawCrystalText(_0x127916, _0x51f44e, _0x561595, _0x4324c5), addFloatingShards(_0x127916, _0x561595, _0x4324c5), addCrystalDust(_0x127916, _0x561595, _0x4324c5), addGemstoneHighlights(_0x127916, _0x561595, _0x4324c5), addRainbowRefractions(_0x127916, _0x561595, _0x4324c5), drawCrystalBorder(_0x127916, _0x561595, _0x4324c5), addCrystalSignature(_0x127916, _0x561595, _0x4324c5), addWatermark(_0x127916, _0x561595, _0x4324c5), _0x152777.toBuffer('image/png'));
}
function createCrystalCave(_0x41ce92, _0x4b4c62, _0x3b6a47) {
  const _0x5256c3 = _0x41ce92.createLinearGradient(0, 0, 0, _0x3b6a47);
  (_0x5256c3.addColorStop(0, '#0a0a2a'), _0x5256c3.addColorStop(0.3, "#1a1a4a"), _0x5256c3.addColorStop(0.6, "#2d2d6a"), _0x5256c3.addColorStop(1, "#0a0a2a"), _0x41ce92.fillStyle = _0x5256c3, _0x41ce92.fillRect(0, 0, _0x4b4c62, _0x3b6a47), addBackgroundCrystals(_0x41ce92, _0x4b4c62, _0x3b6a47), addCrystalPatterns(_0x41ce92, _0x4b4c62, _0x3b6a47));
}
function addBackgroundCrystals(_0xe8f188, _0x393764, _0xdd090a) {
  (_0xe8f188.save(), _0xe8f188.globalAlpha = 0.3);
  for (let _0xca7187 = 0; _0xca7187 < 8; _0xca7187++) {
    const _0x3fa215 = Math.random() * _0x393764, _0x5de60f = _0xdd090a * 0.7 + Math.random() * _0xdd090a * 0.3, _0x408f83 = 20 + Math.random() * 40, _0x13989b = 200 + Math.random() * 160;
    drawBackgroundCrystal(_0xe8f188, _0x3fa215, _0x5de60f, _0x408f83, _0x13989b);
  }
  _0xe8f188.restore();
}
function drawBackgroundCrystal(_0x4d8f08, _0xf72281, _0x3e3943, _0x4a09bf, _0x2d2ab4) {
  (_0x4d8f08.save(), _0x4d8f08.translate(_0xf72281, _0x3e3943), _0x4d8f08.rotate(Math.random() * Math.PI));
  const _0x1587b1 = _0x4d8f08.createLinearGradient(-_0x4a09bf, -_0x4a09bf, _0x4a09bf, _0x4a09bf);
  (_0x1587b1.addColorStop(0, "hsla(" + _0x2d2ab4 + ", 80%, 50%, 0.4)"), _0x1587b1.addColorStop(0.5, "hsla(" + _0x2d2ab4 + ", 100%, 70%, 0.6)"), _0x1587b1.addColorStop(1, "hsla(" + _0x2d2ab4 + ", 80%, 50%, 0.4)"), _0x4d8f08.fillStyle = _0x1587b1, _0x4d8f08.beginPath(), _0x4d8f08.moveTo(0, -_0x4a09bf), _0x4d8f08.lineTo(_0x4a09bf * 0.7, 0), _0x4d8f08.lineTo(0, _0x4a09bf), _0x4d8f08.lineTo(-_0x4a09bf * 0.7, 0), _0x4d8f08.closePath(), _0x4d8f08.fill(), _0x4d8f08.strokeStyle = "hsla(" + _0x2d2ab4 + ", 100%, 80%, 0.6)", _0x4d8f08.lineWidth = 1, _0x4d8f08.beginPath(), _0x4d8f08.moveTo(0, -_0x4a09bf), _0x4d8f08.lineTo(0, _0x4a09bf), _0x4d8f08.stroke(), _0x4d8f08.beginPath(), _0x4d8f08.moveTo(-_0x4a09bf * 0.7, 0), _0x4d8f08.lineTo(_0x4a09bf * 0.7, 0), _0x4d8f08.stroke(), _0x4d8f08.restore());
}
function addCrystalPatterns(_0x439e43, _0xa8e20b, _0x20d43b) {
  (_0x439e43.save(), _0x439e43.globalAlpha = 0.1, _0x439e43.strokeStyle = "rgba(100, 150, 255, 0.4)", _0x439e43.lineWidth = 1);
  const _0x39d58b = 30;
  for (let _0x590836 = 0; _0x590836 < _0x20d43b; _0x590836 += _0x39d58b * 1.5) {
    for (let _0x407915 = 0; _0x407915 < _0xa8e20b; _0x407915 += _0x39d58b * 1.732) {
      drawHexagon(_0x439e43, _0x407915 + (_0x590836 % (_0x39d58b * 3) ? _0x39d58b * 0.866 : 0), _0x590836, _0x39d58b);
    }
  }
  _0x439e43.restore();
}
function drawHexagon(_0x2e52ad, _0x232627, _0x5a9cbc, _0x57e10e) {
  _0x2e52ad.beginPath();
  for (let _0x280ac1 = 0; _0x280ac1 < 6; _0x280ac1++) {
    const _0x1b399c = _0x280ac1 * Math.PI / 3, _0x57fc17 = _0x232627 + Math.cos(_0x1b399c) * _0x57e10e, _0x9bcae9 = _0x5a9cbc + Math.sin(_0x1b399c) * _0x57e10e;
    _0x280ac1 === 0 ? _0x2e52ad.moveTo(_0x57fc17, _0x9bcae9) : _0x2e52ad.lineTo(_0x57fc17, _0x9bcae9);
  }
  (_0x2e52ad.closePath(), _0x2e52ad.stroke());
}
function drawCrystalCluster(_0x34d4de, _0x334e57, _0x16df13) {
  (_0x34d4de.save(), drawMainCrystal(_0x34d4de, _0x334e57, _0x16df13 - 30, 50, 220));
  const _0x40e7a7 = [{
    x: -40,
    y: -10,
    size: 30,
    hue: 200,
    rotation: -0.3
  }, {
    x: 35,
    y: -15,
    size: 25,
    hue: 240,
    rotation: 0.2
  }, {
    x: -25,
    y: 40,
    size: 20,
    hue: 180,
    rotation: -0.1
  }, {
    x: 30,
    y: 35,
    size: 22,
    hue: 260,
    rotation: 0.4
  }, {
    x: 0,
    y: 50,
    size: 18,
    hue: 220,
    rotation: 0
  }];
  _0x40e7a7.forEach(_0x210392 => {
    drawSingleCrystal(_0x34d4de, _0x334e57 + _0x210392.x, _0x16df13 + _0x210392.y, _0x210392.size, _0x210392.hue, _0x210392.rotation);
  });
  const _0x3682e8 = _0x34d4de.createRadialGradient(_0x334e57, _0x16df13 + 60, 0, _0x334e57, _0x16df13 + 60, 40);
  (_0x3682e8.addColorStop(0, 'rgba(50,\x2050,\x20100,\x200.8)'), _0x3682e8.addColorStop(1, "rgba(20, 20, 50, 0.4)"), _0x34d4de.fillStyle = _0x3682e8, _0x34d4de.beginPath(), _0x34d4de.arc(_0x334e57, _0x16df13 + 60, 40, 0, Math.PI * 2), _0x34d4de.fill(), _0x34d4de.restore());
}
function drawMainCrystal(_0x1c4c33, _0x3c9b6b, _0xf2e95e, _0x3a66d5, _0x4d75f1) {
  (_0x1c4c33.save(), _0x1c4c33.translate(_0x3c9b6b, _0xf2e95e));
  const _0xc67318 = _0x1c4c33.createLinearGradient(-_0x3a66d5, -_0x3a66d5, _0x3a66d5, _0x3a66d5);
  (_0xc67318.addColorStop(0, "hsla(" + _0x4d75f1 + ", 100%, 40%, 0.9)"), _0xc67318.addColorStop(0.3, 'hsla(' + _0x4d75f1 + ", 100%, 70%, 0.95)"), _0xc67318.addColorStop(0.7, 'hsla(' + _0x4d75f1 + ", 100%, 60%, 0.9)"), _0xc67318.addColorStop(1, "hsla(" + _0x4d75f1 + ", 100%, 40%, 0.8)"), _0x1c4c33.fillStyle = _0xc67318, _0x1c4c33.beginPath(), _0x1c4c33.moveTo(0, -_0x3a66d5), _0x1c4c33.lineTo(_0x3a66d5 * 0.8, -_0x3a66d5 * 0.3), _0x1c4c33.lineTo(_0x3a66d5 * 0.8, _0x3a66d5 * 0.5), _0x1c4c33.lineTo(0, _0x3a66d5), _0x1c4c33.lineTo(-_0x3a66d5 * 0.8, _0x3a66d5 * 0.5), _0x1c4c33.lineTo(-_0x3a66d5 * 0.8, -_0x3a66d5 * 0.3), _0x1c4c33.closePath(), _0x1c4c33.fill(), addCrystalFacets(_0x1c4c33, _0x3a66d5, _0x4d75f1));
  const _0x2f3a0c = _0x1c4c33.createRadialGradient(0, 0, 0, 0, 0, _0x3a66d5 * 0.6);
  (_0x2f3a0c.addColorStop(0, 'hsla(' + _0x4d75f1 + ", 100%, 80%, 0.6)"), _0x2f3a0c.addColorStop(1, "transparent"), _0x1c4c33.fillStyle = _0x2f3a0c, _0x1c4c33.beginPath(), _0x1c4c33.arc(0, 0, _0x3a66d5 * 0.6, 0, Math.PI * 2), _0x1c4c33.fill(), _0x1c4c33.restore());
}
function addCrystalFacets(_0x14b644, _0x108a3d, _0x4fbf61) {
  (_0x14b644.strokeStyle = "hsla(" + _0x4fbf61 + ", 100%, 90%, 0.8)", _0x14b644.lineWidth = 2, _0x14b644.beginPath(), _0x14b644.moveTo(0, -_0x108a3d), _0x14b644.lineTo(0, _0x108a3d), _0x14b644.stroke(), _0x14b644.beginPath(), _0x14b644.moveTo(-_0x108a3d * 0.8, -_0x108a3d * 0.3), _0x14b644.lineTo(_0x108a3d * 0.8, _0x108a3d * 0.5), _0x14b644.stroke(), _0x14b644.beginPath(), _0x14b644.moveTo(_0x108a3d * 0.8, -_0x108a3d * 0.3), _0x14b644.lineTo(-_0x108a3d * 0.8, _0x108a3d * 0.5), _0x14b644.stroke(), _0x14b644.fillStyle = "hsla(" + _0x4fbf61 + ',\x20100%,\x2095%,\x200.6)', _0x14b644.beginPath(), _0x14b644.moveTo(0, -_0x108a3d), _0x14b644.lineTo(_0x108a3d * 0.3, -_0x108a3d * 0.6), _0x14b644.lineTo(-_0x108a3d * 0.3, -_0x108a3d * 0.6), _0x14b644.closePath(), _0x14b644.fill(), _0x14b644.beginPath(), _0x14b644.moveTo(_0x108a3d * 0.8, -_0x108a3d * 0.3), _0x14b644.lineTo(_0x108a3d * 0.5, 0), _0x14b644.lineTo(_0x108a3d * 0.8, _0x108a3d * 0.2), _0x14b644.closePath(), _0x14b644.fill(), _0x14b644.beginPath(), _0x14b644.moveTo(-_0x108a3d * 0.8, -_0x108a3d * 0.3), _0x14b644.lineTo(-_0x108a3d * 0.5, 0), _0x14b644.lineTo(-_0x108a3d * 0.8, _0x108a3d * 0.2), _0x14b644.closePath(), _0x14b644.fill());
}
function drawSingleCrystal(_0x3ab5e7, _0x25163a, _0x2e4822, _0x388432, _0xebf2c, _0x5fceec) {
  (_0x3ab5e7.save(), _0x3ab5e7.translate(_0x25163a, _0x2e4822), _0x3ab5e7.rotate(_0x5fceec));
  const _0x37c185 = _0x3ab5e7.createLinearGradient(-_0x388432, -_0x388432, _0x388432, _0x388432);
  (_0x37c185.addColorStop(0, "hsla(" + _0xebf2c + ", 100%, 50%, 0.8)"), _0x37c185.addColorStop(0.5, "hsla(" + _0xebf2c + ", 100%, 70%, 0.9)"), _0x37c185.addColorStop(1, "hsla(" + _0xebf2c + ", 100%, 50%, 0.8)"), _0x3ab5e7.fillStyle = _0x37c185, _0x3ab5e7.beginPath(), _0x3ab5e7.moveTo(0, -_0x388432), _0x3ab5e7.lineTo(_0x388432 * 0.6, 0), _0x3ab5e7.lineTo(0, _0x388432), _0x3ab5e7.lineTo(-_0x388432 * 0.6, 0), _0x3ab5e7.closePath(), _0x3ab5e7.fill(), _0x3ab5e7.strokeStyle = 'hsla(' + _0xebf2c + ", 100%, 90%, 0.7)", _0x3ab5e7.lineWidth = 1, _0x3ab5e7.beginPath(), _0x3ab5e7.moveTo(0, -_0x388432), _0x3ab5e7.lineTo(0, _0x388432), _0x3ab5e7.stroke(), _0x3ab5e7.beginPath(), _0x3ab5e7.moveTo(-_0x388432 * 0.6, 0), _0x3ab5e7.lineTo(_0x388432 * 0.6, 0), _0x3ab5e7.stroke(), _0x3ab5e7.fillStyle = "hsla(" + _0xebf2c + ", 100%, 95%, 0.5)", _0x3ab5e7.beginPath(), _0x3ab5e7.moveTo(0, -_0x388432), _0x3ab5e7.lineTo(_0x388432 * 0.2, -_0x388432 * 0.3), _0x3ab5e7.lineTo(-_0x388432 * 0.2, -_0x388432 * 0.3), _0x3ab5e7.closePath(), _0x3ab5e7.fill(), _0x3ab5e7.restore());
}
function addCrystalLightBeams(_0x109291, _0x50c34c, _0x289ebd) {
  (_0x109291.save(), _0x109291.globalCompositeOperation = "screen", _0x109291.globalAlpha = 0.4);
  for (let _0x5009e1 = 0; _0x5009e1 < 12; _0x5009e1++) {
    const _0x187be0 = _0x5009e1 / 12 * Math.PI * 2, _0x23188d = 100 + Math.random() * 80, _0x2ab98a = 200 + Math.random() * 160, _0x2d8768 = _0x109291.createLinearGradient(_0x50c34c, _0x289ebd, _0x50c34c + Math.cos(_0x187be0) * _0x23188d, _0x289ebd + Math.sin(_0x187be0) * _0x23188d);
    (_0x2d8768.addColorStop(0, 'hsla(' + _0x2ab98a + ", 100%, 70%, 0.8)"), _0x2d8768.addColorStop(0.7, "hsla(" + _0x2ab98a + ", 100%, 50%, 0.4)"), _0x2d8768.addColorStop(1, "transparent"), _0x109291.strokeStyle = _0x2d8768, _0x109291.lineWidth = 6, _0x109291.lineCap = "round", _0x109291.beginPath(), _0x109291.moveTo(_0x50c34c, _0x289ebd), _0x109291.lineTo(_0x50c34c + Math.cos(_0x187be0) * _0x23188d, _0x289ebd + Math.sin(_0x187be0) * _0x23188d), _0x109291.stroke());
  }
  const _0x1a7dc3 = _0x109291.createRadialGradient(_0x50c34c, _0x289ebd, 0, _0x50c34c, _0x289ebd, 120);
  (_0x1a7dc3.addColorStop(0, 'rgba(100,\x20150,\x20255,\x200.6)'), _0x1a7dc3.addColorStop(0.5, "rgba(80, 120, 255, 0.3)"), _0x1a7dc3.addColorStop(1, "transparent"), _0x109291.fillStyle = _0x1a7dc3, _0x109291.beginPath(), _0x109291.arc(_0x50c34c, _0x289ebd, 120, 0, Math.PI * 2), _0x109291.fill(), _0x109291.restore());
}
function addCrystalRefractions(_0x534452, _0x4602c1, _0x471cbd) {
  (_0x534452.save(), _0x534452.globalCompositeOperation = 'overlay', _0x534452.globalAlpha = 0.2);
  for (let _0x3a937e = 0; _0x3a937e < _0x471cbd; _0x3a937e += 30) {
    for (let _0x2970e7 = 0; _0x2970e7 < _0x4602c1; _0x2970e7 += 30) {
      const _0x124959 = 0.3 + Math.sin(_0x2970e7 * 0.02 + _0x3a937e * 0.01) * 0.3, _0xc184e2 = 15 + Math.sin(_0x2970e7 * 0.03) * 10;
      (_0x534452.fillStyle = 'rgba(255,\x20255,\x20255,\x20' + _0x124959 + ')', _0x534452.beginPath(), _0x534452.arc(_0x2970e7 + Math.sin(_0x3a937e * 0.02) * 10, _0x3a937e, _0xc184e2, 0, Math.PI * 2), _0x534452.fill());
    }
  }
  _0x534452.restore();
}
function drawCrystalText(_0x1de73d, _0x36ddec, _0x198808, _0x4b0b87) {
  const _0x9bebf3 = _0x198808 * 0.35, _0x267885 = _0x4b0b87 * 0.6;
  (_0x1de73d.save(), _0x1de73d.shadowColor = 'rgba(100,\x20150,\x20255,\x200.8)', _0x1de73d.shadowBlur = 30);
  const _0x3ae200 = _0x1de73d.createLinearGradient(_0x9bebf3 - 100, _0x267885 - 50, _0x9bebf3 + 100, _0x267885 + 50);
  (_0x3ae200.addColorStop(0, "#64C8FF"), _0x3ae200.addColorStop(0.2, "#9664FF"), _0x3ae200.addColorStop(0.5, "#FFFFFF"), _0x3ae200.addColorStop(0.8, "#64FFC8"), _0x3ae200.addColorStop(1, '#64C8FF'), _0x1de73d.font = "bold 70px \"Arial\"", _0x1de73d.textAlign = "center", _0x1de73d.textBaseline = 'middle', _0x1de73d.fillStyle = _0x3ae200, _0x1de73d.fillText(_0x36ddec.toUpperCase(), _0x9bebf3, _0x267885), _0x1de73d.shadowColor = 'transparent', _0x1de73d.fillStyle = "rgba(255, 255, 255, 0.7)", _0x1de73d.fillText(_0x36ddec.toUpperCase(), _0x9bebf3, _0x267885), _0x1de73d.strokeStyle = "rgba(200, 230, 255, 0.9)", _0x1de73d.lineWidth = 2, _0x1de73d.strokeText(_0x36ddec.toUpperCase(), _0x9bebf3, _0x267885), addTextFacets(_0x1de73d, _0x36ddec, _0x9bebf3, _0x267885), _0x1de73d.restore());
}
function addTextFacets(_0xebb064, _0x309577, _0x4c4d1b, _0x50894a) {
  (_0xebb064.save(), _0xebb064.globalCompositeOperation = "overlay", _0xebb064.globalAlpha = 0.3);
  const _0x13317e = _0xebb064.measureText(_0x309577.toUpperCase()), _0xd90c92 = _0x13317e.width, _0x212759 = 70;
  for (let _0x99d217 = 0; _0x99d217 < _0x309577.length * 3; _0x99d217++) {
    const _0x2b72bd = _0x99d217 / (_0x309577.length * 3), _0x26d3a5 = _0x4c4d1b - _0xd90c92 / 2 + _0xd90c92 * _0x2b72bd, _0x3d1257 = _0x50894a - _0x212759 / 2 + Math.random() * _0x212759;
    if (Math.random() > 0.7) {
      const _0x6abcf7 = 3 + Math.random() * 8, _0x5146bb = Math.random() * Math.PI * 2;
      (_0xebb064.fillStyle = "rgba(255, 255, 255, 0.8)", _0xebb064.beginPath(), _0xebb064.moveTo(_0x26d3a5, _0x3d1257), _0xebb064.lineTo(_0x26d3a5 + Math.cos(_0x5146bb) * _0x6abcf7, _0x3d1257 + Math.sin(_0x5146bb) * _0x6abcf7), _0xebb064.lineTo(_0x26d3a5 + Math.cos(_0x5146bb + Math.PI / 3) * _0x6abcf7, _0x3d1257 + Math.sin(_0x5146bb + Math.PI / 3) * _0x6abcf7), _0xebb064.closePath(), _0xebb064.fill());
    }
  }
  _0xebb064.restore();
}
function addFloatingShards(_0x3ece3a, _0x432a07, _0x3b5577) {
  (_0x3ece3a.save(), _0x3ece3a.globalAlpha = 0.8);
  for (let _0x11667e = 0; _0x11667e < 10; _0x11667e++) {
    const _0x3f89e3 = Math.random() * _0x432a07, _0xf9df74 = Math.random() * _0x3b5577, _0x20d01d = 5 + Math.random() * 15, _0x159d8a = 200 + Math.random() * 160, _0xb90af = Math.random() * Math.PI;
    drawCrystalShard(_0x3ece3a, _0x3f89e3, _0xf9df74, _0x20d01d, _0x159d8a, _0xb90af);
  }
  for (let _0x4c0edb = 0; _0x4c0edb < 25; _0x4c0edb++) {
    const _0x589e2d = Math.random() * _0x432a07, _0x47edbf = Math.random() * _0x3b5577, _0x13682c = 2 + Math.random() * 6, _0x48e407 = 200 + Math.random() * 160;
    (_0x3ece3a.fillStyle = "hsla(" + _0x48e407 + ", 100%, 70%, 0.9)", _0x3ece3a.beginPath(), _0x3ece3a.moveTo(_0x589e2d, _0x47edbf - _0x13682c), _0x3ece3a.lineTo(_0x589e2d + _0x13682c * 0.6, _0x47edbf), _0x3ece3a.lineTo(_0x589e2d, _0x47edbf + _0x13682c), _0x3ece3a.lineTo(_0x589e2d - _0x13682c * 0.6, _0x47edbf), _0x3ece3a.closePath(), _0x3ece3a.fill());
  }
  _0x3ece3a.restore();
}
function drawCrystalShard(_0x2b19fc, _0x103c0b, _0x2a273a, _0x179023, _0x7c081a, _0x4c5dfa) {
  (_0x2b19fc.save(), _0x2b19fc.translate(_0x103c0b, _0x2a273a), _0x2b19fc.rotate(_0x4c5dfa));
  const _0x5e058d = _0x2b19fc.createLinearGradient(-_0x179023, -_0x179023, _0x179023, _0x179023);
  (_0x5e058d.addColorStop(0, 'hsla(' + _0x7c081a + ", 100%, 50%, 0.8)"), _0x5e058d.addColorStop(0.5, "hsla(" + _0x7c081a + ", 100%, 70%, 0.9)"), _0x5e058d.addColorStop(1, "hsla(" + _0x7c081a + ", 100%, 50%, 0.8)"), _0x2b19fc.fillStyle = _0x5e058d, _0x2b19fc.beginPath(), _0x2b19fc.moveTo(0, -_0x179023), _0x2b19fc.lineTo(_0x179023 * 0.8, 0), _0x2b19fc.lineTo(0, _0x179023), _0x2b19fc.lineTo(-_0x179023 * 0.8, 0), _0x2b19fc.closePath(), _0x2b19fc.fill(), _0x2b19fc.fillStyle = "hsla(" + _0x7c081a + ',\x20100%,\x2090%,\x200.6)', _0x2b19fc.beginPath(), _0x2b19fc.moveTo(0, -_0x179023), _0x2b19fc.lineTo(_0x179023 * 0.3, -_0x179023 * 0.2), _0x2b19fc.lineTo(-_0x179023 * 0.3, -_0x179023 * 0.2), _0x2b19fc.closePath(), _0x2b19fc.fill(), _0x2b19fc.restore());
}
function addCrystalDust(_0x1b2663, _0x41cf4b, _0x2c79d6) {
  (_0x1b2663.save(), _0x1b2663.globalCompositeOperation = 'screen');
  for (let _0x15072d = 0; _0x15072d < 60; _0x15072d++) {
    const _0x5b284a = Math.random() * _0x41cf4b, _0x58d871 = Math.random() * _0x2c79d6, _0x322c7e = 1 + Math.random() * 3, _0x1b91c4 = 200 + Math.random() * 160, _0x1dbeba = 0.6 + Math.random() * 0.4;
    (_0x1b2663.fillStyle = "hsla(" + _0x1b91c4 + ", 100%, 70%, " + _0x1dbeba + ')', _0x1b2663.beginPath(), _0x1b2663.arc(_0x5b284a, _0x58d871, _0x322c7e, 0, Math.PI * 2), _0x1b2663.fill(), _0x1b2663.fillStyle = "hsla(" + _0x1b91c4 + ", 100%, 70%, " + _0x1dbeba * 0.3 + ')', _0x1b2663.beginPath(), _0x1b2663.arc(_0x5b284a, _0x58d871, _0x322c7e * 2, 0, Math.PI * 2), _0x1b2663.fill());
  }
  _0x1b2663.restore();
}
function addGemstoneHighlights(_0x44f225, _0x4d529d, _0x5c5607) {
  (_0x44f225.save(), _0x44f225.globalCompositeOperation = 'screen', _0x44f225.globalAlpha = 0.3);
  for (let _0x428d52 = 0; _0x428d52 < 20; _0x428d52++) {
    const _0x27e593 = Math.random() * _0x4d529d, _0x59c3a3 = Math.random() * _0x5c5607, _0x4f8bd8 = 2 + Math.random() * 4;
    (_0x44f225.fillStyle = 'rgba(255,\x20255,\x20255,\x200.9)', _0x44f225.beginPath());
    for (let _0x200a54 = 0; _0x200a54 < 5; _0x200a54++) {
      const _0x1908af = _0x200a54 * Math.PI * 2 / 5, _0x4948e1 = _0x4f8bd8 * 2, _0x6f79d8 = _0x4f8bd8;
      (_0x44f225.lineTo(_0x27e593 + Math.cos(_0x1908af) * _0x4948e1, _0x59c3a3 + Math.sin(_0x1908af) * _0x4948e1), _0x44f225.lineTo(_0x27e593 + Math.cos(_0x1908af + Math.PI / 5) * _0x6f79d8, _0x59c3a3 + Math.sin(_0x1908af + Math.PI / 5) * _0x6f79d8));
    }
    (_0x44f225.closePath(), _0x44f225.fill());
  }
  _0x44f225.restore();
}
function addRainbowRefractions(_0x33d49b, _0x501622, _0x533bb7) {
  (_0x33d49b.save(), _0x33d49b.globalCompositeOperation = "screen", _0x33d49b.globalAlpha = 0.1);
  for (let _0x2fcb13 = 0; _0x2fcb13 < 8; _0x2fcb13++) {
    const _0x235266 = Math.random() * _0x501622, _0x33ddd9 = Math.random() * _0x533bb7, _0x1b4124 = 30 + Math.random() * 40, _0x42daa4 = Math.random() * 360, _0xc44069 = _0x33d49b.createRadialGradient(_0x235266, _0x33ddd9, 0, _0x235266, _0x33ddd9, _0x1b4124);
    (_0xc44069.addColorStop(0, "hsla(" + _0x42daa4 + ", 100%, 70%, 0.6)"), _0xc44069.addColorStop(1, "transparent"), _0x33d49b.fillStyle = _0xc44069, _0x33d49b.beginPath(), _0x33d49b.arc(_0x235266, _0x33ddd9, _0x1b4124, 0, Math.PI * 2), _0x33d49b.fill());
  }
  _0x33d49b.restore();
}
function drawCrystalBorder(_0xf06162, _0x373d42, _0x4b1951) {
  _0xf06162.save();
  const _0x1390d6 = _0xf06162.createLinearGradient(0, 0, _0x373d42, 0);
  (_0x1390d6.addColorStop(0, "#64C8FF"), _0x1390d6.addColorStop(0.3, '#9664FF'), _0x1390d6.addColorStop(0.5, '#FFFFFF'), _0x1390d6.addColorStop(0.7, '#9664FF'), _0x1390d6.addColorStop(1, '#64C8FF'), _0xf06162.strokeStyle = _0x1390d6, _0xf06162.lineWidth = 10, _0xf06162.shadowColor = "rgba(100, 150, 255, 0.6)", _0xf06162.shadowBlur = 20, _0xf06162.strokeRect(10, 10, _0x373d42 - 20, _0x4b1951 - 20), _0xf06162.strokeStyle = "rgba(200, 230, 255, 0.6)", _0xf06162.lineWidth = 3, _0xf06162.shadowBlur = 15, _0xf06162.strokeRect(20, 20, _0x373d42 - 40, _0x4b1951 - 40), addCornerGems(_0xf06162, _0x373d42, _0x4b1951), _0xf06162.restore());
}
function addCornerGems(_0x5715a6, _0x2c3832, _0x3d3863) {
  (_0x5715a6.save(), _0x5715a6.globalAlpha = 0.8);
  const _0x3c72a8 = [{
    x: 30,
    y: 30,
    hue: 200
  }, {
    x: _0x2c3832 - 30,
    y: 30,
    hue: 240
  }, {
    x: 30,
    y: _0x3d3863 - 30,
    hue: 180
  }, {
    x: _0x2c3832 - 30,
    y: _0x3d3863 - 30,
    hue: 260
  }];
  (_0x3c72a8.forEach(_0x22eadc => {
    const _0x38ec19 = _0x5715a6.createRadialGradient(_0x22eadc.x, _0x22eadc.y, 0, _0x22eadc.x, _0x22eadc.y, 8);
    (_0x38ec19.addColorStop(0, 'hsla(' + _0x22eadc.hue + ", 100%, 80%, 0.9)"), _0x38ec19.addColorStop(1, "hsla(" + _0x22eadc.hue + ", 100%, 50%, 0.6)"), _0x5715a6.fillStyle = _0x38ec19, _0x5715a6.beginPath(), _0x5715a6.arc(_0x22eadc.x, _0x22eadc.y, 8, 0, Math.PI * 2), _0x5715a6.fill(), _0x5715a6.fillStyle = 'hsla(' + _0x22eadc.hue + ", 100%, 95%, 0.8)", _0x5715a6.beginPath(), _0x5715a6.arc(_0x22eadc.x - 2, _0x22eadc.y - 2, 3, 0, Math.PI * 2), _0x5715a6.fill());
  }), _0x5715a6.restore());
}
function addCrystalSignature(_0x5beb85, _0x3df3da, _0x37ec3a) {
  _0x5beb85.save();
  const _0x46658d = _0x3df3da - 110, _0x1d095a = _0x37ec3a - 25;
  (_0x5beb85.font = "italic 14px \"Arial\"", _0x5beb85.fillStyle = "rgba(200, 230, 255, 0.9)", _0x5beb85.textAlign = "right", _0x5beb85.textBaseline = "bottom", _0x5beb85.shadowColor = "rgba(100, 150, 255, 0.6)", _0x5beb85.shadowBlur = 10, _0x5beb85.fillText('by Lupin Stanley', _0x46658d, _0x1d095a), _0x5beb85.fillStyle = '#64C8FF', _0x5beb85.beginPath(), _0x5beb85.moveTo(_0x46658d + 5, _0x1d095a - 10), _0x5beb85.lineTo(_0x46658d + 10, _0x1d095a - 8), _0x5beb85.lineTo(_0x46658d + 5, _0x1d095a - 6), _0x5beb85.lineTo(_0x46658d, _0x1d095a - 8), _0x5beb85.closePath(), _0x5beb85.fill(), _0x5beb85.fillStyle = "rgba(255, 255, 255, 0.8)", _0x5beb85.beginPath(), _0x5beb85.moveTo(_0x46658d + 3, _0x1d095a - 9), _0x5beb85.lineTo(_0x46658d + 5, _0x1d095a - 8), _0x5beb85.lineTo(_0x46658d + 3, _0x1d095a - 7), _0x5beb85.closePath(), _0x5beb85.fill(), _0x5beb85.restore());
}
