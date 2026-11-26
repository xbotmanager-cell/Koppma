import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {chat} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "gemma",
  description: "Gemma 2 (2B) — small & fast Google model via NVIDIA NIM",
  category: 'ai',
  aliases: ["gemmaai", "g2b"],
  usage: "gemma [question]",
  async execute(_0x547c77, _0x573df7, _0x18bffa, _0x8d9c1f) {
    const _0x312a0f = _0x573df7.key.remoteJid, _0x4e99b9 = getOwnerName().toUpperCase();
    let _0x502332 = _0x18bffa.length > 0 ? _0x18bffa.join('\x20') : _0x573df7.quoted?.text || '';
    if (!_0x502332) return _0x547c77.sendMessage(_0x312a0f, {
      text: "╭┄〔 " + STATUS.SPARKLE + " *GEMMA 2 (2B)* 〕┄╮\n" + ("┆ ✦ *" + _0x8d9c1f + "gemma <question>*\n") + "┆   └─ Google Gemma 2 — small, fast, sharp\n" + ('╰┄ \x20' + getFooter(_0x573df7.key.participant || _0x573df7.key.remoteJid))
    }, {
      quoted: _0x573df7
    });
    try {
      await _0x547c77.sendMessage(_0x312a0f, {
        react: {
          text: '' + STATUS.SPARKLE,
          key: _0x573df7.key
        }
      });
      let _0x3e1587 = await chat(_0x502332, {
        model: 'google/gemma-2-2b-it',
        system: "You are Gemma, a friendly and concise AI assistant. Answer accurately and briefly.",
        temperature: 0.7,
        topP: 0.95,
        maxTokens: 1024,
        timeoutMs: 45000
      });
      if (_0x3e1587.length > 4000) _0x3e1587 = _0x3e1587.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x547c77.sendMessage(_0x312a0f, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x573df7.key
        }
      }), await _0x547c77.sendMessage(_0x312a0f, {
        text: STATUS.SPARKLE + '\x20*GEMMA\x202\x20(2B)*\x0a' + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + (_0x3e1587 + '\x0a') + '┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + ('' + getFooter(_0x573df7.key.participant || _0x573df7.key.remoteJid))
      }, {
        quoted: _0x573df7
      }));
    } catch (_0x53940a) {
      (console.error("[GEMMA] Error:", _0x53940a.message), await _0x547c77.sendMessage(_0x312a0f, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x573df7.key
        }
      }), await _0x547c77.sendMessage(_0x312a0f, {
        text: STATUS.ERROR + " *Gemma AI Error*\n\n" + _0x53940a.message + "\n\nPlease try again later."
      }, {
        quoted: _0x573df7
      }));
    }
  }
};
