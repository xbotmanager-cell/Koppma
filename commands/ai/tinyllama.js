import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "tinyllama",
  description: "TinyLlama compact model",
  category: 'ai',
  aliases: ['tiny', 'tinyai'],
  usage: "tinyllama [question]",
  async execute(_0x341165, _0x1df624, _0x20bf8d, _0x2568cf) {
    const _0x199a9d = _0x1df624.key.remoteJid;
    let _0x502b8 = _0x20bf8d.length > 0 ? _0x20bf8d.join('\x20') : _0x1df624.quoted?.text || '';
    if (!_0x502b8) return _0x341165.sendMessage(_0x199a9d, {
      text: "╭┄〔 " + UI.MOUSE + " *TINYLLAMA AI* 〕┄╮\n┆ ✦ *" + _0x2568cf + "tinyllama <question>*\n┆   └─ TinyLlama compact model\n╰┄ " + getFooter(_0x1df624.key.participant || _0x1df624.key.remoteJid)
    }, {
      quoted: _0x1df624
    });
    try {
      await _0x341165.sendMessage(_0x199a9d, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x1df624.key
        }
      });
      let _0x34a933 = await callAI("tinyllama", _0x502b8);
      if (_0x34a933.length > 4000) _0x34a933 = _0x34a933.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x341165.sendMessage(_0x199a9d, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x1df624.key
        }
      }), await _0x341165.sendMessage(_0x199a9d, {
        text: UI.MOUSE + '\x20*TINYLLAMA\x20AI*\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + _0x34a933 + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + getFooter(_0x1df624.key.participant || _0x1df624.key.remoteJid)
      }, {
        quoted: _0x1df624
      }));
    } catch (_0x3337c9) {
      (console.error('[TINYLLAMA]\x20Error:', _0x3337c9.message), await _0x341165.sendMessage(_0x199a9d, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x1df624.key
        }
      }), await _0x341165.sendMessage(_0x199a9d, {
        text: STATUS.ERROR + " *tinyllama AI Error*\n\n" + _0x3337c9.message + "\n\nPlease try again later."
      }, {
        quoted: _0x1df624
      }));
    }
  }
};
