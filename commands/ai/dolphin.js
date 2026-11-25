import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "dolphin",
  description: 'Dolphin\x20uncensored\x20AI',
  category: 'ai',
  aliases: ["dolphinai", "dolph"],
  usage: 'dolphin\x20[question]',
  async execute(_0x3ed4eb, _0x4ac695, _0x482f3b, _0x4e915a) {
    const _0x7d2dcb = _0x4ac695.key.remoteJid;
    let _0x7f3d49 = _0x482f3b.length > 0 ? _0x482f3b.join('\x20') : _0x4ac695.quoted?.text || '';
    if (!_0x7f3d49) return _0x3ed4eb.sendMessage(_0x7d2dcb, {
      text: "╭─⌈ " + MEDIA.DOLPHIN + " *DOLPHIN AI* ⌋\n├─⊷ *" + _0x4e915a + "dolphin <question>*\n│  └⊷ Dolphin uncensored AI\n╰⊷ " + getFooter(_0x4ac695.key.participant || _0x4ac695.key.remoteJid)
    }, {
      quoted: _0x4ac695
    });
    try {
      await _0x3ed4eb.sendMessage(_0x7d2dcb, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x4ac695.key
        }
      });
      let _0x5457c8 = await callAI("dolphin", _0x7f3d49);
      if (_0x5457c8.length > 4000) _0x5457c8 = _0x5457c8.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x3ed4eb.sendMessage(_0x7d2dcb, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x4ac695.key
        }
      }), await _0x3ed4eb.sendMessage(_0x7d2dcb, {
        text: MEDIA.DOLPHIN + " *DOLPHIN AI*\n━━━━━━━━━━━━━━━━━\n" + _0x5457c8 + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x4ac695.key.participant || _0x4ac695.key.remoteJid)
      }, {
        quoted: _0x4ac695
      }));
    } catch (_0x376812) {
      (console.error('[DOLPHIN]\x20Error:', _0x376812.message), await _0x3ed4eb.sendMessage(_0x7d2dcb, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x4ac695.key
        }
      }), await _0x3ed4eb.sendMessage(_0x7d2dcb, {
        text: STATUS.ERROR + " *dolphin AI Error*\n\n" + _0x376812.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x4ac695
      }));
    }
  }
};
