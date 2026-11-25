import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "dance",
  alias: ["dancing", "boogie", 'groove'],
  desc: "Animated dance reaction GIF",
  category: 'Anime',
  usage: ".dance @user or .dance",
  async execute(_0x5b52cc, _0xc57895) {
    try {
      const _0xbdf9b8 = _0xc57895.key.remoteJid, _0x49da3f = _0xc57895.key.participant || _0xbdf9b8, _0x1dae51 = _0xc57895.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x8c0344 = _0x1dae51[0] || _0x49da3f, _0x301aef = ["https://api.otakugifs.xyz/gif?reaction=dance", "https://api.catboys.com/dance", 'https://nekobot.xyz/api/image?type=dance', "https://api.waifu.pics/sfw/dance"];
      let _0x54e8c1 = null, _0x233ea2 = null;
      for (const _0x48eef7 of _0x301aef) {
        try {
          console.log("Trying API: " + _0x48eef7);
          const _0x3d1836 = await fetch(_0x48eef7, {
            headers: {
              'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
          });
          if (!_0x3d1836.ok) continue;
          const _0x5d20a9 = await _0x3d1836.json();
          if (_0x48eef7.includes("otakugifs.xyz")) {
            if (_0x5d20a9?.url) {
              (_0x54e8c1 = _0x5d20a9.url, _0x233ea2 = 'OtakuGifs');
              break;
            }
          } else {
            if (_0x48eef7.includes("catboys.com")) {
              if (_0x5d20a9?.url) {
                (_0x54e8c1 = _0x5d20a9.url, _0x233ea2 = "Catboy");
                break;
              }
            } else {
              if (_0x48eef7.includes('nekobot.xyz')) {
                if (_0x5d20a9?.message) {
                  (_0x54e8c1 = _0x5d20a9.message, _0x233ea2 = "NekoBot");
                  break;
                }
              } else {
                if (_0x48eef7.includes("waifu.pics")) {
                  if (_0x5d20a9?.url) {
                    (_0x54e8c1 = _0x5d20a9.url, _0x233ea2 = 'WaifuPics');
                    break;
                  }
                }
              }
            }
          }
        } catch (_0x307e4e) {
          console.log('API\x20' + _0x48eef7 + '\x20failed:', _0x307e4e.message);
          continue;
        }
      }
      if (!_0x54e8c1) {
        const _0x4af464 = ['https://api.waifu.pics/sfw/happy', "https://nekos.life/api/v2/img/neko", "https://api.catboys.com/img"];
        for (const _0x330e0c of _0x4af464) {
          try {
            const _0x10c5f0 = await fetch(_0x330e0c), _0x15dd57 = await _0x10c5f0.json();
            if (_0x330e0c.includes("waifu.pics") && _0x15dd57?.url) {
              (_0x54e8c1 = _0x15dd57.url, _0x233ea2 = 'WaifuPics\x20(Happy)');
              break;
            } else {
              if (_0x330e0c.includes("nekos.life") && _0x15dd57?.url) {
                (_0x54e8c1 = _0x15dd57.url, _0x233ea2 = "NekosLife");
                break;
              } else {
                if (_0x330e0c.includes('catboys.com') && _0x15dd57?.url) {
                  (_0x54e8c1 = _0x15dd57.url, _0x233ea2 = "Catboy");
                  break;
                }
              }
            }
          } catch (_0x2a296e) {
            await _0x5b52cc.sendMessage(_0xc57895.key.remoteJid, {
              react: {
                text: STATUS.ERROR,
                key: _0xc57895.key
              }
            });
            continue;
          }
        }
      }
      if (!_0x54e8c1) {
        const _0x42c2ff = ["https://media.tenor.com/YN7Z6hY0lHwAAAAC/dance-anime.gif", 'https://media.tenor.com/2jNx2x9QcQEAAAAC/dance-dancing.gif', 'https://media.tenor.com/ib6qWchD8SwAAAAC/anime-dance.gif', 'https://media.tenor.com/SRyN1RYbbVQAAAAC/dance-anime.gif', "https://media.tenor.com/8wHLqjz6R9AAAAAC/dance-anime.gif"];
        (_0x54e8c1 = _0x42c2ff[Math.floor(Math.random() * _0x42c2ff.length)], _0x233ea2 = "Tenor Fallback");
      }
      const _0xac2789 = [ANIME.U1F483 + '\x20*DANCE\x20TIME!*\x20' + ANIME.U1F57A + '\x0a@' + _0x8c0344.split('@')[0] + '\x20is\x20hitting\x20the\x20dance\x20floor!\x20' + ANIME.U1F3B6, ANIME.U1F3B5 + " *GROOVIN'!* " + ANIME.U1F3B5 + '\x0a@' + _0x8c0344.split('@')[0] + '\x20busting\x20out\x20the\x20moves!\x20' + ANIME.U1F525, ANIME.U2728 + " *DANCE PARTY!* " + ANIME.U2728 + '\x0a@' + _0x8c0344.split('@')[0] + " showing off their dance skills! " + ANIME.U1F4AB, ANIME.U1F3B6 + " *BOOGIE DOWN!* " + ANIME.U1F3B6 + '\x0a@' + _0x8c0344.split('@')[0] + " can't stop dancing! " + ANIME.U1F57A + ANIME.U1F4A5, ANIME.U1F31F + '\x20*DANCE\x20FLOOR\x20QUEEN/KING!*\x20' + ANIME.U1F31F + '\x0a@' + _0x8c0344.split('@')[0] + " owning the dance floor! " + ANIME.U1F451, ANIME.U1F4AB + " *EPIC DANCE MOVES!* " + ANIME.U1F4AB + '\x0a@' + _0x8c0344.split('@')[0] + " breaking it down! " + ANIME.U1F389], _0x379a74 = _0xac2789[Math.floor(Math.random() * _0xac2789.length)], _0x56008c = process.env.DEBUG ? '\x0a\x0a' + ANIME.U1F4E1 + " Source: " + _0x233ea2 : '';
      (await _0x5b52cc.sendMessage(_0xbdf9b8, {
        react: {
          text: STATUS.SUCCESS,
          key: _0xc57895.key
        }
      }), await _0x5b52cc.sendMessage(_0xbdf9b8, {
        video: {
          url: _0x54e8c1
        },
        gifPlayback: true,
        caption: _0x379a74 + _0x56008c,
        mentions: [_0x8c0344]
      }, {
        quoted: _0xc57895
      }));
    } catch (_0x3c7394) {
      (await _0x5b52cc.sendMessage(_0xc57895.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0xc57895.key
        }
      }), console.error("Dance command error:", _0x3c7394));
      try {
        await _0x5b52cc.sendMessage(_0xc57895.key.remoteJid, {
          text: ANIME.U1F57A + " *DANCE TIME!* " + ANIME.U1F57A + '\x0a@' + (_0xc57895.key.participant?.split('@')[0] || "Someone") + " is dancing!\n\n" + ANIME.U1F3B6 + " *Insert dance GIF here* " + ANIME.U1F3B6,
          mentions: [_0xc57895.key.participant || _0xc57895.key.remoteJid]
        }, {
          quoted: _0xc57895
        });
      } catch (_0x5deabb) {
        console.error("Final fallback failed:", _0x5deabb);
      }
    }
  }
};
