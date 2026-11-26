import {getCommandInfo, buildApiUrl, assembleUrl, PARAM_STYLE_LABELS} from '../../lib/apiRegistry.js';
import {getBotName} from '../../lib/botname.js';
export default {
  name: 'fetchapi',
  aliases: ['testapi', "pingapi"],
  category: 'owner',
  desc: "Fetch a command API with a real test query and show the response",
  usage: ".fetchapi <command> [custom_query]",
  ownerOnly: true,
  async execute(_0x70c88a, _0x25cc90, _0x455118, _0x5a279b, _0x581756) {
    const _0x14c698 = _0x25cc90.key.remoteJid, _0x2cd6d5 = _0x390175 => _0x70c88a.sendMessage(_0x14c698, {
      text: _0x390175
    }, {
      quoted: _0x25cc90
    }), _0x32bab5 = _0x581756?.BOT_NAME || getBotName() || "VIPBOT", _0x55ad7d = (_0x455118[0] || '').toLowerCase().trim(), _0x2c7eb1 = _0x455118.slice(1).join('\x20').trim();
    if (!_0x55ad7d) {
      await _0x2cd6d5('╭─⌈\x20' + _0x6bff3a.SIGNAL + " *FETCH API* ⌋\n" + '│\x0a' + "├─⊷ *Usage:*\n" + ('│\x20\x20\x20└⊷\x20' + _0x5a279b + "fetchapi <command>\n") + ("│   └⊷ " + _0x5a279b + "fetchapi <command> <custom query/url>\n") + '│\x0a' + "├─⊷ *Examples:*\n" + ("│   └⊷ " + _0x5a279b + "fetchapi ytmp3\n") + ("│   └⊷ " + _0x5a279b + 'fetchapi\x20gpt\x20hello\x20world\x0a') + ("│   └⊷ " + _0x5a279b + "fetchapi ytmp3 https://youtu.be/abc123\n") + '│\x0a' + "├─⊷ Builds the correct URL for each API style\n" + '├─⊷\x20Shows\x20HTTP\x20status,\x20latency\x20&\x20JSON\x20snippet\x0a' + '│\x0a' + ("╰⊷ *Powered by " + _0x32bab5.toUpperCase() + '*'));
      return;
    }
    const _0x4de9ca = getCommandInfo(_0x55ad7d);
    if (!_0x4de9ca) {
      await _0x2cd6d5(_0x6bff3a.ERROR + '\x20No\x20API\x20registered\x20for\x20*' + _0x55ad7d + "*.\n\n" + ("Use *" + _0x5a279b + 'getapi*\x20to\x20see\x20all\x20commands\x20with\x20APIs.'));
      return;
    }
    const _0x34fc34 = _0x2c7eb1 || _0x4de9ca.testQuery || '', _0x19007d = buildApiUrl(_0x55ad7d, _0x34fc34), _0x305258 = PARAM_STYLE_LABELS[_0x4de9ca.paramStyle] || _0x4de9ca.paramStyle;
    await _0x2cd6d5(_0x6bff3a.LOADING + " *Testing API...*\n\n" + (_0x6bff3a.PACKAGE + " Command: *" + _0x5a279b + _0x55ad7d + '*\x0a') + (_0x6bff3a.DESIGN + " Style: `" + _0x305258 + '`\x0a') + (_0x6bff3a.SEARCH + '\x20Query:\x20`' + (_0x34fc34 || "(none)") + '`\x0a') + (_0x6bff3a.LINK + '\x20URL:\x0a`' + _0x19007d + '`'));
    try {
      const _0x53297e = new AbortController(), _0x3d2156 = setTimeout(() => _0x53297e.abort(), 12000), _0x1715f2 = Date.now();
      let _0x17d313 = null, _0x552c9c = 0, _0x1cdab1 = false, _0x1bdcba = '';
      try {
        const _0x4486d8 = await fetch(_0x19007d, {
          method: "GET",
          signal: _0x53297e.signal,
          headers: {
            'User-Agent': "VIPBOT/1.0",
            Accept: 'application/json'
          }
        });
        (_0x552c9c = _0x4486d8.status, _0x1bdcba = _0x4486d8.headers.get('content-type') || '', _0x1cdab1 = _0x4486d8.ok || _0x4486d8.status < 500, _0x1bdcba.includes("application/json") || _0x1bdcba.includes('text') ? _0x17d313 = await _0x4486d8.text() : _0x17d313 = "[Binary / non-text — Content-Type: " + _0x1bdcba + ']');
      } finally {
        clearTimeout(_0x3d2156);
      }
      const _0x3b174b = Date.now() - _0x1715f2, _0x4eb2b0 = _0x3b174b < 500 ? _0x6bff3a.ONLINE + " Fast" : _0x3b174b < 1500 ? _0x6bff3a.PENDING + " Normal" : _0x6bff3a.OFFLINE + " Slow", _0x5a87fd = _0x1cdab1 ? '' + _0x6bff3a.SUCCESS : '' + _0x6bff3a.ERROR;
      let _0x630c3c = _0x17d313 || '', _0x5dabb1 = '';
      try {
        const _0x1556f7 = JSON.parse(_0x630c3c);
        _0x630c3c = JSON.stringify(_0x1556f7, null, 2);
        const _0x1fd98a = Object.keys(_0x1556f7).slice(0, 8);
        _0x5dabb1 = _0x1fd98a.length ? "├─⊷ " + _0x6bff3a.OLD_KEY + " *Keys:* `" + _0x1fd98a.join(',\x20') + '`\x0a' : '';
      } catch {}
      const _0x48e492 = 2500, _0x4e6bbd = _0x630c3c.length > _0x48e492, _0x115947 = _0x4e6bbd ? _0x630c3c.slice(0, _0x48e492) + "\n...[truncated]" : _0x630c3c;
      await _0x2cd6d5("╭─⌈ " + _0x6bff3a.SIGNAL + " *API TEST — " + _0x55ad7d.toUpperCase() + "* ⌋\n" + '│\x0a' + ("├─⊷ " + _0x6bff3a.PACKAGE + " *Command:* " + _0x5a279b + _0x55ad7d + '\x0a') + ("├─⊷ " + _0x6bff3a.DESIGN + " *Style:* " + _0x4de9ca.paramStyle + '\x0a') + ("├─⊷ " + _0x6bff3a.SEARCH + '\x20*Query\x20used:*\x20`' + (_0x34fc34 || "(none)") + '`\x0a') + '│\x0a' + ('├─⊷\x20' + _0x5a87fd + '\x20*HTTP\x20Status:*\x20' + _0x552c9c + '\x0a') + ("├─⊷ " + _0x6bff3a.LIGHTNING + " *Latency:* " + _0x3b174b + "ms (" + _0x4eb2b0 + ')\x0a') + ("├─⊷ " + (_0x1cdab1 ? _0x6bff3a.ONLINE + " *API is ONLINE*" : _0x6bff3a.OFFLINE + " *API may be DOWN*") + '\x0a') + _0x5dabb1 + (_0x4de9ca.isOverridden ? "├─⊷ " + _0x6bff3a.REFRESH + " *Using override* (not default)\n" : '') + '│\x0a' + "╰⊷ *JSON Response:*\n\n" + ("```\n" + (_0x115947 || "(empty response)") + "\n```"));
    } catch (_0x2aa732) {
      const _0x3311b8 = _0x2aa732.name === "AbortError";
      await _0x2cd6d5('╭─⌈\x20' + _0x6bff3a.SIGNAL + " *API TEST — " + _0x55ad7d.toUpperCase() + '*\x20⌋\x0a' + '│\x0a' + ('├─⊷\x20' + _0x6bff3a.PACKAGE + " *Command:* " + _0x5a279b + _0x55ad7d + '\x0a') + ('├─⊷\x20' + _0x6bff3a.DESIGN + '\x20*Style:*\x20' + _0x4de9ca.paramStyle + '\x0a') + ('├─⊷\x20' + _0x6bff3a.LINK + " *URL tested:* " + _0x19007d + '\x0a') + '│\x0a' + ("├─⊷ " + _0x6bff3a.ERROR + " *Status:* " + (_0x3311b8 ? 'Timed\x20out\x20(12s)' : "Unreachable") + '\x0a') + ("├─⊷ " + _0x6bff3a.CHAT + " *Error:* " + _0x2aa732.message + '\x0a') + ("├─⊷ " + _0x6bff3a.OFFLINE + '\x20*API\x20appears\x20to\x20be\x20DOWN*\x0a') + '│\x0a' + ('├─⊷\x20' + _0x6bff3a.INFO + " *Fix:* " + _0x5a279b + 'replaceapi\x20' + _0x55ad7d + '\x20<newurl>\x20[style]\x0a') + '│\x0a' + ("╰⊷ *Powered by " + _0x32bab5.toUpperCase() + '*'));
    }
  }
};
import _0x6bff3a from '../../lib/emojis.js';
