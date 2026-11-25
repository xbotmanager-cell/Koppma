import {CPANEL} from '../../lib/emojis.js';
import {getUserByEmail, getUserByUsername, createServer, isConfigured, loadConfig} from '../../lib/cpanel.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {getBotName} from '../../lib/botname.js';
export default {
  name: "createpanel",
  alias: ["newpanel", "addpanel", "cpanelcreate"],
  category: "cpanel",
  description: "Create a limited Pterodactyl server for an existing panel user",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x46cb12, _0x1c0c30, _0x4e1c14, _0x3b4d8a, _0x49f835) {
    const _0x428906 = _0x1c0c30.key.remoteJid, _0x3f3c15 = getOwnerName().toUpperCase(), _0x1617e8 = getBotName(), {jidManager: _0x3ca566} = _0x49f835;
    if (!_0x3ca566.isOwner(_0x1c0c30) && !_0x49f835?.isSudo?.()) return _0x46cb12.sendMessage(_0x428906, {
      text: CPANEL.U274C + '\x20Owner\x20only.'
    }, {
      quoted: _0x1c0c30
    });
    const _0x2aa5ee = _0x4e1c14[0]?.trim();
    if (!_0x2aa5ee) return _0x46cb12.sendMessage(_0x428906, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F5A5_FE0F + " *CREATE PANEL* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x3b4d8a + "createpanel <email or username>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Creates a limited server using nestconfig limits\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x3b4d8a + 'createpanel\x20<email>\x20<server\x20name>*\x0a') + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Custom server name\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ For unlimited resources use *" + _0x3b4d8a + "createunlimited*\n") + (CPANEL.U2570 + '⊷\x20' + getFooter(_0x1c0c30.key.participant || _0x1c0c30.key.remoteJid))
    }, {
      quoted: _0x1c0c30
    });
    if (!isConfigured()) return _0x46cb12.sendMessage(_0x428906, {
      text: CPANEL.U274C + " Not configured.\n\nRun `" + _0x3b4d8a + "setkey`, `" + _0x3b4d8a + "setlink`, and `" + _0x3b4d8a + "nestconfig` first."
    }, {
      quoted: _0x1c0c30
    });
    await _0x46cb12.sendMessage(_0x428906, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x1c0c30.key
      }
    });
    let _0x3aa4e4;
    try {
      _0x3aa4e4 = _0x2aa5ee.includes('@') ? await getUserByEmail(_0x2aa5ee) : await getUserByUsername(_0x2aa5ee);
    } catch (_0x2d1165) {
      return (await _0x46cb12.sendMessage(_0x428906, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x1c0c30.key
        }
      }), _0x46cb12.sendMessage(_0x428906, {
        text: CPANEL.U274C + '\x20' + _0x2d1165.message
      }, {
        quoted: _0x1c0c30
      }));
    }
    if (!_0x3aa4e4) return (await _0x46cb12.sendMessage(_0x428906, {
      react: {
        text: '' + CPANEL.U274C,
        key: _0x1c0c30.key
      }
    }), _0x46cb12.sendMessage(_0x428906, {
      text: CPANEL.U274C + " User *" + _0x2aa5ee + "* not found.\n\nCreate them first with `" + _0x3b4d8a + "createuser`"
    }, {
      quoted: _0x1c0c30
    }));
    const _0x2ff788 = _0x3aa4e4.attributes.id, _0x31fafc = _0x3aa4e4.attributes.username, _0x389159 = _0x3aa4e4.attributes.email, _0x3b7935 = _0x4e1c14.slice(1).join('\x20').trim() || null, _0x23cd51 = _0x3b7935 || _0x31fafc + "'s Server";
    let _0x906e60;
    try {
      _0x906e60 = await createServer(_0x2ff788, _0x23cd51);
    } catch (_0x57f23f) {
      return (await _0x46cb12.sendMessage(_0x428906, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x1c0c30.key
        }
      }), _0x46cb12.sendMessage(_0x428906, {
        text: CPANEL.U274C + '\x20' + _0x57f23f.message
      }, {
        quoted: _0x1c0c30
      }));
    }
    const _0x25e685 = loadConfig().nest, _0x2b9e74 = _0x906e60?.attributes?.id, _0x40c318 = _0x906e60?.attributes?.identifier, _0x504275 = _0x906e60?.attributes?.allocation?.default ?? '—';
    (await _0x46cb12.sendMessage(_0x428906, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x1c0c30.key
      }
    }), await _0x46cb12.sendMessage(_0x428906, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U2705 + '\x20*PANEL\x20CREATED*\x20' + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F5A5_FE0F + " Server  : " + _0x23cd51 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F464 + '\x20Owner\x20\x20\x20:\x20' + _0x31fafc + '\x20(' + _0x389159 + ')\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F194 + '\x20ID\x20\x20\x20\x20\x20\x20:\x20' + (_0x2b9e74 ?? '—') + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F511 + '\x20Short\x20\x20\x20:\x20' + (_0x40c318 ?? '—') + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F310 + '\x20Port\x20\x20\x20\x20:\x20' + _0x504275 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U26A1 + '\x20CPU\x20\x20\x20\x20\x20:\x20' + _0x25e685.cpu + '%\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F9E0 + '\x20RAM\x20\x20\x20\x20\x20:\x20' + _0x25e685.memory + " MB\n") + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F4BE + " Disk    : " + _0x25e685.disk + " MB\n") + (CPANEL.U2570 + "⊷ *Powered by " + _0x1617e8 + '*')
    }, {
      quoted: _0x1c0c30
    }));
  }
};
