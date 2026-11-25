import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "goldlogo",
  description: "Create luxurious gold style text logos",
  async execute(_0x58bdf0, _0x592ba3, _0x277300) {
    const _0x2195be = _0x592ba3.key.remoteJid;
    try {
      if (_0x277300.length === 0) {
        await _0x58bdf0.sendMessage(_0x2195be, {
          text: '╭─⌈\x20' + DESIGN.GOLD + " *GOLD LOGO* ⌋\n│\n├─⊷ *goldlogo*\n│  └⊷ " + global.prefix + "goldlogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ " + global.prefix + "goldlogo WOLF\n│  └⊷ " + global.prefix + "goldlogo ROYAL\n│  └⊷ " + global.prefix + 'goldlogo\x20LUXURY\x0a│\x0a╰⊷\x20' + getFooter(_0x592ba3.key.participant || _0x592ba3.key.remoteJid)
        }, {
          quoted: _0x592ba3
        });
        return;
      }
      const _0x2222ed = _0x277300.join('\x20');
      if (_0x2222ed.length > 15) {
        await _0x58bdf0.sendMessage(_0x2195be, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 15 characters\n│  └⊷ Your text: \"" + _0x2222ed + "\" (" + _0x2222ed.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x592ba3
        });
        return;
      }
      await _0x58bdf0.sendMessage(_0x2195be, {
        react: {
          text: STATUS.LOADING,
          key: _0x592ba3.key
        }
      });
      const _0x590607 = await generateGoldLogo(_0x2222ed);
      (await _0x58bdf0.sendMessage(_0x2195be, {
        image: _0x590607,
        caption: DESIGN.GOLD + " *Gold Logo Generated!*\nText: " + _0x2222ed + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x592ba3
      }), await _0x58bdf0.sendMessage(_0x2195be, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x592ba3.key
        }
      }));
    } catch (_0x3dc20e) {
      (console.error(STATUS.ERROR + '\x20[GOLDLOGO]\x20ERROR:', _0x3dc20e), await _0x58bdf0.sendMessage(_0x2195be, {
        react: {
          text: STATUS.ERROR,
          key: _0x592ba3.key
        }
      }).catch(() => {}), await _0x58bdf0.sendMessage(_0x2195be, {
        text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0x3dc20e.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x592ba3
      }));
    }
  }
};
async function generateGoldLogo(_0x5eedb6) {
  const _0x4bc5ba = 800, _0x1cb3c0 = 400, _0x8f3e0d = createCanvas(_0x4bc5ba, _0x1cb3c0), _0x39abfb = _0x8f3e0d.getContext('2d');
  (_0x39abfb.fillStyle = '#1a1a1a', _0x39abfb.fillRect(0, 0, _0x4bc5ba, _0x1cb3c0), drawLuxuryBackground(_0x39abfb, _0x4bc5ba, _0x1cb3c0));
  const _0x5616ad = _0x39abfb.createLinearGradient(0, 100, 0, 300);
  (_0x5616ad.addColorStop(0, '#FFD700'), _0x5616ad.addColorStop(0.3, "#FFEC8B"), _0x5616ad.addColorStop(0.5, "#DAA520"), _0x5616ad.addColorStop(0.7, "#B8860B"), _0x5616ad.addColorStop(1, '#8B7500'), _0x39abfb.font = "bold 84px \"Arial\"", _0x39abfb.textAlign = "center", _0x39abfb.textBaseline = "middle", _0x39abfb.shadowColor = "#000000", _0x39abfb.shadowBlur = 10, _0x39abfb.shadowOffsetX = 3, _0x39abfb.shadowOffsetY = 3, _0x39abfb.fillStyle = _0x5616ad, _0x39abfb.fillText(_0x5eedb6.toUpperCase(), _0x4bc5ba / 2, _0x1cb3c0 / 2), _0x39abfb.shadowColor = "transparent");
  const _0x34c01b = _0x39abfb.createLinearGradient(0, 150, 0, 200);
  return (_0x34c01b.addColorStop(0, 'rgba(255,\x20255,\x20255,\x200.8)'), _0x34c01b.addColorStop(1, 'rgba(255,\x20255,\x20255,\x200.2)'), _0x39abfb.fillStyle = _0x34c01b, _0x39abfb.globalCompositeOperation = "screen", _0x39abfb.fillText(_0x5eedb6.toUpperCase(), _0x4bc5ba / 2, _0x1cb3c0 / 2 - 2), _0x39abfb.globalCompositeOperation = 'source-over', drawGoldBorder(_0x39abfb, _0x4bc5ba, _0x1cb3c0), addLuxuryElements(_0x39abfb, _0x4bc5ba, _0x1cb3c0), addWatermark(_0x39abfb, _0x4bc5ba, _0x1cb3c0), _0x8f3e0d.toBuffer('image/png'));
}
function drawLuxuryBackground(_0x3c8782, _0x3a64fc, _0x213bf5) {
  const _0x186af4 = _0x3c8782.createRadialGradient(_0x3a64fc / 2, _0x213bf5 / 2, 0, _0x3a64fc / 2, _0x213bf5 / 2, _0x3a64fc / 2);
  (_0x186af4.addColorStop(0, "#2a2a2a"), _0x186af4.addColorStop(1, "#1a1a1a"), _0x3c8782.fillStyle = _0x186af4, _0x3c8782.fillRect(0, 0, _0x3a64fc, _0x213bf5), _0x3c8782.strokeStyle = "rgba(255, 215, 0, 0.1)", _0x3c8782.lineWidth = 1);
  for (let _0x401bd0 = -_0x3a64fc; _0x401bd0 < _0x3a64fc * 2; _0x401bd0 += 20) {
    (_0x3c8782.beginPath(), _0x3c8782.moveTo(_0x401bd0, 0), _0x3c8782.lineTo(_0x401bd0 + _0x213bf5, _0x213bf5), _0x3c8782.stroke());
  }
  drawCornerDecorations(_0x3c8782, _0x3a64fc, _0x213bf5);
}
function drawGoldBorder(_0x1252cb, _0x3fc3a8, _0x3bd017) {
  const _0x25c145 = _0x1252cb.createLinearGradient(0, 0, _0x3fc3a8, _0x3bd017);
  (_0x25c145.addColorStop(0, '#FFD700'), _0x25c145.addColorStop(0.5, '#DAA520'), _0x25c145.addColorStop(1, "#FFD700"), _0x1252cb.strokeStyle = _0x25c145, _0x1252cb.lineWidth = 8, _0x1252cb.shadowColor = "#FFD700", _0x1252cb.shadowBlur = 15, _0x1252cb.strokeRect(20, 20, _0x3fc3a8 - 40, _0x3bd017 - 40), _0x1252cb.strokeStyle = "rgba(255, 215, 0, 0.3)", _0x1252cb.lineWidth = 2, _0x1252cb.shadowBlur = 0, _0x1252cb.strokeRect(30, 30, _0x3fc3a8 - 60, _0x3bd017 - 60));
}
function addLuxuryElements(_0x5542a5, _0x240ddc, _0x16cade) {
  (_0x5542a5.fillStyle = '#FFD700', _0x5542a5.shadowColor = "#FFD700", _0x5542a5.shadowBlur = 10);
  for (let _0x211866 = 0; _0x211866 < 50; _0x211866++) {
    const _0x350ca1 = Math.random() * _0x240ddc, _0x11a557 = Math.random() * _0x16cade, _0x2d4367 = Math.random() * 3 + 1;
    (_0x5542a5.beginPath(), _0x5542a5.arc(_0x350ca1, _0x11a557, _0x2d4367, 0, Math.PI * 2), _0x5542a5.fill());
  }
  _0x5542a5.shadowBlur = 0;
}
function drawCornerDecorations(_0x13f939, _0x331143, _0x585879) {
  (_0x13f939.strokeStyle = "rgba(255, 215, 0, 0.3)", _0x13f939.lineWidth = 2);
  const _0x4030e0 = 30;
  (_0x13f939.beginPath(), _0x13f939.moveTo(20, 20 + _0x4030e0), _0x13f939.lineTo(20, 20), _0x13f939.lineTo(20 + _0x4030e0, 20), _0x13f939.stroke(), _0x13f939.beginPath(), _0x13f939.moveTo(_0x331143 - 20 - _0x4030e0, 20), _0x13f939.lineTo(_0x331143 - 20, 20), _0x13f939.lineTo(_0x331143 - 20, 20 + _0x4030e0), _0x13f939.stroke(), _0x13f939.beginPath(), _0x13f939.moveTo(20, _0x585879 - 20 - _0x4030e0), _0x13f939.lineTo(20, _0x585879 - 20), _0x13f939.lineTo(20 + _0x4030e0, _0x585879 - 20), _0x13f939.stroke(), _0x13f939.beginPath(), _0x13f939.moveTo(_0x331143 - 20 - _0x4030e0, _0x585879 - 20), _0x13f939.lineTo(_0x331143 - 20, _0x585879 - 20), _0x13f939.lineTo(_0x331143 - 20, _0x585879 - 20 - _0x4030e0), _0x13f939.stroke());
}
async function generateSimpleGoldLogo(_0x376549) {
  const _0x5343a5 = 600, _0x1c5114 = 300, _0x5da03e = createCanvas(_0x5343a5, _0x1c5114), _0x2a2713 = _0x5da03e.getContext('2d');
  (_0x2a2713.fillStyle = "#0a0a0a", _0x2a2713.fillRect(0, 0, _0x5343a5, _0x1c5114));
  const _0x38a723 = _0x2a2713.createLinearGradient(0, 50, 0, 250);
  return (_0x38a723.addColorStop(0, "#FFD700"), _0x38a723.addColorStop(0.5, "#DAA520"), _0x38a723.addColorStop(1, "#B8860B"), _0x2a2713.font = "bold 70px Arial", _0x2a2713.fillStyle = _0x38a723, _0x2a2713.textAlign = "center", _0x2a2713.textBaseline = "middle", _0x2a2713.shadowColor = "#000000", _0x2a2713.shadowBlur = 10, _0x2a2713.shadowOffsetX = 3, _0x2a2713.shadowOffsetY = 3, _0x2a2713.fillText(_0x376549.toUpperCase(), _0x5343a5 / 2, _0x1c5114 / 2), _0x2a2713.strokeStyle = "#FFD700", _0x2a2713.lineWidth = 4, _0x2a2713.strokeRect(10, 10, _0x5343a5 - 20, _0x1c5114 - 20), _0x5da03e.toBuffer("image/png"));
}
