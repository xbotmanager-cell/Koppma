import {DESIGN, STATUS} from '../../lib/emojis.js';
import _0x2d2973 from 'axios';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'logo',
  description: "Create stylish text logos",
  async execute(_0x27766c, _0x2e3f47, _0xa5a665) {
    const _0x412ebb = _0x2e3f47.key.remoteJid;
    try {
      if (_0xa5a665.length === 0) {
        await _0x27766c.sendMessage(_0x412ebb, {
          text: '╭─⌈\x20' + DESIGN.LOGO + " *LOGO MAKER* ⌋\n│\n├─⊷ *logo*\n│  └⊷ " + global.prefix + "logo <text>\n│\n├─⊷ *Other Styles:*\n│  └⊷ " + global.prefix + "neonlogo <text>\n│  └⊷ " + global.prefix + 'firelogo\x20<text>\x0a│\x20\x20└⊷\x20' + global.prefix + 'goldlogo\x20<text>\x0a│\x20\x20└⊷\x20' + global.prefix + "shadowlogo <text>\n│  └⊷ " + global.prefix + "gradientlogo <text>\n│\n├─⊷ *Example:*\n│  └⊷ " + global.prefix + "logo WOLF\n│\n╰⊷ " + getFooter(_0x2e3f47.key.participant || _0x2e3f47.key.remoteJid)
        }, {
          quoted: _0x2e3f47
        });
        return;
      }
      const _0x3d53a2 = _0xa5a665.join('\x20');
      await generateLogo(_0x27766c, _0x412ebb, _0x2e3f47, _0x3d53a2, "default");
    } catch (_0x5b88f6) {
      (console.error(STATUS.ERROR + " [LOGO] ERROR:", _0x5b88f6), await _0x27766c.sendMessage(_0x412ebb, {
        text: '╭─⌈\x20' + STATUS.ERROR + " *ERROR* ⌋\n│\n├─⊷ " + _0x5b88f6.message + "\n│\n╰───"
      }, {
        quoted: _0x2e3f47
      }));
    }
  }
};
