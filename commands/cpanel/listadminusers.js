import {CPANEL} from '../../lib/emojis.js';
import {createRequire} from 'module';
import {listUsers, isConfigured} from '../../lib/cpanel.js';
import {getBotName} from '../../lib/botname.js';
const require = createRequire(import.meta.url);
let giftedBtns;
try {
  giftedBtns = await import("wolfbtns");
} catch {}
export default {
  name: "listadminusers",
  alias: ["paneladmins", "getadmins", "adminusers"],
  category: 'cpanel',
  desc: "List all panel admin users",
  ownerOnly: true,
  async execute(_0x334e67, _0x3b5d87, _0x97a1a4, _0x35d07b, _0x2cc25f) {
    const _0x636ca3 = _0x3b5d87.key.remoteJid;
    if (!_0x2cc25f?.jidManager?.isOwner(_0x3b5d87) && !_0x2cc25f?.isSudo?.()) return _0x334e67.sendMessage(_0x636ca3, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x3b5d87
    });
    if (!isConfigured()) return _0x334e67.sendMessage(_0x636ca3, {
      text: CPANEL.U274C + '\x20Not\x20configured.\x20Run\x20' + _0x35d07b + "setkey and " + _0x35d07b + 'setlink\x20first.'
    }, {
      quoted: _0x3b5d87
    });
    await _0x334e67.sendMessage(_0x636ca3, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x3b5d87.key
      }
    });
    try {
      const _0x34ad1b = await listUsers(), _0x185b9d = _0x34ad1b.filter(_0x11b93f => _0x11b93f.attributes.root_admin).sort((_0x137365, _0x581927) => _0x137365.attributes.id - _0x581927.attributes.id);
      await _0x334e67.sendMessage(_0x636ca3, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x3b5d87.key
        }
      });
      if (!_0x185b9d.length) return _0x334e67.sendMessage(_0x636ca3, {
        text: CPANEL.U1F4ED + " No admin users found on the panel."
      }, {
        quoted: _0x3b5d87
      });
      const _0x430166 = _0x185b9d[0].attributes.id, _0x3c7983 = _0x185b9d.map((_0x52de60, _0x4bda9a) => {
        const _0x2e79d3 = _0x52de60.attributes, _0x119ef2 = _0x2e79d3.id === _0x430166 ? '\x20' + CPANEL.U1F451 + '\x20*Main*' : '';
        return _0x4bda9a + 1 + '.\x20*' + _0x2e79d3.username + "* (ID: " + _0x2e79d3.id + ')' + _0x119ef2 + "\n   " + CPANEL.U1F4E7 + '\x20' + _0x2e79d3.email;
      }), _0x426a3d = getBotName(), _0x548767 = '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F451 + '\x20*PANEL\x20ADMINS\x20(' + _0x185b9d.length + ")* " + CPANEL.U230B + '\x0a' + (CPANEL.U2502 + '\x0a') + (_0x3c7983.map(_0x1d464b => '┆ ✦ \x20' + _0x1d464b).join('\x0a${CPANEL.U2502}\x0a') + '\x0a') + (CPANEL.U2502 + '\x0a') + (CPANEL.U2570 + "⊷ *Powered by " + _0x426a3d + '*');
      if (giftedBtns?.sendInteractiveMessage) try {
        await giftedBtns.sendInteractiveMessage(_0x334e67, _0x636ca3, {
          text: _0x548767,
          footer: CPANEL.U1F43A + '\x20' + _0x426a3d,
          interactiveButtons: [{
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "${CPANEL.U2B07_FE0F} DemoteAdminUsers",
              id: _0x35d07b + "demoteadminusers"
            })
          }]
        });
        return;
      } catch {}
      await _0x334e67.sendMessage(_0x636ca3, {
        text: _0x548767 + '\x0a\x0a' + CPANEL.U2B07_FE0F + " *Demote all* → " + _0x35d07b + "demoteadminusers"
      }, {
        quoted: _0x3b5d87
      });
    } catch (_0x354e55) {
      (await _0x334e67.sendMessage(_0x636ca3, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x3b5d87.key
        }
      }), await _0x334e67.sendMessage(_0x636ca3, {
        text: CPANEL.U274C + '\x20' + _0x354e55.message
      }, {
        quoted: _0x3b5d87
      }));
    }
  }
};
