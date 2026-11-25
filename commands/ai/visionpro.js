import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {downloadMediaMessage} from 'wolfsocket';
import {vision} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const MODEL = "meta/llama-3.2-90b-vision-instruct";
export default {
  name: 'visionpro',
  description: "Analyze images with NVIDIA Llama 3.2 Vision PRO (90B)",
  category: 'ai',
  aliases: ["vpro", 'imgpro', "nvisionpro", "visualpro", "analyzepro"],
  usage: "visionpro [question] — reply to an image or add a URL",
  async execute(_0x2d3353, _0x34e85c, _0x3ec93f, _0x545973) {
    const _0x83a0fd = _0x34e85c.key.remoteJid, _0x542bc2 = getOwnerName().toUpperCase(), _0x5ae991 = _0x34e85c.message?.extendedTextMessage?.contextInfo?.quotedMessage, _0x109977 = _0x5ae991?.imageMessage, _0x58b6a4 = (_0x3ec93f.join('\x20').match(/\bhttps?:\/\/\S+/i) || [])[0], _0x454110 = _0x3ec93f.join('\x20').replace(_0x58b6a4 || '', '').trim() || "Analyze this image and describe what you see in great detail";
    if (!_0x109977 && !_0x58b6a4) return _0x2d3353.sendMessage(_0x83a0fd, {
      text: "╭─⌈ " + UI.MICROSCOPE + " *VISION PRO AI* ⌋\n├─⊷ *" + _0x545973 + "visionpro <question>*\n│  └⊷ Reply to an image or add a URL\n╰⊷ " + getFooter(_0x34e85c.key.participant || _0x34e85c.key.remoteJid)
    }, {
      quoted: _0x34e85c
    });
    await _0x2d3353.sendMessage(_0x83a0fd, {
      react: {
        text: '' + STATUS.LOADING,
        key: _0x34e85c.key
      }
    });
    try {
      let _0x2f5459;
      if (_0x109977) {
        const _0x348ee0 = await downloadMediaMessage({
          key: _0x34e85c.key,
          message: _0x5ae991
        }, "buffer", {}, {
          reuploadRequest: _0x2d3353.updateMediaMessage,
          logger: console
        });
        if (!_0x348ee0 || _0x348ee0.length === 0) throw new Error('Could\x20not\x20download\x20image\x20from\x20WhatsApp');
        _0x2f5459 = _0x348ee0;
      } else _0x2f5459 = _0x58b6a4;
      const _0x5217d4 = await vision(_0x454110, _0x2f5459, {
        model: MODEL,
        maxTokens: 2048,
        timeoutMs: 90000
      });
      (await _0x2d3353.sendMessage(_0x83a0fd, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x34e85c.key
        }
      }), await _0x2d3353.sendMessage(_0x83a0fd, {
        text: UI.MICROSCOPE + " *VISION PRO AI*\n━━━━━━━━━━━━━━━━━\n" + _0x5217d4 + '\x0a━━━━━━━━━━━━━━━━━\x0a' + SOCIAL.BOT + '\x20_' + MODEL + '_\x0a' + getFooter(_0x34e85c.key.participant || _0x34e85c.key.remoteJid)
      }, {
        quoted: _0x34e85c
      }));
    } catch (_0x1d3579) {
      (console.error("[VISIONPRO] Error:", _0x1d3579.message), await _0x2d3353.sendMessage(_0x83a0fd, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x34e85c.key
        }
      }), await _0x2d3353.sendMessage(_0x83a0fd, {
        text: STATUS.ERROR + " *Vision PRO Error*\n\n" + _0x1d3579.message + "\n\nPlease try again."
      }, {
        quoted: _0x34e85c
      }));
    }
  }
};
