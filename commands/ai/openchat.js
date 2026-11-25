import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'openchat',
  description: "OpenChat AI model",
  category: 'ai',
  aliases: ["openchatai", 'oc', 'ochat'],
  usage: "openchat [question]",
  async execute(_0x2ebeb8, _0x2d2062, _0x1a5bcd, _0x2eeeaf) {
    const _0x567571 = _0x2d2062.key.remoteJid;
    let _0x281894 = _0x1a5bcd.length > 0 ? _0x1a5bcd.join('\x20') : _0x2d2062.quoted?.text || '';
    if (!_0x281894) return _0x2ebeb8.sendMessage(_0x567571, {
      text: '╭─⌈\x20' + UI.CHAT + '\x20*OPENCHAT\x20AI*\x20⌋\x0a├─⊷\x20*' + _0x2eeeaf + "openchat <question>*\n│  └⊷ OpenChat AI model\n╰⊷ " + getFooter(_0x2d2062.key.participant || _0x2d2062.key.remoteJid)
    }, {
      quoted: _0x2d2062
    });
    try {
      await _0x2ebeb8.sendMessage(_0x567571, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x2d2062.key
        }
      });
      let _0x2173de = await callAI('openchat', _0x281894);
      if (_0x2173de.length > 4000) _0x2173de = _0x2173de.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x2ebeb8.sendMessage(_0x567571, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x2d2062.key
        }
      }), await _0x2ebeb8.sendMessage(_0x567571, {
        text: UI.CHAT + " *OPENCHAT AI*\n━━━━━━━━━━━━━━━━━\n" + _0x2173de + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x2d2062.key.participant || _0x2d2062.key.remoteJid)
      }, {
        quoted: _0x2d2062
      }));
    } catch (_0x36eab7) {
      (console.error("[OPENCHAT] Error:", _0x36eab7.message), await _0x2ebeb8.sendMessage(_0x567571, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x2d2062.key
        }
      }), await _0x2ebeb8.sendMessage(_0x567571, {
        text: STATUS.ERROR + " *openchat AI Error*\n\n" + _0x36eab7.message + "\n\nPlease try again later."
      }, {
        quoted: _0x2d2062
      }));
    }
  }
};
