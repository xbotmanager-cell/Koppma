import {CPANEL} from '../../lib/emojis.js';
import {createRequire} from 'module';
import {getBotName} from '../../lib/botname.js';
import {getOwnerName, buildMenuHeader, getFooter} from '../../lib/menuHelper.js';
const require = createRequire(import.meta.url);
let giftedBtns;
try {
  giftedBtns = await import('wolfbtns');
} catch {}
export default {
  name: "cpanelmenu",
  alias: ["panelmenu", "ptero", 'pteromenu'],
  description: "Shows all Pterodactyl panel commands",
  category: 'cpanel',
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x27250d, _0x4efc2e, _0xdc5ac6, _0x24afe1) {
    const _0x5decb5 = _0x4efc2e.key.remoteJid, _0x46e91b = getBotName(), _0x223be4 = getOwnerName().toUpperCase(), _0x517e8a = buildMenuHeader(CPANEL.U1F5A5_FE0F + '\x20CPANEL\x20MENU', _0x24afe1), _0x48c06d = _0x517e8a + '\x0a\x0a' + ('' + CPANEL.U256D + CPANEL.U2500 + "⊷ *" + CPANEL.U2699_FE0F + '\x20SETUP*\x0a' + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + "setlink\n" + CPANEL.U2502 + "  • " + _0x24afe1 + "setkey\n" + CPANEL.U2502 + "  • " + _0x24afe1 + 'mysetkey\x0a' + CPANEL.U2570 + CPANEL.U2500 + "⊷\n\n") + ('' + CPANEL.U256D + CPANEL.U2500 + "⊷ *" + CPANEL.U1F3D7_FE0F + " NEST CONFIG*\n" + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + "nestconfig\n" + CPANEL.U2570 + CPANEL.U2500 + "⊷\n\n") + ('' + CPANEL.U256D + CPANEL.U2500 + "⊷ *" + CPANEL.U1F464 + " USERS*\n" + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + 'createuser\x0a' + CPANEL.U2502 + "  • " + _0x24afe1 + "deleteuser\n" + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + "makeadmin\n" + CPANEL.U2502 + "  • " + _0x24afe1 + "listusers\n" + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + "totalusers\n" + CPANEL.U2502 + "  • " + _0x24afe1 + "listadminusers\n" + CPANEL.U2502 + "  • " + _0x24afe1 + "demoteadminusers\n" + CPANEL.U2502 + "  • " + _0x24afe1 + "deleteallusers\n" + CPANEL.U2570 + CPANEL.U2500 + '⊷\x0a\x0a') + ('' + CPANEL.U256D + CPANEL.U2500 + '⊷\x20*' + CPANEL.U1F5A5_FE0F + '\x20SERVERS*\x0a' + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + "createpanel\n" + CPANEL.U2502 + "  • " + _0x24afe1 + 'createunlimited\x0a' + CPANEL.U2502 + "  • " + _0x24afe1 + "deletepanel\n" + CPANEL.U2502 + "  • " + _0x24afe1 + "listpanels\n" + CPANEL.U2502 + "  • " + _0x24afe1 + "totalpanels\n" + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + "deleteall\n" + CPANEL.U2570 + CPANEL.U2500 + "⊷\n\n") + ('' + CPANEL.U256D + CPANEL.U2500 + "⊷ *" + CPANEL.U1F4B3 + " PAYSTACK*\n" + CPANEL.U2502 + "  • " + _0x24afe1 + 'setpaystackkey\x0a' + CPANEL.U2502 + "  • " + _0x24afe1 + 'setpayment\x20(unli/lim/admin)\x0a' + CPANEL.U2502 + '\x20\x20•\x20' + _0x24afe1 + 'prompt\x0a' + CPANEL.U2570 + CPANEL.U2500 + '⊷'), _0x2bd051 = [{
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: CPANEL.U1F4D8 + " Cpanel Guide",
        id: _0x24afe1 + "cpanelguide"
      })
    }, {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: CPANEL.U1F3E0 + " Main Menu",
        id: _0x24afe1 + "menu"
      })
    }];
    if (giftedBtns?.sendInteractiveMessage) try {
      await giftedBtns.sendInteractiveMessage(_0x27250d, _0x5decb5, {
        text: _0x48c06d,
        footer: CPANEL.U1F43A + '\x20' + _0x46e91b,
        interactiveButtons: _0x2bd051
      });
      return;
    } catch {}
    await _0x27250d.sendMessage(_0x5decb5, {
      text: _0x48c06d + '\x0a\x0a' + CPANEL.U1F4D8 + '\x20*Cpanel\x20Guide*\x20→\x20' + _0x24afe1 + "cpanelguide\n\n" + getFooter(_0x4efc2e.key.participant || _0x4efc2e.key.remoteJid)
    }, {
      quoted: _0x4efc2e
    });
  }
};
