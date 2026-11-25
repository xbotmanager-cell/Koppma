import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "solar",
  description: "Solar AI by Upstage",
  category: 'ai',
  aliases: ['solarai', "sol"],
  usage: "solar [question]",
  async execute(_0xba1022, _0x1d9d46, _0x4ebafc, _0xdaa824) {
    const _0x294f5d = _0x1d9d46.key.remoteJid;
    let _0x4b4cba = _0x4ebafc.length > 0 ? _0x4ebafc.join('\x20') : _0x1d9d46.quoted?.text || '';
    if (!_0x4b4cba) return _0xba1022.sendMessage(_0x294f5d, {
      text: '╭─⌈\x20' + UI.SOLAR + " *SOLAR AI* ⌋\n├─⊷ *" + _0xdaa824 + "solar <question>*\n│  └⊷ Solar AI by Upstage\n╰⊷ " + getFooter(_0x1d9d46.key.participant || _0x1d9d46.key.remoteJid)
    }, {
      quoted: _0x1d9d46
    });
    try {
      await _0xba1022.sendMessage(_0x294f5d, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x1d9d46.key
        }
      });
      let _0x46c731 = await callAI("solar", _0x4b4cba);
      if (_0x46c731.length > 4000) _0x46c731 = _0x46c731.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0xba1022.sendMessage(_0x294f5d, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x1d9d46.key
        }
      }), await _0xba1022.sendMessage(_0x294f5d, {
        text: UI.SOLAR + " *SOLAR AI*\n━━━━━━━━━━━━━━━━━\n" + _0x46c731 + '\x0a━━━━━━━━━━━━━━━━━\x0a' + getFooter(_0x1d9d46.key.participant || _0x1d9d46.key.remoteJid)
      }, {
        quoted: _0x1d9d46
      }));
    } catch (_0x28e3e3) {
      (console.error("[SOLAR] Error:", _0x28e3e3.message), await _0xba1022.sendMessage(_0x294f5d, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x1d9d46.key
        }
      }), await _0xba1022.sendMessage(_0x294f5d, {
        text: STATUS.ERROR + " *solar AI Error*\n\n" + _0x28e3e3.message + "\n\nPlease try again later."
      }, {
        quoted: _0x1d9d46
      }));
    }
  }
};
