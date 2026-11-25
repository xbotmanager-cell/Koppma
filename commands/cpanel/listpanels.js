import {CPANEL} from '../../lib/emojis.js';
import {listServers, isConfigured} from '../../lib/cpanel.js';
export default {
  name: "listpanels",
  alias: ["listservers", "getpanels", "getservers"],
  category: "cpanel",
  desc: 'List\x20all\x20panel\x20servers',
  ownerOnly: true,
  async execute(_0x3a6da0, _0xfcfa25, _0x4e009c, _0x23bc24, _0x4d8f9d) {
    const _0x4d7d5b = _0xfcfa25.key.remoteJid;
    if (!_0x4d8f9d?.jidManager?.isOwner(_0xfcfa25) && !_0x4d8f9d?.isSudo?.()) return _0x3a6da0.sendMessage(_0x4d7d5b, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0xfcfa25
    });
    if (!isConfigured()) return _0x3a6da0.sendMessage(_0x4d7d5b, {
      text: CPANEL.U274C + " Not configured. Run " + _0x23bc24 + 'setkey\x20and\x20' + _0x23bc24 + "setlink first."
    }, {
      quoted: _0xfcfa25
    });
    await _0x3a6da0.sendMessage(_0x4d7d5b, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0xfcfa25.key
      }
    });
    try {
      const _0x2f191d = await listServers();
      await _0x3a6da0.sendMessage(_0x4d7d5b, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0xfcfa25.key
        }
      });
      if (!_0x2f191d.length) return _0x3a6da0.sendMessage(_0x4d7d5b, {
        text: CPANEL.U1F4ED + '\x20No\x20servers\x20found\x20on\x20the\x20panel.'
      }, {
        quoted: _0xfcfa25
      });
      const _0x536e61 = _0x2f191d.map((_0x1c5646, _0x554ba2) => {
        const _0x5b717a = _0x1c5646.attributes;
        return _0x554ba2 + 1 + ". *" + _0x5b717a.name + "* (ID: " + _0x5b717a.id + ")\n   " + CPANEL.U1F464 + " Owner ID: " + _0x5b717a.user;
      });
      await _0x3a6da0.sendMessage(_0x4d7d5b, {
        text: CPANEL.U1F5A5_FE0F + " *Panel Servers (" + _0x2f191d.length + ")*\n\n" + _0x536e61.join('\x0a\x0a')
      }, {
        quoted: _0xfcfa25
      });
    } catch (_0x5b2978) {
      (await _0x3a6da0.sendMessage(_0x4d7d5b, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0xfcfa25.key
        }
      }), await _0x3a6da0.sendMessage(_0x4d7d5b, {
        text: CPANEL.U274C + '\x20' + _0x5b2978.message
      }, {
        quoted: _0xfcfa25
      }));
    }
  }
};
