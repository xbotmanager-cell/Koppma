import {CPANEL} from '../../lib/emojis.js';
import {getUserByEmail, getUserByUsername, updateUser, isConfigured} from '../../lib/cpanel.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {getBotName} from '../../lib/botname.js';
export default {
  name: "makeadmin",
  alias: ['setadmin', "panelmakeadmin", 'grantadmin'],
  category: "cpanel",
  description: "Make an existing panel user a root admin",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x50b867, _0x34b74d, _0x5da3fc, _0x1a3299, _0x23b9b9) {
    const _0x2db558 = _0x34b74d.key.remoteJid, _0x120fdf = getOwnerName().toUpperCase(), _0x529acc = getBotName(), {jidManager: _0x32453} = _0x23b9b9;
    if (!_0x32453.isOwner(_0x34b74d) && !_0x23b9b9?.isSudo?.()) return _0x50b867.sendMessage(_0x2db558, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x34b74d
    });
    const _0x12444f = _0x5da3fc[0]?.trim();
    if (!_0x12444f) return _0x50b867.sendMessage(_0x2db558, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F451 + " *MAKE ADMIN* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x1a3299 + 'makeadmin\x20<email\x20or\x20username>*\x0a') + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + '⊷\x20Grants\x20root\x20admin\x20to\x20a\x20panel\x20user\x0a') + (CPANEL.U2570 + '⊷\x20' + getFooter(_0x34b74d.key.participant || _0x34b74d.key.remoteJid))
    }, {
      quoted: _0x34b74d
    });
    if (!isConfigured()) return _0x50b867.sendMessage(_0x2db558, {
      text: CPANEL.U274C + " Not configured.\n\nRun `" + _0x1a3299 + "setkey`, `" + _0x1a3299 + "setlink` first."
    }, {
      quoted: _0x34b74d
    });
    await _0x50b867.sendMessage(_0x2db558, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x34b74d.key
      }
    });
    let _0x5e7af9;
    try {
      _0x5e7af9 = _0x12444f.includes('@') ? await getUserByEmail(_0x12444f) : await getUserByUsername(_0x12444f);
    } catch (_0x50214f) {
      return (await _0x50b867.sendMessage(_0x2db558, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x34b74d.key
        }
      }), _0x50b867.sendMessage(_0x2db558, {
        text: CPANEL.U274C + '\x20' + _0x50214f.message
      }, {
        quoted: _0x34b74d
      }));
    }
    if (!_0x5e7af9) return (await _0x50b867.sendMessage(_0x2db558, {
      react: {
        text: '' + CPANEL.U274C,
        key: _0x34b74d.key
      }
    }), _0x50b867.sendMessage(_0x2db558, {
      text: CPANEL.U274C + '\x20User\x20*' + _0x12444f + "* not found."
    }, {
      quoted: _0x34b74d
    }));
    const _0x395378 = _0x5e7af9.attributes;
    if (_0x395378.root_admin) return (await _0x50b867.sendMessage(_0x2db558, {
      react: {
        text: '' + CPANEL.U26A0_FE0F,
        key: _0x34b74d.key
      }
    }), _0x50b867.sendMessage(_0x2db558, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U26A0_FE0F + " *ALREADY ADMIN* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F464 + " User  : " + _0x395378.username + '\x20(' + _0x395378.email + ')\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F451 + " Role  : Root Admin (already set)\n") + (CPANEL.U2570 + "⊷ *Powered by " + _0x529acc + '*')
    }, {
      quoted: _0x34b74d
    }));
    try {
      await updateUser(_0x395378.id, {
        email: _0x395378.email,
        username: _0x395378.username,
        first_name: _0x395378.first_name,
        last_name: _0x395378.last_name,
        language: _0x395378.language || 'en',
        root_admin: true
      });
    } catch (_0x31bc8e) {
      return (await _0x50b867.sendMessage(_0x2db558, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x34b74d.key
        }
      }), _0x50b867.sendMessage(_0x2db558, {
        text: CPANEL.U274C + '\x20' + _0x31bc8e.message
      }, {
        quoted: _0x34b74d
      }));
    }
    (await _0x50b867.sendMessage(_0x2db558, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x34b74d.key
      }
    }), await _0x50b867.sendMessage(_0x2db558, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U2705 + " *ADMIN GRANTED* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F464 + '\x20User\x20\x20:\x20' + _0x395378.username + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F4E7 + " Email : " + _0x395378.email + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F451 + '\x20Role\x20\x20:\x20Root\x20Admin\x0a') + (CPANEL.U2570 + "⊷ *Powered by " + _0x529acc + '*')
    }, {
      quoted: _0x34b74d
    }));
  }
};
