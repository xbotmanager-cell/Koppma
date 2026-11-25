import {getConfigSync, setConfigSync} from './database.js';
import {BRAND} from './emojis.js';
const DEFAULT_EMOJI = '' + (BRAND.VIP || BRAND.WOLF), KEY_PREFIX = "user_emoji:";
export function getEmoji(_0x27ec48) {
  if (!_0x27ec48) return DEFAULT_EMOJI;
  const _0x465f16 = _0x27ec48.split('@')[0].split(':')[0];
  try {
    const _0xf157b4 = getConfigSync('' + KEY_PREFIX + _0x465f16, {});
    return _0xf157b4?.emoji || DEFAULT_EMOJI;
  } catch {
    return DEFAULT_EMOJI;
  }
}
export function setEmoji(_0x433eaa, _0xe23f62) {
  const _0x9528b2 = _0x433eaa.split('@')[0].split(':')[0];
  setConfigSync('' + KEY_PREFIX + _0x9528b2, {
    emoji: _0xe23f62
  });
}
export function resetEmoji(_0xe0201) {
  const _0x57736a = _0xe0201.split('@')[0].split(':')[0];
  setConfigSync('' + KEY_PREFIX + _0x57736a, {
    emoji: DEFAULT_EMOJI
  });
}
