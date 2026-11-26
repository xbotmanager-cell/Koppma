import {AUTOMATION} from '../../lib/emojis.js';
import {sendSubMenu, getBotName} from '../../lib/menuHelper.js';
export default {
  name: 'automenu',
  alias: ["autocmds", "autohelp", "automationmenu"],
  desc: 'Shows\x20automation\x20commands',
  category: "Automation",
  usage: ".automenu",
  async execute(_0x1258ae, _0x2667f0, _0x33d9ed, _0x11e2d2) {
    const _0x504e7a = _0x2667f0.key.remoteJid, _0x1b6380 = getBotName(), _0x1daa9d = "╭─⊷ *" + AUTOMATION.U2699_FE0F + '\x20AUTOMATION\x20COMMANDS*\x0a┆\x0a┆ \x20•\x20autoread\x0a┆ \x20•\x20autotyping\x0a┆ \x20•\x20autorecording\x0a┆ \x20•\x20autoreact\x0a┆ \x20•\x20autoreactstatus\x0a┆ \x20•\x20autoviewstatus\x0a┆ \x20•\x20autobio\x0a┆ \x20•\x20autorec\x0a┆ \x20•\x20reactowner\x0a┆\x0a╰┄ ';
    await sendSubMenu(_0x1258ae, _0x504e7a, AUTOMATION.U2699_FE0F + " AUTOMATION MENU", _0x1daa9d, _0x2667f0, _0x11e2d2);
  }
};
