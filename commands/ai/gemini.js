import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "gemini",
  description: 'Google\x20Gemini\x20AI',
  category: 'ai',
  aliases: ["googleai", "googlegemini", 'gem'],
  usage: "gemini [question]",
  async execute(_0x4e862c, _0x289e0c, _0x11bce9, _0x56b5e6) {
    const _0x59606b = _0x289e0c.key.remoteJid;
    let _0xcb1d1e = _0x11bce9.length > 0 ? _0x11bce9.join('\x20') : _0x289e0c.quoted?.text || '';
    if (!_0xcb1d1e) return _0x4e862c.sendMessage(_0x59606b, {
      text: "╭┄〔 " + STATUS.SPARKLE + " *GEMINI AI* 〕┄╮\n┆ ✦ *" + _0x56b5e6 + "gemini <question>*\n┆   └─ Google Gemini AI\n╰┄ " + getFooter(_0x289e0c.key.participant || _0x289e0c.key.remoteJid)
    }, {
      quoted: _0x289e0c
    });
    try {
      await _0x4e862c.sendMessage(_0x59606b, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x289e0c.key
        }
      });
      let _0x21bce5 = await callAI("gemini", _0xcb1d1e, globalThis._apiOverrides?.gemini);
      if (_0x21bce5.length > 4000) _0x21bce5 = _0x21bce5.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x4e862c.sendMessage(_0x59606b, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x289e0c.key
        }
      }), await _0x4e862c.sendMessage(_0x59606b, {
        text: STATUS.SPARKLE + " *GEMINI AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x21bce5 + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + getFooter(_0x289e0c.key.participant || _0x289e0c.key.remoteJid)
      }, {
        quoted: _0x289e0c
      }));
    } catch (_0x21c716) {
      (console.error("[GEMINI] Error:", _0x21c716.message), await _0x4e862c.sendMessage(_0x59606b, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x289e0c.key
        }
      }), await _0x4e862c.sendMessage(_0x59606b, {
        text: STATUS.ERROR + " *gemini AI Error*\n\n" + _0x21c716.message + "\n\nPlease try again later."
      }, {
        quoted: _0x289e0c
      }));
    }
  }
};
