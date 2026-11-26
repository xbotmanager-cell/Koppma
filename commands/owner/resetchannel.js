import {setChannelInfo} from '../../lib/channelMode.js';
const DEFAULT_JID = '120363424199376597@newsletter', DEFAULT_NAME = "VIPBOT Channel";
export default {
  name: 'resetchannel',
  alias: ['rc', 'resetchannel'],
  category: 'owner',
  description: "Reset channel JID back to default",
  ownerOnly: true,
  async execute(_0x4da3d3, _0x24cf11, _0x3c8111, _0x54db93, _0x17a8c2) {
    const _0x2a91e7 = _0x24cf11.key.remoteJid, {jidManager: _0x430f30} = _0x17a8c2 || ({}), _0x5dddc4 = _0x17a8c2?.isSudo ? _0x17a8c2.isSudo() : false;
    if (!_0x430f30?.isOwner(_0x24cf11) && !_0x5dddc4) return _0x4da3d3.sendMessage(_0x2a91e7, {
      text: _0xcca4af.ERROR + " *Owner Only Command!*"
    }, {
      quoted: _0x24cf11
    });
    return (setChannelInfo(DEFAULT_JID, DEFAULT_NAME, "reset"), _0x4da3d3.sendMessage(_0x2a91e7, {
      text: _0xcca4af.SUCCESS + " *Channel reset to default*\n`" + DEFAULT_JID + '`'
    }, {
      quoted: _0x24cf11
    }));
  }
};
import _0xcca4af from '../../lib/emojis.js';
