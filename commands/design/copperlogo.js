import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {DESIGN, STATUS} from '../../lib/emojis.js';
export default {
  name: "copperlogo",
  description: 'Create\x20warm\x20copper\x20metallic\x20text\x20logos\x20with\x20natural\x20patina',
  async execute(_0xc32013, _0x4b7af1, _0x1390a4) {
    const _0x5e3f78 = _0x4b7af1.key.remoteJid;
    try {
      if (_0x1390a4.length === 0) {
        await _0xc32013.sendMessage(_0x5e3f78, {
          text: "╭─⌈ " + DESIGN.COPPER + '\x20*COPPER\x20LOGO*\x20⌋\x0a│\x0a├─⊷\x20*copperlogo*\x0a│\x20\x20└⊷\x20copperlogo\x20<text>\x0a│\x0a├─⊷\x20*Example:*\x0a│\x20\x20└⊷\x20copperlogo\x20WOLF\x0a│\x20\x20└⊷\x20copperlogo\x20COPPER\x0a│\x20\x20└⊷\x20copperlogo\x20WARM\x0a│\x0a╰⊷\x20' + getFooter(_0x4b7af1.key.participant || _0x4b7af1.key.remoteJid)
        }, {
          quoted: _0x4b7af1
        });
        return;
      }
      const _0x56c0c9 = _0x1390a4.join('\x20');
      if (_0x56c0c9.length > 15) {
        await _0xc32013.sendMessage(_0x5e3f78, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 15 characters\n│  └⊷ Your text: \"" + _0x56c0c9 + "\" (" + _0x56c0c9.length + '\x20chars)\x0a│\x0a╰───'
        }, {
          quoted: _0x4b7af1
        });
        return;
      }
      await _0xc32013.sendMessage(_0x5e3f78, {
        react: {
          text: STATUS.LOADING,
          key: _0x4b7af1.key
        }
      });
      const _0x3b83f3 = await generateCopperLogo(_0x56c0c9);
      (await _0xc32013.sendMessage(_0x5e3f78, {
        image: _0x3b83f3,
        caption: DESIGN.COPPER + '\x20*Copper\x20Logo\x20Generated!*\x0aText:\x20' + _0x56c0c9 + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x4b7af1
      }), await _0xc32013.sendMessage(_0x5e3f78, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x4b7af1.key
        }
      }));
    } catch (_0x4ff3f9) {
      (console.error(STATUS.ERROR + " [COPPERLOGO] ERROR:", _0x4ff3f9), await _0xc32013.sendMessage(_0x5e3f78, {
        react: {
          text: STATUS.ERROR,
          key: _0x4b7af1.key
        }
      }).catch(() => {}), await _0xc32013.sendMessage(_0x5e3f78, {
        text: "╭─⌈ " + STATUS.ERROR + '\x20*ERROR*\x20⌋\x0a│\x0a├─⊷\x20' + _0x4ff3f9.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x4b7af1
      }));
    }
  }
};
async function generateCopperLogo(_0x1f83e0) {
  const _0x27a6b1 = 800, _0x54464d = 400, _0x427413 = createCanvas(_0x27a6b1, _0x54464d), _0x4ebe02 = _0x427413.getContext('2d');
  (_0x4ebe02.fillStyle = '#2a1a0a', _0x4ebe02.fillRect(0, 0, _0x27a6b1, _0x54464d), drawNaturalBackground(_0x4ebe02, _0x27a6b1, _0x54464d));
  const _0x1f1699 = _0x4ebe02.createLinearGradient(0, 100, 0, 300);
  return (_0x1f1699.addColorStop(0, "#FFD700"), _0x1f1699.addColorStop(0.15, '#E6B800'), _0x1f1699.addColorStop(0.3, "#CD7F32"), _0x1f1699.addColorStop(0.45, '#B87333'), _0x1f1699.addColorStop(0.6, "#A65A29"), _0x1f1699.addColorStop(0.75, '#8B4513'), _0x1f1699.addColorStop(0.9, "#654321"), _0x1f1699.addColorStop(1, "#4E3524"), _0x4ebe02.font = "bold 84px \"Arial\"", _0x4ebe02.textAlign = 'center', _0x4ebe02.textBaseline = "middle", createCopper3DEffect(_0x4ebe02, _0x1f83e0, _0x27a6b1, _0x54464d, _0x1f1699), addCopperHighlights(_0x4ebe02, _0x1f83e0, _0x27a6b1, _0x54464d), addCopperPatina(_0x4ebe02, _0x1f83e0, _0x27a6b1, _0x54464d), drawCopperBorder(_0x4ebe02, _0x27a6b1, _0x54464d), addHammeredTexture(_0x4ebe02, _0x27a6b1, _0x54464d), addSignature(_0x4ebe02, _0x27a6b1, _0x54464d), addWatermark(_0x4ebe02, _0x27a6b1, _0x54464d), _0x427413.toBuffer('image/png'));
}
function drawNaturalBackground(_0x2a3384, _0x2f6482, _0x5a41a3) {
  const _0xc2d412 = _0x2a3384.createRadialGradient(_0x2f6482 / 2, _0x5a41a3 / 2, 0, _0x2f6482 / 2, _0x5a41a3 / 2, Math.max(_0x2f6482, _0x5a41a3) / 1.5);
  (_0xc2d412.addColorStop(0, '#3a2a1a'), _0xc2d412.addColorStop(0.4, "#2a1a0a"), _0xc2d412.addColorStop(0.8, "#1a0a00"), _0xc2d412.addColorStop(1, "#0a0500"), _0x2a3384.fillStyle = _0xc2d412, _0x2a3384.fillRect(0, 0, _0x2f6482, _0x5a41a3), _0x2a3384.strokeStyle = 'rgba(120,\x2080,\x2040,\x200.1)', _0x2a3384.lineWidth = 1);
  for (let _0x2e9ad1 = 0; _0x2e9ad1 < 150; _0x2e9ad1++) {
    const _0x299728 = Math.random() * _0x2f6482, _0x45ab97 = Math.random() * _0x5a41a3, _0x3735a6 = 15 + Math.random() * 35, _0x30e0d9 = Math.random() * Math.PI * 2, _0x405ba0 = (Math.random() - 0.5) * 0.5;
    (_0x2a3384.beginPath(), _0x2a3384.moveTo(_0x299728, _0x45ab97), _0x2a3384.quadraticCurveTo(_0x299728 + Math.cos(_0x30e0d9) * _0x3735a6 * 0.5 + _0x405ba0 * 20, _0x45ab97 + Math.sin(_0x30e0d9) * _0x3735a6 * 0.5 + _0x405ba0 * 20, _0x299728 + Math.cos(_0x30e0d9) * _0x3735a6, _0x45ab97 + Math.sin(_0x30e0d9) * _0x3735a6), _0x2a3384.stroke());
  }
  _0x2a3384.fillStyle = "rgba(200, 150, 50, 0.2)";
  for (let _0x2ce231 = 0; _0x2ce231 < 50; _0x2ce231++) {
    const _0x11c6a1 = Math.random() * _0x2f6482, _0x240258 = Math.random() * _0x5a41a3, _0x54c423 = 1 + Math.random() * 3;
    (_0x2a3384.beginPath(), _0x2a3384.arc(_0x11c6a1, _0x240258, _0x54c423, 0, Math.PI * 2), _0x2a3384.fill());
  }
}
function createCopper3DEffect(_0x4420e8, _0x429203, _0x8d2d8f, _0x4ea8e5, _0x466d62) {
  const _0x1cf4c0 = _0x8d2d8f / 2, _0x5c7664 = _0x4ea8e5 / 2, _0x5bba2c = 8;
  for (let _0x289fc2 = _0x5bba2c; _0x289fc2 > 0; _0x289fc2--) {
    const _0x3cec76 = _0x289fc2 * 1.5, _0x317959 = 0.08 + _0x289fc2 / _0x5bba2c * 0.25, _0xbf9823 = 80 - _0x289fc2 * 8;
    (_0x4420e8.fillStyle = "rgba(" + _0xbf9823 + ',\x20' + (_0xbf9823 - 20) + ',\x20' + (_0xbf9823 - 40) + ',\x20' + _0x317959 + ')', _0x4420e8.fillText(_0x429203.toUpperCase(), _0x1cf4c0 + _0x3cec76, _0x5c7664 + _0x3cec76));
  }
  (_0x4420e8.fillStyle = _0x466d62, _0x4420e8.fillText(_0x429203.toUpperCase(), _0x1cf4c0, _0x5c7664), _0x4420e8.strokeStyle = "rgba(255, 200, 100, 0.4)", _0x4420e8.lineWidth = 1.5, _0x4420e8.strokeText(_0x429203.toUpperCase(), _0x1cf4c0, _0x5c7664));
}
function addCopperHighlights(_0x417270, _0x460fe1, _0x9e1e09, _0x2791aa) {
  const _0x35639c = _0x9e1e09 / 2, _0x4f0ce8 = _0x2791aa / 2;
  _0x417270.save();
  const _0x1115a3 = _0x417270.createLinearGradient(_0x35639c - 250, _0x4f0ce8 - 50, _0x35639c + 250, _0x4f0ce8 - 10);
  (_0x1115a3.addColorStop(0, "rgba(255, 255, 200, 0)"), _0x1115a3.addColorStop(0.3, "rgba(255, 255, 150, 0.6)"), _0x1115a3.addColorStop(0.5, "rgba(255, 255, 100, 0.7)"), _0x1115a3.addColorStop(0.7, 'rgba(255,\x20255,\x20150,\x200.5)'), _0x1115a3.addColorStop(1, 'rgba(255,\x20255,\x20200,\x200)'), _0x417270.globalCompositeOperation = "screen", _0x417270.fillStyle = _0x1115a3, _0x417270.font = "bold 84px \"Arial\"", _0x417270.textAlign = "center", _0x417270.textBaseline = "middle", _0x417270.fillText(_0x460fe1.toUpperCase(), _0x35639c, _0x4f0ce8 - 2), _0x417270.globalCompositeOperation = 'source-over');
  const _0x55619d = _0x417270.measureText(_0x460fe1.toUpperCase()).width, _0x526269 = [{
    x: -0.35,
    y: -0.35,
    size: 5,
    alpha: 0.8,
    color: "rgba(255, 230, 100, 0.9)"
  }, {
    x: -0.15,
    y: -0.4,
    size: 6,
    alpha: 0.9,
    color: "rgba(255, 220, 80, 0.9)"
  }, {
    x: 0.05,
    y: -0.35,
    size: 4,
    alpha: 0.7,
    color: 'rgba(255,\x20240,\x20120,\x200.8)'
  }, {
    x: 0.25,
    y: -0.4,
    size: 5,
    alpha: 0.8,
    color: "rgba(255, 230, 100, 0.9)"
  }, {
    x: 0.4,
    y: -0.3,
    size: 3,
    alpha: 0.6,
    color: "rgba(255, 240, 130, 0.7)"
  }];
  (_0x526269.forEach(_0x2ad6ac => {
    const _0x4e2cb8 = _0x35639c + _0x2ad6ac.x * _0x55619d / 2, _0x2f1c74 = _0x4f0ce8 + _0x2ad6ac.y * 45;
    (_0x417270.fillStyle = _0x2ad6ac.color.replace(')', ',\x20' + _0x2ad6ac.alpha + ')').replace('a(', 'a('), _0x417270.beginPath(), _0x417270.arc(_0x4e2cb8, _0x2f1c74, _0x2ad6ac.size, 0, Math.PI * 2), _0x417270.fill());
  }), _0x417270.restore());
}
function addCopperPatina(_0x4c91f6, _0x5044b1, _0x4ab556, _0x32c875) {
  const _0x17e2ef = _0x4ab556 / 2, _0x165ed7 = _0x32c875 / 2;
  _0x4c91f6.save();
  const _0x4870cf = _0x4c91f6.createLinearGradient(_0x17e2ef - 200, _0x165ed7 + 40, _0x17e2ef + 200, _0x165ed7 - 30);
  (_0x4870cf.addColorStop(0, "rgba(83, 130, 85, 0.2)"), _0x4870cf.addColorStop(0.4, "rgba(67, 111, 77, 0.3)"), _0x4870cf.addColorStop(0.7, "rgba(53, 94, 59, 0.2)"), _0x4870cf.addColorStop(1, "transparent"), _0x4c91f6.globalCompositeOperation = "overlay", _0x4c91f6.fillStyle = _0x4870cf, _0x4c91f6.font = "bold 84px \"Arial\"", _0x4c91f6.textAlign = "center", _0x4c91f6.textBaseline = "middle", _0x4c91f6.fillText(_0x5044b1.toUpperCase(), _0x17e2ef, _0x165ed7), _0x4c91f6.globalCompositeOperation = "source-over");
  const _0xaf7baa = _0x4c91f6.measureText(_0x5044b1.toUpperCase()).width, _0x367302 = [{
    x: -0.3,
    y: 0.25,
    size: 8,
    alpha: 0.4,
    color: "rgba(64, 130, 109, 0.5)"
  }, {
    x: -0.1,
    y: -0.15,
    size: 6,
    alpha: 0.3,
    color: 'rgba(72,\x20140,\x20120,\x200.4)'
  }, {
    x: 0.15,
    y: 0.35,
    size: 10,
    alpha: 0.5,
    color: "rgba(60, 125, 105, 0.6)"
  }, {
    x: 0.35,
    y: -0.25,
    size: 7,
    alpha: 0.4,
    color: 'rgba(68,\x20135,\x20115,\x200.5)'
  }, {
    x: 0.45,
    y: 0.15,
    size: 5,
    alpha: 0.3,
    color: 'rgba(76,\x20145,\x20125,\x200.4)'
  }];
  (_0x367302.forEach(_0x507215 => {
    const _0x1517f1 = _0x17e2ef + _0x507215.x * _0xaf7baa / 2, _0x54ad12 = _0x165ed7 + _0x507215.y * 40;
    (_0x4c91f6.fillStyle = _0x507215.color.replace(')', ',\x20' + _0x507215.alpha + ')').replace('a(', 'a('), _0x4c91f6.beginPath(), _0x4c91f6.arc(_0x1517f1, _0x54ad12, _0x507215.size, 0, Math.PI * 2), _0x4c91f6.fill(), _0x4c91f6.fillStyle = _0x507215.color.replace(')', ',\x20' + _0x507215.alpha * 0.7 + ')').replace('a(', 'a('), _0x4c91f6.beginPath(), _0x4c91f6.arc(_0x1517f1 - _0x507215.size * 0.3, _0x54ad12 - _0x507215.size * 0.3, _0x507215.size * 0.5, 0, Math.PI * 2), _0x4c91f6.fill());
  }), _0x4c91f6.restore());
}
function drawCopperBorder(_0x1e7643, _0x4fd54e, _0x3c76aa) {
  const _0x484b55 = _0x1e7643.createLinearGradient(0, 0, _0x4fd54e, _0x3c76aa);
  (_0x484b55.addColorStop(0, "#FFD700"), _0x484b55.addColorStop(0.25, "#E6B800"), _0x484b55.addColorStop(0.5, "#B87333"), _0x484b55.addColorStop(0.75, "#E6B800"), _0x484b55.addColorStop(1, "#FFD700"), _0x1e7643.strokeStyle = _0x484b55, _0x1e7643.lineWidth = 8, _0x1e7643.shadowColor = "rgba(184, 115, 51, 0.5)", _0x1e7643.shadowBlur = 15, _0x1e7643.strokeRect(18, 18, _0x4fd54e - 36, _0x3c76aa - 36), _0x1e7643.strokeStyle = "rgba(255, 200, 100, 0.4)", _0x1e7643.lineWidth = 2, _0x1e7643.shadowBlur = 0, _0x1e7643.strokeRect(30, 30, _0x4fd54e - 60, _0x3c76aa - 60), drawCopperRivets(_0x1e7643, _0x4fd54e, _0x3c76aa));
}
function drawCopperRivets(_0x25e766, _0x358ac6, _0x33bef9) {
  _0x25e766.fillStyle = '#B87333';
  const _0x49ace5 = [{
    x: 35,
    y: 35
  }, {
    x: _0x358ac6 - 35,
    y: 35
  }, {
    x: 35,
    y: _0x33bef9 - 35
  }, {
    x: _0x358ac6 - 35,
    y: _0x33bef9 - 35
  }, {
    x: _0x358ac6 / 2,
    y: 35
  }, {
    x: _0x358ac6 / 2,
    y: _0x33bef9 - 35
  }];
  _0x49ace5.forEach(_0x3e6e3f => {
    (_0x25e766.beginPath(), _0x25e766.arc(_0x3e6e3f.x, _0x3e6e3f.y, 6, 0, Math.PI * 2), _0x25e766.fill(), _0x25e766.fillStyle = 'rgba(255,\x20215,\x200,\x200.6)', _0x25e766.beginPath(), _0x25e766.arc(_0x3e6e3f.x - 2, _0x3e6e3f.y - 2, 2, 0, Math.PI * 2), _0x25e766.fill(), _0x25e766.fillStyle = "#B87333");
  });
}
function addHammeredTexture(_0xbc504a, _0x51b881, _0x2cf26e) {
  (_0xbc504a.save(), _0xbc504a.globalAlpha = 0.2);
  for (let _0x311ceb = 0; _0x311ceb < 80; _0x311ceb++) {
    const _0x55a925 = Math.random() * _0x51b881, _0x4f6519 = Math.random() * _0x2cf26e, _0x541feb = 2 + Math.random() * 5;
    (_0xbc504a.fillStyle = 'rgba(' + (180 + Math.random() * 40) + ',\x20' + (120 + Math.random() * 30) + ',\x20' + (50 + Math.random() * 20) + ", 0.8)", _0xbc504a.beginPath(), _0xbc504a.arc(_0x55a925, _0x4f6519, _0x541feb, 0, Math.PI * 2), _0xbc504a.fill(), _0xbc504a.fillStyle = "rgba(255, 230, 150, 0.4)", _0xbc504a.beginPath(), _0xbc504a.arc(_0x55a925 - _0x541feb * 0.3, _0x4f6519 - _0x541feb * 0.3, _0x541feb * 0.3, 0, Math.PI * 2), _0xbc504a.fill());
  }
  (_0xbc504a.strokeStyle = "rgba(139, 69, 19, 0.3)", _0xbc504a.lineWidth = 0.8);
  for (let _0x3e3cf0 = 0; _0x3e3cf0 < 40; _0x3e3cf0++) {
    const _0x1cb5c7 = Math.random() * _0x51b881, _0x445254 = Math.random() * _0x2cf26e, _0x215cc2 = 8 + Math.random() * 25, _0x1b30cd = Math.random() * Math.PI;
    (_0xbc504a.beginPath(), _0xbc504a.moveTo(_0x1cb5c7, _0x445254), _0xbc504a.lineTo(_0x1cb5c7 + Math.cos(_0x1b30cd) * _0x215cc2, _0x445254 + Math.sin(_0x1b30cd) * _0x215cc2), _0xbc504a.stroke());
  }
  _0xbc504a.restore();
}
function addSignature(_0x4eef3f, _0x56df7c, _0x2294b2) {
  _0x4eef3f.save();
  const _0x104aa7 = _0x56df7c - 120, _0x5249c3 = _0x2294b2 - 20;
  (_0x4eef3f.font = "italic 12px \"Arial\"", _0x4eef3f.fillStyle = 'rgba(184,\x20115,\x2051,\x200.7)', _0x4eef3f.textAlign = "right", _0x4eef3f.textBaseline = "bottom", _0x4eef3f.fillText('by\x20Silent\x20Wolf', _0x104aa7, _0x5249c3), _0x4eef3f.strokeStyle = 'rgba(184,\x20115,\x2051,\x200.4)', _0x4eef3f.lineWidth = 0.5);
  const _0x428bb9 = _0x4eef3f.measureText("by Silent Wolf").width;
  (_0x4eef3f.beginPath(), _0x4eef3f.moveTo(_0x104aa7 - _0x428bb9, _0x5249c3 + 2), _0x4eef3f.lineTo(_0x104aa7, _0x5249c3 + 2), _0x4eef3f.stroke(), _0x4eef3f.restore());
}
async function generateSimpleCopperLogo(_0x623b16) {
  const _0x147be4 = 600, _0x4cf97f = 300, _0x1c0086 = createCanvas(_0x147be4, _0x4cf97f), _0x535139 = _0x1c0086.getContext('2d');
  (_0x535139.fillStyle = "#2a1a0a", _0x535139.fillRect(0, 0, _0x147be4, _0x4cf97f));
  const _0x2ed699 = _0x535139.createLinearGradient(0, 50, 0, 250);
  return (_0x2ed699.addColorStop(0, "#FFD700"), _0x2ed699.addColorStop(0.4, "#E6B800"), _0x2ed699.addColorStop(0.7, "#B87333"), _0x2ed699.addColorStop(1, '#8B4513'), _0x535139.font = 'bold\x2070px\x20Arial', _0x535139.fillStyle = _0x2ed699, _0x535139.textAlign = 'center', _0x535139.textBaseline = 'middle', _0x535139.shadowColor = "rgba(184, 115, 51, 0.5)", _0x535139.shadowBlur = 15, _0x535139.shadowOffsetX = 4, _0x535139.shadowOffsetY = 4, _0x535139.fillText(_0x623b16.toUpperCase(), _0x147be4 / 2, _0x4cf97f / 2), _0x535139.strokeStyle = "#B87333", _0x535139.lineWidth = 5, _0x535139.strokeRect(15, 15, _0x147be4 - 30, _0x4cf97f - 30), _0x535139.font = "italic 10px \"Arial\"", _0x535139.fillStyle = 'rgba(184,\x20115,\x2051,\x200.7)', _0x535139.textAlign = "right", _0x535139.textBaseline = "bottom", _0x535139.fillText("by Silent Wolf", _0x147be4 - 20, _0x4cf97f - 15), _0x1c0086.toBuffer("image/png"));
}
