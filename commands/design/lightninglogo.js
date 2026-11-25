import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "lightninglogo",
  description: "Create electrifying text logos with realistic lightning and storm effects",
  async execute(_0x1f211a, _0x206432, _0x59e419) {
    const _0x2fe130 = _0x206432.key.remoteJid;
    try {
      if (_0x59e419.length === 0) {
        await _0x1f211a.sendMessage(_0x2fe130, {
          text: '╭─⌈\x20' + DESIGN.LIGHTNING + " *LIGHTNING LOGO* ⌋\n│\n├─⊷ *lightninglogo*\n│  └⊷ lightninglogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ lightninglogo BOLT\n│  └⊷ lightninglogo THOR\n│  └⊷ lightninglogo STORM\n│\n╰⊷ " + getFooter(_0x206432.key.participant || _0x206432.key.remoteJid)
        }, {
          quoted: _0x206432
        });
        return;
      }
      const _0x3abcfb = _0x59e419.join('\x20');
      if (_0x3abcfb.length > 10) {
        await _0x1f211a.sendMessage(_0x2fe130, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 10 characters\n│  └⊷ Your text: \"" + _0x3abcfb + "\" (" + _0x3abcfb.length + '\x20chars)\x0a│\x0a╰───'
        }, {
          quoted: _0x206432
        });
        return;
      }
      await _0x1f211a.sendMessage(_0x2fe130, {
        react: {
          text: STATUS.LOADING,
          key: _0x206432.key
        }
      });
      const _0x4ce55c = await generateLightningLogo(_0x3abcfb);
      (await _0x1f211a.sendMessage(_0x2fe130, {
        image: _0x4ce55c,
        caption: DESIGN.LIGHTNING + '\x20*Lightning\x20Logo\x20Generated!*\x0aText:\x20' + _0x3abcfb + '\x0a\x0a_Created\x20by\x20' + getBotName() + '_'
      }, {
        quoted: _0x206432
      }), await _0x1f211a.sendMessage(_0x2fe130, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x206432.key
        }
      }));
    } catch (_0x5bcd89) {
      (console.error(STATUS.ERROR + " [LIGHTNINGLOGO] ERROR:", _0x5bcd89), await _0x1f211a.sendMessage(_0x2fe130, {
        react: {
          text: STATUS.ERROR,
          key: _0x206432.key
        }
      }).catch(() => {}), await _0x1f211a.sendMessage(_0x2fe130, {
        text: "╭─⌈ " + STATUS.ERROR + '\x20*ERROR*\x20⌋\x0a│\x0a├─⊷\x20' + _0x5bcd89.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x206432
      }));
    }
  }
};
async function generateLightningLogo(_0x97eea4) {
  const _0x3c98ee = 800, _0x584f4b = 400, _0x3d3aea = createCanvas(_0x3c98ee, _0x584f4b), _0x324b30 = _0x3d3aea.getContext('2d');
  createStormBackground(_0x324b30, _0x3c98ee, _0x584f4b);
  const _0x3a0913 = generateLightningBolts(_0x324b30, _0x3c98ee, _0x584f4b);
  return (addLightningGlow(_0x324b30, _0x3a0913), addElectricalArcs(_0x324b30, _0x3c98ee, _0x584f4b), drawElectrifiedText(_0x324b30, _0x97eea4, _0x3c98ee, _0x584f4b), addStormClouds(_0x324b30, _0x3c98ee, _0x584f4b), addRainEffects(_0x324b30, _0x3c98ee, _0x584f4b), addEnergyParticles(_0x324b30, _0x3c98ee, _0x584f4b), drawElectricBorder(_0x324b30, _0x3c98ee, _0x584f4b), addLightningSignature(_0x324b30, _0x3c98ee, _0x584f4b), addWatermark(_0x324b30, _0x3c98ee, _0x584f4b), _0x3d3aea.toBuffer('image/png'));
}
function createStormBackground(_0x33a5a2, _0x1f360a, _0x53c0cc) {
  const _0x35dd68 = _0x33a5a2.createLinearGradient(0, 0, 0, _0x53c0cc);
  (_0x35dd68.addColorStop(0, "#0a0a1a"), _0x35dd68.addColorStop(0.3, "#1a1a2a"), _0x35dd68.addColorStop(0.6, "#2a2a3a"), _0x35dd68.addColorStop(1, "#1a1a2a"), _0x33a5a2.fillStyle = _0x35dd68, _0x33a5a2.fillRect(0, 0, _0x1f360a, _0x53c0cc), addBackgroundLightningFlashes(_0x33a5a2, _0x1f360a, _0x53c0cc));
}
function generateLightningBolts(_0x115e40, _0x5a4ad7, _0x309a03) {
  const _0x508396 = [], _0xccbf6a = createLightningBolt(_0x115e40, _0x5a4ad7 * 0.7, _0x309a03 * 0.1, _0x5a4ad7 * 0.3, _0x309a03 * 0.9, 5, 0.7);
  (_0x508396.push(_0xccbf6a), _0x508396.push(createLightningBolt(_0x115e40, _0x5a4ad7 * 0.8, _0x309a03 * 0.05, _0x5a4ad7 * 0.5, _0x309a03 * 0.7, 4, 0.5)), _0x508396.push(createLightningBolt(_0x115e40, _0x5a4ad7 * 0.6, _0x309a03 * 0.15, _0x5a4ad7 * 0.2, _0x309a03 * 0.8, 3, 0.4)));
  for (let _0x2ec7d6 = 0; _0x2ec7d6 < 8; _0x2ec7d6++) {
    const _0x4c8d67 = _0x5a4ad7 * 0.7 + (Math.random() - 0.5) * 100, _0x1f4b7b = _0x309a03 * 0.1 + Math.random() * _0x309a03 * 0.3, _0x4dc44c = _0x5a4ad7 * 0.3 + (Math.random() - 0.5) * 200, _0x3fdc9a = _0x309a03 * 0.7 + Math.random() * _0x309a03 * 0.2;
    _0x508396.push(createLightningBolt(_0x115e40, _0x4c8d67, _0x1f4b7b, _0x4dc44c, _0x3fdc9a, 2, 0.3));
  }
  return _0x508396;
}
function createLightningBolt(_0x7fbbcf, _0x35e551, _0x5ae350, _0x158a91, _0x376e6d, _0x7554cf, _0x4ba756) {
  _0x7fbbcf.save();
  const _0x3f9aff = generateLightningPath(_0x35e551, _0x5ae350, _0x158a91, _0x376e6d, _0x7554cf);
  (_0x7fbbcf.strokeStyle = "rgba(255, 255, 255, " + _0x4ba756 + ')', _0x7fbbcf.lineWidth = 3, _0x7fbbcf.lineCap = "round", _0x7fbbcf.lineJoin = "round", _0x7fbbcf.beginPath(), _0x7fbbcf.moveTo(_0x3f9aff[0].x, _0x3f9aff[0].y));
  for (let _0x4d7243 = 1; _0x4d7243 < _0x3f9aff.length; _0x4d7243++) {
    _0x7fbbcf.lineTo(_0x3f9aff[_0x4d7243].x, _0x3f9aff[_0x4d7243].y);
  }
  (_0x7fbbcf.stroke(), _0x7fbbcf.strokeStyle = 'rgba(200,\x20220,\x20255,\x20' + _0x4ba756 * 1.2 + ')', _0x7fbbcf.lineWidth = 1.5, _0x7fbbcf.beginPath(), _0x7fbbcf.moveTo(_0x3f9aff[0].x, _0x3f9aff[0].y));
  for (let _0x30dc57 = 1; _0x30dc57 < _0x3f9aff.length; _0x30dc57++) {
    _0x7fbbcf.lineTo(_0x3f9aff[_0x30dc57].x, _0x3f9aff[_0x30dc57].y);
  }
  return (_0x7fbbcf.stroke(), _0x7fbbcf.restore(), {
    points: _0x3f9aff,
    intensity: _0x4ba756,
    startX: _0x35e551,
    startY: _0x5ae350,
    endX: _0x158a91,
    endY: _0x376e6d
  });
}
function generateLightningPath(_0x4d4bab, _0x3f403e, _0x27d406, _0x41049b, _0x629975) {
  const _0x5f452b = [{
    x: _0x4d4bab,
    y: _0x3f403e
  }];
  function _0x40e434(_0x103302, _0x235b13, _0x49985c) {
    if (_0x49985c <= 0) return;
    const _0x3a741f = (_0x103302.x + _0x235b13.x) / 2, _0x4bb2b3 = (_0x103302.y + _0x235b13.y) / 2, _0x3f37aa = (Math.random() - 0.5) * (50 / _0x49985c), _0xae190b = Math.atan2(_0x235b13.y - _0x103302.y, _0x235b13.x - _0x103302.x), _0x3b97d3 = _0x3a741f + Math.cos(_0xae190b + Math.PI / 2) * _0x3f37aa, _0x1e05f9 = _0x4bb2b3 + Math.sin(_0xae190b + Math.PI / 2) * _0x3f37aa, _0xb7b09a = {
      x: _0x3b97d3,
      y: _0x1e05f9
    };
    (_0x40e434(_0x103302, _0xb7b09a, _0x49985c - 1), _0x5f452b.push(_0xb7b09a), _0x40e434(_0xb7b09a, _0x235b13, _0x49985c - 1));
  }
  return (_0x40e434({
    x: _0x4d4bab,
    y: _0x3f403e
  }, {
    x: _0x27d406,
    y: _0x41049b
  }, _0x629975), _0x5f452b.push({
    x: _0x27d406,
    y: _0x41049b
  }), _0x5f452b);
}
function addLightningGlow(_0x4fa375, _0x2d12b8) {
  (_0x4fa375.save(), _0x4fa375.globalCompositeOperation = 'screen', _0x2d12b8.forEach(_0x5ccd66 => {
    const _0x2e0d92 = _0x4fa375.createRadialGradient(_0x5ccd66.startX, _0x5ccd66.startY, 0, _0x5ccd66.startX, _0x5ccd66.startY, 100);
    (_0x2e0d92.addColorStop(0, "rgba(100, 150, 255, " + _0x5ccd66.intensity * 0.3 + ')'), _0x2e0d92.addColorStop(1, "transparent"), _0x4fa375.fillStyle = _0x2e0d92, _0x4fa375.beginPath(), _0x4fa375.arc(_0x5ccd66.startX, _0x5ccd66.startY, 100, 0, Math.PI * 2), _0x4fa375.fill(), _0x4fa375.strokeStyle = "rgba(80, 120, 255, " + _0x5ccd66.intensity * 0.4 + ')', _0x4fa375.lineWidth = 20, _0x4fa375.lineCap = "round", _0x4fa375.beginPath(), _0x4fa375.moveTo(_0x5ccd66.points[0].x, _0x5ccd66.points[0].y));
    for (let _0x292459 = 1; _0x292459 < _0x5ccd66.points.length; _0x292459++) {
      _0x4fa375.lineTo(_0x5ccd66.points[_0x292459].x, _0x5ccd66.points[_0x292459].y);
    }
    (_0x4fa375.stroke(), _0x4fa375.strokeStyle = "rgba(150, 200, 255, " + _0x5ccd66.intensity * 0.6 + ')', _0x4fa375.lineWidth = 10, _0x4fa375.beginPath(), _0x4fa375.moveTo(_0x5ccd66.points[0].x, _0x5ccd66.points[0].y));
    for (let _0x30a405 = 1; _0x30a405 < _0x5ccd66.points.length; _0x30a405++) {
      _0x4fa375.lineTo(_0x5ccd66.points[_0x30a405].x, _0x5ccd66.points[_0x30a405].y);
    }
    _0x4fa375.stroke();
  }), _0x4fa375.restore());
}
function addElectricalArcs(_0x4d0ef5, _0x187ef0, _0x5e9136) {
  (_0x4d0ef5.save(), _0x4d0ef5.globalCompositeOperation = "screen");
  for (let _0x3d5a28 = 0; _0x3d5a28 < 15; _0x3d5a28++) {
    const _0x37e1b9 = _0x187ef0 * 0.3 + Math.random() * _0x187ef0 * 0.4, _0x58c439 = _0x5e9136 * 0.4 + Math.random() * _0x5e9136 * 0.3, _0x3d2821 = 20 + Math.random() * 50;
    drawElectricalArc(_0x4d0ef5, _0x37e1b9, _0x58c439, _0x3d2821);
  }
  for (let _0x59dfda = 0; _0x59dfda < 5; _0x59dfda++) {
    const _0x45e53b = _0x187ef0 * 0.2 + Math.random() * _0x187ef0 * 0.6, _0x28bbbd = _0x5e9136 * 0.85;
    drawGroundStrike(_0x4d0ef5, _0x45e53b, _0x28bbbd);
  }
  _0x4d0ef5.restore();
}
function drawElectricalArc(_0x69072c, _0x3c8786, _0x26cdfb, _0x2bf4ef) {
  const _0xb008f3 = [];
  _0xb008f3.push({
    x: _0x3c8786,
    y: _0x26cdfb
  });
  for (let _0x3e2875 = 0; _0x3e2875 < 8; _0x3e2875++) {
    _0xb008f3.push({
      x: _0x3c8786 + (Math.random() - 0.5) * _0x2bf4ef * 2,
      y: _0x26cdfb + (Math.random() - 0.5) * _0x2bf4ef
    });
  }
  const _0x555623 = ['rgba(100,\x20150,\x20255,\x200.8)', "rgba(150, 200, 255, 0.6)", 'rgba(200,\x20230,\x20255,\x200.4)'];
  (_0x555623.forEach((_0x2d0bdf, _0x42fd4d) => {
    (_0x69072c.strokeStyle = _0x2d0bdf, _0x69072c.lineWidth = 3 - _0x42fd4d, _0x69072c.lineCap = 'round', _0x69072c.beginPath(), _0x69072c.moveTo(_0xb008f3[0].x, _0xb008f3[0].y));
    for (let _0x56b732 = 1; _0x56b732 < _0xb008f3.length; _0x56b732++) {
      _0x69072c.lineTo(_0xb008f3[_0x56b732].x, _0xb008f3[_0x56b732].y);
    }
    _0x69072c.stroke();
  }), addSparkParticles(_0x69072c, _0xb008f3[_0xb008f3.length - 1].x, _0xb008f3[_0xb008f3.length - 1].y));
}
function drawGroundStrike(_0x58c0ab, _0x103ca3, _0x2fbe4a) {
  const _0x294a39 = _0x58c0ab.createRadialGradient(_0x103ca3, _0x2fbe4a, 0, _0x103ca3, _0x2fbe4a, 60);
  (_0x294a39.addColorStop(0, "rgba(100, 150, 255, 0.6)"), _0x294a39.addColorStop(0.5, 'rgba(80,\x20120,\x20255,\x200.3)'), _0x294a39.addColorStop(1, "transparent"), _0x58c0ab.fillStyle = _0x294a39, _0x58c0ab.beginPath(), _0x58c0ab.arc(_0x103ca3, _0x2fbe4a, 60, 0, Math.PI * 2), _0x58c0ab.fill(), _0x58c0ab.strokeStyle = "rgba(200, 220, 255, 0.8)", _0x58c0ab.lineWidth = 2);
  for (let _0x4e2310 = 0; _0x4e2310 < 5; _0x4e2310++) {
    const _0x487e7e = _0x4e2310 / 5 * Math.PI * 2, _0x57f7a1 = 15 + Math.random() * 25;
    (_0x58c0ab.beginPath(), _0x58c0ab.moveTo(_0x103ca3, _0x2fbe4a), _0x58c0ab.lineTo(_0x103ca3 + Math.cos(_0x487e7e) * _0x57f7a1, _0x2fbe4a + Math.sin(_0x487e7e) * _0x57f7a1), _0x58c0ab.stroke());
  }
  addSparkParticles(_0x58c0ab, _0x103ca3, _0x2fbe4a);
}
function addSparkParticles(_0x21a6de, _0x6762ee, _0x1d7203) {
  (_0x21a6de.save(), _0x21a6de.globalCompositeOperation = "screen");
  for (let _0x23bac5 = 0; _0x23bac5 < 8; _0x23bac5++) {
    const _0x262d7a = Math.random() * Math.PI * 2, _0x9ac014 = 5 + Math.random() * 20, _0x3fcf8f = 1 + Math.random() * 3, _0x359c3c = _0x6762ee + Math.cos(_0x262d7a) * _0x9ac014, _0x40c9a7 = _0x1d7203 + Math.sin(_0x262d7a) * _0x9ac014;
    (_0x21a6de.fillStyle = 'rgba(150,\x20200,\x20255,\x200.8)', _0x21a6de.beginPath(), _0x21a6de.arc(_0x359c3c, _0x40c9a7, _0x3fcf8f * 2, 0, Math.PI * 2), _0x21a6de.fill(), _0x21a6de.fillStyle = "rgba(255, 255, 255, 1)", _0x21a6de.beginPath(), _0x21a6de.arc(_0x359c3c, _0x40c9a7, _0x3fcf8f * 0.5, 0, Math.PI * 2), _0x21a6de.fill());
  }
  _0x21a6de.restore();
}
function drawElectrifiedText(_0x23934b, _0x5e24f1, _0x136c5e, _0x365795) {
  const _0x586ca8 = _0x136c5e * 0.35, _0x2dc6bd = _0x365795 * 0.6;
  (_0x23934b.save(), _0x23934b.shadowColor = "rgba(100, 150, 255, 0.8)", _0x23934b.shadowBlur = 40);
  const _0x2b39be = _0x23934b.createLinearGradient(_0x586ca8 - 100, _0x2dc6bd - 50, _0x586ca8 + 100, _0x2dc6bd + 50);
  (_0x2b39be.addColorStop(0, "#ffffff"), _0x2b39be.addColorStop(0.3, "#aaccff"), _0x2b39be.addColorStop(0.7, "#6688ff"), _0x2b39be.addColorStop(1, "#4466cc"), _0x23934b.font = "bold 70px \"Arial\"", _0x23934b.textAlign = "center", _0x23934b.textBaseline = "middle", _0x23934b.fillStyle = _0x2b39be, _0x23934b.fillText(_0x5e24f1.toUpperCase(), _0x586ca8, _0x2dc6bd), _0x23934b.shadowColor = 'transparent', _0x23934b.strokeStyle = "rgba(200, 220, 255, 0.9)", _0x23934b.lineWidth = 3, _0x23934b.strokeText(_0x5e24f1.toUpperCase(), _0x586ca8, _0x2dc6bd), addTextLightning(_0x23934b, _0x5e24f1, _0x586ca8, _0x2dc6bd), _0x23934b.restore());
}
function addTextLightning(_0x477c08, _0x2c27a6, _0x494767, _0x197451) {
  (_0x477c08.save(), _0x477c08.globalCompositeOperation = "screen");
  const _0x3dfcd8 = _0x477c08.measureText(_0x2c27a6.toUpperCase()), _0x505042 = _0x3dfcd8.width, _0x35485e = 70;
  for (let _0x48b913 = 0; _0x48b913 < _0x2c27a6.length * 2; _0x48b913++) {
    const _0x564185 = _0x48b913 / (_0x2c27a6.length * 2), _0x25136f = _0x494767 - _0x505042 / 2 + _0x505042 * _0x564185, _0x30d0c6 = _0x197451 - _0x35485e / 2 + Math.random() * _0x35485e;
    if (Math.random() > 0.7) {
      const _0x381894 = 10 + Math.random() * 30, _0x378a58 = Math.random() * Math.PI * 2;
      (_0x477c08.strokeStyle = "rgba(150, 200, 255, " + (0.3 + Math.random() * 0.4) + ')', _0x477c08.lineWidth = 1 + Math.random() * 2, _0x477c08.beginPath(), _0x477c08.moveTo(_0x25136f, _0x30d0c6), _0x477c08.lineTo(_0x25136f + Math.cos(_0x378a58) * _0x381894, _0x30d0c6 + Math.sin(_0x378a58) * _0x381894), _0x477c08.stroke());
    }
  }
  _0x477c08.restore();
}
function addStormClouds(_0x4e0604, _0x543265, _0x435052) {
  _0x4e0604.save();
  const _0x61e4ca = _0x4e0604.createLinearGradient(0, _0x435052 * 0.2, 0, _0x435052 * 0.5);
  (_0x61e4ca.addColorStop(0, "rgba(40, 40, 60, 0.9)"), _0x61e4ca.addColorStop(1, "rgba(20, 20, 40, 0.7)"), _0x4e0604.fillStyle = _0x61e4ca, _0x4e0604.beginPath(), _0x4e0604.moveTo(_0x543265 * 0.1, _0x435052 * 0.3));
  for (let _0x3efb01 = 0; _0x3efb01 <= 10; _0x3efb01++) {
    const _0x4b52e1 = _0x543265 * 0.1 + _0x3efb01 / 10 * _0x543265 * 0.8, _0x540077 = _0x435052 * 0.3 + Math.sin(_0x3efb01 * 0.8) * 20 - Math.random() * 10;
    _0x4e0604.lineTo(_0x4b52e1, _0x540077);
  }
  for (let _0x32f473 = 10; _0x32f473 >= 0; _0x32f473--) {
    const _0x2c7ab2 = _0x543265 * 0.1 + _0x32f473 / 10 * _0x543265 * 0.8, _0x2ba381 = _0x435052 * 0.5 + Math.cos(_0x32f473 * 0.5) * 15 + Math.random() * 10;
    _0x4e0604.lineTo(_0x2c7ab2, _0x2ba381);
  }
  (_0x4e0604.closePath(), _0x4e0604.fill(), _0x4e0604.strokeStyle = "rgba(80, 80, 120, 0.6)", _0x4e0604.lineWidth = 2, _0x4e0604.stroke(), _0x4e0604.restore());
}
function addRainEffects(_0x5c09ea, _0x517200, _0x3dc1ac) {
  (_0x5c09ea.save(), _0x5c09ea.globalAlpha = 0.6);
  for (let _0x640e48 = 0; _0x640e48 < 200; _0x640e48++) {
    const _0x1cd55b = Math.random() * _0x517200, _0x5cabe8 = Math.random() * _0x3dc1ac, _0x4d9f59 = 10 + Math.random() * 20, _0x33c685 = Math.PI * 0.2;
    (_0x5c09ea.strokeStyle = 'rgba(150,\x20180,\x20220,\x20' + (0.3 + Math.random() * 0.4) + ')', _0x5c09ea.lineWidth = 1, _0x5c09ea.lineCap = "round", _0x5c09ea.beginPath(), _0x5c09ea.moveTo(_0x1cd55b, _0x5cabe8), _0x5c09ea.lineTo(_0x1cd55b + Math.cos(_0x33c685) * _0x4d9f59, _0x5cabe8 + Math.sin(_0x33c685) * _0x4d9f59), _0x5c09ea.stroke());
  }
  _0x5c09ea.restore();
}
function addBackgroundLightningFlashes(_0x3eed4a, _0x33594e, _0x4dcb85) {
  (_0x3eed4a.save(), _0x3eed4a.globalAlpha = 0.1, _0x3eed4a.globalCompositeOperation = 'screen');
  for (let _0x26d020 = 0; _0x26d020 < 3; _0x26d020++) {
    const _0x1f0bf4 = Math.random() * _0x33594e, _0x31bcb7 = Math.random() * _0x4dcb85 * 0.5, _0x1c7973 = 100 + Math.random() * 200, _0x35eee4 = _0x3eed4a.createRadialGradient(_0x1f0bf4, _0x31bcb7, 0, _0x1f0bf4, _0x31bcb7, _0x1c7973);
    (_0x35eee4.addColorStop(0, "rgba(100, 150, 255, 0.4)"), _0x35eee4.addColorStop(1, "transparent"), _0x3eed4a.fillStyle = _0x35eee4, _0x3eed4a.beginPath(), _0x3eed4a.arc(_0x1f0bf4, _0x31bcb7, _0x1c7973, 0, Math.PI * 2), _0x3eed4a.fill());
  }
  _0x3eed4a.restore();
}
function addEnergyParticles(_0x319518, _0x2d13a1, _0x5bc759) {
  (_0x319518.save(), _0x319518.globalCompositeOperation = "screen");
  for (let _0x4a72ac = 0; _0x4a72ac < 50; _0x4a72ac++) {
    const _0x47efcd = Math.random() * _0x2d13a1, _0x3ba33c = Math.random() * _0x5bc759, _0x5953ab = 1 + Math.random() * 4, _0x4bd4d2 = 0.3 + Math.random() * 0.5;
    (_0x319518.fillStyle = "rgba(100, 180, 255, " + _0x4bd4d2 + ')', _0x319518.beginPath(), _0x319518.arc(_0x47efcd, _0x3ba33c, _0x5953ab, 0, Math.PI * 2), _0x319518.fill(), _0x319518.fillStyle = "rgba(150, 200, 255, " + _0x4bd4d2 * 0.3 + ')', _0x319518.beginPath(), _0x319518.arc(_0x47efcd, _0x3ba33c, _0x5953ab * 2, 0, Math.PI * 2), _0x319518.fill());
  }
  _0x319518.restore();
}
function drawElectricBorder(_0x45a6f0, _0x3cd0d5, _0xbac6b0) {
  _0x45a6f0.save();
  const _0x41f0b5 = _0x45a6f0.createLinearGradient(0, 0, _0x3cd0d5, _0xbac6b0);
  (_0x41f0b5.addColorStop(0, "#4466cc"), _0x41f0b5.addColorStop(0.5, "#88aaff"), _0x41f0b5.addColorStop(1, "#4466cc"), _0x45a6f0.strokeStyle = _0x41f0b5, _0x45a6f0.lineWidth = 8, _0x45a6f0.shadowColor = "rgba(100, 150, 255, 0.8)", _0x45a6f0.shadowBlur = 25, _0x45a6f0.strokeRect(10, 10, _0x3cd0d5 - 20, _0xbac6b0 - 20), _0x45a6f0.strokeStyle = "rgba(200, 220, 255, 0.6)", _0x45a6f0.lineWidth = 2, _0x45a6f0.shadowBlur = 15, _0x45a6f0.strokeRect(20, 20, _0x3cd0d5 - 40, _0xbac6b0 - 40), _0x45a6f0.restore());
}
function addLightningSignature(_0x509547, _0x1cd081, _0x58de0a) {
  _0x509547.save();
  const _0x27706d = _0x1cd081 - 110, _0x38300a = _0x58de0a - 25;
  (_0x509547.font = "italic 14px \"Arial\"", _0x509547.fillStyle = "rgba(150, 200, 255, 0.9)", _0x509547.textAlign = "right", _0x509547.textBaseline = "bottom", _0x509547.shadowColor = "rgba(100, 150, 255, 0.6)", _0x509547.shadowBlur = 15, _0x509547.fillText('by\x20Silent\x20Wolf', _0x27706d, _0x38300a), _0x509547.strokeStyle = "rgba(200, 220, 255, 0.8)", _0x509547.lineWidth = 2, _0x509547.lineCap = 'round', _0x509547.beginPath(), _0x509547.moveTo(_0x27706d + 5, _0x38300a - 10), _0x509547.lineTo(_0x27706d - 15, _0x38300a + 5), _0x509547.lineTo(_0x27706d - 5, _0x38300a), _0x509547.lineTo(_0x27706d - 25, _0x38300a + 15), _0x509547.stroke(), _0x509547.restore());
}
