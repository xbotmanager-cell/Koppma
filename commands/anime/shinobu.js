import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x918c2b from 'node-fetch';
export default {
  name: "shinobu",
  alias: ["kochou", "butterfly"],
  desc: "Get a random Shinobu Kochou anime image",
  category: "Anime",
  usage: ".shinobu",
  async execute(_0x3277cc, _0xa5a9e6) {
    try {
      const _0x2dd8f6 = _0xa5a9e6.key.remoteJid, _0x54bfe1 = await _0x918c2b('https://api.waifu.pics/sfw/shinobu'), _0x37212a = await _0x54bfe1.json();
      if (!_0x37212a || !_0x37212a.url) return _0x3277cc.sendMessage(_0x2dd8f6, {
        text: ANIME.U274C + " Failed to fetch Shinobu image."
      }, {
        quoted: _0xa5a9e6
      });
      (await _0x3277cc.sendMessage(_0x2dd8f6, {
        react: {
          text: STATUS.SUCCESS,
          key: _0xa5a9e6.key
        }
      }), await _0x3277cc.sendMessage(_0x2dd8f6, {
        image: {
          url: _0x37212a.url
        },
        caption: ANIME.U1F98B + " *Shinobu Kochou* " + ANIME.U1F98B + "\nGraceful, deadly, and beautiful " + ANIME.U2728 + ANIME.U1F43A
      }, {
        quoted: _0xa5a9e6
      }));
    } catch (_0x572e32) {
      (console.error("Shinobu command error:", _0x572e32), await _0x3277cc.sendMessage(jid, {
        react: {
          text: STATUS.ERROR,
          key: _0xa5a9e6.key
        }
      }), await _0x3277cc.sendMessage(_0xa5a9e6.key.remoteJid, {
        text: ANIME.U26A0_FE0F + '\x20An\x20error\x20occurred\x20while\x20fetching\x20Shinobu.'
      }, {
        quoted: _0xa5a9e6
      }));
    }
  }
};
