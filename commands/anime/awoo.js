import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x28b4d3 from 'node-fetch';
export default {
  name: "awoo",
  alias: ["howl"],
  desc: "Anime awoo / wolf howl reaction",
  category: 'Anime',
  usage: ".awoo",
  async execute(_0x2e7d1e, _0xfccc8b) {
    try {
      const _0x222e91 = _0xfccc8b.key.remoteJid, _0x2d3136 = await _0x28b4d3("https://api.waifu.pics/sfw/awoo"), _0x2a28ba = await _0x2d3136.json();
      if (!_0x2a28ba?.url) return _0x2e7d1e.sendMessage(_0x222e91, {
        text: ANIME.U274C + '\x20Failed\x20to\x20fetch\x20awoo\x20reaction.'
      }, {
        quoted: _0xfccc8b
      });
      (await _0x2e7d1e.sendMessage(_0x222e91, {
        react: {
          text: STATUS.SUCCESS,
          key: _0xfccc8b.key
        }
      }), await _0x2e7d1e.sendMessage(_0x222e91, {
        image: {
          url: _0x2a28ba.url
        },
        caption: ANIME.U1F43A + " *AWOO!* " + ANIME.U1F43A + "\nThe wolf answers the moon " + ANIME.U1F319 + ANIME.U2728
      }, {
        quoted: _0xfccc8b
      }));
    } catch (_0x56b310) {
      (await _0x2e7d1e.sendMessage(_0xfccc8b.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0xfccc8b.key
        }
      }), console.error("Awoo command error:", _0x56b310), await _0x2e7d1e.sendMessage(_0xfccc8b.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while howling."
      }, {
        quoted: _0xfccc8b
      }));
    }
  }
};
