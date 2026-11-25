import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "glomp",
  alias: ["tacklehug", "pounce", "jump hug", "flyinghug"],
  desc: "Anime glomp reaction - enthusiastic tackle hug",
  category: "Anime",
  usage: ".glomp @user",
  async execute(_0x21c842, _0xc2784) {
    try {
      const _0x30221d = _0xc2784.key.remoteJid, _0x35047c = _0xc2784.key.participant || _0x30221d, _0x5cbd41 = _0xc2784.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0xe23c5d = _0x5cbd41[0] || _0x35047c, _0x814a33 = ['https://api.waifu.pics/sfw/hug', "https://nekos.life/api/v2/img/hug", 'https://nekos.best/api/v2/hug', "https://api.waifu.pics/sfw/tackle", "https://api.catboys.com/cuddle"];
      let _0x196c84 = null, _0x397db9 = null;
      for (const _0x3b77f2 of _0x814a33) {
        try {
          console.log("Trying glomp API: " + _0x3b77f2);
          const _0x996456 = await fetch(_0x3b77f2, {
            headers: {
              'User-Agent': 'Mozilla/5.0'
            },
            timeout: 5000
          });
          if (!_0x996456.ok) continue;
          const _0x5c184c = await _0x996456.json();
          if (_0x3b77f2.includes("waifu.pics")) {
            if (_0x5c184c?.url) {
              (_0x196c84 = _0x5c184c.url, _0x397db9 = "WaifuPics Hug");
              break;
            }
          } else {
            if (_0x3b77f2.includes("nekos.life")) {
              if (_0x5c184c?.url) {
                (_0x196c84 = _0x5c184c.url, _0x397db9 = "NekosLife Hug");
                break;
              }
            } else {
              if (_0x3b77f2.includes("nekos.best")) {
                if (_0x5c184c?.results?.[0]?.url) {
                  (_0x196c84 = _0x5c184c.results[0].url, _0x397db9 = "NekosBest Hug");
                  break;
                }
              } else {
                if (_0x3b77f2.includes("catboys.com")) {
                  if (_0x5c184c?.url) {
                    (_0x196c84 = _0x5c184c.url, _0x397db9 = 'Catboys\x20Cuddle');
                    break;
                  }
                }
              }
            }
          }
        } catch (_0x24a95e) {
          console.log('API\x20' + _0x3b77f2 + " failed:", _0x24a95e.message);
          continue;
        }
      }
      if (!_0x196c84) {
        const _0x40d7a1 = ["https://api.waifu.pics/sfw/cuddle", "https://nekos.life/api/v2/img/cuddle", "https://api.otakugifs.xyz/gif?reaction=hug"];
        for (const _0x3e8ca7 of _0x40d7a1) {
          try {
            const _0x899afb = await fetch(_0x3e8ca7), _0x10794b = await _0x899afb.json();
            if (_0x3e8ca7.includes("waifu.pics") && _0x10794b?.url) {
              (_0x196c84 = _0x10794b.url, _0x397db9 = "Cuddle");
              break;
            } else {
              if (_0x3e8ca7.includes("nekos.life") && _0x10794b?.url) {
                (_0x196c84 = _0x10794b.url, _0x397db9 = "NekosLife Cuddle");
                break;
              } else {
                if (_0x3e8ca7.includes("otakugifs.xyz") && _0x10794b?.url) {
                  (_0x196c84 = _0x10794b.url, _0x397db9 = 'OtakuGifs\x20Hug');
                  break;
                }
              }
            }
          } catch (_0x8b18f2) {
            await _0x21c842.sendMessage(_0xc2784.key.remoteJid, {
              react: {
                text: STATUS.ERROR,
                key: _0xc2784.key
              }
            });
            continue;
          }
        }
      }
      if (!_0x196c84) {
        const _0x98c17d = ['https://i.imgur.com/6fK5Q0x.gif', "https://i.imgur.com/V8Q2G4N.gif", "https://i.imgur.com/9XqYzJL.jpg", "https://i.imgur.com/3WvL7pF.png", "https://i.imgur.com/mQ4nN8T.gif"];
        (_0x196c84 = _0x98c17d[Math.floor(Math.random() * _0x98c17d.length)], _0x397db9 = 'Glomp\x20Collection');
      }
      const _0x2dbc8e = ['' + ANIME.U1F3C3_200D_2642_FE0F + ANIME.U1F4A8 + '\x20*GLOMP\x20ATTACK!*\x20' + ANIME.U1FAC2 + '\x0a@' + _0x35047c.split('@')[0] + " enthusiastically tackles @" + _0xe23c5d.split('@')[0] + " with a hug!", ANIME.U1F680 + " *FLYING HUG!* " + ANIME.U1F680 + '\x0a@' + _0x35047c.split('@')[0] + '\x20jumps\x20into\x20@' + _0xe23c5d.split('@')[0] + "'s arms! " + ANIME.U1F4AB, ANIME.U26A1 + " *P O U N C E !* " + ANIME.U26A1 + '\x0a@' + _0x35047c.split('@')[0] + '\x20glomps\x20@' + _0xe23c5d.split('@')[0] + " with full force! " + ANIME.U1F4A5, ANIME.U1F3AF + " *TACKLE HUG!* " + ANIME.U1F3AF + '\x0a@' + _0x35047c.split('@')[0] + " perfectly tackles @" + _0xe23c5d.split('@')[0] + " in a hug! " + ANIME.U1FAC2, ANIME.U1F496 + " *SUPER HUG!* " + ANIME.U1F496 + '\x0a@' + _0x35047c.split('@')[0] + " runs and glomps @" + _0xe23c5d.split('@')[0] + '!\x20' + ANIME.U1F3C3_200D_2640_FE0F + ANIME.U1F4A8, ANIME.U1F31F + '\x20*MISSILE\x20HUG!*\x20' + ANIME.U1F31F + '\x0a@' + _0x35047c.split('@')[0] + " launches themselves at @" + _0xe23c5d.split('@')[0] + '!\x20' + ANIME.U1F680 + ANIME.U1FAC2], _0x96a5 = [ANIME.U1F917 + " *SELF-GLOMP!* " + ANIME.U1F917 + '\x0a@' + _0xe23c5d.split('@')[0] + " gives themselves an enthusiastic hug! " + ANIME.U1F4AB, ANIME.U1F300 + " *SPIN HUG!* " + ANIME.U1F300 + '\x0a@' + _0xe23c5d.split('@')[0] + " spins around and hugs themselves! " + ANIME.U2728, ANIME.U1F4AB + " *ENERGY HUG!* " + ANIME.U1F4AB + '\x0a@' + _0xe23c5d.split('@')[0] + '\x20generates\x20a\x20hug-energy\x20field!\x20' + ANIME.U26A1];
      let _0x46cde4;
      _0xe23c5d === _0x35047c || !_0x5cbd41.length ? _0x46cde4 = _0x96a5[Math.floor(Math.random() * _0x96a5.length)] : _0x46cde4 = _0x2dbc8e[Math.floor(Math.random() * _0x2dbc8e.length)];
      const _0xc0e181 = process.env.DEBUG ? '\x0a\x0a' + ANIME.U2728 + " Reaction: " + _0x397db9 : '', _0x1c031c = _0x196c84.toLowerCase().endsWith('.gif');
      await _0x21c842.sendMessage(_0x30221d, _0x1c031c ? {
        video: {
          url: _0x196c84
        },
        gifPlayback: true,
        caption: _0x46cde4 + _0xc0e181,
        mentions: [_0xe23c5d, _0x35047c].filter((_0x1d47e4, _0xe95b33, _0x1d2f8d) => _0x1d2f8d.indexOf(_0x1d47e4) === _0xe95b33)
      } : {
        image: {
          url: _0x196c84
        },
        caption: _0x46cde4 + _0xc0e181,
        mentions: [_0xe23c5d, _0x35047c].filter((_0x3b3999, _0x44048d, _0x4fea8d) => _0x4fea8d.indexOf(_0x3b3999) === _0x44048d)
      }, {
        quoted: _0xc2784
      });
    } catch (_0x48ae88) {
      (await _0x21c842.sendMessage(_0xc2784.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0xc2784.key
        }
      }), console.error("Glomp command error:", _0x48ae88));
      const _0x28657c = _0xc2784.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || _0xc2784.key.participant || _0xc2784.key.remoteJid, _0x371db8 = _0xc2784.key.participant || _0xc2784.key.remoteJid, _0xbc1814 = "\n╭━━━┳╮╱╱╱╱╱╭━━╮\n┃╭━╮┃┃╱╱╱╱╱┃╭╮┃\n┃┃╱╰┫╰━┳━━┳╯╰╯┣━━┳━━┳━━┳━━┳━╮\n┃┃╭━┫╭╮┃┃━┫╭━╮┃╭╮┃╭━┫╭╮┃╭╮┃╭╯\n┃╰┻━┃┃┃┃┃━┫╰━╯┃╭╮┃╰━┫╰╯┃╰╯┃┃\n╰━━━┻╯╰┻━━┻━━━┻╯╰┻━━┻━━┻━━┻╯", _0x49564d = _0x28657c === _0x371db8 ? ANIME.U1F917 + " *SELF-GLOMP!* " + ANIME.U1F917 + '\x0a@' + _0x28657c.split('@')[0] + " gives themselves a big hug!\n" + _0xbc1814 : '' + ANIME.U1F3C3_200D_2642_FE0F + ANIME.U1F4A8 + '\x20*GLOMP!*\x20' + ANIME.U1FAC2 + '\x0a@' + _0x371db8.split('@')[0] + " tackles @" + _0x28657c.split('@')[0] + " with a hug!\n" + _0xbc1814;
      await _0x21c842.sendMessage(_0xc2784.key.remoteJid, {
        text: _0x49564d,
        mentions: [_0x28657c, _0x371db8]
      }, {
        quoted: _0xc2784
      });
    }
  }
};
