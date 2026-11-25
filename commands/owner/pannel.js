import _0xdf74fb from 'os';
import _0xde8029 from 'systeminformation';
import {detectPlatform} from '../../lib/platformDetect.js';
export default {
  name: "panel",
  alias: ["vps", 'server'],
  desc: "Check VPS panel status and system health " + _0x395468.CHART,
  category: "System",
  usage: ".panel [refresh]",
  async execute(_0x1b95f5, _0x6ef006, _0x31f553) {
    try {
      const _0x204a47 = _0x6ef006.key.remoteJid, _0x27fa42 = _0x6ef006.key.participant || _0x6ef006.key.remoteJid;
      await _0x1b95f5.sendPresenceUpdate("composing", _0x204a47);
      const _0x37f61a = process.env.PANEL_URL || "https://wolf-host.xcasper.site", _0xdbe419 = process.uptime(), _0x2f8f0c = Math.floor(_0xdbe419 / (3600 * 24)), _0x567542 = Math.floor(_0xdbe419 % (3600 * 24) / 3600), _0x35d1d6 = Math.floor(_0xdbe419 % 3600 / 60), _0x1d618d = Math.floor(_0xdbe419 % 60), _0x136080 = await _0xde8029.mem(), _0x39ce73 = await _0xde8029.cpu(), _0xa9e2f9 = await _0xde8029.currentLoad(), _0x551c7e = await _0xde8029.fsSize(), _0x2892d1 = await _0xde8029.networkStats(), _0x496999 = process.memoryUsage(), _0x3f98dc = _0x496999.heapUsed / 1024 / 1024, _0x51c98c = _0x496999.heapTotal / 1024 / 1024, _0x3882df = (_0x3f98dc / _0x51c98c * 100).toFixed(1), _0x5cef10 = _0x551c7e.find(_0x3fa52d => _0x3fa52d.mount === '/') || _0x551c7e[0], _0x39182c = _0x5cef10 ? (_0x5cef10.used / 1024 / 1024 / 1024).toFixed(1) : 0, _0x3aac4e = _0x5cef10 ? (_0x5cef10.size / 1024 / 1024 / 1024).toFixed(1) : 0, _0x3992d2 = _0x5cef10 ? (_0x5cef10.used / _0x5cef10.size * 100).toFixed(1) : 0, _0x52fcef = await _0xde8029.networkConnections(), _0x4b8aef = _0x52fcef.filter(_0x40f3ae => _0x40f3ae.state === "ESTABLISHED" || _0x40f3ae.state === "LISTEN").length;
      let _0x351076 = _0x395468.ERROR + " Offline", _0x2b86f0 = "∞ ms", _0x521dc8 = "Panel unreachable";
      try {
        const _0xc552b2 = Date.now(), _0x1f2823 = await import("net"), _0x473b03 = new _0x1f2823.Socket(), _0x6fa033 = new URL(_0x37f61a).hostname, _0xbc40e2 = new Promise((_0x23d189, _0x442627) => setTimeout(() => _0x442627(new Error("Timeout")), 5000)), _0x2327fa = new Promise(_0x2cdb46 => {
          (_0x473b03.connect(443, _0x6fa033, () => {
            (_0x473b03.destroy(), _0x2cdb46(true));
          }), _0x473b03.on("error", () => {
            (_0x473b03.destroy(), _0x2cdb46(false));
          }));
        }), _0x34c34d = await Promise.race([_0x2327fa, _0xbc40e2]).catch(() => false), _0x11f652 = Date.now();
        _0x34c34d ? (_0x351076 = _0x395468.SUCCESS + " Online", _0x2b86f0 = _0x11f652 - _0xc552b2 + '\x20ms', _0x521dc8 = "HTTPS accessible") : (_0x351076 = _0x395468.WARNING + " Limited", _0x521dc8 = "Port 443 timeout");
      } catch (_0x37a2f3) {
        (console.log("Panel check failed:", _0x37a2f3.message), _0x521dc8 = "Check error: " + _0x37a2f3.message.substring(0, 30));
      }
      let _0x491d4a = "N/A";
      try {
        const _0x38e893 = await _0xde8029.cpuTemperature();
        _0x491d4a = _0x38e893.main ? _0x38e893.main + '°C' : "N/A";
      } catch (_0x4f8c78) {
        _0x491d4a = "Unavailable";
      }
      const _0x19eb2b = (await _0xde8029.processes()).list.length, _0x6f5259 = _0xdf74fb.uptime(), _0x1eaf53 = Math.floor(_0x6f5259 / (3600 * 24)), _0x2723c7 = Math.floor(_0x6f5259 % (3600 * 24) / 3600), _0xff959c = ('\x0a' + _0x395468.SCREEN + " *VIPBOT PANEL STATUS*\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n\n" + _0x395468.CHART + " *System Overview*\n• *Panel:* " + _0x351076 + "\n• *Latency:* " + _0x2b86f0 + "\n• *Status:* " + _0x521dc8 + '\x0a\x0a' + _0x395468.TIMER + " *Uptime*\n• *Bot:* " + _0x2f8f0c + 'd\x20' + _0x567542 + 'h\x20' + _0x35d1d6 + "m\n• *System:* " + _0x1eaf53 + 'd\x20' + _0x2723c7 + 'h\x0a•\x20*Started:*\x20' + new Date(Date.now() - _0xdbe419 * 1000).toLocaleTimeString() + '\x0a\x0a' + _0x395468.SAVE + " *Memory Usage*\n• *Process:* " + _0x3f98dc.toFixed(2) + " MB (" + _0x3882df + "%)\n• *System:* " + (_0x136080.used / 1024 / 1024 / 1024).toFixed(2) + " GB / " + (_0x136080.total / 1024 / 1024 / 1024).toFixed(2) + '\x20GB\x0a•\x20*Available:*\x20' + (_0x136080.available / 1024 / 1024 / 1024).toFixed(2) + " GB\n\n" + _0x395468.LIGHTNING + " *CPU Performance*\n• *Load:* " + _0xa9e2f9.currentLoad.toFixed(1) + "% (" + _0xa9e2f9.avgLoad.toFixed(2) + " avg)\n• *Cores:* " + _0x39ce73.cores + " cores @ " + _0x39ce73.speed + " GHz\n• *Temp:* " + _0x491d4a + '\x0a\x0a' + _0x395468.OPTICAL_DISK + '\x20*Storage*\x0a•\x20*Disk:*\x20' + _0x39182c + " GB / " + _0x3aac4e + " GB (" + _0x3992d2 + "%)\n• *Mount:* " + (_0x5cef10?.mount || '/') + '\x0a\x0a' + _0x395468.GLOBE + " *Network*\n• *Connections:* " + _0x4b8aef + " active\n• *Processes:* " + _0x19eb2b + '\x20running\x0a•\x20*Platform:*\x20' + detectPlatform() + '\x0a\x0a' + _0x395468.PERSON + '\x20*User:*\x20@' + _0x27fa42.split('@')[0] + '\x0a' + _0x395468.TIMEOUT + '\x20*Time:*\x20' + new Date().toLocaleTimeString() + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + _0x395468.INFO + " *Tip:* Use `.panel refresh` to update\n").trim();
      let _0x29059f = 'https://raw.githubusercontent.com/peace-amani/norah/main/commands/menus/media/vipbot.jpg', _0x457f8c = "VIPBOT", _0x3fd8aa = "https://github.com/peace-amani/norah";
      try {
        const _0xceab82 = process.env.GITHUB_AVATAR_CACHE;
        _0xceab82 && (_0x29059f = _0xceab82);
      } catch (_0x3d96a6) {}
      const _0x165949 = _0x351076.includes('' + _0x395468.SUCCESS) ? '' + _0x395468.ONLINE : _0x351076.includes('' + _0x395468.WARNING) ? '' + _0x395468.PENDING : '' + _0x395468.OFFLINE;
      (await _0x1b95f5.sendMessage(_0x204a47, {
        text: _0xff959c,
        contextInfo: {
          mentionedJid: [_0x27fa42],
          externalAdReply: {
            title: _0x165949 + '\x20VPS\x20Panel\x20Status',
            body: "Uptime: " + _0x2f8f0c + 'd\x20' + _0x567542 + "h | Load: " + _0xa9e2f9.currentLoad.toFixed(1) + '%',
            mediaType: 1,
            thumbnailUrl: _0x29059f,
            sourceUrl: _0x3fd8aa,
            renderLargerThumbnail: true,
            showAdAttribution: false,
            mediaUrl: ''
          }
        }
      }, {
        quoted: _0x6ef006
      }), console.log(_0x395468.SUCCESS + " Panel status checked - " + _0x351076 + ", Load: " + _0xa9e2f9.currentLoad.toFixed(1) + '%'), _0x31f553[0] === "refresh" && setTimeout(async () => {
        await _0x1b95f5.sendMessage(_0x204a47, {
          text: _0x395468.REFRESH + ' Status refreshed. Use `.panel` again for updated info.'
        }, {
          quoted: _0x6ef006
        });
      }, 1000));
    } catch (_0x2e3bbe) {
      console.error(_0x395468.ERROR + " Panel status error:", _0x2e3bbe);
      const _0x33ce22 = process.uptime(), _0x570c33 = Math.floor(_0x33ce22 / (3600 * 24)), _0x399c4d = Math.floor(_0x33ce22 % (3600 * 24) / 3600), _0x561b71 = Math.floor(_0x33ce22 % 3600 / 60);
      await _0x1b95f5.sendMessage(_0x6ef006.key.remoteJid, {
        text: _0x395468.WARNING + " *Basic System Status*\n\n" + (_0x395468.TIMER + '\x20*Uptime:*\x20' + _0x570c33 + 'd\x20' + _0x399c4d + 'h\x20' + _0x561b71 + 'm\x0a') + (_0x395468.SAVE + " *Memory:* " + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB\n") + (_0x395468.LIGHTNING + '\x20*CPU:*\x20' + _0xdf74fb.cpus().length + " cores\n") + (_0x395468.LOCKED + " *Panel:* Secured check unavailable\n\n") + (_0x395468.WAVE + '\x20@' + (_0x6ef006.key.participant || _0x6ef006.key.remoteJid).split('@')[0]),
        contextInfo: {
          mentionedJid: [_0x6ef006.key.participant || _0x6ef006.key.remoteJid]
        }
      }, {
        quoted: _0x6ef006
      });
    }
  }
};
import _0x395468 from '../../lib/emojis.js';
