import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "neural",
  description: "Neural network AI model",
  category: 'ai',
  aliases: ["neuralai", 'nai'],
  usage: "neural [question]",
  async execute(_0x5c2573, _0x59d807, _0x5e9ddc, _0x5b2fd8) {
    const _0x29325c = _0x59d807.key.remoteJid;
    let _0x1d193c = _0x5e9ddc.length > 0 ? _0x5e9ddc.join('\x20') : _0x59d807.quoted?.text || '';
    if (!_0x1d193c) return _0x5c2573.sendMessage(_0x29325c, {
      text: "╭┄〔 " + UI.NEURAL + " *NEURAL AI* 〕┄╮\n┆ ✦ *" + _0x5b2fd8 + "neural <question>*\n┆   └─ Neural network AI model\n╰┄ " + getFooter(_0x59d807.key.participant || _0x59d807.key.remoteJid)
    }, {
      quoted: _0x59d807
    });
    try {
      await _0x5c2573.sendMessage(_0x29325c, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x59d807.key
        }
      });
      let _0x583cb7 = await callAI("neural", _0x1d193c);
      if (_0x583cb7.length > 4000) _0x583cb7 = _0x583cb7.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x5c2573.sendMessage(_0x29325c, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x59d807.key
        }
      }), await _0x5c2573.sendMessage(_0x29325c, {
        text: UI.NEURAL + '\x20*NEURAL\x20AI*\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + _0x583cb7 + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + getFooter(_0x59d807.key.participant || _0x59d807.key.remoteJid)
      }, {
        quoted: _0x59d807
      }));
    } catch (_0x3cb98f) {
      (console.error("[NEURAL] Error:", _0x3cb98f.message), await _0x5c2573.sendMessage(_0x29325c, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x59d807.key
        }
      }), await _0x5c2573.sendMessage(_0x29325c, {
        text: STATUS.ERROR + " *neural AI Error*\n\n" + _0x3cb98f.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x59d807
      }));
    }
  }
};
