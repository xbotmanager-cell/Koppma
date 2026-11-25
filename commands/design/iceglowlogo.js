import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'iceglowlogo',
  description: "Create glowing ice text logos with radiant light effects",
  async execute(_0x306713, _0x165417, _0x34184c) {
    const _0x219277 = _0x165417.key.remoteJid;
    try {
      if (_0x34184c.length === 0) {
        await _0x306713.sendMessage(_0x219277, {
          text: "╭─⌈ " + DESIGN.ICE_GLOW + " *ICE GLOW LOGO* ⌋\n│\n├─⊷ *iceglowlogo*\n│  └⊷ iceglowlogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ iceglowlogo WOLF\n│  └⊷ iceglowlogo GLOW\n│  └⊷ iceglowlogo FROZEN\n│\n╰⊷ " + getFooter(_0x165417.key.participant || _0x165417.key.remoteJid)
        }, {
          quoted: _0x165417
        });
        return;
      }
      const _0x1c30c5 = _0x34184c.join('\x20');
      if (_0x1c30c5.length > 12) {
        await _0x306713.sendMessage(_0x219277, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 12 characters\n│  └⊷ Your text: \"" + _0x1c30c5 + "\" (" + _0x1c30c5.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x165417
        });
        return;
      }
      await _0x306713.sendMessage(_0x219277, {
        react: {
          text: STATUS.LOADING,
          key: _0x165417.key
        }
      });
      const _0x4e369b = await generateIceGlowLogo(_0x1c30c5);
      (await _0x306713.sendMessage(_0x219277, {
        image: _0x4e369b,
        caption: DESIGN.ICE_GLOW + " *Ice Glow Logo Generated!*\nText: " + _0x1c30c5 + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x165417
      }), await _0x306713.sendMessage(_0x219277, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x165417.key
        }
      }));
    } catch (_0x4fa65a) {
      (console.error(STATUS.ERROR + '\x20[ICEGLOWLOGO]\x20ERROR:', _0x4fa65a), await _0x306713.sendMessage(_0x219277, {
        react: {
          text: STATUS.ERROR,
          key: _0x165417.key
        }
      }).catch(() => {}), await _0x306713.sendMessage(_0x219277, {
        text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0x4fa65a.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x165417
      }));
    }
  }
};
async function generateIceGlowLogo(_0x5d3257) {
  const _0x35cdf6 = 800, _0x5155d9 = 400, _0x1a186e = createCanvas(_0x35cdf6, _0x5155d9), _0x3d1bcf = _0x1a186e.getContext('2d');
  (_0x3d1bcf.fillStyle = "#050a14", _0x3d1bcf.fillRect(0, 0, _0x35cdf6, _0x5155d9), drawGlowingBackground(_0x3d1bcf, _0x35cdf6, _0x5155d9));
  const _0x94e451 = _0x3d1bcf.createLinearGradient(0, 80, 0, 320);
  return (_0x94e451.addColorStop(0, "#FFFFFF"), _0x94e451.addColorStop(0.2, "#B8F8FF"), _0x94e451.addColorStop(0.4, '#80F0FF'), _0x94e451.addColorStop(0.6, "#48E8FF"), _0x94e451.addColorStop(0.8, "#20E0FF"), _0x94e451.addColorStop(1, "#00D8FF"), _0x3d1bcf.font = "bold 86px \"Arial\"", _0x3d1bcf.textAlign = "center", _0x3d1bcf.textBaseline = "middle", createIceGlowEffect(_0x3d1bcf, _0x5d3257, _0x35cdf6, _0x5155d9, _0x94e451), addLightRays(_0x3d1bcf, _0x35cdf6, _0x5155d9), addGlowParticles(_0x3d1bcf, _0x35cdf6, _0x5155d9), addCrystalGlow(_0x3d1bcf, _0x5d3257, _0x35cdf6, _0x5155d9), drawRadiantBorder(_0x3d1bcf, _0x35cdf6, _0x5155d9), addSignature(_0x3d1bcf, _0x35cdf6, _0x5155d9), addWatermark(_0x3d1bcf, _0x35cdf6, _0x5155d9), _0x1a186e.toBuffer("image/png"));
}
function drawGlowingBackground(_0x269bf3, _0x54f24f, _0x4ff40e) {
  const _0x17301b = _0x269bf3.createRadialGradient(_0x54f24f / 2, _0x4ff40e / 2, 0, _0x54f24f / 2, _0x4ff40e / 2, Math.max(_0x54f24f, _0x4ff40e) / 1.2);
  (_0x17301b.addColorStop(0, "#001a33"), _0x17301b.addColorStop(0.3, "#000a1a"), _0x17301b.addColorStop(0.7, "#000514"), _0x17301b.addColorStop(1, "#000000"), _0x269bf3.fillStyle = _0x17301b, _0x269bf3.fillRect(0, 0, _0x54f24f, _0x4ff40e), _0x269bf3.fillStyle = '#FFFFFF');
  for (let _0x1e579d = 0; _0x1e579d < 100; _0x1e579d++) {
    const _0x3183a9 = Math.random() * _0x54f24f, _0x35e277 = Math.random() * _0x4ff40e, _0x21da57 = Math.random() * 1.5, _0x9c1322 = 0.3 + Math.random() * 0.7;
    (_0x269bf3.globalAlpha = _0x9c1322, _0x269bf3.beginPath(), _0x269bf3.arc(_0x3183a9, _0x35e277, _0x21da57, 0, Math.PI * 2), _0x269bf3.fill());
  }
  _0x269bf3.globalAlpha = 1;
  const _0x455a61 = _0x269bf3.createLinearGradient(0, 0, 0, _0x4ff40e);
  (_0x455a61.addColorStop(0, "rgba(0, 100, 255, 0.1)"), _0x455a61.addColorStop(0.5, "rgba(0, 200, 255, 0.05)"), _0x455a61.addColorStop(1, "rgba(0, 150, 255, 0.08)"), _0x269bf3.fillStyle = _0x455a61, _0x269bf3.fillRect(0, 0, _0x54f24f, _0x4ff40e), addNebulaClouds(_0x269bf3, _0x54f24f, _0x4ff40e));
}
function addNebulaClouds(_0x53d01d, _0x3dc867, _0x8c6074) {
  (_0x53d01d.save(), _0x53d01d.globalAlpha = 0.3);
  const _0xa8b1f1 = [{
    x: _0x3dc867 * 0.2,
    y: _0x8c6074 * 0.3,
    size: 120,
    color: "rgba(0, 100, 255, 0.4)"
  }, {
    x: _0x3dc867 * 0.7,
    y: _0x8c6074 * 0.2,
    size: 90,
    color: "rgba(0, 150, 255, 0.3)"
  }, {
    x: _0x3dc867 * 0.3,
    y: _0x8c6074 * 0.7,
    size: 110,
    color: 'rgba(0,\x2080,\x20255,\x200.35)'
  }, {
    x: _0x3dc867 * 0.8,
    y: _0x8c6074 * 0.6,
    size: 80,
    color: 'rgba(0,\x20120,\x20255,\x200.25)'
  }];
  (_0xa8b1f1.forEach(_0x18ade9 => {
    const _0x4fad64 = _0x53d01d.createRadialGradient(_0x18ade9.x, _0x18ade9.y, 0, _0x18ade9.x, _0x18ade9.y, _0x18ade9.size);
    (_0x4fad64.addColorStop(0, _0x18ade9.color), _0x4fad64.addColorStop(1, "transparent"), _0x53d01d.fillStyle = _0x4fad64, _0x53d01d.beginPath(), _0x53d01d.arc(_0x18ade9.x, _0x18ade9.y, _0x18ade9.size, 0, Math.PI * 2), _0x53d01d.fill());
  }), _0x53d01d.restore());
}
function createIceGlowEffect(_0x309583, _0x41578f, _0x23684d, _0x367eaa, _0x2ecd88) {
  const _0x1fe3e7 = _0x23684d / 2, _0x4e67e7 = _0x367eaa / 2, _0x42dc37 = [{
    blur: 50,
    alpha: 0.3,
    offset: 0,
    color: "#00D8FF"
  }, {
    blur: 40,
    alpha: 0.4,
    offset: 0,
    color: '#20E0FF'
  }, {
    blur: 30,
    alpha: 0.5,
    offset: 0,
    color: '#48E8FF'
  }, {
    blur: 20,
    alpha: 0.6,
    offset: 0,
    color: "#80F0FF"
  }, {
    blur: 10,
    alpha: 0.7,
    offset: 0,
    color: '#B8F8FF'
  }];
  for (const _0x5b0e94 of _0x42dc37) {
    (_0x309583.shadowColor = _0x5b0e94.color, _0x309583.shadowBlur = _0x5b0e94.blur, _0x309583.fillStyle = "rgba(255, 255, 255, " + _0x5b0e94.alpha + ')', _0x309583.fillText(_0x41578f.toUpperCase(), _0x1fe3e7, _0x4e67e7 + _0x5b0e94.offset));
  }
  (_0x309583.shadowColor = "transparent", _0x309583.shadowBlur = 0, _0x309583.fillStyle = _0x2ecd88, _0x309583.fillText(_0x41578f.toUpperCase(), _0x1fe3e7, _0x4e67e7), _0x309583.save(), _0x309583.globalCompositeOperation = "screen", _0x309583.fillStyle = "rgba(180, 240, 255, 0.6)", _0x309583.fillText(_0x41578f.toUpperCase(), _0x1fe3e7, _0x4e67e7), _0x309583.restore(), _0x309583.strokeStyle = "rgba(255, 255, 255, 0.8)", _0x309583.lineWidth = 1.5, _0x309583.strokeText(_0x41578f.toUpperCase(), _0x1fe3e7, _0x4e67e7));
}
function addLightRays(_0x379027, _0x23451d, _0x284464) {
  const _0x13ad33 = _0x23451d / 2, _0x29b1fa = _0x284464 / 2;
  (_0x379027.save(), _0x379027.globalAlpha = 0.4);
  for (let _0x4282f5 = 0; _0x4282f5 < 16; _0x4282f5++) {
    const _0x5905d7 = _0x4282f5 / 16 * Math.PI * 2, _0x5cccfb = 450, _0x101f8b = Math.sin(Date.now() * 0.001 + _0x4282f5) * 0.2 + 0.8, _0x550456 = _0x379027.createLinearGradient(_0x13ad33, _0x29b1fa, _0x13ad33 + Math.cos(_0x5905d7) * _0x5cccfb, _0x29b1fa + Math.sin(_0x5905d7) * _0x5cccfb);
    (_0x550456.addColorStop(0, "rgba(0, 216, 255, " + 0.9 * _0x101f8b + ')'), _0x550456.addColorStop(0.7, "rgba(0, 150, 255, " + 0.5 * _0x101f8b + ')'), _0x550456.addColorStop(1, 'transparent'), _0x379027.strokeStyle = _0x550456, _0x379027.lineWidth = 12, _0x379027.beginPath(), _0x379027.moveTo(_0x13ad33, _0x29b1fa), _0x379027.lineTo(_0x13ad33 + Math.cos(_0x5905d7) * _0x5cccfb, _0x29b1fa + Math.sin(_0x5905d7) * _0x5cccfb), _0x379027.stroke());
  }
  _0x379027.restore();
}
function addGlowParticles(_0x527199, _0x395e75, _0xe0b93a) {
  const _0x2a32b9 = _0x395e75 / 2, _0x36c712 = _0xe0b93a / 2;
  (_0x527199.save(), _0x527199.globalAlpha = 0.8);
  for (let _0x1765e2 = 0; _0x1765e2 < 60; _0x1765e2++) {
    const _0x545ec1 = Math.random() * Math.PI * 2, _0x552a78 = 50 + Math.random() * 200, _0x544620 = 1 + Math.random() * 4, _0x5828fd = Math.sin(Date.now() * 0.002 + _0x1765e2) * 0.3 + 0.7, _0x406928 = _0x2a32b9 + Math.cos(_0x545ec1) * _0x552a78, _0x1d2fd9 = _0x36c712 + Math.sin(_0x545ec1) * _0x552a78, _0x516866 = _0x527199.createRadialGradient(_0x406928, _0x1d2fd9, 0, _0x406928, _0x1d2fd9, _0x544620 * 3);
    (_0x516866.addColorStop(0, 'rgba(0,\x20216,\x20255,\x20' + 0.9 * _0x5828fd + ')'), _0x516866.addColorStop(0.5, "rgba(0, 150, 255, " + 0.6 * _0x5828fd + ')'), _0x516866.addColorStop(1, "transparent"), _0x527199.fillStyle = _0x516866, _0x527199.beginPath(), _0x527199.arc(_0x406928, _0x1d2fd9, _0x544620 * 3, 0, Math.PI * 2), _0x527199.fill());
  }
  for (let _0x329619 = 0; _0x329619 < 25; _0x329619++) {
    const _0x5484d1 = Math.random() * _0x395e75, _0x39e560 = Math.random() * _0xe0b93a, _0x543da2 = 2 + Math.random() * 3, _0x47ec5a = 0.7 + Math.random() * 0.3;
    (_0x527199.fillStyle = "rgba(255, 255, 255, " + _0x47ec5a + ')', _0x527199.beginPath());
    for (let _0xff70f3 = 0; _0xff70f3 < 5; _0xff70f3++) {
      const _0x1827a0 = _0xff70f3 * Math.PI * 2 / 5, _0xbbbabf = _0x543da2, _0x5a611d = _0x543da2 * 0.4;
      (_0x527199.lineTo(_0x5484d1 + Math.cos(_0x1827a0) * _0xbbbabf, _0x39e560 + Math.sin(_0x1827a0) * _0xbbbabf), _0x527199.lineTo(_0x5484d1 + Math.cos(_0x1827a0 + Math.PI / 5) * _0x5a611d, _0x39e560 + Math.sin(_0x1827a0 + Math.PI / 5) * _0x5a611d));
    }
    (_0x527199.closePath(), _0x527199.fill(), _0x527199.shadowColor = "rgba(0, 216, 255, 0.8)", _0x527199.shadowBlur = 10, _0x527199.fill());
  }
  _0x527199.restore();
}
function addCrystalGlow(_0x18f1df, _0x3b3c4b, _0x2ab854, _0x1d40d8) {
  const _0x2e159b = _0x2ab854 / 2, _0xef4774 = _0x1d40d8 / 2, _0x57d0db = _0x18f1df.measureText(_0x3b3c4b.toUpperCase()).width;
  (_0x18f1df.save(), _0x18f1df.globalAlpha = 0.9);
  const _0xa8f276 = [{
    x: -0.35,
    y: -0.3,
    size: 6,
    intensity: 0.9
  }, {
    x: -0.2,
    y: -0.4,
    size: 7,
    intensity: 1
  }, {
    x: -0.05,
    y: -0.35,
    size: 5,
    intensity: 0.8
  }, {
    x: 0.1,
    y: -0.4,
    size: 6,
    intensity: 0.9
  }, {
    x: 0.25,
    y: -0.3,
    size: 5,
    intensity: 0.8
  }, {
    x: 0.35,
    y: -0.25,
    size: 4,
    intensity: 0.7
  }, {
    x: -0.3,
    y: 0.2,
    size: 3,
    intensity: 0.6
  }, {
    x: 0.25,
    y: 0.25,
    size: 3,
    intensity: 0.6
  }];
  (_0xa8f276.forEach(_0x210a98 => {
    const _0x1d3af4 = _0x2e159b + _0x210a98.x * _0x57d0db / 2, _0x39da6b = _0xef4774 + _0x210a98.y * 45, _0x335d8d = _0x18f1df.createRadialGradient(_0x1d3af4, _0x39da6b, 0, _0x1d3af4, _0x39da6b, _0x210a98.size * 2);
    (_0x335d8d.addColorStop(0, "rgba(255, 255, 255, " + _0x210a98.intensity + ')'), _0x335d8d.addColorStop(0.7, 'rgba(0,\x20216,\x20255,\x20' + _0x210a98.intensity * 0.7 + ')'), _0x335d8d.addColorStop(1, "transparent"), _0x18f1df.fillStyle = _0x335d8d, _0x18f1df.beginPath(), _0x18f1df.arc(_0x1d3af4, _0x39da6b, _0x210a98.size * 2, 0, Math.PI * 2), _0x18f1df.fill(), _0x18f1df.fillStyle = 'rgba(255,\x20255,\x20255,\x20' + _0x210a98.intensity + ')', _0x18f1df.beginPath(), _0x18f1df.arc(_0x1d3af4, _0x39da6b, _0x210a98.size * 0.5, 0, Math.PI * 2), _0x18f1df.fill());
  }), _0x18f1df.restore());
}
function drawRadiantBorder(_0x1f9600, _0x60f2f9, _0x86b3e5) {
  const _0x15ae35 = _0x1f9600.createLinearGradient(0, 0, _0x60f2f9, _0x86b3e5);
  (_0x15ae35.addColorStop(0, "#B8F8FF"), _0x15ae35.addColorStop(0.25, "#80F0FF"), _0x15ae35.addColorStop(0.5, "#20E0FF"), _0x15ae35.addColorStop(0.75, '#80F0FF'), _0x15ae35.addColorStop(1, "#B8F8FF"), _0x1f9600.strokeStyle = _0x15ae35, _0x1f9600.lineWidth = 8, _0x1f9600.shadowColor = "rgba(0, 216, 255, 0.8)", _0x1f9600.shadowBlur = 25, _0x1f9600.strokeRect(12, 12, _0x60f2f9 - 24, _0x86b3e5 - 24), _0x1f9600.strokeStyle = "rgba(180, 240, 255, 0.6)", _0x1f9600.lineWidth = 3, _0x1f9600.shadowBlur = 15, _0x1f9600.strokeRect(20, 20, _0x60f2f9 - 40, _0x86b3e5 - 40), _0x1f9600.strokeStyle = "rgba(255, 255, 255, 0.4)", _0x1f9600.lineWidth = 1, _0x1f9600.shadowBlur = 0, _0x1f9600.strokeRect(28, 28, _0x60f2f9 - 56, _0x86b3e5 - 56), addCornerGlow(_0x1f9600, _0x60f2f9, _0x86b3e5));
}
function addCornerGlow(_0x5b4700, _0x403ef9, _0x2033d1) {
  (_0x5b4700.save(), _0x5b4700.globalAlpha = 0.6);
  const _0x259ee3 = [{
    x: 25,
    y: 25
  }, {
    x: _0x403ef9 - 25,
    y: 25
  }, {
    x: 25,
    y: _0x2033d1 - 25
  }, {
    x: _0x403ef9 - 25,
    y: _0x2033d1 - 25
  }];
  (_0x259ee3.forEach(_0x24a21c => {
    const _0x4598d9 = _0x5b4700.createRadialGradient(_0x24a21c.x, _0x24a21c.y, 0, _0x24a21c.x, _0x24a21c.y, 20);
    (_0x4598d9.addColorStop(0, "rgba(0, 216, 255, 0.9)"), _0x4598d9.addColorStop(1, "transparent"), _0x5b4700.fillStyle = _0x4598d9, _0x5b4700.beginPath(), _0x5b4700.arc(_0x24a21c.x, _0x24a21c.y, 20, 0, Math.PI * 2), _0x5b4700.fill());
  }), _0x5b4700.restore());
}
function addSignature(_0x90c4d, _0x41c952, _0x4047ad) {
  _0x90c4d.save();
  const _0x28d203 = _0x41c952 - 120, _0x1dc039 = _0x4047ad - 20;
  (_0x90c4d.font = "italic 12px \"Arial\"", _0x90c4d.fillStyle = "rgba(0, 216, 255, 0.8)", _0x90c4d.textAlign = "right", _0x90c4d.textBaseline = "bottom", _0x90c4d.shadowColor = "rgba(0, 150, 255, 0.6)", _0x90c4d.shadowBlur = 5, _0x90c4d.fillText("by Silent Wolf", _0x28d203, _0x1dc039), _0x90c4d.strokeStyle = 'rgba(0,\x20216,\x20255,\x200.5)', _0x90c4d.lineWidth = 0.8);
  const _0x577e12 = _0x90c4d.measureText("by Silent Wolf").width;
  (_0x90c4d.beginPath(), _0x90c4d.moveTo(_0x28d203 - _0x577e12, _0x1dc039 + 2), _0x90c4d.lineTo(_0x28d203, _0x1dc039 + 2), _0x90c4d.stroke(), _0x90c4d.shadowColor = "transparent", _0x90c4d.shadowBlur = 0, _0x90c4d.restore());
}
