import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "venice",
  description: "Venice creative AI assistant",
  category: 'ai',
  aliases: ["veniceai", 'vai', "ven"],
  usage: 'venice\x20[question]',
  async execute(_0x29c1e2, _0x5f091f, _0x3bfbcd, _0x4668c5) {
    const _0x4e5f01 = _0x5f091f.key.remoteJid;
    let _0x326c6c = _0x3bfbcd.length > 0 ? _0x3bfbcd.join('\x20') : _0x5f091f.quoted?.text || '';
    if (!_0x326c6c) return _0x29c1e2.sendMessage(_0x4e5f01, {
      text: '╭─⌈\x20' + UI.MASK + " *VENICE AI* ⌋\n├─⊷ *" + _0x4668c5 + 'venice\x20<question>*\x0a│\x20\x20└⊷\x20Venice\x20creative\x20AI\x20assistant\x0a╰⊷\x20' + getFooter(_0x5f091f.key.participant || _0x5f091f.key.remoteJid)
    }, {
      quoted: _0x5f091f
    });
    try {
      await _0x29c1e2.sendMessage(_0x4e5f01, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x5f091f.key
        }
      });
      let _0x17403a = await callAI("venice", _0x326c6c);
      if (_0x17403a.length > 4000) _0x17403a = _0x17403a.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x29c1e2.sendMessage(_0x4e5f01, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x5f091f.key
        }
      }), await _0x29c1e2.sendMessage(_0x4e5f01, {
        text: UI.MASK + " *VENICE AI*\n━━━━━━━━━━━━━━━━━\n" + _0x17403a + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x5f091f.key.participant || _0x5f091f.key.remoteJid)
      }, {
        quoted: _0x5f091f
      }));
    } catch (_0x2d2b1c) {
      (console.error("[VENICE] Error:", _0x2d2b1c.message), await _0x29c1e2.sendMessage(_0x4e5f01, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x5f091f.key
        }
      }), await _0x29c1e2.sendMessage(_0x4e5f01, {
        text: STATUS.ERROR + '\x20*venice\x20AI\x20Error*\x0a\x0a' + _0x2d2b1c.message + "\n\nPlease try again later."
      }, {
        quoted: _0x5f091f
      }));
    }
  }
};
