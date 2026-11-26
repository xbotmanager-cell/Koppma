import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'glowlogo',
  description: 'Create\x20intense\x20glowing\x20text\x20logos\x20with\x20vibrant\x20light\x20effects',
  async execute(_0x42e0cc, _0x4b5ee2, _0xf36235) {
    const _0x307993 = _0x4b5ee2.key.remoteJid;
    try {
      if (_0xf36235.length === 0) {
        await _0x42e0cc.sendMessage(_0x307993, {
          text: '╭┄〔 \x20' + DESIGN.GLOW + " *GLOW LOGO* 〕┄╮\n┆\n┆ ✦ *glowlogo*\n┆   └─ glowlogo <text>\n┆\n┆ ✦ *Example:*\n┆   └─ glowlogo WOLF\n┆   └─ glowlogo GLOW\n┆   └─ glowlogo LIGHT\n┆\n╰┄ " + getFooter(_0x4b5ee2.key.participant || _0x4b5ee2.key.remoteJid)
        }, {
          quoted: _0x4b5ee2
        });
        return;
      }
      const _0x7a1969 = _0xf36235.join('\x20');
      if (_0x7a1969.length > 12) {
        await _0x42e0cc.sendMessage(_0x307993, {
          text: "╭┄〔 " + STATUS.ERROR + " *ERROR* 〕┄╮\n┆\n┆ ✦ Text too long!\n┆   └─ Maximum 12 characters\n┆   └─ Your text: \"" + _0x7a1969 + "\" (" + _0x7a1969.length + " chars)\n┆\n╰───"
        }, {
          quoted: _0x4b5ee2
        });
        return;
      }
      await _0x42e0cc.sendMessage(_0x307993, {
        react: {
          text: STATUS.LOADING,
          key: _0x4b5ee2.key
        }
      });
      const _0x9bda25 = await generateGlowLogo(_0x7a1969);
      (await _0x42e0cc.sendMessage(_0x307993, {
        image: _0x9bda25,
        caption: DESIGN.GLOW + " *Glow Logo Generated!*\nText: " + _0x7a1969 + '\x0a\x0a_Created\x20by\x20' + getBotName() + '_'
      }, {
        quoted: _0x4b5ee2
      }), await _0x42e0cc.sendMessage(_0x307993, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x4b5ee2.key
        }
      }));
    } catch (_0x2aee18) {
      (console.error(STATUS.ERROR + " [GLOWLOGO] ERROR:", _0x2aee18), await _0x42e0cc.sendMessage(_0x307993, {
        react: {
          text: STATUS.ERROR,
          key: _0x4b5ee2.key
        }
      }).catch(() => {}), await _0x42e0cc.sendMessage(_0x307993, {
        text: "╭┄〔 " + STATUS.ERROR + " *ERROR* 〕┄╮\n┆\n┆ ✦ " + _0x2aee18.message + "\n┆   └─ Please try again with shorter text\n┆\n╰───"
      }, {
        quoted: _0x4b5ee2
      }));
    }
  }
};
async function generateGlowLogo(_0x47715b) {
  const _0x18048c = 800, _0x2d152a = 400, _0x26a6af = createCanvas(_0x18048c, _0x2d152a), _0x5982fe = _0x26a6af.getContext('2d');
  (_0x5982fe.fillStyle = "#000000", _0x5982fe.fillRect(0, 0, _0x18048c, _0x2d152a), drawCosmicBackground(_0x5982fe, _0x18048c, _0x2d152a));
  const _0x1a4000 = _0x5982fe.createLinearGradient(0, 70, 0, 330);
  return (_0x1a4000.addColorStop(0, "#FF0080"), _0x1a4000.addColorStop(0.2, "#FF00FF"), _0x1a4000.addColorStop(0.4, "#8000FF"), _0x1a4000.addColorStop(0.6, "#0080FF"), _0x1a4000.addColorStop(0.8, "#00FF80"), _0x1a4000.addColorStop(1, "#FFFF00"), _0x5982fe.font = "bold 88px \"Arial\"", _0x5982fe.textAlign = "center", _0x5982fe.textBaseline = "middle", createMultiLayerGlow(_0x5982fe, _0x47715b, _0x18048c, _0x2d152a, _0x1a4000), addLightBursts(_0x5982fe, _0x18048c, _0x2d152a), addGlowParticles(_0x5982fe, _0x18048c, _0x2d152a), addRainbowAura(_0x5982fe, _0x47715b, _0x18048c, _0x2d152a), drawHolographicBorder(_0x5982fe, _0x18048c, _0x2d152a), addSignature(_0x5982fe, _0x18048c, _0x2d152a), addWatermark(_0x5982fe, _0x18048c, _0x2d152a), _0x26a6af.toBuffer("image/png"));
}
function drawCosmicBackground(_0x1dc4d1, _0x57aa77, _0x24a7a8) {
  const _0x336971 = _0x1dc4d1.createRadialGradient(_0x57aa77 / 2, _0x24a7a8 / 2, 0, _0x57aa77 / 2, _0x24a7a8 / 2, Math.max(_0x57aa77, _0x24a7a8) / 1.2);
  (_0x336971.addColorStop(0, "#000033"), _0x336971.addColorStop(0.3, "#000022"), _0x336971.addColorStop(0.7, "#000011"), _0x336971.addColorStop(1, "#000000"), _0x1dc4d1.fillStyle = _0x336971, _0x1dc4d1.fillRect(0, 0, _0x57aa77, _0x24a7a8), _0x1dc4d1.fillStyle = "#FFFFFF");
  for (let _0x210f29 = 0; _0x210f29 < 150; _0x210f29++) {
    const _0x406959 = Math.random() * _0x57aa77, _0x58c54e = Math.random() * _0x24a7a8, _0x3153d5 = Math.random() * 2, _0x371c12 = 0.3 + Math.random() * 0.7;
    (_0x1dc4d1.globalAlpha = _0x371c12, _0x1dc4d1.beginPath(), _0x1dc4d1.arc(_0x406959, _0x58c54e, _0x3153d5, 0, Math.PI * 2), _0x1dc4d1.fill());
  }
  (_0x1dc4d1.globalAlpha = 1, addNebulaEffects(_0x1dc4d1, _0x57aa77, _0x24a7a8));
}
function addNebulaEffects(_0x2c3ab1, _0x6f1826, _0xe6481f) {
  const _0x44f7c2 = [{
    x: _0x6f1826 * 0.2,
    y: _0xe6481f * 0.3,
    size: 150,
    color: 'rgba(255,\x200,\x20128,\x200.1)'
  }, {
    x: _0x6f1826 * 0.7,
    y: _0xe6481f * 0.2,
    size: 120,
    color: "rgba(128, 0, 255, 0.08)"
  }, {
    x: _0x6f1826 * 0.3,
    y: _0xe6481f * 0.7,
    size: 130,
    color: "rgba(0, 128, 255, 0.09)"
  }, {
    x: _0x6f1826 * 0.8,
    y: _0xe6481f * 0.6,
    size: 110,
    color: "rgba(0, 255, 128, 0.07)"
  }];
  _0x44f7c2.forEach(_0x2618de => {
    const _0x642ad3 = _0x2c3ab1.createRadialGradient(_0x2618de.x, _0x2618de.y, 0, _0x2618de.x, _0x2618de.y, _0x2618de.size);
    (_0x642ad3.addColorStop(0, _0x2618de.color), _0x642ad3.addColorStop(1, 'transparent'), _0x2c3ab1.fillStyle = _0x642ad3, _0x2c3ab1.beginPath(), _0x2c3ab1.arc(_0x2618de.x, _0x2618de.y, _0x2618de.size, 0, Math.PI * 2), _0x2c3ab1.fill());
  });
}
function createMultiLayerGlow(_0x5bfd21, _0x471386, _0x49d983, _0x68e301, _0x508ebc) {
  const _0x3a7c6f = _0x49d983 / 2, _0x5462aa = _0x68e301 / 2, _0x3d1cce = [{
    blur: 60,
    alpha: 0.3,
    color: "#FF0080",
    offset: 0
  }, {
    blur: 50,
    alpha: 0.4,
    color: "#FF00FF",
    offset: 1
  }, {
    blur: 40,
    alpha: 0.5,
    color: "#8000FF",
    offset: 2
  }, {
    blur: 30,
    alpha: 0.6,
    color: "#0080FF",
    offset: 1
  }, {
    blur: 20,
    alpha: 0.7,
    color: '#00FF80',
    offset: 0
  }, {
    blur: 10,
    alpha: 0.8,
    color: "#FFFF00",
    offset: -1
  }];
  for (const _0x1483d1 of _0x3d1cce) {
    (_0x5bfd21.shadowColor = _0x1483d1.color, _0x5bfd21.shadowBlur = _0x1483d1.blur, _0x5bfd21.fillStyle = "rgba(255, 255, 255, " + _0x1483d1.alpha + ')', _0x5bfd21.fillText(_0x471386.toUpperCase(), _0x3a7c6f + _0x1483d1.offset, _0x5462aa + _0x1483d1.offset));
  }
  (_0x5bfd21.shadowColor = "transparent", _0x5bfd21.shadowBlur = 0, _0x5bfd21.fillStyle = _0x508ebc, _0x5bfd21.fillText(_0x471386.toUpperCase(), _0x3a7c6f, _0x5462aa), _0x5bfd21.save(), _0x5bfd21.globalCompositeOperation = "screen", _0x5bfd21.fillStyle = "rgba(255, 255, 255, 0.6)", _0x5bfd21.fillText(_0x471386.toUpperCase(), _0x3a7c6f, _0x5462aa), _0x5bfd21.restore(), _0x5bfd21.strokeStyle = "rgba(255, 255, 255, 0.9)", _0x5bfd21.lineWidth = 2, _0x5bfd21.strokeText(_0x471386.toUpperCase(), _0x3a7c6f, _0x5462aa));
}
function addLightBursts(_0x21bf86, _0x31a7fb, _0x5933aa) {
  const _0x57e50c = _0x31a7fb / 2, _0x346906 = _0x5933aa / 2;
  (_0x21bf86.save(), _0x21bf86.globalAlpha = 0.4);
  for (let _0x5d1d46 = 0; _0x5d1d46 < 3; _0x5d1d46++) {
    const _0x5ca1ad = 200 + _0x5d1d46 * 100, _0x3c48c8 = 0.3 - _0x5d1d46 * 0.1;
    for (let _0x51a9c2 = 0; _0x51a9c2 < 24; _0x51a9c2++) {
      const _0x1bff94 = _0x51a9c2 / 24 * Math.PI * 2, _0x30e9a2 = _0x5ca1ad, _0x4ea536 = _0x21bf86.createLinearGradient(_0x57e50c, _0x346906, _0x57e50c + Math.cos(_0x1bff94) * _0x30e9a2, _0x346906 + Math.sin(_0x1bff94) * _0x30e9a2), _0x32911e = _0x51a9c2 * 15 % 360;
      (_0x4ea536.addColorStop(0, "hsla(" + _0x32911e + ", 100%, 70%, " + _0x3c48c8 + ')'), _0x4ea536.addColorStop(0.7, "hsla(" + _0x32911e + ", 100%, 50%, " + _0x3c48c8 * 0.5 + ')'), _0x4ea536.addColorStop(1, "transparent"), _0x21bf86.strokeStyle = _0x4ea536, _0x21bf86.lineWidth = 8 - _0x5d1d46 * 2, _0x21bf86.beginPath(), _0x21bf86.moveTo(_0x57e50c, _0x346906), _0x21bf86.lineTo(_0x57e50c + Math.cos(_0x1bff94) * _0x30e9a2, _0x346906 + Math.sin(_0x1bff94) * _0x30e9a2), _0x21bf86.stroke());
    }
  }
  _0x21bf86.restore();
}
function addGlowParticles(_0x5558d3, _0x331dd3, _0x16b0ad) {
  const _0x594b19 = _0x331dd3 / 2, _0x3b5d73 = _0x16b0ad / 2;
  (_0x5558d3.save(), _0x5558d3.globalAlpha = 0.8);
  for (let _0x18303e = 0; _0x18303e < 25; _0x18303e++) {
    const _0x44ed31 = Math.random() * Math.PI * 2, _0x4a6ac0 = 80 + Math.random() * 250, _0x3c27eb = 3 + Math.random() * 8, _0x161a87 = Math.random() * 360, _0x56448e = _0x594b19 + Math.cos(_0x44ed31) * _0x4a6ac0, _0x116906 = _0x3b5d73 + Math.sin(_0x44ed31) * _0x4a6ac0, _0x5cdddd = _0x5558d3.createRadialGradient(_0x56448e, _0x116906, 0, _0x56448e, _0x116906, _0x3c27eb * 3);
    (_0x5cdddd.addColorStop(0, "hsla(" + _0x161a87 + ", 100%, 80%, 0.9)"), _0x5cdddd.addColorStop(0.7, "hsla(" + _0x161a87 + ',\x20100%,\x2060%,\x200.6)'), _0x5cdddd.addColorStop(1, "transparent"), _0x5558d3.fillStyle = _0x5cdddd, _0x5558d3.beginPath(), _0x5558d3.arc(_0x56448e, _0x116906, _0x3c27eb * 3, 0, Math.PI * 2), _0x5558d3.fill(), _0x5558d3.fillStyle = "hsla(" + _0x161a87 + ", 100%, 90%, 0.8)", _0x5558d3.beginPath(), _0x5558d3.arc(_0x56448e, _0x116906, _0x3c27eb * 0.7, 0, Math.PI * 2), _0x5558d3.fill());
  }
  for (let _0x45f205 = 0; _0x45f205 < 40; _0x45f205++) {
    const _0x4cdd0d = Math.random() * _0x331dd3, _0x35a719 = Math.random() * _0x16b0ad, _0x40cdbe = 1 + Math.random() * 3, _0x5da0e6 = Math.random() * 360, _0x448c08 = 0.7 + Math.random() * 0.3;
    (_0x5558d3.fillStyle = "hsla(" + _0x5da0e6 + ", 100%, 80%, " + _0x448c08 + ')', _0x5558d3.beginPath());
    for (let _0x3a906b = 0; _0x3a906b < 5; _0x3a906b++) {
      const _0x2f0ec3 = _0x3a906b * Math.PI * 2 / 5, _0x2f0822 = _0x40cdbe, _0x1d901e = _0x40cdbe * 0.4;
      (_0x5558d3.lineTo(_0x4cdd0d + Math.cos(_0x2f0ec3) * _0x2f0822, _0x35a719 + Math.sin(_0x2f0ec3) * _0x2f0822), _0x5558d3.lineTo(_0x4cdd0d + Math.cos(_0x2f0ec3 + Math.PI / 5) * _0x1d901e, _0x35a719 + Math.sin(_0x2f0ec3 + Math.PI / 5) * _0x1d901e));
    }
    (_0x5558d3.closePath(), _0x5558d3.fill(), _0x5558d3.shadowColor = "hsla(" + _0x5da0e6 + ',\x20100%,\x2070%,\x200.8)', _0x5558d3.shadowBlur = 12, _0x5558d3.fill());
  }
  _0x5558d3.restore();
}
function addRainbowAura(_0x5c986c, _0xf3f7d2, _0x188ed7, _0x13ff78) {
  const _0x25bae5 = _0x188ed7 / 2, _0x4b4d0c = _0x13ff78 / 2;
  (_0x5c986c.save(), _0x5c986c.globalCompositeOperation = 'screen');
  for (let _0x1c0dc0 = 0; _0x1c0dc0 < 3; _0x1c0dc0++) {
    const _0x2186c0 = 120 + _0x1c0dc0 * 40, _0x5c4ab5 = 0.2 - _0x1c0dc0 * 0.05;
    for (let _0x410ca8 = 0; _0x410ca8 < 36; _0x410ca8++) {
      const _0x238211 = _0x410ca8 / 36 * Math.PI * 2, _0x5b7330 = _0x410ca8 * 10 % 360, _0x3251d0 = _0x25bae5 + Math.cos(_0x238211) * _0x2186c0, _0x1c807e = _0x4b4d0c + Math.sin(_0x238211) * _0x2186c0, _0x528edf = _0x5c986c.createRadialGradient(_0x3251d0, _0x1c807e, 0, _0x3251d0, _0x1c807e, 30);
      (_0x528edf.addColorStop(0, "hsla(" + _0x5b7330 + ',\x20100%,\x2070%,\x20' + _0x5c4ab5 + ')'), _0x528edf.addColorStop(1, "transparent"), _0x5c986c.fillStyle = _0x528edf, _0x5c986c.beginPath(), _0x5c986c.arc(_0x3251d0, _0x1c807e, 30, 0, Math.PI * 2), _0x5c986c.fill());
    }
  }
  _0x5c986c.restore();
}
function drawHolographicBorder(_0x43178f, _0x2d4451, _0x35fe60) {
  const _0x56d293 = _0x43178f.createLinearGradient(0, 0, _0x2d4451, _0x35fe60);
  (_0x56d293.addColorStop(0, "#FF0080"), _0x56d293.addColorStop(0.2, "#FF00FF"), _0x56d293.addColorStop(0.4, "#8000FF"), _0x56d293.addColorStop(0.6, "#0080FF"), _0x56d293.addColorStop(0.8, "#00FF80"), _0x56d293.addColorStop(1, "#FFFF00"), _0x43178f.strokeStyle = _0x56d293, _0x43178f.lineWidth = 10, _0x43178f.shadowColor = "#FFFFFF", _0x43178f.shadowBlur = 30, _0x43178f.strokeRect(10, 10, _0x2d4451 - 20, _0x35fe60 - 20), _0x43178f.strokeStyle = "rgba(255, 255, 255, 0.6)", _0x43178f.lineWidth = 4, _0x43178f.shadowBlur = 20, _0x43178f.strokeRect(18, 18, _0x2d4451 - 36, _0x35fe60 - 36));
  const _0x58a90d = _0x43178f.createLinearGradient(_0x2d4451, 0, 0, _0x35fe60);
  (_0x58a90d.addColorStop(0, "#FFFF00"), _0x58a90d.addColorStop(0.2, "#00FF80"), _0x58a90d.addColorStop(0.4, "#0080FF"), _0x58a90d.addColorStop(0.6, "#8000FF"), _0x58a90d.addColorStop(0.8, "#FF00FF"), _0x58a90d.addColorStop(1, "#FF0080"), _0x43178f.strokeStyle = _0x58a90d, _0x43178f.lineWidth = 2, _0x43178f.shadowBlur = 0, _0x43178f.strokeRect(26, 26, _0x2d4451 - 52, _0x35fe60 - 52), addCornerGlowAccents(_0x43178f, _0x2d4451, _0x35fe60));
}
function addCornerGlowAccents(_0x3b77c0, _0x66b823, _0x34a525) {
  (_0x3b77c0.save(), _0x3b77c0.globalAlpha = 0.7);
  const _0x3094ce = [{
    x: 25,
    y: 25
  }, {
    x: _0x66b823 - 25,
    y: 25
  }, {
    x: 25,
    y: _0x34a525 - 25
  }, {
    x: _0x66b823 - 25,
    y: _0x34a525 - 25
  }];
  (_0x3094ce.forEach((_0x5c597d, _0x2ec022) => {
    const _0x12add7 = _0x2ec022 * 90 % 360, _0x2ceb05 = _0x3b77c0.createRadialGradient(_0x5c597d.x, _0x5c597d.y, 0, _0x5c597d.x, _0x5c597d.y, 25);
    (_0x2ceb05.addColorStop(0, "hsla(" + _0x12add7 + ", 100%, 70%, 0.9)"), _0x2ceb05.addColorStop(1, 'transparent'), _0x3b77c0.fillStyle = _0x2ceb05, _0x3b77c0.beginPath(), _0x3b77c0.arc(_0x5c597d.x, _0x5c597d.y, 25, 0, Math.PI * 2), _0x3b77c0.fill());
  }), _0x3b77c0.restore());
}
function addSignature(_0x2840e0, _0x520260, _0x4dfaf3) {
  _0x2840e0.save();
  const _0x5019ad = _0x520260 - 120, _0x57e650 = _0x4dfaf3 - 20;
  (_0x2840e0.font = 'italic\x2012px\x20\x22Arial\x22', _0x2840e0.fillStyle = "rgba(255, 255, 255, 0.8)", _0x2840e0.textAlign = 'right', _0x2840e0.textBaseline = 'bottom', _0x2840e0.shadowColor = "#FF00FF", _0x2840e0.shadowBlur = 8, _0x2840e0.fillText("by Lupin Stanley", _0x5019ad, _0x57e650));
  const _0x15434b = _0x2840e0.createLinearGradient(_0x5019ad - _0x2840e0.measureText("by Lupin Stanley").width, _0x57e650 + 2, _0x5019ad, _0x57e650 + 2);
  (_0x15434b.addColorStop(0, "#FF0080"), _0x15434b.addColorStop(0.5, "#0080FF"), _0x15434b.addColorStop(1, "#FFFF00"), _0x2840e0.strokeStyle = _0x15434b, _0x2840e0.lineWidth = 1, _0x2840e0.beginPath(), _0x2840e0.moveTo(_0x5019ad - _0x2840e0.measureText('by Lupin Stanley').width, _0x57e650 + 2), _0x2840e0.lineTo(_0x5019ad, _0x57e650 + 2), _0x2840e0.stroke(), _0x2840e0.shadowColor = 'transparent', _0x2840e0.shadowBlur = 0, _0x2840e0.restore());
}
