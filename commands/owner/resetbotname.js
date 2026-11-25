import {getBotName, saveBotName, clearBotNameCache} from '../../lib/botname.js';
const DEFAULT_NAME = "VIPBOT";
export default {
  name: 'resetbotname',
  alias: ["defaultname", 'dn', 'rbn', "clearbotname", "resettobotname", "restorebotname", "resetname", 'defaultbotname', "clearname", 'removebotname', 'deletename', 'resetbot', "botreset", "name-reset", 'botname-reset'],
  category: 'owner',
  description: "Reset bot name to default (VIPBOT)",
  ownerOnly: true,
  async execute(_0x1b619a, _0x4075dd, _0x2fc5e0, _0x111c4c, _0x48d229) {
    const _0x3c9813 = _0x4075dd.key.remoteJid, {jidManager: _0x4eae65} = _0x48d229, _0x1dc253 = _0x48d229?.isSudo ? _0x48d229.isSudo() : false;
    if (!_0x4eae65.isOwner(_0x4075dd) && !_0x1dc253) return _0x1b619a.sendMessage(_0x3c9813, {
      text: _0x339428.ERROR + " *Owner Only Command!*\n\nOnly the bot owner can reset the bot name."
    }, {
      quoted: _0x4075dd
    });
    try {
      const _0x36ca5b = _0x4075dd.key.participant || _0x3c9813, _0x5a4950 = _0x4eae65.cleanJid(_0x36ca5b), _0x1e471a = getBotName();
      (saveBotName(DEFAULT_NAME), clearBotNameCache(), process.env.BOT_NAME = DEFAULT_NAME);
      let _0xf08fc4 = _0x339428.SUCCESS + " *Bot Name Reset Successfully!*\n";
      (_0xf08fc4 += _0x339428.NOTE + " Previous Name: *" + _0x1e471a + '*\x0a', _0xf08fc4 += _0x339428.REFRESH + " New Name: *" + DEFAULT_NAME + '*\x0a', await _0x1b619a.sendMessage(_0x3c9813, {
        text: _0xf08fc4
      }, {
        quoted: _0x4075dd
      }), console.log(_0x339428.SUCCESS + " Bot name reset from \"" + _0x1e471a + "\" to \"" + DEFAULT_NAME + "\" by " + _0x5a4950.cleanNumber));
    } catch (_0x119352) {
      (console.error("Error resetting bot name:", _0x119352), await _0x1b619a.sendMessage(_0x3c9813, {
        text: _0x339428.ERROR + " Error resetting bot name: " + _0x119352.message
      }, {
        quoted: _0x4075dd
      }));
    }
  }
};
import _0x339428 from '../../lib/emojis.js';
