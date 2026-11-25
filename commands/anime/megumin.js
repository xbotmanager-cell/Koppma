import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x5707d9 from 'node-fetch';
export default {
  name: "megumin",
  alias: ['explosion'],
  desc: 'Get\x20a\x20random\x20Megumin\x20anime\x20image',
  category: 'Anime',
  usage: ".megumin",
  async execute(_0x37d5a5, _0x13767) {
    try {
      const _0x5a858d = _0x13767.key.remoteJid, _0x52c919 = await _0x5707d9("https://api.waifu.pics/sfw/megumin"), _0xcca9de = await _0x52c919.json();
      if (!_0xcca9de || !_0xcca9de.url) return _0x37d5a5.sendMessage(_0x5a858d, {
        text: ANIME.U274C + " Failed to fetch Megumin image."
      }, {
        quoted: _0x13767
      });
      (await _0x37d5a5.sendMessage(_0x5a858d, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x13767.key
        }
      }), await _0x37d5a5.sendMessage(_0x5a858d, {
        image: {
          url: _0xcca9de.url
        },
        caption: ANIME.U1F4A5 + " *MEGUMIN* " + ANIME.U1F4A5 + "\nExplosion magic activated! " + ANIME.U1F525 + ANIME.U1F43A
      }, {
        quoted: _0x13767
      }));
    } catch (_0x2cc86d) {
      (console.error("Megumin command error:", _0x2cc86d), await _0x37d5a5.sendMessage(jid, {
        react: {
          text: STATUS.ERROR,
          key: _0x13767.key
        }
      }), await _0x37d5a5.sendMessage(_0x13767.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while fetching Megumin."
      }, {
        quoted: _0x13767
      }));
    }
  }
};
