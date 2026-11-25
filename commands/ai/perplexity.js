import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x514357 from 'axios';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "perplexity",
  aliases: ['plex', 'askweb', 'searchai', "aiweb"],
  category: 'ai',
  description: 'AI\x20assistant\x20powered\x20by\x20Perplexity\x20with\x20fallbacks',
  async execute(_0x5d021a, _0x14a2c0, _0x593c65, _0x22df9f) {
    const _0xc24921 = _0x14a2c0.key.remoteJid;
    if (_0x593c65.length === 0) return _0x5d021a.sendMessage(_0xc24921, {
      text: "╭─⌈ " + SOCIAL.BOT + " *PERPLEXITY AI* ⌋\n├─⊷ *" + _0x22df9f + "perplexity <question>*\n│  └⊷ Ask Perplexity anything\n├─⊷ *" + _0x22df9f + 'plex\x20<question>*\x0a│\x20\x20└⊷\x20Alias\x20for\x20perplexity\x0a├─⊷\x20*' + _0x22df9f + "searchai <question>*\n│  └⊷ Alias for perplexity\n╰⊷ " + getFooter(_0x14a2c0.key.participant || _0x14a2c0.key.remoteJid)
    }, {
      quoted: _0x14a2c0
    });
    const _0x4406c5 = _0x593c65.join('\x20');
    try {
      await _0x5d021a.sendMessage(_0xc24921, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x14a2c0.key
        }
      });
      const _0x5be77a = ["https://apiskeith.vercel.app/ai/perplexity?q=" + encodeURIComponent(_0x4406c5), "https://api.beautyofweb.com/perplexity?q=" + encodeURIComponent(_0x4406c5), "https://ai.tntechnical.com/api/perplexity?q=" + encodeURIComponent(_0x4406c5)];
      let _0x97e074 = null, _0x43c67f = '';
      for (const _0x253b0e of _0x5be77a) {
        try {
          console.log('[PERPLEXITY]\x20Trying:\x20' + _0x253b0e);
          const _0x502b19 = await _0x514357.get(_0x253b0e, {
            timeout: 25000,
            headers: {
              'User-Agent': "WolfBot/1.0"
            }
          });
          if (_0x502b19.data?.status && _0x502b19.data.result && !_0x502b19.data.result.includes("failed") && !_0x502b19.data.result.includes("error") && !_0x502b19.data.result.includes("500") && !_0x502b19.data.result.includes('Request\x20failed')) {
            (_0x97e074 = _0x502b19.data.result, _0x43c67f = _0x253b0e.split('/')[2]);
            break;
          }
        } catch (_0x21b76b) {
          console.log('[PERPLEXITY]\x20Endpoint\x20failed:\x20' + _0x21b76b.message);
          continue;
        }
      }
      if (!_0x97e074) {
        const _0x399df9 = _0x4406c5.toLowerCase();
        if (_0x399df9.includes("hello") || _0x399df9.includes('hi')) _0x97e074 = 'Hello!\x20' + UI.WAVE + " I'm Perplexity AI, here to help answer your questions with web-informed responses. How can I assist you today?"; else {
          if (_0x399df9.includes("weather")) _0x97e074 = "I'd need your specific location to check current weather. For accurate weather information, please specify your city or check a weather service like weather.com or accuweather.com."; else {
            if (_0x399df9.includes("news")) _0x97e074 = "For current news, I recommend checking reputable news sources like BBC News, CNN, Reuters, or Al Jazeera. You can also use Google News for the latest updates."; else {
              if (_0x399df9.includes("time")) {
                const _0x5795ff = new Date();
                _0x97e074 = "Current UTC time is: " + _0x5795ff.toUTCString() + '.\x20For\x20local\x20time,\x20please\x20specify\x20your\x20timezone\x20or\x20location.';
              } else _0x97e074 = 'I\x20received\x20your\x20question:\x20\x22' + _0x4406c5 + '\x22.\x20\x0a\x0aUnfortunately,\x20the\x20Perplexity\x20API\x20is\x20currently\x20experiencing\x20issues.\x20Please\x20try:\x0a1.\x20Rephrasing\x20your\x20question\x0a2.\x20Using\x20`' + _0x22df9f + "ilama` for general AI questions\n3. Trying again in a few minutes\n\nAlternatively, you can search the web directly for \"" + _0x4406c5 + '\x22.';
            }
          }
        }
        _0x43c67f = "WolfBot Fallback";
      }
      let _0x884020 = SOCIAL.BOT + " *PERPLEXITY AI*\n\n";
      (_0x884020 += UI.THOUGHT + " *Your Query:*\n" + _0x4406c5 + '\x0a\x0a', _0x884020 += STATUS.INFO + '\x20*Response:*\x0a' + _0x97e074 + '\x0a\x0a', _0x43c67f !== "WolfBot Fallback" && (_0x884020 += UI.TOOL + '\x20*Source:*\x20' + _0x43c67f + '\x0a'), _0x884020 += STATUS.SPARKLE + " *Note:* Responses may include web search information", await _0x5d021a.sendMessage(_0xc24921, {
        text: _0x884020
      }, {
        quoted: _0x14a2c0
      }), await _0x5d021a.sendMessage(_0xc24921, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x14a2c0.key
        }
      }));
    } catch (_0x10aefc) {
      (console.error('[PERPLEXITY]\x20Error:', _0x10aefc.message), await _0x5d021a.sendMessage(_0xc24921, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x14a2c0.key
        }
      }), await _0x5d021a.sendMessage(_0xc24921, {
        text: STATUS.ERROR + " *Perplexity Unavailable*\n\n" + "All AI services are currently unavailable.\n\n" + (STATUS.INFO + '\x20*Alternatives:*\x0a') + ("• Use `" + _0x22df9f + 'ilama`\x20for\x20general\x20AI\x20chat\x0a') + ('•\x20Use\x20`' + _0x22df9f + "flux` for AI image generation\n") + '•\x20Search\x20the\x20web\x20directly\x0a\x0a' + (UI.PIN + " *Example:* `" + _0x22df9f + 'ilama\x20' + _0x593c65.join('\x20') + '`')
      }, {
        quoted: _0x14a2c0
      }));
    }
  }
};
