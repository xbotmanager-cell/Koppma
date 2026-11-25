import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x42c25f from 'axios';
import {getBotName} from '../../lib/botname.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "copilot",
  description: "AI-powered assistant using Copilot API",
  category: 'ai',
  usage: 'copilot\x20[your\x20question]',
  async execute(_0x23d948, _0x4ffaf6, _0x57dcca, _0x4d5016, _0x522c1b) {
    const _0x4dd933 = _0x4ffaf6.key.remoteJid;
    try {
      if (_0x57dcca.length === 0) return _0x23d948.sendMessage(_0x4dd933, {
        text: "╭─⌈ " + SOCIAL.BOT + " *COPILOT AI* ⌋\n├─⊷ *" + _0x4d5016 + "copilot <question>*\n│  └⊷ Ask Copilot anything\n╰⊷ " + getFooter(_0x4ffaf6.key.participant || _0x4ffaf6.key.remoteJid)
      }, {
        quoted: _0x4ffaf6
      });
      const _0x464781 = _0x57dcca.join('\x20');
      (await _0x23d948.sendMessage(_0x4dd933, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x4ffaf6.key
        }
      }), console.log(SOCIAL.BOT + " Copilot query: \"" + _0x464781 + '\x22'));
      const _0xbed84a = "https://iamtkm.vercel.app/ai/copilot", _0x48217d = "tkm", _0x2a8563 = await _0x42c25f({
        method: "GET",
        url: _0xbed84a,
        params: {
          apikey: _0x48217d,
          text: _0x464781
        },
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36',
          Accept: "application/json, text/plain, */*"
        }
      });
      console.log(STATUS.SUCCESS + " Copilot API response:", _0x2a8563.data);
      let _0x25a9db = '', _0x58937c = "Unknown", _0x2bd2fe = [];
      if (_0x2a8563.data && typeof _0x2a8563.data === "object") {
        const _0x7a7a0a = _0x2a8563.data;
        if (_0x7a7a0a.status === true && _0x7a7a0a.result) (_0x25a9db = _0x7a7a0a.result, _0x58937c = _0x7a7a0a.creator || "cod3uchiha", _0x7a7a0a.citations && Array.isArray(_0x7a7a0a.citations) && (_0x2bd2fe = _0x7a7a0a.citations)); else {
          if (_0x7a7a0a.response) _0x25a9db = _0x7a7a0a.response; else _0x7a7a0a.answer ? _0x25a9db = _0x7a7a0a.answer : _0x25a9db = JSON.stringify(_0x7a7a0a, null, 2);
        }
      } else typeof _0x2a8563.data === "string" ? _0x25a9db = _0x2a8563.data : _0x25a9db = "No valid response received from AI.";
      _0x25a9db = _0x25a9db.trim();
      let _0x27bba7 = SOCIAL.BOT + '\x20*' + getBotName() + " COPILOT*\n\n";
      (_0x464781.length > 100 ? _0x27bba7 += UI.TARGET + " *Question:*\n" + _0x464781.substring(0, 100) + "...\n\n" : _0x27bba7 += UI.TARGET + " *Question:*\n" + _0x464781 + '\x0a\x0a', _0x27bba7 += STATUS.SPARKLE + " *Answer:*\n" + _0x25a9db + '\x0a\x0a', _0x27bba7 += '⚡\x20' + getFooter(_0x4ffaf6.key.participant || _0x4ffaf6.key.remoteJid), await _0x23d948.sendMessage(_0x4dd933, {
        text: _0x27bba7
      }, {
        quoted: _0x4ffaf6
      }), await _0x23d948.sendMessage(_0x4dd933, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x4ffaf6.key
        }
      }));
    } catch (_0xf4f43e) {
      console.error(STATUS.ERROR + " [COPILOT] ERROR:", _0xf4f43e);
      let _0xc41a47 = STATUS.ERROR + " *COPILOT ERROR*\n\n";
      if (_0xf4f43e.code === "ECONNREFUSED") (_0xc41a47 += "• API server is down\n", _0xc41a47 += "• Please try again later\n"); else {
        if (_0xf4f43e.code === "ETIMEDOUT") (_0xc41a47 += '•\x20Request\x20timeout\x20(30s)\x0a', _0xc41a47 += "• AI is thinking too long\n"); else {
          if (_0xf4f43e.response?.status === 404) _0xc41a47 += "• API endpoint not found\n"; else {
            if (_0xf4f43e.response?.status === 429) (_0xc41a47 += "• Rate limited\n", _0xc41a47 += "• Too many requests\n", _0xc41a47 += "• Wait a few minutes\n"); else {
              if (_0xf4f43e.response?.data) {
                const _0x19e97 = _0xf4f43e.response.data;
                (_0x19e97.error || _0x19e97.message) && (_0xc41a47 += "• API Error: " + (_0x19e97.error || _0x19e97.message) + '\x0a');
              } else _0xc41a47 += "• Error: " + _0xf4f43e.message + '\x0a';
            }
          }
        }
      }
      (_0xc41a47 += '\x0a' + UI.TOOL + " *Troubleshooting:*\n", _0xc41a47 += "1. Check your internet connection\n", _0xc41a47 += "2. Try simpler/shorter questions\n", _0xc41a47 += '3.\x20Wait\x201-2\x20minutes\x20and\x20retry\x0a', _0xc41a47 += "4. Contact bot admin if persistent", await _0x23d948.sendMessage(_0x4dd933, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x4ffaf6.key
        }
      }), await _0x23d948.sendMessage(_0x4dd933, {
        text: _0xc41a47
      }, {
        quoted: _0x4ffaf6
      }));
    }
  }
};
