import {getPlatformInfo} from './platformDetect.js';
import {ETHICAL, GROUP, STATUS} from './emojis.js';
const SPIN_DOWN_PLATFORMS = new Set(["Render", "Replit", 'Koyeb', "Glitch", "Cyclic", "Railway", 'Heroku']);
function resolvePublicUrl() {
  if (process.env.SELF_PING_URL) return process.env.SELF_PING_URL;
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL;
  if (process.env.REPLIT_DOMAINS) {
    const _0x29ccce = process.env.REPLIT_DOMAINS.split(',')[0].trim();
    if (_0x29ccce) return "https://" + _0x29ccce;
  }
  if (process.env.REPLIT_DEV_DOMAIN) return 'https://' + process.env.REPLIT_DEV_DOMAIN;
  if (process.env.KOYEB_PUBLIC_DOMAIN) return "https://" + process.env.KOYEB_PUBLIC_DOMAIN;
  if (process.env.PROJECT_DOMAIN) return "https://" + process.env.PROJECT_DOMAIN + ".glitch.me";
  if (process.env.CYCLIC_URL) return process.env.CYCLIC_URL;
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return 'https://' + process.env.RAILWAY_PUBLIC_DOMAIN;
  if (process.env.RAILWAY_STATIC_URL) return process.env.RAILWAY_STATIC_URL;
  if (process.env.HEROKU_URL) return process.env.HEROKU_URL;
  if (process.env.HEROKU_APP_NAME) return 'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com';
  return null;
}
function shouldEnable(_0x218815) {
  const _0x1c594d = (process.env.SELF_PING || '').toLowerCase();
  if (_0x1c594d === "false" || _0x1c594d === '0') return false;
  if (_0x1c594d === 'true' || _0x1c594d === '1') return true;
  return SPIN_DOWN_PLATFORMS.has(_0x218815);
}
const N = "\u001b[38;2;0;255;156m", NB = "\u001b[1m\u001b[38;2;0;255;156m", Y = '\x1b[38;2;250;204;21m', W = "\u001b[38;2;200;215;225m", D = "\u001b[2m\u001b[38;2;100;120;130m", R = "\u001b[0m";
let _pingInterval = null;
export function setupSelfPing() {
  if (_pingInterval) return;
  const {name: _0x4640e3} = getPlatformInfo();
  if (!shouldEnable(_0x4640e3)) return;
  const _0x18b5ed = resolvePublicUrl(), _0x529f39 = process.env.SELF_PING_PATH || '/health', _0x316d8a = parseFloat(process.env.SELF_PING_INTERVAL || '14'), _0x8568f2 = Math.max(1, _0x316d8a) * 60 * 1000;
  if (!_0x18b5ed) {
    process.stdout.write(Y + "[SELF-PING]" + R + '\x20' + W + "Auto-ping enabled but no public URL found." + R + '\x0a' + (D + '\x20\x20→\x20Set\x20SELF_PING_URL=https://your-app-url\x20to\x20activate\x20keep-alive.' + R + '\x0a'));
    return;
  }
  const _0x4a4b3b = _0x18b5ed.replace(/\/$/, '') + _0x529f39;
  process.stdout.write('\x0a' + NB + "╭┄〔 " + ETHICAL.PINGPONG + " SELF-PING KEEP-ALIVE 〕┄╮" + R + '\x0a' + (NB + '┆ ✦ ' + R + Y + "Platform:" + R + '\x20' + W + _0x4640e3 + R + '\x0a') + (NB + '┆ ✦ ' + R + Y + "Target  :" + R + '\x20' + W + _0x4a4b3b + R + '\x0a') + (NB + '┆ ✦ ' + R + Y + "Interval:" + R + '\x20' + W + "every " + _0x316d8a + " min" + R + '\x0a') + (NB + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + R + '\x0a\x0a'));
  async function _0x15e933() {
    const _0x5edf28 = Date.now();
    try {
      const _0x2a687e = await fetch(_0x4a4b3b, {
        method: 'GET',
        signal: AbortSignal.timeout(15000),
        headers: {
          'User-Agent': "VIPBOT-SelfPing/1.0"
        }
      }), _0x49fabf = Date.now() - _0x5edf28;
      _0x2a687e.ok ? process.stdout.write(N + "[SELF-PING]" + R + '\x20' + W + GROUP.CHECK + '\x20' + _0x2a687e.status + " — " + _0x49fabf + 'ms' + R + '\x20' + D + '(' + new Date().toLocaleTimeString() + ')' + R + '\x0a') : process.stdout.write(Y + "[SELF-PING]" + R + '\x20' + W + STATUS.WARNING + " HTTP " + _0x2a687e.status + " — " + _0x49fabf + 'ms' + R + '\x0a');
    } catch (_0x31ef86) {
      const _0x35a590 = Date.now() - _0x5edf28;
      process.stdout.write("\u001b[31m[SELF-PING]\u001b[0m " + W + GROUP.CROSS + '\x20failed\x20after\x20' + _0x35a590 + "ms — " + _0x31ef86.message + R + '\x0a');
    }
  }
  (setTimeout(_0x15e933, 10000), _pingInterval = setInterval(_0x15e933, _0x8568f2));
}
export function stopSelfPing() {
  _pingInterval && (clearInterval(_pingInterval), _pingInterval = null);
}
