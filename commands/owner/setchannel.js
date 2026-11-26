import {getChannelInfo, setChannelInfo, isChannelModeEnabled} from '../../lib/channelMode.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: 'setchannel',
  alias: ["setchannelid", "channelid"],
  category: "owner",
  description: 'Set\x20a\x20custom\x20WhatsApp\x20channel\x20JID\x20for\x20forwarded\x20channel\x20mode',
  ownerOnly: true,
  async execute(_0x1c55de, _0x2af345, _0x83ce86, _0xb7fd0, _0x2144ca) {
    const _0x4e7948 = _0x2af345.key.remoteJid, {jidManager: _0x109f38} = _0x2144ca, _0x52e24d = _0x2144ca?.isSudo ? _0x2144ca.isSudo() : false;
    if (!_0x109f38.isOwner(_0x2af345) && !_0x52e24d) return _0x1c55de.sendMessage(_0x4e7948, {
      text: _0x5477cd.ERROR + " *Owner Only Command!*"
    }, {
      quoted: _0x2af345
    });
    const _0xcccad3 = getChannelInfo(), _0x2e0221 = isChannelModeEnabled();
    if (!_0x83ce86[0]) return _0x1c55de.sendMessage(_0x4e7948, {
      text: "╭┄〔 " + _0x5477cd.SIGNAL + " *CHANNEL ID SETTINGS* 〕┄╮\n" + '┆\x0a' + ("┆ ✦ *Usage:* " + _0xb7fd0 + 'setchannel\x20(JID)\x20(Name)\x0a') + '┆\x0a' + '┆ ✦ *Example:*\x0a' + ("┆  ╰┄ " + _0xb7fd0 + "setchannel 120363425472822304@newsletter VIPBOT\n") + '┆\x0a' + ("╰┄ " + getFooter(_0x2af345.key.participant || _0x2af345.key.remoteJid))
    }, {
      quoted: _0x2af345
    });
    const _0x335bd3 = _0x83ce86[0].trim(), _0x1c18e6 = _0x83ce86.slice(1).join('\x20').trim() || _0xcccad3.name;
    if (!_0x335bd3.endsWith("@newsletter")) return _0x1c55de.sendMessage(_0x4e7948, {
      text: _0x5477cd.ERROR + " *Invalid Channel JID*\n\n" + "The JID must end with *@newsletter*\n" + "Example: `120363424199376597@newsletter`"
    }, {
      quoted: _0x2af345
    });
    const _0x510461 = _0x2af345.key.participant || _0x4e7948, _0x3149f8 = _0x109f38.cleanJid(_0x510461);
    return (setChannelInfo(_0x335bd3, _0x1c18e6, _0x3149f8.cleanNumber || 'Unknown'), _0x1c55de.sendMessage(_0x4e7948, {
      text: _0x5477cd.SUCCESS + " *Channel updated*\n`" + _0x335bd3 + '`'
    }, {
      quoted: _0x2af345
    }));
  }
};
import _0x5477cd from '../../lib/emojis.js';
