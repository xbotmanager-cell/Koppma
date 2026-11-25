import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "wink",
  alias: ["winking", "flirt", "sly", "mischievous"],
  desc: "Anime wink reaction - playful or flirtatious",
  category: 'Anime',
  usage: ".wink @user or .wink",
  async execute(_0x538bb2, _0x301a32) {
    try {
      const _0x5188a4 = _0x301a32.key.remoteJid, _0x1b9fca = _0x301a32.key.participant || _0x5188a4, _0x34290f = _0x301a32.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x57b797 = _0x34290f[0] || _0x1b9fca, _0x45dc83 = _0x57b797 === _0x1b9fca || !_0x34290f.length, _0xa690e4 = ["https://api.waifu.pics/sfw/wink", 'https://nekos.life/api/v2/img/wink', "https://api.catboys.com/wink", "https://nekos.best/api/v2/wink"];
      let _0x2d0a48 = null, _0x29c2a5 = null;
      for (const _0xe9f6bb of _0xa690e4) {
        try {
          console.log("Trying wink API: " + _0xe9f6bb);
          const _0x3e3124 = await fetch(_0xe9f6bb, {
            headers: {
              'User-Agent': 'Mozilla/5.0'
            },
            timeout: 5000
          });
          if (!_0x3e3124.ok) continue;
          const _0x322af3 = await _0x3e3124.json();
          if (_0xe9f6bb.includes('waifu.pics')) {
            if (_0x322af3?.url) {
              (_0x2d0a48 = _0x322af3.url, _0x29c2a5 = "WaifuPics Wink");
              break;
            }
          } else {
            if (_0xe9f6bb.includes("nekos.life")) {
              if (_0x322af3?.url) {
                (_0x2d0a48 = _0x322af3.url, _0x29c2a5 = "NekosLife Wink");
                break;
              }
            } else {
              if (_0xe9f6bb.includes("catboys.com")) {
                if (_0x322af3?.url) {
                  (_0x2d0a48 = _0x322af3.url, _0x29c2a5 = 'Catboys\x20Wink');
                  break;
                }
              } else {
                if (_0xe9f6bb.includes("nekos.best")) {
                  if (_0x322af3?.results?.[0]?.url) {
                    (_0x2d0a48 = _0x322af3.results[0].url, _0x29c2a5 = 'NekosBest\x20Wink');
                    break;
                  }
                }
              }
            }
          }
        } catch (_0x4a46d6) {
          console.log("API " + _0xe9f6bb + " failed:", _0x4a46d6.message);
          continue;
        }
      }
      if (!_0x2d0a48) {
        const _0x3e80a5 = ["https://api.waifu.pics/sfw/smug", "https://api.waifu.pics/sfw/blush", "https://nekos.life/api/v2/img/neko", "https://api.otakugifs.xyz/gif?reaction=wink"];
        for (const _0x17c987 of _0x3e80a5) {
          try {
            const _0x5a83aa = await fetch(_0x17c987), _0x55e272 = await _0x5a83aa.json();
            if (_0x17c987.includes("waifu.pics") && _0x55e272?.url) {
              (_0x2d0a48 = _0x55e272.url, _0x29c2a5 = _0x17c987.includes("smug") ? "Smug" : 'Blush');
              break;
            } else {
              if (_0x17c987.includes("nekos.life") && _0x55e272?.url) {
                (_0x2d0a48 = _0x55e272.url, _0x29c2a5 = 'NekosLife');
                break;
              } else {
                if (_0x17c987.includes("otakugifs.xyz") && _0x55e272?.url) {
                  (_0x2d0a48 = _0x55e272.url, _0x29c2a5 = 'OtakuGifs\x20Wink');
                  break;
                }
              }
            }
          } catch (_0x4aba34) {
            await _0x538bb2.sendMessage(_0x301a32.key.remoteJid, {
              react: {
                text: STATUS.ERROR,
                key: _0x301a32.key
              }
            });
            continue;
          }
        }
      }
      if (!_0x2d0a48) {
        const _0xf99965 = ["https://i.imgur.com/Xg5Lk8Z.gif", "https://i.imgur.com/9zTmLQq.jpg", 'https://i.imgur.com/3pQrY2s.gif', "https://i.imgur.com/N7VqB4J.png", 'https://i.imgur.com/Km8Lp9Q.gif', "https://i.imgur.com/2rQzTvX.jpg"];
        (_0x2d0a48 = _0xf99965[Math.floor(Math.random() * _0xf99965.length)], _0x29c2a5 = "Wink Collection");
      }
      let _0x6f8d05;
      if (_0x45dc83) _0x6f8d05 = [ANIME.U1F609 + " *SELF-WINK!* " + ANIME.U1F609 + '\x0a@' + _0x57b797.split('@')[0] + " gives themselves a confident wink!", ANIME.U2728 + " *MIRROR WINK!* " + ANIME.U2728 + '\x0a@' + _0x57b797.split('@')[0] + " practices their wink in the mirror!", ANIME.U1F4AB + " *SECRET SIGNAL!* " + ANIME.U1F4AB + '\x0a@' + _0x57b797.split('@')[0] + " winks at their own reflection!", ANIME.U1F3AD + " *SOLO PERFORMANCE!* " + ANIME.U1F3AD + '\x0a@' + _0x57b797.split('@')[0] + " winks to an imaginary audience!", ANIME.U1F441_FE0F + " *EYE EXERCISE!* " + ANIME.U1F441_FE0F + '\x0a@' + _0x57b797.split('@')[0] + " works on their winking skills!"]; else {
        _0x6f8d05 = [ANIME.U1F609 + " *WINK!* " + ANIME.U1F609 + '\x0a@' + _0x1b9fca.split('@')[0] + " playfully winks at @" + _0x57b797.split('@')[0] + '!', ANIME.U2728 + '\x20*FLIRTY\x20SIGNAL!*\x20' + ANIME.U2728 + '\x0a@' + _0x1b9fca.split('@')[0] + '\x20sends\x20a\x20flirty\x20wink\x20to\x20@' + _0x57b797.split('@')[0] + '!', ANIME.U1F496 + '\x20*SPECIAL\x20WINK!*\x20' + ANIME.U1F496 + '\x0a@' + _0x1b9fca.split('@')[0] + " gives @" + _0x57b797.split('@')[0] + " a special wink just for them!", ANIME.U1F3AF + " *TARGET ACQUIRED!* " + ANIME.U1F3AF + '\x0a@' + _0x1b9fca.split('@')[0] + " winks directly at @" + _0x57b797.split('@')[0] + '!', ANIME.U1F92B + '\x20*SECRET\x20MESSAGE!*\x20' + ANIME.U1F92B + '\x0a@' + _0x1b9fca.split('@')[0] + " winks at @" + _0x57b797.split('@')[0] + " - it's their little secret!", ANIME.U1F60F + '\x20*MISCHIEVOUS\x20WINK!*\x20' + ANIME.U1F60F + '\x0a@' + _0x1b9fca.split('@')[0] + " gives @" + _0x57b797.split('@')[0] + " a sly, knowing wink!", ANIME.U1F31F + " *SPARKLY WINK!* " + ANIME.U1F31F + '\x0a@' + _0x1b9fca.split('@')[0] + '\x27s\x20wink\x20makes\x20@' + _0x57b797.split('@')[0] + " feel special!"];
        const _0x5dafef = _0x5188a4.endsWith("@g.us");
        _0x5dafef && _0x6f8d05.push(ANIME.U1F440 + " *GROUP WINK!* " + ANIME.U1F440 + '\x0a@' + _0x1b9fca.split('@')[0] + " winks at @" + _0x57b797.split('@')[0] + '\x20across\x20the\x20chat!', ANIME.U1F3AA + " *PUBLIC WINK!* " + ANIME.U1F3AA + "\nEveryone sees @" + _0x1b9fca.split('@')[0] + " wink at @" + _0x57b797.split('@')[0] + '!');
      }
      const _0x4ea84c = _0x6f8d05[Math.floor(Math.random() * _0x6f8d05.length)], _0x4009ca = _0x45dc83 ? '' + ANIME.U1F4AB + ANIME.U2728 + ANIME.U1F31F : '' + ANIME.U1F496 + ANIME.U1F495 + ANIME.U1F498, _0x485dd6 = _0x4ea84c + ('\x20' + _0x4009ca), _0x185e22 = process.env.DEBUG ? '\x0a\x0a' + ANIME.U1F609 + " Reaction: " + _0x29c2a5 : '', _0x17512e = _0x2d0a48.toLowerCase().endsWith('.gif'), _0x18d7ef = _0x45dc83 ? [_0x57b797] : [_0x57b797, _0x1b9fca];
      await _0x538bb2.sendMessage(_0x5188a4, _0x17512e ? {
        video: {
          url: _0x2d0a48
        },
        gifPlayback: true,
        caption: _0x485dd6 + _0x185e22,
        mentions: _0x18d7ef
      } : {
        image: {
          url: _0x2d0a48
        },
        caption: _0x485dd6 + _0x185e22,
        mentions: _0x18d7ef
      }, {
        quoted: _0x301a32
      });
    } catch (_0xa36a39) {
      (await _0x538bb2.sendMessage(_0x301a32.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x301a32.key
        }
      }), console.error("Wink command error:", _0xa36a39));
      const _0x293f7a = _0x301a32.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || _0x301a32.key.participant || _0x301a32.key.remoteJid, _0x21d67f = _0x301a32.key.participant || _0x301a32.key.remoteJid, _0x3feb19 = _0x293f7a === _0x21d67f, _0x14d0b3 = "\n(^_~)\n   \\\n    \\   " + ANIME.U1F609 + "\n     \\\n   " + ANIME.U1F380 + ANIME.U1F496 + ANIME.U1F380 + '\x0a\x20\x20\x20\x20\x20\x20\x20', _0x4c4987 = _0x3feb19 ? ANIME.U1F609 + " *SELF-WINK!* " + ANIME.U1F609 + '\x0a@' + _0x293f7a.split('@')[0] + " gives a confident wink!\n" + _0x14d0b3 : ANIME.U2728 + " *WINK!* " + ANIME.U2728 + '\x0a@' + _0x21d67f.split('@')[0] + " winks at @" + _0x293f7a.split('@')[0] + '!\x0a' + _0x14d0b3;
      await _0x538bb2.sendMessage(_0x301a32.key.remoteJid, {
        text: _0x4c4987,
        mentions: _0x3feb19 ? [_0x293f7a] : [_0x293f7a, _0x21d67f]
      }, {
        quoted: _0x301a32
      });
    }
  }
};
