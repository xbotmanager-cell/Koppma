import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {chat} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'kimi',
  description: 'Kimi\x20K2\x20Thinking\x20—\x20reasoning\x20model\x20by\x20Moonshot\x20AI\x20(via\x20NVIDIA\x20NIM)',
  category: 'ai',
  aliases: ["kimiai", 'k2'],
  usage: "kimi [question]",
  async execute(_0x4f2c27, _0x2bfc9f, _0x11b12f, _0x44190d) {
    const _0x46fbed = _0x2bfc9f.key.remoteJid, _0x275f67 = getOwnerName().toUpperCase();
    let _0xf8c723 = _0x11b12f.length > 0 ? _0x11b12f.join('\x20') : _0x2bfc9f.quoted?.text || '';
    if (!_0xf8c723) return _0x4f2c27.sendMessage(_0x46fbed, {
      text: "╭┄〔 " + UI.BRAIN + " *KIMI K2 THINKING* 〕┄╮\n" + ("┆ ✦ *" + _0x44190d + "kimi <question>*\n") + "┆   └─ Moonshot AI reasoning model via NVIDIA\n" + ("╰┄ " + getFooter(_0x2bfc9f.key.participant || _0x2bfc9f.key.remoteJid))
    }, {
      quoted: _0x2bfc9f
    });
    try {
      await _0x4f2c27.sendMessage(_0x46fbed, {
        react: {
          text: '' + UI.BRAIN,
          key: _0x2bfc9f.key
        }
      });
      let _0x474ff1 = await chat(_0xf8c723, {
        model: 'moonshotai/kimi-k2-thinking',
        system: "You are Kimi, a thoughtful and helpful AI assistant. Think carefully, then give a clear, concise final answer.",
        temperature: 0.6,
        topP: 0.95,
        maxTokens: 4096,
        timeoutMs: 120000
      });
      _0x474ff1 = _0x474ff1.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      if (_0x474ff1.length > 4000) _0x474ff1 = _0x474ff1.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x4f2c27.sendMessage(_0x46fbed, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x2bfc9f.key
        }
      }), await _0x4f2c27.sendMessage(_0x46fbed, {
        text: UI.BRAIN + " *KIMI K2 THINKING*\n" + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + (_0x474ff1 + '\x0a') + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + ('' + getFooter(_0x2bfc9f.key.participant || _0x2bfc9f.key.remoteJid))
      }, {
        quoted: _0x2bfc9f
      }));
    } catch (_0x3b7755) {
      (console.error("[KIMI] Error:", _0x3b7755.message), await _0x4f2c27.sendMessage(_0x46fbed, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x2bfc9f.key
        }
      }), await _0x4f2c27.sendMessage(_0x46fbed, {
        text: STATUS.ERROR + '\x20*Kimi\x20AI\x20Error*\x0a\x0a' + _0x3b7755.message + "\n\nPlease try again later."
      }, {
        quoted: _0x2bfc9f
      }));
    }
  }
};
