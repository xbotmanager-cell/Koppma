import {CPANEL} from '../../lib/emojis.js';
import {createUser, usernameFromEmail, generatePassword, isConfigured} from '../../lib/cpanel.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {getBotName} from '../../lib/botname.js';
export default {
  name: "createuser",
  alias: ["addpaneluser", "newpaneluser", 'cpanelcreateuser'],
  category: "cpanel",
  description: "Create a Pterodactyl panel user and get their credentials",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x3a86a2, _0x4885b8, _0x268366, _0x187dae, _0x4489cc) {
    const _0x2fee3a = _0x4885b8.key.remoteJid, _0x231b59 = getOwnerName().toUpperCase(), _0x126331 = getBotName(), {jidManager: _0x4300a7} = _0x4489cc;
    if (!_0x4300a7.isOwner(_0x4885b8) && !_0x4489cc?.isSudo?.()) return _0x3a86a2.sendMessage(_0x2fee3a, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x4885b8
    });
    const _0x550b5b = _0x268366[0]?.trim();
    if (!_0x550b5b || !_0x550b5b.includes('@')) return _0x3a86a2.sendMessage(_0x2fee3a, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F464 + " *CREATE USER* " + CPANEL.U230B + '\x0a' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x187dae + 'createuser\x20<email>*\x0a' + CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Creates a panel user and returns credentials\n" + CPANEL.U2570 + '⊷\x20' + getFooter(_0x4885b8.key.participant || _0x4885b8.key.remoteJid)
    }, {
      quoted: _0x4885b8
    });
    if (!isConfigured()) return _0x3a86a2.sendMessage(_0x2fee3a, {
      text: CPANEL.U274C + '\x20Not\x20configured.\x0a\x0aRun\x20`' + _0x187dae + "setkey` and `" + _0x187dae + 'setlink`\x20first.'
    }, {
      quoted: _0x4885b8
    });
    const _0x41740d = usernameFromEmail(_0x550b5b), _0x246fd3 = generatePassword();
    await _0x3a86a2.sendMessage(_0x2fee3a, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x4885b8.key
      }
    });
    let _0x3ef2ed;
    try {
      const _0x544223 = await createUser(_0x550b5b, _0x41740d, _0x246fd3);
      _0x3ef2ed = _0x544223?.attributes?.id;
    } catch (_0x290296) {
      return (await _0x3a86a2.sendMessage(_0x2fee3a, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x4885b8.key
        }
      }), _0x3a86a2.sendMessage(_0x2fee3a, {
        text: CPANEL.U274C + '\x20' + _0x290296.message
      }, {
        quoted: _0x4885b8
      }));
    }
    const _0x42b293 = '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U2705 + " *USER CREATED* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ Email    : " + _0x550b5b + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ Username : " + _0x41740d + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ Password : " + _0x246fd3 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ User ID  : " + (_0x3ef2ed ?? '—') + '\x0a') + (CPANEL.U2570 + "⊷ *Powered by " + _0x126331 + '*');
    await _0x3a86a2.sendMessage(_0x2fee3a, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x4885b8.key
      }
    });
    const _0x4f2bf0 = globalThis._wolfBtns;
    if (_0x4f2bf0?.sendInteractiveMessage) try {
      await _0x4f2bf0.sendInteractiveMessage(_0x3a86a2, _0x2fee3a, {
        text: _0x42b293,
        footer: CPANEL.U1F43A + '\x20' + _0x126331,
        interactiveButtons: [{
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: CPANEL.U1F4CB + " Copy Username",
            copy_code: _0x41740d
          })
        }, {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: CPANEL.U1F511 + " Copy Password",
            copy_code: _0x246fd3
          })
        }]
      });
      return;
    } catch {}
    await _0x3a86a2.sendMessage(_0x2fee3a, {
      text: _0x42b293
    }, {
      quoted: _0x4885b8
    });
  }
};
