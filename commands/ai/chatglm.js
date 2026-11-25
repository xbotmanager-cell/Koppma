import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "chatglm",
  description: "ChatGLM bilingual AI",
  category: 'ai',
  aliases: ["chatglmai", "glm", "glm4"],
  usage: "chatglm [question]",
  async execute(_0x1722c2, _0x1ca319, _0x311034, _0x5e44ef) {
    const _0x5e1911 = _0x1ca319.key.remoteJid;
    let _0x57632f = _0x311034.length > 0 ? _0x311034.join('\x20') : _0x1ca319.quoted?.text || '';
    if (!_0x57632f) return _0x1722c2.sendMessage(_0x5e1911, {
      text: "╭─⌈ " + SOCIAL.GLOBE + '\x20*CHATGLM\x20AI*\x20⌋\x0a├─⊷\x20*' + _0x5e44ef + "chatglm <question>*\n│  └⊷ ChatGLM bilingual AI\n╰⊷ " + getFooter(_0x1ca319.key.participant || _0x1ca319.key.remoteJid)
    }, {
      quoted: _0x1ca319
    });
    try {
      await _0x1722c2.sendMessage(_0x5e1911, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x1ca319.key
        }
      });
      let _0x38e69d = await callAI("chatglm", _0x57632f);
      if (_0x38e69d.length > 4000) _0x38e69d = _0x38e69d.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x1722c2.sendMessage(_0x5e1911, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x1ca319.key
        }
      }), await _0x1722c2.sendMessage(_0x5e1911, {
        text: SOCIAL.GLOBE + " *CHATGLM AI*\n━━━━━━━━━━━━━━━━━\n" + _0x38e69d + '\x0a━━━━━━━━━━━━━━━━━\x0a' + getFooter(_0x1ca319.key.participant || _0x1ca319.key.remoteJid)
      }, {
        quoted: _0x1ca319
      }));
    } catch (_0x341780) {
      (console.error('[CHATGLM]\x20Error:', _0x341780.message), await _0x1722c2.sendMessage(_0x5e1911, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x1ca319.key
        }
      }), await _0x1722c2.sendMessage(_0x5e1911, {
        text: STATUS.ERROR + '\x20*chatglm\x20AI\x20Error*\x0a\x0a' + _0x341780.message + "\n\nPlease try again later."
      }, {
        quoted: _0x1ca319
      }));
    }
  }
};
