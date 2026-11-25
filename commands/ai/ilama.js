import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {downloadMediaMessage} from 'wolfsocket';
import {vision} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const VISION_MODEL = "meta/llama-3.2-11b-vision-instruct";
export default {
  name: "ilama",
  description: "LLaMA Fast AI — instant responses with optional image analysis",
  category: 'ai',
  aliases: ["llama", "llamaai", "llamafast", "fastllama"],
  usage: "ilama [question] — reply to an image or ask anything",
  async execute(_0x46cd2f, _0x516402, _0x420acd, _0x51b005) {
    const _0x120f8c = _0x516402.key.remoteJid, _0x56d885 = getOwnerName().toUpperCase(), _0xb9d85f = _0x516402.message?.extendedTextMessage?.contextInfo?.quotedMessage, _0x583d95 = _0xb9d85f?.imageMessage, _0x44ad4a = (_0x420acd.join('\x20').match(/\bhttps?:\/\/\S+/i) || [])[0], _0x2db16c = _0x420acd.join('\x20').replace(_0x44ad4a || '', '').trim(), _0x112b9f = !!(_0x583d95 || _0x44ad4a);
    if (!_0x2db16c && !_0x112b9f) return _0x46cd2f.sendMessage(_0x120f8c, {
      text: "╭─⌈ " + MEDIA.LLAMA + " *LLAMA FAST AI* ⌋\n├─⊷ *" + _0x51b005 + "ilama <question>*\n│  └⊷ Fast LLaMA AI — reply to image or ask anything\n╰⊷ " + getFooter(_0x516402.key.participant || _0x516402.key.remoteJid)
    }, {
      quoted: _0x516402
    });
    await _0x46cd2f.sendMessage(_0x120f8c, {
      react: {
        text: '' + STATUS.LOADING,
        key: _0x516402.key
      }
    });
    try {
      let _0x23ba18;
      if (_0x112b9f) {
        let _0xce3994;
        if (_0x583d95) {
          const _0x32cf0a = await downloadMediaMessage({
            key: _0x516402.key,
            message: _0xb9d85f
          }, "buffer", {}, {
            reuploadRequest: _0x46cd2f.updateMediaMessage,
            logger: console
          });
          if (!_0x32cf0a || _0x32cf0a.length === 0) throw new Error("Could not download image from WhatsApp");
          _0xce3994 = _0x32cf0a;
        } else _0xce3994 = _0x44ad4a;
        _0x23ba18 = await vision(_0x2db16c || "Analyze this image and describe what you see in detail", _0xce3994, {
          model: VISION_MODEL,
          maxTokens: 1024,
          timeoutMs: 60000
        });
      } else _0x23ba18 = await callAI("llama", _0x2db16c);
      if (_0x23ba18.length > 4000) _0x23ba18 = _0x23ba18.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x46cd2f.sendMessage(_0x120f8c, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x516402.key
        }
      }), await _0x46cd2f.sendMessage(_0x120f8c, {
        text: MEDIA.LLAMA + " *LLAMA FAST AI*\n━━━━━━━━━━━━━━━━━\n" + _0x23ba18 + "\n━━━━━━━━━━━━━━━━━\n" + getFooter(_0x516402.key.participant || _0x516402.key.remoteJid)
      }, {
        quoted: _0x516402
      }));
    } catch (_0x365778) {
      (console.error('[ILAMA]\x20Error:', _0x365778.message), await _0x46cd2f.sendMessage(_0x120f8c, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x516402.key
        }
      }), await _0x46cd2f.sendMessage(_0x120f8c, {
        text: STATUS.ERROR + '\x20*LLaMA\x20Fast\x20Error*\x0a\x0a' + _0x365778.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x516402
      }));
    }
  }
};
