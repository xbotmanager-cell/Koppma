import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "internlm",
  description: "InternLM Shanghai AI",
  category: 'ai',
  aliases: ["internlmai", "intern"],
  usage: "internlm [question]",
  async execute(_0x5b7c24, _0xf6f6d3, _0x488d91, _0x113735) {
    const _0x5f5516 = _0xf6f6d3.key.remoteJid;
    let _0x2b738a = _0x488d91.length > 0 ? _0x488d91.join('\x20') : _0xf6f6d3.quoted?.text || '';
    if (!_0x2b738a) return _0x5b7c24.sendMessage(_0x5f5516, {
      text: "╭─⌈ " + UI.MICROSCOPE + " *INTERNLM AI* ⌋\n├─⊷ *" + _0x113735 + "internlm <question>*\n│  └⊷ InternLM Shanghai AI\n╰⊷ " + getFooter(_0xf6f6d3.key.participant || _0xf6f6d3.key.remoteJid)
    }, {
      quoted: _0xf6f6d3
    });
    try {
      await _0x5b7c24.sendMessage(_0x5f5516, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0xf6f6d3.key
        }
      });
      let _0x55ad6f = await callAI("internlm", _0x2b738a);
      if (_0x55ad6f.length > 4000) _0x55ad6f = _0x55ad6f.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x5b7c24.sendMessage(_0x5f5516, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0xf6f6d3.key
        }
      }), await _0x5b7c24.sendMessage(_0x5f5516, {
        text: UI.MICROSCOPE + '\x20*INTERNLM\x20AI*\x0a━━━━━━━━━━━━━━━━━\x0a' + _0x55ad6f + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0xf6f6d3.key.participant || _0xf6f6d3.key.remoteJid)
      }, {
        quoted: _0xf6f6d3
      }));
    } catch (_0x2872ef) {
      (console.error("[INTERNLM] Error:", _0x2872ef.message), await _0x5b7c24.sendMessage(_0x5f5516, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0xf6f6d3.key
        }
      }), await _0x5b7c24.sendMessage(_0x5f5516, {
        text: STATUS.ERROR + " *internlm AI Error*\n\n" + _0x2872ef.message + "\n\nPlease try again later."
      }, {
        quoted: _0xf6f6d3
      }));
    }
  }
};
