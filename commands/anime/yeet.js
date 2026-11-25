import {ANIME, STATUS} from '../../lib/emojis.js';
import _0xd42bab from 'node-fetch';
export default {
  name: 'yeet',
  alias: ['throw'],
  desc: 'Anime\x20yeet\x20/\x20throw\x20reaction',
  category: 'Anime',
  usage: ".yeet @user",
  async execute(_0x4ae643, _0x39a369) {
    try {
      const _0x1bf482 = _0x39a369.key.remoteJid, _0xf95313 = _0x39a369.key.participant || _0x1bf482, _0x9579a8 = _0x39a369.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x4d653b = _0x9579a8[0] || _0xf95313, _0x25349c = await _0xd42bab("https://api.waifu.pics/sfw/yeet"), _0x37f712 = await _0x25349c.json();
      if (!_0x37f712?.url) return _0x4ae643.sendMessage(_0x1bf482, {
        text: ANIME.U274C + " Failed to fetch yeet reaction."
      }, {
        quoted: _0x39a369
      });
      const _0x4079a3 = ANIME.U1F4A8 + " *YEET!* " + ANIME.U1F4A8 + '\x0a@' + _0x4d653b.split('@')[0] + " got yeeted! " + ANIME.U1F43A + ANIME.U1F680;
      (await _0x4ae643.sendMessage(_0x1bf482, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x39a369.key
        }
      }), await _0x4ae643.sendMessage(_0x1bf482, {
        image: {
          url: _0x37f712.url
        },
        caption: _0x4079a3,
        mentions: [_0x4d653b]
      }, {
        quoted: _0x39a369
      }));
    } catch (_0xf02827) {
      (await _0x4ae643.sendMessage(_0x39a369.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x39a369.key
        }
      }), console.error("Yeet command error:", _0xf02827), await _0x4ae643.sendMessage(_0x39a369.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while yeeting."
      }, {
        quoted: _0x39a369
      }));
    }
  }
};
