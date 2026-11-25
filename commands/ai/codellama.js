import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "codellama",
  description: "Code Llama code generation",
  category: 'ai',
  aliases: ["codel", "codellm", "codeai"],
  usage: 'codellama\x20[question]',
  async execute(_0xb67c49, _0x27acb7, _0x343600, _0x1a4fbd) {
    const _0x216856 = _0x27acb7.key.remoteJid;
    let _0x241ed8 = _0x343600.length > 0 ? _0x343600.join('\x20') : _0x27acb7.quoted?.text || '';
    if (!_0x241ed8) return _0xb67c49.sendMessage(_0x216856, {
      text: "╭─⌈ " + MEDIA.COMPUTER + " *CODELLAMA AI* ⌋\n├─⊷ *" + _0x1a4fbd + "codellama <question>*\n│  └⊷ Code Llama code generation\n╰⊷ " + getFooter(_0x27acb7.key.participant || _0x27acb7.key.remoteJid)
    }, {
      quoted: _0x27acb7
    });
    try {
      await _0xb67c49.sendMessage(_0x216856, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x27acb7.key
        }
      });
      let _0x20034a = await callAI("codellama", _0x241ed8);
      if (_0x20034a.length > 4000) _0x20034a = _0x20034a.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0xb67c49.sendMessage(_0x216856, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x27acb7.key
        }
      }), await _0xb67c49.sendMessage(_0x216856, {
        text: MEDIA.COMPUTER + " *CODELLAMA AI*\n━━━━━━━━━━━━━━━━━\n" + _0x20034a + '\x0a━━━━━━━━━━━━━━━━━\x0a' + getFooter(_0x27acb7.key.participant || _0x27acb7.key.remoteJid)
      }, {
        quoted: _0x27acb7
      }));
    } catch (_0x5e1a98) {
      (console.error("[CODELLAMA] Error:", _0x5e1a98.message), await _0xb67c49.sendMessage(_0x216856, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x27acb7.key
        }
      }), await _0xb67c49.sendMessage(_0x216856, {
        text: STATUS.ERROR + " *codellama AI Error*\n\n" + _0x5e1a98.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x27acb7
      }));
    }
  }
};
