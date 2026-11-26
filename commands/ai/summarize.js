import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x538354 from 'axios';
import {getBotName} from '../../lib/botname.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'summarize',
  description: "Summarize long text or notes into key points",
  category: 'ai',
  aliases: ['summary', "summarise", "summarize"],
  usage: "summarize [text/notes to summarize]",
  async execute(_0x2337f6, _0x4b8c41, _0xb81fb6, _0x5ac20c, _0x5395f7) {
    const _0x18664d = _0x4b8c41.key.remoteJid, _0x3618bc = _0x4b8c41.key.participant || _0x18664d;
    if (_0xb81fb6.length === 0 || _0xb81fb6[0].toLowerCase() === "help") {
      const _0x509fa9 = '╭┄〔 \x20' + UI.NOTE + " *SUMMARIZER* 〕┄╮\n┆ ✦ *" + _0x5ac20c + "summarize <text>*\n┆   └─ Summarize long text\n┆ ✦ *" + _0x5ac20c + "summary <text>*\n┆   └─ Alias for summarize\n┆ ✦ *" + _0x5ac20c + 'summarize\x20brief:\x20<text>*\x0a┆ \x20╰┄ \x20Brief\x201-2\x20sentence\x20summary\x0a┆ ✦ *' + _0x5ac20c + 'summarize\x20bullets:\x20<text>*\x0a┆ \x20╰┄ \x20Summary\x20in\x20bullet\x20points\x0a╰┄ \x20' + getFooter(_0x4b8c41.key.participant || _0x4b8c41.key.remoteJid);
      return _0x2337f6.sendMessage(_0x18664d, {
        text: _0x509fa9
      }, {
        quoted: _0x4b8c41
      });
    }
    let _0xf46fbf = _0xb81fb6.join('\x20');
    if (_0x4b8c41.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      const _0x47417f = _0x4b8c41.message.extendedTextMessage.contextInfo.quotedMessage, _0x2b7e12 = _0x47417f.conversation || _0x47417f.extendedTextMessage?.text || _0x47417f.imageMessage?.caption || '';
      _0x2b7e12.trim().length > 0 && (_0xf46fbf = _0x2b7e12 + (_0xf46fbf ? "\n\nAdditional: " + _0xf46fbf : ''));
    }
    if (_0xf46fbf.length < 20) return _0x2337f6.sendMessage(_0x18664d, {
      text: "╭┄〔 " + STATUS.ERROR + " *TEXT TOO SHORT* 〕┄╮\n┆ ✦ *" + _0x5ac20c + 'summarize\x20<text>*\x0a┆ \x20╰┄ \x20Provide\x20at\x20least\x2020\x20characters\x0a╰┄ \x20' + getFooter(_0x4b8c41.key.participant || _0x4b8c41.key.remoteJid)
    }, {
      quoted: _0x4b8c41
    });
    const _0xfae590 = {
      brief: "Provide a very brief summary (1-2 sentences)",
      detailed: "Provide a detailed summary with key points",
      bullets: 'Provide\x20summary\x20in\x20bullet\x20points',
      paragraph: "Provide summary in paragraph form"
    };
    let _0x5f5051 = "auto", _0x42ddd7 = _0xf46fbf;
    const _0x4f6001 = _0xf46fbf.match(/^(brief|detailed|bullets|paragraph):\s*(.+)/i);
    _0x4f6001 && (_0x5f5051 = _0x4f6001[1].toLowerCase(), _0x42ddd7 = _0x4f6001[2]);
    try {
      await _0x2337f6.sendMessage(_0x18664d, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x4b8c41.key
        }
      });
      let _0x763ada = "Please summarize the following text";
      switch (_0x5f5051) {
        case "brief":
          _0x763ada += " in 1-2 sentences maximum. Be very concise:\n\n";
          break;
        case "detailed":
          _0x763ada += " in detail, capturing all main points and important details:\n\n";
          break;
        case "bullets":
          _0x763ada += '\x20using\x20bullet\x20points.\x20Each\x20bullet\x20should\x20be\x20a\x20key\x20point:\x0a\x0a';
          break;
        case "paragraph":
          _0x763ada += '\x20in\x20a\x20well-structured\x20paragraph:\x0a\x0a';
          break;
        default:
          _0x763ada += " appropriately. If text is long, use bullet points. If short, use paragraph:\n\n";
      }
      (_0x763ada += _0x42ddd7 + '\x0a\x0a', _0x763ada += "IMPORTANT: Provide ONLY the summary, no additional commentary or labels.");
      const _0x45b431 = "https://iamtkm.vercel.app/ai/gpt5", _0x461d92 = "tkm";
      console.log(UI.NOTE + " Summarization Request [" + _0x5f5051 + "]: " + _0x42ddd7.length + " chars");
      const _0x29867d = await _0x538354({
        method: "GET",
        url: _0x45b431,
        params: {
          apikey: _0x461d92,
          text: _0x763ada
        },
        timeout: 30000,
        headers: {
          'User-Agent': "VIPBOT-Summarizer/1.0",
          Accept: "application/json"
        },
        validateStatus: function (_0x5d1efd) {
          return _0x5d1efd >= 200 && _0x5d1efd < 500;
        }
      });
      let _0x556607 = '';
      if (_0x29867d.data && typeof _0x29867d.data === "object") {
        const _0x350916 = _0x29867d.data;
        if (_0x350916.status === true && _0x350916.result) _0x556607 = _0x350916.result; else {
          if (_0x350916.response) _0x556607 = _0x350916.response; else {
            if (_0x350916.answer) _0x556607 = _0x350916.answer; else _0x350916.choices && _0x350916.choices[0] && _0x350916.choices[0].message ? _0x556607 = _0x350916.choices[0].message.content : _0x556607 = JSON.stringify(_0x350916, null, 2);
          }
        }
      } else typeof _0x29867d.data === "string" ? _0x556607 = _0x29867d.data : _0x556607 = "Failed to generate summary. Please try again.";
      (_0x556607 = _0x556607.replace(/Please summarize.*?:?\s*/i, ''), _0x556607 = _0x556607.replace(/^(summary|summarized?):?\s*/i, ''), _0x556607 = _0x556607.trim());
      const _0x47c2f6 = _0x42ddd7.split(/\s+/).length, _0x4ea891 = _0x556607.split(/\s+/).length, _0x59433c = Math.round((1 - _0x4ea891 / _0x47c2f6) * 100);
      let _0x155e3b = UI.NOTE + '\x20*' + getBotName() + " SUMMARIZER*\n\n";
      const _0x586c83 = _0x42ddd7.length > 100 ? _0x42ddd7.substring(0, 100) + "..." : _0x42ddd7;
      (_0x155e3b += UI.FILE + " *Original:* " + _0x586c83 + '\x0a\x0a', _0x155e3b += STATUS.SPARKLE + " *Summary:*\n" + _0x556607 + '\x0a\x0a', _0x155e3b += UI.CHART + '\x20*Statistics:*\x0a', _0x155e3b += "• Original: " + _0x47c2f6 + " words\n", _0x155e3b += "• Summary: " + _0x4ea891 + " words\n", _0x155e3b += "• Reduction: " + _0x59433c + '%\x0a', _0x155e3b += '•\x20Type:\x20' + (_0x5f5051.charAt(0).toUpperCase() + _0x5f5051.slice(1)) + '\x0a\x0a', _0x155e3b += STATUS.INFO + " *Usage Tips:*\n", _0x155e3b += "• Add `brief:` for short summaries\n", _0x155e3b += "• Add `detailed:` for comprehensive summaries\n", _0x155e3b += "• Add `bullets:` for bullet points\n", _0x155e3b += "• Add `paragraph:` for paragraph format\n", _0x155e3b += "• Reply to a message to summarize it\n\n", _0x155e3b += '' + getFooter(_0x4b8c41.key.participant || _0x4b8c41.key.remoteJid), await _0x2337f6.sendMessage(_0x18664d, {
        text: _0x155e3b
      }, {
        quoted: _0x4b8c41
      }), await _0x2337f6.sendMessage(_0x18664d, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x4b8c41.key
        }
      }));
    } catch (_0x21eeb9) {
      console.error(STATUS.ERROR + '\x20[Summarizer]\x20ERROR:', _0x21eeb9);
      let _0x4c37f0 = STATUS.ERROR + " *SUMMARIZER ERROR*\n\n";
      if (_0x21eeb9.code === "ECONNREFUSED") (_0x4c37f0 += "• AI service is down\n", _0x4c37f0 += "• Please try again later\n"); else {
        if (_0x21eeb9.code === 'ETIMEDOUT') (_0x4c37f0 += "• Processing time exceeded (30s)\n", _0x4c37f0 += "• Try with shorter text\n"); else _0x21eeb9.response?.status === 429 ? (_0x4c37f0 += "• Rate limit exceeded\n", _0x4c37f0 += "• Too many requests\n") : _0x4c37f0 += '•\x20Error:\x20' + _0x21eeb9.message + '\x0a';
      }
      (_0x4c37f0 += '\x0a' + UI.TOOL + " *Troubleshooting:*\n", _0x4c37f0 += '1.\x20Try\x20shorter\x20text\x0a', _0x4c37f0 += "2. Check internet connection\n", _0x4c37f0 += "3. Wait 1 minute before retrying\n", _0x4c37f0 += "4. Use `" + _0x5ac20c + "gpt` for complex queries\n");
      try {
        (await _0x2337f6.sendMessage(_0x18664d, {
          react: {
            text: '' + STATUS.ERROR,
            key: _0x4b8c41.key
          }
        }), await _0x2337f6.sendMessage(_0x18664d, {
          text: _0x4c37f0
        }, {
          quoted: _0x4b8c41
        }));
      } catch (_0x1b71e7) {
        console.error('Failed\x20to\x20send\x20error\x20message:', _0x1b71e7);
      }
    }
  }
};
