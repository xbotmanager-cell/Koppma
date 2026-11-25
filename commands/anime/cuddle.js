import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x78d2f0 from 'node-fetch';
export default {
  name: "cuddle",
  alias: ["snuggle"],
  desc: 'Cuddle\x20someone\x20with\x20an\x20anime\x20reaction',
  category: "Anime",
  usage: ".cuddle @user",
  async execute(_0x1f3364, _0x2e533e) {
    try {
      const _0x572621 = _0x2e533e.key.remoteJid, _0x45894c = _0x2e533e.key.participant || _0x572621, _0xfc77e7 = _0x2e533e.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x74b162 = _0xfc77e7[0] || _0x45894c, _0x3ca26d = await _0x78d2f0("https://api.waifu.pics/sfw/cuddle"), _0x5a091e = await _0x3ca26d.json();
      if (!_0x5a091e?.url) return _0x1f3364.sendMessage(_0x572621, {
        text: ANIME.U274C + " Failed to fetch cuddle reaction."
      }, {
        quoted: _0x2e533e
      });
      const _0x47c9b9 = ANIME.U1F917 + " *CUDDLES* " + ANIME.U1F917 + '\x0a@' + _0x74b162.split('@')[0] + '\x20gets\x20a\x20warm\x20cuddle\x20' + ANIME.U1F43A + ANIME.U2764_FE0F;
      (await _0x1f3364.sendMessage(_0x572621, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x2e533e.key
        }
      }), await _0x1f3364.sendMessage(_0x572621, {
        image: {
          url: _0x5a091e.url
        },
        caption: _0x47c9b9,
        mentions: [_0x74b162]
      }, {
        quoted: _0x2e533e
      }));
    } catch (_0x1003fc) {
      (await _0x1f3364.sendMessage(_0x2e533e.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x2e533e.key
        }
      }), console.error("Cuddle command error:", _0x1003fc), await _0x1f3364.sendMessage(_0x2e533e.key.remoteJid, {
        text: ANIME.U26A0_FE0F + '\x20An\x20error\x20occurred\x20while\x20cuddling.'
      }, {
        quoted: _0x2e533e
      }));
    }
  }
};
