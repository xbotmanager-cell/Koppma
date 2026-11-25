import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x256209 from 'node-fetch';
import {getBotName} from '../../lib/botname.js';
export default {
  name: "waifu",
  alias: ["waifupic"],
  desc: "Get a random anime waifu image",
  category: "Anime",
  usage: ".waifu",
  async execute(_0x55f716, _0x42f8a7) {
    try {
      const _0x528f5b = _0x42f8a7.key.remoteJid, _0x181f29 = await _0x256209("https://api.waifu.pics/sfw/waifu"), _0x3b5d6d = await _0x181f29.json();
      if (!_0x3b5d6d || !_0x3b5d6d.url) return _0x55f716.sendMessage(_0x528f5b, {
        text: ANIME.U274C + " Failed to fetch waifu image."
      }, {
        quoted: _0x42f8a7
      });
      (await _0x55f716.sendMessage(_0x528f5b, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x42f8a7.key
        }
      }), await _0x55f716.sendMessage(_0x528f5b, {
        image: {
          url: _0x3b5d6d.url
        },
        caption: ANIME.U1F43A + " *${getBotName()} Waifu* " + ANIME.U1F43A + '\x0aRandom\x20anime\x20waifu\x20for\x20you\x20' + ANIME.U2728
      }, {
        quoted: _0x42f8a7
      }));
    } catch (_0x2cbe3e) {
      (console.error("Waifu command error:", _0x2cbe3e), await _0x55f716.sendMessage(jid, {
        react: {
          text: STATUS.ERROR,
          key: _0x42f8a7.key
        }
      }), await _0x55f716.sendMessage(_0x42f8a7.key.remoteJid, {
        text: ANIME.U26A0_FE0F + '\x20An\x20error\x20occurred\x20while\x20fetching\x20waifu.'
      }, {
        quoted: _0x42f8a7
      }));
    }
  }
};
