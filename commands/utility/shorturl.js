import _0xfa8157 from 'node-fetch';
import {createRequire} from 'module';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {isButtonModeEnabled} from '../../lib/buttonMode.js';
import {UTILITY, BRAND, SOCIAL, STATUS, UI} from '../../lib/emojis.js';
const require = createRequire(import.meta.url);
let sendInteractiveMessage;
try {
  ({sendInteractiveMessage} = await import("wolfbtns"));
} catch (_0x5bdde7) {}
export default {
  name: "shorturl",
  alias: ["tinyurl", "shorten"],
  description: UI.LINK + " Shorten a long URL",
  category: "utility",
  usage: ".shorturl <long URL>",
  async execute(_0x30ab4f, _0x8731a0, _0x1aef5f, _0x15b3dc, _0x7aad3b, _0x491a06) {
    const _0x27f18c = typeof _0x15b3dc === 'string' ? _0x15b3dc : _0x8731a0.key.remoteJid;
    if (!_0x1aef5f.length) return _0x30ab4f.sendMessage(_0x27f18c, {
      text: '╭┄〔\x20' + UI.LINK + " *URL SHORTENER* 〕┄╮\n┆\n┆ ✦ *shorturl <URL>*\n┆  ╰┄ Shorten a long URL\n┆\n┆ ✦ *Example:*\n┆  ╰┄ `.shorturl https://example.com`\n┆\n╰┄ " + getFooter(_0x8731a0.key.participant || _0x8731a0.key.remoteJid)
    }, {
      quoted: _0x8731a0
    });
    const _0x19b980 = _0x1aef5f[0];
    try {
      await _0x30ab4f.sendMessage(_0x27f18c, {
        react: {
          text: '' + UTILITY.HOURGLASS,
          key: _0x8731a0.key
        }
      });
      const _0x1e72de = await _0xfa8157("https://tinyurl.com/api-create.php?url=" + encodeURIComponent(_0x19b980)), _0x4bd635 = await _0x1e72de.text();
      if (!_0x4bd635 || _0x4bd635.includes("Error")) return (await _0x30ab4f.sendMessage(_0x27f18c, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x8731a0.key
        }
      }), _0x30ab4f.sendMessage(_0x27f18c, {
        text: STATUS.ERROR + " Failed to shorten URL. Please check the URL and try again."
      }, {
        quoted: _0x8731a0
      }));
      if (isButtonModeEnabled() && typeof sendInteractiveMessage === "function") try {
        (await sendInteractiveMessage(_0x30ab4f, _0x27f18c, {
          text: STATUS.SUCCESS + " *URL Shortened!*\n\n" + UI.LINK + " *Short:* " + _0x4bd635 + '\x0a' + SOCIAL.GLOBE + '\x20*Original:*\x20' + _0x19b980.substring(0, 60) + (_0x19b980.length > 60 ? "..." : ''),
          footer: BRAND.VIP + " VIPBOT · Lupin Stanley",
          interactiveButtons: [{
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: UI.CLIPBOARD + " Copy Short URL",
              copy_code: _0x4bd635
            })
          }, {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: SOCIAL.GLOBE + " Open Link",
              url: _0x4bd635
            })
          }]
        }), await _0x30ab4f.sendMessage(_0x27f18c, {
          react: {
            text: '' + STATUS.SUCCESS,
            key: _0x8731a0.key
          }
        }));
        return;
      } catch (_0x53e045) {
        console.log('[ShortURL]\x20Button\x20send\x20failed:', _0x53e045.message);
      }
      (await _0x30ab4f.sendMessage(_0x27f18c, {
        text: UI.LINK + '\x20*Short\x20URL:*\x0a' + _0x4bd635
      }, {
        quoted: _0x8731a0
      }), await _0x30ab4f.sendMessage(_0x27f18c, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x8731a0.key
        }
      }));
    } catch (_0x4b7873) {
      (console.error('[ShortURL\x20Error]', _0x4b7873), await _0x30ab4f.sendMessage(_0x27f18c, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x8731a0.key
        }
      }), typeof _0x27f18c === "string" && _0x30ab4f.sendMessage(_0x27f18c, {
        text: STATUS.ERROR + " Failed to shorten URL. Please try again later."
      }, {
        quoted: _0x8731a0
      }));
    }
  }
};
