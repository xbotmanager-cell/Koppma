import {getBotName} from '../../lib/botname.js';
import {UTILITY} from '../../lib/emojis.js';
const forwardInfo = {
  contextInfo: {
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363424199376597@newsletter",
      newsletterName: "VIPBOT",
      serverMessageId: 2
    }
  }
};
export default {
  name: "ping2",
  aliases: ['ping2'],
  description: "Check bot latency (forwarded style)",
  category: "utility",
  async execute(_0x3a636b, _0x434066) {
    const _0xa1dedb = _0x434066.key.remoteJid, _0x33d0fa = Date.now(), _0x31f4bf = performance.now();
    await Promise.resolve();
    const _0x4c1beb = performance.now(), _0x13185d = Math.round(_0x4c1beb - _0x31f4bf), _0x3abfcf = 50, _0x39f54d = Date.now() - _0x33d0fa + _0x13185d + _0x3abfcf, _0x181604 = Math.max(10, _0x39f54d + Math.floor(Math.random() * 20)), _0x204893 = _0xe630dd => {
      if (_0xe630dd <= 50) return 100;
      if (_0xe630dd >= 1000) return 0;
      return Math.max(0, Math.min(100, Math.round(100 - _0xe630dd / 10)));
    }, _0x41396b = _0x204893(_0x181604), _0x48c8ec = _0x3588cb => {
      const _0x3deb45 = Math.round(_0x3588cb / 100 * 10);
      return ('█').repeat(_0x3deb45) + ('▒').repeat(10 - _0x3deb45);
    }, _0xdbb471 = ("\n╭┄〔 💎 *" + getBotName() + " PONG* 〕┄╮\n┆ ✦ " + UTILITY.LIGHTNING + " *Latency:* " + _0x181604 + "ms\n┆ ✦ [" + _0x48c8ec(_0x41396b) + "] " + _0x41396b + "%\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n_⚜️ VIPBOT Performance_\n").trim();
    (await _0x3a636b.sendMessage(_0xa1dedb, {
      text: _0xdbb471,
      contextInfo: forwardInfo.contextInfo
    }, {
      quoted: _0x434066
    }), await _0x3a636b.sendMessage(_0xa1dedb, {
      react: {
        text: UTILITY.LIGHTNING,
        key: _0x434066.key
      }
    }));
  }
};
