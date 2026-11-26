import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'bloodlogo',
  description: "Create terrifying blood text logos with realistic gore and horror effects",
  async execute(_0x379b85, _0x2e5a88, _0x435b3f) {
    const _0x333b58 = _0x2e5a88.key.remoteJid;
    try {
      if (_0x435b3f.length === 0) {
        await _0x379b85.sendMessage(_0x333b58, {
          text: "╭┄〔 " + DESIGN.BLOOD + " *BLOOD LOGO* 〕┄╮\n┆\n┆ ✦ *bloodlogo*\n┆   └─ bloodlogo <text>\n┆\n┆ ✦ *Example:*\n┆   └─ bloodlogo BLOOD\n┆   └─ bloodlogo GORE\n┆   └─ bloodlogo HORROR\n┆\n╰┄ " + getFooter(_0x2e5a88.key.participant || _0x2e5a88.key.remoteJid)
        }, {
          quoted: _0x2e5a88
        });
        return;
      }
      const _0x130848 = _0x435b3f.join('\x20');
      if (_0x130848.length > 10) {
        await _0x379b85.sendMessage(_0x333b58, {
          text: "╭┄〔 " + STATUS.ERROR + " *ERROR* 〕┄╮\n┆\n┆ ✦ Text too long!\n┆   └─ Maximum 10 characters\n┆   └─ Your text: \"" + _0x130848 + "\" (" + _0x130848.length + " chars)\n┆\n╰───"
        }, {
          quoted: _0x2e5a88
        });
        return;
      }
      await _0x379b85.sendMessage(_0x333b58, {
        react: {
          text: STATUS.LOADING,
          key: _0x2e5a88.key
        }
      });
      const _0x3d30d4 = await generateAdvancedBloodLogo(_0x130848);
      (await _0x379b85.sendMessage(_0x333b58, {
        image: _0x3d30d4,
        caption: DESIGN.BLOOD + " *Advanced Blood Logo Generated!*\nText: " + _0x130848 + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x2e5a88
      }), await _0x379b85.sendMessage(_0x333b58, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x2e5a88.key
        }
      }));
    } catch (_0xba2033) {
      (console.error(STATUS.ERROR + " [BLOODLOGO] ERROR:", _0xba2033), await _0x379b85.sendMessage(_0x333b58, {
        react: {
          text: STATUS.ERROR,
          key: _0x2e5a88.key
        }
      }).catch(() => {}), await _0x379b85.sendMessage(_0x333b58, {
        text: "╭┄〔 " + STATUS.ERROR + " *ERROR* 〕┄╮\n┆\n┆ ✦ " + _0xba2033.message + "\n┆   └─ Please try again with shorter text\n┆\n╰───"
      }, {
        quoted: _0x2e5a88
      }));
    }
  }
};
async function generateAdvancedBloodLogo(_0x3dc452) {
  const _0x5eaf59 = 800, _0x1b9002 = 400, _0x2c623c = createCanvas(_0x5eaf59, _0x1b9002), _0x361169 = _0x2c623c.getContext('2d');
  createHorrorBackground(_0x361169, _0x5eaf59, _0x1b9002);
  const _0x39f7e1 = _0x5eaf59 * 0.5, _0x3f5f72 = _0x1b9002 * 0.5;
  return (drawAdvancedBloodText(_0x361169, _0x3dc452, _0x39f7e1, _0x3f5f72), addBloodSplatters(_0x361169, _0x5eaf59, _0x1b9002), addBloodSpatterPhysics(_0x361169, _0x39f7e1, _0x3f5f72, _0x3dc452), addGoreDetails(_0x361169, _0x5eaf59, _0x1b9002), addBloodPools(_0x361169, _0x5eaf59, _0x1b9002), addBloodyHandprints(_0x361169, _0x5eaf59, _0x1b9002), addWeaponMarks(_0x361169, _0x5eaf59, _0x1b9002), addBloodMist(_0x361169, _0x5eaf59, _0x1b9002), addBloodParticles(_0x361169, _0x5eaf59, _0x1b9002), addBloodLighting(_0x361169, _0x5eaf59, _0x1b9002), addHorrorShadows(_0x361169, _0x5eaf59, _0x1b9002), drawGoreBorder(_0x361169, _0x5eaf59, _0x1b9002), addBloodSignature(_0x361169, _0x5eaf59, _0x1b9002), addWatermark(_0x361169, _0x5eaf59, _0x1b9002), _0x2c623c.toBuffer("image/png"));
}
function createHorrorBackground(_0x540a08, _0x3eb67f, _0x1a8b39) {
  const _0x78193c = _0x540a08.createLinearGradient(0, 0, 0, _0x1a8b39);
  (_0x78193c.addColorStop(0, '#2a0a0a'), _0x78193c.addColorStop(0.3, "#3a0a0a"), _0x78193c.addColorStop(0.6, "#4a0a0a"), _0x78193c.addColorStop(1, "#2a0a0a"), _0x540a08.fillStyle = _0x78193c, _0x540a08.fillRect(0, 0, _0x3eb67f, _0x1a8b39), addWallTexture(_0x540a08, _0x3eb67f, _0x1a8b39), addBloodStains(_0x540a08, _0x3eb67f, _0x1a8b39));
}
function addWallTexture(_0x47dcdf, _0x454259, _0x3435ce) {
  (_0x47dcdf.save(), _0x47dcdf.globalAlpha = 0.3);
  for (let _0x486f35 = 0; _0x486f35 < 150; _0x486f35++) {
    const _0x546d44 = Math.random() * _0x454259, _0x3a99c7 = Math.random() * _0x3435ce, _0x4ba23f = 5 + Math.random() * 25, _0x5b6980 = Math.random() * Math.PI * 2, _0xd7102c = 20 + Math.random() * 15;
    (_0x47dcdf.strokeStyle = "rgba(" + _0xd7102c + ',\x20' + _0xd7102c + ',\x20' + _0xd7102c + ", 0.4)", _0x47dcdf.lineWidth = 1, _0x47dcdf.lineCap = "round", _0x47dcdf.beginPath(), _0x47dcdf.moveTo(_0x546d44, _0x3a99c7), _0x47dcdf.lineTo(_0x546d44 + Math.cos(_0x5b6980) * _0x4ba23f, _0x3a99c7 + Math.sin(_0x5b6980) * _0x4ba23f), _0x47dcdf.stroke());
  }
  for (let _0x2a0ee0 = 0; _0x2a0ee0 < 80; _0x2a0ee0++) {
    const _0x4b1b7e = Math.random() * _0x454259, _0x3d6e9d = Math.random() * _0x3435ce, _0x5932af = 3 + Math.random() * 12, _0x128a77 = 30 + Math.random() * 20;
    (_0x47dcdf.fillStyle = "rgba(" + _0x128a77 + ',\x20' + _0x128a77 * 0.5 + ',\x20' + _0x128a77 * 0.3 + ", 0.3)", _0x47dcdf.beginPath(), _0x47dcdf.arc(_0x4b1b7e, _0x3d6e9d, _0x5932af, 0, Math.PI * 2), _0x47dcdf.fill());
  }
  _0x47dcdf.restore();
}
function addBloodStains(_0x4dda57, _0x56b992, _0x3780d2) {
  (_0x4dda57.save(), _0x4dda57.globalAlpha = 0.4);
  for (let _0x8f0235 = 0; _0x8f0235 < 15; _0x8f0235++) {
    const _0x149053 = Math.random() * _0x56b992, _0x3cacfd = Math.random() * _0x3780d2, _0x5e51de = 20 + Math.random() * 40, _0x456558 = _0x4dda57.createRadialGradient(_0x149053, _0x3cacfd, 0, _0x149053, _0x3cacfd, _0x5e51de);
    (_0x456558.addColorStop(0, "rgba(100, 0, 0, 0.8)"), _0x456558.addColorStop(0.7, 'rgba(80,\x200,\x200,\x200.4)'), _0x456558.addColorStop(1, "transparent"), _0x4dda57.fillStyle = _0x456558, _0x4dda57.beginPath(), _0x4dda57.arc(_0x149053, _0x3cacfd, _0x5e51de, 0, Math.PI * 2), _0x4dda57.fill(), addStainDrips(_0x4dda57, _0x149053, _0x3cacfd + _0x5e51de, _0x5e51de * 0.5));
  }
  _0x4dda57.restore();
}
function addStainDrips(_0x3fb15d, _0x303a56, _0x28ab00, _0x29d489) {
  for (let _0x220a2b = 0; _0x220a2b < _0x29d489; _0x220a2b++) {
    const _0x3a1f57 = _0x303a56 + (Math.random() - 0.5) * 30, _0x2e3c91 = 10 + Math.random() * 40, _0x3fcab5 = 1 + Math.random() * 3;
    (_0x3fb15d.strokeStyle = "rgba(80, 0, 0, 0.6)", _0x3fb15d.lineWidth = _0x3fcab5, _0x3fb15d.lineCap = 'round', _0x3fb15d.beginPath(), _0x3fb15d.moveTo(_0x3a1f57, _0x28ab00), _0x3fb15d.lineTo(_0x3a1f57, _0x28ab00 + _0x2e3c91), _0x3fb15d.stroke(), _0x3fb15d.fillStyle = 'rgba(100,\x200,\x200,\x200.7)', _0x3fb15d.beginPath(), _0x3fb15d.arc(_0x3a1f57, _0x28ab00 + _0x2e3c91, _0x3fcab5 * 1.5, 0, Math.PI * 2), _0x3fb15d.fill());
  }
}
function drawAdvancedBloodText(_0x54702e, _0x53fc26, _0x2c91dd, _0x2613a4) {
  (_0x54702e.save(), _0x54702e.shadowColor = "rgba(150, 0, 0, 0.8)", _0x54702e.shadowBlur = 40, _0x54702e.shadowOffsetX = 5, _0x54702e.shadowOffsetY = 5);
  const _0x10ce60 = _0x54702e.createLinearGradient(_0x2c91dd - 150, _0x2613a4 - 60, _0x2c91dd + 150, _0x2613a4 + 60);
  (_0x10ce60.addColorStop(0, "#8B0000"), _0x10ce60.addColorStop(0.2, "#DC143C"), _0x10ce60.addColorStop(0.5, "#8B0000"), _0x10ce60.addColorStop(0.8, "#DC143C"), _0x10ce60.addColorStop(1, "#8B0000"), _0x54702e.font = "bold 80px \"Arial\"", _0x54702e.textAlign = 'center', _0x54702e.textBaseline = 'middle', _0x54702e.fillStyle = _0x10ce60, _0x54702e.fillText(_0x53fc26.toUpperCase(), _0x2c91dd, _0x2613a4), _0x54702e.shadowColor = 'transparent', _0x54702e.fillStyle = 'rgba(220,\x2020,\x2060,\x200.6)', _0x54702e.fillText(_0x53fc26.toUpperCase(), _0x2c91dd - 2, _0x2613a4 - 2), addBloodClotTexture(_0x54702e, _0x53fc26, _0x2c91dd, _0x2613a4), addAdvancedDrippingBlood(_0x54702e, _0x53fc26, _0x2c91dd, _0x2613a4), addTextSplatter(_0x54702e, _0x53fc26, _0x2c91dd, _0x2613a4), _0x54702e.restore());
}
function addBloodClotTexture(_0x18d310, _0x44d43b, _0x3d9cd7, _0x50bd8b) {
  (_0x18d310.save(), _0x18d310.globalCompositeOperation = 'overlay', _0x18d310.globalAlpha = 0.3);
  const _0x594f2a = _0x18d310.measureText(_0x44d43b.toUpperCase()), _0x5244f4 = _0x594f2a.width, _0x4a6c93 = 80;
  for (let _0x7f949a = 0; _0x7f949a < 25; _0x7f949a++) {
    const _0x304e13 = _0x3d9cd7 - _0x5244f4 / 2 + Math.random() * _0x5244f4, _0x13b6c2 = _0x50bd8b - _0x4a6c93 / 2 + Math.random() * _0x4a6c93, _0x1f9bb0 = 2 + Math.random() * 8;
    (_0x18d310.fillStyle = "rgba(60, 0, 0, 0.8)", _0x18d310.beginPath(), _0x18d310.arc(_0x304e13, _0x13b6c2, _0x1f9bb0, 0, Math.PI * 2), _0x18d310.fill(), _0x18d310.fillStyle = "rgba(150, 0, 0, 0.6)", _0x18d310.beginPath(), _0x18d310.arc(_0x304e13 - _0x1f9bb0 * 0.3, _0x13b6c2 - _0x1f9bb0 * 0.3, _0x1f9bb0 * 0.5, 0, Math.PI * 2), _0x18d310.fill());
  }
  for (let _0x34fbea = 0; _0x34fbea < 15; _0x34fbea++) {
    const _0x4bd9e9 = _0x3d9cd7 - _0x5244f4 / 2 + Math.random() * _0x5244f4, _0x3ca6f4 = _0x50bd8b - _0x4a6c93 / 2 + Math.random() * _0x4a6c93, _0x5536bd = 5 + Math.random() * 20, _0x18e928 = Math.random() * Math.PI * 2;
    (_0x18d310.strokeStyle = "rgba(80, 0, 0, 0.7)", _0x18d310.lineWidth = 1 + Math.random() * 2, _0x18d310.lineCap = 'round', _0x18d310.beginPath(), _0x18d310.moveTo(_0x4bd9e9, _0x3ca6f4), _0x18d310.lineTo(_0x4bd9e9 + Math.cos(_0x18e928) * _0x5536bd, _0x3ca6f4 + Math.sin(_0x18e928) * _0x5536bd), _0x18d310.stroke());
  }
  _0x18d310.restore();
}
function addAdvancedDrippingBlood(_0x18b259, _0x3faef0, _0x490040, _0x157010) {
  (_0x18b259.save(), _0x18b259.globalAlpha = 0.9);
  const _0x216b12 = _0x18b259.measureText(_0x3faef0.toUpperCase()), _0x449735 = _0x216b12.width, _0x5c7076 = 80, _0x264602 = [];
  for (let _0x3da020 = 0; _0x3da020 < _0x3faef0.length * 3; _0x3da020++) {
    _0x264602.push(_0x490040 - _0x449735 / 2 + Math.random() * _0x449735);
  }
  (_0x264602.forEach(_0x7cd89d => {
    const _0xb9a469 = _0x157010 + _0x5c7076 / 2, _0x29fad2 = 1 + Math.floor(Math.random() * 3);
    for (let _0xdf69dc = 0; _0xdf69dc < _0x29fad2; _0xdf69dc++) {
      const _0x51e1fd = 20 + Math.random() * 60, _0x5566d8 = 2 + Math.random() * 4, _0x144296 = (Math.random() - 0.5) * 10, _0x156cc7 = _0x18b259.createLinearGradient(_0x7cd89d + _0x144296, _0xb9a469, _0x7cd89d + _0x144296, _0xb9a469 + _0x51e1fd);
      (_0x156cc7.addColorStop(0, 'rgba(150,\x200,\x200,\x200.9)'), _0x156cc7.addColorStop(0.7, "rgba(100, 0, 0, 0.7)"), _0x156cc7.addColorStop(1, "rgba(80, 0, 0, 0.5)"), _0x18b259.strokeStyle = _0x156cc7, _0x18b259.lineWidth = _0x5566d8, _0x18b259.lineCap = "round", _0x18b259.beginPath(), _0x18b259.moveTo(_0x7cd89d + _0x144296, _0xb9a469), _0x18b259.lineTo(_0x7cd89d + _0x144296, _0xb9a469 + _0x51e1fd), _0x18b259.stroke());
      const _0x23714b = _0x18b259.createRadialGradient(_0x7cd89d + _0x144296, _0xb9a469 + _0x51e1fd, 0, _0x7cd89d + _0x144296, _0xb9a469 + _0x51e1fd, _0x5566d8 * 2);
      (_0x23714b.addColorStop(0, "rgba(180, 0, 0, 0.9)"), _0x23714b.addColorStop(1, "rgba(120, 0, 0, 0.6)"), _0x18b259.fillStyle = _0x23714b, _0x18b259.beginPath(), _0x18b259.arc(_0x7cd89d + _0x144296, _0xb9a469 + _0x51e1fd, _0x5566d8 * 1.5, 0, Math.PI * 2), _0x18b259.fill());
      if (Math.random() > 0.7) {
        const _0x2209fc = 5 + Math.random() * 15, _0x4dbdab = _0x7cd89d + _0x144296 + (Math.random() - 0.5) * 8;
        (_0x18b259.strokeStyle = "rgba(120, 0, 0, 0.7)", _0x18b259.lineWidth = _0x5566d8 * 0.6, _0x18b259.beginPath(), _0x18b259.moveTo(_0x7cd89d + _0x144296, _0xb9a469 + _0x51e1fd * 0.7), _0x18b259.lineTo(_0x4dbdab, _0xb9a469 + _0x51e1fd * 0.7 + _0x2209fc), _0x18b259.stroke());
      }
    }
  }), _0x18b259.restore());
}
function addTextSplatter(_0x46f5ba, _0x15f4d3, _0x2d2999, _0x417bc4) {
  (_0x46f5ba.save(), _0x46f5ba.globalAlpha = 0.8);
  const _0x44bcec = _0x46f5ba.measureText(_0x15f4d3.toUpperCase()), _0x1be847 = _0x44bcec.width, _0x5cd155 = 80;
  for (let _0x545b59 = 0; _0x545b59 < 30; _0x545b59++) {
    const _0x22c746 = Math.random() * Math.PI * 2, _0x3638b0 = _0x1be847 * 0.3 + Math.random() * _0x1be847 * 0.4, _0x25e872 = _0x2d2999 + Math.cos(_0x22c746) * _0x3638b0, _0x244f32 = _0x417bc4 + Math.sin(_0x22c746) * _0x3638b0, _0x589989 = 3 + Math.random() * 12;
    drawBloodSplatter(_0x46f5ba, _0x25e872, _0x244f32, _0x589989);
  }
  _0x46f5ba.restore();
}
function addBloodSplatters(_0x5c8136, _0x1ba33d, _0x5ed4fa) {
  (_0x5c8136.save(), _0x5c8136.globalAlpha = 0.7);
  for (let _0x29fc0d = 0; _0x29fc0d < 12; _0x29fc0d++) {
    const _0x5d9fa8 = Math.random() * _0x1ba33d, _0x8f8022 = Math.random() * _0x5ed4fa, _0x415a46 = 15 + Math.random() * 25;
    drawAdvancedBloodSplatter(_0x5c8136, _0x5d9fa8, _0x8f8022, _0x415a46);
  }
  for (let _0x484820 = 0; _0x484820 < 25; _0x484820++) {
    const _0x50b098 = Math.random() * _0x1ba33d, _0x55191e = Math.random() * _0x5ed4fa, _0x74585 = 8 + Math.random() * 15;
    drawBloodSplatter(_0x5c8136, _0x50b098, _0x55191e, _0x74585);
  }
  for (let _0x67c3fe = 0; _0x67c3fe < 60; _0x67c3fe++) {
    const _0x186d14 = Math.random() * _0x1ba33d, _0x55dd32 = Math.random() * _0x5ed4fa, _0x4e828b = 1 + Math.random() * 5;
    (_0x5c8136.fillStyle = "rgba(120, 0, 0, " + (0.5 + Math.random() * 0.4) + ')', _0x5c8136.beginPath(), _0x5c8136.arc(_0x186d14, _0x55dd32, _0x4e828b, 0, Math.PI * 2), _0x5c8136.fill());
  }
  _0x5c8136.restore();
}
function drawAdvancedBloodSplatter(_0x4e2cea, _0x20150a, _0x58a088, _0x3089a9) {
  const _0x85047e = _0x4e2cea.createRadialGradient(_0x20150a, _0x58a088, 0, _0x20150a, _0x58a088, _0x3089a9);
  (_0x85047e.addColorStop(0, "rgba(180, 0, 0, 0.9)"), _0x85047e.addColorStop(0.7, "rgba(120, 0, 0, 0.6)"), _0x85047e.addColorStop(1, "transparent"), _0x4e2cea.fillStyle = _0x85047e, _0x4e2cea.beginPath(), _0x4e2cea.arc(_0x20150a, _0x58a088, _0x3089a9, 0, Math.PI * 2), _0x4e2cea.fill());
  const _0x4d54ab = 8 + Math.floor(Math.random() * 8);
  for (let _0x4d7cb8 = 0; _0x4d7cb8 < _0x4d54ab; _0x4d7cb8++) {
    const _0x29479b = _0x4d7cb8 / _0x4d54ab * Math.PI * 2, _0x41736a = _0x3089a9 * (0.5 + Math.random() * 0.8), _0x17b05b = _0x3089a9 * (0.1 + Math.random() * 0.2), _0x59aafc = _0x4e2cea.createLinearGradient(_0x20150a, _0x58a088, _0x20150a + Math.cos(_0x29479b) * _0x41736a, _0x58a088 + Math.sin(_0x29479b) * _0x41736a);
    (_0x59aafc.addColorStop(0, "rgba(150, 0, 0, 0.8)"), _0x59aafc.addColorStop(1, "transparent"), _0x4e2cea.strokeStyle = _0x59aafc, _0x4e2cea.lineWidth = _0x17b05b, _0x4e2cea.lineCap = "round", _0x4e2cea.beginPath(), _0x4e2cea.moveTo(_0x20150a, _0x58a088), _0x4e2cea.lineTo(_0x20150a + Math.cos(_0x29479b) * _0x41736a, _0x58a088 + Math.sin(_0x29479b) * _0x41736a), _0x4e2cea.stroke());
  }
}
function drawBloodSplatter(_0xde87e2, _0x5174bf, _0x5d3437, _0x3bc7f0) {
  (_0xde87e2.fillStyle = "rgba(120, 0, 0, " + (0.6 + Math.random() * 0.3) + ')', _0xde87e2.beginPath(), _0xde87e2.arc(_0x5174bf, _0x5d3437, _0x3bc7f0, 0, Math.PI * 2), _0xde87e2.fill());
  for (let _0x27e046 = 0; _0x27e046 < 3; _0x27e046++) {
    const _0x5b1d4c = Math.random() * Math.PI * 2, _0x1727fd = _0x3bc7f0 * 0.5;
    (_0xde87e2.beginPath(), _0xde87e2.arc(_0x5174bf + Math.cos(_0x5b1d4c) * _0x1727fd, _0x5d3437 + Math.sin(_0x5b1d4c) * _0x1727fd, _0x3bc7f0 * 0.3, 0, Math.PI * 2), _0xde87e2.fill());
  }
}
function addBloodSpatterPhysics(_0x59adb5, _0x21a689, _0x1b38d6, _0x43d893) {
  (_0x59adb5.save(), _0x59adb5.globalAlpha = 0.6);
  const _0x3e7bc2 = _0x59adb5.measureText(_0x43d893.toUpperCase()), _0x19e33f = _0x3e7bc2.width;
  for (let _0x197bf0 = 0; _0x197bf0 < 50; _0x197bf0++) {
    const _0x12d7e4 = _0x21a689 - _0x19e33f / 2 + Math.random() * _0x19e33f, _0x457b28 = _0x1b38d6, _0x4d9040 = 2 + Math.random() * 4, _0xb88d2f = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI, _0x4f7700 = 5 + Math.floor(Math.random() * 10);
    drawBloodTrajectory(_0x59adb5, _0x12d7e4, _0x457b28, _0xb88d2f, _0x4d9040, _0x4f7700);
  }
  _0x59adb5.restore();
}
function drawBloodTrajectory(_0x36acdc, _0x21c781, _0x35d82f, _0x44ceb6, _0x34513c, _0x4c4566) {
  let _0x1574c5 = _0x21c781, _0x13a512 = _0x35d82f;
  const _0x374582 = 0.2;
  let _0x47aba7 = _0x34513c;
  (_0x36acdc.strokeStyle = 'rgba(150,\x200,\x200,\x20' + (0.4 + Math.random() * 0.3) + ')', _0x36acdc.lineWidth = 1 + Math.random() * 2, _0x36acdc.lineCap = 'round', _0x36acdc.beginPath(), _0x36acdc.moveTo(_0x1574c5, _0x13a512));
  for (let _0x1656aa = 0; _0x1656aa < _0x4c4566; _0x1656aa++) {
    (_0x1574c5 += Math.cos(_0x44ceb6) * _0x47aba7, _0x13a512 += Math.sin(_0x44ceb6) * _0x47aba7, _0x47aba7 *= 0.9, _0x44ceb6 += _0x374582 * 0.1, _0x36acdc.lineTo(_0x1574c5, _0x13a512), (Math.random() > 0.8 || _0x1656aa === _0x4c4566 - 1) && (_0x36acdc.stroke(), drawBloodSplatter(_0x36acdc, _0x1574c5, _0x13a512, 2 + Math.random() * 4), _0x36acdc.beginPath(), _0x36acdc.moveTo(_0x1574c5, _0x13a512)));
  }
  _0x36acdc.stroke();
}
function addGoreDetails(_0x4aded4, _0x15294d, _0x5c4b1b) {
  (_0x4aded4.save(), _0x4aded4.globalAlpha = 0.7);
  for (let _0x1a83bf = 0; _0x1a83bf < 8; _0x1a83bf++) {
    const _0x102beb = Math.random() * _0x15294d, _0x30c536 = Math.random() * _0x5c4b1b, _0x2e4c1f = 5 + Math.random() * 15;
    drawFleshChunk(_0x4aded4, _0x102beb, _0x30c536, _0x2e4c1f);
  }
  for (let _0x2d888d = 0; _0x2d888d < 5; _0x2d888d++) {
    const _0x45eba1 = Math.random() * _0x15294d, _0x1b94cc = Math.random() * _0x5c4b1b, _0x46eb63 = 3 + Math.random() * 8;
    drawBoneFragment(_0x4aded4, _0x45eba1, _0x1b94cc, _0x46eb63);
  }
  _0x4aded4.restore();
}
function drawFleshChunk(_0x85b152, _0x5708e3, _0x4848af, _0x4dada5) {
  const _0x2ce19c = "rgba(" + (150 + Math.random() * 50) + ',\x20' + (50 + Math.random() * 30) + ',\x20' + (50 + Math.random() * 30) + ", 0.8)";
  (_0x85b152.fillStyle = _0x2ce19c, _0x85b152.beginPath(), _0x85b152.arc(_0x5708e3, _0x4848af, _0x4dada5, 0, Math.PI * 2), _0x85b152.fill(), _0x85b152.strokeStyle = 'rgba(100,\x2030,\x2030,\x200.6)', _0x85b152.lineWidth = 1);
  for (let _0x238c91 = 0; _0x238c91 < 3; _0x238c91++) {
    const _0x19406c = Math.random() * Math.PI * 2, _0xd173c = _0x4dada5 * 0.8;
    (_0x85b152.beginPath(), _0x85b152.moveTo(_0x5708e3, _0x4848af), _0x85b152.lineTo(_0x5708e3 + Math.cos(_0x19406c) * _0xd173c, _0x4848af + Math.sin(_0x19406c) * _0xd173c), _0x85b152.stroke());
  }
}
function drawBoneFragment(_0xe256a0, _0x4150e0, _0x206938, _0x482616) {
  (_0xe256a0.fillStyle = "rgba(240, 240, 220, 0.8)", _0xe256a0.strokeStyle = "rgba(200, 200, 180, 0.9)", _0xe256a0.lineWidth = 1, _0xe256a0.beginPath(), _0xe256a0.ellipse(_0x4150e0, _0x206938, _0x482616, _0x482616 * 0.5, Math.random() * Math.PI, 0, Math.PI * 2), _0xe256a0.fill(), _0xe256a0.stroke(), _0xe256a0.fillStyle = 'rgba(180,\x20180,\x20160,\x200.6)', _0xe256a0.beginPath(), _0xe256a0.ellipse(_0x4150e0, _0x206938, _0x482616 * 0.6, _0x482616 * 0.3, Math.random() * Math.PI, 0, Math.PI * 2), _0xe256a0.fill());
}
function addBloodPools(_0x1b9a7b, _0x4addaa, _0x33bb26) {
  (_0x1b9a7b.save(), _0x1b9a7b.globalAlpha = 0.6);
  for (let _0x115f07 = 0; _0x115f07 < 6; _0x115f07++) {
    const _0x3bd4ef = Math.random() * _0x4addaa, _0x1c59c4 = _0x33bb26 * 0.8 + Math.random() * _0x33bb26 * 0.2, _0x47d313 = 20 + Math.random() * 40;
    drawBloodPool(_0x1b9a7b, _0x3bd4ef, _0x1c59c4, _0x47d313);
  }
  _0x1b9a7b.restore();
}
function drawBloodPool(_0x3dd706, _0x228155, _0x34e4e9, _0x51b7a8) {
  const _0x2bf7ee = _0x3dd706.createRadialGradient(_0x228155, _0x34e4e9, 0, _0x228155, _0x34e4e9, _0x51b7a8);
  (_0x2bf7ee.addColorStop(0, 'rgba(100,\x200,\x200,\x200.8)'), _0x2bf7ee.addColorStop(0.5, "rgba(80, 0, 0, 0.6)"), _0x2bf7ee.addColorStop(1, "rgba(60, 0, 0, 0.3)"), _0x3dd706.fillStyle = _0x2bf7ee, _0x3dd706.beginPath(), _0x3dd706.ellipse(_0x228155, _0x34e4e9, _0x51b7a8, _0x51b7a8 * 0.3, 0, 0, Math.PI * 2), _0x3dd706.fill());
  const _0x5cb7a7 = _0x3dd706.createLinearGradient(_0x228155 - _0x51b7a8, _0x34e4e9, _0x228155 + _0x51b7a8, _0x34e4e9);
  (_0x5cb7a7.addColorStop(0, "rgba(150, 0, 0, 0.3)"), _0x5cb7a7.addColorStop(0.5, 'rgba(180,\x200,\x200,\x200.5)'), _0x5cb7a7.addColorStop(1, 'rgba(150,\x200,\x200,\x200.3)'), _0x3dd706.fillStyle = _0x5cb7a7, _0x3dd706.beginPath(), _0x3dd706.ellipse(_0x228155, _0x34e4e9 - _0x51b7a8 * 0.1, _0x51b7a8 * 0.8, _0x51b7a8 * 0.2, 0, 0, Math.PI * 2), _0x3dd706.fill());
}
function addBloodyHandprints(_0x79e68d, _0x9f087d, _0x53b6bd) {
  (_0x79e68d.save(), _0x79e68d.globalAlpha = 0.5);
  for (let _0x3a3756 = 0; _0x3a3756 < 4; _0x3a3756++) {
    const _0xe28317 = Math.random() * _0x9f087d, _0x530cec = Math.random() * _0x53b6bd, _0x2942ee = 30 + Math.random() * 20, _0x1ea8df = Math.random() * Math.PI * 2;
    drawBloodyHandprint(_0x79e68d, _0xe28317, _0x530cec, _0x2942ee, _0x1ea8df);
  }
  _0x79e68d.restore();
}
function drawBloodyHandprint(_0x5e8b7f, _0x1bc4ed, _0x3ccca6, _0x222dd0, _0x2ebe2e) {
  (_0x5e8b7f.save(), _0x5e8b7f.translate(_0x1bc4ed, _0x3ccca6), _0x5e8b7f.rotate(_0x2ebe2e), _0x5e8b7f.fillStyle = 'rgba(120,\x200,\x200,\x200.7)', _0x5e8b7f.beginPath(), _0x5e8b7f.ellipse(0, 0, _0x222dd0 * 0.3, _0x222dd0 * 0.4, 0, 0, Math.PI * 2), _0x5e8b7f.fill());
  const _0x51682b = [-0.8, -0.4, 0, 0.4, 0.8];
  (_0x51682b.forEach(_0x2c0465 => {
    const _0x596fee = Math.cos(_0x2c0465) * _0x222dd0 * 0.5, _0x4801e1 = Math.sin(_0x2c0465) * _0x222dd0 * 0.5;
    (_0x5e8b7f.beginPath(), _0x5e8b7f.ellipse(_0x596fee, _0x4801e1, _0x222dd0 * 0.1, _0x222dd0 * 0.25, _0x2c0465, 0, Math.PI * 2), _0x5e8b7f.fill());
  }), _0x5e8b7f.restore());
}
function addWeaponMarks(_0x3a39ad, _0x178420, _0x349bb0) {
  (_0x3a39ad.save(), _0x3a39ad.globalAlpha = 0.4);
  for (let _0x3a4f23 = 0; _0x3a4f23 < 8; _0x3a4f23++) {
    const _0x58696e = Math.random() * _0x178420, _0x280984 = Math.random() * _0x349bb0, _0x285db8 = 20 + Math.random() * 40, _0x43d5c3 = Math.random() * Math.PI * 2;
    (_0x3a39ad.strokeStyle = "rgba(80, 0, 0, 0.6)", _0x3a39ad.lineWidth = 2, _0x3a39ad.lineCap = "round", _0x3a39ad.beginPath(), _0x3a39ad.moveTo(_0x58696e, _0x280984), _0x3a39ad.lineTo(_0x58696e + Math.cos(_0x43d5c3) * _0x285db8, _0x280984 + Math.sin(_0x43d5c3) * _0x285db8), _0x3a39ad.stroke());
  }
  for (let _0x2b32b7 = 0; _0x2b32b7 < 5; _0x2b32b7++) {
    const _0xf1750e = Math.random() * _0x178420, _0x5c6b62 = Math.random() * _0x349bb0, _0x401cdb = 3 + Math.random() * 6;
    (_0x3a39ad.fillStyle = 'rgba(40,\x2040,\x2040,\x200.8)', _0x3a39ad.beginPath(), _0x3a39ad.arc(_0xf1750e, _0x5c6b62, _0x401cdb, 0, Math.PI * 2), _0x3a39ad.fill(), _0x3a39ad.fillStyle = "rgba(100, 0, 0, 0.5)", _0x3a39ad.beginPath(), _0x3a39ad.arc(_0xf1750e, _0x5c6b62, _0x401cdb * 1.5, 0, Math.PI * 2), _0x3a39ad.fill());
  }
  _0x3a39ad.restore();
}
function addBloodMist(_0x2f62a9, _0x516865, _0x15abc7) {
  (_0x2f62a9.save(), _0x2f62a9.globalAlpha = 0.1, _0x2f62a9.globalCompositeOperation = "screen");
  for (let _0x2cb79d = 0; _0x2cb79d < 5; _0x2cb79d++) {
    const _0x390ce = Math.random() * _0x516865, _0x182bfa = Math.random() * _0x15abc7, _0x4fc131 = 50 + Math.random() * 100, _0x236a9d = _0x2f62a9.createRadialGradient(_0x390ce, _0x182bfa, 0, _0x390ce, _0x182bfa, _0x4fc131);
    (_0x236a9d.addColorStop(0, "rgba(100, 0, 0, 0.4)"), _0x236a9d.addColorStop(1, "transparent"), _0x2f62a9.fillStyle = _0x236a9d, _0x2f62a9.beginPath(), _0x2f62a9.arc(_0x390ce, _0x182bfa, _0x4fc131, 0, Math.PI * 2), _0x2f62a9.fill());
  }
  _0x2f62a9.restore();
}
function addBloodParticles(_0x214edc, _0x557c39, _0xdb093) {
  (_0x214edc.save(), _0x214edc.globalAlpha = 0.6);
  for (let _0x4412d0 = 0; _0x4412d0 < 40; _0x4412d0++) {
    const _0x5b1c3b = Math.random() * _0x557c39, _0x2eda55 = Math.random() * _0xdb093, _0x335c1e = 1 + Math.random() * 3, _0x114760 = 0.4 + Math.random() * 0.4;
    (_0x214edc.fillStyle = "rgba(120, 0, 0, " + _0x114760 + ')', _0x214edc.beginPath(), _0x214edc.arc(_0x5b1c3b, _0x2eda55, _0x335c1e, 0, Math.PI * 2), _0x214edc.fill());
    const _0x307bd6 = 2 + Math.random() * 6, _0x56dee8 = Math.random() * Math.PI * 2;
    (_0x214edc.strokeStyle = "rgba(100, 0, 0, " + _0x114760 * 0.5 + ')', _0x214edc.lineWidth = _0x335c1e * 0.5, _0x214edc.lineCap = "round", _0x214edc.beginPath(), _0x214edc.moveTo(_0x5b1c3b, _0x2eda55), _0x214edc.lineTo(_0x5b1c3b + Math.cos(_0x56dee8) * _0x307bd6, _0x2eda55 + Math.sin(_0x56dee8) * _0x307bd6), _0x214edc.stroke());
  }
  _0x214edc.restore();
}
function addBloodLighting(_0x3c7c68, _0x1b7d36, _0x68f145) {
  (_0x3c7c68.save(), _0x3c7c68.globalCompositeOperation = 'overlay', _0x3c7c68.globalAlpha = 0.2);
  for (let _0x34e9ab = 0; _0x34e9ab < 3; _0x34e9ab++) {
    const _0x5779c5 = Math.random() * _0x1b7d36, _0x415496 = Math.random() * _0x68f145 * 0.3, _0x2b059e = 60 + Math.random() * 80, _0xcf18a1 = _0x3c7c68.createRadialGradient(_0x5779c5, _0x415496, 0, _0x5779c5, _0x415496, _0x2b059e);
    (_0xcf18a1.addColorStop(0, "rgba(255, 0, 0, 0.3)"), _0xcf18a1.addColorStop(1, "transparent"), _0x3c7c68.fillStyle = _0xcf18a1, _0x3c7c68.beginPath(), _0x3c7c68.arc(_0x5779c5, _0x415496, _0x2b059e, 0, Math.PI * 2), _0x3c7c68.fill());
  }
  _0x3c7c68.restore();
}
function addHorrorShadows(_0x337a6c, _0x1c8e78, _0x5c8ea6) {
  (_0x337a6c.save(), _0x337a6c.globalAlpha = 0.3, _0x337a6c.fillStyle = "rgba(0, 0, 0, 0.5)", _0x337a6c.beginPath(), _0x337a6c.moveTo(0, 0), _0x337a6c.lineTo(_0x1c8e78 * 0.3, 0), _0x337a6c.lineTo(0, _0x5c8ea6 * 0.3), _0x337a6c.closePath(), _0x337a6c.fill(), _0x337a6c.beginPath(), _0x337a6c.moveTo(_0x1c8e78, 0), _0x337a6c.lineTo(_0x1c8e78 * 0.7, 0), _0x337a6c.lineTo(_0x1c8e78, _0x5c8ea6 * 0.3), _0x337a6c.closePath(), _0x337a6c.fill(), _0x337a6c.beginPath(), _0x337a6c.moveTo(0, _0x5c8ea6), _0x337a6c.lineTo(_0x1c8e78 * 0.3, _0x5c8ea6), _0x337a6c.lineTo(0, _0x5c8ea6 * 0.7), _0x337a6c.closePath(), _0x337a6c.fill(), _0x337a6c.beginPath(), _0x337a6c.moveTo(_0x1c8e78, _0x5c8ea6), _0x337a6c.lineTo(_0x1c8e78 * 0.7, _0x5c8ea6), _0x337a6c.lineTo(_0x1c8e78, _0x5c8ea6 * 0.7), _0x337a6c.closePath(), _0x337a6c.fill(), _0x337a6c.restore());
}
function drawGoreBorder(_0x438595, _0x63d276, _0x5e8970) {
  _0x438595.save();
  const _0x3e9483 = _0x438595.createLinearGradient(0, 0, _0x63d276, 0);
  (_0x3e9483.addColorStop(0, "#8B0000"), _0x3e9483.addColorStop(0.3, '#DC143C'), _0x3e9483.addColorStop(0.5, "#8B0000"), _0x3e9483.addColorStop(0.7, "#DC143C"), _0x3e9483.addColorStop(1, '#8B0000'), _0x438595.strokeStyle = _0x3e9483, _0x438595.lineWidth = 10, _0x438595.shadowColor = "rgba(150, 0, 0, 0.6)", _0x438595.shadowBlur = 20, _0x438595.strokeRect(10, 10, _0x63d276 - 20, _0x5e8970 - 20), _0x438595.strokeStyle = "rgba(150, 0, 0, 0.6)", _0x438595.lineWidth = 3, _0x438595.shadowBlur = 15, _0x438595.strokeRect(20, 20, _0x63d276 - 40, _0x5e8970 - 40), addBloodCorners(_0x438595, _0x63d276, _0x5e8970), _0x438595.restore());
}
function addBloodCorners(_0x4d386b, _0x5eec96, _0x233528) {
  (_0x4d386b.save(), _0x4d386b.globalAlpha = 0.8);
  const _0x26ac9c = [{
    x: 30,
    y: 30
  }, {
    x: _0x5eec96 - 30,
    y: 30
  }, {
    x: 30,
    y: _0x233528 - 30
  }, {
    x: _0x5eec96 - 30,
    y: _0x233528 - 30
  }];
  (_0x26ac9c.forEach(_0x24276c => {
    const _0x4508a6 = _0x4d386b.createRadialGradient(_0x24276c.x, _0x24276c.y, 0, _0x24276c.x, _0x24276c.y, 8);
    (_0x4508a6.addColorStop(0, "rgba(180, 0, 0, 0.9)"), _0x4508a6.addColorStop(1, "rgba(120, 0, 0, 0.6)"), _0x4d386b.fillStyle = _0x4508a6, _0x4d386b.beginPath(), _0x4d386b.arc(_0x24276c.x, _0x24276c.y, 8, 0, Math.PI * 2), _0x4d386b.fill(), _0x4d386b.strokeStyle = "rgba(150, 0, 0, 0.8)", _0x4d386b.lineWidth = 3, _0x4d386b.lineCap = "round", _0x4d386b.beginPath(), _0x4d386b.moveTo(_0x24276c.x, _0x24276c.y), _0x4d386b.lineTo(_0x24276c.x, _0x24276c.y + 15), _0x4d386b.stroke());
  }), _0x4d386b.restore());
}
function addBloodSignature(_0x38445f, _0x5376f5, _0x538138) {
  _0x38445f.save();
  const _0xa63d42 = _0x5376f5 - 110, _0x71e2c6 = _0x538138 - 25;
  (_0x38445f.font = "italic 14px \"Arial\"", _0x38445f.fillStyle = "rgba(150, 0, 0, 0.9)", _0x38445f.textAlign = 'right', _0x38445f.textBaseline = "bottom", _0x38445f.shadowColor = "rgba(100, 0, 0, 0.6)", _0x38445f.shadowBlur = 10, _0x38445f.fillText("by Lupin Stanley", _0xa63d42, _0x71e2c6));
  const _0xf4d84b = _0x38445f.createRadialGradient(_0xa63d42 + 5, _0x71e2c6 - 8, 0, _0xa63d42 + 5, _0x71e2c6 - 8, 4);
  (_0xf4d84b.addColorStop(0, 'rgba(180,\x200,\x200,\x200.9)'), _0xf4d84b.addColorStop(1, "rgba(120, 0, 0, 0.6)"), _0x38445f.fillStyle = _0xf4d84b, _0x38445f.beginPath(), _0x38445f.arc(_0xa63d42 + 5, _0x71e2c6 - 8, 4, 0, Math.PI * 2), _0x38445f.fill(), _0x38445f.strokeStyle = "rgba(150, 0, 0, 0.8)", _0x38445f.lineWidth = 2, _0x38445f.lineCap = "round", _0x38445f.beginPath(), _0x38445f.moveTo(_0xa63d42 + 5, _0x71e2c6 - 4), _0x38445f.lineTo(_0xa63d42 + 5, _0x71e2c6 - 1), _0x38445f.stroke(), _0x38445f.restore());
}
