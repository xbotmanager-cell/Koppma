import {getBotName} from './botname.js';
import {BRAND, DESIGN, EMOJIMIX, GAMES, GROUP, SOCIAL, STATUS, UTILITY} from './emojis.js';
const TIMEZONE = 'Africa/Nairobi', GOODMORNING_HOUR = parseInt(process.env.GOODMORNING_HOUR ?? '7', 10), GOODMORNING_MINUTE = parseInt(process.env.GOODMORNING_MINUTE ?? '0', 10), GOODNIGHT_HOUR = parseInt(process.env.GOODNIGHT_HOUR ?? '22', 10), GOODNIGHT_MINUTE = parseInt(process.env.GOODNIGHT_MINUTE ?? '30', 10);
function buildMorningMessages(_0x4d8f06) {
  return [
    "╭┄〔 " + UTILITY.SUN + "️ GOOD MORNING 〕┄╮\n┆\n┆ ✦ *To:* Owner " + SOCIAL.CROWN + "\n┆ ✦ *Wish:* Have a great day! " + UTILITY.SUNRISE + "\n┆ ✦ *Note:* Rise and conquer today " + GROUP.MUSCLE + "\n┆ ✦ *Anti-delete:* " + STATUS.SUCCESS + " Running\n┆ ✦ *Status Detect:* " + STATUS.SUCCESS + " Watching\n┆ ✦ *Anti-ViewOnce:* " + STATUS.SUCCESS + " Active\n┆ ◦ *Connection:* " + STATUS.SUCCESS + " Stable\n┆\n╰┄ *" + _0x4d8f06 + " Online* " + BRAND.PAW,
    "╭┄〔 " + UTILITY.SUN + "️ GOOD MORNING 〕┄╮\n┆\n┆ ✦ *To:* Boss " + SOCIAL.CROWN + "\n┆ ✦ *Wish:* New day, new wins! " + UTILITY.WEATHER + "️\n┆ ✦ *Note:* You've got this today " + STATUS.FIRE + "\n┆ ✦ *Anti-delete:* " + STATUS.SUCCESS + " Running\n┆ ✦ *All systems:* " + STATUS.SUCCESS + " Active\n┆ ✦ *Security:* " + STATUS.SUCCESS + " Protected\n┆ ◦ *Speed:* " + STATUS.SUCCESS + " Optimized\n┆\n╰┄ *" + _0x4d8f06 + " ready for the day* " + BRAND.WOLF,
    "╭┄〔 " + UTILITY.SUN + "️ GOOD MORNING 〕┄╮\n┆\n┆ ✦ *To:* Owner " + SOCIAL.CROWN + "\n┆ ✦ *Wish:* Start strong today! " + EMOJIMIX.SUN_FACE + "\n┆ ✦ *Note:* Make today count " + GAMES.TROPHY + "\n┆ ✦ *Anti-delete:* " + STATUS.SUCCESS + " Running\n┆ ✦ *Commands:* " + STATUS.SUCCESS + " Ready\n┆ ✦ *Connection:* " + STATUS.SUCCESS + " Stable\n┆ ◦ *Status:* " + STATUS.SUCCESS + " Online 24/7\n┆\n╰┄ *" + _0x4d8f06 + " is with you* " + BRAND.WOLF
  ];
}
function buildNightMessages(_0x2a6c13) {
  return [
    "╭┄〔 " + UTILITY.MOON + " GOOD NIGHT 〕┄╮\n┆\n┆ ✦ *To:* Owner " + SOCIAL.CROWN + "\n┆ ✦ *Wish:* Sweet dreams " + GROUP.SLEEP + "\n┆ ✦ *Note:* You deserve the rest " + STATUS.SPARKLE + "\n┆ ✦ *Anti-delete:* " + STATUS.SUCCESS + " Running\n┆ ✦ *Status Detect:* " + STATUS.SUCCESS + " Watching\n┆ ✦ *Anti-ViewOnce:* " + STATUS.SUCCESS + " Active\n┆ ◦ *Connection:* " + STATUS.SUCCESS + " Stable\n┆\n╰┄ *" + _0x2a6c13 + " is keeping watch* " + BRAND.WOLF,
    "╭┄〔 " + UTILITY.MOON + " GOOD NIGHT 〕┄╮\n┆\n┆ ✦ *To:* Boss " + SOCIAL.CROWN + "\n┆ ✦ *Wish:* Sleep tight " + DESIGN.MENU_GLOW + "\n┆ ✦ *Note:* You worked hard today " + STATUS.STAR + "\n┆ ✦ *Anti-delete:* " + STATUS.SUCCESS + " Running\n┆ ✦ *All systems:* " + STATUS.SUCCESS + " Active\n┆ ✦ *Security:* " + STATUS.SUCCESS + " Protected\n┆ ◦ *Speed:* " + STATUS.SUCCESS + " Optimized\n┆\n╰┄ *" + _0x2a6c13 + " never sleeps* " + BRAND.WOLF,
    "╭┄〔 " + UTILITY.MOON + " GOOD NIGHT 〕┄╮\n┆\n┆ ✦ *To:* Owner " + SOCIAL.CROWN + "\n┆ ✦ *Wish:* Rest well tonight " + STATUS.NEW + "\n┆ ✦ *Note:* Tomorrow will be great " + GROUP.MUSCLE + "\n┆ ✦ *Anti-delete:* " + STATUS.SUCCESS + " Running\n┆ ✦ *Commands:* " + STATUS.SUCCESS + " Ready\n┆ ✦ *Connection:* " + STATUS.SUCCESS + " Stable\n┆ ◦ *Status:* " + STATUS.SUCCESS + " Online 24/7\n┆\n╰┄ *" + _0x2a6c13 + " Online* " + BRAND.PAW
  ];
}
let _sock = null, _intervalId = null, _lastMorningDay = -1, _lastNightDay = -1;
function getNairobiTime() {
  const _0x1b8cec = new Date(), _0x3437ef = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: 'numeric',
    minute: "numeric",
    day: "numeric",
    hour12: false
  }).formatToParts(_0x1b8cec), _0x376cb5 = _0x3fef76 => parseInt(_0x3437ef.find(_0x262251 => _0x262251.type === _0x3fef76)?.value ?? '0', 10);
  return {
    h: _0x376cb5("hour"),
    min: _0x376cb5("minute"),
    day: _0x376cb5('day')
  };
}
function random(_0x508b04) {
  return _0x508b04[Math.floor(Math.random() * _0x508b04.length)];
}
async function checkAndSend() {
  if (!_sock) return;
  const _0x394d65 = global.OWNER_CLEAN_JID;
  if (!_0x394d65) return;
  const {h: _0x509f8e, min: _0x37ac8d, day: _0x4c173c} = getNairobiTime(), _0x32f5d2 = getBotName() || "VIPBOT";
  if (_0x509f8e === GOODMORNING_HOUR && _0x37ac8d === GOODMORNING_MINUTE && _0x4c173c !== _lastMorningDay) {
    _lastMorningDay = _0x4c173c;
    try {
      (await _sock.sendMessage(_0x394d65, {
        text: random(buildMorningMessages(_0x32f5d2))
      }), console.log("[scheduler] " + STATUS.SUCCESS + '\x20Good\x20morning\x20sent\x20at\x20' + String(_0x509f8e).padStart(2, '0') + ':' + String(_0x37ac8d).padStart(2, '0') + " EAT"));
    } catch (_0x2b8074) {
      console.log("[scheduler] " + STATUS.ERROR + " Failed to send good morning: " + _0x2b8074.message);
    }
  }
  if (_0x509f8e === GOODNIGHT_HOUR && _0x37ac8d === GOODNIGHT_MINUTE && _0x4c173c !== _lastNightDay) {
    _lastNightDay = _0x4c173c;
    try {
      (await _sock.sendMessage(_0x394d65, {
        text: random(buildNightMessages(_0x32f5d2))
      }), console.log("[scheduler] " + STATUS.SUCCESS + " Good night sent at " + String(_0x509f8e).padStart(2, '0') + ':' + String(_0x37ac8d).padStart(2, '0') + " EAT"));
    } catch (_0x133658) {
      console.log("[scheduler] " + STATUS.ERROR + " Failed to send good night: " + _0x133658.message);
    }
  }
}
export function startScheduler(_0x3d3c41) {
  _sock = _0x3d3c41;
  if (_intervalId) clearInterval(_intervalId);
  (setTimeout(checkAndSend, 15 * 1000), _intervalId = setInterval(checkAndSend, 60 * 1000));
  const {h: _0x1a5fa0, min: _0x56e0a8} = getNairobiTime();
  (globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.schedulerEAT = String(_0x1a5fa0).padStart(2, '0') + ':' + String(_0x56e0a8).padStart(2, '0') + " EAT");
}
export function updateSchedulerSock(_0x1fedfc) {
  _sock = _0x1fedfc;
}
export function stopScheduler() {
  _intervalId && (clearInterval(_intervalId), _intervalId = null);
}
