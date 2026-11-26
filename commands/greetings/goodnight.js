import _0x4f00b1 from 'fs';
import _0x424bd2 from 'path';
import {fileURLToPath} from 'url';
import {GREETINGS} from '../../lib/emojis.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x424bd2.dirname(__filename);
export default {
  name: 'goodnight',
  alias: ['gn', "night", "goodnite"],
  description: 'Send\x20a\x20wolf-themed\x20good\x20night\x20with\x20ego\x20flair,\x20borders,\x20and\x20an\x20ominous\x20whisper',
  category: "fun",
  async execute(_0x42956a, _0x477464, _0x1ea152) {
    try {
      const _0x12a7d7 = _0x477464.key.remoteJid, _0x550c6f = _0x477464.key.participant || _0x12a7d7, _0x3b3bff = _0x424bd2.join(__dirname, 'media', 'image.png'), _0x478940 = _0x424bd2.join(__dirname, '../media', "image.png"), _0x243337 = _0x4f00b1.existsSync(_0x3b3bff) ? _0x3b3bff : _0x4f00b1.existsSync(_0x478940) ? _0x478940 : null;
      let _0x53b6ca = [], _0x4b2ff5 = '';
      if (_0x12a7d7.endsWith("@g.us")) {
        const _0x3a2e65 = await _0x42956a.groupMetadata(_0x12a7d7), _0x50611e = _0x3a2e65.participants.map(_0x4baee4 => _0x4baee4.id);
        if (_0x1ea152.length > 0) {
          const _0x132bde = _0x1ea152[0].replace(/[@ ]/g, '') + "@s.whatsapp.net";
          _0x50611e.includes(_0x132bde) ? (_0x53b6ca = [_0x132bde], _0x4b2ff5 = '@' + _0x132bde.split('@')[0]) : (_0x53b6ca = [_0x550c6f], _0x4b2ff5 = '@' + _0x550c6f.split('@')[0]);
        } else (_0x53b6ca = _0x50611e, _0x4b2ff5 = 'everyone');
      } else (_0x53b6ca = [_0x550c6f], _0x4b2ff5 = '@' + _0x550c6f.split('@')[0]);
      const _0x435add = ('\x0a' + GREETINGS.NIGHT_MOON + '💎' + '┈┄┈┄✦┈┄┈┄✦┈┄┈┄' + GREETINGS.NIGHT_MOON + '💎\x0a💎 GOOD NIGHT, ' + _0x4b2ff5 + ' 💎\x0a' + GREETINGS.NIGHT_MOON + '💎┈┄┈┄✦┈┄┈┄✦┈┄┈┄' + GREETINGS.NIGHT_MOON + '💎\n\nRest well. VIPBOT watches as the world exhales.\nDream well and wake with renewed energy and purpose.\nMay tonight bring you peace, rest, and sweet dreams.\nSleep tight and wake refreshed.\n\n    _"Tomorrow brings another day to shine."_ 👑\x0a' + GREETINGS.NIGHT_MOON + '💎┈┄┈┄✦┈┄┈┄✦┈┄┈┄' + GREETINGS.NIGHT_MOON + '💎\x0a').trim();
      (_0x243337 ? await _0x42956a.sendMessage(_0x12a7d7, {
        image: _0x4f00b1.readFileSync(_0x243337),
        caption: _0x435add,
        mentions: _0x53b6ca,
        mimetype: "image/jpeg"
      }, {
        quoted: _0x477464
      }) : await _0x42956a.sendMessage(_0x12a7d7, {
        text: _0x435add,
        mentions: _0x53b6ca
      }, {
        quoted: _0x477464
      }), console.log(GREETINGS.SUCCESS + " Good night sent successfully!"));
    } catch (_0x331acc) {
      (console.error(GREETINGS.ERROR + '\x20Good\x20night\x20command\x20error:', _0x331acc), await _0x42956a.sendMessage(_0x477464.key.remoteJid, {
        text: GREETINGS.WARNING + " Something went wrong while sending the good night message."
      }, {
        quoted: _0x477464
      }));
    }
  }
};
