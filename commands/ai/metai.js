import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x34c489 from 'axios';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "metai",
  description: "Meta AI assistant powered by advanced technology",
  category: 'ai',
  aliases: ["meta", "metaai", 'askmeta', "metabot"],
  usage: 'metai\x20[question]',
  async execute(_0xc7fa46, _0x350a28, _0x2c48c4, _0x45a7c3, _0x36377e) {
    const _0xe5201c = _0x350a28.key.remoteJid, _0x263adb = _0x350a28.key.participant || _0xe5201c;
    if (_0x2c48c4.length === 0 || _0x2c48c4[0].toLowerCase() === "help") {
      const _0x249e9b = "╭─⌈ " + SOCIAL.BOT + " *META AI* ⌋\n├─⊷ *" + _0x45a7c3 + "metai <question>*\n│  └⊷ Ask Meta AI anything\n├─⊷ *" + _0x45a7c3 + "meta <question>*\n│  └⊷ Alias for metai\n├─⊷ *" + _0x45a7c3 + "metaai <question>*\n│  └⊷ Alias for metai\n╰⊷ " + getFooter(_0x350a28.key.participant || _0x350a28.key.remoteJid);
      return _0xc7fa46.sendMessage(_0xe5201c, {
        text: _0x249e9b
      }, {
        quoted: _0x350a28
      });
    }
    const _0x8f2045 = {
      code: 'code',
      program: "code",
      coding: "code",
      creative: "creative",
      write: "creative",
      story: "creative",
      explain: "explain",
      whatis: "explain",
      define: "explain",
      translate: "translate",
      lang: "translate",
      summarize: 'summarize',
      summary: "summarize"
    };
    let _0x4a3006 = _0x2c48c4.join('\x20'), _0x2f3981 = "general", _0x2eb46d = '';
    const _0x3c5c57 = _0x2c48c4[0].toLowerCase();
    if (_0x8f2045[_0x3c5c57]) {
      (_0x2f3981 = _0x8f2045[_0x3c5c57], _0x4a3006 = _0x2c48c4.slice(1).join('\x20'));
      switch (_0x2f3981) {
        case 'code':
          _0x2eb46d = "Act as expert programmer. Provide clean, efficient code with explanations. Question: " + _0x4a3006;
          break;
        case "creative":
          _0x2eb46d = "Act as creative writer. Be imaginative and descriptive. Write: " + _0x4a3006;
          break;
        case "explain":
          _0x2eb46d = 'Act\x20as\x20teacher.\x20Explain\x20clearly\x20with\x20examples.\x20Topic:\x20' + _0x4a3006;
          break;
        case "translate":
          _0x2eb46d = "Translate the following text. If no language specified, translate to English: " + _0x4a3006;
          break;
        case "summarize":
          _0x2eb46d = "Summarize the following text concisely: " + _0x4a3006;
          break;
      }
    } else _0x2eb46d = _0x4a3006;
    try {
      await _0xc7fa46.sendMessage(_0xe5201c, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x350a28.key
        }
      });
      const _0x1fe37a = "https://apiskeith.vercel.app/ai/metai";
      console.log(SOCIAL.BOT + " Meta AI Query [" + _0x2f3981 + ']:\x20' + _0x4a3006);
      const _0x546a23 = await _0x34c489({
        method: "GET",
        url: _0x1fe37a,
        params: {
          q: _0x2eb46d || _0x4a3006
        },
        timeout: 30000,
        headers: {
          'User-Agent': "WolfBot-MetaAI/1.0",
          Accept: "application/json",
          'X-Requested-With': "WolfBot",
          Referer: "https://apiskeith.vercel.app/"
        },
        validateStatus: function (_0x101623) {
          return _0x101623 >= 200 && _0x101623 < 500;
        }
      });
      console.log(STATUS.SUCCESS + " Meta AI Response status: " + _0x546a23.status);
      let _0x269784 = '', _0x40a69b = {
        creator: "Keith API",
        model: "Meta AI",
        status: true
      };
      if (_0x546a23.data && typeof _0x546a23.data === 'object') {
        const _0x5b305e = _0x546a23.data;
        if (_0x5b305e.status === true && _0x5b305e.result) _0x269784 = _0x5b305e.result; else {
          if (_0x5b305e.response) _0x269784 = _0x5b305e.response; else {
            if (_0x5b305e.answer) _0x269784 = _0x5b305e.answer; else {
              if (_0x5b305e.text) _0x269784 = _0x5b305e.text; else _0x5b305e.message ? _0x269784 = _0x5b305e.message : _0x269784 = extractTextFromObject(_0x5b305e);
            }
          }
        }
      } else {
        if (typeof _0x546a23.data === "string") _0x269784 = _0x546a23.data; else throw new Error('Invalid\x20API\x20response\x20format');
      }
      if (!_0x269784 || _0x269784.toLowerCase().includes('error') || _0x269784.toLowerCase().includes("unavailable")) throw new Error("Meta AI service returned an error");
      _0x269784 = formatMetaResponse(_0x269784, _0x2f3981);
      _0x269784.length > 2500 && (_0x269784 = _0x269784.substring(0, 2500) + '\x0a\x0a...\x20(response\x20truncated\x20due\x20to\x20length)');
      let _0x82fadd = SOCIAL.BOT + " *META AI ASSISTANT*\n\n";
      if (_0x2f3981 !== 'general') {
        const _0x2d6e98 = {
          code: '' + SOCIAL.DEVELOPER,
          creative: '' + MEDIA.DESIGN,
          explain: '' + SOCIAL.TEACHER,
          translate: '' + SOCIAL.GLOBE,
          summarize: '' + UI.CLIPBOARD
        };
        _0x82fadd += (_0x2d6e98[_0x2f3981] || '⚡') + " *Mode:* " + _0x2f3981.toUpperCase() + '\x0a\x0a';
      }
      const _0x4ef97d = _0x4a3006.length > 80 ? _0x4a3006.substring(0, 80) + "..." : _0x4a3006;
      (_0x82fadd += UI.TARGET + " *Query:* " + _0x4ef97d + '\x0a\x0a', _0x82fadd += STATUS.SPARKLE + " *Meta AI Response:*\n" + _0x269784 + '\x0a\x0a', await _0xc7fa46.sendMessage(_0xe5201c, {
        text: _0x82fadd
      }, {
        quoted: _0x350a28
      }), await _0xc7fa46.sendMessage(_0xe5201c, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x350a28.key
        }
      }));
    } catch (_0x423598) {
      console.error(STATUS.ERROR + " [Meta AI] ERROR:", _0x423598);
      let _0x32e49a = STATUS.ERROR + " *META AI ERROR*\n\n";
      if (_0x423598.code === 'ECONNREFUSED') (_0x32e49a += "• Meta AI API server is down\n", _0x32e49a += "• Please try again later\n"); else {
        if (_0x423598.code === "ETIMEDOUT") (_0x32e49a += "• Request timed out (30s)\n", _0x32e49a += '•\x20Try\x20simpler/shorter\x20queries\x0a'); else {
          if (_0x423598.response?.status === 429) (_0x32e49a += "• Rate limit exceeded\n", _0x32e49a += "• Too many requests to Meta AI\n", _0x32e49a += "• Wait 1-2 minutes\n"); else {
            if (_0x423598.response?.status === 404) (_0x32e49a += '•\x20Meta\x20AI\x20endpoint\x20not\x20found\x0a', _0x32e49a += "• API may have changed\n"); else {
              if (_0x423598.response?.status === 500) (_0x32e49a += '•\x20Meta\x20AI\x20server\x20error\x0a', _0x32e49a += "• Try again in a few minutes\n"); else {
                if (_0x423598.response?.data) try {
                  const _0xa88a24 = _0x423598.response.data;
                  if (_0xa88a24.error) _0x32e49a += '•\x20API\x20Error:\x20' + _0xa88a24.error + '\x0a'; else _0xa88a24.message && (_0x32e49a += '•\x20Error:\x20' + _0xa88a24.message + '\x0a');
                } catch (_0x3ca1d4) {
                  _0x32e49a += "• Error: " + _0x423598.message + '\x0a';
                } else _0x32e49a += '•\x20Error:\x20' + _0x423598.message + '\x0a';
              }
            }
          }
        }
      }
      (_0x32e49a += '\x0a' + UI.TOOL + " *Troubleshooting:*\n", _0x32e49a += "1. Try shorter/simpler questions\n", _0x32e49a += '2.\x20Wait\x201\x20minute\x20before\x20retrying\x0a', _0x32e49a += "3. Check your internet connection\n", _0x32e49a += '4.\x20Use\x20`' + _0x45a7c3 + 'gpt`\x20as\x20alternative\x0a', _0x32e49a += "5. Contact support if issue persists\n");
      try {
        (await _0xc7fa46.sendMessage(_0xe5201c, {
          react: {
            text: '' + STATUS.ERROR,
            key: _0x350a28.key
          }
        }), await _0xc7fa46.sendMessage(_0xe5201c, {
          text: _0x32e49a
        }, {
          quoted: _0x350a28
        }));
      } catch (_0x5d34aa) {
        console.error('Failed\x20to\x20send\x20error\x20message:', _0x5d34aa);
      }
    }
  }
};
function extractTextFromObject(_0x4a2ff5, _0x24897f = 3) {
  const _0x3dccc9 = [];
  function _0x542d24(_0x6733fd, _0x50a523 = 0) {
    if (_0x50a523 > _0x24897f) return;
    if (typeof _0x6733fd === "string") _0x3dccc9.push(_0x6733fd); else {
      if (Array.isArray(_0x6733fd)) for (const _0x1b7d0f of _0x6733fd) {
        _0x542d24(_0x1b7d0f, _0x50a523 + 1);
      } else {
        if (_0x6733fd && typeof _0x6733fd === "object") for (const _0x160547 in _0x6733fd) {
          (_0x160547 === "text" || _0x160547 === "content" || _0x160547 === 'message' || _0x160547 === "result") && _0x542d24(_0x6733fd[_0x160547], _0x50a523 + 1);
        }
      }
    }
  }
  _0x542d24(_0x4a2ff5);
  let _0x45fdd0 = _0x3dccc9.join('\x20').trim();
  return (_0x45fdd0 = _0x45fdd0.replace(/\s+/g, '\x20'), !_0x45fdd0 && _0x4a2ff5 && (_0x45fdd0 = JSON.stringify(_0x4a2ff5, null, 2).substring(0, 1500)), _0x45fdd0);
}
function formatMetaResponse(_0x4b1c44, _0xa7fbd0) {
  if (!_0x4b1c44) return "No response received";
  return (_0x4b1c44 = _0x4b1c44.trim(), _0x4b1c44 = _0x4b1c44.replace(/\n\s*\n\s*\n/g, '\x0a\x0a'), _0xa7fbd0 === 'code' && (isCodeContent(_0x4b1c44) && !_0x4b1c44.includes("```") && (_0x4b1c44 = "```" + _0x4b1c44 + "```")), _0xa7fbd0 === "creative" && (_0x4b1c44 = _0x4b1c44.replace(/([.!?])\s+/g, "$1\n\n")), _0x4b1c44);
}
function isCodeContent(_0x5d6da8) {
  const _0x127939 = ["function", 'def\x20', 'class\x20', 'import\x20', "export ", "const ", 'let\x20', "var ", 'if\x20(', 'for\x20(', "while (", "return ", 'console.log', "print(", "System.out", "public ", "private ", "protected ", 'void\x20', "int ", "string ", "bool", '#include', "using ", "namespace ", '<?php', "<html", "<script", 'python', "javascript", "java", "c++", 'c#', 'php', "html", "css", "sql"], _0x46a271 = _0x5d6da8.toLowerCase();
  let _0x417843 = 0;
  for (const _0xacedb5 of _0x127939) {
    if (_0x46a271.includes(_0xacedb5)) {
      _0x417843++;
      if (_0x417843 >= 2) return true;
    }
  }
  const _0x179619 = [/\w+\s*=\s*.+;/, /function\s+\w+\s*\(/, /class\s+\w+\s*\{/, /import\s+.+from/, /System\.out\.println/, /console\.log/, /print\(/, /<\?php/, /<\/?[a-z][^>]*>/];
  for (const _0x1ae8d7 of _0x179619) {
    if (_0x1ae8d7.test(_0x5d6da8)) return true;
  }
  return false;
}
