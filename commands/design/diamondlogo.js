import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'diamondlogo',
  description: "Create brilliant diamond crystal text logos",
  async execute(_0x194b09, _0xec503a, _0x5b2f15) {
    const _0x390307 = _0xec503a.key.remoteJid;
    try {
      if (_0x5b2f15.length === 0) {
        await _0x194b09.sendMessage(_0x390307, {
          text: "╭─⌈ " + DESIGN.CRYSTAL + " *DIAMOND LOGO* ⌋\n│\n├─⊷ *diamondlogo*\n│  └⊷ diamondlogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ diamondlogo WOLF\n│  └⊷ diamondlogo DIAMOND\n│  └⊷ diamondlogo CRYSTAL\n│\n╰⊷ " + getFooter(_0xec503a.key.participant || _0xec503a.key.remoteJid)
        }, {
          quoted: _0xec503a
        });
        return;
      }
      const _0x5181af = _0x5b2f15.join('\x20');
      if (_0x5181af.length > 12) {
        await _0x194b09.sendMessage(_0x390307, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 12 characters\n│  └⊷ Your text: \"" + _0x5181af + "\" (" + _0x5181af.length + " chars)\n│\n╰───"
        }, {
          quoted: _0xec503a
        });
        return;
      }
      await _0x194b09.sendMessage(_0x390307, {
        react: {
          text: STATUS.LOADING,
          key: _0xec503a.key
        }
      });
      const _0x2f037e = await generateDiamondLogo(_0x5181af);
      (await _0x194b09.sendMessage(_0x390307, {
        image: _0x2f037e,
        caption: DESIGN.CRYSTAL + " *Diamond Logo Generated!*\nText: " + _0x5181af + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0xec503a
      }), await _0x194b09.sendMessage(_0x390307, {
        react: {
          text: STATUS.SUCCESS,
          key: _0xec503a.key
        }
      }));
    } catch (_0x5f1b54) {
      (console.error(STATUS.ERROR + '\x20[DIAMONDLOGO]\x20ERROR:', _0x5f1b54), await _0x194b09.sendMessage(_0x390307, {
        react: {
          text: STATUS.ERROR,
          key: _0xec503a.key
        }
      }).catch(() => {}), await _0x194b09.sendMessage(_0x390307, {
        text: "╭─⌈ " + STATUS.ERROR + '\x20*ERROR*\x20⌋\x0a│\x0a├─⊷\x20' + _0x5f1b54.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0xec503a
      }));
    }
  }
};
async function generateDiamondLogo(_0x41b4d6) {
  const _0x5b8b3d = 800, _0x165e13 = 400, _0xe22c29 = createCanvas(_0x5b8b3d, _0x165e13), _0x3d129b = _0xe22c29.getContext('2d');
  return (_0x3d129b.fillStyle = "#050514", _0x3d129b.fillRect(0, 0, _0x5b8b3d, _0x165e13), drawStarfieldBackground(_0x3d129b, _0x5b8b3d, _0x165e13), createDiamondFacets(_0x3d129b, _0x41b4d6, _0x5b8b3d, _0x165e13), addDiamondReflections(_0x3d129b, _0x41b4d6, _0x5b8b3d, _0x165e13), addRainbowRefraction(_0x3d129b, _0x5b8b3d, _0x165e13), addDiamondSparkles(_0x3d129b, _0x5b8b3d, _0x165e13), drawDiamondBorder(_0x3d129b, _0x5b8b3d, _0x165e13), addWatermark(_0x3d129b, _0x5b8b3d, _0x165e13), _0xe22c29.toBuffer('image/png'));
}
function drawStarfieldBackground(_0x4bd7f7, _0x55117b, _0x41213f) {
  _0x4bd7f7.fillStyle = "#FFFFFF";
  for (let _0x4fa999 = 0; _0x4fa999 < 200; _0x4fa999++) {
    const _0x494b9b = Math.random() * _0x55117b, _0xbda20d = Math.random() * _0x41213f, _0x53698d = Math.random() * 1.5, _0x3e2d5e = 0.3 + Math.random() * 0.7;
    (_0x4bd7f7.globalAlpha = _0x3e2d5e, _0x4bd7f7.beginPath(), _0x4bd7f7.arc(_0x494b9b, _0xbda20d, _0x53698d, 0, Math.PI * 2), _0x4bd7f7.fill());
  }
  _0x4bd7f7.globalAlpha = 1;
  const _0x2b0c33 = _0x4bd7f7.createRadialGradient(_0x55117b * 0.7, _0x41213f * 0.3, 0, _0x55117b * 0.7, _0x41213f * 0.3, 300);
  (_0x2b0c33.addColorStop(0, "rgba(30, 30, 80, 0.3)"), _0x2b0c33.addColorStop(1, "transparent"), _0x4bd7f7.fillStyle = _0x2b0c33, _0x4bd7f7.fillRect(0, 0, _0x55117b, _0x41213f));
}
function createDiamondFacets(_0x14fe45, _0x190f0e, _0x3a771a, _0x3f2165) {
  const _0x4fd07a = _0x3a771a / 2, _0x1f9184 = _0x3f2165 / 2, _0x52b808 = 8;
  for (let _0x511b5a = 0; _0x511b5a < _0x52b808; _0x511b5a++) {
    const _0x2930cb = _0x511b5a * 1.5, _0x683252 = 0.1 + _0x511b5a / _0x52b808 * 0.4, _0x387aae = 210 + _0x511b5a * 5, _0x1f2d98 = "hsla(" + _0x387aae + ',\x2030%,\x20' + (80 - _0x511b5a * 5) + "%, " + _0x683252 + ')';
    (_0x14fe45.fillStyle = _0x1f2d98, _0x14fe45.font = "bold 90px \"Arial\"", _0x14fe45.textAlign = "center", _0x14fe45.textBaseline = "middle", _0x14fe45.fillText(_0x190f0e.toUpperCase(), _0x4fd07a + _0x2930cb, _0x1f9184 + _0x2930cb));
  }
  (_0x14fe45.fillStyle = 'rgba(255,\x20255,\x20255,\x200.9)', _0x14fe45.font = 'bold\x2090px\x20\x22Arial\x22', _0x14fe45.textAlign = "center", _0x14fe45.textBaseline = "middle", _0x14fe45.fillText(_0x190f0e.toUpperCase(), _0x4fd07a, _0x1f9184));
}
function addDiamondReflections(_0x3807dc, _0x2b92fb, _0x256673, _0x3d6d4b) {
  const _0x2fa3a4 = _0x256673 / 2, _0x3ed10f = _0x3d6d4b / 2;
  _0x3807dc.save();
  const _0x295aae = _0x3807dc.createLinearGradient(_0x2fa3a4 - 250, _0x3ed10f - 60, _0x2fa3a4 + 250, _0x3ed10f + 40);
  (_0x295aae.addColorStop(0, "rgba(255, 255, 255, 0)"), _0x295aae.addColorStop(0.3, "rgba(255, 255, 255, 0.9)"), _0x295aae.addColorStop(0.5, "rgba(255, 255, 255, 0.95)"), _0x295aae.addColorStop(0.7, "rgba(255, 255, 255, 0.8)"), _0x295aae.addColorStop(1, "rgba(255, 255, 255, 0)"), _0x3807dc.globalCompositeOperation = 'screen', _0x3807dc.fillStyle = _0x295aae, _0x3807dc.font = 'bold\x2090px\x20\x22Arial\x22', _0x3807dc.textAlign = "center", _0x3807dc.textBaseline = 'middle', _0x3807dc.fillText(_0x2b92fb.toUpperCase(), _0x2fa3a4, _0x3ed10f), _0x3807dc.globalCompositeOperation = "source-over");
  const _0x2acdfc = _0x3807dc.measureText(_0x2b92fb.toUpperCase()).width, _0x32c78c = [{
    x: -0.4,
    y: -0.3,
    size: 12,
    brightness: 0.9
  }, {
    x: -0.25,
    y: -0.4,
    size: 8,
    brightness: 0.8
  }, {
    x: -0.1,
    y: -0.35,
    size: 10,
    brightness: 0.85
  }, {
    x: 0.05,
    y: -0.4,
    size: 9,
    brightness: 0.8
  }, {
    x: 0.2,
    y: -0.35,
    size: 11,
    brightness: 0.9
  }, {
    x: 0.35,
    y: -0.3,
    size: 7,
    brightness: 0.75
  }, {
    x: -0.3,
    y: 0.2,
    size: 6,
    brightness: 0.7
  }, {
    x: 0.25,
    y: 0.25,
    size: 5,
    brightness: 0.6
  }];
  (_0x32c78c.forEach(_0x37a96e => {
    const _0x35cbd9 = _0x2fa3a4 + _0x37a96e.x * _0x2acdfc / 2, _0x3134ce = _0x3ed10f + _0x37a96e.y * 50;
    (_0x3807dc.fillStyle = 'rgba(255,\x20255,\x20255,\x20' + _0x37a96e.brightness + ')', _0x3807dc.beginPath());
    const _0x2d4d87 = _0x37a96e.size;
    (_0x3807dc.moveTo(_0x35cbd9, _0x3134ce - _0x2d4d87), _0x3807dc.lineTo(_0x35cbd9 + _0x2d4d87 * 0.7, _0x3134ce), _0x3807dc.lineTo(_0x35cbd9, _0x3134ce + _0x2d4d87), _0x3807dc.lineTo(_0x35cbd9 - _0x2d4d87 * 0.7, _0x3134ce), _0x3807dc.closePath(), _0x3807dc.fill(), _0x3807dc.shadowColor = "rgba(255, 255, 255, 0.8)", _0x3807dc.shadowBlur = 15, _0x3807dc.fill());
  }), _0x3807dc.restore());
}
function addRainbowRefraction(_0x354b51, _0x2f4c6b, _0x33683a) {
  const _0x297ee2 = _0x2f4c6b / 2, _0x3add6a = _0x33683a / 2;
  (_0x354b51.save(), _0x354b51.globalCompositeOperation = "screen");
  const _0xb19200 = [{
    color: "rgba(255, 0, 0, 0.3)",
    angle: -0.3
  }, {
    color: "rgba(255, 165, 0, 0.25)",
    angle: -0.15
  }, {
    color: "rgba(255, 255, 0, 0.2)",
    angle: 0
  }, {
    color: "rgba(0, 255, 0, 0.25)",
    angle: 0.15
  }, {
    color: 'rgba(0,\x200,\x20255,\x200.3)',
    angle: 0.3
  }, {
    color: "rgba(75, 0, 130, 0.25)",
    angle: 0.45
  }, {
    color: "rgba(238, 130, 238, 0.2)",
    angle: 0.6
  }];
  (_0xb19200.forEach((_0x3591c4, _0x5e8d2d) => {
    const _0x2915f6 = _0x3591c4.angle, _0x24a796 = 60 + _0x5e8d2d * 8, _0x3a71a2 = _0x354b51.createRadialGradient(_0x297ee2 + Math.cos(_0x2915f6) * _0x24a796, _0x3add6a + Math.sin(_0x2915f6) * _0x24a796, 0, _0x297ee2 + Math.cos(_0x2915f6) * _0x24a796, _0x3add6a + Math.sin(_0x2915f6) * _0x24a796, 80);
    (_0x3a71a2.addColorStop(0, _0x3591c4.color), _0x3a71a2.addColorStop(1, "transparent"), _0x354b51.fillStyle = _0x3a71a2, _0x354b51.beginPath(), _0x354b51.arc(_0x297ee2 + Math.cos(_0x2915f6) * _0x24a796, _0x3add6a + Math.sin(_0x2915f6) * _0x24a796, 80, 0, Math.PI * 2), _0x354b51.fill());
  }), _0x354b51.restore());
}
function addDiamondSparkles(_0x53b233, _0x1e24e4, _0x1b1f65) {
  (_0x53b233.save(), _0x53b233.globalAlpha = 0.9);
  for (let _0x140342 = 0; _0x140342 < 50; _0x140342++) {
    const _0x81c422 = Math.random() * _0x1e24e4, _0x2fd30c = Math.random() * _0x1b1f65, _0x21ff8a = 1 + Math.random() * 3, _0x1d5d0b = 0.7 + Math.random() * 0.3;
    (_0x53b233.fillStyle = 'rgba(255,\x20255,\x20255,\x20' + _0x1d5d0b + ')', _0x53b233.beginPath(), _0x53b233.moveTo(_0x81c422, _0x2fd30c - _0x21ff8a), _0x53b233.lineTo(_0x81c422 + _0x21ff8a * 0.3, _0x2fd30c - _0x21ff8a * 0.3), _0x53b233.lineTo(_0x81c422 + _0x21ff8a, _0x2fd30c), _0x53b233.lineTo(_0x81c422 + _0x21ff8a * 0.3, _0x2fd30c + _0x21ff8a * 0.3), _0x53b233.lineTo(_0x81c422, _0x2fd30c + _0x21ff8a), _0x53b233.lineTo(_0x81c422 - _0x21ff8a * 0.3, _0x2fd30c + _0x21ff8a * 0.3), _0x53b233.lineTo(_0x81c422 - _0x21ff8a, _0x2fd30c), _0x53b233.lineTo(_0x81c422 - _0x21ff8a * 0.3, _0x2fd30c - _0x21ff8a * 0.3), _0x53b233.closePath(), _0x53b233.fill(), _0x53b233.shadowColor = "rgba(255, 255, 255, 0.8)", _0x53b233.shadowBlur = 10, _0x53b233.fill());
  }
  (_0x53b233.shadowColor = "transparent", _0x53b233.shadowBlur = 0, _0x53b233.restore());
}
function drawDiamondBorder(_0xfb443c, _0x16a851, _0x2e0e1f) {
  (_0xfb443c.strokeStyle = "rgba(200, 220, 255, 0.6)", _0xfb443c.lineWidth = 6, _0xfb443c.shadowColor = "rgba(100, 150, 255, 0.4)", _0xfb443c.shadowBlur = 20, _0xfb443c.strokeRect(15, 15, _0x16a851 - 30, _0x2e0e1f - 30));
  const _0x2849f9 = [{
    x: 30,
    y: 30
  }, {
    x: _0x16a851 - 30,
    y: 30
  }, {
    x: 30,
    y: _0x2e0e1f - 30
  }, {
    x: _0x16a851 - 30,
    y: _0x2e0e1f - 30
  }];
  (_0x2849f9.forEach(_0x3263b3 => {
    drawDiamondStud(_0xfb443c, _0x3263b3.x, _0x3263b3.y, 8);
  }), _0xfb443c.shadowColor = "transparent", _0xfb443c.shadowBlur = 0);
}
function drawDiamondStud(_0x1054d2, _0x1d67da, _0x55b679, _0x39477d) {
  (_0x1054d2.save(), _0x1054d2.fillStyle = 'rgba(255,\x20255,\x20255,\x200.9)', _0x1054d2.beginPath(), _0x1054d2.moveTo(_0x1d67da, _0x55b679 - _0x39477d), _0x1054d2.lineTo(_0x1d67da + _0x39477d, _0x55b679), _0x1054d2.lineTo(_0x1d67da, _0x55b679 + _0x39477d), _0x1054d2.lineTo(_0x1d67da - _0x39477d, _0x55b679), _0x1054d2.closePath(), _0x1054d2.fill(), _0x1054d2.fillStyle = "rgba(255, 255, 255, 0.6)", _0x1054d2.beginPath(), _0x1054d2.moveTo(_0x1d67da - _0x39477d * 0.3, _0x55b679 - _0x39477d * 0.3), _0x1054d2.lineTo(_0x1d67da, _0x55b679 - _0x39477d * 0.1), _0x1054d2.lineTo(_0x1d67da + _0x39477d * 0.1, _0x55b679), _0x1054d2.lineTo(_0x1d67da - _0x39477d * 0.1, _0x55b679 + _0x39477d * 0.3), _0x1054d2.closePath(), _0x1054d2.fill(), _0x1054d2.restore());
}
async function generateSimpleDiamondLogo(_0x1ae324) {
  const _0x4aaeca = 600, _0x2ace8b = 300, _0x4f50fc = createCanvas(_0x4aaeca, _0x2ace8b), _0x2a69f9 = _0x4f50fc.getContext('2d');
  (_0x2a69f9.fillStyle = '#0a0a1a', _0x2a69f9.fillRect(0, 0, _0x4aaeca, _0x2ace8b));
  const _0x37cf71 = _0x2a69f9.createLinearGradient(0, 40, 0, 260);
  (_0x37cf71.addColorStop(0, "#FFFFFF"), _0x37cf71.addColorStop(0.3, "#E0F0FF"), _0x37cf71.addColorStop(0.6, "#A0C0FF"), _0x37cf71.addColorStop(1, "#6080FF"), _0x2a69f9.font = 'bold\x2070px\x20Arial', _0x2a69f9.fillStyle = _0x37cf71, _0x2a69f9.textAlign = "center", _0x2a69f9.textBaseline = 'middle', _0x2a69f9.shadowColor = "rgba(100, 150, 255, 0.6)", _0x2a69f9.shadowBlur = 20, _0x2a69f9.fillText(_0x1ae324.toUpperCase(), _0x4aaeca / 2, _0x2ace8b / 2), _0x2a69f9.shadowBlur = 0);
  for (let _0x28e39e = 0; _0x28e39e < 10; _0x28e39e++) {
    const _0x1f19b3 = 50 + Math.random() * (_0x4aaeca - 100), _0x2745d9 = 50 + Math.random() * (_0x2ace8b - 100), _0x263fe4 = 2 + Math.random() * 4;
    (_0x2a69f9.fillStyle = "rgba(255, 255, 255, 0.8)", _0x2a69f9.beginPath(), _0x2a69f9.arc(_0x1f19b3, _0x2745d9, _0x263fe4, 0, Math.PI * 2), _0x2a69f9.fill());
  }
  return _0x4f50fc.toBuffer('image/png');
}
