import {CPANEL} from '../../lib/emojis.js';
import {listServers, isConfigured} from '../../lib/cpanel.js';
export default {
  name: 'totalpanels',
  alias: ["serverscount", "countpanels", "totalservers"],
  category: 'cpanel',
  desc: "Show total number of panel servers",
  ownerOnly: true,
  async execute(_0x4bea02, _0x38095f, _0x20286e, _0x5bca05, _0x1930e2) {
    const _0x52e4cc = _0x38095f.key.remoteJid;
    if (!_0x1930e2?.jidManager?.isOwner(_0x38095f) && !_0x1930e2?.isSudo?.()) return _0x4bea02.sendMessage(_0x52e4cc, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x38095f
    });
    if (!isConfigured()) return _0x4bea02.sendMessage(_0x52e4cc, {
      text: CPANEL.U274C + " Not configured. Run " + _0x5bca05 + "setkey and " + _0x5bca05 + "setlink first."
    }, {
      quoted: _0x38095f
    });
    await _0x4bea02.sendMessage(_0x52e4cc, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x38095f.key
      }
    });
    try {
      const _0xb39fa2 = await listServers();
      (await _0x4bea02.sendMessage(_0x52e4cc, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x38095f.key
        }
      }), await _0x4bea02.sendMessage(_0x52e4cc, {
        text: CPANEL.U1F5A5_FE0F + " *Total Panels: " + _0xb39fa2.length + '*'
      }, {
        quoted: _0x38095f
      }));
    } catch (_0x26c61a) {
      (await _0x4bea02.sendMessage(_0x52e4cc, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x38095f.key
        }
      }), await _0x4bea02.sendMessage(_0x52e4cc, {
        text: CPANEL.U274C + '\x20' + _0x26c61a.message
      }, {
        quoted: _0x38095f
      }));
    }
  }
};
