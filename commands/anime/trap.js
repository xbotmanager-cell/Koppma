import {ANIME, STATUS} from '../../lib/emojis.js';
export default {
  name: "trap",
  alias: ["astolfo", 'otokonoko', "femboy"],
  desc: 'Send\x20random\x20anime\x20trap\x20character\x20images',
  category: 'Anime',
  usage: '.trap',
  async execute(_0x50cfc0, _0x1859c9) {
    try {
      const _0x132c3e = _0x1859c9.key.remoteJid, _0x3491d7 = [async () => {
        const _0x2165fd = await fetch('https://api.waifu.pics/sfw/waifu'), _0x122a2f = await _0x2165fd.json();
        return _0x122a2f?.url;
      }, async () => {
        const _0x5b4ffc = await fetch("https://nekos.best/api/v2/neko"), _0xc94bab = await _0x5b4ffc.json();
        return _0xc94bab?.results?.[0]?.url;
      }, async () => {
        const _0x2c48cc = await fetch("https://api.waifu.im/search?included_tags=trap"), _0x5a1b53 = await _0x2c48cc.json();
        return _0x5a1b53?.images?.[0]?.url;
      }];
      let _0x467c47 = null;
      for (const _0x1ea88b of _0x3491d7) {
        try {
          _0x467c47 = await _0x1ea88b();
          if (_0x467c47) break;
        } catch (_0x43d763) {
          console.log('API\x20failed:\x20' + _0x43d763.message);
          continue;
        }
      }
      if (!_0x467c47) return _0x50cfc0.sendMessage(_0x132c3e, {
        image: {
          url: "https://i.pinimg.com/originals/7d/b4/ee/7db4ee3c1c6fe6d34f5b8c8f4a7c9a0f.gif"
        },
        caption: ANIME.U2728 + " *Astolfo Trap* " + ANIME.U2728 + "\nHere's a cute trap character for you!"
      }, {
        quoted: _0x1859c9
      });
      const _0x500de0 = [ANIME.U2728 + " *Trap-Kun Detected!* " + ANIME.U2728, ANIME.U1F4AB + " *Astolfo Has Arrived!* " + ANIME.U1F4AB, ANIME.U1F338 + " *Who's The Cutest Trap?* " + ANIME.U1F338, ANIME.U1F380 + " *Femboy Power!* " + ANIME.U1F380, ANIME.U26A1 + " *Otokonoko Magic!* " + ANIME.U26A1, ANIME.U1F496 + " *Trap Charm Activated!* " + ANIME.U1F496, ANIME.U1F31F + '\x20*100%\x20Pure\x20Cuteness!*\x20' + ANIME.U1F31F], _0x380140 = _0x500de0[Math.floor(Math.random() * _0x500de0.length)];
      (await _0x50cfc0.sendMessage(_0x132c3e, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x1859c9.key
        }
      }), await _0x50cfc0.sendMessage(_0x132c3e, {
        image: {
          url: _0x467c47
        },
        caption: _0x380140
      }, {
        quoted: _0x1859c9
      }));
    } catch (_0x584e47) {
      (console.error('Trap\x20command\x20error:', _0x584e47), await _0x50cfc0.sendMessage(jid, {
        react: {
          text: STATUS.ERROR,
          key: _0x1859c9.key
        }
      }), await _0x50cfc0.sendMessage(_0x1859c9.key.remoteJid, {
        text: ANIME.U26A0_FE0F + " Failed to fetch trap image. Please try again later!",
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true
        }
      }, {
        quoted: _0x1859c9
      }));
    }
  }
};
