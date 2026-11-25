import {CPANEL} from '../../lib/emojis.js';
import {loadConfig, saveConfig} from '../../lib/cpanel.js';
import {getOwnerName} from '../../lib/menuHelper.js';
export default {
  name: "setlink",
  alias: ['panellink', "cpanelurl", "pterolink"],
  category: "cpanel",
  description: "Set the Pterodactyl panel URL",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x3f0525, _0x13349b, _0x4f90dd, _0x1e9c99, _0x11a00d) {
    const _0x1ec567 = _0x13349b.key.remoteJid, _0x21f16a = getOwnerName().toUpperCase(), {jidManager: _0x58aae0} = _0x11a00d;
    if (!_0x58aae0.isOwner(_0x13349b) && !_0x11a00d?.isSudo?.()) return _0x3f0525.sendMessage(_0x1ec567, {
      text: CPANEL.U274C + '\x20Owner\x20only.'
    }, {
      quoted: _0x13349b
    });
    const _0x1db51d = loadConfig();
    if (!_0x4f90dd[0]) {
      const _0x4c4ef5 = _0x1db51d.panelUrl || CPANEL.U274C + " Not set";
      return _0x3f0525.sendMessage(_0x1ec567, {
        text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F517 + " *SET PANEL LINK* " + CPANEL.U230B + '\x0a' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x1e9c99 + "setlink <url>*\n" + CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ e.g. `" + _0x1e9c99 + "setlink https://panel.myhost.com`\n" + CPANEL.U251C + CPANEL.U2500 + "⊷ *Current:* " + _0x4c4ef5 + '\x0a' + CPANEL.U2570 + '⊷\x20' + getFooter(_0x13349b.key.participant || _0x13349b.key.remoteJid)
      }, {
        quoted: _0x13349b
      });
    }
    let _0x372bcb = _0x4f90dd[0].trim();
    if (!(/^https?:\/\//i).test(_0x372bcb)) _0x372bcb = 'https://' + _0x372bcb;
    (_0x372bcb = _0x372bcb.replace(/\/+$/, ''), _0x1db51d.panelUrl = _0x372bcb, saveConfig(_0x1db51d), await _0x3f0525.sendMessage(_0x1ec567, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x13349b.key
      }
    }), await _0x3f0525.sendMessage(_0x1ec567, {
      text: CPANEL.U2705 + " *Panel URL saved* — " + _0x372bcb + "\n\n_Next: `" + _0x1e9c99 + "nestconfig` to set egg & location._"
    }, {
      quoted: _0x13349b
    }));
  }
};
