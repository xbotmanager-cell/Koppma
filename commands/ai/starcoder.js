import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'starcoder',
  description: "StarCoder code model",
  category: 'ai',
  aliases: ["star", 'starcode'],
  usage: "starcoder [question]",
  async execute(_0x1d9d33, _0x272959, _0x542c21, _0x1239d4) {
    const _0x971fe5 = _0x272959.key.remoteJid;
    let _0x11be18 = _0x542c21.length > 0 ? _0x542c21.join('\x20') : _0x272959.quoted?.text || '';
    if (!_0x11be18) return _0x1d9d33.sendMessage(_0x971fe5, {
      text: "╭┄〔 " + STATUS.STAR + " *STARCODER AI* 〕┄╮\n┆ ✦ *" + _0x1239d4 + "starcoder <question>*\n┆   └─ StarCoder code model\n╰┄ " + getFooter(_0x272959.key.participant || _0x272959.key.remoteJid)
    }, {
      quoted: _0x272959
    });
    try {
      await _0x1d9d33.sendMessage(_0x971fe5, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x272959.key
        }
      });
      let _0x1e97a3 = await callAI("starcoder", _0x11be18);
      if (_0x1e97a3.length > 4000) _0x1e97a3 = _0x1e97a3.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x1d9d33.sendMessage(_0x971fe5, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x272959.key
        }
      }), await _0x1d9d33.sendMessage(_0x971fe5, {
        text: STATUS.STAR + " *STARCODER AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x1e97a3 + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + getFooter(_0x272959.key.participant || _0x272959.key.remoteJid)
      }, {
        quoted: _0x272959
      }));
    } catch (_0x4b34fe) {
      (console.error("[STARCODER] Error:", _0x4b34fe.message), await _0x1d9d33.sendMessage(_0x971fe5, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x272959.key
        }
      }), await _0x1d9d33.sendMessage(_0x971fe5, {
        text: STATUS.ERROR + " *starcoder AI Error*\n\n" + _0x4b34fe.message + "\n\nPlease try again later."
      }, {
        quoted: _0x272959
      }));
    }
  }
};
