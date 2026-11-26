import _0x17ac1b from 'fs';
import {getConfigBotId} from '../../lib/database.js';
const DB_PATH = "./data/bot.sqlite";
function fmtSize(_0xc0c335) {
  if (_0xc0c335 < 1024) return _0xc0c335 + '\x20B';
  if (_0xc0c335 < 1024 * 1024) return (_0xc0c335 / 1024).toFixed(1) + " KB";
  return (_0xc0c335 / 1024 / 1024).toFixed(2) + " MB";
}
function safeParseVal(_0x5d6a1f) {
  try {
    return JSON.parse(_0x5d6a1f);
  } catch {
    return _0x5d6a1f;
  }
}
async function readTable(_0x14c137) {
  try {
    const {default: _0x30e8ef} = await import("better-sqlite3"), _0x38c916 = new _0x30e8ef(DB_PATH, {
      readonly: true
    }), _0x53989c = _0x38c916.prepare('SELECT\x20*\x20FROM\x20' + _0x14c137 + " ORDER BY bot_id, key").all();
    return (_0x38c916.close(), _0x53989c);
  } catch {
    return null;
  }
}
function safeReadJSON(_0x523933) {
  try {
    if (_0x17ac1b.existsSync(_0x523933)) return JSON.parse(_0x17ac1b.readFileSync(_0x523933, 'utf8'));
  } catch {}
  return null;
}
export default {
  name: "dbcheck",
  aliases: ['db', "dbstatus"],
  category: 'owner',
  ownerOnly: true,
  desc: "Show all settings stored in SQLite and JSON fallback files",
  async execute(_0x549a32, _0x133133, _0x422a73, _0x285289) {
    const _0x4defac = _0x133133.key.remoteJid, _0x207e0c = _0x285289 || '/', _0xbf6f81 = (() => {
      try {
        return getConfigBotId() || "unknown";
      } catch {
        return "unknown";
      }
    })();
    let _0x438dbd = "not found";
    try {
      _0x438dbd = fmtSize(_0x17ac1b.statSync(DB_PATH).size);
    } catch {}
    const _0x110fb7 = {
      file: DB_PATH,
      size: _0x438dbd,
      active_bot_id: _0xbf6f81
    }, _0x8fb325 = await readTable('bot_configs'), _0x29d1b7 = {};
    if (_0x8fb325) for (const _0x23a8ef of _0x8fb325) {
      if (!_0x29d1b7[_0x23a8ef.bot_id]) _0x29d1b7[_0x23a8ef.bot_id] = {};
      _0x29d1b7[_0x23a8ef.bot_id][_0x23a8ef.key] = safeParseVal(_0x23a8ef.value);
    }
    const _0x223e37 = await readTable("auto_configs"), _0x1fdacc = {};
    if (_0x223e37) for (const _0x211dac of _0x223e37) {
      if (!_0x1fdacc[_0x211dac.bot_id]) _0x1fdacc[_0x211dac.bot_id] = {};
      _0x1fdacc[_0x211dac.bot_id][_0x211dac.key] = safeParseVal(_0x211dac.value);
    }
    const _0xcd3344 = {
      'prefix_config.json': safeReadJSON('prefix_config.json'),
      'bot_mode.json': safeReadJSON("bot_mode.json"),
      'bot_settings.json': safeReadJSON('bot_settings.json'),
      'last_bot_id.json': safeReadJSON("last_bot_id.json"),
      'owner.json': safeReadJSON("owner.json")
    };
    for (const [_0x2e64f2, _0x445f82] of Object.entries(_0xcd3344)) {
      if (_0x445f82 === null) _0xcd3344[_0x2e64f2] = "MISSING";
    }
    const _0xe798ff = {}, _0x202dc0 = ["data/autotyping/config.json", "data/autorecording/config.json", "data/groupqueue.json", "data/exportqueue.json"];
    for (const _0x3cb084 of _0x202dc0) {
      const _0x417ce8 = safeReadJSON(_0x3cb084);
      _0xe798ff[_0x3cb084] = _0x417ce8 !== null ? _0x417ce8 : 'NOT_CREATED';
    }
    let _0x16c6f0 = null;
    try {
      const {default: _0x531f48} = await import('better-sqlite3'), _0x5cffdc = new _0x531f48(DB_PATH, {
        readonly: true
      }), _0xb919ce = _0x5cffdc.prepare('SELECT\x20value\x20FROM\x20bot_configs\x20WHERE\x20key=\x27prefix_config\x27\x20AND\x20bot_id=?').get(_0xbf6f81);
      _0x5cffdc.close();
      if (_0xb919ce) _0x16c6f0 = safeParseVal(_0xb919ce.value)?.prefix ?? null;
    } catch {}
    const _0x1d472d = safeReadJSON("prefix_config.json")?.prefix ?? null, _0x28cf2e = (global.prefix ?? global.CURRENT_PREFIX) ?? null, _0x3997db = _0x16c6f0 !== null && _0x16c6f0 === _0x1d472d && _0x1d472d === _0x28cf2e, _0xe96481 = {
      prefix: {
        db: _0x16c6f0 ?? "NOT_FOUND",
        file: _0x1d472d ?? 'NOT_FOUND',
        memory: _0x28cf2e ?? "NOT_FOUND",
        synced: _0x3997db
      }
    }, _0x3a4cba = {
      db: _0x110fb7,
      bot_configs: _0x8fb325 === null ? "ERROR" : _0x29d1b7,
      auto_configs: _0x223e37 === null ? "ERROR" : Object.keys(_0x1fdacc).length ? _0x1fdacc : {},
      json_files: _0xcd3344,
      data_files: _0xe798ff,
      health: _0xe96481
    }, _0x1a342e = {
      db: _0x3a4cba.db,
      health: _0x3a4cba.health,
      json_files: _0x3a4cba.json_files,
      data_files: _0x3a4cba.data_files
    }, _0x49888d = {
      bot_configs: _0x3a4cba.bot_configs,
      auto_configs: _0x3a4cba.auto_configs
    }, _0x2f8566 = JSON.stringify(_0x1a342e, null, 2), _0x1f3e4a = JSON.stringify(_0x49888d, null, 2);
    (await _0x549a32.sendMessage(_0x4defac, {
      text: '*' + _0x51627b.DATABASE + " VIPBOT — DB Check*\n```\n" + _0x2f8566 + "\n```"
    }, {
      quoted: _0x133133
    }), await _0x549a32.sendMessage(_0x4defac, {
      text: '*' + _0x51627b.CLIPBOARD + " Stored Configs*\n```\n" + _0x1f3e4a + "\n```\n\n_Use " + _0x207e0c + "getsettings for a user-friendly overview_"
    }, {
      quoted: _0x133133
    }));
  }
};
import _0x51627b from '../../lib/emojis.js';
