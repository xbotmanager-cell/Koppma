import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "qwenai",
  description: "Qwen AI by Alibaba",
  category: 'ai',
  aliases: ["qwen", "alibabai", 'qw', 'qai'],
  usage: 'qwenai\x20[question]',
  async execute(_0x3a8063, _0x36e12c, _0x22ea1e, _0x25d024) {
    const _0x405dc4 = _0x36e12c.key.remoteJid;
    let _0x1c5ce9 = _0x22ea1e.length > 0 ? _0x22ea1e.join('\x20') : _0x36e12c.quoted?.text || '';
    if (!_0x1c5ce9) return _0x3a8063.sendMessage(_0x405dc4, {
      text: "╭─⌈ " + SOCIAL.EARTH + '\x20*QWENAI\x20AI*\x20⌋\x0a├─⊷\x20*' + _0x25d024 + 'qwenai\x20<question>*\x0a│\x20\x20└⊷\x20Qwen\x20AI\x20by\x20Alibaba\x0a╰⊷\x20' + getFooter(_0x36e12c.key.participant || _0x36e12c.key.remoteJid)
    }, {
      quoted: _0x36e12c
    });
    try {
      await _0x3a8063.sendMessage(_0x405dc4, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x36e12c.key
        }
      });
      let _0x4e0540 = await callAI("qwen", _0x1c5ce9);
      if (_0x4e0540.length > 4000) _0x4e0540 = _0x4e0540.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x3a8063.sendMessage(_0x405dc4, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x36e12c.key
        }
      }), await _0x3a8063.sendMessage(_0x405dc4, {
        text: SOCIAL.EARTH + '\x20*QWENAI\x20AI*\x0a━━━━━━━━━━━━━━━━━\x0a' + _0x4e0540 + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x36e12c.key.participant || _0x36e12c.key.remoteJid)
      }, {
        quoted: _0x36e12c
      }));
    } catch (_0x16c810) {
      (console.error("[QWENAI] Error:", _0x16c810.message), await _0x3a8063.sendMessage(_0x405dc4, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x36e12c.key
        }
      }), await _0x3a8063.sendMessage(_0x405dc4, {
        text: STATUS.ERROR + " *qwenai AI Error*\n\n" + _0x16c810.message + "\n\nPlease try again later."
      }, {
        quoted: _0x36e12c
      }));
    }
  }
};
