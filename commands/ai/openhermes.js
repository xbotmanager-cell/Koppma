import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "openhermes",
  description: "OpenHermes AI model",
  category: 'ai',
  aliases: ["hermes", "hermesai"],
  usage: "openhermes [question]",
  async execute(_0x4ce23b, _0x10a247, _0xce67d1, _0x44f4e8) {
    const _0xc59af2 = _0x10a247.key.remoteJid;
    let _0x2b8ae3 = _0xce67d1.length > 0 ? _0xce67d1.join('\x20') : _0x10a247.quoted?.text || '';
    if (!_0x2b8ae3) return _0x4ce23b.sendMessage(_0xc59af2, {
      text: "╭─⌈ " + UI.LIBRARY + '\x20*OPENHERMES\x20AI*\x20⌋\x0a├─⊷\x20*' + _0x44f4e8 + "openhermes <question>*\n│  └⊷ OpenHermes AI model\n╰⊷ " + getFooter(_0x10a247.key.participant || _0x10a247.key.remoteJid)
    }, {
      quoted: _0x10a247
    });
    try {
      await _0x4ce23b.sendMessage(_0xc59af2, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x10a247.key
        }
      });
      let _0x29d504 = await callAI('openhermes', _0x2b8ae3);
      if (_0x29d504.length > 4000) _0x29d504 = _0x29d504.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x4ce23b.sendMessage(_0xc59af2, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x10a247.key
        }
      }), await _0x4ce23b.sendMessage(_0xc59af2, {
        text: UI.LIBRARY + '\x20*OPENHERMES\x20AI*\x0a━━━━━━━━━━━━━━━━━\x0a' + _0x29d504 + '\x0a━━━━━━━━━━━━━━━━━\x0a' + getFooter(_0x10a247.key.participant || _0x10a247.key.remoteJid)
      }, {
        quoted: _0x10a247
      }));
    } catch (_0x5eb3c1) {
      (console.error('[OPENHERMES]\x20Error:', _0x5eb3c1.message), await _0x4ce23b.sendMessage(_0xc59af2, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x10a247.key
        }
      }), await _0x4ce23b.sendMessage(_0xc59af2, {
        text: STATUS.ERROR + '\x20*openhermes\x20AI\x20Error*\x0a\x0a' + _0x5eb3c1.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x10a247
      }));
    }
  }
};
