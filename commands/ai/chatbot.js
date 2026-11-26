import _0x50ea77 from 'axios';
import _0x5f1a2a from 'fs';
import _0x15eb9f from 'path';
import {normalizeMessageContent, jidNormalizedUser, downloadMediaMessage} from 'wolfsocket';
import _0x4b8821 from '../../lib/database.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {getPhoneFromLid} from '../../lib/sudo-store.js';
import {AI_MODELS, MODEL_PRIORITY, extractXWolfResponse, getAIQuerySources, getModelList} from '../../lib/aiModels.js';
import {vision as _0x18ce90, image as _0x98f7cf} from '../../lib/nvidia.js';
import {loadProfile, saveProfile, learnFromMessage, buildProfileContext, getPersonalizedGreeting} from '../../lib/userProfile.js';
import {resolveJid} from '../tools/getjid.js';
import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
const DATA_DIR = './data/chatbot', CONVERSATIONS_DIR = _0x15eb9f.join(DATA_DIR, "conversations"), _lgCache = new Map();
globalThis._chatbotGroupListCache = _lgCache;
const _LG_MAX = 30;
async function _extractTargetUsers(_0xd94e5, _0x4bbd1b, _0x43ea65) {
  const _0x4f0d78 = _0x4bbd1b.key.remoteJid, _0xd486e0 = new Set(), _0x34e893 = (_0x4bbd1b.message?.extendedTextMessage?.contextInfo?.mentionedJid || []).filter(_0x539816 => _0x539816 && !_0x539816.includes("status"));
  if (_0x34e893.length > 0) for (const _0x55f382 of _0x34e893) {
    try {
      const _0x4ff014 = await resolveJid(_0xd94e5, _0x55f382, _0x4f0d78);
      _0xd486e0.add(_0x4ff014);
    } catch {
      _0xd486e0.add(_0x55f382);
    }
  } else for (let _0xbea7ca = 1; _0xbea7ca < _0x43ea65.length; _0xbea7ca++) {
    const _0x26b60f = String(_0x43ea65[_0xbea7ca]).replace(/[^0-9]/g, '');
    if (_0x26b60f.length >= 7) _0xd486e0.add(_0x26b60f + "@s.whatsapp.net");
  }
  return [..._0xd486e0];
}
function _checkGroupUserFilter(_0x73ab30, _0x39bf02, _0x32f543) {
  const _0x5eb719 = (_0x73ab30.groupUserFilters || ({}))[_0x39bf02];
  if (!_0x5eb719 || !_0x5eb719.users || _0x5eb719.users.length === 0) return true;
  const _0x3d8db2 = _0x32f543.split('@')[0].split(':')[0].replace(/\D/g, ''), _0x5879ef = _0x5eb719.users.some(_0x40cae7 => {
    const _0x3c406e = _0x40cae7.split('@')[0].split(':')[0].replace(/\D/g, '');
    return _0x3c406e === _0x3d8db2;
  });
  if (_0x5eb719.mode === "allow") return _0x5879ef;
  if (_0x5eb719.mode === "block") return !_0x5879ef;
  return true;
}
function getBotId() {
  const _0x4eb46c = _0x4b8821.getConfigBotId ? _0x4b8821.getConfigBotId() : "default";
  if (_0x4eb46c && _0x4eb46c !== "default") {
    const _0x285111 = _0x15eb9f.join(DATA_DIR, "chatbot_config_" + _0x4eb46c + ".json");
    if (_0x5f1a2a.existsSync(_0x285111)) return _0x4eb46c;
  }
  const _0xcca677 = (global.OWNER_CLEAN_NUMBER || global.OWNER_NUMBER || '').replace(/[^0-9]/g, '');
  if (_0xcca677) {
    const _0x4afac4 = _0x15eb9f.join(DATA_DIR, "chatbot_config_" + _0xcca677 + ".json");
    if (_0x5f1a2a.existsSync(_0x4afac4)) return _0xcca677;
  }
  try {
    const _0x2d07d6 = _0x5f1a2a.readdirSync(DATA_DIR).filter(_0x1fdf2f => _0x1fdf2f.startsWith("chatbot_config_") && _0x1fdf2f.endsWith(".json"));
    if (_0x2d07d6.length > 0) {
      const _0x4b12e8 = _0x2d07d6[0].replace("chatbot_config_", '').replace(".json", '');
      return _0x4b12e8;
    }
  } catch {}
  return _0xcca677 || _0x4eb46c || "default";
}
function getConfigFile() {
  const _0x3abdac = getBotId();
  return _0x15eb9f.join(DATA_DIR, "chatbot_config_" + _0x3abdac + '.json');
}
function getConversationsDir() {
  const _0x4c4a26 = getBotId();
  return _0x15eb9f.join(DATA_DIR, 'conversations', _0x4c4a26);
}
const pendingActions = new Map(), PENDING_TIMEOUT = 120000, MEDIA_REACTIONS = {
  imagine: MEDIA.DESIGN,
  play: MEDIA.MUSIC,
  video: MEDIA.VIDEO,
  song: MEDIA.MUSIC_NOTES
}, MEDIA_PROMPTS = {
  image: {
    ask: "Sure! Describe the image you'd like me to generate " + MEDIA.DESIGN,
    confirm: 'Got\x20it!\x20Let\x20me\x20create\x20that\x20for\x20you...\x20' + MEDIA.DESIGN
  },
  playAudio: {
    ask: "Of course! What song or music would you like me to play? " + MEDIA.MUSIC,
    confirm: 'Great\x20choice!\x20Let\x20me\x20find\x20that\x20for\x20you...\x20' + MEDIA.MUSIC
  },
  playVideo: {
    ask: 'Sure\x20thing!\x20What\x20video\x20would\x20you\x20like\x20me\x20to\x20find?\x20' + MEDIA.VIDEO,
    confirm: "On it! Finding that video for you... " + MEDIA.VIDEO
  },
  song: {
    ask: "Sure! Which song would you like me to download? " + MEDIA.MUSIC_NOTES,
    confirm: "Alright! Downloading that for you... " + MEDIA.MUSIC_NOTES
  }
}, INTENT_PATTERNS = {
  image: {
    vaguePatterns: [/^(?:can you |could you |wolf,?\s+)?(?:generate|create|make|draw|design|paint|sketch)\s+(?:an?\s+)?(?:image|picture|photo|art|artwork|illustration|pic|img|drawing|painting)\s*\??$/i, /^(?:can you |could you |wolf,?\s+)?(?:generate|create|make|draw|design)\s+(?:for me|something|an image|a picture)\s*\??$/i, /^(?:i want|i need|i'd like)\s+(?:an?\s+)?(?:image|picture|photo|art|drawing)\s*\.?$/i, /^(?:generate|create|make|draw)\s+(?:an?\s+)?(?:image|picture|photo)\s*\??$/i],
    specificPatterns: [/^(?:generate|create|make|draw|design|paint|sketch)\s+(?:an?\s+)?(?:image|picture|photo|art|artwork|illustration|pic|img|drawing|painting)\s+(?:of|about|for|with|showing)\s+.{3,}/i, /^(?:generate|create|make|draw|design|paint|sketch)\s+(?:me\s+)?(?:an?\s+)?.{5,}/i, /(?:image|picture|photo|art|drawing|painting)\s+(?:of|about|for|with)\s+.{3,}/i, /^imagine\s+.{3,}/i, /^(?:can you |please |wolf,?\s+)?(?:generate|create|make|draw|design)\s+(?:an?\s+)?(?:image|picture|photo)\s+(?:of|about|for|with|showing)\s+.{3,}/i],
    extractQuery: _0x19e4c8 => {
      let _0x1d8239 = _0x19e4c8;
      return (_0x1d8239 = _0x1d8239.replace(/^(?:can you |could you |please |wolf,?\s+)?(?:generate|create|make|draw|design|paint|sketch)\s+(?:me\s+)?(?:an?\s+)?(?:image|picture|photo|art|artwork|illustration|pic|img|drawing|painting)\s*(?:of|about|for|with|showing)?\s*/i, ''), _0x1d8239 = _0x1d8239.replace(/^imagine\s+/i, ''), _0x1d8239 = _0x1d8239.replace(/^(?:can you |could you |please |wolf,?\s+)?(?:generate|create|make|draw|design|paint|sketch)\s+(?:me\s+)?(?:an?\s+)?/i, ''), _0x1d8239.trim());
    },
    command: "imagine"
  },
  playAudio: {
    vaguePatterns: [/^(?:can you |could you |wolf,?\s+)?(?:play|sing|find)\s+(?:a\s+)?(?:song|music|something|audio)\s*\??$/i, /^(?:play|sing)\s+(?:me\s+)?(?:something|a song|music)\s*\??$/i, /^(?:i want to (?:hear|listen to)|let me hear)\s+(?:a\s+)?(?:song|music|something)\s*\??$/i],
    specificPatterns: [/^(?:play|sing|find me|put on|listen to)\s+(?:the\s+)?(?:song\s+)?(?!(?:a\s+)?(?:song|music|something|audio)\s*\??$).{3,}/i, /^(?:can you |please |wolf,?\s+)?(?:play|sing|find me|put on)\s+(?!(?:a\s+)?(?:song|music|something)\s*\??$).{3,}/i, /^(?:play|download)\s+(?:me\s+)?(?:the\s+)?(?:song|music|audio|mp3)\s+.{3,}/i, /^(?:i want to (?:hear|listen)|let me hear|play me)\s+.{3,}/i],
    extractQuery: _0x1f580c => {
      let _0x32333d = _0x1f580c;
      return (_0x32333d = _0x32333d.replace(/^(?:can you |could you |please |wolf,?\s+)?(?:play|sing|find me|put on|listen to|download)\s+(?:me\s+)?(?:the\s+)?(?:song|music|track|audio|mp3)?\s*/i, ''), _0x32333d = _0x32333d.replace(/^(?:i want to (?:hear|listen)|let me hear|play me)\s+/i, ''), _0x32333d = _0x32333d.replace(/\s+(?:on youtube|from youtube|for me|please)$/i, ''), _0x32333d.trim());
    },
    command: "play"
  },
  playVideo: {
    vaguePatterns: [/^(?:can you |could you |(?:vipbot|vip|wolf),?\s+)?(?:play|download|get|find|show)\s+(?:a\s+)?(?:video|vid|clip)\s*\??$/i, /^(?:i want to (?:watch|see)|let me (?:watch|see)|show me)\s+(?:a\s+)?(?:video|something)\s*\??$/i],
    specificPatterns: [/^(?:play|download|get|find|show)\s+(?:the\s+)?(?:video|vid|clip|movie)\s+(?:of|about|for)?\s*.{3,}/i, /^(?:play|download|get|find|show)\s+(?:me\s+)?(?:the\s+)?video\s+.{3,}/i, /^(?:can you |please |(?:vipbot|vip|wolf),?\s+)?(?:play|download|get|show)\s+(?:the\s+)?(?:video|vid)\s+.{3,}/i, /^(?:i want to (?:watch|see)|let me (?:watch|see)|show me)\s+.{3,}/i, /^(?:play|download)\s+.{3,}\s+video$/i],
    extractQuery: _0x3e21f7 => {
      let _0x258143 = _0x3e21f7;
      return (_0x258143 = _0x258143.replace(/^(?:can you |could you |please |(?:vipbot|vip|wolf),?\s+)?(?:play|download|get|find|show)\s+(?:me\s+)?(?:the\s+)?(?:video|vid|clip|movie)\s*(?:of|about|for)?\s*/i, ''), _0x258143 = _0x258143.replace(/^(?:i want to (?:watch|see)|let me (?:watch|see)|show me)\s+/i, ''), _0x258143 = _0x258143.replace(/\s+(?:video|vid|clip)$/i, ''), _0x258143 = _0x258143.replace(/\s+(?:on youtube|from youtube|for me|please)$/i, ''), _0x258143.trim());
    },
    command: 'video'
  },
  song: {
    vaguePatterns: [/^(?:can you |could you |(?:vipbot|vip|wolf),?\s+)?(?:download|get|send|give)\s+(?:me\s+)?(?:a\s+)?(?:song|music|audio)\s*\??$/i],
    specificPatterns: [/^(?:download|get)\s+(?:the\s+)?(?:song|music|audio|mp3)\s+.{3,}/i, /^(?:send|give)\s+(?:me\s+)?(?:the\s+)?(?:song|music|audio)\s+.{3,}/i],
    extractQuery: _0x46b844 => {
      let _0x85045e = _0x46b844;
      return (_0x85045e = _0x85045e.replace(/^(?:download|get|send|give)\s+(?:me\s+)?(?:the\s+)?(?:song|music|audio|mp3)\s*/i, ''), _0x85045e = _0x85045e.replace(/\s+(?:for me|please)$/i, ''), _0x85045e.trim());
    },
    command: "song"
  }
};
function detectIntent(_0x23d009) {
  const _0x30b8d0 = _0x23d009.trim();
  if (_0x30b8d0.length < 4) return null;
  for (const [_0xb4863d, _0x52aae7] of Object.entries(INTENT_PATTERNS)) {
    if (_0xb4863d === "playAudio") {
      const _0x257123 = INTENT_PATTERNS.playVideo.vaguePatterns.some(_0x26a295 => _0x26a295.test(_0x30b8d0)) || INTENT_PATTERNS.playVideo.specificPatterns.some(_0x4d0930 => _0x4d0930.test(_0x30b8d0));
      if (_0x257123) continue;
    }
    for (const _0x3d1cf7 of _0x52aae7.vaguePatterns) {
      if (_0x3d1cf7.test(_0x30b8d0)) return {
        type: _0xb4863d,
        command: _0x52aae7.command,
        query: '',
        vague: true
      };
    }
    for (const _0x405f92 of _0x52aae7.specificPatterns) {
      if (_0x405f92.test(_0x30b8d0)) {
        const _0xfa1a53 = _0x52aae7.extractQuery(_0x30b8d0);
        if (_0xfa1a53 && _0xfa1a53.length >= 2) return {
          type: _0xb4863d,
          command: _0x52aae7.command,
          query: _0xfa1a53,
          vague: false
        };
      }
    }
  }
  return null;
}
function pendingKey(_0x4b926c, _0x575b63) {
  return _0x4b926c + '::' + _0x575b63;
}
function setPendingAction(_0x37e4b4, _0x24849c, _0x336b2e, _0x31a3d3) {
  const _0x33a495 = pendingKey(_0x37e4b4, _0x24849c);
  (pendingActions.set(_0x33a495, {
    type: _0x336b2e,
    command: _0x31a3d3,
    timestamp: Date.now()
  }), setTimeout(() => {
    const _0x4556da = pendingActions.get(_0x33a495);
    _0x4556da && Date.now() - _0x4556da.timestamp >= PENDING_TIMEOUT && pendingActions.delete(_0x33a495);
  }, PENDING_TIMEOUT));
}
function getPendingAction(_0x1cf0fa, _0x1ed804) {
  const _0x57a6f8 = pendingKey(_0x1cf0fa, _0x1ed804), _0x1ac046 = pendingActions.get(_0x57a6f8);
  if (!_0x1ac046) return null;
  if (Date.now() - _0x1ac046.timestamp > PENDING_TIMEOUT) return (pendingActions.delete(_0x57a6f8), null);
  return _0x1ac046;
}
function clearPendingAction(_0x187a82, _0x414256) {
  pendingActions.delete(pendingKey(_0x187a82, _0x414256));
}
const CANCEL_WORDS = ["cancel", "nevermind", 'never\x20mind', "nvm", 'stop', "nah", 'no', 'forget\x20it', "skip"];
function ensureDataDirs() {
  if (!_0x5f1a2a.existsSync(DATA_DIR)) _0x5f1a2a.mkdirSync(DATA_DIR, {
    recursive: true
  });
  const _0x3a738e = getConversationsDir();
  if (!_0x5f1a2a.existsSync(_0x3a738e)) _0x5f1a2a.mkdirSync(_0x3a738e, {
    recursive: true
  });
}
function loadConfig() {
  ensureDataDirs();
  const _0x536693 = {
    mode: 'off',
    preferredModel: 'gpt',
    excludedGroups: [],
    allowedDMs: [],
    stats: {
      totalQueries: 0,
      modelsUsed: {}
    }
  }, _0x116d88 = getConfigFile();
  try {
    if (_0x5f1a2a.existsSync(_0x116d88)) return JSON.parse(_0x5f1a2a.readFileSync(_0x116d88, 'utf8'));
  } catch {}
  if (_0x4b8821.isAvailable()) {
    const _0x529262 = getBotId();
    _0x4b8821.getAll("chatbot_config", {
      key: "main",
      bot_id: _0x529262
    }).then(_0x5d9599 => {
      const _0x30abe5 = _0x5d9599?.[0];
      if (_0x30abe5 && _0x30abe5.config) try {
        _0x5f1a2a.writeFileSync(_0x116d88, JSON.stringify(_0x30abe5.config, null, 2));
      } catch {}
    }).catch(() => {});
  }
  return _0x536693;
}
function saveConfig(_0x320db1) {
  ensureDataDirs();
  const _0x2f0496 = getConfigFile();
  _0x5f1a2a.writeFileSync(_0x2f0496, JSON.stringify(_0x320db1, null, 2));
  const _0x1e16b6 = getBotId();
  _0x4b8821.upsert("chatbot_config", {
    key: 'main',
    config: _0x320db1,
    bot_id: _0x1e16b6,
    updated_at: new Date().toISOString()
  }, "key,bot_id").catch(() => {});
}
function getConversationFile(_0x43e914) {
  const _0xbea8a1 = getConversationsDir();
  return _0x15eb9f.join(_0xbea8a1, _0x43e914.replace(/[^a-zA-Z0-9]/g, '_') + ".json");
}
function loadConversation(_0xd679e6) {
  ensureDataDirs();
  const _0x190221 = getConversationFile(_0xd679e6);
  try {
    if (_0x5f1a2a.existsSync(_0x190221)) {
      const _0x559e74 = JSON.parse(_0x5f1a2a.readFileSync(_0x190221, "utf8")), _0xfc21d5 = 24 * 60 * 60 * 1000;
      if (Date.now() - (_0x559e74.lastActive || 0) > _0xfc21d5) return {
        messages: [],
        lastActive: Date.now(),
        model: null
      };
      return _0x559e74;
    }
  } catch {}
  if (_0x4b8821.isAvailable()) {
    const _0x439bb7 = _0xd679e6.replace(/[^a-zA-Z0-9]/g, '_'), _0x13a295 = getBotId();
    _0x4b8821.getAll("chatbot_conversations", {
      user_id: _0x439bb7,
      bot_id: _0x13a295
    }).then(_0x498096 => {
      const _0x45971e = _0x498096?.[0];
      if (_0x45971e && _0x45971e.conversation) try {
        (ensureDataDirs(), _0x5f1a2a.writeFileSync(_0x190221, JSON.stringify(_0x45971e.conversation, null, 2)));
      } catch {}
    }).catch(() => {});
  }
  return {
    messages: [],
    lastActive: Date.now(),
    model: null
  };
}
function saveConversation(_0x577124, _0xe69a3f) {
  ensureDataDirs();
  const _0x2cad04 = getConversationFile(_0x577124);
  _0xe69a3f.lastActive = Date.now();
  _0xe69a3f.messages.length > 40 && (_0xe69a3f.messages = _0xe69a3f.messages.slice(-40));
  _0x5f1a2a.writeFileSync(_0x2cad04, JSON.stringify(_0xe69a3f, null, 2));
  const _0x514888 = getBotId();
  _0x4b8821.upsert("chatbot_conversations", {
    user_id: _0x577124.replace(/[^a-zA-Z0-9]/g, '_'),
    conversation: _0xe69a3f,
    bot_id: _0x514888,
    last_updated: new Date().toISOString()
  }, "user_id,bot_id").catch(() => {});
}
function clearConversation(_0x368cc8) {
  const _0x5eb776 = getConversationFile(_0x368cc8);
  if (_0x5f1a2a.existsSync(_0x5eb776)) _0x5f1a2a.unlinkSync(_0x5eb776);
  const _0x2848b9 = getBotId(), _0x2fb75b = _0x368cc8.replace(/[^a-zA-Z0-9]/g, '_');
  _0x4b8821.removeWhere("chatbot_conversations", {
    user_id: _0x2fb75b,
    bot_id: _0x2848b9
  }).catch(() => {});
}
function buildContextPrompt(_0xd6f48d, _0x2518d7, _0x316996 = "VIPBOT", _0x31e081 = null, _0x31716f = "Lupin Stanley") {
  const _0x1bef44 = _0x316996, _0x2b2322 = _0x31716f, _0x5268df = _0x31e081 ? buildProfileContext(_0x31e081) : '';
  let _0x862bb = "You are " + _0x1bef44 + ',\x20an\x20elite\x20AI\x20assistant\x20created\x20by\x20' + _0x2b2322 + ". Your name is " + _0x1bef44 + " and you must always identify yourself as " + _0x1bef44 + '\x20when\x20asked\x20who\x20you\x20are.\x20You\x20are\x20intelligent,\x20witty,\x20warm,\x20and\x20helpful.\x20You\x20have\x20a\x20distinct\x20personality\x20—\x20you\x27re\x20friendly\x20and\x20sometimes\x20a\x20bit\x20humorous\x20without\x20being\x20annoying.\x20You\x20remember\x20the\x20conversation\x20context\x20and\x20respond\x20naturally\x20like\x20a\x20real\x20chat\x20partner.\x20Keep\x20responses\x20SHORT\x20and\x20CONCISE\x20—\x20aim\x20for\x202-3\x20sentences\x20maximum\x20unless\x20the\x20question\x20genuinely\x20requires\x20more\x20detail.\x20Occasionally\x20ask\x20a\x20follow-up\x20question\x20to\x20keep\x20the\x20conversation\x20flowing.\x0a\x0aCRITICAL\x20IDENTITY\x20RULES:\x0a-\x20Your\x20name\x20is\x20' + _0x1bef44 + ". Always refer to yourself as " + _0x1bef44 + ".\n- You were created by " + _0x2b2322 + ". Never say you were made by OpenAI, Google, Anthropic, Microsoft, Meta, xAI, or any other company.\n- Never reveal or mention any underlying AI model (GPT, Claude, Copilot, Grok, Bard, Blackbox, Perplexity, LLaMA, Gemini, NVIDIA, etc).\n- If asked what you are, say: \"I'm " + _0x1bef44 + ", an AI assistant by " + _0x2b2322 + ".\"\n- Never say \"As an AI language model\" - instead say \"As " + _0x1bef44 + "\" if needed.\n- You are not ChatGPT, not Claude, not Bard, not Copilot. You are " + _0x1bef44 + '.\x0a\x0a';
  if (_0x5268df) _0x862bb += _0x5268df + '\x0a';
  if (_0xd6f48d.messages.length > 0) {
    _0x862bb += "Previous conversation:\n";
    const _0x14c15a = _0xd6f48d.messages.slice(-10);
    for (const _0x58a088 of _0x14c15a) {
      _0x862bb += (_0x58a088.role === "user" ? "Human" : _0x1bef44) + ':\x20' + _0x58a088.content + '\x0a';
    }
    _0x862bb += '\x0a';
  }
  return (_0x862bb += 'Human:\x20' + _0x2518d7 + '\x0a' + _0x1bef44 + ':', _0x862bb);
}
async function queryAI(_0x20b699, _0x5c2f3b, _0x894883 = 35000, _0x569a15 = null) {
  if (!AI_MODELS[_0x20b699]) return null;
  const _0xfe9a51 = _0x20b699 === 'wormgpt' && _0x569a15 ? _0x569a15 : _0x5c2f3b, _0x1abf41 = getAIQuerySources(_0xfe9a51, _0x20b699);
  for (const {url: _0x115952, params: _0x93d57} of _0x1abf41) {
    try {
      const _0x10f114 = await _0x50ea77.get(_0x115952, {
        params: _0x93d57,
        timeout: _0x894883,
        headers: {
          'User-Agent': 'VIPBOT-Chatbot/2.0',
          Accept: 'application/json,\x20text/plain',
          'Cache-Control': "no-cache"
        },
        validateStatus: _0x493818 => _0x493818 >= 200 && _0x493818 < 500
      });
      if (!_0x10f114.data) continue;
      let _0xdf4e48 = _0x10f114.data;
      if (typeof _0xdf4e48 === "string") try {
        _0xdf4e48 = JSON.parse(_0xdf4e48);
      } catch {}
      const _0x3190e3 = extractXWolfResponse(_0xdf4e48);
      if (!_0x3190e3 || _0x3190e3.length < 3) continue;
      const _0x45af33 = _0x3190e3.toLowerCase();
      if (_0x45af33.startsWith('<!') || _0x45af33.startsWith("<html") || _0x45af33.includes("<!doctype")) continue;
      if (_0x45af33.startsWith("error") || _0x45af33.includes("rate limit") || _0x45af33.includes("invalid key") || _0x45af33.includes("unauthorized")) continue;
      return _0x3190e3.trim();
    } catch {}
  }
  return null;
}
async function queryVision(_0x293da0, _0x1c3ccf) {
  try {
    const _0x2d7702 = await _0x18ce90(_0x293da0 || "Describe this image in detail.", _0x1c3ccf, {
      model: 'nvidia/nemotron-nano-12b-v2-vl',
      maxTokens: 1024,
      timeoutMs: 90000
    });
    return _0x2d7702 ? _0x2d7702.replace(/<think>[\s\S]*?<\/think>/gi, '').trim() : null;
  } catch (_0x55869b) {
    return (console.error("[Chatbot/Vision]", _0x55869b.message), null);
  }
}
async function generateImage(_0x191de4) {
  try {
    const _0x2c6c51 = await _0x98f7cf(_0x191de4, {
      model: "black-forest-labs/flux.1-dev",
      width: 1024,
      height: 1024,
      timeoutMs: 120000
    });
    return Buffer.isBuffer(_0x2c6c51) && _0x2c6c51.length > 0 ? _0x2c6c51 : null;
  } catch (_0x2fe4fd) {
    return (console.error("[Chatbot/ImageGen]", _0x2fe4fd.message), null);
  }
}
async function getAIResponse(_0x52b4ac, _0x10c162, _0x3cc21e = "gpt", _0x31505d = "VIPBOT", _0x488749 = null, _0x3daf7e = 'Lupin Stanley') {
  const _0x98a703 = buildContextPrompt(_0x10c162, _0x52b4ac, _0x31505d, _0x488749, _0x3daf7e);
  let _0x57e503 = await queryAI(_0x3cc21e, _0x98a703, 35000, _0x52b4ac);
  if (_0x57e503) return {
    response: _0x57e503,
    model: _0x3cc21e
  };
  for (const _0x135f8d of MODEL_PRIORITY) {
    if (_0x135f8d === _0x3cc21e) continue;
    _0x57e503 = await queryAI(_0x135f8d, _0x98a703, 35000, _0x52b4ac);
    if (_0x57e503) return {
      response: _0x57e503,
      model: _0x135f8d
    };
  }
  _0x57e503 = await queryAI("gpt", _0x52b4ac);
  if (_0x57e503) return {
    response: _0x57e503,
    model: 'gpt'
  };
  return null;
}
function cleanAIResponse(_0x56fef6, _0x52ad5e = "VIPBOT", _0x14987b = "Lupin Stanley") {
  if (!_0x56fef6) return '';
  const _0x55cc7f = _0x52ad5e, _0x10447e = _0x55cc7f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  (_0x56fef6 = _0x56fef6.replace(/\[\d+\]/g, ''), _0x56fef6 = _0x56fef6.replace(/Human:.*$/gm, ''), _0x56fef6 = _0x56fef6.replace(new RegExp('^' + _0x10447e + ":\\s*", "gim"), ''), _0x56fef6 = _0x56fef6.replace(/^(Assistant|AI|Bot|Claude|GPT|Grok|Copilot|Bard):\s*/gim, ''), _0x56fef6 = _0x56fef6.replace(/\b(ChatGPT|GPT-?[34o5]?|GPT|OpenAI)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\b(Claude|Anthropic)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\b(Copilot|Microsoft Copilot)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\b(Google Bard|Bard|Gemini)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\b(Grok|xAI)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\b(Blackbox|Blackbox AI)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\b(Perplexity|Perplexity AI)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\b(LLaMA|Meta AI|Mistral)\b/gi, _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\bI'?m an AI (language )?model\b/gi, "I'm " + _0x55cc7f), _0x56fef6 = _0x56fef6.replace(/\bAs an AI (language )?model\b/gi, 'As\x20' + _0x55cc7f));
  const _0x5c28b6 = _0x14987b;
  return (_0x56fef6 = _0x56fef6.replace(/\bmade by (OpenAI|Google|Anthropic|Microsoft|Meta|xAI)\b/gi, "made by " + _0x5c28b6), _0x56fef6 = _0x56fef6.replace(/\bcreated by (OpenAI|Google|Anthropic|Microsoft|Meta|xAI)\b/gi, 'created\x20by\x20' + _0x5c28b6), _0x56fef6 = _0x56fef6.replace(/\bdeveloped by (OpenAI|Google|Anthropic|Microsoft|Meta|xAI)\b/gi, "developed by " + _0x5c28b6), _0x56fef6 = _0x56fef6.replace(/\bbuilt by (OpenAI|Google|Anthropic|Microsoft|Meta|xAI)\b/gi, "built by " + _0x5c28b6), _0x56fef6 = _0x56fef6.replace(/\btrained by (OpenAI|Google|Anthropic|Microsoft|Meta|xAI)\b/gi, "trained by " + _0x5c28b6), _0x56fef6 = _0x56fef6.replace(new RegExp('(' + _0x10447e + '[\x5cs,]*){2,}', 'g'), _0x55cc7f + '\x20'), _0x56fef6 = _0x56fef6.replace(/\n\s*\n\s*\n/g, '\x0a\x0a'), _0x56fef6.trim());
}
function trimResponse(_0x57e26c, _0x3a602f = 700) {
  if (!_0x57e26c || _0x57e26c.length <= _0x3a602f) return _0x57e26c;
  const _0x5c3391 = _0x57e26c.slice(0, _0x3a602f + 100), _0x13888f = /[.!?](?:\s|$)/g;
  let _0x45ccc7 = -1, _0x104ae6;
  while ((_0x104ae6 = _0x13888f.exec(_0x5c3391)) !== null) {
    if (_0x104ae6.index + 1 <= _0x3a602f) _0x45ccc7 = _0x104ae6.index + 1;
  }
  if (_0x45ccc7 > 50) return _0x57e26c.slice(0, _0x45ccc7).trim() + " _..._";
  const _0xe65ffe = _0x57e26c.slice(0, _0x3a602f), _0x13af7a = _0xe65ffe.lastIndexOf('\x20');
  return (_0x13af7a > 50 ? _0xe65ffe.slice(0, _0x13af7a) : _0xe65ffe).trim() + '\x20_..._';
}
export function getChatbotConfig() {
  return loadConfig();
}
export function isChatbotActiveForChat(_0x3e5f4c) {
  const _0x46ce33 = loadConfig();
  if (_0x46ce33.mode === "off") return false;
  const _0x4a2ed6 = _0x3e5f4c.endsWith("@g.us"), _0x36e95c = _0x3e5f4c.endsWith("@s.whatsapp.net") || _0x3e5f4c.endsWith("@lid"), _0x2706cc = _0x46ce33.excludedGroups || [], _0x31f831 = _0x46ce33.allowedDMs || [];
  if (_0x4a2ed6) {
    if (_0x46ce33.mode === "groups" || _0x46ce33.mode === 'on' || _0x46ce33.mode === "both") return !_0x2706cc.includes(_0x3e5f4c);
    return false;
  }
  if (_0x36e95c && _0x31f831.length > 0) {
    const _0x4ca6f6 = _0x3e5f4c.split('@')[0].split(':')[0];
    let _0xafaea2 = null;
    if (_0x3e5f4c.endsWith("@lid")) {
      const _0x324528 = globalThis.resolvePhoneFromLid?.(_0x3e5f4c), _0x12c42f = globalThis.lidPhoneCache?.get(_0x4ca6f6) || globalThis.lidPhoneCache?.get(_0x3e5f4c), _0x19b560 = getPhoneFromLid(_0x4ca6f6) || getPhoneFromLid(_0x3e5f4c), _0x246ecc = _0x324528 || _0x12c42f || _0x19b560;
      if (_0x246ecc) _0xafaea2 = String(_0x246ecc).replace(/[^0-9]/g, '');
    }
    if (_0xafaea2 || !_0x3e5f4c.endsWith("@lid")) return _0x31f831.some(_0x2981c9 => {
      const _0x4f7e90 = _0x2981c9.split('@')[0].split(':')[0];
      if (_0x4f7e90 === _0x4ca6f6) return true;
      if (_0xafaea2 && _0x4f7e90 === _0xafaea2) return true;
      return false;
    });
  }
  if (_0x46ce33.mode === 'on' || _0x46ce33.mode === "both") return true;
  if (_0x46ce33.mode === "groups" && _0x4a2ed6) return true;
  if (_0x46ce33.mode === 'dms' && _0x36e95c) return true;
  return false;
}
function createSilentSock(_0x5a2a53, _0x5cfc4f, _0x58855a) {
  const _0x194f86 = {
    get(_0x476238, _0x24108b) {
      if (_0x24108b === "sendMessage") return async (_0x19b18d, _0x4f6f02, _0x22b6d9 = {}) => {
        if (_0x4f6f02.react) return _0x476238.sendMessage(_0x19b18d, _0x4f6f02, _0x22b6d9);
        if (_0x4f6f02.image || _0x4f6f02.video || _0x4f6f02.audio || _0x4f6f02.document || _0x4f6f02.sticker) {
          if (_0x4f6f02.caption) _0x4f6f02.caption = BRAND.WOLF + " Here is your result!\n\n" + _0x4f6f02.caption;
          return _0x476238.sendMessage(_0x19b18d, _0x4f6f02, _0x22b6d9);
        }
        if (_0x4f6f02.edit) return {
          key: {
            id: "suppressed"
          }
        };
        if (_0x4f6f02.text && !_0x4f6f02.image && !_0x4f6f02.video && !_0x4f6f02.audio) return {
          key: {
            id: "suppressed"
          }
        };
        return _0x476238.sendMessage(_0x19b18d, _0x4f6f02, _0x22b6d9);
      };
      const _0x534e93 = _0x476238[_0x24108b];
      if (typeof _0x534e93 === 'function') return _0x534e93.bind(_0x476238);
      return _0x534e93;
    }
  };
  return new Proxy(_0x5a2a53, _0x194f86);
}
async function executeMediaCommand(_0x4272b5, _0x119a2b, _0x232234, _0x2b4005, _0x12e89b) {
  if (!_0x12e89b || !_0x12e89b.has(_0x232234)) return false;
  const _0x404b9a = _0x12e89b.get(_0x232234);
  if (!_0x404b9a || !_0x404b9a.execute) return false;
  try {
    const _0x3c29b3 = _0x119a2b.key.remoteJid, _0x577496 = MEDIA_REACTIONS[_0x232234] || BRAND.LIGHTNING;
    await _0x4272b5.sendMessage(_0x3c29b3, {
      react: {
        text: _0x577496,
        key: _0x119a2b.key
      }
    });
    const _0x27fd7c = '.', _0x3ad309 = _0x2b4005.split(/\s+/).filter(Boolean), _0x37eb74 = {
      ..._0x119a2b,
      message: {
        conversation: '' + _0x27fd7c + _0x232234 + '\x20' + _0x2b4005,
        extendedTextMessage: {
          text: '' + _0x27fd7c + _0x232234 + '\x20' + _0x2b4005
        }
      }
    }, _0x150d70 = createSilentSock(_0x4272b5, _0x3c29b3, _0x119a2b);
    return (await _0x404b9a.execute(_0x150d70, _0x37eb74, _0x3ad309, _0x27fd7c), await _0x4272b5.sendMessage(_0x3c29b3, {
      react: {
        text: STATUS.SUCCESS,
        key: _0x119a2b.key
      }
    }), true);
  } catch (_0x39a62f) {
    return (console.error("[VIPBOT] Media command error (" + _0x232234 + '):', _0x39a62f.message), await _0x4272b5.sendMessage(_0x119a2b.key.remoteJid, {
      react: {
        text: STATUS.ERROR,
        key: _0x119a2b.key
      }
    }), false);
  }
}
function trackMediaAction(_0xa3d7d2, _0x5342ac) {
  (_0x5342ac.stats.totalQueries = (_0x5342ac.stats.totalQueries || 0) + 1, _0x5342ac.stats.mediaActions = _0x5342ac.stats.mediaActions || ({}), _0x5342ac.stats.mediaActions[_0xa3d7d2] = (_0x5342ac.stats.mediaActions[_0xa3d7d2] || 0) + 1, saveConfig(_0x5342ac));
}
export async function handleChatbotMessage(_0x1b402a, _0x29922a, _0x16d126) {
  const _0x23b260 = _0x29922a.key.remoteJid, _0x961d1f = _0x29922a.key.participant || _0x23b260, _0x590c16 = jidNormalizedUser(_0x961d1f);
  if (_0x23b260.endsWith("@g.us")) {
    const _0xfaf600 = loadConfig();
    let _0x3afeee = _0x590c16;
    if (_0x590c16.endsWith('@lid')) try {
      _0x3afeee = await resolveJid(_0x1b402a, _0x590c16, _0x23b260);
    } catch {}
    if (!_checkGroupUserFilter(_0xfaf600, _0x23b260, _0x3afeee)) return false;
  }
  const _0x2ff39a = normalizeMessageContent(_0x29922a.message), _0x491978 = _0x2ff39a?.conversation || _0x2ff39a?.extendedTextMessage?.text || _0x2ff39a?.imageMessage?.caption || _0x2ff39a?.videoMessage?.caption || '', _0x1969f7 = !!(_0x29922a.message?.imageMessage || _0x29922a.message?.viewOnceMessageV2?.message?.imageMessage);
  if (_0x1969f7) {
    const _0x232f3f = loadConfig(), _0x431a3b = _0x232f3f.chatbotName || "VIPBOT", _0x2071ea = _0x232f3f.techName || "Lupin Stanley", _0x3c5cfd = _0x491978.trim() || "What is in this image? Describe it in detail.", _0x3bba0b = getBotId();
    let _0x15ae0f = loadProfile(_0x3bba0b, _0x590c16);
    try {
      (await _0x1b402a.sendPresenceUpdate("composing", _0x23b260), await _0x1b402a.sendMessage(_0x23b260, {
        react: {
          text: UI.EYES,
          key: _0x29922a.key
        }
      }));
      const _0x5a8f2d = await downloadMediaMessage(_0x29922a, "buffer", {});
      let _0x4e026b = null;
      _0x5a8f2d && _0x5a8f2d.length > 0 && (_0x4e026b = await queryVision(_0x3c5cfd, _0x5a8f2d));
      if (_0x4e026b) {
        const _0x495357 = cleanAIResponse(_0x4e026b, _0x431a3b, _0x2071ea), _0x5a7813 = trimResponse(_0x495357, 1000), _0x30cc9d = getPersonalizedGreeting(_0x15ae0f), _0x28bb7a = _0x30cc9d ? _0x30cc9d + '\x20' : '', _0x35de50 = loadConversation(_0x590c16);
        (_0x35de50.messages.push({
          role: "user",
          content: "[Image sent] " + _0x3c5cfd
        }), _0x35de50.messages.push({
          role: "assistant",
          content: _0x495357
        }), saveConversation(_0x590c16, _0x35de50), _0x15ae0f = learnFromMessage(_0x3c5cfd, _0x15ae0f), saveProfile(_0x3bba0b, _0x590c16, _0x15ae0f), _0x232f3f.stats.totalQueries = (_0x232f3f.stats.totalQueries || 0) + 1, saveConfig(_0x232f3f), await _0x1b402a.sendMessage(_0x23b260, {
          react: {
            text: STATUS.SUCCESS,
            key: _0x29922a.key
          }
        }), await _0x1b402a.sendMessage(_0x23b260, {
          text: BRAND.WOLF + '\x20' + _0x28bb7a + _0x5a7813
        }, {
          quoted: _0x29922a
        }));
      } else await _0x1b402a.sendMessage(_0x23b260, {
        text: BRAND.WOLF + " _I received your image but couldn't analyse it right now. Try again or add a caption describing what you'd like to know!_"
      }, {
        quoted: _0x29922a
      });
    } catch (_0x4bf9ac) {
      (console.error('[' + _0x431a3b + "] Vision error:", _0x4bf9ac.message), await _0x1b402a.sendMessage(_0x23b260, {
        text: BRAND.WOLF + '\x20_Image\x20analysis\x20failed.\x20Please\x20try\x20again._'
      }, {
        quoted: _0x29922a
      }));
    }
    return true;
  }
  if (!_0x491978 || _0x491978.trim().length < 2) return false;
  const _0x12e598 = _0x491978.trim();
  if (_0x12e598.startsWith('.') || _0x12e598.startsWith('/') || _0x12e598.startsWith('!')) return (clearPendingAction(_0x590c16, _0x23b260), false);
  const _0x3ced8a = getPendingAction(_0x590c16, _0x23b260);
  if (_0x3ced8a && _0x16d126) {
    clearPendingAction(_0x590c16, _0x23b260);
    if (CANCEL_WORDS.includes(_0x12e598.toLowerCase()) || _0x12e598.length < 3) return (await _0x1b402a.sendMessage(_0x23b260, {
      text: BRAND.WOLF + '\x20Alright,\x20cancelled!'
    }, {
      quoted: _0x29922a
    }), true);
    const _0x5b0ef9 = await executeMediaCommand(_0x1b402a, _0x29922a, _0x3ced8a.command, _0x12e598, _0x16d126);
    if (_0x5b0ef9) {
      const _0x463c6b = loadConfig();
      trackMediaAction(_0x3ced8a.type, _0x463c6b);
      const _0x338e9b = loadConversation(_0x590c16);
      return (_0x338e9b.messages.push({
        role: "user",
        content: _0x12e598
      }), _0x338e9b.messages.push({
        role: 'assistant',
        content: "[Executed " + _0x3ced8a.command + ':\x20' + _0x12e598 + ']'
      }), saveConversation(_0x590c16, _0x338e9b), true);
    }
  }
  const _0x52308f = loadConfig(), _0x42b660 = _0x52308f.chatbotName || "VIPBOT", _0x572c28 = _0x52308f.techName || "Lupin Stanley", _0x42188c = loadConversation(_0x590c16), _0x34d8d8 = getBotId();
  let _0x174607 = loadProfile(_0x34d8d8, _0x590c16);
  const _0x2e4db1 = [/^(?:generate|create|make|draw|paint|design|render)\s+(?:me\s+)?(?:an?\s+)?(?:ai\s+)?(?:image|picture|photo|art|artwork|illustration|painting|wallpaper)\s+(?:of|showing|with|about)\s+(.+)/i, /^(?:generate|create|make|draw|paint)\s+(?:me\s+)?(?:an?\s+)?(?:image|picture|photo|art|painting)\s+(.+)/i, /^imagine\s+(.+)/i, /^flux\s+(.+)/i, /^(?:nvidia\s+)?(?:flux|image)\s+(.+)/i, /^(?:generate|create)\s+(?:ai\s+)?(?:image|art)\s+(.+)/i];
  let _0xdf0b99 = null;
  for (const _0x5f09b4 of _0x2e4db1) {
    const _0x2c27ac = _0x12e598.match(_0x5f09b4);
    if (_0x2c27ac?.[1]?.trim().length > 3) {
      _0xdf0b99 = _0x2c27ac[1].trim();
      break;
    }
  }
  if (_0xdf0b99) try {
    (await _0x1b402a.sendPresenceUpdate("composing", _0x23b260), await _0x1b402a.sendMessage(_0x23b260, {
      react: {
        text: MEDIA.DESIGN,
        key: _0x29922a.key
      }
    }));
    const _0x5e7625 = await generateImage(_0xdf0b99);
    if (_0x5e7625) return (await _0x1b402a.sendMessage(_0x23b260, {
      image: _0x5e7625,
      caption: MEDIA.DESIGN + '\x20*' + _0xdf0b99 + "*\n_Generated with FLUX Dev_"
    }, {
      quoted: _0x29922a
    }), _0x42188c.messages.push({
      role: "user",
      content: _0x12e598
    }), _0x42188c.messages.push({
      role: "assistant",
      content: "[Generated image: " + _0xdf0b99 + ']'
    }), saveConversation(_0x590c16, _0x42188c), _0x174607 = learnFromMessage(_0x12e598, _0x174607), saveProfile(_0x34d8d8, _0x590c16, _0x174607), _0x52308f.stats.totalQueries = (_0x52308f.stats.totalQueries || 0) + 1, _0x52308f.stats.imagesCreated = (_0x52308f.stats.imagesCreated || 0) + 1, saveConfig(_0x52308f), await _0x1b402a.sendMessage(_0x23b260, {
      react: {
        text: STATUS.SUCCESS,
        key: _0x29922a.key
      }
    }), true);
    return (await _0x1b402a.sendMessage(_0x23b260, {
      react: {
        text: STATUS.ERROR,
        key: _0x29922a.key
      }
    }), await _0x1b402a.sendMessage(_0x23b260, {
      text: BRAND.WOLF + " _Image generation failed. Try again in a moment._"
    }, {
      quoted: _0x29922a
    }), true);
  } catch (_0x4acb87) {
    return (console.error('[' + _0x42b660 + "] Image gen error:", _0x4acb87.message), await _0x1b402a.sendMessage(_0x23b260, {
      text: BRAND.WOLF + " _Image generation error: " + _0x4acb87.message + '_'
    }, {
      quoted: _0x29922a
    }), true);
  }
  const _0x550525 = detectIntent(_0x12e598);
  if (_0x550525 && _0x550525.type !== "image" && _0x16d126) {
    if (_0x550525.vague) {
      setPendingAction(_0x590c16, _0x23b260, _0x550525.type, _0x550525.command);
      const _0x3afa56 = MEDIA_PROMPTS[_0x550525.type];
      return (await _0x1b402a.sendMessage(_0x23b260, {
        text: BRAND.WOLF + '\x20' + (_0x3afa56?.ask || 'Sure!\x20What\x20would\x20you\x20like?')
      }, {
        quoted: _0x29922a
      }), _0x42188c.messages.push({
        role: "user",
        content: _0x12e598
      }), _0x42188c.messages.push({
        role: "assistant",
        content: _0x3afa56?.ask || 'Sure!\x20What\x20would\x20you\x20like?'
      }), saveConversation(_0x590c16, _0x42188c), true);
    }
    const _0x30ab58 = await executeMediaCommand(_0x1b402a, _0x29922a, _0x550525.command, _0x550525.query, _0x16d126);
    if (_0x30ab58) {
      const _0x28833e = loadConfig();
      trackMediaAction(_0x550525.type, _0x28833e);
      const _0x18ce47 = loadConversation(_0x590c16);
      return (_0x18ce47.messages.push({
        role: 'user',
        content: _0x12e598
      }), _0x18ce47.messages.push({
        role: 'assistant',
        content: '[Executed\x20' + _0x550525.command + ':\x20' + _0x550525.query + ']'
      }), saveConversation(_0x590c16, _0x18ce47), true);
    }
  }
  try {
    await _0x1b402a.sendPresenceUpdate("composing", _0x23b260);
    const _0x22da45 = await getAIResponse(_0x12e598, _0x42188c, _0x52308f.preferredModel || "gpt", _0x42b660, _0x174607, _0x572c28);
    if (!_0x22da45) return (await _0x1b402a.sendMessage(_0x23b260, {
      text: BRAND.WOLF + '\x20_I\x27m\x20having\x20trouble\x20connecting\x20right\x20now.\x20Try\x20again\x20in\x20a\x20moment._'
    }, {
      quoted: _0x29922a
    }), true);
    const _0x273d68 = cleanAIResponse(_0x22da45.response, _0x42b660, _0x572c28), _0x35a5ea = trimResponse(_0x273d68), _0x2e4f1a = getPersonalizedGreeting(_0x174607), _0x4ae979 = _0x2e4f1a ? _0x2e4f1a + '\x20' : BRAND.WOLF + '\x20';
    return (_0x42188c.messages.push({
      role: "user",
      content: _0x12e598
    }), _0x42188c.messages.push({
      role: "assistant",
      content: _0x273d68
    }), saveConversation(_0x590c16, _0x42188c), _0x174607 = learnFromMessage(_0x12e598, _0x174607), saveProfile(_0x34d8d8, _0x590c16, _0x174607), _0x52308f.stats.totalQueries = (_0x52308f.stats.totalQueries || 0) + 1, _0x52308f.stats.modelsUsed = _0x52308f.stats.modelsUsed || ({}), _0x52308f.stats.modelsUsed[_0x22da45.model] = (_0x52308f.stats.modelsUsed[_0x22da45.model] || 0) + 1, saveConfig(_0x52308f), await _0x1b402a.sendMessage(_0x23b260, {
      text: '' + _0x4ae979 + _0x35a5ea
    }, {
      quoted: _0x29922a
    }), true);
  } catch (_0x47c2a3) {
    return (console.error('[' + _0x42b660 + "] Chat error:", _0x47c2a3.message), false);
  }
}
async function sendChatbotHelp(_0x19688f, _0x53e9a8, _0x491e47, _0x4a4298, _0x31fe98 = false) {
  const _0x4573fe = _0x53e9a8.key.remoteJid, _0x2f24e4 = _0x491e47 + "chatbot", _0x65bb68 = {
    off: STATUS.OFFLINE,
    on: STATUS.ONLINE,
    groups: SOCIAL.PEOPLE,
    dms: UI.CHAT,
    both: SOCIAL.GLOBE
  }, _0xd70763 = AI_MODELS[_0x4a4298.preferredModel] || AI_MODELS.gpt, _0x371be9 = _0x4a4298.chatbotName || "VIPBOT", _0x4d52d6 = _0x4a4298.techName || 'VIPBOT';
  let _0x2cea01, _0xeedc4d;
  _0x31fe98 ? (_0x2cea01 = "╭┄〔 " + BRAND.VIP + ' *' + _0x371be9 + " CHATBOT CUSTOMIZATION* 〕┄╮\n" + ('┆ ' + (_0x65bb68[_0x4a4298.mode] || STATUS.OFFLINE) + " Status: " + _0x4a4298.mode.toUpperCase() + '\n') + ("┆ ✦ *" + _0x2f24e4 + " name <name>*\n┆   └─ Set chatbot name\n") + ("┆ ✦ *" + _0x2f24e4 + " techname <name>*\n┆   └─ Set creator/tech name\n") + ("┆ ✦ *" + _0x2f24e4 + " model*\n┆   └─ Switch AI model\n") + ("┆ ✦ *" + _0x2f24e4 + " stats* / *settings*\n┆   └─ View usage statistics or configuration\n") + ('┆ ✦ *' + _0x2f24e4 + " clear*\n┆   └─ Reset conversation history\n") + ('┆┄〔 ' + UI.CLIPBOARD + " *GROUP CONTROL* 〕┄┆\n") + ("┆ ✦ *" + _0x2f24e4 + ' addgroup* / *removegroup [jid]*\n┆   └─ Enable or exclude a group\n') + ("┆ ✦ *" + _0x2f24e4 + " listgroups* / *cleargroups*\n┆   └─ View groups or clear exclusions\n") + ("┆┄〔 " + SOCIAL.PERSON + ' *USER FILTER (per group)* 〕┄┆\n') + ("┆ ✦ *" + _0x2f24e4 + " allowonly @user*\n┆   └─ Reply only to selected users\n") + ("┆ ✦ *" + _0x2f24e4 + ' blockuser @user* / *allowuser @user*\n┆   └─ Block or allow users\n') + ("┆ ✦ *" + _0x2f24e4 + " removeuser @user*\n┆   └─ Remove a user from the filter\n") + ("┆ ✦ *" + _0x2f24e4 + ' listusers* / *clearusers*\n┆   └─ View or clear the group user filter\n') + ("┆┄〔 " + UI.CHAT + ' *DM CONTROL* 〕┄┆\n') + ("┆ ✦ *" + _0x2f24e4 + ' adddm <number>* / *removedm <number>*\n┆   └─ Add or remove an allowed DM\n') + ('┆ ✦ *' + _0x2f24e4 + " listdms* / *cleardms*\n┆   └─ View or clear allowed DMs\n") + ("╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n" + BRAND.LIGHTNING + " " + getFooter(_0x53e9a8.key.participant || _0x4573fe)), _0xeedc4d = {
    display_text: 'Basic Commands',
    id: _0x2f24e4 + " basic"
  }) : (_0x2cea01 = "╭┄〔 " + BRAND.VIP + ' *' + _0x371be9 + ' CHATBOT* 〕┄╮\n' + ('┆ ' + (_0x65bb68[_0x4a4298.mode] || STATUS.OFFLINE) + " Current mode: " + _0x4a4298.mode.toUpperCase() + "\n┆\n") + ("┆ ✦ *" + _0x2f24e4 + " on*\n┆   └─ Enable in all chats\n") + ('┆ ✦ *' + _0x2f24e4 + " off*\n┆   └─ Disable chatbot\n") + ('┆ ✦ *' + _0x2f24e4 + " groups*\n┆   └─ Enable in groups only\n") + ('┆ ✦ *' + _0x2f24e4 + ' dms*\n┆   └─ Enable in direct messages only\n') + ("┆ ✦ *" + _0x2f24e4 + " both*\n┆   └─ Enable in groups and DMs\n┆\n") + ("╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n" + BRAND.LIGHTNING + " " + getFooter(_0x53e9a8.key.participant || _0x4573fe)), _0xeedc4d = {
    display_text: 'More Customization',
    id: _0x2f24e4 + " customize"
  });
  try {
    const {sendInteractiveMessage: _0x21a73a} = await import('wolfbtns');
    return await _0x21a73a(_0x19688f, _0x4573fe, {
      text: _0x2cea01,
      interactiveButtons: [{
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify(_0xeedc4d)
      }],
      quoted: _0x53e9a8
    });
  } catch {
    const _0xb73080 = _0x31fe98 ? '\x0a\x0aBasic\x20commands:\x20*' + _0x2f24e4 + " basic*" : "\n\nMore Customization: *" + _0x2f24e4 + " customize*";
    return _0x19688f.sendMessage(_0x4573fe, {
      text: '' + _0x2cea01 + _0xb73080
    }, {
      quoted: _0x53e9a8
    });
  }
}
export default {
  name: "chatbot",
  description: "VIPBOT - Elite AI Chatbot System",
  category: 'ai',
  aliases: ['vip', "vipchat", 'aichat', "wolf", "wolfchat", "wolfbot"],
  usage: "chatbot <on|off|groups|dms|both|model>",
  ownerOnly: true,
  async execute(_0x2e456, _0x3780d3, _0x17a5ad, _0x4a93e1) {
    const _0x27c1ed = _0x3780d3.key.remoteJid, _0x1f5abb = loadConfig(), _0x250945 = (_0x17a5ad[0] || '').toLowerCase(), _0x1fc0b2 = _0x3780d3.message?.extendedTextMessage?.contextInfo?.stanzaId, _0x431a8b = (_0x17a5ad[0] || '').trim();
    if (_0x1fc0b2 && _lgCache.has(_0x1fc0b2) && (/^\d+$/).test(_0x431a8b)) {
      const _0x52d626 = _lgCache.get(_0x1fc0b2), _0x3d6c25 = parseInt(_0x431a8b) - 1, _0x11ec5d = _0x52d626[_0x3d6c25];
      if (!_0x11ec5d) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.ERROR + " No group at position *" + _0x431a8b + "*. The list has *" + _0x52d626.length + "* groups."
      }, {
        quoted: _0x3780d3
      });
      const _0x599696 = "╭┄〔 " + SOCIAL.PEOPLE + ' *GROUP DETAIL* 〕┄╮\n' + ('┆ ✦ *' + _0x11ec5d.name + '*\n') + ("╰┄ 🆔 `" + _0x11ec5d.gid + '`');
      try {
        const {createRequire: _0x835eb} = await import("module"), _0x5ceed0 = _0x835eb(import.meta.url), {sendInteractiveMessage: _0x32507c} = await import("wolfbtns");
        return await _0x32507c(_0x2e456, _0x27c1ed, {
          text: _0x599696,
          footer: _0x1f5abb.chatbotName || 'VIPBOT',
          interactiveButtons: [{
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: UI.CLIPBOARD + " Copy JID",
              copy_code: _0x11ec5d.gid
            })
          }, {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: UI.TRASH + " Remove Group",
              id: _0x4a93e1 + "chatbot removegroup " + _0x11ec5d.gid
            })
          }]
        });
      } catch {
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: _0x599696 + ("\n\n_Long-press the JID above to copy it._\n_Or send:_ `" + _0x4a93e1 + 'chatbot\x20removegroup\x20' + _0x11ec5d.gid + '`\x20_to\x20remove._')
        }, {
          quoted: _0x3780d3
        });
      }
    }
    if (["customize", "more"].includes(_0x250945)) return sendChatbotHelp(_0x2e456, _0x3780d3, _0x4a93e1, _0x1f5abb, true);
    if (_0x250945 === "basic") return sendChatbotHelp(_0x2e456, _0x3780d3, _0x4a93e1, _0x1f5abb);
    if (!_0x250945 || _0x250945 === "help") return sendChatbotHelp(_0x2e456, _0x3780d3, _0x4a93e1, _0x1f5abb);
    if (['on', "off", "groups", "dms", "both"].includes(_0x250945)) {
      (_0x1f5abb.mode = _0x250945, saveConfig(_0x1f5abb));
      const _0x5e6f24 = {
        on: STATUS.ONLINE + '\x20ON',
        off: STATUS.OFFLINE + " OFF",
        groups: SOCIAL.PEOPLE + '\x20GROUPS',
        dms: UI.CHAT + '\x20DMS',
        both: SOCIAL.GLOBE + '\x20ALL'
      };
      return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + " Chatbot mode set to: *" + _0x5e6f24[_0x250945] + '*'
      }, {
        quoted: _0x3780d3
      });
    }
    if (_0x250945 === "model") {
      const _0xdfeebc = (_0x17a5ad[1] || '').toLowerCase();
      if (!_0xdfeebc) {
        const _0x2d5e13 = _0x1f5abb.preferredModel || "gpt";
        let _0x237de2 = "*AI Models:*\n";
        for (const [_0x58f30d, _0x4dc212] of Object.entries(AI_MODELS)) {
          _0x237de2 += _0x4dc212.icon + '\x20' + _0x4dc212.name + " (`" + _0x58f30d + '`)' + (_0x58f30d === _0x2d5e13 ? '\x20${STATUS.SUCCESS}' : '') + '\x0a';
        }
        return (_0x237de2 += "\nSwitch: `" + _0x4a93e1 + 'chatbot\x20model\x20<key>`', _0x2e456.sendMessage(_0x27c1ed, {
          text: _0x237de2
        }, {
          quoted: _0x3780d3
        }));
      }
      if (!AI_MODELS[_0xdfeebc]) {
        const _0x44ae7d = Object.keys(AI_MODELS).join(',\x20');
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.ERROR + '\x20Unknown\x20model:\x20*' + _0xdfeebc + "*\nAvailable: " + _0x44ae7d
        }, {
          quoted: _0x3780d3
        });
      }
      (_0x1f5abb.preferredModel = _0xdfeebc, saveConfig(_0x1f5abb));
      const _0x4dd747 = AI_MODELS[_0xdfeebc];
      return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + " Model set to: " + _0x4dd747.icon + '\x20*' + _0x4dd747.name + '*'
      }, {
        quoted: _0x3780d3
      });
    }
    if (_0x250945 === 'stats') {
      const _0x1e383a = _0x1f5abb.stats || ({
        totalQueries: 0,
        modelsUsed: {},
        mediaActions: {}
      });
      let _0x431b8f = BRAND.VIP + " *VIPBOT Stats*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n\n" + (UI.CHART + " *Total Queries:* " + _0x1e383a.totalQueries + '\x0a') + (SOCIAL.BOT + " *Model:* " + (AI_MODELS[_0x1f5abb.preferredModel] || AI_MODELS.gpt).name + '\x0a') + (MEDIA.SIGNAL + '\x20*Mode:*\x20' + _0x1f5abb.mode.toUpperCase() + '\x0a\x0a');
      if (Object.keys(_0x1e383a.modelsUsed || ({})).length > 0) {
        _0x431b8f += UI.REFRESH + '\x20*AI\x20Usage:*\x0a';
        const _0x26da15 = Object.entries(_0x1e383a.modelsUsed).sort((_0x418d78, _0x26524a) => _0x26524a[1] - _0x418d78[1]);
        for (const [_0x4881b9, _0x19d42d] of _0x26da15) {
          const _0x54024a = AI_MODELS[_0x4881b9];
          if (_0x54024a) _0x431b8f += '\x20\x20' + _0x54024a.icon + '\x20' + _0x54024a.name + ':\x20' + _0x19d42d + '\x0a';
        }
        _0x431b8f += '\x0a';
      }
      if (Object.keys(_0x1e383a.mediaActions || ({})).length > 0) {
        const _0x9d6d28 = {
          image: MEDIA.DESIGN,
          playAudio: MEDIA.MUSIC,
          playVideo: MEDIA.VIDEO,
          song: MEDIA.MUSIC_NOTES
        }, _0x464ccc = {
          image: 'Images',
          playAudio: "Music",
          playVideo: "Videos",
          song: "Songs"
        };
        _0x431b8f += UI.TARGET + " *Media Actions:*\n";
        for (const [_0x67af4d, _0x3aa735] of Object.entries(_0x1e383a.mediaActions)) {
          _0x431b8f += '\x20\x20' + (_0x9d6d28[_0x67af4d] || '${MEDIA.PACKAGE}') + '\x20' + (_0x464ccc[_0x67af4d] || _0x67af4d) + ':\x20' + _0x3aa735 + '\x0a';
        }
      }
      return (_0x431b8f += '\x0a' + BRAND.LIGHTNING + '\x20' + getFooter(_0x3780d3.key.participant || _0x3780d3.key.remoteJid), _0x2e456.sendMessage(_0x27c1ed, {
        text: _0x431b8f
      }, {
        quoted: _0x3780d3
      }));
    }
    if (_0x250945 === "clear") {
      const _0x4aaf49 = _0x3780d3.key.participant || _0x27c1ed;
      return (clearConversation(_0x4aaf49), clearPendingAction(_0x4aaf49, _0x27c1ed), _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + " Conversation history cleared"
      }, {
        quoted: _0x3780d3
      }));
    }
    if (_0x250945 === "settings") {
      const _0x379b91 = AI_MODELS[_0x1f5abb.preferredModel] || AI_MODELS.gpt, _0x55dc93 = {
        off: STATUS.OFFLINE,
        on: STATUS.ONLINE,
        groups: SOCIAL.PEOPLE,
        dms: UI.CHAT,
        both: SOCIAL.GLOBE
      }, _0x93a761 = _0x1f5abb.excludedGroups || [], _0x1033da = _0x1f5abb.allowedDMs || [];
      let _0x339b0 = '';
      if (_0x93a761.length > 0 || _0x1033da.length > 0) {
        _0x339b0 = '\x0a' + UI.CLIPBOARD + " *Filters:*\n";
        if (_0x93a761.length > 0) _0x339b0 += '\x20\x20' + STATUS.BLOCKED + '\x20' + _0x93a761.length + '\x20group(s)\x20excluded\x0a';
        if (_0x1033da.length > 0) _0x339b0 += '\x20\x20' + UI.CHAT + '\x20' + _0x1033da.length + " DM(s) whitelisted\n";
      }
      const _0x29f47a = _0x1f5abb.chatbotName || "VIPBOT", _0xb18524 = _0x1f5abb.techName || "Lupin Stanley", _0xd4bfd3 = BRAND.VIP + '\x20*' + _0x29f47a + '\x20Settings*\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a\x0a' + (UI.LABEL + '\x20*Name:*\x20' + _0x29f47a + '\x0a') + (UI.OFFICE + " *Creator:* " + _0xb18524 + '\x0a') + ((_0x55dc93[_0x1f5abb.mode] || "${STATUS.OFFLINE}") + '\x20*Mode:*\x20' + _0x1f5abb.mode.toUpperCase() + '\x0a') + (_0x379b91.icon + " *Model:* " + _0x379b91.name + '\x0a') + (UI.REFRESH + " *Auto-Fallback:* Enabled\n") + (UI.SAVE + '\x20*Memory:*\x2020\x20msgs\x20(1hr\x20timeout)\x0a') + (UI.TARGET + " *Interactive:* Images, Music, Videos\n") + (UI.CHART + " *Queries:* " + (_0x1f5abb.stats?.totalQueries || 0) + '\x0a') + _0x339b0 + '\x0a' + (SOCIAL.BOT + '\x20*Models\x20(' + Object.keys(AI_MODELS).length + "):*\n") + Object.entries(AI_MODELS).map(([_0x51cf12, _0x2c0c6a]) => '\x20\x20' + _0x2c0c6a.icon + '\x20' + _0x2c0c6a.name + " (`" + _0x51cf12 + '`)').join('\x0a') + ('\x0a\x0a' + BRAND.LIGHTNING + '\x20' + getFooter(_0x3780d3.key.participant || _0x3780d3.key.remoteJid));
      return _0x2e456.sendMessage(_0x27c1ed, {
        text: _0xd4bfd3
      }, {
        quoted: _0x3780d3
      });
    }
    if (_0x250945 === "addgroup") {
      if (!_0x27c1ed.endsWith("@g.us")) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.ERROR + " Run this command inside a group."
      }, {
        quoted: _0x3780d3
      });
      if (!_0x1f5abb.excludedGroups) _0x1f5abb.excludedGroups = [];
      let _0x135d1d = _0x27c1ed.split('@')[0];
      const _0x295e1a = globalThis.groupMetadataCache?.get(_0x27c1ed);
      if (_0x295e1a?.data?.subject) _0x135d1d = _0x295e1a.data.subject;
      const _0x195262 = _0x1f5abb.mode === "off";
      if (_0x195262) _0x1f5abb.mode = "groups";
      const _0x119d19 = _0x1f5abb.excludedGroups.indexOf(_0x27c1ed);
      if (_0x119d19 !== -1) return (_0x1f5abb.excludedGroups.splice(_0x119d19, 1), saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + '\x20*' + _0x135d1d + '*\x20re-enabled\x20—\x20chatbot\x20will\x20respond\x20here\x20again.'
      }, {
        quoted: _0x3780d3
      }));
      saveConfig(_0x1f5abb);
      const _0x314138 = _0x195262 ? '\x0a' + STATUS.WARNING + " Mode auto-set to GROUPS (was OFF)" : '';
      return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + '\x20*' + _0x135d1d + "* is already active" + _0x314138
      }, {
        quoted: _0x3780d3
      });
    }
    if (_0x250945 === "removegroup") {
      if (!_0x1f5abb.excludedGroups) _0x1f5abb.excludedGroups = [];
      let _0x2227eb = null;
      if (_0x17a5ad[1]) _0x2227eb = _0x17a5ad[1].includes('@') ? _0x17a5ad[1].trim() : _0x17a5ad[1].trim() + "@g.us"; else {
        if (_0x27c1ed.endsWith("@g.us")) _0x2227eb = _0x27c1ed; else return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.ERROR + " Provide a group JID: *" + _0x4a93e1 + "chatbot removegroup <jid>*\n_Run " + _0x4a93e1 + "chatbot listgroups to see all groups._"
        }, {
          quoted: _0x3780d3
        });
      }
      if (_0x1f5abb.excludedGroups.includes(_0x2227eb)) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.WARNING + " That group is already excluded.\n_Use " + _0x4a93e1 + "chatbot addgroup inside it to re-enable._"
      }, {
        quoted: _0x3780d3
      });
      let _0x2dfe33 = _0x2227eb.split('@')[0];
      const _0x3f79d1 = globalThis.groupMetadataCache?.get(_0x2227eb);
      if (_0x3f79d1?.data?.subject) _0x2dfe33 = _0x3f79d1.data.subject;
      return (_0x1f5abb.excludedGroups.push(_0x2227eb), saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.BLOCKED + '\x20*' + _0x2dfe33 + '*\x20excluded\x20—\x20chatbot\x20won\x27t\x20respond\x20there.\x0a_Use\x20' + _0x4a93e1 + "chatbot addgroup inside it to re-enable._"
      }, {
        quoted: _0x3780d3
      }));
    }
    if (_0x250945 === "listgroups") {
      const _0x1ea6b7 = _0x1f5abb.excludedGroups || [];
      let _0x1220d5 = [];
      try {
        const _0x111cdb = await _0x2e456.groupFetchAllParticipating();
        _0x1220d5 = Object.values(_0x111cdb || ({}));
      } catch (_0x59eea8) {
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.ERROR + '\x20Failed\x20to\x20fetch\x20groups:\x20' + _0x59eea8.message
        }, {
          quoted: _0x3780d3
        });
      }
      if (_0x1220d5.length === 0) return _0x2e456.sendMessage(_0x27c1ed, {
        text: UI.CLIPBOARD + " Bot is not in any groups yet."
      }, {
        quoted: _0x3780d3
      });
      const _0x4b21b = globalThis.groupMetadataCache, _0xec1762 = _0x1220d5.map(_0xf0c28e => {
        let _0x22bc3b = (_0xf0c28e.subject || '').trim();
        if (!_0x22bc3b && _0x4b21b) {
          const _0x13a7fe = _0x4b21b.get(_0xf0c28e.id);
          if (_0x13a7fe?.data?.subject) _0x22bc3b = _0x13a7fe.data.subject.trim();
        }
        return {
          gid: _0xf0c28e.id,
          name: _0x22bc3b || _0xf0c28e.id.split('@')[0]
        };
      });
      _0xec1762.sort((_0x598e8b, _0x1ee725) => _0x598e8b.name.localeCompare(_0x1ee725.name));
      const _0x20bbcb = _0xec1762.filter(_0x11d3bc => !_0x1ea6b7.includes(_0x11d3bc.gid)).length;
      let _0x74efe8 = UI.CLIPBOARD + " *Groups (" + _0xec1762.length + '\x20total,\x20' + _0x20bbcb + " active):*\n\n";
      for (let _0x19facf = 0; _0x19facf < _0xec1762.length; _0x19facf++) {
        const {gid: _0x34aedf, name: _0x3f5bbe} = _0xec1762[_0x19facf], _0x3238ad = _0x1ea6b7.includes(_0x34aedf);
        _0x74efe8 += _0x3238ad ? _0x19facf + 1 + '.\x20' + STATUS.BLOCKED + '\x20*' + _0x3f5bbe + '*\x0a' : _0x19facf + 1 + '.\x20' + STATUS.SUCCESS + '\x20*' + _0x3f5bbe + '*\x0a';
      }
      _0x74efe8 += '\x0a_' + STATUS.SUCCESS + '\x20active\x20\x20•\x20\x20' + STATUS.BLOCKED + " excluded_\n_Reply with a number to copy its JID_";
      const _0x5e9102 = await _0x2e456.sendMessage(_0x27c1ed, {
        text: _0x74efe8
      }, {
        quoted: _0x3780d3
      }), _0x58ea84 = _0x5e9102?.key?.id;
      if (_0x58ea84) {
        _lgCache.set(_0x58ea84, _0xec1762);
        if (_lgCache.size > _LG_MAX) _lgCache.delete(_lgCache.keys().next().value);
      }
      return;
    }
    if (_0x250945 === 'cleargroups') return (_0x1f5abb.excludedGroups = [], saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
      text: STATUS.SUCCESS + " All exclusions cleared — chatbot will respond in all groups again."
    }, {
      quoted: _0x3780d3
    }));
    if (_0x250945 === "adddm") {
      const _0x4077ae = (_0x17a5ad[1] || '').replace(/[^0-9]/g, '');
      if (!_0x4077ae || _0x4077ae.length < 7) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.ERROR + " Provide a valid number.\nUsage: `" + _0x4a93e1 + "chatbot adddm 255780470905`"
      }, {
        quoted: _0x3780d3
      });
      if (!_0x1f5abb.allowedDMs) _0x1f5abb.allowedDMs = [];
      const _0x1a9f9d = _0x4077ae + "@s.whatsapp.net", _0x37e927 = _0x1f5abb.allowedDMs.some(_0x192088 => {
        const _0x29efc2 = _0x192088.split('@')[0].split(':')[0];
        return _0x29efc2 === _0x4077ae;
      });
      if (_0x37e927) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.WARNING + '\x20' + _0x4077ae + " is already added."
      }, {
        quoted: _0x3780d3
      });
      _0x1f5abb.allowedDMs.push(_0x1a9f9d);
      const _0xdbcee = _0x1f5abb.mode === "off";
      if (_0xdbcee) _0x1f5abb.mode = "dms";
      saveConfig(_0x1f5abb);
      const _0x274603 = _0xdbcee ? '\x0a' + STATUS.WARNING + '\x20Mode\x20auto-set\x20to\x20DMS\x20(was\x20OFF)' : '';
      return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + '\x20' + _0x4077ae + " successfully added" + _0x274603
      }, {
        quoted: _0x3780d3
      });
    }
    if (_0x250945 === "removedm") {
      const _0x5ef62f = (_0x17a5ad[1] || '').replace(/[^0-9]/g, '');
      if (!_0x5ef62f || _0x5ef62f.length < 7) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.ERROR + '\x20Provide\x20a\x20valid\x20number.\x0aUsage:\x20`' + _0x4a93e1 + "chatbot removedm 255780470905`"
      }, {
        quoted: _0x3780d3
      });
      if (!_0x1f5abb.allowedDMs) _0x1f5abb.allowedDMs = [];
      const _0x12420a = _0x1f5abb.allowedDMs.findIndex(_0x2ccbf7 => {
        const _0x468a10 = _0x2ccbf7.split('@')[0].split(':')[0];
        return _0x468a10 === _0x5ef62f;
      });
      if (_0x12420a === -1) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.WARNING + '\x20' + _0x5ef62f + " is not in the list."
      }, {
        quoted: _0x3780d3
      });
      return (_0x1f5abb.allowedDMs.splice(_0x12420a, 1), saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + '\x20' + _0x5ef62f + " successfully removed"
      }, {
        quoted: _0x3780d3
      }));
    }
    if (_0x250945 === "listdms") {
      const _0x514e6b = _0x1f5abb.allowedDMs || [];
      if (_0x514e6b.length === 0) return _0x2e456.sendMessage(_0x27c1ed, {
        text: UI.CLIPBOARD + '\x20No\x20DMs\x20in\x20whitelist.'
      }, {
        quoted: _0x3780d3
      });
      let _0x346ebf = UI.CLIPBOARD + '\x20*Whitelisted\x20DMs\x20(' + _0x514e6b.length + "):*\n";
      for (let _0x5a9a6a = 0; _0x5a9a6a < _0x514e6b.length; _0x5a9a6a++) {
        const _0x451633 = _0x514e6b[_0x5a9a6a].split('@')[0].split(':')[0];
        _0x346ebf += _0x5a9a6a + 1 + ". +" + _0x451633 + '\x0a';
      }
      return _0x2e456.sendMessage(_0x27c1ed, {
        text: _0x346ebf
      }, {
        quoted: _0x3780d3
      });
    }
    if (_0x250945 === 'cleardms') return (_0x1f5abb.allowedDMs = [], saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
      text: STATUS.SUCCESS + " All DMs cleared"
    }, {
      quoted: _0x3780d3
    }));
    if (_0x250945 === "name") {
      const _0x9a1b62 = _0x17a5ad.slice(1).join('\x20').trim();
      if (!_0x9a1b62) {
        const _0x34dc5c = _0x1f5abb.chatbotName || "VIPBOT";
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: "Name: *" + _0x34dc5c + "*\nChange: `" + _0x4a93e1 + 'chatbot\x20name\x20<new\x20name>`'
        }, {
          quoted: _0x3780d3
        });
      }
      if (_0x9a1b62.length > 30) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.ERROR + '\x20Name\x20too\x20long\x20(max\x2030\x20characters).'
      }, {
        quoted: _0x3780d3
      });
      return (_0x1f5abb.chatbotName = _0x9a1b62, saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + " Chatbot name set to: *" + _0x9a1b62 + '*'
      }, {
        quoted: _0x3780d3
      }));
    }
    if (_0x250945 === 'techname') {
      const _0x8916cf = _0x17a5ad.slice(1).join('\x20').trim();
      if (!_0x8916cf) {
        const _0x18e468 = _0x1f5abb.techName || "Lupin Stanley";
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: "Tech name: *" + _0x18e468 + "*\nChange: `" + _0x4a93e1 + 'chatbot\x20techname\x20<new\x20name>`'
        }, {
          quoted: _0x3780d3
        });
      }
      if (_0x8916cf.length > 40) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.ERROR + " Tech name too long (max 40 characters)."
      }, {
        quoted: _0x3780d3
      });
      return (_0x1f5abb.techName = _0x8916cf, saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + '\x20Tech/creator\x20name\x20set\x20to:\x20*' + _0x8916cf + '*\x0aThe\x20chatbot\x20will\x20now\x20say\x20it\x20was\x20created\x20by\x20*' + _0x8916cf + '*.'
      }, {
        quoted: _0x3780d3
      }));
    }
    if (["allowonly", 'blockuser', 'allowuser', "removeuser", "listusers", "clearusers"].includes(_0x250945)) {
      if (!_0x27c1ed.endsWith("@g.us")) return _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.ERROR + " User filters are per-group. Run this command inside a group."
      }, {
        quoted: _0x3780d3
      });
      if (!_0x1f5abb.groupUserFilters) _0x1f5abb.groupUserFilters = {};
      if (_0x250945 === "listusers") {
        const _0x359026 = _0x1f5abb.groupUserFilters[_0x27c1ed];
        if (!_0x359026 || !_0x359026.users || _0x359026.users.length === 0) return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.HELP + '\x20*No\x20user\x20filter\x20set\x20for\x20this\x20group.*\x0aChatbot\x20replies\x20to\x20*everyone*.\x0a\x0aUse:\x0a•\x20`' + _0x4a93e1 + "chatbot allowonly @user` — only reply to specific people\n• `" + _0x4a93e1 + "chatbot blockuser @user` — block specific people"
        }, {
          quoted: _0x3780d3
        });
        const _0x2beeb0 = _0x359026.mode === 'allow' ? STATUS.SUCCESS + " *ALLOW ONLY* — replies only to listed users" : STATUS.BLOCKED + " *BLOCK LIST* — replies to everyone except listed users";
        let _0x181f08 = "╭┄〔 " + SOCIAL.PERSON + " *USER FILTER* 〕┄╮\n┆\n┆ " + _0x2beeb0 + "\n┆\n";
        return (_0x359026.users.forEach((_0x28a5dc, _0x540f54) => {
          const _0xbf9c2d = _0x28a5dc.split('@')[0].split(':')[0];
          _0x181f08 += '┆ ' + (_0x540f54 + 1) + ". +" + _0xbf9c2d + '\x0a';
        }), _0x181f08 += "┆\n╰┄ " + getFooter(_0x3780d3.key.participant || _0x27c1ed), _0x2e456.sendMessage(_0x27c1ed, {
          text: _0x181f08
        }, {
          quoted: _0x3780d3
        }));
      }
      if (_0x250945 === "clearusers") return (delete _0x1f5abb.groupUserFilters[_0x27c1ed], saveConfig(_0x1f5abb), _0x2e456.sendMessage(_0x27c1ed, {
        text: STATUS.SUCCESS + '\x20User\x20filter\x20cleared\x20—\x20chatbot\x20will\x20reply\x20to\x20*everyone*\x20in\x20this\x20group.'
      }, {
        quoted: _0x3780d3
      }));
      const _0x48262e = await _extractTargetUsers(_0x2e456, _0x3780d3, _0x17a5ad);
      if (_0x48262e.length === 0) {
        const _0x5b90e6 = _0x250945 === "allowonly" ? '`' + _0x4a93e1 + "chatbot allowonly @user`" : _0x250945 === "blockuser" ? '`' + _0x4a93e1 + "chatbot blockuser @user`" : _0x250945 === "allowuser" ? '`' + _0x4a93e1 + "chatbot allowuser @user`" : '`' + _0x4a93e1 + "chatbot removeuser @user`";
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.ERROR + '\x20@Mention\x20someone\x20or\x20provide\x20a\x20number.\x0aExample:\x20' + _0x5b90e6
        }, {
          quoted: _0x3780d3
        });
      }
      const _0x5306c3 = _0x3283fc => ({
        text: _0x3283fc.map(_0x2654d2 => '@' + _0x2654d2.split('@')[0].split(':')[0].replace(/\D/g, '')).join(',\x20'),
        mentions: _0x3283fc
      }), _0x2c7753 = _0x1f5abb.groupUserFilters[_0x27c1ed] || ({
        mode: "block",
        users: []
      });
      if (_0x250945 === "allowonly") {
        _0x2c7753.mode = "allow";
        for (const _0x5a4673 of _0x48262e) {
          const _0x5cb6be = _0x5a4673.split('@')[0].replace(/\D/g, ''), _0x36b7ec = _0x2c7753.users.some(_0x3e500a => _0x3e500a.split('@')[0].replace(/\D/g, '') === _0x5cb6be);
          if (!_0x36b7ec) _0x2c7753.users.push(_0x5a4673);
        }
        (_0x1f5abb.groupUserFilters[_0x27c1ed] = _0x2c7753, saveConfig(_0x1f5abb));
        const {text: _0x191167, mentions: _0x439fa5} = _0x5306c3(_0x48262e);
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.SUCCESS + '\x20*Allow-only\x20mode*\x20set.\x0aChatbot\x20will\x20reply\x20*only*\x20to:\x20' + _0x191167 + "\n_Add more anytime with `" + _0x4a93e1 + "chatbot allowonly @user`_",
          mentions: _0x439fa5
        }, {
          quoted: _0x3780d3
        });
      }
      if (_0x250945 === "blockuser") {
        _0x2c7753.mode = "block";
        const _0x15d5e8 = [];
        for (const _0x296c92 of _0x48262e) {
          const _0x47582e = _0x296c92.split('@')[0].replace(/\D/g, ''), _0x42d864 = _0x2c7753.users.some(_0x338712 => _0x338712.split('@')[0].replace(/\D/g, '') === _0x47582e);
          !_0x42d864 && (_0x2c7753.users.push(_0x296c92), _0x15d5e8.push(_0x296c92));
        }
        (_0x1f5abb.groupUserFilters[_0x27c1ed] = _0x2c7753, saveConfig(_0x1f5abb));
        if (_0x15d5e8.length === 0) return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.WARNING + " Those users are already blocked."
        }, {
          quoted: _0x3780d3
        });
        const {text: _0xaaacf6, mentions: _0x36a292} = _0x5306c3(_0x15d5e8);
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.BLOCKED + " *Blocked:* " + _0xaaacf6 + '\x0aChatbot\x20will\x20ignore\x20them\x20in\x20this\x20group.\x0a_Use\x20`' + _0x4a93e1 + "chatbot allowuser @user` to unblock._",
          mentions: _0x36a292
        }, {
          quoted: _0x3780d3
        });
      }
      if (_0x250945 === 'allowuser') {
        for (const _0x331b60 of _0x48262e) {
          const _0x27ba8b = _0x331b60.split('@')[0].replace(/\D/g, '');
          if (_0x2c7753.mode === "block") {
            const _0x34e743 = _0x2c7753.users.findIndex(_0x2b3503 => _0x2b3503.split('@')[0].replace(/\D/g, '') === _0x27ba8b);
            if (_0x34e743 !== -1) _0x2c7753.users.splice(_0x34e743, 1);
          } else {
            if (_0x2c7753.mode === "allow") {
              const _0x5dd7ff = _0x2c7753.users.some(_0x1236cc => _0x1236cc.split('@')[0].replace(/\D/g, '') === _0x27ba8b);
              if (!_0x5dd7ff) _0x2c7753.users.push(_0x331b60);
            }
          }
        }
        if (_0x2c7753.users.length === 0) delete _0x1f5abb.groupUserFilters[_0x27c1ed]; else _0x1f5abb.groupUserFilters[_0x27c1ed] = _0x2c7753;
        saveConfig(_0x1f5abb);
        const {text: _0x3238d0, mentions: _0x5bf94a} = _0x5306c3(_0x48262e), _0x4c1d76 = _0x2c7753.mode === "allow" ? "Added to allow list" : "Unblocked";
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.SUCCESS + '\x20*' + _0x4c1d76 + ":* " + _0x3238d0,
          mentions: _0x5bf94a
        }, {
          quoted: _0x3780d3
        });
      }
      if (_0x250945 === "removeuser") {
        const _0x1bec7d = [];
        for (const _0x58230b of _0x48262e) {
          const _0x25fdc3 = _0x58230b.split('@')[0].replace(/\D/g, ''), _0x3b5c7b = _0x2c7753.users.findIndex(_0x237393 => _0x237393.split('@')[0].replace(/\D/g, '') === _0x25fdc3);
          _0x3b5c7b !== -1 && (_0x1bec7d.push(_0x2c7753.users[_0x3b5c7b]), _0x2c7753.users.splice(_0x3b5c7b, 1));
        }
        if (_0x1bec7d.length === 0) return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.WARNING + " None of those users were in the filter list."
        }, {
          quoted: _0x3780d3
        });
        if (_0x2c7753.users.length === 0) delete _0x1f5abb.groupUserFilters[_0x27c1ed]; else _0x1f5abb.groupUserFilters[_0x27c1ed] = _0x2c7753;
        saveConfig(_0x1f5abb);
        const {text: _0x2c6062, mentions: _0x4b1136} = _0x5306c3(_0x1bec7d);
        return _0x2e456.sendMessage(_0x27c1ed, {
          text: STATUS.SUCCESS + " *Removed from filter:* " + _0x2c6062 + '\x0a' + (_0x2c7753.users?.length ? '_' + _0x2c7753.users.length + '\x20user(s)\x20still\x20in\x20list._' : "_Filter cleared — chatbot replies to everyone._"),
          mentions: _0x4b1136
        }, {
          quoted: _0x3780d3
        });
      }
    }
    return _0x2e456.sendMessage(_0x27c1ed, {
      text: STATUS.ERROR + " Unknown option: *" + _0x250945 + "*\nUse `" + _0x4a93e1 + 'chatbot`\x20to\x20see\x20all\x20commands.'
    }, {
      quoted: _0x3780d3
    });
  }
};
