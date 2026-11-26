import {getSudoMode, setSudoMode, getSudoCount} from '../../lib/sudo-store.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'sudomode',
  alias: ['sudoonly'],
  category: "owner",
  description: "Enable/disable sudo-only mode (only owner + sudo users can use bot)",
  ownerOnly: true,
  sudoAllowed: false,
  async execute(_0xb70ede, _0x21eb5b, _0x313474, _0x3dac11, _0x2c4a21) {
    const _0x25e76d = _0x21eb5b.key.remoteJid, {jidManager: _0x32a246} = _0x2c4a21;
    if (!_0x32a246.isOwner(_0x21eb5b)) return _0xb70ede.sendMessage(_0x25e76d, {
      text: _0x1ddc5e.ERROR + " *Owner Only Command!*\n\nOnly the bot owner can toggle sudo mode."
    }, {
      quoted: _0x21eb5b
    });
    const _0x87ab00 = getSudoMode();
    if (!_0x313474[0]) return _0xb70ede.sendMessage(_0x25e76d, {
      text: "╭─⌈ " + _0x1ddc5e.TOOL + " *SUDO MODE* ⌋\n│\n│ " + _0x1ddc5e.CHART + " Current: " + (_0x87ab00 ? _0x1ddc5e.SUCCESS + " ON" : _0x1ddc5e.ERROR + " OFF") + '\x0a│\x20' + _0x1ddc5e.PEOPLE + " Sudo Users: " + getSudoCount() + '\x0a├─⊷\x20*' + _0x3dac11 + "sudomode on*\n│  └⊷ Sudo-only access\n├─⊷ *" + _0x3dac11 + 'sudomode\x20off*\x0a│\x20\x20└⊷\x20Normal\x20mode\x0a╰⊷\x20' + getFooter(_0x21eb5b.key.participant || _0x21eb5b.key.remoteJid)
    }, {
      quoted: _0x21eb5b
    });
    const _0x1a1a22 = _0x313474[0].toLowerCase();
    if (_0x1a1a22 !== 'on' && _0x1a1a22 !== "off") return _0xb70ede.sendMessage(_0x25e76d, {
      text: "╭─⌈ " + _0x1ddc5e.ERROR + " *INVALID OPTION* ⌋\n│\n├─⊷ *" + _0x3dac11 + "sudomode on/off*\n│  └⊷ Toggle sudo mode\n╰⊷ " + getFooter(_0x21eb5b.key.participant || _0x21eb5b.key.remoteJid)
    }, {
      quoted: _0x21eb5b
    });
    const _0x394b2f = _0x1a1a22 === 'on';
    if (_0x394b2f === _0x87ab00) return _0xb70ede.sendMessage(_0x25e76d, {
      text: _0x1ddc5e.HELP + " Sudo mode is already " + (_0x394b2f ? 'ON' : "OFF")
    }, {
      quoted: _0x21eb5b
    });
    setSudoMode(_0x394b2f);
    const _0x4ff0ec = getSudoCount();
    await _0xb70ede.sendMessage(_0x25e76d, {
      text: _0x1ddc5e.SUCCESS + " *Sudo Mode " + (_0x394b2f ? "Enabled*" : "Disabled*") + "\n\n" + (_0x394b2f ? _0x1ddc5e.LOCKED + " Only the owner and " + _0x4ff0ec + " sudo user(s) can now use the bot.\n\n_All other users will be blocked from using commands._" : _0x1ddc5e.UNLOCKED + " Bot is back to normal mode.\n\n_All users can use commands based on current bot mode._")
    }, {
      quoted: _0x21eb5b
    });
  }
};
import _0x1ddc5e from '../../lib/emojis.js';
