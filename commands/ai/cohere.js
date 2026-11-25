import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'cohere',
  description: "Cohere AI language model",
  category: 'ai',
  aliases: ["coherai", "cohai"],
  usage: "cohere [question]",
  async execute(_0x3ca0b9, _0x4cdb4c, _0x102ea2, _0x107919) {
    const _0x3f11b1 = _0x4cdb4c.key.remoteJid;
    let _0x438338 = _0x102ea2.length > 0 ? _0x102ea2.join('\x20') : _0x4cdb4c.quoted?.text || '';
    if (!_0x438338) return _0x3ca0b9.sendMessage(_0x3f11b1, {
      text: "╭─⌈ " + UI.TARGET + " *COHERE AI* ⌋\n├─⊷ *" + _0x107919 + "cohere <question>*\n│  └⊷ Cohere AI language model\n╰⊷ " + getFooter(_0x4cdb4c.key.participant || _0x4cdb4c.key.remoteJid)
    }, {
      quoted: _0x4cdb4c
    });
    try {
      await _0x3ca0b9.sendMessage(_0x3f11b1, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x4cdb4c.key
        }
      });
      let _0x5f1524 = await callAI("cohere", _0x438338);
      if (_0x5f1524.length > 4000) _0x5f1524 = _0x5f1524.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x3ca0b9.sendMessage(_0x3f11b1, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x4cdb4c.key
        }
      }), await _0x3ca0b9.sendMessage(_0x3f11b1, {
        text: UI.TARGET + " *COHERE AI*\n━━━━━━━━━━━━━━━━━\n" + _0x5f1524 + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x4cdb4c.key.participant || _0x4cdb4c.key.remoteJid)
      }, {
        quoted: _0x4cdb4c
      }));
    } catch (_0x463c13) {
      (console.error("[COHERE] Error:", _0x463c13.message), await _0x3ca0b9.sendMessage(_0x3f11b1, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x4cdb4c.key
        }
      }), await _0x3ca0b9.sendMessage(_0x3f11b1, {
        text: STATUS.ERROR + " *cohere AI Error*\n\n" + _0x463c13.message + "\n\nPlease try again later."
      }, {
        quoted: _0x4cdb4c
      }));
    }
  }
};
