import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {downloadMediaMessage} from 'wolfsocket';
import {vision} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const MODEL = "meta/llama-3.2-11b-vision-instruct";
export default {
  name: "vision",
  description: 'Analyze\x20images\x20with\x20NVIDIA\x20Llama\x203.2\x20Vision\x20(11B)',
  category: 'ai',
  aliases: ['imgai', "describe", 'whatisthis', "imageai", "nvision", "visualai"],
  usage: 'vision\x20[question]\x20—\x20reply\x20to\x20an\x20image\x20or\x20add\x20a\x20URL',
  async execute(_0xa34222, _0xd3fcad, _0x1eddbe, _0x45f79a) {
    const _0x17a84f = _0xd3fcad.key.remoteJid, _0x4f9558 = getOwnerName().toUpperCase(), _0x415043 = _0xd3fcad.message?.extendedTextMessage?.contextInfo?.quotedMessage, _0x4c705b = _0x415043?.imageMessage, _0x33f6f5 = (_0x1eddbe.join('\x20').match(/\bhttps?:\/\/\S+/i) || [])[0], _0x51865b = _0x1eddbe.join('\x20').replace(_0x33f6f5 || '', '').trim() || "Analyze this image and describe what you see in detail";
    if (!_0x4c705b && !_0x33f6f5) return _0xa34222.sendMessage(_0x17a84f, {
      text: "╭┄〔 " + UI.EYE + '\x20*VISION\x20AI*\x20 〕┄╮\x0a┆ ✦ *' + _0x45f79a + 'vision\x20<question>*\x0a┆ \x20╰┄ \x20Reply\x20to\x20an\x20image\x20or\x20add\x20a\x20URL\x0a╰┄ \x20' + getFooter(_0xd3fcad.key.participant || _0xd3fcad.key.remoteJid)
    }, {
      quoted: _0xd3fcad
    });
    await _0xa34222.sendMessage(_0x17a84f, {
      react: {
        text: '' + STATUS.LOADING,
        key: _0xd3fcad.key
      }
    });
    try {
      let _0xc8a18f;
      if (_0x4c705b) {
        const _0x449245 = await downloadMediaMessage({
          key: _0xd3fcad.key,
          message: _0x415043
        }, "buffer", {}, {
          reuploadRequest: _0xa34222.updateMediaMessage,
          logger: console
        });
        if (!_0x449245 || _0x449245.length === 0) throw new Error("Could not download image from WhatsApp");
        _0xc8a18f = _0x449245;
      } else _0xc8a18f = _0x33f6f5;
      const _0x4af5e7 = await vision(_0x51865b, _0xc8a18f, {
        model: MODEL,
        maxTokens: 2048,
        timeoutMs: 60000
      });
      (await _0xa34222.sendMessage(_0x17a84f, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0xd3fcad.key
        }
      }), await _0xa34222.sendMessage(_0x17a84f, {
        text: UI.EYE + " *VISION AI*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x4af5e7 + '\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + SOCIAL.BOT + '\x20_' + MODEL + '_\x0a' + getFooter(_0xd3fcad.key.participant || _0xd3fcad.key.remoteJid)
      }, {
        quoted: _0xd3fcad
      }));
    } catch (_0x47e000) {
      (console.error("[VISION] Error:", _0x47e000.message), await _0xa34222.sendMessage(_0x17a84f, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0xd3fcad.key
        }
      }), await _0xa34222.sendMessage(_0x17a84f, {
        text: STATUS.ERROR + '\x20*Vision\x20AI\x20Error*\x0a\x0a' + _0x47e000.message + "\n\nPlease try again."
      }, {
        quoted: _0xd3fcad
      }));
    }
  }
};
