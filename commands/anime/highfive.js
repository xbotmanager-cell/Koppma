import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "highfive",
  alias: ['high5', 'hi5', "hifive"],
  desc: 'Anime\x20highfive\x20reaction',
  category: "Anime",
  usage: ".highfive @user",
  async execute(_0x480a3d, _0x3e4e97) {
    try {
      const _0xa0fe18 = _0x3e4e97.key.remoteJid, _0x23face = _0x3e4e97.key.participant || _0xa0fe18, _0x738ba9 = _0x3e4e97.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x492ef2 = _0x738ba9[0] || _0x23face, _0x53d192 = ["https://api.waifu.pics/sfw/pat", "https://api.waifu.pics/sfw/hug", "https://nekos.life/api/v2/img/pat", "https://nekos.life/api/v2/img/hug"];
      let _0x59d514 = null, _0x114858 = null;
      for (const _0x22c1a9 of _0x53d192) {
        try {
          const _0xab9f47 = await fetch(_0x22c1a9), _0x4aa89b = await _0xab9f47.json();
          if (_0x22c1a9.includes("waifu.pics") && _0x4aa89b?.url) {
            (_0x59d514 = _0x4aa89b.url, _0x114858 = "waifu.pics");
            break;
          } else {
            if (_0x22c1a9.includes("nekos.life") && _0x4aa89b?.url) {
              (_0x59d514 = _0x4aa89b.url, _0x114858 = "nekos.life");
              break;
            }
          }
        } catch (_0xe381ac) {
          console.log("API " + _0x22c1a9 + " failed, trying next...");
          continue;
        }
      }
      if (!_0x59d514) try {
        const _0x41b1ab = await fetch("https://nekos.best/api/v2/pat"), _0x501014 = await _0x41b1ab.json();
        _0x501014?.results?.[0]?.url && (_0x59d514 = _0x501014.results[0].url, _0x114858 = 'nekos.best');
      } catch (_0x5810c5) {}
      if (!_0x59d514) return _0x480a3d.sendMessage(_0xa0fe18, {
        text: ANIME.U274C + " Failed to fetch highfive reaction. Try again later! " + ANIME.U270B
      }, {
        quoted: _0x3e4e97
      });
      const _0x1ff251 = [ANIME.U270B + " *HIGH FIVE!* " + ANIME.U270B + '\x0a@' + _0x492ef2.split('@')[0] + " and @" + _0x23face.split('@')[0] + '\x20give\x20a\x20high\x20five!\x20' + ANIME.U1F389, ANIME.U1F590_FE0F + " *HIFIVE!* " + ANIME.U1F590_FE0F + '\x0a@' + _0x492ef2.split('@')[0] + " slaps hands with @" + _0x23face.split('@')[0] + '!\x20' + ANIME.U1F64C, ANIME.U1F91A + " *HIGHFIVE SUCCESS!* " + ANIME.U1F91A + '\x0a@' + _0x492ef2.split('@')[0] + " and @" + _0x23face.split('@')[0] + " connect! " + ANIME.U2728, ANIME.U1F44F + " *PERFECT TIMING!* " + ANIME.U1F44F + '\x0a@' + _0x492ef2.split('@')[0] + " and @" + _0x23face.split('@')[0] + '\x20nail\x20the\x20highfive!\x20⭐'], _0x2e04ae = _0x1ff251[Math.floor(Math.random() * _0x1ff251.length)];
      (await _0x480a3d.sendMessage(_0xa0fe18, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x3e4e97.key
        }
      }), await _0x480a3d.sendMessage(_0xa0fe18, {
        image: {
          url: _0x59d514
        },
        caption: _0x2e04ae,
        mentions: [_0x492ef2, _0x23face]
      }, {
        quoted: _0x3e4e97
      }));
    } catch (_0x1312d1) {
      (await _0x480a3d.sendMessage(_0x3e4e97.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x3e4e97.key
        }
      }), console.error('Highfive\x20command\x20error:', _0x1312d1), await _0x480a3d.sendMessage(_0x3e4e97.key.remoteJid, {
        text: ANIME.U26A0_FE0F + '\x20An\x20error\x20occurred\x20while\x20processing\x20the\x20highfive\x20command.'
      }, {
        quoted: _0x3e4e97
      }));
    }
  }
};
