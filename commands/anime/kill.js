import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "kill",
  alias: ['murder', "destroy", "eliminate", "assassinate"],
  desc: "Playful anime kill reaction (SFW)",
  category: "Anime",
  usage: ".kill @user",
  async execute(_0x55521d, _0x8f320b) {
    try {
      const _0x170496 = _0x8f320b.key.remoteJid, _0x1c7b1a = _0x8f320b.key.participant || _0x170496, _0x4748ef = _0x8f320b.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x4838a8 = _0x4748ef[0] || _0x1c7b1a, _0x49533c = ["https://api.waifu.pics/sfw/bonk", "https://api.waifu.pics/sfw/smug", "https://nekos.life/api/v2/img/kill", 'https://api.waifu.pics/sfw/slap'];
      let _0x53981e = null, _0x581d2f = null;
      for (const _0x32dd15 of _0x49533c) {
        try {
          console.log('Trying\x20kill\x20API:\x20' + _0x32dd15);
          const _0x21e154 = await fetch(_0x32dd15, {
            headers: {
              'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
            timeout: 5000
          });
          if (!_0x21e154.ok) continue;
          const _0x54797d = await _0x21e154.json();
          if (_0x32dd15.includes("waifu.pics")) {
            if (_0x54797d?.url) {
              (_0x53981e = _0x54797d.url, _0x581d2f = _0x32dd15.includes('bonk') ? "Bonk" : _0x32dd15.includes('smug') ? "Smug" : _0x32dd15.includes("slap") ? 'Slap' : 'WaifuPics');
              break;
            }
          } else {
            if (_0x32dd15.includes("nekos.life")) {
              if (_0x54797d?.url) {
                (_0x53981e = _0x54797d.url, _0x581d2f = "NekosLife Kill");
                break;
              }
            }
          }
        } catch (_0x57b1b0) {
          console.log("API " + _0x32dd15 + " failed:", _0x57b1b0.message);
          continue;
        }
      }
      if (!_0x53981e) {
        const _0x45e27f = ["https://api.waifu.pics/sfw/angry", "https://nekos.life/api/v2/img/angry", "https://api.catboys.com/baka"];
        for (const _0x1b832d of _0x45e27f) {
          try {
            const _0x3e2ddd = await fetch(_0x1b832d), _0x345f58 = await _0x3e2ddd.json();
            if (_0x1b832d.includes("waifu.pics") && _0x345f58?.url) {
              (_0x53981e = _0x345f58.url, _0x581d2f = "Angry");
              break;
            } else {
              if (_0x1b832d.includes('nekos.life') && _0x345f58?.url) {
                (_0x53981e = _0x345f58.url, _0x581d2f = "NekosLife Angry");
                break;
              } else {
                if (_0x1b832d.includes("catboys.com") && _0x345f58?.url) {
                  (_0x53981e = _0x345f58.url, _0x581d2f = "Baka");
                  break;
                }
              }
            }
          } catch (_0x5c16b8) {
            await _0x55521d.sendMessage(_0x8f320b.key.remoteJid, {
              react: {
                text: STATUS.ERROR,
                key: _0x8f320b.key
              }
            });
            continue;
          }
        }
      }
      if (!_0x53981e) {
        const _0x4d814e = ["https://i.imgur.com/5WqFQ4R.png", "https://i.imgur.com/3JZyRkK.jpg", "https://i.imgur.com/XrZ8Q2v.png"];
        (_0x53981e = _0x4d814e[Math.floor(Math.random() * _0x4d814e.length)], _0x581d2f = 'Fallback\x20Image');
      }
      const _0xb6ae26 = [ANIME.U2620_FE0F + '\x20*ELIMINATED!*\x20' + ANIME.U2620_FE0F + '\x0a@' + _0x4838a8.split('@')[0] + " has been taken out by @" + _0x1c7b1a.split('@')[0] + '!\x20' + ANIME.U1F480, ANIME.U26B0_FE0F + " *MISSION ACCOMPLISHED* " + ANIME.U26B0_FE0F + '\x0a@' + _0x1c7b1a.split('@')[0] + " successfully eliminated @" + _0x4838a8.split('@')[0] + '!\x20' + ANIME.U1F3AF, ANIME.U1F52B + '\x20*TARGET\x20NEUTRALIZED*\x20' + ANIME.U1F52B + '\x0a@' + _0x4838a8.split('@')[0] + " was no match for @" + _0x1c7b1a.split('@')[0] + '!\x20' + ANIME.U1F4A5, ANIME.U1F480 + " *FATALITY!* " + ANIME.U1F480 + '\x0a@' + _0x1c7b1a.split('@')[0] + " finishes @" + _0x4838a8.split('@')[0] + '!\x20' + ANIME.U1FA78, ANIME.U2694_FE0F + " *VICTORY!* " + ANIME.U2694_FE0F + '\x0a@' + _0x1c7b1a.split('@')[0] + '\x20defeats\x20@' + _0x4838a8.split('@')[0] + '\x20in\x20battle!\x20' + ANIME.U1F3C6, ANIME.U1F525 + '\x20*ANNIHILATED!*\x20' + ANIME.U1F525 + '\x0a@' + _0x4838a8.split('@')[0] + " has been destroyed by @" + _0x1c7b1a.split('@')[0] + '!\x20' + ANIME.U1F4A3], _0x586c94 = [ANIME.U1F926 + " *SELF-DESTRUCT!* " + ANIME.U1F926 + '\x0a@' + _0x4838a8.split('@')[0] + " accidentally eliminated themselves! " + ANIME.U1F4A5, ANIME.U1F4A5 + " *SUICIDE MISSION!* " + ANIME.U1F4A5 + '\x0a@' + _0x4838a8.split('@')[0] + " took themselves out! " + ANIME.U1F480, ANIME.U1F635 + " *MISSION FAILED!* " + ANIME.U1F635 + '\x0a@' + _0x4838a8.split('@')[0] + " became their own worst enemy! " + ANIME.U2620_FE0F];
      let _0x2432d2;
      _0x4838a8 === _0x1c7b1a || !_0x4748ef.length ? _0x2432d2 = _0x586c94[Math.floor(Math.random() * _0x586c94.length)] : _0x2432d2 = _0xb6ae26[Math.floor(Math.random() * _0xb6ae26.length)];
      const _0x43b7d9 = process.env.DEBUG ? '\x0a\x0a' + ANIME.U2699_FE0F + '\x20Reaction:\x20' + _0x581d2f : '';
      (await _0x55521d.sendMessage(_0x170496, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x8f320b.key
        }
      }), await _0x55521d.sendMessage(_0x170496, {
        image: {
          url: _0x53981e
        },
        caption: _0x2432d2 + _0x43b7d9,
        mentions: [_0x4838a8, _0x1c7b1a].filter((_0x22b047, _0x17674c, _0xcdb08e) => _0xcdb08e.indexOf(_0x22b047) === _0x17674c)
      }, {
        quoted: _0x8f320b
      }));
    } catch (_0x1caa4d) {
      (await _0x55521d.sendMessage(_0x8f320b.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x8f320b.key
        }
      }), console.error('Kill\x20command\x20error:', _0x1caa4d));
      const _0x34ffa9 = _0x8f320b.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || _0x8f320b.key.participant || _0x8f320b.key.remoteJid, _0x2281e0 = _0x8f320b.key.participant || _0x8f320b.key.remoteJid, _0x56d000 = _0x34ffa9 === _0x2281e0 ? ANIME.U1F480 + " *SELF-DESTRUCT!* " + ANIME.U1F480 + '\x0a@' + _0x34ffa9.split('@')[0] + " eliminated themselves!" : ANIME.U1F52B + " *ELIMINATION!* " + ANIME.U1F52B + '\x0a@' + _0x2281e0.split('@')[0] + " took out @" + _0x34ffa9.split('@')[0] + '!';
      await _0x55521d.sendMessage(_0x8f320b.key.remoteJid, {
        text: _0x56d000,
        mentions: [_0x34ffa9, _0x2281e0]
      }, {
        quoted: _0x8f320b
      });
    }
  }
};
