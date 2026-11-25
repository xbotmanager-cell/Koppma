import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x599136 from 'node-fetch';
export default {
  name: "pat",
  alias: ["headpat"],
  desc: "Anime pat / headpat reaction",
  category: "Anime",
  usage: ".pat @user",
  async execute(_0x30fe35, _0x24d040) {
    try {
      const _0x265584 = _0x24d040.key.remoteJid, _0x3e8398 = _0x24d040.key.participant || _0x265584, _0x194329 = _0x24d040.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x46ada3 = _0x194329[0] || _0x3e8398, _0x21659c = await _0x599136("https://api.waifu.pics/sfw/pat"), _0x27a14e = await _0x21659c.json();
      if (!_0x27a14e?.url) return _0x30fe35.sendMessage(_0x265584, {
        text: ANIME.U274C + '\x20Failed\x20to\x20fetch\x20pat\x20reaction.'
      }, {
        quoted: _0x24d040
      });
      const _0x41e082 = ANIME.U1F60A + " *HEADPAT* " + ANIME.U1F60A + '\x0a@' + _0x46ada3.split('@')[0] + '\x20got\x20a\x20cute\x20pat\x20' + ANIME.U1F43A + ANIME.U1F49B;
      (await _0x30fe35.sendMessage(_0x265584, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x24d040.key
        }
      }), await _0x30fe35.sendMessage(_0x265584, {
        image: {
          url: _0x27a14e.url
        },
        caption: _0x41e082,
        mentions: [_0x46ada3]
      }, {
        quoted: _0x24d040
      }));
    } catch (_0x468836) {
      (await _0x30fe35.sendMessage(_0x24d040.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x24d040.key
        }
      }), console.error("Pat command error:", _0x468836), await _0x30fe35.sendMessage(_0x24d040.key.remoteJid, {
        text: ANIME.U26A0_FE0F + '\x20An\x20error\x20occurred\x20while\x20patting.'
      }, {
        quoted: _0x24d040
      }));
    }
  }
};
