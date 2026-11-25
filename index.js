import {selectAccessMode} from './lib/accessMode.js';
import {resolveCommandAccess} from './lib/commandAccess.js';
import {normalizeOwnerJid, ownerIdentity} from './lib/ownerIdentity.js';
process.env.NODE_NO_WARNINGS = '1';
const _dmDebugEnabled = () => process.env.DEBUG_DM_LOGS === "true" || process.env.DEBUG_DM_LOGS === '1';
process.on('warning', _0x419894 => {
  const _0x1fd27b = (_0x419894?.name || '').toUpperCase(), _0xe26d6d = (_0x419894?.code || '').toUpperCase(), _0x5a6b68 = (_0x419894?.message || '').toLowerCase();
  if (_0xe26d6d === "MODULE_TYPELESS_PACKAGE_JSON" || _0xe26d6d.includes("MODULE_") || _0x1fd27b === "MODULE_TYPELESS_PACKAGE_JSON" || _0x5a6b68.includes('/tmp/') || _0x5a6b68.includes('module\x20type\x20of\x20file') || _0x5a6b68.includes("does not parse as commonjs") || _0x5a6b68.includes('add\x20\x22type\x22:\x20\x22module\x22')) return;
});
const originalConsoleMethods = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
  trace: console.trace,
  dir: console.dir,
  dirxml: console.dirxml,
  table: console.table
};
globalThis.originalConsoleMethods = originalConsoleMethods;
const _keepRef = {
  time: console.time,
  timeEnd: console.timeEnd,
  timeLog: console.timeLog,
  group: console.group,
  groupEnd: console.groupEnd,
  groupCollapsed: console.groupCollapsed,
  clear: console.clear,
  count: console.count,
  countReset: console.countReset,
  assert: console.assert,
  profile: console.profile,
  profileEnd: console.profileEnd,
  timeStamp: console.timeStamp,
  context: console.context
}, _noisyTokens = ["closing session", "sessionentry", 'registrationid', 'currentratchet', "indexinfo", "pendingprekey", "ephemeralkeypair", "lastremoteephemeralkey", "rootkey", 'basekey', "signalkey", "signalprotocol", "_chains", "chains", "chainkey", "ratchet", 'cipher', "decrypt", "encrypt", "prekey", "signedkey", 'identitykey', "sessionstate", "keystore", 'senderkey', "groupcipher", "signalgroup", "signalstore", "signalrepository", "signalprotocolstore", 'sessioncipher', "sessionbuilder", "senderkeystore", "senderkeydistribution", "keyexchange", "<buffer", "05 ", '0x', 'pubkey', "privkey", "connection.update", "creds.update", 'presence.update', 'chat.update', "message.receipt.update", "message.update", "failed to decrypt", "received error", "sessionerror", "bad mac", "stream errored", "[asm-debug]", "interactive send:", "native_flow", "tag: 'biz'", 'app\x20state\x20resync', "syncing critical app state", "[dotenv", "[chatbot-check]", "[chatbot-trace]"], _importantTokens = ["[antiviewonce]", "command", '╭', '┆', '╰', '✦', '┌', '│', '└', '╔', '║', '╚', '' + STATUS.SUCCESS, '' + STATUS.ERROR, '' + SOCIAL.PEOPLE, '' + SOCIAL.PERSON, '' + UI.CHART, '' + UI.TOOL, '' + BRAND.WOLF, '' + BRAND.VIP, '' + UI.ROCKET, STATUS.WARNING + '️', '' + MEDIA.PHONE, UI.TRASH + '️', '' + UI.UPLOAD, '' + SOCIAL.CROWN, '' + UI.TARGET, SOCIAL.SHIELD + '️', '' + MEDIA.MUSIC, '' + MEDIA.VIDEO, '' + DOWNLOAD.FACEBOOK, '' + DOWNLOAD.CAMERA, '' + UI.SAVE, '' + STATUS.LOCKED, '' + UI.SEARCH, '' + UI.CHAT], shouldShowLog = _0x4c15d9 => {
  if (_0x4c15d9.length === 0) return true;
  const _0x21145b = _0x4c15d9[0];
  let _0x460571;
  if (typeof _0x21145b === "string") _0x460571 = _0x21145b.toLowerCase(); else {
    if (_0x21145b && typeof _0x21145b === "object") try {
      _0x460571 = JSON.stringify(_0x21145b).toLowerCase();
    } catch {
      return true;
    } else return true;
  }
  for (let _0x23eaf8 = 0; _0x23eaf8 < _importantTokens.length; _0x23eaf8++) {
    if (_0x460571.includes(_importantTokens[_0x23eaf8])) return true;
  }
  for (let _0x218277 = 0; _0x218277 < _noisyTokens.length; _0x218277++) {
    if (_0x460571.includes(_noisyTokens[_0x218277])) return false;
  }
  return true;
};
for (const method of Object.keys(originalConsoleMethods)) {
  typeof console[method] === "function" && (console[method] = function (..._0x5e5680) {
    shouldShowLog(_0x5e5680) && originalConsoleMethods[method].apply(console, _0x5e5680);
  });
}
function setupProcessFilter() {
  const _0x3547c2 = process.stdout.write, _0x5d7cd9 = process.stderr.write, _0x5d80e6 = ["closing session", "sessionentry", 'registrationid', "currentratchet", 'indexinfo', "pendingprekey", '_chains', 'ephemeralkeypair', 'lastremoteephemeralkey', "rootkey", 'basekey', 'signalprotocol', "ratchet", "chainkey", "senderkey", "groupcipher", "sessioncipher", 'sessionbuilder', "interactive send", "native_flow", "tag: 'biz'", "app state resync", 'syncing\x20critical\x20app\x20state', '[dotenv', "module_typeless_package_json", "module type of file", "does not parse as commonjs", "add \"type\": \"module\""], _0x467f0a = _0x2a463d => {
    if (typeof _0x2a463d !== "string" && !Buffer.isBuffer(_0x2a463d)) return true;
    const _0x3d218e = (typeof _0x2a463d === 'string' ? _0x2a463d : _0x2a463d.toString()).toLowerCase();
    if (_0x3d218e.length < 5) return true;
    for (let _0x334076 = 0; _0x334076 < _0x5d80e6.length; _0x334076++) {
      if (_0x3d218e.includes(_0x5d80e6[_0x334076])) return false;
    }
    return true;
  };
  (process.stdout.write = function (_0x2ee376, _0x5c4502, _0x5eb463) {
    if (_0x467f0a(_0x2ee376)) return _0x3547c2.call(this, _0x2ee376, _0x5c4502, _0x5eb463);
    if (_0x5eb463) _0x5eb463();
    return true;
  }, process.stderr.write = function (_0x5b7b83, _0x4d13fc, _0x35c2a4) {
    if (_0x467f0a(_0x5b7b83)) return _0x5d7cd9.call(this, _0x5b7b83, _0x4d13fc, _0x35c2a4);
    if (_0x35c2a4) _0x35c2a4();
    return true;
  });
}
(process.env.DEBUG = '', process.env.NODE_ENV = "production", process.env.BAILEYS_LOG_LEVEL = "fatal", process.env.PINO_LOG_LEVEL = 'fatal', process.env.BAILEYS_DISABLE_LOG = 'true', process.env.DISABLE_BAILEYS_LOG = "true", process.env.PINO_DISABLE = "true");
import './lib/ffmpegPath.js';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import _0x32ecad from 'fs';
import _0x40e1ec from 'path';
import _0x1a48ad from 'dotenv';
import _0x3ba8f9 from 'chalk';
import _0x293f56 from 'readline';
import {exec, execSync} from 'child_process';
import _0x132623 from 'axios';
import {normalizeMessageContent, downloadContentFromMessage, downloadMediaMessage, jidNormalizedUser, generateWAMessageFromContent, proto} from 'wolfsocket';
import _0x1cde8c from 'node-cache';
import {isSudoNumber, isSudoJid, getSudoMode, addSudoJid, mapLidToPhone, isSudoByLid, getPhoneFromLid, getSudoList, hasUnmappedSudos} from './lib/sudo-store.js';
import _0x327500, {setConfigBotId, isUsingWasm, forceBackup, restoreFromPg} from './lib/database.js';
import _0xfafc93 from './lib/mySettings.js';
import {useSQLiteAuthState, getSessionStats} from './lib/authState.js';
import {getBotName as _0x1f0bfa, clearBotNameCache} from './lib/botname.js';
import {markConnectionOpen, isReplayMessage, getDrainStats, isDrainActive} from './lib/quickConnect.js';
import {isButtonModeEnabled} from './lib/buttonMode.js';
import {isChannelModeEnabled, getChannelInfo} from './lib/channelMode.js';
import {isMusicModeEnabled, sendMusicClip} from './lib/musicMode.js';
import {setActiveCommand, clearActiveCommand, getActiveCommand, buildCommandButtons} from './lib/commandButtons.js';
import {startScheduler, updateSchedulerSock} from './lib/scheduler.js';
import {startReminderScheduler, updateReminderSock} from './commands/utility/remind.js';
import {resumeQueueIfPending} from './commands/group/creategroup.js';
import {resumeExportQueueIfPending} from './commands/group/export.js';
import {migrateSudoToSupabase, initSudo, setBotId} from './lib/sudo-store.js';
import {migrateWarningsToSupabase, addWarning, getWarnLimit, resetWarnings} from './lib/warnings-store.js';
import {detectPlatform} from './lib/platformDetect.js';
import {applyFont as _0x2597bd} from './lib/fontTransformer.js';
import {initStorageManager, onENOSPC} from './lib/storageManager.js';
import {sendMigrationNotice} from './lib/migrationNotice.js';
import {sendComebackNotice} from './lib/comebackNotice.js';
import {withAIResponseHandling} from './lib/aiResponse.js';
import {OWNER, PROFILE_URL, REPO_URL, AVATAR_URL} from './lib/repoConfig.js';
import {AUTOMATION, BRAND, CHATBOT, DOWNLOAD, EMERGENCY, EPHOTO, ETHICAL, FUN, GAMES, GITHUB, GROUP, LIB, MEDIA, SOCIAL, STALKER, STATUS, UI, UTILITY} from './lib/emojis.js';
const msgRetryCounterCache = new _0x1cde8c({
  stdTTL: 600
});
globalThis.msgRetryCounterCache_ref = msgRetryCounterCache;
let currentSock = null;
const lidPhoneCache = new Map(), phoneLidCache = new Map();
function cacheLidPhone(_0xf95e2c, _0x3a0a67) {
  if (!_0xf95e2c || !_0x3a0a67 || _0xf95e2c === _0x3a0a67) return;
  (lidPhoneCache.set(_0xf95e2c, _0x3a0a67), phoneLidCache.set(_0x3a0a67, _0xf95e2c), _capMap(lidPhoneCache, MAX_LID_CACHE), _capMap(phoneLidCache, MAX_LID_CACHE), mapLidToPhone(_0xf95e2c, _0x3a0a67));
}
function resolvePhoneFromLid(_0x2c9407) {
  if (!_0x2c9407) return null;
  const _0x12ad1f = _0x2c9407.split('@')[0].split(':')[0], _0x44cef9 = lidPhoneCache.get(_0x12ad1f);
  if (_0x44cef9) return _0x44cef9;
  const _0xb6c1f1 = getPhoneFromLid(_0x12ad1f);
  if (_0xb6c1f1) return (lidPhoneCache.set(_0x12ad1f, _0xb6c1f1), _0xb6c1f1);
  if (!currentSock) return null;
  try {
    if (currentSock.signalRepository?.lidMapping?.getPNForLID) {
      const _0x2a246d = currentSock.signalRepository.lidMapping.getPNForLID(_0x2c9407);
      if (_0x2a246d) {
        const _0x28f858 = String(_0x2a246d).split('@')[0].replace(/[^0-9]/g, '');
        if (_0x28f858.length >= 7 && _0x28f858 !== _0x12ad1f) return (cacheLidPhone(_0x12ad1f, _0x28f858), _0x28f858);
      }
    }
  } catch {}
  try {
    const _0x27e2b8 = _0x2c9407.includes('@') ? _0x2c9407 : _0x2c9407 + "@lid";
    if (currentSock.signalRepository?.lidMapping?.getPNForLID) {
      const _0x3e2c68 = [_0x27e2b8, _0x12ad1f + ":0@lid", _0x12ad1f + "@lid"];
      for (const _0x13f89a of _0x3e2c68) {
        try {
          const _0x316f5c = currentSock.signalRepository.lidMapping.getPNForLID(_0x13f89a);
          if (_0x316f5c) {
            const _0x1714a4 = String(_0x316f5c).split('@')[0].replace(/[^0-9]/g, '');
            if (_0x1714a4.length >= 7 && _0x1714a4.length <= 15 && _0x1714a4 !== _0x12ad1f) return (cacheLidPhone(_0x12ad1f, _0x1714a4), _0x1714a4);
          }
        } catch {}
      }
    }
  } catch {}
  return null;
}
globalThis.resolvePhoneFromLid = resolvePhoneFromLid;
async function resolvePhoneFromLidAsync(_0x34fa97) {
  if (!_0x34fa97) return null;
  const _0x29ba92 = _0x34fa97.split('@')[0].split(':')[0], _0x537dbb = lidPhoneCache.get(_0x29ba92);
  if (_0x537dbb) return _0x537dbb;
  const _0x3e9dff = getPhoneFromLid(_0x29ba92);
  if (_0x3e9dff) return (lidPhoneCache.set(_0x29ba92, _0x3e9dff), _0x3e9dff);
  if (!currentSock) return null;
  const _0xfe1460 = [_0x34fa97, _0x29ba92 + ":0@lid", _0x29ba92 + "@lid"];
  for (const _0x564aa0 of _0xfe1460) {
    try {
      const _0x4c7ac5 = await currentSock.signalRepository?.lidMapping?.getPNForLID?.(_0x564aa0);
      if (_0x4c7ac5 && typeof _0x4c7ac5 === "string") {
        const _0x58ab7f = _0x4c7ac5.split('@')[0].replace(/[^0-9]/g, '');
        if (_0x58ab7f.length >= 7 && _0x58ab7f !== _0x29ba92) return (cacheLidPhone(_0x29ba92, _0x58ab7f), _0x58ab7f);
      }
    } catch {}
  }
  return null;
}
(globalThis.resolvePhoneFromLidAsync = resolvePhoneFromLidAsync, globalThis.pg = _0x7265b6, globalThis.mongo = _0x29eaa6);
async function resolvePhoneFromGroup(_0x5277c7, _0x57053e, _0x4c5b3c) {
  return resolveSenderFromGroup(_0x5277c7, _0x57053e, _0x4c5b3c);
}
function getDisplayNumber(_0x263a95) {
  if (!_0x263a95) return 'unknown';
  const _0x5e20c8 = _0x263a95.split('@')[0].split(':')[0], _0x5f8222 = _0x263a95.split('@')[0];
  if (_0x263a95.includes("@lid")) {
    let _0x300358 = lidPhoneCache.get(_0x5e20c8) || lidPhoneCache.get(_0x5f8222) || getPhoneFromLid(_0x5e20c8) || getPhoneFromLid(_0x5f8222) || resolvePhoneFromLid(_0x263a95);
    if (!_0x300358) {
      const _0x13fd48 = OWNER_LID && (_0x263a95 === OWNER_LID || _0x5e20c8 === OWNER_LID.split('@')[0]?.split(':')[0]);
      if (_0x13fd48 && currentSock?.user?.id && !currentSock.user.id.includes("@lid")) {
        _0x300358 = currentSock.user.id.split('@')[0]?.split(':')[0];
        if (_0x300358) cacheLidPhone(_0x5e20c8, _0x300358);
      }
      if (!_0x300358 && _0x13fd48 && currentSock?.user?.lid) {
        const _0x13d739 = currentSock.user.lid.split('@')[0]?.split(':')[0];
        _0x13d739 && _0x13d739 !== _0x5e20c8 && _0x13d739.length >= 7 && (_0x300358 = _0x13d739, cacheLidPhone(_0x5e20c8, _0x300358));
      }
    }
    return _0x300358 ? '+' + _0x300358 : "LID:" + _0x5e20c8.substring(0, 8) + "...";
  }
  return '+' + _0x5e20c8;
}
const groupMetadataCache = new Map();
(globalThis.groupMetadataCache = groupMetadataCache, globalThis.lidPhoneCache = lidPhoneCache, globalThis.phoneLidCache = phoneLidCache, globalThis.msgRetryCounterCache_ref = null);
const GROUP_CACHE_TTL = 10 * 60 * 1000, MAX_LID_CACHE = 500, MAX_GROUP_META_CACHE = 50, MAX_GROUP_DIAG = 200, groupDiagDone = new Set(), _pendingGroupFetches = new Map();
function _capMap(_0x36ddef, _0x310104) {
  if (_0x36ddef.size <= _0x310104) return;
  const _0xdb0380 = _0x36ddef.size - Math.floor(_0x310104 * 0.6);
  let _0x16cda2 = 0;
  for (const _0x32b0f7 of _0x36ddef.keys()) {
    if (_0x16cda2++ >= _0xdb0380) break;
    _0x36ddef.delete(_0x32b0f7);
  }
}
function _capSet(_0x3cdcee, _0x106e1b) {
  if (_0x3cdcee.size <= _0x106e1b) return;
  const _0x3a5247 = [..._0x3cdcee];
  _0x3cdcee.clear();
  for (let _0x2058e6 = _0x3a5247.length - Math.floor(_0x106e1b * 0.6); _0x2058e6 < _0x3a5247.length; _0x2058e6++) _0x3cdcee.add(_0x3a5247[_0x2058e6]);
}
async function getCachedGroupMetadata(_0xdeafc5, _0x265e35) {
  const _0x1cd753 = groupMetadataCache.get(_0xdeafc5);
  if (_0x1cd753 && Date.now() - _0x1cd753.ts < GROUP_CACHE_TTL) return _0x1cd753.data;
  const _0x56233c = _pendingGroupFetches.get(_0xdeafc5);
  if (_0x56233c) return _0x56233c;
  const _0x30c58a = (async () => {
    try {
      const _0x3bb797 = await Promise.race([_0x265e35.groupMetadata(_0xdeafc5), new Promise((_0x8c1e09, _0x2b5475) => setTimeout(() => _0x2b5475(new Error("timeout")), 8000))]);
      return (groupMetadataCache.set(_0xdeafc5, {
        data: _0x3bb797,
        ts: Date.now()
      }), _capMap(groupMetadataCache, MAX_GROUP_META_CACHE), _0x3bb797);
    } catch (_0x29ced8) {
      if (_0x1cd753) return _0x1cd753.data;
      return null;
    } finally {
      _pendingGroupFetches.delete(_0xdeafc5);
    }
  })();
  return (_pendingGroupFetches.set(_0xdeafc5, _0x30c58a), _0x30c58a);
}
async function resolveDisplayNumber(_0x5ee12c, _0xf464d1, _0x112a22) {
  if (!_0x5ee12c) return "unknown";
  const _0x3d51f4 = _0x5ee12c.split('@')[0].split(':')[0], _0x2d669f = _0x5ee12c.split('@')[0];
  if (!_0x5ee12c.includes("@lid")) return '+' + _0x3d51f4;
  const _0x218774 = lidPhoneCache.get(_0x3d51f4) || lidPhoneCache.get(_0x2d669f) || getPhoneFromLid(_0x3d51f4) || getPhoneFromLid(_0x2d669f);
  if (_0x218774) return '+' + _0x218774;
  const _0x152b80 = resolvePhoneFromLid(_0x5ee12c);
  if (_0x152b80) return '+' + _0x152b80;
  if (_0xf464d1?.includes("@g.us") && _0x112a22) try {
    const _0x325ef7 = await resolveSenderFromGroup(_0x5ee12c, _0xf464d1, _0x112a22);
    if (_0x325ef7) return '+' + _0x325ef7;
  } catch {}
  return "LID:" + _0x3d51f4.substring(0, 8) + "...";
}
async function generateRetrievalCaption(_0x2f203b, _0x46b308, _0x5ed03c, _0x1cc2b9, _0x1294a5) {
  const _0x53d180 = _0x5ed03c?.includes('@g.us');
  let _0x2eb8ea = _0x1cc2b9;
  if (_0x53d180 && !_0x2eb8ea && _0x1294a5) try {
    const _0x52d63a = await getCachedGroupMetadata(_0x5ed03c, _0x1294a5);
    if (_0x52d63a?.subject) _0x2eb8ea = _0x52d63a.subject;
  } catch {}
  const _0x921167 = await resolveDisplayNumber(_0x2f203b, _0x5ed03c, _0x1294a5), _0x24b21a = _0x46b308 === "auto-detect", _0x5da08a = _0x24b21a ? getCurrentBotName() + " (Auto)" : await resolveDisplayNumber(_0x46b308, _0x5ed03c, _0x1294a5), _0xef102f = _0x2eb8ea || (_0x53d180 ? _0x5ed03c.split('@')[0] : "Private Chat"), _0x328dbc = new Date().toLocaleString('en-US', {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  let _0x2fc1b6 = "╭⌈ " + STATUS.LOCK_WITH_KEY + '\x20*VIEW-ONCE\x20RETRIEVED*\x20⌋\x0a';
  return (_0x2fc1b6 += "├⊷ " + UI.UPLOAD + '\x20*Sent\x20by:*\x20' + _0x921167 + '\x0a', _0x2fc1b6 += '├⊷\x20' + UI.INBOX + " *Retrieved by:* " + _0x5da08a + '\x0a', _0x2fc1b6 += "├⊷ " + UTILITY.CLOCK_HAND + " *Time:* " + _0x328dbc + '\x0a', _0x2fc1b6 += "╰⊷ " + UI.CHAT + '\x20*' + (_0x53d180 ? "Group" : 'Chat') + ":* " + _0xef102f + '\x0a', _0x2fc1b6 += '>\x20Retrieved\x20by\x20' + getCurrentBotName(), _0x2fc1b6);
}
async function buildLidMapFromGroup(_0x2b4957, _0x483cca) {
  const _0x58d96f = await getCachedGroupMetadata(_0x2b4957, _0x483cca);
  if (!_0x58d96f) return 0;
  const _0x1de2b9 = _0x58d96f.participants || [];
  let _0x1b04e8 = 0;
  if (!groupDiagDone.has(_0x2b4957) && _0x1de2b9.length > 0) {
    (groupDiagDone.add(_0x2b4957), _capSet(groupDiagDone, MAX_GROUP_DIAG));
    const _0x316a02 = _0x1de2b9.slice(0, 3).map(_0x46ab04 => ({
      id: _0x46ab04.id || "none",
      lid: _0x46ab04.lid || "none",
      phoneNumber: _0x46ab04.phoneNumber || 'none',
      admin: _0x46ab04.admin || 'none',
      keys: Object.keys(_0x46ab04).filter(_0x2c0550 => !['id', "lid", 'admin', "phoneNumber"].includes(_0x2c0550)).join(',')
    }));
  }
  for (const _0x5c8aa5 of _0x1de2b9) {
    const {phoneNum: _0xf8f1a1, lidNum: _0x568252} = extractParticipantInfo(_0x5c8aa5, _0x483cca);
    _0xf8f1a1 && _0x568252 && _0xf8f1a1 !== _0x568252 && (cacheLidPhone(_0x568252, _0xf8f1a1), mapLidToPhone(_0x568252, _0xf8f1a1), _0x1b04e8++);
  }
  return _0x1b04e8;
}
const _lidResolveAttempts = new Map(), LID_RESOLVE_COOLDOWN = 5 * 60 * 1000;
let _activeGroupFetches = 0;
const MAX_CONCURRENT_GROUP_FETCHES = 2;
async function resolveSenderFromGroup(_0x46142a, _0x8aaa11, _0x5482c6) {
  if (!_0x46142a || !_0x8aaa11 || !_0x5482c6) return null;
  const _0x333f37 = _0x46142a.split('@')[0].split(':')[0], _0x51196f = _0x46142a.split('@')[0];
  let _0x192146 = lidPhoneCache.get(_0x333f37) || lidPhoneCache.get(_0x51196f) || getPhoneFromLid(_0x333f37) || getPhoneFromLid(_0x51196f);
  if (_0x192146) return _0x192146;
  const _0x37f55f = _0x333f37 + ':' + _0x8aaa11, _0x212e34 = _lidResolveAttempts.get(_0x37f55f);
  if (_0x212e34 && Date.now() - _0x212e34 < LID_RESOLVE_COOLDOWN) return null;
  _lidResolveAttempts.set(_0x37f55f, Date.now());
  if (_lidResolveAttempts.size > 500) {
    const _0x4b0d10 = Date.now() - LID_RESOLVE_COOLDOWN;
    for (const [_0x4a8806, _0x1d04fd] of _lidResolveAttempts) {
      if (_0x1d04fd < _0x4b0d10) _lidResolveAttempts.delete(_0x4a8806);
    }
  }
  if (_activeGroupFetches >= MAX_CONCURRENT_GROUP_FETCHES) return null;
  _activeGroupFetches++;
  try {
    await buildLidMapFromGroup(_0x8aaa11, _0x5482c6);
  } finally {
    _activeGroupFetches--;
  }
  return (_0x192146 = lidPhoneCache.get(_0x333f37) || lidPhoneCache.get(_0x51196f) || getPhoneFromLid(_0x333f37) || getPhoneFromLid(_0x51196f), _0x192146 && UltraCleanLogger.info(UI.LINK + " LID resolved: " + _0x333f37.substring(0, 8) + "... → +" + _0x192146), _0x192146);
}
function extractParticipantInfo(_0x5ab541, _0x16e32a) {
  const _0x42693b = _0x5ab541.id || '', _0x41d077 = _0x5ab541.lid || '';
  let _0x4866ab = null, _0x5ccd9d = null;
  if (_0x5ab541.phoneNumber) {
    const _0x46d6ab = String(_0x5ab541.phoneNumber).replace(/[^0-9]/g, '');
    if (_0x46d6ab.length >= 7 && _0x46d6ab.length <= 15) _0x4866ab = _0x46d6ab;
  }
  if (!_0x4866ab && _0x42693b && !_0x42693b.includes("@lid")) {
    const _0xa78550 = _0x42693b.split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
    if (_0xa78550.length >= 7 && _0xa78550.length <= 15) _0x4866ab = _0xa78550;
  }
  if (!_0x4866ab && _0x41d077 && !_0x41d077.includes("@lid")) {
    const _0x3bf927 = _0x41d077.split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
    if (_0x3bf927.length >= 7 && _0x3bf927.length <= 15) _0x4866ab = _0x3bf927;
  }
  _0x42693b.includes("@lid") && (_0x5ccd9d = _0x42693b.split('@')[0].split(':')[0]);
  !_0x5ccd9d && _0x41d077 && _0x41d077.includes('@lid') && (_0x5ccd9d = _0x41d077.split('@')[0].split(':')[0]);
  !_0x5ccd9d && _0x41d077 && (_0x5ccd9d = _0x41d077.split('@')[0].split(':')[0]);
  if (!_0x4866ab && _0x5ccd9d) try {
    const _0x2a154d = _0x42693b.includes('@lid') ? _0x42693b : _0x41d077 || _0x42693b;
    if (_0x16e32a?.signalRepository?.lidMapping?.getPNForLID) {
      const _0x19d714 = _0x16e32a.signalRepository.lidMapping.getPNForLID(_0x2a154d);
      if (_0x19d714) {
        const _0x281b79 = String(_0x19d714).split('@')[0].replace(/[^0-9]/g, '');
        if (_0x281b79.length >= 7 && _0x281b79.length <= 15) _0x4866ab = _0x281b79;
      }
    }
  } catch {}
  return {
    phoneNum: _0x4866ab,
    lidNum: _0x5ccd9d
  };
}
async function autoScanGroupsForSudo(_0x5b9310) {
  try {
    const {sudoers: _0x853cd3} = getSudoList();
    if (_0x853cd3.length === 0) return;
    const _0x7af5ed = _0x853cd3.every(_0x503956 => {
      for (const [, _0x2ef90c] of lidPhoneCache) {
        if (_0x2ef90c === _0x503956) return true;
      }
      const _0x14b054 = getPhoneFromLid(_0x503956);
      if (_0x14b054) return true;
      return false;
    });
    if (_0x7af5ed) {
      UltraCleanLogger.infoLine(UI.KEY + " All " + _0x853cd3.length + '\x20sudo(s)\x20already\x20have\x20LID\x20mappings');
      return;
    }
    UltraCleanLogger.infoLine(UI.KEY + " Scanning groups for " + _0x853cd3.length + " sudo user(s)");
    const _0x1e4ceb = await Promise.race([_0x5b9310.groupFetchAllParticipating(), new Promise((_0x187c8c, _0x142f6c) => setTimeout(() => _0x142f6c(new Error("scan_timeout")), 15000))]);
    if (!_0x1e4ceb) return;
    let _0x28491a = 0, _0x49062f = 0, _0x1cd58b = false;
    const _0x785b4c = Object.entries(_0x1e4ceb);
    for (let _0x214fd7 = 0; _0x214fd7 < _0x785b4c.length; _0x214fd7++) {
      const [_0x3029ca, _0x51ad72] = _0x785b4c[_0x214fd7], _0x5e284a = _0x51ad72.participants || [];
      _0x49062f += _0x5e284a.length;
      if (!_0x1cd58b && _0x5e284a.length > 0) {
        _0x1cd58b = true;
        const _0x2ae930 = _0x5e284a.slice(0, 2).map(_0x22af27 => ({
          id: _0x22af27.id || "none",
          lid: _0x22af27.lid || 'none',
          phoneNumber: _0x22af27.phoneNumber || "none",
          keys: Object.keys(_0x22af27).filter(_0x459353 => !['id', "lid", "admin", 'phoneNumber'].includes(_0x459353)).join(',')
        }));
      }
      for (const _0x1e5296 of _0x5e284a) {
        const {phoneNum: _0xc34ad2, lidNum: _0x3b3244} = extractParticipantInfo(_0x1e5296, _0x5b9310);
        if (_0xc34ad2 && _0x3b3244 && _0xc34ad2 !== _0x3b3244) {
          (cacheLidPhone(_0x3b3244, _0xc34ad2), mapLidToPhone(_0x3b3244, _0xc34ad2));
          if (_0x853cd3.includes(_0xc34ad2)) _0x28491a++;
        }
        const _0x20dda0 = _0x1e5296.id || '', _0x29f4ad = _0x1e5296.lid || '';
        if (_0x20dda0 && !_0x20dda0.includes("@lid")) {
          const _0x154114 = _0x20dda0.split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
          if (_0x154114 && _0x853cd3.includes(_0x154114)) {
            const _0x99e013 = _0x29f4ad || _0x20dda0;
            if (_0x99e013.includes("@lid")) {
              const _0x266134 = _0x99e013.split('@')[0].split(':')[0];
              (cacheLidPhone(_0x266134, _0x154114), _0x28491a++);
            }
          }
        }
      }
      if (_0x214fd7 % 10 === 9) await new Promise(_0x479a2a => setTimeout(_0x479a2a, 0));
    }
    (UltraCleanLogger.infoLine(UI.KEY + " Scanned " + Object.keys(_0x1e4ceb).length + " groups · " + _0x49062f + " participants"), _0x28491a > 0 ? UltraCleanLogger.infoLine(UI.KEY + " Linked " + _0x28491a + " sudo user(s) from group scan") : UltraCleanLogger.infoLine(UI.KEY + '\x20No\x20sudo\x20users\x20found\x20·\x20use\x20=linksudo\x20in\x20a\x20shared\x20group'));
  } catch (_0x3fcc0d) {
    UltraCleanLogger.warning('Sudo\x20auto-scan:\x20' + _0x3fcc0d.message);
  }
}
import {handleAutoReact, handleAutoReactGsmView} from './commands/automation/autoreactstatus.js';
import {handleChannelReact, discoverNewsletters, channelReactManager} from './commands/channel/channelreact.js';
import {handleReactOwner} from './commands/automation/reactowner.js';
import {handleReactDev} from './commands/automation/reactdev.js';
import {handleAutoView, autoViewManager} from './commands/automation/autoviewstatus.js';
import {handleAutoDownloadStatus, cacheStatusMessage, triggerSaveFromOwnerReply, isStatusCached} from './commands/automation/autodownloadstatus.js';
import {initializeAutoJoin} from './commands/group/add.js';
import _0x502eb6 from './commands/group/antidemote.js';
import {isBugMessage as _0x22cbd1, isEnabled as _0x308f5e, getAction as _0x394a15} from './commands/group/antibug.js';
import {checkMessageForLinks as _0x26c0ea, isEnabled as _0x3c3c99, getMode as _0xf42fcf, getGroupConfig as _0x2e6f45, isLinkExempt as _0x12215d, isExcludedType as _0x41b074, getCustomMessage as _0x2c302c, formatCustomMessage as _0x58468f} from './commands/group/antilink.js';
import {checkMessageForBadWord, isGroupEnabled as _0x23d017, getGroupAction as _0x3759d6} from './lib/badwords-store.js';
import {isEnabled as _0x64cab8, getAction as _0x2aba39, getGroupConfig as _0x546fa4, checkSpam as _0x54e1ce} from './commands/group/antispam.js';
import {isBotMessage as _0x36d283, isEnabled as _0x38bb8f, getMode as _0x25eb16, isBlockedSender as _0x45bf2b} from './commands/group/antibot.js';
import {recordActivity as _0x51e7c0} from './lib/groupActivity.js';
import _0xaf1fb from './lib/persistentConfig.js';
import _0xf6e79f from './commands/group/ban.js';
import {setupWebServer, updateWebStatus} from './lib/webServer.js';
import {participantJid, resolveGroupNumber} from './lib/groupIdentity.js';
async function resolveEventAuthor(_0x413f02, _0x3fff71, _0x2f837c) {
  const _0x345d24 = participantJid(_0x2f837c);
  let _0x54afc6 = await resolveGroupNumber(_0x345d24, null, _0x413f02);
  if (_0x54afc6 === "Unknown" && _0x345d24?.includes('@lid')) try {
    _0x54afc6 = await resolveGroupNumber(_0x345d24, await _0x413f02.groupMetadata(_0x3fff71), _0x413f02);
  } catch {}
  return _0x54afc6;
}
import {setupSelfPing} from './lib/selfPing.js';
import _0x7265b6 from './lib/pgAdapter.js';
import _0x29eaa6 from './lib/mongoAdapter.js';
import {handleGroupParticipantUpdate as _0x2a91f0} from './commands/group/antidemote.js';
import {isWelcomeEnabled, getWelcomeMessage, sendWelcomeMessage} from './commands/group/welcome.js';
import {isGoodbyeEnabled, getGoodbyeMessage, sendGoodbyeMessage} from './commands/group/goodbye.js';
import {isJoinApprovalEnabled} from './commands/group/joinapproval.js';
import {handleStatusMention as _0x697ed3} from './commands/group/antistatusmention.js';
import {handleAntiForward as _0x49a40c, isAntiForwardEnabled} from './commands/group/antiforward.js';
import {handleAntiChat as _0xe69776, isAntiChatEnabled} from './commands/group/antichat.js';
import {setupAntiGroupStatusListener} from './commands/group/antigroupstatus.js';
import {initAntidelete, antideleteStoreMessage, antideleteHandleUpdate, updateAntideleteSock} from './commands/owner/antidelete.js';
import {initAntiedit, updateAntieditSock} from './commands/owner/antiedit.js';
import {initStatusAntidelete, statusAntideleteStoreMessage, statusAntideleteHandleUpdate, updateStatusAntideleteSock} from './commands/owner/antideletestatus.js';
import {initStatusReplyListener} from './lib/statusReplyListener.js';
import {isChatbotActiveForChat, handleChatbotMessage} from './commands/ai/chatbot.js';
(function _loadDotenv() {
  const _0x59220e = ["./.env", process.env.ENV_FILE || '', new URL(".env", import.meta.url).pathname, "/home/container/.env", "/app/.env"].filter(Boolean);
  let _0x56dbed = false;
  for (const _0x1606a8 of _0x59220e) {
    try {
      const _0xc0ba77 = _0x1a48ad.config({
        path: _0x1606a8
      });
      if (!_0xc0ba77.error) {
        _0x56dbed = true;
        break;
      }
    } catch {}
  }
  if (!_0x56dbed) _0x1a48ad.config();
})();
const __filename = fileURLToPath(import.meta.url), __dirname = dirname(__filename);
import {seedConfigsFromEnv, getKeyStatus} from './lib/envConfig.js';
import {isTranslationEnabled, translateText, getBotLanguage} from './lib/translator.js';
import * as _0x1b5050 from './lib/autoLeave.js';
seedConfigsFromEnv();
const SESSION_DIR = "./session";
try {
  const _bnFile = _0x40e1ec.join(__dirname, "bot_name.json");
  if (_0x32ecad.existsSync(_bnFile)) {
    const _bnData = JSON.parse(_0x32ecad.readFileSync(_bnFile, "utf8"));
    _bnData.botName && _bnData.botName.trim() && (global.BOT_NAME = _bnData.botName.trim());
  }
} catch {}
let BOT_NAME = _0x1f0bfa();
global.BOT_NAME = BOT_NAME;
function getCurrentBotName() {
  return _0x1f0bfa();
}
const VERSION = "1.1.7";
global.VERSION = VERSION;
const _rawEnvPrefix = process.env.BOT_PREFIX || process.env.PREFIX || '', DEFAULT_PREFIX = _rawEnvPrefix && _rawEnvPrefix.length <= 5 ? _rawEnvPrefix : '.', OWNER_FILE = './owner.json', PREFIX_CONFIG_FILE = './prefix_config.json', BOT_SETTINGS_FILE = './bot_settings.json', BOT_MODE_FILE = "./bot_mode.json", WHITELIST_FILE = "./whitelist.json", BLOCKED_USERS_FILE = "./blocked_users.json", WELCOME_DATA_FILE = "./data/welcome_data.json";
let _cache_owner_data = null, _cache_prefix_config = null, _cache_bot_settings = null, _cache_bot_mode = null, _cache_whitelist = null, _cache_blocked_users = null, _cache_welcome_data = null, _cache_status_logs = null, _cache_member_detection = null;
async function _loadConfigCache(_0x1f1e08, _0x57cec4) {
  try {
    const _0x3b9eb4 = await _0x327500.getConfig(_0x1f1e08, _0x57cec4);
    return _0x3b9eb4;
  } catch {
    return _0x57cec4;
  }
}
function _saveConfigCache(_0x22bb20, _0x4cbd0e) {
  _0x327500.setConfig(_0x22bb20, _0x4cbd0e).catch(_0x2b61bc => {
    UltraCleanLogger.warning('DB\x20save\x20error\x20for\x20' + _0x22bb20 + ':\x20' + _0x2b61bc.message);
  });
}
(globalThis._saveConfigCache = _saveConfigCache, globalThis._antiviewonceConfig = {
  enabled: false,
  mode: "private"
}, globalThis._updateBotName = function (_0x1d11ab) {
  if (!_0x1d11ab || !String(_0x1d11ab).trim()) return;
  (BOT_NAME = String(_0x1d11ab).trim(), global.BOT_NAME = BOT_NAME);
}, globalThis.updateBotModeCache = function (_0x23f626) {
  const _0x3c4280 = {
    mode: _0x23f626,
    setAt: new Date().toISOString()
  };
  (_cache_bot_mode = _0x3c4280, BOT_MODE = _0x23f626, _saveConfigCache("bot_mode", _0x3c4280), updateWebStatus({
    botMode: _0x23f626
  }));
  try {
    _0x32ecad.writeFileSync('./bot_mode.json', JSON.stringify({
      mode: _0x23f626,
      setAt: new Date().toISOString()
    }, null, 2));
  } catch {}
  updateEnvFile("BOT_MODE", _0x23f626);
}, globalThis._fontConfig = {
  font: 'default'
}, globalThis._antibotConfig = null, globalThis._saveAntibotConfig = function (_0xf7b5f6) {
  _saveConfigCache("antibot_config", _0xf7b5f6);
}, _loadConfigCache("antibot_config", {}).then(_0x3f72d2 => {
  globalThis._antibotConfig = _0x3f72d2 || ({});
}).catch(() => {
  globalThis._antibotConfig = {};
}), globalThis._antidispConfig = {
  enabled: false
}, globalThis._saveAntidispConfig = function (_0x54e374) {
  _saveConfigCache("antidisp_config", _0x54e374);
}, _loadConfigCache("antidisp_config", {
  enabled: false
}).then(_0x53a17c => {
  globalThis._antidispConfig = _0x53a17c && typeof _0x53a17c === "object" ? _0x53a17c : {
    enabled: false
  };
}).catch(() => {
  globalThis._antidispConfig = {
    enabled: false
  };
}), globalThis._antibugConfig = null, globalThis._saveAntibugConfig = function (_0x2b975e) {
  _saveConfigCache("antibug_config", _0x2b975e);
}, _loadConfigCache('antibug_config', {}).then(_0x24d936 => {
  globalThis._antibugConfig = _0x24d936 || ({});
}).catch(() => {
  globalThis._antibugConfig = {};
}), globalThis._antilinkConfig = null, globalThis._saveAntilinkConfig = function (_0x53e8f6) {
  _saveConfigCache('antilink_config', _0x53e8f6);
}, _loadConfigCache('antilink_config', {}).then(_0x2d7591 => {
  globalThis._antilinkConfig = _0x2d7591 || ({});
}).catch(() => {
  globalThis._antilinkConfig = {};
}), globalThis._antispamConfig = null, globalThis._saveAntispamConfig = function (_0x4a7fc5) {
  _saveConfigCache('antispam_config', _0x4a7fc5);
}, _loadConfigCache("antispam_config", {}).then(_0x480d64 => {
  globalThis._antispamConfig = _0x480d64 || ({});
}).catch(() => {
  globalThis._antispamConfig = {};
}), globalThis._antiforwardConfig = null);
const _ANTIFORWARD_JSON = './data/antiforward.json';
(globalThis._saveAntiforwardConfig = function (_0x417fb3) {
  _saveConfigCache("antiforward_config", _0x417fb3);
  try {
    if (!_0x32ecad.existsSync('./data')) _0x32ecad.mkdirSync('./data', {
      recursive: true
    });
    _0x32ecad.writeFileSync(_ANTIFORWARD_JSON, JSON.stringify(_0x417fb3, null, 2), "utf8");
  } catch {}
}, (function _loadAntiforwardEarly() {
  try {
    if (_0x32ecad.existsSync(_ANTIFORWARD_JSON)) {
      const _0x4e95c2 = _0x32ecad.readFileSync(_ANTIFORWARD_JSON, "utf8"), _0x585337 = JSON.parse(_0x4e95c2);
      if (_0x585337 && typeof _0x585337 === "object") {
        globalThis._antiforwardConfig = _0x585337;
        return;
      }
    }
  } catch {}
  _loadConfigCache("antiforward_config", {}).then(_0x28430a => {
    (!globalThis._antiforwardConfig || Object.keys(globalThis._antiforwardConfig).length === 0) && (globalThis._antiforwardConfig = _0x28430a || ({}));
  }).catch(() => {
    if (!globalThis._antiforwardConfig) globalThis._antiforwardConfig = {};
  });
})());
process.env.BOT_TIMEZONE && !globalThis._timezone && (globalThis._timezone = process.env.BOT_TIMEZONE);
globalThis.reloadConfigCaches = reloadConfigCaches;
async function reloadConfigCaches() {
  try {
    const _0x343450 = [{
      file: "./bot_mode.json",
      key: "bot_mode"
    }, {
      file: "./bot_settings.json",
      key: "bot_settings"
    }, {
      file: './prefix_config.json',
      key: "prefix_config"
    }, {
      file: "./owner.json",
      key: 'owner_data'
    }, {
      file: './whitelist.json',
      key: 'whitelist'
    }, {
      file: "./blocked_users.json",
      key: 'blocked_users'
    }, {
      file: "./data/welcome_data.json",
      key: "welcome_data"
    }, {
      file: "./data/autoViewConfig.json",
      key: 'autoview_config'
    }, {
      file: "./data/autoReactConfig.json",
      key: "autoreact_config"
    }, {
      file: "./data/channelReactConfig.json",
      key: 'channelreact_config'
    }, {
      file: "./data/autoDownloadStatusConfig.json",
      key: "autodownload_status_config"
    }, {
      file: "./data/presence/config.json",
      key: 'presence_config'
    }, {
      file: "./data/autotyping/config.json",
      key: "autotyping_config"
    }, {
      file: "./data/autorecording/config.json",
      key: "autorecording_config"
    }, {
      file: "./data/member_detection.json",
      key: "member_detection"
    }, {
      file: "./data/status_detection_logs.json",
      key: "status_detection_logs"
    }, {
      file: "./data/anticall.json",
      key: "anticall_config"
    }, {
      file: './anticall.json',
      key: 'anticall_config_root'
    }, {
      file: './autoread_settings.json',
      key: "autoread_config"
    }, {
      file: './disp_settings.json',
      key: "disp_config"
    }, {
      file: "./data/footer.json",
      key: "footer_config"
    }];
    for (const {file: _0x395b48, key: _0x4799a6} of _0x343450) {
      await _0x327500.migrateJSONToConfig(_0x395b48, _0x4799a6).catch(() => {});
    }
    (_cache_owner_data = await _loadConfigCache("owner_data", {}), _cache_prefix_config = await _loadConfigCache("prefix_config", {
      prefix: DEFAULT_PREFIX
    }));
    try {
      const _0x4a330e = JSON.parse(_0x32ecad.readFileSync(PREFIX_CONFIG_FILE, "utf8")), _0x510578 = new Date(_cache_prefix_config?.setAt || 0).getTime(), _0xd3a10b = _0x4a330e?.timestamp || new Date(_0x4a330e?.setAt || 0).getTime();
      _0x4a330e && _0x4a330e.prefix !== undefined && _0xd3a10b >= _0x510578 && (_cache_prefix_config = _0x4a330e, _0x327500.setConfig("prefix_config", _0x4a330e).catch(() => {}));
    } catch {}
    try {
      const _0x9b2ca2 = await _loadConfigCache("bot_name", null);
      {
        const {readBotNameFile: _0x5c08b9, writeBotNameFile: _0x2dd59c} = await import("./lib/botname.js").catch(() => ({})), _0x1ad786 = typeof _0x5c08b9 === "function" ? _0x5c08b9() : null;
        if (_0x1ad786) (BOT_NAME = _0x1ad786, global.BOT_NAME = _0x1ad786); else {
          if (_0x9b2ca2 && _0x9b2ca2.name) {
            (BOT_NAME = _0x9b2ca2.name, global.BOT_NAME = _0x9b2ca2.name);
            if (typeof _0x2dd59c === "function") _0x2dd59c(_0x9b2ca2.name);
          }
        }
      }
    } catch {}
    (_cache_bot_settings = await _loadConfigCache("bot_settings", {}), _cache_bot_mode = await _loadConfigCache('bot_mode', {
      mode: process.env.BOT_MODE || "public"
    }));
    const _0x2b0176 = await _loadConfigCache("antiviewonce_config", {
      enabled: false,
      mode: "private"
    });
    _0x2b0176 && typeof _0x2b0176 === 'object' && (globalThis._antiviewonceConfig = {
      enabled: !!_0x2b0176.enabled,
      mode: _0x2b0176.mode === "public" ? "public" : "private"
    });
    try {
      const _0xb196be = JSON.parse(_0x32ecad.readFileSync("./bot_mode.json", 'utf8')), _0x1e310c = new Date(_cache_bot_mode?.setAt || 0).getTime(), _0x5e4156 = new Date(_0xb196be?.setAt || 0).getTime();
      _0xb196be && _0xb196be.mode && _0x5e4156 >= _0x1e310c && (_cache_bot_mode = _0xb196be, _0x327500.setConfig('bot_mode', _0xb196be).catch(() => {}));
    } catch {}
    (_cache_whitelist = await _loadConfigCache('whitelist', {
      whitelist: []
    }), _cache_blocked_users = await _loadConfigCache("blocked_users", {
      blocked: []
    }), _cache_welcome_data = await _loadConfigCache('welcome_data', {}), _cache_status_logs = await _loadConfigCache("status_detection_logs", {}), _cache_member_detection = await _loadConfigCache("member_detection", {}));
    if (_cache_bot_mode && !_cache_bot_mode.mode) _cache_bot_mode = {
      mode: process.env.BOT_MODE || 'public'
    };
    _cache_prefix_config && typeof _cache_prefix_config.prefix === 'undefined' && !_cache_prefix_config.isPrefixless && (_cache_prefix_config = {
      prefix: DEFAULT_PREFIX
    });
    const _0x2c128e = await _loadConfigCache("font_config", {
      font: "default"
    });
    if (_0x2c128e && _0x2c128e.font) globalThis._fontConfig = _0x2c128e;
    const _0x52ce5b = await _loadConfigCache("antibot_config", {});
    globalThis._antibotConfig = _0x52ce5b && Object.keys(_0x52ce5b).length > 0 ? _0x52ce5b : globalThis._antibotConfig || ({});
    const _0x1f1380 = await _loadConfigCache('antidisp_config', {
      enabled: false
    });
    globalThis._antidispConfig = _0x1f1380 && typeof _0x1f1380 === "object" ? _0x1f1380 : globalThis._antidispConfig || ({
      enabled: false
    });
    const _0x3bc3b3 = await _loadConfigCache('antibug_config', {});
    globalThis._antibugConfig = _0x3bc3b3 && Object.keys(_0x3bc3b3).length > 0 ? _0x3bc3b3 : globalThis._antibugConfig || ({});
    const _0x536e70 = await _loadConfigCache("antilink_config", {});
    globalThis._antilinkConfig = _0x536e70 && Object.keys(_0x536e70).length > 0 ? _0x536e70 : globalThis._antilinkConfig || ({});
    const _0x868ba2 = await _loadConfigCache("antispam_config", {});
    globalThis._antispamConfig = _0x868ba2 && Object.keys(_0x868ba2).length > 0 ? _0x868ba2 : globalThis._antispamConfig || ({});
    let _0x57c420 = null;
    try {
      if (_0x32ecad.existsSync(_ANTIFORWARD_JSON)) {
        const _0x9709ba = _0x32ecad.readFileSync(_ANTIFORWARD_JSON, "utf8"), _0x2b57c1 = JSON.parse(_0x9709ba);
        if (_0x2b57c1 && typeof _0x2b57c1 === "object" && Object.keys(_0x2b57c1).length > 0) _0x57c420 = _0x2b57c1;
      }
    } catch {}
    if (!_0x57c420) {
      const _0x547b39 = await _loadConfigCache('antiforward_config', {});
      if (_0x547b39 && Object.keys(_0x547b39).length > 0) _0x57c420 = _0x547b39;
    }
    globalThis._antiforwardConfig = _0x57c420 || globalThis._antiforwardConfig || ({});
    const _0x3031fc = await _loadConfigCache("timezone_config", {
      timezone: process.env.BOT_TIMEZONE || "UTC"
    });
    globalThis._timezone = _0x3031fc?.timezone || process.env.BOT_TIMEZONE || "UTC";
    globalThis._timezone && globalThis._timezone !== 'UTC' && updateEnvFile("BOT_TIMEZONE", globalThis._timezone);
    if (_cache_owner_data && Object.keys(_cache_owner_data).length === 0) _cache_owner_data = null;
    if (_cache_bot_settings && Object.keys(_cache_bot_settings).length === 0) _cache_bot_settings = null;
    if (_cache_welcome_data && Object.keys(_cache_welcome_data).length === 0) _cache_welcome_data = null;
    if (_cache_bot_mode && _cache_bot_mode.mode) {
      BOT_MODE = _cache_bot_mode.mode;
      try {
        _0x32ecad.writeFileSync("./bot_mode.json", JSON.stringify(_cache_bot_mode, null, 2));
      } catch {}
    }
    const _0x3f7b7c = loadPrefixFromFiles();
    (_0x3f7b7c !== prefixCache || prefixCache === DEFAULT_PREFIX) && (prefixCache = _0x3f7b7c, isPrefixless = prefixCache === '', global.prefix = prefixCache, global.CURRENT_PREFIX = prefixCache, process.env.PREFIX = prefixCache);
    try {
      if (_cache_prefix_config && _cache_prefix_config.prefix !== undefined) {
        _0x32ecad.writeFileSync("./prefix_config.json", JSON.stringify(_cache_prefix_config, null, 2));
        const _0xf94335 = !!_cache_prefix_config.isPrefixless;
        updateEnvFile("BOT_PREFIX", _0xf94335 ? '' : _cache_prefix_config.prefix || '');
      }
    } catch {}
    try {
      _cache_bot_mode && _cache_bot_mode.mode && (_0x32ecad.writeFileSync('./bot_mode.json', JSON.stringify(_cache_bot_mode, null, 2)), updateEnvFile('BOT_MODE', _cache_bot_mode.mode));
    } catch {}
    try {
      _cache_bot_settings && Object.keys(_cache_bot_settings || ({})).length > 0 && _0x32ecad.writeFileSync('./bot_settings.json', JSON.stringify(_cache_bot_settings, null, 2));
    } catch {}
    try {
      _cache_owner_data && _cache_owner_data.OWNER_NUMBER && _0x32ecad.writeFileSync("./owner.json", JSON.stringify(_cache_owner_data, null, 2));
    } catch {}
    try {
      const _0x4ca672 = _0x1f0bfa();
      if (_0x4ca672) updateEnvFile("BOT_NAME", _0x4ca672);
    } catch {}
    try {
      const _0x53288b = await _loadConfigCache("footer_config", null);
      if (_0x53288b && _0x53288b.footer) {
        if (!_0x32ecad.existsSync("./data")) _0x32ecad.mkdirSync("./data", {
          recursive: true
        });
        _0x32ecad.writeFileSync("./data/footer.json", JSON.stringify(_0x53288b, null, 2));
      }
    } catch {}
    try {
      const _0x21a1c6 = _0x327500.getConfigBotId ? _0x327500.getConfigBotId() : null;
      if (_0x21a1c6 && _0x21a1c6 !== 'default') {
        const _0xdafc4c = await _0x327500.getAll("chatbot_config", {
          key: "main",
          bot_id: _0x21a1c6
        }), _0x2ff76b = _0xdafc4c?.[0]?.config;
        if (_0x2ff76b && typeof _0x2ff76b === "object") {
          const _0x341f34 = "./data/chatbot";
          if (!_0x32ecad.existsSync(_0x341f34)) _0x32ecad.mkdirSync(_0x341f34, {
            recursive: true
          });
          _0x32ecad.writeFileSync(_0x341f34 + "/chatbot_config_" + _0x21a1c6 + '.json', JSON.stringify(_0x2ff76b, null, 2));
        }
      }
    } catch {}
  } catch (_0x584d55) {
    UltraCleanLogger.warning(STATUS.WARNING + "️ Config reload error: " + _0x584d55.message);
  }
}
globalThis.preExitSave = async function preExitSave() {
  try {
    const _0x58e5b1 = isPrefixless ? '' : prefixCache || DEFAULT_PREFIX, _0x67b7db = BOT_MODE || 'public';
    try {
      await _0xfafc93.snapshotNow();
    } catch {}
    try {
      await _0x327500.setConfig("prefix_config", {
        prefix: _0x58e5b1,
        isPrefixless: isPrefixless,
        setAt: new Date().toISOString()
      });
    } catch {}
    try {
      await _0x327500.setConfig('bot_mode', {
        mode: _0x67b7db
      });
    } catch {}
    try {
      const _0xf30c76 = global.BOT_NAME || BOT_NAME;
      if (_0xf30c76) await _0x327500.setConfig('bot_name', {
        name: _0xf30c76,
        setAt: new Date().toISOString()
      });
    } catch {}
    try {
      forceBackup();
    } catch {}
    try {
      _0x32ecad.writeFileSync("./prefix_config.json", JSON.stringify({
        prefix: _0x58e5b1,
        isPrefixless: isPrefixless,
        setAt: new Date().toISOString()
      }, null, 2));
    } catch {}
    try {
      _0x32ecad.writeFileSync("./bot_mode.json", JSON.stringify({
        mode: _0x67b7db
      }, null, 2));
    } catch {}
    try {
      updateEnvFile('BOT_PREFIX', _0x58e5b1);
    } catch {}
    try {
      updateEnvFile("BOT_MODE", _0x67b7db);
    } catch {}
    const _0x4db752 = process.env.HEROKU_API_KEY || process.env.HEROKU_API_TOKEN, _0x1c2c3e = process.env.HEROKU_APP_NAME;
    if (_0x4db752 && _0x1c2c3e) try {
      const {default: _0x3fbd8e} = await import("https"), _0x4f179a = JSON.stringify({
        BOT_PREFIX: isPrefixless ? '' : prefixCache || DEFAULT_PREFIX,
        BOT_MODE: BOT_MODE || "public",
        BOT_NAME: global.BOT_NAME || BOT_NAME || 'VIPBOT'
      });
      (await new Promise(_0x140aad => {
        const _0x51fa96 = _0x3fbd8e.request({
          hostname: "api.heroku.com",
          path: "/apps/" + encodeURIComponent(_0x1c2c3e) + '/config-vars',
          method: 'PATCH',
          headers: {
            Authorization: "Bearer " + _0x4db752,
            'Content-Type': "application/json",
            Accept: "application/vnd.heroku+json; version=3",
            'Content-Length': Buffer.byteLength(_0x4f179a)
          }
        }, _0x3f9918 => {
          (_0x3f9918.resume(), _0x140aad());
        });
        (_0x51fa96.on("error", _0x140aad), _0x51fa96.write(_0x4f179a), _0x51fa96.end());
      }), UltraCleanLogger.success(STATUS.SUCCESS + " Settings synced to Heroku Config Vars"));
    } catch {}
  } catch {}
};
const AUTO_CONNECT_ON_LINK = true, AUTO_CONNECT_ON_START = true, RATE_LIMIT_ENABLED = true, MIN_COMMAND_DELAY = 100, STICKER_DELAY = 400;
function silenceBaileysCompletely() {
  try {
    const _0x4a7fd0 = require("pino");
    _0x4a7fd0({
      level: "silent",
      enabled: false
    });
  } catch {}
}
(silenceBaileysCompletely(), console.clear(), setupProcessFilter());
const _logSuppressSet = new Set(['closing\x20session', "sessionentry", "_chains", 'registrationid', 'currentratchet', "indexinfo", "pendingprekey", "ephemeralkeypair", "lastremoteephemeralkey", "rootkey", "basekey", "signalprotocol", "signalkey", 'signalgroup', "signalstore", 'signalrepository', "sessioncipher", "sessionbuilder", 'sessionstate', "senderkeystore", "senderkeydistribution", "keyexchange", 'groupcipher', "ratchet", "chainkey", 'keypair', 'pubkey', "privkey", "keystore", "<buffer", "05 ", '0x', 'failed\x20to\x20decrypt', 'bad\x20mac', "stream errored", "sessionerror", "received error", "connection.update", "creds.update", "messages.upsert", "presence.update", "chat.update", "message.receipt.update", "message.update", "[asm-debug]", "autoreact", "autoview"]), _logSuppressArr = [..._logSuppressSet];
(_logSuppressSet.add("autojoin debug"), _logSuppressArr.push('autojoin\x20debug'));
const _errSuppressArr = ['bad\x20mac', "failed to decrypt", "decrypt", 'session\x20error', 'sessioncipher', "sessionbuilder", "session_cipher", 'signalprotocol', "ratchet", "closed session", 'stream\x20errored', "verifymac", 'libsignal', "hmac", "pre-key", 'prekey', "module_typeless_package_json", "module type of file", "does not parse as commonjs", "add \"type\": \"module\"", "/tmp/"], _warnSuppressArr = ["decrypted message with closed session", "failed to decrypt", 'bad\x20mac', 'closing\x20session', "closing open session", "incoming prekey bundle", "stream errored", "signalprotocol", "ratchet", 'sessioncipher', "sessionbuilder", "sessionentry", "sessionstate", "sessionerror", "module_typeless_package_json", "module type of file", "does not parse as commonjs", 'add\x20\x22type\x22:\x20\x22module\x22', "/tmp/"];
function _isLogSuppressed(_0x2ac055) {
  for (let _0x2a7e50 = 0; _0x2a7e50 < _logSuppressArr.length; _0x2a7e50++) {
    if (_0x2ac055.includes(_logSuppressArr[_0x2a7e50])) return true;
  }
  return false;
}
const _G = "\u001b[38;2;0;255;156m", _GB = "\u001b[1m\u001b[38;2;0;255;156m", _GD = '\x1b[2m\x1b[38;2;0;255;156m', _SG = "\u001b[38;2;0;230;118m", _Y = "\u001b[38;2;250;204;21m", _YB = "\u001b[1m\u001b[38;2;250;204;21m", _YD = "\u001b[2m\u001b[38;2;250;204;21m", _BL = "\u001b[38;2;34;193;255m", _BLB = "\u001b[1m\u001b[38;2;34;193;255m", _BLD = "\u001b[2m\u001b[38;2;34;193;255m", _RED = "\u001b[38;2;255;60;80m", _REDB = "\u001b[1m\u001b[38;2;255;60;80m", _ORG = "\u001b[38;2;255;110;0m", _ORGB = '\x1b[1m\x1b[38;2;255;110;0m', _MAG = "\u001b[38;2;180;0;255m", _MAGB = "\u001b[1m\u001b[38;2;180;0;255m", _CYAN = "\u001b[38;2;0;240;255m", _CYANB = "\u001b[1m\u001b[38;2;0;240;255m", _WHT = '\x1b[38;2;200;215;225m', _DIM = '\x1b[2m\x1b[38;2;100;120;130m', _R = "\u001b[0m", _systemBuffer = [], _FLUSH_INTERVAL = 25000;
let _lastFlush = Date.now(), _flushTimer = null;
const _systemPatterns = ["disk cleanup", "trimming caches", "high memory", "media stored", "saved sticker", "saved media", "trimmed to", "cleanup:", 'disk\x20space', "low disk", "[antidelete] media", "antiedit: saved", "antiedit: stored", "items removed", "cache trimmed", 'disk\x20manager'];
function _isSystemLog(_0x44fb7d) {
  if (!_0x44fb7d) return false;
  const _0x27bb08 = _0x44fb7d.toLowerCase();
  for (let _0x3ebdbc = 0; _0x3ebdbc < _systemPatterns.length; _0x3ebdbc++) {
    if (_0x27bb08.includes(_systemPatterns[_0x3ebdbc])) return true;
  }
  return false;
}
function _getTime() {
  const _0x45ecb6 = new Date(), _0x417dd8 = String(_0x45ecb6.getHours()).padStart(2, '0'), _0x5d94e1 = String(_0x45ecb6.getMinutes()).padStart(2, '0'), _0x39ddc6 = String(_0x45ecb6.getSeconds()).padStart(2, '0');
  return _0x417dd8 + ':' + _0x5d94e1 + ':' + _0x39ddc6;
}
function _isPGLog(_0x29b897) {
  return typeof _0x29b897 === 'string' && _0x29b897.startsWith("[PG]");
}
function _printPGLog(_0x4cdad6) {
  const _0x1bfb5e = "\u001b[1m\u001b[38;2;0;230;118m", _0xef896 = "\u001b[1m\u001b[38;2;255;165;0m", _0x2838fa = "\u001b[38;2;200;215;225m", _0x5028ab = "\u001b[2m\u001b[38;2;120;140;155m", _0xd92237 = "\u001b[38;2;0;230;118m", _0x2c10e5 = "\u001b[0m", _0x4ea33a = (_0x398991, _0x10da62) => _0x1bfb5e + '┆' + _0x2c10e5 + '\x20' + _0x5028ab + '✦' + _0x2c10e5 + '\x20' + _0xef896 + _0x398991 + ':' + _0x2c10e5 + '\x20' + _0x2838fa + _0x10da62 + _0x2c10e5;
  if (_0x4cdad6.includes("Tables in DB:")) {
    const _0x1fbe41 = _0x4cdad6.match(/Tables in DB:\s*(.+)/i), _0x20a5af = _0x1fbe41 ? _0x1fbe41[1].split(',').map(_0x11b597 => _0x11b597.trim()).filter(Boolean) : [], _0x454848 = ['', _0x1bfb5e + '╭┄〔\x20' + STATUS.DATABASE + "️ DATABASE 〕┄╮" + _0x2c10e5];
    for (const _0x259f97 of _0x20a5af) _0x454848.push(_0x4ea33a(_0x259f97, '' + _0xd92237 + STATUS.SUCCESS + " linked" + _0x2c10e5));
    (_0x454848.push(_0x1bfb5e + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x2c10e5, ''), process.stdout.write(_0x454848.join('\x0a') + '\x0a'));
  } else {
    if (_0x4cdad6.includes('' + STATUS.SUCCESS) || _0x4cdad6.toLowerCase().includes('connected')) {
      const _0x200d4f = ['', _0x1bfb5e + "╭┄〔 " + STATUS.DATABASE + '️\x20DATABASE\x20〕┄╮' + _0x2c10e5, _0x4ea33a('Status', '' + _0xd92237 + STATUS.SUCCESS + " all systems synchronized" + _0x2c10e5), _0x1bfb5e + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x2c10e5, ''];
      process.stdout.write(_0x200d4f.join('\x0a') + '\x0a');
    } else {
      const _0x200372 = _0x4cdad6.replace("[PG]", '').trim(), _0x5a0300 = ['', _0x1bfb5e + "╭┄〔 " + STATUS.DATABASE + "️ DATABASE 〕┄╮" + _0x2c10e5, _0x4ea33a('Info', _0x200372), _0x1bfb5e + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x2c10e5, ''];
      process.stdout.write(_0x5a0300.join('\x0a') + '\x0a');
    }
  }
}
function _flushSystemBuffer() {
  if (_systemBuffer.length === 0) return;
  const _0x176784 = _systemBuffer.splice(0);
  _lastFlush = Date.now();
  const _0x3fda61 = {}, _0xf792d5 = [];
  for (const _0x45afe6 of _0x176784) {
    const _0x235f54 = _0x45afe6.text;
    if ((/disk cleanup.*removed (\d+)/i).test(_0x235f54)) {
      const _0xa914 = _0x235f54.match(/removed (\d+)/i);
      _0x3fda61.diskCleanup = (_0x3fda61.diskCleanup || 0) + parseInt(_0xa914[1]);
    } else {
      if ((/high memory.*?(\d+)MB/i).test(_0x235f54)) {
        const _0xc66d6d = _0x235f54.match(/(\d+)MB/i);
        _0x3fda61.highMemory = parseInt(_0xc66d6d[1]);
      } else {
        if ((/media stored/i).test(_0x235f54)) _0x3fda61.mediaStored = (_0x3fda61.mediaStored || 0) + 1; else {
          if ((/saved sticker/i).test(_0x235f54)) _0x3fda61.stickersStored = (_0x3fda61.stickersStored || 0) + 1; else {
            if ((/trimmed to/i).test(_0x235f54)) _0x3fda61.cacheTrimmed = (_0x3fda61.cacheTrimmed || 0) + 1; else {
              if ((/trimming caches/i).test(_0x235f54)) _0x3fda61.cacheTrimmed = (_0x3fda61.cacheTrimmed || 0) + 1; else {
                const _0x1c60b1 = _0x235f54.length > 60 ? _0x235f54.substring(0, 57) + '...' : _0x235f54;
                _0xf792d5.push(_0x1c60b1);
              }
            }
          }
        }
      }
    }
  }
  const _0x1ceef2 = [];
  if (_0x3fda61.diskCleanup) _0x1ceef2.push(GITHUB.CLEAN + " Disk cleanup: " + _0x3fda61.diskCleanup + " items removed");
  if (_0x3fda61.highMemory) _0x1ceef2.push(STATUS.WARNING + '️\x20Memory\x20peak:\x20' + _0x3fda61.highMemory + 'MB');
  if (_0x3fda61.mediaStored) _0x1ceef2.push(UI.SAVE + " Media stored: " + _0x3fda61.mediaStored + " file" + (_0x3fda61.mediaStored > 1 ? 's' : ''));
  if (_0x3fda61.stickersStored) _0x1ceef2.push(MEDIA.DESIGN + " Stickers saved: " + _0x3fda61.stickersStored);
  if (_0x3fda61.cacheTrimmed) _0x1ceef2.push(MEDIA.PACKAGE + '\x20Cache\x20trimmed:\x20' + _0x3fda61.cacheTrimmed + 'x');
  for (const _0x4b3bcc of _0xf792d5.slice(0, 3)) _0x1ceef2.push(_0x4b3bcc);
  if (_0xf792d5.length > 3) _0x1ceef2.push('...\x20+' + (_0xf792d5.length - 3) + " more");
  if (_0x1ceef2.length === 0) return;
  const _0x25b1e1 = '\x1b[1m\x1b[38;2;240;220;90m', _0x566022 = "\u001b[1m\u001b[38;2;255;165;0m", _0x146b37 = "\u001b[38;2;200;215;225m", _0x5509ed = '\x1b[2m\x1b[38;2;120;140;155m', _0x167b2c = "\u001b[0m", _0x6e13ef = ['', _0x25b1e1 + '╭┄〔\x20' + UI.TOOL + " SYSTEM 〕┄╮" + _0x167b2c];
  for (const _0x25147b of _0x1ceef2) _0x6e13ef.push(_0x25b1e1 + '┆' + _0x167b2c + '\x20' + _0x5509ed + '✦' + _0x167b2c + '\x20' + _0x566022 + "Info:" + _0x167b2c + '\x20' + _0x146b37 + _0x25147b + _0x167b2c);
  (_0x6e13ef.push(_0x25b1e1 + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x167b2c, ''), process.stdout.write(_0x6e13ef.join('\x0a') + '\x0a'));
}
function _bufferSystemLog(_0x27ad4b) {
  (_systemBuffer.push({
    text: _0x27ad4b,
    time: Date.now()
  }), !_flushTimer && (_flushTimer = setTimeout(() => {
    (_flushTimer = null, _flushSystemBuffer());
  }, _FLUSH_INTERVAL)));
}
const _BOX_INNER = 30;
function _boxDash(_0x5d9761) {
  return ('┄').repeat(Math.max(0, _0x5d9761));
}
function _boxTop(_0x1363db, _0x4d19dd, _0x5b9ee3, _0x55bf54) {
  const _0x503351 = '〔\x20' + _0x5b9ee3 + '\x20' + _0x55bf54 + '\x20〕', _0x3582e4 = _0x503351.length + 2, _0x396eb5 = Math.max(2, _BOX_INNER - 2 - _0x3582e4 + 2);
  return _0x1363db + '╭┄' + _0x503351 + _boxDash(_0x396eb5) + '╮' + _0x4d19dd;
}
function _boxBot(_0x20893f, _0x5f3b24) {
  return _0x20893f + '╰' + _boxDash(_BOX_INNER + 2) + '╯' + _0x5f3b24;
}
function _boxRow(_0x2a4c01, _0x3c0ad2, _0x2ae80c, _0x27c717, _0xc61e30, _0x5525b0, _0x2a3d8a) {
  const _0x36110c = ('\x20').repeat(Math.max(0, 9 - _0x5525b0.length));
  return '\x20\x20' + _0x2a4c01 + '\x20\x20' + _0x3c0ad2 + _0x5525b0 + _0x36110c + _0xc61e30 + _0x2ae80c + ':' + _0xc61e30 + '\x20' + _0x27c717 + _0x2a3d8a + _0xc61e30;
}
function _printCommandBox({sender: _0x1e9aa4, command: _0x4664c3, location: _0x540209, role: _0x46c809, ms: _0x50d935}) {
  const _0x17bbf6 = "\u001b[1m\u001b[38;2;0;255;156m", _0xda9d60 = '\x1b[38;2;0;255;156m', _0x3257d2 = "\u001b[2m\u001b[38;2;100;120;130m", _0x42b362 = '\x1b[38;2;200;215;225m', _0x11e868 = '\x1b[38;2;0;230;118m', _0x20840f = "\u001b[0m", _0x4a6bcd = _0x46c809 === "owner" ? '' + SOCIAL.CROWN : _0x46c809 === 'sudo' ? '' + UI.KEY : '' + UI.CHAT, _0x5000b9 = _0x46c809 === "owner" ? "OWNER CMD" : _0x46c809 === 'sudo' ? "SUDO CMD" : "USER CMD", _0x187cab = _0x50d935 !== undefined ? '\x20\x20' + _0x3257d2 + '(' + _0x50d935 + "ms)" + _0x20840f : '', _0x5ad3a4 = _0x1e9aa4 && !_0x1e9aa4.startsWith('+') ? '+' + _0x1e9aa4 : _0x1e9aa4 || '?', _0x2d79ea = _0x3257d2 + '·' + _0x20840f;
  originalConsoleMethods.log(['', _0x17bbf6 + '╭┄〔\x20' + _0x4a6bcd + '\x20' + _0x5000b9 + '\x20〕┄╮' + _0x20840f, _0x17bbf6 + '┆\x20✦\x20' + _0x20840f + _0x3257d2 + 'Sender' + _0x20840f + '\x20' + _0xda9d60 + ':' + _0x20840f + '\x20' + _0x42b362 + _0x5ad3a4 + _0x20840f, _0x17bbf6 + '┆\x20✦\x20' + _0x20840f + _0x3257d2 + "Command" + _0x20840f + '\x20' + _0xda9d60 + ':' + _0x20840f + '\x20' + _0x42b362 + _0x4664c3 + _0x20840f + '\x20\x20' + _0x2d79ea + '\x20\x20' + _0x3257d2 + "Where" + _0x20840f + '\x20' + _0xda9d60 + ':' + _0x20840f + '\x20' + _0x42b362 + _0x540209 + _0x20840f, _0x17bbf6 + '┆\x20✦\x20' + _0x20840f + _0x11e868 + STALKER.CHECK + '\x20done' + _0x20840f + _0x187cab, _0x17bbf6 + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x20840f, ''].join('\x0a'));
}
function _printReconnectBox(_0x4a42a8) {
  const _0x2783b0 = "\u001b[1m\u001b[38;2;0;255;156m", _0x561918 = "\u001b[38;2;0;255;156m", _0x1168f3 = "\u001b[2m\u001b[38;2;100;120;130m", _0x430d6b = "\u001b[38;2;200;215;225m", _0x32c72d = "\u001b[38;2;0;230;118m", _0x3ca46c = '\x1b[0m';
  originalConsoleMethods.log(['', _0x2783b0 + "╭┄〔 " + GAMES.REPEAT + " VIPBOT RECONNECTED 〕┄╮" + _0x3ca46c, _0x2783b0 + '┆\x20✦\x20' + _0x3ca46c + _0x32c72d + STATUS.SUCCESS + " Ready" + _0x3ca46c + '\x20\x20' + _0x1168f3 + '·' + _0x3ca46c + '\x20\x20' + _0x1168f3 + "Owner" + _0x3ca46c + '\x20' + _0x561918 + ':' + _0x3ca46c + '\x20' + _0x430d6b + '+' + _0x4a42a8 + _0x3ca46c, _0x2783b0 + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x3ca46c, ''].join('\x0a'));
}
function _printMessageBox(_0x599ad0) {
  const {phone: _0xb61c72, chatType: _0x4b4deb, groupName: _0xdeb180, text: _0x4536d3, msgType: _0x41a2bb, senderName: _0x5b3781, chatId: _0x2532d2, groupJid: _0x492172, channelName: _0x2d6c2f, channelJid: _0x5424fe} = _0x599ad0, _0x6687be = _0x4b4deb === "GROUP", _0x1c2c6c = _0x4b4deb === "OWNER", _0x449b02 = _0x4b4deb === "CHANNEL", _0x5b5f62 = _0x6687be ? "\u001b[1m\u001b[38;2;34;193;255m" : _0x449b02 ? '\x1b[1m\x1b[38;2;180;120;255m' : _0x1c2c6c ? "\u001b[1m\u001b[38;2;0;255;156m" : "\u001b[1m\u001b[38;2;255;110;0m", _0x3e3086 = _0x6687be ? "\u001b[38;2;34;193;255m" : _0x449b02 ? "\u001b[38;2;180;120;255m" : _0x1c2c6c ? "\u001b[38;2;0;255;156m" : "\u001b[38;2;255;110;0m", _0xec1d06 = '\x1b[1m\x1b[38;2;255;165;0m', _0x243537 = "\u001b[38;2;220;230;240m", _0x222c34 = "\u001b[2m\u001b[38;2;120;140;155m", _0x324f8a = "\u001b[0m", _0x128873 = new Date(), _0x568a37 = _0x128873.getTime() + 3 * 3600 * 1000 - _0x128873.getTimezoneOffset() * 60 * 1000, _0x56e1aa = new Date(_0x568a37), _0x3a7c5d = ["Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], _0x8013bb = _0xdcc866 => String(_0xdcc866).padStart(2, '0'), _0x3eb29e = _0x3a7c5d[_0x56e1aa.getUTCDay()], _0x2e7415 = _0x8013bb(_0x56e1aa.getUTCHours()), _0x3c8595 = _0x8013bb(_0x56e1aa.getUTCMinutes()), _0x2fea6d = _0x8013bb(_0x56e1aa.getUTCSeconds()), _0x191198 = _0x8013bb(_0x56e1aa.getUTCDate()), _0x2b7efa = _0x8013bb(_0x56e1aa.getUTCMonth() + 1), _0x5d58c0 = _0x56e1aa.getUTCFullYear(), _0x1909bc = _0x3eb29e + ',\x20' + _0x2e7415 + ':' + _0x3c8595 + ':' + _0x2fea6d + " EAT", _0x30efc3 = _0x191198 + '/' + _0x2b7efa + '/' + _0x5d58c0, _0x263757 = typeof getCurrentBotName === 'function' ? getCurrentBotName() : global.BOT_NAME || "VIPBOT", _0x12b7e9 = _0x6687be ? '' + SOCIAL.PEOPLE : _0x449b02 ? '' + EMERGENCY.ANNOUNCE : _0x1c2c6c ? '' + SOCIAL.CROWN : '' + UI.CHAT, _0x54db7f = _0x5b5f62 + "╭┄〔" + _0x324f8a + '\x20' + _0x12b7e9 + '\x20' + _0x5b5f62 + _0x263757.toUpperCase() + _0x324f8a + '\x20' + _0x5b5f62 + '〕┄╮' + _0x324f8a, _0x40084a = _0x5b5f62 + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x324f8a, _0x14a95b = (_0xe59334, _0x2c0456) => _0x5b5f62 + '┆' + _0x324f8a + '\x20' + _0x222c34 + '✦' + _0x324f8a + '\x20' + _0xec1d06 + _0xe59334 + ':' + _0x324f8a + '\x20' + _0x243537 + _0x2c0456 + _0x324f8a, _0x4f3241 = _0x41a2bb || "unknown", _0x3f4ec4 = _0x5b3781 || (_0xb61c72 ? '+' + _0xb61c72 : "N/A"), _0x59c918 = _0x2532d2 || (_0xb61c72 || "unknown"), _0x106a6b = _0x4536d3 && _0x4536d3.length > 120 ? _0x4536d3.substring(0, 120) + '…' : _0x4536d3 || '', _0x497c21 = ['', _0x54db7f];
  (_0x497c21.push(_0x14a95b('Sent\x20Time', _0x1909bc)), _0x497c21.push(_0x14a95b("Date", _0x30efc3)), _0x497c21.push(_0x14a95b('Message\x20Type', _0x4f3241)), _0x497c21.push(_0x14a95b("Sender Name", _0x3f4ec4)), _0x497c21.push(_0x14a95b("Chat ID", _0x59c918)));
  if (_0x6687be) {
    if (_0xdeb180) _0x497c21.push(_0x14a95b("Group", _0xdeb180));
    if (_0x492172) _0x497c21.push(_0x14a95b("Group JID", _0x492172));
  } else {
    if (_0x449b02) {
      if (_0x2d6c2f) _0x497c21.push(_0x14a95b("Channel", _0x2d6c2f));
      if (_0x5424fe) _0x497c21.push(_0x14a95b("Channel JID", _0x5424fe));
    }
  }
  (_0x497c21.push(_0x14a95b("Message", _0x106a6b)), _0x497c21.push(_0x40084a, ''), originalConsoleMethods.log(_0x497c21.join('\x0a')));
}
function _printMemberBox({action: _0x117177, userName: _0x2587ae, userNumber: _0x34cc78, userJid: _0x29ab54, groupName: _0x52595f, groupJid: _0x4ea223}) {
  const _0x5a8ad1 = "\u001b[1m\u001b[38;2;0;200;120m", _0x3a1adc = "\u001b[1m\u001b[38;2;255;165;0m", _0x2d20b5 = "\u001b[38;2;220;230;240m", _0x22b994 = "\u001b[2m\u001b[38;2;120;140;155m", _0x325bc3 = '\x1b[0m', _0x8bc0bf = (_0x117177 || "add").toUpperCase() === "ADD" ? "JOINED" : (_0x117177 || "EVENT").toUpperCase(), _0x5d1db6 = _0x8bc0bf === 'JOINED' ? '' + STATUS.PLUS : '' + ETHICAL.MAIL, _0x17a204 = _0x5a8ad1 + "╭┄〔" + _0x325bc3 + '\x20' + _0x5d1db6 + '\x20' + _0x5a8ad1 + "NEW MEMBER " + _0x8bc0bf + _0x325bc3 + '\x20' + _0x5a8ad1 + '〕┄╮' + _0x325bc3, _0x491e16 = _0x5a8ad1 + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x325bc3, _0x33219d = (_0x561adf, _0x27bd17) => _0x5a8ad1 + '┆' + _0x325bc3 + '\x20' + _0x22b994 + '✦' + _0x325bc3 + '\x20' + _0x3a1adc + _0x561adf + ':' + _0x325bc3 + '\x20' + _0x2d20b5 + _0x27bd17 + _0x325bc3, _0x5f1d57 = ['', _0x17a204];
  if (_0x2587ae) _0x5f1d57.push(_0x33219d("Name", _0x2587ae));
  if (_0x34cc78) _0x5f1d57.push(_0x33219d("Number", '+' + _0x34cc78));
  if (_0x29ab54) _0x5f1d57.push(_0x33219d("User JID", _0x29ab54));
  if (_0x52595f) _0x5f1d57.push(_0x33219d('Group', _0x52595f));
  if (_0x4ea223) _0x5f1d57.push(_0x33219d("Group JID", _0x4ea223));
  (_0x5f1d57.push(_0x491e16, ''), originalConsoleMethods.log(_0x5f1d57.join('\x0a')));
}
function _printAntideleteBox({event: _0x527c6e, fields: fields = {}}) {
  const _0x109b3c = "\u001b[1m\u001b[38;2;255;80;180m", _0x1b6fe0 = "\u001b[1m\u001b[38;2;255;165;0m", _0x2f90a9 = "\u001b[38;2;220;230;240m", _0x2c7a47 = "\u001b[2m\u001b[38;2;120;140;155m", _0xec734e = "\u001b[0m", _0x374ce6 = _0x109b3c + "╭┄〔" + _0xec734e + '\x20' + UI.TRASH + "️  " + _0x109b3c + 'ANTIDELETE' + _0xec734e + '\x20' + _0x109b3c + '〕┄╮' + _0xec734e + '\x20\x20' + _0x2f90a9 + (_0x527c6e || '') + _0xec734e, _0x15b83f = _0x109b3c + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0xec734e, _0x2f5833 = (_0x4b6873, _0x4eedaf) => _0x109b3c + '┆' + _0xec734e + '\x20' + _0x2c7a47 + '✦' + _0xec734e + '\x20' + _0x1b6fe0 + _0x4b6873 + ':' + _0xec734e + '\x20' + _0x2f90a9 + _0x4eedaf + _0xec734e, _0x23074f = ['', _0x374ce6];
  for (const [_0x35b45a, _0x8e77c6] of Object.entries(fields)) {
    if (_0x8e77c6 === undefined || _0x8e77c6 === null || _0x8e77c6 === '') continue;
    _0x23074f.push(_0x2f5833(_0x35b45a, String(_0x8e77c6)));
  }
  (_0x23074f.push(_0x15b83f, ''), originalConsoleMethods.log(_0x23074f.join('\x0a')));
}
globalThis._printAntideleteBox = _printAntideleteBox;
function _printSystemBox({tag: _0x5c852b, color: color = "purple", icon: icon = '•', message: message = '', fields: fields = {}}) {
  const _0x34ab25 = {
    cyan: "\u001b[1m\u001b[38;2;0;200;230m",
    gold: '\x1b[1m\x1b[38;2;255;200;60m',
    yellow: "\u001b[1m\u001b[38;2;240;220;90m",
    green: "\u001b[1m\u001b[38;2;0;220;120m",
    red: '\x1b[1m\x1b[38;2;255;90;90m',
    purple: "\u001b[1m\u001b[38;2;180;130;255m"
  }, _0x33e242 = _0x34ab25[color] || _0x34ab25.purple, _0xd6575 = '\x1b[1m\x1b[38;2;255;165;0m', _0x4e1f56 = "\u001b[38;2;220;230;240m", _0x3f9418 = '\x1b[2m\x1b[38;2;120;140;155m', _0x20aaea = "\u001b[0m", _0x29881a = _0x33e242 + "╭┄〔" + _0x20aaea + '\x20' + icon + '\x20' + _0x33e242 + (_0x5c852b || "SYSTEM") + _0x20aaea + '\x20' + _0x33e242 + '〕┄╮' + _0x20aaea + (message ? '\x20\x20' + _0x4e1f56 + message + _0x20aaea : ''), _0x616f23 = _0x33e242 + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x20aaea, _0x1f4d49 = (_0x5e762a, _0x2ea02b) => _0x33e242 + '┆' + _0x20aaea + '\x20' + _0x3f9418 + '✦' + _0x20aaea + '\x20' + _0xd6575 + _0x5e762a + ':' + _0x20aaea + '\x20' + _0x4e1f56 + _0x2ea02b + _0x20aaea, _0x313ef4 = ['', _0x29881a];
  for (const [_0x4aa0f6, _0x92320d] of Object.entries(fields || ({}))) {
    if (_0x92320d === undefined || _0x92320d === null || _0x92320d === '') continue;
    _0x313ef4.push(_0x1f4d49(_0x4aa0f6, String(_0x92320d)));
  }
  (_0x313ef4.push(_0x616f23, ''), originalConsoleMethods.log(_0x313ef4.join('\x0a')));
}
globalThis._printSystemBox = _printSystemBox;
class UltraCleanLogger {
  static ["log"](..._0xef4a5a) {
    if (globalThis._wolfStartupPhase) return;
    const _0x39c49a = _0xef4a5a[0];
    if (typeof _0x39c49a === 'string') {
      const _0x15c674 = _0x39c49a.toLowerCase();
      if (_isLogSuppressed(_0x15c674)) return;
      if (_isPGLog(_0x39c49a)) {
        _printPGLog(_0xef4a5a.join('\x20'));
        return;
      }
      if (_isSystemLog(_0x39c49a)) {
        _bufferSystemLog(_0xef4a5a.join('\x20'));
        return;
      }
    }
    const _0xb77ae7 = _0xef4a5a.join('\x20');
    _printSystemBox({
      tag: 'SYS',
      color: "cyan",
      icon: '•',
      message: _0xb77ae7
    });
  }
  static ["error"](..._0x4b41ae) {
    const _0x22d0bd = _0x4b41ae.join('\x20').toLowerCase();
    for (let _0x1a757e = 0; _0x1a757e < _errSuppressArr.length; _0x1a757e++) {
      if (_0x22d0bd.includes(_errSuppressArr[_0x1a757e])) return;
    }
    const _0x1c3040 = _0x4b41ae.join('\x20');
    _printSystemBox({
      tag: "ERR",
      color: "red",
      icon: '' + STATUS.ERROR,
      message: _0x1c3040
    });
  }
  static ["success"](..._0x2f8552) {
    if (globalThis._wolfStartupPhase) return;
    const _0x178637 = _0x2f8552.join('\x20');
    if (_isSystemLog(_0x178637)) {
      _bufferSystemLog(_0x178637);
      return;
    }
    _printSystemBox({
      tag: 'OK',
      color: "green",
      icon: '' + STATUS.SUCCESS,
      message: _0x178637
    });
  }
  static ['info'](..._0x162207) {
    if (globalThis._wolfStartupPhase) return;
    const _0x1a37ab = _0x162207.join('\x20');
    if (!_0x1a37ab || !_0x1a37ab.trim()) return;
    if (_isSystemLog(_0x1a37ab)) {
      _bufferSystemLog(_0x1a37ab);
      return;
    }
    _printSystemBox({
      tag: "INFO",
      color: 'cyan',
      icon: 'ℹ️',
      message: _0x1a37ab
    });
  }
  static ['infoLine'](..._0x1d91da) {
    if (globalThis._wolfStartupPhase) return;
    const _0x4c2f47 = _0x1d91da.join('\x20').replace(/\s+/g, '\x20').trim();
    if (!_0x4c2f47) return;
    const _0x5cb1e0 = "\u001b[1m\u001b[38;2;0;200;230m", _0x4d5782 = '\x1b[38;2;220;230;240m';
    originalConsoleMethods.log(_0x5cb1e0 + "ℹ INFO " + _R + '\x20' + _0x5cb1e0 + '│' + _R + '\x20' + _0x4d5782 + _0x4c2f47 + _R);
  }
  static ["warning"](..._0x4a0689) {
    if (globalThis._wolfStartupPhase) return;
    const _0x25806c = _0x4a0689.join('\x20').toLowerCase();
    for (let _0x35c5c2 = 0; _0x35c5c2 < _warnSuppressArr.length; _0x35c5c2++) {
      if (_0x25806c.includes(_warnSuppressArr[_0x35c5c2])) return;
    }
    const _0x502613 = _0x4a0689.join('\x20');
    if (!_0x502613 || !_0x502613.trim()) return;
    if (_isSystemLog(_0x502613)) {
      _bufferSystemLog(_0x502613);
      return;
    }
    _printSystemBox({
      tag: "WARN",
      color: "yellow",
      icon: STATUS.WARNING + '️',
      message: _0x502613
    });
  }
  static ["event"](..._0x32385d) {
    _printSystemBox({
      tag: "EVENT",
      color: "purple",
      icon: '' + UI.MASK,
      message: _0x32385d.join('\x20')
    });
  }
  static ["command"](_0x333998) {
    if (_0x333998 && typeof _0x333998 === 'object') {
      _printCommandBox({
        role: "user",
        ..._0x333998
      });
      return;
    }
    const _0x2925a3 = _getTime();
    originalConsoleMethods.log(_CYANB + "[VIPBOT-CMD]" + _R + '\x20' + _DIM + UI.TIMER + "️  " + _0x2925a3 + _R + '\x20\x20' + _CYAN + '▸\x20' + UI.CHAT + '\x20' + _0x333998 + _R);
  }
  static ["ownerCommand"](_0x4ea57f) {
    if (_0x4ea57f && typeof _0x4ea57f === "object") _printCommandBox({
      role: 'owner',
      ..._0x4ea57f
    }); else {
      const _0x315467 = _getTime();
      originalConsoleMethods.log(_GB + "[VIPBOT-CMD]" + _R + '\x20' + _GD + UI.TIMER + '️\x20\x20' + _0x315467 + _R + '\x20\x20' + _G + '▸\x20' + SOCIAL.CROWN + '\x20' + String(_0x4ea57f) + _R);
    }
  }
  static ["ownerMessage"](..._0x282d65) {
    const _0x3e36f8 = _0x282d65.join('\x20');
    _printMessageBox({
      phone: null,
      chatType: "OWNER",
      groupName: null,
      text: _0x3e36f8
    });
  }
  static ["critical"](..._0x43f1ff) {
    const _0x26d8ed = _getTime(), _0x569afb = _0x43f1ff.join('\x20');
    originalConsoleMethods.error(_REDB + "[VIPBOT-CRIT]" + _R + '\x20' + _DIM + UI.TIMER + '️\x20\x20' + _0x26d8ed + _R + '\x20\x20' + _RED + '▸\x20' + EMERGENCY.ALARM + '\x20' + _0x569afb + _R);
  }
  static ['group'](..._0x2058fb) {
    const _0x28e425 = _getTime();
    originalConsoleMethods.log(_MAGB + "[VIPBOT-GRP]" + _R + '\x20' + _DIM + UI.TIMER + "️  " + _0x28e425 + _R + '\x20\x20' + _MAG + '▸\x20' + SOCIAL.PEOPLE + '\x20' + _0x2058fb.join('\x20') + _R);
  }
  static ['member'](..._0x21620e) {
    const _0x538005 = _getTime();
    originalConsoleMethods.log(_CYANB + "[VIPBOT-MBR]" + _R + '\x20' + _DIM + UI.TIMER + "️  " + _0x538005 + _R + '\x20\x20' + _CYAN + '▸\x20' + SOCIAL.PERSON + '\x20' + _0x21620e.join('\x20') + _R);
  }
  static ["message"](_0x31554f, _0x46629e, _0x16d04d, _0x453b23, _0x1f942c, _0x590380 = {}) {
    _printMessageBox({
      phone: _0x31554f,
      chatType: _0x46629e,
      groupName: _0x16d04d,
      text: _0x453b23,
      msgType: _0x590380.msgType,
      senderName: _0x590380.senderName,
      chatId: _0x590380.chatId,
      groupJid: _0x590380.groupJid,
      channelName: _0x590380.channelName,
      channelJid: _0x590380.channelJid
    });
  }
  static ["flushSystem"]() {
    _flushSystemBuffer();
  }
}
(console.log = UltraCleanLogger.log, console.error = UltraCleanLogger.error, console.info = UltraCleanLogger.info, console.warn = UltraCleanLogger.warning, console.debug = () => {}, globalThis._wolfStartupPhase = true, setTimeout(() => {
  globalThis._wolfStartupPhase = false;
}, 45000), global.logSuccess = UltraCleanLogger.success, global.logInfo = UltraCleanLogger.info, global.logWarning = UltraCleanLogger.warning, global.logEvent = UltraCleanLogger.event, global.logCommand = UltraCleanLogger.command, global.logGroup = UltraCleanLogger.group, global.logMember = UltraCleanLogger.member);
const ultraSilentLogger = {
  level: 'silent',
  trace: () => {},
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  fatal: () => {},
  child: () => ultraSilentLogger,
  log: () => {},
  success: () => {},
  warning: () => {},
  event: () => {},
  command: (..._0x2899b9) => {
    const _0x5c1108 = _0x3ba8f9.gray('[' + new Date().toLocaleTimeString() + ']');
    originalConsoleMethods.log(_0x5c1108, _0x3ba8f9.cyan('' + BRAND.LIGHTNING), ..._0x2899b9);
  }
};
let prefixCache = DEFAULT_PREFIX, prefixHistory = [], isPrefixless = false;
function getCurrentPrefix() {
  return isPrefixless ? '' : prefixCache;
}
function updateEnvFile(_0xd3b92, _0x25d0b9) {
  try {
    const _0x98ecd3 = './.env';
    let _0x51bb54 = '';
    try {
      _0x51bb54 = _0x32ecad.readFileSync(_0x98ecd3, "utf8");
    } catch {}
    const _0x4bf684 = _0xd3b92 + '=' + _0x25d0b9, _0x32f81f = new RegExp('^' + _0xd3b92 + "=.*$", 'm');
    (_0x32f81f.test(_0x51bb54) ? _0x51bb54 = _0x51bb54.replace(_0x32f81f, _0x4bf684) : _0x51bb54 = _0x51bb54.trimEnd() + '\x0a' + _0x4bf684 + '\x0a', _0x32ecad.writeFileSync(_0x98ecd3, _0x51bb54, "utf8"), process.env[_0xd3b92] = String(_0x25d0b9));
  } catch (_0x2644b9) {
    UltraCleanLogger.warning("Could not update .env (" + _0xd3b92 + '):\x20' + _0x2644b9.message);
  }
}
function savePrefixToFile(_0x551c57) {
  try {
    const _0x41c4a1 = _0x551c57 === 'none' || _0x551c57 === '\x22\x22' || _0x551c57 === '\x27\x27' || _0x551c57 === '', _0x4fe24c = {
      prefix: _0x41c4a1 ? '' : _0x551c57,
      isPrefixless: _0x41c4a1,
      setAt: new Date().toISOString(),
      timestamp: Date.now(),
      version: VERSION,
      previousPrefix: prefixCache,
      previousIsPrefixless: isPrefixless
    };
    (_cache_prefix_config = _0x4fe24c, _saveConfigCache("prefix_config", _0x4fe24c), updateWebStatus({
      prefix: _0x41c4a1 ? "none" : _0x551c57
    }));
    try {
      _0x32ecad.writeFileSync("./prefix_config.json", JSON.stringify(_0x4fe24c, null, 2));
    } catch {}
    updateEnvFile("BOT_PREFIX", _0x41c4a1 ? '' : _0x551c57 || '');
    const _0x1a600a = {
      prefix: _0x41c4a1 ? '' : _0x551c57,
      isPrefixless: _0x41c4a1,
      prefixSetAt: new Date().toISOString(),
      prefixChangedAt: Date.now(),
      previousPrefix: prefixCache,
      previousIsPrefixless: isPrefixless,
      version: VERSION
    };
    (_cache_bot_settings = _0x1a600a, _saveConfigCache("bot_settings", _0x1a600a));
    try {
      _0x32ecad.writeFileSync("./bot_settings.json", JSON.stringify(_0x1a600a, null, 2));
    } catch {}
    return (UltraCleanLogger.info("Prefix settings saved: \"" + _0x551c57 + "\", prefixless: " + _0x41c4a1), true);
  } catch (_0x134e5f) {
    return (UltraCleanLogger.error("Error saving prefix: " + _0x134e5f.message), false);
  }
}
function loadPrefixFromFiles() {
  try {
    if (_cache_prefix_config) {
      const _0x50e446 = _cache_prefix_config;
      _0x50e446.isPrefixless !== undefined && (isPrefixless = _0x50e446.isPrefixless);
      if (_0x50e446.prefix !== undefined) {
        if (_0x50e446.prefix.trim() === '' && _0x50e446.isPrefixless) return ''; else {
          if (_0x50e446.prefix.trim() !== '') return _0x50e446.prefix.trim();
        }
      }
    }
    if (_cache_bot_settings) {
      const _0xe269d3 = _cache_bot_settings;
      _0xe269d3.isPrefixless !== undefined && (isPrefixless = _0xe269d3.isPrefixless);
      if (_0xe269d3.prefix && _0xe269d3.prefix.trim() !== '') return _0xe269d3.prefix.trim();
    }
    try {
      const _0x3672de = _0x32ecad.readFileSync(PREFIX_CONFIG_FILE, "utf8"), _0x12e73f = JSON.parse(_0x3672de);
      if (_0x12e73f.isPrefixless !== undefined) isPrefixless = _0x12e73f.isPrefixless;
      if (_0x12e73f.isPrefixless && _0x12e73f.prefix === '') return '';
      if (_0x12e73f.prefix && _0x12e73f.prefix.trim() !== '') return _0x12e73f.prefix.trim();
    } catch {}
  } catch (_0x38ed8b) {
    UltraCleanLogger.warning("Error loading prefix: " + _0x38ed8b.message);
  }
  return DEFAULT_PREFIX;
}
function updatePrefixImmediately(_0x50d72b) {
  const _0x5fbf1b = prefixCache, _0x42ce2b = isPrefixless, _0x11233e = _0x50d72b === "none" || _0x50d72b === '\x22\x22' || _0x50d72b === '\x27\x27' || _0x50d72b === '';
  if (_0x11233e) (isPrefixless = true, prefixCache = '', UltraCleanLogger.success("Prefixless mode enabled")); else {
    if (!_0x50d72b || _0x50d72b.trim() === '') return (UltraCleanLogger.error("Cannot set empty prefix"), {
      success: false,
      error: "Empty prefix"
    });
    if (_0x50d72b.length > 5) return (UltraCleanLogger.error("Prefix too long (max 5 characters)"), {
      success: false,
      error: 'Prefix\x20too\x20long'
    });
    const _0x17487a = _0x50d72b.trim();
    (prefixCache = _0x17487a, isPrefixless = false, UltraCleanLogger.info("Prefix changed to: \"" + _0x17487a + '\x22'));
  }
  return (typeof global !== 'undefined' && (global.prefix = getCurrentPrefix(), global.CURRENT_PREFIX = getCurrentPrefix(), global.isPrefixless = isPrefixless), process.env.PREFIX = getCurrentPrefix(), savePrefixToFile(_0x50d72b), prefixHistory.push({
    oldPrefix: _0x42ce2b ? "none" : _0x5fbf1b,
    newPrefix: isPrefixless ? "none" : prefixCache,
    isPrefixless: isPrefixless,
    oldIsPrefixless: _0x42ce2b,
    timestamp: new Date().toISOString(),
    time: Date.now()
  }), prefixHistory.length > 10 && (prefixHistory = prefixHistory.slice(-10)), updateTerminalHeader(), UltraCleanLogger.success('Prefix\x20updated:\x20\x22' + (_0x42ce2b ? "none" : _0x5fbf1b) + "\" → \"" + (isPrefixless ? 'none\x20(prefixless)' : prefixCache) + '\x22'), {
    success: true,
    oldPrefix: _0x42ce2b ? "none" : _0x5fbf1b,
    newPrefix: isPrefixless ? "none" : prefixCache,
    isPrefixless: isPrefixless,
    timestamp: new Date().toISOString()
  });
}
let OWNER_NUMBER = null, OWNER_JID = null, OWNER_CLEAN_JID = null, OWNER_CLEAN_NUMBER = null, OWNER_LID = null, SOCKET_INSTANCE = null, isConnected = false;
globalThis._wolfAccountStatus = globalThis._wolfAccountStatus || ({
  state: 'unknown',
  code: null,
  message: null,
  detectedAt: null,
  lastSuccessAt: null
});
let store = null, heartbeatInterval = null, lastActivityTime = Date.now(), connectionAttempts = 0, connectionStableTimer = null, MAX_RETRY_ATTEMPTS = 10;
const _validModes = new Set(["public", "groups", "dms", "silent", "buttons", 'channel', "default", "private", "group", "solo", "sudo", "super"]);
let BOT_MODE = (_validModes.has(process.env.BOT_MODE) ? process.env.BOT_MODE : null) || "public", WHITELIST = new Set(), AUTO_LINK_ENABLED = true, AUTO_CONNECT_COMMAND_ENABLED = true, AUTO_ULTIMATE_FIX_ENABLED = true, isWaitingForPairingCode = false;
globalThis._webPairingState = globalThis._webPairingState || ({
  status: "idle",
  phone: null,
  code: null,
  error: null,
  startedAt: null,
  updatedAt: Date.now()
});
function updateWebPairing(_0xa69eb8) {
  globalThis._webPairingState = {
    ...globalThis._webPairingState,
    ..._0xa69eb8,
    updatedAt: Date.now()
  };
}
globalThis.updateWebPairing = updateWebPairing;
let RESTART_AUTO_FIX_ENABLED = true, hasAutoConnectedOnStart = false, hasSentWelcomeMessage = false, _isAutoRestart = false, initialCommandsLoaded = false, commandsLoaded = false;
const _MSG_COOLDOWN_MS = 5 * 60 * 1000;
let _lastConnectionMsgTime = (() => {
  try {
    const _0xa161fd = './data/.last_conn_msg';
    if (_0x32ecad.existsSync(_0xa161fd)) {
      const _0x556209 = parseInt(_0x32ecad.readFileSync(_0xa161fd, "utf8"));
      if (!isNaN(_0x556209)) return _0x556209;
    }
  } catch {}
  return 0;
})(), conflictCount = 0, isConflictRecovery = false, connectionOpenTime = 0, _allManagedIntervals = [], _lagCheckTs = Date.now();
setInterval(() => {
  const _0x15befa = Date.now(), _0x4da467 = _0x15befa - _lagCheckTs - 5000;
  (_lagCheckTs = _0x15befa, _0x4da467 > 1000 && UltraCleanLogger.warning(STATUS.WARNING + "️ [EVENT-LOOP] Lag detected: " + _0x4da467 + 'ms'));
}, 5000);
const DiskManager = {
  WARNING_MB: 200,
  CRITICAL_MB: 80,
  CHECK_INTERVAL: 3 * 60 * 1000,
  CLEANUP_INTERVAL: 10 * 60 * 1000,
  lastWarning: 0,
  lastCritical: 0,
  lastCleanup: 0,
  isLow: false,
  _cachedDiskFree: null,
  _lastDiskCheck: 0,
  _diskCheckInFlight: false,
  getDiskFree() {
    return this._cachedDiskFree;
  },
  async getDiskFreeAsync() {
    const _0x467688 = Date.now();
    if (_0x467688 - this._lastDiskCheck < 60000 && this._cachedDiskFree !== null) return this._cachedDiskFree;
    if (this._diskCheckInFlight) return this._cachedDiskFree;
    this._diskCheckInFlight = true;
    try {
      const [_0x5d4106, _0x4e7b48] = await Promise.allSettled([new Promise((_0x3d3cc7, _0x4b023c) => {
        exec('df\x20-BM\x20--output=avail\x20.\x202>/dev/null\x20||\x20df\x20-m\x20.\x202>/dev/null', {
          encoding: "utf8",
          timeout: 3000
        }, (_0x236177, _0x5a87e8) => _0x236177 ? _0x4b023c(_0x236177) : _0x3d3cc7(_0x5a87e8));
      }), new Promise((_0x38f110, _0x279bd1) => {
        exec('df\x20-BM\x20--output=avail\x20/tmp\x202>/dev/null\x20||\x20df\x20-m\x20/tmp\x202>/dev/null', {
          encoding: "utf8",
          timeout: 3000
        }, (_0x559e7f, _0x5a4159) => _0x559e7f ? _0x279bd1(_0x559e7f) : _0x38f110(_0x5a4159));
      })]), _0x3d44ab = _0x38c035 => {
        if (_0x38c035.status !== "fulfilled") return null;
        const _0x13792e = _0x38c035.value.match(/(\d+)M?\s*$/m);
        return _0x13792e ? parseInt(_0x13792e[1]) : null;
      }, _0x1ccc6b = _0x3d44ab(_0x5d4106), _0x180fc8 = _0x3d44ab(_0x4e7b48), _0x2676c8 = [_0x1ccc6b, _0x180fc8].filter(_0x5e04b6 => _0x5e04b6 !== null);
      (this._cachedDiskFree = _0x2676c8.length ? Math.min(..._0x2676c8) : null, this._lastDiskCheck = _0x467688);
    } catch {
      this._lastDiskCheck = _0x467688;
    } finally {
      this._diskCheckInFlight = false;
    }
    return this._cachedDiskFree;
  },
  getDirSize(_0x3e4e19) {
    let _0x1e90f3 = 0;
    try {
      if (!_0x32ecad.existsSync(_0x3e4e19)) return 0;
      const _0x1449e4 = _0x32ecad.readdirSync(_0x3e4e19);
      for (const _0x34bf5e of _0x1449e4) {
        try {
          const _0x3f2de9 = _0x40e1ec.join(_0x3e4e19, _0x34bf5e), _0x5d6cde = _0x32ecad.statSync(_0x3f2de9);
          if (_0x5d6cde.isFile()) _0x1e90f3 += _0x5d6cde.size; else {
            if (_0x5d6cde.isDirectory()) _0x1e90f3 += this.getDirSize(_0x3f2de9);
          }
        } catch {}
      }
    } catch {}
    return _0x1e90f3;
  },
  getCleanupReport() {
    const _0x57c325 = this._countSessionSignalFiles(), _0x552b02 = 0, _0x15415a = this.getDirSize("./data/antidelete/media"), _0x405af6 = this.getDirSize("./data/antidelete/status/media"), _0x191cc1 = this.getDirSize("./temp") + this.getDirSize("./commands/temp"), _0x8a0a8f = this.getDirSize("./session_backup"), _0x527503 = (() => {
      try {
        return _cache_status_logs ? JSON.stringify(_cache_status_logs).length : 0;
      } catch {
        return 0;
      }
    })(), _0x35d9e5 = this.getDiskFree();
    return {
      freeMB: _0x35d9e5,
      sessionSignalFiles: _0x57c325.count,
      sessionSignalMB: Math.round(_0x57c325.bytes / 1024 / 1024 * 10) / 10,
      antideleteMediaMB: Math.round(_0x15415a / 1024 / 1024 * 10) / 10,
      statusMediaMB: Math.round(_0x405af6 / 1024 / 1024 * 10) / 10,
      tempFilesMB: Math.round(_0x191cc1 / 1024 / 1024 * 10) / 10,
      backupMB: Math.round(_0x8a0a8f / 1024 / 1024 * 10) / 10,
      statusLogsMB: Math.round(_0x527503 / 1024 / 1024 * 10) / 10
    };
  },
  _countSessionSignalFiles() {
    let _0xb17195 = 0, _0x4c3f9c = 0;
    try {
      if (!_0x32ecad.existsSync(SESSION_DIR)) return {
        count: 0,
        bytes: 0
      };
      const _0x12dda1 = _0x32ecad.readdirSync(SESSION_DIR);
      for (const _0x38df92 of _0x12dda1) {
        if (_0x38df92.startsWith('sender-key-') || _0x38df92.startsWith("pre-key-") || _0x38df92.startsWith("app-state-sync-version-")) {
          _0xb17195++;
          try {
            _0x4c3f9c += _0x32ecad.statSync(_0x40e1ec.join(SESSION_DIR, _0x38df92)).size;
          } catch {}
        }
      }
    } catch {}
    return {
      count: _0xb17195,
      bytes: _0x4c3f9c
    };
  },
  async _yieldBatch(_0x3c7507, _0x2a9433 = 50) {
    if (_0x3c7507 > 0 && _0x3c7507 % _0x2a9433 === 0) await new Promise(_0x1cdeff => setImmediate(_0x1cdeff));
  },
  async cleanSessionSignalFilesAsync(_0x3a6c83 = false) {
    let _0x2630db = 0;
    try {
      if (!_0x32ecad.existsSync(SESSION_DIR)) return 0;
      const _0x209cc4 = await _0x32ecad.promises.readdir(SESSION_DIR), _0x30a286 = _0x209cc4.filter(_0xa0e916 => _0xa0e916.startsWith("sender-key-")), _0x4d7eeb = _0x209cc4.filter(_0x530970 => _0x530970.startsWith('pre-key-')), _0x2e7499 = _0x209cc4.filter(_0x4219d5 => _0x4219d5.startsWith("app-state-sync-version-")), _0x1b4638 = _0x3a6c83 ? 10 : 40, _0x3b07e1 = _0x3a6c83 ? 10 : 40, _0x598dab = _0x3a6c83 ? 3 : 10, _0x37eb07 = async (_0x645ccf, _0x27fbf7) => {
        if (_0x645ccf.length <= _0x27fbf7) return 0;
        const _0x5a0af3 = _0x645ccf.slice(0, _0x645ccf.length - _0x27fbf7);
        let _0x5d3b63 = 0;
        for (let _0x5750fb = 0; _0x5750fb < _0x5a0af3.length; _0x5750fb++) {
          try {
            (await _0x32ecad.promises.unlink(_0x40e1ec.join(SESSION_DIR, _0x5a0af3[_0x5750fb])), _0x5d3b63++);
          } catch {}
          await this._yieldBatch(_0x5750fb);
        }
        return _0x5d3b63;
      };
      (_0x2630db += await _0x37eb07(_0x30a286, _0x1b4638), _0x2630db += await _0x37eb07(_0x4d7eeb, _0x3b07e1), _0x2630db += await _0x37eb07(_0x2e7499, _0x598dab));
    } catch {}
    return _0x2630db;
  },
  async cleanOldMediaAsync(_0xa74493, _0x546b6f = 3, _0x54192f = false) {
    let _0x3ab2cd = 0;
    try {
      if (!_0x32ecad.existsSync(_0xa74493)) return 0;
      const _0x3d6dc6 = Date.now(), _0x201b11 = _0x54192f ? 30 * 60 * 1000 : _0x546b6f * 24 * 60 * 60 * 1000, _0x559763 = await _0x32ecad.promises.readdir(_0xa74493);
      for (let _0x4176f6 = 0; _0x4176f6 < _0x559763.length; _0x4176f6++) {
        const _0x453549 = _0x559763[_0x4176f6];
        if (_0x453549.endsWith('.json')) continue;
        try {
          const _0x4de868 = _0x40e1ec.join(_0xa74493, _0x453549), _0x53f07c = await _0x32ecad.promises.stat(_0x4de868);
          _0x53f07c.isFile() && _0x3d6dc6 - _0x53f07c.mtimeMs > _0x201b11 && (await _0x32ecad.promises.unlink(_0x4de868), _0x3ab2cd++);
        } catch {}
        await this._yieldBatch(_0x4176f6);
      }
    } catch {}
    return _0x3ab2cd;
  },
  async cleanTempFilesAsync(_0x3fcf3b = false) {
    let _0x305cf8 = 0;
    const _0x412a2c = ['./temp', "./temp/ig", "./temp/snapchat", './temp/compressed', './temp/apk', "./commands/temp", "./temp_url_uploads", './tmp'], _0x323934 = Date.now(), _0x2202b1 = _0x3fcf3b ? 2 * 60 * 1000 : 15 * 60 * 1000;
    for (const _0x179ff2 of _0x412a2c) {
      try {
        if (!_0x32ecad.existsSync(_0x179ff2)) continue;
        const _0x89bea6 = await _0x32ecad.promises.readdir(_0x179ff2);
        for (let _0x3f362a = 0; _0x3f362a < _0x89bea6.length; _0x3f362a++) {
          const _0x57455e = _0x89bea6[_0x3f362a];
          try {
            const _0x1e80a9 = _0x40e1ec.join(_0x179ff2, _0x57455e), _0x4d0205 = await _0x32ecad.promises.stat(_0x1e80a9);
            _0x4d0205.isFile() && _0x323934 - _0x4d0205.mtimeMs > _0x2202b1 && (await _0x32ecad.promises.unlink(_0x1e80a9), _0x305cf8++);
          } catch {}
          await this._yieldBatch(_0x3f362a);
        }
      } catch {}
    }
    try {
      const {tmpdir: _0x54eddb} = await import('os'), _0x20bd76 = _0x54eddb(), _0x4f8439 = ["image", "video", "audio", 'sticker', "document", "ptt"], _0x56a608 = ['wolfbot_', "wolf_"], _0xf5fe8f = ["ytdlp-", 'wolf-dl-', "wolf-vid-", "wolf-tmp-"], _0x4a85dc = await _0x32ecad.promises.readdir(_0x20bd76, {
        withFileTypes: true
      });
      for (let _0x36c142 = 0; _0x36c142 < _0x4a85dc.length; _0x36c142++) {
        const _0x12eba9 = _0x4a85dc[_0x36c142], _0x4d3f71 = _0x12eba9.name, _0x177765 = _0x40e1ec.join(_0x20bd76, _0x4d3f71);
        try {
          const _0x17b388 = _0x12eba9.isFile() && _0x4f8439.some(_0x41a20b => _0x4d3f71.startsWith(_0x41a20b)) && (_0x4d3f71.endsWith("-enc") || _0x4d3f71.endsWith("-original") || (/^(image|video|audio|sticker|document|ptt)[A-Z0-9]{20,}/).test(_0x4d3f71)), _0x5b5aa9 = _0x12eba9.isFile() && _0x56a608.some(_0x1eeb70 => _0x4d3f71.startsWith(_0x1eeb70)), _0x5e9583 = _0x12eba9.isDirectory() && _0xf5fe8f.some(_0x355704 => _0x4d3f71.startsWith(_0x355704));
          if (!_0x17b388 && !_0x5b5aa9 && !_0x5e9583) {
            await this._yieldBatch(_0x36c142);
            continue;
          }
          const _0xd7c726 = await _0x32ecad.promises.stat(_0x177765);
          _0x323934 - _0xd7c726.mtimeMs > _0x2202b1 && (_0x5e9583 ? await _0x32ecad.promises.rm(_0x177765, {
            recursive: true,
            force: true
          }) : await _0x32ecad.promises.unlink(_0x177765), _0x305cf8++);
        } catch {}
        await this._yieldBatch(_0x36c142);
      }
    } catch {}
    return _0x305cf8;
  },
  async cleanBackupsAsync() {
    let _0x547d7d = 0;
    try {
      if (!_0x32ecad.existsSync("./session_backup")) return 0;
      const _0x23bdb7 = await _0x32ecad.promises.readdir("./session_backup");
      for (let _0x2861c9 = 0; _0x2861c9 < _0x23bdb7.length; _0x2861c9++) {
        try {
          (await _0x32ecad.promises.unlink(_0x40e1ec.join("./session_backup", _0x23bdb7[_0x2861c9])), _0x547d7d++);
        } catch {}
        await this._yieldBatch(_0x2861c9);
      }
      try {
        await _0x32ecad.promises.rmdir('./session_backup');
      } catch {}
    } catch {}
    return _0x547d7d;
  },
  async truncateStatusLogsAsync() {
    try {
      const _0x15b54d = "./data/status_detection_logs.json";
      if (!_0x32ecad.existsSync(_0x15b54d)) return false;
      const _0x3749dd = await _0x32ecad.promises.readFile(_0x15b54d, "utf8"), _0x11b7e3 = JSON.parse(_0x3749dd);
      if (_0x11b7e3.logs && _0x11b7e3.logs.length > 50) return (_0x11b7e3.logs = _0x11b7e3.logs.slice(-50), await _0x32ecad.promises.writeFile(_0x15b54d, JSON.stringify(_0x11b7e3)), true);
    } catch {}
    return false;
  },
  async cleanStatusMediaAsync(_0x4ccc44 = false) {
    let _0x212be4 = 0;
    const _0x2cacf4 = "./data/antidelete/status/media";
    try {
      if (!_0x32ecad.existsSync(_0x2cacf4)) return 0;
      const _0x373162 = Date.now(), _0x2d42ed = _0x4ccc44 ? 15 * 60 * 1000 : 60 * 60 * 1000, _0x37fedf = await _0x32ecad.promises.readdir(_0x2cacf4);
      for (let _0x38e9ac = 0; _0x38e9ac < _0x37fedf.length; _0x38e9ac++) {
        const _0x8f1535 = _0x37fedf[_0x38e9ac];
        try {
          const _0x17f8b2 = _0x40e1ec.join(_0x2cacf4, _0x8f1535), _0x3add88 = await _0x32ecad.promises.stat(_0x17f8b2);
          _0x3add88.isFile() && _0x373162 - _0x3add88.mtimeMs > _0x2d42ed && (await _0x32ecad.promises.unlink(_0x17f8b2), _0x212be4++);
        } catch {}
        await this._yieldBatch(_0x38e9ac);
      }
    } catch {}
    return _0x212be4;
  },
  runCleanup(_0x59b8ba = false) {
    this.runCleanupAsync(_0x59b8ba).catch(() => {});
  },
  async cleanLogFilesAsync() {
    let _0x1731db = 0;
    try {
      const _0x5dbb4c = ['.', "./logs"], _0x170a22 = Date.now();
      for (const _0x2f39ad of _0x5dbb4c) {
        try {
          if (!_0x32ecad.existsSync(_0x2f39ad)) continue;
          const _0x1dd077 = await _0x32ecad.promises.readdir(_0x2f39ad);
          for (const _0x55778d of _0x1dd077) {
            if (!_0x55778d.endsWith(".log")) continue;
            try {
              const _0x38e19e = _0x40e1ec.join(_0x2f39ad, _0x55778d), _0x9d649b = await _0x32ecad.promises.stat(_0x38e19e);
              _0x9d649b.isFile() && (_0x9d649b.size > 5 * 1024 * 1024 || _0x170a22 - _0x9d649b.mtimeMs > 24 * 60 * 60 * 1000) && (await _0x32ecad.promises.unlink(_0x38e19e), _0x1731db++);
            } catch {}
          }
        } catch {}
      }
    } catch {}
    return _0x1731db;
  },
  async cleanNpmCacheAsync() {
    const {exec: _0x42f130} = await import("child_process"), {promisify: _0x3a94ba} = await import("util"), _0x1cf08f = _0x3a94ba(_0x42f130);
    let _0x1323f9 = 0;
    try {
      await _0x1cf08f("npm cache clean --force", {
        timeout: 30000
      });
    } catch {}
    const _0x310863 = [_0x40e1ec.join(process.env.HOME || "/root", ".npm"), "/home/container/.npm", '/root/.npm', '/tmp/bfx_npm_cache'];
    for (const _0xb401e0 of _0x310863) {
      try {
        if (!_0x32ecad.existsSync(_0xb401e0)) continue;
        const _0x1b1271 = this.getDirSize(_0xb401e0);
        (_0x32ecad.rmSync(_0xb401e0, {
          recursive: true,
          force: true
        }), _0x1323f9 += _0x1b1271);
      } catch {}
    }
    if (_0x1323f9 > 0) UltraCleanLogger.info(GITHUB.CLEAN + '\x20npm\x20cache\x20cleared:\x20freed\x20~' + Math.round(_0x1323f9 / 1024 / 1024) + 'MB');
    return _0x1323f9;
  },
  async runCleanupAsync(_0x964013 = false) {
    const _0x51e131 = () => new Promise(_0x5c44a9 => setImmediate(_0x5c44a9)), _0x2a67c8 = {};
    (_0x2a67c8.sessionFiles = await this.cleanSessionSignalFilesAsync(_0x964013), await _0x51e131(), await _0x51e131(), _0x2a67c8.antideleteMedia = await this.cleanOldMediaAsync("./data/antidelete/media", 1 / 48, _0x964013), await _0x51e131(), _0x2a67c8.statusMedia = await this.cleanStatusMediaAsync(_0x964013), await _0x51e131(), _0x2a67c8.tempFiles = await this.cleanTempFilesAsync(_0x964013), await _0x51e131(), _0x2a67c8.backups = _0x964013 ? await this.cleanBackupsAsync() : 0);
    if (_0x964013) await this.cleanNpmCacheAsync().catch(() => {});
    (await _0x51e131(), _0x2a67c8.statusLogs = await this.truncateStatusLogsAsync() ? 1 : 0, _0x2a67c8.logFiles = await this.cleanLogFilesAsync());
    const _0x5dd7c7 = Object.values(_0x2a67c8).reduce((_0xc767ab, _0x635cf6) => _0xc767ab + _0x635cf6, 0);
    return (_0x5dd7c7 > 0 && UltraCleanLogger.info(GITHUB.CLEAN + '\x20Disk\x20cleanup:\x20removed\x20' + _0x5dd7c7 + " items (session: " + _0x2a67c8.sessionFiles + ", antidelete: " + _0x2a67c8.antideleteMedia + ", status-media: " + _0x2a67c8.statusMedia + ", temp: " + _0x2a67c8.tempFiles + ", backups: " + _0x2a67c8.backups + ", logs: " + _0x2a67c8.logFiles + ')'), this.lastCleanup = Date.now(), _0x2a67c8);
  },
  async monitorAsync() {
    const _0x5f1f98 = await this.getDiskFreeAsync();
    if (_0x5f1f98 === null) return;
    if (_0x5f1f98 < this.CRITICAL_MB) (this.isLow = true, Date.now() - this.lastCritical > 30 * 60 * 1000 && (UltraCleanLogger.error(EMERGENCY.ALARM + " CRITICAL: Only " + _0x5f1f98 + 'MB\x20disk\x20space\x20left!\x20Running\x20aggressive\x20cleanup...'), this.lastCritical = Date.now()), await this.runCleanupAsync(true)); else _0x5f1f98 < this.WARNING_MB ? (this.isLow = true, Date.now() - this.lastWarning > 30 * 60 * 1000 && (UltraCleanLogger.warning(STATUS.WARNING + "️ Low disk space: " + _0x5f1f98 + 'MB\x20remaining.\x20Running\x20cleanup...'), this.lastWarning = Date.now()), await this.runCleanupAsync(false)) : this.isLow = false;
  },
  _intervals: [],
  _started: false,
  async start() {
    if (this._started) return;
    (this._started = true, this.cleanNpmCacheAsync().catch(() => {}));
    const _0x17f74f = await this.getDiskFreeAsync();
    (_0x17f74f !== null && _0x17f74f < this.WARNING_MB ? (UltraCleanLogger.warning(STATUS.WARNING + "️ Low disk on startup: " + _0x17f74f + 'MB\x20free.\x20Running\x20immediate\x20cleanup...'), await this.runCleanupAsync(_0x17f74f < this.CRITICAL_MB)) : this.runCleanupAsync(false).catch(() => {}), this._intervals.push(setInterval(() => this.monitorAsync().catch(() => {}), this.CHECK_INTERVAL)), this._intervals.push(setInterval(() => {
      if (!this.isLow) this.runCleanupAsync(false).catch(() => {});
    }, this.CLEANUP_INTERVAL)), globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.diskManager = true);
  }
};
function safeWriteFile(_0x4b271d, _0xcbf437) {
  const _0x5b7c9d = typeof _0xcbf437 === 'string' || Buffer.isBuffer(_0xcbf437) ? _0xcbf437 : JSON.stringify(_0xcbf437, null, 2);
  try {
    return (_0x32ecad.writeFileSync(_0x4b271d, _0x5b7c9d), true);
  } catch (_0x348650) {
    if (_0x348650.code === 'ENOSPC') {
      (UltraCleanLogger.error(UI.SAVE + '\x20Disk\x20full!\x20Cannot\x20write\x20' + _0x4b271d + ". Running emergency cleanup..."), DiskManager._lastDiskCheck = 0, DiskManager.runCleanup(true));
      try {
        return (_0x32ecad.writeFileSync(_0x4b271d, _0x5b7c9d), true);
      } catch {
        return false;
      }
    }
    throw _0x348650;
  }
}
async function safeWriteFileAsync(_0x2d5192, _0x291147) {
  const _0x2977db = _0x32ecad.promises;
  try {
    return (await _0x2977db.writeFile(_0x2d5192, typeof _0x291147 === "string" ? _0x291147 : JSON.stringify(_0x291147, null, 2)), true);
  } catch (_0x2865b9) {
    if (_0x2865b9.code === "ENOSPC") {
      (UltraCleanLogger.error(UI.SAVE + " Disk full! Cannot write " + _0x2d5192 + ". Running emergency cleanup..."), DiskManager.runCleanup(true));
      try {
        return (await _0x2977db.writeFile(_0x2d5192, typeof _0x291147 === "string" ? _0x291147 : JSON.stringify(_0x291147, null, 2)), true);
      } catch {
        return false;
      }
    }
    throw _0x2865b9;
  }
}
const delay = _0x586214 => new Promise(_0x2ff0e6 => setTimeout(_0x2ff0e6, _0x586214));
class JidManager {
  constructor() {
    (this.ownerJids = new Set(), this.ownerLids = new Set(), this.owner = null, this.loadOwnerData(), this.loadWhitelist(), globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.jidManager = true);
  }
  ["loadOwnerData"]() {
    try {
      const _0x18d4b0 = _cache_owner_data;
      if (!_0x18d4b0?.OWNER_JID) return;
      const _0x4a7ff7 = ownerIdentity(_0x18d4b0.OWNER_JID, _0x18d4b0.ownerLID, _0x4fcd7c => lidPhoneCache.get(_0x4fcd7c) || getPhoneFromLid(_0x4fcd7c));
      if (!_0x4a7ff7.jid) return;
      (this.owner = {
        rawJid: _0x4a7ff7.jid,
        cleanJid: _0x4a7ff7.jid,
        cleanNumber: _0x4a7ff7.number,
        isLid: !_0x4a7ff7.number,
        linkedAt: _0x18d4b0.linkedAt || new Date().toISOString()
      }, this.ownerJids.clear(), this.ownerLids.clear(), this.ownerJids.add(_0x4a7ff7.jid), _0x4a7ff7.lid && (this.ownerLids.add(_0x4a7ff7.lid), this.ownerLids.add(_0x4a7ff7.lid.split('@')[0])), OWNER_JID = OWNER_CLEAN_JID = _0x4a7ff7.jid, OWNER_NUMBER = OWNER_CLEAN_NUMBER = _0x4a7ff7.number, OWNER_LID = _0x4a7ff7.lid, globalThis.OWNER_JID = globalThis.OWNER_CLEAN_JID = _0x4a7ff7.jid, globalThis.OWNER_NUMBER = globalThis.OWNER_CLEAN_NUMBER = _0x4a7ff7.number, UltraCleanLogger.success("Loaded owner: " + (_0x4a7ff7.number || 'phone\x20unresolved')));
    } catch {}
  }
  ["loadWhitelist"]() {
    try {
      const _0x4d2e16 = _cache_whitelist;
      _0x4d2e16 && _0x4d2e16.whitelist && Array.isArray(_0x4d2e16.whitelist) && _0x4d2e16.whitelist.forEach(_0x34e78c => {
        WHITELIST.add(_0x34e78c);
      });
    } catch {}
  }
  ["cleanJid"](_0x45e007) {
    if (!_0x45e007) return {
      cleanJid: '',
      cleanNumber: '',
      raw: _0x45e007,
      isLid: false
    };
    const _0x5c28b1 = _0x45e007.includes("@lid");
    if (_0x5c28b1) {
      const _0xfd29b7 = _0x45e007.split('@')[0], _0x5806e5 = _0xfd29b7.split(':')[0];
      return {
        raw: _0x45e007,
        cleanJid: _0x45e007,
        cleanNumber: _0x5806e5,
        isLid: true
      };
    }
    const [_0x777436] = _0x45e007.split('@')[0].split(':'), _0x38df6c = _0x45e007.split('@')[1] || 's.whatsapp.net', _0x344d17 = _0x777436.replace(/[^0-9]/g, ''), _0x17a32b = _0x344d17.startsWith('0') ? _0x344d17.substring(1) : _0x344d17, _0x4d4675 = _0x17a32b + '@' + _0x38df6c;
    return {
      raw: _0x45e007,
      cleanJid: _0x4d4675,
      cleanNumber: _0x17a32b,
      isLid: false
    };
  }
  ["isOwner"](_0x5f3140) {
    if (!_0x5f3140?.key) return false;
    if (_0x5f3140.key.fromMe) return true;
    if (!this.owner) return false;
    const _0x349715 = normalizeOwnerJid(_0x5f3140.key.participant || _0x5f3140.key.remoteJid);
    if (!_0x349715) return false;
    if (this.ownerJids.has(_0x349715) || this.ownerLids.has(_0x349715)) return true;
    const _0x1b3548 = _0x4537f5 => lidPhoneCache.get(_0x4537f5) || getPhoneFromLid(_0x4537f5), _0x417d80 = ownerIdentity(this.owner.cleanJid, OWNER_LID, _0x1b3548), _0x5b0d2c = ownerIdentity(_0x349715, null, _0x1b3548);
    return Boolean(_0x417d80.number && _0x5b0d2c.number && _0x417d80.number === _0x5b0d2c.number);
  }
  ["isSudo"](_0x2b7bfe) {
    if (!_0x2b7bfe || !_0x2b7bfe.key) return false;
    const _0x46f26c = _0x2b7bfe.key.remoteJid, _0x28c660 = _0x2b7bfe.key.participant, _0x37f697 = _0x28c660 || _0x46f26c;
    if (isSudoJid(_0x37f697)) return true;
    const _0x5bb890 = this.cleanJid(_0x37f697);
    if (isSudoNumber(_0x5bb890.cleanNumber)) return true;
    const _0x3a3cc8 = _0x37f697.split('@')[0].split(':')[0];
    if (_0x3a3cc8 !== _0x5bb890.cleanNumber && isSudoNumber(_0x3a3cc8)) return true;
    if (_0x37f697.includes('@lid')) {
      const _0x146665 = resolvePhoneFromLid(_0x37f697);
      if (_0x146665 && isSudoNumber(_0x146665)) return (mapLidToPhone(_0x3a3cc8, _0x146665), true);
    }
    if (isSudoByLid(_0x3a3cc8)) return true;
    if (isSudoByLid(_0x5bb890.cleanNumber)) return true;
    const _0x156d86 = _0x37f697.split('@')[0].split(':')[0], _0x309abe = lidPhoneCache.get(_0x156d86);
    if (_0x309abe && isSudoNumber(_0x309abe)) return true;
    if (_0x3a3cc8.length > 15) for (const [_0x10567b, _0xb4c0d] of lidPhoneCache) {
      if (_0x10567b === _0x3a3cc8 && isSudoNumber(_0xb4c0d)) return true;
    }
    return false;
  }
  async ["isSudoAsync"](_0x2af2e6, _0x92f795) {
    if (this.isSudo(_0x2af2e6)) return true;
    if (!_0x2af2e6 || !_0x2af2e6.key) return false;
    const _0x171c66 = _0x2af2e6.key.remoteJid, _0x99fdfd = _0x2af2e6.key.participant, _0x2c1fde = _0x99fdfd || _0x171c66, {sudoers: _0x48bc9c} = getSudoList();
    if (_0x48bc9c.length === 0) return false;
    const _0x84f07 = _0x2c1fde.split('@')[0].split(':')[0], _0x52aca3 = _0x2c1fde.split('@')[0];
    try {
      if (_0x171c66.includes("@g.us") && _0x92f795) {
        await buildLidMapFromGroup(_0x171c66, _0x92f795);
        const _0x5da12f = lidPhoneCache.get(_0x84f07) || lidPhoneCache.get(_0x52aca3) || getPhoneFromLid(_0x84f07) || getPhoneFromLid(_0x52aca3);
        if (_0x5da12f && isSudoNumber(_0x5da12f)) return true;
        if (this.isSudo(_0x2af2e6)) return true;
      }
    } catch (_0x36cfce) {
      UltraCleanLogger.info(STATUS.WARNING + '️\x20isSudoAsync\x20group\x20error:\x20' + _0x36cfce.message);
    }
    try {
      if (!_0x171c66.includes("@g.us") && _0x92f795 && _0x2c1fde.includes("@lid")) {
        const _0x5f5d9f = lidPhoneCache.get(_0x84f07) || lidPhoneCache.get(_0x52aca3) || getPhoneFromLid(_0x84f07) || getPhoneFromLid(_0x52aca3);
        if (_0x5f5d9f) {
          if (isSudoNumber(_0x5f5d9f)) return (UltraCleanLogger.info(UI.KEY + " Sudo LID resolved from cache: +" + _0x5f5d9f), true);
          return false;
        }
        if (!hasUnmappedSudos()) return false;
        const _0x50b6f3 = Date.now(), _0x321cff = isSudoAsync._lastGlobalScan || 0, _0x4494e3 = isSudoAsync._scanning || false;
        if (!_0x4494e3 && _0x50b6f3 - _0x321cff > 10 * 60 * 1000) {
          (isSudoAsync._scanning = true, isSudoAsync._lastGlobalScan = _0x50b6f3);
          try {
            const _0x504757 = await _0x92f795.groupFetchAllParticipating();
            if (_0x504757) for (const [_0x4ffc52, _0x25c0b6] of Object.entries(_0x504757)) {
              const _0x1325af = _0x25c0b6.participants || [];
              for (const _0x4e6981 of _0x1325af) {
                const {phoneNum: _0x253b1b, lidNum: _0x10a518} = extractParticipantInfo(_0x4e6981, _0x92f795);
                _0x253b1b && _0x10a518 && _0x253b1b !== _0x10a518 && (cacheLidPhone(_0x10a518, _0x253b1b), mapLidToPhone(_0x10a518, _0x253b1b));
              }
            }
          } finally {
            isSudoAsync._scanning = false;
          }
        }
        const _0x4018ae = lidPhoneCache.get(_0x84f07) || lidPhoneCache.get(_0x52aca3) || getPhoneFromLid(_0x84f07) || getPhoneFromLid(_0x52aca3);
        if (_0x4018ae && isSudoNumber(_0x4018ae)) return (UltraCleanLogger.info(UI.KEY + '\x20Sudo\x20LID\x20resolved\x20from\x20group\x20scan:\x20+' + _0x4018ae), true);
      }
    } catch (_0xc757a6) {
      (isSudoAsync._scanning = false, UltraCleanLogger.info(STATUS.WARNING + '️\x20isSudoAsync\x20DM\x20scan\x20error:\x20' + _0xc757a6.message));
    }
    return false;
  }
  ['setNewOwner'](_0x420c75, _0xeb60d0 = false, _0x454b2b = null) {
    try {
      const _0x11b948 = ownerIdentity(_0x420c75, _0x454b2b, _0x2ad749 => lidPhoneCache.get(_0x2ad749) || getPhoneFromLid(_0x2ad749));
      if (!_0x11b948.jid) return {
        success: false,
        error: "Invalid owner identity"
      };
      _0x420c75 = _0x11b948.jid;
      const _0xa09d34 = {
        cleanJid: _0x11b948.jid,
        cleanNumber: _0x11b948.number,
        isLid: !_0x11b948.number
      };
      (this.ownerJids.clear(), this.ownerLids.clear(), WHITELIST.clear(), this.owner = {
        rawJid: _0x420c75,
        cleanJid: _0xa09d34.cleanJid,
        cleanNumber: _0xa09d34.cleanNumber,
        isLid: _0xa09d34.isLid,
        linkedAt: new Date().toISOString(),
        autoLinked: _0xeb60d0
      }, this.ownerJids.add(_0xa09d34.cleanJid), this.ownerJids.add(_0x420c75), OWNER_LID = _0x11b948.lid);
      _0x11b948.lid && (this.ownerLids.add(_0x11b948.lid), this.ownerLids.add(_0x11b948.lid.split('@')[0]));
      (OWNER_JID = _0x420c75, OWNER_NUMBER = _0xa09d34.cleanNumber, OWNER_CLEAN_JID = _0xa09d34.cleanJid, OWNER_CLEAN_NUMBER = _0xa09d34.cleanNumber, globalThis.OWNER_JID = OWNER_CLEAN_JID, globalThis.OWNER_CLEAN_JID = OWNER_CLEAN_JID, globalThis.OWNER_NUMBER = OWNER_CLEAN_NUMBER, globalThis.OWNER_CLEAN_NUMBER = OWNER_CLEAN_NUMBER);
      const _0x1357de = {
        OWNER_JID: _0x420c75,
        OWNER_NUMBER: _0xa09d34.cleanNumber,
        OWNER_CLEAN_JID: _0xa09d34.cleanJid,
        OWNER_CLEAN_NUMBER: _0xa09d34.cleanNumber,
        ownerLID: _0x11b948.lid,
        linkedAt: new Date().toISOString(),
        autoLinked: _0xeb60d0,
        previousOwnerCleared: true,
        version: VERSION
      };
      return (_cache_owner_data = _0x1357de, _saveConfigCache("owner_data", _0x1357de), UltraCleanLogger.success("New owner set: " + _0xa09d34.cleanJid), {
        success: true,
        owner: this.owner,
        isLid: _0xa09d34.isLid
      });
    } catch {
      return {
        success: false,
        error: 'Failed\x20to\x20set\x20new\x20owner'
      };
    }
  }
  ["getOwnerInfo"]() {
    return {
      ownerJid: this.owner?.cleanJid || null,
      ownerNumber: this.owner?.cleanNumber || null,
      ownerLid: OWNER_LID || null,
      jidCount: this.ownerJids.size,
      lidCount: this.ownerLids.size,
      whitelistCount: WHITELIST.size,
      isLid: this.owner?.isLid || false,
      linkedAt: this.owner?.linkedAt || null
    };
  }
}
const jidManager = new JidManager();
class NewMemberDetector {
  constructor() {
    (this.enabled = true, this.detectedMembers = new Map(), this.groupMembersCache = new Map(), this.loadDetectionData(), globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.memberDetector = true);
  }
  ["loadDetectionData"]() {
    try {
      if (_cache_member_detection && _cache_member_detection.detectedMembers) {
        for (const [_0x3d2c48, _0x4e0882] of Object.entries(_cache_member_detection.detectedMembers)) {
          this.detectedMembers.set(_0x3d2c48, _0x4e0882);
        }
        (globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.memberGroups = this.detectedMembers.size);
        return;
      }
      _0x327500.getConfig("member_detection", {}).then(_0x517cf2 => {
        try {
          _cache_member_detection = _0x517cf2;
          if (_0x517cf2 && _0x517cf2.detectedMembers) {
            for (const [_0xfacf87, _0x592f8d] of Object.entries(_0x517cf2.detectedMembers)) {
              this.detectedMembers.set(_0xfacf87, _0x592f8d);
            }
            (globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.memberGroups = this.detectedMembers.size);
          }
        } catch {}
      }).catch(_0x17bf61 => {
        UltraCleanLogger.warning("Could not load member detection data: " + _0x17bf61.message);
      });
    } catch (_0x310fcc) {
      UltraCleanLogger.warning("Could not load member detection data: " + _0x310fcc.message);
    }
  }
  ['saveDetectionData']() {
    try {
      const _0x34b07e = {
        detectedMembers: {},
        updatedAt: new Date().toISOString(),
        totalGroups: this.detectedMembers.size
      };
      for (const [_0x2dd0fc, _0x511da4] of this.detectedMembers.entries()) {
        _0x34b07e.detectedMembers[_0x2dd0fc] = _0x511da4;
      }
      (_cache_member_detection = _0x34b07e, _0x327500.setConfig("member_detection", _0x34b07e).catch(_0x3963c1 => {
        UltraCleanLogger.warning("Could not save member detection data: " + _0x3963c1.message);
      }));
    } catch (_0x15d37d) {
      UltraCleanLogger.warning("Could not save member detection data: " + _0x15d37d.message);
    }
  }
  async ["detectNewMembers"](_0x494e1d, _0x252ac5) {
    try {
      if (!this.enabled) return null;
      if (!_0x494e1d?.ws?.isOpen) return null;
      const _0x2c888e = _0x252ac5.id, _0x5395d2 = _0x252ac5.action;
      if (_0x5395d2 === "add" || _0x5395d2 === "invite") {
        const _0x113a4f = _0x252ac5.participants || [];
        let _0x2dfcf7 = "Unknown Group";
        try {
          const _0x2f5a07 = groupMetadataCache.get(_0x2c888e);
          _0x2dfcf7 = _0x2f5a07?.data?.subject || _0x2f5a07?.subject || _0x2dfcf7;
          if (_0x2dfcf7 === "Unknown Group" && _0x494e1d?.ws?.isOpen) {
            const _0x1f60da = await Promise.race([_0x494e1d.groupMetadata(_0x2c888e), new Promise((_0x269839, _0x57a082) => setTimeout(() => _0x57a082(new Error('timeout')), 4000))]);
            _0x1f60da?.subject && (_0x2dfcf7 = _0x1f60da.subject, groupMetadataCache.set(_0x2c888e, {
              data: _0x1f60da,
              ts: Date.now()
            }));
          }
        } catch {}
        let _0x3f4551 = this.groupMembersCache.get(_0x2c888e) || new Set();
        const _0x2e209e = [];
        for (const _0x572f57 of _0x113a4f) {
          let _0x4fbc81;
          if (typeof _0x572f57 === "string") _0x4fbc81 = _0x572f57.includes('@') ? _0x572f57 : null; else {
            if (_0x572f57 && typeof _0x572f57 === "object") {
              const _0x39f874 = _0x572f57.jid || _0x572f57.id || _0x572f57.userJid || _0x572f57.participant || _0x572f57.user;
              if (typeof _0x39f874 === "string" && _0x39f874.includes('@')) _0x4fbc81 = _0x39f874; else {
                if (typeof _0x39f874 === "string" && (/^\d+$/).test(_0x39f874)) _0x4fbc81 = _0x39f874 + '@s.whatsapp.net'; else _0x4fbc81 = null;
              }
            } else _0x4fbc81 = null;
          }
          if (!_0x4fbc81) continue;
          if (!_0x3f4551.has(_0x4fbc81)) try {
            if (!_0x494e1d?.ws?.isOpen) return null;
            let _0x1726d6 = _0x4fbc81, _0x81b9d4 = _0x4fbc81.split('@')[0].split(':')[0];
            if (_0x4fbc81.endsWith('@lid')) {
              try {
                const _0x20e017 = await Promise.race([_0x494e1d.groupMetadata(_0x2c888e), new Promise((_0x1c834c, _0xbefec4) => setTimeout(() => _0xbefec4(new Error('timeout')), 4000))]), _0x3fc0c1 = _0x20e017?.participants?.find(_0x4fb74e => _0x4fb74e.id === _0x4fbc81 || _0x4fb74e.lid === _0x4fbc81 || _0x4fb74e.jid === _0x4fbc81), _0x3fa74d = _0x3fc0c1?.phoneNumber || _0x3fc0c1?.pn;
                if (_0x3fa74d) {
                  const _0x16e396 = String(_0x3fa74d).split('@')[0].replace(/[^0-9]/g, '');
                  _0x16e396.length >= 7 && (_0x81b9d4 = _0x16e396, _0x1726d6 = _0x16e396 + '@s.whatsapp.net');
                }
              } catch {}
              if (_0x1726d6.endsWith("@lid") && typeof globalThis.resolvePhoneFromLid === 'function') {
                const _0x78fcd3 = globalThis.resolvePhoneFromLid(_0x4fbc81);
                _0x78fcd3 && (_0x81b9d4 = _0x78fcd3, _0x1726d6 = _0x78fcd3 + "@s.whatsapp.net");
              }
            }
            let _0x379b14 = _0x81b9d4;
            try {
              const _0x2ef929 = new Promise((_0x3cacb5, _0x346447) => setTimeout(() => _0x346447(new Error("timeout")), 5000)), _0x505045 = await Promise.race([_0x494e1d.onWhatsApp(_0x1726d6), _0x2ef929]);
              _0x379b14 = _0x505045?.[0]?.name || _0x505045?.[0]?.notify || _0x505045?.[0]?.verifiedName || global.contactNames?.get?.(_0x81b9d4) || _0x81b9d4;
            } catch {}
            (_0x2e209e.push({
              jid: _0x1726d6,
              lid: _0x4fbc81.endsWith('@lid') ? _0x4fbc81 : null,
              name: _0x379b14,
              number: _0x81b9d4,
              addedAt: new Date().toISOString(),
              timestamp: Date.now(),
              action: _0x5395d2,
              addedBy: _0x252ac5.actor || "unknown"
            }), _0x3f4551.add(_0x4fbc81), this.showMemberNotification(_0x2dfcf7, _0x379b14, _0x81b9d4, _0x5395d2, {
              userJid: _0x1726d6,
              groupJid: _0x2c888e
            }));
          } catch (_0x2f8c64) {
            UltraCleanLogger.warning("Could not get user info for " + _0x4fbc81 + ':\x20' + _0x2f8c64.message);
          }
        }
        this.groupMembersCache.set(_0x2c888e, _0x3f4551);
        if (_0x2e209e.length > 0) {
          const _0x17d191 = this.detectedMembers.get(_0x2c888e) || [];
          return (_0x17d191.push(..._0x2e209e), this.detectedMembers.set(_0x2c888e, _0x17d191.slice(-50)), Math.random() < 0.2 && this.saveDetectionData(), _0x2e209e);
        }
      }
      return null;
    } catch (_0x4f5969) {
      return (UltraCleanLogger.error('Member\x20detection\x20error:\x20' + _0x4f5969.message), null);
    }
  }
  ["showMemberNotification"](_0x3dc92a, _0x7141c1, _0x59501b, _0x4ab7f1, _0x4b7ac7 = {}) {
    _printMemberBox({
      action: _0x4ab7f1,
      userName: _0x7141c1,
      userNumber: _0x59501b,
      userJid: _0x4b7ac7.userJid || null,
      groupName: _0x3dc92a,
      groupJid: _0x4b7ac7.groupJid || null
    });
  }
  async ["checkWelcomeSystem"](_0x1305c5, _0x2e74f6, _0x5d5782) {
    try {
      const _0x45e10e = this.loadWelcomeData(), _0x7ffb88 = _0x45e10e.groups?.[_0x2e74f6];
      if (_0x7ffb88?.enabled) for (const _0x25ad5c of _0x5d5782) {
        await this.sendWelcomeMessage(_0x1305c5, _0x2e74f6, _0x25ad5c.jid, _0x7ffb88.message);
      }
    } catch (_0x861116) {
      UltraCleanLogger.warning("Welcome system check failed: " + _0x861116.message);
    }
  }
  async ["sendWelcomeMessage"](_0x18a471, _0x317a34, _0x5c3e2a, _0xb51d5a) {
    try {
      const _0x2ea5e3 = await _0x18a471.onWhatsApp(_0x5c3e2a), _0x128e91 = _0x2ea5e3[0]?.name || _0x5c3e2a.split('@')[0], _0x40fb0c = await _0x18a471.groupMetadata(_0x317a34), _0xe90360 = _0x40fb0c.participants.length, _0x203729 = _0x40fb0c.subject || "Our Group", _0x45dad8 = this.replaceWelcomeVariables(_0xb51d5a, {
        name: _0x128e91,
        group: _0x203729,
        members: _0xe90360,
        mention: '@' + _0x5c3e2a.split('@')[0]
      });
      let _0x33ac84 = null;
      try {
        _0x33ac84 = await _0x18a471.profilePictureUrl(_0x5c3e2a, "image");
      } catch {
        _0x33ac84 = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
      }
      await _0x18a471.sendMessage(_0x317a34, {
        image: {
          url: _0x33ac84
        },
        caption: _0x45dad8,
        mentions: [_0x5c3e2a],
        contextInfo: {
          mentionedJid: [_0x5c3e2a]
        }
      });
      const _0x58f4e1 = this.loadWelcomeData();
      (_0x58f4e1.groups?.[_0x317a34] && (_0x58f4e1.groups[_0x317a34].lastWelcome = Date.now(), this.saveWelcomeData(_0x58f4e1)), UltraCleanLogger.info(STATUS.SUCCESS + " Welcome sent to " + _0x128e91 + " in " + _0x203729));
    } catch (_0x575c08) {
      UltraCleanLogger.warning("Could not send welcome message: " + _0x575c08.message);
    }
  }
  ['replaceWelcomeVariables'](_0x3153e1, _0x494ca8) {
    return _0x3153e1.replace(/{name}/g, _0x494ca8.name).replace(/{group}/g, _0x494ca8.group).replace(/{members}/g, _0x494ca8.members).replace(/{mention}/g, _0x494ca8.mention);
  }
  ["loadWelcomeData"]() {
    try {
      if (_cache_welcome_data) return _cache_welcome_data;
    } catch (_0x149756) {
      UltraCleanLogger.warning("Error loading welcome data: " + _0x149756.message);
    }
    return {
      groups: {},
      version: "1.0",
      created: new Date().toISOString()
    };
  }
  ["saveWelcomeData"](_0x4928be) {
    try {
      return (_0x4928be.updated = new Date().toISOString(), _cache_welcome_data = _0x4928be, _saveConfigCache("welcome_data", _0x4928be), true);
    } catch (_0x5673be) {
      return (UltraCleanLogger.warning('Error\x20saving\x20welcome\x20data:\x20' + _0x5673be.message), false);
    }
  }
  ["getStats"]() {
    let _0x562733 = 0;
    for (const _0x49aba1 of this.detectedMembers.values()) {
      _0x562733 += _0x49aba1.length;
    }
    return {
      enabled: this.enabled,
      totalGroups: this.detectedMembers.size,
      totalEvents: _0x562733,
      cachedGroups: this.groupMembersCache.size
    };
  }
}
const memberDetector = new NewMemberDetector();
globalThis._memberDetector = memberDetector;
class UltimateFixSystem {
  constructor() {
    (this.fixedJids = new Set(), this.fixApplied = false, this.restartFixAttempted = false);
  }
  async ["applyUltimateFix"](_0x38ce2e, _0x5a990f, _0x3d75c7, _0x55c1f9 = false, _0x512d44 = false) {
    try {
      const _0x4db5d2 = _0x512d44 ? "RESTART" : _0x55c1f9 ? "FIRST" : 'NORMAL', _0x1852fa = jidManager.isOwner;
      (jidManager.isOwner = function (_0xd0bcb) {
        try {
          const _0x6550a7 = _0xd0bcb?.key?.fromMe;
          if (_0x6550a7) return true;
          return ((!this.owner || !this.owner.cleanNumber) && this.loadOwnerDataFromFile(), _0x1852fa.call(this, _0xd0bcb));
        } catch {
          return _0xd0bcb?.key?.fromMe || false;
        }
      }, jidManager.loadOwnerDataFromFile = function () {
        return (this.loadOwnerData(), Boolean(this.owner));
      });
      const _0x2ebd24 = ownerIdentity(jidManager.owner?.cleanJid || _0x5a990f, OWNER_LID, _0x44c6f8 => lidPhoneCache.get(_0x44c6f8) || getPhoneFromLid(_0x44c6f8));
      return (global.OWNER_NUMBER = global.OWNER_CLEAN_NUMBER = _0x2ebd24.number, global.OWNER_JID = global.OWNER_CLEAN_JID = _0x2ebd24.jid, this.fixedJids.add(_0x5a990f), this.fixApplied = true, {
        success: true,
        jid: _0x3d75c7.cleanJid,
        number: _0x3d75c7.cleanNumber,
        isLid: _0x3d75c7.isLid,
        isRestart: _0x512d44
      });
    } catch (_0x2cb469) {
      return (UltraCleanLogger.error('Ultimate\x20Fix\x20failed:\x20' + _0x2cb469.message), {
        success: false,
        error: "Fix failed"
      });
    }
  }
  ['isFixNeeded'](_0x120096) {
    return !this.fixedJids.has(_0x120096);
  }
  ["shouldRunRestartFix"](_0x71a6b1) {
    const _0x125e9b = !!_cache_owner_data, _0x231d4c = this.isFixNeeded(_0x71a6b1), _0x369d61 = !this.restartFixAttempted;
    return _0x125e9b && _0x231d4c && _0x369d61 && RESTART_AUTO_FIX_ENABLED;
  }
  ['markRestartFixAttempted']() {
    this.restartFixAttempted = true;
  }
}
const ultimateFixSystem = new UltimateFixSystem();
class AutoConnectOnStart {
  constructor() {
    (this.hasRun = false, this.isEnabled = AUTO_CONNECT_ON_START);
  }
  async ["trigger"](_0x40fc2a) {
    try {
      if (!this.isEnabled || this.hasRun) {
        UltraCleanLogger.info("Auto-connect on start " + (this.hasRun ? "already ran" : 'disabled'));
        return;
      }
      if (!_0x40fc2a || !_0x40fc2a.user?.id) {
        UltraCleanLogger.error("No socket or user ID for auto-connect");
        return;
      }
      const _0x413b4e = _0x40fc2a.user.id, _0x42bd40 = jidManager.cleanJid(_0x413b4e), _0x3af8b9 = {
        key: {
          remoteJid: _0x413b4e,
          fromMe: true,
          id: "auto-start-" + Date.now(),
          participant: _0x413b4e
        },
        message: {
          conversation: ".connect"
        }
      };
      (await handleConnectCommand(_0x40fc2a, _0x3af8b9, [], _0x42bd40, {
        suppressLog: true
      }), this.hasRun = true, hasAutoConnectedOnStart = true);
    } catch (_0x81b899) {
      UltraCleanLogger.error("Auto-connect on start failed: " + _0x81b899.message);
    }
  }
  ["reset"]() {
    (this.hasRun = false, hasAutoConnectedOnStart = false);
  }
}
const autoConnectOnStart = new AutoConnectOnStart();
class AutoLinkSystem {
  constructor() {
    (this.linkAttempts = new Map(), this.MAX_ATTEMPTS = 3, this.autoConnectEnabled = AUTO_CONNECT_ON_LINK);
  }
  async ["shouldAutoLink"](_0x1c94ee, _0x5bfea7) {
    if (!AUTO_LINK_ENABLED || !_0x1c94ee?.user?.id || !_0x5bfea7?.key) return false;
    const _0x10cef3 = _0x1a2186 => lidPhoneCache.get(_0x1a2186) || getPhoneFromLid(_0x1a2186), _0x298595 = ownerIdentity(_0x1c94ee.user.id, _0x1c94ee.user.lid, _0x10cef3), _0x306bcd = ownerIdentity(_0x5bfea7.key.participant || _0x5bfea7.key.remoteJid, null, _0x10cef3), _0x271eab = _0x5bfea7.key.fromMe || _0x306bcd.jid && (_0x306bcd.jid === _0x298595.jid || _0x306bcd.jid === _0x298595.lid || _0x306bcd.number && _0x298595.number && _0x306bcd.number === _0x298595.number);
    if (!_0x271eab || jidManager.isOwner(_0x5bfea7)) return false;
    return jidManager.setNewOwner(_0x298595.jid, true, _0x298595.lid).success;
  }
  ["isSimilarNumber"](_0x291304, _0x29b986) {
    return Boolean(_0x291304 && _0x29b986 && _0x291304 === _0x29b986);
  }
  async ["autoLinkNewOwner"](_0x222853, _0x247a0e, _0x13a855, _0x2ce0e8 = false) {
    try {
      if (_0x247a0e?.includes('@lid')) await resolvePhoneFromLidAsync(_0x247a0e);
      const _0x9a2fba = jidManager.setNewOwner(_0x247a0e, true);
      if (!_0x9a2fba.success) return false;
      return (await this.sendImmediateSuccessMessage(_0x222853, _0x247a0e, _0x13a855, _0x2ce0e8), AUTO_ULTIMATE_FIX_ENABLED && setTimeout(async () => {
        await ultimateFixSystem.applyUltimateFix(_0x222853, _0x247a0e, _0x13a855, _0x2ce0e8);
      }, 1200), true);
    } catch {
      return false;
    }
  }
  async ["triggerAutoConnect"](_0x2a64c3, _0x24750e, _0x38706e, _0x22178f = false) {
    try {
      if (!this.autoConnectEnabled) {
        UltraCleanLogger.info("Auto-connect disabled, skipping for " + _0x38706e.cleanNumber);
        return;
      }
      (UltraCleanLogger.info(BRAND.LIGHTNING + " Auto-triggering connect command for " + _0x38706e.cleanNumber), await handleConnectCommand(_0x2a64c3, _0x24750e, [], _0x38706e));
    } catch (_0x10e97c) {
      UltraCleanLogger.error("Auto-connect failed: " + _0x10e97c.message);
    }
  }
  async ['sendImmediateSuccessMessage'](_0x2bee2f, _0xfaba1b, _0x131635, _0x437a74 = false) {
    try {
      const _0x4bbfe0 = new Date().toLocaleTimeString(), _0x315c75 = getCurrentPrefix(), _0x2808df = isPrefixless ? "none (prefixless)" : '\x22' + _0x315c75 + '\x22', _0x3452ad = new Date(), _0x5c8944 = _0x3452ad.getMonth() + 1, _0x51506d = _0x3452ad.getDate();
      let _0x8f5c51 = null;
      if (_0x5c8944 === 12 && _0x51506d >= 1 && _0x51506d <= 25) _0x8f5c51 = EPHOTO.CHRISTMAS + '\x20*MERRY\x20CHRISTMAS!*\x20' + EPHOTO.CHRISTMAS; else {
        if (_0x5c8944 === 12 && _0x51506d >= 26 && _0x51506d <= 30) _0x8f5c51 = '' + EPHOTO.CHRISTMAS + UI.CELEBRATE + " *MERRY CHRISTMAS AND HAPPY NEW YEAR!* " + UI.CELEBRATE + EPHOTO.CHRISTMAS; else _0x5c8944 === 1 && _0x51506d >= 1 && _0x51506d <= 5 && (_0x8f5c51 = UI.CELEBRATE + " *HAPPY NEW YEAR!* " + UI.CELEBRATE);
      }
      let _0x349d34 = _0x8f5c51 ? _0x8f5c51 + '\x0a\x0a' + STATUS.SUCCESS + '\x20*' + BOT_NAME.toUpperCase() + '\x20v' + VERSION + " CONNECTED!*\n\n" : STATUS.SUCCESS + '\x20*' + BOT_NAME.toUpperCase() + '\x20v' + VERSION + " CONNECTED!*\n\n";
      _0x437a74 ? _0x349d34 += UI.CELEBRATE + '\x20*FIRST\x20TIME\x20SETUP\x20COMPLETE!*\x0a\x0a' : _0x349d34 += UI.REFRESH + " *NEW OWNER LINKED!*\n\n";
      (_0x349d34 += UI.CLIPBOARD + " *YOUR INFORMATION:*\n", _0x349d34 += '┆ ✦ Your Number: +' + _0x131635.cleanNumber + '\x0a', _0x349d34 += "┆ ✦ Device Type: " + (_0x131635.isLid ? "Linked Device " + UI.LINK : "Regular Device " + MEDIA.PHONE) + '\x0a', _0x349d34 += '┆ ✦ JID: ' + _0x131635.cleanJid + '\x0a', _0x349d34 += "┆ ✦ Prefix: " + _0x2808df + '\x0a', _0x349d34 += '┆ ✦ Mode: ' + BOT_MODE + '\x0a', _0x349d34 += "╰┄ Status: " + STATUS.SUCCESS + " LINKED SUCCESSFULLY\n\n", _0x349d34 += BRAND.LIGHTNING + " *Background Processes:*\n", _0x349d34 += "┆ ✦ Ultimate Fix: Initializing...\n", _0x349d34 += '┆ ✦ Auto-Join: ' + (AUTO_JOIN_ENABLED ? "Initializing..." : "Disabled") + '\x0a', _0x349d34 += "┆ ✦ Member Detection: " + STATUS.SUCCESS + " ACTIVE\n", _0x349d34 += "╰┄ All systems: " + STATUS.SUCCESS + '\x20ACTIVE\x0a\x0a');
      !_0x437a74 && (_0x349d34 += STATUS.WARNING + "️ *Important:*\n", _0x349d34 += "• Previous owner data has been cleared\n", _0x349d34 += "• Only YOU can use owner commands now\n\n");
      _0x349d34 += UI.CELEBRATE + " *You're all set!* Bot is now ready to use.";
      const _0x186aad = PROFILE_URL;
      await _0x2bee2f.sendMessage(_0xfaba1b, {
        text: _0x349d34,
        contextInfo: {
          externalAdReply: {
            title: STATUS.STAR + '\x20Follow\x20on\x20GitHub',
            body: "github.com/" + OWNER,
            mediaType: 1,
            thumbnailUrl: AVATAR_URL,
            sourceUrl: _0x186aad,
            mediaUrl: _0x186aad,
            renderLargerThumbnail: false
          }
        }
      });
    } catch {}
  }
  async ['sendDeviceLinkedMessage'](_0x1ce655, _0x87056, _0x1f3f9c) {
    try {
      const _0x20ac2c = MEDIA.PHONE + " *Device Linked Successfully!*\n\n" + (STATUS.SUCCESS + " Your device has been added to owner devices.\n") + (STATUS.LOCKED + " You can now use owner commands from this device.\n") + (UI.REFRESH + " Ultimate Fix applied automatically in background.\n") + (UI.CELEBRATE + " All systems are now active and ready!");
      (await _0x1ce655.sendMessage(_0x87056, {
        text: _0x20ac2c
      }), UltraCleanLogger.info(MEDIA.PHONE + " Device linked message sent to " + _0x1f3f9c.cleanNumber));
    } catch {}
  }
}
const autoLinkSystem = new AutoLinkSystem(), memoryMonitor = {
  _interval: null,
  _trimInterval: null,
  _emergencyInterval: null,
  start() {
    if (this._interval) return;
    (this._lastMemWarn = 0, this._interval = setInterval(() => {
      try {
        const _0x217cc4 = Math.round(process.memoryUsage().rss / 1024 / 1024);
        if (_0x217cc4 > 200) {
          const _0x19291a = Date.now();
          (_0x19291a - this._lastMemWarn > 3 * 60 * 1000 && (UltraCleanLogger.warning("High memory: " + _0x217cc4 + "MB - trimming caches"), this._lastMemWarn = _0x19291a), setImmediate(() => this.trimCaches(_0x217cc4 > 400)));
        }
      } catch {}
    }, 30 * 1000), this._trimInterval = setInterval(() => {
      try {
        this.trimCaches(false);
      } catch {}
    }, 3 * 60 * 1000), this._lastEmergencyGCLog = 0, this._emergencyInterval = setInterval(() => {
      try {
        const _0x4b64bf = Math.round(process.memoryUsage().rss / 1024 / 1024);
        if (_0x4b64bf > 450) {
          global.gc && (global.gc(), global.gc());
          setImmediate(() => this.trimCaches(true));
          if (_0x4b64bf > 700) {
            const _0x2e7808 = Date.now();
            _0x2e7808 - this._lastEmergencyGCLog > 60 * 1000 && (UltraCleanLogger.warning("Emergency GC: " + _0x4b64bf + 'MB\x20-\x20forcing\x20collection'), this._lastEmergencyGCLog = _0x2e7808);
          }
        }
      } catch {}
    }, 10 * 1000));
  },
  stop() {
    (this._interval && (clearInterval(this._interval), this._interval = null), this._trimInterval && (clearInterval(this._trimInterval), this._trimInterval = null), this._emergencyInterval && (clearInterval(this._emergencyInterval), this._emergencyInterval = null));
  },
  trimCaches(_0x23bfab = false) {
    try {
      const _0x14f2db = (_0x34fbfb, _0x1aee85, _0x23f461, _0x42fbb8) => {
        if (!_0x34fbfb || _0x34fbfb.size <= _0x1aee85) return;
        const _0xf6e9dc = _0x34fbfb.size - _0x23f461;
        let _0x106929 = 0;
        for (const _0x2f2ec3 of _0x34fbfb.keys()) {
          if (_0x106929 >= _0xf6e9dc) break;
          (_0x34fbfb.delete(_0x2f2ec3), _0x106929++);
        }
        if (_0x42fbb8) UltraCleanLogger.info(_0x42fbb8 + " trimmed to " + _0x34fbfb.size + " entries");
      }, _0x5c3644 = Date.now();
      for (const [_0x3aa509, _0x3390c1] of groupMetadataCache) {
        if (_0x5c3644 - _0x3390c1.ts > GROUP_CACHE_TTL) groupMetadataCache.delete(_0x3aa509);
      }
      _capSet(groupDiagDone, MAX_GROUP_DIAG);
      const _0x2fc472 = _0x23bfab ? 0.4 : 1;
      (_0x14f2db(lidPhoneCache, Math.floor(300 * _0x2fc472), Math.floor(150 * _0x2fc472), "LID cache"), _0x14f2db(phoneLidCache, Math.floor(300 * _0x2fc472), Math.floor(150 * _0x2fc472), null), _0x14f2db(groupMetadataCache, Math.floor(20 * _0x2fc472), Math.floor(10 * _0x2fc472), "Group metadata cache"), _0x14f2db(global.contactNames, Math.floor(500 * _0x2fc472), Math.floor(200 * _0x2fc472), null));
      store && store.messages && _0x14f2db(store.messages, Math.floor(100 * _0x2fc472), Math.floor(50 * _0x2fc472), 'Message\x20store');
      store && store.sentMessages && _0x14f2db(store.sentMessages, Math.floor(80 * _0x2fc472), Math.floor(40 * _0x2fc472), null);
      (_0x14f2db(_lidResolveAttempts, 80, 40, null), _0x14f2db(_pendingGroupFetches, 20, 10, null));
      if (globalThis._antispamTracker instanceof Map && globalThis._antispamTracker.size > 0) {
        const _0x52661a = Date.now();
        for (const [_0x2a24cb, _0x6adbc8] of globalThis._antispamTracker.entries()) {
          const _0x101935 = _0x6adbc8?.lastTime || 0;
          if (_0x52661a - _0x101935 > 5 * 60 * 1000) globalThis._antispamTracker.delete(_0x2a24cb);
        }
        _0x14f2db(globalThis._antispamTracker, 1500, 750, null);
      }
      if (globalThis._memberDetector) {
        const _0x255258 = globalThis._memberDetector;
        (_0x255258.groupMembersCache instanceof Map && _0x255258.groupMembersCache.size > 150 && _0x14f2db(_0x255258.groupMembersCache, Math.floor(150 * _0x2fc472), Math.floor(75 * _0x2fc472), null), _0x255258.detectedMembers instanceof Map && _0x255258.detectedMembers.size > 100 && _0x14f2db(_0x255258.detectedMembers, Math.floor(100 * _0x2fc472), Math.floor(50 * _0x2fc472), null));
      }
      global.gc && global.gc();
    } catch {}
  }
};
let antideleteInitDone = false, statusAntideleteInitDone = false, antieditInitDone = false;
class RateLimitProtection {
  constructor() {
    (this.commandTimestamps = new Map(), this.userCooldowns = new Map(), this.globalCooldown = Date.now(), this.stickerSendTimes = new Map(), this._cleanupInterval = setInterval(() => this.cleanup(), 60000));
  }
  ['canSendCommand'](_0x355b70, _0x22e512, _0x35d466) {
    if (!RATE_LIMIT_ENABLED) return {
      allowed: true
    };
    const _0x101d48 = Date.now(), _0x1344a3 = _0x22e512 + '_' + _0x35d466, _0x417771 = _0x355b70 + '_' + _0x35d466;
    if (this.userCooldowns.has(_0x1344a3)) {
      const _0x90aeff = this.userCooldowns.get(_0x1344a3), _0x1199fc = _0x101d48 - _0x90aeff;
      if (_0x1199fc < MIN_COMMAND_DELAY) {
        const _0x243fa6 = Math.ceil((MIN_COMMAND_DELAY - _0x1199fc) / 1000);
        return {
          allowed: false,
          reason: "Please wait " + _0x243fa6 + "s before using " + _0x35d466 + " again."
        };
      }
    }
    if (this.commandTimestamps.has(_0x417771)) {
      const _0x2e58ee = this.commandTimestamps.get(_0x417771), _0xa42445 = _0x101d48 - _0x2e58ee;
      if (_0xa42445 < MIN_COMMAND_DELAY) {
        const _0xf32c40 = Math.ceil((MIN_COMMAND_DELAY - _0xa42445) / 1000);
        return {
          allowed: false,
          reason: "Command cooldown: " + _0xf32c40 + 's\x20remaining.'
        };
      }
    }
    if (_0x101d48 - this.globalCooldown < 10) return {
      allowed: false,
      reason: "System is busy. Please try again in a moment."
    };
    return (this.userCooldowns.set(_0x1344a3, _0x101d48), this.commandTimestamps.set(_0x417771, _0x101d48), this.globalCooldown = _0x101d48, {
      allowed: true
    });
  }
  async ['waitForSticker'](_0x12122e) {
    if (!RATE_LIMIT_ENABLED) {
      await this.delay(STICKER_DELAY);
      return;
    }
    const _0x5d0cf0 = Date.now(), _0x1fccc5 = this.stickerSendTimes.get(_0x12122e) || 0, _0x4ca5b9 = _0x5d0cf0 - _0x1fccc5;
    if (_0x4ca5b9 < STICKER_DELAY) {
      const _0x391707 = STICKER_DELAY - _0x4ca5b9;
      await this.delay(_0x391707);
    }
    this.stickerSendTimes.set(_0x12122e, Date.now());
  }
  ["delay"](_0x53a235) {
    return new Promise(_0x52759b => setTimeout(_0x52759b, _0x53a235));
  }
  ["cleanup"]() {
    const _0x262862 = Date.now(), _0x3f7b5c = 5 * 60 * 1000;
    for (const [_0x39e55a, _0x57dd51] of this.userCooldowns.entries()) {
      _0x262862 - _0x57dd51 > _0x3f7b5c && this.userCooldowns.delete(_0x39e55a);
    }
    for (const [_0x3c33d6, _0x125d62] of this.commandTimestamps.entries()) {
      _0x262862 - _0x125d62 > _0x3f7b5c && this.commandTimestamps.delete(_0x3c33d6);
    }
    for (const [_0x49e10b, _0x2e5cfa] of this.stickerSendTimes.entries()) {
      _0x262862 - _0x2e5cfa > _0x3f7b5c && this.stickerSendTimes.delete(_0x49e10b);
    }
  }
}
const rateLimiter = new RateLimitProtection();
class StatusDetector {
  constructor() {
    (this.detectionEnabled = true, this.statusLogs = [], this.lastDetection = null, this.setupDataDir(), this.loadStatusLogs(), globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.statusDetector = true);
  }
  ["setupDataDir"]() {
    try {
      !_0x32ecad.existsSync("./data") && _0x32ecad.mkdirSync('./data', {
        recursive: true
      });
    } catch (_0x335e18) {
      UltraCleanLogger.error("Error setting up data directory: " + _0x335e18.message);
    }
  }
  ["loadStatusLogs"]() {
    try {
      if (_cache_status_logs) {
        const _0x32bf9f = _cache_status_logs;
        Array.isArray(_0x32bf9f.logs) && (this.statusLogs = _0x32bf9f.logs.slice(-100));
        return;
      }
      _0x327500.getConfig("status_detection_logs", {}).then(_0x207d6e => {
        try {
          (_cache_status_logs = _0x207d6e, _0x207d6e && Array.isArray(_0x207d6e.logs) && (this.statusLogs = _0x207d6e.logs.slice(-100)));
        } catch {}
      }).catch(() => {});
    } catch (_0x54666f) {}
  }
  ['saveStatusLogs']() {
    try {
      const _0x8df1bf = {
        logs: this.statusLogs.slice(-1000),
        updatedAt: new Date().toISOString(),
        count: this.statusLogs.length
      };
      (_cache_status_logs = _0x8df1bf, _0x327500.setConfig('status_detection_logs', _0x8df1bf).catch(() => {}));
    } catch (_0x1dab70) {}
  }
  async ["detectStatusUpdate"](_0x10cd72) {
    try {
      if (!this.detectionEnabled) return null;
      const _0x2b0957 = _0x10cd72.key.participant || "unknown", _0x44907a = _0x2b0957.split('@')[0], _0x2692b9 = _0x10cd72.messageTimestamp || Date.now(), _0x2b1991 = new Date(_0x2692b9 * 1000).toLocaleTimeString(), _0x3d9473 = this.extractStatusInfo(_0x10cd72);
      this.showDetectionMessage(_0x44907a, _0x2b1991, _0x3d9473);
      const _0x168d46 = {
        sender: _0x44907a,
        fullSender: _0x2b0957,
        type: _0x3d9473.type,
        caption: _0x3d9473.caption,
        fileInfo: _0x3d9473.fileInfo,
        postedAt: _0x2b1991,
        detectedAt: new Date().toLocaleTimeString(),
        timestamp: Date.now()
      };
      return (this.statusLogs.push(_0x168d46), this.lastDetection = _0x168d46, this.statusLogs.length % 5 === 0 && this.saveStatusLogs(), _0x168d46);
    } catch (_0x3f7dd3) {
      return null;
    }
  }
  ["extractStatusInfo"](_0x13efe1) {
    try {
      const _0x4d08e7 = _0x13efe1.message;
      let _0x3d5b71 = "unknown", _0x4374bb = '', _0x4d7333 = '';
      if (_0x4d08e7.imageMessage) {
        (_0x3d5b71 = "image", _0x4374bb = _0x4d08e7.imageMessage.caption || '');
        const _0x2080b0 = Math.round((_0x4d08e7.imageMessage.fileLength || 0) / 1024);
        _0x4d7333 = MEDIA.IMAGE + '️\x20' + _0x4d08e7.imageMessage.width + 'x' + _0x4d08e7.imageMessage.height + " | " + _0x2080b0 + 'KB';
      } else {
        if (_0x4d08e7.videoMessage) {
          (_0x3d5b71 = 'video', _0x4374bb = _0x4d08e7.videoMessage.caption || '');
          const _0x5014d9 = Math.round((_0x4d08e7.videoMessage.fileLength || 0) / 1024), _0x556e72 = _0x4d08e7.videoMessage.seconds || 0;
          _0x4d7333 = MEDIA.VIDEO + '\x20' + _0x556e72 + "s | " + _0x5014d9 + 'KB';
        } else {
          if (_0x4d08e7.audioMessage) {
            _0x3d5b71 = "audio";
            const _0x564ae9 = Math.round((_0x4d08e7.audioMessage.fileLength || 0) / 1024), _0x234ddc = _0x4d08e7.audioMessage.seconds || 0;
            _0x4d7333 = MEDIA.MUSIC + '\x20' + _0x234ddc + 's\x20|\x20' + _0x564ae9 + 'KB';
          } else {
            if (_0x4d08e7.extendedTextMessage) (_0x3d5b71 = 'text', _0x4374bb = _0x4d08e7.extendedTextMessage.text || ''); else {
              if (_0x4d08e7.conversation) (_0x3d5b71 = "text", _0x4374bb = _0x4d08e7.conversation); else _0x4d08e7.stickerMessage && (_0x3d5b71 = "sticker", _0x4d7333 = LIB.X_RAY + " Sticker");
            }
          }
        }
      }
      return {
        type: _0x3d5b71,
        caption: _0x4374bb.substring(0, 100),
        fileInfo: _0x4d7333
      };
    } catch (_0x37887f) {
      return {
        type: "unknown",
        caption: '',
        fileInfo: ''
      };
    }
  }
  ["getStats"]() {
    return {
      totalDetected: this.statusLogs.length,
      lastDetection: this.lastDetection ? this.lastDetection.sender + " - " + this.getTimeAgo(this.lastDetection.timestamp) : "None",
      detectionEnabled: this.detectionEnabled
    };
  }
  ["getTimeAgo"](_0x4e492b) {
    const _0x3571b5 = Date.now(), _0x333b4a = _0x3571b5 - _0x4e492b, _0x2ad075 = Math.floor(_0x333b4a / 60000);
    if (_0x2ad075 < 1) return "Just now";
    if (_0x2ad075 < 60) return _0x2ad075 + 'm\x20ago';
    const _0x36654c = Math.floor(_0x2ad075 / 60);
    if (_0x36654c < 24) return _0x36654c + "h ago";
    const _0x4df622 = Math.floor(_0x36654c / 24);
    return _0x4df622 + "d ago";
  }
}
let statusDetector = null;
function isUserBlocked(_0x50ea88) {
  try {
    const _0x1abfa8 = _cache_blocked_users?.blocked;
    if (!Array.isArray(_0x1abfa8) || _0x1abfa8.length === 0) return false;
    const _0x59a4ef = _0x50ea88.split(':')[0].split('@')[0];
    return _0x1abfa8.some(_0x4430b7 => {
      if (_0x4430b7 === _0x50ea88) return true;
      const _0x5ae39f = _0x4430b7.split(':')[0].split('@')[0];
      return _0x5ae39f === _0x59a4ef;
    });
  } catch {
    return false;
  }
}
(globalThis.addBlockedUser = function (_0x3b2f8a) {
  const _0x321777 = _0x3b2f8a.split(':')[0].split('@')[0], _0x140b84 = _0x321777 + '@s.whatsapp.net';
  if (!_cache_blocked_users) _cache_blocked_users = {
    blocked: []
  };
  if (!Array.isArray(_cache_blocked_users.blocked)) _cache_blocked_users.blocked = [];
  if (!_cache_blocked_users.blocked.includes(_0x140b84)) {
    (_cache_blocked_users.blocked.push(_0x140b84), _saveConfigCache("blocked_users", _cache_blocked_users));
    try {
      _0x32ecad.writeFileSync(BLOCKED_USERS_FILE, JSON.stringify(_cache_blocked_users, null, 2));
    } catch {}
  }
}, globalThis.removeBlockedUser = function (_0x24cbdf) {
  const _0x3f451c = _0x24cbdf.split(':')[0].split('@')[0];
  if (!_cache_blocked_users || !Array.isArray(_cache_blocked_users.blocked)) return;
  (_cache_blocked_users.blocked = _cache_blocked_users.blocked.filter(_0x5b10d6 => {
    const _0xb86eab = _0x5b10d6.split(':')[0].split('@')[0];
    return _0xb86eab !== _0x3f451c;
  }), _saveConfigCache("blocked_users", _cache_blocked_users));
  try {
    _0x32ecad.writeFileSync(BLOCKED_USERS_FILE, JSON.stringify(_cache_blocked_users, null, 2));
  } catch {}
}, globalThis.getBotBlocklist = function () {
  return (_cache_blocked_users?.blocked || []).map(_0x24265c => _0x24265c.split('@')[0]);
});
function getEffectiveAccessMode() {
  let _0x2afcbd;
  try {
    _0x2afcbd = JSON.parse(_0x32ecad.readFileSync(new URL('./bot_mode.json', import.meta.url), "utf8"));
  } catch {}
  return selectAccessMode(_cache_bot_mode, _0x2afcbd, BOT_MODE || process.env.BOT_MODE || "silent");
}
globalThis.getBotAccessState = () => ({
  mode: getEffectiveAccessMode(),
  guard: 'verified-v3'
});
function checkBotMode(_0x1e94b8, _0xd64a57, _0x5e6cfe = false, _0x36a8e0 = null) {
  try {
    const _0x14f308 = _0x36a8e0 === null ? jidManager.isOwner(_0x1e94b8) : _0x36a8e0 === true, _0x5b061c = _0x36a8e0 === null ? jidManager.isSudo(_0x1e94b8) : _0x5e6cfe === true;
    if (_0x14f308 || _0x5b061c) return true;
    const _0x34bb86 = getEffectiveAccessMode();
    if (getSudoMode()) return false;
    const _0x5255f1 = _0x1e94b8.key.remoteJid.endsWith("@g.us");
    switch (_0x34bb86) {
      case 'public':
      case "buttons":
      case 'channel':
        return true;
      case "groups":
        return _0x5255f1;
      case 'dms':
        return !_0x5255f1;
      case "silent":
        return false;
      default:
        return false;
    }
  } catch {
    return false;
  }
}
function isPresenceEnabled() {
  try {
    const _0x45795f = JSON.parse(_0x32ecad.readFileSync("./data/presence/config.json", "utf8"));
    return _0x45795f?.enabled === true;
  } catch {
    return false;
  }
}
function startHeartbeat(_0x18f123) {
  (heartbeatInterval && clearInterval(heartbeatInterval), heartbeatInterval = setInterval(() => {
    if (isConnected && _0x18f123 && isPresenceEnabled()) {
      const _0x711a15 = new Promise((_0x4d3d11, _0x2b9b2f) => setTimeout(() => _0x2b9b2f(new Error("timeout")), 5000));
      Promise.race([_0x18f123.sendPresenceUpdate("available"), _0x711a15]).then(() => {
        lastActivityTime = Date.now();
      }).catch(() => {});
    }
  }, 60 * 1000));
}
function stopHeartbeat() {
  heartbeatInterval && (clearInterval(heartbeatInterval), heartbeatInterval = null);
}
function ensureSessionDir() {
  !_0x32ecad.existsSync(SESSION_DIR) && _0x32ecad.mkdirSync(SESSION_DIR, {
    recursive: true
  });
}
function cleanSession(_0x233a77 = false) {
  try {
    if (_0x233a77 && _0x32ecad.existsSync(SESSION_DIR)) {
      const _0x2becfc = "./session_backup";
      !_0x32ecad.existsSync(_0x2becfc) && _0x32ecad.mkdirSync(_0x2becfc, {
        recursive: true
      });
      const _0x539604 = _0x32ecad.readdirSync(SESSION_DIR);
      for (const _0x314b5b of _0x539604) {
        const _0x33bb4e = _0x40e1ec.join(SESSION_DIR, _0x314b5b), _0x9fa362 = _0x40e1ec.join(_0x2becfc, _0x314b5b);
        _0x32ecad.copyFileSync(_0x33bb4e, _0x9fa362);
      }
      UltraCleanLogger.info(UI.FOLDER + " Existing session backed up");
    }
    _0x32ecad.existsSync(SESSION_DIR) && _0x32ecad.rmSync(SESSION_DIR, {
      recursive: true,
      force: true
    });
    const _0x11eeca = "./.session_id_hash";
    if (_0x32ecad.existsSync(_0x11eeca)) try {
      _0x32ecad.unlinkSync(_0x11eeca);
    } catch {}
    try {
      const _0x438ff6 = _0x327500.getClient();
      try {
        _0x438ff6.prepare("DELETE FROM session_keys").run();
      } catch {}
      try {
        _0x438ff6.prepare("DELETE FROM session_creds").run();
      } catch {}
      UltraCleanLogger.info(UI.TRASH + '️\x20\x20DB\x20session\x20tables\x20cleared');
    } catch (_0x1d0844) {
      UltraCleanLogger.warning("DB session clear warning: " + _0x1d0844.message);
    }
    if (_0x233a77) {
      const _0x5ce43e = "./session_backup";
      if (_0x32ecad.existsSync(_0x5ce43e)) {
        !_0x32ecad.existsSync(SESSION_DIR) && _0x32ecad.mkdirSync(SESSION_DIR, {
          recursive: true
        });
        const _0x20a600 = _0x32ecad.readdirSync(_0x5ce43e);
        for (const _0x6cb9c0 of _0x20a600) {
          const _0x507caa = _0x40e1ec.join(_0x5ce43e, _0x6cb9c0), _0x1afd48 = _0x40e1ec.join(SESSION_DIR, _0x6cb9c0);
          _0x32ecad.copyFileSync(_0x507caa, _0x1afd48);
        }
        (_0x32ecad.rmSync(_0x5ce43e, {
          recursive: true,
          force: true
        }), UltraCleanLogger.info(UI.FOLDER + " Session restored from backup"));
      }
    }
    return true;
  } catch (_0x9807d9) {
    return (UltraCleanLogger.error("Session cleanup error: " + _0x9807d9.message), false);
  }
}
class MessageStore {
  constructor() {
    (this.messages = new Map(), this.maxMessages = 150, this.sentMessages = new Map(), this.maxSentMessages = 100);
  }
  ['addMessage'](_0x41bf15, _0x4ddc88, _0x282a71) {
    try {
      const _0x3b3eeb = _0x41bf15 + '|' + _0x4ddc88;
      this.messages.set(_0x3b3eeb, _0x282a71);
      if (this.messages.size > this.maxMessages) {
        const _0x23da25 = this.messages.keys().next().value;
        this.messages.delete(_0x23da25);
      }
    } catch {}
  }
  ["addSentMessage"](_0x448316, _0x4d5f96, _0x226ff8) {
    try {
      const _0x142ab8 = _0x448316 + '|' + _0x4d5f96;
      this.sentMessages.set(_0x142ab8, _0x226ff8);
      if (this.sentMessages.size > this.maxSentMessages) {
        const _0x421c2c = this.sentMessages.keys().next().value;
        this.sentMessages.delete(_0x421c2c);
      }
    } catch {}
  }
  ['getMessage'](_0x360c9f, _0x124876) {
    try {
      const _0x574579 = _0x360c9f + '|' + _0x124876, _0x146162 = this.messages.get(_0x574579);
      if (_0x146162) return _0x146162;
      const _0x7ba83d = this.sentMessages.get(_0x574579);
      if (_0x7ba83d) return {
        message: _0x7ba83d
      };
      return null;
    } catch {
      return null;
    }
  }
}
const commands = new Map(), commandCategories = new Map();
function getRegisteredCommandCount() {
  return new Set([...commands.values()].map(_0x182dec => _0x182dec?.name?.toLowerCase()).filter(Boolean)).size;
}
async function loadCommandsFromFolder(_0x39f4de, _0x347189 = 'general') {
  const _0x46eb8c = _0x40e1ec.resolve(_0x39f4de);
  if (!_0x32ecad.existsSync(_0x46eb8c)) return;
  try {
    const _0x46df8b = _0x32ecad.readdirSync(_0x46eb8c);
    let _0x218bf5 = 0;
    for (const _0x3339c9 of _0x46df8b) {
      const _0x13140f = _0x40e1ec.join(_0x46eb8c, _0x3339c9), _0x159da3 = _0x32ecad.statSync(_0x13140f);
      if (_0x159da3.isDirectory()) await loadCommandsFromFolder(_0x13140f, _0x3339c9); else {
        if (_0x3339c9.endsWith(".js")) try {
          if (_0x3339c9.includes(".test.") || _0x3339c9.includes(".disabled.")) continue;
          const _0x4ed6e5 = await import("file://" + _0x13140f), _0x34433b = _0x4ed6e5.default || _0x4ed6e5;
          if (_0x34433b && _0x34433b.name) {
            (_0x34433b.category = _0x347189, commands.set(_0x34433b.name.toLowerCase(), _0x34433b));
            !commandCategories.has(_0x347189) && commandCategories.set(_0x347189, []);
            (commandCategories.get(_0x347189).push(_0x34433b.name), _0x218bf5++);
            const _0x33a38e = Array.isArray(_0x34433b.alias) ? _0x34433b.alias : Array.isArray(_0x34433b.aliases) ? _0x34433b.aliases : [];
            _0x33a38e.forEach(_0x182f03 => {
              commands.set(_0x182f03.toLowerCase(), _0x34433b);
            });
          }
        } catch {}
      }
    }
    if (_0x218bf5 > 0) {}
  } catch {}
}
function checkSessionValidity() {
  try {
    const _0x50f609 = _0x40e1ec.join(SESSION_DIR, "creds.json");
    if (!_0x32ecad.existsSync(_0x50f609)) return {
      valid: false,
      reason: "No session file"
    };
    const _0x3f6d08 = JSON.parse(_0x32ecad.readFileSync(_0x50f609, "utf8")), _0x1b0b5d = ['noiseKey', "signedIdentityKey", "pairingEphemeralKeyPair"];
    for (const _0x2d444c of _0x1b0b5d) {
      if (!_0x3f6d08[_0x2d444c]) return {
        valid: false,
        reason: "Missing field: " + _0x2d444c
      };
    }
    const _0x3ca758 = Date.now() - (_0x3f6d08.registrationId || 0), _0x49ffd4 = 90 * 24 * 60 * 60 * 1000;
    if (_0x3ca758 > _0x49ffd4) return {
      valid: false,
      reason: "Session expired"
    };
    return {
      valid: true,
      data: _0x3f6d08
    };
  } catch (_0x30afb5) {
    return {
      valid: false,
      reason: "Error: " + _0x30afb5.message
    };
  }
}
function parseWolfBotSession(_0x579e92) {
  try {
    let _0x135ff7 = _0x579e92.trim();
    _0x135ff7 = _0x135ff7.replace(/^["']|["']$/g, '');
    const _0x5f4e2b = _0x135ff7.startsWith("VIPBOT:") ? "VIPBOT:" : _0x135ff7.startsWith("WOLF-BOT:") ? "WOLF-BOT:" : null;
    if (_0x5f4e2b) {
      UltraCleanLogger.info(UI.SEARCH + " Detected " + _0x5f4e2b + " prefix");
      let _0x492865 = _0x135ff7.substring(_0x5f4e2b.length).trim();
      _0x492865 = _0x492865.replace(/^~+/, '');
      if (!_0x492865) throw new Error('No\x20data\x20found\x20after\x20' + _0x5f4e2b);
      try {
        const _0x16bf8d = Buffer.from(_0x492865, "base64").toString("utf8");
        return JSON.parse(_0x16bf8d);
      } catch (_0x140ca1) {
        return JSON.parse(_0x492865);
      }
    }
    try {
      const _0x2a016a = Buffer.from(_0x135ff7, 'base64').toString("utf8");
      return JSON.parse(_0x2a016a);
    } catch (_0x16a36a) {
      return JSON.parse(_0x135ff7);
    }
  } catch (_0x2957b7) {
    return (UltraCleanLogger.error(STATUS.ERROR + " Failed to parse session:", _0x2957b7.message), null);
  }
}
function setupHerokuSession() {
  try {
    const _0x1061e2 = process.env.SESSION_ID;
    if (_0x1061e2 && _0x1061e2.trim() !== '') {
      UltraCleanLogger.success(UI.ROCKET + '\x20Detected\x20Heroku\x20deployment\x20with\x20SESSION_ID');
      const _0x1a9c4b = _0x1061e2.startsWith("VIPBOT:") ? "VIPBOT:" : _0x1061e2.startsWith("WOLF-BOT:") ? "WOLF-BOT:" : null;
      if (_0x1a9c4b) {
        UltraCleanLogger.info(STATUS.LOCK_WITH_KEY + " Processing " + _0x1a9c4b.slice(0, -1) + " session format...");
        try {
          const _0x513e08 = _0x1061e2.substring(_0x1a9c4b.length).trim().replace(/^~+/, ''), _0x55d632 = Buffer.from(_0x513e08, "base64").toString("utf8"), _0x4b40c7 = JSON.parse(_0x55d632);
          ensureSessionDir();
          const _0x262be6 = _0x40e1ec.join(SESSION_DIR, "creds.json");
          return (_0x32ecad.writeFileSync(_0x262be6, JSON.stringify(_0x4b40c7, null, 2)), UltraCleanLogger.success(UI.SAVE + " Heroku session saved to: " + _0x262be6), process.env.HEROKU_DEPLOYMENT = 'true', process.env.AUTO_START = "true", true);
        } catch (_0x3755f8) {
          return (UltraCleanLogger.error(STATUS.ERROR + " Failed to parse Heroku session: " + _0x3755f8.message), false);
        }
      } else {
        UltraCleanLogger.info(STATUS.LOCK_WITH_KEY + " Processing raw session string...");
        try {
          const _0x19f5ec = JSON.parse(_0x1061e2);
          ensureSessionDir();
          const _0x194872 = _0x40e1ec.join(SESSION_DIR, "creds.json");
          return (_0x32ecad.writeFileSync(_0x194872, JSON.stringify(_0x19f5ec, null, 2)), UltraCleanLogger.success(UI.SAVE + " Heroku session saved to: " + _0x194872), process.env.HEROKU_DEPLOYMENT = "true", process.env.AUTO_START = "true", true);
        } catch (_0x4a51dd) {
          UltraCleanLogger.warning('JSON\x20parse\x20failed,\x20trying\x20base64:\x20' + _0x4a51dd.message);
          try {
            const _0x19bc10 = Buffer.from(_0x1061e2, 'base64').toString('utf8'), _0x458b66 = JSON.parse(_0x19bc10);
            ensureSessionDir();
            const _0x30525b = _0x40e1ec.join(SESSION_DIR, "creds.json");
            return (_0x32ecad.writeFileSync(_0x30525b, JSON.stringify(_0x458b66, null, 2)), UltraCleanLogger.success(UI.SAVE + " Heroku session saved (base64): " + _0x30525b), process.env.HEROKU_DEPLOYMENT = "true", process.env.AUTO_START = "true", true);
          } catch (_0x514cef) {
            return (UltraCleanLogger.error(STATUS.ERROR + " All Heroku session parsing attempts failed"), false);
          }
        }
      }
    }
    return false;
  } catch (_0x197cbd) {
    return (UltraCleanLogger.error("Heroku setup error: " + _0x197cbd.message), false);
  }
}
function setupHerokuHealthCheck() {
  UltraCleanLogger.info(SOCIAL.GLOBE + " Health check endpoint served by webServer.js — no duplicate server needed");
}
function setupHerokuKeepAlive() {
  const _0x1631c1 = !!(process.env.HEROKU || process.env.DYNO);
  if (_0x1631c1) {
    UltraCleanLogger.info(UI.TOOL + " Setting up Heroku keep-alive system...");
    let _0x449935 = 0;
    const _0x174d6b = 5;
    (setInterval(() => {
      lastActivityTime = Date.now();
      const _0x151d1f = process.env.HEROKU_URL || process.env.APP_URL || process.env.RENDER_EXTERNAL_URL;
      _0x151d1f && fetch(_0x151d1f.startsWith('http') ? _0x151d1f : "https://" + _0x151d1f, {
        signal: AbortSignal.timeout(10000)
      }).catch(() => {});
    }, 20 * 60 * 1000), setInterval(() => {
      const _0x3ba5f4 = process.memoryUsage(), _0x21ea6b = Math.round(_0x3ba5f4.rss / 1024 / 1024);
      _0x21ea6b > 300 && (UltraCleanLogger.warning(STATUS.WARNING + '️\x20High\x20memory\x20usage:\x20' + _0x21ea6b + 'MB'), memoryMonitor.trimCaches(_0x21ea6b > 400), global.gc && setImmediate(() => {
        try {
          global.gc({
            type: 'minor'
          });
        } catch {
          try {
            global.gc();
          } catch {}
        }
      }));
    }, 5 * 60 * 1000));
  }
}
async function authenticateWithSessionId(_0x160bde) {
  try {
    UltraCleanLogger.info(UI.REFRESH + " Processing Session ID...");
    const _0x43be23 = parseWolfBotSession(_0x160bde);
    if (!_0x43be23) throw new Error("Could not parse session data");
    !_0x32ecad.existsSync(SESSION_DIR) && (_0x32ecad.mkdirSync(SESSION_DIR, {
      recursive: true
    }), UltraCleanLogger.info(UI.FOLDER + '\x20Created\x20session\x20directory'));
    const _0xa252c3 = _0x40e1ec.join(SESSION_DIR, "creds.json");
    (_0x32ecad.writeFileSync(_0xa252c3, JSON.stringify(_0x43be23, null, 2)), UltraCleanLogger.success(UI.SAVE + '\x20Session\x20saved\x20to\x20session/creds.json'));
    try {
      const _0xac7918 = _0x40e1ec.join(process.cwd(), ".env");
      if (_0x32ecad.existsSync(_0xac7918)) {
        const _0x5c0c81 = _0x32ecad.readFileSync(_0xac7918, 'utf8');
        !_0x5c0c81.includes('SESSION_ID=') && (_0x32ecad.appendFileSync(_0xac7918, "\nSESSION_ID=" + _0x160bde + '\x0a'), UltraCleanLogger.info(UI.NOTE + " Added SESSION_ID to .env file"));
      }
    } catch (_0x517a2d) {}
    return true;
  } catch (_0x299cf1) {
    UltraCleanLogger.error(STATUS.ERROR + '\x20Session\x20authentication\x20failed:', _0x299cf1.message);
    throw _0x299cf1;
  }
}
class LoginManager {
  constructor() {
    this.rl = _0x293f56.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  async ["selectMode"]() {
    (globalThis._wolfStartupPhase = false, printWolfBootSequence());
    const _0x3475a4 = "\u001b[38;2;0;255;156m", _0x1f1d14 = "\u001b[38;2;34;193;255m", _0x22c9d5 = "\u001b[38;2;250;204;21m", _0x3610f8 = '\x1b[2m\x1b[38;2;100;120;130m', _0x438254 = "\u001b[38;2;200;215;225m", _0xfe7835 = '\x1b[0m', _0x451f9b = _getTime();
    (process.stdout.write('\x0a' + _0x3475a4 + "╭┄〔 " + UI.BRAIN + " VIPBOT AUTH 〕┄╮" + _0xfe7835 + '\x0a\x0a'), process.stdout.write(_0x1f1d14 + "[VIPBOT-AUTH]" + _0xfe7835 + '\x20' + _0x3610f8 + UI.TIMER + '️\x20\x20' + _0x451f9b + _0xfe7835 + '\x0a'), process.stdout.write(_0x3475a4 + '✦\x2001\x20' + _0x3610f8 + '→' + _0xfe7835 + '\x20' + _0x438254 + "Pairing Code Login     " + _0x22c9d5 + '⟪Recommended⟫' + _0xfe7835 + '\x0a'), process.stdout.write(_0x3475a4 + '✦\x2002\x20' + _0x3610f8 + '→' + _0xfe7835 + '\x20' + _0x438254 + 'Clean\x20Session\x20Reset\x20\x20\x20\x20' + _0x22c9d5 + "⟪Fresh Boot⟫" + _0xfe7835 + '\x0a'), process.stdout.write(_0x3475a4 + "✦ 03 " + _0x3610f8 + '→' + _0xfe7835 + '\x20' + _0x438254 + 'ENV\x20Session\x20Injection\x20\x20' + _0x22c9d5 + "⟪Advanced⟫" + _0xfe7835 + '\x0a\x0a'), process.stdout.write('' + _0x22c9d5 + BRAND.LIGHTNING + " INPUT REQUIRED ▸ Select [1-3] ⟶ (default: 1): " + _0xfe7835));
    const _0x4f2a75 = await this.ask('');
    switch (_0x4f2a75.trim()) {
      case '1':
        return await this.pairingCodeMode();
      case '2':
        return await this.cleanStartMode();
      case '3':
        return await this.sessionIdMode();
      default:
        return await this.pairingCodeMode();
    }
  }
  async ["sessionIdMode"]() {
    const _0x1572cd = "\u001b[38;2;0;255;156m", _0x3f5bbf = '\x1b[38;2;180;0;255m', _0x4472d9 = '\x1b[1m\x1b[38;2;180;0;255m', _0xf1df1a = '\x1b[38;2;250;204;21m', _0x799d1b = "\u001b[38;2;255;60;80m", _0x2362a9 = "\u001b[2m\u001b[38;2;100;120;130m", _0xa89f11 = '\x1b[38;2;200;215;225m', _0x1dd5df = "\u001b[0m", _0x343571 = () => _getTime();
    (process.stdout.write('\x0a' + _0x4472d9 + "╭┄〔 " + STATUS.LOCK_WITH_KEY + " SESSION ID LOGIN 〕┄╮" + _0x1dd5df + '\x0a\x0a'), process.stdout.write(_0x3f5bbf + '[VIPBOT-AUTH]' + _0x1dd5df + '\x20' + _0x2362a9 + UI.TIMER + "️  " + _0x343571() + _0x1dd5df + '\x0a'));
    let _0x5187a2 = process.env.SESSION_ID;
    if (!_0x5187a2 || _0x5187a2.trim() === '') {
      (process.stdout.write(_0xf1df1a + "▸ ℹ️  No SESSION_ID found in environment" + _0x1dd5df + '\x0a\x0a'), process.stdout.write(_0x1572cd + "✦ 01 " + _0x2362a9 + '→' + _0x1dd5df + '\x20' + _0xa89f11 + 'Paste\x20Session\x20ID\x20now' + _0x1dd5df + '\x0a'), process.stdout.write(_0x1572cd + "✦ 02 " + _0x2362a9 + '→' + _0x1dd5df + '\x20' + _0xa89f11 + "Go back to main menu" + _0x1dd5df + '\x0a\x0a'), process.stdout.write('' + _0xf1df1a + BRAND.LIGHTNING + " Choose [1-2] ⟶ " + _0x1dd5df));
      const _0x4b2ff8 = await this.ask('');
      if (_0x4b2ff8.trim() === '1') {
        (process.stdout.write('\x0a' + _0x3f5bbf + '[VIPBOT-AUTH]' + _0x1dd5df + '\x20' + _0x2362a9 + UI.TIMER + "️  " + _0x343571() + _0x1dd5df + '\x0a'), process.stdout.write('' + _0xf1df1a + BRAND.LIGHTNING + '\x20Paste\x20Session\x20ID\x20⟶\x20' + _0x1dd5df), _0x5187a2 = await this.ask(''));
        if (!_0x5187a2 || _0x5187a2.trim() === '') return (process.stdout.write('\x0a' + _0x799d1b + '▸\x20' + STATUS.ERROR + '\x20No\x20Session\x20ID\x20provided' + _0x1dd5df + '\x0a\x0a'), await this.selectMode());
        process.stdout.write('\x0a' + _0x1572cd + '▸\x20' + STATUS.SUCCESS + " Session ID received" + _0x1dd5df + '\x0a\x0a');
      } else return await this.selectMode();
    } else {
      (process.stdout.write(_0x1572cd + '▸\x20' + STATUS.SUCCESS + " Found Session ID in environment" + _0x1dd5df + '\x0a\x0a'), process.stdout.write('' + _0xf1df1a + BRAND.LIGHTNING + '\x20Use\x20existing\x20Session\x20ID?\x20(y/n,\x20default\x20y)\x20⟶\x20' + _0x1dd5df));
      const _0x41bc03 = await this.ask('');
      if (_0x41bc03.toLowerCase() === 'n') {
        process.stdout.write('' + _0xf1df1a + BRAND.LIGHTNING + '\x20Enter\x20new\x20Session\x20ID\x20⟶\x20' + _0x1dd5df);
        const _0xb3403c = await this.ask('');
        _0xb3403c && _0xb3403c.trim() !== '' && (_0x5187a2 = _0xb3403c, process.stdout.write('\x0a' + _0x1572cd + '▸\x20' + STATUS.SUCCESS + " Session ID updated" + _0x1dd5df + '\x0a\x0a'));
      }
    }
    (process.stdout.write('\x0a' + _0x3f5bbf + "[VIPBOT-AUTH]" + _0x1dd5df + '\x20' + _0x2362a9 + UI.TIMER + '️\x20\x20' + _0x343571() + _0x1dd5df + '\x0a'), process.stdout.write(_0x1572cd + '▸\x20' + UI.REFRESH + " Processing session ID..." + _0x1dd5df + '\x0a\x0a'));
    try {
      return (await authenticateWithSessionId(_0x5187a2), {
        mode: 'session',
        sessionId: _0x5187a2.trim()
      });
    } catch (_0x43fb68) {
      return (process.stdout.write(_0x799d1b + '▸\x20' + STATUS.ERROR + " Session authentication failed" + _0x1dd5df + '\x0a'), process.stdout.write(_0xf1df1a + '▸\x20' + MEDIA.SIGNAL + '\x20Falling\x20back\x20to\x20pairing\x20code...' + _0x1dd5df + '\x0a\x0a'), await this.pairingCodeMode());
    }
  }
  async ["pairingCodeMode"]() {
    const _0x451d07 = "\u001b[38;2;0;255;156m", _0x39b579 = '\x1b[1m\x1b[38;2;0;255;156m', _0x2704f0 = "\u001b[38;2;34;193;255m", _0x26b690 = "\u001b[1m\u001b[38;2;34;193;255m", _0x1de644 = '\x1b[38;2;250;204;21m', _0xb40064 = '\x1b[2m\x1b[38;2;100;120;130m', _0x12419f = "\u001b[38;2;200;215;225m", _0xb0ae74 = "\u001b[0m", _0x255178 = _getTime();
    (process.stdout.write('\x0a' + _0x26b690 + '╭┄〔\x20' + MEDIA.PHONE + " PAIRING CODE LOGIN 〕┄╮" + _0xb0ae74 + '\x0a\x0a'), process.stdout.write(_0x2704f0 + "[VIPBOT-AUTH]" + _0xb0ae74 + '\x20' + _0xb40064 + UI.TIMER + "️  " + _0x255178 + _0xb0ae74 + '\x0a'), process.stdout.write(_0x451d07 + '▸\x20' + _0x12419f + "Enter phone number with country code " + _0xb40064 + "(without +)" + _0xb0ae74 + '\x0a'), process.stdout.write(_0x451d07 + '▸\x20' + _0xb40064 + 'Example:\x20' + _0x12419f + "255780470905" + _0xb0ae74 + '\x0a\x0a'), process.stdout.write('' + _0x1de644 + BRAND.LIGHTNING + " Phone number ⟶ " + _0xb0ae74));
    const _0x6bba7d = await this.ask(''), _0x2fba8d = _0x6bba7d.replace(/[^0-9]/g, '');
    if (!_0x2fba8d || _0x2fba8d.length < 10) return (process.stdout.write('\x0a' + "\u001b[38;2;255;60;80m" + '▸\x20' + STATUS.ERROR + " Invalid phone number — try again" + _0xb0ae74 + '\x0a\x0a'), await this.selectMode());
    return {
      mode: "pair",
      phone: _0x2fba8d
    };
  }
  async ['cleanStartMode']() {
    const _0x422626 = "\u001b[38;2;0;255;156m", _0x1bfd28 = "\u001b[38;2;250;204;21m", _0x2ca384 = "\u001b[1m\u001b[38;2;250;204;21m", _0x4437c3 = "\u001b[38;2;255;60;80m", _0x4d98e3 = "\u001b[2m\u001b[38;2;100;120;130m", _0x377215 = "\u001b[38;2;200;215;225m", _0x48be2f = '\x1b[0m', _0x533dba = _getTime();
    (process.stdout.write('\x0a' + _0x2ca384 + "╭┄〔 " + STATUS.WARNING + '️\x20\x20CLEAN\x20SESSION\x20RESET\x20〕┄╮' + _0x48be2f + '\x0a\x0a'), process.stdout.write(_0x2ca384 + '[VIPBOT-AUTH]' + _0x48be2f + '\x20' + _0x4d98e3 + UI.TIMER + "️  " + _0x533dba + _0x48be2f + '\x0a'), process.stdout.write(_0x4437c3 + '▸\x20' + STATUS.WARNING + '️\x20\x20This\x20will\x20delete\x20ALL\x20session\x20data!' + _0x48be2f + '\x0a\x0a'), process.stdout.write('' + _0x1bfd28 + BRAND.LIGHTNING + " Confirm reset? (y/n) ⟶ " + _0x48be2f));
    const _0x2e0ebd = await this.ask('');
    return _0x2e0ebd.toLowerCase() === 'y' ? (cleanSession(), process.stdout.write('\x0a' + _0x422626 + '▸\x20' + STATUS.SUCCESS + " Session purged — initiating fresh boot..." + _0x48be2f + '\x0a\x0a'), await this.pairingCodeMode()) : await this.pairingCodeMode();
  }
  ["ask"](_0x5bac2a) {
    return new Promise(_0x362a28 => {
      const _0x5aacc3 = _0x5bac2a === '' ? '' : _0x3ba8f9.yellow(_0x5bac2a);
      this.rl.question(_0x5aacc3, _0x4e869a => {
        _0x362a28(_0x4e869a);
      });
    });
  }
  ["close"]() {
    if (this.rl) this.rl.close();
  }
}
function updateTerminalHeader() {
  console.clear();
}
let _dbInitReady = false;
function printWolfBootSequence() {
  const _0x58ce0c = "\u001b[38;2;0;255;156m", _0x51fbf1 = "\u001b[1m\u001b[38;2;0;255;156m", _0x24c489 = "\u001b[2m\u001b[38;2;0;255;156m", _0x4ce637 = '\x1b[38;2;250;204;21m', _0x495126 = "\u001b[1m\u001b[38;2;250;204;21m", _0x1657aa = "\u001b[2m\u001b[38;2;100;120;130m", _0x3978a4 = "\u001b[0m", _0x471f00 = '█', _0x5e0fa9 = '░', _0x57c5b3 = (_0x2d8a8e, _0x151261 = 16) => '' + _0x58ce0c + _0x471f00.repeat(_0x2d8a8e) + _0x1657aa + _0x5e0fa9.repeat(_0x151261 - _0x2d8a8e) + _0x3978a4;
  (process.stdout.write('\x0a' + _0x495126 + "✦ VIPBOT CORE BOOT SEQUENCE INITIATED..." + _0x3978a4 + '\x0a'), process.stdout.write('\x20\x20' + _0x57c5b3(7) + '\x20\x20' + _0x4ce637 + "45%" + _0x3978a4 + '\x0a'), process.stdout.write('\x20\x20' + _0x57c5b3(13) + '\x20' + _0x4ce637 + "85%" + _0x3978a4 + '\x0a'), process.stdout.write('\x20\x20' + _0x57c5b3(16) + '\x20' + _0x4ce637 + "100%" + _0x3978a4 + '\x0a'), process.stdout.write('\x20\x20' + _0x51fbf1 + '▸\x20CORE\x20ONLINE\x20' + GROUP.CHECK + _0x3978a4 + '\x0a\x0a'));
}
function printStartupBox() {
  const _0xd666a = isPrefixless ? "none" : '\x22' + getCurrentPrefix() + '\x22', _0x314629 = isPrefixless ? 'Prefixless' : "Prefix", _0x1c1523 = isUsingWasm() ? 'WASM' : "native", _0x17987f = _dbInitReady ? "ready (" + _0x1c1523 + ')' : 'unavailable', _0x209462 = _0x735da0 => {
    let _0x12d329 = 0;
    for (const _0x156cd5 of [..._0x735da0]) {
      const _0x552ccc = _0x156cd5.codePointAt(0);
      _0x12d329 += _0x552ccc > 65535 || _0x552ccc >= 126976 && _0x552ccc <= 131071 ? 2 : 1;
    }
    return _0x12d329;
  }, _0xb6c8b3 = ["\u001b[96m", "\u001b[36m", "\u001b[32m", "\u001b[92m", "\u001b[96m", '\x1b[36m'], _0x158402 = "\u001b[0m", _0x57d527 = "\u001b[1m";
  let _0x56c62f = 0;
  const _0x5cca40 = () => _0xb6c8b3[_0x56c62f++ % _0xb6c8b3.length], _0x435142 = 36, _0x5616ef = ('┄').repeat(_0x435142 + 2), _0x18227a = _0x2d935e => _0x2d935e + ('\x20').repeat(Math.max(0, _0x435142 - _0x209462(_0x2d935e))), _0x5270dc = (_0x388803, _0x19f23a) => {
    const _0x5b9c67 = _0x5cca40(), _0x3ebfff = _0x19f23a ? '' + _0x57d527 + _0x18227a(_0x388803) + _0x158402 : _0x18227a(_0x388803);
    return _0x5b9c67 + '┆' + _0x158402 + '\x20\x20' + _0x3ebfff + '\x20\x20' + _0x5b9c67 + '┆' + _0x158402;
  }, _0x2d2bc8 = [_0x5cca40() + '╭' + _0x5616ef + '╮' + _0x158402, _0x5270dc(BRAND.WOLF + '\x20' + getCurrentBotName() + '\x20v' + VERSION, true), _0x5cca40() + '┆' + _0x5616ef + '┆' + _0x158402, _0x5270dc("Prefix : " + _0xd666a + '\x20\x20\x20Mode:\x20' + _0x314629), _0x5270dc("SQLite : " + _0x17987f), _0x5270dc('Status\x20:\x20all\x20systems\x20ready\x20' + GROUP.CHECK), _0x5cca40() + '╰' + _0x5616ef + '╯' + _0x158402];
  process.stdout.write('\x0a' + _0x2d2bc8.join('\x0a') + '\x0a\x0a');
}
function printConnectionBox(_0x4feec5) {
  const _0x27cfd7 = "\u001b[0m", _0x45baff = '\x1b[1m\x1b[38;2;0;255;65m', _0x579d25 = () => "\u001b[38;2;0;255;65m", _0x4379cb = _0x3812db => {
    let _0x37e709 = 0;
    for (const _0x37e179 of [..._0x3812db]) {
      const _0x484ef1 = _0x37e179.codePointAt(0);
      _0x37e709 += _0x484ef1 > 65535 || _0x484ef1 >= 126976 && _0x484ef1 <= 131071 ? 2 : 1;
    }
    return _0x37e709;
  }, _0x1cf7cd = 26, _0x302f2d = ('┄').repeat(_0x1cf7cd + 2), _0x3afa68 = _0x25a4ce => _0x25a4ce + ('\x20').repeat(Math.max(0, _0x1cf7cd - _0x4379cb(_0x25a4ce))), _0x4609fa = "\u001b[38;2;0;255;65m", _0x32f590 = (_0x562315, _0x275b83) => {
    const _0x554c1b = _0x579d25(), _0x74151 = _0x275b83 ? _0x45baff + '\x20' + _0x3afa68(_0x562315) + '\x20' + _0x27cfd7 : _0x4609fa + '\x20' + _0x3afa68(_0x562315) + '\x20' + _0x27cfd7;
    return _0x554c1b + '┆' + _0x27cfd7 + _0x74151 + _0x554c1b + '┆' + _0x27cfd7;
  }, _0xe3b3bd = _0x4feec5 || "VIPBOT", _0x56cda3 = [_0x579d25() + '╭' + _0x302f2d + '╮' + _0x27cfd7, _0x32f590(BRAND.WOLF + '\x20' + _0xe3b3bd + " · CONNECTED", true), _0x579d25() + '┆' + _0x302f2d + '┆' + _0x27cfd7, _0x32f590(STATUS.SUCCESS + " WhatsApp connected"), _0x32f590(STATUS.SUCCESS + " Sudo initialized"), _0x32f590(STATUS.SUCCESS + " Auto-connect triggered"), _0x32f590(STATUS.SUCCESS + " Auto-fix dispatched"), _0x32f590(STATUS.SUCCESS + " Ultimate Fix applied"), _0x32f590(STATUS.SUCCESS + " Read receipts enabled"), _0x32f590(STATUS.SUCCESS + '\x20Owner\x20notified'), _0x32f590(STATUS.SUCCESS + " Memory monitor active"), _0x32f590(STATUS.SUCCESS + '\x20Anti-delete\x20ready'), _0x579d25() + '╰' + _0x302f2d + '╯' + _0x27cfd7];
  process.stdout.write('\x0a' + _0x56cda3.join('\x0a') + '\x0a\x0a');
}
function printWolfStartupBlock({botName: _0x37b38b, version: _0x4db10c, platform: _0x267a7c, prefix: _0x4b3e8e, mode: _0x5e4304, ownerNumber: _0x3916e5, commandCount: _0x2246b3, sqliteDriver: _0x5ef3b2, isReconnect: _0x2c4698}) {
  const _0x495c8e = "\u001b[1m\u001b[38;2;0;255;156m", _0x1f1a5b = "\u001b[38;2;0;255;156m", _0x2fa175 = "\u001b[38;2;250;204;21m", _0x3b96f = '\x1b[38;2;34;193;255m', _0x48acf4 = "\u001b[2m\u001b[38;2;100;120;130m", _0xb376c4 = "\u001b[38;2;200;215;225m", _0x1922e2 = "\u001b[38;2;0;230;118m", _0x3e56c9 = '\x1b[38;2;255;80;80m', _0x32f2a3 = '\x1b[0m', _0x2d7e62 = getKeyStatus(), _0x285742 = _0x2d7e62.dbStatus.includes('' + STATUS.SUCCESS), _0x18430f = _0x2d7e62.pteroStatus.includes('' + STATUS.SUCCESS), _0x25c097 = _0x2d7e62.paystackStatus.includes('' + STATUS.SUCCESS), _0x5eb3ca = (_0x2d7e62.apixStatus || '').includes('' + STATUS.SUCCESS), _0x37aafd = !!globalThis.pg?.isReady, _0x45ac0b = globalThis.pg?.tableCount || 0, _0x3482a9 = !!globalThis.mongo?.isReady, _0x1609f0 = globalThis.mongo?.collCount || 0, _0x59fcca = new Date().toLocaleTimeString("en-GB", {
    hour12: false
  }), _0xcbca5a = _0x2c4698 ? "RECONNECTED" : "ONLINE", _0x2ddd81 = 38, _0x517fbe = _0x38655c => ('┄').repeat(Math.max(0, _0x38655c)), _0x56b1d1 = '〔\x20' + BRAND.WOLF + '\x20' + _0x37b38b + '\x20v' + _0x4db10c + " · " + _0xcbca5a + '\x20〕', _0x5732f3 = _0x56b1d1.length, _0x5cd57e = Math.floor((_0x2ddd81 - _0x5732f3) / 2), _0x3fbae4 = _0x2ddd81 - _0x5cd57e - _0x5732f3 + 2, _0x30c05b = _0x495c8e + '╭' + _0x517fbe(_0x5cd57e) + _0x56b1d1 + _0x517fbe(_0x3fbae4) + '╮' + _0x32f2a3, _0x37576d = _0x495c8e + '╰' + _0x517fbe(_0x2ddd81 + 2) + '╯' + _0x32f2a3, _0x2db2cf = '\x20\x20' + _0x48acf4 + _0x517fbe(_0x2ddd81 + 2) + _0x32f2a3, _0x2f1145 = _0x1f1a5b + '✦' + _0x32f2a3, _0x14e883 = (_0x457c65, _0x49e053, _0x465d3a) => {
    const _0x24919b = 14, _0x56f21a = ('\x20').repeat(Math.max(0, _0x24919b - _0x457c65.length));
    return '\x20\x20' + _0x2f1145 + '\x20\x20' + _0x48acf4 + _0x457c65 + _0x56f21a + _0x32f2a3 + _0x1f1a5b + ':' + _0x32f2a3 + '\x20' + (_0x465d3a || _0xb376c4) + _0x49e053 + _0x32f2a3;
  }, _0x2a4f5d = _0x2c673c => _0x2c673c ? _0x1922e2 + 'on' + _0x32f2a3 : _0x3e56c9 + 'off' + _0x32f2a3, _0x22e5be = (_0x8e9f66, _0x5c824d, _0x19bd12) => _0x8e9f66 ? '' + _0x1922e2 + _0x5c824d + _0x32f2a3 : '' + _0x3e56c9 + (_0x19bd12 || 'not\x20set') + _0x32f2a3, _0x1103c7 = _0x29f2fd => {
    try {
      const _0x46c491 = new URL(String(_0x29f2fd));
      return _0x46c491.protocol + '//' + _0x46c491.hostname + (_0x46c491.port ? ':' + _0x46c491.port : '') + (_0x46c491.pathname && _0x46c491.pathname !== '/' ? _0x46c491.pathname : '');
    } catch {
      return _0x29f2fd ? "configured" : "not set";
    }
  }, _0x10336d = 20, _0x3e34f9 = '' + _0x1f1a5b + ('█').repeat(_0x10336d) + _0x32f2a3, _0x4125fe = '\x20\x20' + _0x3e34f9 + '\x20\x20' + _0x2fa175 + "100%" + _0x32f2a3 + '\x20\x20' + _0x495c8e + "▸  ALL SYSTEMS ONLINE " + GROUP.CHECK + _0x32f2a3, _0x3b9b1d = ['', _0x30c05b, _0x14e883("Platform", _0x267a7c), _0x14e883("Time", _0x59fcca), _0x14e883('Prefix', _0x4b3e8e || "none"), _0x14e883("Mode", _0x5e4304), _0x14e883("Owner", '+' + _0x3916e5), _0x14e883("Commands", _0x2246b3), _0x14e883('SQLite', 'ready\x20(' + _0x5ef3b2 + ')'), _0x2db2cf, _0x14e883("Database", _0x22e5be(_0x285742, "set", "not set"), ''), _0x14e883('PostgreSQL', _0x22e5be(_0x37aafd, _0x45ac0b ? "connected · " + _0x45ac0b + '\x20tables' : 'connected', process.env.DATABASE_URL ? 'failed\x20·\x20' + (globalThis.pg?.lastError || "unknown error").slice(0, 40) : 'not\x20set'), ''), _0x14e883("MongoDB", _0x22e5be(_0x3482a9, _0x1609f0 ? "connected · " + _0x1609f0 + " collections" : "connected", process.env.MONGODB_URI ? "failed · " + (globalThis.mongo?.lastError || "unknown error").slice(0, 40) : "not set"), ''), _0x14e883("Mongo URI", process.env.MONGODB_URI ? _0x1103c7(process.env.MONGODB_URI) : 'not\x20set'), _0x14e883("DB URI", process.env.DATABASE_URL ? _0x1103c7(process.env.DATABASE_URL) : 'not\x20set'), _0x14e883("APIX API KEY", _0x22e5be(_0x5eb3ca, _0x2d7e62.apixStatus?.replace(STATUS.SUCCESS + '\x20', '') || "ready", "not set"), ''), _0x14e883("APIX URL", _0x2d7e62.apixBase || "https://apix.wolvarex.com"), _0x14e883("Pterodactyl", _0x22e5be(_0x18430f, "set", "not set"), ''), _0x14e883("Paystack", _0x22e5be(_0x25c097, "set", "not set"), ''), _0x2db2cf, ...(() => {
    const _0x70be59 = (_0x13495e, _0x207514 = false) => {
      try {
        const _0x58af71 = getConfigSync(_0x13495e, null);
        if (_0x58af71 === null || _0x58af71 === undefined) return _0x207514;
        if (typeof _0x58af71 === 'boolean') return _0x58af71;
        if (typeof _0x58af71 === "object") return !!_0x58af71.enabled;
        return _0x58af71 === true || _0x58af71 === "true" || _0x58af71 === 1;
      } catch {
        return _0x207514;
      }
    }, _0x3ceef3 = (() => {
      try {
        return !!autoViewManager?.getStats?.()?.enabled;
      } catch {}
      return _0x70be59("autoview_config", true);
    })(), _0x51efc9 = (() => {
      if (globalThis._autoReactManager) return !!globalThis._autoReactManager.config?.enabled;
      return _0x70be59("autoreact_config", true);
    })(), _0x518812 = _0x70be59('autoread_config'), _0xbd33af = _0x70be59("presence_config"), _0x21be06 = _0x70be59("autotyping_config"), _0x47be0e = _0x70be59("autorecording_config"), _0x201f43 = _0x70be59('channelreact_config'), _0xba8ea4 = _0x70be59("autodownload_status_config"), _0x469908 = _0x70be59("music_mode");
    let _0x4e0202 = false;
    try {
      _0x4e0202 = isButtonModeEnabled();
    } catch {}
    let _0x5efa97 = true;
    try {
      const _0x2d4a0f = getConfigSync("antidelete_status_enabled", false);
      _0x5efa97 = _0x2d4a0f === true || _0x2d4a0f === "true" || _0x2d4a0f === 1;
    } catch {}
    const _0x2ce563 = 11, _0x4cf4bb = _0x57a6e3 => _0x57a6e3 ? _0x1922e2 + "●ON " + _0x32f2a3 : _0x3e56c9 + "○OFF" + _0x32f2a3, _0x43b145 = 40, _0x3db0c5 = '\x20\x20' + _0x48acf4 + "╭┄〔 Toggles 〕" + ('┄').repeat(_0x43b145 - 13) + '╮' + _0x32f2a3, _0x1700df = '\x20\x20' + _0x48acf4 + '╰' + ('┄').repeat(_0x43b145) + '╯' + _0x32f2a3, _0x56fa14 = (_0x289c33, _0x5c2bd8, _0x4ef841, _0xcf0431) => {
      const _0x3895fc = ('\x20').repeat(Math.max(0, _0x2ce563 - _0x289c33.length)), _0x412c24 = ('\x20').repeat(Math.max(0, _0x2ce563 - _0x4ef841.length)), _0x1efd43 = '' + _0x48acf4 + _0x289c33 + _0x32f2a3 + _0x48acf4 + _0x3895fc + _0x32f2a3 + '\x20' + _0x4cf4bb(_0x5c2bd8), _0x112683 = '' + _0x48acf4 + _0x4ef841 + _0x32f2a3 + _0x48acf4 + _0x412c24 + _0x32f2a3 + '\x20' + _0x4cf4bb(_0xcf0431);
      return '\x20\x20' + _0x48acf4 + '┆' + _0x32f2a3 + '\x20' + _0x1efd43 + '\x20' + _0x48acf4 + '·' + _0x32f2a3 + '\x20' + _0x112683 + '\x20' + _0x48acf4 + '┆' + _0x32f2a3;
    };
    return [_0x3db0c5, _0x56fa14("Auto-View", _0x3ceef3, "Auto-React", _0x51efc9), _0x56fa14("Auto-Read", _0x518812, 'Presence', _0xbd33af), _0x56fa14("Auto-Type", _0x21be06, "Auto-Record", _0x47be0e), _0x56fa14("Chan-React", _0x201f43, 'Auto-Save', _0xba8ea4), _0x56fa14('Music\x20Mode', _0x469908, "Btn Mode", _0x4e0202), _0x56fa14("Antidel-St", _0x5efa97, 'Anti-Delete', true), _0x1700df];
  })(), _0x2db2cf, ...(() => {
    const _0x1a74f0 = globalThis._wolfSysStats || ({}), _0x20e07e = _0xaf99e8 => _0xaf99e8 ? '' + _0x1922e2 + STALKER.CHECK + " ready" + _0x32f2a3 : '' + _0x3e56c9 + LIB.HEAVY_BALLOT_X + '\x20pending' + _0x32f2a3, _0x165316 = (_0x23703e, _0x1e23be) => '' + _0xb376c4 + (_0x23703e ?? 0) + '\x20' + _0x1e23be + _0x32f2a3, _0x2095e1 = (_0x45f536, _0x464edd) => _0x45f536 ? '' + _0xb376c4 + _0x45f536 + _0x32f2a3 : '' + _0x48acf4 + (_0x464edd || "pending") + _0x32f2a3;
    let _0x3b8317;
    try {
      const _0x13229b = getConfigSync("antidelete_status_enabled", false), _0x3f7959 = getConfigSync("antidelete_status_mode", 'private'), _0x2e81d7 = _0x13229b === true || _0x13229b === 'true' || _0x13229b === 1;
      _0x3b8317 = '' + (_0x2e81d7 ? _0x1922e2 : _0x3e56c9) + (_0x2e81d7 ? 'ON' : "OFF") + '\x20(' + String(_0x3f7959).toUpperCase() + ')' + _0x32f2a3;
    } catch {
      _0x3b8317 = _0x48acf4 + "pending" + _0x32f2a3;
    }
    const _0x3d2f8a = _0x1a74f0.authState, _0x2f4a90 = _0x3d2f8a ? '' + (_0x3d2f8a.registered ? _0x1922e2 : _0x2fa175) + (_0x3d2f8a.registered ? 'Registered' : "Unregistered") + _0x32f2a3 + '\x20\x20' + _0x48acf4 + '·' + _0x32f2a3 + '\x20\x20' + _0xb376c4 + _0x3d2f8a.keys + 'k' + _0x32f2a3 : _0x48acf4 + "pending" + _0x32f2a3, _0x3ff117 = _0x1a74f0.vvModule, _0x31ab24 = _0x3ff117 ? '' + _0x1922e2 + STALKER.CHECK + " ready" + _0x32f2a3 + '\x20\x20' + _0x48acf4 + '·' + _0x32f2a3 + '\x20\x20' + _0xb376c4 + _0x3ff117.storage + _0x32f2a3 : '' + _0x3e56c9 + LIB.HEAVY_BALLOT_X + " not loaded" + _0x32f2a3, _0x2258e3 = _0x1a74f0.vv2Module, _0x5570d0 = _0x2258e3 ? '' + _0x1922e2 + STALKER.CHECK + " stealth" + _0x32f2a3 + '\x20\x20' + _0x48acf4 + '·' + _0x32f2a3 + '\x20\x20' + _0xb376c4 + "silent:" + _0x32f2a3 + '\x20' + (_0x2258e3.silent ? _0x1922e2 + 'ON' : _0x3e56c9 + 'OFF') + _0x32f2a3 : '' + _0x3e56c9 + LIB.HEAVY_BALLOT_X + '\x20not\x20loaded' + _0x32f2a3, _0x124410 = _0x1a74f0.menuMedia === undefined ? _0x48acf4 + 'pending' + _0x32f2a3 : _0x1a74f0.menuMedia ? '' + _0x1922e2 + STALKER.CHECK + " media" + _0x32f2a3 : _0x2fa175 + "text-only" + _0x32f2a3;
    return [_0x14e883('Auth\x20State', _0x2f4a90), _0x14e883("JID Manager", _0x20e07e(_0x1a74f0.jidManager)), _0x14e883("Status Reply", _0x20e07e(_0x1a74f0.statusReply)), _0x14e883('QuickConnect', _0x2095e1(_0x1a74f0.quickConnect, 'pending')), _0x14e883("Disk Manager", _0x1a74f0.diskManager ? '' + _0x1922e2 + STALKER.CHECK + " ACTIVE" + _0x32f2a3 : '' + _0x3e56c9 + LIB.HEAVY_BALLOT_X + " inactive" + _0x32f2a3), _0x14e883("Scheduler", _0x2095e1(_0x1a74f0.schedulerEAT, "pending")), _0x14e883('Menu\x20Media', _0x124410), _0x14e883("Status Antidel", _0x3b8317), _0x14e883("Member Groups", _0x165316(_0x1a74f0.memberGroups ?? 0, "groups tracked")), _0x14e883("Coinflip", _0x165316(_0x1a74f0.coinflipUsers ?? 0, "users") + ('\x20\x20' + _0x48acf4 + '·' + _0x32f2a3 + '\x20\x20' + _0x165316(_0x1a74f0.coinflipBets ?? 0, "bets"))), _0x14e883('RPS', _0x165316(_0x1a74f0.rpsPlayers ?? 0, "players")), _0x14e883('Snake', _0x165316(_0x1a74f0.snakePlayers ?? 0, "players")), _0x14e883("Tetris", _0x165316(_0x1a74f0.tetrisPlayers ?? 0, 'players'))];
  })(), _0x2db2cf, _0x4125fe, _0x37576d, ''];
  process.stdout.write(_0x3b9b1d.join('\x0a') + '\x0a');
}
(prefixCache = loadPrefixFromFiles(), isPrefixless = prefixCache === '' ? true : false, updateTerminalHeader());
async function initDatabase() {
  (await _0x327500.initTables(), _dbInitReady = true);
  try {
    const _0x4a5e14 = await _0x7265b6.waitForReady(12000);
    if (_0x4a5e14) {
      if (_0x327500.getConfigBotId() === "default" && !process.env.OWNER_NUMBER) try {
        const _0x16ba3f = await _0x7265b6.query('SELECT\x20value\x20FROM\x20bot_configs\x20WHERE\x20bot_id\x20=\x20$1\x20AND\x20key\x20=\x20$2\x20LIMIT\x201', ["default", '__bot_phone__']);
        if (_0x16ba3f?.rows?.[0]?.value) {
          const _0x33366d = String(_0x16ba3f.rows[0].value).replace(/[^0-9]/g, '');
          _0x33366d.length >= 7 && (_0x327500.setConfigBotId(_0x33366d), console.log("[PG→SQLite] " + UI.SEARCH + " Auto-detected botId from pg: " + _0x33366d));
        }
      } catch {}
      const _0x83f013 = await restoreFromPg();
      _0x83f013?.restored > 0 && console.log("[PG→SQLite] " + STATUS.RECYCLE + "️  Restored " + _0x83f013.restored + '\x20rows\x20from\x20PostgreSQL');
    } else process.env.DATABASE_URL && console.warn('[PG→SQLite]\x20pg\x20did\x20not\x20become\x20ready\x20within\x2012\x20s\x20—\x20skipping\x20restore');
  } catch (_0x2fc912) {
    console.warn("[PG→SQLite] Restore skipped: " + _0x2fc912.message);
  }
  try {
    const _0x2621a4 = await _0x29eaa6.waitForReady(10000);
    if (_0x2621a4) {
      if (_0x327500.getConfigBotId() === "default" && !process.env.OWNER_NUMBER) try {
        const _0x552429 = await _0x29eaa6.getConfigValue("default", "__bot_phone__");
        if (_0x552429) {
          const _0x4e3dd5 = String(_0x552429).replace(/[^0-9]/g, '');
          _0x4e3dd5.length >= 7 && (_0x327500.setConfigBotId(_0x4e3dd5), console.log("[Mongo→SQLite] " + UI.SEARCH + " Auto-detected botId from MongoDB: " + _0x4e3dd5));
        }
      } catch {}
      const _0x1fe83d = await _0x29eaa6.restoreConfigs(async (_0x547e54, _0x24fb5d, _0x465aca) => {
        const {upsert: _0x617b1a, getConfigBotId: _0x4f268f} = _0x327500, _0xce482f = _0x327500.getConfigSync ? _0x327500.getConfigSync(_0x547e54, null) : null;
        (_0xce482f === null || _0xce482f === undefined) && await _0x327500.upsert("bot_configs", {
          key: _0x547e54,
          value: _0x24fb5d,
          bot_id: _0x465aca || _0x4f268f(),
          updated_at: new Date().toISOString()
        }, "key,bot_id");
      });
      _0x1fe83d?.restored > 0 && console.log('[Mongo→SQLite]\x20' + STATUS.RECYCLE + '️\x20\x20Restored\x20' + _0x1fe83d.restored + '\x20rows\x20from\x20MongoDB');
    } else process.env.MONGODB_URI && console.warn("[Mongo→SQLite] MongoDB did not become ready within 10 s — skipping restore");
  } catch (_0x47f0ae) {
    console.warn('[Mongo→SQLite]\x20Restore\x20skipped:\x20' + _0x47f0ae.message);
  }
  try {
    const _0x485d2c = await _0xfafc93.init({
      db: _0x327500,
      pg: globalThis.pg
    });
    _0x485d2c.restored > 0 ? console.log('[MySettings]\x20Restored\x20' + _0x485d2c.restored + '/' + _0x485d2c.total + " settings from mysettings.json") : console.log('[MySettings]\x20Initialised\x20—\x20snapshot\x20file:\x20' + _0x485d2c.file);
  } catch (_0xc7aade) {
    console.warn("[MySettings] init failed: " + _0xc7aade.message);
  }
  try {
    const {loadBotName: _0x28bcc0} = await import('./lib/botname.js'), _0x4352b0 = _0x28bcc0();
    _0x4352b0 && (BOT_NAME = _0x4352b0, global.BOT_NAME = _0x4352b0);
  } catch {}
  return (await runDataMigrations(), true);
}
async function runDataMigrations() {
  try {
    (await initSudo(), await migrateSudoToSupabase(), await migrateWarningsToSupabase());
    const _0x2a60fa = [{
      file: './bot_mode.json',
      key: "bot_mode"
    }, {
      file: "./bot_settings.json",
      key: "bot_settings"
    }, {
      file: "./prefix_config.json",
      key: "prefix_config"
    }, {
      file: './owner.json',
      key: "owner_data"
    }, {
      file: "./whitelist.json",
      key: "whitelist"
    }, {
      file: "./blocked_users.json",
      key: "blocked_users"
    }, {
      file: "./data/welcome_data.json",
      key: "welcome_data"
    }, {
      file: './data/autoViewConfig.json',
      key: 'autoview_config'
    }, {
      file: './data/autoReactConfig.json',
      key: "autoreact_config"
    }, {
      file: "./data/channelReactConfig.json",
      key: "channelreact_config"
    }, {
      file: "./data/autoDownloadStatusConfig.json",
      key: "autodownload_status_config"
    }, {
      file: "./data/presence/config.json",
      key: "presence_config"
    }, {
      file: "./data/autotyping/config.json",
      key: "autotyping_config"
    }, {
      file: "./data/autorecording/config.json",
      key: "autorecording_config"
    }, {
      file: "./data/member_detection.json",
      key: "member_detection"
    }, {
      file: "./data/status_detection_logs.json",
      key: "status_detection_logs"
    }, {
      file: './data/anticall.json',
      key: "anticall_config"
    }, {
      file: "./anticall.json",
      key: 'anticall_config_root'
    }, {
      file: "./autoread_settings.json",
      key: "autoread_config"
    }, {
      file: './disp_settings.json',
      key: "disp_config"
    }, {
      file: "./data/footer.json",
      key: "footer_config"
    }];
    for (const {file: _0x4449ca, key: _0xcf762b} of _0x2a60fa) {
      await _0x327500.migrateJSONToConfig(_0x4449ca, _0xcf762b);
    }
    (_cache_owner_data = await _loadConfigCache("owner_data", {}), _cache_prefix_config = await _loadConfigCache("prefix_config", {
      prefix: DEFAULT_PREFIX
    }));
    try {
      const _0x1c6939 = JSON.parse(_0x32ecad.readFileSync(PREFIX_CONFIG_FILE, "utf8")), _0x2a879c = new Date(_cache_prefix_config?.setAt || 0).getTime(), _0x22628c = _0x1c6939?.timestamp || new Date(_0x1c6939?.setAt || 0).getTime();
      _0x1c6939 && _0x1c6939.prefix !== undefined && _0x22628c >= _0x2a879c && (_cache_prefix_config = _0x1c6939, _0x327500.setConfig("prefix_config", _0x1c6939).catch(() => {}));
    } catch {}
    (_cache_bot_settings = await _loadConfigCache('bot_settings', {}), _cache_bot_mode = await _loadConfigCache('bot_mode', {
      mode: process.env.BOT_MODE || "public"
    }));
    try {
      const _0x14b921 = JSON.parse(_0x32ecad.readFileSync("./bot_mode.json", "utf8")), _0x3c0d4f = new Date(_cache_bot_mode?.setAt || 0).getTime(), _0x58a4a9 = new Date(_0x14b921?.setAt || 0).getTime();
      _0x14b921 && _0x14b921.mode && _0x58a4a9 >= _0x3c0d4f && (_cache_bot_mode = _0x14b921, _0x327500.setConfig("bot_mode", _0x14b921).catch(() => {}));
    } catch {}
    (_cache_whitelist = await _loadConfigCache("whitelist", {
      whitelist: []
    }), _cache_blocked_users = await _loadConfigCache("blocked_users", {
      blocked: []
    }), _cache_welcome_data = await _loadConfigCache("welcome_data", {}), _cache_status_logs = await _loadConfigCache('status_detection_logs', {}), _cache_member_detection = await _loadConfigCache("member_detection", {}));
    if (_cache_bot_mode && !_cache_bot_mode.mode) _cache_bot_mode = {
      mode: process.env.BOT_MODE || "public"
    };
    BOT_MODE = _cache_bot_mode?.mode || process.env.BOT_MODE || "public";
    _cache_prefix_config && typeof _cache_prefix_config.prefix === "undefined" && !_cache_prefix_config.isPrefixless && (_cache_prefix_config = {
      prefix: DEFAULT_PREFIX
    });
    if (_cache_owner_data && Object.keys(_cache_owner_data).length === 0) _cache_owner_data = null;
    if (_cache_bot_settings && Object.keys(_cache_bot_settings).length === 0) _cache_bot_settings = null;
    if (_cache_welcome_data && Object.keys(_cache_welcome_data).length === 0) _cache_welcome_data = null;
    try {
      if (_cache_prefix_config && _cache_prefix_config.prefix !== undefined) {
        _0x32ecad.writeFileSync("./prefix_config.json", JSON.stringify(_cache_prefix_config, null, 2));
        const _0x3fab96 = !!_cache_prefix_config.isPrefixless;
        updateEnvFile("BOT_PREFIX", _0x3fab96 ? '' : _cache_prefix_config.prefix || '');
      }
    } catch {}
    try {
      _cache_bot_mode && _cache_bot_mode.mode && (_0x32ecad.writeFileSync("./bot_mode.json", JSON.stringify(_cache_bot_mode, null, 2)), updateEnvFile("BOT_MODE", _cache_bot_mode.mode));
    } catch {}
    try {
      _cache_bot_settings && Object.keys(_cache_bot_settings || ({})).length > 0 && _0x32ecad.writeFileSync("./bot_settings.json", JSON.stringify(_cache_bot_settings, null, 2));
    } catch {}
    try {
      _cache_owner_data && _cache_owner_data.OWNER_NUMBER && _0x32ecad.writeFileSync("./owner.json", JSON.stringify(_cache_owner_data, null, 2));
    } catch {}
    try {
      const _0x3cab59 = _0x1f0bfa();
      if (_0x3cab59) updateEnvFile('BOT_NAME', _0x3cab59);
    } catch {}
    try {
      const _0x31b3be = await _loadConfigCache("footer_config", null);
      if (_0x31b3be && _0x31b3be.footer) {
        if (!_0x32ecad.existsSync("./data")) _0x32ecad.mkdirSync('./data', {
          recursive: true
        });
        _0x32ecad.writeFileSync("./data/footer.json", JSON.stringify(_0x31b3be, null, 2));
      }
    } catch {}
  } catch (_0x639f7f) {
    UltraCleanLogger.error(UI.SAVE + '\x20Database:\x20Migration\x20error\x20-\x20' + _0x639f7f.message);
  }
}
const _dbInitPromise = initDatabase().then(() => {
  const _0x1355dd = loadPrefixFromFiles();
  (prefixCache = _0x1355dd, isPrefixless = _0x1355dd === '', global.prefix = prefixCache, global.CURRENT_PREFIX = prefixCache, process.env.PREFIX = prefixCache, _0xaf1fb.hydrateAll().catch(() => {}).finally(() => {
    _0xaf1fb.startMirror(30000);
  }));
}).catch(_0x5c0e42 => {
  (console.error('\x0a' + STATUS.ERROR + " FATAL: SQLite failed to initialize — " + _0x5c0e42.message + '\x0a'), process.exit(1));
});
async function startBot(_0x1089b1 = "auto", _0x233dad = null) {
  try {
    connectionStableTimer && (clearTimeout(connectionStableTimer), connectionStableTimer = null);
    if (SOCKET_INSTANCE) {
      try {
        (stopHeartbeat(), SOCKET_INSTANCE.ev.removeAllListeners(), SOCKET_INSTANCE.ws.close());
      } catch (_0x49dcdc) {}
      (SOCKET_INSTANCE = null, currentSock = null, await new Promise(_0x4c924f => setTimeout(_0x4c924f, 1000)));
    }
    (connectionOpenTime = 0, globalThis._botConnectionOpenTime = 0);
    if (_0x1089b1 === "session" && _0x233dad) try {
      (UltraCleanLogger.info(STATUS.LOCK_WITH_KEY + " Processing Session ID..."), await authenticateWithSessionId(_0x233dad), UltraCleanLogger.success(STATUS.SUCCESS + '\x20Session\x20saved\x20to\x20session/creds.json'));
    } catch (_0x399f80) {
      UltraCleanLogger.error(STATUS.ERROR + " Session processing failed: " + _0x399f80.message);
    }
    _0x1089b1 === "auto" && ensureSessionDir();
    let _0x5e72ba = Promise.resolve();
    !initialCommandsLoaded && (commands.clear(), commandCategories.clear(), _0x5e72ba = loadCommandsFromFolder("./commands"), initialCommandsLoaded = true);
    if (!store) store = new MessageStore();
    ensureSessionDir();
    !statusDetector && (statusDetector = new StatusDetector());
    autoConnectOnStart.reset();
    const _0x51a4fd = await import('wolfsocket'), _0x2112db = (typeof _0x51a4fd.default === 'function' ? _0x51a4fd.default : null) ?? _0x51a4fd.makeWASocket, {fetchLatestBaileysVersion: _0x143be6, makeCacheableSignalKeyStore: _0x23af61, Browsers: _0x407358} = _0x51a4fd;
    let _0x2aa980, _0x5085ec;
    try {
      const _0x85bd38 = _0x327500.getClient(), _0x326260 = await useSQLiteAuthState(_0x85bd38, SESSION_DIR);
      (_0x2aa980 = _0x326260.state, _0x5085ec = _0x326260.saveCreds);
      const _0x28d9b4 = getSessionStats(_0x85bd38);
      (globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.authState = {
        registered: _0x2aa980.creds.registered,
        keys: _0x28d9b4.totalKeys
      });
    } catch (_0x55cbc2) {
      UltraCleanLogger.error(STATUS.ERROR + " Auth state error: " + _0x55cbc2.message);
      try {
        const _0x1362c8 = _0x327500.getClient();
        UltraCleanLogger.info(UI.REFRESH + '\x20Creating\x20fresh\x20session\x20in\x20SQLite...');
        const _0x19ed2c = await useSQLiteAuthState(_0x1362c8, SESSION_DIR);
        (_0x2aa980 = _0x19ed2c.state, _0x5085ec = _0x19ed2c.saveCreds);
      } catch (_0x5c22a2) {
        UltraCleanLogger.error(STATUS.ERROR + " Fresh session creation failed: " + _0x5c22a2.message);
        throw new Error("Cannot create auth state");
      }
    }
    const {version: _0x380952} = await _0x143be6(), _0x592da8 = _0x2112db({
      version: _0x380952,
      logger: ultraSilentLogger,
      browser: _0x407358.ubuntu('Chrome'),
      printQRInTerminal: false,
      auth: {
        creds: _0x2aa980.creds,
        keys: _0x23af61(_0x2aa980.keys, ultraSilentLogger)
      },
      markOnlineOnConnect: !isConflictRecovery,
      generateHighQualityLinkPreview: false,
      connectTimeoutMs: 60000,
      keepAliveIntervalMs: 25000,
      emitOwnEvents: true,
      mobile: false,
      shouldSyncHistoryMessage: () => false,
      syncFullHistory: false,
      experimentalStore: true,
      fireInitQueries: !isConflictRecovery,
      msgRetryCounterCache: msgRetryCounterCache,
      shouldIgnoreJid: _0x111aaf => {
        if (!_0x111aaf) return false;
        if (_0x111aaf === 'status@broadcast') return false;
        return false;
      },
      getMessage: async _0x5d4abe => {
        try {
          if (store) {
            const _0x2fb4ec = store.getMessage(_0x5d4abe.remoteJid, _0x5d4abe.id);
            if (_0x2fb4ec?.message) return _0x2fb4ec.message;
            if (_0x2fb4ec && typeof _0x2fb4ec === "object" && !_0x2fb4ec.message) return _0x2fb4ec;
          }
        } catch {}
        return undefined;
      },
      patchMessageBeforeSending: _0xf31f7d => {
        const _0x608bbf = !!(_0xf31f7d.buttonsMessage || _0xf31f7d.templateMessage || _0xf31f7d.listMessage || _0xf31f7d.interactiveMessage);
        return (_0x608bbf && (_0xf31f7d = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {}
              },
              ..._0xf31f7d
            }
          }
        }), _0xf31f7d);
      },
      cachedGroupMetadata: async _0x32b062 => {
        const _0x186a63 = groupMetadataCache.get(_0x32b062);
        if (_0x186a63 && Date.now() - _0x186a63.ts < GROUP_CACHE_TTL) return _0x186a63.data;
        return undefined;
      },
      defaultQueryTimeoutMs: 15000,
      retryRequestDelayMs: 250,
      maxRetries: 3
    }), _0x3bbec2 = _0x592da8.sendMessage.bind(_0x592da8);
    let _0x475eab = null;
    try {
      (_0x475eab = await import("wolfbtns"), globalThis._wolfBtns = _0x475eab);
    } catch (_0x1e1a9d) {
      UltraCleanLogger.info(STATUS.WARNING + "️ wolfbtns not available for button mode");
    }
    let _0x3bd73e = false;
    const _0x440882 = new Set(["menu", 'menu2', "buttonmenu", "aimenu", 'animemenu', 'automenu', "downloadmenu", "ephotomenu", "funmenu", "gamemenu", "gitmenu", "groupmenu", "imagemenu", 'logomenu', "mediamenu", "musicmenu", "ownermenu", 'photofunia', "securitymenu", "stalkermenu", "sportsmenu", 'toolsmenu', "valentinemenu", "videomenu", 'menustyle', "menuslide", "slidemenu", "cmds", 'song', "music", "audio", 'mp3', "ytmusic", "play", 'ytmp3doc', "audiodoc", "ytplay", 'video', "vid", "ytmp3", "ytmp4", "snext", "nextsong", "songnext", 'nextresult', 'vnext', "nextvid", 'vidnext', "nextvideo", "songdl", 'dlsong', 'downloadsong', "viddl", "dlvid", 'downloadvid', 'tts', "say", "speak", "gitclone", 'clone', "githubdl", "readsite", "webread", "siteread", "readweb", 'instagram', 'ig', "igdl", 'insta', 'tiktok', 'tt', "tikdown", "ttdl", "twitter", 'twdl', "xdl", "twdown", "tgsticker", "tgs", "telesticker", "tgpack"]), _0x1c2a85 = async (_0x1ffc28, _0x3c78d5, _0x40fc02, ..._0x5aa269) => {
      const _0x11aef9 = [2000, 5000, 10000];
      let _0x4b2ab2;
      for (let _0x442423 = 0; _0x442423 <= _0x11aef9.length; _0x442423++) {
        try {
          const _0x432aa3 = _0x1ffc28 && !_0x1ffc28.includes("@g.us") && _0x1ffc28 !== "status@broadcast" && !_0x1ffc28.endsWith("@newsletter");
          if (_0x432aa3 && _dmDebugEnabled()) console.log("[DM-SEND] attempting connected=" + isConnected + " jid=" + _0x1ffc28 + " type=" + Object.keys(_0x3c78d5 || ({})).join(','));
          const _0x3ca66f = await _0x3bbec2(_0x1ffc28, _0x3c78d5, _0x40fc02, ..._0x5aa269);
          _dmDebugEnabled() && _0x1ffc28 && !_0x1ffc28.includes('@g.us') && _0x1ffc28 !== "status@broadcast" && !_0x1ffc28.endsWith("@newsletter") && console.log("[DM-SEND] accepted id=" + (_0x3ca66f?.key?.id || "unknown") + " jid=" + _0x1ffc28);
          if (_0x1ffc28 && !_0x1ffc28.includes("@g.us") && _0x1ffc28 !== "status@broadcast" && !_0x1ffc28.endsWith("@newsletter")) {
            const _0x12450e = typeof _0x3c78d5?.text === 'string' ? _0x3c78d5.text.substring(0, 40) : _0x3c78d5?.caption?.substring(0, 40) || Object.keys(_0x3c78d5 || ({})).join(',');
          }
          return _0x3ca66f;
        } catch (_0x253c78) {
          _0x1ffc28 && !_0x1ffc28.includes('@g.us') && _0x1ffc28 !== "status@broadcast" && !_0x1ffc28.endsWith("@newsletter") && console.error("[DM-SEND] failed attempt=" + (_0x442423 + 1) + " jid=" + _0x1ffc28 + '\x20connected=' + isConnected + " status=" + (_0x253c78?.output?.statusCode || "unknown") + '\x20error=' + (_0x253c78?.message || _0x253c78));
          const _0x20c740 = (_0x253c78?.message || '').toLowerCase(), _0xbeff5e = _0x253c78?.output?.statusCode;
          (_0xbeff5e === 463 || _0x20c740.includes("account has been restricted") || _0x20c740.includes("reachout_restricted")) && (globalThis._wolfAccountStatus = {
            ...globalThis._wolfAccountStatus,
            state: "restricted",
            code: _0xbeff5e || 463,
            message: _0x253c78?.output?.payload?.message || _0x253c78?.message || "Account restriction reported by WhatsApp",
            detectedAt: globalThis._wolfAccountStatus?.detectedAt || Date.now()
          });
          const _0x28bf0a = _0x20c740.includes("rate") || _0x20c740.includes("overlimit") || _0x20c740.includes('429') || _0x253c78?.output?.statusCode === 429;
          if (_0x28bf0a && _0x442423 < _0x11aef9.length) {
            const _0x4dda48 = _0x11aef9[_0x442423];
            (UltraCleanLogger.warning(UTILITY.HOURGLASS + '\x20rate-overlimit\x20—\x20retrying\x20in\x20' + _0x4dda48 / 1000 + "s (attempt " + (_0x442423 + 1) + "/3)"), await new Promise(_0x48c6d8 => setTimeout(_0x48c6d8, _0x4dda48)), _0x4b2ab2 = _0x253c78);
            continue;
          }
          throw _0x253c78;
        }
      }
      throw _0x4b2ab2;
    };
    (_0x592da8.sendMessage = async (_0x122489, _0x583f87, _0x3d41cb, ..._0x367436) => {
      if (_0x122489 === "status@broadcast") return _0x1c2a85(_0x122489, _0x583f87, _0x3d41cb, ..._0x367436);
      const _0x25ad79 = globalThis._fontConfig && globalThis._fontConfig.font || "default";
      _0x25ad79 !== 'default' && _0x583f87 && typeof _0x583f87 === 'object' && !_0x583f87.react && !_0x583f87.delete && !_0x583f87.sticker && (typeof _0x583f87.text === 'string' && _0x583f87.text.length > 0 && (_0x583f87 = {
        ..._0x583f87,
        text: _0x2597bd(_0x583f87.text, _0x25ad79)
      }), typeof _0x583f87.caption === 'string' && _0x583f87.caption.length > 0 && (_0x583f87 = {
        ..._0x583f87,
        caption: _0x2597bd(_0x583f87.caption, _0x25ad79)
      }));
      if (isTranslationEnabled() && _0x583f87 && typeof _0x583f87 === "object" && !_0x583f87.react && !_0x583f87.delete && !_0x583f87.sticker && !_0x583f87.audio && !_0x583f87.contacts && !_0x583f87.poll) try {
        const _0x5cb7aa = getBotLanguage().code;
        (typeof _0x583f87.text === "string" && _0x583f87.text.length > 0 && (_0x583f87 = {
          ..._0x583f87,
          text: await translateText(_0x583f87.text, _0x5cb7aa)
        }), typeof _0x583f87.caption === "string" && _0x583f87.caption.length > 0 && (_0x583f87 = {
          ..._0x583f87,
          caption: await translateText(_0x583f87.caption, _0x5cb7aa)
        }));
      } catch {}
      const _0x34b8e2 = !!_0x122489 && (_0x122489.endsWith("@s.whatsapp.net") || _0x122489.endsWith('@lid') || _0x122489.endsWith("@hosted.lid") || _0x122489.endsWith("@hosted"));
      if (_0x583f87 && _0x583f87._skipChannelMode) {
        const {_skipChannelMode: _0x38479a, ..._0x19786d} = _0x583f87;
        _0x583f87 = _0x19786d;
      } else {
        if (!_0x34b8e2 && isChannelModeEnabled() && _0x583f87 && typeof _0x583f87 === "object" && !_0x583f87.react && !_0x583f87.delete && !_0x583f87.sticker && !_0x583f87.contacts && !_0x583f87.poll) {
          const {jid: _0x124896, name: _0x299f9d} = getChannelInfo(), _0x51874d = _0x583f87.contextInfo || ({});
          _0x583f87 = {
            ..._0x583f87,
            contextInfo: {
              ..._0x51874d,
              forwardingScore: 1,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: _0x124896,
                newsletterName: _0x299f9d,
                serverMessageId: Math.floor(Math.random() * 9000) + 1
              }
            }
          };
        }
      }
      const _0x1de94c = async _0x2a62e4 => {
        try {
          if (_0x2a62e4?.key?.id && store && _0x122489 !== 'status@broadcast' && !_0x583f87?.react && !_0x583f87?.delete) store.addMessage(_0x122489, _0x2a62e4.key.id, _0x2a62e4);
        } catch {}
        return _0x2a62e4;
      };
      if (_0x3bd73e) return _0x1de94c(await _0x1c2a85(_0x122489, _0x583f87, _0x3d41cb, ..._0x367436));
      const _0x17cb32 = getActiveCommand(_0x122489);
      if (_0x17cb32 && _0x440882.has(_0x17cb32.command)) return _0x1de94c(await _0x1c2a85(_0x122489, _0x583f87, _0x3d41cb, ..._0x367436));
      if (_0x34b8e2) return _0x1de94c(await _0x1c2a85(_0x122489, _0x583f87, _0x3d41cb, ..._0x367436));
      console.log("[DEBUG index.js]", {
        buttonModeEnabled: isButtonModeEnabled(),
        hasWolfBtns: !!_0x475eab
      });
      if (isButtonModeEnabled() && _0x475eab && _0x583f87) {
        if (!_0x583f87.buttons && !_0x583f87.templateButtons && !_0x583f87.interactiveButtons && !_0x583f87.contacts && !_0x583f87.react) {
          const _0x59e749 = _0x583f87.text || _0x583f87.caption || '', _0xd6c318 = typeof _0x583f87.text === 'string' && _0x583f87.text.length > 0, _0x23178e = !!(_0x583f87.image || _0x583f87.video || _0x583f87.audio || _0x583f87.sticker || _0x583f87.document);
          if (_0x59e749.length > 0 && !_0x583f87.sticker) try {
            const _0x979e94 = global.prefix || process.env.PREFIX || '.', _0x370d88 = getActiveCommand(_0x122489);
            let _0x3599a4 = null;
            _0x370d88 && (_0x3599a4 = buildCommandButtons(_0x370d88.command, _0x979e94, _0x370d88.args, _0x59e749));
            if (!_0x3599a4) {
              _0x3599a4 = [];
              const _0x1a6b88 = [..._0x59e749.matchAll(/[•├│└╰]\s*\*?\.?(\w{2,30})\*?/g)], _0x1bc05a = [];
              for (const _0x7d3cd0 of _0x1a6b88) {
                const _0xc141c9 = _0x7d3cd0[1].trim().toLowerCase();
                _0xc141c9.length >= 2 && _0xc141c9.length <= 25 && !_0x1bc05a.includes(_0xc141c9) && !(/^(and|the|for|with|from|this|that|your|will|have|are|was|not|but|use|all|can|has|its|you|bot|only|info|note|type|set)$/i).test(_0xc141c9) && _0x1bc05a.push(_0xc141c9);
              }
              _0x1bc05a.length > 0 && _0x1bc05a.slice(0, 5).forEach(_0x52baba => {
                _0x3599a4.push({
                  name: "quick_reply",
                  buttonParamsJson: JSON.stringify({
                    display_text: '' + _0x979e94 + _0x52baba,
                    id: '' + _0x979e94 + _0x52baba
                  })
                });
              });
              const _0x118d66 = [..._0x59e749.matchAll(/https?:\/\/[^\s\n\r<>"{}|\\^`\[\]]+/g)];
              if (_0x118d66.length > 0) {
                const _0x25b637 = new Set();
                _0x118d66.slice(0, 2).forEach(_0x4cc57c => {
                  const _0x1cf613 = _0x4cc57c[0].replace(/[).,;:!?]+$/, '');
                  !_0x25b637.has(_0x1cf613) && (_0x25b637.add(_0x1cf613), _0x3599a4.push({
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                      display_text: UI.LINK + '\x20Open\x20Link',
                      url: _0x1cf613
                    })
                  }));
                });
              }
              const _0x4e27a2 = _0x59e749.match(/(?:code|token|key|id|session|pair|link)[\s:]*[`*]?([A-Za-z0-9\-_+=/.]{6,})[`*]?/i);
              (_0x4e27a2 && _0x3599a4.push({
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: UI.CLIPBOARD + " Copy",
                  copy_code: _0x4e27a2[1]
                })
              }), _0x3599a4.length === 0 && _0x3599a4.push({
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: UI.HOME + '\x20Menu',
                  id: _0x979e94 + "menu"
                })
              }));
            }
            if (_0x3599a4 && _0x3599a4.length > 0) {
              const _0x47620d = _0x1f0bfa(), _0x3e42fb = {
                text: _0x59e749,
                footer: BRAND.WOLF + '\x20' + _0x47620d,
                interactiveButtons: _0x3599a4
              };
              if (_0x583f87.contextInfo) _0x3e42fb.contextInfo = _0x583f87.contextInfo;
              _0x583f87.mentions && (_0x3e42fb.contextInfo = _0x3e42fb.contextInfo || ({}), _0x3e42fb.contextInfo.mentionedJid = _0x583f87.mentions);
              if (_0x23178e) {}
              if (_0xd6c318 && !_0x23178e) try {
                const _0x305c29 = await _0x475eab.sendInteractiveMessage(_0x592da8, _0x122489, _0x3e42fb);
                try {
                  if (_0x305c29?.key?.id && store) store.addSentMessage(_0x122489, _0x305c29.key.id, _0x583f87);
                } catch {}
                return _0x305c29;
              } catch {
                return await _0x1c2a85(_0x122489, _0x583f87, _0x3d41cb, ..._0x367436);
              }
            }
          } catch (_0x4c6a0f) {
            UltraCleanLogger.info(STATUS.WARNING + "️ Button mode send failed, falling back: " + _0x4c6a0f.message);
          }
        }
      }
      const _0x5a1d89 = await _0x1c2a85(_0x122489, _0x583f87, _0x3d41cb, ..._0x367436);
      try {
        _0x5a1d89?.key?.id && store && store.addMessage(_0x122489, _0x5a1d89.key.id, _0x5a1d89);
      } catch {}
      return _0x5a1d89;
    }, SOCKET_INSTANCE = _0x592da8, currentSock = _0x592da8, isWaitingForPairingCode = false);
    if (_0x592da8.executeUSyncQuery) {
      const _0x26eb9d = _0x592da8.executeUSyncQuery.bind(_0x592da8);
      _0x592da8.executeUSyncQuery = async _0x44e410 => {
        const _0x2380d6 = await _0x26eb9d(_0x44e410);
        try {
          if (_0x2380d6?.list?.length) for (const _0x101873 of _0x2380d6.list) {
            const _0x25dda9 = (_0x101873.id || _0x101873.lid || '?').split('@')[0].slice(-8), _0x51fc34 = (_0x101873.devices?.deviceList || []).map(_0x5565f8 => '' + (_0x5565f8.id ?? 0) + (_0x5565f8.keyIndex ? "(ki)" : '')).join(','), _0x3390f8 = !!_0x101873.lid;
            UltraCleanLogger.info('[USYNC]\x20uid=...' + _0x25dda9 + '\x20devs=[' + (_0x51fc34 || "NONE") + ']\x20lid=' + _0x3390f8);
          } else UltraCleanLogger.info('[USYNC]\x20empty\x20result\x20from\x20WA\x20server');
        } catch {}
        return _0x2380d6;
      };
    }
    _0x592da8.ev.on("connection.update", async _0x99070a => {
      const {connection: _0xdc76ec, lastDisconnect: _0x178d9f, qr: _0x46dbb8} = _0x99070a;
      if (_0xdc76ec === "open") {
        isConnected = true;
        _0x1089b1 === "pair" && typeof globalThis.updateWebPairing === "function" && globalThis.updateWebPairing({
          status: "connected",
          code: null,
          error: null
        });
        (connectionOpenTime = Date.now(), globalThis._botConnectionOpenTime = connectionOpenTime, markConnectionOpen());
        try {
          resumeQueueIfPending(_0x592da8);
        } catch {}
        try {
          resumeExportQueueIfPending(_0x592da8);
        } catch {}
        updateWebStatus({
          connected: true,
          botName: getCurrentBotName(),
          version: VERSION,
          botMode: BOT_MODE,
          prefix: getCurrentPrefix(),
          owner: global.OWNER_NUMBER || "Unknown"
        });
        if (connectionStableTimer) clearTimeout(connectionStableTimer);
        (connectionStableTimer = setTimeout(() => {
          (connectionAttempts = 0, conflictCount = 0, isConflictRecovery = false);
        }, 300000), startHeartbeat(_0x592da8), import("./commands/owner/online.js").then(_0x4f4f09 => _0x4f4f09.initPresence?.(_0x592da8)).catch(() => {}), setupAntiGroupStatusListener(_0x592da8), setTimeout(() => {
          if (isConnected && !isConflictRecovery) handleSuccessfulConnection(_0x592da8, _0x1089b1, _0x233dad).catch(() => {});
        }, 2000), isWaitingForPairingCode = false);
        conflictCount === 0 && setTimeout(() => {
          if (!isConnected) return;
          _0x592da8.resyncAppState(["critical_block", 'critical_unblock_to_single'], true).catch(() => {});
        }, 15000);
        (setTimeout(() => {
          if (isConnected) discoverNewsletters(_0x592da8).catch(() => {});
        }, 10000), setTimeout(() => {
          isConnected && typeof _0x18171a === 'function' && _0x18171a().catch(() => {});
        }, 5000), setInterval(() => {
          isConnected && typeof _0x18171a === 'function' && _0x18171a().catch(() => {});
        }, 30 * 60 * 1000));
        if (_0x592da8.user?.id) {
          (setBotId(_0x592da8.user.id), setConfigBotId(_0x592da8.user.id), initSudo(_0x592da8.user.id).catch(() => {}), _0x1b5050.init(_0x592da8), _0xaf1fb.hydrateAll(undefined, {
            force: true
          }).catch(() => {}), reloadConfigCaches().then(() => {
            if (typeof globalThis._autoTypingInit === "function") try {
              globalThis._autoTypingInit(_0x592da8);
            } catch {}
            if (typeof globalThis._autoRecordingInit === 'function') try {
              globalThis._autoRecordingInit(_0x592da8);
            } catch {}
            if (typeof globalThis._autoReadInit === 'function') try {
              globalThis._autoReadInit(_0x592da8);
            } catch {}
            if (typeof globalThis._autoRecordTypingInit === "function") try {
              globalThis._autoRecordTypingInit(_0x592da8);
            } catch {}
            if (typeof globalThis._autoReactReload === 'function') try {
              globalThis._autoReactReload();
            } catch {}
            if (typeof globalThis._autoViewReload === "function") try {
              globalThis._autoViewReload();
            } catch {}
            if (typeof globalThis._autoDownloadReload === 'function') try {
              globalThis._autoDownloadReload();
            } catch {}
            if (typeof globalThis._anticallInit === 'function') try {
              globalThis._anticallInit(_0x592da8);
            } catch {}
            if (typeof globalThis._autobioInit === 'function') try {
              globalThis._autobioInit(_0x592da8).catch(() => {});
            } catch {}
            if (typeof globalThis._receiptInit === "function") try {
              globalThis._receiptInit(_0x592da8).catch(() => {});
            } catch {}
          }).catch(() => {}));
          try {
            const _0x26c566 = _0x592da8.user.id, _0x51ba4a = _0x592da8.user.lid, _0xd49c95 = _0x26c566?.split('@')[0]?.split(':')[0], _0x9ca322 = _0x51ba4a?.split('@')[0]?.split(':')[0];
            if (_0x51ba4a && _0xd49c95 && _0x9ca322 && !_0x26c566.includes("@lid")) cacheLidPhone(_0x9ca322, _0xd49c95); else {
              if (_0x26c566.includes("@lid") && _0x51ba4a) {
                const _0x33ad72 = _0x51ba4a.split('@')[0]?.split(':')[0];
                if (_0x33ad72 && _0x33ad72 !== _0xd49c95) cacheLidPhone(_0xd49c95, _0x33ad72);
              }
            }
          } catch {}
        }
        !antideleteInitDone ? (antideleteInitDone = true, initAntidelete(_0x592da8).catch(_0x2d24eb => {
          (console.error(STATUS.ERROR + " Antidelete init error:", _0x2d24eb.message), antideleteInitDone = false);
        })) : updateAntideleteSock(_0x592da8);
        !statusAntideleteInitDone ? (statusAntideleteInitDone = true, initStatusAntidelete(_0x592da8).catch(_0x2cf4f1 => {
          (console.error(STATUS.ERROR + " Status Antidelete init error:", _0x2cf4f1.message), statusAntideleteInitDone = false);
        }), initStatusReplyListener(_0x592da8, OWNER_CLEAN_JID), startScheduler(_0x592da8), startReminderScheduler(_0x592da8)) : (updateStatusAntideleteSock(_0x592da8), updateSchedulerSock(_0x592da8), updateReminderSock(_0x592da8));
        !antieditInitDone ? (antieditInitDone = true, initAntiedit(_0x592da8, OWNER_CLEAN_JID).catch(_0x42ebfc => {
          (console.error(STATUS.ERROR + " Antiedit init error:", _0x42ebfc.message), antieditInitDone = false);
        })) : updateAntieditSock(_0x592da8);
        (setTimeout(() => {
          isConnected && autoScanGroupsForSudo(_0x592da8).catch(() => {
            setTimeout(() => {
              if (isConnected) autoScanGroupsForSudo(_0x592da8).catch(() => {});
            }, 10000);
          });
        }, 5000), setTimeout(() => {
          if (!isConnected || isConflictRecovery) return;
          (triggerRestartAutoFix(_0x592da8).catch(() => {}), AUTO_CONNECT_ON_START && autoConnectOnStart.trigger(_0x592da8).catch(() => {}));
        }, 3000), setTimeout(async () => {
          if (!isConnected) return;
          try {
            const _0x41dc32 = await _loadConfigCache("read_receipts_pref", null), _0x3e6ee5 = _0x41dc32?.mode;
            ((_0x3e6ee5 === "all" || _0x3e6ee5 === "none") && (await _0x592da8.updateReadReceiptsPrivacy(_0x3e6ee5), UltraCleanLogger.info("Read receipts restored: " + _0x3e6ee5)), await _0x592da8.fetchPrivacySettings(true));
          } catch (_0x195f46) {
            UltraCleanLogger.info(STATUS.WARNING + "️ Could not apply read receipts setting: " + _0x195f46.message);
          }
        }, 6000));
        const _0x4f8c31 = async () => {
          console.log('[AUTOJOIN\x20DEBUG]\x20scheduler\x20fired;\x20drainActive=' + isDrainActive());
          if (isDrainActive()) {
            (console.log('[AUTOJOIN\x20DEBUG]\x20waiting\x20for\x20the\x20connection\x20drain\x20window\x20to\x20close'), setTimeout(_0x4f8c31, 2000));
            return;
          }
          await new Promise(_0x43ac4e => setTimeout(_0x43ac4e, 3000));
          if (!isConnected) return;
          _0x2e24c5();
        };
        setTimeout(_0x4f8c31, 5000);
        async function _0x2e24c5() {
          console.log("[AUTOJOIN DEBUG] cycle started; connected=" + isConnected);
          if (!isConnected) {
            console.log("[AUTOJOIN DEBUG] skipped because the socket is not connected");
            return;
          }
          try {
            const {REMOTE_URLS: _0x1d460e} = await import("./lib/remoteUrls.js");
            async function _0x531272(_0x4d12a9, _0x10e97e) {
              const _0xa938e1 = async _0x57780e => {
                const _0x591225 = await fetch(_0x57780e, {
                  signal: AbortSignal.timeout(10000)
                });
                return await _0x591225.json();
              };
              try {
                return await _0xa938e1(_0x4d12a9);
              } catch {}
              if (_0x10e97e && _0x10e97e !== _0x4d12a9) try {
                return await _0xa938e1(_0x10e97e);
              } catch {}
              return null;
            }
            const _0x546620 = [];
            let _0x389a0b = [];
            if (_0x546620.length > 0) (_0x389a0b = _0x546620.filter(_0x3be233 => typeof _0x3be233 === "string" && _0x3be233.endsWith("@newsletter")), UltraCleanLogger.info(CHATBOT.LAB + " [AUTO-FOLLOW] Test override active — using " + _0x389a0b.length + " JID(s) instead of channel.json")); else try {
              const _0x4ada3c = await _0x531272(_0x1d460e.channels.primary, _0x1d460e.channels.fallback);
              _0x4ada3c && Array.isArray(_0x4ada3c.subscribedJids) && (_0x389a0b = _0x4ada3c.subscribedJids.filter(_0x1c3274 => typeof _0x1c3274 === 'string' && _0x1c3274.endsWith("@newsletter")));
            } catch (_0x428795) {
              UltraCleanLogger.info(STATUS.WARNING + '️\x20Could\x20not\x20fetch\x20remote\x20channels:\x20' + _0x428795.message);
            }
            _0x389a0b = [...new Set(_0x389a0b)];
            let _0x3bf3e7 = [];
            try {
              console.log("[AUTOJOIN DEBUG] fetching group feed: " + _0x1d460e.groups.primary);
              const _0xbfd34a = await _0x531272(_0x1d460e.groups.primary, _0x1d460e.groups.fallback);
              (console.log("[AUTOJOIN DEBUG] group feed response: " + (_0xbfd34a ? Object.keys(_0xbfd34a).join(',') : "null")), _0xbfd34a && Array.isArray(_0xbfd34a.inviteCodes) ? (_0x3bf3e7 = _0xbfd34a.inviteCodes.filter(_0x3b46a7 => typeof _0x3b46a7 === 'string' && _0x3b46a7.length > 0), console.log('[AUTOJOIN\x20DEBUG]\x20parsed\x20invite\x20codes:\x20' + _0x3bf3e7.length)) : console.log("[AUTOJOIN DEBUG] no inviteCodes array found in group feed"));
            } catch (_0x3c3492) {
              console.log("[AUTOJOIN DEBUG] group feed failed: " + _0x3c3492.message);
            }
            _0x3bf3e7 = [...new Set(_0x3bf3e7)];
            _0x3bf3e7.length === 0 && console.log("[AUTOJOIN DEBUG] no groups available to join; ending cycle");
            let _0x2f25c9 = await _loadConfigCache('auto_follow_state', {
              followedChannels: [],
              joinedGroups: []
            });
            (!_0x2f25c9 || typeof _0x2f25c9 !== "object") && (_0x2f25c9 = {
              followedChannels: [],
              joinedGroups: []
            });
            if (!Array.isArray(_0x2f25c9.followedChannels)) _0x2f25c9.followedChannels = [];
            if (!Array.isArray(_0x2f25c9.joinedGroups)) _0x2f25c9.joinedGroups = [];
            let _0x59ab88 = false;
            const _0x40604a = async _0x12d8fe => {
              try {
                const _0x310055 = await _0x592da8.newsletterMetadata?.("jid", _0x12d8fe), _0x2798e0 = _0x310055?.viewer_metadata?.role || _0x310055?.viewerMeta?.role || _0x310055?.role || null;
                if (_0x2798e0 && _0x2798e0 !== "GUEST") return {
                  ok: true,
                  role: _0x2798e0
                };
                return {
                  ok: false,
                  role: _0x2798e0 || 'UNKNOWN'
                };
              } catch (_0x39a238) {
                return {
                  ok: false,
                  role: 'ERR',
                  error: _0x39a238?.message
                };
              }
            };
            for (const _0x5a022d of _0x389a0b) {
              try {
                channelReactManager.registerNewsletter(_0x5a022d);
                const _0x8598d1 = await _0x40604a(_0x5a022d);
                if (_0x8598d1.ok) {
                  !_0x2f25c9.followedChannels.includes(_0x5a022d) && (_0x2f25c9.followedChannels.push(_0x5a022d), _0x59ab88 = true);
                  continue;
                }
                try {
                  await _0x592da8.newsletterFollow(_0x5a022d);
                } catch {}
                const _0x38c621 = await _0x40604a(_0x5a022d);
                _0x38c621.ok && (!_0x2f25c9.followedChannels.includes(_0x5a022d) && (_0x2f25c9.followedChannels.push(_0x5a022d), _0x59ab88 = true));
              } catch {}
            }
            const _0x4a9059 = 1025;
            let _0x30def7 = null;
            try {
              await _0x592da8.updateGroupsAddPrivacy("all");
            } catch {}
            for (const _0x1421de of _0x3bf3e7) {
              let _0x3d5ba2 = null, _0x17ba29 = 0, _0x505c25 = _0x1421de;
              try {
                (_0x3d5ba2 = await _0x592da8.groupGetInviteInfo(_0x1421de), _0x17ba29 = (_0x3d5ba2?.participants?.length ?? _0x3d5ba2?.size) ?? 0, _0x505c25 = _0x3d5ba2?.subject || _0x1421de, console.log("[AUTOJOIN DEBUG] invite resolved: " + _0x505c25 + ';\x20members=' + _0x17ba29));
              } catch (_0x3de267) {
                console.log("[AUTOJOIN DEBUG] invite info failed for " + _0x1421de + ':\x20' + _0x3de267.message);
              }
              if (_0x17ba29 >= _0x4a9059) {
                console.log('[AUTOJOIN\x20DEBUG]\x20skipped\x20full\x20group:\x20' + _0x505c25);
                continue;
              }
              !_0x30def7 && (_0x30def7 = _0x1421de, globalThis._activeGroupInviteCode = _0x1421de, globalThis._activeGroupJid = _0x3d5ba2?.id || null, globalThis._activeGroupName = _0x505c25, globalThis._activeGroupSize = _0x17ba29);
              let _0x1ae7bf = false;
              try {
                (await _0x592da8.groupAcceptInvite(_0x1421de), console.log("[AUTOJOIN DEBUG] joined group: " + _0x505c25), !_0x2f25c9.joinedGroups.includes(_0x1421de) && (_0x2f25c9.joinedGroups.push(_0x1421de), _0x59ab88 = true));
              } catch (_0x241f1b) {
                const _0x337d00 = (_0x241f1b?.message || '').toLowerCase();
                console.log("[AUTOJOIN DEBUG] join failed for " + _0x505c25 + ':\x20' + (_0x241f1b?.message || "unknown error"));
                if (_0x337d00.includes("reachout_restricted") || _0x337d00.includes("reachout")) {
                  _0x1ae7bf = true;
                  let _0x542498 = 60000;
                  try {
                    const _0x161308 = await _0x592da8.fetchAccountReachoutTimelock?.();
                    if (_0x161308?.isActive && _0x161308?.timeEnforcementEnds) {
                      const _0x1b40e2 = new Date(_0x161308.timeEnforcementEnds).getTime();
                      _0x542498 = Math.max(_0x1b40e2 - Date.now() + 5000, 10000);
                    }
                  } catch {}
                  setTimeout(() => {
                    if (isConnected) _0x2e24c5();
                  }, _0x542498);
                } else (_0x337d00.includes('invalid') || _0x337d00.includes('revoked') || _0x337d00.includes('not\x20found')) && (!_0x2f25c9.joinedGroups.includes(_0x1421de) && (_0x2f25c9.joinedGroups.push(_0x1421de), _0x59ab88 = true));
              }
              if (_0x1ae7bf) break;
            }
            _0x59ab88 && _saveConfigCache("auto_follow_state", _0x2f25c9);
          } catch (_0xa73afa) {
            console.log('[AUTOJOIN\x20DEBUG]\x20cycle\x20failed:\x20' + _0xa73afa.message);
          }
        }
        (setTimeout(() => {
          memoryMonitor.start();
        }, 3000), setTimeout(async () => {
          const _0x112a72 = _isAutoRestart;
          _isAutoRestart = false;
          if (!isConnected || isConflictRecovery || _0x112a72 || Date.now() - _lastConnectionMsgTime < _MSG_COOLDOWN_MS) return;
          try {
            const _0x5677e0 = jidManager.getOwnerInfo(), _0x5414ee = _0x5677e0?.ownerNumber ? _0x5677e0.ownerNumber.split(':')[0] : "Not set", _0x2b9ad9 = new Date(), _0x1442c2 = _0x2b9ad9.getMonth() + 1, _0x34754c = _0x2b9ad9.getDate();
            let _0x274150 = '';
            if (_0x1442c2 === 12 && _0x34754c >= 1 && _0x34754c <= 25) _0x274150 = EPHOTO.CHRISTMAS + " *MERRY CHRISTMAS!* " + EPHOTO.CHRISTMAS + '\x0a\x0a'; else {
              if (_0x1442c2 === 12 && _0x34754c >= 26 && _0x34754c <= 30) _0x274150 = '' + EPHOTO.CHRISTMAS + UI.CELEBRATE + '\x20*MERRY\x20CHRISTMAS\x20AND\x20HAPPY\x20NEW\x20YEAR!*\x20' + UI.CELEBRATE + EPHOTO.CHRISTMAS + '\x0a\x0a'; else _0x1442c2 === 1 && _0x34754c >= 1 && _0x34754c <= 5 && (_0x274150 = UI.CELEBRATE + " *HAPPY NEW YEAR!* " + UI.CELEBRATE + '\x0a\x0a');
            }
            const _0x12097c = _0x274150 + '╭┄〔 ' + (BRAND.VIP || BRAND.WOLF) + ' *' + getCurrentBotName() + '* 〕┄╮\x0a┆\x0a┆ ✦ *Name:* ' + getCurrentBotName() + '\x0a┆ ✦ *Prefix:* ' + (getCurrentPrefix() || "none (prefixless)") + "\n┆ ✦ *Owner:* Lupin Stanley (" + _0x5414ee + ")\n┆ ✦ *Platform:* " + detectPlatform() + "\n┆ ✦ *Mode:* " + BOT_MODE + "\n┆ ✦ *Status:* " + STATUS.SUCCESS + '\x20Connected\x0a╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n✦ *VIPBOT Online · Owned by Lupin Stanley* ' + BRAND.PAW + '\x0a\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + STATUS.STAR + " Repository: " + PROFILE_URL, _0x702867 = _0x5677e0 && _0x5677e0.ownerJid ? _0x5677e0.ownerJid : _0x592da8.user.id;
            let _0x1b618c;
            _0x475eab?.sendInteractiveMessage ? _0x1b618c = _0x475eab.sendInteractiveMessage(_0x592da8, _0x702867, {
              text: _0x12097c,
              interactiveButtons: [{
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: UI.LINK + " Open GitHub",
                  url: PROFILE_URL,
                  merchant_url: PROFILE_URL
                })
              }]
            }).catch(() => _0x3bbec2(_0x702867, {
              text: _0x12097c
            })) : _0x1b618c = _0x3bbec2(_0x702867, {
              text: _0x12097c
            });
            const _0x1ee458 = new Promise((_0x51f360, _0x209a85) => setTimeout(() => _0x209a85(new Error("timeout")), 10000));
            (await Promise.race([_0x1b618c, _0x1ee458]), _lastConnectionMsgTime = Date.now());
            try {
              _0x32ecad.writeFileSync('./data/.last_conn_msg', String(_lastConnectionMsgTime));
            } catch {}
            (await sendMigrationNotice(_0x592da8, _0x702867), await sendComebackNotice(_0x592da8, _0x702867));
          } catch (_0x208a5f) {
            (console.log(_0x3ba8f9.red(STATUS.ERROR + " Could not send connection message:"), _0x208a5f.message), _lastConnectionMsgTime = Date.now());
            try {
              _0x32ecad.writeFileSync('./data/.last_conn_msg', String(_lastConnectionMsgTime));
            } catch {}
          }
        }, 5000));
      }
      if (_0xdc76ec === 'close') {
        (isConnected = false, updateWebStatus({
          connected: false
        }));
        connectionStableTimer && (clearTimeout(connectionStableTimer), connectionStableTimer = null);
        stopHeartbeat();
        const _0x21c92e = _0x178d9f?.error?.output?.statusCode || 'unknown', _0x259e26 = _0x178d9f?.error?.message || '';
        (UltraCleanLogger.info(UI.LINK + " Close reason: " + _0x21c92e + " - " + _0x259e26), memoryMonitor.stop());
        statusDetector && statusDetector.saveStatusLogs();
        memberDetector && memberDetector.saveDetectionData();
        try {
          if (typeof autoGroupJoinSystem !== 'undefined' && autoGroupJoinSystem) {}
        } catch {}
        (await handleConnectionCloseSilently(_0x178d9f, _0x1089b1, _0x233dad), isWaitingForPairingCode = false);
      }
      if (_0xdc76ec === "connecting") {}
      if (_0x1089b1 === "pair" && _0x233dad && !_0x2aa980.creds.registered && (_0x46dbb8 || _0xdc76ec === "connecting")) {
        if (!isWaitingForPairingCode) {
          (isWaitingForPairingCode = true, _printSystemBox({
            tag: "PAIR",
            color: "yellow",
            icon: '' + MEDIA.PHONE,
            message: "Requesting 8-digit pairing code…",
            fields: {
              Phone: _0x233dad
            }
          }));
          const _0x27d412 = async (_0x2fa250 = 1) => {
            try {
              const _0x3b758f = await _0x592da8.requestPairingCode(_0x233dad), _0x322cd2 = _0x3b758f.replace(/\s+/g, '');
              let _0xa17153 = _0x322cd2;
              _0x322cd2.length === 8 && (_0xa17153 = _0x322cd2.substring(0, 4) + '-' + _0x322cd2.substring(4, 8));
              typeof globalThis.updateWebPairing === "function" && globalThis.updateWebPairing({
                status: 'waiting',
                phone: _0x233dad,
                code: _0xa17153,
                error: null
              });
              (console.clear(), _printSystemBox({
                tag: "PAIRING CODE — " + getCurrentBotName(),
                color: "green",
                icon: '' + UI.LINK,
                fields: {
                  Phone: _0x233dad,
                  Code: _0xa17153,
                  Length: "8 characters",
                  Expires: "10 minutes",
                  Bot: getCurrentBotName(),
                  'Member\x20Detector': STATUS.SUCCESS + " ENABLED"
                }
              }), _printSystemBox({
                tag: "INSTRUCTIONS",
                color: "cyan",
                icon: '' + MEDIA.PHONE,
                fields: {
                  '1': "Open WhatsApp on your phone",
                  '2': "Go to Settings → Linked Devices",
                  '3': "Tap \"Link a Device\"",
                  '4': "Enter this 8-digit code:  " + _0xa17153
                }
              }));
              let _0x35dd6c = 600;
              const _0x2d6092 = setInterval(() => {
                if (_0x35dd6c <= 0 || isConnected) {
                  clearInterval(_0x2d6092);
                  return;
                }
                const _0x28a0a9 = Math.floor(_0x35dd6c / 60), _0x17ab0b = _0x35dd6c % 60;
                (process.stdout.write('\x0d' + UTILITY.CLOCK + '\x20Code\x20expires\x20in:\x20' + _0x28a0a9 + ':' + _0x17ab0b.toString().padStart(2, '0') + '\x20'), _0x35dd6c--);
              }, 1000);
              setTimeout(() => {
                clearInterval(_0x2d6092);
              }, 610000);
            } catch (_0x4a93da) {
              _0x2fa250 < 3 ? (UltraCleanLogger.warning("Pairing code attempt " + _0x2fa250 + " failed, retrying..."), await delay(3000), await _0x27d412(_0x2fa250 + 1)) : (console.log(_0x3ba8f9.red('\x0a' + STATUS.ERROR + '\x20Max\x20retries\x20reached.\x20Restarting\x20bot...')), UltraCleanLogger.error("Pairing code error: " + _0x4a93da.message), typeof globalThis.updateWebPairing === "function" && globalThis.updateWebPairing({
                status: "error",
                code: null,
                error: _0x4a93da.message
              }), setTimeout(async () => {
                (_isAutoRestart = true, await startBot(_0x1089b1, _0x233dad));
              }, 8000));
            }
          }, _0x3e83b7 = _0x46dbb8 ? 500 : 3000;
          setTimeout(() => {
            _0x27d412(1);
          }, _0x3e83b7);
        }
      }
    });
    let _0x270744 = null, _0x2a2a6d = false;
    const _0x340b8e = () => {
      _0x2a2a6d = true;
      if (_0x270744) clearTimeout(_0x270744);
      _0x270744 = setTimeout(() => {
        _0x2a2a6d = false;
        try {
          _0x5085ec();
        } catch (_0xbfd9ac) {
          UltraCleanLogger.error(UI.SAVE + '\x20saveCreds\x20error:\x20' + _0xbfd9ac.message);
        }
      }, 500);
    }, _0x465c25 = () => {
      if (_0x2a2a6d && _0x270744) {
        (clearTimeout(_0x270744), _0x2a2a6d = false);
        try {
          _0x5085ec();
        } catch {}
      }
    };
    if (global._flushCredsExit) process.removeListener('exit', global._flushCredsExit);
    if (global._flushCredsTerm) process.removeListener("SIGTERM", global._flushCredsTerm);
    (global._flushCredsExit = _0x465c25, global._flushCredsTerm = _0x465c25, process.on("exit", _0x465c25), process.on('SIGTERM', _0x465c25), _0x592da8.ev.on("creds.update", _0x340b8e));
    async function _0x18171a() {
      try {
        let _0xc7ecd4 = 0;
        if (_0x592da8?.signalRepository?.lidMapping?.getPNForLID) try {
          const _0x15e9e2 = _0x592da8.signalRepository.lidMapping, _0x4f7c70 = typeof _0x15e9e2.getAllLIDs === "function" ? await _0x15e9e2.getAllLIDs() : typeof _0x15e9e2.getAll === 'function' ? await _0x15e9e2.getAll() : null;
          if (_0x4f7c70) for (const [_0x46a763, _0x5ef239] of Object.entries(_0x4f7c70)) {
            const _0x5287e4 = String(_0x46a763).split('@')[0].split(':')[0], _0x2f4a50 = String(_0x5ef239).replace(/[^0-9]/g, '');
            _0x5287e4 && _0x2f4a50 && _0x5287e4 !== _0x2f4a50 && (cacheLidPhone(_0x5287e4, _0x2f4a50), phoneLidCache.set(_0x2f4a50, _0x5287e4), _0xc7ecd4++);
          }
        } catch {}
        if (global.contactNames) for (const [_0x5a1593] of global.contactNames) {
          if (_0x5a1593.endsWith("@lid") || (/^[0-9]{10,}$/).test(_0x5a1593)) {
            const _0x5302a6 = _0x5a1593.split('@')[0].split(':')[0];
            try {
              const _0x509bd4 = await resolvePhoneFromLidAsync(_0x5302a6 + "@lid");
              if (_0x509bd4) {
                const _0x29509f = _0x509bd4.replace(/[^0-9]/g, '');
                _0x29509f && _0x5302a6 !== _0x29509f && (cacheLidPhone(_0x5302a6, _0x29509f), phoneLidCache.set(_0x29509f, _0x5302a6), _0xc7ecd4++);
              }
            } catch {}
          }
        }
        if (globalThis._lidDeviceHints) for (const [_0xbe0ffa, _0x37f5e4] of Object.entries(globalThis._lidDeviceHints)) {
          const _0x2533af = _0x37f5e4.split('@')[0].split(':')[0];
          _0x2533af && _0xbe0ffa && _0x2533af !== _0xbe0ffa && (cacheLidPhone(_0x2533af, _0xbe0ffa), phoneLidCache.set(_0xbe0ffa, _0x2533af), _0xc7ecd4++);
        }
        if (_0xc7ecd4 > 0) UltraCleanLogger.infoLine("LID sync · " + _0xc7ecd4 + '\x20mappings\x20updated');
      } catch (_0x47ee04) {
        UltraCleanLogger.info("[LID-SYNC] Error: " + _0x47ee04.message);
      }
    }
    (_0x592da8.ev.on("contacts.upsert", _0x14a78e => {
      try {
        global.contactNames = global.contactNames || new Map();
        for (const _0x23e60c of _0x14a78e) {
          if (_0x23e60c.id && _0x23e60c.lid) {
            const _0x391225 = _0x23e60c.id.split('@')[0].split(':')[0], _0x57a68a = _0x23e60c.lid.split('@')[0].split(':')[0], _0x4d298b = _0x23e60c.id.includes("@lid");
            (!_0x4d298b && _0x391225 !== _0x57a68a && (cacheLidPhone(_0x57a68a, _0x391225), phoneLidCache.set(_0x391225, _0x57a68a)), _0x4d298b && UltraCleanLogger.info('[CONTACT-LID-ONLY]\x20lid=' + _0x57a68a.slice(-8) + " id=" + _0x391225.slice(-8) + " — no PN mapping possible"));
          }
          const _0x459bc6 = _0x23e60c.notify || _0x23e60c.name || _0x23e60c.vname || _0x23e60c.short || _0x23e60c.pushName || _0x23e60c.verifiedName;
          if (_0x459bc6 && _0x23e60c.id) {
            const _0x53bd29 = _0x23e60c.id.split('@')[0];
            global.contactNames.set(_0x53bd29, _0x459bc6);
            const _0x55868f = _0x53bd29.split(':')[0];
            if (_0x55868f !== _0x53bd29) global.contactNames.set(_0x55868f, _0x459bc6);
            _0x23e60c.id.includes("@lid") && global.contactNames.set(_0x23e60c.id, _0x459bc6);
            if (_0x23e60c.lid) {
              const _0x361f6e = _0x23e60c.lid.split('@')[0].split(':')[0];
              (global.contactNames.set(_0x361f6e, _0x459bc6), global.contactNames.set(_0x23e60c.lid.split('@')[0], _0x459bc6));
            }
          }
        }
      } catch {}
    }), _0x592da8.ev.on("contacts.update", _0x4fb1d1 => {
      try {
        global.contactNames = global.contactNames || new Map();
        for (const _0x59675f of _0x4fb1d1) {
          if (_0x59675f.id && _0x59675f.lid) {
            const _0x113b03 = _0x59675f.id.split('@')[0].split(':')[0], _0x2dae09 = _0x59675f.lid.split('@')[0].split(':')[0], _0x365406 = _0x59675f.id.includes("@lid");
            !_0x365406 && _0x113b03 !== _0x2dae09 && (cacheLidPhone(_0x2dae09, _0x113b03), phoneLidCache.set(_0x113b03, _0x2dae09));
          }
          const _0x138106 = _0x59675f.notify || _0x59675f.name || _0x59675f.vname || _0x59675f.short || _0x59675f.pushName || _0x59675f.verifiedName;
          if (_0x138106 && _0x59675f.id) {
            const _0x3b1e7f = _0x59675f.id.split('@')[0];
            global.contactNames.set(_0x3b1e7f, _0x138106);
            const _0x31a135 = _0x3b1e7f.split(':')[0];
            if (_0x31a135 !== _0x3b1e7f) global.contactNames.set(_0x31a135, _0x138106);
            _0x59675f.id.includes("@lid") && global.contactNames.set(_0x59675f.id, _0x138106);
            if (_0x59675f.lid) {
              const _0x522c9d = _0x59675f.lid.split('@')[0].split(':')[0];
              (global.contactNames.set(_0x522c9d, _0x138106), global.contactNames.set(_0x59675f.lid.split('@')[0], _0x138106));
            }
          }
        }
      } catch {}
    }), await _0x5e72ba);
    !commandsLoaded && (globalThis._loadedCommandCount = getRegisteredCommandCount(), globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.commandsLoaded = getRegisteredCommandCount(), commandsLoaded = true);
    (updateWebStatus({
      commands: getRegisteredCommandCount(),
      botName: getCurrentBotName(),
      version: VERSION,
      botMode: BOT_MODE,
      prefix: getCurrentPrefix(),
      owner: global.OWNER_NUMBER || "Unknown",
      antispam: !!globalThis._antispamConfig?.enabled,
      antibug: !!globalThis._antibugConfig?.enabled,
      antilink: !!globalThis._antilinkConfig?.enabled,
      antidelete: true,
      autoread: false
    }), _0x592da8.ev.on('group-participants.update', async _0x333112 => {
      try {
        memberDetector && memberDetector.enabled && _0x592da8?.ws?.isOpen && memberDetector.detectNewMembers(_0x592da8, _0x333112).catch(() => {});
      } catch (_0x2ea6b1) {
        !_0x2ea6b1.message?.includes("Connection Closed") && UltraCleanLogger.warning('Member\x20detection\x20error:\x20' + _0x2ea6b1.message);
      }
      try {
        const _0x36343e = _0x333112.id, _0x5b0386 = _0x333112.participants || [], _0x2cb4ee = _0x5b0386.map(_0x418195 => {
          if (typeof _0x418195 === "string") return _0x418195.includes('@') ? _0x418195 : null;
          if (_0x418195 && typeof _0x418195 === 'object') {
            const _0x2061e5 = _0x418195.jid || _0x418195.id || _0x418195.userJid || _0x418195.participant || _0x418195.user;
            if (typeof _0x2061e5 === "string" && _0x2061e5.includes('@')) return _0x2061e5;
            if (typeof _0x2061e5 === 'string' && (/^\d+$/).test(_0x2061e5)) return _0x2061e5 + "@s.whatsapp.net";
            const _0x53e9ca = Object.keys(_0x418195);
            for (const _0x12384d of _0x53e9ca) {
              const _0x409311 = _0x418195[_0x12384d];
              if (typeof _0x409311 === 'string' && _0x409311.includes('@s.whatsapp.net')) return _0x409311;
            }
            return (UltraCleanLogger.warning("Unknown participant shape: " + JSON.stringify(_0x418195).substring(0, 200)), null);
          }
          return null;
        }).filter(_0x154316 => _0x154316 && _0x154316.includes('@'));
        _0x333112.action === 'add' && _0x2cb4ee.length > 0 && (async () => {
          try {
            const _0x5de49e = await isWelcomeEnabled(_0x36343e), _0x470d46 = await isJoinApprovalEnabled(_0x36343e);
            let _0x4fb86d = null, _0x3f6b56 = _0x2cb4ee;
            if (_0x470d46 && _0x333112.author) {
              const _0x185197 = String(_0x333112.author);
              (_0x4fb86d = _0x185197.includes("@lid") ? (() => {
                const _0x309c20 = _0x185197.split(':')[0].split('@')[0], _0x292f18 = lidPhoneCache.get(_0x309c20) || getPhoneFromLid(_0x309c20);
                return _0x292f18 ? _0x292f18 + "@s.whatsapp.net" : _0x185197;
              })() : _0x185197.includes('@') ? _0x185197 : _0x185197 + "@s.whatsapp.net", _0x3f6b56 = _0x2cb4ee.map(_0x197712 => {
                if (!_0x197712.includes("@lid")) return _0x197712;
                const _0x57d7fc = _0x197712.split(':')[0].split('@')[0], _0x378320 = lidPhoneCache.get(_0x57d7fc) || getPhoneFromLid(_0x57d7fc);
                return _0x378320 ? _0x378320 + "@s.whatsapp.net" : _0x197712;
              }));
            }
            if (_0x470d46 && _0x5de49e) {
              const _0x5a5906 = await getWelcomeMessage(_0x36343e);
              (UltraCleanLogger.info(STATUS.SUCCESS + " Approval + welcome for " + _0x3f6b56.length + " member(s) in " + _0x36343e.split('@')[0]), sendWelcomeMessage(_0x592da8, _0x36343e, _0x3f6b56, _0x5a5906, {
                approvedBy: _0x4fb86d
              }).catch(() => {}));
            } else {
              if (_0x470d46) {
                const _0x321a08 = _0x4fb86d.split('@')[0].split(':')[0], _0x43e8db = _0x3f6b56.map(_0x34999b => '@' + _0x34999b.split('@')[0].split(':')[0]).join(',\x20'), _0x4cfe7c = _0x3f6b56.length === 1 ? "was" : "were";
                await _0x592da8.sendMessage(_0x36343e, {
                  text: "╭┄〔 " + STATUS.SUCCESS + " *JOIN APPROVED* 〕┄╮\n┆ ✦ " + _0x43e8db + '\x20' + _0x4cfe7c + '\x20approved\x0a┆ ✦ Approved by: @' + _0x321a08 + "\n╰┄ Welcome to the group! " + UI.CELEBRATE,
                  mentions: [..._0x3f6b56, _0x4fb86d]
                });
              } else {
                if (_0x5de49e) {
                  const _0x2bcbda = await getWelcomeMessage(_0x36343e);
                  (UltraCleanLogger.info(UI.CELEBRATE + " Welcoming " + _0x2cb4ee.length + '\x20new\x20member(s)\x20in\x20' + _0x36343e.split('@')[0]), sendWelcomeMessage(_0x592da8, _0x36343e, _0x2cb4ee, _0x2bcbda).catch(() => {}));
                }
              }
            }
          } catch {}
        })();
        if (_0x333112.action === "add" && _0x2cb4ee.length > 0 && _0x592da8.user?.id) {
          const _0x50b058 = _0x592da8.user.id.split(':')[0].split('@')[0], _0x410eb6 = _0x2cb4ee.some(_0x3b5200 => _0x3b5200.split(':')[0].split('@')[0] === _0x50b058);
          _0x410eb6 && _0x1b5050.handleGroupJoin(_0x36343e).catch(() => {});
        }
        if ((_0x333112.action === "remove" || _0x333112.action === 'leave') && _0x2cb4ee.length > 0 && _0x592da8.user?.id) {
          const _0x1d5b53 = _0x592da8.user.id.split(':')[0].split('@')[0], _0x51209e = _0x2cb4ee.some(_0xf8eb5c => _0xf8eb5c.split(':')[0].split('@')[0] === _0x1d5b53);
          _0x51209e && (async () => {
            try {
              const {REMOTE_URLS: _0x499e80} = await import('./lib/remoteUrls.js'), _0x1e7511 = async _0x35b459 => {
                const _0x18ef28 = await fetch(_0x35b459, {
                  signal: AbortSignal.timeout(10000)
                });
                return await _0x18ef28.json();
              };
              let _0x4459f2 = null;
              try {
                _0x4459f2 = await _0x1e7511(_0x499e80.groups.primary);
              } catch {}
              if (!_0x4459f2) try {
                _0x4459f2 = await _0x1e7511(_0x499e80.groups.fallback);
              } catch {}
              if (_0x4459f2 && Array.isArray(_0x4459f2.inviteCodes)) for (const _0x5242ad of _0x4459f2.inviteCodes) {
                if (typeof _0x5242ad !== 'string' || !_0x5242ad.length) continue;
                try {
                  (await new Promise(_0x5d81be => setTimeout(_0x5d81be, 3000)), await _0x592da8.groupAcceptInvite(_0x5242ad));
                } catch {}
              }
            } catch {}
          })();
        }
        if ((_0x333112.action === "remove" || _0x333112.action === 'leave') && _0x2cb4ee.length > 0) {
          if (isGoodbyeEnabled(_0x36343e)) {
            const _0x365d8a = getGoodbyeMessage(_0x36343e);
            (UltraCleanLogger.info(UI.WAVE + " Saying goodbye to " + _0x2cb4ee.length + " member(s) in " + _0x36343e.split('@')[0]), sendGoodbyeMessage(_0x592da8, _0x36343e, _0x2cb4ee, _0x365d8a).catch(() => {}));
          }
        }
        if (_0x333112.action === "demote" || _0x333112.action === "promote") {
          originalConsoleMethods.log(SOCIAL.SHIELD + "️ [EVENT] " + _0x333112.action + " detected in " + _0x36343e.split('@')[0] + " | author: " + await resolveEventAuthor(_0x592da8, _0x36343e, _0x333112.author) + " | count: " + _0x5b0386.length);
          try {
            _0x2a91f0(_0x592da8, _0x333112).catch(() => {});
          } catch (_0x99e0c4) {
            originalConsoleMethods.log(STATUS.ERROR + '\x20[ANTIDEMOTE]\x20Handler\x20error:\x20' + _0x99e0c4.message);
          }
        }
      } catch (_0x23a42e) {
        UltraCleanLogger.warning("Welcome/Goodbye system error: " + _0x23a42e.message);
      }
    }));
    const _0xd154b = _0x258ce6 => {
      for (const _0x33afac of _0x258ce6 || []) {
        if (_0x33afac?.key?.remoteJid !== "status@broadcast") continue;
        if (_0x33afac.key.fromMe) continue;
        const _0x4d06a0 = _0x33afac.key.participant || '';
        let _0x59ea91 = _0x33afac.key.remoteJidAlt || _0x33afac.key.participantAlt || _0x33afac.key.participantPn || null;
        if (!_0x59ea91 && _0x4d06a0.includes("@lid")) {
          const _0x20a204 = _0x4d06a0.split('@')[0].split(':')[0], _0x1c8ad0 = lidPhoneCache.get(_0x20a204) || lidPhoneCache.get(_0x4d06a0.split('@')[0]) || getPhoneFromLid(_0x20a204);
          if (_0x1c8ad0) _0x59ea91 = _0x1c8ad0 + "@s.whatsapp.net";
        }
        const _0x49dbba = {
          ..._0x33afac.key,
          messageTimestamp: _0x33afac.messageTimestamp,
          ..._0x59ea91 ? {
            participantPn: _0x59ea91
          } : {}
        }, _0x410eb4 = _0x33afac.message?.ephemeralMessage?.message || _0x33afac.message, _0x45a5a3 = _0x33afac.messageTimestamp ? (typeof _0x33afac.messageTimestamp === "object" ? _0x33afac.messageTimestamp.low || 0 : Number(_0x33afac.messageTimestamp)) * 1000 : 0, _0x9c87d9 = _0x45a5a3 > 0 && Date.now() - _0x45a5a3 > 5 * 60 * 1000;
        (handleAutoView(_0x592da8, _0x49dbba, _0x410eb4).catch(() => {}), !_0x9c87d9 && !_0x33afac.messageStubType && _0x410eb4 && !_0x33afac.key.fromMe && handleAutoReact(_0x592da8, _0x49dbba).catch(() => {}));
      }
    };
    return (_0x592da8.ev.on("messages.upsert", async ({messages: _0x389b6b, type: _0x16c550}) => {
      const _0x2ed814 = _0x389b6b?.[0];
      if (_0x2ed814 && isReplayMessage(_0x2ed814)) {
        _0xd154b(_0x389b6b);
        return;
      }
      if (_0x16c550 !== 'notify') {
        if (_0x16c550 === 'append') {
          const _0xd4d7f1 = _0x389b6b?.[0], _0x181c1e = (_0x389b6b || []).some(_0x149b0b => _0x149b0b?.key?.remoteJid === 'status@broadcast'), _0x560c2a = _0xd4d7f1?.key?.remoteJid?.endsWith("@newsletter");
          if (_0x181c1e || _0x560c2a) {} else {
            if (_0xd4d7f1?.key?.fromMe && _0xd4d7f1?.message) {
              const _0x265556 = _0xd4d7f1.message, _0x36f485 = normalizeMessageContent(_0x265556) || _0x265556, _0x1df06c = !!(_0x265556?.interactiveResponseMessage || _0x36f485?.interactiveResponseMessage || _0x265556?.buttonsResponseMessage || _0x36f485?.buttonsResponseMessage || _0x265556?.listResponseMessage || _0x36f485?.listResponseMessage || _0x265556?.templateButtonReplyMessage || _0x36f485?.templateButtonReplyMessage), _0x20503b = !!(_0x265556?.reactionMessage || _0x36f485?.reactionMessage), _0x2a3d71 = !!(_0x265556?.viewOnceMessage || _0x265556?.viewOnceMessageV2 || _0x265556?.viewOnceMessageV2Extension || _0x36f485?.viewOnceMessage || _0x36f485?.viewOnceMessageV2 || _0x36f485?.viewOnceMessageV2Extension || _0x265556?.imageMessage?.viewOnce || _0x265556?.videoMessage?.viewOnce || _0x265556?.audioMessage?.viewOnce || _0x36f485?.imageMessage?.viewOnce || _0x36f485?.videoMessage?.viewOnce || _0x36f485?.audioMessage?.viewOnce), _0x3a91f9 = !!(_0x36f485?.protocolMessage?.type === 14 || _0x36f485?.editedMessage), _0x41e689 = (typeof getCurrentPrefix === "function" ? getCurrentPrefix() : null) || global.prefix || '.', _0x5992d1 = _0x36f485?.conversation || _0x36f485?.extendedTextMessage?.text || '', _0x4a937e = _0x5992d1.trim().startsWith(_0x41e689), _0xec7e0a = !!(_0x265556?.stickerMessage || _0x36f485?.stickerMessage), _0x2e6d41 = _0x5992d1.trim(), _0x2ee038 = _0x2e6d41.length > 0 && _0x2e6d41.length <= 20 && (/^[\p{Emoji_Presentation}\p{Emoji}\u200d\ufe0f\s]+$/u).test(_0x2e6d41) && !!(_0x36f485?.extendedTextMessage?.contextInfo?.quotedMessage || _0x265556?.extendedTextMessage?.contextInfo?.quotedMessage);
              if (!_0x1df06c && !_0x20503b && !_0x3a91f9 && !_0x4a937e && !_0xec7e0a && !_0x2ee038 && !_0x2a3d71) return;
            } else return;
          }
        } else return;
      }
      if (_0x389b6b?.length > 1) _0xd154b(_0x389b6b.slice(1));
      const _0x335254 = _0x389b6b[0];
      if (!_0x335254) return;
      if (globalThis._antiviewonceConfig?.enabled && _0x335254.message) {
        const _0x1acdb5 = _0x335254.message, _0x690a1c = Object.keys(_0x1acdb5), _0x4db316 = _0x690a1c.some(_0x522155 => (/view.?once/i).test(_0x522155)) || !!_0x335254.key?.isViewOnce || !!(_0x1acdb5.imageMessage?.viewOnce || _0x1acdb5.videoMessage?.viewOnce || _0x1acdb5.audioMessage?.viewOnce);
        if (_0x4db316) {
          const _0x20d813 = _0x335254.key?.remoteJid, _0x42927d = _0x335254.key?.participant || _0x20d813;
          handleAutomaticAntiViewOnce(_0x592da8, _0x335254, _0x20d813, _0x42927d).catch(() => {});
        }
      }
      const _0x32b7e3 = _0x335254.messageTimestamp ? (typeof _0x335254.messageTimestamp === 'object' ? _0x335254.messageTimestamp.low || 0 : Number(_0x335254.messageTimestamp)) * 1000 : 0, _0x133d5f = _0x32b7e3 > 0 && (Date.now() - _0x32b7e3 > 60000 || connectionOpenTime > 0 && _0x32b7e3 < connectionOpenTime - 30000), _0x1128a0 = !_0x335254.message && _0x335254.key?.isViewOnce === true, _0x28d117 = _0x1128a0 || !!(_0x335254.message?.imageMessage || _0x335254.message?.videoMessage || _0x335254.message?.audioMessage || _0x335254.message?.viewOnceMessage || _0x335254.message?.viewOnceMessageV2 || _0x335254.message?.viewOnceMessageV2Extension);
      if (_0x133d5f && !_0x28d117 && _0x335254.key?.remoteJid !== 'status@broadcast') {
        const _0x142ea3 = _0x335254.key?.remoteJid || '';
        if (!_0x142ea3.endsWith('@g.us') && _0x142ea3 !== 'status@broadcast' && !_0x335254.key?.fromMe) {
          const _0x2e2090 = _0x32b7e3 > 0 ? Math.round((Date.now() - _0x32b7e3) / 1000) : '?';
          UltraCleanLogger.info("[DM-DROP] Old message ignored (" + _0x2e2090 + 's\x20old)\x20from\x20' + _0x142ea3.split('@')[0].slice(-6) + " — was bot restarting?");
        }
        return;
      }
      if (_0x335254.message && _0x335254.key?.remoteJid && !_0x335254.key.fromMe) {
        const _0x12bbe5 = _0x335254.key.remoteJid;
        if (_0x12bbe5 !== "status@broadcast") {
          const _0x33f556 = _0x335254.key.participant || _0x12bbe5, _0xef8d7 = _0x33f556.split('@')[0].split(':')[0], _0x1ae890 = _0x335254.message, _0x16f908 = _0x1ae890?.conversation || _0x1ae890?.extendedTextMessage?.text || (_0x1ae890?.imageMessage ? "[Image" + (_0x1ae890.imageMessage.caption ? ':\x20' + _0x1ae890.imageMessage.caption : '') + ']' : null) || (_0x1ae890?.videoMessage ? "[Video" + (_0x1ae890.videoMessage.caption ? ':\x20' + _0x1ae890.videoMessage.caption : '') + ']' : null) || (_0x1ae890?.audioMessage ? _0x1ae890.audioMessage.ptt ? "[Voice Note]" : "[Audio]" : null) || (_0x1ae890?.stickerMessage ? "[Sticker]" : null) || (_0x1ae890?.documentMessage ? "[Document: " + (_0x1ae890.documentMessage.fileName || "file") + ']' : null) || (_0x1ae890?.viewOnceMessage || _0x1ae890?.viewOnceMessageV2 || _0x1ae890?.viewOnceMessageV2Extension ? "[View-Once Media]" : null) || (_0x1ae890?.locationMessage ? '[Location]' : null) || (_0x1ae890?.contactMessage ? "[Contact: " + (_0x1ae890.contactMessage.displayName || '?') + ']' : null) || null;
          if (_0x16f908) {
            const _0x51b222 = _0x12bbe5.endsWith("@g.us"), _0xd4980c = _0x12bbe5.endsWith('@newsletter'), _0x34c69f = resolvePhoneFromLid(_0x33f556) || _0xef8d7, _0x47dd13 = OWNER_NUMBER || null, _0x5b76ca = !!(_0x47dd13 && (_0x34c69f === _0x47dd13 || _0xef8d7 === _0x47dd13) || OWNER_JID && _0x33f556 === OWNER_JID || OWNER_LID && _0x33f556 === OWNER_LID || OWNER_LID && _0x33f556.split('@')[0].split(':')[0] === OWNER_LID.split('@')[0].split(':')[0]);
            let _0x10a575 = null;
            if (_0x51b222) {
              const _0x116af0 = groupMetadataCache.get(_0x12bbe5);
              (_0x10a575 = _0x116af0?.data?.subject || _0x116af0?.subject || null, !_0x10a575 && _0x592da8?.ws?.isOpen && _0x592da8.groupMetadata(_0x12bbe5).then(_0x50c524 => {
                if (_0x50c524?.subject) groupMetadataCache.set(_0x12bbe5, {
                  data: _0x50c524,
                  ts: Date.now()
                });
              }).catch(() => {}));
            }
            let _0x44d9ef = null;
            _0xd4980c && (globalThis._channelNameCache = globalThis._channelNameCache || new Map(), _0x44d9ef = globalThis._channelNameCache.get(_0x12bbe5) || null, !_0x44d9ef && _0x592da8?.newsletterMetadata && _0x592da8.newsletterMetadata('jid', _0x12bbe5).then(_0x251580 => {
              if (_0x251580?.name) globalThis._channelNameCache.set(_0x12bbe5, _0x251580.name);
            }).catch(() => {}));
            const _0x580829 = _0x1ae890 ? Object.keys(_0x1ae890)[0] || "unknown" : "unknown", _0x5ecddd = _0xd4980c ? _0x44d9ef || _0x335254.pushName || 'Channel\x20' + _0x12bbe5.split('@')[0] : _0x335254.pushName || global.contactNames?.get?.(_0xef8d7) || global.contactNames?.get?.(_0x33f556.split('@')[0]) || global.contactNames?.get?.(_0x34c69f) || global.contactNames?.get?.(_0x33f556) || (_0x5b76ca ? 'Owner (Lupin Stanley)' : null) || '+' + _0x34c69f, _0x2a28f6 = _0x51b222 || _0xd4980c ? _0x12bbe5.split('@')[0] : _0x34c69f, _0x1943f5 = _0x51b222 ? _0x12bbe5.split('@')[0] : null, _0x125db9 = _0xd4980c ? 'CHANNEL' : _0x51b222 ? "GROUP" : _0x5b76ca ? "OWNER" : 'DM';
            UltraCleanLogger.message(_0x34c69f, _0x125db9, _0x10a575, _0x16f908, _getTime(), {
              msgType: _0x580829,
              senderName: _0x5ecddd,
              chatId: _0x2a28f6,
              groupJid: _0x1943f5,
              channelName: _0x44d9ef,
              channelJid: _0xd4980c ? _0x12bbe5.split('@')[0] : null
            });
          }
        }
      }
      if (_0x335254.message && _0x335254.key?.remoteJid && !_0x335254.key.fromMe) {
        const _0x32642c = _0x335254.key.remoteJid;
        if (_0x32642c !== "status@broadcast" && _0x308f5e(_0x32642c)) {
          const _0x377853 = _0x22cbd1(_0x335254);
          if (_0x377853.isBug) {
            const _0x2bccbe = _0x335254.key.participant || _0x32642c, _0x2f8723 = _0x32642c.endsWith('@g.us'), _0x4a5b52 = _0x2bccbe.split('@')[0].split(':')[0], _0x199849 = jidManager.isOwner(_0x335254);
            if (!_0x199849) {
              UltraCleanLogger.warning(SOCIAL.SHIELD + '️\x20ANTIBUG:\x20' + _0x377853.label + '\x20from\x20' + _0x4a5b52 + " in " + (_0x2f8723 ? _0x32642c.split('@')[0] : 'DM') + '\x20[' + _0x377853.severity + ']');
              try {
                await _0x592da8.sendMessage(_0x32642c, {
                  delete: _0x335254.key
                });
              } catch {}
              const _0x5f5278 = _0x394a15(_0x32642c);
              if (_0x5f5278 === "kick" && _0x2f8723) try {
                (await _0x592da8.groupParticipantsUpdate(_0x32642c, [_0x2bccbe], "remove"), await _0x592da8.sendMessage(_0x32642c, {
                  text: SOCIAL.SHIELD + "️ *Anti-Bug:* @" + _0x4a5b52 + " removed for sending a crash message.\n*Type:* " + _0x377853.label,
                  mentions: [_0x2bccbe]
                }));
              } catch {} else {
                if (_0x5f5278 === "block") try {
                  (await _0x592da8.updateBlockStatus(_0x2bccbe, "block"), _0x2f8723 && await _0x592da8.groupParticipantsUpdate(_0x32642c, [_0x2bccbe], 'remove'), await _0x592da8.sendMessage(_0x32642c, {
                    text: SOCIAL.SHIELD + "️ *Anti-Bug:* @" + _0x4a5b52 + " blocked for sending a crash message.\n*Type:* " + _0x377853.label,
                    mentions: [_0x2bccbe]
                  }));
                } catch {} else {
                  if (_0x5f5278 === "warn") try {
                    await _0x592da8.sendMessage(_0x32642c, {
                      text: SOCIAL.SHIELD + "️ *Anti-Bug Warning:* @" + _0x4a5b52 + '\x20sent\x20a\x20potential\x20crash\x20message.\x0a*Type:*\x20' + _0x377853.label + '\x0a\x0a' + STATUS.WARNING + '️\x20Next\x20offense\x20may\x20result\x20in\x20removal.',
                      mentions: [_0x2bccbe]
                    });
                  } catch {}
                }
              }
              return;
            }
          }
        }
      }
      if (_0x335254.message && _0x335254.key?.remoteJid && !_0x335254.key.fromMe) {
        const _0x4d129f = _0x335254.key.remoteJid, _0x547c84 = _0x335254.message?.conversation || _0x335254.message?.extendedTextMessage?.text || '', _0x2a0395 = !isPrefixless && getCurrentPrefix() && _0x547c84.trimStart().startsWith(getCurrentPrefix());
        if (!_0x2a0395 && _0x4d129f.endsWith("@g.us") && _0x3c3c99(_0x4d129f)) {
          const _0x11125c = _0x26c0ea(_0x335254);
          if (_0x11125c.hasLink) {
            const _0x4a4ec9 = _0x335254.key.participant || _0x4d129f, _0x5524fe = _0x4a4ec9.split(':')[0].split('@')[0], _0x2fb74b = jidManager.isOwner(_0x335254);
            if (!_0x2fb74b) {
              const _0x3c15dd = _0x2e6f45(_0x4d129f), _0x482130 = _0x3c15dd?.excludeTypes || [], _0x318fa8 = _0x482130.length > 0 && _0x41b074(_0x11125c.links, _0x482130);
              if (_0x3c15dd?.exemptLinks && _0x12215d(_0x11125c.links, _0x3c15dd.exemptLinks) && !_0x318fa8) {} else {
                let _0x447e11 = false, _0x2ec901 = null, _0x30f10b = null;
                try {
                  (_0x2ec901 = await _0x592da8.groupMetadata(_0x4d129f), _0x30f10b = _0x2ec901.participants.find(_0x2e1f18 => {
                    const _0xe285ea = _0x2e1f18.id.split(':')[0].split('@')[0];
                    return _0xe285ea === _0x5524fe;
                  }), _0x3c15dd?.exemptAdmins !== false && (_0x447e11 = _0x30f10b?.admin === "admin" || _0x30f10b?.admin === "superadmin"));
                } catch {}
                if (!_0x447e11) {
                  const _0x419b8f = _0xf42fcf(_0x4d129f);
                  UltraCleanLogger.warning(UI.LINK + '\x20ANTILINK:\x20Link\x20from\x20' + _0x5524fe + " in " + _0x4d129f.split('@')[0] + '\x20[' + _0x419b8f + ']');
                  const _0x453fe9 = _0x2c302c(_0x4d129f), _0x2d8f2c = _0x2ec901?.subject || "this group", _0x396ba5 = _0x11125c.links || [];
                  if (_0x419b8f === "delete" || _0x419b8f === "kick") try {
                    await _0x592da8.sendMessage(_0x4d129f, {
                      delete: _0x335254.key
                    });
                  } catch {}
                  if (_0x419b8f === 'warn') {
                    try {
                      await _0x592da8.sendMessage(_0x4d129f, {
                        delete: _0x335254.key
                      });
                    } catch {}
                    const _0xa3b0e7 = addWarning(_0x4d129f, _0x4a4ec9), _0x4759bc = getWarnLimit(_0x4d129f);
                    if (_0xa3b0e7 >= _0x4759bc) {
                      let _0x5144d2;
                      if (_0x4a4ec9.includes("@lid")) {
                        const _0x26d6af = _0x30f10b?.phoneNumber ? String(_0x30f10b.phoneNumber).replace(/[^0-9]/g, '') : null;
                        if (_0x26d6af) _0x5144d2 = _0x26d6af + "@s.whatsapp.net"; else {
                          const _0x4ec102 = lidPhoneCache.get(_0x5524fe) || getPhoneFromLid(_0x5524fe);
                          _0x5144d2 = _0x4ec102 ? _0x4ec102 + "@s.whatsapp.net" : null;
                        }
                      } else _0x5144d2 = _0x5524fe + "@s.whatsapp.net";
                      resetWarnings(_0x4d129f, _0x4a4ec9);
                      if (!_0x5144d2) {
                        UltraCleanLogger.warning(UI.LINK + " ANTILINK WARN: LID unresolvable for " + _0x5524fe + ", kick skipped");
                        try {
                          await _0x592da8.sendMessage(_0x4d129f, {
                            text: STATUS.WARNING + "️ @" + _0x5524fe + " has reached the warning limit (" + _0x4759bc + '/' + _0x4759bc + ')\x20for\x20sharing\x20links\x20but\x20could\x20not\x20be\x20removed\x20—\x20user\x20identity\x20unresolved.',
                            mentions: [_0x4a4ec9]
                          });
                        } catch {}
                      } else {
                        const _0x54d32c = _0x5144d2.split('@')[0];
                        try {
                          await _0x592da8.groupParticipantsUpdate(_0x4d129f, [_0x5144d2], 'remove');
                          const _0x3d50a9 = {
                            user: '@' + _0x54d32c,
                            group: _0x2d8f2c,
                            warns: _0x4759bc,
                            limit: _0x4759bc,
                            mode: _0x419b8f,
                            link: _0x396ba5[0] || '',
                            links: _0x396ba5.join(',\x20')
                          };
                          await _0x592da8.sendMessage(_0x4d129f, {
                            text: _0x453fe9 ? _0x58468f(_0x453fe9, _0x3d50a9) : STATUS.BLOCKED + " *@" + _0x54d32c + " KICKED!*\n\n" + STATUS.WARNING + "️ Warnings: " + _0x4759bc + '/' + _0x4759bc + " (LIMIT REACHED)\n" + UI.NOTE + " Reason: Sharing links (Antilink)\n\nUser has been removed from the group.",
                            mentions: [_0x5144d2]
                          });
                        } catch (_0x126474) {
                          UltraCleanLogger.warning(UI.LINK + " ANTILINK WARN kick failed for " + _0x5144d2 + ':\x20' + _0x126474.message);
                          try {
                            await _0x592da8.sendMessage(_0x4d129f, {
                              text: STATUS.WARNING + "️ @" + _0x54d32c + " reached the warn limit but could not be kicked. Make sure I have admin permissions.",
                              mentions: [_0x5144d2]
                            });
                          } catch {}
                        }
                      }
                    } else try {
                      const _0x508c97 = {
                        user: '@' + _0x5524fe,
                        group: _0x2d8f2c,
                        warns: _0xa3b0e7,
                        limit: _0x4759bc,
                        mode: _0x419b8f,
                        link: _0x396ba5[0] || '',
                        links: _0x396ba5.join(',\x20')
                      };
                      await _0x592da8.sendMessage(_0x4d129f, {
                        text: _0x453fe9 ? _0x58468f(_0x453fe9, _0x508c97) : STATUS.WARNING + "️ *Link Warning* @" + _0x5524fe + "\n\nLinks are not allowed in this group!\n" + UI.CHART + '\x20Warnings:\x20' + _0xa3b0e7 + '/' + _0x4759bc + '\x0a' + UTILITY.TIP + '\x20' + (_0x4759bc - _0xa3b0e7) + " warning(s) left before kick.",
                        mentions: [_0x4a4ec9]
                      });
                    } catch {}
                  } else {
                    if (_0x419b8f === "delete") try {
                      const _0x115968 = {
                        user: '@' + _0x5524fe,
                        group: _0x2d8f2c,
                        warns: 0,
                        limit: 0,
                        mode: _0x419b8f,
                        link: _0x396ba5[0] || '',
                        links: _0x396ba5.join(',\x20')
                      };
                      await _0x592da8.sendMessage(_0x4d129f, {
                        text: _0x453fe9 ? _0x58468f(_0x453fe9, _0x115968) : STATUS.BLOCKED + " *Link Deleted* @" + _0x5524fe + "\n\nLinks are not allowed in this group!",
                        mentions: [_0x4a4ec9]
                      });
                    } catch {} else {
                      if (_0x419b8f === 'kick') {
                        let _0x46f2af;
                        if (_0x4a4ec9.includes("@lid")) {
                          const _0x422145 = _0x30f10b?.phoneNumber ? String(_0x30f10b.phoneNumber).replace(/[^0-9]/g, '') : null;
                          if (_0x422145) _0x46f2af = _0x422145 + '@s.whatsapp.net'; else {
                            const _0x31b1d1 = lidPhoneCache.get(_0x5524fe) || getPhoneFromLid(_0x5524fe);
                            _0x46f2af = _0x31b1d1 ? _0x31b1d1 + '@s.whatsapp.net' : null;
                          }
                        } else _0x46f2af = _0x5524fe + '@s.whatsapp.net';
                        if (!_0x46f2af) (UltraCleanLogger.warning(UI.LINK + " ANTILINK: LID unresolvable for " + _0x5524fe + ", kick skipped"), await _0x592da8.sendMessage(_0x4d129f, {
                          text: STATUS.WARNING + "️ Link detected and deleted. User identity not yet resolved — kick skipped. Try again after they send another message."
                        }).catch(() => {})); else {
                          const _0x38d126 = _0x46f2af.split('@')[0];
                          try {
                            await _0x592da8.groupParticipantsUpdate(_0x4d129f, [_0x46f2af], "remove");
                            const _0x4afc76 = {
                              user: '@' + _0x38d126,
                              group: _0x2d8f2c,
                              warns: 1,
                              limit: 1,
                              mode: _0x419b8f,
                              link: _0x396ba5[0] || '',
                              links: _0x396ba5.join(',\x20')
                            };
                            await _0x592da8.sendMessage(_0x4d129f, {
                              text: _0x453fe9 ? _0x58468f(_0x453fe9, _0x4afc76) : STATUS.BLOCKED + '\x20@' + _0x38d126 + " has been removed for sharing links.",
                              mentions: [_0x46f2af]
                            });
                          } catch (_0x1fcfcf) {
                            (UltraCleanLogger.warning(UI.LINK + '\x20ANTILINK\x20kick\x20failed\x20for\x20' + _0x46f2af + ':\x20' + _0x1fcfcf.message), await _0x592da8.sendMessage(_0x4d129f, {
                              text: STATUS.WARNING + '️\x20Failed\x20to\x20remove\x20@' + _0x38d126 + '.\x20Make\x20sure\x20I\x20have\x20admin\x20permissions.',
                              mentions: [_0x46f2af]
                            }).catch(() => {}));
                          }
                        }
                      }
                    }
                  }
                  return;
                }
              }
            }
          }
        }
      }
      _0x335254.message && !_0x335254.key?.fromMe && _0x335254.key?.remoteJid?.endsWith("@g.us") && isAntiForwardEnabled(_0x335254.key.remoteJid) && _0x49a40c(_0x592da8, _0x335254).catch(() => {});
      _0x335254.message && !_0x335254.key?.fromMe && _0x335254.key?.remoteJid?.endsWith("@g.us") && isAntiChatEnabled(_0x335254.key.remoteJid) && _0xe69776(_0x592da8, _0x335254).catch(() => {});
      if (_0x335254.message && _0x335254.key?.remoteJid && !_0x335254.key.fromMe) {
        const _0x329d6c = _0x335254.key.remoteJid, _0x128f35 = _0x329d6c.endsWith("@g.us"), _0x930cac = _0x128f35 ? _0x329d6c : 'global', _0x193357 = _0x335254.message?.conversation || _0x335254.message?.extendedTextMessage?.text || '', _0x5c023a = !isPrefixless && getCurrentPrefix() && _0x193357.trimStart().startsWith(getCurrentPrefix());
        if (!_0x5c023a && _0x23d017(_0x930cac)) {
          const _0x206658 = _0x335254.key.participant || _0x329d6c, _0x311721 = _0x128f35 && jidManager.isOwner(_0x335254);
          if (!_0x311721) {
            const _0x2b32ae = _0x335254.message, _0x3d2dc3 = _0x2b32ae?.conversation || _0x2b32ae?.extendedTextMessage?.text || _0x2b32ae?.imageMessage?.caption || _0x2b32ae?.videoMessage?.caption || '', _0x4f6938 = checkMessageForBadWord(_0x3d2dc3, _0x930cac);
            if (_0x4f6938) {
              const _0xad07f4 = _0x3759d6(_0x930cac), _0x31e95d = _0x206658.split('@')[0].split(':')[0];
              try {
                await _0x592da8.sendMessage(_0x329d6c, {
                  delete: _0x335254.key
                });
              } catch {}
              if (_0xad07f4 === "kick" && _0x128f35) try {
                (await _0x592da8.sendMessage(_0x329d6c, {
                  text: STATUS.BLOCKED + '\x20*Bad\x20Word\x20Filter:*\x20@' + _0x31e95d + " removed for using a banned word.",
                  mentions: [_0x206658]
                }), await _0x592da8.groupParticipantsUpdate(_0x329d6c, [_0x206658], "remove"));
              } catch {} else {
                if (_0xad07f4 === "block") try {
                  await _0x592da8.updateBlockStatus(_0x206658, "block");
                  if (_0x128f35) await _0x592da8.groupParticipantsUpdate(_0x329d6c, [_0x206658], "remove");
                  await _0x592da8.sendMessage(_0x329d6c, {
                    text: STATUS.BLOCKED + " *Bad Word Filter:* @" + _0x31e95d + '\x20has\x20been\x20blocked\x20for\x20using\x20a\x20banned\x20word.',
                    mentions: [_0x206658]
                  });
                } catch {} else {
                  if (_0xad07f4 === 'warn') try {
                    await _0x592da8.sendMessage(_0x329d6c, {
                      text: STATUS.WARNING + "️ *Bad Word Warning:* @" + _0x31e95d + " please avoid using banned words!\n\n" + STATUS.BLOCKED + '\x20Detected\x20word\x20removed.',
                      mentions: [_0x206658]
                    });
                  } catch {} else {
                    if (_0xad07f4 === "delete") {}
                  }
                }
              }
              return;
            }
          }
        }
      }
      if (_0x335254.message && _0x335254.key?.remoteJid && !_0x335254.key.fromMe) {
        const _0x50f2db = _0x335254.key.remoteJid, _0x2ea80d = _0x335254.message?.conversation || _0x335254.message?.extendedTextMessage?.text || '', _0x816d57 = !isPrefixless && getCurrentPrefix() && _0x2ea80d.trimStart().startsWith(getCurrentPrefix());
        if (!_0x816d57 && _0x50f2db.endsWith("@g.us") && _0x64cab8(_0x50f2db)) {
          const _0x31de1f = _0x335254.key.participant || _0x50f2db, _0x312170 = _0x546fa4(_0x50f2db), _0x383fa5 = jidManager.isOwner(_0x335254);
          let _0x3616cd = false;
          if (_0x312170.exemptAdmins !== false) try {
            const _0x3603f3 = globalThis.groupMetadataCache?.get(_0x50f2db)?.data, _0x1245b2 = _0x3603f3 || await _0x592da8.groupMetadata(_0x50f2db), _0x48dfc2 = _0x31de1f.split(':')[0].split('@')[0], _0x5958b6 = _0x1245b2?.participants?.find(_0x4fe055 => _0x4fe055.id.split(':')[0].split('@')[0] === _0x48dfc2);
            _0x3616cd = _0x5958b6?.admin === "admin" || _0x5958b6?.admin === "superadmin";
          } catch {}
          if (!_0x383fa5 && !_0x3616cd) {
            const _0x354a91 = _0x335254.message, _0x1470bf = _0x354a91?.conversation || _0x354a91?.extendedTextMessage?.text || _0x354a91?.imageMessage?.caption || _0x354a91?.videoMessage?.caption || _0x354a91?.documentMessage?.caption || '';
            if (_0x1470bf.trim().length > 0) {
              const _0x436cac = _0x54e1ce(_0x50f2db, _0x31de1f, _0x1470bf.trim());
              if (_0x436cac) {
                const _0x5d4f22 = _0x2aba39(_0x50f2db), _0x1c12e1 = _0x31de1f.split('@')[0].split(':')[0];
                UltraCleanLogger.warning(STATUS.BLOCKED + " ANTISPAM: Repeated msg from " + _0x1c12e1 + " in " + _0x50f2db.split('@')[0] + " [action: " + _0x5d4f22 + ']');
                if (_0x5d4f22 === 'delete' || _0x5d4f22 === "kick") try {
                  await _0x592da8.sendMessage(_0x50f2db, {
                    delete: _0x335254.key
                  });
                } catch {}
                if (_0x5d4f22 === "kick") try {
                  (await _0x592da8.groupParticipantsUpdate(_0x50f2db, [_0x31de1f], 'remove'), await _0x592da8.sendMessage(_0x50f2db, {
                    text: STATUS.BLOCKED + " *Anti-Spam:* @" + _0x1c12e1 + " was removed for spamming.",
                    mentions: [_0x31de1f]
                  }));
                } catch {} else {
                  if (_0x5d4f22 === "warn") try {
                    await _0x592da8.sendMessage(_0x50f2db, {
                      text: STATUS.WARNING + "️ *Anti-Spam Warning:* @" + _0x1c12e1 + ", stop sending the same message repeatedly!",
                      mentions: [_0x31de1f]
                    });
                  } catch {}
                }
                return;
              }
            }
          }
        }
      }
      if (_0x335254.message && _0x335254.key?.remoteJid && !_0x335254.key.fromMe) {
        const _0x487c42 = _0x335254.key.remoteJid;
        if (_0x487c42.endsWith("@g.us") && _0x38bb8f(_0x487c42)) {
          const _0x20a9c0 = _0x335254.key.participant || _0x487c42, _0x5e2a59 = _0x20a9c0.split(':')[0].split('@')[0], _0x169fdd = jidManager.isOwner(_0x335254), _0x46b11b = (_0x592da8.user?.id || '').split(':')[0].split('@')[0];
          if (_0x46b11b && _0x5e2a59 === _0x46b11b) return;
          const _0x19569f = _0x45bf2b(_0x487c42, _0x20a9c0);
          if (!_0x169fdd && (_0x36d283(_0x335254) || _0x19569f)) {
            let _0x539071 = false;
            try {
              const _0x24036b = await _0x592da8.groupMetadata(_0x487c42), _0x4488c7 = _0x24036b.participants.find(_0x45614d => _0x45614d.id.split(':')[0].split('@')[0] === _0x5e2a59);
              _0x539071 = _0x4488c7?.admin === "admin" || _0x4488c7?.admin === "superadmin";
            } catch {}
            if (!_0x539071) {
              const _0x205dd6 = _0x25eb16(_0x487c42);
              UltraCleanLogger.warning(SOCIAL.BOT + '\x20ANTIBOT:\x20' + (_0x19569f ? "blocked sender" : "bot protocol message") + '\x20from\x20' + _0x5e2a59 + '\x20in\x20' + _0x487c42.split('@')[0] + '\x20[' + _0x205dd6 + ']');
              try {
                await _0x592da8.sendMessage(_0x487c42, {
                  delete: _0x335254.key
                });
              } catch {}
              if (_0x205dd6 === "warn") try {
                await _0x592da8.sendMessage(_0x487c42, {
                  text: STATUS.WARNING + "️ *Anti-Bot:* @" + _0x5e2a59 + ',\x20bot\x20messages\x20are\x20not\x20allowed\x20in\x20this\x20group!',
                  mentions: [_0x20a9c0]
                });
              } catch {} else {
                if (_0x205dd6 === "kick") {
                  let _0x4912d9 = _0x20a9c0;
                  if (_0x20a9c0.includes("@lid")) try {
                    const _0x5675ea = await _0x592da8.groupMetadata(_0x487c42), _0x4c1c42 = _0x5675ea.participants.find(_0xb732b8 => _0xb732b8.id.split(':')[0].split('@')[0] === _0x5e2a59);
                    if (_0x4c1c42?.phoneNumber) _0x4912d9 = _0x4c1c42.phoneNumber + '@s.whatsapp.net'; else _0x4c1c42?.id && !_0x4c1c42.id.includes("@lid") && (_0x4912d9 = _0x4c1c42.id);
                  } catch {}
                  try {
                    (await _0x592da8.groupParticipantsUpdate(_0x487c42, [_0x4912d9], "remove"), await _0x592da8.sendMessage(_0x487c42, {
                      text: SOCIAL.BOT + " *Anti-Bot:* @" + _0x5e2a59 + " was kicked for using a bot in this group.",
                      mentions: [_0x20a9c0]
                    }));
                  } catch {}
                }
              }
              return;
            }
          }
        }
      }
      store && _0x335254?.key?.remoteJid && _0x335254?.key?.id && _0x335254?.message && store.addMessage(_0x335254.key.remoteJid, _0x335254.key.id, _0x335254);
      try {
        if (_0x335254.message && _0x335254.key?.remoteJid?.endsWith('@g.us') && !_0x335254.key.fromMe) {
          const _0x45777e = _0x335254.key.participant;
          if (_0x45777e) {
            const _0x532114 = _0x335254.messageTimestamp ? Number(_0x335254.messageTimestamp) * 1000 : Date.now();
            _0x51e7c0(_0x335254.key.remoteJid, _0x45777e, _0x532114);
          }
        }
      } catch {}
      if (!_0x335254.message) {
        store && _0x335254.key?.remoteJid && _0x335254.key?.id && store.addMessage(_0x335254.key.remoteJid, _0x335254.key.id, _0x335254);
        if (_0x335254.key?.remoteJid === "status@broadcast" && _0x335254.messageStubType) {
          statusAntideleteHandleUpdate({
            key: _0x335254.key,
            update: {
              message: null,
              messageStubType: _0x335254.messageStubType
            }
          }).catch(() => {});
          return;
        }
        if (_0x335254.messageStubType === 29 || _0x335254.messageStubType === 30) {
          const _0x29c822 = _0x335254.messageStubType === 29 ? "promote" : "demote", _0x2be190 = _0x335254.key.remoteJid, _0x1fecac = _0x335254.key.participant || _0x335254.participant, _0x4f0156 = _0x335254.messageStubParameters || [];
          _0x2be190 && _0x2be190.endsWith('@g.us') && _0x4f0156.length > 0 && (originalConsoleMethods.log(SOCIAL.SHIELD + "️ [STUB] " + _0x29c822 + " detected in " + _0x2be190.split('@')[0] + " by " + await resolveEventAuthor(_0x592da8, _0x2be190, _0x1fecac) + " | count: " + _0x4f0156.length), _0x2a91f0(_0x592da8, {
            id: _0x2be190,
            participants: _0x4f0156,
            action: _0x29c822,
            author: _0x1fecac
          }).catch(_0x44072f => {
            originalConsoleMethods.log(STATUS.ERROR + '\x20[ANTIDEMOTE]\x20Stub\x20handler\x20error:\x20' + _0x44072f.message);
          }));
        }
        return;
      }
      if (_0x335254.messageStubType === 29 || _0x335254.messageStubType === 30) {
        const _0x31a08f = _0x335254.messageStubType === 29 ? "promote" : "demote", _0x201e31 = _0x335254.key.remoteJid, _0x5d1b78 = _0x335254.key.participant || _0x335254.participant, _0x39bc65 = _0x335254.messageStubParameters || [];
        _0x201e31 && _0x201e31.endsWith("@g.us") && _0x39bc65.length > 0 && (originalConsoleMethods.log(SOCIAL.SHIELD + "️ [STUB+MSG] " + _0x31a08f + " detected in " + _0x201e31.split('@')[0] + '\x20by\x20' + await resolveEventAuthor(_0x592da8, _0x201e31, _0x5d1b78) + '\x20|\x20count:\x20' + _0x39bc65.length), _0x2a91f0(_0x592da8, {
          id: _0x201e31,
          participants: _0x39bc65,
          action: _0x31a08f,
          author: _0x5d1b78
        }).catch(_0xf24d1e => {
          originalConsoleMethods.log(STATUS.ERROR + " [ANTIDEMOTE] Stub+msg handler error: " + _0xf24d1e.message);
        }));
      }
      if (_0x335254.messageStubType === 31 && _0x335254.key?.remoteJid?.endsWith("@g.us")) try {
        const _0x3fbbe5 = parseInt(_0x335254.messageStubParameters?.[0] || '0', 10) || 0, _0x37bc44 = _0x335254.participant || _0x335254.key?.participant || '', _0x3a2ba8 = _0x335254.key?.fromMe === true;
        import('./commands/owner/antidisp.js').then(_0x15910c => {
          _0x15910c.handleEphemeralChange(_0x592da8, _0x335254.key.remoteJid, _0x3fbbe5, _0x37bc44, _0x3a2ba8).catch(() => {});
        }).catch(() => {});
      } catch {}
      if (_0x335254.key?.remoteJid !== 'status@broadcast' && _0x335254.messageStubType) return;
      const _0xf72323 = normalizeMessageContent(_0x335254.message) || _0x335254.message, _0x15984f = _0xf72323?.protocolMessage;
      if (_0x15984f && _0x15984f.type === 14) {
        const _0x5bc73e = _0x15984f.editedMessage?.message;
        if (!_0x5bc73e) return;
        (_0x335254.message = _0x5bc73e, (globalThis._printSystemBox || (_0x576f03 => originalConsoleMethods.log('[' + _0x576f03.tag + ']\x20' + _0x576f03.message)))({
          tag: "EDIT",
          color: "yellow",
          icon: GROUP.EDIT + '️',
          message: 'Edited\x20message\x20—\x20reprocessing\x20as\x20command',
          fields: {
            'Msg\x20ID': _0x335254.key?.id,
            Chat: _0x335254.key?.remoteJid
          }
        }));
      }
      if (_0x15984f && _0x15984f.type === 3) {
        try {
          const _0x2f5cab = _0x15984f.ephemeralExpiration || 0, _0x4feffa = _0x335254.key?.participant || _0x335254.key?.remoteJid || '', _0x45075f = _0x335254.key?.fromMe === true;
          import("./commands/owner/antidisp.js").then(_0x4c2166 => {
            _0x4c2166.handleEphemeralChange(_0x592da8, _0x335254.key.remoteJid, _0x2f5cab, _0x4feffa, _0x45075f).catch(() => {});
          }).catch(() => {});
        } catch {}
        return;
      }
      if (_0x15984f && (_0x15984f.type === 0 || _0x15984f.type === 4)) {
        const _0xde9964 = _0x15984f.key?.id;
        if (_0xde9964) {
          const _0x1f9dc2 = _0x15984f.key?.remoteJid || _0x335254.key?.remoteJid;
          _0x335254.key?.remoteJid === "status@broadcast" || _0x1f9dc2 === "status@broadcast" ? ((globalThis._printSystemBox || (_0x239bab => originalConsoleMethods.log('[' + _0x239bab.tag + ']\x20' + _0x239bab.message)))({
            tag: "STATUS-AD",
            color: "purple",
            icon: '' + MEDIA.SIGNAL,
            message: 'Protocol\x20revoke\x20detected\x20via\x20upsert',
            fields: {
              'Msg\x20ID': _0xde9964
            }
          }), statusAntideleteHandleUpdate({
            key: {
              ..._0x335254.key,
              id: _0xde9964
            },
            update: {
              message: null,
              messageStubType: 1
            }
          }).catch(_0x3b9586 => {
            (globalThis._printSystemBox || (_0x2b6355 => originalConsoleMethods.log(STATUS.ERROR + '\x20[' + _0x2b6355.tag + ']\x20' + _0x2b6355.message)))({
              tag: "STATUS-AD",
              color: 'red',
              icon: '' + STATUS.ERROR,
              message: "Revoke handle error",
              fields: {
                Error: _0x3b9586.message
              }
            });
          })) : ((globalThis._printAntideleteBox || (_0xa7113e => originalConsoleMethods.log('[ANTIDELETE]\x20' + _0xa7113e.event)))({
            event: "protocol-revoke (upsert)",
            fields: {
              'Msg\x20ID': _0xde9964,
              Chat: _0x1f9dc2
            }
          }), antideleteHandleUpdate({
            key: {
              ..._0x335254.key,
              id: _0xde9964,
              remoteJid: _0x1f9dc2
            },
            update: {
              message: null,
              messageStubType: 1
            }
          }).catch(_0x4fadbd => {
            (globalThis._printSystemBox || (_0x1263ac => originalConsoleMethods.log(STATUS.ERROR + '\x20[' + _0x1263ac.tag + ']\x20' + _0x1263ac.message)))({
              tag: "ANTIDELETE",
              color: "red",
              icon: '' + STATUS.ERROR,
              message: "Revoke handle error",
              fields: {
                Error: _0x4fadbd.message
              }
            });
          }));
        }
        return;
      }
      if (_0x335254.pushName && _0x335254.key) {
        const _0x411171 = _0x335254.key.participant || _0x335254.key.remoteJid;
        if (_0x411171 && !_0x411171.includes('status') && !_0x411171.includes('broadcast')) {
          global.contactNames = global.contactNames || new Map();
          if (global.contactNames.size > 800) {
            const _0x264ec5 = new Map();
            let _0x3af576 = 0;
            for (const [_0x2e777d, _0x56bc52] of global.contactNames) {
              if (++_0x3af576 > global.contactNames.size - 400) _0x264ec5.set(_0x2e777d, _0x56bc52);
            }
            global.contactNames = _0x264ec5;
          }
          (global.contactNames.set(_0x411171.split(':')[0].split('@')[0], _0x335254.pushName), global.contactNames.set(_0x411171.split('@')[0], _0x335254.pushName));
        }
      }
      (lastActivityTime = Date.now(), handleIncomingMessage(_0x592da8, _0x335254).catch(_0x2662c4 => {
        _0x2662c4?.message && !_0x2662c4.message.includes("closed") && !_0x2662c4.message.includes("Stream") && !_0x2662c4.message.includes("timed out") && (globalThis._printSystemBox || (_0x29710f => originalConsoleMethods.log(STATUS.ERROR + '\x20[' + _0x29710f.tag + ']\x20' + _0x29710f.message)))({
          tag: "Handler",
          color: 'red',
          icon: '' + STATUS.ERROR,
          message: "Incoming handler error",
          fields: {
            Error: _0x2662c4.message
          }
        });
      }), handleReactOwner(_0x592da8, _0x335254).catch(() => {}), handleReactDev(_0x592da8, _0x335254).catch(() => {}));
      if (_0x335254.message?.groupStatusMentionMessage) {
        (globalThis._printSystemBox || (_0x1e8c25 => originalConsoleMethods.log(STATUS.WARNING + "️ [" + _0x1e8c25.tag + ']\x20' + _0x1e8c25.message)))({
          tag: "GSM",
          color: "yellow",
          icon: STATUS.WARNING + '️',
          message: 'groupStatusMentionMessage\x20received',
          fields: {
            Chat: _0x335254.key?.remoteJid,
            From: _0x335254.key?.participant || "unknown"
          }
        });
        if (_0x335254.key?.remoteJid?.endsWith("@g.us")) {
          try {
            autoViewManager?.viewGroupStatusMention?.(_0x592da8, _0x335254)?.catch?.(() => {});
          } catch {}
          try {
            handleAutoReactGsmView(_0x592da8, _0x335254)?.catch?.(() => {});
          } catch {}
        }
        try {
          _0x697ed3(_0x592da8, _0x335254).catch(() => {});
        } catch {}
      }
      if (_0x335254.key?.remoteJid === 'status@broadcast') {
        if (globalThis._debugStatusMode) try {
          const _0x2453f3 = _0x28b6e5 => JSON.stringify(_0x28b6e5, (_0x3edceb, _0x484f5a) => {
            if (_0x484f5a instanceof Uint8Array || Buffer.isBuffer(_0x484f5a)) return "<Buffer " + _0x484f5a.length + "B: " + Buffer.from(_0x484f5a).toString("hex").substring(0, 32) + "...>";
            return _0x484f5a;
          }, 2) || '{}', _0x26eb94 = _0x335254.message ? Object.keys(_0x335254.message).join(',\x20') : "none", _0x1e8bcf = _0x2453f3(_0x335254.message), _0x42f6d8 = _0x2453f3(_0x335254.key), _0x20e049 = _0x335254.key?.fromMe ? UTILITY.GREEN + '\x20BOT-POSTED\x20(fromMe=true)' : UI.BLUE_CIRCLE + " PHONE-POSTED (fromMe=false, participant=" + (_0x335254.key?.participant || "none") + ')';
          import('fs').then(_0x21ec62 => {
            const _0x513429 = "/tmp/status_spy_" + Date.now() + ".json";
            (_0x21ec62.writeFileSync(_0x513429, JSON.stringify({
              source: _0x20e049,
              key: _0x335254.key,
              messageTimestamp: _0x335254.messageTimestamp,
              messageStubType: _0x335254.messageStubType,
              messageKeys: _0x335254.message ? Object.keys(_0x335254.message) : [],
              message: _0x335254.message
            }, null, 2)), originalConsoleMethods.log('\x0a[STATUS-SPY]\x20' + _0x20e049 + " | file=" + _0x513429 + '\x20|\x20keys=' + _0x26eb94 + '\x0a'));
          }).catch(() => {});
          const _0x227f72 = globalThis.OWNER_JID ? globalThis.OWNER_JID.split('@')[0].split(':')[0] + "@s.whatsapp.net" : null;
          if (_0x227f72) {
            const _0x1b7654 = ['*' + MEDIA.SIGNAL + '\x20STATUS\x20SPY\x20EVENT*', '' + _0x20e049, '', "key: " + _0x42f6d8, "timestamp: " + _0x335254.messageTimestamp, 'stubType:\x20' + (_0x335254.messageStubType ?? "none"), "msgKeys: " + _0x26eb94, '', '*message:*', "```", _0x1e8bcf.substring(0, 2800), "```"];
            _0x3bbec2(_0x227f72, {
              text: _0x1b7654.join('\x0a')
            }).catch(() => {});
          }
        } catch (_0x598c1c) {
          originalConsoleMethods.log("[STATUS-SPY] error:", _0x598c1c.message);
        }
        const _0x3adbac = _0x335254.message?.ephemeralMessage?.message || _0x335254.message, _0x30bf54 = _0x335254.key.participant || '';
        let _0x1c2976 = _0x335254.key.remoteJidAlt || _0x335254.key.participantAlt || _0x335254.key.participantPn || null;
        if (!_0x1c2976 && _0x30bf54.includes("@lid")) {
          const _0x31d147 = _0x30bf54.split('@')[0].split(':')[0], _0x1df8d8 = lidPhoneCache.get(_0x31d147) || lidPhoneCache.get(_0x30bf54.split('@')[0]) || getPhoneFromLid(_0x31d147);
          if (_0x1df8d8) _0x1c2976 = _0x1df8d8 + '@s.whatsapp.net';
        }
        const _0x1af3cc = {
          ..._0x335254.key,
          messageTimestamp: _0x335254.messageTimestamp,
          ..._0x1c2976 ? {
            participantPn: _0x1c2976
          } : {}
        }, _0x28f56d = _0x335254.messageTimestamp ? (typeof _0x335254.messageTimestamp === 'object' ? _0x335254.messageTimestamp.low || 0 : Number(_0x335254.messageTimestamp)) * 1000 : 0, _0x478765 = _0x28f56d > 0 && Date.now() - _0x28f56d > 5 * 60 * 1000;
        handleAutoView(_0x592da8, _0x1af3cc, _0x3adbac).catch(() => {});
        if (!_0x478765) {
          !_0x335254.messageStubType && _0x3adbac && !_0x335254.key.fromMe && (handleAutoReact(_0x592da8, _0x1af3cc).catch(() => {}), cacheStatusMessage(_0x1af3cc.id, _0x1af3cc, _0x3adbac));
          statusDetector && statusDetector.detectStatusUpdate(_0x335254).catch(() => {});
          try {
            _0x697ed3(_0x592da8, _0x335254).catch(() => {});
          } catch {}
        }
        const _0x5efbd9 = normalizeMessageContent(_0x335254.message) || _0x335254.message, _0x1d115a = _0x5efbd9?.protocolMessage;
        if (_0x1d115a && (_0x1d115a.type === 0 || _0x1d115a.type === 4)) {
          const _0x14c34e = _0x1d115a.key?.id;
          _0x14c34e && statusAntideleteHandleUpdate({
            key: {
              ..._0x335254.key,
              id: _0x14c34e
            },
            update: {
              message: null,
              messageStubType: 1
            }
          }).catch(() => {});
        } else {
          const _0x1d8b6f = connectionOpenTime > 0 && Date.now() - connectionOpenTime < 60000;
          !_0x1d8b6f && statusAntideleteStoreMessage(_0x335254).catch(() => {});
        }
        return;
      }
      _0x335254.key?.remoteJid?.endsWith("@newsletter") && (handleChannelReact(_0x592da8, _0x335254).catch(() => {}), _0x1b5050.handleChannelMessage(_0x335254.key.remoteJid).catch(() => {}));
      const _0x5a37b1 = connectionOpenTime > 0 && Date.now() - connectionOpenTime < 60000;
      !_0x5a37b1 && antideleteStoreMessage(_0x335254).catch(() => {});
    }), _0x592da8.ev.on("messages.update", _0xb1171a => {
      for (const _0xd4b41 of _0xb1171a) {
        const _0x2e2da6 = _0xd4b41.key?.remoteJid;
        _dmDebugEnabled() && _0x2e2da6 && !_0x2e2da6.endsWith("@g.us") && _0x2e2da6 !== "status@broadcast" && !_0x2e2da6.endsWith("@newsletter") && console.log("[DM-STATUS]", JSON.stringify({
          remoteJid: _0x2e2da6,
          id: _0xd4b41.key?.id,
          fromMe: _0xd4b41.key?.fromMe,
          status: _0xd4b41.update?.status,
          messageStubParameters: _0xd4b41.update?.messageStubParameters,
          updateKeys: _0xd4b41.update ? Object.keys(_0xd4b41.update) : []
        }));
        if (_0x2e2da6 === "status@broadcast") {
          if (globalThis._debugStatusMode) try {
            const _0xefa508 = JSON.stringify({
              id: _0xd4b41.key?.id,
              fromMe: _0xd4b41.key?.fromMe,
              participant: _0xd4b41.key?.participant,
              updateKeys: _0xd4b41.update ? Object.keys(_0xd4b41.update) : [],
              update: _0xd4b41.update
            }, (_0x4695ac, _0x4a5430) => _0x4a5430 instanceof Uint8Array || Buffer.isBuffer(_0x4a5430) ? '<Buffer\x20' + _0x4a5430.length + 'B>' : _0x4a5430, 2);
            originalConsoleMethods.log("[STATUS-SPY UPDATE] " + _0xefa508.substring(0, 400));
            const _0x160c1b = globalThis.OWNER_JID ? globalThis.OWNER_JID.split('@')[0].split(':')[0] + "@s.whatsapp.net" : null;
            _0x160c1b && _0x3bbec2(_0x160c1b, {
              text: '*' + MEDIA.SIGNAL + '\x20STATUS\x20UPDATE\x20EVENT*\x0a```\x0a' + _0xefa508.substring(0, 2800) + "\n```"
            }).catch(() => {});
          } catch (_0x3cbf9d) {}
          statusAntideleteHandleUpdate(_0xd4b41).catch(() => {});
        } else antideleteHandleUpdate(_0xd4b41).catch(() => {});
        try {
          if (_0xd4b41.update?.message) {
            const _0x419e59 = {
              key: _0xd4b41.key,
              message: _0xd4b41.update.message
            };
            globalThis._antiviewonceConfig?.enabled && handleAutomaticAntiViewOnce(_0x592da8, _0x419e59, _0xd4b41.key?.remoteJid, _0xd4b41.key?.participant || _0xd4b41.key?.remoteJid).catch(() => {});
          }
        } catch {}
        try {
          const _0x55d404 = _0xd4b41.update?.message;
          if (_0x55d404 && _0x2e2da6 !== "status@broadcast") {
            const _0x47bef8 = _0x55d404.editedMessage || _0x55d404.protocolMessage?.editedMessage, _0x19c63d = _0x55d404.protocolMessage?.type === 14 ? _0x55d404.protocolMessage : null, _0x1c40dc = _0x47bef8?.message || _0x19c63d?.editedMessage?.message;
            if (_0x1c40dc) {
              const _0xa96868 = _0x1c40dc.conversation || _0x1c40dc.extendedTextMessage?.text || _0x1c40dc.imageMessage?.caption || _0x1c40dc.videoMessage?.caption || '';
              (globalThis._printSystemBox || (_0x34c0a4 => originalConsoleMethods.log('[' + _0x34c0a4.tag + ']\x20' + _0x34c0a4.message)))({
                tag: 'EDIT',
                color: 'yellow',
                icon: GROUP.EDIT + '️',
                message: "Message edited — re-processing",
                fields: {
                  'Msg\x20ID': _0xd4b41.key?.id,
                  Chat: _0xd4b41.key?.remoteJid,
                  Preview: _0xa96868 ? '\x22' + _0xa96868 + '\x22' : "(media)"
                }
              });
              const _0x1acd1e = {
                key: _0xd4b41.key,
                message: _0x1c40dc,
                messageTimestamp: Math.floor(Date.now() / 1000),
                pushName: _0xd4b41.pushName || ''
              };
              _0x592da8.ev.emit('messages.upsert', {
                messages: [_0x1acd1e],
                type: "notify"
              });
            }
          }
        } catch {}
      }
    }), await _0x5e72ba, !commandsLoaded && (globalThis._loadedCommandCount = getRegisteredCommandCount(), globalThis._wolfSysStats = globalThis._wolfSysStats || ({}), globalThis._wolfSysStats.commandsLoaded = getRegisteredCommandCount(), commandsLoaded = true), updateWebStatus({
      commands: getRegisteredCommandCount(),
      botName: getCurrentBotName(),
      version: VERSION,
      botMode: BOT_MODE,
      prefix: getCurrentPrefix(),
      owner: global.OWNER_NUMBER || "Unknown",
      antispam: !!globalThis._antispamConfig?.enabled,
      antibug: !!globalThis._antibugConfig?.enabled,
      antilink: !!globalThis._antilinkConfig?.enabled,
      antidelete: true,
      autoread: false
    }), setTimeout(() => {
      !isConnected && UltraCleanLogger.warning(STATUS.WARNING + "️ Connection taking longer than expected...");
    }, 10000), _0x592da8);
  } catch (_0x45649b) {
    (UltraCleanLogger.error(STATUS.ERROR + " Connection failed: " + _0x45649b.message), (_0x45649b.message.includes("auth") || _0x45649b.message.includes("session")) && (UltraCleanLogger.warning(UI.REFRESH + " Session issue detected, cleaning session and retrying..."), cleanSession()), setTimeout(async () => {
      (UltraCleanLogger.info(UI.REFRESH + '\x20Retrying\x20connection...'), _isAutoRestart = true, await startBot(_0x1089b1, _0x233dad));
    }, 8000));
  }
}
async function triggerRestartAutoFix(_0x3ebec2) {
  try {
    if (_0x3ebec2.user?.id) {
      const _0x4012d7 = _0x3ebec2.user.id, _0x513ebe = jidManager.cleanJid(_0x4012d7);
      if (ultimateFixSystem.shouldRunRestartFix(_0x4012d7)) {
        ultimateFixSystem.markRestartFixAttempted();
        const _0x51f877 = await ultimateFixSystem.applyUltimateFix(_0x3ebec2, _0x4012d7, _0x513ebe, false, true);
        if (_0x51f877.success) {}
      }
    }
  } catch (_0x31cb5e) {
    UltraCleanLogger.warning(STATUS.WARNING + "️ Restart auto-fix error: " + _0x31cb5e.message);
  }
}
async function handleSuccessfulConnection(_0x523999, _0x125011, _0x1921a5) {
  const _0x2d8ad2 = new Date().toLocaleTimeString();
  (OWNER_JID = _0x523999.user.id, OWNER_NUMBER = OWNER_JID.split('@')[0]);
  try {
    const _0x8c034f = _0x523999.user.id, _0x3ba4a9 = _0x523999.user.lid, _0x7a88eb = _0x8c034f?.split('@')[0]?.split(':')[0], _0x2df8c0 = _0x3ba4a9?.split('@')[0]?.split(':')[0];
    (globalThis._printSystemBox || (_0x2c488f => originalConsoleMethods.log('[' + _0x2c488f.tag + ']\x20' + _0x2c488f.message)))({
      tag: "BOT-JID",
      color: "gold",
      icon: '' + UI.KEY,
      message: 'sock.user\x20resolved',
      fields: {
        ID: _0x8c034f || 'none',
        LID: _0x3ba4a9 || "none"
      }
    });
    if (_0x3ba4a9 && _0x7a88eb && _0x2df8c0 && !_0x8c034f.includes("@lid")) (cacheLidPhone(_0x2df8c0, _0x7a88eb), UltraCleanLogger.info(MEDIA.PHONE + " Cached owner LID→Phone: " + _0x2df8c0 + " → " + _0x7a88eb)); else {
      if (_0x8c034f.includes("@lid") && _0x3ba4a9?.endsWith("@s.whatsapp.net")) {
        const _0x560be9 = _0x3ba4a9.split('@')[0]?.split(':')[0];
        _0x560be9 && _0x560be9 !== _0x7a88eb && (cacheLidPhone(_0x7a88eb, _0x560be9), UltraCleanLogger.info(MEDIA.PHONE + '\x20Cached\x20owner\x20LID→Phone:\x20' + _0x7a88eb + " → " + _0x560be9));
      } else _0x8c034f.includes('@lid') && !_0x3ba4a9 && UltraCleanLogger.warning(STATUS.WARNING + '️\x20Owner\x20connected\x20with\x20LID\x20(' + _0x7a88eb + ") but no phone mapping available from sock.user");
    }
  } catch {}
  const _0x57762d = _0x125011 === "auto", _0x3316c1 = normalizeOwnerJid(_0x523999.user.id), _0x2894af = _0x3316c1?.endsWith("@lid") ? _0x3316c1 : normalizeOwnerJid(_0x523999.user.lid);
  _0x2894af?.endsWith("@lid") && await resolvePhoneFromLidAsync(_0x2894af);
  const _0x188455 = ownerIdentity(_0x3316c1, _0x2894af, _0x19bd51 => lidPhoneCache.get(_0x19bd51) || getPhoneFromLid(_0x19bd51));
  _cache_owner_data?.OWNER_JID !== _0x188455.jid || _cache_owner_data?.OWNER_NUMBER !== _0x188455.number || _cache_owner_data?.ownerLID !== _0x188455.lid ? jidManager.setNewOwner(_0x188455.jid, false, _0x188455.lid) : jidManager.loadOwnerData();
  !_0x188455.number && UltraCleanLogger.warning("Owner phone mapping unavailable; retaining LID identity without treating it as a phone number.");
  const _0x2d494c = jidManager.getOwnerInfo(), _0xbf9e13 = getCurrentPrefix(), _0x174309 = isPrefixless ? "none (prefixless)" : '\x22' + _0xbf9e13 + '\x22', _0x35d264 = detectPlatform();
  updateTerminalHeader();
  let _0x464140 = '';
  if (_0x125011 === "auto") _0x464140 = 'AUTO-RECONNECT'; else _0x125011 === "session" ? _0x464140 = "SESSION ID" : _0x464140 = "PAIR CODE";
  (globalThis._wolfStartupPhase = false, printWolfStartupBlock({
    botName: getCurrentBotName(),
    version: VERSION,
    platform: detectPlatform(),
    prefix: _0x174309,
    mode: BOT_MODE,
    ownerNumber: _0x2d494c.ownerNumber,
    commandCount: getRegisteredCommandCount(),
    sqliteDriver: isUsingWasm() ? "wasm" : 'native',
    isReconnect: _0x57762d
  }));
  if (!_0x57762d && isFirstConnection && !hasSentWelcomeMessage) try {
    const _0x58bc1e = Date.now(), _0x1a75a0 = jidManager.cleanJid(OWNER_JID), _0x62bbde = await _0x523999.sendMessage(OWNER_JID, {
      text: BRAND.WOLF + '\x20*' + getCurrentBotName() + "* is starting up... █▒▒▒▒▒▒▒▒▒"
    }), _0x39c5c9 = Date.now() - _0x58bc1e, _0x2e9209 = process.uptime(), _0x36d653 = Math.floor(_0x2e9209 / 3600), _0x4deda0 = Math.floor(_0x2e9209 % 3600 / 60), _0x2b1a64 = Math.floor(_0x2e9209 % 60), _0x7d141e = _0x36d653 + 'h\x20' + _0x4deda0 + 'm\x20' + _0x2b1a64 + 's';
    (await _0x523999.sendMessage(OWNER_JID, {
      text: '\x0a╭┄〔 ' + (BRAND.VIP || BRAND.WOLF) + ' *WELCOME TO ' + BOT_NAME.toUpperCase() + '* ' + BRAND.PAW + ' 〕┄╮\x0a┆ ✦ ' + BRAND.LIGHTNING + " *User:* " + _0x1a75a0.cleanNumber + "\n┆ ✦ " + STATUS.OFFLINE + '\x20*Prefix:*\x20' + _0x174309 + "\n┆ ✦ " + BRAND.PAW + '\x20*Ultimatefix:*\x20' + STATUS.SUCCESS + '\x20\x0a┆ ✦ ' + UTILITY.CONSTRUCTION + '️\x20*Platform:*\x20' + _0x35d264 + '\x0a┆ ✦ ' + UI.TIMER + "️ *Latency:* " + _0x39c5c9 + 'ms\x0a┆ ✦ ' + UTILITY.CLOCK + '\x20*Uptime:*\x20' + _0x7d141e + "\n┆ ✦ " + SOCIAL.PEOPLE + " *Member Detection:* " + STATUS.SUCCESS + " ACTIVE\n┆ ✦ " + UI.LINK + " *Status:* " + STATUS.SUCCESS + " Connected\n┆ ✦ " + UI.TARGET + " *Mood:* Ready to Serve\n┆ ✦ " + SOCIAL.CROWN + " *Owner:* " + STATUS.SUCCESS + " Lupin Stanley\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n_" + (BRAND.VIP || BRAND.WOLF) + ' VIPBOT · Crafted by Lupin Stanley_\x0a',
      edit: _0x62bbde.key
    }), hasSentWelcomeMessage = true, setTimeout(async () => {
      ultimateFixSystem.isFixNeeded(OWNER_JID) && await ultimateFixSystem.applyUltimateFix(_0x523999, OWNER_JID, _0x1a75a0, true);
    }, 500));
  } catch {}
}
async function handleConnectionCloseSilently(_0x1d7678, _0x4060f6, _0x454957) {
  const _0x50b657 = _0x1d7678?.error?.output?.statusCode, {DisconnectReason: _0x3612ae} = await import("wolfsocket");
  (connectionAttempts++, isConnected = false);
  const _0x3fcb48 = (_0x1d7678?.error?.message || _0x1d7678?.error?.output?.payload?.message || '').toLowerCase(), _0x216954 = _0x50b657 === _0x3612ae.loggedOut && _0x3fcb48.includes("conflict"), _0x1ac63b = _0x50b657 === _0x3612ae.loggedOut && !_0x216954;
  if (_0x1ac63b) {
    (UltraCleanLogger.warning(GITHUB.CLEAN + " Session logged out (attempt " + connectionAttempts + "). Clearing all session remnants..."), cleanSession());
    if (connectionAttempts >= 3) {
      (UltraCleanLogger.error(STATUS.ERROR + " Session logged out permanently — all remnants cleared."), UltraCleanLogger.error(STATUS.ERROR + '\x20Your\x20SESSION_ID\x20has\x20expired\x20or\x20been\x20revoked\x20by\x20WhatsApp.'), UltraCleanLogger.info(UTILITY.TIP + '\x20Update\x20your\x20SESSION_ID\x20env\x20var\x20with\x20a\x20fresh\x20one,\x20then\x20restart\x20the\x20bot.'));
      try {
        const _0x3a6922 = (process.env.SESSION_ID || '').trim();
        if (_0x3a6922) {
          const _0x52b585 = (await import("crypto")).createHash('sha256').update(_0x3a6922).digest("hex");
          _0x32ecad.writeFileSync('./.session_revoked', _0x52b585, "utf8");
        }
      } catch {}
      return;
    }
    const _0x142304 = Math.min(15000 * Math.pow(2, Math.min(connectionAttempts, 3)), 120000);
    (UltraCleanLogger.info(UI.REFRESH + '\x20Restarting\x20in\x20' + Math.round(_0x142304 / 1000) + "s with fresh session from SESSION_ID..."), setTimeout(async () => {
      await main();
    }, _0x142304));
    return;
  }
  if (_0x50b657 === 409 || _0x50b657 === 440 || _0x216954) {
    (connectionAttempts = 0, conflictCount++, isConflictRecovery = true);
    if (conflictCount >= 10) {
      (UltraCleanLogger.warning(STATUS.WARNING + "️ Too many conflicts (" + conflictCount + "). Waiting 5 minutes before retry to let other sessions settle..."), conflictCount = 0, setTimeout(async () => {
        await main();
      }, 300000));
      return;
    }
    const _0x1d30e3 = Math.min(8000 + conflictCount * 5000, 120000);
    UltraCleanLogger.warning("Device conflict detected (" + _0x50b657 + "). Attempt " + conflictCount + ". Reconnecting in " + Math.round(_0x1d30e3 / 1000) + "s...");
    if (conflictCount === 3) {
      UltraCleanLogger.warning("Multiple conflicts - clearing stale encryption keys...");
      try {
        const _0x2b9184 = _0x32ecad.readdirSync(SESSION_DIR);
        let _0x340368 = 0;
        for (const _0x1e2094 of _0x2b9184) {
          (_0x1e2094.startsWith("sender-key-") || _0x1e2094.startsWith("session-") || _0x1e2094.startsWith("pre-key-") || _0x1e2094.startsWith("app-state-sync")) && (_0x32ecad.unlinkSync(_0x40e1ec.join(SESSION_DIR, _0x1e2094)), _0x340368++);
        }
        _0x340368 > 0 && UltraCleanLogger.info(UI.KEY + " Cleared " + _0x340368 + " stale signal keys to fix encryption");
      } catch (_0x40b09b) {
        UltraCleanLogger.warning("Signal key cleanup error: " + _0x40b09b.message);
      }
    }
    conflictCount >= 5 && UltraCleanLogger.warning(STATUS.WARNING + "️ Persistent conflict (attempt " + conflictCount + ") - another WhatsApp Web/device session may be open. Close other sessions to fix.");
    setTimeout(async () => {
      (_isAutoRestart = true, await startBot(_0x4060f6, _0x454957));
    }, _0x1d30e3);
    return;
  }
  if (_0x50b657 === 403) {
    if (connectionAttempts >= 3) {
      (UltraCleanLogger.error(STATUS.ERROR + " Auth error (" + _0x50b657 + ')\x20persisted\x20after\x20' + connectionAttempts + " attempts."), UltraCleanLogger.error(STATUS.ERROR + " Your session is no longer valid. Please generate a new SESSION_ID."), UltraCleanLogger.info(UTILITY.TIP + " To fix: Get a new SESSION_ID → set it in your .env or environment → restart the bot."));
      return;
    }
    (UltraCleanLogger.warning("Auth error (" + _0x50b657 + ") detected (attempt " + connectionAttempts + "/3), cleaning session..."), cleanSession());
    const _0x53dd8c = Math.min(15000 * Math.pow(2, Math.min(connectionAttempts, 3)), 120000);
    (UltraCleanLogger.info(UI.REFRESH + " Restarting in " + Math.round(_0x53dd8c / 1000) + "s after auth error..."), setTimeout(async () => {
      await main();
    }, _0x53dd8c));
    return;
  }
  const _0x1eeb64 = _0x1d7678?.error?.message || '', _0x2ae2f4 = _0x1d7678?.error?.output?.payload?.message || '', _0x2e1d9d = (_0x1eeb64 + '\x20' + _0x2ae2f4).toLowerCase();
  if (_0x2e1d9d.includes("decrypt") || _0x2e1d9d.includes("bad mac") || _0x2e1d9d.includes("hmac") || _0x50b657 === 515) {
    UltraCleanLogger.warning("Session decryption error detected (" + _0x50b657 + "). Clearing signal keys and reconnecting...");
    try {
      const _0x2b231a = _0x32ecad.readdirSync(SESSION_DIR);
      for (const _0x5bbd0a of _0x2b231a) {
        (_0x5bbd0a.startsWith("sender-key-") || _0x5bbd0a.startsWith("session-") || _0x5bbd0a.startsWith("pre-key-") || _0x5bbd0a.startsWith('app-state-sync')) && _0x32ecad.unlinkSync(_0x40e1ec.join(SESSION_DIR, _0x5bbd0a));
      }
      UltraCleanLogger.info("Signal keys cleared, keeping creds.json intact");
    } catch (_0x5634ac) {
      UltraCleanLogger.warning('Signal\x20key\x20cleanup\x20error:\x20' + _0x5634ac.message);
    }
    setTimeout(async () => {
      (_isAutoRestart = true, await startBot(_0x4060f6, _0x454957));
    }, 3000);
    return;
  }
  const _0x4cd57f = 3000, _0x9a809d = 30000, _0x51cc3a = Math.min(_0x4cd57f * Math.pow(1.5, connectionAttempts - 1), _0x9a809d);
  (UltraCleanLogger.info(UI.REFRESH + " Reconnecting in " + Math.round(_0x51cc3a / 1000) + "s (attempt " + connectionAttempts + ")..."), setTimeout(async () => {
    connectionAttempts >= MAX_RETRY_ATTEMPTS ? (connectionAttempts = 0, UltraCleanLogger.critical("Max retry attempts reached. Restarting from scratch..."), await main()) : (_isAutoRestart = true, await startBot(_0x4060f6, _0x454957));
  }, _0x51cc3a));
}
globalThis.startWebPairing = async _0x2aa219 => {
  const _0x568063 = String(_0x2aa219 || '').replace(/\D/g, '');
  if (_0x568063.length < 8 || _0x568063.length > 15) throw new Error("Enter a valid phone number with country code, without the plus sign.");
  const _0x3ab58b = globalThis._webPairingState || ({});
  if (isConnected) throw new Error("The bot is already connected. Clear the current session before pairing a new device.");
  if (_0x3ab58b.status === 'starting' || _0x3ab58b.status === 'waiting') throw new Error("A pairing request is already in progress.");
  updateWebPairing({
    status: "starting",
    phone: _0x568063,
    code: null,
    error: null,
    startedAt: Date.now()
  });
  try {
    return (await startBot("pair", _0x568063), globalThis._webPairingState);
  } catch (_0x3024d6) {
    updateWebPairing({
      status: 'error',
      code: null,
      error: _0x3024d6.message || "Could not start pairing."
    });
    throw _0x3024d6;
  }
};
async function handleConnectCommand(_0x343eeb, _0x5bc722, _0x1b6a2b, _0x3e12c4, _0x3385f0 = {}) {
  try {
    const _0x5edc51 = _0x5bc722.key.remoteJid || _0x3e12c4.cleanJid, _0x559aa3 = Date.now(), _0xe5f5af = getCurrentPrefix(), _0x1ca9f8 = isPrefixless ? "none (prefixless)" : '\x22' + _0xe5f5af + '\x22', _0x1563ac = detectPlatform(), _0x429198 = Date.now() - _0x559aa3, _0x2a6142 = process.uptime(), _0x50b7cf = Math.floor(_0x2a6142 / 3600), _0x3cc817 = Math.floor(_0x2a6142 % 3600 / 60), _0x132882 = Math.floor(_0x2a6142 % 60), _0x4302a6 = _0x50b7cf + 'h\x20' + _0x3cc817 + 'm\x20' + _0x132882 + 's', _0x45af14 = jidManager.isOwner(_0x5bc722), _0x3abb27 = _0x45af14 ? '' + STATUS.SUCCESS : '' + STATUS.ERROR, _0x4dff0e = memberDetector ? memberDetector.getStats() : null;
    let _0x57ed3f, _0x53395d, _0x3bfd48;
    if (_0x429198 <= 100) (_0x57ed3f = '' + UTILITY.GREEN, _0x53395d = "Excellent", _0x3bfd48 = BRAND.LIGHTNING + "Superb Connection"); else _0x429198 <= 300 ? (_0x57ed3f = '' + STATUS.PENDING, _0x53395d = "Good", _0x3bfd48 = MEDIA.SIGNAL + 'Stable\x20Link') : (_0x57ed3f = '' + STATUS.OFFLINE, _0x53395d = 'Slow', _0x3bfd48 = FUN.NEW_MOON + "Needs Optimization");
    return (!_0x3385f0.suppressLog && UltraCleanLogger.command("Connect from " + _0x3e12c4.cleanNumber), true);
  } catch {
    return false;
  }
}
function extractTextFromMessage(_0x19aa1d) {
  const _0x2cf017 = normalizeMessageContent(_0x19aa1d);
  if (!_0x2cf017) return '';
  const _0x4ca44b = _0x226994 => {
    if (!_0x226994) return null;
    try {
      if (typeof _0x226994 !== "string") {
        if (_0x226994 instanceof Uint8Array || Buffer.isBuffer(_0x226994)) _0x226994 = Buffer.from(_0x226994).toString("utf8"); else {
          if (typeof _0x226994.toString === "function") _0x226994 = _0x226994.toString();
        }
      }
      return typeof _0x226994 === "string" ? JSON.parse(_0x226994) : _0x226994;
    } catch {
      return null;
    }
  }, _0x573d1f = _0x2cf017.interactiveResponseMessage?.nativeFlowResponseMessage || _0x2cf017.nativeFlowResponseMessage, _0x4ae067 = _0x4ca44b(_0x573d1f?.paramsJson || _0x573d1f?.params_json), _0x266ede = _0x4ae067?.id || _0x4ae067?.selected_id || _0x4ae067?.selectedId || _0x4ae067?.button_id || _0x4ae067?.buttonId;
  if (_0x266ede) return (console.log("[BtnClick] nativeFlow.id:", _0x266ede), String(_0x266ede));
  if (_0x2cf017.interactiveResponseMessage) {
    const _0x1a5c5b = _0x2cf017.interactiveResponseMessage;
    try {
      const _0x25fbbe = _0x4ca44b(_0x1a5c5b?.nativeFlowResponseMessage?.paramsJson), _0x430e7f = _0x25fbbe?.id || _0x25fbbe?.selected_id || _0x25fbbe?.selectedId || _0x25fbbe?.button_id || _0x25fbbe?.buttonId;
      if (_0x430e7f) return String(_0x430e7f);
    } catch {}
    try {
      const _0x2973e3 = _0x1a5c5b?.nativeFlowResponseMessage?.id || _0x1a5c5b?.nativeFlowResponseMessage?.selectedId;
      if (_0x2973e3) return String(_0x2973e3);
    } catch {}
    const _0x3c351f = _0x1a5c5b?.body?.text;
    if (_0x3c351f) return (console.log("[BtnClick] body.text fallback:", _0x3c351f), _0x3c351f);
    console.log("[BtnClick] Raw interactiveResponseMessage keys:", JSON.stringify(Object.keys(_0x1a5c5b || ({}))));
    try {
      console.log("[BtnClick] Full IRM:", JSON.stringify(_0x1a5c5b).substring(0, 500));
    } catch {}
  }
  if (_0x2cf017.buttonsResponseMessage) {
    const _0x1354e2 = _0x2cf017.buttonsResponseMessage.selectedButtonId || _0x2cf017.buttonsResponseMessage.selectedDisplayText || '';
    if (_0x1354e2) console.log('[BtnClick]\x20buttonsResponse:', _0x1354e2);
    return _0x1354e2;
  }
  if (_0x2cf017.listResponseMessage) return _0x2cf017.listResponseMessage.singleSelectReply?.selectedRowId || _0x2cf017.listResponseMessage.title || '';
  if (_0x2cf017.templateButtonReplyMessage) return _0x2cf017.templateButtonReplyMessage.selectedId || _0x2cf017.templateButtonReplyMessage.selectedDisplayText || '';
  return _0x2cf017.conversation || _0x2cf017.extendedTextMessage?.text || _0x2cf017.imageMessage?.caption || _0x2cf017.videoMessage?.caption || _0x2cf017.documentMessage?.caption || _0x2cf017.documentWithCaptionMessage?.message?.documentMessage?.caption || '';
}
async function handleAutomaticAntiViewOnce(_0x238378, _0xa9bb3e, _0xbea673, _0xb6a73f) {
  return;
}
async function handleIncomingMessage(_0x40aac1, _0xd7f33) {
  const _0x4afb5e = Date.now();
  try {
    if (_0xd7f33.key && _0xd7f33.key.remoteJid) {
      const _0x6e6ab4 = _0xd7f33.key.remoteJid;
      if (_0x6e6ab4.endsWith('@s.whatsapp.net') && _0x6e6ab4.includes(':')) {} else {
        if (_0x6e6ab4.endsWith('@lid')) try {
          const _0x4caeee = await resolvePhoneFromLidAsync(_0x6e6ab4);
          if (_0x4caeee) {
            if (!globalThis._lidDeviceHints) globalThis._lidDeviceHints = {};
            const _0x243925 = _0x4caeee.replace(/[^0-9]/g, '');
            globalThis._lidDeviceHints[_0x243925] = _0x6e6ab4;
          }
        } catch {}
      }
    }
    const _0x24564b = _0xd7f33.key.remoteJid, _0x459a7e = _0xd7f33.key.participant || _0x24564b;
    _dmDebugEnabled() && _0x24564b && !_0x24564b.endsWith("@g.us") && _0x24564b !== "status@broadcast" && !_0x24564b.endsWith('@newsletter') && console.log("[DM-IN]", JSON.stringify({
      remoteJid: _0xd7f33.key.remoteJid,
      remoteJidAlt: _0xd7f33.key.remoteJidAlt,
      participant: _0xd7f33.key.participant,
      participantAlt: _0xd7f33.key.participantAlt,
      fromMe: _0xd7f33.key.fromMe,
      id: _0xd7f33.key.id
    }));
    const _0x1ca46d = _0x24564b.includes("@g.us");
    handleAutomaticAntiViewOnce(_0x40aac1, _0xd7f33, _0x24564b, _0x459a7e).catch(() => {});
    _0x1ca46d && _0x459a7e.includes("@lid") && resolvePhoneFromLid(_0x459a7e);
    if (!_0x1ca46d && _0x24564b.endsWith("@lid")) try {
      const _0x49b241 = _0x24564b.split('@')[0].split(':')[0], _0x2dc8e4 = lidPhoneCache.get(_0x49b241) || getPhoneFromLid(_0x49b241);
      !_0x2dc8e4 && resolvePhoneFromLidAsync(_0x24564b).then(_0x3423b8 => {
        if (_0x3423b8) {
          const _0x5b03db = _0x3423b8.replace(/[^0-9]/g, '');
          cacheLidPhone(_0x49b241, _0x5b03db);
        }
      }).catch(() => {});
      const _0x160561 = _0x2dc8e4 || lidPhoneCache.get(_0x49b241);
      if (_0x160561) {
        const _0x3af404 = String(_0x160561).replace(/[^0-9]/g, '');
        !phoneLidCache.has(_0x3af404) && phoneLidCache.set(_0x3af404, _0x49b241);
      }
    } catch {}
    if (isUserBlocked(_0x459a7e)) return;
    try {
      autoLinkSystem.shouldAutoLink(_0x40aac1, _0xd7f33).then(_0x59131e => {
        _0x59131e && UltraCleanLogger.info(STATUS.SUCCESS + " Auto-linking completed for " + _0x459a7e.split('@')[0]);
      }).catch(() => {});
    } catch {}
    try {
      const _0x8a4986 = jidManager.isOwner(_0xd7f33) || _0xd7f33.key.fromMe, _0x4b774f = _0xd7f33.message || ({}), _0x3849ce = normalizeMessageContent(_0x4b774f) || _0x4b774f, _0xd106e5 = !!_0x3849ce.stickerMessage;
      let _0x1bebc4 = extractTextFromMessage(_0x4b774f);
      const _0x1c13f6 = _0x1bebc4.trim(), _0x1b7ee8 = _0x1c13f6.length > 0 && _0x1c13f6.length <= 10 && (/^[\p{Emoji_Presentation}\p{Emoji}\u200d\ufe0f\s]+$/u).test(_0x1c13f6);
      if (_0x8a4986 && _0xd7f33.key.fromMe) {
        const _0x2bc320 = _0x3849ce.extendedTextMessage?.contextInfo || _0x3849ce.stickerMessage?.contextInfo, _0x55d2d0 = !!(_0x3849ce.extendedTextMessage?.text || _0x3849ce.conversation), _0x2a7e84 = !!_0x3849ce.stickerMessage;
        (_0x55d2d0 || _0x2a7e84) && _0x2bc320?.remoteJid === "status@broadcast" && _0x2bc320?.stanzaId && isStatusCached(_0x2bc320.stanzaId) && triggerSaveFromOwnerReply(_0x40aac1, _0x2bc320).catch(() => {});
      }
      if ((_0xd106e5 || _0x1b7ee8) && _0x8a4986) {
        const _0xb5f0c8 = _0x3849ce.stickerMessage?.contextInfo || _0x3849ce.extendedTextMessage?.contextInfo || _0x3849ce.imageMessage?.contextInfo || _0x3849ce.videoMessage?.contextInfo;
        if (_0xb5f0c8?.quotedMessage) try {
          const _0x20e264 = _0xb5f0c8.quotedMessage, _0x56a54a = !!(_0x20e264.imageMessage?.viewOnce || _0x20e264.videoMessage?.viewOnce || _0x20e264.audioMessage?.viewOnce || _0x20e264.viewOnceMessageV2 || _0x20e264.viewOnceMessageV2Extension || _0x20e264.viewOnceMessage || _0x20e264.ephemeralMessage?.message?.viewOnceMessage);
          if (_0x56a54a) {
            let _0x283fad = null, _0x5bf637 = null;
            if (_0x20e264.imageMessage?.viewOnce) (_0x283fad = 'image', _0x5bf637 = _0x20e264.imageMessage); else {
              if (_0x20e264.videoMessage?.viewOnce) (_0x283fad = 'video', _0x5bf637 = _0x20e264.videoMessage); else {
                if (_0x20e264.audioMessage?.viewOnce) (_0x283fad = "audio", _0x5bf637 = _0x20e264.audioMessage); else {
                  const _0x4b23dc = _0x20e264.viewOnceMessageV2?.message || _0x20e264.viewOnceMessageV2Extension?.message || _0x20e264.viewOnceMessage?.message || _0x20e264.ephemeralMessage?.message?.viewOnceMessage?.message;
                  if (_0x4b23dc?.imageMessage) (_0x283fad = "image", _0x5bf637 = _0x4b23dc.imageMessage); else {
                    if (_0x4b23dc?.videoMessage) (_0x283fad = "video", _0x5bf637 = _0x4b23dc.videoMessage); else _0x4b23dc?.audioMessage && (_0x283fad = "audio", _0x5bf637 = _0x4b23dc.audioMessage);
                  }
                }
              }
            }
            if (_0x283fad) {
              const _0x235aa5 = {
                key: {
                  remoteJid: _0x24564b,
                  id: _0xb5f0c8.stanzaId || '',
                  participant: _0xb5f0c8.participant,
                  fromMe: _0xb5f0c8.fromMe || false
                },
                message: _0x20e264
              }, _0xb225a3 = await downloadMediaMessage(_0x235aa5, "buffer", {}, {
                logger: {
                  level: "silent"
                },
                reuploadRequest: _0x40aac1.updateMediaMessage
              });
              if (!_0xb225a3 || _0xb225a3.length === 0) throw new Error("empty buffer");
              const _0x1aa16c = jidManager.getOwnerInfo(), _0x492887 = _0x1aa16c?.ownerJid || _0x459a7e.split('@')[0].split(':')[0] + "@s.whatsapp.net", _0x59743c = "*Retrieved by " + (global.BOT_NAME || "VIPBOT") + '*\x20' + (BRAND.VIP || BRAND.WOLF), _0x223c72 = _0x5bf637.mimetype || (_0x283fad === "video" ? 'video/mp4' : _0x283fad === "audio" ? "audio/mpeg" : "image/jpeg");
              if (_0x283fad === "video") await _0x40aac1.sendMessage(_0x492887, {
                video: _0xb225a3,
                caption: _0x59743c,
                mimetype: _0x223c72,
                _skipChannelMode: true
              }); else _0x283fad === "audio" ? await _0x40aac1.sendMessage(_0x492887, {
                audio: _0xb225a3,
                mimetype: _0x223c72,
                _skipChannelMode: true
              }) : await _0x40aac1.sendMessage(_0x492887, {
                image: _0xb225a3,
                caption: _0x59743c,
                mimetype: _0x223c72,
                _skipChannelMode: true
              });
            }
          }
        } catch {}
      }
    } catch {}
    try {
      const _0x1d060c = jidManager.isOwner(_0xd7f33) || _0xd7f33.key.fromMe, _0x1cfbac = _0xd7f33.message || ({}), _0x387087 = normalizeMessageContent(_0x1cfbac) || _0x1cfbac, _0x1a52c6 = _0x387087.reactionMessage;
      if (_0x1a52c6 && _0x1a52c6.key && _0x1a52c6.text && _0x1d060c) {
        const _0x43b5ac = _0x1a52c6.key, _0x402bdf = _0x43b5ac.id, _0x50780e = _0x43b5ac.remoteJid || _0x24564b, _0x3dc214 = store.getMessage(_0x50780e, _0x402bdf);
        if (!_0x3dc214) return;
        const _0x2bfbdd = _0x3dc214.message ? normalizeMessageContent(_0x3dc214.message) || _0x3dc214.message : _0x3dc214, _0x502b7f = !!(_0x2bfbdd.imageMessage?.viewOnce || _0x2bfbdd.videoMessage?.viewOnce || _0x2bfbdd.audioMessage?.viewOnce || _0x2bfbdd.viewOnceMessageV2 || _0x2bfbdd.viewOnceMessageV2Extension || _0x2bfbdd.viewOnceMessage || _0x2bfbdd.ephemeralMessage?.message?.viewOnceMessage);
        if (!_0x502b7f) return;
        let _0x1acc5a = null, _0x52c840 = null;
        if (_0x2bfbdd.imageMessage?.viewOnce) (_0x1acc5a = "image", _0x52c840 = _0x2bfbdd.imageMessage); else {
          if (_0x2bfbdd.videoMessage?.viewOnce) (_0x1acc5a = "video", _0x52c840 = _0x2bfbdd.videoMessage); else {
            if (_0x2bfbdd.audioMessage?.viewOnce) (_0x1acc5a = 'audio', _0x52c840 = _0x2bfbdd.audioMessage); else {
              const _0x119614 = _0x2bfbdd.viewOnceMessageV2?.message || _0x2bfbdd.viewOnceMessageV2Extension?.message || _0x2bfbdd.viewOnceMessage?.message || _0x2bfbdd.ephemeralMessage?.message?.viewOnceMessage?.message;
              if (_0x119614?.imageMessage) (_0x1acc5a = "image", _0x52c840 = _0x119614.imageMessage); else {
                if (_0x119614?.videoMessage) (_0x1acc5a = "video", _0x52c840 = _0x119614.videoMessage); else _0x119614?.audioMessage && (_0x1acc5a = "audio", _0x52c840 = _0x119614.audioMessage);
              }
            }
          }
        }
        if (!_0x1acc5a) return;
        const _0x5b0503 = {
          key: {
            remoteJid: _0x50780e,
            id: _0x402bdf,
            participant: _0x43b5ac.participant,
            fromMe: _0x43b5ac.fromMe || false
          },
          message: _0x3dc214.message || _0x3dc214
        }, _0x221eb4 = await downloadMediaMessage(_0x5b0503, "buffer", {}, {
          logger: {
            level: "silent"
          },
          reuploadRequest: _0x40aac1.updateMediaMessage
        });
        if (!_0x221eb4 || _0x221eb4.length === 0) return;
        const _0x57a6c7 = jidManager.getOwnerInfo(), _0x159fa6 = _0x57a6c7?.ownerJid || _0x459a7e.split('@')[0].split(':')[0] + '@s.whatsapp.net', _0x3f191f = "*Retrieved by " + (global.BOT_NAME || "VIPBOT") + '*\x20' + (BRAND.VIP || BRAND.WOLF), _0x284fa5 = _0x52c840.mimetype || (_0x1acc5a === "video" ? 'video/mp4' : _0x1acc5a === "audio" ? "audio/mpeg" : "image/jpeg");
        if (_0x1acc5a === 'video') await _0x40aac1.sendMessage(_0x159fa6, {
          video: _0x221eb4,
          caption: _0x3f191f,
          mimetype: _0x284fa5,
          _skipChannelMode: true
        }); else _0x1acc5a === "audio" ? await _0x40aac1.sendMessage(_0x159fa6, {
          audio: _0x221eb4,
          mimetype: _0x284fa5,
          _skipChannelMode: true
        }) : await _0x40aac1.sendMessage(_0x159fa6, {
          image: _0x221eb4,
          caption: _0x3f191f,
          mimetype: _0x284fa5,
          _skipChannelMode: true
        });
      }
    } catch {}
    const _0x4c36dc = await resolveCommandAccess(_0x40aac1, _0xd7f33, getSudoList().sudoers), _0x2229c2 = checkBotMode(_0xd7f33, 'message', _0x4c36dc.sudo, _0x4c36dc.owner), _0x268be0 = extractTextFromMessage(_0xd7f33.message);
    _0x268be0 && !_0xd7f33.key.fromMe && (getEffectiveAccessMode() === "silent" || process.env.DEBUG_ACCESS_CONTROL === "true") && originalConsoleMethods.log("[ACCESS verified-v3] mode=" + getEffectiveAccessMode() + " owner=" + _0x4c36dc.owner + " sudo=" + _0x4c36dc.sudo + " result=" + (_0x2229c2 ? 'allow' : "deny"));
    if (!_0x2229c2) return;
    const _0x303fc0 = extractTextFromMessage(_0xd7f33.message);
    if (!_0x303fc0) {
      const _0x3bc6b8 = typeof _0x24564b === "string" && _0x24564b.endsWith("@newsletter");
      if (!_0x1ca46d && !_0x3bc6b8 && !_0xd7f33.key.fromMe && _0x24564b !== "status@broadcast") {
        const _0xc55bab = ["imageMessage", "videoMessage", "audioMessage", "stickerMessage", "documentMessage", "contactMessage", "locationMessage", "liveLocationMessage", "viewOnceMessage", "viewOnceMessageV2", "viewOnceMessageV2Extension", "reactionMessage"], _0x31b8ec = _0xc55bab.find(_0x3f51aa => _0xd7f33.message?.[_0x3f51aa]);
        if (!_0x31b8ec) {
          const _0x3443c9 = Object.keys(_0xd7f33.message || ({})).join(','), _0x3ae48a = ["protocolMessage", "senderKeyDistributionMessage", 'messageContextInfo'], _0x16b7a1 = _0x3ae48a.some(_0x34cd25 => _0x3443c9.includes(_0x34cd25));
          !_0x16b7a1 && UltraCleanLogger.info("[DM-DROP] Unrecognised message type in DM from " + _0x24564b.split('@')[0].slice(-6) + " — keys: " + _0x3443c9);
        }
      }
      return;
    }
    const _0x3c7c98 = getCurrentPrefix();
    let _0x131242 = '', _0x59ae04 = [];
    if (!isPrefixless && _0x303fc0.startsWith(_0x3c7c98)) {
      const _0x1be00b = _0x303fc0.indexOf('\x20', _0x3c7c98.length);
      (_0x131242 = _0x1be00b === -1 ? _0x303fc0.slice(_0x3c7c98.length).toLowerCase().trim() : _0x303fc0.slice(_0x3c7c98.length, _0x1be00b).toLowerCase().trim(), _0x59ae04 = _0x1be00b === -1 ? [] : _0x303fc0.slice(_0x1be00b).trim().split(/\s+/));
    } else {
      if (isPrefixless) {
        const _0x20f086 = _0x303fc0.trim().split(/\s+/), _0x33f67d = _0x20f086[0].toLowerCase();
        if (commands.has(_0x33f67d)) (_0x131242 = _0x33f67d, _0x59ae04 = _0x20f086.slice(1)); else {
          const _0x3f9641 = ["ping", "help", "uptime", "statusstats", "ultimatefix", "prefixinfo"];
          _0x3f9641.includes(_0x33f67d) && (_0x131242 = _0x33f67d, _0x59ae04 = _0x20f086.slice(1));
        }
      }
    }
    if (!_0x131242) {
      const _0x31d192 = ["prefix", "prefixinfo", 'myprefix', "botprefix"], _0x5d169a = _0x303fc0.replace(/^[^a-zA-Z0-9]+/, '').toLowerCase().trim().split(/\s+/)[0];
      _0x31d192.includes(_0x5d169a) && (_0x131242 = "prefixinfo", _0x59ae04 = []);
    }
    if (!_0x131242 && _0x303fc0.trim().startsWith('__') && _0x303fc0.trim().endsWith('__')) {
      const _0x3dc32c = _0x303fc0.trim().replace(/^__|__$/g, '').toLowerCase(), _0x31ef7d = _0x3dc32c.replace(/_/g, '');
      if (commands.has(_0x3dc32c)) (_0x131242 = _0x3dc32c, _0x59ae04 = []); else {
        if (commands.has(_0x31ef7d)) (_0x131242 = _0x31ef7d, _0x59ae04 = []); else for (const [, _0x10d04d] of commands) {
          if (Array.isArray(_0x10d04d.aliases) && (_0x10d04d.aliases.includes(_0x3dc32c) || _0x10d04d.aliases.includes(_0x31ef7d) || _0x10d04d.aliases.includes(_0x303fc0.trim()))) {
            (_0x131242 = _0x10d04d.name, _0x59ae04 = []);
            break;
          }
        }
      }
    }
    if (!_0x131242 && (/^\d+$/).test(_0x303fc0.trim())) {
      const _0x28d822 = _0xd7f33.message?.extendedTextMessage?.contextInfo?.stanzaId;
      _0x28d822 && globalThis.groupListCache?.has(_0x28d822) && (_0x131242 = "mygroups", _0x59ae04 = [_0x303fc0.trim()]);
      if (!_0x131242) {
        const _0x168146 = _0x28d822 && globalThis.togStatusSessionCache?.has(_0x28d822), _0x1f6bcd = (_0x459a7e || '').split('@')[0].split(':')[0], _0x33a29d = _0x1f6bcd && globalThis.togStatusSenderCache?.has(_0x1f6bcd);
        (_0x168146 || _0x33a29d) && (_0x131242 = "togstatus", _0x59ae04 = [_0x303fc0.trim()]);
      }
      !_0x131242 && _0x28d822 && globalThis._chatbotGroupListCache?.has(_0x28d822) && (_0x131242 = 'chatbot', _0x59ae04 = [_0x303fc0.trim()]);
    }
    if (!_0x131242 && (/^all$/i).test(_0x303fc0.trim())) {
      const _0x6ecb13 = _0xd7f33.message?.extendedTextMessage?.contextInfo?.stanzaId, _0x4eef2e = (_0x459a7e || '').split('@')[0].split(':')[0], _0x645743 = _0x6ecb13 && globalThis.togStatusSessionCache?.has(_0x6ecb13), _0x35e6a7 = _0x4eef2e && globalThis.togStatusSenderCache?.has(_0x4eef2e);
      (_0x645743 || _0x35e6a7) && (_0x131242 = "togstatus", _0x59ae04 = ['all']);
    }
    if (!_0x131242 && (/^(leave|yes|y|leave\s+group|confirm)$/i).test(_0x303fc0.trim())) {
      const _0x4d8de3 = _0xd7f33.message?.extendedTextMessage?.contextInfo?.stanzaId;
      if (_0x4d8de3 && globalThis._mygroupLeavePrompts?.has(_0x4d8de3)) {
        const _0x404d74 = globalThis._mygroupLeavePrompts.get(_0x4d8de3);
        try {
          const {setActionSession: _0x5f2a0e} = await import("./lib/actionSession.js");
          _0x5f2a0e('mygroup:' + _0x404d74.senderJid?.split('@')[0], {
            id: _0x404d74.groupId,
            name: _0x404d74.groupName
          });
        } catch {}
        (_0x131242 = "mygroupleave", _0x59ae04 = []);
      }
    }
    if (!_0x131242) {
      if (jidManager.isOwner(_0xd7f33) && _0x303fc0 && _0x303fc0.trim().length > 0) {
        if (_0x459a7e.includes('@lid')) resolvePhoneFromLid(_0x459a7e);
        const _0xd7ea3b = getDisplayNumber(_0x459a7e), _0x353b4f = _0x1ca46d ? '[' + _0x24564b.split('@')[0].substring(0, 10) + ']' : "[DM]", _0x5ae046 = _0x303fc0.length > 60 ? _0x303fc0.substring(0, 60) + '…' : _0x303fc0;
        UltraCleanLogger.ownerMessage(_0x5ae046);
      }
      const _0x4e646 = isChatbotActiveForChat(_0x24564b);
      _0x4e646 && checkBotMode(_0xd7f33, "chatbot", _0x4c36dc.sudo, _0x4c36dc.owner) && (_0x24564b !== "status@broadcast" && !_0xd7f33.key.fromMe && handleChatbotMessage(_0x40aac1, _0xd7f33, commands).catch(_0xb5f9db => {
        UltraCleanLogger.error("[CHATBOT-ERR] " + (_0xb5f9db?.message || _0xb5f9db));
      }));
      return;
    }
    const _0x39dd39 = rateLimiter.canSendCommand(_0x24564b, _0x459a7e, _0x131242);
    if (!_0x39dd39.allowed) {
      await _0x40aac1.sendMessage(_0x24564b, {
        text: STATUS.WARNING + '️\x20' + _0x39dd39.reason
      });
      return;
    }
    _0x459a7e.includes("@lid") && (resolvePhoneFromLid(_0x459a7e), _0x1ca46d && resolveSenderFromGroup(_0x459a7e, _0x24564b, _0x40aac1).catch(() => {}));
    const _0x276cb2 = _0x4c36dc.owner, _0x1017cb = _0x4c36dc.sudo, _0x167aea = getDisplayNumber(_0x459a7e), _0x4f19d0 = isPrefixless ? '' : _0x3c7c98, _0x42d26d = _0x1ca46d ? _0x24564b.split('@')[0].substring(0, 15) : 'DM', _0x137dcc = {
      sender: _0x167aea,
      command: '' + _0x4f19d0 + _0x131242,
      location: _0x42d26d,
      ms: Date.now() - _0x4afb5e
    };
    _0x276cb2 ? UltraCleanLogger.ownerCommand(_0x137dcc) : UltraCleanLogger.command({
      ..._0x137dcc,
      role: _0x1017cb ? "sudo" : "user"
    });
    if (!checkBotMode(_0xd7f33, _0x131242, _0x1017cb, _0x276cb2)) return;
    if (_0x131242 === 'connect' || _0x131242 === 'link') {
      const _0x306c91 = jidManager.cleanJid(_0x459a7e);
      await handleConnectCommand(_0x40aac1, _0xd7f33, _0x59ae04, _0x306c91);
      return;
    }
    const _0x30c222 = commands.get(_0x131242);
    if (_0x30c222) try {
      if (_0x30c222.ownerOnly && !_0x276cb2) {
        const _0x587f23 = _0x30c222.sudoAllowed !== false;
        if (!_0x587f23 || !_0x1017cb) {
          try {
            await _0x40aac1.sendMessage(_0x24564b, {
              text: STATUS.ERROR + " *Owner Only Command*"
            });
          } catch {}
          return;
        }
      }
      setActiveCommand(_0x24564b, _0x131242, _0x59ae04, _0x459a7e);
      try {
        const _0x113289 = _0x30c222.category?.toLowerCase() === 'ai' && _0x30c222.name !== 'gpt' ? withAIResponseHandling(_0x40aac1, _0x30c222.name || _0x131242) : _0x40aac1;
        await _0x30c222.execute(_0x113289, _0xd7f33, _0x59ae04, _0x3c7c98, {
          OWNER_NUMBER: OWNER_CLEAN_NUMBER,
          OWNER_JID: OWNER_CLEAN_JID,
          OWNER_LID: OWNER_LID,
          BOT_NAME: getCurrentBotName(),
          VERSION: VERSION,
          isOwner: () => _0x276cb2,
          isSudo: () => _0x1017cb,
          jidManager: jidManager,
          store: store,
          statusDetector: statusDetector,
          updatePrefix: updatePrefixImmediately,
          getCurrentPrefix: getCurrentPrefix,
          rateLimiter: rateLimiter,
          memberDetector: memberDetector,
          isPrefixless: isPrefixless,
          DiskManager: DiskManager
        });
        const _0x5abd51 = new Set(["song", "music", "audio", 'mp3', "ytmusic", "play", 'ytmp3doc', 'audiodoc', 'ytplay', "video", "vid", "viddl", "dlvid", "downloadvid", "videodoc", "vnext", "nextvid", "vidnext", "nextvideo", "snext", "nextsong", "songnext", "nextresult", "songdl", "dlsong", 'downloadsong', "spotify", 'spot', "spdl", 'spotifydl', "spotid", "shazam", 'whatsong', "findsong", "identify", "musicid", "lyrics", "lyric", 'ly', "musicmenu", "mmenu", 'musichelp', 'musiccmds', "musicmode", 'mm', "mmode", "musicbot", 'dlmp3', "dlmp4", 'mp4', "tiktok", 'instagram', 'facebook', "pinterest"]);
        isMusicModeEnabled() && !_0x5abd51.has(_0x131242) && sendMusicClip(_0x40aac1, _0x24564b, _0xd7f33).catch(() => {});
      } finally {
        clearActiveCommand(_0x24564b, _0x459a7e);
      }
    } catch (_0x3ec250) {
      _0x3ec250?.code === "ENOSPC" ? (UltraCleanLogger.error(UI.SAVE + " Disk full during command " + _0x131242 + '!\x20Running\x20emergency\x20cleanup...'), DiskManager.runCleanup(true), onENOSPC().catch(() => {})) : UltraCleanLogger.error("Command " + _0x131242 + " failed: " + _0x3ec250.message);
    } else await handleDefaultCommands(_0x131242, _0x40aac1, _0xd7f33, _0x59ae04, _0x3c7c98);
  } catch (_0x22464a) {
    _0x22464a?.code === "ENOSPC" ? (UltraCleanLogger.error(UI.SAVE + '\x20Disk\x20full\x20in\x20message\x20handler!\x20Running\x20emergency\x20cleanup...'), DiskManager.runCleanup(true), onENOSPC().catch(() => {})) : UltraCleanLogger.error("Message handler error: " + _0x22464a.message);
  }
}
async function handleDefaultCommands(_0x45a815, _0x426097, _0x4db067, _0x336e63, _0x41e0df) {
  const _0x4ce78e = _0x4db067.key.remoteJid, _0xac4ae9 = jidManager.isOwner(_0x4db067), _0x320b7b = jidManager.getOwnerInfo(), _0x2dbb74 = isPrefixless ? '' : _0x41e0df;
  try {
    switch (_0x45a815) {
      case "ping":
        const _0x41a113 = Date.now(), _0xf183e5 = Date.now() - _0x41a113;
        let _0x58eced = '';
        if (statusDetector) {
          const _0x451d80 = statusDetector.getStats();
          (_0x58eced = UI.EYE + "️ Status Detector: " + STATUS.SUCCESS + " ACTIVE\n", _0x58eced += UI.CHART + " Detected: " + _0x451d80.totalDetected + '\x20statuses\x0a');
        }
        let _0x4e7a2b = '';
        if (memberDetector) {
          const _0x37bd60 = memberDetector.getStats();
          (_0x4e7a2b = SOCIAL.PEOPLE + " Member Detector: " + STATUS.SUCCESS + '\x20ACTIVE\x0a', _0x4e7a2b += UI.CHART + '\x20Events:\x20' + _0x37bd60.totalEvents + '\x0a');
        }
        await _0x426097.sendMessage(_0x4ce78e, {
          text: ETHICAL.PINGPONG + '\x20*Pong!*\x0aLatency:\x20' + _0xf183e5 + "ms\nPrefix: \"" + (isPrefixless ? 'none\x20(prefixless)' : _0x41e0df) + "\"\nMode: " + BOT_MODE + "\nOwner: " + (_0xac4ae9 ? 'Yes\x20' + STATUS.SUCCESS : "No " + STATUS.ERROR) + '\x0a' + _0x58eced + _0x4e7a2b + "Status: Connected " + STATUS.SUCCESS
        }, {
          quoted: _0x4db067
        });
        break;
      case 'help':
        let _0x3c9faf = BRAND.WOLF + '\x20*' + getCurrentBotName() + '\x20HELP*\x0a\x0a';
        (_0x3c9faf += 'Prefix:\x20\x22' + (isPrefixless ? "none (prefixless)" : _0x41e0df) + '\x22\x0a', _0x3c9faf += "Mode: " + BOT_MODE + '\x0a', _0x3c9faf += "Commands: " + getRegisteredCommandCount() + '\x0a\x0a', _0x3c9faf += "*PREFIX MANAGEMENT*\n", _0x3c9faf += _0x2dbb74 + 'setprefix\x20<new_prefix>\x20-\x20Change\x20prefix\x20(persistent)\x0a', _0x3c9faf += _0x2dbb74 + "setprefix none - Enable prefixless mode\n", _0x3c9faf += _0x2dbb74 + 'prefixinfo\x20-\x20Show\x20prefix\x20information\x0a\x0a', _0x3c9faf += "*MEMBER DETECTION*\n", _0x3c9faf += _0x2dbb74 + "members - Show member detection stats\n", _0x3c9faf += _0x2dbb74 + 'welcomeset\x20-\x20Configure\x20welcome\x20messages\x0a\x0a', _0x3c9faf += "*ANTI-VIEWONCE*\n", _0x3c9faf += _0x2dbb74 + "av settings - Check status\n\n", _0x3c9faf += "*STATUS DETECTOR*\n", _0x3c9faf += _0x2dbb74 + "statusstats - Show status detection stats\n\n");
        for (const [_0x386605, _0x582b36] of commandCategories.entries()) {
          (_0x3c9faf += '*' + _0x386605.toUpperCase() + '*\x0a', _0x3c9faf += '' + _0x582b36.slice(0, 6).join(',\x20'));
          if (_0x582b36.length > 6) _0x3c9faf += "... (+" + (_0x582b36.length - 6) + " more)";
          _0x3c9faf += '\x0a\x0a';
        }
        await _0x426097.sendMessage(_0x4ce78e, {
          text: _0x3c9faf
        }, {
          quoted: _0x4db067
        });
        break;
      case "uptime":
        const _0x486e46 = process.uptime(), _0x567575 = Math.floor(_0x486e46 / 3600), _0x21f639 = Math.floor(_0x486e46 % 3600 / 60), _0x37768b = Math.floor(_0x486e46 % 60);
        let _0x413a8c = '';
        if (statusDetector) {
          const _0x270ceb = statusDetector.getStats();
          (_0x413a8c = UI.EYE + "️ Status Detector: " + STATUS.SUCCESS + " ACTIVE\n", _0x413a8c += UI.CHART + " Detected: " + _0x270ceb.totalDetected + " statuses\n", _0x413a8c += AUTOMATION.U1F552 + " Last: " + _0x270ceb.lastDetection + '\x0a');
        }
        let _0x10bd43 = '';
        if (memberDetector) {
          const _0xac904b = memberDetector.getStats();
          (_0x10bd43 = SOCIAL.PEOPLE + " Member Detector: " + STATUS.SUCCESS + " ACTIVE\n", _0x10bd43 += UI.CHART + " Events: " + _0xac904b.totalEvents + '\x0a', _0x10bd43 += DOWNLOAD.METADATA + " Groups: " + _0xac904b.totalGroups + '\x0a');
        }
        await _0x426097.sendMessage(_0x4ce78e, {
          text: UTILITY.CLOCK + '\x20*UPTIME*\x0a\x0a' + _0x567575 + 'h\x20' + _0x21f639 + 'm\x20' + _0x37768b + 's\x0a' + UI.CHART + " Commands: " + getRegisteredCommandCount() + '\x0a' + SOCIAL.CROWN + " Owner: +" + _0x320b7b.ownerNumber + '\x0a' + UI.CHAT + '\x20Prefix:\x20\x22' + (isPrefixless ? 'none\x20(prefixless)' : _0x41e0df) + '\x22\x0a' + LIB.CONTROL_SLIDERS + "️ Mode: " + BOT_MODE + '\x0a' + _0x413a8c + _0x10bd43
        }, {
          quoted: _0x4db067
        });
        break;
      case 'statusstats':
        if (statusDetector) {
          const _0x60165 = statusDetector.getStats(), _0x132d63 = statusDetector.statusLogs.slice(-3).reverse();
          let _0x3f60ff = UI.CHART + '\x20*STATUS\x20DETECTION\x20STATS*\x0a\x0a';
          (_0x3f60ff += UI.SEARCH + " Status: " + STATUS.SUCCESS + " ACTIVE\n", _0x3f60ff += DOWNLOAD.METADATA + " Total detected: " + _0x60165.totalDetected + '\x0a', _0x3f60ff += AUTOMATION.U1F552 + '\x20Last\x20detection:\x20' + _0x60165.lastDetection + '\x0a\x0a', _0x132d63.length > 0 && (_0x3f60ff += MEDIA.PHONE + " *Recent Statuses:*\n", _0x132d63.forEach((_0x252966, _0xce0848) => {
            _0x3f60ff += _0xce0848 + 1 + '.\x20' + _0x252966.sender + ':\x20' + _0x252966.type + '\x20(' + new Date(_0x252966.timestamp).toLocaleTimeString() + ')\x0a';
          })), await _0x426097.sendMessage(_0x4ce78e, {
            text: _0x3f60ff
          }, {
            quoted: _0x4db067
          }));
        } else await _0x426097.sendMessage(_0x4ce78e, {
          text: STATUS.ERROR + " Status detector not initialized."
        }, {
          quoted: _0x4db067
        });
        break;
      case 'members':
      case "memberstats":
        if (memberDetector) {
          const _0x4af1db = memberDetector.getStats();
          let _0x272483 = SOCIAL.PEOPLE + " *MEMBER DETECTION STATS*\n\n";
          (_0x272483 += UI.SEARCH + " Status: " + (_0x4af1db.enabled ? STATUS.SUCCESS + '\x20ACTIVE' : STATUS.ERROR + " DISABLED") + '\x0a', _0x272483 += DOWNLOAD.METADATA + " Total events: " + _0x4af1db.totalEvents + '\x0a', _0x272483 += SOCIAL.PEOPLE + " Groups monitored: " + _0x4af1db.totalGroups + '\x0a', _0x272483 += UI.CHART + " Groups cached: " + _0x4af1db.cachedGroups + '\x0a\x0a', _0x272483 += UI.TARGET + '\x20*Features:*\x0a', _0x272483 += "• Auto-detect new members\n", _0x272483 += "• Terminal notifications\n", _0x272483 += "• Welcome message system\n", _0x272483 += "• Profile picture support\n", await _0x426097.sendMessage(_0x4ce78e, {
            text: _0x272483
          }, {
            quoted: _0x4db067
          }));
        } else await _0x426097.sendMessage(_0x4ce78e, {
          text: STATUS.ERROR + " Member detector not initialized."
        }, {
          quoted: _0x4db067
        });
        break;
      case 'welcomeset':
      case 'welcomeconfig':
        const _0x28270c = UI.CELEBRATE + " *WELCOME SYSTEM CONFIGURATION*\n\n" + "The welcome system is automatically enabled!\n\n" + '*How\x20it\x20works:*\x0a' + '1.\x20Bot\x20detects\x20new\x20members\x20in\x20groups\x0a' + "2. Sends welcome message with profile picture\n" + "3. Mentions the new member\n" + "4. Shows terminal notification\n\n" + "*Default Welcome Message:*\n" + ('\x22' + UI.CELEBRATE + " Welcome {name} to {group}! " + GROUP.CONFETTI + '\x0a\x0a') + ("We're now {members} members strong! " + GROUP.MUSCLE + '\x0a\x0a') + ("Please read the group rules and enjoy your stay! " + UI.CASUAL + "\"\n\n") + "*Variables:*\n" + "{name} - Member's name\n" + "{group} - Group name\n" + "{members} - Total members\n" + "{mention} - Mention the member\n\n" + "*Note:* System runs automatically in background!";
        await _0x426097.sendMessage(_0x4ce78e, {
          text: _0x28270c
        }, {
          quoted: _0x4db067
        });
        break;
      case "ultimatefix":
      case "solveowner":
      case 'fixall':
        const _0x4b77fb = _0x4db067.key.participant || _0x4ce78e, _0x4802ec = jidManager.cleanJid(_0x4b77fb);
        if (!jidManager.isOwner(_0x4db067) && !_0x4db067.key.fromMe) {
          await _0x426097.sendMessage(_0x4ce78e, {
            text: STATUS.ERROR + " *Owner Only Command*"
          }, {
            quoted: _0x4db067
          });
          return;
        }
        const _0x55e907 = await ultimateFixSystem.applyUltimateFix(_0x426097, _0x4b77fb, _0x4802ec, false);
        _0x55e907.success ? await _0x426097.sendMessage(_0x4ce78e, {
          text: STATUS.SUCCESS + " *ULTIMATE FIX APPLIED*\n\nYou should now have full owner access!"
        }, {
          quoted: _0x4db067
        }) : await _0x426097.sendMessage(_0x4ce78e, {
          text: STATUS.ERROR + " *Ultimate Fix Failed*"
        }, {
          quoted: _0x4db067
        });
        break;
      case "prefixinfo":
        const _0x2c75d8 = {
          'bot_settings\x20(DB)': !!_cache_bot_settings,
          'prefix_config\x20(DB)': !!_cache_prefix_config
        };
        let _0x4c6a1b = BRAND.LIGHTNING + " *PREFIX INFORMATION*\n\n";
        (_0x4c6a1b += UI.NOTE + " Current Prefix: *" + (isPrefixless ? "none (prefixless)" : _0x41e0df) + '*\x0a', _0x4c6a1b += UI.SETTINGS + "️ Default Prefix: " + DEFAULT_PREFIX + '\x0a', _0x4c6a1b += SOCIAL.GLOBE + " Global Prefix: " + (global.prefix || "Not set") + '\x0a', _0x4c6a1b += UI.FOLDER + " ENV Prefix: " + (process.env.PREFIX || "Not set") + '\x0a', _0x4c6a1b += UI.TARGET + " Prefixless Mode: " + (isPrefixless ? STATUS.SUCCESS + " ENABLED" : STATUS.ERROR + " DISABLED") + '\x0a\x0a', _0x4c6a1b += UI.CLIPBOARD + " *Config Status:*\n");
        for (const [_0x4e89bc, _0x2a8286] of Object.entries(_0x2c75d8)) {
          _0x4c6a1b += "┆ ✦ " + _0x4e89bc + ':\x20' + (_0x2a8286 ? '' + STATUS.SUCCESS : '' + STATUS.ERROR) + '\x0a';
        }
        (_0x4c6a1b += '\x0a' + UTILITY.TIP + " *Changes are saved to database and persist after restart!*", await _0x426097.sendMessage(_0x4ce78e, {
          text: _0x4c6a1b
        }, {
          quoted: _0x4db067
        }));
        break;
      case "forcerestart":
        if (!jidManager.isOwner(_0x4db067)) {
          await _0x426097.sendMessage(_0x4ce78e, {
            text: STATUS.ERROR + " *Owner Only Command*"
          }, {
            quoted: _0x4db067
          });
          return;
        }
        (await _0x426097.sendMessage(_0x4ce78e, {
          text: UI.REFRESH + '\x20*Initiating\x20forced\x20restart...*\x0a\x0aBot\x20will\x20restart\x20in\x205\x20seconds.'
        }, {
          quoted: _0x4db067
        }), setTimeout(() => {
          process.exit(1);
        }, 5000));
        break;
    }
  } catch (_0x3af68b) {
    UltraCleanLogger.error("Default command error: " + _0x3af68b.message);
  }
}
async function main() {
  try {
    (await setupWebServer(), setupSelfPing(), setupHerokuKeepAlive(), UltraCleanLogger.info("Hosted on " + detectPlatform()));
    try {
      await _dbInitPromise;
    } catch {}
    const _0x188b07 = process.env.HEROKU_APP_NAME || process.env.DYNO || process.env.HEROKU_API_KEY || false, _0x378422 = process.env.SESSION_ID;
    if (_0x188b07) {
      (UltraCleanLogger.info(UTILITY.CONSTRUCTION + "️ Platform: Heroku"), UltraCleanLogger.info(MEDIA.PACKAGE + " Dyno: " + (process.env.DYNO || "Unknown")));
      if (_0x378422 && _0x378422.trim() !== '') {
        UltraCleanLogger.success(STATUS.LOCK_WITH_KEY + '\x20Heroku\x20SESSION_ID\x20detected');
        const _0x7c6aa6 = setupHerokuSession();
        if (_0x7c6aa6) {
          (UltraCleanLogger.success(STATUS.SUCCESS + " Heroku session configured successfully"), UltraCleanLogger.info(UI.REFRESH + '\x20Starting\x20bot\x20with\x20Heroku\x20session...'), await startBot("auto", null));
          return;
        } else UltraCleanLogger.warning(STATUS.WARNING + '️\x20Heroku\x20session\x20setup\x20failed,\x20falling\x20back\x20to\x20normal\x20login');
      } else (UltraCleanLogger.warning(STATUS.WARNING + "️ Heroku detected but no SESSION_ID found"), UltraCleanLogger.info(UTILITY.TIP + '\x20Add\x20SESSION_ID\x20to\x20Heroku\x20Config\x20Vars\x20for\x20auto-login'));
    }
    (DiskManager.start(), initStorageManager());
    const _0xadb82a = process.env.SESSION_ID, _0x2d2614 = _0xadb82a && _0xadb82a.trim() !== '', _0xd27e73 = _0x40e1ec.join(SESSION_DIR, "creds.json"), _0x13cb21 = "./.session_id_hash";
    if (_0x2d2614) {
      const {createHash: _0x5b698b} = await import("crypto"), _0x3f10b6 = _0x5b698b("sha256").update(_0xadb82a.trim()).digest("hex"), _0x5b58eb = './.session_revoked';
      let _0x4ee252 = null;
      try {
        _0x4ee252 = _0x32ecad.existsSync(_0x5b58eb) ? _0x32ecad.readFileSync(_0x5b58eb, 'utf8').trim() : null;
      } catch {}
      if (_0x4ee252 && _0x4ee252 === _0x3f10b6) UltraCleanLogger.warning(STATUS.WARNING + "️  SESSION_ID was permanently revoked by WhatsApp — skipping. Update SESSION_ID or choose login option."); else {
        let _0x2ab4de = null;
        try {
          _0x2ab4de = _0x32ecad.existsSync(_0x13cb21) ? _0x32ecad.readFileSync(_0x13cb21, "utf8").trim() : null;
        } catch {}
        const _0x30c5bc = _0x3f10b6 !== _0x2ab4de, _0x381038 = _0x32ecad.existsSync(_0xd27e73);
        if (!_0x30c5bc && _0x381038) try {
          const _0x1526dc = JSON.parse(_0x32ecad.readFileSync(_0xd27e73, 'utf8'));
          if (_0x1526dc && (_0x1526dc.noiseKey || _0x1526dc.signedIdentityKey)) {
            (UltraCleanLogger.success(STATUS.LOCK_WITH_KEY + " Same SESSION_ID — using existing evolved session..."), await startBot("auto", null));
            return;
          }
        } catch (_0x507cdf) {
          UltraCleanLogger.warning(STATUS.WARNING + '️\x20Existing\x20creds.json\x20unreadable:\x20' + _0x507cdf.message);
        }
        if (_0x30c5bc) {
          UltraCleanLogger.warning(UI.REFRESH + " SESSION_ID changed — clearing stale session and applying new one...");
          _0x32ecad.existsSync(SESSION_DIR) && _0x32ecad.rmSync(SESSION_DIR, {
            recursive: true,
            force: true
          });
          try {
            const _0x51c6aa = _0x327500.getClient();
            try {
              _0x51c6aa.prepare('DELETE\x20FROM\x20session_keys').run();
            } catch {}
            try {
              _0x51c6aa.prepare("DELETE FROM session_creds").run();
            } catch {}
          } catch {}
        }
        UltraCleanLogger.info(STATUS.LOCK_WITH_KEY + '\x20Applying\x20SESSION_ID\x20to\x20creds.json...');
        try {
          const _0x3bbcca = parseWolfBotSession(_0xadb82a);
          if (_0x3bbcca) {
            (ensureSessionDir(), _0x32ecad.writeFileSync(_0xd27e73, JSON.stringify(_0x3bbcca, null, 2)));
            try {
              _0x32ecad.writeFileSync(_0x13cb21, _0x3f10b6, 'utf8');
            } catch {}
            (UltraCleanLogger.success(STATUS.SUCCESS + " SESSION_ID applied — connecting..."), await startBot('auto', null));
            return;
          }
        } catch (_0x17fcb1) {
          UltraCleanLogger.warning(STATUS.WARNING + "️ SESSION_ID parsing failed: " + _0x17fcb1.message);
        }
      }
    }
    const _0x533162 = _0x32ecad.existsSync(SESSION_DIR), _0x10adf2 = _0x32ecad.existsSync(_0xd27e73);
    if (_0x533162 && _0x10adf2) {
      UltraCleanLogger.success(STATUS.LOCK_WITH_KEY + " Found existing session, attempting auto-reconnect...");
      try {
        const _0x2cce6b = JSON.parse(_0x32ecad.readFileSync(_0xd27e73, "utf8"));
        if (_0x2cce6b && (_0x2cce6b.noiseKey || _0x2cce6b.signedIdentityKey || _0x2cce6b.creds)) {
          (UltraCleanLogger.success(STATUS.SUCCESS + '\x20Session\x20file\x20valid,\x20auto-connecting...'), await startBot("auto", null));
          return;
        } else UltraCleanLogger.warning(STATUS.WARNING + "️ Session file exists but may be corrupted");
      } catch (_0x7e5129) {
        UltraCleanLogger.error(STATUS.ERROR + " Error loading session: " + _0x7e5129.message);
      }
    }
    if (process.env.PHONE_NUMBER && process.env.PHONE_NUMBER.trim() !== '') {
      const _0x261371 = process.env.PHONE_NUMBER.replace(/[^0-9]/g, '');
      if (_0x261371.length >= 10) {
        (UltraCleanLogger.info(MEDIA.PHONE + " PHONE_NUMBER env var found: " + _0x261371 + ", auto-pairing..."), await startBot("pair", _0x261371));
        return;
      }
    }
    const _0x23ecaf = !!(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_NAME || process.env.RAILWAY_PROJECT_ID || process.env.RAILWAY_SERVICE_NAME), _0xf109b8 = _0x188b07 || _0x23ecaf || !!(process.env.RENDER || process.env.RENDER_SERVICE_ID) || !!(process.env.KOYEB_APP || process.env.KOYEB_REGION);
    if (_0xf109b8) {
      const _0x247fbd = detectPlatform();
      (UltraCleanLogger.error(STATUS.ERROR + '\x20' + _0x247fbd + " deployment: No valid session found"), UltraCleanLogger.info(UTILITY.TIP + " Set SESSION_ID in your environment/service variables and restart."), setInterval(() => {
        UltraCleanLogger.warning(UTILITY.HOURGLASS + " Waiting for SESSION_ID to be configured — set it in env vars and restart.");
      }, 600000));
      return;
    }
    UltraCleanLogger.info(MEDIA.PHONE + " No valid session found, showing login options...");
    const _0xa97a06 = new LoginManager(), _0xe4cd3 = await _0xa97a06.selectMode();
    _0xa97a06.close();
    const _0xa8f51f = _0xe4cd3.mode === "session" ? _0xe4cd3.sessionId : _0xe4cd3.phone;
    await startBot(_0xe4cd3.mode, _0xa8f51f);
  } catch (_0x26ad6e) {
    (UltraCleanLogger.error("Main error: " + _0x26ad6e.message), process.env.HEROKU || process.env.DYNO ? (UltraCleanLogger.warning(UI.REFRESH + " Heroku restart scheduled in 5 seconds..."), setTimeout(async () => {
      await main();
    }, 5000)) : (UltraCleanLogger.warning(UI.REFRESH + '\x20Restarting\x20in\x208\x20seconds...'), setTimeout(async () => {
      await main();
    }, 8000)));
  }
}
(process.on("SIGTERM", async () => {
  try {
    if (typeof globalThis.preExitSave === "function") await globalThis.preExitSave();
  } catch {}
  try {
    stopHeartbeat();
  } catch {}
  try {
    memoryMonitor.stop();
  } catch {}
  try {
    if (SOCKET_INSTANCE) SOCKET_INSTANCE.ws.close();
  } catch {}
  process.exit(0);
}), process.on('SIGINT', async () => {
  console.log(_0x3ba8f9.yellow('\x0a' + UI.WAVE + " Shutting down gracefully..."));
  try {
    if (typeof globalThis.preExitSave === "function") await globalThis.preExitSave();
  } catch {}
  (stopHeartbeat(), memoryMonitor.stop());
  if (SOCKET_INSTANCE) SOCKET_INSTANCE.ws.close();
  process.exit(0);
}));
let _isRecoveringFromException = false;
(process.on("uncaughtException", _0x2684c4 => {
  (UltraCleanLogger.error('Uncaught\x20exception:\x20' + _0x2684c4.message), UltraCleanLogger.error(_0x2684c4.stack));
  if (!_0x2684c4.message?.includes("SIGINT") && !_0x2684c4.message?.includes("shutdown")) {
    if (_isRecoveringFromException) {
      UltraCleanLogger.error("Recovery already in progress, skipping duplicate recovery attempt.");
      return;
    }
    (_isRecoveringFromException = true, setTimeout(async () => {
      UltraCleanLogger.info(UI.REFRESH + '\x20Auto-recovering\x20from\x20uncaught\x20exception...');
      try {
        await main();
      } catch (_0x4ddaaf) {
        UltraCleanLogger.error("Recovery failed: " + _0x4ddaaf.message);
      } finally {
        _isRecoveringFromException = false;
      }
    }, 5000));
  }
}), process.on("unhandledRejection", _0x28ffd2 => {
  UltraCleanLogger.error('Unhandled\x20rejection:\x20' + (_0x28ffd2?.message || _0x28ffd2));
}), main().catch(_0x6a0e31 => {
  (UltraCleanLogger.critical("Fatal error: " + _0x6a0e31.message), process.exit(1));
}));
