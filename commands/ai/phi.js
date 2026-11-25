import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "phi",
  description: "Microsoft Phi small model",
  category: 'ai',
  aliases: ["phiai", 'phi3', "phi2"],
  usage: "phi [question]",
  async execute(_0x40a400, _0x3dd5fe, _0x4471f8, _0x57328e) {
    const _0x31d53f = _0x3dd5fe.key.remoteJid;
    let _0x3161f9 = _0x4471f8.length > 0 ? _0x4471f8.join('\x20') : _0x3dd5fe.quoted?.text || '';
    if (!_0x3161f9) return _0x40a400.sendMessage(_0x31d53f, {
      text: '╭─⌈\x20' + UI.BLUE_CIRCLE + " *PHI AI* ⌋\n├─⊷ *" + _0x57328e + "phi <question>*\n│  └⊷ Microsoft Phi small model\n╰⊷ " + getFooter(_0x3dd5fe.key.participant || _0x3dd5fe.key.remoteJid)
    }, {
      quoted: _0x3dd5fe
    });
    try {
      await _0x40a400.sendMessage(_0x31d53f, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x3dd5fe.key
        }
      });
      let _0x2cc41a = await callAI('phi', _0x3161f9);
      if (_0x2cc41a.length > 4000) _0x2cc41a = _0x2cc41a.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x40a400.sendMessage(_0x31d53f, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x3dd5fe.key
        }
      }), await _0x40a400.sendMessage(_0x31d53f, {
        text: UI.BLUE_CIRCLE + " *PHI AI*\n━━━━━━━━━━━━━━━━━\n" + _0x2cc41a + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x3dd5fe.key.participant || _0x3dd5fe.key.remoteJid)
      }, {
        quoted: _0x3dd5fe
      }));
    } catch (_0xcb428c) {
      (console.error("[PHI] Error:", _0xcb428c.message), await _0x40a400.sendMessage(_0x31d53f, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x3dd5fe.key
        }
      }), await _0x40a400.sendMessage(_0x31d53f, {
        text: STATUS.ERROR + " *phi AI Error*\n\n" + _0xcb428c.message + "\n\nPlease try again later."
      }, {
        quoted: _0x3dd5fe
      }));
    }
  }
};
