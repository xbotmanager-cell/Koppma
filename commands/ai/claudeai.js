import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {STATUS, UI} from '../../lib/emojis.js';
export default {
  name: 'claudeai',
  description: "Anthropic Claude AI",
  category: 'ai',
  aliases: ["claude", "anthropic", "claude3"],
  usage: "claudeai [question]",
  async execute(_0x18a1f7, _0x264d06, _0x173395, _0x1d9be1) {
    const _0x4f2950 = _0x264d06.key.remoteJid;
    let _0x3bf0b7 = _0x173395.length > 0 ? _0x173395.join('\x20') : _0x264d06.quoted?.text || '';
    if (!_0x3bf0b7) return _0x18a1f7.sendMessage(_0x4f2950, {
      text: "╭┄〔 " + UI.BRAIN + " *CLAUDEAI AI* 〕┄╮\n┆ ✦ *" + _0x1d9be1 + "claudeai <question>*\n┆   └─ Anthropic Claude AI\n╰┄ " + getFooter(_0x264d06.key.participant || _0x264d06.key.remoteJid)
    }, {
      quoted: _0x264d06
    });
    try {
      await _0x18a1f7.sendMessage(_0x4f2950, {
        react: {
          text: STATUS.LOADING,
          key: _0x264d06.key
        }
      });
      let _0x733c5f = await callAI("claude", _0x3bf0b7);
      if (_0x733c5f.length > 4000) _0x733c5f = _0x733c5f.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x18a1f7.sendMessage(_0x4f2950, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x264d06.key
        }
      }), await _0x18a1f7.sendMessage(_0x4f2950, {
        text: UI.BRAIN + " *CLAUDEAI AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x733c5f + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + getFooter(_0x264d06.key.participant || _0x264d06.key.remoteJid)
      }, {
        quoted: _0x264d06
      }));
    } catch (_0x1088c1) {
      (console.error("[CLAUDEAI] Error:", _0x1088c1.message), await _0x18a1f7.sendMessage(_0x4f2950, {
        react: {
          text: STATUS.ERROR,
          key: _0x264d06.key
        }
      }), await _0x18a1f7.sendMessage(_0x4f2950, {
        text: STATUS.ERROR + " *claudeai AI Error*\n\n" + _0x1088c1.message + "\n\nPlease try again later."
      }, {
        quoted: _0x264d06
      }));
    }
  }
};
