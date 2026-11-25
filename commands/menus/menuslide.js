import {createRequire} from 'module';
import {getOwnerName} from '../../lib/menuHelper.js';
import {getBotName} from '../../lib/botname.js';
import {GROUP} from '../../lib/emojis.js';
const _require = createRequire(import.meta.url);
let giftedBtns;
try {
  giftedBtns = await import('wolfbtns');
} catch {}
const BRAND = () => getOwnerName().toUpperCase(), SLIDES = [{
  icon: GROUP.BOT,
  title: "AI & Models",
  cmds: ["chatgpt", "gemini", "grok", 'deepseek', 'claude', "mistral", "vision", "summarize", 'aimenu']
}, {
  icon: GROUP.VIDEO,
  title: 'Image\x20&\x20Video\x20Gen',
  cmds: ["imagine", "flux", "anime", "art", 'real', 'remini', 'videogen', 'removebg', "imagemenu"]
}, {
  icon: GROUP.SPARKLE,
  title: 'Anime\x20&\x20Fun',
  cmds: ['hug', "pat", "kiss", "waifu", "neko", "dance", "cry", "slap", "cuddle", "hack", 'quote', "joke", "funmenu", "animemenu"]
}, {
  icon: GROUP.SETTINGS,
  title: "Automation",
  cmds: ["autoread", "autoreact", "autotyping", 'autoviewstatus', "autodownloadstatus", "autoreactstatus", 'autorecording', 'automenu']
}, {
  icon: GROUP.ART,
  title: "Design & Logos",
  cmds: ['logo', "firelogo", "neonlogo", "goldlogo", "diamondlogo", "dragonlogo", "rainbowlogo", "brandlogo", "logomenu"]
}, {
  icon: GROUP.DOWNLOAD,
  title: 'Downloaders',
  cmds: ["ytmp3", 'ytmp4', 'ytplay', "tiktok", "instagram", "facebook", 'spotify', 'capcut', "apk", "downloadmenu"]
}, {
  icon: GROUP.LOCK,
  title: "Security & Hacking",
  cmds: ["nmap", "whois", "dnslookup", "sslcheck", "portscan", 'sqlicheck', "xsscheck", "leakcheck", "securitymenu"]
}, {
  icon: GROUP.CAMERA,
  title: "Photo Effects",
  cmds: ["neon", 'text3d', 'graffiti', "hologram", 'metal', "matrix", "gradient", 'photofunia', 'ephotomenu']
}, {
  icon: GROUP.PEOPLE,
  title: 'Group\x20Management',
  cmds: ["antilink", "welcome", "joinapproval", 'onlyadmins', 'kick', "ban", 'tagall', "mute", "promote", "demote", "disp", 'groupmenu']
}, {
  icon: GROUP.MUSIC,
  title: 'Music\x20&\x20Media',
  cmds: ['play', 'song', "lyrics", 'shazam', "tosticker", 'toaudio', "tts", "trim", "musicmenu"]
}, {
  icon: GROUP.NOTE,
  title: 'News\x20&\x20Sports',
  cmds: ["bbcnews", 'technews', "football", 'cricket', "basketball", 'f1', 'tennis', "sportsnews", "sportsmenu"]
}, {
  icon: GROUP.EYE,
  title: "Stalker & Tools",
  cmds: ['igstalk', "gitstalk", "tiktokstalk", "twitterstalk", "movies", "translate", "wiki", "weather", "stalkermenu"]
}, {
  icon: GROUP.ADMIN,
  title: "Owner & Admin",
  cmds: ["restart", 'reload', 'setbotname', "setprefix", 'addsudo', "block", "anticall", "mode", "ownermenu"]
}], TOTAL = SLIDES.length;
function buildSlideText(_0x571850, _0x16265b, _0x11ce63) {
  const _0x574698 = SLIDES[_0x571850], _0x423f64 = ["╭┄〔 " + _0x574698.icon + " *" + _0x574698.title.toUpperCase() + "* 〕┄╮", ..._0x574698.cmds.map(_0x4789d6 => "┆ ✦ " + _0x11ce63 + _0x4789d6), "┆ ◦ Slide *" + (_0x571850 + 1) + "/" + TOTAL + "*", "╰┄ *" + _0x16265b + "* ┄╯"];
  return _0x423f64.join('\n');
}
function buildButtons(_0x3be3f5, _0x5451d6) {
  const _0x5e5b35 = [];
  return (_0x3be3f5 > 0 && _0x5e5b35.push({
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
      display_text: '◀\x20' + SLIDES[_0x3be3f5 - 1].icon + '\x20' + SLIDES[_0x3be3f5 - 1].title,
      id: _0x5451d6 + "menuslide " + _0x3be3f5
    })
  }), _0x3be3f5 < TOTAL - 1 && _0x5e5b35.push({
    name: 'quick_reply',
    buttonParamsJson: JSON.stringify({
      display_text: SLIDES[_0x3be3f5 + 1].icon + '\x20' + SLIDES[_0x3be3f5 + 1].title + '\x20▶',
      id: _0x5451d6 + "menuslide " + (_0x3be3f5 + 2)
    })
  }), _0x5e5b35.push({
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
      display_text: _0x3be3f5 === 0 ? GROUP.CLIPBOARD + " All Categories" : GROUP.HOME + " First Slide",
      id: _0x3be3f5 === 0 ? _0x5451d6 + 'menuslide\x20' + TOTAL : _0x5451d6 + "menuslide 1"
    })
  }), _0x5e5b35);
}
export default {
  name: 'menuslide',
  alias: ["slidemenu", "cmds"],
  description: 'Browse\x20all\x20' + TOTAL + " command categories as interactive slides. Usage: <prefix>menuslide [1-" + TOTAL + ']',
  async execute(_0x51290a, _0x167a2d, _0x28098c) {
    const _0x49868a = _0x167a2d.key.remoteJid, _0x1105e2 = global.prefix || process.env.PREFIX || '.', _0x7eaa99 = getBotName() || BRAND();
    let _0x4e7500 = 0;
    if (_0x28098c[0]) {
      const _0x1d730a = parseInt(_0x28098c[0], 10);
      if (!isNaN(_0x1d730a) && _0x1d730a >= 1 && _0x1d730a <= TOTAL) _0x4e7500 = _0x1d730a - 1;
    }
    const _0x452c41 = buildSlideText(_0x4e7500, _0x7eaa99, _0x1105e2), _0x5061a7 = buildButtons(_0x4e7500, _0x1105e2), _0x2cdb55 = GROUP.WOLF + '\x20' + _0x7eaa99 + " • " + TOTAL + " categories";
    if (giftedBtns) try {
      return await giftedBtns.sendInteractiveMessage(_0x51290a, _0x49868a, {
        text: _0x452c41,
        footer: _0x2cdb55,
        interactiveButtons: _0x5061a7
      });
    } catch {}
    const _0x2aa5e5 = [_0x4e7500 > 0 ? '◀\x20*' + _0x1105e2 + 'menuslide\x20' + _0x4e7500 + '*' : null, _0x4e7500 < TOTAL - 1 ? '▶\x20*' + _0x1105e2 + "menuslide " + (_0x4e7500 + 2) + '*' : null].filter(Boolean).join("   ");
    return _0x51290a.sendMessage(_0x49868a, {
      text: _0x452c41 + (_0x2aa5e5 ? '\x0a\x0a' + _0x2aa5e5 : '')
    }, {
      quoted: _0x167a2d
    });
  }
};
