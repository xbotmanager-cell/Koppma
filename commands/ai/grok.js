import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x4754e3 from 'axios';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "grok",
  category: 'AI',
  aliases: ['xgrok', "xai", 'elonai'],
  description: "Query X AI Grok via Keith's API",
  async execute(_0x1ceeb5, _0x47aea9, _0x1e36b8, _0x4880db) {
    const _0x4b0a7b = _0x47aea9.key.remoteJid, _0xc462f8 = _0x47aea9.quoted;
    let _0xd39519 = '';
    if (_0x1e36b8.length > 0) _0xd39519 = _0x1e36b8.join('\x20'); else {
      if (_0xc462f8 && _0xc462f8.text) _0xd39519 = _0xc462f8.text; else {
        await _0x1ceeb5.sendMessage(_0x4b0a7b, {
          text: "╭─⌈ " + SOCIAL.BOT + '\x20*X\x20AI\x20GROK*\x20⌋\x0a├─⊷\x20*' + _0x4880db + "grok <question>*\n│  └⊷ Ask Grok anything\n├─⊷ *" + _0x4880db + "xgrok <question>*\n│  └⊷ Alias for grok\n├─⊷ *" + _0x4880db + "xai <question>*\n│  └⊷ Alias for grok\n╰⊷ " + getFooter(_0x47aea9.key.participant || _0x47aea9.key.remoteJid)
        }, {
          quoted: _0x47aea9
        });
        return;
      }
    }
    console.log(SOCIAL.BOT + " [GROK] Query: \"" + _0xd39519 + '\x22');
    try {
      await _0x1ceeb5.sendMessage(_0x4b0a7b, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x47aea9.key
        }
      });
      const _0x73f6d7 = "https://apiskeith.vercel.app/ai/grok?q=" + encodeURIComponent(_0xd39519);
      console.log(SOCIAL.GLOBE + " [GROK] Calling API: " + _0x73f6d7);
      const _0x444d0b = await _0x4754e3({
        method: "GET",
        url: _0x73f6d7,
        timeout: 30000,
        headers: {
          'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "application/json",
          Referer: "https://apiskeith.vercel.app/",
          Origin: "https://apiskeith.vercel.app"
        },
        validateStatus: function (_0x5eecff) {
          return _0x5eecff >= 200 && _0x5eecff < 500;
        }
      });
      console.log(STATUS.SUCCESS + '\x20[GROK]\x20Response\x20status:\x20' + _0x444d0b.status);
      let _0x3ded75 = '', _0x26baf2 = {
        creator: "X AI",
        model: 'Grok',
        status: true,
        source: "Keith API"
      };
      if (_0x444d0b.data && typeof _0x444d0b.data === "object") {
        const _0x570673 = _0x444d0b.data;
        console.log(UI.CHART + " Grok API Response structure:", Object.keys(_0x570673));
        if (_0x570673.status === true && _0x570673.result) (_0x3ded75 = _0x570673.result, console.log(STATUS.SUCCESS + " Using data.result")); else {
          if (_0x570673.response) (_0x3ded75 = _0x570673.response, console.log(STATUS.SUCCESS + " Using data.response")); else {
            if (_0x570673.answer) (_0x3ded75 = _0x570673.answer, console.log(STATUS.SUCCESS + " Using data.answer")); else {
              if (_0x570673.text) (_0x3ded75 = _0x570673.text, console.log(STATUS.SUCCESS + " Using data.text")); else {
                if (_0x570673.content) (_0x3ded75 = _0x570673.content, console.log(STATUS.SUCCESS + " Using data.content")); else {
                  if (_0x570673.message) (_0x3ded75 = _0x570673.message, console.log(STATUS.SUCCESS + " Using data.message")); else {
                    if (_0x570673.data) (_0x3ded75 = _0x570673.data, console.log(STATUS.SUCCESS + '\x20Using\x20data.data')); else {
                      if (_0x570673.error) {
                        console.log(STATUS.ERROR + " API error:", _0x570673.error);
                        throw new Error(_0x570673.error || "Grok API returned error");
                      } else _0x3ded75 = extractGrokResponse(_0x570673);
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        if (typeof _0x444d0b.data === "string") (console.log(STATUS.SUCCESS + " Response is string"), _0x3ded75 = _0x444d0b.data); else {
          console.log(STATUS.ERROR + " Invalid response format");
          throw new Error("Invalid API response format");
        }
      }
      if (!_0x3ded75 || _0x3ded75.trim() === '') {
        console.log(STATUS.ERROR + " Empty response");
        throw new Error('Grok\x20returned\x20empty\x20response');
      }
      (_0x3ded75 = _0x3ded75.trim(), console.log(UI.NOTE + " Response length: " + _0x3ded75.length + " characters"));
      const _0x1e2ba6 = _0x3ded75.toLowerCase();
      if (_0x1e2ba6.includes('error:') || _0x1e2ba6.startsWith("error") || _0x1e2ba6.includes("failed to") || _0x1e2ba6.includes("unavailable") || _0x1e2ba6.includes("not found")) {
        console.log(STATUS.ERROR + " Response contains error indicator");
        throw new Error(_0x3ded75);
      }
      _0x3ded75 = formatGrokResponse(_0x3ded75);
      _0x3ded75.length > 2500 && (_0x3ded75 = _0x3ded75.substring(0, 2500) + "\n\n... (response truncated for WhatsApp)");
      let _0x58d87d = SOCIAL.BOT + " *X AI GROK*\n\n";
      const _0x254c06 = _0xd39519.length > 80 ? _0xd39519.substring(0, 80) + "..." : _0xd39519;
      (_0x58d87d += UI.THOUGHT + " *Query:* " + _0x254c06 + '\x0a\x0a', _0x58d87d += SOCIAL.BOT + " *Grok's Response:*\n" + _0x3ded75 + '\x0a\x0a', _0x58d87d += '⚡\x20*Powered\x20by\x20X\x20AI\x20Grok*\x0a', _0x58d87d += UI.ROCKET + '\x20*Elon\x20Musk\x27s\x20AI\x20Assistant*', console.log(UI.UPLOAD + " Sending final response to WhatsApp"), await _0x1ceeb5.sendMessage(_0x4b0a7b, {
        text: _0x58d87d
      }, {
        quoted: _0x47aea9
      }), await _0x1ceeb5.sendMessage(_0x4b0a7b, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x47aea9.key
        }
      }), console.log(STATUS.SUCCESS + " Grok response sent successfully"));
    } catch (_0x26d2b5) {
      (console.error(STATUS.ERROR + '\x20[X\x20AI\x20Grok]\x20ERROR:', _0x26d2b5), console.error(STATUS.ERROR + " Error stack:", _0x26d2b5.stack));
      let _0x4badcd = STATUS.ERROR + " *X AI GROK ERROR*\n\n";
      if (_0x26d2b5.code === 'ECONNREFUSED') (_0x4badcd += "• Grok API server is down\n", _0x4badcd += "• X AI service unavailable\n"); else {
        if (_0x26d2b5.code === "ETIMEDOUT") (_0x4badcd += "• Request timed out (30s)\n", _0x4badcd += "• X AI is processing\n", _0x4badcd += "• Try simpler query\n"); else {
          if (_0x26d2b5.code === "ENOTFOUND") (_0x4badcd += "• Cannot connect to Grok API\n", _0x4badcd += '•\x20Check\x20internet\x20connection\x0a'); else {
            if (_0x26d2b5.code === "ECONNABORTED") (_0x4badcd += "• Connection aborted\n", _0x4badcd += "• Network issue detected\n"); else {
              if (_0x26d2b5.response?.status === 429) (_0x4badcd += "• Rate limit exceeded\n", _0x4badcd += "• Too many Grok requests\n", _0x4badcd += "• Wait 2-3 minutes\n"); else {
                if (_0x26d2b5.response?.status === 404) (_0x4badcd += "• Grok endpoint not found\n", _0x4badcd += "• API may have changed\n"); else {
                  if (_0x26d2b5.response?.status === 500) (_0x4badcd += '•\x20X\x20AI\x20internal\x20error\x0a', _0x4badcd += "• Service temporarily down\n"); else {
                    if (_0x26d2b5.response?.status === 403) (_0x4badcd += "• Access forbidden\n", _0x4badcd += "• API key may be invalid\n"); else {
                      if (_0x26d2b5.response?.status === 400) (_0x4badcd += "• Bad request to Grok\n", _0x4badcd += "• Query may be malformed\n"); else {
                        if (_0x26d2b5.response?.data) {
                          const _0x30e24a = _0x26d2b5.response.data;
                          console.log(UI.CHART + " API Error response:", _0x30e24a);
                          if (_0x30e24a.error) _0x4badcd += "• Grok Error: " + _0x30e24a.error + '\x0a'; else {
                            if (_0x30e24a.message) _0x4badcd += "• Error: " + _0x30e24a.message + '\x0a'; else {
                              if (_0x30e24a.details) _0x4badcd += "• Details: " + _0x30e24a.details + '\x0a'; else typeof _0x30e24a === "string" && (_0x4badcd += '•\x20Error:\x20' + _0x30e24a + '\x0a');
                            }
                          }
                        } else _0x26d2b5.message && (_0x4badcd += "• Error: " + _0x26d2b5.message + '\x0a');
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      (_0x4badcd += '\x0a' + UI.TOOL + " *Troubleshooting:*\n", _0x4badcd += "1. Try simpler/shorter query\n", _0x4badcd += '2.\x20Wait\x201-2\x20minutes\x20before\x20retry\x0a', _0x4badcd += "3. Check internet connection\n", _0x4badcd += "4. Use other AI commands:\n", _0x4badcd += '\x20\x20\x20•\x20`' + _0x4880db + "gpt` - ChatGPT\n", _0x4badcd += "   • `" + _0x4880db + "bard` - Google Bard\n", _0x4badcd += "   • `" + _0x4880db + "claude` - Claude AI\n", _0x4badcd += "5. Try rephrasing your question\n");
      try {
        (console.log(UI.UPLOAD + " Sending error message to user"), await _0x1ceeb5.sendMessage(_0x4b0a7b, {
          react: {
            text: '' + STATUS.ERROR,
            key: _0x47aea9.key
          }
        }), await _0x1ceeb5.sendMessage(_0x4b0a7b, {
          text: _0x4badcd
        }, {
          quoted: _0x47aea9
        }));
      } catch (_0x3280d4) {
        console.error(STATUS.ERROR + " Failed to send error message:", _0x3280d4);
      }
    }
  }
};
function extractGrokResponse(_0x4cb950, _0x35d35e = 0) {
  if (_0x35d35e > 3) return "Response too complex";
  if (typeof _0x4cb950 === "string") return _0x4cb950;
  if (Array.isArray(_0x4cb950)) return _0x4cb950.map(_0x4bec56 => extractGrokResponse(_0x4bec56, _0x35d35e + 1)).filter(_0x261ea4 => _0x261ea4 && _0x261ea4.trim()).join('\x0a');
  if (_0x4cb950 && typeof _0x4cb950 === 'object') {
    const _0x4b5b39 = ['result', 'response', "answer", "text", 'content', "message", "output", "choices", "candidates", "grok"];
    for (const _0x2c99c6 of _0x4b5b39) {
      if (_0x4cb950[_0x2c99c6]) {
        const _0x9732ae = extractGrokResponse(_0x4cb950[_0x2c99c6], _0x35d35e + 1);
        if (_0x9732ae && _0x9732ae.trim()) return _0x9732ae;
      }
    }
    for (const _0x2a3caa in _0x4cb950) {
      if (typeof _0x4cb950[_0x2a3caa] === 'string' && _0x4cb950[_0x2a3caa].trim()) return _0x4cb950[_0x2a3caa];
    }
    try {
      const _0x4d08a6 = JSON.stringify(_0x4cb950, null, 2);
      if (_0x4d08a6.length < 1000) return _0x4d08a6;
    } catch (_0x55e25d) {}
  }
  return "Could not extract response from API";
}
function formatGrokResponse(_0x371985) {
  if (!_0x371985) return 'No\x20response\x20received\x20from\x20X\x20AI\x20Grok';
  return (_0x371985 = _0x371985.trim(), _0x371985 = cleanGrokResponse(_0x371985), _0x371985 = addGrokPersonality(_0x371985), _0x371985 = _0x371985.replace(/\n\s*\n\s*\n/g, '\x0a\x0a'), _0x371985);
}
function cleanGrokResponse(_0x455894) {
  return (_0x455894 = _0x455894.replace(/\[\d+\]/g, ''), _0x455894 = _0x455894.replace(/```/g, '```\x0a'), _0x455894 = _0x455894.replace(/\*\*(.*?)\*\*/g, "*$1*"), _0x455894 = _0x455894.replace(/\s+/g, '\x20'), _0x455894 = _0x455894.replace(/\n\s+/g, '\x0a'), _0x455894);
}
function addGrokPersonality(_0x42ccdf) {
  if (_0x42ccdf.toLowerCase().includes("grok") || _0x42ccdf.toLowerCase().includes("elon") || _0x42ccdf.toLowerCase().includes("x ai")) return _0x42ccdf;
  if (_0x42ccdf.length > 100) {
    const _0x319a2e = [SOCIAL.BOT + " Grok says: ", "${UI.ROCKET} X AI Grok here: ", UI.THOUGHT + '\x20According\x20to\x20Grok:\x20'], _0x51d9d5 = _0x319a2e[Math.floor(Math.random() * _0x319a2e.length)];
    !_0x42ccdf.startsWith(_0x51d9d5.substring(0, 5)) && (_0x42ccdf = _0x51d9d5 + _0x42ccdf);
  }
  return _0x42ccdf;
}
