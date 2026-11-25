import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "trap2",
  alias: ["astolfo", "otokonoko", "femboy"],
  desc: 'Send\x20random\x20anime\x20trap\x20character\x20images\x20(NSFW\x20available)',
  category: 'Anime',
  usage: ".trap2 [sfw/nsfw]",
  async execute(_0x2a4c24, _0x1bd0a1, _0x385ebf) {
    try {
      const _0x361888 = _0x1bd0a1.key.remoteJid, _0x5c0edc = _0x385ebf[0]?.toLowerCase() || "sfw", _0x6eff26 = true;
      if (_0x5c0edc === "nsfw" && !_0x6eff26) return _0x2a4c24.sendMessage(_0x361888, {
        text: ANIME.U274C + " NSFW content is only allowed in NSFW-enabled groups or private chats!",
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true
        }
      }, {
        quoted: _0x1bd0a1
      });
      let _0x2f18a1;
      _0x5c0edc === 'nsfw' ? _0x2f18a1 = 'https://api.waifu.pics/nsfw/trap' : _0x2f18a1 = "https://api.waifu.pics/sfw/waifu";
      const _0x599522 = await fetch(_0x2f18a1), _0x1e1d5a = await _0x599522.json();
      if (!_0x1e1d5a?.url) {
        const _0x18825d = await fetch("https://nekos.best/api/v2/neko"), _0x394e4a = await _0x18825d.json(), _0x4c8b03 = _0x394e4a?.results?.[0]?.url || "https://i.imgur.com/example.jpg";
        await _0x2a4c24.sendMessage(_0x361888, {
          react: {
            text: STATUS.SUCCESS,
            key: _0x1bd0a1.key
          }
        });
        const _0x2ae7c9 = _0x5c0edc === "nsfw" ? ANIME.U1F51E + " *NSFW Trap* " + ANIME.U1F51E + "\nViewer discretion advised!" : ANIME.U2728 + '\x20*SFW\x20Trap*\x20' + ANIME.U2728 + "\nCute trap character incoming!";
        await _0x2a4c24.sendMessage(_0x361888, {
          image: {
            url: _0x4c8b03
          },
          caption: _0x2ae7c9
        }, {
          quoted: _0x1bd0a1
        });
        return;
      }
      await _0x2a4c24.sendMessage(_0x361888, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x1bd0a1.key
        }
      });
      const _0x5219a1 = _0x5c0edc === "nsfw" ? ANIME.U1F51E + " *NSFW Trap Content* " + ANIME.U1F51E + '\x0aEnjoy\x20responsibly!' : ANIME.U2728 + '\x20*Trap\x20Image*\x20' + ANIME.U2728 + '\x0aHere\x27s\x20your\x20cute\x20character!';
      (await _0x2a4c24.sendMessage(_0x361888, {
        react: {
          text: STATUS.ERROR,
          key: _0x1bd0a1.key
        }
      }), await _0x2a4c24.sendMessage(_0x361888, {
        image: {
          url: _0x1e1d5a.url
        },
        caption: _0x5219a1
      }, {
        quoted: _0x1bd0a1
      }));
    } catch (_0x32d7f3) {
      (console.error("Trap command error:", _0x32d7f3), await _0x2a4c24.sendMessage(_0x1bd0a1.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " Error: " + _0x32d7f3.message,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true
        }
      }, {
        quoted: _0x1bd0a1
      }));
    }
  }
};
