import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "wizard",
  description: "WizardLM instruction model",
  category: 'ai',
  aliases: ["wizardlm", "wiz"],
  usage: "wizard [question]",
  async execute(_0x5cde0f, _0x42f1fe, _0x1a9de7, _0x24e580) {
    const _0xde0275 = _0x42f1fe.key.remoteJid;
    let _0x5d2138 = _0x1a9de7.length > 0 ? _0x1a9de7.join('\x20') : _0x42f1fe.quoted?.text || '';
    if (!_0x5d2138) return _0x5cde0f.sendMessage(_0xde0275, {
      text: '╭┄〔 \x20' + UI.WIZARD + " *WIZARD AI* 〕┄╮\n┆ ✦ *" + _0x24e580 + 'wizard\x20<question>*\x0a┆ \x20╰┄ \x20WizardLM\x20instruction\x20model\x0a╰┄ \x20' + getFooter(_0x42f1fe.key.participant || _0x42f1fe.key.remoteJid)
    }, {
      quoted: _0x42f1fe
    });
    try {
      await _0x5cde0f.sendMessage(_0xde0275, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x42f1fe.key
        }
      });
      let _0x2e0548 = await callAI('wizard', _0x5d2138);
      if (_0x2e0548.length > 4000) _0x2e0548 = _0x2e0548.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x5cde0f.sendMessage(_0xde0275, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x42f1fe.key
        }
      }), await _0x5cde0f.sendMessage(_0xde0275, {
        text: UI.WIZARD + " *WIZARD AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x2e0548 + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + getFooter(_0x42f1fe.key.participant || _0x42f1fe.key.remoteJid)
      }, {
        quoted: _0x42f1fe
      }));
    } catch (_0x13ddef) {
      (console.error('[WIZARD]\x20Error:', _0x13ddef.message), await _0x5cde0f.sendMessage(_0xde0275, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x42f1fe.key
        }
      }), await _0x5cde0f.sendMessage(_0xde0275, {
        text: STATUS.ERROR + '\x20*wizard\x20AI\x20Error*\x0a\x0a' + _0x13ddef.message + "\n\nPlease try again later."
      }, {
        quoted: _0x42f1fe
      }));
    }
  }
};
