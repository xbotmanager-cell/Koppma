import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {chat} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "deepseekv4",
  description: "DeepSeek V4 Flash — fast frontier reasoning via NVIDIA NIM",
  category: 'ai',
  aliases: ["dsv4", "dsflash", "v4flash"],
  usage: "deepseekv4 [question]",
  async execute(_0x21dbd6, _0x5bdef1, _0x118cc7, _0x1e99a4) {
    const _0x1d6c89 = _0x5bdef1.key.remoteJid, _0x1284e1 = getOwnerName().toUpperCase();
    let _0x3a0674 = _0x118cc7.length > 0 ? _0x118cc7.join('\x20') : _0x5bdef1.quoted?.text || '';
    if (!_0x3a0674) return _0x21dbd6.sendMessage(_0x1d6c89, {
      text: "╭┄〔 " + UI.BRAIN + '\x20*DEEPSEEK\x20V4\x20FLASH*\x20 〕┄╮\x0a' + ("┆ ✦ *" + _0x1e99a4 + 'deepseekv4\x20<question>*\x0a') + "┆   └─ Fast frontier reasoning model\n" + ("╰┄ " + getFooter(_0x5bdef1.key.participant || _0x5bdef1.key.remoteJid))
    }, {
      quoted: _0x5bdef1
    });
    try {
      await _0x21dbd6.sendMessage(_0x1d6c89, {
        react: {
          text: '' + UI.BRAIN,
          key: _0x5bdef1.key
        }
      });
      let _0x4f5ea9 = await chat(_0x3a0674, {
        model: 'deepseek-ai/deepseek-v4-flash',
        system: "You are DeepSeek V4 Flash, a sharp and concise reasoning assistant. Answer accurately and clearly.",
        temperature: 0.6,
        topP: 0.95,
        maxTokens: 2048,
        timeoutMs: 90000
      });
      _0x4f5ea9 = _0x4f5ea9.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      if (_0x4f5ea9.length > 4000) _0x4f5ea9 = _0x4f5ea9.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x21dbd6.sendMessage(_0x1d6c89, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x5bdef1.key
        }
      }), await _0x21dbd6.sendMessage(_0x1d6c89, {
        text: UI.BRAIN + '\x20*DEEPSEEK\x20V4\x20FLASH*\x0a' + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + (_0x4f5ea9 + '\x0a') + '┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + ('' + getFooter(_0x5bdef1.key.participant || _0x5bdef1.key.remoteJid))
      }, {
        quoted: _0x5bdef1
      }));
    } catch (_0x5b5247) {
      (console.error("[DEEPSEEKV4] Error:", _0x5b5247.message), await _0x21dbd6.sendMessage(_0x1d6c89, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x5bdef1.key
        }
      }), await _0x21dbd6.sendMessage(_0x1d6c89, {
        text: STATUS.ERROR + " *DeepSeek V4 Error*\n\n" + _0x5b5247.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x5bdef1
      }));
    }
  }
};
