import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "nous",
  description: 'Nous\x20Research\x20AI\x20model',
  category: 'ai',
  aliases: ["nousai", 'noushermes'],
  usage: "nous [question]",
  async execute(_0x586f4e, _0x3c0379, _0x1432c6, _0x3837fb) {
    const _0x277d69 = _0x3c0379.key.remoteJid;
    let _0xa2ba79 = _0x1432c6.length > 0 ? _0x1432c6.join('\x20') : _0x3c0379.quoted?.text || '';
    if (!_0xa2ba79) return _0x586f4e.sendMessage(_0x277d69, {
      text: "╭┄〔 " + UI.BOOKS + " *NOUS AI* 〕┄╮\n┆ ✦ *" + _0x3837fb + "nous <question>*\n┆   └─ Nous Research AI model\n╰┄ " + getFooter(_0x3c0379.key.participant || _0x3c0379.key.remoteJid)
    }, {
      quoted: _0x3c0379
    });
    try {
      await _0x586f4e.sendMessage(_0x277d69, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x3c0379.key
        }
      });
      let _0x694d27 = await callAI("nous", _0xa2ba79);
      if (_0x694d27.length > 4000) _0x694d27 = _0x694d27.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x586f4e.sendMessage(_0x277d69, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x3c0379.key
        }
      }), await _0x586f4e.sendMessage(_0x277d69, {
        text: UI.BOOKS + '\x20*NOUS\x20AI*\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + _0x694d27 + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + getFooter(_0x3c0379.key.participant || _0x3c0379.key.remoteJid)
      }, {
        quoted: _0x3c0379
      }));
    } catch (_0x3d2587) {
      (console.error("[NOUS] Error:", _0x3d2587.message), await _0x586f4e.sendMessage(_0x277d69, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x3c0379.key
        }
      }), await _0x586f4e.sendMessage(_0x277d69, {
        text: STATUS.ERROR + " *nous AI Error*\n\n" + _0x3d2587.message + "\n\nPlease try again later."
      }, {
        quoted: _0x3c0379
      }));
    }
  }
};
