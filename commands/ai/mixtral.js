import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "mixtral",
  description: "Mixtral Mixture of Experts",
  category: 'ai',
  aliases: ["mixtralai", 'moe', "mix"],
  usage: "mixtral [question]",
  async execute(_0x34ecac, _0x31dc78, _0x2f8ef1, _0x4dadcf) {
    const _0xca03ff = _0x31dc78.key.remoteJid;
    let _0x1695a3 = _0x2f8ef1.length > 0 ? _0x2f8ef1.join('\x20') : _0x31dc78.quoted?.text || '';
    if (!_0x1695a3) return _0x34ecac.sendMessage(_0xca03ff, {
      text: '╭─⌈\x20' + UI.MIX + " *MIXTRAL AI* ⌋\n├─⊷ *" + _0x4dadcf + "mixtral <question>*\n│  └⊷ Mixtral Mixture of Experts\n╰⊷ " + getFooter(_0x31dc78.key.participant || _0x31dc78.key.remoteJid)
    }, {
      quoted: _0x31dc78
    });
    try {
      await _0x34ecac.sendMessage(_0xca03ff, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x31dc78.key
        }
      });
      let _0xb8b61a = await callAI('mixtral', _0x1695a3);
      if (_0xb8b61a.length > 4000) _0xb8b61a = _0xb8b61a.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x34ecac.sendMessage(_0xca03ff, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x31dc78.key
        }
      }), await _0x34ecac.sendMessage(_0xca03ff, {
        text: UI.MIX + " *MIXTRAL AI*\n━━━━━━━━━━━━━━━━━\n" + _0xb8b61a + '\x0a━━━━━━━━━━━━━━━━━\x0a' + getFooter(_0x31dc78.key.participant || _0x31dc78.key.remoteJid)
      }, {
        quoted: _0x31dc78
      }));
    } catch (_0x2e9583) {
      (console.error("[MIXTRAL] Error:", _0x2e9583.message), await _0x34ecac.sendMessage(_0xca03ff, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x31dc78.key
        }
      }), await _0x34ecac.sendMessage(_0xca03ff, {
        text: STATUS.ERROR + " *mixtral AI Error*\n\n" + _0x2e9583.message + "\n\nPlease try again later."
      }, {
        quoted: _0x31dc78
      }));
    }
  }
};
