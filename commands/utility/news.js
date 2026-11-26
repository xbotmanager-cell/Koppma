import {UTILITY} from '../../lib/emojis.js';
export default {
  name: "news",
  alias: ['vipnews', 'wolfnews', "headlines"],
  description: "Get the latest news headlines in VIPBOT style",
  category: "utility",
  async execute(_0x4d8dd1, _0x5b708c, _0x51c451) {
    try {
      const _0x5d8d7c = _0x5b708c.key.remoteJid, _0x52b435 = '13eb152f04d94647ac129c408439ae2d', _0x2b21be = _0x51c451.length > 0 ? _0x51c451.join('\x20') : 'technology', _0x45ea37 = "https://newsapi.org/v2/everything?q=" + encodeURIComponent(_0x2b21be) + '&sortBy=publishedAt&pageSize=5&apiKey=' + _0x52b435, _0x55ee75 = await fetch(_0x45ea37), _0x507900 = await _0x55ee75.json();
      if (!_0x507900.articles || _0x507900.articles.length === 0) {
        await _0x4d8dd1.sendMessage(_0x5d8d7c, {
          text: '💎 ' + UTILITY.ERROR + " No news found for *" + _0x2b21be + "*. No headlines found matching this topic."
        }, {
          quoted: _0x5b708c
        });
        return;
      }
      let _0x10f996 = '\x0a💎 *VIPBOT NEWS* 💎\x0a';
      (_0x10f996 += "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n", _0x10f996 += UTILITY.SEARCH + " Topic: *" + _0x2b21be.toUpperCase() + '*\x0a\x0a', _0x507900.articles.slice(0, 5).forEach((_0x2d89e8, _0x278040) => {
        (_0x10f996 += '✦ *' + (_0x278040 + 1) + '.\x20' + _0x2d89e8.title + '*\x0a', _0x10f996 += UTILITY.GLOBE + '\x20' + _0x2d89e8.url + '\x0a\x0a');
      }), _0x10f996 += "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n", _0x10f996 += UTILITY.LIGHTNING + " VIPBOT delivers the freshest headlines\n", await _0x4d8dd1.sendMessage(_0x5d8d7c, {
        text: _0x10f996
      }, {
        quoted: _0x5b708c
      }));
    } catch (_0x3f07f8) {
      (console.error(UTILITY.ERROR + " Error in news command:", _0x3f07f8), await _0x4d8dd1.sendMessage(_0x5b708c.key.remoteJid, {
        text: '💎 ' + UTILITY.WARNING + " Couldn't fetch the news... try again later."
      }, {
        quoted: _0x5b708c
      }));
    }
  }
};
