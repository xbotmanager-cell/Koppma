import {CPANEL} from '../../lib/emojis.js';
import {deleteServer, isConfigured} from '../../lib/cpanel.js';
export default {
  name: "deletepanel",
  alias: ['deleteserver', "removepanel", "removeserver"],
  category: "cpanel",
  desc: "Delete a panel server by ID",
  ownerOnly: true,
  async execute(_0x17fd60, _0x58ed96, _0x717fa8, _0x587afc, _0x39018e) {
    const _0x61751f = _0x58ed96.key.remoteJid;
    if (!_0x39018e?.jidManager?.isOwner(_0x58ed96) && !_0x39018e?.isSudo?.()) return _0x17fd60.sendMessage(_0x61751f, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x58ed96
    });
    const _0x1b48d9 = _0x717fa8[0]?.trim();
    if (!_0x1b48d9 || isNaN(_0x1b48d9)) return _0x17fd60.sendMessage(_0x61751f, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F5A5_FE0F + " *DELETE PANEL* " + CPANEL.U230B + '\x0a' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x587afc + "deletepanel <server-id>*\n" + CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Get the ID from " + _0x587afc + 'listpanels\x0a' + CPANEL.U2570 + CPANEL.U2500 + '⊷'
    }, {
      quoted: _0x58ed96
    });
    if (!isConfigured()) return _0x17fd60.sendMessage(_0x61751f, {
      text: CPANEL.U274C + '\x20Not\x20configured.\x20Run\x20' + _0x587afc + "setkey and " + _0x587afc + "setlink first."
    }, {
      quoted: _0x58ed96
    });
    await _0x17fd60.sendMessage(_0x61751f, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x58ed96.key
      }
    });
    try {
      (await deleteServer(Number(_0x1b48d9)), await _0x17fd60.sendMessage(_0x61751f, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x58ed96.key
        }
      }), await _0x17fd60.sendMessage(_0x61751f, {
        text: CPANEL.U2705 + " *Server " + _0x1b48d9 + " deleted successfully.*"
      }, {
        quoted: _0x58ed96
      }));
    } catch (_0x5680f4) {
      (await _0x17fd60.sendMessage(_0x61751f, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x58ed96.key
        }
      }), await _0x17fd60.sendMessage(_0x61751f, {
        text: CPANEL.U274C + '\x20' + _0x5680f4.message
      }, {
        quoted: _0x58ed96
      }));
    }
  }
};
