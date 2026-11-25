import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {STATUS, SOCIAL} from '../../lib/emojis.js';
export default {
  name: 'chatgpt',
  description: "ChatGPT via Wolf API",
  category: 'ai',
  aliases: ["gpt4", "openai"],
  usage: "chatgpt [question]",
  async execute(_0x16c556, _0x451cee, _0x5e0cf6, _0x4a7a34) {
    const _0x3cff00 = _0x451cee.key.remoteJid;
    let _0x300edc = _0x5e0cf6.length > 0 ? _0x5e0cf6.join('\x20') : _0x451cee.quoted?.text || '';
    if (!_0x300edc) return _0x16c556.sendMessage(_0x3cff00, {
      text: "╭─⌈ " + SOCIAL.BOT + " *CHATGPT AI* ⌋\n├─⊷ *" + _0x4a7a34 + "chatgpt <question>*\n│  └⊷ ChatGPT via Wolf API\n╰⊷ " + getFooter(_0x451cee.key.participant || _0x451cee.key.remoteJid)
    }, {
      quoted: _0x451cee
    });
    try {
      await _0x16c556.sendMessage(_0x3cff00, {
        react: {
          text: STATUS.LOADING,
          key: _0x451cee.key
        }
      });
      let _0x16c7c2 = await callAI("gpt", _0x300edc);
      if (_0x16c7c2.length > 4000) _0x16c7c2 = _0x16c7c2.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x16c556.sendMessage(_0x3cff00, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x451cee.key
        }
      }), await _0x16c556.sendMessage(_0x3cff00, {
        text: SOCIAL.BOT + " *CHATGPT AI*\n━━━━━━━━━━━━━━━━━\n" + _0x16c7c2 + '\x0a━━━━━━━━━━━━━━━━━\x0a' + getFooter(_0x451cee.key.participant || _0x451cee.key.remoteJid)
      }, {
        quoted: _0x451cee
      }));
    } catch (_0x2f9707) {
      (console.error('[CHATGPT]\x20Error:', _0x2f9707.message), await _0x16c556.sendMessage(_0x3cff00, {
        react: {
          text: STATUS.ERROR,
          key: _0x451cee.key
        }
      }), await _0x16c556.sendMessage(_0x3cff00, {
        text: STATUS.ERROR + " *chatgpt AI Error*\n\n" + _0x2f9707.message + "\n\nPlease try again later."
      }, {
        quoted: _0x451cee
      }));
    }
  }
};
