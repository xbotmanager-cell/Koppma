import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x42f924 from 'node-fetch';
export default {
  name: "cry",
  alias: ["sad"],
  desc: "Anime crying reaction",
  category: 'Anime',
  usage: ".cry",
  async execute(_0x4d9d76, _0x390cd5) {
    try {
      const _0x527448 = _0x390cd5.key.remoteJid, _0x361c95 = await _0x42f924("https://api.waifu.pics/sfw/cry"), _0x2d1b6d = await _0x361c95.json();
      if (!_0x2d1b6d?.url) return _0x4d9d76.sendMessage(_0x527448, {
        text: ANIME.U274C + '\x20Failed\x20to\x20fetch\x20cry\x20reaction.'
      }, {
        quoted: _0x390cd5
      });
      (await _0x4d9d76.sendMessage(_0x527448, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x390cd5.key
        }
      }), await _0x4d9d76.sendMessage(_0x527448, {
        image: {
          url: _0x2d1b6d.url
        },
        caption: ANIME.U1F622 + " *CRY* " + ANIME.U1F622 + "\nSometimes even wolves feel sad… " + ANIME.U1F43A + ANIME.U1F494
      }, {
        quoted: _0x390cd5
      }));
    } catch (_0x5f56bc) {
      (await _0x4d9d76.sendMessage(_0x390cd5.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x390cd5.key
        }
      }), console.error("Cry command error:", _0x5f56bc), await _0x4d9d76.sendMessage(_0x390cd5.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while crying."
      }, {
        quoted: _0x390cd5
      }));
    }
  }
};
