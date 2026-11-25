import {CPANEL} from '../../lib/emojis.js';
import {loadConfig, saveConfig} from '../../lib/cpanel.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "setkey",
  alias: ["cpanelkey", "pterokey"],
  category: 'cpanel',
  description: 'Set\x20the\x20Pterodactyl\x20Application\x20API\x20key',
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x5defaa, _0x305bf1, _0x1a0c94, _0x136aa4, _0x175e14) {
    const _0x3cf7d2 = _0x305bf1.key.remoteJid, _0x4ad67e = getOwnerName().toUpperCase(), {jidManager: _0x350aa5} = _0x175e14;
    if (!_0x350aa5.isOwner(_0x305bf1) && !_0x175e14?.isSudo?.()) return _0x5defaa.sendMessage(_0x3cf7d2, {
      text: CPANEL.U274C + '\x20Owner\x20only.'
    }, {
      quoted: _0x305bf1
    });
    const _0x228fde = loadConfig();
    if (!_0x1a0c94[0]) {
      const _0x19cf7d = _0x228fde.apiKey ? CPANEL.U2705 + '\x20Set\x20(' + _0x228fde.apiKey.slice(0, 6) + '••••••••)' : CPANEL.U274C + " Not set";
      return _0x5defaa.sendMessage(_0x3cf7d2, {
        text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F511 + " *SET API KEY* " + CPANEL.U230B + '\x0a' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x136aa4 + 'setkey\x20<api-key>*\x0a' + CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Save your Pterodactyl Application key\n" + CPANEL.U251C + CPANEL.U2500 + '⊷\x20*Status:*\x20' + _0x19cf7d + '\x0a' + CPANEL.U2570 + '⊷\x20' + getFooter(_0x305bf1.key.participant || _0x305bf1.key.remoteJid)
      }, {
        quoted: _0x305bf1
      });
    }
    const _0x17602a = _0x1a0c94[0].trim();
    if (_0x17602a.length < 16) return (await _0x5defaa.sendMessage(_0x3cf7d2, {
      react: {
        text: '' + CPANEL.U274C,
        key: _0x305bf1.key
      }
    }), _0x5defaa.sendMessage(_0x3cf7d2, {
      text: CPANEL.U274C + '\x20Key\x20too\x20short.\x20Pterodactyl\x20keys\x20are\x20usually\x2048\x20characters.'
    }, {
      quoted: _0x305bf1
    }));
    (_0x228fde.apiKey = _0x17602a, saveConfig(_0x228fde), await _0x5defaa.sendMessage(_0x3cf7d2, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x305bf1.key
      }
    }), await _0x5defaa.sendMessage(_0x3cf7d2, {
      text: CPANEL.U2705 + '\x20*API\x20Key\x20saved*\x20—\x20' + _0x17602a.slice(0, 6) + '••••••••\x0a\x0a_Next:\x20`' + _0x136aa4 + "setlink <panel-url>`_"
    }, {
      quoted: _0x305bf1
    }));
  }
};
