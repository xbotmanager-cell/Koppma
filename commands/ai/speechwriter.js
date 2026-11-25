import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x33e22 from 'axios';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "speechwriter",
  category: 'AI',
  aliases: ['speech', "writer", "speechwrite"],
  description: "Generate professional speeches using AI",
  async execute(_0x4f89d6, _0x48cc4f, _0x5219e3, _0x2b0452) {
    const _0x354c93 = _0x48cc4f.key.remoteJid, _0x29cefb = _0x48cc4f.quoted;
    let _0x40dc7f = '';
    if (_0x5219e3.length > 0) _0x40dc7f = _0x5219e3.join('\x20'); else {
      if (_0x29cefb && _0x29cefb.text) _0x40dc7f = _0x29cefb.text; else {
        await _0x4f89d6.sendMessage(_0x354c93, {
          text: "╭─⌈ " + MEDIA.MIC + " *AI SPEECH WRITER* ⌋\n├─⊷ *" + _0x2b0452 + 'speechwriter\x20<topic>*\x0a│\x20\x20└⊷\x20Generate\x20a\x20speech\x0a├─⊷\x20*' + _0x2b0452 + 'speechwriter\x20<topic>\x20-long\x20-formal*\x0a│\x20\x20└⊷\x20With\x20length/type/tone\x20options\x0a├─⊷\x20*' + _0x2b0452 + "speech <topic>*\n│  └⊷ Alias for speechwriter\n╰⊷ " + getFooter(_0x48cc4f.key.participant || _0x48cc4f.key.remoteJid)
        }, {
          quoted: _0x48cc4f
        });
        return;
      }
    }
    console.log(MEDIA.MIC + '\x20[SPEECHWRITER]\x20Topic:\x20\x22' + _0x40dc7f + '\x22');
    try {
      const _0x4ebd95 = {
        length: "short",
        type: 'dedication',
        tone: "serious"
      };
      if (_0x40dc7f.includes("-long") || _0x40dc7f.includes('-l')) (_0x4ebd95.length = 'long', _0x40dc7f = _0x40dc7f.replace(/-long|-l/gi, '').trim()); else {
        if (_0x40dc7f.includes('-medium') || _0x40dc7f.includes('-m')) (_0x4ebd95.length = 'medium', _0x40dc7f = _0x40dc7f.replace(/-medium|-m/gi, '').trim()); else (_0x40dc7f.includes("-short") || _0x40dc7f.includes('-s')) && (_0x4ebd95.length = "short", _0x40dc7f = _0x40dc7f.replace(/-short|-s/gi, '').trim());
      }
      if (_0x40dc7f.includes("-dedication") || _0x40dc7f.includes('-d')) (_0x4ebd95.type = "dedication", _0x40dc7f = _0x40dc7f.replace(/-dedication|-d/gi, '').trim()); else {
        if (_0x40dc7f.includes("-inspirational") || _0x40dc7f.includes('-i')) (_0x4ebd95.type = "inspirational", _0x40dc7f = _0x40dc7f.replace(/-inspirational|-i/gi, '').trim()); else {
          if (_0x40dc7f.includes("-formal") || _0x40dc7f.includes('-f')) (_0x4ebd95.type = "formal", _0x40dc7f = _0x40dc7f.replace(/-formal|-f/gi, '').trim()); else (_0x40dc7f.includes("-casual") || _0x40dc7f.includes('-c')) && (_0x4ebd95.type = "casual", _0x40dc7f = _0x40dc7f.replace(/-casual|-c/gi, '').trim());
        }
      }
      if (_0x40dc7f.includes("-serious") || _0x40dc7f.includes("-sr")) (_0x4ebd95.tone = "serious", _0x40dc7f = _0x40dc7f.replace(/-serious|-sr/gi, '').trim()); else {
        if (_0x40dc7f.includes('-friendly') || _0x40dc7f.includes("-fr")) (_0x4ebd95.tone = "friendly", _0x40dc7f = _0x40dc7f.replace(/-friendly|-fr/gi, '').trim()); else {
          if (_0x40dc7f.includes('-persuasive') || _0x40dc7f.includes('-p')) (_0x4ebd95.tone = "persuasive", _0x40dc7f = _0x40dc7f.replace(/-persuasive|-p/gi, '').trim()); else (_0x40dc7f.includes('-motivational') || _0x40dc7f.includes("-mot")) && (_0x4ebd95.tone = 'motivational', _0x40dc7f = _0x40dc7f.replace(/-motivational|-mot/gi, '').trim());
        }
      }
      if (!_0x40dc7f || _0x40dc7f.trim() === '') {
        await _0x4f89d6.sendMessage(_0x354c93, {
          text: STATUS.ERROR + " Please provide a speech topic.\n\nExample: `" + _0x2b0452 + "speechwriter graduation speech`"
        }, {
          quoted: _0x48cc4f
        });
        return;
      }
      await _0x4f89d6.sendMessage(_0x354c93, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x48cc4f.key
        }
      });
      const _0x18cf09 = "https://apiskeith.vercel.app/ai/speechwriter?topic=" + encodeURIComponent(_0x40dc7f) + '&length=' + _0x4ebd95.length + "&type=" + _0x4ebd95.type + "&tone=" + _0x4ebd95.tone;
      console.log(SOCIAL.GLOBE + '\x20[SPEECHWRITER]\x20Calling\x20API:\x20' + _0x18cf09);
      const _0x3bb2b4 = await _0x33e22({
        method: "GET",
        url: _0x18cf09,
        timeout: 30000,
        headers: {
          'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "application/json",
          Referer: "https://apiskeith.vercel.app/",
          Origin: 'https://apiskeith.vercel.app'
        },
        validateStatus: function (_0xfeac3f) {
          return _0xfeac3f >= 200 && _0xfeac3f < 500;
        }
      });
      console.log(STATUS.SUCCESS + " [SPEECHWRITER] Response status: " + _0x3bb2b4.status);
      let _0x2c4cdc = '';
      if (_0x3bb2b4.data && typeof _0x3bb2b4.data === "object") {
        const _0x9f1ac5 = _0x3bb2b4.data;
        console.log(UI.CHART + " Speechwriter API Response structure:", Object.keys(_0x9f1ac5));
        if (_0x9f1ac5.status === true && _0x9f1ac5.result?.data?.data?.speech) (_0x2c4cdc = _0x9f1ac5.result.data.data.speech, console.log(STATUS.SUCCESS + " Using nested speech structure")); else {
          if (_0x9f1ac5.result?.speech) (_0x2c4cdc = _0x9f1ac5.result.speech, console.log(STATUS.SUCCESS + " Using result.speech")); else {
            if (_0x9f1ac5.speech) (_0x2c4cdc = _0x9f1ac5.speech, console.log(STATUS.SUCCESS + '\x20Using\x20data.speech')); else {
              if (_0x9f1ac5.data?.speech) (_0x2c4cdc = _0x9f1ac5.data.speech, console.log(STATUS.SUCCESS + " Using data.data.speech")); else {
                if (_0x9f1ac5.response) (_0x2c4cdc = _0x9f1ac5.response, console.log(STATUS.SUCCESS + " Using data.response")); else {
                  if (_0x9f1ac5.text) (_0x2c4cdc = _0x9f1ac5.text, console.log(STATUS.SUCCESS + " Using data.text")); else {
                    if (_0x9f1ac5.error) {
                      console.log(STATUS.ERROR + " API error:", _0x9f1ac5.error);
                      throw new Error(_0x9f1ac5.error || 'Speechwriter\x20API\x20returned\x20error');
                    } else _0x2c4cdc = extractSpeechResponse(_0x9f1ac5);
                  }
                }
              }
            }
          }
        }
      } else {
        if (typeof _0x3bb2b4.data === "string") (console.log(STATUS.SUCCESS + " Response is string"), _0x2c4cdc = _0x3bb2b4.data); else {
          console.log(STATUS.ERROR + " Invalid response format");
          throw new Error("Invalid API response format");
        }
      }
      if (!_0x2c4cdc || _0x2c4cdc.trim() === '') {
        console.log(STATUS.ERROR + '\x20Empty\x20speech\x20response');
        throw new Error("Speechwriter returned empty speech");
      }
      (_0x2c4cdc = _0x2c4cdc.trim(), console.log(UI.NOTE + '\x20Speech\x20length:\x20' + _0x2c4cdc.length + " characters"), _0x2c4cdc = formatSpeech(_0x2c4cdc, _0x4ebd95));
      _0x2c4cdc.length > 3500 && (_0x2c4cdc = _0x2c4cdc.substring(0, 3500) + "\n\n... (speech truncated for WhatsApp)");
      let _0x38e6da = MEDIA.MIC + " *AI SPEECH WRITER*\n\n";
      (_0x38e6da += UI.NOTE + " *Topic:* " + _0x40dc7f + '\x0a', _0x38e6da += UI.SETTINGS + '\x20*Settings:*\x20' + _0x4ebd95.length + ',\x20' + _0x4ebd95.type + ',\x20' + _0x4ebd95.tone + '\x0a\x0a', _0x38e6da += UI.WRITING + '\x20*Generated\x20Speech:*\x0a\x0a' + _0x2c4cdc + '\x0a\x0a', _0x38e6da += UI.TOOL + " *Tips:* You can adjust length/type/tone with options\n", _0x38e6da += STATUS.INFO + " *Example:* `" + _0x2b0452 + 'speechwriter\x20topic\x20-long\x20-inspirational\x20-motivational`', console.log(UI.UPLOAD + '\x20Sending\x20generated\x20speech\x20to\x20WhatsApp'), await _0x4f89d6.sendMessage(_0x354c93, {
        text: _0x38e6da
      }, {
        quoted: _0x48cc4f
      }), await _0x4f89d6.sendMessage(_0x354c93, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x48cc4f.key
        }
      }), console.log(STATUS.SUCCESS + " Speech generated successfully for topic: \"" + _0x40dc7f + '\x22'));
    } catch (_0xb56673) {
      (console.error(STATUS.ERROR + " [Speechwriter] ERROR:", _0xb56673), console.error(STATUS.ERROR + " Error stack:", _0xb56673.stack));
      let _0x330cb2 = STATUS.ERROR + " *SPEECH WRITER ERROR*\n\n";
      if (_0xb56673.code === "ECONNREFUSED") (_0x330cb2 += "• Speechwriter API server is down\n", _0x330cb2 += "• Service temporarily unavailable\n"); else {
        if (_0xb56673.code === "ETIMEDOUT") (_0x330cb2 += '•\x20Request\x20timed\x20out\x20(30s)\x0a', _0x330cb2 += "• AI is crafting your speech\n", _0x330cb2 += '•\x20Try\x20simpler\x20topic\x0a'); else {
          if (_0xb56673.code === 'ENOTFOUND') (_0x330cb2 += "• Cannot connect to Speechwriter API\n", _0x330cb2 += "• Check internet connection\n"); else {
            if (_0xb56673.response?.status === 429) (_0x330cb2 += "• Rate limit exceeded\n", _0x330cb2 += "• Too many speech requests\n", _0x330cb2 += '•\x20Wait\x202-3\x20minutes\x0a'); else {
              if (_0xb56673.response?.status === 404) (_0x330cb2 += '•\x20Speechwriter\x20endpoint\x20not\x20found\x0a', _0x330cb2 += "• API may have changed\n"); else {
                if (_0xb56673.response?.status === 500) (_0x330cb2 += '•\x20Speechwriter\x20internal\x20error\x0a', _0x330cb2 += "• Service temporarily down\n"); else {
                  if (_0xb56673.response?.status === 400) (_0x330cb2 += "• Bad request to Speechwriter\n", _0x330cb2 += "• Topic may be too complex\n"); else {
                    if (_0xb56673.response?.data) {
                      const _0x2a5217 = _0xb56673.response.data;
                      console.log(UI.CHART + '\x20API\x20Error\x20response:', _0x2a5217);
                      if (_0x2a5217.error) _0x330cb2 += "• Error: " + _0x2a5217.error + '\x0a'; else {
                        if (_0x2a5217.message) _0x330cb2 += '•\x20Error:\x20' + _0x2a5217.message + '\x0a'; else typeof _0x2a5217 === "string" && (_0x330cb2 += "• Error: " + _0x2a5217 + '\x0a');
                      }
                    } else _0xb56673.message && (_0x330cb2 += "• Error: " + _0xb56673.message + '\x0a');
                  }
                }
              }
            }
          }
        }
      }
      (_0x330cb2 += '\x0a' + UI.TOOL + " *Troubleshooting:*\n", _0x330cb2 += "1. Try simpler/specific topic\n", _0x330cb2 += "2. Wait 1-2 minutes before retry\n", _0x330cb2 += "3. Check internet connection\n", _0x330cb2 += "4. Use different options:\n", _0x330cb2 += "   • Try shorter length (-short)\n", _0x330cb2 += "   • Try different type (-formal)\n", _0x330cb2 += "   • Try different tone (-friendly)\n", _0x330cb2 += "5. Use other writing commands:\n", _0x330cb2 += "   • `" + _0x2b0452 + "bard` - Google Bard for writing\n", _0x330cb2 += "   • `" + _0x2b0452 + 'gpt`\x20-\x20ChatGPT\x20for\x20content\x0a');
      try {
        (console.log(UI.UPLOAD + " Sending error message to user"), await _0x4f89d6.sendMessage(_0x354c93, {
          react: {
            text: '' + STATUS.ERROR,
            key: _0x48cc4f.key
          }
        }), await _0x4f89d6.sendMessage(_0x354c93, {
          text: _0x330cb2
        }, {
          quoted: _0x48cc4f
        }));
      } catch (_0xe7c8a1) {
        console.error(STATUS.ERROR + '\x20Failed\x20to\x20send\x20error\x20message:', _0xe7c8a1);
      }
    }
  }
};
function extractSpeechResponse(_0xaa0e50, _0x24ae3c = 0) {
  if (_0x24ae3c > 3) return 'Speech\x20content\x20too\x20complex';
  if (typeof _0xaa0e50 === "string") return _0xaa0e50;
  if (Array.isArray(_0xaa0e50)) return _0xaa0e50.map(_0x28885d => extractSpeechResponse(_0x28885d, _0x24ae3c + 1)).filter(_0x15fa0f => _0x15fa0f && _0x15fa0f.trim()).join('\x0a');
  if (_0xaa0e50 && typeof _0xaa0e50 === "object") {
    const _0x3767c3 = ['speech', "content", "text", "response", "result", "message", "data", "output", "generated"];
    for (const _0x23a74d of _0x3767c3) {
      if (_0xaa0e50[_0x23a74d]) {
        const _0x450272 = extractSpeechResponse(_0xaa0e50[_0x23a74d], _0x24ae3c + 1);
        if (_0x450272 && _0x450272.trim()) return _0x450272;
      }
    }
    for (const _0x1e0d91 in _0xaa0e50) {
      if (typeof _0xaa0e50[_0x1e0d91] === "string" && _0xaa0e50[_0x1e0d91].trim()) return _0xaa0e50[_0x1e0d91];
    }
  }
  return "Could not extract speech from API response";
}
function formatSpeech(_0x49af17, _0x3bdcad) {
  if (!_0x49af17) return "No speech generated";
  return (_0x49af17 = _0x49af17.trim(), _0x49af17 = addSpeechFormatting(_0x49af17, _0x3bdcad.type, _0x3bdcad.tone), _0x49af17 = addParagraphBreaks(_0x49af17), _0x49af17 = _0x49af17.replace(/\n\s*\n\s*\n/g, '\x0a\x0a'), _0x49af17);
}
function addSpeechFormatting(_0x21d53e, _0x5619a1, _0x2d37e6) {
  let _0xf4efdc = '';
  if (_0x5619a1 === "dedication") _0xf4efdc = MEDIA.MIC + " *Dedication Speech*\n\n\""; else {
    if (_0x5619a1 === "inspirational") _0xf4efdc = STATUS.NEW + " *Inspirational Speech*\n\n\""; else {
      if (_0x5619a1 === "formal") _0xf4efdc = SOCIAL.FORMAL + " *Formal Address*\n\n\""; else _0x5619a1 === "casual" ? _0xf4efdc = SOCIAL.CASUAL + '\x20*Casual\x20Talk*\x0a\x0a\x22' : _0xf4efdc = MEDIA.MIC + " *Generated Speech*\n\n\"";
    }
  }
  return (!_0x21d53e.startsWith('\x22') && (_0x21d53e = _0xf4efdc + _0x21d53e), !_0x21d53e.endsWith('\x22') && (_0x21d53e = _0x21d53e + '\x22'), _0x21d53e);
}
function addParagraphBreaks(_0x458616) {
  const _0x335df2 = _0x458616.match(/[^.!?]+[.!?]+/g) || [_0x458616];
  if (_0x335df2.length <= 4) return _0x458616;
  let _0x2f1c51 = '', _0x13a4ab = 0;
  for (let _0x34812f = 0; _0x34812f < _0x335df2.length; _0x34812f++) {
    (_0x2f1c51 += _0x335df2[_0x34812f].trim() + '\x20', _0x13a4ab++, _0x13a4ab >= 3 && _0x34812f < _0x335df2.length - 1 && (_0x2f1c51 += '\x0a\x0a', _0x13a4ab = 0));
  }
  return _0x2f1c51.trim();
}
