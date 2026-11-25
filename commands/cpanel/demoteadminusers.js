import {CPANEL} from '../../lib/emojis.js';
import {listUsers, updateUser, isConfigured} from '../../lib/cpanel.js';
export default {
  name: "demoteadminusers",
  alias: ["demotealladmins", "removeadmins"],
  category: 'cpanel',
  desc: 'Demote\x20all\x20panel\x20admins\x20except\x20the\x20main\x20admin',
  ownerOnly: true,
  async execute(_0x2c4e18, _0x1b9ba9, _0x201626, _0x1b6a22, _0x3e43e4) {
    const _0x2433ca = _0x1b9ba9.key.remoteJid;
    if (!_0x3e43e4?.jidManager?.isOwner(_0x1b9ba9) && !_0x3e43e4?.isSudo?.()) return _0x2c4e18.sendMessage(_0x2433ca, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x1b9ba9
    });
    if (!isConfigured()) return _0x2c4e18.sendMessage(_0x2433ca, {
      text: CPANEL.U274C + " Not configured. Run " + _0x1b6a22 + 'setkey\x20and\x20' + _0x1b6a22 + "setlink first."
    }, {
      quoted: _0x1b9ba9
    });
    await _0x2c4e18.sendMessage(_0x2433ca, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x1b9ba9.key
      }
    });
    try {
      const _0x4d98d3 = await listUsers(), _0x12336a = _0x4d98d3.filter(_0x48c770 => _0x48c770.attributes.root_admin).sort((_0x5b462c, _0x1c283d) => _0x5b462c.attributes.id - _0x1c283d.attributes.id);
      if (_0x12336a.length <= 1) return (await _0x2c4e18.sendMessage(_0x2433ca, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x1b9ba9.key
        }
      }), _0x2c4e18.sendMessage(_0x2433ca, {
        text: CPANEL.U2705 + '\x20Only\x20the\x20main\x20admin\x20exists.\x20Nothing\x20to\x20demote.'
      }, {
        quoted: _0x1b9ba9
      }));
      const _0x20d6a7 = _0x12336a[0], _0x54186d = _0x12336a.slice(1);
      let _0x4d7fc9 = 0;
      for (const _0x11054f of _0x54186d) {
        const _0x2d22bc = _0x11054f.attributes;
        try {
          (await updateUser(_0x2d22bc.id, {
            email: _0x2d22bc.email,
            username: _0x2d22bc.username,
            first_name: _0x2d22bc.first_name,
            last_name: _0x2d22bc.last_name,
            root_admin: false,
            language: _0x2d22bc.language || 'en'
          }), _0x4d7fc9++, console.log("[demoteall] Demoted " + _0x2d22bc.username + " (ID: " + _0x2d22bc.id + ')'));
        } catch (_0x5548f9) {
          console.log("[demoteall] Failed to demote " + _0x2d22bc.username + ':\x20' + _0x5548f9.message);
        }
      }
      (await _0x2c4e18.sendMessage(_0x2433ca, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x1b9ba9.key
        }
      }), await _0x2c4e18.sendMessage(_0x2433ca, {
        text: CPANEL.U2705 + " *Done*\n\n" + (CPANEL.U2B07_FE0F + " Demoted : " + _0x4d7fc9 + " admin(s)\n") + (CPANEL.U1F451 + " Kept    : " + _0x20d6a7.attributes.username + " (Main Admin)")
      }, {
        quoted: _0x1b9ba9
      }));
    } catch (_0x526b54) {
      (await _0x2c4e18.sendMessage(_0x2433ca, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x1b9ba9.key
        }
      }), await _0x2c4e18.sendMessage(_0x2433ca, {
        text: CPANEL.U274C + '\x20' + _0x526b54.message
      }, {
        quoted: _0x1b9ba9
      }));
    }
  }
};
