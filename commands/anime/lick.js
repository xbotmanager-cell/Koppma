import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "lick",
  alias: ["licking", "slurp"],
  desc: "Anime lick reaction",
  category: 'Anime',
  usage: '.lick\x20@user',
  async execute(_0x331ea2, _0x33103e) {
    try {
      const _0x488ee4 = _0x33103e.key.remoteJid, _0x4ebf8e = _0x33103e.key.participant || _0x488ee4, _0x4e5cea = _0x33103e.message?.extendedTextMessage?.contextInfo?.mentionedJid || [], _0x25e8d3 = _0x4e5cea[0] || _0x4ebf8e, _0x277f8b = await fetch("https://api.waifu.pics/sfw/lick"), _0x2fa75b = await _0x277f8b.json();
      if (!_0x2fa75b?.url) {
        const _0x562b79 = await fetch("https://nekos.life/api/v2/img/lick"), _0x727252 = await _0x562b79.json();
        if (!_0x727252?.url) {
          const _0x2b0830 = await fetch("https://nekos.best/api/v2/pat"), _0x374443 = await _0x2b0830.json();
          if (!_0x374443?.results?.[0]?.url) return _0x331ea2.sendMessage(_0x488ee4, {
            text: ANIME.U274C + " Failed to fetch lick reaction. Try again later! " + ANIME.U1F445
          }, {
            quoted: _0x33103e
          });
          const _0x15b2a6 = ANIME.U1F445 + " *LICK* " + ANIME.U1F445 + '\x0a@' + _0x25e8d3.split('@')[0] + " got licked by @" + _0x4ebf8e.split('@')[0] + '!\x20' + ANIME.U1F4A6;
          (await _0x331ea2.sendMessage(_0x488ee4, {
            react: {
              text: STATUS.SUCCESS,
              key: _0x33103e.key
            }
          }), await _0x331ea2.sendMessage(_0x488ee4, {
            image: {
              url: _0x374443.results[0].url
            },
            caption: _0x15b2a6,
            mentions: [_0x25e8d3, _0x4ebf8e]
          }, {
            quoted: _0x33103e
          }));
          return;
        }
        const _0x5edf17 = ANIME.U1F445 + '\x20*LICK*\x20' + ANIME.U1F445 + '\x0a@' + _0x25e8d3.split('@')[0] + " got licked by @" + _0x4ebf8e.split('@')[0] + '!\x20' + ANIME.U1F4A6;
        (await _0x331ea2.sendMessage(_0x488ee4, {
          react: {
            text: STATUS.SUCCESS,
            key: _0x33103e.key
          }
        }), await _0x331ea2.sendMessage(_0x488ee4, {
          image: {
            url: _0x727252.url
          },
          caption: _0x5edf17,
          mentions: [_0x25e8d3, _0x4ebf8e]
        }, {
          quoted: _0x33103e
        }));
        return;
      }
      const _0x2f1f43 = ANIME.U1F445 + " *LICK* " + ANIME.U1F445 + '\x0a@' + _0x25e8d3.split('@')[0] + " got licked by @" + _0x4ebf8e.split('@')[0] + '!\x20' + ANIME.U1F4A6;
      (await _0x331ea2.sendMessage(_0x488ee4, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x33103e.key
        }
      }), await _0x331ea2.sendMessage(_0x488ee4, {
        image: {
          url: _0x2fa75b.url
        },
        caption: _0x2f1f43,
        mentions: [_0x25e8d3, _0x4ebf8e]
      }, {
        quoted: _0x33103e
      }));
    } catch (_0xbfacf6) {
      (await _0x331ea2.sendMessage(_0x33103e.key.remoteJid, {
        react: {
          text: STATUS.ERROR,
          key: _0x33103e.key
        }
      }), console.error('Lick\x20command\x20error:', _0xbfacf6), await _0x331ea2.sendMessage(_0x33103e.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " An error occurred while processing the lick command."
      }, {
        quoted: _0x33103e
      }));
    }
  }
};
