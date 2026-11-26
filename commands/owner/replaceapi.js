import {getCommandInfo, setCommandApi, resetCommandApi, detectParamStyle, assembleUrl, PARAM_STYLE_LABELS} from '../../lib/apiRegistry.js';
import {getBotName} from '../../lib/botname.js';
import {createRequire} from 'module';
const _require = createRequire(import.meta.url);
let _wolfBtns = null;
try {
  _wolfBtns = await import("wolfbtns");
} catch {}
const VALID_STYLES = ["gifted", 'yturl', "keyword", 'raw'];
export default {
  name: "replaceapi",
  aliases: ["setapi", "swapapi"],
  category: "owner",
  desc: 'Replace\x20the\x20API\x20endpoint\x20for\x20a\x20command\x20(style\x20auto-detected\x20or\x20specify\x20manually)',
  usage: ".replaceapi <command> <newurl> [gifted|yturl|keyword|raw] | .replaceapi <command> reset",
  ownerOnly: true,
  async execute(_0x458346, _0x38973c, _0x5ea835, _0x2128be, _0x1755d0) {
    const _0x53d86e = _0x38973c.key.remoteJid, _0xed3e9a = _0x103611 => _0x458346.sendMessage(_0x53d86e, {
      text: _0x103611
    }, {
      quoted: _0x38973c
    }), _0x511e11 = _0x1755d0?.BOT_NAME || getBotName() || "VIPBOT", _0x1eed6e = (_0x5ea835[0] || '').toLowerCase().trim();
    let _0x5ab50a = null, _0x2a774f = _0x5ea835.slice(1);
    _0x2a774f.length > 0 && VALID_STYLES.includes(_0x2a774f[_0x2a774f.length - 1].toLowerCase()) && (_0x5ab50a = _0x2a774f.pop().toLowerCase());
    const _0x506035 = _0x2a774f.join('\x20').trim();
    if (!_0x1eed6e) {
      const _0x2bb2de = VALID_STYLES.map(_0x14679c => '│\x20\x20\x20•\x20*' + _0x14679c + '*\x20—\x20' + PARAM_STYLE_LABELS[_0x14679c]).join('\x0a');
      await _0xed3e9a("╭─⌈ " + _0x50f693.REFRESH + " *REPLACE API* ⌋\n" + '│\x0a' + "├─⊷ *Usage:*\n" + ('│\x20\x20\x20└⊷\x20' + _0x2128be + 'replaceapi\x20<cmd>\x20<newurl>\x20[style]\x0a') + ('│\x20\x20\x20└⊷\x20' + _0x2128be + 'replaceapi\x20<cmd>\x20reset\x0a') + '│\x0a' + '├─⊷\x20*Styles\x20(auto-detected\x20if\x20omitted):*\x0a' + _0x2bb2de + '\x0a' + '│\x0a' + '├─⊷\x20*Examples:*\x0a' + ("│   └⊷ " + _0x2128be + "replaceapi ytmp3 https://api.giftedtech.co.ke/api/download/ytaudio gifted\n") + ('│\x20\x20\x20└⊷\x20' + _0x2128be + "replaceapi ytmp3 https://apiskeith.top/download/audio yturl\n") + ("│   └⊷ " + _0x2128be + "replaceapi gpt https://apis.xwolf.space/download/audio keyword\n") + ("│   └⊷ " + _0x2128be + 'replaceapi\x20gpt\x20reset\x0a') + '│\x0a' + ("├─⊷ " + _0x50f693.CLIPBOARD + " List all APIs: *" + _0x2128be + "getapi*\n") + '│\x0a' + ('╰⊷\x20*Powered\x20by\x20' + _0x511e11.toUpperCase() + '*'));
      return;
    }
    const _0x468dbc = getCommandInfo(_0x1eed6e);
    if (!_0x468dbc) {
      await _0xed3e9a(_0x50f693.ERROR + " No API registered for *" + _0x1eed6e + '*.\x0a\x0a' + ('Use\x20*' + _0x2128be + "getapi* to see all commands with APIs."));
      return;
    }
    if (_0x506035.toLowerCase() === "reset") {
      const _0x4eb0f9 = resetCommandApi(_0x1eed6e);
      await _0xed3e9a(_0x4eb0f9 ? "╭─⌈ " + _0x50f693.RECYCLE + " *API RESET — " + _0x1eed6e.toUpperCase() + '*\x20⌋\x0a' + '│\x0a' + ('├─⊷\x20' + _0x50f693.SUCCESS + " *Restored to default:*\n") + ("│   └⊷ " + _0x468dbc.defaultUrl + '\x0a') + ("├─⊷ " + _0x50f693.DESIGN + '\x20*Style:*\x20' + _0x468dbc.paramStyle + '\x0a') + '│\x0a' + ("╰⊷ *Powered by " + _0x511e11.toUpperCase() + '*') : _0x50f693.ERROR + " Failed to reset API for *" + _0x1eed6e + '*.');
      return;
    }
    if (!_0x506035) {
      await _0xed3e9a(_0x50f693.WARNING + " Please provide a new URL.\n\n" + ('Usage:\x20*' + _0x2128be + "replaceapi " + _0x1eed6e + " <newurl> [style]*\n") + ('Reset:\x20*' + _0x2128be + 'replaceapi\x20' + _0x1eed6e + " reset*\n\n") + ("Current API: " + _0x468dbc.currentUrl + '\x0a') + ("Current Style: " + _0x468dbc.paramStyle));
      return;
    }
    if (!_0x506035.startsWith('http://') && !_0x506035.startsWith("https://")) {
      await _0xed3e9a(_0x50f693.ERROR + '\x20*Invalid\x20URL.*\x20Must\x20start\x20with\x20http://\x20or\x20https://\x0a\x0a' + ("Example:\n" + _0x2128be + 'replaceapi\x20' + _0x1eed6e + " https://newapi.com/endpoint"));
      return;
    }
    const _0xcdcc23 = _0x5ab50a || detectParamStyle(_0x506035) || _0x468dbc.paramStyle || "raw", _0x50819d = _0x468dbc.testQuery || "test_query", _0x18051c = assembleUrl(_0x506035, _0xcdcc23, _0x50819d), _0x10a4c7 = PARAM_STYLE_LABELS[_0xcdcc23] || _0xcdcc23, _0x379f4c = !_0x5ab50a, _0x2c595c = _0x468dbc.currentUrl, _0x2dc089 = _0x468dbc.paramStyle, _0x132bdc = setCommandApi(_0x1eed6e, _0x506035, _0xcdcc23);
    if (!_0x132bdc) {
      await _0xed3e9a(_0x50f693.ERROR + " Failed to save API override for *" + _0x1eed6e + '*.\x20Check\x20disk\x20space\x20or\x20file\x20permissions.');
      return;
    }
    const _0x425682 = '╭─⌈\x20' + _0x50f693.SUCCESS + " *API REPLACED — " + _0x1eed6e.toUpperCase() + "* ⌋\n" + '│\x0a' + ("├─⊷ " + _0x50f693.PACKAGE + " *Command:* " + _0x2128be + _0x1eed6e + '\x0a') + '│\x0a' + ("├─⊷ " + _0x50f693.ERROR + " *Old API:*\n") + ("│   └⊷ " + _0x2c595c + '\x0a') + ("├─⊷ " + _0x50f693.DESIGN + '\x20*Old\x20Style:*\x20' + _0x2dc089 + '\x0a') + '│\x0a' + ('├─⊷\x20' + _0x50f693.SUCCESS + " *New Base URL:*\n") + ("│   └⊷ " + _0x506035 + '\x0a') + ("├─⊷ " + _0x50f693.DESIGN + " *New Style:* " + _0xcdcc23 + (_0x379f4c ? " *(auto-detected)*" : " *(manual)*") + '\x0a') + ("│   └⊷ " + _0x10a4c7 + '\x0a') + '│\x0a' + ("├─⊷ " + _0x50f693.SEARCH + " *Preview URL (with test query):*\n") + ("│   └⊷ " + _0x18051c + '\x0a') + '│\x0a' + ("├─⊷ " + _0x50f693.LIGHTNING + " *Live:* Change is active immediately\n") + ('├─⊷\x20' + _0x50f693.SIGNAL + " *Test it:* " + _0x2128be + "fetchapi " + _0x1eed6e + '\x0a') + ("├─⊷ " + _0x50f693.RECYCLE + '\x20*Undo:*\x20' + _0x2128be + 'replaceapi\x20' + _0x1eed6e + " reset\n") + '│\x0a' + ("╰⊷ *Powered by " + _0x511e11.toUpperCase() + '*');
    if (_wolfBtns?.sendInteractiveMessage) try {
      await _wolfBtns.sendInteractiveMessage(_0x458346, _0x53d86e, {
        text: _0x425682,
        footer: _0x511e11,
        interactiveButtons: [{
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: _0x50f693.SIGNAL + " TEST NEW API",
            id: _0x2128be + "fetchapi " + _0x1eed6e
          })
        }, {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: _0x50f693.RECYCLE + '\x20RESET\x20TO\x20DEFAULT',
            id: _0x2128be + "replaceapi " + _0x1eed6e + " reset"
          })
        }, {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: _0x50f693.GLOBE + " Open New URL",
            url: _0x506035,
            merchant_url: _0x506035
          })
        }]
      });
      return;
    } catch (_0xb44c03) {
      console.log("[replaceapi] Buttons failed:", _0xb44c03?.message);
    }
    await _0xed3e9a(_0x425682);
  }
};
import _0x50f693 from '../../lib/emojis.js';
