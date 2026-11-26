import {downloadMediaMessage} from 'wolfsocket';
import _0x30a783 from 'node-webpmux';
import {GROUP} from '../../lib/emojis.js';
import {getFooter} from '../../lib/menuHelper.js';
const PREMIUM_METADATA = {
  'sticker-pack-id': "vipbot-premium",
  'sticker-pack-name': "VIPBOT Premium",
  'sticker-pack-publisher': "Lupin Stanley",
  emojis: ['💎'],
  'is-premium-sticker': 1
};
function createExif(_0x5114b1) {
  const _0x5a2910 = Buffer.from(JSON.stringify(_0x5114b1), "utf8"), _0xb182fe = Buffer.alloc(22 + _0x5a2910.length);
  return (_0xb182fe.writeUInt32LE(1229531648, 0), _0xb182fe.writeUInt32LE(8, 4), _0xb182fe.writeUInt16LE(1, 8), _0xb182fe.writeUInt16LE(22337, 10), _0xb182fe.writeUInt16LE(7, 12), _0xb182fe.writeUInt32LE(_0x5a2910.length, 14), _0xb182fe.writeUInt32LE(22, 18), _0x5a2910.copy(_0xb182fe, 22), _0xb182fe);
}
export async function makePremiumSticker(_0x15ad7d) {
  const _0x2ca29c = new _0x30a783.Image();
  return (await _0x2ca29c.load(_0x15ad7d), _0x2ca29c.exif = createExif(PREMIUM_METADATA), _0x2ca29c.save(null));
}
export default {
  name: "premium",
  aliases: ["spremium"],
  description: "Transform a normal sticker into a premium WhatsApp sticker",
  category: "converter",
  async execute(_0xc4330e, _0x45c2e8, _0x1199f3, _0x37c83d = '.') {
    const _0x4cd237 = _0x45c2e8.key.remoteJid, _0x59c448 = _0x45c2e8.message?.extendedTextMessage?.contextInfo, _0x156903 = _0x59c448?.quotedMessage, _0x5d6e73 = _0x156903?.stickerMessage || _0x45c2e8.quoted?.message?.stickerMessage;
    if (!_0x5d6e73) return _0xc4330e.sendMessage(_0x4cd237, {
      text: GROUP.WARNING + " *Reply to a sticker first.*\n\n" + ("Reply to any normal sticker with *" + _0x37c83d + "premium* or *" + _0x37c83d + 'spremium*.\x0a\x0a') + ('' + getFooter(_0x45c2e8.key.participant || _0x45c2e8.key.remoteJid))
    }, {
      quoted: _0x45c2e8
    });
    try {
      await _0xc4330e.sendMessage(_0x4cd237, {
        react: {
          text: GROUP.LOADING,
          key: _0x45c2e8.key
        }
      });
      const _0x9c77f6 = _0x45c2e8.quoted ?? ({
        key: {
          remoteJid: _0x4cd237,
          id: _0x59c448?.stanzaId,
          participant: _0x59c448?.participant || _0x45c2e8.key.participant
        },
        message: {
          stickerMessage: _0x5d6e73
        }
      }), _0x3211e6 = await downloadMediaMessage(_0x9c77f6, "buffer", {}, {
        logger: _0xc4330e.logger || console,
        reuploadRequest: typeof _0xc4330e.updateMediaMessage === "function" ? _0x9c54f8 => _0xc4330e.updateMediaMessage(_0x9c54f8) : undefined
      });
      if (!_0x3211e6?.length) throw new Error("The sticker could not be downloaded.");
      const _0x3601d7 = await makePremiumSticker(_0x3211e6);
      (await _0xc4330e.sendMessage(_0x4cd237, {
        sticker: _0x3601d7,
        mimetype: _0x5d6e73.mimetype || "image/webp",
        isAnimated: _0x5d6e73.isAnimated === true,
        width: _0x5d6e73.width || 512,
        height: _0x5d6e73.height || 512
      }), await _0xc4330e.sendMessage(_0x4cd237, {
        react: {
          text: GROUP.SUCCESS,
          key: _0x45c2e8.key
        }
      }));
    } catch (_0x5d1381) {
      return (console.error("[PremiumSticker] Error:", _0x5d1381), await _0xc4330e.sendMessage(_0x4cd237, {
        react: {
          text: GROUP.ERROR,
          key: _0x45c2e8.key
        }
      }).catch(() => {}), _0xc4330e.sendMessage(_0x4cd237, {
        text: GROUP.ERROR + " Failed to create the premium sticker: " + _0x5d1381.message
      }, {
        quoted: _0x45c2e8
      }));
    }
  }
};
