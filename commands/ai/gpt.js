import {parseMarkdownTables} from 'wolfsocket';
import {STATUS, SOCIAL} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getFooter} from '../../lib/menuHelper.js';
const NODEX_URL = 'https://nodex.wolvarex.com', NODEX_SERVERS_URL = NODEX_URL + '/servers', NODEX_AD_CHANCE = 0.5;
async function sendGptResponse(_0x1f59a1, _0x4234e6, _0x1bbf76, _0x11d11b, _0x3697eb, _0x228e14) {
  if (_0x228e14) return _0x1f59a1.sendMessage(_0x4234e6, {
    markdownTable: _0x1bbf76,
    tableTitle: "GPT AI"
  }, {
    quoted: _0x11d11b
  });
  const _0x262b7f = "`Did you know you can deploy your bots with nodeX?`", _0xac0d9b = _0x3697eb ? _0x1bbf76 + '\x0a\x0a' + _0x262b7f + "\nClick below to get started." : _0x1bbf76;
  if (!_0x3697eb) return _0x1f59a1.sendMessage(_0x4234e6, {
    text: _0xac0d9b
  }, {
    quoted: _0x11d11b
  });
  const _0x4a5b97 = Math.random() < 0.5, _0x15b7ed = _0x4a5b97 ? "Deploy Free with nodeX" : "Get Panel/Server", _0x1dba19 = _0x4a5b97 ? NODEX_URL : NODEX_SERVERS_URL;
  try {
    const {sendInteractiveMessage: _0x4ab975} = await import("wolfbtns");
    await _0x4ab975(_0x1f59a1, _0x4234e6, {
      text: _0xac0d9b,
      buttons: [{
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: _0x15b7ed,
          url: _0x1dba19,
          merchant_url: _0x1dba19
        })
      }],
      quoted: _0x11d11b
    });
  } catch (_0x539757) {
    (console.warn('[GPT]\x20nodeX\x20ad\x20button\x20failed:', _0x539757.message), await _0x1f59a1.sendMessage(_0x4234e6, {
      text: _0xac0d9b + '\x0a' + _0x1dba19
    }, {
      quoted: _0x11d11b
    }));
  }
}
const RESPONSE_GUIDANCE = ("\nAnswer the user's request accurately and directly. Do not invent facts, figures, sources, or certainty.\nUse a Markdown pipe table only when tabular structure materially improves the answer, such as comparisons, schedules, specifications, rankings, or repeated records with consistent fields.\nDo not force a table for ordinary explanations or short answers.\nWhen a table is useful:\n- explain the important conclusion in normal text before or after it;\n- use a header row followed by a Markdown separator row;\n- keep the same number of columns in every row;\n- keep cells concise and put detailed explanations outside the table.\n").trim();
function cleanAsterisks(_0x5be4e3) {
  return _0x5be4e3.replace(/\*{2,}/g, '').trim();
}
function containsValidTable(_0x5d3c12) {
  try {
    return parseMarkdownTables(_0x5d3c12).some(_0x798642 => _0x798642.messageType === 4);
  } catch {
    return false;
  }
}
export default {
  name: "gpt",
  description: "OpenAI GPT via Wolf API",
  category: 'ai',
  aliases: ["gpt5", "ai5", "askgpt"],
  usage: "gpt [question]",
  async execute(_0x583f65, _0x1398a9, _0x27e7df, _0x33980d) {
    const _0x4284f0 = _0x1398a9.key.remoteJid, _0x432fb2 = _0x27e7df.length > 0 ? _0x27e7df.join('\x20') : _0x1398a9.quoted?.text || '';
    if (!_0x432fb2) return _0x583f65.sendMessage(_0x4284f0, {
      text: SOCIAL.BOT + '\x20*GPT\x20AI*\x0a\x0a' + ("Use *" + _0x33980d + "gpt <question>*\n\n") + ('' + getFooter(_0x1398a9.key.participant || _0x1398a9.key.remoteJid))
    }, {
      quoted: _0x1398a9
    });
    try {
      await _0x583f65.sendMessage(_0x4284f0, {
        react: {
          text: STATUS.LOADING,
          key: _0x1398a9.key
        }
      });
      const _0x919d2 = _0x432fb2 + '\x0a\x0a' + RESPONSE_GUIDANCE;
      let _0x5240b8 = cleanAsterisks(await callAI("gpt", _0x919d2, globalThis._apiOverrides?.gpt));
      if (_0x5240b8.length > 4000) _0x5240b8 = _0x5240b8.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      await _0x583f65.sendMessage(_0x4284f0, {
        react: {
          text: STATUS.SUCCESS,
          key: _0x1398a9.key
        }
      });
      const _0x5aa92f = SOCIAL.BOT + " GPT AI\n\n" + _0x5240b8 + '\x0a\x0a' + ('' + getFooter(_0x1398a9.key.participant || _0x1398a9.key.remoteJid));
      await sendGptResponse(_0x583f65, _0x4284f0, _0x5aa92f, _0x1398a9, Math.random() < NODEX_AD_CHANCE, containsValidTable(_0x5240b8));
    } catch (_0x2d4dcd) {
      return (console.error("[GPT] Error:", _0x2d4dcd.message), await _0x583f65.sendMessage(_0x4284f0, {
        react: {
          text: STATUS.ERROR,
          key: _0x1398a9.key
        }
      }), _0x583f65.sendMessage(_0x4284f0, {
        text: STATUS.ERROR + " *GPT AI Error*\n\n" + _0x2d4dcd.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x1398a9
      }));
    }
  }
};
