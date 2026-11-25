import {CHANNEL} from '../../lib/emojis.js';
import _0x2fe6c8 from 'fs';
import _0x16e814 from 'path';
import {getBinaryNodeChild, getBinaryNodeChildren} from 'wolfsocket';
import {getOwnerName} from '../../lib/menuHelper.js';
import {REMOTE_URLS} from '../../lib/remoteUrls.js';
const CONFIG_FILE = "./data/channelReactConfig.json", alreadyReactedMessages = new Set(), knownNewsletters = new Set();
let _reactQueue = [], _processingQueue = false;
const EMOJI_POOL = ['' + CHANNEL.U2764_FE0F, '' + CHANNEL.U1F499, '' + CHANNEL.U1F49A, '' + CHANNEL.U1F49C, '' + CHANNEL.U1FAF6, '' + CHANNEL.U1F602, '' + CHANNEL.U1F923, '' + CHANNEL.U1F606, '' + CHANNEL.U1F639, '' + CHANNEL.U1F622, '' + CHANNEL.U1F62D, '' + CHANNEL.U1F979, '' + CHANNEL.U1F60A, '' + CHANNEL.U1F604, '' + CHANNEL.U1F601, '' + CHANNEL.U1F973, '' + CHANNEL.U1F929, '' + CHANNEL.U1F60E, '' + CHANNEL.U1F607, '' + CHANNEL.U1F917, '' + CHANNEL.U1F60D, '' + CHANNEL.U1F970, '' + CHANNEL.U1F618, '' + CHANNEL.U1F62E, '' + CHANNEL.U1F62F, '' + CHANNEL.U1FAE2, '' + CHANNEL.U1F92F, '' + CHANNEL.U1F389, '' + CHANNEL.U1F38A, '' + CHANNEL.U1F44F, '' + CHANNEL.U1F64C, '' + CHANNEL.U1F525, '' + CHANNEL.U2728, '' + CHANNEL.U1F4AF], WHITELIST_TTL = 5 * 60 * 1000;
let _whitelistCache = new Set(), _whitelistLastFetch = 0, _whitelistFetching = false;
async function _fetchWhitelistRemote() {
  const _0x59aaa9 = [REMOTE_URLS.wolfReacts.primary, REMOTE_URLS.wolfReacts.fallback];
  for (const _0x392450 of _0x59aaa9) {
    try {
      const _0x4b3cab = await fetch(_0x392450, {
        signal: AbortSignal.timeout(8000)
      });
      if (!_0x4b3cab.ok) continue;
      const _0xcaf88e = await _0x4b3cab.json(), _0x27bba9 = Array.isArray(_0xcaf88e) ? _0xcaf88e : _0xcaf88e?.allowedJids ?? [], _0x33dbf0 = _0x27bba9.filter(_0x1cd6f2 => typeof _0x1cd6f2 === 'string' && _0x1cd6f2.endsWith('@newsletter'));
      return new Set(_0x33dbf0);
    } catch {}
  }
  return null;
}
async function isWhitelisted(_0x273c45) {
  const _0x1500e6 = Date.now(), _0x2758ff = _0x1500e6 - _whitelistLastFetch > WHITELIST_TTL;
  if (_0x2758ff && !_whitelistFetching) {
    _whitelistFetching = true;
    if (_whitelistLastFetch === 0) {
      const _0x4bde66 = await _fetchWhitelistRemote();
      (_0x4bde66 !== null && (_whitelistCache = _0x4bde66, _whitelistLastFetch = Date.now()), _whitelistFetching = false);
    } else _fetchWhitelistRemote().then(_0x1d508c => {
      (_0x1d508c !== null && (_whitelistCache = _0x1d508c, _whitelistLastFetch = Date.now()), _whitelistFetching = false);
    }).catch(() => {
      _whitelistFetching = false;
    });
  }
  return _whitelistCache.has(_0x273c45);
}
async function getWhitelistedJids() {
  return (await isWhitelisted(''), [..._whitelistCache]);
}
async function fetchLatestNewsletterMessageId(_0x4d63ec, _0xb5b22d) {
  if (typeof _0x4d63ec.query !== 'function' || typeof _0x4d63ec.generateMessageTag !== "function") throw new Error("Socket does not expose the newsletter query methods");
  const _0x2110b7 = await _0x4d63ec.query({
    tag: 'iq',
    attrs: {
      id: _0x4d63ec.generateMessageTag(),
      type: "get",
      to: "s.whatsapp.net",
      xmlns: "newsletter"
    },
    content: [{
      tag: 'messages',
      attrs: {
        type: "jid",
        jid: _0xb5b22d,
        count: '1'
      }
    }]
  });
  if (!_0x2110b7) throw new Error("WhatsApp did not reply to the newsletter messages query");
  const _0x1e5714 = getBinaryNodeChild(_0x2110b7, "messages"), _0x503565 = getBinaryNodeChildren(_0x1e5714, 'message'), _0xdbf667 = _0x503565[_0x503565.length - 1];
  return _0xdbf667?.attrs?.server_id || _0xdbf667?.attrs?.id || null;
}
function initConfig() {
  const _0x31ecfb = _0x16e814.dirname(CONFIG_FILE);
  !_0x2fe6c8.existsSync(_0x31ecfb) && _0x2fe6c8.mkdirSync(_0x31ecfb, {
    recursive: true
  });
  if (!_0x2fe6c8.existsSync(CONFIG_FILE)) {
    const _0x3b3690 = {
      enabled: true,
      emoji: '' + CHANNEL.U1F60A,
      totalReacted: 0,
      lastReacted: null,
      lastReactionTime: 0,
      subscribedJids: [],
      settings: {
        minDelay: 120000,
        maxDelay: 300000
      }
    };
    _0x2fe6c8.writeFileSync(CONFIG_FILE, JSON.stringify(_0x3b3690, null, 2));
  }
  setInterval(() => {
    alreadyReactedMessages.clear();
  }, 60 * 60 * 1000);
}
initConfig();
function _crLog(_0x44bd2e, _0x128b55, _0x69150c, _0x3ecafd, _0x55dcfb = 'green') {
  const _0x7f70f7 = _0x55dcfb === "red" ? '\x1b[1m\x1b[38;2;255;80;80m' : _0x55dcfb === "yellow" ? "\u001b[1m\u001b[38;2;250;204;21m" : "\u001b[1m\u001b[38;2;0;255;156m", _0x511232 = _0x55dcfb === 'red' ? "\u001b[38;2;255;80;80m" : _0x55dcfb === 'yellow' ? "\u001b[38;2;250;204;21m" : "\u001b[38;2;0;255;156m", _0x2a139d = "\u001b[2m\u001b[38;2;100;120;130m", _0x1c3a10 = "\u001b[38;2;200;215;225m", _0x15efb1 = "\u001b[0m", _0x5cdbf9 = _0x2a139d + '·' + _0x15efb1, _0xfe8df4 = ['' + _0x7f70f7 + CHANNEL.U256D + CHANNEL.U2500 + CHANNEL.U2308 + '\x20' + _0x44bd2e + '\x20' + _0x128b55 + '\x20' + CHANNEL.U230B + _0x15efb1];
  if (_0x69150c) _0xfe8df4.push(_0x7f70f7 + '»\x20' + _0x15efb1 + _0x1c3a10 + _0x69150c + _0x15efb1);
  if (_0x3ecafd && typeof _0x3ecafd === "object") {
    const _0xaac45 = Object.entries(_0x3ecafd).filter(([, _0x716ff9]) => _0x716ff9 !== undefined && _0x716ff9 !== null && _0x716ff9 !== '').map(([_0x529213, _0x37dea8]) => '' + _0x2a139d + _0x529213 + _0x15efb1 + '\x20' + _0x511232 + ':' + _0x15efb1 + '\x20' + _0x1c3a10 + _0x37dea8 + _0x15efb1);
    if (_0xaac45.length) _0xfe8df4.push(_0x7f70f7 + '»\x20' + _0x15efb1 + _0xaac45.join('\x20\x20' + _0x5cdbf9 + '\x20\x20'));
  }
  (_0xfe8df4.push('' + _0x7f70f7 + CHANNEL.U2570 + '⊷' + _0x15efb1), console.log('\x0a' + _0xfe8df4.join('\x0a') + '\x0a'));
}
class ChannelReactManager {
  constructor() {
    (this.config = this.loadConfig(), this.lastReactionTime = this.config.lastReactionTime || 0, this._startupJitter = Math.floor(Math.random() * 60000), this._remotePollTimer = null, this._remotePollSock = null, this._remotePollBusy = false);
    if (Array.isArray(this.config.subscribedJids)) for (const _0x273d92 of this.config.subscribedJids) {
      knownNewsletters.add(_0x273d92);
    }
  }
  ['loadConfig']() {
    try {
      const _0xa1f444 = _0x2fe6c8.readFileSync(CONFIG_FILE, 'utf8'), _0x5b51e1 = JSON.parse(_0xa1f444);
      if (!_0x5b51e1.settings) _0x5b51e1.settings = {
        minDelay: 120000,
        maxDelay: 300000
      };
      if (!_0x5b51e1.subscribedJids) _0x5b51e1.subscribedJids = [];
      return _0x5b51e1;
    } catch {
      return {
        enabled: true,
        emoji: '' + CHANNEL.U1F60A,
        totalReacted: 0,
        lastReacted: null,
        lastReactionTime: 0,
        subscribedJids: [],
        settings: {
          minDelay: 120000,
          maxDelay: 300000
        }
      };
    }
  }
  ['saveConfig']() {
    try {
      (this.config.subscribedJids = [...knownNewsletters], _0x2fe6c8.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2)));
    } catch {}
  }
  get ['enabled']() {
    return this.config.enabled;
  }
  get ["emoji"]() {
    return this.config.emoji || '' + CHANNEL.U1F60A;
  }
  get ["minDelay"]() {
    return this.config.settings?.minDelay || 120000;
  }
  get ['maxDelay']() {
    return this.config.settings?.maxDelay || 300000;
  }
  ["getRandomEmoji"]() {
    return EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
  }
  ['getRandomDelay']() {
    const _0x8e18e9 = this.minDelay, _0x43f118 = this.maxDelay;
    return Math.floor(Math.random() * (_0x43f118 - _0x8e18e9 + 1)) + _0x8e18e9;
  }
  ["getNextReactionDelay"]() {
    const _0x31cf9d = this.getRandomDelay();
    return (_crLog('' + CHANNEL.U1F4E2, "CHANNEL-REACT", "Next reaction scheduled", {
      In: (_0x31cf9d / 1000 / 60).toFixed(2) + " min",
      Seconds: _0x31cf9d / 1000 + 's'
    }), _0x31cf9d);
  }
  ['toggle'](_0x31fb0f = false) {
    return (_0x31fb0f ? this.config.enabled = false : this.config.enabled = !this.config.enabled, this.saveConfig(), this.config.enabled);
  }
  ["enable"]() {
    return (this.config.enabled = true, this.saveConfig(), true);
  }
  ["disable"]() {
    return (this.config.enabled = false, this.saveConfig(), false);
  }
  ["setEmoji"](_0x339d2b) {
    return (this.config.emoji = _0x339d2b, this.saveConfig(), _0x339d2b);
  }
  ['setDelay'](_0x113d5b, _0x5ca9bc) {
    if (!this.config.settings) this.config.settings = {};
    (this.config.settings.minDelay = Math.max(60000, _0x113d5b), this.config.settings.maxDelay = Math.max(this.config.settings.minDelay + 60000, _0x5ca9bc), this.saveConfig());
  }
  ["registerNewsletter"](_0x29a24a) {
    if (!_0x29a24a || !_0x29a24a.endsWith("@newsletter")) return;
    !knownNewsletters.has(_0x29a24a) && (knownNewsletters.add(_0x29a24a), this.saveConfig());
  }
  ["isKnownNewsletter"](_0x1f83c6) {
    return knownNewsletters.has(_0x1f83c6);
  }
  ["getKnownNewsletters"]() {
    return [...knownNewsletters];
  }
  ["removeNewsletter"](_0x4deeb4) {
    (knownNewsletters.delete(_0x4deeb4), this.saveConfig());
  }
  async ["queueReaction"](_0x40ad5a, _0x28ce44, _0x3d08ed) {
    if (!this.config.enabled) return false;
    const _0x1d2871 = _0x28ce44 + '|' + _0x3d08ed;
    if (alreadyReactedMessages.has(_0x1d2871)) return false;
    alreadyReactedMessages.add(_0x1d2871);
    const _0x342dcd = this.getRandomEmoji();
    return (_reactQueue.push({
      sock: _0x40ad5a,
      newsletterJid: _0x28ce44,
      serverId: _0x3d08ed,
      emoji: _0x342dcd
    }), !_processingQueue && this._processQueue(), true);
  }
  ["startRemotePolling"](_0x55d4f1) {
    this._remotePollSock = _0x55d4f1;
    if (this._remotePollTimer) return;
    const _0x44c941 = async () => {
      if (this._remotePollBusy || !this.enabled) return;
      this._remotePollBusy = true;
      try {
        const _0x22da52 = this._remotePollSock;
        if (!_0x22da52?.query || !_0x22da52?.generateMessageTag) return;
        const _0xb890b8 = await getWhitelistedJids();
        if (!_0xb890b8.length) {
          _crLog('' + CHANNEL.U26A0_FE0F, "CHANNEL-REACT", 'Remote\x20channel\x20list\x20is\x20empty', {
            Source: REMOTE_URLS.wolfReacts.primary
          }, "yellow");
          return;
        }
        let _0x3f2d7a = 0, _0x115dd4 = 0;
        for (const _0x197ed1 of _0xb890b8) {
          try {
            const _0x1ca8d9 = await fetchLatestNewsletterMessageId(_0x22da52, _0x197ed1);
            _0x3f2d7a++;
            if (_0x1ca8d9) {
              this.registerNewsletter(_0x197ed1);
              if (await this.queueReaction(_0x22da52, _0x197ed1, _0x1ca8d9)) _0x115dd4++;
            }
          } catch (_0x3ecbc2) {
            _crLog('' + CHANNEL.U26A0_FE0F, 'CHANNEL-REACT', 'Newsletter\x20history\x20fetch\x20failed', {
              JID: _0x197ed1,
              Error: _0x3ecbc2?.message || String(_0x3ecbc2)
            }, "yellow");
          }
        }
        _crLog('' + CHANNEL.U1F50D, "CHANNEL-REACT", "Remote channel poll complete", {
          Channels: _0xb890b8.length,
          Checked: _0x3f2d7a,
          'New\x20posts\x20queued': _0x115dd4
        }, _0x115dd4 ? 'green' : 'yellow');
      } finally {
        this._remotePollBusy = false;
      }
    };
    (_0x44c941().catch(() => {}), this._remotePollTimer = setInterval(() => _0x44c941().catch(() => {}), 2 * 60 * 1000), this._remotePollTimer.unref?.());
  }
  async ["_processQueue"]() {
    if (_processingQueue) return;
    _processingQueue = true;
    while (_reactQueue.length > 0) {
      const {sock: _0x48caa1, newsletterJid: _0x594bc3, serverId: _0x19cc66, emoji: _0x2fed83} = _reactQueue.shift(), _0x229a34 = Date.now(), _0x3df85c = _0x229a34 - this.lastReactionTime;
      let _0x4bd573 = this.getRandomDelay();
      this.lastReactionTime === 0 && this._startupJitter > 0 && (_0x4bd573 += this._startupJitter, this._startupJitter = 0);
      if (_0x3df85c < _0x4bd573) {
        const _0x4aee6e = _0x4bd573 - _0x3df85c, _0x429e4a = (_0x4aee6e / 1000 / 60).toFixed(2);
        (_crLog('' + CHANNEL.U23F3, "CHANNEL-REACT", 'Awaiting\x20next\x20reaction\x20window', {
          Wait: _0x429e4a + " min",
          Seconds: _0x4aee6e / 1000 + 's'
        }, "yellow"), await new Promise(_0x1ffe93 => setTimeout(_0x1ffe93, _0x4aee6e)));
      }
      try {
        (await _0x48caa1.newsletterReactMessage(_0x594bc3, _0x19cc66, _0x2fed83), this.lastReactionTime = Date.now(), this.config.totalReacted = (this.config.totalReacted || 0) + 1, this.config.lastReacted = new Date().toISOString(), this.config.lastReactionTime = this.lastReactionTime);
        const _0x11b23c = this.getRandomDelay(), _0xb1c340 = (_0x11b23c / 1000 / 60).toFixed(2);
        (_crLog('' + CHANNEL.U2705, "CHANNEL-REACT", 'Reacted\x20with\x20' + _0x2fed83, {
          Total: this.config.totalReacted,
          'Next\x20in': '~' + _0xb1c340 + " min"
        }), this.config.totalReacted % 10 === 0 && this.saveConfig());
      } catch (_0x58f60e) {
        if (_0x58f60e?.message?.includes("rate") || _0x58f60e?.message?.includes("429")) {
          const _0x14423d = 60000 + Math.random() * 120000;
          (_crLog('' + CHANNEL.U26A0_FE0F, 'CHANNEL-REACT', 'Rate\x20limited\x20—\x20backing\x20off', {
            Backoff: Math.round(_0x14423d / 1000) + 's'
          }, 'yellow'), await new Promise(_0x133c2f => setTimeout(_0x133c2f, _0x14423d)));
        } else _crLog('' + CHANNEL.U274C, "CHANNEL-REACT", "Reaction failed", {
          Error: _0x58f60e?.message || String(_0x58f60e)
        }, 'red');
      }
    }
    (this.saveConfig(), _processingQueue = false);
  }
  ['getStats']() {
    return {
      enabled: this.config.enabled,
      emoji: this.emoji,
      totalReacted: this.config.totalReacted || 0,
      lastReacted: this.config.lastReacted,
      knownChannels: knownNewsletters.size,
      whitelistedChannels: _whitelistCache.size,
      minDelay: this.minDelay,
      maxDelay: this.maxDelay,
      queueLength: _reactQueue.length,
      emojiPoolSize: EMOJI_POOL.length
    };
  }
}
const channelReactManager = new ChannelReactManager();
export async function discoverNewsletters(_0x53bb29) {
  channelReactManager.startRemotePolling(_0x53bb29);
  try {
    const _0x5c7358 = await _0x53bb29.groupFetchAllParticipating?.();
    if (_0x5c7358) for (const _0x556ce2 of Object.keys(_0x5c7358)) {
      _0x556ce2.endsWith('@newsletter') && channelReactManager.registerNewsletter(_0x556ce2);
    }
  } catch {}
}
export async function handleChannelReact(_0x4563a6, _0x29285a) {
  try {
    const _0xe6178f = _0x29285a.key?.remoteJid;
    if (!_0xe6178f || !_0xe6178f.endsWith("@newsletter")) return;
    if (!channelReactManager.enabled) return;
    if (_0x29285a.key?.fromMe) return;
    const _0x1bbc34 = await isWhitelisted(_0xe6178f);
    if (!_0x1bbc34) {
      _crLog('' + CHANNEL.U1F6AB, "WOLF-REACTS", 'Newsletter\x20not\x20whitelisted\x20—\x20skipping', {
        JID: _0xe6178f
      }, "yellow");
      return;
    }
    channelReactManager.registerNewsletter(_0xe6178f);
    const _0xda1828 = _0x29285a.key?.server_id || _0x29285a.key?.id;
    if (!_0xda1828) return;
    await channelReactManager.queueReaction(_0x4563a6, _0xe6178f, _0xda1828);
  } catch (_0x3ca6f0) {
    _crLog('' + CHANNEL.U274C, "CHANNEL-REACT", "Handler error", {
      Error: _0x3ca6f0?.message || String(_0x3ca6f0)
    }, "red");
  }
}
export {channelReactManager};
export default null;
