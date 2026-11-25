import {CPANEL} from '../../lib/emojis.js';
import {getUserByEmail, getUserByUsername, createServer, isConfigured} from '../../lib/cpanel.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {getBotName} from '../../lib/botname.js';
export default {
  name: "createunlimited",
  alias: ["createunli", "unlimitedpanel", "unlipanel"],
  category: "cpanel",
  description: 'Create\x20an\x20unlimited\x20Pterodactyl\x20server\x20(no\x20CPU/RAM/disk\x20cap)',
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x199cd7, _0x12018d, _0x520a0c, _0x50bc8e, _0x3817ec) {
    const _0x4cde43 = _0x12018d.key.remoteJid, _0x4f0070 = getOwnerName().toUpperCase(), _0x3e06ec = getBotName(), {jidManager: _0x11577c} = _0x3817ec;
    if (!_0x11577c.isOwner(_0x12018d) && !_0x3817ec?.isSudo?.()) return _0x199cd7.sendMessage(_0x4cde43, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x12018d
    });
    const _0x2672ea = _0x520a0c[0]?.trim();
    if (!_0x2672ea) return _0x199cd7.sendMessage(_0x4cde43, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U267E_FE0F + " *CREATE UNLIMITED SERVER* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x50bc8e + "createunlimited <email or username>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Creates an unlimited server (no resource caps)\n") + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20*' + _0x50bc8e + "createunlimited <email> <server name>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Custom server name\n") + (CPANEL.U2570 + '⊷\x20' + getFooter(_0x12018d.key.participant || _0x12018d.key.remoteJid))
    }, {
      quoted: _0x12018d
    });
    if (!isConfigured()) return _0x199cd7.sendMessage(_0x4cde43, {
      text: CPANEL.U274C + " Not configured.\n\nRun `" + _0x50bc8e + "setkey`, `" + _0x50bc8e + "setlink`, and `" + _0x50bc8e + "nestconfig` first."
    }, {
      quoted: _0x12018d
    });
    await _0x199cd7.sendMessage(_0x4cde43, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x12018d.key
      }
    });
    let _0x40e8fc;
    try {
      _0x40e8fc = _0x2672ea.includes('@') ? await getUserByEmail(_0x2672ea) : await getUserByUsername(_0x2672ea);
    } catch (_0x4342ca) {
      return (await _0x199cd7.sendMessage(_0x4cde43, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x12018d.key
        }
      }), _0x199cd7.sendMessage(_0x4cde43, {
        text: CPANEL.U274C + '\x20' + _0x4342ca.message
      }, {
        quoted: _0x12018d
      }));
    }
    if (!_0x40e8fc) return (await _0x199cd7.sendMessage(_0x4cde43, {
      react: {
        text: '' + CPANEL.U274C,
        key: _0x12018d.key
      }
    }), _0x199cd7.sendMessage(_0x4cde43, {
      text: CPANEL.U274C + " User *" + _0x2672ea + "* not found.\n\nCreate them first with `" + _0x50bc8e + "createuser`"
    }, {
      quoted: _0x12018d
    }));
    const _0x409e6f = _0x40e8fc.attributes.id, _0x4a0297 = _0x40e8fc.attributes.username, _0x453406 = _0x40e8fc.attributes.email, _0x10d186 = _0x520a0c.slice(1).join('\x20').trim() || null, _0x29507b = _0x10d186 || _0x4a0297 + '\x27s\x20Server';
    let _0x1f0fce;
    try {
      _0x1f0fce = await createServer(_0x409e6f, _0x29507b, {
        cpu: 0,
        memory: 0,
        disk: 0
      });
    } catch (_0x499977) {
      return (await _0x199cd7.sendMessage(_0x4cde43, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x12018d.key
        }
      }), _0x199cd7.sendMessage(_0x4cde43, {
        text: CPANEL.U274C + '\x20' + _0x499977.message
      }, {
        quoted: _0x12018d
      }));
    }
    const _0x34b908 = _0x1f0fce?.attributes?.id, _0x15e1e0 = _0x1f0fce?.attributes?.identifier, _0x25fa84 = _0x1f0fce?.attributes?.allocation?.default ?? '—';
    (await _0x199cd7.sendMessage(_0x4cde43, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x12018d.key
      }
    }), await _0x199cd7.sendMessage(_0x4cde43, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U2705 + " *UNLIMITED SERVER CREATED* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F5A5_FE0F + '\x20Server\x20\x20:\x20' + _0x29507b + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F464 + '\x20Owner\x20\x20\x20:\x20' + _0x4a0297 + '\x20(' + _0x453406 + ')\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F194 + " ID      : " + (_0x34b908 ?? '—') + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F511 + " Short   : " + (_0x15e1e0 ?? '—') + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F310 + " Port    : " + _0x25fa84 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U267E_FE0F + " Limits  : Unlimited (CPU / RAM / Disk)\n") + (CPANEL.U2570 + '⊷\x20*Powered\x20by\x20' + _0x3e06ec + '*')
    }, {
      quoted: _0x12018d
    }));
  }
};
