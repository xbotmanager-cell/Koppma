import {getCommandInfo, getAllApiCommands, assembleUrl, PARAM_STYLE_LABELS} from '../../lib/apiRegistry.js';
import {getBotName} from '../../lib/botname.js';
import {createRequire} from 'module';
const _require = createRequire(import.meta.url);
let _wolfBtns = null;
try {
  _wolfBtns = await import("wolfbtns");
} catch {}
export default {
  name: "getapi",
  aliases: ['apiinfo', "checkapi"],
  category: "owner",
  desc: "View the API endpoint, style, and live URL preview for a command",
  usage: ".getapi <command> | .getapi (list all)",
  ownerOnly: true,
  async execute(_0x304f5a, _0x40f751, _0x63bc98, _0xf438a8, _0x2b3c29) {
    const _0x42f0b2 = _0x40f751.key.remoteJid, _0x4a8cdc = _0x3570c8 => _0x304f5a.sendMessage(_0x42f0b2, {
      text: _0x3570c8
    }, {
      quoted: _0x40f751
    }), _0x5c46f9 = _0x2b3c29?.BOT_NAME || getBotName() || "VIPBOT", _0x36c376 = (_0x63bc98[0] || '').toLowerCase().trim();
    if (!_0x36c376) {
      const _0x277b94 = getAllApiCommands(), _0x29afd7 = {};
      for (const {cmd: _0x10ff6e, label: _0x46a412, category: _0x52f6fd} of _0x277b94) {
        if (!_0x29afd7[_0x52f6fd]) _0x29afd7[_0x52f6fd] = [];
        _0x29afd7[_0x52f6fd].push({
          cmd: _0x10ff6e,
          label: _0x46a412
        });
      }
      let _0x602be1 = "╭─⌈ " + _0x35339e.GLOBE + " *API REGISTRY* ⌋\n│\n";
      for (const [_0x340da9, _0x2035ce] of Object.entries(_0x29afd7)) {
        _0x602be1 += "├─⊷ *" + _0x340da9.toUpperCase() + '*\x0a';
        for (const {cmd: _0x2b385f, label: _0x209f18} of _0x2035ce) {
          _0x602be1 += "│   └⊷ *" + _0xf438a8 + _0x2b385f + '*\x20—\x20' + _0x209f18 + '\x0a';
        }
        _0x602be1 += '│\x0a';
      }
      (_0x602be1 += "├─⊷ " + _0x35339e.INFO + " *Usage:* " + _0xf438a8 + "getapi <command>\n", _0x602be1 += "├─⊷ " + _0x35339e.SIGNAL + " *Test:* " + _0xf438a8 + "fetchapi <command>\n", _0x602be1 += "├─⊷ " + _0x35339e.REFRESH + " *Replace:* " + _0xf438a8 + 'replaceapi\x20<command>\x20<url>\x20[style]\x0a', _0x602be1 += "╰⊷ *Powered by " + _0x5c46f9.toUpperCase() + '*', await _0x4a8cdc(_0x602be1));
      return;
    }
    const _0x375afb = getCommandInfo(_0x36c376);
    if (!_0x375afb) {
      await _0x4a8cdc(_0x35339e.ERROR + '\x20No\x20API\x20registered\x20for\x20*' + _0x36c376 + "*.\n\n" + ("Use *" + _0xf438a8 + 'getapi*\x20to\x20see\x20all\x20commands\x20with\x20APIs.'));
      return;
    }
    const _0x2575a5 = _0x375afb.isOverridden ? _0x35339e.REFRESH + " *OVERRIDDEN*" : _0x35339e.SUCCESS + " *DEFAULT*", _0x3e17d9 = _0x375afb.isOverridden ? '├─⊷\x20' + _0x35339e.REPEAT + " *Default:*\n│   └⊷ " + _0x375afb.defaultUrl + "\n│\n" : '', _0xf2f08f = PARAM_STYLE_LABELS[_0x375afb.paramStyle] || _0x375afb.paramStyle, _0xde234d = assembleUrl(_0x375afb.currentUrl, _0x375afb.paramStyle, _0x375afb.testQuery || 'test_query'), _0x5b1901 = "╭─⌈ " + _0x35339e.GLOBE + " *API INFO — " + _0x36c376.toUpperCase() + "* ⌋\n" + '│\x0a' + ("├─⊷ " + _0x35339e.PACKAGE + " *Command:* " + _0xf438a8 + _0x375afb.cmd + '\x0a') + ("├─⊷ " + _0x35339e.CLIPBOARD + " *Label:* " + _0x375afb.label + '\x0a') + ("├─⊷ " + _0x35339e.FOLDER + '\x20*Category:*\x20' + _0x375afb.category + '\x0a') + '│\x0a' + ("├─⊷ " + _0x35339e.LINK + " *Base URL:*\n") + ("│   └⊷ " + _0x375afb.currentUrl + '\x0a') + '│\x0a' + ("├─⊷ " + _0x35339e.DESIGN + " *Param Style:* `" + _0x375afb.paramStyle + '`\x0a') + ("│   └⊷ " + _0xf2f08f + '\x0a') + '│\x0a' + ("├─⊷ " + _0x35339e.SEARCH + '\x20*Live\x20URL\x20Preview:*\x0a') + ("│   └⊷ " + _0xde234d + '\x0a') + '│\x0a' + ("├─⊷ " + _0x35339e.CHART + " *Status:* " + _0x2575a5 + '\x0a') + '│\x0a' + _0x3e17d9 + ("├─⊷ " + _0x35339e.SIGNAL + " *Test API:* " + _0xf438a8 + "fetchapi " + _0x36c376 + '\x0a') + ("├─⊷ " + _0x35339e.REFRESH + " *Replace:* " + _0xf438a8 + "replaceapi " + _0x36c376 + '\x20<url>\x20[style]\x0a') + ("├─⊷ " + _0x35339e.RECYCLE + " *Reset:* " + _0xf438a8 + "replaceapi " + _0x36c376 + '\x20reset\x0a') + '│\x0a' + ('╰⊷\x20*Powered\x20by\x20' + _0x5c46f9.toUpperCase() + '*');
    if (_wolfBtns?.sendInteractiveMessage) try {
      await _wolfBtns.sendInteractiveMessage(_0x304f5a, _0x42f0b2, {
        text: _0x5b1901,
        footer: _0x5c46f9,
        interactiveButtons: [{
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: _0x35339e.SIGNAL + " TEST API",
            id: _0xf438a8 + "fetchapi " + _0x36c376
          })
        }, {
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: _0x35339e.REFRESH + " REPLACE API",
            id: _0xf438a8 + "replaceapi " + _0x36c376 + '\x20'
          })
        }, {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: _0x35339e.GLOBE + " Open Preview URL",
            url: _0xde234d,
            merchant_url: _0xde234d
          })
        }]
      });
      return;
    } catch (_0x57c322) {
      console.log('[getapi]\x20Buttons\x20failed:', _0x57c322?.message);
    }
    await _0x4a8cdc(_0x5b1901);
  }
};
import _0x35339e from '../../lib/emojis.js';
