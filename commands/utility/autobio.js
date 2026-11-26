import {UTILITY} from '../../lib/emojis.js';
import _0x293686 from '../../lib/database.js';
import {getBotName} from '../../lib/botname.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
let configCache = null, _activeSock = null;
async function loadConfig(_0x2a8e6c) {
  return (!configCache && (configCache = await _0x293686.getConfig("autobio_config", _0x2a8e6c), configCache = {
    ..._0x2a8e6c,
    ...configCache
  }), configCache);
}
async function saveConfig(_0x45d41c) {
  (configCache = _0x45d41c, await _0x293686.setConfig('autobio_config', _0x45d41c));
}
async function _doAutoBioUpdate(_0xf1eec4) {
  if (!_activeSock || !_0xf1eec4 || !_0xf1eec4.enabled) return;
  try {
    const _0x50094d = getBotName(), _0x35cca2 = new Date(), _0x36db01 = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Africa/Nairobi"
    }, _0x38978c = {
      weekday: "short",
      year: "numeric",
      month: 'short',
      day: "numeric",
      timeZone: "Africa/Nairobi"
    }, _0x56444f = _0x35cca2.toLocaleTimeString('en-US', _0x36db01), _0x5437f6 = _0x35cca2.toLocaleDateString("en-US", _0x38978c), _0x1fe88f = _0xf1eec4.format || "default";
    let _0x172f39;
    if (_0x1fe88f === "minimal") _0x172f39 = UTILITY.WOLF + " Online | " + _0x56444f; else {
      if (_0x1fe88f === 'realtime') _0x172f39 = UTILITY.ONLINE + '\x20' + _0x50094d + " LIVE | " + UTILITY.CLOCK_HAND + '\x20' + _0x56444f + " | " + UTILITY.DATE + '\x20' + _0x5437f6 + " | " + UTILITY.LIGHTNING + " Active"; else {
        if (_0x1fe88f === 'always-on') _0x172f39 = UTILITY.LIGHTNING + '\x20' + _0x50094d + " • Always Online • " + _0x56444f + '\x20•\x20' + _0x5437f6; else {
          if (_0x1fe88f === "live-clock") _0x172f39 = UTILITY.CLOCK + '\x20' + _0x56444f + " | " + _0x50094d + " | " + UTILITY.DATE + '\x20' + _0x5437f6; else _0x172f39 = UTILITY.WOLF + '\x20' + _0x50094d + " is online | " + UTILITY.CLOCK_HAND + '\x20' + _0x56444f + " | " + UTILITY.DATE + '\x20' + _0x5437f6;
        }
      }
    }
    if (_0x172f39.length > 139) _0x172f39 = _0x172f39.substring(0, 136) + "...";
    (await _activeSock.updateProfileStatus(_0x172f39), _0xf1eec4.lastUpdate = new Date().toISOString(), _0xf1eec4.updateCount = (_0xf1eec4.updateCount || 0) + 1, configCache = _0xf1eec4, await _0x293686.setConfig("autobio_config", _0xf1eec4).catch(() => {}));
  } catch (_0x5b179f) {
    console.log(UTILITY.ERROR + '\x20AutoBio\x20update\x20error:', _0x5b179f.message);
  }
}
globalThis._autobioInit = async _0x4f46ab => {
  try {
    _activeSock = _0x4f46ab;
    const _0x321430 = {
      enabled: false,
      interval: 5,
      format: "default",
      updateCount: 0,
      customTemplates: [],
      weather: {
        enabled: false
      }
    }, _0x4774b2 = await _0x293686.getConfig("autobio_config", _0x321430);
    if (!_0x4774b2?.enabled) return;
    (configCache = {
      ..._0x321430,
      ..._0x4774b2
    }, !global.BIO_INTERVAL && (console.log(UTILITY.ROCKET + '\x20AutoBio\x20restored\x20on\x20reconnect'), global.BIO_INTERVAL = setInterval(() => _doAutoBioUpdate(configCache), _0x4774b2.interval * 60000), setTimeout(() => _doAutoBioUpdate(configCache), 3000)));
  } catch {}
};
export default {
  name: 'autobio',
  alias: ["autoprofile", "bio"],
  category: "owner",
  description: "Automatically update WhatsApp bio with real-time status, time, date, and weather",
  ownerOnly: true,
  async execute(_0x3b7dab, _0x53ce5e, _0x567121, _0x626573, _0x5dcd49) {
    _activeSock = _0x3b7dab;
    const _0x116331 = _0x53ce5e.key.remoteJid, {jidManager: _0x234cd8, BOT_NAME: _0x1bd2a3, VERSION: _0x2dd34f} = _0x5dcd49;
    (console.log('\x0a' + UTILITY.SEARCH + " ========= AUTOBIO COMMAND DEBUG ========="), console.log("Chat ID:", _0x116331), console.log("From Me:", _0x53ce5e.key.fromMe));
    const _0x164744 = _0x53ce5e.key.participant || _0x116331, _0x3900a5 = _0x234cd8.cleanJid(_0x164744);
    (console.log("Sender JID:", _0x164744), console.log("Cleaned Number:", _0x3900a5.cleanNumber), console.log("Is Owner:", _0x234cd8.isOwner(_0x53ce5e)), console.log("========================================\n"));
    const _0x55061e = {
      enabled: true,
      interval: 5,
      format: "default",
      lastUpdate: null,
      nextUpdate: null,
      updateCount: 0,
      created: new Date().toISOString(),
      weather: {
        enabled: false,
        city: "Nairobi",
        country: 'KE',
        apiKey: '',
        lastFetch: null
      },
      customTemplates: []
    };
    let _0x2d5e7a = await loadConfig(_0x55061e);
    function _0x46e746() {
      const _0xfd6b2b = new Date();
      return _0xfd6b2b.toLocaleTimeString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: 'Africa/Nairobi'
      });
    }
    function _0x5133fa() {
      const _0x3c093f = new Date();
      return _0x3c093f.toLocaleDateString("en-US", {
        weekday: "short",
        year: 'numeric',
        month: "short",
        day: "numeric",
        timeZone: "Africa/Nairobi"
      });
    }
    function _0xad7f4() {
      const _0x49a815 = new Date();
      return _0x49a815.toLocaleString('en-US', {
        weekday: 'short',
        month: "short",
        day: "numeric",
        hour: '2-digit',
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Africa/Nairobi"
      });
    }
    function _0x49bf59(_0x557b12) {
      if (!_0x557b12) return "Never";
      const _0xa49105 = new Date(), _0x339c4b = new Date(_0x557b12), _0x6a12e2 = _0xa49105 - _0x339c4b, _0x2cba45 = Math.floor(_0x6a12e2 / 60000);
      if (_0x2cba45 < 1) return 'Just\x20now';
      if (_0x2cba45 < 60) return _0x2cba45 + '\x20minute' + (_0x2cba45 !== 1 ? 's' : '') + " ago";
      const _0x27f642 = Math.floor(_0x2cba45 / 60);
      if (_0x27f642 < 24) return _0x27f642 + " hour" + (_0x27f642 !== 1 ? 's' : '') + " ago";
      const _0x35e27 = Math.floor(_0x27f642 / 24);
      return _0x35e27 + " day" + (_0x35e27 !== 1 ? 's' : '') + " ago";
    }
    async function _0x442908(_0x49309d = "Nairobi", _0x266cbe = 'KE') {
      try {
        const _0x2d8527 = _0x2d5e7a.weather.apiKey || process.env.WEATHER_API_KEY;
        if (!_0x2d8527) return null;
        const _0x2ce190 = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + _0x49309d + ',' + _0x266cbe + '&units=metric&appid=' + _0x2d8527);
        if (!_0x2ce190.ok) return (console.log("Weather API error:", await _0x2ce190.text()), null);
        const _0x57828e = await _0x2ce190.json();
        return {
          temp: Math.round(_0x57828e.main.temp),
          feels_like: Math.round(_0x57828e.main.feels_like),
          description: _0x57828e.weather[0].description,
          humidity: _0x57828e.main.humidity,
          city: _0x57828e.name,
          icon: _0x186c27(_0x57828e.weather[0].main),
          timestamp: new Date().toISOString()
        };
      } catch (_0x262a9e) {
        return (console.log("Weather fetch error:", _0x262a9e.message), null);
      }
    }
    function _0x186c27(_0x4005d9) {
      const _0x5ae25f = {
        Clear: UTILITY.SUN,
        Clouds: UTILITY.CLOUD,
        Rain: UTILITY.RAIN,
        Drizzle: UTILITY.CLOUD_RAIN,
        Thunderstorm: UTILITY.THUNDER,
        Snow: UTILITY.SNOW,
        Mist: UTILITY.FOG,
        Smoke: UTILITY.WIND,
        Haze: UTILITY.FOG,
        Fog: UTILITY.FOG
      };
      return _0x5ae25f[_0x4005d9] || UTILITY.THERMOMETER;
    }
    const _0x2e2e37 = {
      default: () => {
        const _0x441693 = _0x46e746(), _0x58c4e9 = _0x5133fa();
        return UTILITY.WOLF + '\x20' + _0x1bd2a3 + '\x20is\x20online\x20|\x20' + UTILITY.CLOCK_HAND + '\x20' + _0x441693 + " | " + UTILITY.DATE + '\x20' + _0x58c4e9;
      },
      detailed: async () => {
        const _0xf61e9e = _0x46e746(), _0x3722a0 = _0x5133fa();
        let _0xa0dffa = '';
        if (_0x2d5e7a.weather.enabled && _0x2d5e7a.weather.apiKey) {
          const _0x1465a8 = await _0x442908(_0x2d5e7a.weather.city, _0x2d5e7a.weather.country);
          _0x1465a8 && (_0xa0dffa = " | " + _0x1465a8.icon + '\x20' + _0x1465a8.temp + '°C');
        }
        return UTILITY.BOT + '\x20' + _0x1bd2a3 + '\x20v' + _0x2dd34f + " | " + UTILITY.CLOCK + '\x20' + _0xf61e9e + " | " + UTILITY.DATE + '\x20' + _0x3722a0 + _0xa0dffa + " | " + UTILITY.REFRESH + " Live";
      },
      realtime: () => {
        const _0x42bfb1 = _0x46e746(), _0x210768 = _0x5133fa();
        return UTILITY.ONLINE + '\x20' + _0x1bd2a3 + " LIVE | " + UTILITY.CLOCK_HAND + '\x20' + _0x42bfb1 + " | " + UTILITY.DATE + '\x20' + _0x210768 + " | " + UTILITY.LIGHTNING + '\x20Active';
      },
      'live-clock': () => {
        const _0x322a6c = _0x46e746(), _0x27cc1b = _0x5133fa(), _0x463003 = new Date().getHours();
        let _0x57f2f5 = UTILITY.CLOCK_HAND;
        if (_0x463003 >= 5 && _0x463003 < 12) _0x57f2f5 = UTILITY.SUNRISE; else {
          if (_0x463003 >= 12 && _0x463003 < 17) _0x57f2f5 = UTILITY.SUN; else {
            if (_0x463003 >= 17 && _0x463003 < 20) _0x57f2f5 = UTILITY.SUNSET; else _0x57f2f5 = UTILITY.MOON;
          }
        }
        return _0x57f2f5 + '\x20' + _0x322a6c + " | " + _0x1bd2a3 + '\x20|\x20' + UTILITY.DATE + '\x20' + _0x27cc1b;
      },
      minimal: () => {
        const _0x5b283d = _0x46e746();
        return UTILITY.WOLF + " Online | " + _0x5b283d;
      },
      'wolf-style': async () => {
        const _0xa43afd = _0x46e746(), _0x25dd43 = _0x5133fa(), _0x25144f = new Date().getHours();
        let _0x36bf62 = UTILITY.CLOCK_HAND;
        if (_0x25144f >= 5 && _0x25144f < 12) _0x36bf62 = UTILITY.SUNRISE; else {
          if (_0x25144f >= 12 && _0x25144f < 17) _0x36bf62 = UTILITY.SUN; else {
            if (_0x25144f >= 17 && _0x25144f < 20) _0x36bf62 = UTILITY.SUNSET; else _0x36bf62 = UTILITY.MOON;
          }
        }
        let _0x4efdab = '';
        if (_0x2d5e7a.weather.enabled && _0x2d5e7a.weather.apiKey) {
          const _0x2cefff = await _0x442908(_0x2d5e7a.weather.city, _0x2d5e7a.weather.country);
          _0x2cefff && (_0x4efdab = " | " + _0x2cefff.icon);
        }
        return UTILITY.WOLF + '\x20' + _0x1bd2a3 + '\x20|\x20' + _0x36bf62 + '\x20' + _0xa43afd + " | " + UTILITY.DATE + '\x20' + _0x25dd43 + _0x4efdab + " | " + UTILITY.LIGHTNING + '\x20v' + _0x2dd34f;
      },
      professional: async () => {
        const _0x5f1879 = _0x46e746(), _0x123062 = _0x5133fa();
        let _0x358c1b = '';
        if (_0x2d5e7a.weather.enabled && _0x2d5e7a.weather.apiKey) {
          const _0x566c71 = await _0x442908(_0x2d5e7a.weather.city, _0x2d5e7a.weather.country);
          _0x566c71 && (_0x358c1b = " | " + UTILITY.THERMOMETER + '\x20' + _0x566c71.temp + '°C');
        }
        const _0xe4090f = process.uptime(), _0x783b19 = Math.floor(_0xe4090f / 3600), _0x361934 = Math.floor(_0xe4090f % 3600 / 60);
        return UTILITY.BOT + '\x20' + _0x1bd2a3 + " | " + UTILITY.CLOCK_HAND + '\x20' + _0x5f1879 + " | " + UTILITY.DATE + '\x20' + _0x123062 + " | " + UTILITY.TIMER + '\x20' + _0x783b19 + 'h\x20' + _0x361934 + 'm' + _0x358c1b;
      },
      'always-on': () => {
        const _0x27056c = _0x46e746(), _0x33b8eb = _0x5133fa();
        return UTILITY.LIGHTNING + '\x20' + _0x1bd2a3 + " • Always Online • " + _0x27056c + '\x20•\x20' + _0x33b8eb;
      }
    };
    async function _0x53ff23() {
      try {
        let _0x4f5095 = '';
        if (_0x2d5e7a.customTemplates.length > 0 && _0x2d5e7a.format === "custom") {
          const _0x3668da = _0x2d5e7a.customTemplates[0];
          _0x4f5095 = _0x3668da.text.replace(/{time}/g, _0x46e746()).replace(/{date}/g, _0x5133fa()).replace(/{datetime}/g, _0xad7f4()).replace(/{botName}/g, _0x1bd2a3).replace(/{version}/g, _0x2dd34f).replace(/{uptime}/g, () => {
            const _0x3f7448 = process.uptime(), _0x2e81b = Math.floor(_0x3f7448 / 3600), _0x1bd7af = Math.floor(_0x3f7448 % 3600 / 60);
            return _0x2e81b + 'h\x20' + _0x1bd7af + 'm';
          });
        } else {
          const _0x41646d = _0x2e2e37[_0x2d5e7a.format] || _0x2e2e37.default;
          _0x4f5095 = await _0x41646d();
        }
        return (_0x4f5095.length > 139 && (_0x4f5095 = _0x4f5095.substring(0, 136) + "..."), await _0x3b7dab.updateProfileStatus(_0x4f5095), _0x2d5e7a.lastUpdate = new Date().toISOString(), _0x2d5e7a.nextUpdate = new Date(Date.now() + _0x2d5e7a.interval * 60000).toISOString(), _0x2d5e7a.updateCount++, await saveConfig(_0x2d5e7a), console.log(UTILITY.SUCCESS + " Bio updated (Real-time): \"" + _0x4f5095 + '\x22'), {
          success: true,
          bio: _0x4f5095,
          timestamp: new Date().toISOString()
        });
      } catch (_0x2bd4e4) {
        return (console.log(UTILITY.ERROR + " Bio update error:", _0x2bd4e4.message), {
          success: false,
          error: _0x2bd4e4.message
        });
      }
    }
    !global.BIO_INTERVAL && _0x2d5e7a.enabled && (console.log(UTILITY.ROCKET + " Auto-bio enabled on startup"), global.BIO_INTERVAL = setInterval(async () => {
      _0x2d5e7a.enabled && await _0x53ff23();
    }, _0x2d5e7a.interval * 60000), setTimeout(async () => {
      await _0x53ff23();
    }, 2000));
    const _0x3a14b9 = _0x567121[0]?.toLowerCase();
    if (!_0x3a14b9) {
      const _0x4cde98 = Object.keys(_0x2e2e37).join(',\x20');
      return _0x3b7dab.sendMessage(_0x116331, {
        text: "╭┄〔 " + UTILITY.BOT + " *AUTO BIO* 〕┄╮\n" + ("┆ ✦ *Status:* " + (_0x2d5e7a.enabled ? UTILITY.SUCCESS + " ON" : UTILITY.ERROR + " OFF") + " | *Format:* " + _0x2d5e7a.format + '\x0a') + ("┆ ✦ *Interval:* " + _0x2d5e7a.interval + "min | *Updates:* " + _0x2d5e7a.updateCount + '\x0a') + ("┆ ✦ *" + _0x626573 + 'autobio\x20on/off*\x0a┆\x20\x20╰┄\x20Toggle\x20auto\x20bio\x0a') + ('┆ ✦ *' + _0x626573 + 'autobio\x20format\x20<name>*\x0a┆\x20\x20╰┄\x20' + _0x4cde98 + '\x0a') + ("┆ ✦ *" + _0x626573 + "autobio interval <min>*\n┆  ╰┄ Set update interval\n") + ("┆ ✦ *" + _0x626573 + "autobio test*\n┆  ╰┄ Test bio update now\n") + ("┆ ✦ *" + _0x626573 + 'autobio\x20weather\x20<city>\x20<code>*\x0a┆\x20\x20╰┄\x20Enable\x20weather\x20in\x20bio\x0a') + ("╰┄ " + getFooter(_0x53ce5e.key.participant || _0x53ce5e.key.remoteJid))
      }, {
        quoted: _0x53ce5e
      });
    }
    switch (_0x3a14b9) {
      case 'on':
      case "enable":
      case "start":
        (_0x2d5e7a.enabled = true, _0x2d5e7a.lastUpdate = null, _0x2d5e7a.nextUpdate = null, await saveConfig(_0x2d5e7a), clearInterval(global.BIO_INTERVAL), global.BIO_INTERVAL = setInterval(async () => {
          _0x2d5e7a.enabled && await _0x53ff23();
        }, _0x2d5e7a.interval * 60000));
        const _0x49bd4e = await _0x53ff23();
        let _0xb781d6 = UTILITY.SUCCESS + '\x20*Auto\x20Bio\x20ENABLED*\x0a\x0a';
        (_0xb781d6 += UTILITY.CLOCK + " *Interval:* Every " + _0x2d5e7a.interval + " minutes\n", _0xb781d6 += UTILITY.NOTE + " *Format:* " + _0x2d5e7a.format + '\x0a', _0xb781d6 += UTILITY.REFRESH + '\x20*Next\x20update:*\x20In\x20' + _0x2d5e7a.interval + '\x20minutes\x0a', _0xb781d6 += UTILITY.PHONE + '\x20*Current\x20Time:*\x20' + _0x46e746() + '\x0a\x0a');
        _0x49bd4e.success && (_0xb781d6 += UTILITY.PAPER + " *Current Bio:*\n```" + _0x49bd4e.bio + "```\n\n");
        _0x2d5e7a.weather.enabled && (_0xb781d6 += UTILITY.WEATHER + " *Weather updates:* " + UTILITY.SUCCESS + " ENABLED\n");
        (_0xb781d6 += UTILITY.LIGHTNING + " Bio will update automatically every " + _0x2d5e7a.interval + " minutes with real-time data.", await _0x3b7dab.sendMessage(_0x116331, {
          text: _0xb781d6
        }, {
          quoted: _0x53ce5e
        }));
        break;
      case "off":
      case 'disable':
      case "stop":
        (_0x2d5e7a.enabled = false, await saveConfig(_0x2d5e7a), clearInterval(global.BIO_INTERVAL), global.BIO_INTERVAL = null, await _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.SUCCESS + '\x20*Auto\x20Bio\x20DISABLED*\x0a\x0aBio\x20will\x20no\x20longer\x20update\x20automatically.\x0a\x0aUse\x20`' + _0x626573 + "autobio on` to enable again.\n\n" + UTILITY.PHONE + " Current time: " + _0x46e746()
        }, {
          quoted: _0x53ce5e
        }));
        break;
      case "test":
      case "update":
        const _0x97bb58 = await _0x53ff23();
        _0x97bb58.success ? await _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.SUCCESS + '\x20*Bio\x20Updated\x20Successfully!*\x0a\x0a' + UTILITY.PAPER + " *New Bio:*\n```" + _0x97bb58.bio + "```\n\n" + UTILITY.CHART + " *Update Count:* " + _0x2d5e7a.updateCount + '\x0a' + UTILITY.CLOCK_HAND + " *Updated At:* " + new Date(_0x97bb58.timestamp).toLocaleTimeString() + '\x0a' + UTILITY.PHONE + " *Current Time:* " + _0x46e746()
        }, {
          quoted: _0x53ce5e
        }) : await _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.ERROR + " *Bio Update Failed*\n\nError: " + _0x97bb58.error + "\n\nCheck console for details.\n\nCurrent time: " + _0x46e746()
        }, {
          quoted: _0x53ce5e
        });
        break;
      case "now":
      case "time":
      case 'current':
        const _0x20bdea = _0x46e746(), _0x530b90 = _0x5133fa(), _0xb89ce = _0xad7f4();
        let _0x12f033 = '';
        if (_0x2d5e7a.customTemplates.length > 0 && _0x2d5e7a.format === 'custom') {
          const _0x1e3960 = _0x2d5e7a.customTemplates[0];
          _0x12f033 = _0x1e3960.text.replace(/{time}/g, _0x20bdea).replace(/{date}/g, _0x530b90).replace(/{datetime}/g, _0xb89ce).replace(/{botName}/g, _0x1bd2a3).replace(/{version}/g, _0x2dd34f);
        } else {
          const _0x53864d = _0x2e2e37[_0x2d5e7a.format] || _0x2e2e37.default;
          _0x12f033 = await _0x53864d();
        }
        await _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.CLOCK_HAND + '\x20*REAL-TIME\x20INFORMATION*\x0a\x0a' + UTILITY.PHONE + " *Current Time:* " + _0x20bdea + '\x0a' + UTILITY.DATE + " *Current Date:* " + _0x530b90 + '\x0a' + UTILITY.CLOCK + " *Full DateTime:* " + _0xb89ce + '\x0a\x0a' + UTILITY.NOTE + " *Bio Preview:*\n```" + _0x12f033 + "```\n\n" + UTILITY.RULER + " *Length:* " + _0x12f033.length + "/139 characters\n\nUse `" + _0x626573 + 'autobio\x20test`\x20to\x20apply\x20this\x20now.'
        }, {
          quoted: _0x53ce5e
        });
        break;
      case "interval":
        const _0x448002 = parseInt(_0x567121[1]);
        if (!_0x448002 || _0x448002 < 1 || _0x448002 > 1440) return _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.ERROR + " *Invalid Interval*\n\nPlease specify a number between 1 and 1440 (24 hours).\n\nExample: `" + _0x626573 + 'autobio\x20interval\x2010`\x0a\x0aCurrent\x20time:\x20' + _0x46e746()
        }, {
          quoted: _0x53ce5e
        });
        (_0x2d5e7a.interval = _0x448002, await saveConfig(_0x2d5e7a));
        _0x2d5e7a.enabled && (clearInterval(global.BIO_INTERVAL), global.BIO_INTERVAL = setInterval(async () => {
          _0x2d5e7a.enabled && await _0x53ff23();
        }, _0x2d5e7a.interval * 60000));
        await _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.SUCCESS + " *Update Interval Changed*\n\n" + UTILITY.CLOCK + " New interval: Every " + _0x448002 + " minutes\n" + UTILITY.PHONE + " Current time: " + _0x46e746() + '\x0a\x0a' + (_0x2d5e7a.enabled ? "Interval restarted with new timing." : 'Enable\x20auto\x20bio\x20for\x20changes\x20to\x20take\x20effect.')
        }, {
          quoted: _0x53ce5e
        });
        break;
      case "format":
        const _0x1912f7 = _0x567121[1]?.toLowerCase();
        if (!_0x1912f7 || !_0x2e2e37[_0x1912f7] && _0x1912f7 !== 'custom') {
          const _0x3dafd5 = Object.keys(_0x2e2e37).join(',\x20');
          return _0x3b7dab.sendMessage(_0x116331, {
            text: UTILITY.ERROR + " *Invalid Format*\n\nAvailable formats: " + _0x3dafd5 + ',\x20custom\x0a\x0aExample:\x20`' + _0x626573 + "autobio format realtime`\n\nCurrent time: " + _0x46e746()
          }, {
            quoted: _0x53ce5e
          });
        }
        (_0x2d5e7a.format = _0x1912f7, await saveConfig(_0x2d5e7a));
        const _0x1157ef = await _0x53ff23();
        let _0x27b8da = UTILITY.SUCCESS + " *Bio Format Changed*\n\n" + UTILITY.NOTE + '\x20New\x20format:\x20*' + _0x1912f7 + '*\x0a' + UTILITY.PHONE + " Current time: " + _0x46e746() + '\x0a\x0a';
        _0x1157ef.success && (_0x27b8da += UTILITY.PAPER + " *Preview:*\n```" + _0x1157ef.bio + "```\n\n");
        (_0x27b8da += 'Changes\x20applied\x20immediately.', await _0x3b7dab.sendMessage(_0x116331, {
          text: _0x27b8da
        }, {
          quoted: _0x53ce5e
        }));
        break;
      case "weather":
        const _0x700aee = _0x567121[1]?.toLowerCase();
        if (!_0x700aee || _0x700aee === "off") {
          (_0x2d5e7a.weather.enabled = false, await saveConfig(_0x2d5e7a), await _0x3b7dab.sendMessage(_0x116331, {
            text: UTILITY.SUCCESS + " *Weather Updates DISABLED*\n\nWeather information will no longer be included in the bio.\n\nCurrent time: " + _0x46e746()
          }, {
            quoted: _0x53ce5e
          }));
          break;
        }
        if (_0x700aee === "setkey") {
          const _0x31444b = _0x567121[2];
          if (!_0x31444b) return _0x3b7dab.sendMessage(_0x116331, {
            text: UTILITY.ERROR + '\x20*API\x20Key\x20Required*\x0a\x0aUsage:\x20' + _0x626573 + "autobio weather setkey YOUR_API_KEY\n\nGet a free API key from: openweathermap.org/api\n\nCurrent time: " + _0x46e746()
          }, {
            quoted: _0x53ce5e
          });
          (_0x2d5e7a.weather.apiKey = _0x31444b, _0x2d5e7a.weather.enabled = true, await saveConfig(_0x2d5e7a));
          const _0x2939b6 = await _0x442908(_0x2d5e7a.weather.city, _0x2d5e7a.weather.country);
          let _0x277cd6 = UTILITY.SUCCESS + '\x20*Weather\x20API\x20Key\x20Set*\x0a\x0a';
          _0x2939b6 && (_0x277cd6 += UTILITY.WEATHER + '\x20*Real-time\x20Weather:*\x0a', _0x277cd6 += UTILITY.LOCATION + '\x20' + _0x2939b6.city + ':\x20' + _0x2939b6.icon + '\x20' + _0x2939b6.temp + '°C\x0a', _0x277cd6 += UTILITY.NOTE + '\x20' + _0x2939b6.description + '\x0a', _0x277cd6 += UTILITY.DROP + " Humidity: " + _0x2939b6.humidity + '%\x0a', _0x277cd6 += UTILITY.CLOCK_HAND + " Fetched at: " + new Date(_0x2939b6.timestamp).toLocaleTimeString() + '\x0a\x0a');
          (_0x277cd6 += 'Weather\x20updates\x20are\x20now\x20enabled.\x0a\x0aCurrent\x20time:\x20' + _0x46e746(), await _0x3b7dab.sendMessage(_0x116331, {
            text: _0x277cd6
          }, {
            quoted: _0x53ce5e
          }));
          break;
        }
        const _0x242e26 = _0x567121[1], _0x1f9780 = _0x567121[2] || 'KE';
        if (!_0x242e26) return _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.ERROR + " *City Required*\n\nUsage: " + _0x626573 + "autobio weather <city> [country]\nExample: " + _0x626573 + "autobio weather Nairobi KE\n\nCurrent time: " + _0x46e746()
        }, {
          quoted: _0x53ce5e
        });
        (_0x2d5e7a.weather.enabled = true, _0x2d5e7a.weather.city = _0x242e26, _0x2d5e7a.weather.country = _0x1f9780, await saveConfig(_0x2d5e7a));
        const _0x22fd6e = await _0x442908(_0x242e26, _0x1f9780);
        let _0x3f3f54 = UTILITY.SUCCESS + '\x20*Weather\x20Updates\x20ENABLED*\x0a\x0a';
        (_0x3f3f54 += UTILITY.LOCATION + " *Location:* " + _0x242e26 + ',\x20' + _0x1f9780 + '\x0a', _0x3f3f54 += UTILITY.PHONE + " *Current Time:* " + _0x46e746() + '\x0a\x0a');
        _0x22fd6e ? (_0x3f3f54 += UTILITY.WEATHER + " *Real-time Weather:*\n", _0x3f3f54 += "├─ " + _0x22fd6e.icon + '\x20' + _0x22fd6e.temp + "°C\n", _0x3f3f54 += "├─ Feels like: " + _0x22fd6e.feels_like + "°C\n", _0x3f3f54 += "├─ " + _0x22fd6e.description + '\x0a', _0x3f3f54 += "├─ Humidity: " + _0x22fd6e.humidity + '%\x0a', _0x3f3f54 += "└─ Fetched: " + _0x49bf59(_0x22fd6e.timestamp) + '\x0a\x0a') : (_0x3f3f54 += UTILITY.WARNING + " *Weather fetch failed*\n", _0x3f3f54 += 'Set\x20an\x20API\x20key:\x20' + _0x626573 + "autobio weather setkey YOUR_API_KEY\n\n");
        (_0x3f3f54 += "Weather will be included in your real-time bio updates.", await _0x3b7dab.sendMessage(_0x116331, {
          text: _0x3f3f54
        }, {
          quoted: _0x53ce5e
        }));
        break;
      case "custom":
        const _0x1def76 = _0x567121.slice(1).join('\x20');
        if (!_0x1def76) return _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.ERROR + " *Custom Template Required*\n\nUsage: " + _0x626573 + "autobio custom \"Your bio with {time}, {date}, {datetime}, {botName}, {version}, {uptime}\"\n\nVariables: {time}, {date}, {datetime}, {botName}, {version}, {uptime}\n\nCurrent time: " + _0x46e746()
        }, {
          quoted: _0x53ce5e
        });
        (_0x2d5e7a.format = "custom", _0x2d5e7a.customTemplates = [{
          text: _0x1def76,
          created: new Date().toISOString()
        }], await saveConfig(_0x2d5e7a));
        const _0x452d55 = await _0x53ff23();
        let _0x3bf9cd = UTILITY.SUCCESS + " *Custom Template Set*\n\n";
        (_0x3bf9cd += UTILITY.NOTE + " *Template:*\n```" + _0x1def76 + '```\x0a\x0a', _0x3bf9cd += UTILITY.PHONE + " *Current Time:* " + _0x46e746() + '\x0a\x0a');
        _0x452d55.success && (_0x3bf9cd += UTILITY.PAPER + " *Generated Bio:*\n```" + _0x452d55.bio + "```\n\n");
        (_0x3bf9cd += 'Variables:\x20{time},\x20{date},\x20{datetime},\x20{botName},\x20{version},\x20{uptime}\x0a', _0x3bf9cd += "Template saved and will be used for all future real-time updates.", await _0x3b7dab.sendMessage(_0x116331, {
          text: _0x3bf9cd
        }, {
          quoted: _0x53ce5e
        }));
        break;
      case "reset":
        (_0x2d5e7a = {
          ..._0x55061e
        }, await saveConfig(_0x2d5e7a), clearInterval(global.BIO_INTERVAL), global.BIO_INTERVAL = null);
        _0x2d5e7a.enabled && (global.BIO_INTERVAL = setInterval(async () => {
          _0x2d5e7a.enabled && await _0x53ff23();
        }, _0x2d5e7a.interval * 60000));
        await _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.SUCCESS + " *Auto Bio RESET*\n\nAll settings have been reset to default values.\n\nAuto bio is now enabled by default.\n\n" + UTILITY.PHONE + " Current time: " + _0x46e746() + '\x0a' + UTILITY.LIGHTNING + " Auto-bio will start automatically."
        }, {
          quoted: _0x53ce5e
        });
        break;
      default:
        await _0x3b7dab.sendMessage(_0x116331, {
          text: UTILITY.ERROR + " *Unknown Command*\n\nUse `" + _0x626573 + "autobio` without arguments to see all options.\n\nExample: " + _0x626573 + "autobio on\n\nCurrent time: " + _0x46e746()
        }, {
          quoted: _0x53ce5e
        });
    }
  }
};
