import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'yi',
  description: 'Yi\x20bilingual\x20AI\x20model',
  category: 'ai',
  aliases: ['yiai', "yi34b"],
  usage: 'yi\x20[question]',
  async execute(_0x30165a, _0x2d3bc9, _0x1ced9b, _0x5ba545) {
    const _0xa9f759 = _0x2d3bc9.key.remoteJid;
    let _0x416aed = _0x1ced9b.length > 0 ? _0x1ced9b.join('\x20') : _0x2d3bc9.quoted?.text || '';
    if (!_0x416aed) return _0x30165a.sendMessage(_0xa9f759, {
      text: "╭┄〔 " + SOCIAL.EARTH + " *YI AI* 〕┄╮\n┆ ✦ *" + _0x5ba545 + 'yi\x20<question>*\x0a┆ \x20╰┄ \x20Yi\x20bilingual\x20AI\x20model\x0a╰┄ \x20' + getFooter(_0x2d3bc9.key.participant || _0x2d3bc9.key.remoteJid)
    }, {
      quoted: _0x2d3bc9
    });
    try {
      await _0x30165a.sendMessage(_0xa9f759, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x2d3bc9.key
        }
      });
      let _0x57caed = await callAI('yi', _0x416aed);
      if (_0x57caed.length > 4000) _0x57caed = _0x57caed.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x30165a.sendMessage(_0xa9f759, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x2d3bc9.key
        }
      }), await _0x30165a.sendMessage(_0xa9f759, {
        text: SOCIAL.EARTH + " *YI AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x57caed + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + getFooter(_0x2d3bc9.key.participant || _0x2d3bc9.key.remoteJid)
      }, {
        quoted: _0x2d3bc9
      }));
    } catch (_0x2f3ce5) {
      (console.error("[YI] Error:", _0x2f3ce5.message), await _0x30165a.sendMessage(_0xa9f759, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x2d3bc9.key
        }
      }), await _0x30165a.sendMessage(_0xa9f759, {
        text: STATUS.ERROR + '\x20*yi\x20AI\x20Error*\x0a\x0a' + _0x2f3ce5.message + "\n\nPlease try again later."
      }, {
        quoted: _0x2d3bc9
      }));
    }
  }
};
