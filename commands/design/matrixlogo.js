import {DESIGN, STATUS} from '../../lib/emojis.js';
import {getBotName} from '../../lib/botname.js';
import {addWatermark} from '../../lib/logo-watermark.js';
import {createCanvas} from '../../lib/canvasWrapper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "matrixlogo",
  description: 'Create\x20Matrix-style\x20digital\x20rain\x20text\x20logos',
  async execute(_0x42ae84, _0x2afa02, _0x176500) {
    const _0x321b31 = _0x2afa02.key.remoteJid;
    try {
      if (_0x176500.length === 0) {
        await _0x42ae84.sendMessage(_0x321b31, {
          text: "╭─⌈ " + DESIGN.MATRIX + '\x20*MATRIX\x20LOGO*\x20⌋\x0a│\x0a├─⊷\x20*matrixlogo*\x0a│\x20\x20└⊷\x20matrixlogo\x20<text>\x0a│\x0a├─⊷\x20*Example:*\x0a│\x20\x20└⊷\x20matrixlogo\x20WOLF\x0a│\x20\x20└⊷\x20matrixlogo\x20MATRIX\x0a│\x20\x20└⊷\x20matrixlogo\x20NEO\x0a│\x0a╰⊷\x20' + getFooter(_0x2afa02.key.participant || _0x2afa02.key.remoteJid)
        }, {
          quoted: _0x2afa02
        });
        return;
      }
      const _0x216919 = _0x176500.join('\x20');
      if (_0x216919.length > 12) {
        await _0x42ae84.sendMessage(_0x321b31, {
          text: "╭─⌈ " + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ Text too long!\n│  └⊷ Maximum 12 characters\n│  └⊷ Your text: \"" + _0x216919 + '\x22\x20(' + _0x216919.length + " chars)\n│\n╰───"
        }, {
          quoted: _0x2afa02
        });
        return;
      }
      await _0x42ae84.sendMessage(_0x321b31, {
        react: {
          text: STATUS.LOADING,
          key: _0x2afa02.key
        }
      });
      const _0x118b0a = await generateMatrixLogo(_0x216919);
      (await _0x42ae84.sendMessage(_0x321b31, {
        image: _0x118b0a,
        caption: DESIGN.MATRIX + '\x20*Matrix\x20Logo\x20Generated!*\x0aText:\x20' + _0x216919 + "\n\n_Created by " + getBotName() + '_'
      }, {
        quoted: _0x2afa02
      }), await _0x42ae84.sendMessage(_0x321b31, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x2afa02.key
        }
      }));
    } catch (_0xf61a78) {
      (console.error(STATUS.ERROR + '\x20[MATRIXLOGO]\x20ERROR:', _0xf61a78), await _0x42ae84.sendMessage(_0x321b31, {
        react: {
          text: STATUS.ERROR,
          key: _0x2afa02.key
        }
      }).catch(() => {}), await _0x42ae84.sendMessage(_0x321b31, {
        text: "╭─⌈ " + STATUS.ERROR + '\x20*ERROR*\x20⌋\x0a│\x0a├─⊷\x20' + _0xf61a78.message + "\n│  └⊷ Please try again with shorter text\n│\n╰───"
      }, {
        quoted: _0x2afa02
      }));
    }
  }
};
async function generateMatrixLogo(_0x5550eb) {
  const _0x56f059 = 800, _0x1bdf5e = 400, _0x32a1f0 = createCanvas(_0x56f059, _0x1bdf5e), _0x5a7d2d = _0x32a1f0.getContext('2d');
  return (_0x5a7d2d.fillStyle = "#000000", _0x5a7d2d.fillRect(0, 0, _0x56f059, _0x1bdf5e), generateDigitalRain(_0x5a7d2d, _0x56f059, _0x1bdf5e), createMatrixText(_0x5a7d2d, _0x5550eb, _0x56f059, _0x1bdf5e), addMatrixEffects(_0x5a7d2d, _0x56f059, _0x1bdf5e), addBinaryBackground(_0x5a7d2d, _0x56f059, _0x1bdf5e), addWatermark(_0x5a7d2d, _0x56f059, _0x1bdf5e), _0x32a1f0.toBuffer("image/png"));
}
function generateDigitalRain(_0x264ed2, _0x482885, _0x30d32a) {
  const _0x14cbaf = Math.floor(_0x482885 / 20), _0x1fb50b = Array(_0x14cbaf).fill(1);
  for (let _0x43e012 = 0; _0x43e012 < 3; _0x43e012++) {
    const _0x66d6c3 = 2 + _0x43e012, _0x1bba86 = 12 - _0x43e012 * 2, _0x801abb = 0.3 + _0x43e012 * 0.2;
    _0x264ed2.font = _0x1bba86 + "px \"Courier New\", monospace";
    for (let _0x423db9 = 0; _0x423db9 < _0x1fb50b.length; _0x423db9++) {
      const _0x3f1381 = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789#$%&@*", _0x541526 = _0x3f1381[Math.floor(Math.random() * _0x3f1381.length)], _0x43b610 = _0x423db9 * 20, _0x213596 = _0x1fb50b[_0x423db9] * _0x1bba86, _0x182dc8 = _0x213596 / _0x30d32a, _0x37fd5d = _0x801abb * (1 - _0x182dc8), _0x2b7fae = Math.floor(100 + 155 * (1 - _0x182dc8));
      (_0x264ed2.fillStyle = "rgba(0, " + _0x2b7fae + ", 0, " + _0x37fd5d + ')', _0x264ed2.fillText(_0x541526, _0x43b610, _0x213596), _0x213596 > _0x30d32a && Math.random() > 0.975 && (_0x1fb50b[_0x423db9] = 0), _0x1fb50b[_0x423db9]++);
    }
  }
}
function createMatrixText(_0x5d1c6f, _0x96ada2, _0x2e835b, _0x527cef) {
  const _0x39eefe = _0x2e835b / 2, _0x3ca4f0 = _0x527cef / 2;
  for (let _0x52d8c6 = 0; _0x52d8c6 < 5; _0x52d8c6++) {
    const _0x80ee17 = (Math.random() - 0.5) * 4, _0x25f557 = (Math.random() - 0.5) * 4, _0x23793f = 0.1 + _0x52d8c6 * 0.1, _0x1235ec = ["#00FF00", "#00CC00", "#009900", "#00FF66", "#66FF00"];
    (_0x5d1c6f.fillStyle = '' + _0x1235ec[_0x52d8c6] + Math.floor(_0x23793f * 255).toString(16).padStart(2, '0'), _0x5d1c6f.font = "bold 70px \"Courier New\", monospace", _0x5d1c6f.textAlign = "center", _0x5d1c6f.textBaseline = "middle", _0x5d1c6f.fillText(_0x96ada2.toUpperCase(), _0x39eefe + _0x80ee17, _0x3ca4f0 + _0x25f557));
  }
  (_0x5d1c6f.fillStyle = '#00FF00', _0x5d1c6f.font = 'bold\x2072px\x20\x22Courier\x20New\x22,\x20monospace', _0x5d1c6f.textAlign = "center", _0x5d1c6f.textBaseline = "middle", _0x5d1c6f.shadowColor = "#00FF00", _0x5d1c6f.shadowBlur = 20, _0x5d1c6f.fillText(_0x96ada2.toUpperCase(), _0x39eefe, _0x3ca4f0), _0x5d1c6f.shadowColor = "transparent", _0x5d1c6f.shadowBlur = 0, addTextGlitches(_0x5d1c6f, _0x96ada2, _0x2e835b, _0x527cef));
}
function addTextGlitches(_0x4b9b51, _0xb2383f, _0x40de25, _0x1c9660) {
  const _0xed9bb0 = _0x40de25 / 2, _0x280480 = _0x1c9660 / 2, _0x165fd1 = _0x4b9b51.measureText(_0xb2383f.toUpperCase()).width;
  _0x4b9b51.save();
  for (let _0x5977cf = 0; _0x5977cf < 15; _0x5977cf++) {
    const _0x11ed67 = _0xed9bb0 - _0x165fd1 / 2 + Math.random() * _0x165fd1, _0x4c1ea1 = _0x280480 - 35 + Math.random() * 70, _0x3a4ba0 = 2 + Math.random() * 8, _0x47d8ca = 1 + Math.random() * 3, _0x3b7c44 = 0.3 + Math.random() * 0.7;
    (_0x4b9b51.fillStyle = 'rgba(0,\x20255,\x200,\x20' + _0x3b7c44 + ')', _0x4b9b51.fillRect(_0x11ed67, _0x4c1ea1, _0x3a4ba0, _0x47d8ca));
  }
  const _0x2d1358 = '01';
  for (let _0x3db664 = 0; _0x3db664 < 8; _0x3db664++) {
    const _0xcf2174 = _0xed9bb0 - _0x165fd1 / 2 + Math.random() * _0x165fd1, _0x22de0a = _0x280480 + 40, _0x8cf361 = 10 + Math.floor(Math.random() * 20), _0x1506b7 = 2 + Math.random() * 3;
    (_0x4b9b51.font = "12px \"Courier New\", monospace", _0x4b9b51.fillStyle = '#00FF00');
    for (let _0x173b78 = 0; _0x173b78 < _0x8cf361; _0x173b78++) {
      const _0x333fd1 = _0x2d1358[Math.floor(Math.random() * _0x2d1358.length)], _0x59a81e = 1 - _0x173b78 / _0x8cf361;
      (_0x4b9b51.globalAlpha = _0x59a81e, _0x4b9b51.fillText(_0x333fd1, _0xcf2174, _0x22de0a + _0x173b78 * _0x1506b7));
    }
    _0x4b9b51.globalAlpha = 1;
  }
  _0x4b9b51.restore();
}
function addMatrixEffects(_0x1b5b2a, _0x460402, _0x5b65a7) {
  (_0x1b5b2a.strokeStyle = "rgba(0, 255, 0, 0.1)", _0x1b5b2a.lineWidth = 1);
  for (let _0x5ece35 = 0; _0x5ece35 < _0x5b65a7; _0x5ece35 += 4) {
    (_0x1b5b2a.beginPath(), _0x1b5b2a.moveTo(0, _0x5ece35), _0x1b5b2a.lineTo(_0x460402, _0x5ece35), _0x1b5b2a.stroke());
  }
  for (let _0x23733b = 0; _0x23733b < 200; _0x23733b++) {
    const _0x21ba76 = Math.random() * _0x460402, _0x15a410 = Math.random() * _0x5b65a7, _0x3d984c = Math.random() * 2, _0x2e507c = 0.1 + Math.random() * 0.3;
    (_0x1b5b2a.fillStyle = 'rgba(0,\x20255,\x200,\x20' + _0x2e507c + ')', _0x1b5b2a.fillRect(_0x21ba76, _0x15a410, _0x3d984c, _0x3d984c));
  }
  for (let _0x2dca56 = 0; _0x2dca56 < 5; _0x2dca56++) {
    const _0x1749ff = Math.random() * _0x460402, _0x11e314 = Math.random() * _0x5b65a7, _0x8b112a = 50 + Math.random() * 100, _0xf4644a = 2 + Math.random() * 5, _0x570970 = 0.05 + Math.random() * 0.1;
    (_0x1b5b2a.fillStyle = "rgba(255, 255, 255, " + _0x570970 + ')', _0x1b5b2a.fillRect(_0x1749ff, _0x11e314, _0x8b112a, _0xf4644a));
  }
}
function addBinaryBackground(_0x4ce698, _0xcc9e96, _0x30802d) {
  (_0x4ce698.save(), _0x4ce698.globalAlpha = 0.1, _0x4ce698.font = "10px \"Courier New\", monospace", _0x4ce698.fillStyle = "#00FF00");
  const _0x58f6c0 = '01', _0x242dc9 = Math.floor(_0xcc9e96 / 15), _0x4bbc8e = Math.floor(_0x30802d / 15);
  for (let _0x485d67 = 0; _0x485d67 < _0x242dc9; _0x485d67++) {
    for (let _0xe55e13 = 0; _0xe55e13 < _0x4bbc8e; _0xe55e13++) {
      if (Math.random() > 0.7) {
        const _0x38ce19 = _0x58f6c0[Math.floor(Math.random() * _0x58f6c0.length)];
        _0x4ce698.fillText(_0x38ce19, _0x485d67 * 15, _0xe55e13 * 15);
      }
    }
  }
  _0x4ce698.restore();
}
async function generateSimpleMatrixLogo(_0x4c2e8d) {
  const _0x188533 = 600, _0x1e4e16 = 300, _0x3e4848 = createCanvas(_0x188533, _0x1e4e16), _0x11ee6c = _0x3e4848.getContext('2d');
  (_0x11ee6c.fillStyle = "#000000", _0x11ee6c.fillRect(0, 0, _0x188533, _0x1e4e16));
  for (let _0xb9de14 = 0; _0xb9de14 < 50; _0xb9de14++) {
    const _0x5e6177 = Math.random() * _0x188533, _0x54fe2f = Math.random() * _0x1e4e16, _0xbb7cfa = 0.1 + Math.random() * 0.3;
    (_0x11ee6c.fillStyle = "rgba(0, 255, 0, " + _0xbb7cfa + ')', _0x11ee6c.font = '12px\x20\x22Courier\x20New\x22,\x20monospace', _0x11ee6c.fillText(Math.random() > 0.5 ? '0' : '1', _0x5e6177, _0x54fe2f));
  }
  (_0x11ee6c.fillStyle = "#00FF00", _0x11ee6c.font = "bold 60px \"Courier New\", monospace", _0x11ee6c.textAlign = "center", _0x11ee6c.textBaseline = "middle", _0x11ee6c.shadowColor = "#00FF00", _0x11ee6c.shadowBlur = 15, _0x11ee6c.fillText(_0x4c2e8d.toUpperCase(), _0x188533 / 2, _0x1e4e16 / 2), _0x11ee6c.strokeStyle = 'rgba(0,\x20255,\x200,\x200.1)', _0x11ee6c.lineWidth = 1);
  for (let _0x8ca3a3 = 0; _0x8ca3a3 < _0x1e4e16; _0x8ca3a3 += 3) {
    (_0x11ee6c.beginPath(), _0x11ee6c.moveTo(0, _0x8ca3a3), _0x11ee6c.lineTo(_0x188533, _0x8ca3a3), _0x11ee6c.stroke());
  }
  return _0x3e4848.toBuffer("image/png");
}
