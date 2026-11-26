import {ANIME, STATUS} from '../../lib/emojis.js';
import _0x32e890 from 'node-fetch';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const HUG_TYPES = {
  random: "hug",
  anime: "anime-hug",
  bear: 'bear-hug',
  cat: "cat-hug",
  dog: "dog-hug",
  friend: "friend-hug",
  group: "group-hug",
  tight: "tight-hug",
  warm: 'warm-hug',
  virtual: "virtual-hug",
  cute: "cute-hug",
  happy: "happy-hug",
  sad: 'sad-hug',
  comfort: "comfort-hug",
  love: "love-hug"
}, HUG_APIS = ["https://api.waifu.pics/sfw/hug", 'https://api.catboys.com/img', 'https://some-random-api.com/animu/hug'], userHugStats = new Map(), recentHugImages = new Set(), FALLBACK_GIFS = {
  random: ["https://i.giphy.com/media/3ZnBrkqoaI2hq/giphy.webp", "https://i.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.webp", "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  anime: ["https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp", "https://i.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy.webp", 'https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp', 'https://i.giphy.com/media/ArLxZ4QiC1Q52/giphy.webp'],
  bear: ["https://i.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.webp", "https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", 'https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp', "https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp"],
  cat: ["https://i.giphy.com/media/ArLxZ4QiC1Q52/giphy.webp", 'https://i.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.webp', "https://i.giphy.com/media/3ZnBrkqoaI2hq/giphy.webp", 'https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp'],
  dog: ["https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp", "https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", 'https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp', "https://i.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.webp"],
  friend: ['https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp', "https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp", "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  group: ['https://i.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy.webp', "https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", 'https://i.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.webp', "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  tight: ["https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", 'https://i.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.webp', "https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  warm: ["https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp", "https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  virtual: ["https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", 'https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp', "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  cute: ['https://i.giphy.com/media/ArLxZ4QiC1Q52/giphy.webp', 'https://i.giphy.com/media/3ZnBrkqoaI2hq/giphy.webp', "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp", "https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp"],
  happy: ["https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", "https://i.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy.webp", "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  sad: ["https://i.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.webp", "https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  comfort: ['https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp', "https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"],
  love: ["https://i.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.webp", "https://i.giphy.com/media/l0MYJnJQ4EiYLxvQ4/giphy.webp", "https://i.giphy.com/media/26tknCqiJrBQG6DrC/giphy.webp", "https://i.giphy.com/media/od5H3PmEG5EVq/giphy.webp"]
};
export default {
  name: "hug",
  alias: ["hugme", 'hugs', "cuddle", "embrace"],
  desc: "Send different hugs to someone!",
  category: "fun",
  usage: '.hug\x20-\x20Random\x20hug\x0a.hug\x20@user\x20-\x20Hug\x20a\x20user\x0a.hug\x20[type]\x20-\x20Specific\x20hug\x20type\x0a.hug\x20types\x20-\x20List\x20all\x20hug\x20types\x0a.hug\x20stats\x20-\x20Your\x20hug\x20statistics',
  async execute(_0x2971f9, _0x2a9d00, _0x5d685a) {
    try {
      const _0x4940f0 = _0x2a9d00.key.remoteJid, _0x1d84ce = _0x2a9d00.key.participant || _0x2a9d00.key.remoteJid, _0x2e91dd = _0x2a9d00.pushName || "User";
      !userHugStats.has(_0x1d84ce) && userHugStats.set(_0x1d84ce, {
        name: _0x2e91dd,
        hugsGiven: 0,
        hugsReceived: 0,
        favoriteType: "random",
        lastHugged: null,
        totalHugs: 0,
        uniqueHugs: new Set(),
        hugTypes: {}
      });
      const _0x522b71 = _0x5d685a[0]?.toLowerCase();
      if (_0x522b71 === "types" || _0x522b71 === "list") return await showHugTypes(_0x2971f9, _0x2a9d00, _0x4940f0);
      if (_0x522b71 === "stats") return await showStats(_0x2971f9, _0x2a9d00, _0x4940f0, _0x1d84ce);
      if (_0x522b71 === 'help') return await showHelp(_0x2971f9, _0x2a9d00, _0x4940f0);
      let _0x5bc17c = [], _0x5e4aa8 = null, _0x43048d = "everyone";
      _0x2a9d00.message?.extendedTextMessage?.contextInfo?.mentionedJid && (_0x5bc17c = _0x2a9d00.message.extendedTextMessage.contextInfo.mentionedJid);
      let _0x10a4cb = "random", _0x3880d3 = "Random Hug";
      _0x522b71 && HUG_TYPES[_0x522b71] && (_0x10a4cb = _0x522b71, _0x3880d3 = formatHugTypeName(_0x522b71));
      if (_0x5bc17c.length > 0) {
        _0x5e4aa8 = _0x5bc17c[0];
        try {
          const _0x528505 = await _0x2971f9.onWhatsApp(_0x5e4aa8);
          _0x528505 && _0x528505.length > 0 && (_0x43048d = _0x528505[0].name || _0x528505[0].jid.split('@')[0]);
        } catch (_0x34a578) {
          (console.error("Error getting user info:", _0x34a578), _0x43048d = "Friend");
        }
        return (updateHugStats(_0x1d84ce, _0x5e4aa8, _0x10a4cb), await sendHug(_0x2971f9, _0x2a9d00, _0x4940f0, _0x2e91dd, _0x43048d, _0x10a4cb, _0x3880d3, true));
      } else return _0x522b71 && !HUG_TYPES[_0x522b71] ? await sendHug(_0x2971f9, _0x2a9d00, _0x4940f0, _0x2e91dd, _0x2e91dd, _0x10a4cb, _0x3880d3, false) : (updateHugStats(_0x1d84ce, null, _0x10a4cb), await sendHug(_0x2971f9, _0x2a9d00, _0x4940f0, _0x2e91dd, 'everyone', _0x10a4cb, _0x3880d3, false));
    } catch (_0x2d85c2) {
      (console.error("Hug command error:", _0x2d85c2), await _0x2971f9.sendMessage(_0x2a9d00.key.remoteJid, {
        text: "╭┄〔 " + ANIME.U274C + " *HUG ERROR* 〕┄╮\n┆\n┆ ✦ " + _0x2d85c2.message + "\n┆   └─ Use *.hug help* for instructions\n┆\n╰┄ " + getFooter(_0x2a9d00.key.participant || _0x2a9d00.key.remoteJid)
      }, {
        quoted: _0x2a9d00
      }));
    }
  }
};
async function sendHug(_0x44e6c9, _0x31921f, _0x2dd53d, _0x452bfb, _0x1d3d95, _0x2987b2, _0x55b63f, _0x436e1e) {
  try {
    const _0x1e48b5 = await getHugGif(_0x2987b2, _0x452bfb);
    if (!_0x1e48b5 || !_0x1e48b5.url) return await _0x44e6c9.sendMessage(_0x2dd53d, {
      text: ANIME.U274C + " Couldn't get a hug GIF. Try again!"
    }, {
      quoted: _0x31921f
    });
    const _0x231eec = userHugStats.get(_0x31921f.key.participant || _0x31921f.key.remoteJid);
    _0x231eec && _0x231eec.uniqueHugs && _0x231eec.uniqueHugs.add(_0x1e48b5.url);
    let _0xc13327 = createHugCaption(_0x452bfb, _0x1d3d95, _0x55b63f, _0x436e1e, _0x1e48b5.isFallback);
    if (_0x231eec) {
      const _0x23a981 = _0x231eec.uniqueHugs?.size || 0;
      _0xc13327 += '\x0a\x0a' + ANIME.U1F4CA + " *Hug Variety:* " + _0x23a981 + " different hugs sent!";
      const _0x57b980 = [ANIME.U1F496 + " Hugs release oxytocin, the 'love hormone'!", ANIME.U1F917 + " 20-second hugs can reduce stress and blood pressure!", ANIME.U1F495 + " Hugging boosts your immune system!", ANIME.U2728 + '\x20The\x20average\x20hug\x20lasts\x203\x20seconds,\x20but\x2020-second\x20hugs\x20have\x20therapeutic\x20effects!', ANIME.U1F31F + '\x20Hugs\x20can\x20instantly\x20boost\x20mood\x20and\x20happiness\x20levels!', ANIME.U1F49D + '\x20Physical\x20touch\x20through\x20hugs\x20can\x20reduce\x20feelings\x20of\x20loneliness!', ANIME.U1FAC2 + " Hugging increases feelings of trust and safety!"];
      if (Math.random() > 0.5) {
        const _0x11dec9 = _0x57b980[Math.floor(Math.random() * _0x57b980.length)];
        _0xc13327 += '\x0a' + _0x11dec9;
      }
    }
    (await _0x44e6c9.sendMessage(_0x2dd53d, {
      react: {
        text: STATUS.SUCCESS,
        key: _0x31921f.key
      }
    }), await _0x44e6c9.sendMessage(_0x2dd53d, {
      image: {
        url: _0x1e48b5.url
      },
      caption: _0xc13327,
      mentions: _0x436e1e ? [_0x1d3d95.includes('@') ? _0x1d3d95 : null].filter(Boolean) : []
    }, {
      quoted: _0x31921f
    }), addRecentHug(_0x1e48b5.url), Math.random() > 0.7 && setTimeout(async () => {
      const _0x2cda28 = getVarietyMessage(_0x2987b2);
      await _0x44e6c9.sendMessage(_0x2dd53d, {
        text: _0x2cda28
      });
    }, 1000));
  } catch (_0x5159aa) {
    (await _0x44e6c9.sendMessage(_0x2dd53d, {
      react: {
        text: STATUS.ERROR,
        key: _0x31921f.key
      }
    }), console.error("Send hug error:", _0x5159aa));
    throw _0x5159aa;
  }
}
async function getHugGif(_0x4fb5db = "random", _0x472b6b = "User") {
  const _0xeb5d30 = 3;
  for (let _0x128880 = 1; _0x128880 <= _0xeb5d30; _0x128880++) {
    try {
      const _0x3d29ec = Math.floor(Math.random() * HUG_APIS.length);
      let _0x239393 = HUG_APIS[_0x3d29ec], _0x3edf0b = null;
      if (_0x239393.includes("waifu.pics")) _0x3edf0b = {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          type: HUG_TYPES[_0x4fb5db] || HUG_TYPES.random
        })
      }; else _0x239393.includes("catboys.com") ? _0x3edf0b = {
        method: "GET"
      } : _0x3edf0b = {
        method: 'GET'
      };
      const _0x58bb10 = await _0x32e890(_0x239393, {
        ..._0x3edf0b,
        timeout: 5000
      });
      if (_0x58bb10.ok) {
        const _0x483c91 = await _0x58bb10.json();
        let _0x485ba5 = null;
        if (_0x483c91.url) _0x485ba5 = _0x483c91.url; else {
          if (_0x483c91.link) _0x485ba5 = _0x483c91.link; else {
            if (_0x483c91.image) _0x485ba5 = _0x483c91.image; else _0x483c91.data?.url && (_0x485ba5 = _0x483c91.data.url);
          }
        }
        if (_0x485ba5 && !recentHugImages.has(_0x485ba5)) return {
          url: _0x485ba5,
          type: _0x4fb5db,
          api: _0x239393,
          isFallback: false
        };
      }
    } catch (_0x1af13a) {
      (console.log("API attempt " + _0x128880 + " failed:", _0x1af13a.message), _0x128880 === _0xeb5d30 && console.log("All API attempts failed, using fallback GIFs"));
    }
    await new Promise(_0xb2439c => setTimeout(_0xb2439c, 500));
  }
  return getVariedFallbackGif(_0x4fb5db, _0x472b6b);
}
function getVariedFallbackGif(_0x496478, _0x4c5cc3) {
  const _0x478ad9 = Array.from(_0x4c5cc3).reduce((_0x3740cf, _0x4fade0) => {
    return _0x4fade0.charCodeAt(0) + ((_0x3740cf << 5) - _0x3740cf);
  }, 0), _0x323a57 = FALLBACK_GIFS[_0x496478] || FALLBACK_GIFS.random, _0xa44e7b = Math.floor(Date.now() / 10000) % _0x323a57.length, _0x529a73 = Math.abs(_0x478ad9) % _0x323a57.length, _0x3fb6c8 = (_0xa44e7b + _0x529a73) % _0x323a57.length;
  let _0x554bfa = _0x3fb6c8;
  for (let _0x14a60e = 0; _0x14a60e < _0x323a57.length; _0x14a60e++) {
    const _0x53350c = (_0x3fb6c8 + _0x14a60e) % _0x323a57.length;
    if (!recentHugImages.has(_0x323a57[_0x53350c])) {
      _0x554bfa = _0x53350c;
      break;
    }
  }
  return {
    url: _0x323a57[_0x554bfa],
    type: _0x496478,
    api: 'fallback',
    isFallback: true
  };
}
function createHugCaption(_0x3fb91a, _0x256835, _0x4047b2, _0xb228df, _0x4efb06 = false) {
  const _0x3f795a = {
    random: [ANIME.U1F917 + " *Random Hug!* A surprise embrace!", ANIME.U2728 + " *Mystery Hug!* You never know what you'll get!", ANIME.U1F3B2 + " *Lucky Hug!* Random act of kindness!", ANIME.U1F381 + " *Surprise Hug!* An unexpected embrace!", ANIME.U1F308 + '\x20*Colorful\x20Hug!*\x20Full\x20of\x20surprises!'],
    anime: [ANIME.U1F338 + '\x20*Anime\x20Hug!*\x20Kawaii\x20desu~', ANIME.U1F38C + " *Japanese Hug!* Daisuki! (I love you!)", ANIME.U2728 + " *Manga Hug!* Straight from the pages!", ANIME.U1F38E + " *Kawaii Hug!* Too cute to handle!", ANIME.U1F338 + '\x20*Sakura\x20Hug!*\x20Blooming\x20with\x20affection!'],
    bear: [ANIME.U1F43B + " *Bear Hug!* Rawr! Extra fuzzy!", ANIME.U1F9F8 + '\x20*Teddy\x20Bear\x20Hug!*\x20Super\x20cuddly!', ANIME.U1F332 + " *Wilderness Hug!* Nature's embrace!", ANIME.U1F3D4_FE0F + " *Mountain Hug!* Strong and steady!", ANIME.U1F43E + " *Paw-some Hug!* Bear-y special!"]
  };
  let _0x1e1f35 = '';
  if (_0x3f795a[_0x4047b2.toLowerCase().replace('\x20hug', '')]) {
    const _0x503dd1 = _0x3f795a[_0x4047b2.toLowerCase().replace(" hug", '')];
    _0x1e1f35 = _0x503dd1[Math.floor(Math.random() * _0x503dd1.length)];
  } else {
    const _0xc9d108 = [ANIME.U1F917 + '\x20*' + _0x4047b2 + "!* Warm embrace incoming!", ANIME.U1F496 + '\x20*' + _0x4047b2 + '!*\x20Spread\x20the\x20love!', ANIME.U2728 + '\x20*' + _0x4047b2 + "!* Positive vibes!", ANIME.U1FAC2 + '\x20*' + _0x4047b2 + "!* Comfort and care!", ANIME.U1F31F + '\x20*' + _0x4047b2 + "!* Shining with affection!"];
    _0x1e1f35 = _0xc9d108[Math.floor(Math.random() * _0xc9d108.length)];
  }
  let _0x4bbd1a = _0x1e1f35 + '\x0a\x0a';
  const _0x1a648d = {
    targeted: ["From: *" + _0x3fb91a + '*\x20' + ANIME.U1F917 + "\nTo: *" + _0x256835 + '*\x20' + ANIME.U1F496, ANIME.U1F91D + '\x20*' + _0x3fb91a + "* → *" + _0x256835 + "*\nConnection established!", ANIME.U1F495 + '\x20' + _0x3fb91a + " shares love with " + _0x256835 + '!', ANIME.U2728 + '\x20' + _0x3fb91a + " sends positive energy to " + _0x256835 + '!', ANIME.U1FAC2 + '\x20' + _0x3fb91a + " embraces " + _0x256835 + '\x20with\x20care!'],
    group: ["From: *" + _0x3fb91a + '*\x20' + ANIME.U1F31F + "\nTo: *Everyone in the chat!* " + ANIME.U1F389, ANIME.U1F468_200D_1F469_200D_1F467_200D_1F466 + " Group hug initiated by " + _0x3fb91a + '!', ANIME.U1F308 + '\x20' + _0x3fb91a + " shares love with the whole group!", ANIME.U1F38A + '\x20Community\x20embrace\x20from\x20' + _0x3fb91a + '!', ANIME.U1F917 + '\x20' + _0x3fb91a + " hugs everyone at once!"],
    self: ['*' + _0x3fb91a + " gives themselves a well-deserved hug!* " + ANIME.U1F49D, ANIME.U2728 + '\x20' + _0x3fb91a + '\x20practices\x20self-care\x20with\x20a\x20hug!', ANIME.U1F496 + '\x20' + _0x3fb91a + " shows themselves some love!", ANIME.U1FAC2 + '\x20Self-embrace\x20from\x20' + _0x3fb91a + '!', ANIME.U1F31F + '\x20' + _0x3fb91a + '\x20deserves\x20this\x20hug!']
  };
  if (_0xb228df) {
    const _0x2dafd9 = _0x1a648d.targeted;
    _0x4bbd1a += _0x2dafd9[Math.floor(Math.random() * _0x2dafd9.length)];
  } else {
    if (_0x256835 === "everyone") {
      const _0x5430c5 = _0x1a648d.group;
      _0x4bbd1a += _0x5430c5[Math.floor(Math.random() * _0x5430c5.length)];
    } else {
      const _0x5c8c64 = _0x1a648d.self;
      _0x4bbd1a += _0x5c8c64[Math.floor(Math.random() * _0x5c8c64.length)];
    }
  }
  const _0x23cf8f = ['\x0a\x0a' + ANIME.U1F495 + " *\"A hug is a perfect gift - one size fits all, and nobody minds if you exchange it.\"*", '\x0a\x0a' + ANIME.U1F31F + " *\"Sometimes the simplest things mean the most.\"*", '\x0a\x0a' + ANIME.U2728 + '\x20*\x22Hugs\x20are\x20the\x20universal\x20medicine.\x22*', '\x0a\x0a' + ANIME.U1F496 + " *\"The best therapy is a long hug from someone who cares.\"*", '\x0a\x0a' + ANIME.U1F917 + " *\"No matter how hard the day, a hug makes it better.\"*", '\x0a\x0a' + ANIME.U1FAC2 + " *\"Hugs: the silent way of saying 'You matter to me.'\"*", '\x0a\x0a' + ANIME.U1F308 + " *\"A hug is like a boomerang - you get it back right away.\"*"];
  return (_0x4bbd1a += _0x23cf8f[Math.floor(Math.random() * _0x23cf8f.length)], _0x4efb06 && (_0x4bbd1a += '\x0a\x0a' + ANIME.U1F527 + " *Using cached hug #" + (Math.floor(Math.random() * 100) + 1) + '*'), _0x4bbd1a);
}
function updateHugStats(_0x570ded, _0x85b8dd, _0x811c8f) {
  const _0x17ef57 = userHugStats.get(_0x570ded);
  if (_0x17ef57) {
    (_0x17ef57.hugsGiven++, _0x17ef57.totalHugs++, _0x17ef57.lastHugged = Date.now(), _0x17ef57.hugTypes[_0x811c8f] = (_0x17ef57.hugTypes[_0x811c8f] || 0) + 1);
    let _0xbbb9fe = 'random', _0x4671ba = 0;
    for (const [_0x43b5a7, _0x4048b3] of Object.entries(_0x17ef57.hugTypes)) {
      _0x4048b3 > _0x4671ba && (_0x4671ba = _0x4048b3, _0xbbb9fe = _0x43b5a7);
    }
    _0x17ef57.favoriteType = _0xbbb9fe;
  }
  if (_0x85b8dd && _0x85b8dd !== _0x570ded) {
    !userHugStats.has(_0x85b8dd) && userHugStats.set(_0x85b8dd, {
      name: "Unknown User",
      hugsGiven: 0,
      hugsReceived: 0,
      favoriteType: "random",
      lastHugged: Date.now(),
      totalHugs: 0,
      uniqueHugs: new Set(),
      hugTypes: {}
    });
    const _0x3c5054 = userHugStats.get(_0x85b8dd);
    _0x3c5054 && (_0x3c5054.hugsReceived++, _0x3c5054.totalHugs++, _0x3c5054.lastHugged = Date.now());
  }
}
function addRecentHug(_0x2d3bfd) {
  recentHugImages.add(_0x2d3bfd);
  if (recentHugImages.size > 50) {
    const _0xe5f6d = Array.from(recentHugImages)[0];
    recentHugImages.delete(_0xe5f6d);
  }
  setTimeout(() => {
    recentHugImages.delete(_0x2d3bfd);
  }, 3600000);
}
function getVarietyMessage(_0x112637) {
  const _0x449263 = [ANIME.U1F4A1 + '\x20*Tip:*\x20Try\x20`.hug\x20' + getRandomDifferentType(_0x112637) + "` for a different style!", ANIME.U1F3A8 + '\x20*Variety\x20is\x20the\x20spice\x20of\x20life!*\x20Try\x20other\x20hug\x20types!', ANIME.U1F308 + " *Different hugs, same love!* Explore all hug types with `.hug types`", ANIME.U2728 + '\x20*Keep\x20the\x20love\x20flowing!*\x20Each\x20hug\x20type\x20has\x20its\x20own\x20special\x20vibe!', ANIME.U1F917 + " *Hug Explorer:* You've tried " + _0x112637 + ',\x20now\x20try\x20another\x20type!'];
  return _0x449263[Math.floor(Math.random() * _0x449263.length)];
}
function getRandomDifferentType(_0x518c70) {
  const _0x551929 = Object.keys(HUG_TYPES).filter(_0x306a62 => _0x306a62 !== _0x518c70);
  return _0x551929[Math.floor(Math.random() * _0x551929.length)];
}
function formatHugTypeName(_0xa9faa9) {
  const _0x5a5ab3 = {
    random: "Random Hug",
    anime: "Anime Hug",
    bear: "Bear Hug",
    cat: 'Cat\x20Hug',
    dog: "Dog Hug",
    friend: "Friend Hug",
    group: 'Group\x20Hug',
    tight: "Tight Hug",
    warm: "Warm Hug",
    virtual: "Virtual Hug",
    cute: 'Cute\x20Hug',
    happy: 'Happy\x20Hug',
    sad: 'Sad\x20Hug',
    comfort: "Comfort Hug",
    love: 'Love\x20Hug'
  };
  return _0x5a5ab3[_0xa9faa9] || 'Random\x20Hug';
}
async function showHugTypes(_0x507abd, _0x4163bf, _0x16d700) {
  let _0x1198fc = "╭┄〔 " + ANIME.U1F917 + " *HUG TYPES* " + ANIME.U1F917 + " 〕┄╮\n┆\n";
  const _0x3b7a55 = Object.keys(HUG_TYPES);
  for (const _0x4dc6b2 of _0x3b7a55) {
    _0x1198fc += "┆ ✦ *.hug " + _0x4dc6b2 + "*\n┆   └─ " + formatHugTypeName(_0x4dc6b2) + '\x0a';
  }
  (_0x1198fc += "┆\n┆ ✦ *.hug @user*\n┆   └─ Random hug for user\n", _0x1198fc += '┆ ✦ *.hug\x20anime\x20@friend*\x0a┆ \x20╰┄ \x20Anime\x20hug\x0a', _0x1198fc += '┆ ✦ *.hug\x20bear*\x0a┆ \x20╰┄ \x20Bear\x20hug\x20for\x20yourself\x0a', _0x1198fc += '┆ ✦ *.hug*\x0a┆ \x20╰┄ \x20Random\x20hug\x20for\x20everyone\x0a┆\x0a', _0x1198fc += "╰─── " + ANIME.U1F496 + '\x20*Each\x20type\x20gives\x20different\x20hugs\x20every\x20time!*\x20' + ANIME.U1F496, await _0x507abd.sendMessage(_0x16d700, {
    text: _0x1198fc
  }, {
    quoted: _0x4163bf
  }));
}
async function showStats(_0x518120, _0xfad4a7, _0x20841d, _0x36282c) {
  const _0x16179f = userHugStats.get(_0x36282c) || ({
    hugsGiven: 0,
    hugsReceived: 0,
    totalHugs: 0,
    favoriteType: "random",
    uniqueHugs: new Set()
  }), _0x29b695 = formatHugTypeName(_0x16179f.favoriteType), _0x333dde = _0x16179f.uniqueHugs?.size || 0;
  let _0x22e2ec = ANIME.U1F4CA + '\x20*HUG\x20STATISTICS*\x20' + ANIME.U1F4CA + '\x0a\x0a';
  (_0x22e2ec += ANIME.U1F917 + " *Hugs Given:* " + _0x16179f.hugsGiven + '\x0a', _0x22e2ec += ANIME.U1F496 + '\x20*Hugs\x20Received:*\x20' + _0x16179f.hugsReceived + '\x0a', _0x22e2ec += ANIME.U1F4C8 + " *Total Hugs:* " + _0x16179f.totalHugs + '\x0a', _0x22e2ec += ANIME.U1F3A8 + " *Unique Hugs:* " + _0x333dde + " different images\n", _0x22e2ec += "⭐ *Favorite Type:* " + _0x29b695 + '\x0a');
  _0x16179f.hugTypes && Object.keys(_0x16179f.hugTypes).length > 0 && (_0x22e2ec += "\n*Hug Type Distribution:*\n", Object.entries(_0x16179f.hugTypes).sort(([, _0x5aa635], [, _0x1425a0]) => _0x1425a0 - _0x5aa635).slice(0, 5).forEach(([_0x1ce6e4, _0x2a6c40]) => {
    const _0x1ef108 = Math.round(_0x2a6c40 / _0x16179f.hugsGiven * 100), _0x1ce76c = ('█').repeat(Math.round(_0x1ef108 / 10)) + ('░').repeat(10 - Math.round(_0x1ef108 / 10));
    _0x22e2ec += formatHugTypeName(_0x1ce6e4) + ':\x20' + _0x1ce76c + '\x20' + _0x1ef108 + '%\x0a';
  }));
  if (_0x16179f.lastHugged) {
    const _0x329fcd = new Date(_0x16179f.lastHugged);
    _0x22e2ec += "⏰ *Last Hugged:* " + _0x329fcd.toLocaleDateString() + '\x0a';
  }
  if (_0x16179f.hugsGiven > 0) {
    const _0x638bd0 = Math.round(_0x333dde / _0x16179f.hugsGiven * 100);
    _0x22e2ec += ANIME.U1F308 + " *Variety Score:* " + _0x638bd0 + '%\x0a';
    if (_0x638bd0 > 80) _0x22e2ec += '\x0a' + ANIME.U1F3A8 + '\x20*Hug\x20Artist!*\x20You\x20love\x20trying\x20different\x20hugs!\x0a'; else {
      if (_0x638bd0 > 60) _0x22e2ec += '\x0a' + ANIME.U2728 + '\x20*Hug\x20Explorer!*\x20You\x20enjoy\x20variety!\x0a'; else _0x638bd0 > 40 ? _0x22e2ec += '\x0a' + ANIME.U1F917 + '\x20*Consistent\x20Hugger!*\x20You\x20have\x20your\x20favorites!\x0a' : _0x22e2ec += '\x0a' + ANIME.U1F496 + " *Traditional Hugger!* You stick to what you love!\n";
    }
  }
  (_0x22e2ec += "\n*Keep spreading different kinds of love!* " + ANIME.U1F495, await _0x518120.sendMessage(_0x20841d, {
    text: _0x22e2ec
  }, {
    quoted: _0xfad4a7
  }));
}
async function showHelp(_0x3f729e, _0x26c1b2, _0x3de179) {
  const _0x552325 = '╭┄〔 \x20' + ANIME.U1F917 + " *HUG HELP* " + ANIME.U1F917 + " 〕┄╮\n┆\n" + "┆ ✦ *.hug*\n┆   └─ Send random hug to everyone\n" + "┆ ✦ *.hug @user*\n┆   └─ Hug a specific user\n" + "┆ ✦ *.hug [type]*\n┆   └─ Specific hug type\n" + '┆ ✦ *.hug\x20types*\x0a┆ \x20╰┄ \x20List\x20all\x2015+\x20hug\x20types\x0a' + "┆ ✦ *.hug stats*\n┆   └─ Your hug statistics & variety score\n" + "┆ ✦ *.hug help*\n┆   └─ This help menu\n┆\n" + ('┆ ' + ANIME.U2728 + " *Popular Types:*\n┆\n") + "┆ ✦ *anime*\n┆   └─ Anime-style hugs\n" + "┆ ✦ *bear*\n┆   └─ Bear hugs\n" + '┆ ✦ *cat*\x0a┆ \x20╰┄ \x20Cat\x20cuddles\x0a' + '┆ ✦ *dog*\x0a┆ \x20╰┄ \x20Doggy\x20hugs\x0a' + "┆ ✦ *group*\n┆   └─ Group hugs\n" + "┆ ✦ *virtual*\n┆   └─ Digital hugs\n┆\n" + ("╰─── " + ANIME.U1F49D + " *Every hug is unique! Try the same type multiple times!* " + ANIME.U1F49D);
  await _0x3f729e.sendMessage(_0x3de179, {
    text: _0x552325
  }, {
    quoted: _0x26c1b2
  });
}
setInterval(() => {
  (console.log("Clearing hug cache. Currently tracking: " + recentHugImages.size + " images"), recentHugImages.clear());
}, 86400000);
