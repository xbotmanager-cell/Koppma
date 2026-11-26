import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'mistral',
  description: 'Mistral\x20AI\x20open-source\x20model',
  category: 'ai',
  aliases: ["mistralai", 'mst', "mist", 'mirai'],
  usage: "mistral [question]",
  async execute(_0x2bd685, _0x572164, _0x415d67, _0xc84f77) {
    const _0xb4208e = _0x572164.key.remoteJid;
    let _0x349a27 = _0x415d67.length > 0 ? _0x415d67.join('\x20') : _0x572164.quoted?.text || '';
    if (!_0x349a27) return _0x2bd685.sendMessage(_0xb4208e, {
      text: '╭┄〔 \x20' + UI.SWIRL + " *MISTRAL AI* 〕┄╮\n┆ ✦ *" + _0xc84f77 + "mistral <question>*\n┆   └─ Mistral AI open-source model\n╰┄ " + getFooter(_0x572164.key.participant || _0x572164.key.remoteJid)
    }, {
      quoted: _0x572164
    });
    try {
      await _0x2bd685.sendMessage(_0xb4208e, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x572164.key
        }
      });
      let _0x50e376 = await callAI('mistral', _0x349a27);
      if (_0x50e376.length > 4000) _0x50e376 = _0x50e376.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x2bd685.sendMessage(_0xb4208e, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x572164.key
        }
      }), await _0x2bd685.sendMessage(_0xb4208e, {
        text: UI.SWIRL + " *MISTRAL AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x50e376 + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + getFooter(_0x572164.key.participant || _0x572164.key.remoteJid)
      }, {
        quoted: _0x572164
      }));
    } catch (_0x4bd24a) {
      (console.error("[MISTRAL] Error:", _0x4bd24a.message), await _0x2bd685.sendMessage(_0xb4208e, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x572164.key
        }
      }), await _0x2bd685.sendMessage(_0xb4208e, {
        text: STATUS.ERROR + " *mistral AI Error*\n\n" + _0x4bd24a.message + "\n\nPlease try again later."
      }, {
        quoted: _0x572164
      }));
    }
  }
};
