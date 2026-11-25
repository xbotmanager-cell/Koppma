import _0x37d647 from 'fs';
import {getBotName} from '../../lib/botname.js';
import _0x470adb from 'path';
import {fileURLToPath} from 'url';
import {getWarnLimit as _0x4e7f5e} from '../../lib/warnings-store.js';
import _0x2d9685 from '../../lib/database.js';
import {getStatusAntideleteInfo} from './antideletestatus.js';
import {getAntieditInfo} from './antiedit.js';
import {detectPlatform} from '../../lib/platformDetect.js';
import {isMusicModeEnabled} from '../../lib/musicMode.js';
import {createFadedEffect, createReadMoreEffect, getMenuImageBuffer, sendLoadingMessage, getRAMUsage, formatUptime as _0x1c3cdd, getBotVersion} from '../../lib/menuHelper.js';
const __dirname = _0x470adb.dirname(fileURLToPath(import.meta.url));
function safeReadJSON(_0xf14943) {
  try {
    if (_0x37d647.existsSync(_0xf14943)) return JSON.parse(_0x37d647.readFileSync(_0xf14943, 'utf8'));
  } catch {}
  return null;
}
function getPrefix() {
  if (global.prefix) return global.prefix;
  if (global.CURRENT_PREFIX) return global.CURRENT_PREFIX;
  if (process.env.PREFIX) return process.env.PREFIX;
  return '?';
}
function getPrefixlessStatus() {
  const _0x5912cf = safeReadJSON(_0x470adb.join(__dirname, "../../data/prefix.json"));
  return _0x5912cf?.isPrefixless || false;
}
function getBotMode() {
  const _0x3d686b = safeReadJSON(_0x470adb.join(__dirname, "../../bot_mode.json"));
  return _0x3d686b?.mode || "public";
}
function getMenuStyle() {
  const _0x24c9c9 = safeReadJSON(_0x470adb.join(__dirname, "../menus/current_style.json"));
  return _0x24c9c9?.current || '1';
}
function getMenuLocalFile() {
  const _0xe421f = [_0x470adb.join(process.cwd(), 'data', "vipbot_menu_custom.gif"), _0x470adb.join(process.cwd(), "data", "vipbot_menu_custom.jpg"), _0x470adb.join(process.cwd(), 'data', "wolfbot_menu_custom.gif"), _0x470adb.join(process.cwd(), "data", "wolfbot_menu_custom.jpg"), _0x470adb.join(__dirname, '../menus/media/vipbot.gif'), _0x470adb.join(__dirname, "../menus/media/vipbot.jpg"), _0x470adb.join(__dirname, '../menus/media/wolfbot.gif'), _0x470adb.join(__dirname, "../menus/media/wolfbot.jpg"), _0x470adb.join(__dirname, "../media/vipbot.gif"), _0x470adb.join(__dirname, "../media/vipbot.jpg"), _0x470adb.join(__dirname, "../media/wolfbot.gif"), _0x470adb.join(__dirname, "../media/wolfbot.jpg")];
  for (const _0x5720c6 of _0xe421f) {
    if (_0x37d647.existsSync(_0x5720c6)) return _0x5720c6;
  }
  return null;
}
function _readMenuImageConfig() {
  const _0x5e6809 = [_0x470adb.join(__dirname, "../../data/menuimage.json"), _0x470adb.join(__dirname, '../../data/menu_image.json')];
  for (const _0x575cfb of _0x5e6809) {
    const _0x3bf856 = safeReadJSON(_0x575cfb);
    if (_0x3bf856) return _0x3bf856;
  }
  return null;
}
function getMenuImageStatus() {
  const _0x51fbb4 = _readMenuImageConfig(), _0x39aa7f = getMenuLocalFile(), _0x54993d = _0x39aa7f ? _0x470adb.basename(_0x39aa7f) : null, _0x3ac014 = _0x39aa7f && (_0x39aa7f.includes("vipbot_menu_custom.jpg") || _0x39aa7f.includes('vipbot_menu_custom.gif') || _0x39aa7f.includes("wolfbot_menu_custom.jpg") || _0x39aa7f.includes('wolfbot_menu_custom.gif'));
  if (!_0x51fbb4) {
    if (!_0x39aa7f || !_0x3ac014) return "Default";
    return "Custom (no source info) • " + _0x54993d;
  }
  let _0x2798ca = _0x51fbb4.source;
  if (!_0x2798ca) {
    const _0x4df29d = _0x51fbb4.url || '';
    _0x2798ca = _0x4df29d.startsWith("http") ? "URL" : _0x4df29d || 'unknown';
  }
  const _0x2cc250 = _0x51fbb4.updatedAt ? new Date(_0x51fbb4.updatedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : null, _0x16ec3d = _0x39aa7f ? '\x20•\x20' + _0x54993d + '\x20' + _0x40bec6.SUCCESS : " • " + _0x40bec6.WARNING + " file missing", _0xca9498 = _0x2cc250 ? '\x20[' + _0x2cc250 + ']' : '';
  return 'Custom\x20(' + _0x2798ca + ')' + _0x16ec3d + _0xca9498;
}
function getMenuImageUrlOnly() {
  const _0x2ef338 = _readMenuImageConfig();
  if (!_0x2ef338) return null;
  if (_0x2ef338.url && _0x2ef338.url.startsWith('http')) return _0x2ef338.url;
  if (!_0x2ef338.source && _0x2ef338.url && _0x2ef338.url.startsWith('http')) return _0x2ef338.url;
  return null;
}
function getFooter() {
  const _0x534841 = safeReadJSON(_0x470adb.join(__dirname, "../../data/footer.json"));
  return _0x534841?.footer || getBotName() + " · VIP Edition";
}
function getAutotypingState() {
  const _0x2ec68e = _0x2d9685.getConfigSync?.('autotyping_config', null), _0x543841 = _0x2ec68e && Object.keys(_0x2ec68e).length > 0 ? _0x2ec68e : safeReadJSON(_0x470adb.join(__dirname, "../../data/autotyping/config.json"));
  if (!_0x543841 || !_0x543841.mode || _0x543841.mode === 'off') return "OFF";
  return "ON (" + _0x543841.mode + ')';
}
function getAutorecordingState() {
  const _0x4fada4 = _0x2d9685.getConfigSync?.("autorecording_config", null), _0x3dc4a9 = _0x4fada4 && Object.keys(_0x4fada4).length > 0 ? _0x4fada4 : safeReadJSON(_0x470adb.join(__dirname, "../../data/autorecording/config.json"));
  if (!_0x3dc4a9 || !_0x3dc4a9.mode || _0x3dc4a9.mode === 'off') return "OFF";
  return 'ON\x20(' + _0x3dc4a9.mode + ')';
}
function getAutoreadState() {
  const _0x5f267d = _0x2d9685.getConfigSync?.("autoread_config", null), _0x17b6d1 = _0x5f267d && Object.keys(_0x5f267d).length > 0 ? _0x5f267d : safeReadJSON(_0x470adb.join(__dirname, "../../autoread_settings.json"));
  if (!_0x17b6d1 || !_0x17b6d1.enabled) return 'OFF';
  return "ON (" + (_0x17b6d1.mode || 'both') + ')';
}
function getAutoViewStatusState() {
  const _0x499749 = _0x2d9685.getConfigSync?.("autoview_config", null), _0x577d18 = _0x499749 && Object.keys(_0x499749).length > 0 ? _0x499749 : safeReadJSON(_0x470adb.join(__dirname, '../../data/autoViewConfig.json'));
  if (!_0x577d18) return "OFF";
  return _0x577d18.enabled ? 'ON' : 'OFF';
}
function getAutoDownloadStatusState() {
  const _0x23e1e2 = _0x2d9685.getConfigSync?.("autodownloadstatus_config", null), _0x34cc9f = _0x23e1e2 && Object.keys(_0x23e1e2).length > 0 ? _0x23e1e2 : safeReadJSON(_0x470adb.join(__dirname, '../../data/autoDownloadStatusConfig.json'));
  if (!_0x34cc9f || !_0x34cc9f.enabled) return "OFF";
  return "ON (" + (_0x34cc9f.mode || "private") + ')';
}
function getAutoreplyState() {
  const _0x50824c = _0x2d9685.getConfigSync?.("autoreply_config", null);
  if (!_0x50824c || !_0x50824c.enabled) return "OFF";
  const _0x1e7efd = _0x50824c.message || 'Hello, VIPBOT is online', _0xa6dd11 = _0x1e7efd.length > 35 ? _0x1e7efd.substring(0, 35) + '…' : _0x1e7efd;
  return "ON — \"" + _0xa6dd11 + '\x22';
}
function getAutoreactStatusState() {
  const _0x1d448a = globalThis._autoReactManager, _0x219f36 = _0x1d448a ? _0x1d448a.config : (() => {
    const _0x22b848 = _0x2d9685.getConfigSync?.("autoreact_config", null);
    return _0x22b848 && Object.keys(_0x22b848).length > 0 ? _0x22b848 : safeReadJSON(_0x470adb.join(__dirname, "../../data/autoReactConfig.json"));
  })();
  if (!_0x219f36 || !_0x219f36.enabled) return 'OFF';
  const _0x32bf2f = _0x219f36.mode || 'fixed';
  if (_0x32bf2f === "random") return "ON (random)";
  const _0x1cfcbd = _0x219f36.fixedEmoji || _0x219f36.emoji || '';
  return "ON (fixed" + (_0x1cfcbd ? '\x20' + _0x1cfcbd : '') + ')';
}
function getAnticallState() {
  const _0x3dc65f = safeReadJSON(_0x470adb.join(__dirname, "../../anticall.json"));
  if (!_0x3dc65f) return "OFF";
  const _0x44d2a9 = _0x3dc65f.settings || ({}), _0x5ca7ba = Object.values(_0x44d2a9).find(_0x54879f => _0x54879f?.enabled);
  if (!_0x5ca7ba) return "OFF";
  return "ON (" + (_0x5ca7ba.mode || "decline") + ')';
}
function getAnticallMessage() {
  const _0x17576e = safeReadJSON(_0x470adb.join(__dirname, "../../anticall.json"));
  if (!_0x17576e) return '—';
  const _0x19a600 = _0x17576e.settings || ({}), _0x551830 = Object.values(_0x19a600).find(_0x1e2518 => _0x1e2518?.enabled);
  if (!_0x551830?.autoMessage || !_0x551830?.message) return "None";
  const _0x2a3475 = _0x551830.message;
  return _0x2a3475.length > 38 ? _0x2a3475.substring(0, 38) + '…' : _0x2a3475;
}
function getAntibugState() {
  const _0x1af711 = globalThis._antibugConfig;
  if (!_0x1af711 || typeof _0x1af711 !== "object") return "Not configured";
  const _0x518522 = Object.values(_0x1af711).filter(_0x46ed0e => _0x46ed0e?.enabled);
  if (_0x518522.length === 0) return "OFF";
  return _0x518522.length + '\x20group(s)';
}
function getAntilinkState() {
  const _0x5e4c23 = globalThis._antilinkConfig;
  if (!_0x5e4c23 || typeof _0x5e4c23 !== "object") return "Not configured";
  const _0x45b80c = Object.values(_0x5e4c23).filter(_0xf4cb39 => _0xf4cb39?.enabled);
  if (_0x45b80c.length === 0) return "OFF";
  return _0x45b80c.length + '\x20group(s)';
}
function getAntispamState() {
  const _0x2a40be = globalThis._antispamConfig;
  if (!_0x2a40be || typeof _0x2a40be !== "object") return "Not configured";
  const _0x4ec96e = Object.values(_0x2a40be).filter(_0xe098ba => _0xe098ba?.enabled);
  if (_0x4ec96e.length === 0) return "OFF";
  return _0x4ec96e.length + " group(s)";
}
function getAntiforwardState() {
  const _0x3d5cd1 = globalThis._antiforwardConfig;
  if (!_0x3d5cd1 || typeof _0x3d5cd1 !== "object") return "Not configured";
  const _0x502407 = Object.values(_0x3d5cd1).filter(_0xf9b91f => _0xf9b91f?.enabled);
  if (_0x502407.length === 0) return "OFF";
  const _0x17acad = [...new Set(_0x502407.map(_0x55a313 => (_0x55a313.mode || 'warn').toUpperCase()))];
  return "ON — " + _0x502407.length + " group(s) (" + _0x17acad.join('/') + ')';
}
function getOnlinePresenceState() {
  const _0x10b230 = safeReadJSON(_0x470adb.join(__dirname, "../../data/presence/config.json"));
  if (!_0x10b230 || !_0x10b230.enabled) return "OFF";
  return "ON (" + (_0x10b230.mode || "online") + ')';
}
function getMusicModeState() {
  const _0x16b239 = safeReadJSON(_0x470adb.join(__dirname, "../../data/musicmode.json")), _0x20a14d = global.MUSIC_MODE === true || _0x16b239?.enabled === true;
  if (!_0x20a14d) return "OFF";
  const _0x3e163c = _0x16b239?.songs?.length || 0;
  return 'ON\x20(' + _0x3e163c + " song" + (_0x3e163c !== 1 ? 's' : '') + " in pool)";
}
function getChatbotState() {
  const _0x37af95 = _0x470adb.join(__dirname, "../../data/chatbot");
  try {
    if (!_0x37d647.existsSync(_0x37af95)) return "OFF";
    const _0x13a148 = global.OWNER_CLEAN_NUMBER || global.OWNER_NUMBER || '';
    let _0x271c4e = null;
    if (_0x13a148) _0x271c4e = _0x470adb.join(_0x37af95, "chatbot_config_" + _0x13a148 + ".json");
    if (!_0x271c4e || !_0x37d647.existsSync(_0x271c4e)) {
      const _0xc3b68f = _0x37d647.readdirSync(_0x37af95).filter(_0x5af616 => _0x5af616.startsWith("chatbot_config_") && _0x5af616.endsWith(".json"));
      if (_0xc3b68f.length) _0x271c4e = _0x470adb.join(_0x37af95, _0xc3b68f[0]);
    }
    if (!_0x271c4e || !_0x37d647.existsSync(_0x271c4e)) return "OFF";
    const _0xc5073c = JSON.parse(_0x37d647.readFileSync(_0x271c4e, "utf8")), _0x5f343f = _0xc5073c.mode || "off";
    if (_0x5f343f === "off") return 'OFF';
    const _0x5b3e28 = _0xc5073c.chatbotName || "VIPBOT", _0x5a5c88 = _0xc5073c.preferredModel || "gpt", _0x3956a7 = (_0xc5073c.allowedDMs || []).length, _0x57e112 = (_0xc5073c.allowedGroups || []).length, _0x5e1885 = [];
    if (_0x3956a7) _0x5e1885.push(_0x3956a7 + " DM" + (_0x3956a7 !== 1 ? 's' : ''));
    if (_0x57e112) _0x5e1885.push(_0x57e112 + " group" + (_0x57e112 !== 1 ? 's' : ''));
    return _0x5f343f.toUpperCase() + " | " + _0x5b3e28 + '\x20|\x20' + _0x5a5c88 + (_0x5e1885.length ? " | " + _0x5e1885.join(',\x20') : '');
  } catch {
    return "Error reading config";
  }
}
function getDispState() {
  const _0x397974 = safeReadJSON(_0x470adb.join(__dirname, "../../disp_settings.json"));
  if (!_0x397974) return "OFF";
  const _0x3e8316 = Object.keys(_0x397974).filter(_0x3166b0 => _0x3166b0.endsWith("@g.us") && _0x397974[_0x3166b0]?.enabled), _0x1a4856 = Object.keys(_0x397974).filter(_0xd36711 => !_0xd36711.endsWith("@g.us") && _0x397974[_0xd36711]?.enabled), _0x322ced = [];
  if (_0x3e8316.length) _0x322ced.push(_0x3e8316.length + " group(s)");
  if (_0x1a4856.length) _0x322ced.push(_0x1a4856.length + " DM(s)");
  return _0x322ced.length ? _0x322ced.join('\x20+\x20') : "OFF";
}
async function getWelcomeStatus() {
  try {
    const _0xb58a1a = await _0x2d9685.getConfig("welcome_data", {}), _0xe96e67 = _0xb58a1a?.groups || ({}), _0x52d40f = Object.values(_0xe96e67).filter(_0x4ecbaf => _0x4ecbaf?.enabled === true).length;
    return _0x52d40f ? _0x52d40f + " group(s)" : 'OFF';
  } catch {}
  return "OFF";
}
async function getGoodbyeStatus() {
  try {
    const _0x3544bb = await _0x2d9685.getConfig("goodbye_data", {}), _0x68a8d7 = _0x3544bb?.groups || ({}), _0x5cf788 = Object.values(_0x68a8d7).filter(_0x5bab44 => _0x5bab44?.enabled === true).length;
    return _0x5cf788 ? _0x5cf788 + " group(s)" : "OFF";
  } catch {}
  return 'OFF';
}
async function getJoinApprovalState() {
  try {
    const _0x1d0376 = await _0x2d9685.getConfig("joinapproval_data", {});
    if (!_0x1d0376 || !_0x1d0376.groups) return "OFF";
    const _0x47d8ae = Object.values(_0x1d0376.groups).filter(_0x5eefb6 => _0x5eefb6?.enabled === true);
    return _0x47d8ae.length ? _0x47d8ae.length + " group(s)" : "OFF";
  } catch {}
  return 'OFF';
}
function formatUptime(_0x382073) {
  const _0x1cf51e = Math.floor(_0x382073 / 86400), _0x3d3726 = Math.floor(_0x382073 % 86400 / 3600), _0xfe0cef = Math.floor(_0x382073 % 3600 / 60), _0x26e44e = Math.floor(_0x382073 % 60), _0x546ac8 = [];
  if (_0x1cf51e > 0) _0x546ac8.push(_0x1cf51e + 'd');
  if (_0x3d3726 > 0) _0x546ac8.push(_0x3d3726 + 'h');
  if (_0xfe0cef > 0) _0x546ac8.push(_0xfe0cef + 'm');
  return (_0x546ac8.push(_0x26e44e + 's'), _0x546ac8.join('\x20'));
}
function countCommands(_0x566fd6) {
  let _0x14e495 = 0;
  try {
    const _0x576d0a = _0x37d647.readdirSync(_0x566fd6);
    for (const _0x538a92 of _0x576d0a) {
      const _0x5a6f4d = _0x470adb.join(_0x566fd6, _0x538a92), _0x4ae3cf = _0x37d647.statSync(_0x5a6f4d);
      if (_0x4ae3cf.isDirectory()) _0x14e495 += countCommands(_0x5a6f4d); else {
        if (_0x538a92.endsWith('.js')) _0x14e495++;
      }
    }
  } catch {}
  return _0x14e495;
}
export default {
  name: 'getsettings',
  alias: ['settings', "config", 'botconfig', 'showconfig'],
  description: "View all bot settings and configuration",
  category: 'owner',
  async execute(_0x7e0945, _0x4e4035, _0x110750, _0x20966a, _0x4f5dd2) {
    const _0x5c0652 = _0x4e4035.key.remoteJid, {jidManager: _0x4952e9} = _0x4f5dd2, _0x5be20c = _0x4f5dd2?.isSudo ? _0x4f5dd2.isSudo() : false;
    if (!_0x4952e9.isOwner(_0x4e4035) && !_0x5be20c) return _0x7e0945.sendMessage(_0x5c0652, {
      text: _0x40bec6.ERROR + " *Owner Only Command!*\n\nOnly the bot owner can view settings."
    }, {
      quoted: _0x4e4035
    });
    try {
      const _0x30bc67 = await sendLoadingMessage(_0x7e0945, _0x5c0652, "settings", _0x4e4035), _0x172ceb = getBotName(), _0x137c38 = getBotVersion(), _0xee916d = global.OWNER_CLEAN_NUMBER || global.OWNER_NUMBER || _0x7e0945.user?.id?.split('@')[0] || "Unknown", _0x39a856 = getPrefixlessStatus(), _0x3b886a = _0x39a856 ? 'none' : getPrefix(), _0x2cc3a8 = getBotMode(), _0x1dddb8 = getMenuStyle(), _0x323901 = getMenuImageStatus(), _0x1b94ec = getMenuImageUrlOnly(), _0x54ff03 = getFooter(), _0x1580b5 = getRAMUsage(), _0xcdfe36 = _0x1c3cdd(process.uptime()), _0x146274 = globalThis._loadedCommandCount || countCommands(_0x470adb.join(__dirname, "../../commands")), _0x33de1e = detectPlatform(), _0x3894e4 = getAutotypingState(), _0x3cbe64 = getAutorecordingState(), _0x2a4688 = getAutoreadState(), _0x30262e = getAutoViewStatusState(), _0x1072f1 = getAutoDownloadStatusState(), _0x1cd2d0 = getAutoreactStatusState(), _0x3a4a78 = getAutoreplyState(), _0xcc4a6c = getMusicModeState(), _0x47efbf = getChatbotState(), _0x2437fa = getAnticallState(), _0x423a23 = getAnticallMessage(), _0x5507fe = getAntibugState(), _0x5b615b = getAntilinkState(), _0x522553 = getAntispamState(), _0x380347 = getAntiforwardState(), _0x49ce07 = getOnlinePresenceState(), _0x24ee51 = getDispState(), _0x30279d = _0x4e7f5e("default"), _0xdf6e20 = await getWelcomeStatus(), _0x1278fc = await getGoodbyeStatus(), _0x18a338 = await getJoinApprovalState();
      let _0x1aa11e = "OFF";
      try {
        const _0x4a9170 = await _0x2d9685.getConfig("antidelete_settings", null);
        if (_0x4a9170?.enabled === true) _0x1aa11e = (_0x4a9170.mode || "private").toUpperCase();
      } catch {}
      let _0x3ad9cf = "OFF";
      try {
        const _0x2a10da = await _0x2d9685.getConfig("antidemote_config", null);
        if (_0x2a10da && typeof _0x2a10da === 'object') {
          const _0x2530f7 = Object.values(_0x2a10da).filter(_0x41397b => _0x41397b?.enabled);
          if (_0x2530f7.length) _0x3ad9cf = _0x2530f7.length + '\x20group(s)';
        }
      } catch {}
      let _0x148fdf = "OFF";
      try {
        const _0x456aa9 = safeReadJSON(_0x470adb.join(__dirname, "../../data/antipromote/config.json")) || await _0x2d9685.getConfig("antipromote_config", null);
        if (_0x456aa9 && typeof _0x456aa9 === "object") {
          const _0x358a17 = Object.values(_0x456aa9).filter(_0x383651 => _0x383651?.enabled);
          if (_0x358a17.length) _0x148fdf = _0x358a17.length + " group(s)";
        }
      } catch {}
      let _0x1ef7fd = 'OFF';
      try {
        const _0x2c91c8 = getStatusAntideleteInfo();
        if (_0x2c91c8.enabled) _0x1ef7fd = (_0x2c91c8.mode || "private").toUpperCase();
      } catch {}
      let _0x5a194c = "OFF";
      try {
        const _0x5899be = getAntieditInfo();
        if (_0x5899be.gc.enabled || _0x5899be.pm.enabled) {
          const _0x4187af = _0x5899be.gc.enabled ? _0x5899be.gc.mode.toUpperCase() : "OFF", _0x590a9e = _0x5899be.pm.enabled ? _0x5899be.pm.mode.toUpperCase() : "OFF";
          _0x5a194c = 'GC:\x20' + _0x4187af + " | PM: " + _0x590a9e;
        }
      } catch {}
      let _0x515e41 = "Not set";
      try {
        const _0xa035d6 = await _0x2d9685.getConfig('read_receipts_pref', null);
        if (_0xa035d6?.mode === "all") _0x515e41 = 'ON'; else {
          if (_0xa035d6?.mode === "none") _0x515e41 = "OFF";
        }
      } catch {}
      const _0x3c9070 = "╭──⌈ " + _0x40bec6.SETTINGS + '\x20' + _0x172ceb + '\x20—\x20Settings\x20⌋\x0a┃\x20◆\x20Owner:\x20' + _0xee916d + "\n┃ ◆ Mode: " + _0x2cc3a8.toUpperCase() + "\n┃ ◆ Prefix: [ " + _0x3b886a + '\x20]' + (_0x39a856 ? '\x20+\x20prefixless' : '') + '\x0a┃\x20◆\x20Version:\x20' + _0x137c38 + "\n┃ ◆ Platform: " + _0x33de1e + "\n┃ ◆ Uptime: " + _0xcdfe36 + "\n┃ ◆ RAM: " + _0x1580b5.bar + '\x20' + _0x1580b5.percent + "%\n┃ ◆ Memory: " + _0x1580b5.usedMB + 'MB\x20/\x20' + _0x1580b5.totalMB + "MB\n┃ ◆ Commands: " + _0x146274 + '\x20loaded\x0a╰────────────────', _0x14fe8a = createFadedEffect(_0x3c9070);
      let _0x197d96 = '';
      (_0x197d96 += '╭─⊷\x20*' + _0x40bec6.SETTINGS + '\x20BOT\x20CORE*\x0a', _0x197d96 += "│ ◎ *Bot Name:* " + _0x172ceb + '\x0a', _0x197d96 += "│ ◎ *Owner:* " + _0xee916d + '\x0a', _0x197d96 += "│ ◎ *Prefix:* " + _0x3b886a + (_0x39a856 ? "  *(+ prefixless ON)*" : '') + '\x0a', _0x197d96 += "│ ◎ *Mode:* " + _0x2cc3a8.toUpperCase() + '\x0a', _0x197d96 += "│ ◎ *Menu Style:* " + _0x1dddb8 + '\x0a', _0x197d96 += "│ ◎ *Menu Image:* " + _0x323901 + '\x0a');
      if (_0x1b94ec) {
        const _0xc2e2e4 = _0x1b94ec.length > 50 ? _0x1b94ec.substring(0, 50) + '…' : _0x1b94ec;
        _0x197d96 += "│ ◎ *Menu Image URL:* " + _0xc2e2e4 + '\x0a';
      }
      (_0x197d96 += "│ ◎ *Footer:* " + (_0x54ff03.length > 45 ? _0x54ff03.substring(0, 45) + '…' : _0x54ff03) + '\x0a', _0x197d96 += '│\x20◎\x20*Timezone:*\x20' + (globalThis._timezone || "UTC") + '\x0a', _0x197d96 += "│ ◎ *Read Receipts:* " + _0x515e41 + '\x0a', _0x197d96 += "│ ◎ *Online Presence:* " + _0x49ce07 + '\x0a', _0x197d96 += "│ ◎ *Disappearing Msgs:* " + _0x24ee51 + '\x0a', _0x197d96 += "╰──────────────\n\n", _0x197d96 += "╭─⊷ *" + _0x40bec6.MUSIC + '\x20AUTOMATION*\x0a', _0x197d96 += "│ ◎ *Autotyping:* " + _0x3894e4 + '\x0a', _0x197d96 += '│\x20◎\x20*Autorecording:*\x20' + _0x3cbe64 + '\x0a', _0x197d96 += "│ ◎ *Autoread:* " + _0x2a4688 + '\x0a', _0x197d96 += '│\x20◎\x20*Auto\x20View\x20Status:*\x20' + _0x30262e + '\x0a', _0x197d96 += "│ ◎ *Auto Download Status:* " + _0x1072f1 + '\x0a', _0x197d96 += "│ ◎ *Autoreact Status:* " + _0x1cd2d0 + '\x0a', _0x197d96 += "│ ◎ *Autoreply:* " + _0x3a4a78 + '\x0a', _0x197d96 += "│ ◎ *Music Mode:* " + _0xcc4a6c + '\x0a', _0x197d96 += "╰──────────────\n\n", _0x197d96 += "╭─⊷ *" + _0x40bec6.BOT + " AI / CHATBOT*\n", _0x197d96 += "│ ◎ *Chatbot:* " + _0x47efbf + '\x0a', _0x197d96 += "╰──────────────\n\n", _0x197d96 += '╭─⊷\x20*' + _0x40bec6.SHIELD + " PROTECTION*\n", _0x197d96 += "│ ◎ *Anticall:* " + _0x2437fa + '\x0a', _0x197d96 += "│ ◎ *Anticall Msg:* " + _0x423a23 + '\x0a', _0x197d96 += "│ ◎ *Antidelete:* " + _0x1aa11e + '\x0a', _0x197d96 += "│ ◎ *Antidelete Status:* " + _0x1ef7fd + '\x0a', _0x197d96 += "│ ◎ *Antiedit:* " + _0x5a194c + '\x0a', _0x197d96 += "│ ◎ *Antilink:* " + _0x5b615b + '\x0a', _0x197d96 += '│\x20◎\x20*Antispam:*\x20' + _0x522553 + '\x0a', _0x197d96 += "│ ◎ *Antiforward:* " + _0x380347 + '\x0a', _0x197d96 += "│ ◎ *Antibug:* " + _0x5507fe + '\x0a', _0x197d96 += "│ ◎ *Antidemote:* " + _0x3ad9cf + '\x0a', _0x197d96 += '│\x20◎\x20*Antipromote:*\x20' + _0x148fdf + '\x0a', _0x197d96 += "│ ◎ *Warn Limit:* " + _0x30279d + '\x0a', _0x197d96 += '╰──────────────\x0a\x0a', _0x197d96 += '╭─⊷\x20*' + _0x40bec6.PEOPLE + " GROUP FEATURES*\n", _0x197d96 += "│ ◎ *Welcome:* " + _0xdf6e20 + '\x0a', _0x197d96 += '│\x20◎\x20*Goodbye:*\x20' + _0x1278fc + '\x0a', _0x197d96 += "│ ◎ *Join Approval:* " + _0x18a338 + '\x0a', _0x197d96 += "╰──────────────\n\n", _0x197d96 += '╭─⊷\x20*' + _0x40bec6.CHART + " BOT STATS*\n", _0x197d96 += '│\x20◎\x20*Uptime:*\x20' + _0xcdfe36 + '\x0a', _0x197d96 += "│ ◎ *RAM:* " + _0x1580b5.usedMB + "MB / " + _0x1580b5.totalMB + "MB (" + _0x1580b5.percent + '%)\x0a', _0x197d96 += "│ ◎ *Commands:* " + _0x146274 + '\x0a', _0x197d96 += "│ ◎ *Node:* " + process.version + '\x0a', _0x197d96 += "│ ◎ *Platform:* " + _0x33de1e + '\x0a', _0x197d96 += "│ ◎ *OS:* " + process.platform + '\x20' + process.arch + '\x0a', _0x197d96 += "╰──────────────\n", _0x197d96 += '\x0a' + _0x40bec6.U1F552 + " *Updated:* " + new Date().toLocaleString() + '\x0a', _0x197d96 += '\x0a' + getFooter(_0x4e4035.key.participant || _0x4e4035.key.remoteJid));
      const _0x4f9ccf = createReadMoreEffect(_0x14fe8a, _0x197d96), _0x5723f9 = await getMenuImageBuffer();
      _0x5723f9 ? _0x5723f9.type === "gif" && _0x5723f9.mp4Buffer ? await _0x7e0945.sendMessage(_0x5c0652, {
        video: _0x5723f9.mp4Buffer,
        gifPlayback: true,
        caption: _0x4f9ccf,
        mimetype: "video/mp4"
      }, {
        quoted: _0x30bc67
      }) : await _0x7e0945.sendMessage(_0x5c0652, {
        image: _0x5723f9.buffer,
        caption: _0x4f9ccf,
        mimetype: "image/jpeg"
      }, {
        quoted: _0x30bc67
      }) : await _0x7e0945.sendMessage(_0x5c0652, {
        text: _0x4f9ccf
      }, {
        quoted: _0x30bc67
      });
    } catch (_0x5c2ff6) {
      (console.error("[GetSettings] Error:", _0x5c2ff6), await _0x7e0945.sendMessage(_0x5c0652, {
        text: _0x40bec6.ERROR + " Failed to load settings: " + _0x5c2ff6.message
      }, {
        quoted: _0x4e4035
      }));
    }
  }
};
import _0x40bec6 from '../../lib/emojis.js';
