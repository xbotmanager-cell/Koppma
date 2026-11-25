import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: 'bj',
  alias: ['bj', 'head', "oral"],
  desc: "NSFW bj reaction",
  category: 'NSFW',
  usage: '.bj\x20@user',
  nsfw: true,
  async execute(_0x4b3f40, _0x5e7377) {
    try {
      const _0x13151a = _0x5e7377.key.remoteJid, _0x25c7aa = _0x5e7377.key.participant || _0x13151a, _0x24fcf2 = _0x13151a.endsWith("@g.us");
      if (_0x24fcf2) {}
      const _0x3368cb = _0x5e7377.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x3a0a6e = _0x3368cb[0] || _0x25c7aa;
      let _0x2b844c;
      try {
        const _0x4768c9 = await fetch("https://api.waifu.pics/nsfw/blowjob"), _0x4ff5fc = await _0x4768c9.json();
        if (_0x4ff5fc?.url) _0x2b844c = _0x4ff5fc.url; else throw new Error('No\x20URL\x20from\x20waifu.pics');
      } catch (_0x4c2ba0) {
        (await _0x4b3f40.sendMessage(_0x5e7377.key.remoteJid, {
          react: {
            text: STATUS.ERROR,
            key: _0x5e7377.key
          }
        }), console.log("waifu.pics failed, trying alternatives..."));
        try {
          const _0x8c303e = await fetch("https://nekos.life/api/v2/img/bj"), _0xde3214 = await _0x8c303e.json();
          if (_0xde3214?.url) _0x2b844c = _0xde3214.url; else {
            const _0x57e844 = await fetch('https://nekobot.xyz/api/image?type=blowjob'), _0xb58fae = await _0x57e844.json();
            if (_0xb58fae?.success && _0xb58fae?.message) _0x2b844c = _0xb58fae.message; else throw new Error("All APIs failed");
          }
        } catch (_0x84fb3d) {
          const _0x6b1f6e = ["https://cdn.nekos.life/blowjob/blowjob_001.jpg", "https://cdn.nekos.life/blowjob/blowjob_002.jpg", 'https://i.imgur.com/example1.jpg', "https://i.imgur.com/example2.jpg"];
          _0x2b844c = _0x6b1f6e[Math.floor(Math.random() * _0x6b1f6e.length)];
        }
      }
      const _0x1e9f0e = ANIME.U1F48B + " *NSFW Bj* " + ANIME.U1F48B + '\x0a@' + _0x3a0a6e.split('@')[0] + " is getting some oral action! " + ANIME.U1F43A + ANIME.U1F525;
      (await _0x4b3f40.sendMessage(_0x13151a, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x5e7377.key
        }
      }), await _0x4b3f40.sendMessage(_0x13151a, {
        image: {
          url: _0x2b844c
        },
        caption: _0x1e9f0e,
        mentions: [_0x3a0a6e]
      }, {
        quoted: _0x5e7377
      }));
    } catch (_0xc6471) {
      (await _0x4b3f40.sendMessage(_0x5e7377.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x5e7377.key
        }
      }), console.error("Bj command error:", _0xc6471), await _0x4b3f40.sendMessage(_0x5e7377.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while fetching NSFW content. The API might be down or blocked in your region."
      }, {
        quoted: _0x5e7377
      }));
    }
  }
};
