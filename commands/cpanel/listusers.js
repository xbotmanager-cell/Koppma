import {CPANEL} from '../../lib/emojis.js';
import {listUsers, isConfigured} from '../../lib/cpanel.js';
export default {
  name: "listusers",
  alias: ['panellusers', "getusers"],
  category: 'cpanel',
  desc: "List all panel users",
  ownerOnly: true,
  async execute(_0xc96b82, _0x449143, _0x2074c6, _0x228ec5, _0xed34e1) {
    const _0x14b289 = _0x449143.key.remoteJid;
    if (!_0xed34e1?.jidManager?.isOwner(_0x449143) && !_0xed34e1?.isSudo?.()) return _0xc96b82.sendMessage(_0x14b289, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x449143
    });
    if (!isConfigured()) return _0xc96b82.sendMessage(_0x14b289, {
      text: CPANEL.U274C + " Not configured. Run " + _0x228ec5 + 'setkey\x20and\x20' + _0x228ec5 + 'setlink\x20first.'
    }, {
      quoted: _0x449143
    });
    await _0xc96b82.sendMessage(_0x14b289, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x449143.key
      }
    });
    try {
      const _0x23a81b = await listUsers();
      await _0xc96b82.sendMessage(_0x14b289, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x449143.key
        }
      });
      if (!_0x23a81b.length) return _0xc96b82.sendMessage(_0x14b289, {
        text: CPANEL.U1F4ED + '\x20No\x20users\x20found\x20on\x20the\x20panel.'
      }, {
        quoted: _0x449143
      });
      const _0x37fa97 = _0x23a81b.map((_0x2f2392, _0x35461b) => {
        const _0x148475 = _0x2f2392.attributes;
        return _0x35461b + 1 + ". *" + _0x148475.username + "* (ID: " + _0x148475.id + ")\n   " + CPANEL.U1F4E7 + '\x20' + _0x148475.email;
      });
      await _0xc96b82.sendMessage(_0x14b289, {
        text: CPANEL.U1F465 + '\x20*Panel\x20Users\x20(' + _0x23a81b.length + ")*\n\n" + _0x37fa97.join('\x0a\x0a')
      }, {
        quoted: _0x449143
      });
    } catch (_0x5caedd) {
      (await _0xc96b82.sendMessage(_0x14b289, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x449143.key
        }
      }), await _0xc96b82.sendMessage(_0x14b289, {
        text: CPANEL.U274C + '\x20' + _0x5caedd.message
      }, {
        quoted: _0x449143
      }));
    }
  }
};
