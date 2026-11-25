import {DESIGN} from '../../lib/emojis.js';
import {sendSubMenu, getBotName} from '../../lib/menuHelper.js';
export default {
  name: 'logomenu',
  alias: ["logos", 'logohelp', "logocmds", "designmenu"],
  desc: "Shows logo design commands",
  category: 'Design',
  usage: ".logomenu",
  async execute(_0x50c194, _0x49b9c5, _0x36316d, _0x4acb36) {
    const _0x2a2936 = _0x49b9c5.key.remoteJid, _0x1246fc = getBotName(), _0x38d869 = '╭─⊷\x20*' + DESIGN.MENU_STAR + " PREMIUM METALS*\n│\n│  • goldlogo\n│  • silverlogo\n│  • platinumlogo\n│  • chromelogo\n│  • diamondlogo\n│  • bronzelogo\n│  • steellogo\n│  • copperlogo\n│  • titaniumlogo\n│\n╰─⊷\n\n╭─⊷ *" + DESIGN.MENU_FIRE + " ELEMENTAL EFFECTS*\n│\n│  • firelogo\n│  • icelogo\n│  • iceglowlogo\n│  • lightninglogo\n│  • rainbowlogo\n│  • sunlogo\n│  • moonlogo\n│\n╰─⊷\n\n╭─⊷ *" + DESIGN.MENU_MAGIC + " MYTHICAL & MAGICAL*\n│\n│  • dragonlogo\n│  • phoenixlogo\n│  • wizardlogo\n│  • crystallogo\n│  • darkmagiclogo\n│\n╰─⊷\n\n╭─⊷ *" + DESIGN.MENU_DARK + " DARK & GOTHIC*\n│\n│  • shadowlogo\n│  • smokelogo\n│  • bloodlogo\n│\n╰─⊷\n\n╭─⊷ *" + DESIGN.MENU_GLOW + " GLOW & NEON*\n│\n│  • neonlogo\n│  • glowlogo\n│  • gradientlogo\n│  • matrixlogo\n│  • aqualogo\n│\n╰─⊷";
    await sendSubMenu(_0x50c194, _0x2a2936, "${DESIGN.MENU} LOGO DESIGN MENU", _0x38d869, _0x49b9c5, _0x4acb36);
  }
};
