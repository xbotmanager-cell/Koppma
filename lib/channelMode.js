import _0x54ef7b from './database.js';
const DB_KEY = 'channel_mode', DEFAULTS = {
  enabled: false,
  channelJid: "120363426705024581@newsletter",
  channelName: "VIPBOT Channel"
};
let _cachedData = null, _cacheTime = 0;
const CACHE_TTL = 2000;
function _load() {
  const _0x43e702 = Date.now();
  if (_cachedData !== null && _0x43e702 - _cacheTime < CACHE_TTL) return _cachedData;
  const _0x437a66 = _0x54ef7b.getConfigSync(DB_KEY, null);
  if (_0x437a66 && typeof _0x437a66 === "object") {
    const _0x2f23b6 = _0x437a66.userSetChannel ? _0x437a66.channelJid : DEFAULTS.channelJid, _0x4c29b2 = _0x437a66.userSetChannel ? _0x437a66.channelName : DEFAULTS.channelName;
    _cachedData = {
      ...DEFAULTS,
      ..._0x437a66,
      channelJid: _0x2f23b6,
      channelName: _0x4c29b2
    };
  } else _cachedData = {
    ...DEFAULTS
  };
  return (_cacheTime = _0x43e702, _cachedData);
}
export function isChannelModeEnabled() {
  if (global.CHANNEL_MODE === true) return true;
  return _load().enabled === true;
}
export function getChannelInfo() {
  const _0x516e80 = _load();
  return {
    jid: _0x516e80.channelJid || "120363426705024581@newsletter",
    name: _0x516e80.channelName || 'VIPBOT Channel'
  };
}
export function setChannelMode(_0x565c1b, _0x4190f7 = "Unknown") {
  const _0x5bd1a3 = _load(), _0x3d1ebd = {
    ..._0x5bd1a3,
    enabled: _0x565c1b,
    setBy: _0x4190f7,
    setAt: new Date().toISOString(),
    timestamp: Date.now()
  };
  (_0x54ef7b.setConfigSync(DB_KEY, _0x3d1ebd), global.CHANNEL_MODE = _0x565c1b, _cachedData = _0x3d1ebd, _cacheTime = Date.now());
}
export function setChannelInfo(_0x4e932b, _0x58a10d, _0x272478 = "Unknown") {
  const _0x589141 = _load(), _0x845fac = {
    ..._0x589141,
    channelJid: _0x4e932b,
    channelName: _0x58a10d,
    updatedBy: _0x272478,
    updatedAt: new Date().toISOString()
  };
  (_0x54ef7b.setConfigSync(DB_KEY, _0x845fac), _cachedData = _0x845fac, _cacheTime = Date.now());
}
export function clearChannelModeCache() {
  (_cachedData = null, _cacheTime = 0);
}
