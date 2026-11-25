import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x4ae213 from 'node-fetch';
import _0x1b1ffa from 'fs';
import _0x253cd7 from 'path';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "logoai",
  alias: ["logogen", 'createlogo', "designlogo"],
  desc: "Generate AI-powered logos with Logo.dev API " + MEDIA.DESIGN,
  category: "Logo",
  usage: ".logoai <company name> --style=modern --color=blue",
  async execute(_0x19b6f8, _0x51375a, _0x45949d) {
    try {
      const _0x85a180 = _0x45949d.join('\x20');
      if (!_0x85a180 || _0x85a180.includes("--help")) return _0x19b6f8.sendMessage(_0x51375a.key.remoteJid, {
        text: "╭─⌈ " + MEDIA.DESIGN + " *AI LOGO GENERATOR* ⌋\n├─⊷ *.logoai <company name>*\n│  └⊷ Generate AI logo\n├─⊷ *.logoai <name> --style=<style>*\n│  └⊷ modern/minimal/vintage/playful\n├─⊷ *.logoai <name> --color=<color>*\n│  └⊷ blue/red/green/purple\n╰⊷ " + getFooter(_0x51375a.key.participant || _0x51375a.key.remoteJid)
      }, {
        quoted: _0x51375a
      });
      const _0x28df7f = process.env.LOGO_DEV_API_KEY;
      if (!_0x28df7f || _0x28df7f === "sk_QV2nWNWwSdu5IgWfLBfcZA") return _0x19b6f8.sendMessage(_0x51375a.key.remoteJid, {
        text: UI.KEY + " *Logo.dev API Key Required*\n━━━━━━━━━━━━━━━━━\n1. Get key from: https://logo.dev\n2. Set as LOGO_DEV_API_KEY in panel\n3. Restart bot"
      }, {
        quoted: _0x51375a
      });
      await _0x19b6f8.sendPresenceUpdate("composing", _0x51375a.key.remoteJid);
      const _0x4f84dc = _0x85a180.split('--')[0].trim(), _0x2ec5b4 = {};
      _0x85a180.split('--').slice(1).forEach(_0x2fac18 => {
        const [_0x43e666, _0x289856] = _0x2fac18.split('=');
        if (_0x43e666 && _0x289856) _0x2ec5b4[_0x43e666.trim()] = _0x289856.trim();
      });
      const _0x5e91b5 = await _0x4ae213("https://api.logo.dev/v1/generate", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          Authorization: "Bearer " + _0x28df7f,
          'User-Agent': 'WolfBot/1.0'
        },
        body: JSON.stringify({
          company_name: _0x4f84dc,
          style: _0x2ec5b4.style || 'modern',
          primary_color: _0x2ec5b4.color || "#3B82F6",
          industry: _0x2ec5b4.industry || "technology",
          variants: 3,
          format: "png"
        })
      });
      if (!_0x5e91b5.ok) {
        const _0x22df33 = await _0x5e91b5.text();
        if (_0x5e91b5.status === 402) return _0x19b6f8.sendMessage(_0x51375a.key.remoteJid, {
          text: UI.CREDIT_CARD + " *Logo.dev Credits Exhausted*\n━━━━━━━━━━━━━━━━━\nYou've used all API credits.\n\n*Pricing:*\n• 10 credits = $9/month\n• 50 credits = $39/month\n• Get more: https://logo.dev/pricing"
        }, {
          quoted: _0x51375a
        });
        if (_0x5e91b5.status === 429) return _0x19b6f8.sendMessage(_0x51375a.key.remoteJid, {
          text: STATUS.LOADING + " *Rate Limited*\nLogo.dev API: 5 logos/minute\nWait 60 seconds."
        }, {
          quoted: _0x51375a
        });
        throw new Error("Logo.dev API Error: " + _0x22df33.substring(0, 100));
      }
      const _0x35a12a = await _0x5e91b5.json();
      if (!_0x35a12a.logos || _0x35a12a.logos.length === 0) return _0x19b6f8.sendMessage(_0x51375a.key.remoteJid, {
        text: STATUS.ERROR + " *No Logos Generated*\nTry different style/color options."
      }, {
        quoted: _0x51375a
      });
      const _0x5e574a = _0x35a12a.logos[0].url, _0x5432cc = await _0x4ae213(_0x5e574a), _0x18e02a = await _0x5432cc.buffer();
      await _0x19b6f8.sendMessage(_0x51375a.key.remoteJid, {
        image: _0x18e02a,
        caption: MEDIA.DESIGN + " *Generated Logo for " + _0x4f84dc + "*\n━━━━━━━━━━━━━━━━━\n*Style:* " + (_0x2ec5b4.style || "modern") + '\x0a*Color:*\x20' + (_0x2ec5b4.color || "blue") + '\x0a*Variants:*\x20' + _0x35a12a.logos.length + " generated\n\n*Commands:*\n.logoai " + _0x4f84dc + " --style=minimal\n.logoai " + _0x4f84dc + " --color=red"
      }, {
        quoted: _0x51375a
      });
    } catch (_0x28fcf3) {
      (console.error("LogoAI Error:", _0x28fcf3), await _0x19b6f8.sendMessage(_0x51375a.key.remoteJid, {
        text: STATUS.ERROR + " *Logo Generation Failed*\n━━━━━━━━━━━━━━━━━\n" + _0x28fcf3.message + "\n\n*Alternative:* Use .brandlogo to fetch existing logos"
      }, {
        quoted: _0x51375a
      }));
    }
  }
};
