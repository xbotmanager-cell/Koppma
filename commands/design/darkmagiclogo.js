import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'darkmagiclogo',
  description: "Create sinister dark magic text logos with occult and forbidden spell effects",
  async execute(_0x5bc7c1, _0x5b3956, _0x2c2c2e) {
    const _0x183904 = _0x5b3956.key.remoteJid;
    try {
      if (_0x2c2c2e.length === 0) {
        await _0x5bc7c1.sendMessage(_0x183904, {
          text: '╭─⌈\x20' + DESIGN.MAGIC + " *DARK MAGIC LOGO* ⌋\n│\n├─⊷ *darkmagiclogo*\n│  └⊷ darkmagiclogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ darkmagiclogo SHADOW\n│  └⊷ darkmagiclogo VOID\n│  └⊷ darkmagiclogo CURSED\n│\n╰⊷ " + getFooter(_0x5b3956.key.participant || _0x5b3956.key.remoteJid)
        }, {
          quoted: _0x5b3956
        });
        return;
      }
      const _0x1020fd = _0x2c2c2e.join('\x20');
      if (_0x1020fd.length > 10) {
        await _0x5bc7c1.sendMessage(_0x183904, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 10 characters\n│  └⊷ Your text: \"" + _0x1020fd + "\" (" + _0x1020fd.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x5b3956
        });
        return;
      }
      await _0x5bc7c1.sendMessage(_0x183904, {
        react: {
          text: STATUS.LOADING,
          key: _0x5b3956.key
        }
      });
      const _0x23f2bb = await generateDarkMagicLogo(_0x1020fd);
      (await _0x5bc7c1.sendMessage(_0x183904, {
        image: _0x23f2bb,
        caption: DESIGN.MAGIC + " *Dark Magic Logo Generated!*\nText: " + _0x1020fd + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x5b3956
      }), await _0x5bc7c1.sendMessage(_0x183904, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x5b3956.key
        }
      }));
    } catch (_0x243a89) {
      (console.error(STATUS.ERROR + " [DARKMAGICLOGO] ERROR:", _0x243a89), await _0x5bc7c1.sendMessage(_0x183904, {
        react: {
          text: STATUS.ERROR,
          key: _0x5b3956.key
        }
      }).catch(() => {}), await _0x5bc7c1.sendMessage(_0x183904, {
        text: "╭─⌈ " + STATUS.ERROR + '\x20*ERROR*\x20⌋\x0a│\x0a├─⊷\x20' + _0x243a89.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x5b3956
      }));
    }
  }
};
async function generateDarkMagicLogo(_0x5b33ad) {
  const _0x25668c = 800, _0x17bf9c = 400, _0x4dc2ce = createCanvas(_0x25668c, _0x17bf9c), _0x14db01 = _0x4dc2ce.getContext('2d');
  createForbiddenSanctum(_0x14db01, _0x25668c, _0x17bf9c);
  const _0x3837ef = _0x25668c * 0.75, _0xde7d9e = _0x17bf9c * 0.55;
  return (drawDarkSorcerer(_0x14db01, _0x3837ef, _0xde7d9e), addRitualCircle(_0x14db01, _0x3837ef, _0xde7d9e), addDarkEnergy(_0x14db01, _0x3837ef, _0xde7d9e), addShadowTendrils(_0x14db01, _0x25668c, _0x17bf9c), drawCursedText(_0x14db01, _0x5b33ad, _0x25668c, _0x17bf9c), addOccultSymbols(_0x14db01, _0x25668c, _0x17bf9c), addFloatingRunes(_0x14db01, _0x25668c, _0x17bf9c), addBloodDrops(_0x14db01, _0x25668c, _0x17bf9c), addSoulParticles(_0x14db01, _0x25668c, _0x17bf9c), drawForbiddenBorder(_0x14db01, _0x25668c, _0x17bf9c), addDarkSignature(_0x14db01, _0x25668c, _0x17bf9c), addWatermark(_0x14db01, _0x25668c, _0x17bf9c), _0x4dc2ce.toBuffer("image/png"));
}
function createForbiddenSanctum(_0x519fdd, _0x2c5217, _0x582ae3) {
  const _0x38359b = _0x519fdd.createLinearGradient(0, 0, 0, _0x582ae3);
  (_0x38359b.addColorStop(0, "#000000"), _0x38359b.addColorStop(0.3, '#1a001a'), _0x38359b.addColorStop(0.6, "#330033"), _0x38359b.addColorStop(1, "#000000"), _0x519fdd.fillStyle = _0x38359b, _0x519fdd.fillRect(0, 0, _0x2c5217, _0x582ae3), addAncientStoneTexture(_0x519fdd, _0x2c5217, _0x582ae3), addRitualCandles(_0x519fdd, _0x2c5217, _0x582ae3));
}
function addAncientStoneTexture(_0x4298ef, _0x19e67f, _0x15469a) {
  (_0x4298ef.save(), _0x4298ef.globalAlpha = 0.1);
  for (let _0x2963c9 = 0; _0x2963c9 < 200; _0x2963c9++) {
    const _0x41a9f3 = Math.random() * _0x19e67f, _0x2173d4 = Math.random() * _0x15469a, _0x37a772 = 10 + Math.random() * 30, _0x3bcefb = Math.random() * Math.PI * 2, _0x9e537 = 30 + Math.random() * 20;
    (_0x4298ef.strokeStyle = "rgba(" + _0x9e537 + ',\x20' + _0x9e537 + ',\x20' + _0x9e537 + ", 0.4)", _0x4298ef.lineWidth = 1, _0x4298ef.lineCap = "round", _0x4298ef.beginPath(), _0x4298ef.moveTo(_0x41a9f3, _0x2173d4), _0x4298ef.lineTo(_0x41a9f3 + Math.cos(_0x3bcefb) * _0x37a772, _0x2173d4 + Math.sin(_0x3bcefb) * _0x37a772), _0x4298ef.stroke());
  }
  for (let _0x23e0d2 = 0; _0x23e0d2 < 50; _0x23e0d2++) {
    const _0xea05b7 = Math.random() * _0x19e67f, _0x5851e0 = Math.random() * _0x15469a, _0x14423e = 3 + Math.random() * 8, _0x52c633 = 30 + Math.random() * 20;
    (_0x4298ef.fillStyle = "rgba(" + _0x52c633 + ',\x20' + _0x52c633 + ", 20, 0.3)", _0x4298ef.beginPath(), _0x4298ef.arc(_0xea05b7, _0x5851e0, _0x14423e, 0, Math.PI * 2), _0x4298ef.fill());
  }
  _0x4298ef.restore();
}
function addRitualCandles(_0x4c9268, _0x184cf3, _0xfdf6dc) {
  (_0x4c9268.save(), _0x4c9268.globalAlpha = 0.6);
  const _0x51c3e1 = [{
    x: _0x184cf3 * 0.2,
    y: _0xfdf6dc * 0.7
  }, {
    x: _0x184cf3 * 0.3,
    y: _0xfdf6dc * 0.8
  }, {
    x: _0x184cf3 * 0.8,
    y: _0xfdf6dc * 0.7
  }, {
    x: _0x184cf3 * 0.7,
    y: _0xfdf6dc * 0.8
  }];
  (_0x51c3e1.forEach(_0x1d44ea => {
    (_0x4c9268.fillStyle = "#2c2c2c", _0x4c9268.fillRect(_0x1d44ea.x - 4, _0x1d44ea.y - 30, 8, 30));
    const _0x509fca = _0x4c9268.createRadialGradient(_0x1d44ea.x, _0x1d44ea.y - 35, 0, _0x1d44ea.x, _0x1d44ea.y - 35, 8);
    (_0x509fca.addColorStop(0, "rgba(255, 100, 0, 0.9)"), _0x509fca.addColorStop(0.5, "rgba(255, 50, 0, 0.6)"), _0x509fca.addColorStop(1, "transparent"), _0x4c9268.fillStyle = _0x509fca, _0x4c9268.beginPath(), _0x4c9268.arc(_0x1d44ea.x, _0x1d44ea.y - 35, 8, 0, Math.PI * 2), _0x4c9268.fill(), _0x4c9268.fillStyle = "rgba(255, 200, 0, 0.4)", _0x4c9268.beginPath(), _0x4c9268.arc(_0x1d44ea.x, _0x1d44ea.y - 38, 4, 0, Math.PI * 2), _0x4c9268.fill());
    const _0xf747f2 = _0x4c9268.createRadialGradient(_0x1d44ea.x, _0x1d44ea.y - 35, 0, _0x1d44ea.x, _0x1d44ea.y - 35, 20);
    (_0xf747f2.addColorStop(0, "rgba(255, 100, 0, 0.3)"), _0xf747f2.addColorStop(1, "transparent"), _0x4c9268.fillStyle = _0xf747f2, _0x4c9268.beginPath(), _0x4c9268.arc(_0x1d44ea.x, _0x1d44ea.y - 35, 20, 0, Math.PI * 2), _0x4c9268.fill());
  }), _0x4c9268.restore());
}
function drawDarkSorcerer(_0x850e32, _0x62759b, _0x1c95a5) {
  _0x850e32.save();
  const _0x1d7c0d = _0x850e32.createLinearGradient(_0x62759b, _0x1c95a5 - 60, _0x62759b, _0x1c95a5 + 40);
  (_0x1d7c0d.addColorStop(0, "rgba(20, 0, 40, 0.9)"), _0x1d7c0d.addColorStop(1, "rgba(0, 0, 0, 0.95)"), _0x850e32.fillStyle = _0x1d7c0d, _0x850e32.beginPath(), _0x850e32.moveTo(_0x62759b - 25, _0x1c95a5 - 30), _0x850e32.bezierCurveTo(_0x62759b - 35, _0x1c95a5 + 40, _0x62759b + 35, _0x1c95a5 + 40, _0x62759b + 25, _0x1c95a5 - 30), _0x850e32.fill(), _0x850e32.fillStyle = "rgba(0, 0, 0, 0.95)", _0x850e32.beginPath(), _0x850e32.arc(_0x62759b, _0x1c95a5 - 45, 20, 0, Math.PI * 2), _0x850e32.fill(), _0x850e32.beginPath(), _0x850e32.moveTo(_0x62759b - 20, _0x1c95a5 - 35), _0x850e32.bezierCurveTo(_0x62759b - 25, _0x1c95a5 - 20, _0x62759b + 25, _0x1c95a5 - 20, _0x62759b + 20, _0x1c95a5 - 35), _0x850e32.fill());
  const _0x48a24a = _0x850e32.createRadialGradient(_0x62759b - 8, _0x1c95a5 - 45, 0, _0x62759b - 8, _0x1c95a5 - 45, 6);
  (_0x48a24a.addColorStop(0, "rgba(255, 0, 100, 0.9)"), _0x48a24a.addColorStop(1, "transparent"), _0x850e32.fillStyle = _0x48a24a, _0x850e32.beginPath(), _0x850e32.arc(_0x62759b - 8, _0x1c95a5 - 45, 6, 0, Math.PI * 2), _0x850e32.fill(), _0x850e32.beginPath(), _0x850e32.arc(_0x62759b + 8, _0x1c95a5 - 45, 6, 0, Math.PI * 2), _0x850e32.fill(), _0x850e32.fillStyle = "rgba(0, 0, 0, 0.9)", _0x850e32.beginPath(), _0x850e32.arc(_0x62759b - 8, _0x1c95a5 - 45, 2, 0, Math.PI * 2), _0x850e32.fill(), _0x850e32.beginPath(), _0x850e32.arc(_0x62759b + 8, _0x1c95a5 - 45, 2, 0, Math.PI * 2), _0x850e32.fill(), _0x850e32.fillStyle = "rgba(20, 0, 40, 0.9)", _0x850e32.beginPath(), _0x850e32.arc(_0x62759b - 35, _0x1c95a5 - 10, 8, 0, Math.PI * 2), _0x850e32.fill(), _0x850e32.beginPath(), _0x850e32.arc(_0x62759b + 35, _0x1c95a5 - 10, 8, 0, Math.PI * 2), _0x850e32.fill(), _0x850e32.restore());
}
function addRitualCircle(_0x1b4d18, _0x52603d, _0x3f06cc) {
  (_0x1b4d18.save(), _0x1b4d18.globalAlpha = 0.8, _0x1b4d18.strokeStyle = "rgba(100, 0, 50, 0.8)", _0x1b4d18.lineWidth = 3, _0x1b4d18.beginPath(), _0x1b4d18.arc(_0x52603d, _0x3f06cc, 80, 0, Math.PI * 2), _0x1b4d18.stroke(), _0x1b4d18.strokeStyle = "rgba(150, 0, 100, 0.9)", _0x1b4d18.lineWidth = 2, _0x1b4d18.beginPath(), _0x1b4d18.arc(_0x52603d, _0x3f06cc, 60, 0, Math.PI * 2), _0x1b4d18.stroke(), drawPentagram(_0x1b4d18, _0x52603d, _0x3f06cc, 40), addCircleSymbols(_0x1b4d18, _0x52603d, _0x3f06cc));
  const _0x3a6069 = _0x1b4d18.createRadialGradient(_0x52603d, _0x3f06cc, 50, _0x52603d, _0x3f06cc, 90);
  (_0x3a6069.addColorStop(0, "rgba(100, 0, 50, 0.4)"), _0x3a6069.addColorStop(1, "transparent"), _0x1b4d18.fillStyle = _0x3a6069, _0x1b4d18.beginPath(), _0x1b4d18.arc(_0x52603d, _0x3f06cc, 90, 0, Math.PI * 2), _0x1b4d18.fill(), _0x1b4d18.restore());
}
function drawPentagram(_0x41ffe2, _0x319508, _0x4c496b, _0x10929d) {
  (_0x41ffe2.save(), _0x41ffe2.strokeStyle = 'rgba(200,\x200,\x20100,\x200.9)', _0x41ffe2.lineWidth = 2, _0x41ffe2.lineJoin = "round");
  const _0x5e2279 = [];
  for (let _0x533372 = 0; _0x533372 < 5; _0x533372++) {
    const _0x3f15c4 = _0x533372 * 2 * Math.PI / 5 - Math.PI / 2;
    _0x5e2279.push({
      x: _0x319508 + Math.cos(_0x3f15c4) * _0x10929d,
      y: _0x4c496b + Math.sin(_0x3f15c4) * _0x10929d
    });
  }
  (_0x41ffe2.beginPath(), _0x41ffe2.moveTo(_0x5e2279[0].x, _0x5e2279[0].y), _0x41ffe2.lineTo(_0x5e2279[2].x, _0x5e2279[2].y), _0x41ffe2.lineTo(_0x5e2279[4].x, _0x5e2279[4].y), _0x41ffe2.lineTo(_0x5e2279[1].x, _0x5e2279[1].y), _0x41ffe2.lineTo(_0x5e2279[3].x, _0x5e2279[3].y), _0x41ffe2.closePath(), _0x41ffe2.stroke(), _0x41ffe2.restore());
}
function addCircleSymbols(_0x83890e, _0x2c39f6, _0x508232) {
  (_0x83890e.save(), _0x83890e.globalAlpha = 0.7);
  const _0x5927b2 = ['†', '‡', 'Ω', 'Ψ', '‡', '∞'], _0x28a0b3 = 70;
  (_0x5927b2.forEach((_0x315da3, _0x213eec) => {
    const _0x17b25f = _0x213eec / _0x5927b2.length * Math.PI * 2, _0xfc46d4 = _0x2c39f6 + Math.cos(_0x17b25f) * _0x28a0b3, _0x5219cb = _0x508232 + Math.sin(_0x17b25f) * _0x28a0b3;
    (_0x83890e.fillStyle = 'rgba(150,\x200,\x20100,\x200.9)', _0x83890e.font = "bold 14px Arial", _0x83890e.textAlign = 'center', _0x83890e.textBaseline = "middle", _0x83890e.fillText(_0x315da3, _0xfc46d4, _0x5219cb));
  }), _0x83890e.restore());
}
function addDarkEnergy(_0x399ee0, _0x3f3b2a, _0x254163) {
  (_0x399ee0.save(), _0x399ee0.globalCompositeOperation = "screen");
  for (let _0xc297ec = 0; _0xc297ec < 3; _0xc297ec++) {
    const _0x183996 = 100 + _0xc297ec * 30, _0x1bb24f = 0.2 - _0xc297ec * 0.05;
    (_0x399ee0.strokeStyle = "rgba(100, 0, 100, " + _0x1bb24f + ')', _0x399ee0.lineWidth = 8, _0x399ee0.beginPath(), _0x399ee0.arc(_0x3f3b2a, _0x254163, _0x183996, 0, Math.PI * 2), _0x399ee0.stroke());
  }
  (addEnergyTendrils(_0x399ee0, _0x3f3b2a - 35, _0x254163 - 10), addEnergyTendrils(_0x399ee0, _0x3f3b2a + 35, _0x254163 - 10));
  const _0x3edf9c = _0x399ee0.createRadialGradient(_0x3f3b2a, _0x254163, 0, _0x3f3b2a, _0x254163, 120);
  (_0x3edf9c.addColorStop(0, "rgba(100, 0, 50, 0.6)"), _0x3edf9c.addColorStop(0.5, "rgba(50, 0, 100, 0.3)"), _0x3edf9c.addColorStop(1, "transparent"), _0x399ee0.fillStyle = _0x3edf9c, _0x399ee0.beginPath(), _0x399ee0.arc(_0x3f3b2a, _0x254163, 120, 0, Math.PI * 2), _0x399ee0.fill(), _0x399ee0.restore());
}
function addEnergyTendrils(_0x21d2a7, _0x41bcdc, _0x472748) {
  (_0x21d2a7.strokeStyle = 'rgba(150,\x200,\x20100,\x200.8)', _0x21d2a7.lineWidth = 3, _0x21d2a7.lineCap = "round");
  for (let _0x54adbc = 0; _0x54adbc < 5; _0x54adbc++) {
    const _0x57ec07 = 30 + Math.random() * 40, _0x49ec66 = -0.5 + Math.random();
    (_0x21d2a7.beginPath(), _0x21d2a7.moveTo(_0x41bcdc, _0x472748), _0x21d2a7.bezierCurveTo(_0x41bcdc + Math.cos(_0x49ec66) * _0x57ec07 * 0.3, _0x472748 + Math.sin(_0x49ec66) * _0x57ec07 * 0.3, _0x41bcdc + Math.cos(_0x49ec66) * _0x57ec07 * 0.7, _0x472748 + Math.sin(_0x49ec66) * _0x57ec07 * 0.7, _0x41bcdc + Math.cos(_0x49ec66) * _0x57ec07, _0x472748 + Math.sin(_0x49ec66) * _0x57ec07), _0x21d2a7.stroke(), _0x21d2a7.strokeStyle = "rgba(200, 0, 150, 0.4)", _0x21d2a7.lineWidth = 8, _0x21d2a7.beginPath(), _0x21d2a7.moveTo(_0x41bcdc, _0x472748), _0x21d2a7.bezierCurveTo(_0x41bcdc + Math.cos(_0x49ec66) * _0x57ec07 * 0.3, _0x472748 + Math.sin(_0x49ec66) * _0x57ec07 * 0.3, _0x41bcdc + Math.cos(_0x49ec66) * _0x57ec07 * 0.7, _0x472748 + Math.sin(_0x49ec66) * _0x57ec07 * 0.7, _0x41bcdc + Math.cos(_0x49ec66) * _0x57ec07, _0x472748 + Math.sin(_0x49ec66) * _0x57ec07), _0x21d2a7.stroke(), _0x21d2a7.strokeStyle = 'rgba(150,\x200,\x20100,\x200.8)', _0x21d2a7.lineWidth = 3);
  }
}
function addShadowTendrils(_0x17be1d, _0x410be0, _0x1b3d6c) {
  (_0x17be1d.save(), _0x17be1d.globalAlpha = 0.3);
  for (let _0x161bb7 = 0; _0x161bb7 < 8; _0x161bb7++) {
    const _0x12249a = Math.random() * _0x410be0, _0x3c3743 = _0x1b3d6c + 20, _0x426099 = _0x12249a + (Math.random() - 0.5) * 100, _0x2d73bc = Math.random() * _0x1b3d6c * 0.8;
    (_0x17be1d.strokeStyle = "rgba(50, 0, 50, 0.6)", _0x17be1d.lineWidth = 4, _0x17be1d.lineCap = "round", _0x17be1d.beginPath(), _0x17be1d.moveTo(_0x12249a, _0x3c3743), _0x17be1d.bezierCurveTo(_0x12249a + (Math.random() - 0.5) * 50, _0x3c3743 - 100, _0x426099 + (Math.random() - 0.5) * 50, _0x2d73bc + 50, _0x426099, _0x2d73bc), _0x17be1d.stroke());
  }
  _0x17be1d.restore();
}
function drawCursedText(_0x11637a, _0x2cb096, _0x3101c5, _0x6f3bf5) {
  const _0x300be2 = _0x3101c5 * 0.35, _0xf354e7 = _0x6f3bf5 * 0.6;
  (_0x11637a.save(), _0x11637a.shadowColor = "rgba(100, 0, 50, 0.8)", _0x11637a.shadowBlur = 30);
  const _0x2ab4b7 = _0x11637a.createLinearGradient(_0x300be2 - 100, _0xf354e7 - 50, _0x300be2 + 100, _0xf354e7 + 50);
  (_0x2ab4b7.addColorStop(0, "#640064"), _0x2ab4b7.addColorStop(0.3, '#960096'), _0x2ab4b7.addColorStop(0.7, "#C80064"), _0x2ab4b7.addColorStop(1, "#640064"), _0x11637a.font = "bold 70px \"Arial\"", _0x11637a.textAlign = "center", _0x11637a.textBaseline = "middle", _0x11637a.fillStyle = _0x2ab4b7, _0x11637a.fillText(_0x2cb096.toUpperCase(), _0x300be2, _0xf354e7), _0x11637a.shadowColor = "transparent", _0x11637a.fillStyle = "rgba(200, 0, 100, 0.7)", _0x11637a.fillText(_0x2cb096.toUpperCase(), _0x300be2, _0xf354e7), _0x11637a.strokeStyle = 'rgba(100,\x200,\x2050,\x200.9)', _0x11637a.lineWidth = 2, _0x11637a.strokeText(_0x2cb096.toUpperCase(), _0x300be2, _0xf354e7), addTextCorruption(_0x11637a, _0x2cb096, _0x300be2, _0xf354e7), _0x11637a.restore());
}
function addTextCorruption(_0x2aea1b, _0x234523, _0x5a82e3, _0x1d7698) {
  (_0x2aea1b.save(), _0x2aea1b.globalCompositeOperation = 'overlay', _0x2aea1b.globalAlpha = 0.4);
  const _0x1ea14f = _0x2aea1b.measureText(_0x234523.toUpperCase()), _0x4a6241 = _0x1ea14f.width, _0x2b28e7 = 70;
  for (let _0x54be7c = 0; _0x54be7c < 15; _0x54be7c++) {
    const _0x2ea7bb = _0x5a82e3 - _0x4a6241 / 2 + Math.random() * _0x4a6241, _0x371e85 = _0x1d7698 - _0x2b28e7 / 2 + Math.random() * _0x2b28e7, _0x40b791 = 5 + Math.random() * 15, _0x49d562 = Math.random() * Math.PI * 2;
    (_0x2aea1b.strokeStyle = "rgba(50, 0, 0, 0.8)", _0x2aea1b.lineWidth = 1, _0x2aea1b.lineCap = 'round', _0x2aea1b.beginPath(), _0x2aea1b.moveTo(_0x2ea7bb, _0x371e85), _0x2aea1b.lineTo(_0x2ea7bb + Math.cos(_0x49d562) * _0x40b791, _0x371e85 + Math.sin(_0x49d562) * _0x40b791), _0x2aea1b.stroke());
  }
  for (let _0x313c16 = 0; _0x313c16 < 8; _0x313c16++) {
    const _0x1ed932 = _0x5a82e3 - _0x4a6241 / 2 + Math.random() * _0x4a6241, _0x455603 = _0x1d7698 + _0x2b28e7 / 2, _0x1f9b1e = 10 + Math.random() * 20;
    (_0x2aea1b.strokeStyle = "rgba(150, 0, 0, 0.7)", _0x2aea1b.lineWidth = 2, _0x2aea1b.lineCap = "round", _0x2aea1b.beginPath(), _0x2aea1b.moveTo(_0x1ed932, _0x455603), _0x2aea1b.lineTo(_0x1ed932, _0x455603 + _0x1f9b1e), _0x2aea1b.stroke(), _0x2aea1b.fillStyle = "rgba(150, 0, 0, 0.7)", _0x2aea1b.beginPath(), _0x2aea1b.arc(_0x1ed932, _0x455603 + _0x1f9b1e, 3, 0, Math.PI * 2), _0x2aea1b.fill());
  }
  _0x2aea1b.restore();
}
function addOccultSymbols(_0x4dbcbf, _0xa04ad1, _0x517efb) {
  (_0x4dbcbf.save(), _0x4dbcbf.globalAlpha = 0.6);
  const _0x19474e = ['†', '‡', 'Ω', 'Ψ', '∞', '⌘', DESIGN.LIGHTNING, STATUS.SKULL];
  for (let _0x2ce286 = 0; _0x2ce286 < 12; _0x2ce286++) {
    const _0x3e580e = Math.random() * _0xa04ad1, _0x2dc9ad = Math.random() * _0x517efb, _0x5c760b = 10 + Math.random() * 8, _0x2a01c7 = _0x19474e[Math.floor(Math.random() * _0x19474e.length)];
    (_0x4dbcbf.fillStyle = "rgba(150, 0, 100, 0.8)", _0x4dbcbf.font = "bold " + _0x5c760b + "px Arial", _0x4dbcbf.textAlign = "center", _0x4dbcbf.textBaseline = "middle", _0x4dbcbf.fillText(_0x2a01c7, _0x3e580e, _0x2dc9ad), _0x4dbcbf.fillStyle = "rgba(100, 0, 50, 0.3)", _0x4dbcbf.beginPath(), _0x4dbcbf.arc(_0x3e580e, _0x2dc9ad, _0x5c760b, 0, Math.PI * 2), _0x4dbcbf.fill());
  }
  _0x4dbcbf.restore();
}
function addFloatingRunes(_0x4226c7, _0x342758, _0x2bdcc5) {
  (_0x4226c7.save(), _0x4226c7.globalAlpha = 0.5);
  const _0x5b367e = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'];
  for (let _0x3e3250 = 0; _0x3e3250 < 15; _0x3e3250++) {
    const _0x526c7c = Math.random() * _0x342758, _0x212c58 = Math.random() * _0x2bdcc5, _0x42efd8 = 12 + Math.random() * 10, _0xf11568 = _0x5b367e[Math.floor(Math.random() * _0x5b367e.length)];
    (_0x4226c7.fillStyle = "rgba(100, 0, 50, 0.9)", _0x4226c7.font = "bold " + _0x42efd8 + "px Arial", _0x4226c7.textAlign = 'center', _0x4226c7.textBaseline = 'middle', _0x4226c7.fillText(_0xf11568, _0x526c7c, _0x212c58), _0x4226c7.strokeStyle = "rgba(150, 0, 100, 0.4)", _0x4226c7.lineWidth = 2, _0x4226c7.beginPath(), _0x4226c7.arc(_0x526c7c, _0x212c58, _0x42efd8 * 0.8, 0, Math.PI * 2), _0x4226c7.stroke());
  }
  _0x4226c7.restore();
}
function addBloodDrops(_0x322d9e, _0x448bb2, _0x386168) {
  (_0x322d9e.save(), _0x322d9e.globalAlpha = 0.7);
  for (let _0x2bc2a4 = 0; _0x2bc2a4 < 10; _0x2bc2a4++) {
    const _0x37bd64 = Math.random() * _0x448bb2, _0x17a036 = Math.random() * _0x386168, _0x12b749 = 2 + Math.random() * 4, _0x525a67 = _0x322d9e.createRadialGradient(_0x37bd64, _0x17a036, 0, _0x37bd64, _0x17a036, _0x12b749);
    (_0x525a67.addColorStop(0, "rgba(150, 0, 0, 0.9)"), _0x525a67.addColorStop(1, "rgba(100, 0, 0, 0.6)"), _0x322d9e.fillStyle = _0x525a67, _0x322d9e.beginPath(), _0x322d9e.arc(_0x37bd64, _0x17a036, _0x12b749, 0, Math.PI * 2), _0x322d9e.fill());
    const _0x2ebc0f = 3 + Math.random() * 8;
    (_0x322d9e.strokeStyle = "rgba(150, 0, 0, 0.6)", _0x322d9e.lineWidth = _0x12b749 * 0.5, _0x322d9e.lineCap = "round", _0x322d9e.beginPath(), _0x322d9e.moveTo(_0x37bd64, _0x17a036), _0x322d9e.lineTo(_0x37bd64, _0x17a036 + _0x2ebc0f), _0x322d9e.stroke());
  }
  _0x322d9e.restore();
}
function addSoulParticles(_0x552132, _0x209aa0, _0x2b6b22) {
  (_0x552132.save(), _0x552132.globalCompositeOperation = "screen");
  for (let _0x21489c = 0; _0x21489c < 25; _0x21489c++) {
    const _0x58d00c = Math.random() * _0x209aa0, _0x2f435c = Math.random() * _0x2b6b22, _0x3a6726 = 1 + Math.random() * 3, _0x2743c5 = 300 + Math.random() * 60;
    (_0x552132.fillStyle = "hsla(" + _0x2743c5 + ", 100%, 70%, 0.8)", _0x552132.beginPath(), _0x552132.arc(_0x58d00c, _0x2f435c, _0x3a6726, 0, Math.PI * 2), _0x552132.fill());
    const _0x3694ce = 5 + Math.random() * 10, _0x570ee4 = Math.random() * Math.PI * 2;
    (_0x552132.strokeStyle = "hsla(" + _0x2743c5 + ", 100%, 70%, 0.5)", _0x552132.lineWidth = _0x3a6726 * 0.5, _0x552132.lineCap = "round", _0x552132.beginPath(), _0x552132.moveTo(_0x58d00c, _0x2f435c), _0x552132.lineTo(_0x58d00c + Math.cos(_0x570ee4) * _0x3694ce, _0x2f435c + Math.sin(_0x570ee4) * _0x3694ce), _0x552132.stroke());
  }
  _0x552132.restore();
}
function drawForbiddenBorder(_0x15851f, _0x488606, _0x130410) {
  _0x15851f.save();
  const _0x5d83ca = _0x15851f.createLinearGradient(0, 0, _0x488606, 0);
  (_0x5d83ca.addColorStop(0, "#640064"), _0x5d83ca.addColorStop(0.3, "#960096"), _0x5d83ca.addColorStop(0.5, '#C80064'), _0x5d83ca.addColorStop(0.7, "#960096"), _0x5d83ca.addColorStop(1, '#640064'), _0x15851f.strokeStyle = _0x5d83ca, _0x15851f.lineWidth = 10, _0x15851f.shadowColor = "rgba(100, 0, 50, 0.6)", _0x15851f.shadowBlur = 20, _0x15851f.strokeRect(10, 10, _0x488606 - 20, _0x130410 - 20), _0x15851f.strokeStyle = "rgba(150, 0, 100, 0.6)", _0x15851f.lineWidth = 3, _0x15851f.shadowBlur = 15, _0x15851f.strokeRect(20, 20, _0x488606 - 40, _0x130410 - 40), addOccultCorners(_0x15851f, _0x488606, _0x130410), _0x15851f.restore());
}
function addOccultCorners(_0x634e7c, _0x18f171, _0x118732) {
  (_0x634e7c.save(), _0x634e7c.globalAlpha = 0.8);
  const _0x4a65f2 = [{
    x: 30,
    y: 30
  }, {
    x: _0x18f171 - 30,
    y: 30
  }, {
    x: 30,
    y: _0x118732 - 30
  }, {
    x: _0x18f171 - 30,
    y: _0x118732 - 30
  }];
  (_0x4a65f2.forEach(_0x18a6cb => {
    (_0x634e7c.strokeStyle = 'rgba(150,\x200,\x20100,\x200.8)', _0x634e7c.lineWidth = 2, _0x634e7c.beginPath(), _0x634e7c.arc(_0x18a6cb.x, _0x18a6cb.y, 8, 0, Math.PI * 2), _0x634e7c.stroke(), _0x634e7c.beginPath(), _0x634e7c.moveTo(_0x18a6cb.x - 6, _0x18a6cb.y), _0x634e7c.lineTo(_0x18a6cb.x + 6, _0x18a6cb.y), _0x634e7c.stroke(), _0x634e7c.beginPath(), _0x634e7c.moveTo(_0x18a6cb.x, _0x18a6cb.y - 6), _0x634e7c.lineTo(_0x18a6cb.x, _0x18a6cb.y + 6), _0x634e7c.stroke(), _0x634e7c.beginPath(), _0x634e7c.moveTo(_0x18a6cb.x - 4, _0x18a6cb.y - 4), _0x634e7c.lineTo(_0x18a6cb.x + 4, _0x18a6cb.y + 4), _0x634e7c.stroke(), _0x634e7c.beginPath(), _0x634e7c.moveTo(_0x18a6cb.x + 4, _0x18a6cb.y - 4), _0x634e7c.lineTo(_0x18a6cb.x - 4, _0x18a6cb.y + 4), _0x634e7c.stroke());
  }), _0x634e7c.restore());
}
function addDarkSignature(_0x254209, _0x32815d, _0x206e11) {
  _0x254209.save();
  const _0x1d4aaa = _0x32815d - 110, _0xeeed78 = _0x206e11 - 25;
  (_0x254209.font = "italic 14px \"Arial\"", _0x254209.fillStyle = "rgba(150, 0, 100, 0.9)", _0x254209.textAlign = "right", _0x254209.textBaseline = "bottom", _0x254209.shadowColor = "rgba(100, 0, 50, 0.6)", _0x254209.shadowBlur = 10, _0x254209.fillText("by Silent Wolf", _0x1d4aaa, _0xeeed78), _0x254209.fillStyle = 'rgba(150,\x200,\x20100,\x200.8)', _0x254209.font = "bold 12px Arial", _0x254209.fillText('†', _0x1d4aaa + 5, _0xeeed78 - 8), _0x254209.fillStyle = 'rgba(100,\x200,\x2050,\x200.3)', _0x254209.beginPath(), _0x254209.arc(_0x1d4aaa + 5, _0xeeed78 - 8, 6, 0, Math.PI * 2), _0x254209.fill(), _0x254209.restore());
}
