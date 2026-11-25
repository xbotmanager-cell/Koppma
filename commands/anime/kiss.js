import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "kiss",
  alias: ["kisses", "smooch"],
  desc: "Anime kiss reaction",
  category: "Anime",
  usage: ".kiss @user",
  async execute(_0xb221ef, _0x47e66b) {
    try {
      const _0xad9165 = _0x47e66b.key.remoteJid, _0xbecf5f = _0x47e66b.key.participant || _0xad9165, _0x56c1d0 = _0x47e66b.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x3ad6fd = _0x56c1d0[0] || _0xbecf5f, _0x5a9822 = await fetch("https://api.waifu.pics/sfw/kiss"), _0x11b02e = await _0x5a9822.json();
      if (!_0x11b02e?.url) {
        const _0x26f96a = await fetch("https://nekos.best/api/v2/kiss"), _0x51d92e = await _0x26f96a.json();
        if (!_0x51d92e?.results?.[0]?.url) {
          const _0x604047 = await fetch("https://nekos.life/api/v2/img/kiss"), _0x186a20 = await _0x604047.json();
          if (!_0x186a20?.url) return _0xb221ef.sendMessage(_0xad9165, {
            text: ANIME.U274C + " Failed to fetch kiss reaction. Please try again later."
          }, {
            quoted: _0x47e66b
          });
          const _0x519833 = ANIME.U1F48B + '\x20*KISS*\x20' + ANIME.U1F48B + '\x0a@' + _0x3ad6fd.split('@')[0] + " got a kiss from @" + _0xbecf5f.split('@')[0] + '!\x20' + ANIME.U1F498;
          (await _0xb221ef.sendMessage(_0xad9165, {
            react: {
              text: STATUS.SUCCESS,
              key: _0x47e66b.key
            }
          }), await _0xb221ef.sendMessage(_0xad9165, {
            image: {
              url: _0x186a20.url
            },
            caption: _0x519833,
            mentions: [_0x3ad6fd, _0xbecf5f]
          }, {
            quoted: _0x47e66b
          }));
          return;
        }
        const _0x12968a = ANIME.U1F48B + " *KISS* " + ANIME.U1F48B + '\x0a@' + _0x3ad6fd.split('@')[0] + " got a kiss from @" + _0xbecf5f.split('@')[0] + '!\x20' + ANIME.U1F498;
        (await _0xb221ef.sendMessage(_0xad9165, {
          react: {
            text: STATUS.SUCCESS,
            key: _0x47e66b.key
          }
        }), await _0xb221ef.sendMessage(_0xad9165, {
          image: {
            url: _0x51d92e.results[0].url
          },
          caption: _0x12968a,
          mentions: [_0x3ad6fd, _0xbecf5f]
        }, {
          quoted: _0x47e66b
        }));
        return;
      }
      const _0x3684ee = ANIME.U1F48B + " *KISS* " + ANIME.U1F48B + '\x0a@' + _0x3ad6fd.split('@')[0] + " got a kiss from @" + _0xbecf5f.split('@')[0] + '!\x20' + ANIME.U1F498;
      (await _0xb221ef.sendMessage(_0xad9165, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x47e66b.key
        }
      }), await _0xb221ef.sendMessage(_0xad9165, {
        image: {
          url: _0x11b02e.url
        },
        caption: _0x3684ee,
        mentions: [_0x3ad6fd, _0xbecf5f]
      }, {
        quoted: _0x47e66b
      }));
    } catch (_0x8a380d) {
      (await _0xb221ef.sendMessage(_0x47e66b.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x47e66b.key
        }
      }), console.error('Kiss\x20command\x20error:', _0x8a380d), await _0xb221ef.sendMessage(_0x47e66b.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while processing the kiss command."
      }, {
        quoted: _0x47e66b
      }));
    }
  }
};
