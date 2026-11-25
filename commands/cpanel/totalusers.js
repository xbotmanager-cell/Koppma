import {CPANEL} from '../../lib/emojis.js';
import {listUsers, isConfigured} from '../../lib/cpanel.js';
export default {
  name: "totalusers",
  alias: ['userscount', "countusers"],
  category: "cpanel",
  desc: "Show total number of panel users",
  ownerOnly: true,
  async execute(_0x516110, _0x543d6c, _0x1ab29f, _0xdc1d9, _0x1ec0d4) {
    const _0x590b0b = _0x543d6c.key.remoteJid;
    if (!_0x1ec0d4?.jidManager?.isOwner(_0x543d6c) && !_0x1ec0d4?.isSudo?.()) return _0x516110.sendMessage(_0x590b0b, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x543d6c
    });
    if (!isConfigured()) return _0x516110.sendMessage(_0x590b0b, {
      text: CPANEL.U274C + " Not configured. Run " + _0xdc1d9 + 'setkey\x20and\x20' + _0xdc1d9 + "setlink first."
    }, {
      quoted: _0x543d6c
    });
    await _0x516110.sendMessage(_0x590b0b, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x543d6c.key
      }
    });
    try {
      const _0x3f7590 = await listUsers();
      (await _0x516110.sendMessage(_0x590b0b, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x543d6c.key
        }
      }), await _0x516110.sendMessage(_0x590b0b, {
        text: CPANEL.U1F465 + '\x20*Total\x20Users:\x20' + _0x3f7590.length + '*'
      }, {
        quoted: _0x543d6c
      }));
    } catch (_0x360a55) {
      (await _0x516110.sendMessage(_0x590b0b, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x543d6c.key
        }
      }), await _0x516110.sendMessage(_0x590b0b, {
        text: CPANEL.U274C + '\x20' + _0x360a55.message
      }, {
        quoted: _0x543d6c
      }));
    }
  }
};
