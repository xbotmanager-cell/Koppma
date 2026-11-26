import {randomUUID} from 'crypto';
import {downloadMediaMessage, generateWAMessageFromContent, normalizeMessageContent} from 'wolfsocket';
import _0x30e46b from 'node-webpmux';
import {STATUS} from '../../lib/emojis.js';
import {getFooter} from '../../lib/menuHelper.js';
export function renamePack(_0x385421, _0x7a7c33) {
  const {contextInfo: _0x5a3092, ..._0x2e2ed7} = _0x385421;
  return {
    ..._0x2e2ed7,
    name: _0x7a7c33,
    stickerPackId: randomUUID()
  };
}
export async function renameSticker(_0xa2afe2, _0x106de0, _0x9f7a6b) {
  const _0x296140 = new _0x30e46b.Image();
  await _0x296140.load(_0xa2afe2);
  const _0x1e7da = Buffer.from(JSON.stringify({
    'sticker-pack-id': randomUUID(),
    'sticker-pack-name': _0x106de0,
    'sticker-pack-publisher': _0x9f7a6b,
    emojis: []
  }), "utf8"), _0x2775c5 = Buffer.from([73, 73, 42, 0, 8, 0, 0, 0, 1, 0, 65, 87, 7, 0, 0, 0, 0, 0, 22, 0, 0, 0]);
  return (_0x2775c5.writeUInt32LE(_0x1e7da.length, 14), _0x296140.exif = Buffer.concat([_0x2775c5, _0x1e7da]), _0x296140.save(null));
}
export default {
  name: "takepack",
  aliases: ["renamepack"],
  description: "Rename a shared sticker pack or sticker",
  category: 'converter',
  usage: "takepack <pack name> (reply to a sticker pack or sticker)",
  async execute(_0x3809a4, _0x2cb9f3, _0x4f7c4d, _0x15abf0 = '.') {
    const _0xe2a97b = _0x2cb9f3.key.remoteJid, _0x30b23c = normalizeMessageContent(_0x2cb9f3.message), _0x16fd0f = Object.values(_0x30b23c || ({})).find(_0x77e1a6 => _0x77e1a6?.contextInfo)?.contextInfo, _0x4b5f44 = normalizeMessageContent(_0x16fd0f?.quotedMessage || _0x2cb9f3.quoted?.message), _0x5b62da = _0x4b5f44?.stickerPackMessage, _0x243bee = _0x4b5f44?.stickerMessage, _0x1e4721 = _0x4f7c4d.join('\x20').trim(), _0xc02f78 = _0x4e3102 => _0x3809a4.sendMessage(_0xe2a97b, {
      text: _0x4e3102
    }, {
      quoted: _0x2cb9f3
    });
    if (!_0x1e4721 || !_0x5b62da && !_0x243bee || ['help', '-h', "--help"].includes(_0x1e4721.toLowerCase())) return _0xc02f78("╭┄〔 📦 *TAKE PACK* 〕┄╮\n┆\n┆ ✦ *" + _0x15abf0 + 'takepack\x20<pack\x20name>*\x0a┆\x20\x20╰┄\x20Rename\x20a\x20sticker\x20pack\x20or\x20sticker\x0a┆ ✦\x20*' + _0x15abf0 + "takepack VIPBOT*\n┆  ╰┄ Set the pack name to VIPBOT\n┆ ✦ Reply to a pack or sticker and send the command\n┆\n╰┄ " + getFooter(_0x2cb9f3.key.participant || _0xe2a97b));
    if (_0x1e4721.length > 64) return _0xc02f78(STATUS.ERROR + " Keep the pack name to 64 characters or fewer.");
    try {
      await _0x3809a4.sendMessage(_0xe2a97b, {
        react: {
          text: STATUS.LOADING,
          key: _0x2cb9f3.key
        }
      });
      if (_0x5b62da) {
        const _0x6b4cc2 = generateWAMessageFromContent(_0xe2a97b, {
          stickerPackMessage: renamePack(_0x5b62da, _0x1e4721)
        }, {
          userJid: _0x3809a4.user.id,
          quoted: _0x2cb9f3
        });
        await _0x3809a4.relayMessage(_0xe2a97b, _0x6b4cc2.message, {
          messageId: _0x6b4cc2.key.id
        });
      } else {
        const _0xf535e7 = {
          key: _0x2cb9f3.quoted?.key || ({
            remoteJid: _0xe2a97b,
            id: _0x16fd0f?.stanzaId,
            participant: _0x16fd0f?.participant
          }),
          message: {
            stickerMessage: _0x243bee
          }
        }, _0x22be13 = await downloadMediaMessage(_0xf535e7, 'buffer', {}, {
          logger: _0x3809a4.logger || console,
          reuploadRequest: _0x3809a4.updateMediaMessage?.bind(_0x3809a4)
        }), _0x4be3b4 = await renameSticker(_0x22be13, _0x1e4721, _0x2cb9f3.pushName || "VIPBOT");
        await _0x3809a4.sendMessage(_0xe2a97b, {
          sticker: _0x4be3b4,
          isAnimated: _0x243bee.isAnimated === true
        }, {
          quoted: _0x2cb9f3
        });
      }
      await _0x3809a4.sendMessage(_0xe2a97b, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x2cb9f3.key
        }
      });
    } catch (_0x954203) {
      return (console.error("[TAKEPACK]", _0x954203.message), await _0x3809a4.sendMessage(_0xe2a97b, {
        react: {
          text: STATUS.ERROR,
          key: _0x2cb9f3.key
        }
      }).catch(() => {}), _0xc02f78(STATUS.ERROR + " Could not rename this pack or sticker. Try sharing it again and replying to the new message."));
    }
  }
};
