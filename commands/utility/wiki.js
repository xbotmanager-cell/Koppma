import _0x1e7c5f from 'node-fetch';
import {createRequire} from 'module';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {isButtonModeEnabled} from '../../lib/buttonMode.js';
import {UTILITY, BRAND, MUSIC, SOCIAL, STATUS, UI} from '../../lib/emojis.js';
const _require = createRequire(import.meta.url);
let sendInteractiveMessage;
try {
  ({sendInteractiveMessage} = await import("wolfbtns"));
} catch (_0x58300b) {}
export default {
  name: "wiki",
  alias: ["wikipedia"],
  category: "tools",
  desc: 'Search\x20Wikipedia\x20and\x20get\x20a\x20brief\x20summary',
  execute: async (_0x3e559a, _0x574e47, _0xa5a6ca) => {
    try {
      const _0x506878 = _0x574e47.key.remoteJid;
      let _0x1e3f40 = _0xa5a6ca.join('\x20').trim();
      const _0x5cccf4 = _0x574e47.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      !_0x1e3f40 && _0x5cccf4 && (_0x1e3f40 = _0x5cccf4.conversation || _0x5cccf4.extendedTextMessage?.text || _0x5cccf4.imageMessage?.caption || _0x5cccf4.videoMessage?.caption || '');
      if (!_0x1e3f40) return await _0x3e559a.sendMessage(_0x506878, {
        text: "╭┄〔 " + SOCIAL.GLOBE + " *WIKIPEDIA* 〕┄╮\n┆\n┆ ✦ *wiki <search term>*\n┆   └─ Search Wikipedia and get a summary\n┆\n┆ ✦ *Reply*\n┆   └─ Reply to a message with .wiki\n┆\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n" + getFooter(_0x574e47.key.participant || _0x574e47.key.remoteJid),
        quoted: _0x574e47
      });
      if (["vipbot", "vip bot", "silent wolf", "wolfbot"].includes(_0x1e3f40.toLowerCase())) return await _0x3e559a.sendMessage(_0x506878, {
        text: BRAND.VIP + ' *VIPBOT* — Elite WhatsApp Bot Solution!\n\n' + STATUS.NEW + " Owned and developed by Lupin Stanley — premium quality, cutting-edge speed and reliability! " + MUSIC.CHILL,
        quoted: _0x574e47
      });
      const _0x189d46 = await _0x1e7c5f("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(_0x1e3f40));
      if (!_0x189d46.ok) throw new Error('Article\x20not\x20found');
      const _0xa2ba6d = await _0x189d46.json(), _0x5d001a = _0xa2ba6d.content_urls?.desktop?.page || "https://en.wikipedia.org/wiki/" + encodeURIComponent(_0x1e3f40), _0xea2b97 = _0xa2ba6d.extract || '', _0x47a305 = _0xea2b97.length > 300 ? _0xea2b97.substring(0, 297) + '...' : _0xea2b97, _0x2640f5 = SOCIAL.GLOBE + '\x20*Wikipedia:\x20' + _0xa2ba6d.title + "*\n\n" + UI.NOTE + '\x20' + (_0xa2ba6d.description || '') + '\x0a\x0a' + _0x47a305;
      if (isButtonModeEnabled() && typeof sendInteractiveMessage === 'function') try {
        const _0x588282 = {
          text: _0x2640f5,
          footer: SOCIAL.GLOBE + " Wikipedia",
          interactiveButtons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: UTILITY.BOOK + '\x20Read\x20Full\x20Article',
              url: _0x5d001a
            })
          }, {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
              display_text: UI.CLIPBOARD + " Copy Summary",
              copy_code: _0xa2ba6d.title + '\x0a\x0a' + _0xea2b97
            })
          }]
        };
        if (_0xa2ba6d.thumbnail?.source) _0x588282.image = {
          url: _0xa2ba6d.thumbnail.source
        };
        await sendInteractiveMessage(_0x3e559a, _0x506878, _0x588282);
        return;
      } catch (_0x21e4da) {
        console.log("[Wiki] Button send failed:", _0x21e4da.message);
      }
      await _0x3e559a.sendMessage(_0x506878, {
        text: _0x2640f5 + '\x0a\x0a' + UI.LINK + '\x20' + _0x5d001a,
        quoted: _0x574e47,
        linkPreview: false
      });
    } catch {
      await _0x3e559a.sendMessage(_0x574e47.key.remoteJid, {
        text: STATUS.ERROR + " Could not find a Wikipedia article for your search term. Please try another keyword.",
        quoted: _0x574e47
      });
    }
  }
};
