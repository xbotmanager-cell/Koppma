import {AUTOMATION} from '../../lib/emojis.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const autoReactConfig = {
  enabled: false,
  emoji: '' + AUTOMATION.U1F602,
  useRandomEmoji: false,
  randomEmojiList: ['' + AUTOMATION.U1F602, '' + AUTOMATION.U1F60D, '' + AUTOMATION.U1F60A, '' + AUTOMATION.U1F44D, '' + AUTOMATION.U1F60E, '' + AUTOMATION.U1F389, '' + AUTOMATION.U2764_FE0F, '' + AUTOMATION.U1F970, '' + AUTOMATION.U1F44F, '' + AUTOMATION.U2728, '' + AUTOMATION.U1F4AF, '' + AUTOMATION.U1F680, '' + AUTOMATION.U1F4AA, '' + AUTOMATION.U1F601, '' + AUTOMATION.U1F525, '' + AUTOMATION.U1F3AF, '⭐', '' + AUTOMATION.U1F64F, '' + AUTOMATION.U1F44C, '' + AUTOMATION.U1F923],
  reactToDMs: true,
  reactToGroups: true,
  reactToCommands: false,
  activeReactions: new Set(),
  botSock: null,
  isHooked: false,
  ownerOnly: true,
  allowedUsers: new Set(),
  maxReactionsPerMinute: 30,
  reactionTimestamps: [],
  cooldown: 1000,
  userCooldowns: new Map(),
  messageHistory: new Map()
};
class AutoReactManager {
  static ["initialize"](_0x34154b) {
    !autoReactConfig.isHooked && _0x34154b && (autoReactConfig.botSock = _0x34154b, this.hookIntoBot(), autoReactConfig.isHooked = true, console.log(AUTOMATION.U1F602 + " Auto-react system initialized (off by default)!"), console.log(AUTOMATION.U2699_FE0F + " Default settings: DMs=" + autoReactConfig.reactToDMs + ',\x20Groups=' + autoReactConfig.reactToGroups + ',\x20Random=' + autoReactConfig.useRandomEmoji));
  }
  static ["hookIntoBot"]() {
    if (!autoReactConfig.botSock || !autoReactConfig.botSock.ev) {
      console.log(AUTOMATION.U26A0_FE0F + " Could not hook into bot events");
      return;
    }
    (autoReactConfig.botSock.ev.on("messages.upsert", async _0x358439 => {
      await this.handleIncomingMessage(_0x358439);
    }), console.log(AUTOMATION.U2705 + " Auto-react successfully hooked into message events"));
  }
  static ['getReactionEmoji']() {
    if (autoReactConfig.useRandomEmoji && autoReactConfig.randomEmojiList.length > 0) {
      const _0x5ee88b = Math.floor(Math.random() * autoReactConfig.randomEmojiList.length);
      return autoReactConfig.randomEmojiList[_0x5ee88b];
    }
    return autoReactConfig.emoji;
  }
  static ["isRateLimited"]() {
    const _0x47593d = Date.now(), _0x28c882 = _0x47593d - 60000;
    autoReactConfig.reactionTimestamps = autoReactConfig.reactionTimestamps.filter(_0x4bb04c => _0x4bb04c > _0x28c882);
    if (autoReactConfig.reactionTimestamps.length >= autoReactConfig.maxReactionsPerMinute) return true;
    return false;
  }
  static ["isUserOnCooldown"](_0x3a6f46) {
    const _0x214a43 = Date.now(), _0x342352 = autoReactConfig.userCooldowns.get(_0x3a6f46);
    if (!_0x342352) return false;
    if (_0x214a43 - _0x342352 < autoReactConfig.cooldown) return true;
    return false;
  }
  static ["cleanupOldData"]() {
    const _0x35c659 = Date.now();
    (autoReactConfig.messageHistory.forEach((_0x579b4f, _0x243b63) => {
      _0x35c659 - _0x579b4f > 5 * 60 * 1000 && (autoReactConfig.activeReactions.delete(_0x243b63), autoReactConfig.messageHistory.delete(_0x243b63));
    }), autoReactConfig.userCooldowns.forEach((_0x218822, _0x5d21b5) => {
      _0x35c659 - _0x218822 > 60000 && autoReactConfig.userCooldowns.delete(_0x5d21b5);
    }));
  }
  static async ['handleIncomingMessage'](_0x20a6b9) {
    try {
      if (!_0x20a6b9 || !_0x20a6b9.messages || _0x20a6b9.messages.length === 0) return;
      const _0xed1e98 = _0x20a6b9.messages[0], _0x3b561b = autoReactConfig.botSock;
      if (!autoReactConfig.enabled) return;
      if (!_0xed1e98 || !_0xed1e98.key || _0xed1e98.key.fromMe) return;
      const _0x2a6af6 = _0xed1e98.key.participant || _0xed1e98.key.remoteJid, _0x455040 = _0xed1e98.key.remoteJid, _0x2ed1f3 = _0xed1e98.key;
      if (!_0x2a6af6 || !_0x455040 || !_0x2ed1f3) return;
      const _0x50ad31 = _0x455040 + '_' + _0x2ed1f3.id;
      autoReactConfig.messageHistory.set(_0x50ad31, Date.now());
      if (autoReactConfig.activeReactions.has(_0x50ad31)) return;
      if (this.isUserOnCooldown(_0x2a6af6)) return;
      if (this.isRateLimited()) {
        console.log(AUTOMATION.U26A0_FE0F + " Rate limited: Too many reactions per minute");
        return;
      }
      const _0x377adf = _0x455040.includes("@g.us"), _0x11ac51 = !_0x377adf;
      if (_0x11ac51 && !autoReactConfig.reactToDMs) return;
      if (_0x377adf && !autoReactConfig.reactToGroups) return;
      let _0x819c3f = '';
      if (_0xed1e98.message) {
        if (_0xed1e98.message.conversation) _0x819c3f = _0xed1e98.message.conversation; else {
          if (_0xed1e98.message.extendedTextMessage?.text) _0x819c3f = _0xed1e98.message.extendedTextMessage.text; else {
            if (_0xed1e98.message.imageMessage?.caption) _0x819c3f = _0xed1e98.message.imageMessage.caption || ''; else {
              if (_0xed1e98.message.videoMessage?.caption) _0x819c3f = _0xed1e98.message.videoMessage.caption || ''; else _0xed1e98.message.documentMessage?.caption && (_0x819c3f = _0xed1e98.message.documentMessage.caption || '');
            }
          }
        }
      }
      const _0x3bfbed = _0x819c3f.trim();
      if (_0x3bfbed.startsWith('.') || _0x3bfbed.startsWith('!') || _0x3bfbed.startsWith('/')) {
        if (!autoReactConfig.reactToCommands) return;
      }
      if (!_0x819c3f && !_0xed1e98.message?.imageMessage && !_0xed1e98.message?.videoMessage && !_0xed1e98.message?.documentMessage) return;
      const _0x25e421 = this.getReactionEmoji();
      autoReactConfig.reactionTimestamps.push(Date.now());
      try {
        (await _0x3b561b.sendMessage(_0x455040, {
          react: {
            text: _0x25e421,
            key: _0x2ed1f3
          }
        }), autoReactConfig.activeReactions.add(_0x50ad31), autoReactConfig.userCooldowns.set(_0x2a6af6, Date.now()), console.log(AUTOMATION.U2705 + " Reacted with " + _0x25e421 + " to message from " + _0x2a6af6.split('@')[0] + " in " + (_0x377adf ? "group" : 'DM')), setTimeout(() => {
          (autoReactConfig.activeReactions.delete(_0x50ad31), autoReactConfig.messageHistory.delete(_0x50ad31));
        }, 5 * 60 * 1000));
      } catch (_0x36dba3) {
        (console.error('Failed\x20to\x20react\x20to\x20message:', _0x36dba3.message || _0x36dba3), autoReactConfig.reactionTimestamps.pop());
      }
      this.cleanupOldData();
    } catch (_0x191ee1) {
      console.error("Auto-react handler error:", _0x191ee1.message || _0x191ee1);
    }
  }
  static ["isAuthorized"](_0x3e6fbd, _0x193d00 = {}) {
    const _0x2421ec = _0x3e6fbd.key.participant || _0x3e6fbd.key.remoteJid;
    if (_0x3e6fbd.key.fromMe) return true;
    if (autoReactConfig.ownerOnly) {
      if (_0x193d00.jidManager) return _0x193d00.jidManager.isOwner(_0x3e6fbd);
      return _0x3e6fbd.key.fromMe;
    }
    if (autoReactConfig.allowedUsers.has(_0x2421ec)) return true;
    if (_0x193d00.jidManager) return _0x193d00.jidManager.isOwner(_0x3e6fbd);
    return false;
  }
  static ["toggle"]() {
    return (autoReactConfig.enabled = !autoReactConfig.enabled, console.log('Auto-react\x20' + (autoReactConfig.enabled ? "ENABLED" : "DISABLED")), autoReactConfig.enabled);
  }
  static ["status"]() {
    const _0x1cba9f = Date.now();
    return (autoReactConfig.reactionTimestamps = autoReactConfig.reactionTimestamps.filter(_0x16d12a => _0x1cba9f - _0x16d12a < 60000), {
      enabled: autoReactConfig.enabled,
      emoji: autoReactConfig.emoji,
      useRandomEmoji: autoReactConfig.useRandomEmoji,
      randomEmojiCount: autoReactConfig.randomEmojiList.length,
      reactToDMs: autoReactConfig.reactToDMs,
      reactToGroups: autoReactConfig.reactToGroups,
      reactToCommands: autoReactConfig.reactToCommands,
      ownerOnly: autoReactConfig.ownerOnly,
      isHooked: autoReactConfig.isHooked,
      activeReactions: autoReactConfig.activeReactions.size,
      userCooldowns: autoReactConfig.userCooldowns.size,
      rateLimit: autoReactConfig.reactionTimestamps.length + '/' + autoReactConfig.maxReactionsPerMinute + " reactions/min"
    });
  }
  static ["isValidEmoji"](_0x2ae14a) {
    if (!_0x2ae14a || !_0x2ae14a.trim()) return false;
    if ((/[a-zA-Z0-9]/).test(_0x2ae14a)) return false;
    return (/\p{Extended_Pictographic}/u).test(_0x2ae14a);
  }
  static ['setEmoji'](_0x5e5216) {
    if (_0x5e5216 && this.isValidEmoji(_0x5e5216) && _0x5e5216.length <= 8) return (autoReactConfig.emoji = _0x5e5216, autoReactConfig.useRandomEmoji = false, true);
    return false;
  }
  static ["toggleRandomEmoji"]() {
    return (autoReactConfig.useRandomEmoji = !autoReactConfig.useRandomEmoji, autoReactConfig.useRandomEmoji);
  }
  static ['setRandomEmojiMode'](_0xd7ff2e) {
    return (autoReactConfig.useRandomEmoji = !!_0xd7ff2e, autoReactConfig.useRandomEmoji);
  }
  static ["setRandomEmojiList"](_0x84b98a) {
    if (Array.isArray(_0x84b98a) && _0x84b98a.length > 0) {
      const _0x41e8cf = _0x84b98a.filter(_0x16afdf => this.isValidEmoji(_0x16afdf) && _0x16afdf.length <= 8);
      if (_0x41e8cf.length > 0) return (autoReactConfig.randomEmojiList = _0x41e8cf, true);
    }
    return false;
  }
  static ['addRandomEmoji'](_0x1ed8ca) {
    if (_0x1ed8ca && this.isValidEmoji(_0x1ed8ca) && _0x1ed8ca.length <= 8 && !autoReactConfig.randomEmojiList.includes(_0x1ed8ca)) return (autoReactConfig.randomEmojiList.push(_0x1ed8ca), true);
    return false;
  }
  static ["removeRandomEmoji"](_0xa9df16) {
    const _0x294a5b = autoReactConfig.randomEmojiList.indexOf(_0xa9df16);
    if (_0x294a5b !== -1) return (autoReactConfig.randomEmojiList.splice(_0x294a5b, 1), true);
    return false;
  }
  static ["clearRandomEmojiList"]() {
    return (autoReactConfig.randomEmojiList = ['' + AUTOMATION.U1F602, '' + AUTOMATION.U1F60D, '' + AUTOMATION.U1F60A, '' + AUTOMATION.U1F44D, '' + AUTOMATION.U1F60E, '' + AUTOMATION.U1F389, '' + AUTOMATION.U2764_FE0F, '' + AUTOMATION.U1F970, '' + AUTOMATION.U1F44F, '' + AUTOMATION.U2728], true);
  }
  static ["toggleDMs"]() {
    return (autoReactConfig.reactToDMs = !autoReactConfig.reactToDMs, autoReactConfig.reactToDMs);
  }
  static ['toggleGroups']() {
    return (autoReactConfig.reactToGroups = !autoReactConfig.reactToGroups, autoReactConfig.reactToGroups);
  }
  static ["toggleCommands"]() {
    return (autoReactConfig.reactToCommands = !autoReactConfig.reactToCommands, autoReactConfig.reactToCommands);
  }
  static ["toggleOwnerOnly"]() {
    return (autoReactConfig.ownerOnly = !autoReactConfig.ownerOnly, autoReactConfig.ownerOnly);
  }
  static ["setBoth"]() {
    return (autoReactConfig.reactToDMs = true, autoReactConfig.reactToGroups = true, {
      dms: true,
      groups: true
    });
  }
  static ["setDMsOnly"]() {
    return (autoReactConfig.reactToDMs = true, autoReactConfig.reactToGroups = false, {
      dms: true,
      groups: false
    });
  }
  static ["setGroupsOnly"]() {
    return (autoReactConfig.reactToDMs = false, autoReactConfig.reactToGroups = true, {
      dms: false,
      groups: true
    });
  }
  static ["addAllowedUser"](_0x4f0be6) {
    return (autoReactConfig.allowedUsers.add(_0x4f0be6), true);
  }
  static ["removeAllowedUser"](_0x2ab8cb) {
    return (autoReactConfig.allowedUsers.delete(_0x2ab8cb), true);
  }
  static ["getAllowedUsers"]() {
    return Array.from(autoReactConfig.allowedUsers);
  }
  static ["clearAllReactions"]() {
    (autoReactConfig.activeReactions.clear(), autoReactConfig.userCooldowns.clear(), autoReactConfig.messageHistory.clear(), autoReactConfig.reactionTimestamps = []);
  }
  static async ["manualReact"](_0xe93b49, _0x127b64, _0x4f81af, _0x5bc781) {
    try {
      if (!_0x5bc781 || !_0x5bc781.id) throw new Error("Invalid message key");
      const _0x1f1b51 = _0x4f81af || this.getReactionEmoji();
      await _0xe93b49.sendMessage(_0x127b64, {
        react: {
          text: _0x1f1b51,
          key: _0x5bc781
        }
      });
      const _0x3a3d56 = _0x127b64 + '_' + _0x5bc781.id;
      return (autoReactConfig.activeReactions.add(_0x3a3d56), autoReactConfig.messageHistory.set(_0x3a3d56, Date.now()), true);
    } catch (_0x546f60) {
      return (console.error("Manual reaction error:", _0x546f60.message || _0x546f60), false);
    }
  }
}
export default {
  name: "autoreact",
  alias: ["autoreaction", "reactauto", "autoemoji", "react", 'ar'],
  desc: "Auto-react to messages with emojis " + AUTOMATION.U1F602 + '\x20(Owner\x20Only)',
  category: "Owner",
  usage: ".autoreact [on/off/set/random/dms/groups/both/status/mode/users]",
  async execute(_0x4e7c96, _0x3c9d59, _0x207620, _0x36be18, _0x3e33ac) {
    try {
      const _0x3e9730 = _0x3c9d59.key.remoteJid, _0x294cfc = _0x3e9730.includes("@g.us");
      !autoReactConfig.isHooked && (AutoReactManager.initialize(_0x4e7c96), console.log(AUTOMATION.U1F602 + " Auto-react system initialized!"));
      const _0x518c96 = AutoReactManager.isAuthorized(_0x3c9d59, _0x3e33ac);
      if (!_0x518c96) {
        const _0x1245e5 = AUTOMATION.U274C + " *Owner Only Command!*\n\nOnly the bot owner can use this command.\n\nCurrent Status: " + (autoReactConfig.enabled ? "${AUTOMATION.U1F7E2} ON" : "${AUTOMATION.U1F534} OFF") + '\x0aEmoji:\x20' + (autoReactConfig.useRandomEmoji ? '${AUTOMATION.U1F3B2}\x20Random' : autoReactConfig.emoji);
        return _0x4e7c96.sendMessage(_0x3e9730, {
          text: _0x1245e5
        }, {
          quoted: _0x3c9d59
        });
      }
      if (_0x207620.length === 0) {
        const _0x89a133 = AutoReactManager.status(), _0x4c4477 = _0x89a133.enabled ? AUTOMATION.U2705 + " *ENABLED*" : AUTOMATION.U274C + " *DISABLED*", _0x5d6b18 = _0x89a133.useRandomEmoji ? AUTOMATION.U1F3B2 + " *Random* (" + _0x89a133.randomEmojiCount + '\x20emojis)' : "Emoji: " + _0x89a133.emoji, _0x2e3f64 = _0x89a133.ownerOnly ? AUTOMATION.U1F512 + " *Owner Only*" : AUTOMATION.U1F30D + " *Public*", _0x3e71e9 = _0x89a133.reactToDMs ? AUTOMATION.U2705 + '\x20DMs' : AUTOMATION.U274C + " DMs", _0x48357c = _0x89a133.reactToGroups ? AUTOMATION.U2705 + '\x20Groups' : AUTOMATION.U274C + " Groups", _0x58f161 = _0x89a133.reactToCommands ? AUTOMATION.U2705 + " Commands" : AUTOMATION.U274C + " Commands";
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: "╭┄〔 " + AUTOMATION.U1F602 + '\x20*AUTO-REACT*\x20 〕┄╮\x0a┆\x0a┆ ' + _0x4c4477 + " | " + _0x5d6b18 + "\n┆ " + _0x3e71e9 + " | " + _0x48357c + " | " + _0x58f161 + "\n┆ Access: " + _0x2e3f64 + "\n┆\n┆ ✦ *" + _0x36be18 + "autoreact on/off*\n┆   └─ Toggle auto-react\n┆ ✦ *" + _0x36be18 + "autoreact set <emoji>*\n┆   └─ Set fixed emoji\n┆ ✦ *" + _0x36be18 + 'autoreact\x20random\x20toggle*\x0a┆ \x20╰┄ \x20Toggle\x20random\x20emoji\x20mode\x0a┆ ✦ *' + _0x36be18 + "autoreact dms/groups/both*\n┆   └─ Toggle reaction targets\n┆ ✦ *" + _0x36be18 + 'autoreact\x20status*\x0a┆ \x20╰┄ \x20Detailed\x20status\x20view\x0a╰───'
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      const _0x4976e5 = _0x207620[0].toLowerCase();
      if (_0x4976e5 === "status" || _0x4976e5 === "info" || _0x4976e5 === "stats") {
        const _0x4eeadb = AutoReactManager.status(), _0x140adf = AutoReactManager.getAllowedUsers();
        let _0x53fced = '╭┄〔 \x20' + AUTOMATION.U1F602 + '\x20*AUTO-REACT\x20STATUS*\x20 〕┄╮\x0a┆\x0a';
        (_0x53fced += '┆ ' + (_0x4eeadb.enabled ? AUTOMATION.U1F7E2 + " ON" : AUTOMATION.U1F534 + '\x20OFF') + " | " + (_0x4eeadb.useRandomEmoji ? AUTOMATION.U1F3B2 + '\x20Random' : AUTOMATION.U1F3AF + " Fixed") + " | " + (_0x4eeadb.useRandomEmoji ? _0x4eeadb.randomEmojiCount + " emojis" : _0x4eeadb.emoji) + '\x0a', _0x53fced += '┆ DMs:\x20' + (_0x4eeadb.reactToDMs ? AUTOMATION.U2705 : AUTOMATION.U274C) + " | Groups: " + (_0x4eeadb.reactToGroups ? AUTOMATION.U2705 : AUTOMATION.U274C) + " | Cmds: " + (_0x4eeadb.reactToCommands ? AUTOMATION.U2705 : AUTOMATION.U274C) + '\x0a', _0x53fced += "┆ Access: " + (_0x4eeadb.ownerOnly ? AUTOMATION.U1F512 + " Owner" : AUTOMATION.U1F30D + '\x20Public') + " | Hooked: " + (_0x4eeadb.isHooked ? AUTOMATION.U2705 : AUTOMATION.U274C) + '\x0a', _0x53fced += "┆ Active: " + _0x4eeadb.activeReactions + " | Rate: " + _0x4eeadb.rateLimit + '\x0a');
        if (_0x4eeadb.useRandomEmoji) {
          const _0x145007 = autoReactConfig.randomEmojiList.slice(0, 10).join('\x20');
          (_0x53fced += "┆ Random: " + _0x145007, autoReactConfig.randomEmojiList.length > 10 && (_0x53fced += '\x20+' + (autoReactConfig.randomEmojiList.length - 10) + " more"), _0x53fced += '\x0a');
        }
        return (_0x140adf.length > 0 && !_0x4eeadb.ownerOnly && (_0x53fced += '┆ Allowed\x20Users:\x20' + _0x140adf.length + '\x0a'), _0x53fced += '┆\x0a', _0x53fced += "┆ ✦ *" + _0x36be18 + "autoreact random on/off*\n┆   └─ Enable or disable random reactions\n", _0x53fced += "┆ ✦ *" + _0x36be18 + "autoreact random add <emoji>*\n┆   └─ Add to random list\n", _0x53fced += "┆ ✦ *" + _0x36be18 + "autoreact random list*\n┆   └─ Show all random emojis\n", _0x53fced += "┆ ✦ *" + _0x36be18 + "autoreact random clear*\n┆   └─ Reset to default list\n", _0x53fced += '┆ ✦ *' + _0x36be18 + "autoreact random toggle*\n┆   └─ Switch random mode on or off\n", _0x53fced += "┆ ✦ *" + _0x36be18 + "autoreact test*\n┆   └─ Test reaction\n", _0x53fced += "╰───", _0x4e7c96.sendMessage(_0x3e9730, {
          text: _0x53fced
        }, {
          quoted: _0x3c9d59
        }));
      }
      if (_0x4976e5 === 'on' || _0x4976e5 === "enable" || _0x4976e5 === "start") {
        (autoReactConfig.enabled = true, console.log(AUTOMATION.U2705 + " Auto-react ENABLED"));
        const _0xc77216 = autoReactConfig.useRandomEmoji ? AUTOMATION.U1F3B2 + '\x20Random\x20Mode' : "Fixed: " + autoReactConfig.emoji;
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U2705 + " *Auto-React ENABLED*\n\nI will now automatically react to messages! " + AUTOMATION.U2728 + '\x0a\x0a' + AUTOMATION.U2699_FE0F + " *Current Settings:*\n• Status: " + AUTOMATION.U1F7E2 + " ON\n• Mode: " + _0xc77216 + '\x0a•\x20DMs:\x20' + (autoReactConfig.reactToDMs ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + "\n• Groups: " + (autoReactConfig.reactToGroups ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + '\x0a•\x20Commands:\x20' + (autoReactConfig.reactToCommands ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + '\x0a\x0a' + AUTOMATION.U1F4A1 + " *Note:* \n- Settings persist while bot is online\n- Reacts to both DMs and groups by default\n- Use commands below to customize"
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === "off" || _0x4976e5 === "disable" || _0x4976e5 === 'stop') {
        (autoReactConfig.enabled = false, console.log(AUTOMATION.U274C + " Auto-react DISABLED"), await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U274C + " *Auto-React DISABLED*\n\nI will no longer auto-react to messages.\n\nUse `" + _0x36be18 + "autoreact on` to enable again."
        }, {
          quoted: _0x3c9d59
        }));
        return;
      }
      if (_0x4976e5 === "set" || _0x4976e5 === 'emoji') {
        if (!_0x207620[1]) return _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U274C + '\x20*Missing\x20Emoji*\x0a\x0aUsage:\x20' + _0x36be18 + "autoreact set <emoji>\n\nExample: " + _0x36be18 + "autoreact set " + AUTOMATION.U1F60D + '\x0a\x0a' + AUTOMATION.U1F4A1 + " This will switch to fixed emoji mode."
        }, {
          quoted: _0x3c9d59
        });
        const _0x54f5cf = _0x207620[1], _0x3f258f = AutoReactManager.setEmoji(_0x54f5cf);
        _0x3f258f ? await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U2705 + '\x20*Emoji\x20Updated*\x0a\x0aNew\x20reaction\x20emoji:\x20' + _0x54f5cf + "\n\nMode switched to: " + AUTOMATION.U1F3AF + '\x20Fixed\x0a\x0aI\x20will\x20now\x20react\x20with\x20' + _0x54f5cf + " to messages!"
        }, {
          quoted: _0x3c9d59
        }) : await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U274C + " *Invalid Emoji*\n\nPlease use a valid single emoji.\n\nExamples: " + AUTOMATION.U1F602 + ',\x20' + AUTOMATION.U2764_FE0F + ',\x20' + AUTOMATION.U1F44D + ',\x20' + AUTOMATION.U1F389 + "\n\nNote: Some custom emojis may not work."
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === 'random' || _0x4976e5 === 'rand') {
        const _0x5730c5 = _0x207620[1]?.toLowerCase();
        if (!_0x5730c5 || _0x5730c5 === "toggle" || _0x5730c5 === 'on' || _0x5730c5 === "off") {
          const _0x291806 = _0x5730c5 === 'on' ? AutoReactManager.setRandomEmojiMode(true) : _0x5730c5 === 'off' ? AutoReactManager.setRandomEmojiMode(false) : AutoReactManager.toggleRandomEmoji();
          let _0x5583a3 = '';
          _0x291806 ? (_0x5583a3 = AUTOMATION.U1F3B2 + " *Random Emoji Mode ENABLED*\n\n", _0x5583a3 += "I will now react with random emojis from my list!\n", _0x5583a3 += "Available emojis: " + autoReactConfig.randomEmojiList.length + '\x0a\x0a', _0x5583a3 += 'Preview:\x20' + autoReactConfig.randomEmojiList.slice(0, 5).join('\x20')) : (_0x5583a3 = AUTOMATION.U1F3AF + " *Fixed Emoji Mode ENABLED*\n\n", _0x5583a3 += 'I\x20will\x20now\x20react\x20with:\x20' + autoReactConfig.emoji + '\x0a\x0a', _0x5583a3 += "Use `" + _0x36be18 + "autoreact set <emoji>` to change the emoji.");
          await _0x4e7c96.sendMessage(_0x3e9730, {
            text: _0x5583a3
          }, {
            quoted: _0x3c9d59
          });
          return;
        }
        if (_0x5730c5 === 'add' && _0x207620[2]) {
          const _0x24e7b6 = _0x207620[2], _0x109079 = AutoReactManager.addRandomEmoji(_0x24e7b6);
          _0x109079 ? await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U2705 + " *Emoji Added to Random List*\n\nAdded " + _0x24e7b6 + '\x20to\x20random\x20emoji\x20list.\x0a\x0aTotal\x20emojis:\x20' + autoReactConfig.randomEmojiList.length + "\n\nPreview: " + autoReactConfig.randomEmojiList.slice(-5).join('\x20')
          }, {
            quoted: _0x3c9d59
          }) : await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U274C + '\x20*Failed\x20to\x20Add\x20Emoji*\x0a\x0aEither\x20the\x20emoji\x20is\x20invalid\x20or\x20already\x20in\x20the\x20list.\x0a\x0aUse\x20a\x20valid\x20single\x20emoji.'
          }, {
            quoted: _0x3c9d59
          });
          return;
        }
        if (_0x5730c5 === "remove" && _0x207620[2]) {
          const _0x22f3d9 = _0x207620[2], _0x2579d5 = AutoReactManager.removeRandomEmoji(_0x22f3d9);
          _0x2579d5 ? await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U2705 + " *Emoji Removed from Random List*\n\nRemoved " + _0x22f3d9 + " from random emoji list.\n\nTotal emojis: " + autoReactConfig.randomEmojiList.length
          }, {
            quoted: _0x3c9d59
          }) : await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U274C + '\x20*Emoji\x20Not\x20Found*\x0a\x0a' + _0x22f3d9 + " was not found in the random emoji list."
          }, {
            quoted: _0x3c9d59
          });
          return;
        }
        if (_0x5730c5 === "list") {
          const _0x2ed915 = autoReactConfig.randomEmojiList;
          let _0x4c7bb6 = AUTOMATION.U1F3B2 + " *Random Emoji List* (" + _0x2ed915.length + " emojis)\n\n";
          for (let _0x134859 = 0; _0x134859 < _0x2ed915.length; _0x134859 += 10) {
            const _0x2be19d = _0x2ed915.slice(_0x134859, _0x134859 + 10);
            _0x4c7bb6 += _0x2be19d.join('\x20') + '\x0a';
          }
          (_0x4c7bb6 += '\x0a' + AUTOMATION.U1F527 + '\x20*Commands:*\x0a', _0x4c7bb6 += "• `" + _0x36be18 + "autoreact random add " + AUTOMATION.U1F618 + '`\x0a', _0x4c7bb6 += "• `" + _0x36be18 + "autoreact random remove " + AUTOMATION.U1F618 + '`\x0a', _0x4c7bb6 += "• `" + _0x36be18 + "autoreact random clear`\n", _0x4c7bb6 += "• `" + _0x36be18 + "autoreact random toggle`", await _0x4e7c96.sendMessage(_0x3e9730, {
            text: _0x4c7bb6
          }, {
            quoted: _0x3c9d59
          }));
          return;
        }
        if (_0x5730c5 === "clear") {
          (AutoReactManager.clearRandomEmojiList(), await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U2705 + " *Random List Reset*\n\nRandom emoji list has been reset to default.\n\nTotal emojis: " + autoReactConfig.randomEmojiList.length + "\n\nDefault list: " + autoReactConfig.randomEmojiList.slice(0, 10).join('\x20')
          }, {
            quoted: _0x3c9d59
          }));
          return;
        }
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: "╭┄〔 " + AUTOMATION.U1F3B2 + " *RANDOM EMOJI* 〕┄╮\n┆\n┆ ✦ *" + _0x36be18 + "autoreact random toggle*\n┆   └─ Toggle random mode\n┆ ✦ *" + _0x36be18 + "autoreact random list*\n┆   └─ Show all emojis\n┆ ✦ *" + _0x36be18 + "autoreact random add <emoji>*\n┆   └─ Add emoji to list\n┆ ✦ *" + _0x36be18 + "autoreact random remove <emoji>*\n┆   └─ Remove emoji from list\n┆ ✦ *" + _0x36be18 + "autoreact random clear*\n┆   └─ Reset to default\n╰┄ " + getFooter(_0x3c9d59.key.participant || _0x3c9d59.key.remoteJid)
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === "dms" || _0x4976e5 === 'dm') {
        const _0x2f019c = AutoReactManager.toggleDMs();
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U1F4AC + " *DM Reactions " + (_0x2f019c ? "ENABLED" : "DISABLED") + "*\n\n" + (_0x2f019c ? "I will now react to messages in DMs! ${AUTOMATION.U1F4AC}" : "I will no longer react to messages in DMs.") + '\x0a\x0a' + AUTOMATION.U1F4CA + " *Current Settings:*\n• DMs: " + (_0x2f019c ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + "\n• Groups: " + (autoReactConfig.reactToGroups ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + "\n• Both: " + (_0x2f019c && autoReactConfig.reactToGroups ? '${AUTOMATION.U2705}\x20YES' : "${AUTOMATION.U274C} NO") + '\x0a\x0a' + AUTOMATION.U26A0_FE0F + " *Note:* Auto-react must be enabled first with `" + _0x36be18 + "autoreact on`"
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === 'groups' || _0x4976e5 === "group") {
        const _0x1e71a9 = AutoReactManager.toggleGroups();
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U1F465 + '\x20*Group\x20Reactions\x20' + (_0x1e71a9 ? "ENABLED" : "DISABLED") + "*\n\n" + (_0x1e71a9 ? "I will now react to messages in groups! ${AUTOMATION.U1F465}" : "I will no longer react to messages in groups.") + '\x0a\x0a' + AUTOMATION.U1F4CA + " *Current Settings:*\n• DMs: " + (autoReactConfig.reactToDMs ? '${AUTOMATION.U2705}\x20ON' : "${AUTOMATION.U274C} OFF") + "\n• Groups: " + (_0x1e71a9 ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + "\n• Both: " + (autoReactConfig.reactToDMs && _0x1e71a9 ? "${AUTOMATION.U2705} YES" : "${AUTOMATION.U274C} NO") + '\x0a\x0a' + AUTOMATION.U26A0_FE0F + " *Note:* Auto-react must be enabled first with `" + _0x36be18 + 'autoreact\x20on`'
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === "both" || _0x4976e5 === 'all') {
        const _0x3013d2 = AutoReactManager.setBoth();
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U2705 + " *Both DMs & Groups Enabled*\n\nI will now react to messages in both DMs and groups! " + AUTOMATION.U1F389 + '\x0a\x0a' + AUTOMATION.U1F4CA + '\x20*Current\x20Settings:*\x0a•\x20DMs:\x20' + AUTOMATION.U2705 + " ON\n• Groups: " + AUTOMATION.U2705 + " ON\n• Commands: " + (autoReactConfig.reactToCommands ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + '\x0a\x0a' + AUTOMATION.U26A0_FE0F + " *Note:* Auto-react must be enabled first with `" + _0x36be18 + "autoreact on`\n\nUse `" + _0x36be18 + 'autoreact\x20dms`\x20or\x20`' + _0x36be18 + "autoreact groups` to toggle individually."
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === "dmsonly" || _0x4976e5 === "onlydms") {
        const _0x17918f = AutoReactManager.setDMsOnly();
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U2705 + " *DMs Only Mode*\n\nI will now react ONLY to messages in DMs (not groups)! " + AUTOMATION.U1F4AC + '\x0a\x0a' + AUTOMATION.U1F4CA + " *Current Settings:*\n• DMs: " + AUTOMATION.U2705 + " ON\n• Groups: " + AUTOMATION.U274C + " OFF\n• Commands: " + (autoReactConfig.reactToCommands ? "${AUTOMATION.U2705} ON" : '${AUTOMATION.U274C}\x20OFF') + '\x0a\x0a' + AUTOMATION.U26A0_FE0F + '\x20*Note:*\x20Auto-react\x20must\x20be\x20enabled\x20first\x20with\x20`' + _0x36be18 + 'autoreact\x20on`'
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === "groupsonly" || _0x4976e5 === "onlygroups") {
        const _0x5287de = AutoReactManager.setGroupsOnly();
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U2705 + " *Groups Only Mode*\n\nI will now react ONLY to messages in groups (not DMs)! " + AUTOMATION.U1F465 + '\x0a\x0a' + AUTOMATION.U1F4CA + '\x20*Current\x20Settings:*\x0a•\x20DMs:\x20' + AUTOMATION.U274C + " OFF\n• Groups: " + AUTOMATION.U2705 + " ON\n• Commands: " + (autoReactConfig.reactToCommands ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + '\x0a\x0a' + AUTOMATION.U26A0_FE0F + " *Note:* Auto-react must be enabled first with `" + _0x36be18 + "autoreact on`"
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === 'commands' || _0x4976e5 === "cmds" || _0x4976e5 === "cmd") {
        const _0x171993 = AutoReactManager.toggleCommands();
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U2328_FE0F + " *Command Reactions " + (_0x171993 ? "ENABLED" : 'DISABLED') + '*\x0a\x0a' + (_0x171993 ? "I will now react to command messages too! ${AUTOMATION.U2328_FE0F}" : "I will skip reacting to command messages.") + '\x0a\x0a' + AUTOMATION.U26A0_FE0F + " *Note:* \n1. Auto-react must be enabled first with `" + _0x36be18 + "autoreact on`\n2. Reacting to commands may cause confusion."
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === 'mode' || _0x4976e5 === "togglemode") {
        const _0x51deae = AutoReactManager.toggleOwnerOnly();
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U1F527 + " *React Mode Changed*\n\nMode: " + (_0x51deae ? "${AUTOMATION.U1F512} *OWNER ONLY*" : "${AUTOMATION.U1F30D} *PUBLIC*") + '\x0a\x0a' + (_0x51deae ? "Only you (owner) can control auto-react now." : "Anyone can use auto-react commands now.\n\n${AUTOMATION.U26A0_FE0F} *Warning:* Public mode may allow others to change settings.") + '\x0a\x0a' + AUTOMATION.U2699_FE0F + " To add specific allowed users:\n• `" + _0x36be18 + "autoreact users add @user`\n• `" + _0x36be18 + "autoreact users list`\n\n" + AUTOMATION.U26A0_FE0F + '\x20*Note:*\x20Auto-react\x20is\x20OFF\x20by\x20default.\x20Enable\x20with\x20`' + _0x36be18 + "autoreact on`"
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === 'users' || _0x4976e5 === "user" || _0x4976e5 === 'allow') {
        const _0xda994a = _0x207620[1]?.toLowerCase();
        if (!_0xda994a || _0xda994a === 'list') {
          const _0x187fda = AutoReactManager.getAllowedUsers();
          let _0x2efd37 = AUTOMATION.U1F465 + " *Allowed Users* (" + _0x187fda.length + ")\n\n";
          return (_0x187fda.length === 0 ? _0x2efd37 += "No users added yet.\n" : _0x187fda.forEach((_0x181dda, _0x3712ca) => {
            _0x2efd37 += _0x3712ca + 1 + '.\x20' + _0x181dda.split('@')[0] + '\x0a';
          }), _0x2efd37 += '\x0a' + AUTOMATION.U1F527 + " *Commands:*\n", _0x2efd37 += "• `" + _0x36be18 + "autoreact users add @user`\n", _0x2efd37 += "• `" + _0x36be18 + "autoreact users remove @user`\n", _0x2efd37 += "• `" + _0x36be18 + "autoreact users clear`\n", _0x4e7c96.sendMessage(_0x3e9730, {
            text: _0x2efd37
          }, {
            quoted: _0x3c9d59
          }));
        }
        if (_0xda994a === 'add' && _0x207620[2]) {
          const _0x3c2d54 = _0x207620[2], _0x14955f = _0x3c2d54.includes('@') ? _0x3c2d54 : _0x3c2d54 + "@s.whatsapp.net";
          (AutoReactManager.addAllowedUser(_0x14955f), await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U2705 + " *User Added*\n\nAdded " + _0x14955f.split('@')[0] + " to allowed users list.\n\nThey can now use auto-react commands when mode is public."
          }, {
            quoted: _0x3c9d59
          }));
          return;
        }
        if (_0xda994a === "remove" && _0x207620[2]) {
          const _0x44c951 = _0x207620[2], _0x1d25d3 = _0x44c951.includes('@') ? _0x44c951 : _0x44c951 + '@s.whatsapp.net';
          (AutoReactManager.removeAllowedUser(_0x1d25d3), await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U2705 + " *User Removed*\n\nRemoved " + _0x1d25d3.split('@')[0] + '\x20from\x20allowed\x20users\x20list.'
          }, {
            quoted: _0x3c9d59
          }));
          return;
        }
        if (_0xda994a === "clear") {
          (autoReactConfig.allowedUsers.clear(), await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U2705 + '\x20*Users\x20Cleared*\x0a\x0aAll\x20allowed\x20users\x20have\x20been\x20removed.'
          }, {
            quoted: _0x3c9d59
          }));
          return;
        }
        await _0x4e7c96.sendMessage(_0x3e9730, {
          text: '╭┄〔 \x20' + AUTOMATION.U1F465 + " *USER MANAGEMENT* 〕┄╮\n┆\n┆ ✦ *" + _0x36be18 + "autoreact users list*\n┆   └─ Show allowed users\n┆ ✦ *" + _0x36be18 + "autoreact users add @user*\n┆   └─ Add allowed user\n┆ ✦ *" + _0x36be18 + 'autoreact\x20users\x20remove\x20@user*\x0a┆ \x20╰┄ \x20Remove\x20allowed\x20user\x0a┆ ✦ *' + _0x36be18 + 'autoreact\x20users\x20clear*\x0a┆ \x20╰┄ \x20Remove\x20all\x20users\x0a╰┄ \x20' + getFooter(_0x3c9d59.key.participant || _0x3c9d59.key.remoteJid)
        }, {
          quoted: _0x3c9d59
        });
        return;
      }
      if (_0x4976e5 === 'test') {
        try {
          const _0x458f11 = _0x207620[1] || AutoReactManager.getReactionEmoji();
          await _0x4e7c96.sendMessage(_0x3e9730, {
            react: {
              text: _0x458f11,
              key: _0x3c9d59.key
            }
          });
          const _0x329a8a = autoReactConfig.useRandomEmoji ? AUTOMATION.U1F3B2 + " Random" : AUTOMATION.U1F3AF + " Fixed (" + autoReactConfig.emoji + ')';
          await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U2705 + " *Test Reaction Sent*\n\nReacted with " + _0x458f11 + " to this command!\n\n" + AUTOMATION.U1F4CA + " *Current Status:*\n• Auto-react: " + (autoReactConfig.enabled ? "${AUTOMATION.U1F7E2} ON" : '${AUTOMATION.U1F534}\x20OFF') + "\n• Emoji Mode: " + _0x329a8a + "\n• DMs: " + (autoReactConfig.reactToDMs ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + "\n• Groups: " + (autoReactConfig.reactToGroups ? "${AUTOMATION.U2705} ON" : "${AUTOMATION.U274C} OFF") + '\x0a\x0a' + AUTOMATION.U1F4A1 + '\x20*Tip:*\x20Settings\x20persist\x20while\x20bot\x20is\x20online!'
          }, {
            quoted: _0x3c9d59
          });
        } catch (_0x251b33) {
          await _0x4e7c96.sendMessage(_0x3e9730, {
            text: AUTOMATION.U274C + " *Test Failed:* " + (_0x251b33.message || "Could not send reaction")
          }, {
            quoted: _0x3c9d59
          });
        }
        return;
      }
      if (_0x4976e5 === "clear" || _0x4976e5 === "reset") {
        (AutoReactManager.clearAllReactions(), await _0x4e7c96.sendMessage(_0x3e9730, {
          text: AUTOMATION.U2705 + " *All Reactions Cleared*\n\nCleared all active reaction tracking and user cooldowns.\n\nAuto-react status: " + (autoReactConfig.enabled ? "${AUTOMATION.U1F7E2} ON" : "${AUTOMATION.U1F534} OFF") + "\n\nTracking reset for new messages."
        }, {
          quoted: _0x3c9d59
        }));
        return;
      }
      await _0x4e7c96.sendMessage(_0x3e9730, {
        text: "╭┄〔 " + AUTOMATION.U1F602 + " *AUTO-REACT* 〕┄╮\n┆\n┆ ✦ *" + _0x36be18 + "autoreact on*\n┆   └─ Enable auto-react\n┆ ✦ *" + _0x36be18 + "autoreact off*\n┆   └─ Disable auto-react\n┆ ✦ *" + _0x36be18 + "autoreact set <emoji>*\n┆   └─ Set fixed emoji\n┆ ✦ *" + _0x36be18 + "autoreact random toggle*\n┆   └─ Toggle random emoji mode\n┆ ✦ *" + _0x36be18 + "autoreact random list*\n┆   └─ Show random emojis\n┆ ✦ *" + _0x36be18 + 'autoreact\x20random\x20add\x20<emoji>*\x0a┆ \x20╰┄ \x20Add\x20to\x20random\x20list\x0a┆ ✦ *' + _0x36be18 + "autoreact dms*\n┆   └─ Toggle DM reactions\n┆ ✦ *" + _0x36be18 + 'autoreact\x20groups*\x0a┆ \x20╰┄ \x20Toggle\x20group\x20reactions\x0a┆ ✦ *' + _0x36be18 + 'autoreact\x20both*\x0a┆ \x20╰┄ \x20React\x20to\x20DMs\x20&\x20groups\x0a┆ ✦ *' + _0x36be18 + "autoreact commands*\n┆   └─ Toggle command reactions\n┆ ✦ *" + _0x36be18 + "autoreact mode*\n┆   └─ Toggle owner-only/public\n┆ ✦ *" + _0x36be18 + "autoreact users*\n┆   └─ Manage allowed users\n┆ ✦ *" + _0x36be18 + "autoreact status*\n┆   └─ Detailed status\n┆ ✦ *" + _0x36be18 + 'autoreact\x20test*\x0a┆ \x20╰┄ \x20Test\x20reaction\x0a┆ ✦ *' + _0x36be18 + "autoreact clear*\n┆   └─ Clear reaction tracking\n╰───"
      }, {
        quoted: _0x3c9d59
      });
    } catch (_0x306356) {
      (console.error("AutoReact command error:", _0x306356), await _0x4e7c96.sendMessage(_0x3c9d59.key.remoteJid, {
        text: AUTOMATION.U274C + " AutoReact command failed: " + _0x306356.message
      }, {
        quoted: _0x3c9d59
      }));
    }
  }
};
