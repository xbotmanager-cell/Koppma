import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "icelogo",
  description: "Create frozen ice crystal text logos",
  async execute(_0x15b681, _0x2bc71b, _0x5bd0aa) {
    const _0x3d19de = _0x2bc71b.key.remoteJid;
    try {
      if (_0x5bd0aa.length === 0) {
        await _0x15b681.sendMessage(_0x3d19de, {
          text: "╭─⌈ " + DESIGN.ICE + " *ICE LOGO* ⌋\n│\n├─⊷ *icelogo*\n│  └⊷ icelogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ icelogo WOLF\n│  └⊷ icelogo FROST\n│  └⊷ icelogo ICE\n│\n╰⊷ " + getFooter(_0x2bc71b.key.participant || _0x2bc71b.key.remoteJid)
        }, {
          quoted: _0x2bc71b
        });
        return;
      }
      const _0xa27ebb = _0x5bd0aa.join('\x20');
      if (_0xa27ebb.length > 12) {
        await _0x15b681.sendMessage(_0x3d19de, {
          text: '╭─⌈\x20' + STATUS.ERROR + '\x20*ERROR*\x20⌋\x0a│\x0a├─⊷\x20Text\x20too\x20long!\x0a│\x20\x20└⊷\x20Maximum\x2012\x20characters\x0a│\x20\x20└⊷\x20Your\x20text:\x20\x22' + _0xa27ebb + "\" (" + _0xa27ebb.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x2bc71b
        });
        return;
      }
      await _0x15b681.sendMessage(_0x3d19de, {
        react: {
          text: STATUS.LOADING,
          key: _0x2bc71b.key
        }
      });
      const _0x11e46b = await generateIceLogo(_0xa27ebb);
      (await _0x15b681.sendMessage(_0x3d19de, {
        image: _0x11e46b,
        caption: DESIGN.ICE + '\x20*Ice\x20Logo\x20Generated!*\x0aText:\x20' + _0xa27ebb + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x2bc71b
      }), await _0x15b681.sendMessage(_0x3d19de, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x2bc71b.key
        }
      }));
    } catch (_0x4f4665) {
      (console.error(STATUS.ERROR + " [ICELOGO] ERROR:", _0x4f4665), await _0x15b681.sendMessage(_0x3d19de, {
        react: {
          text: STATUS.ERROR,
          key: _0x2bc71b.key
        }
      }).catch(() => {}), await _0x15b681.sendMessage(_0x3d19de, {
        text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0x4f4665.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x2bc71b
      }));
    }
  }
};
async function generateIceLogo(_0x19dfb2) {
  const _0x47bf61 = 800, _0x298aa0 = 400, _0xd02e52 = createCanvas(_0x47bf61, _0x298aa0), _0x50cb41 = _0xd02e52.getContext('2d');
  (_0x50cb41.fillStyle = "#0a1428", _0x50cb41.fillRect(0, 0, _0x47bf61, _0x298aa0), drawFrozenBackground(_0x50cb41, _0x47bf61, _0x298aa0));
  const _0x52a363 = _0x50cb41.createLinearGradient(0, 100, 0, 300);
  return (_0x52a363.addColorStop(0, '#FFFFFF'), _0x52a363.addColorStop(0.2, "#E8F4FF"), _0x52a363.addColorStop(0.4, "#C8E8FF"), _0x52a363.addColorStop(0.6, "#A0D8FF"), _0x52a363.addColorStop(0.8, '#78C8FF'), _0x52a363.addColorStop(1, "#50B8FF"), _0x50cb41.font = "bold 84px \"Arial\"", _0x50cb41.textAlign = "center", _0x50cb41.textBaseline = 'middle', createFrozenIceEffect(_0x50cb41, _0x19dfb2, _0x47bf61, _0x298aa0, _0x52a363), addIceFacets(_0x50cb41, _0x19dfb2, _0x47bf61, _0x298aa0), addFrostEffects(_0x50cb41, _0x47bf61, _0x298aa0), drawFrozenBorder(_0x50cb41, _0x47bf61, _0x298aa0), addSignature(_0x50cb41, _0x47bf61, _0x298aa0), addWatermark(_0x50cb41, _0x47bf61, _0x298aa0), _0xd02e52.toBuffer("image/png"));
}
function drawFrozenBackground(_0xdc7a04, _0x16e18d, _0x473f2f) {
  const _0x12026e = _0xdc7a04.createRadialGradient(_0x16e18d / 2, _0x473f2f / 2, 0, _0x16e18d / 2, _0x473f2f / 2, Math.max(_0x16e18d, _0x473f2f) / 1.5);
  (_0x12026e.addColorStop(0, "#1a2a4a"), _0x12026e.addColorStop(0.4, "#0a1a3a"), _0x12026e.addColorStop(0.8, "#050a28"), _0x12026e.addColorStop(1, "#000518"), _0xdc7a04.fillStyle = _0x12026e, _0xdc7a04.fillRect(0, 0, _0x16e18d, _0x473f2f), _0xdc7a04.strokeStyle = "rgba(200, 230, 255, 0.1)", _0xdc7a04.lineWidth = 1);
  for (let _0x1908ce = 0; _0x1908ce < 50; _0x1908ce++) {
    const _0x53485e = Math.random() * _0x16e18d, _0x1b672b = Math.random() * _0x473f2f;
    drawSnowflake(_0xdc7a04, _0x53485e, _0x1b672b, 2 + Math.random() * 4);
  }
  _0xdc7a04.fillStyle = "rgba(180, 220, 255, 0.2)";
  for (let _0xbebd17 = 0; _0xbebd17 < 30; _0xbebd17++) {
    const _0x115878 = Math.random() * _0x16e18d, _0x26a805 = Math.random() * _0x473f2f, _0x1374e1 = 1 + Math.random() * 3;
    drawIceCrystal(_0xdc7a04, _0x115878, _0x26a805, _0x1374e1);
  }
}
function createFrozenIceEffect(_0x3837c9, _0xaa67ea, _0x214105, _0x377a3d, _0x45af0c) {
  const _0x541703 = _0x214105 / 2, _0x53207f = _0x377a3d / 2, _0x249dab = 8;
  for (let _0x468319 = _0x249dab; _0x468319 > 0; _0x468319--) {
    const _0x52248d = _0x468319 * 1.2, _0x33ff6b = 0.05 + _0x468319 / _0x249dab * 0.2, _0x4f144e = 150 - _0x468319 * 15;
    (_0x3837c9.fillStyle = 'rgba(0,\x20' + _0x4f144e + ", 255, " + _0x33ff6b + ')', _0x3837c9.fillText(_0xaa67ea.toUpperCase(), _0x541703 + _0x52248d, _0x53207f + _0x52248d));
  }
  (_0x3837c9.fillStyle = _0x45af0c, _0x3837c9.fillText(_0xaa67ea.toUpperCase(), _0x541703, _0x53207f), _0x3837c9.strokeStyle = "rgba(255, 255, 255, 0.6)", _0x3837c9.lineWidth = 1.2, _0x3837c9.strokeText(_0xaa67ea.toUpperCase(), _0x541703, _0x53207f));
}
function addIceFacets(_0x28737c, _0x1dcd33, _0x4948fb, _0xfb3bfd) {
  const _0x4422b1 = _0x4948fb / 2, _0x4b4711 = _0xfb3bfd / 2, _0x1f7048 = _0x28737c.measureText(_0x1dcd33.toUpperCase()).width;
  (_0x28737c.save(), _0x28737c.globalAlpha = 0.7);
  const _0x43447f = [{
    x: -0.3,
    y: -0.3,
    size: 4
  }, {
    x: -0.15,
    y: -0.4,
    size: 5
  }, {
    x: 0,
    y: -0.35,
    size: 3
  }, {
    x: 0.15,
    y: -0.4,
    size: 4
  }, {
    x: 0.3,
    y: -0.3,
    size: 3
  }, {
    x: -0.25,
    y: 0.2,
    size: 2
  }, {
    x: 0.2,
    y: 0.25,
    size: 2
  }];
  (_0x43447f.forEach(_0x45c20d => {
    const _0x346d9e = _0x4422b1 + _0x45c20d.x * _0x1f7048 / 2, _0x3db13b = _0x4b4711 + _0x45c20d.y * 40;
    (_0x28737c.fillStyle = "#FFFFFF", _0x28737c.beginPath(), _0x28737c.arc(_0x346d9e, _0x3db13b, _0x45c20d.size, 0, Math.PI * 2), _0x28737c.fill(), _0x28737c.shadowColor = 'rgba(180,\x20220,\x20255,\x200.8)', _0x28737c.shadowBlur = 8, _0x28737c.fill());
  }), _0x28737c.restore());
}
function addFrostEffects(_0x2fc11b, _0x136436, _0x21961b) {
  (_0x2fc11b.save(), _0x2fc11b.globalAlpha = 0.8);
  for (let _0x489151 = 0; _0x489151 < 30; _0x489151++) {
    const _0x3741f8 = Math.random() * _0x136436, _0x5ca0e0 = Math.random() * _0x21961b, _0x474ee9 = 1 + Math.random() * 2;
    (_0x2fc11b.fillStyle = "#FFFFFF", _0x2fc11b.beginPath(), _0x2fc11b.arc(_0x3741f8, _0x5ca0e0, _0x474ee9, 0, Math.PI * 2), _0x2fc11b.fill());
  }
  const _0x5e8929 = _0x2fc11b.createLinearGradient(0, _0x21961b * 0.6, 0, _0x21961b);
  (_0x5e8929.addColorStop(0, "rgba(200, 230, 255, 0.3)"), _0x5e8929.addColorStop(1, "transparent"), _0x2fc11b.fillStyle = _0x5e8929, _0x2fc11b.fillRect(0, _0x21961b * 0.6, _0x136436, _0x21961b * 0.4), _0x2fc11b.restore());
}
function drawFrozenBorder(_0x303003, _0x21dc59, _0x4b1f8f) {
  const _0x3a06d7 = _0x303003.createLinearGradient(0, 0, _0x21dc59, _0x4b1f8f);
  (_0x3a06d7.addColorStop(0, "#A0D8FF"), _0x3a06d7.addColorStop(0.5, "#78C8FF"), _0x3a06d7.addColorStop(1, "#A0D8FF"), _0x303003.strokeStyle = _0x3a06d7, _0x303003.lineWidth = 6, _0x303003.shadowColor = 'rgba(0,\x20150,\x20255,\x200.4)', _0x303003.shadowBlur = 15, _0x303003.strokeRect(18, 18, _0x21dc59 - 36, _0x4b1f8f - 36), _0x303003.strokeStyle = "rgba(200, 230, 255, 0.4)", _0x303003.lineWidth = 2, _0x303003.shadowBlur = 0, _0x303003.strokeRect(30, 30, _0x21dc59 - 60, _0x4b1f8f - 60));
}
function drawSnowflake(_0x3e4915, _0x160628, _0x25a1dc, _0x26dd9d) {
  (_0x3e4915.save(), _0x3e4915.translate(_0x160628, _0x25a1dc));
  for (let _0x250238 = 0; _0x250238 < 6; _0x250238++) {
    (_0x3e4915.rotate(Math.PI / 3), _0x3e4915.beginPath(), _0x3e4915.moveTo(0, 0), _0x3e4915.lineTo(0, _0x26dd9d), _0x3e4915.stroke(), _0x3e4915.beginPath(), _0x3e4915.moveTo(-_0x26dd9d * 0.3, _0x26dd9d * 0.3), _0x3e4915.lineTo(_0x26dd9d * 0.3, _0x26dd9d * 0.7), _0x3e4915.stroke());
  }
  _0x3e4915.restore();
}
function drawIceCrystal(_0x2133ee, _0x364604, _0x36fdc3, _0x4f861b) {
  (_0x2133ee.save(), _0x2133ee.translate(_0x364604, _0x36fdc3), _0x2133ee.beginPath(), _0x2133ee.moveTo(0, -_0x4f861b), _0x2133ee.lineTo(_0x4f861b * 0.7, 0), _0x2133ee.lineTo(0, _0x4f861b), _0x2133ee.lineTo(-_0x4f861b * 0.7, 0), _0x2133ee.closePath(), _0x2133ee.fill(), _0x2133ee.restore());
}
function addSignature(_0x59006f, _0x39c803, _0x1dc591) {
  _0x59006f.save();
  const _0x173093 = _0x39c803 - 120, _0x2b6038 = _0x1dc591 - 20;
  (_0x59006f.font = 'italic\x2012px\x20\x22Arial\x22', _0x59006f.fillStyle = "rgba(160, 200, 255, 0.7)", _0x59006f.textAlign = "right", _0x59006f.textBaseline = "bottom", _0x59006f.fillText("by Silent Wolf", _0x173093, _0x2b6038), _0x59006f.strokeStyle = 'rgba(160,\x20200,\x20255,\x200.4)', _0x59006f.lineWidth = 0.5);
  const _0x505288 = _0x59006f.measureText("by Silent Wolf").width;
  (_0x59006f.beginPath(), _0x59006f.moveTo(_0x173093 - _0x505288, _0x2b6038 + 2), _0x59006f.lineTo(_0x173093, _0x2b6038 + 2), _0x59006f.stroke(), _0x59006f.restore());
}
