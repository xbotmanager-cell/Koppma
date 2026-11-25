import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "falcon",
  description: "Falcon open-source LLM",
  category: 'ai',
  aliases: ['falconai', "falcon40b"],
  usage: "falcon [question]",
  async execute(_0x4160a0, _0xb9aa79, _0x3d103f, _0x10e7a8) {
    const _0x1c74a4 = _0xb9aa79.key.remoteJid;
    let _0x5169ce = _0x3d103f.length > 0 ? _0x3d103f.join('\x20') : _0xb9aa79.quoted?.text || '';
    if (!_0x5169ce) return _0x4160a0.sendMessage(_0x1c74a4, {
      text: "╭─⌈ " + MEDIA.EAGLE + '\x20*FALCON\x20AI*\x20⌋\x0a├─⊷\x20*' + _0x10e7a8 + 'falcon\x20<question>*\x0a│\x20\x20└⊷\x20Falcon\x20open-source\x20LLM\x0a╰⊷\x20' + getFooter(_0xb9aa79.key.participant || _0xb9aa79.key.remoteJid)
    }, {
      quoted: _0xb9aa79
    });
    try {
      await _0x4160a0.sendMessage(_0x1c74a4, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0xb9aa79.key
        }
      });
      let _0x210d72 = await callAI("falcon", _0x5169ce);
      if (_0x210d72.length > 4000) _0x210d72 = _0x210d72.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x4160a0.sendMessage(_0x1c74a4, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0xb9aa79.key
        }
      }), await _0x4160a0.sendMessage(_0x1c74a4, {
        text: MEDIA.EAGLE + " *FALCON AI*\n━━━━━━━━━━━━━━━━━\n" + _0x210d72 + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0xb9aa79.key.participant || _0xb9aa79.key.remoteJid)
      }, {
        quoted: _0xb9aa79
      }));
    } catch (_0x159507) {
      (console.error('[FALCON]\x20Error:', _0x159507.message), await _0x4160a0.sendMessage(_0x1c74a4, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0xb9aa79.key
        }
      }), await _0x4160a0.sendMessage(_0x1c74a4, {
        text: STATUS.ERROR + '\x20*falcon\x20AI\x20Error*\x0a\x0a' + _0x159507.message + "\n\nPlease try again later."
      }, {
        quoted: _0xb9aa79
      }));
    }
  }
};
