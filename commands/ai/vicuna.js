import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "vicuna",
  description: 'Vicuna\x20fine-tuned\x20LLaMA',
  category: 'ai',
  aliases: ["vicunaai", "vic"],
  usage: 'vicuna\x20[question]',
  async execute(_0x592f2d, _0x8c0be8, _0x56827a, _0x38cf6b) {
    const _0x403fc2 = _0x8c0be8.key.remoteJid;
    let _0x2535f0 = _0x56827a.length > 0 ? _0x56827a.join('\x20') : _0x8c0be8.quoted?.text || '';
    if (!_0x2535f0) return _0x592f2d.sendMessage(_0x403fc2, {
      text: "╭─⌈ " + MEDIA.LLAMA + " *VICUNA AI* ⌋\n├─⊷ *" + _0x38cf6b + 'vicuna\x20<question>*\x0a│\x20\x20└⊷\x20Vicuna\x20fine-tuned\x20LLaMA\x0a╰⊷\x20' + getFooter(_0x8c0be8.key.participant || _0x8c0be8.key.remoteJid)
    }, {
      quoted: _0x8c0be8
    });
    try {
      await _0x592f2d.sendMessage(_0x403fc2, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x8c0be8.key
        }
      });
      let _0x36ac8e = await callAI('vicuna', _0x2535f0);
      if (_0x36ac8e.length > 4000) _0x36ac8e = _0x36ac8e.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x592f2d.sendMessage(_0x403fc2, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x8c0be8.key
        }
      }), await _0x592f2d.sendMessage(_0x403fc2, {
        text: MEDIA.LLAMA + " *VICUNA AI*\n━━━━━━━━━━━━━━━━━\n" + _0x36ac8e + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x8c0be8.key.participant || _0x8c0be8.key.remoteJid)
      }, {
        quoted: _0x8c0be8
      }));
    } catch (_0x4f6506) {
      (console.error("[VICUNA] Error:", _0x4f6506.message), await _0x592f2d.sendMessage(_0x403fc2, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x8c0be8.key
        }
      }), await _0x592f2d.sendMessage(_0x403fc2, {
        text: STATUS.ERROR + '\x20*vicuna\x20AI\x20Error*\x0a\x0a' + _0x4f6506.message + "\n\nPlease try again later."
      }, {
        quoted: _0x8c0be8
      }));
    }
  }
};
