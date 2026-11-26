import {CPANEL} from '../../lib/emojis.js';
import {createRequire} from 'module';
import {loadPaymentConfig, savePaymentConfig} from '../../lib/paymentConfig.js';
import {getBotName} from '../../lib/botname.js';
const require = createRequire(import.meta.url);
let giftedBtns;
try {
  giftedBtns = await import("wolfbtns");
} catch {}
export default {
  name: 'setpayment',
  alias: ['setprice', "payprice", "priceset"],
  category: 'cpanel',
  description: "Set prices for limited, unlimited and admin plans",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x47803b, _0x41fef8, _0x5868f3, _0x13325d, _0x593697) {
    const _0x39a9b6 = _0x41fef8.key.remoteJid, _0x3caea2 = getBotName();
    if (!_0x593697?.jidManager?.isOwner(_0x41fef8) && !_0x593697?.isSudo?.()) return _0x47803b.sendMessage(_0x39a9b6, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x41fef8
    });
    const _0x4834f5 = loadPaymentConfig();
    if (!_0x5868f3 || !_0x5868f3[0]) {
      const _0x1fb13c = _0x4834f5.unlimitedPrice, _0x13c165 = _0x4834f5.limitedPrice, _0x5b2c94 = _0x4834f5.adminPrice, _0x3d6174 = '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20*' + CPANEL.U1F4B0 + " PAYMENT PRICES* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U267E_FE0F + " *Unlimited* : KES " + (_0x1fb13c > 0 ? _0x1fb13c.toLocaleString() : CPANEL.U274C + " Not set") + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F5A5_FE0F + '\x20*Limited*\x20\x20\x20:\x20KES\x20' + (_0x13c165 > 0 ? _0x13c165.toLocaleString() : CPANEL.U274C + " Not set") + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F451 + " *Admin*     : KES " + (_0x5b2c94 > 0 ? _0x5b2c94.toLocaleString() : CPANEL.U274C + " Not set") + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *Usage:*\n") + (CPANEL.U2502 + "   " + _0x13325d + "setpayment unli <amount>\n") + (CPANEL.U2502 + "   " + _0x13325d + 'setpayment\x20lim\x20<amount>\x0a') + (CPANEL.U2502 + "   " + _0x13325d + "setpayment admin <amount>\n") + (CPANEL.U2570 + "⊷ *Powered by " + _0x3caea2 + '*');
      return _0x47803b.sendMessage(_0x39a9b6, {
        text: _0x3d6174
      }, {
        quoted: _0x41fef8
      });
    }
    const _0x50bf2d = _0x5868f3[0]?.toLowerCase(), _0x24ea71 = Number(_0x5868f3[1]), _0x3f5efd = ["unli", "unlimited", "unlim"].includes(_0x50bf2d), _0x349681 = ["lim", "limited", "limit"].includes(_0x50bf2d), _0x1ba18b = ["admin", "administrator"].includes(_0x50bf2d);
    if (!_0x3f5efd && !_0x349681 && !_0x1ba18b) return _0x47803b.sendMessage(_0x39a9b6, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F4B0 + " *SET PAYMENT* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x13325d + "setpayment unli <amount>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Set price for unlimited plan\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x13325d + "setpayment lim <amount>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Set price for limited plan\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x13325d + "setpayment admin <amount>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Set price for admin plan\n") + (CPANEL.U2570 + '⊷\x20Unknown\x20plan:\x20*' + _0x50bf2d + '*')
    }, {
      quoted: _0x41fef8
    });
    if (!_0x5868f3[1] || isNaN(_0x24ea71) || _0x24ea71 <= 0) return _0x47803b.sendMessage(_0x39a9b6, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F4B0 + " *SET PAYMENT* " + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x13325d + "setpayment " + _0x50bf2d + " <amount>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Example: " + _0x13325d + "setpayment " + _0x50bf2d + '\x20500\x0a') + (CPANEL.U2570 + "⊷ Amount must be a number greater than 0")
    }, {
      quoted: _0x41fef8
    });
    if (_0x3f5efd) _0x4834f5.unlimitedPrice = _0x24ea71;
    if (_0x349681) _0x4834f5.limitedPrice = _0x24ea71;
    if (_0x1ba18b) _0x4834f5.adminPrice = _0x24ea71;
    savePaymentConfig(_0x4834f5);
    const _0x13c505 = _0x3f5efd ? CPANEL.U267E_FE0F + '\x20Unlimited' : _0x1ba18b ? CPANEL.U1F451 + " Admin" : CPANEL.U1F5A5_FE0F + " Limited";
    (await _0x47803b.sendMessage(_0x39a9b6, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x41fef8.key
      }
    }), await _0x47803b.sendMessage(_0x39a9b6, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20*' + CPANEL.U1F4B0 + '\x20PRICE\x20UPDATED*\x20' + CPANEL.U230B + '\x0a' + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + _0x13c505 + " plan set to *KES " + _0x24ea71.toLocaleString() + '*\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U267E_FE0F + " Unlimited : KES " + (_0x4834f5.unlimitedPrice > 0 ? _0x4834f5.unlimitedPrice.toLocaleString() : CPANEL.U274C + " Not set") + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F5A5_FE0F + " Limited   : KES " + (_0x4834f5.limitedPrice > 0 ? _0x4834f5.limitedPrice.toLocaleString() : CPANEL.U274C + " Not set") + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1F451 + " Admin     : KES " + (_0x4834f5.adminPrice > 0 ? _0x4834f5.adminPrice.toLocaleString() : CPANEL.U274C + ' Not set') + '\x0a') + (CPANEL.U2570 + "⊷ *Powered by " + _0x3caea2 + '*')
    }, {
      quoted: _0x41fef8
    }));
  }
};
