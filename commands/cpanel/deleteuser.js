import {CPANEL} from '../../lib/emojis.js';
import {getUserByEmail, getServersByUserId, deleteServer, deleteUser, isConfigured} from '../../lib/cpanel.js';
export default {
  name: 'deleteuser',
  alias: ["removepaneluser", "removepanel"],
  category: "cpanel",
  desc: "Delete a panel user and all their servers",
  ownerOnly: true,
  async execute(_0x2cd41c, _0x5678cd, _0x4164f6, _0x2efc12, _0xd9c164) {
    const _0x48cebc = _0x5678cd.key.remoteJid;
    if (!_0xd9c164?.jidManager?.isOwner(_0x5678cd) && !_0xd9c164?.isSudo?.()) return _0x2cd41c.sendMessage(_0x48cebc, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x5678cd
    });
    const _0x23a17c = _0x4164f6[0]?.trim();
    if (!_0x23a17c || !_0x23a17c.includes('@')) return _0x2cd41c.sendMessage(_0x48cebc, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F5D1_FE0F + " *DELETE USER* " + CPANEL.U230B + '\x0a' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x2efc12 + "deleteuser <email>*\n" + CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Deletes the user and all their servers\n" + CPANEL.U2570 + CPANEL.U2500 + '⊷'
    }, {
      quoted: _0x5678cd
    });
    if (!isConfigured()) return _0x2cd41c.sendMessage(_0x48cebc, {
      text: CPANEL.U274C + " Not configured. Run " + _0x2efc12 + 'setkey\x20and\x20' + _0x2efc12 + "setlink first."
    }, {
      quoted: _0x5678cd
    });
    await _0x2cd41c.sendMessage(_0x48cebc, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x5678cd.key
      }
    });
    try {
      const _0x353df0 = await getUserByEmail(_0x23a17c);
      if (!_0x353df0) return (await _0x2cd41c.sendMessage(_0x48cebc, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x5678cd.key
        }
      }), _0x2cd41c.sendMessage(_0x48cebc, {
        text: CPANEL.U274C + '\x20No\x20user\x20found\x20with\x20email\x20*' + _0x23a17c + '*'
      }, {
        quoted: _0x5678cd
      }));
      const _0x2e5b58 = _0x353df0.attributes.id, _0x4e589c = _0x353df0.attributes.username, _0x15938b = await getServersByUserId(_0x2e5b58);
      let _0xc1b0a = 0;
      for (const _0x530cf8 of _0x15938b) {
        try {
          (await deleteServer(_0x530cf8.attributes.id), _0xc1b0a++);
        } catch {}
      }
      (await deleteUser(_0x2e5b58), await _0x2cd41c.sendMessage(_0x48cebc, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x5678cd.key
        }
      }), await _0x2cd41c.sendMessage(_0x48cebc, {
        text: CPANEL.U2705 + " *User Deleted*\n\n" + CPANEL.U1F464 + '\x20' + _0x4e589c + '\x20(' + _0x23a17c + ')\x0a' + CPANEL.U1F5A5_FE0F + '\x20Servers\x20removed:\x20' + _0xc1b0a
      }, {
        quoted: _0x5678cd
      }));
    } catch (_0x2f253c) {
      (await _0x2cd41c.sendMessage(_0x48cebc, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x5678cd.key
        }
      }), await _0x2cd41c.sendMessage(_0x48cebc, {
        text: CPANEL.U274C + '\x20' + _0x2f253c.message
      }, {
        quoted: _0x5678cd
      }));
    }
  }
};
