import {ANIME, STATUS} from '../../lib/emojis.js';
import {sendSubMenu, getBotName} from '../../lib/menuHelper.js';
export default {
  name: "animemenu",
  alias: ['anime', "amenu"],
  desc: "Shows anime reaction commands",
  category: "Anime",
  usage: '.animemenu',
  async execute(_0x46f0fa, _0x14adf5, _0x408c0b, _0x5e6ba0) {
    const _0xac94f = _0x14adf5.key.remoteJid, _0x3abf4b = getBotName(), _0x21af61 = '╭─⊷\x20*' + ANIME.U1F496 + " AFFECTION & LOVE*\n┆\n┆  • cuddle\n┆  • kiss\n┆  • pat\n┆  • lick\n┆  • glomp\n┆  • wink\n┆  • highfive\n┆\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n╭─⊷ *" + ANIME.U1F602 + " FUN & REACTIONS*\n┆\n┆  • awoo\n┆  • bully\n┆  • cringe\n┆  • cry\n┆  • dance\n┆  • yeet\n┆\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n╭─⊷ *" + ANIME.U1F525 + " SPECIAL CHARACTERS*\n┆\n┆  • waifu\n┆  • neko\n┆  • megumin\n┆  • shinobu\n┆\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n╭─⊷ *" + ANIME.U26A0_FE0F + '\x20MISC\x20&\x20ACTION*\x0a┆\x0a┆ \x20•\x20kill\x0a┆ \x20•\x20trap\x0a┆ \x20•\x20trap2\x0a┆ \x20•\x20bj\x0a┆\x0a╰┄ ';
    (await _0x46f0fa.sendMessage(_0xac94f, {
      react: {
        text: STATUS.SUCCESS,
        key: _0x14adf5.key
      }
    }), await sendSubMenu(_0x46f0fa, _0xac94f, ANIME.U1F338 + " Anime Menu", _0x21af61, _0x14adf5, _0x5e6ba0));
  }
};
