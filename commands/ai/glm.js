import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {chat} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "glm",
  description: "GLM-4.7 — multilingual agentic coding & reasoning model by Z.ai (via NVIDIA NIM)",
  category: 'ai',
  aliases: ["glmai", "glm4", "zai"],
  usage: "glm [question]",
  async execute(_0x495e07, _0x43db9c, _0x90f005, _0x44a74e) {
    const _0x4b0563 = _0x43db9c.key.remoteJid, _0x2f1d66 = getOwnerName().toUpperCase();
    let _0x26b8b2 = _0x90f005.length > 0 ? _0x90f005.join('\x20') : _0x43db9c.quoted?.text || '';
    if (!_0x26b8b2) return _0x495e07.sendMessage(_0x4b0563, {
      text: '╭─⌈\x20' + SOCIAL.BOT + " *GLM 4.7 AI* ⌋\n" + ('├─⊷\x20*' + _0x44a74e + 'glm\x20<question>*\x0a') + '│\x20\x20└⊷\x20Z.ai\x20GLM-4.7\x20—\x20coding,\x20reasoning,\x20tools\x0a' + ('╰⊷\x20' + getFooter(_0x43db9c.key.participant || _0x43db9c.key.remoteJid))
    }, {
      quoted: _0x43db9c
    });
    try {
      await _0x495e07.sendMessage(_0x4b0563, {
        react: {
          text: '' + SOCIAL.BOT,
          key: _0x43db9c.key
        }
      });
      let _0x546ebd = await chat(_0x26b8b2, {
        model: "z-ai/glm4.7",
        system: "You are GLM-4.7, a helpful, accurate, and concise AI assistant skilled at coding, reasoning, and answering questions clearly.",
        temperature: 0.6,
        topP: 0.95,
        maxTokens: 2048,
        timeoutMs: 180000
      });
      _0x546ebd = _0x546ebd.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      if (_0x546ebd.length > 4000) _0x546ebd = _0x546ebd.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x495e07.sendMessage(_0x4b0563, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x43db9c.key
        }
      }), await _0x495e07.sendMessage(_0x4b0563, {
        text: SOCIAL.BOT + '\x20*GLM\x204.7\x20AI*\x0a' + "━━━━━━━━━━━━━━━━━\n" + (_0x546ebd + '\x0a') + "━━━━━━━━━━━━━━━━━\n" + ('' + getFooter(_0x43db9c.key.participant || _0x43db9c.key.remoteJid))
      }, {
        quoted: _0x43db9c
      }));
    } catch (_0x2516c0) {
      (console.error("[GLM] Error:", _0x2516c0.message), await _0x495e07.sendMessage(_0x4b0563, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x43db9c.key
        }
      }));
      const _0x585117 = _0x2516c0.name === 'AbortError' || (/aborted/i).test(_0x2516c0.message || ''), _0x147900 = _0x585117 ? UI.TIMER + " GLM took too long to respond (model is busy or thinking deeply).\nTry a shorter question or wait a moment and retry." : _0x2516c0.message;
      await _0x495e07.sendMessage(_0x4b0563, {
        text: STATUS.ERROR + " *GLM AI Error*\n\n" + _0x147900
      }, {
        quoted: _0x43db9c
      });
    }
  }
};
