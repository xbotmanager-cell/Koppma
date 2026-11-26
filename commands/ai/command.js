import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "command",
  description: "Cohere Command model",
  category: 'ai',
  aliases: ["commandai", "commandr", "cmd"],
  usage: 'command\x20[question]',
  async execute(_0x27a632, _0xcfc69a, _0x5b55af, _0x39a51c) {
    const _0x36079c = _0xcfc69a.key.remoteJid;
    let _0x4fba99 = _0x5b55af.length > 0 ? _0x5b55af.join('\x20') : _0xcfc69a.quoted?.text || '';
    if (!_0x4fba99) return _0x27a632.sendMessage(_0x36079c, {
      text: "╭┄〔 " + UI.TARGET + " *COMMAND AI* 〕┄╮\n┆ ✦ *" + _0x39a51c + "command <question>*\n┆   └─ Cohere Command model\n╰┄ " + getFooter(_0xcfc69a.key.participant || _0xcfc69a.key.remoteJid)
    }, {
      quoted: _0xcfc69a
    });
    try {
      await _0x27a632.sendMessage(_0x36079c, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0xcfc69a.key
        }
      });
      let _0x1404d4 = await callAI("command", _0x4fba99);
      if (_0x1404d4.length > 4000) _0x1404d4 = _0x1404d4.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x27a632.sendMessage(_0x36079c, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0xcfc69a.key
        }
      }), await _0x27a632.sendMessage(_0x36079c, {
        text: UI.TARGET + " *COMMAND AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x1404d4 + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + getFooter(_0xcfc69a.key.participant || _0xcfc69a.key.remoteJid)
      }, {
        quoted: _0xcfc69a
      }));
    } catch (_0x39273c) {
      (console.error('[COMMAND]\x20Error:', _0x39273c.message), await _0x27a632.sendMessage(_0x36079c, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0xcfc69a.key
        }
      }), await _0x27a632.sendMessage(_0x36079c, {
        text: STATUS.ERROR + " *command AI Error*\n\n" + _0x39273c.message + "\n\nPlease try again later."
      }, {
        quoted: _0xcfc69a
      }));
    }
  }
};
