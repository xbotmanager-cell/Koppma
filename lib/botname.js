import {readFileSync, writeFileSync, existsSync} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {STATUS} from './emojis.js';
const __dirname = dirname(fileURLToPath(import.meta.url)), PROJECT_ROOT = join(__dirname, '..');
function _writeToEnv(_0x3f94ef, _0x30e9d4) {
  try {
    const _0x1d40a2 = join(PROJECT_ROOT, '.env');
    let _0x179f7c = '';
    try {
      _0x179f7c = readFileSync(_0x1d40a2, 'utf8');
    } catch {}
    const _0x31f9fd = _0x3f94ef + '=' + _0x30e9d4, _0x52a669 = new RegExp('^' + _0x3f94ef + "=.*$", 'm');
    (_0x179f7c = _0x52a669.test(_0x179f7c) ? _0x179f7c.replace(_0x52a669, _0x31f9fd) : _0x179f7c.trimEnd() + '\x0a' + _0x31f9fd + '\x0a', writeFileSync(_0x1d40a2, _0x179f7c, 'utf8'), process.env[_0x3f94ef] = String(_0x30e9d4));
  } catch {}
}
const BOT_NAME_FILE = join(PROJECT_ROOT, "bot_name.json"), DEFAULT_NAME = "VIPBOT";
let _cachedName = null, _cacheTime = 0;
const CACHE_TTL = 5000;
export function readBotNameFile() {
  try {
    if (existsSync(BOT_NAME_FILE)) {
      const _0x1788fb = JSON.parse(readFileSync(BOT_NAME_FILE, "utf8"));
      if (_0x1788fb.botName && _0x1788fb.botName.trim()) return _0x1788fb.botName.trim();
    }
  } catch {}
  return null;
}
export function writeBotNameFile(_0x4c39cf) {
  try {
    return (writeFileSync(BOT_NAME_FILE, JSON.stringify({
      botName: _0x4c39cf,
      updatedAt: new Date().toISOString()
    }, null, 2)), true);
  } catch (_0x233ac1) {
    return (console.warn(STATUS.WARNING + "️ Could not save bot name to file:", _0x233ac1.message), false);
  }
}
export function getBotName() {
  const _0x4e35c7 = Date.now();
  if (_cachedName && _0x4e35c7 - _cacheTime < CACHE_TTL) return _cachedName;
  const _0x3a795a = readBotNameFile();
  if (_0x3a795a) return (_cachedName = _0x3a795a, _cacheTime = _0x4e35c7, global.BOT_NAME = _0x3a795a, _cachedName);
  if (process.env.BOT_NAME && process.env.BOT_NAME.trim()) {
    const _0x25bb28 = process.env.BOT_NAME.trim();
    return (_cachedName = _0x25bb28, _cacheTime = _0x4e35c7, global.BOT_NAME = _0x25bb28, writeBotNameFile(_0x25bb28), _cachedName);
  }
  return (_cachedName = DEFAULT_NAME, _cacheTime = _0x4e35c7, global.BOT_NAME = DEFAULT_NAME, writeBotNameFile(DEFAULT_NAME), _cachedName);
}
export function clearBotNameCache() {
  (_cachedName = null, _cacheTime = 0);
}
export function saveBotName(_0x3ac533) {
  return (writeBotNameFile(_0x3ac533), global.BOT_NAME = _0x3ac533, _cachedName = _0x3ac533, _cacheTime = Date.now(), _writeToEnv("BOT_NAME", _0x3ac533), true);
}
export function loadBotName() {
  const _0x205930 = readBotNameFile();
  if (_0x205930) return (global.BOT_NAME = _0x205930, _cachedName = _0x205930, _cacheTime = Date.now(), _0x205930);
  const _0x471169 = process.env.BOT_NAME && process.env.BOT_NAME.trim() || DEFAULT_NAME;
  return (global.BOT_NAME = _0x471169, _cachedName = _0x471169, _cacheTime = Date.now(), writeBotNameFile(_0x471169), console.log(STATUS.SUCCESS + " Bot name initialized: \"" + _0x471169 + "\" (saved to bot_name.json)"), _0x471169);
}
