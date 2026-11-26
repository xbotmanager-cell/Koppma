import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "cringe",
  alias: ['cringing', 'cringey', "awkward", "facepalm"],
  desc: "Anime cringe reaction",
  category: "Anime",
  usage: ".cringe @user or .cringe",
  async execute(_0x37320f, _0x58bb94) {
    try {
      const _0x571dd8 = _0x58bb94.key.remoteJid, _0x2ab5a5 = _0x58bb94.key.participant || _0x571dd8, _0x4ec2db = _0x58bb94.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x435a73 = _0x4ec2db[0] || _0x2ab5a5, _0x51057b = _0x435a73 === _0x2ab5a5 || !_0x4ec2db.length, _0xda2044 = ["https://api.waifu.pics/sfw/facepalm", 'https://api.catboys.com/facepalm', "https://api.waifu.pics/sfw/disgust", "https://api.waifu.pics/sfw/annoyed"];
      let _0x1d1c4a = null, _0x5802ad = null;
      for (const _0x216f2e of _0xda2044) {
        try {
          console.log("Trying cringe API: " + _0x216f2e);
          const _0x4c54ac = await fetch(_0x216f2e, {
            headers: {
              'User-Agent': "Mozilla/5.0"
            },
            timeout: 5000
          });
          if (!_0x4c54ac.ok) continue;
          const _0x526736 = await _0x4c54ac.json();
          if (_0x216f2e.includes("waifu.pics")) {
            if (_0x526736?.url) {
              (_0x1d1c4a = _0x526736.url, _0x5802ad = _0x216f2e.includes("facepalm") ? 'Facepalm' : _0x216f2e.includes("disgust") ? 'Disgust' : _0x216f2e.includes("annoyed") ? "Annoyed" : "WaifuPics");
              break;
            }
          } else {
            if (_0x216f2e.includes("catboys.com")) {
              if (_0x526736?.url) {
                (_0x1d1c4a = _0x526736.url, _0x5802ad = "Catboys Facepalm");
                break;
              }
            }
          }
        } catch (_0x44e706) {
          console.log("API " + _0x216f2e + '\x20failed:', _0x44e706.message);
          continue;
        }
      }
      if (!_0x1d1c4a) {
        const _0x128627 = ["https://nekos.life/api/v2/img/facepalm", "https://api.waifu.pics/sfw/cringe", "https://nekos.best/api/v2/facepalm", "https://api.otakugifs.xyz/gif?reaction=facepalm"];
        for (const _0x2f9b8a of _0x128627) {
          try {
            const _0x23b33a = await fetch(_0x2f9b8a), _0x1b1787 = await _0x23b33a.json();
            if (_0x2f9b8a.includes("nekos.life") && _0x1b1787?.url) {
              (_0x1d1c4a = _0x1b1787.url, _0x5802ad = "NekosLife Facepalm");
              break;
            } else {
              if (_0x2f9b8a.includes("waifu.pics") && _0x1b1787?.url) {
                (_0x1d1c4a = _0x1b1787.url, _0x5802ad = "Cringe");
                break;
              } else {
                if (_0x2f9b8a.includes("nekos.best") && _0x1b1787?.results?.[0]?.url) {
                  (_0x1d1c4a = _0x1b1787.results[0].url, _0x5802ad = "NekosBest Facepalm");
                  break;
                } else {
                  if (_0x2f9b8a.includes("otakugifs.xyz") && _0x1b1787?.url) {
                    (_0x1d1c4a = _0x1b1787.url, _0x5802ad = "OtakuGifs Facepalm");
                    break;
                  }
                }
              }
            }
          } catch (_0x2858bf) {
            await _0x37320f.sendMessage(_0x58bb94.key.remoteJid, {
              react: {
                text: STATUS.ERROR,
                key: _0x58bb94.key
              }
            });
            continue;
          }
        }
      }
      if (!_0x1d1c4a) {
        const _0x4e17aa = ['https://i.imgur.com/KL4Q8tX.gif', 'https://i.imgur.com/7V9dW2q.jpg', "https://i.imgur.com/9zXwQpL.png", "https://i.imgur.com/mN3qB4P.gif", "https://i.imgur.com/2pQrT9Y.jpg"];
        (_0x1d1c4a = _0x4e17aa[Math.floor(Math.random() * _0x4e17aa.length)], _0x5802ad = "Cringe Collection");
      }
      let _0x17bca6;
      if (_0x51057b) _0x17bca6 = [ANIME.U1F926 + " *SELF-AWARENESS!* " + ANIME.U1F926 + '\x0a@' + _0x435a73.split('@')[0] + '\x20realizes\x20how\x20cringey\x20they\x20are...', ANIME.U1F62C + " *SELF-CRINGE!* " + ANIME.U1F62C + '\x0a@' + _0x435a73.split('@')[0] + " cringes at their own actions!", ANIME.U1F648 + " *CAN'T LOOK!* " + ANIME.U1F648 + '\x0a@' + _0x435a73.split('@')[0] + " hides from their own cringe!", ANIME.U1F480 + " *DYING INSIDE!* " + ANIME.U1F480 + '\x0a@' + _0x435a73.split('@')[0] + " experiences maximum self-cringe!", ANIME.U1F974 + " *CRINGE OVERLOAD!* " + ANIME.U1F974 + '\x0a@' + _0x435a73.split('@')[0] + "'s own cringe is too much!"]; else {
        _0x17bca6 = [ANIME.U1F926 + " *FACE PALM!* " + ANIME.U1F926 + '\x0a@' + _0x2ab5a5.split('@')[0] + " cringes at @" + _0x435a73.split('@')[0] + "'s actions!", ANIME.U1F62C + " *SECONDHAND EMBARRASSMENT!* " + ANIME.U1F62C + '\x0a@' + _0x2ab5a5.split('@')[0] + '\x20feels\x20awkward\x20for\x20@' + _0x435a73.split('@')[0] + '!', ANIME.U1F648 + '\x20*TOO\x20CRINGEY\x20TO\x20WATCH!*\x20' + ANIME.U1F648 + '\x0a@' + _0x2ab5a5.split('@')[0] + '\x20can\x27t\x20handle\x20@' + _0x435a73.split('@')[0] + "'s cringe!", ANIME.U1F480 + '\x20*CRINGE\x20ATTACK!*\x20' + ANIME.U1F480 + '\x0a@' + _0x435a73.split('@')[0] + " just made @" + _0x2ab5a5.split('@')[0] + " cringe to death!", ANIME.U1F974 + " *CRINGE INDUCED NAUSEA!* " + ANIME.U1F974 + '\x0a@' + _0x435a73.split('@')[0] + "'s cringe makes @" + _0x2ab5a5.split('@')[0] + " sick!", ANIME.U1F616 + '\x20*WHY\x20WOULD\x20YOU\x20DO\x20THAT?!*\x20' + ANIME.U1F616 + '\x0a@' + _0x2ab5a5.split('@')[0] + " questions @" + _0x435a73.split('@')[0] + "'s life choices!"];
        const _0x286f87 = _0x58bb94.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        _0x286f87 && _0x17bca6.push(ANIME.U1F4F1 + " *MESSAGE REVIEW!* " + ANIME.U1F4F1 + '\x0a@' + _0x2ab5a5.split('@')[0] + " cringes at @" + _0x435a73.split('@')[0] + "'s last message!", ANIME.U1F4AC + " *TEXT CRINGE!* " + ANIME.U1F4AC + '\x0a@' + _0x2ab5a5.split('@')[0] + " reads @" + _0x435a73.split('@')[0] + "'s message and cringes!");
      }
      const _0x2bb4de = _0x17bca6[Math.floor(Math.random() * _0x17bca6.length)], _0x59e50f = process.env.DEBUG ? '\x0a\x0a' + ANIME.U1F62C + '\x20Reaction:\x20' + _0x5802ad : '', _0x1c1f64 = _0x1d1c4a.toLowerCase().endsWith(".gif"), _0x23b48a = _0x51057b ? [_0x435a73] : [_0x435a73, _0x2ab5a5];
      await _0x37320f.sendMessage(_0x571dd8, _0x1c1f64 ? {
        video: {
          url: _0x1d1c4a
        },
        gifPlayback: true,
        caption: _0x2bb4de + _0x59e50f,
        mentions: _0x23b48a
      } : {
        image: {
          url: _0x1d1c4a
        },
        caption: _0x2bb4de + _0x59e50f,
        mentions: _0x23b48a
      }, {
        quoted: _0x58bb94
      });
    } catch (_0x6da2b8) {
      (await _0x37320f.sendMessage(_0x58bb94.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x58bb94.key
        }
      }), console.error('Cringe\x20command\x20error:', _0x6da2b8));
      const _0x1ba7fa = _0x58bb94.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || _0x58bb94.key.participant || _0x58bb94.key.remoteJid, _0x48d33d = _0x58bb94.key.participant || _0x58bb94.key.remoteJid, _0x336274 = _0x1ba7fa === _0x48d33d, _0xc8a478 = '\x0a╔┈┄┈┄✦┈┄┈┄✦┈┄┈┄╗\x0a║\x20\x20\x20C\x20R\x20I\x20N\x20G\x20E\x20\x20\x20║\x0a╚┈┄┈┄✦┈┄┈┄✦┈┄┈┄╝\x0a\x20\x20\x20\x20(－‸ლ)\x0a\x20\x20\x20/\x20\x20\x20\x20\x20\x5c\x0a\x20\x20/\x20\x20\x20●\x20\x20\x20●\x20\x5c\x0a\x20/\x20\x20\x20\x20\x20\x20▽\x20\x20\x20\x20\x20\x5c\x0a|\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20|\x0a\x20\x5c\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/\x0a\x20\x20\x5c＿＿＿＿＿／', _0x4a5db6 = _0x336274 ? ANIME.U1F926 + '\x20*SELF-CRINGE!*\x20' + ANIME.U1F926 + '\x0a@' + _0x1ba7fa.split('@')[0] + '\x20cringes\x20at\x20themselves...\x0a' + _0xc8a478 : ANIME.U1F62C + '\x20*CRINGE\x20ALERT!*\x20' + ANIME.U1F62C + '\x0a@' + _0x48d33d.split('@')[0] + " cringes at @" + _0x1ba7fa.split('@')[0] + '!\x0a' + _0xc8a478;
      await _0x37320f.sendMessage(_0x58bb94.key.remoteJid, {
        text: _0x4a5db6,
        mentions: _0x336274 ? [_0x1ba7fa] : [_0x1ba7fa, _0x48d33d]
      }, {
        quoted: _0x58bb94
      });
    }
  }
};
