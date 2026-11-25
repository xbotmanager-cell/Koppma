import {getButtonCommandList} from '../../lib/commandButtons.js';
import {isButtonModeEnabled} from '../../lib/buttonMode.js';
import {getBotName} from '../../lib/botname.js';
import {getOwnerName, getFooter, getMenuMedia} from '../../lib/menuHelper.js';
import {GROUP} from '../../lib/emojis.js';
export default {
  name: "buttonmenu",
  alias: ["menubutton", 'btnmenu', "menubtn", 'buttonlist', "btnlist"],
  category: "Menu",
  desc: "List all commands with interactive button support",
  usage: ".buttonmenu [category]",
  async execute(_0x421f14, _0x53c9d9, _0x2ac4b7, _0x4e3747) {
    try {
      const _0x293685 = _0x53c9d9.key.remoteJid, _0x3261ed = _0x4e3747 || '.';
      let _0x1e8374 = [];
      try {
        _0x1e8374 = getButtonCommandList() || [];
      } catch (_0x4a9491) {
        console.error("Error getting button command list:", _0x4a9491);
      }
      const _0x18849d = isButtonModeEnabled ? isButtonModeEnabled() ? GROUP.ONLINE + " ACTIVE" : GROUP.OFFLINE + " INACTIVE" : GROUP.WHITE + " UNKNOWN", _0x38f0c6 = getBotName ? getBotName() : "VIPBOT";
      (await _0x421f14.sendMessage(_0x293685, {
        text: "buttonmenu loading..."
      }, {
        quoted: _0x53c9d9
      }), await new Promise(_0x38d593 => setTimeout(_0x38d593, 800)));
      const _0x21011a = {
        downloaders: ["play", "song", "video", "tiktok", "instagram", "facebook", 'twitter', "tgsticker", "apk", 'mediafire', 'downloadurl', "gdrive", "spotify", "soundcloud", "pinterest", "reddit", "snack", 'likee', 'capcut'],
        ai: ["chatgpt", "gpt", "gemini", "gemma", "bard", 'claude', "claudeai", 'copilot', 'bing', "blackbox", "cohere", "llama", 'mistral', "perplexity", "venice", 'wormgpt', 'kimi', "glm", "deepseekv4", "analyze", 'flux', "imagine", "vision", "art", 'real', "imagegen", 'remini', "logo", 'brandlogo', "companylogo", "textlogo", "wolf"],
        group: ["kick", "remove", "promote", 'demote', "mute", "unmute", 'ban', 'unban', "warn", "antilink", "antispam", 'antibug', "welcome", "goodbye", "setdesc", "setname", "invite", "revoke", "tagall", "tagadmin", "groupinfo", "creategroup", "approveall"],
        utility: ['ping', 'translate', "weather", "screenshot", "shorturl", "qrencode", 'define', "wiki", 'news', 'covid', "time", "alive", 'uptime', "prefix", "fetch", "npm", "take", "quoted", "save", 'vcf'],
        media: ['8d', "bassboost", "bass", "boost", 'deepbass', 'superboost', "treble", 'trebleboost', "vocalboost", "nightcore", 'reverb', "echo", "slow", 'fast', "speed", 'reverse', "baby", "demon", "robot", "jarvis", 'monster', "radio", "telephone", "underwater", "karaoke", "tts", "toaudio", "tovideo", 'togif', "toimage", "tosticker", 'tovoice'],
        fun: ["rps", "coinflip", "roll", "dice", "quiz", "trivia", "ttt", "slot", "truth", 'dare', "ship", "rate", "insult", "advice", 'gaymeter', "roast", "joke", 'meme', "fact", 'quote', 'waifu', 'neko', "hug", "kiss", 'pat', "slap", "bonk", "wink", "wave", "bite", "bully", 'yeet', "cuddle", "poke", "awoo", "trap"],
        owner: ["mode", 'block', "unblock", "setprefix", "setbotname", "restart", 'shutdown', "clearcache", "anticall", 'antidelete', "antiedit", "autorec", "autoread", "autotyping", "autorecording", "autoreact", "autoviewstatus", "autobio", 'blockdetect', "silent", "online", "repo", "owner", 'disk', "start", 'setpp', "pair"],
        sports: ["football", "basketball", "cricket", 'tennis', 'f1', "baseball", "hockey", 'mma', "nfl", 'golf'],
        stalker: ["gitstalk", 'igstalk', "tiktokstalk", "twitterstalk", "ipstalk", "npmstalk"]
      };
      if (_0x2ac4b7 && _0x2ac4b7[0]) {
        const _0x2b0c04 = _0x2ac4b7[0].toLowerCase(), _0x46c754 = Object.keys(_0x21011a);
        if (!_0x21011a[_0x2b0c04]) {
          await _0x421f14.sendMessage(_0x293685, {
            text: "╭┄〔 " + GROUP.ERROR + " *UNKNOWN CATEGORY* 〕┄╮\n┆\n┆ ✦ Available: " + _0x46c754.join(', ') + "\n┆ ✦ Usage: *" + _0x3261ed + "buttonmenu " + _0x46c754[0] + "*\n╰┄ " + getFooter(_0x53c9d9.key.participant || _0x53c9d9.key.remoteJid)
          }, {
            quoted: _0x53c9d9
          });
          return;
        }
        const _0x23bf3c = _0x1e8374.filter(_0x5e25f5 => _0x21011a[_0x2b0c04].includes(_0x5e25f5.name));
        let _0x454ad8 = "╭┄〔 " + GROUP.RADIO_BUTTON + " *BUTTON COMMANDS: " + _0x2b0c04.toUpperCase() + "* 〕┄╮\n┆\n";
        (_0x23bf3c.forEach(_0x4b7d21 => {
          _0x454ad8 += "┆ ✦ *" + _0x3261ed + _0x4b7d21.name + '*';
          if (_0x4b7d21.aliases && _0x4b7d21.aliases.length > 0) _0x454ad8 += ' (' + _0x4b7d21.aliases.join(', ') + ')';
          _0x454ad8 += "\n┆   ◦ " + (_0x4b7d21.btnLabels || "No description") + '\n';
        }), _0x454ad8 += "┆\n┆ ✦ *" + _0x23bf3c.length + "* commands in " + _0x2b0c04 + "\n┆ ✦ Button Mode: " + _0x18849d + "\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯", await _0x421f14.sendMessage(_0x293685, {
          text: _0x454ad8
        }, {
          quoted: _0x53c9d9
        }));
        return;
      }
      let _0x544222 = _0x1e8374.length, _0x446050 = 0;
      _0x1e8374.forEach(_0x456380 => _0x446050 += _0x456380.aliases ? _0x456380.aliases.length : 0);
      let _0xdfd9f7 = "╭┄〔 " + GROUP.RADIO_BUTTON + " *" + _0x38f0c6 + " BUTTON MENU* 〕┄╮\n\n";
      (_0xdfd9f7 += "╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮\n", _0xdfd9f7 += "┆ Button Mode: " + _0x18849d + "\n", _0xdfd9f7 += "┆ Total Commands: *" + _0x544222 + "* (+" + _0x446050 + " aliases)\n", _0xdfd9f7 += "╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n");
      for (const [_0x273739, _0x25325f] of Object.entries(_0x21011a)) {
        const _0x1ad2dc = _0x1e8374.filter(_0x57ddbd => _0x25325f.includes(_0x57ddbd.name));
        if (_0x1ad2dc.length === 0) continue;
        const _0x1e91c7 = _0x273739 === "downloaders" ? GROUP.DOWNLOAD : _0x273739 === 'ai' ? GROUP.BOT : _0x273739 === "group" ? GROUP.HOME : _0x273739 === "utility" ? GROUP.TOOL : _0x273739 === "media" ? GROUP.MUSIC : _0x273739 === "fun" ? GROUP.SMILE : _0x273739 === "owner" ? GROUP.CROWN : _0x273739 === "sports" ? GROUP.CELEBRATE : GROUP.SEARCH;
        (_0xdfd9f7 += "╭┄〔 " + _0x1e91c7 + " *" + _0x273739.toUpperCase() + "* (" + _0x1ad2dc.length + ") 〕┄╮\n", _0x1ad2dc.forEach(_0x398ae6 => {
          _0xdfd9f7 += "┆ ✦ " + _0x3261ed + _0x398ae6.name;
          if (_0x398ae6.aliases && _0x398ae6.aliases.length > 0) _0xdfd9f7 += ' [' + _0x398ae6.aliases.join(',') + ']';
          _0xdfd9f7 += '\n';
        }), _0xdfd9f7 += "╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n");
      }
      const _0x118ea3 = new Set(Object.values(_0x21011a).flat()), _0x9808c3 = _0x1e8374.filter(_0x4a3faf => !_0x118ea3.has(_0x4a3faf.name));
      _0x9808c3.length > 0 && (_0xdfd9f7 += "╭┄〔 " + GROUP.PACKAGE + " *OTHER* (" + _0x9808c3.length + ") 〕┄╮\n", _0x9808c3.forEach(_0x152f31 => {
        _0xdfd9f7 += "┆ ✦ " + _0x3261ed + _0x152f31.name + '\n';
      }), _0xdfd9f7 += "╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n");
      (_0xdfd9f7 += "╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮\n", _0xdfd9f7 += "┆ Use *" + _0x3261ed + "buttonmenu <category>*\n", _0xdfd9f7 += "┆ to see button details per category\n", _0xdfd9f7 += "┆\n", _0xdfd9f7 += "┆ Toggle: *" + _0x3261ed + "mode buttons* / *" + _0x3261ed + "mode default*\n", _0xdfd9f7 += "╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n", _0xdfd9f7 += '' + getFooter(_0x53c9d9.key.participant || _0x53c9d9.key.remoteJid));
      try {
        const _0xb1d66b = getMenuMedia ? await getMenuMedia() : null;
        _0xb1d66b && _0xb1d66b.buffer ? _0xb1d66b.type === "gif" && _0xb1d66b.mp4Buffer ? await _0x421f14.sendMessage(_0x293685, {
          video: _0xb1d66b.mp4Buffer,
          gifPlayback: true,
          caption: _0xdfd9f7,
          mimetype: "video/mp4"
        }, {
          quoted: _0x53c9d9
        }) : await _0x421f14.sendMessage(_0x293685, {
          image: _0xb1d66b.buffer,
          caption: _0xdfd9f7,
          mimetype: 'image/jpeg'
        }, {
          quoted: _0x53c9d9
        }) : await _0x421f14.sendMessage(_0x293685, {
          text: _0xdfd9f7
        }, {
          quoted: _0x53c9d9
        });
      } catch (_0x263f01) {
        (console.log("Error sending menu with media, using text fallback:", _0x263f01), await _0x421f14.sendMessage(_0x293685, {
          text: _0xdfd9f7
        }, {
          quoted: _0x53c9d9
        }));
      }
      console.log(GROUP.SUCCESS + '\x20' + _0x38f0c6 + " button menu sent");
    } catch (_0x46ac01) {
      (console.error('Button\x20menu\x20error:', _0x46ac01), await _0x421f14.sendMessage(_0x53c9d9.key.remoteJid, {
        text: GROUP.ERROR + " Error loading button menu: " + _0x46ac01.message
      }, {
        quoted: _0x53c9d9
      }));
    }
  }
};
