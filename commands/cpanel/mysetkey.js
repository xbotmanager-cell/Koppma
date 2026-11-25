import {CPANEL} from '../../lib/emojis.js';
import {createRequire} from 'module';
import {loadConfig, isConfigured} from '../../lib/cpanel.js';
import {getBotName} from '../../lib/botname.js';
const require = createRequire(import.meta.url);
let giftedBtns;
try {
  giftedBtns = await import("wolfbtns");
} catch {}
export default {
  name: "mysetkey",
  alias: ['showkey', "mykey", "getkey", "cpanelkey"],
  category: 'cpanel',
  desc: "Show the configured Pterodactyl API key with a copy button",
  ownerOnly: true,
  async execute(_0x472221, _0x5a0dc7, _0x4417ab, _0x1b52bb, _0x34ba40) {
    const _0x35a79f = _0x5a0dc7.key.remoteJid;
    if (!_0x34ba40?.jidManager?.isOwner(_0x5a0dc7) && !_0x34ba40?.isSudo?.()) return _0x472221.sendMessage(_0x35a79f, {
      text: CPANEL.U274C + '\x20Owner\x20only.'
    }, {
      quoted: _0x5a0dc7
    });
    if (!isConfigured()) return _0x472221.sendMessage(_0x35a79f, {
      text: CPANEL.U274C + " No API key set. Run " + _0x1b52bb + "setkey <api-key> first."
    }, {
      quoted: _0x5a0dc7
    });
    const {apiKey: _0x10b71b, panelUrl: _0x457e25} = loadConfig(), _0x34bd3e = getBotName(), _0x54934d = '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F511 + " *PTERODACTYL API KEY* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ Key   : " + _0x10b71b + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ Panel : " + (_0x457e25 || '—') + '\x0a') + (CPANEL.U2570 + "⊷ *Powered by " + _0x34bd3e + '*');
    if (giftedBtns?.sendInteractiveMessage) try {
      await giftedBtns.sendInteractiveMessage(_0x472221, _0x35a79f, {
        text: _0x54934d,
        footer: CPANEL.U1F43A + '\x20' + _0x34bd3e,
        interactiveButtons: [{
          name: 'cta_copy',
          buttonParamsJson: JSON.stringify({
            display_text: CPANEL.U1F4CB + " Copy API Key",
            copy_code: _0x10b71b
          })
        }]
      });
      return;
    } catch {}
    await _0x472221.sendMessage(_0x35a79f, {
      text: _0x54934d
    }, {
      quoted: _0x5a0dc7
    });
  }
};
