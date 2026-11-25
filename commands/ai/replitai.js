import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "replitai",
  description: 'Replit\x20code\x20AI\x20assistant',
  category: 'ai',
  aliases: ["rplit", 'repai'],
  usage: "replitai [question]",
  async execute(_0x488ddf, _0x16f56a, _0x1b6f6e, _0x4ad6c2) {
    const _0x566a4d = _0x16f56a.key.remoteJid;
    let _0x39c3e7 = _0x1b6f6e.length > 0 ? _0x1b6f6e.join('\x20') : _0x16f56a.quoted?.text || '';
    if (!_0x39c3e7) return _0x488ddf.sendMessage(_0x566a4d, {
      text: "╭─⌈ " + MEDIA.COMPUTER + " *REPLITAI AI* ⌋\n├─⊷ *" + _0x4ad6c2 + "replitai <question>*\n│  └⊷ Replit code AI assistant\n╰⊷ " + getFooter(_0x16f56a.key.participant || _0x16f56a.key.remoteJid)
    }, {
      quoted: _0x16f56a
    });
    try {
      await _0x488ddf.sendMessage(_0x566a4d, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x16f56a.key
        }
      });
      let _0x2d1407 = await callAI("replit", _0x39c3e7);
      if (_0x2d1407.length > 4000) _0x2d1407 = _0x2d1407.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x488ddf.sendMessage(_0x566a4d, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x16f56a.key
        }
      }), await _0x488ddf.sendMessage(_0x566a4d, {
        text: MEDIA.COMPUTER + " *REPLITAI AI*\n━━━━━━━━━━━━━━━━━\n" + _0x2d1407 + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x16f56a.key.participant || _0x16f56a.key.remoteJid)
      }, {
        quoted: _0x16f56a
      }));
    } catch (_0x38da9a) {
      (console.error('[REPLITAI]\x20Error:', _0x38da9a.message), await _0x488ddf.sendMessage(_0x566a4d, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x16f56a.key
        }
      }), await _0x488ddf.sendMessage(_0x566a4d, {
        text: STATUS.ERROR + " *replitai AI Error*\n\n" + _0x38da9a.message + "\n\nPlease try again later."
      }, {
        quoted: _0x16f56a
      }));
    }
  }
};
