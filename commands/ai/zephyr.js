import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "zephyr",
  description: 'Zephyr\x20fine-tuned\x20Mistral',
  category: 'ai',
  aliases: ["zephyrai", 'zeph'],
  usage: "zephyr [question]",
  async execute(_0x50962c, _0x4546b7, _0xec8af9, _0x13ea96) {
    const _0x3cc0d7 = _0x4546b7.key.remoteJid;
    let _0x3e56dc = _0xec8af9.length > 0 ? _0xec8af9.join('\x20') : _0x4546b7.quoted?.text || '';
    if (!_0x3e56dc) return _0x50962c.sendMessage(_0x3cc0d7, {
      text: "╭┄〔 " + UI.WIND + " *ZEPHYR AI* 〕┄╮\n┆ ✦ *" + _0x13ea96 + "zephyr <question>*\n┆   └─ Zephyr fine-tuned Mistral\n╰┄ " + getFooter(_0x4546b7.key.participant || _0x4546b7.key.remoteJid)
    }, {
      quoted: _0x4546b7
    });
    try {
      await _0x50962c.sendMessage(_0x3cc0d7, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x4546b7.key
        }
      });
      let _0x4f2f74 = await callAI("zephyr", _0x3e56dc);
      if (_0x4f2f74.length > 4000) _0x4f2f74 = _0x4f2f74.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x50962c.sendMessage(_0x3cc0d7, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x4546b7.key
        }
      }), await _0x50962c.sendMessage(_0x3cc0d7, {
        text: UI.WIND + " *ZEPHYR AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x4f2f74 + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + getFooter(_0x4546b7.key.participant || _0x4546b7.key.remoteJid)
      }, {
        quoted: _0x4546b7
      }));
    } catch (_0x423abf) {
      (console.error('[ZEPHYR]\x20Error:', _0x423abf.message), await _0x50962c.sendMessage(_0x3cc0d7, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x4546b7.key
        }
      }), await _0x50962c.sendMessage(_0x3cc0d7, {
        text: STATUS.ERROR + " *zephyr AI Error*\n\n" + _0x423abf.message + "\n\nPlease try again later."
      }, {
        quoted: _0x4546b7
      }));
    }
  }
};
