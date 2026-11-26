import _0x27d693 from '../../lib/emojis.js';
import _0x424a5e from 'fs';
import {getFooter} from '../../lib/menuHelper.js';
const antiCallFile = "./anticall.json";
if (!_0x424a5e.existsSync(antiCallFile)) {
  const initialData = {
    settings: {},
    callLogs: [],
    blockedNumbers: [],
    excludedNumbers: [],
    lastCacheClear: new Date().toISOString()
  };
  _0x424a5e.writeFileSync(antiCallFile, JSON.stringify(initialData, null, 2));
}
function loadAntiCall() {
  try {
    const _0x14c65d = _0x424a5e.readFileSync(antiCallFile, "utf8");
    return JSON.parse(_0x14c65d);
  } catch (_0x274f9e) {
    return (console.error("Error loading anti-call settings:", _0x274f9e), {
      settings: {},
      callLogs: [],
      blockedNumbers: [],
      excludedNumbers: [],
      lastCacheClear: new Date().toISOString()
    });
  }
}
function saveAntiCall(_0x17667f) {
  try {
    _0x424a5e.writeFileSync(antiCallFile, JSON.stringify(_0x17667f, null, 2));
  } catch (_0x3428fe) {
    console.error("Error saving anti-call settings:", _0x3428fe);
  }
}
function cleanJid(_0x154b14) {
  if (!_0x154b14) return _0x154b14;
  const _0x193bee = _0x154b14.split(':')[0];
  if (_0x193bee.includes('@')) return _0x193bee;
  return _0x193bee + "@s.whatsapp.net";
}
function normalizeNumber(_0x404a27) {
  if (!_0x404a27) return '';
  let _0x10ac4c = String(_0x404a27).trim().split('@')[0].split(':')[0].replace(/\D/g, '');
  if (_0x10ac4c.startsWith('00')) _0x10ac4c = _0x10ac4c.slice(2);
  if (_0x10ac4c.startsWith('0')) _0x10ac4c = "254" + _0x10ac4c.slice(1);
  return _0x10ac4c;
}
function numberEntry(_0x2ca2ad) {
  const _0x11f15f = normalizeNumber(_0x2ca2ad?.number || _0x2ca2ad);
  return _0x11f15f ? {
    number: _0x11f15f
  } : null;
}
function hasNumber(_0xebaae9, _0x46f13f) {
  const _0x4af70a = normalizeNumber(_0x46f13f);
  return !!_0x4af70a && _0xebaae9.some(_0x3f8964 => normalizeNumber(_0x3f8964?.number || _0x3f8964) === _0x4af70a);
}
function addNumber(_0x485434, _0x31726a) {
  const _0x5dcd40 = numberEntry(_0x31726a);
  if (!_0x5dcd40 || hasNumber(_0x485434, _0x5dcd40.number)) return false;
  return (_0x485434.push(_0x5dcd40), true);
}
function removeNumber(_0x16cffb, _0x5ebeec) {
  const _0x533c76 = normalizeNumber(_0x5ebeec), _0xd4e3d4 = _0x16cffb.length;
  return (_0x16cffb.splice(0, _0x16cffb.length, ..._0x16cffb.filter(_0x5b6556 => normalizeNumber(_0x5b6556?.number || _0x5b6556) !== _0x533c76)), _0x16cffb.length !== _0xd4e3d4);
}
function numberListText(_0x23a118) {
  return _0x23a118.length ? _0x23a118.map(_0x3ad374 => normalizeNumber(_0x3ad374?.number || _0x3ad374)).filter(Boolean).join(',\x20') : 'None';
}
let antiCallListenerAttached = false, antiCallSocket = null;
const handledCalls = new Map(), sentMessages = new Map();
let lastAutoClearTime = Date.now();
setInterval(() => {
  const _0x531daa = Date.now(), _0xa3ea20 = 5 * 60 * 1000;
  for (const [_0x447525, _0x7cfdb0] of handledCalls.entries()) {
    _0x531daa - _0x7cfdb0 > _0xa3ea20 && handledCalls.delete(_0x447525);
  }
  for (const [_0x5b50ae, _0x1c36ab] of sentMessages.entries()) {
    _0x531daa - _0x1c36ab > _0xa3ea20 && sentMessages.delete(_0x5b50ae);
  }
  const _0x4236b1 = 24 * 60 * 60 * 1000;
  if (_0x531daa - lastAutoClearTime > _0x4236b1) {
    (console.log(_0x27d693.REFRESH + " Auto-clearing call cache after 24 hours..."), handledCalls.clear(), sentMessages.clear(), lastAutoClearTime = _0x531daa);
    const _0x3a470e = loadAntiCall();
    (_0x3a470e.lastCacheClear = new Date().toISOString(), saveAntiCall(_0x3a470e), console.log(_0x27d693.SUCCESS + " Call cache auto-cleared successfully"));
  }
}, 60000);
export default {
  name: "anticall",
  alias: ["callblock", "blockcall"],
  description: "Manage automatic call handling and blocking",
  category: 'owner',
  ownerOnly: true,
  async execute(_0x22dbec, _0x5f1864, _0x6dcb64, _0x2d3d14, _0x367892) {
    const _0x1f54b7 = _0x5f1864.key.remoteJid, _0x44a19f = cleanJid(_0x22dbec.user?.id), _0x1a6469 = loadAntiCall(), _0x486876 = _0x1a6469.settings || ({}), _0x48fee5 = _0x1a6469.blockedNumbers || [], _0x3b5754 = _0x1a6469.excludedNumbers || [], _0x4327d4 = _0x1a6469.callLogs || [], _0x3c3869 = _0x1a6469.lastCacheClear || new Date().toISOString(), _0xd36d8b = _0x6dcb64[0]?.toLowerCase(), _0x80e81e = _0x6dcb64[1]?.toLowerCase(), _0x49e47c = _0x2fb487 => _0x22dbec.sendMessage(_0x1f54b7, {
      text: _0x2fb487
    }, {
      quoted: _0x5f1864
    });
    !antiCallListenerAttached && (setupAntiCallListener(_0x22dbec), antiCallListenerAttached = true);
    if (_0xd36d8b === 'status') {
      const _0x38c999 = _0x486876[_0x44a19f] || ({
        enabled: false,
        mode: "decline",
        autoMessage: false
      }), _0x4e9457 = new Date(new Date(_0x3c3869).getTime() + 24 * 60 * 60 * 1000), _0x2d28f4 = _0x4e9457 - Date.now(), _0xc83523 = Math.floor(_0x2d28f4 / 3600000), _0x85dbef = Math.floor(_0x2d28f4 % 3600000 / 60000);
      let _0x3b9132 = '╭┄〔\x20' + _0x27d693.PHONE_CALL + " *ANTICALL STATUS* 〕┄╮\n┆\n";
      return (_0x3b9132 += "┆ ✦ *Status:* " + (_0x38c999.enabled ? _0x27d693.ONLINE + " ON" : _0x27d693.OFFLINE + " OFF") + '\x0a', _0x3b9132 += '┆ ✦ *Mode:*\x20' + (_0x38c999.mode || 'decline').toUpperCase() + '\x0a', _0x3b9132 += "┆ ✦ *Auto-reply:* " + (_0x38c999.autoMessage ? _0x27d693.SUCCESS + " ON" : _0x27d693.ERROR + ' OFF') + '\x0a', _0x38c999.autoMessage && _0x38c999.message && (_0x3b9132 += "┆ ✦ *Message:* " + _0x38c999.message.substring(0, 40) + (_0x38c999.message.length > 40 ? '…' : '') + '\x0a'), _0x3b9132 += '┆\x0a', _0x3b9132 += '┆ ✦ *Calls\x20handled:*\x20' + _0x4327d4.length + '\x0a', _0x3b9132 += "┆ ✦ *Decline list:* " + numberListText(_0x48fee5) + '\x0a', _0x3b9132 += "┆ ✦ *Excluded list:* " + numberListText(_0x3b5754) + '\x0a', _0x3b9132 += "┆ ✦ *Next cache clear:* " + _0xc83523 + 'h\x20' + _0x85dbef + 'm\x0a', _0x4327d4.length > 0 && (_0x3b9132 += '┆\x0a┆ ✦ *Recent\x20calls:*\x0a', _0x4327d4.slice(-3).reverse().forEach((_0xf7c15d, _0x16bc48) => {
        const _0x105d04 = new Date(_0xf7c15d.timestamp).toLocaleTimeString();
        _0x3b9132 += '┆  ' + (_0x16bc48 + 1) + '.\x20' + _0xf7c15d.from?.split('@')[0] + " — " + _0xf7c15d.action + '\x20(' + _0x105d04 + ')\x0a';
      })), _0x3b9132 += '╰┄ *Listener:*\x20' + (antiCallListenerAttached ? _0x27d693.SUCCESS + " Active" : _0x27d693.ERROR + " Inactive"), _0x49e47c(_0x3b9132));
    }
    if (["decline", "exclude", "allow", "remove", "undecline", "unexclude"].includes(_0xd36d8b)) {
      const _0xa28dbe = _0xd36d8b === "decline" || _0xd36d8b === "undecline", _0x43e8eb = ["remove", "undecline", "unexclude"].includes(_0xd36d8b), _0x483d2f = _0xa28dbe ? _0x48fee5 : _0x3b5754;
      let _0x3ea7a1 = _0xd36d8b === 'remove' ? _0x6dcb64[2] : _0x6dcb64[1];
      if (!_0x3ea7a1 || !(/^\+?[\d\s().-]+$/).test(_0x3ea7a1)) return _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + '\x20*ANTICALL\x20NUMBERS*\x20⌋\x0a│\x0a' + ('├─⊷\x20*' + _0x2d3d14 + "anticall decline 254713046497*\n│  └⊷ Add a number to the decline list\n") + ("├─⊷ *" + _0x2d3d14 + "anticall exclude 254700000000*\n│  └⊷ Allow a number when anticall is active\n") + ("├─⊷ *" + _0x2d3d14 + 'anticall\x20remove\x20decline\x20254713046497*\x0a│\x20\x20└⊷\x20Remove\x20from\x20the\x20decline\x20list\x0a') + ("╰─⊷ Use *" + _0x2d3d14 + "anticall status* to view both lists"));
      let _0xab8ad9 = _0x483d2f;
      if (_0xd36d8b === "remove") {
        const _0x43c3ec = _0x6dcb64[1]?.toLowerCase();
        if (!["decline", 'exclude', "allow"].includes(_0x43c3ec) || !_0x6dcb64[2]) return _0x49e47c(_0x27d693.ERROR + " Use *" + _0x2d3d14 + 'anticall\x20remove\x20decline\x20NUMBER*\x20or\x20*' + _0x2d3d14 + "anticall remove exclude NUMBER*.");
        (_0xab8ad9 = ["exclude", "allow"].includes(_0x43c3ec) ? _0x3b5754 : _0x48fee5, _0x3ea7a1 = _0x6dcb64[2]);
      }
      const _0x4b0530 = normalizeNumber(_0x3ea7a1);
      if (_0x4b0530.length < 7) return _0x49e47c(_0x27d693.ERROR + " Please provide a valid international WhatsApp number.");
      const _0x4cda6e = _0x43e8eb ? removeNumber(_0xab8ad9, _0x3ea7a1) : addNumber(_0xab8ad9, _0x3ea7a1);
      !_0x43e8eb && _0xa28dbe && (_0x486876[_0x44a19f] = {
        ..._0x486876[_0x44a19f] || ({}),
        enabled: true,
        mode: "decline",
        targetedOnly: true,
        autoMessage: _0x486876[_0x44a19f]?.autoMessage || false,
        message: _0x486876[_0x44a19f]?.message || "Sorry, I don't accept calls. Please message me instead.",
        lastUpdated: new Date().toISOString()
      });
      (setupAntiCallListener(_0x22dbec), antiCallListenerAttached = true, _0x1a6469.blockedNumbers = _0x48fee5, _0x1a6469.excludedNumbers = _0x3b5754, _0x1a6469.settings = _0x486876, saveAntiCall(_0x1a6469));
      const _0x37374b = _0xab8ad9 === _0x48fee5 ? "decline" : 'exclude';
      return _0x49e47c(_0x27d693.SUCCESS + '\x20Number\x20*' + normalizeNumber(_0x3ea7a1) + '*\x20' + (_0x43e8eb ? "removed from the " + _0x37374b + '\x20list' : "added to the " + _0x37374b + " list") + '.' + ('' + (_0x4cda6e ? '' : " It was already " + (_0x43e8eb ? "absent" : "present") + '.')));
    }
    if (_0xd36d8b === "enable") {
      if (_0x80e81e === 'block') return _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + '\x20*ANTICALL*\x20⌋\x0a│\x0a' + ("├─⊷ " + _0x27d693.WARNING + " *Block mode unavailable*\n│\n") + '│\x20\x20Due\x20to\x20WhatsApp\x20API\x20limitations,\x20bots\x0a' + "│  cannot block callers at the WhatsApp level.\n│\n" + ("│  " + _0x27d693.POINT_RIGHT + " To block manually:\n") + ('│\x20\x20Open\x20chat\x20' + _0x27d693.ARROW_RIGHT + " Tap name " + _0x27d693.ARROW_RIGHT + " *Block*\n│\n") + ('╰⊷\x20Use\x20*' + _0x2d3d14 + "anticall enable decline* instead"));
      if (!_0x80e81e || _0x80e81e !== "decline") return _0x49e47c('╭─⌈\x20' + _0x27d693.PHONE_CALL + " *ANTICALL* ⌋\n│\n" + ('├─⊷\x20*' + _0x2d3d14 + "anticall enable decline*\n│  └⊷ Silently decline all calls\n") + '╰⊷\x20Provide\x20mode:\x20decline');
      return (_0x486876[_0x44a19f] = {
        enabled: true,
        mode: "decline",
        targetedOnly: false,
        autoMessage: _0x486876[_0x44a19f]?.autoMessage || false,
        message: _0x486876[_0x44a19f]?.message || "Sorry, I don't accept calls. Please message me instead.",
        lastUpdated: new Date().toISOString()
      }, _0x1a6469.settings = _0x486876, saveAntiCall(_0x1a6469), _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + " *ANTICALL* ⌋\n│\n" + ("├─⊷ *Status:* " + _0x27d693.ONLINE + '\x20ON\x0a') + "├─⊷ *Mode:* DECLINE\n" + ("╰⊷ " + (_0x48fee5.length ? 'Only\x20numbers\x20on\x20the\x20decline\x20list\x20will\x20be\x20declined' : 'All\x20incoming\x20calls\x20will\x20be\x20silently\x20declined'))));
    }
    if (_0xd36d8b === 'disable') {
      if (_0x486876[_0x44a19f]?.enabled || _0x48fee5.length > 0) return (_0x486876[_0x44a19f] = {
        ..._0x486876[_0x44a19f] || ({}),
        mode: _0x486876[_0x44a19f]?.mode || "decline",
        autoMessage: _0x486876[_0x44a19f]?.autoMessage || false,
        message: _0x486876[_0x44a19f]?.message || "Sorry, I don't accept calls. Please message me instead.",
        lastUpdated: new Date().toISOString()
      }, _0x486876[_0x44a19f].enabled = false, _0x486876[_0x44a19f].targetedOnly = false, _0x1a6469.settings = _0x486876, saveAntiCall(_0x1a6469), _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + " *ANTICALL* ⌋\n│\n├─⊷ *Status:* " + _0x27d693.OFFLINE + " OFF\n╰⊷ Calls will come through normally"));
      return _0x49e47c('╭─⌈\x20' + _0x27d693.PHONE_CALL + '\x20*ANTICALL*\x20⌋\x0a│\x0a╰⊷\x20Already\x20disabled');
    }
    if (_0xd36d8b === "message") {
      const _0x539c3b = _0x6dcb64.slice(1).join('\x20').trim();
      if (!_0x539c3b) return _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + '\x20*ANTICALL*\x20⌋\x0a│\x0a' + ("├─⊷ *" + _0x2d3d14 + "anticall message [text]*\n│  └⊷ Set auto-reply for calls\n") + ("╰⊷ Example: " + _0x2d3d14 + "anticall message I can't take calls"));
      return (!_0x486876[_0x44a19f] ? _0x486876[_0x44a19f] = {
        enabled: false,
        mode: "decline",
        autoMessage: true,
        message: _0x539c3b,
        lastUpdated: new Date().toISOString()
      } : (_0x486876[_0x44a19f].autoMessage = true, _0x486876[_0x44a19f].message = _0x539c3b, _0x486876[_0x44a19f].lastUpdated = new Date().toISOString()), _0x1a6469.settings = _0x486876, saveAntiCall(_0x1a6469), _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + " *ANTICALL* ⌋\n│\n├─⊷ *Auto-reply:* " + _0x27d693.SUCCESS + " ON\n├─⊷ *Message:* " + _0x539c3b.substring(0, 50) + "\n╰⊷ Sent after every handled call"));
    }
    if (_0xd36d8b === 'nomessage') return (!_0x486876[_0x44a19f] ? _0x486876[_0x44a19f] = {
      enabled: false,
      mode: 'decline',
      autoMessage: false,
      message: '',
      lastUpdated: new Date().toISOString()
    } : (_0x486876[_0x44a19f].autoMessage = false, _0x486876[_0x44a19f].lastUpdated = new Date().toISOString()), _0x1a6469.settings = _0x486876, saveAntiCall(_0x1a6469), _0x49e47c('╭─⌈\x20' + _0x27d693.PHONE_CALL + " *ANTICALL* ⌋\n│\n├─⊷ *Auto-reply:* " + _0x27d693.ERROR + " OFF\n╰⊷ No message sent after calls"));
    if (_0xd36d8b === "clearhandled") return (handledCalls.clear(), sentMessages.clear(), lastAutoClearTime = Date.now(), _0x1a6469.lastCacheClear = new Date().toISOString(), saveAntiCall(_0x1a6469), _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + " *ANTICALL* ⌋\n│\n├─⊷ *Cache cleared* " + _0x27d693.SUCCESS + "\n╰⊷ Next auto-clear in 24h"));
    if (_0xd36d8b === "logs") {
      const _0x1e829c = parseInt(_0x6dcb64[1]) || 10, _0x112bd6 = _0x4327d4.slice(-_0x1e829c).reverse();
      if (_0x112bd6.length === 0) return _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + " *CALL LOGS* ⌋\n│\n╰⊷ No calls handled yet");
      let _0x30b420 = "╭─⌈ " + _0x27d693.PHONE_CALL + '\x20*CALL\x20LOGS*\x20⌋\x0a│\x0a';
      return (_0x112bd6.forEach((_0x560daa, _0x355e80) => {
        const _0xb495af = new Date(_0x560daa.timestamp).toLocaleString();
        _0x30b420 += "├─⊷ " + (_0x355e80 + 1) + '.\x20' + _0x560daa.from?.split('@')[0] + "\n│  └⊷ " + _0x560daa.action.toUpperCase() + " • " + _0xb495af + '\x0a';
      }), _0x30b420 += '╰⊷\x20Total:\x20' + _0x4327d4.length + " call(s)", _0x49e47c(_0x30b420));
    }
    return _0x49e47c("╭─⌈ " + _0x27d693.PHONE_CALL + " *ANTICALL* ⌋\n│\n" + ("├─⊷ *" + _0x2d3d14 + 'anticall\x20enable\x20decline*\x0a│\x20\x20└⊷\x20Auto-decline\x20all\x20incoming\x20calls\x0a') + ("├─⊷ *" + _0x2d3d14 + "anticall disable*\n│  └⊷ Turn off anticall\n") + ('├─⊷\x20*' + _0x2d3d14 + "anticall decline NUMBER*\n│  └⊷ Decline only this number (targeted mode)\n") + ("├─⊷ *" + _0x2d3d14 + 'anticall\x20exclude\x20NUMBER*\x0a│\x20\x20└⊷\x20Allow\x20this\x20number\x20while\x20anticall\x20is\x20active\x0a') + ("├─⊷ *" + _0x2d3d14 + "anticall remove decline NUMBER*\n│  └⊷ Remove a decline entry\n") + ('├─⊷\x20*' + _0x2d3d14 + "anticall message [text]*\n│  └⊷ Set auto-reply after call\n") + ("├─⊷ *" + _0x2d3d14 + "anticall nomessage*\n│  └⊷ Remove auto-reply\n") + ("├─⊷ *" + _0x2d3d14 + "anticall status*\n│  └⊷ View current settings\n") + ("├─⊷ *" + _0x2d3d14 + 'anticall\x20logs*\x0a│\x20\x20└⊷\x20View\x20recent\x20call\x20history\x0a') + ("├─⊷ *" + _0x2d3d14 + "anticall clearhandled*\n│  └⊷ Clear call tracking cache\n") + ("╰⊷ " + getFooter(_0x5f1864.key.participant || _0x5f1864.key.remoteJid)));
  }
};
function setupAntiCallListener(_0x415380) {
  if (!_0x415380 || antiCallSocket === _0x415380) return;
  (antiCallSocket = _0x415380, console.log(_0x27d693.TOOL + " Setting up anti-call listener..."), _0x415380.ev.on("call", async _0x316a3e => {
    try {
      const _0x5534e0 = Array.isArray(_0x316a3e) ? _0x316a3e : [_0x316a3e];
      for (const _0x467992 of _0x5534e0) {
        console.log(_0x27d693.PHONE_CALL + " Incoming call detected:", _0x467992);
        const _0xe5c867 = loadAntiCall(), _0x598070 = _0xe5c867.settings || ({}), _0x3f0e69 = _0xe5c867.blockedNumbers || [], _0x49de37 = _0xe5c867.excludedNumbers || [], _0x250639 = _0xe5c867.callLogs || [], _0x1f58c2 = cleanJid(_0x415380.user?.id), _0x348e4b = _0x598070[_0x1f58c2], _0x40055f = _0x3f0e69.length > 0 && _0x348e4b?.targetedOnly !== false;
        console.log("Checking settings for bot " + _0x1f58c2 + ':', _0x348e4b);
        if ((!_0x348e4b || !_0x348e4b.enabled) && !_0x40055f) {
          console.log("Anti-call not enabled for bot, allowing call");
          continue;
        }
        const _0x2a78c7 = _0x467992.from || _0x467992.peerJid || _0x467992.chatId || '', _0x15d2ad = _0x467992.id || _0x467992.callId;
        if (!_0x2a78c7 || !_0x15d2ad) {
          console.log("Skipping call without sender or call ID");
          continue;
        }
        console.log("Call from: " + _0x2a78c7 + ", Call ID: " + _0x15d2ad + ", Status: " + _0x467992.status);
        if (String(_0x467992.status || '').toLowerCase() !== 'offer') {
          console.log("Skipping call with status: " + _0x467992.status);
          continue;
        }
        if (handledCalls.has(_0x15d2ad)) {
          console.log("Already handled call " + _0x15d2ad + ',\x20skipping');
          return;
        }
        (handledCalls.set(_0x15d2ad, Date.now()), console.log("Tracking call " + _0x15d2ad + " from " + _0x2a78c7));
        let _0x15875f = _0x2a78c7;
        if (_0x2a78c7.includes("@lid")) try {
          _0x15875f = await globalThis.resolvePhoneFromLidAsync?.(_0x2a78c7) || globalThis.resolvePhoneFromLid?.(_0x2a78c7) || globalThis.lidPhoneCache?.get(_0x2a78c7.split('@')[0].split(':')[0]) || _0x2a78c7;
        } catch {}
        const _0x4aab4f = normalizeNumber(_0x15875f), _0x5362e9 = hasNumber(_0x49de37, _0x4aab4f), _0x3b5bb1 = !_0x5362e9 && (!_0x40055f || hasNumber(_0x3f0e69, _0x4aab4f));
        if (!_0x3b5bb1) {
          console.log("Allowing call from " + _0x2a78c7 + '\x20(matched\x20as\x20' + _0x4aab4f + ')' + (_0x5362e9 ? " (excluded)" : " (not targeted)"));
          continue;
        }
        if (hasNumber(_0x3f0e69, _0x4aab4f)) {
          console.log('Number\x20' + _0x2a78c7 + '\x20matched\x20' + _0x4aab4f + '\x20in\x20block\x20list,\x20rejecting\x20call');
          try {
            (await _0x415380.rejectCall(_0x15d2ad, _0x2a78c7), _0x250639.push({
              callId: _0x15d2ad,
              from: _0x2a78c7,
              action: "decline",
              reason: 'decline_list',
              timestamp: new Date().toISOString(),
              messageSent: false,
              status: _0x467992.status
            }), _0xe5c867.callLogs = _0x250639, saveAntiCall(_0xe5c867));
          } catch (_0x340b11) {
            (console.error("Failed to reject call:", _0x340b11), handledCalls.delete(_0x15d2ad));
          }
          continue;
        }
        let _0x3c4a05 = "none", _0x222115 = false;
        switch (_0x348e4b.mode) {
          case "block":
          case "decline":
            try {
              (console.log("Declining call " + _0x15d2ad + '\x20from\x20' + _0x2a78c7), await _0x415380.rejectCall(_0x15d2ad, _0x2a78c7), _0x3c4a05 = "decline");
            } catch (_0x11f71f) {
              (console.error("Failed to decline call:", _0x11f71f), handledCalls.delete(_0x15d2ad));
              continue;
            }
            break;
        }
        if (_0x348e4b.autoMessage && _0x348e4b.message && _0x3c4a05 !== "none") try {
          sentMessages.has(_0x15d2ad) ? (console.log("Already sent message for call " + _0x15d2ad + ',\x20skipping'), _0x222115 = true) : (setTimeout(async () => {
            try {
              (await _0x415380.sendMessage(_0x2a78c7, {
                text: _0x348e4b.message
              }), console.log("Sent auto-reply to " + _0x2a78c7 + '\x20for\x20call\x20' + _0x15d2ad), sentMessages.set(_0x15d2ad, Date.now()));
              const _0x29c001 = _0x250639[_0x250639.length - 1];
              _0x29c001 && _0x29c001.callId === _0x15d2ad && (_0x29c001.messageSent = true, saveAntiCall(_0xe5c867));
            } catch (_0x390607) {
              console.error("Failed to send auto-reply:", _0x390607);
            }
          }, 1000), _0x222115 = true);
        } catch (_0x43a632) {
          console.error("Failed to send auto-reply:", _0x43a632);
        }
        (_0x250639.push({
          callId: _0x15d2ad,
          from: _0x2a78c7,
          action: _0x3c4a05,
          reason: "anti_call_enabled",
          timestamp: new Date().toISOString(),
          messageSent: _0x222115,
          status: _0x467992.status,
          mode: _0x348e4b.mode
        }), _0x250639.length > 1000 && _0x250639.splice(0, _0x250639.length - 1000), _0xe5c867.callLogs = _0x250639, saveAntiCall(_0xe5c867), console.log("Call " + _0x15d2ad + '\x20from\x20' + _0x2a78c7 + '\x20handled:\x20' + _0x3c4a05 + ',\x20message\x20sent:\x20' + _0x222115));
      }
    } catch (_0x48d022) {
      console.error("Error in anti-call handler:", _0x48d022);
    }
  }), console.log(_0x27d693.SUCCESS + " Anti-call listener attached"));
}
globalThis._anticallInit = _0x3421b2 => {
  try {
    const _0x57b265 = loadAntiCall(), _0x33636c = _0x57b265.settings || ({}), _0x2d1d11 = cleanJid(_0x3421b2.user?.id);
    let _0x3017fe = _0x33636c[_0x2d1d11];
    (!_0x3017fe && Array.isArray(_0x57b265.blockedNumbers) && _0x57b265.blockedNumbers.length > 0 && (_0x3017fe = {
      enabled: true,
      mode: "decline",
      autoMessage: false,
      message: "Sorry, I don't accept calls. Please message me instead.",
      lastUpdated: new Date().toISOString()
    }, _0x33636c[_0x2d1d11] = _0x3017fe, _0x57b265.settings = _0x33636c, saveAntiCall(_0x57b265)), _0x3017fe?.enabled && (setupAntiCallListener(_0x3421b2), antiCallListenerAttached = true, console.log(_0x27d693.SUCCESS + " Anti-call listener restored on reconnect")));
  } catch {}
};
