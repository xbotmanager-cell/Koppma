import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x270bc5 from 'node-fetch';
import {getBotName} from '../../lib/botname.js';
export default {
  name: "neko",
  alias: ["nekopic"],
  desc: "Get a random anime neko image",
  category: "Anime",
  usage: ".neko",
  async execute(_0xd500d4, _0x3a92a6) {
    try {
      const _0x1b63e2 = _0x3a92a6.key.remoteJid, _0x469070 = await _0x270bc5("https://api.waifu.pics/sfw/neko"), _0x515e98 = await _0x469070.json();
      if (!_0x515e98 || !_0x515e98.url) return _0xd500d4.sendMessage(_0x1b63e2, {
        text: ANIME.U274C + " Failed to fetch neko image."
      }, {
        quoted: _0x3a92a6
      });
      (await _0xd500d4.sendMessage(_0x1b63e2, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x3a92a6.key
        }
      }), await _0xd500d4.sendMessage(_0x1b63e2, {
        image: {
          url: _0x515e98.url
        },
        caption: ANIME.U1F43A + " *${getBotName()} Neko* " + ANIME.U1F43A + '\x0aHere’s\x20a\x20cute\x20neko\x20for\x20you\x20' + ANIME.U1F63A + ANIME.U2728
      }, {
        quoted: _0x3a92a6
      }));
    } catch (_0x47b4f5) {
      (console.error("Neko command error:", _0x47b4f5), await _0xd500d4.sendMessage(jid, {
        react: {
          text: STATUS.ERROR,
          key: _0x3a92a6.key
        }
      }), await _0xd500d4.sendMessage(_0x3a92a6.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while fetching neko."
      }, {
        quoted: _0x3a92a6
      }));
    }
  }
};
