import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "groq",
  description: "Groq ultra-fast AI",
  category: 'ai',
  aliases: ['groqai', 'gq', "groqchat"],
  usage: "groq [question]",
  async execute(_0x1d2e32, _0x5a442c, _0x3570c6, _0x20925d) {
    const _0x55f367 = _0x5a442c.key.remoteJid;
    let _0x4ec948 = _0x3570c6.length > 0 ? _0x3570c6.join('\x20') : _0x5a442c.quoted?.text || '';
    if (!_0x4ec948) return _0x1d2e32.sendMessage(_0x55f367, {
      text: '╭┄〔 \x20⚡\x20*GROQ\x20AI*\x20 〕┄╮\x0a┆ ✦ *' + _0x20925d + "groq <question>*\n┆   └─ Groq ultra-fast AI\n╰┄ " + getFooter(_0x5a442c.key.participant || _0x5a442c.key.remoteJid)
    }, {
      quoted: _0x5a442c
    });
    try {
      await _0x1d2e32.sendMessage(_0x55f367, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x5a442c.key
        }
      });
      let _0x3afe14 = await callAI("groq", _0x4ec948);
      if (_0x3afe14.length > 4000) _0x3afe14 = _0x3afe14.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x1d2e32.sendMessage(_0x55f367, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x5a442c.key
        }
      }), await _0x1d2e32.sendMessage(_0x55f367, {
        text: "⚡ *GROQ AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x3afe14 + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + getFooter(_0x5a442c.key.participant || _0x5a442c.key.remoteJid)
      }, {
        quoted: _0x5a442c
      }));
    } catch (_0x2f7fda) {
      (console.error("[GROQ] Error:", _0x2f7fda.message), await _0x1d2e32.sendMessage(_0x55f367, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x5a442c.key
        }
      }), await _0x1d2e32.sendMessage(_0x55f367, {
        text: STATUS.ERROR + '\x20*groq\x20AI\x20Error*\x0a\x0a' + _0x2f7fda.message + "\n\nPlease try again later."
      }, {
        quoted: _0x5a442c
      }));
    }
  }
};
