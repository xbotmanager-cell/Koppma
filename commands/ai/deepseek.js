import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "deepseek",
  description: 'DeepSeek\x20reasoning\x20AI',
  category: 'ai',
  aliases: ['deep', "dseek", "dsai"],
  usage: "deepseek [question]",
  async execute(_0x33cb5a, _0xbcf7ed, _0x466c4a, _0x38e87f) {
    const _0x2ed481 = _0xbcf7ed.key.remoteJid;
    let _0x5c36ce = _0x466c4a.length > 0 ? _0x466c4a.join('\x20') : _0xbcf7ed.quoted?.text || '';
    if (!_0x5c36ce) return _0x33cb5a.sendMessage(_0x2ed481, {
      text: "╭┄〔 " + UI.BRAIN + " *DEEPSEEK AI* 〕┄╮\n┆ ✦ *" + _0x38e87f + "deepseek <question>*\n┆   └─ DeepSeek reasoning AI\n╰┄ " + getFooter(_0xbcf7ed.key.participant || _0xbcf7ed.key.remoteJid)
    }, {
      quoted: _0xbcf7ed
    });
    try {
      await _0x33cb5a.sendMessage(_0x2ed481, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0xbcf7ed.key
        }
      });
      let _0x76431 = await callAI("deepseek", _0x5c36ce);
      if (_0x76431.length > 4000) _0x76431 = _0x76431.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x33cb5a.sendMessage(_0x2ed481, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0xbcf7ed.key
        }
      }), await _0x33cb5a.sendMessage(_0x2ed481, {
        text: UI.BRAIN + " *DEEPSEEK AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x76431 + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + getFooter(_0xbcf7ed.key.participant || _0xbcf7ed.key.remoteJid)
      }, {
        quoted: _0xbcf7ed
      }));
    } catch (_0x3bd507) {
      (console.error('[DEEPSEEK]\x20Error:', _0x3bd507.message), await _0x33cb5a.sendMessage(_0x2ed481, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0xbcf7ed.key
        }
      }), await _0x33cb5a.sendMessage(_0x2ed481, {
        text: STATUS.ERROR + " *deepseek AI Error*\n\n" + _0x3bd507.message + "\n\nPlease try again later."
      }, {
        quoted: _0xbcf7ed
      }));
    }
  }
};
