import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'bronzelogo',
  description: 'Create\x20authentic\x20bronze\x20metallic\x20text\x20logos\x20with\x20patina\x20effects',
  async execute(_0x1a115c, _0x1ea432, _0x36a4fc) {
    const _0x248abd = _0x1ea432.key.remoteJid;
    try {
      if (_0x36a4fc.length === 0) {
        await _0x1a115c.sendMessage(_0x248abd, {
          text: '╭─⌈\x20' + DESIGN.BRONZE + " *BRONZE LOGO* ⌋\n│\n├─⊷ *bronzelogo*\n│  └⊷ bronzelogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ bronzelogo WOLF\n│  └⊷ bronzelogo BRONZE\n│  └⊷ bronzelogo ANCIENT\n│\n╰⊷ " + getFooter(_0x1ea432.key.participant || _0x1ea432.key.remoteJid)
        }, {
          quoted: _0x1ea432
        });
        return;
      }
      const _0x51ad2a = _0x36a4fc.join('\x20');
      if (_0x51ad2a.length > 15) {
        await _0x1a115c.sendMessage(_0x248abd, {
          text: "╭─⌈ " + STATUS.ERROR + '\x20*ERROR*\x20⌋\x0a│\x0a├─⊷\x20Text\x20too\x20long!\x0a│\x20\x20└⊷\x20Maximum\x2015\x20characters\x0a│\x20\x20└⊷\x20Your\x20text:\x20\x22' + _0x51ad2a + "\" (" + _0x51ad2a.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x1ea432
        });
        return;
      }
      await _0x1a115c.sendMessage(_0x248abd, {
        react: {
          text: STATUS.LOADING,
          key: _0x1ea432.key
        }
      });
      const _0x394dcf = await generateBronzeLogo(_0x51ad2a);
      (await _0x1a115c.sendMessage(_0x248abd, {
        image: _0x394dcf,
        caption: DESIGN.BRONZE + '\x20*Bronze\x20Logo\x20Generated!*\x0aText:\x20' + _0x51ad2a + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x1ea432
      }), await _0x1a115c.sendMessage(_0x248abd, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x1ea432.key
        }
      }));
    } catch (_0x4fd10c) {
      (console.error(STATUS.ERROR + " [BRONZELOGO] ERROR:", _0x4fd10c), await _0x1a115c.sendMessage(_0x248abd, {
        react: {
          text: STATUS.ERROR,
          key: _0x1ea432.key
        }
      }).catch(() => {}), await _0x1a115c.sendMessage(_0x248abd, {
        text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0x4fd10c.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x1ea432
      }));
    }
  }
};
async function generateBronzeLogo(_0x339ce0) {
  const _0x5d21f0 = 800, _0xd94cdb = 400, _0x375314 = createCanvas(_0x5d21f0, _0xd94cdb), _0x3877c5 = _0x375314.getContext('2d');
  (_0x3877c5.fillStyle = "#2a1e0f", _0x3877c5.fillRect(0, 0, _0x5d21f0, _0xd94cdb), drawAntiqueBackground(_0x3877c5, _0x5d21f0, _0xd94cdb));
  const _0x5d5d2a = _0x3877c5.createLinearGradient(0, 100, 0, 300);
  return (_0x5d5d2a.addColorStop(0, "#CD7F32"), _0x5d5d2a.addColorStop(0.15, "#B87333"), _0x5d5d2a.addColorStop(0.3, '#A65A29'), _0x5d5d2a.addColorStop(0.45, "#8B4513"), _0x5d5d2a.addColorStop(0.6, "#654321"), _0x5d5d2a.addColorStop(0.75, '#5D4037'), _0x5d5d2a.addColorStop(0.9, "#4E342E"), _0x5d5d2a.addColorStop(1, "#3E2723"), _0x3877c5.font = "bold 84px \"Arial\"", _0x3877c5.textAlign = "center", _0x3877c5.textBaseline = 'middle', createBronze3DEffect(_0x3877c5, _0x339ce0, _0x5d21f0, _0xd94cdb, _0x5d5d2a), addBronzePatina(_0x3877c5, _0x339ce0, _0x5d21f0, _0xd94cdb), addBronzeHighlights(_0x3877c5, _0x339ce0, _0x5d21f0, _0xd94cdb), drawAgedBorder(_0x3877c5, _0x5d21f0, _0xd94cdb), addBronzeTexture(_0x3877c5, _0x5d21f0, _0xd94cdb), addWatermark(_0x3877c5, _0x5d21f0, _0xd94cdb), _0x375314.toBuffer("image/png"));
}
function drawAntiqueBackground(_0x5cfcd6, _0x26b71e, _0x55fe58) {
  const _0x5b1d0e = _0x5cfcd6.createLinearGradient(0, 0, _0x26b71e, _0x55fe58);
  (_0x5b1d0e.addColorStop(0, "#3a2c1a"), _0x5b1d0e.addColorStop(0.5, "#2a1e0f"), _0x5b1d0e.addColorStop(1, "#1a140a"), _0x5cfcd6.fillStyle = _0x5b1d0e, _0x5cfcd6.fillRect(0, 0, _0x26b71e, _0x55fe58), _0x5cfcd6.strokeStyle = "rgba(90, 70, 40, 0.1)", _0x5cfcd6.lineWidth = 1);
  for (let _0x33576c = 0; _0x33576c < 200; _0x33576c++) {
    const _0x2d6e20 = Math.random() * _0x26b71e, _0x3f02e8 = Math.random() * _0x55fe58, _0x5daf93 = 20 + Math.random() * 50, _0x2a7399 = Math.random() * Math.PI;
    (_0x5cfcd6.beginPath(), _0x5cfcd6.moveTo(_0x2d6e20, _0x3f02e8), _0x5cfcd6.lineTo(_0x2d6e20 + Math.cos(_0x2a7399) * _0x5daf93, _0x3f02e8 + Math.sin(_0x2a7399) * _0x5daf93), _0x5cfcd6.stroke());
  }
  _0x5cfcd6.fillStyle = "rgba(60, 45, 20, 0.3)";
  for (let _0x38ebea = 0; _0x38ebea < 30; _0x38ebea++) {
    const _0xd59803 = Math.random() * _0x26b71e, _0x514403 = Math.random() * _0x55fe58, _0x3ad427 = 5 + Math.random() * 15;
    (_0x5cfcd6.beginPath(), _0x5cfcd6.arc(_0xd59803, _0x514403, _0x3ad427, 0, Math.PI * 2), _0x5cfcd6.fill());
  }
}
function createBronze3DEffect(_0x276e4f, _0x4e9320, _0x3bcc6d, _0x324b36, _0x233ae7) {
  const _0x3425ae = _0x3bcc6d / 2, _0x626477 = _0x324b36 / 2, _0x2fbd1f = 8;
  for (let _0x3d403f = _0x2fbd1f; _0x3d403f > 0; _0x3d403f--) {
    const _0x33da0a = _0x3d403f * 1.5, _0x4c7726 = 0.08 + _0x3d403f / _0x2fbd1f * 0.25, _0x2dba00 = 30 - _0x3d403f * 3;
    (_0x276e4f.fillStyle = "rgba(" + _0x2dba00 + ',\x20' + (_0x2dba00 - 10) + ',\x20' + (_0x2dba00 - 20) + ',\x20' + _0x4c7726 + ')', _0x276e4f.fillText(_0x4e9320.toUpperCase(), _0x3425ae + _0x33da0a, _0x626477 + _0x33da0a));
  }
  (_0x276e4f.fillStyle = _0x233ae7, _0x276e4f.fillText(_0x4e9320.toUpperCase(), _0x3425ae, _0x626477), _0x276e4f.strokeStyle = 'rgba(139,\x2069,\x2019,\x200.4)', _0x276e4f.lineWidth = 1.5, _0x276e4f.strokeText(_0x4e9320.toUpperCase(), _0x3425ae, _0x626477));
}
function addBronzePatina(_0x2cd2f3, _0x42638c, _0x19fe85, _0x3d03e8) {
  const _0x498be7 = _0x19fe85 / 2, _0x45ff6f = _0x3d03e8 / 2;
  _0x2cd2f3.save();
  const _0x10f2fa = _0x2cd2f3.createLinearGradient(_0x498be7 - 200, _0x45ff6f + 30, _0x498be7 + 200, _0x45ff6f - 20);
  (_0x10f2fa.addColorStop(0, "rgba(83, 130, 85, 0.3)"), _0x10f2fa.addColorStop(0.3, "rgba(67, 111, 77, 0.4)"), _0x10f2fa.addColorStop(0.6, "rgba(53, 94, 59, 0.3)"), _0x10f2fa.addColorStop(1, "transparent"), _0x2cd2f3.globalCompositeOperation = "overlay", _0x2cd2f3.fillStyle = _0x10f2fa, _0x2cd2f3.font = "bold 84px \"Arial\"", _0x2cd2f3.textAlign = 'center', _0x2cd2f3.textBaseline = 'middle', _0x2cd2f3.fillText(_0x42638c.toUpperCase(), _0x498be7, _0x45ff6f), _0x2cd2f3.globalCompositeOperation = "source-over");
  const _0x200f00 = _0x2cd2f3.measureText(_0x42638c.toUpperCase()).width, _0x54c782 = [{
    x: -0.35,
    y: 0.2,
    size: 8,
    alpha: 0.4
  }, {
    x: -0.15,
    y: -0.1,
    size: 6,
    alpha: 0.3
  }, {
    x: 0.1,
    y: 0.3,
    size: 10,
    alpha: 0.5
  }, {
    x: 0.3,
    y: -0.2,
    size: 7,
    alpha: 0.4
  }, {
    x: 0.4,
    y: 0.1,
    size: 5,
    alpha: 0.3
  }];
  (_0x54c782.forEach(_0xa0dad1 => {
    const _0x497a30 = _0x498be7 + _0xa0dad1.x * _0x200f00 / 2, _0x135cdb = _0x45ff6f + _0xa0dad1.y * 40;
    (_0x2cd2f3.fillStyle = 'rgba(64,\x20130,\x20109,\x20' + _0xa0dad1.alpha + ')', _0x2cd2f3.beginPath(), _0x2cd2f3.arc(_0x497a30, _0x135cdb, _0xa0dad1.size, 0, Math.PI * 2), _0x2cd2f3.fill(), _0x2cd2f3.fillStyle = "rgba(83, 150, 120, " + _0xa0dad1.alpha * 0.7 + ')', _0x2cd2f3.beginPath(), _0x2cd2f3.arc(_0x497a30 - _0xa0dad1.size * 0.3, _0x135cdb - _0xa0dad1.size * 0.3, _0xa0dad1.size * 0.5, 0, Math.PI * 2), _0x2cd2f3.fill());
  }), _0x2cd2f3.restore());
}
function addBronzeHighlights(_0x3e71af, _0x2988f2, _0x497ee7, _0x537810) {
  const _0x510f2f = _0x497ee7 / 2, _0xc516cd = _0x537810 / 2;
  _0x3e71af.save();
  const _0x2196ff = _0x3e71af.createLinearGradient(_0x510f2f - 250, _0xc516cd - 50, _0x510f2f + 250, _0xc516cd - 10);
  (_0x2196ff.addColorStop(0, "rgba(255, 215, 0, 0.4)"), _0x2196ff.addColorStop(0.3, "rgba(255, 200, 100, 0.3)"), _0x2196ff.addColorStop(0.6, 'rgba(205,\x20170,\x2080,\x200.2)'), _0x2196ff.addColorStop(1, 'transparent'), _0x3e71af.globalCompositeOperation = 'screen', _0x3e71af.fillStyle = _0x2196ff, _0x3e71af.font = 'bold\x2084px\x20\x22Arial\x22', _0x3e71af.textAlign = 'center', _0x3e71af.textBaseline = 'middle', _0x3e71af.fillText(_0x2988f2.toUpperCase(), _0x510f2f, _0xc516cd - 2), _0x3e71af.globalCompositeOperation = 'source-over');
  const _0x541634 = _0x3e71af.measureText(_0x2988f2.toUpperCase()).width, _0x31d552 = [{
    x: -0.3,
    y: -0.35,
    size: 4,
    alpha: 0.6
  }, {
    x: -0.1,
    y: -0.4,
    size: 5,
    alpha: 0.7
  }, {
    x: 0.15,
    y: -0.35,
    size: 3,
    alpha: 0.5
  }, {
    x: 0.35,
    y: -0.3,
    size: 4,
    alpha: 0.6
  }];
  (_0x31d552.forEach(_0x5726e5 => {
    const _0x433f87 = _0x510f2f + _0x5726e5.x * _0x541634 / 2, _0x8a439f = _0xc516cd + _0x5726e5.y * 45;
    (_0x3e71af.fillStyle = "rgba(255, 230, 150, " + _0x5726e5.alpha + ')', _0x3e71af.beginPath(), _0x3e71af.arc(_0x433f87, _0x8a439f, _0x5726e5.size, 0, Math.PI * 2), _0x3e71af.fill());
  }), _0x3e71af.restore());
}
function drawAgedBorder(_0x61ea1b, _0x92a0ee, _0x3d3540) {
  const _0x529064 = _0x61ea1b.createLinearGradient(0, 0, _0x92a0ee, _0x3d3540);
  (_0x529064.addColorStop(0, "#CD7F32"), _0x529064.addColorStop(0.3, '#B87333'), _0x529064.addColorStop(0.5, '#8B4513'), _0x529064.addColorStop(0.7, "#B87333"), _0x529064.addColorStop(1, "#CD7F32"), _0x61ea1b.strokeStyle = _0x529064, _0x61ea1b.lineWidth = 8, _0x61ea1b.shadowColor = "rgba(139, 69, 19, 0.5)", _0x61ea1b.shadowBlur = 15, _0x61ea1b.strokeRect(18, 18, _0x92a0ee - 36, _0x3d3540 - 36), _0x61ea1b.strokeStyle = "rgba(139, 69, 19, 0.4)", _0x61ea1b.lineWidth = 2, _0x61ea1b.shadowBlur = 0, _0x61ea1b.strokeRect(30, 30, _0x92a0ee - 60, _0x3d3540 - 60), drawBronzeRivets(_0x61ea1b, _0x92a0ee, _0x3d3540));
}
function drawBronzeRivets(_0x3f9388, _0x31fde5, _0x56e671) {
  _0x3f9388.fillStyle = "#B87333";
  const _0xe7c031 = [{
    x: 30,
    y: 30
  }, {
    x: _0x31fde5 - 30,
    y: 30
  }, {
    x: 30,
    y: _0x56e671 - 30
  }, {
    x: _0x31fde5 - 30,
    y: _0x56e671 - 30
  }];
  _0xe7c031.forEach(_0x5103c2 => {
    (_0x3f9388.beginPath(), _0x3f9388.arc(_0x5103c2.x, _0x5103c2.y, 6, 0, Math.PI * 2), _0x3f9388.fill(), _0x3f9388.fillStyle = "rgba(255, 215, 0, 0.6)", _0x3f9388.beginPath(), _0x3f9388.arc(_0x5103c2.x - 2, _0x5103c2.y - 2, 2, 0, Math.PI * 2), _0x3f9388.fill(), _0x3f9388.fillStyle = "#B87333");
  });
}
function addBronzeTexture(_0x85b0fa, _0x1ee871, _0x2fa0c4) {
  (_0x85b0fa.save(), _0x85b0fa.globalAlpha = 0.3);
  for (let _0x1fb950 = 0; _0x1fb950 < 100; _0x1fb950++) {
    const _0x118760 = Math.random() * _0x1ee871, _0x1d37a4 = Math.random() * _0x2fa0c4, _0x1416c4 = 0.5 + Math.random() * 2;
    (_0x85b0fa.fillStyle = 'rgba(' + (180 + Math.random() * 40) + ',\x20' + (120 + Math.random() * 30) + ',\x20' + (50 + Math.random() * 20) + ", 0.8)", _0x85b0fa.beginPath(), _0x85b0fa.arc(_0x118760, _0x1d37a4, _0x1416c4, 0, Math.PI * 2), _0x85b0fa.fill());
  }
  (_0x85b0fa.strokeStyle = "rgba(139, 69, 19, 0.4)", _0x85b0fa.lineWidth = 1);
  for (let _0xd160a = 0; _0xd160a < 30; _0xd160a++) {
    const _0x539ed8 = Math.random() * _0x1ee871, _0x27110b = Math.random() * _0x2fa0c4, _0x1c88a2 = 10 + Math.random() * 40, _0x348e92 = Math.random() * Math.PI;
    (_0x85b0fa.beginPath(), _0x85b0fa.moveTo(_0x539ed8, _0x27110b), _0x85b0fa.lineTo(_0x539ed8 + Math.cos(_0x348e92) * _0x1c88a2, _0x27110b + Math.sin(_0x348e92) * _0x1c88a2), _0x85b0fa.stroke());
  }
  _0x85b0fa.restore();
}
async function generateSimpleBronzeLogo(_0x59030d) {
  const _0x33031c = 600, _0xae32bd = 300, _0x95450f = createCanvas(_0x33031c, _0xae32bd), _0x3ea5aa = _0x95450f.getContext('2d');
  (_0x3ea5aa.fillStyle = "#2a1e0f", _0x3ea5aa.fillRect(0, 0, _0x33031c, _0xae32bd));
  const _0x44af6c = _0x3ea5aa.createLinearGradient(0, 50, 0, 250);
  return (_0x44af6c.addColorStop(0, "#CD7F32"), _0x44af6c.addColorStop(0.4, "#B87333"), _0x44af6c.addColorStop(0.7, '#8B4513'), _0x44af6c.addColorStop(1, "#654321"), _0x3ea5aa.font = 'bold\x2070px\x20Arial', _0x3ea5aa.fillStyle = _0x44af6c, _0x3ea5aa.textAlign = 'center', _0x3ea5aa.textBaseline = "middle", _0x3ea5aa.shadowColor = "rgba(139, 69, 19, 0.5)", _0x3ea5aa.shadowBlur = 15, _0x3ea5aa.shadowOffsetX = 4, _0x3ea5aa.shadowOffsetY = 4, _0x3ea5aa.fillText(_0x59030d.toUpperCase(), _0x33031c / 2, _0xae32bd / 2), _0x3ea5aa.strokeStyle = "#B87333", _0x3ea5aa.lineWidth = 5, _0x3ea5aa.strokeRect(15, 15, _0x33031c - 30, _0xae32bd - 30), _0x95450f.toBuffer("image/png"));
}
