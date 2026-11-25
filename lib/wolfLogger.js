import {AUTOMATION, UI} from './emojis.js';
const LBL = "\u001b[1m\u001b[38;2;255;165;0m", W = "\u001b[38;2;200;215;225m", D = '\x1b[2m\x1b[38;2;120;140;155m';
function _printBox({color: _0x27d017, icon: _0x6e09e5, label: _0x4879da, rows: _0x59cb77}) {
  const _0x5c133e = "\u001b[1m" + _0x27d017, _0x1a7fbd = "\u001b[0m", _0x424c64 = (_0x3addea, _0x1fa6f4) => _0x5c133e + '┆' + _0x1a7fbd + '\x20' + D + '✦' + _0x1a7fbd + '\x20' + LBL + _0x3addea + ':' + _0x1a7fbd + '\x20' + W + _0x1fa6f4 + _0x1a7fbd, _0x51e1ee = ['', _0x5c133e + "╭┄〔 " + _0x6e09e5 + ' ' + _0x4879da + ' 〕┄╮' + _0x1a7fbd];
  for (const {key: _0xfa142d, val: _0x4f9204} of _0x59cb77) {
    _0x4f9204 !== null && _0x4f9204 !== undefined && _0x4f9204 !== '' && _0x51e1ee.push(_0x424c64(_0xfa142d, String(_0x4f9204)));
  }
  (_0x51e1ee.push(_0x5c133e + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x1a7fbd, ''), process.stdout.write(_0x51e1ee.join('\x0a') + '\x0a'));
}
const _BL = '\x1b[38;2;34;193;255m', _ORG = "\u001b[38;2;255;110;0m", _MAG = "\u001b[38;2;180;0;255m";
export const WolfLogger = {
  statusReply(_0x1f5bc7, _0x30dc5b) {
    _printBox({
      color: _BL,
      icon: '' + AUTOMATION.U1F4F2,
      label: "STATUS REPLY",
      rows: [{
        key: "Action",
        val: _0x1f5bc7
      }, ..._0x30dc5b ? [{
        key: "From",
        val: _0x30dc5b
      }] : []]
    });
  },
  antidelete(_0x44d600, _0x57f536, _0x5f2b83) {
    _printBox({
      color: _ORG,
      icon: UI.TRASH + '️',
      label: "ANTIDELETE",
      rows: [{
        key: "Action",
        val: _0x44d600
      }, ..._0x57f536 ? [{
        key: 'Type',
        val: _0x57f536
      }] : [], ..._0x5f2b83 ? [{
        key: 'ID',
        val: String(_0x5f2b83).slice(0, 12) + "..."
      }] : []]
    });
  },
  statusAD(_0x3701fa, _0x5be120, _0x4df4ab) {
    _printBox({
      color: _MAG,
      icon: UI.TRASH + '️',
      label: "STATUS AD",
      rows: [{
        key: "Action",
        val: _0x3701fa
      }, ..._0x5be120 ? [{
        key: "Type",
        val: _0x5be120
      }] : [], ..._0x4df4ab ? [{
        key: 'ID',
        val: String(_0x4df4ab).slice(0, 12) + "..."
      }] : []]
    });
  }
};
export const VipLogger = WolfLogger;
