import _0x580608 from '../../lib/emojis.js';
import {getSudoList} from '../../lib/sudo-store.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "getsudo",
  alias: ["sudojid", "sudoids"],
  category: 'owner',
  description: 'Get\x20the\x20real\x20WhatsApp\x20JIDs\x20of\x20all\x20sudo\x20users',
  ownerOnly: true,
  async execute(_0x262096, _0x5c5471, _0x5591e4, _0x39760f) {
    const _0x5e4455 = _0x5c5471.key.remoteJid, {sudoers: _0x37d817, addedAt: _0x246e2f, jidMap: _0x24486a} = getSudoList();
    if (_0x37d817.length === 0) return _0x262096.sendMessage(_0x5e4455, {
      text: "╭─⌈ " + _0x580608.SEARCH + '\x20*SUDO\x20JIDs*\x20⌋\x0a│\x0a├─⊷\x20No\x20sudo\x20users\x20found\x0a│\x20\x20└⊷\x20Use\x20*' + _0x39760f + "addsudo* to add one\n╰⊷ " + getFooter(_0x5c5471.key.participant || _0x5c5471.key.remoteJid)
    }, {
      quoted: _0x5c5471
    });
    let _0x3db199 = "┌─── " + _0x580608.SEARCH + " *SUDO JIDs* ───\n│\n";
    (_0x37d817.forEach((_0x1f1cd9, _0x1dc784) => {
      const _0x48f1c8 = _0x24486a && _0x24486a[_0x1f1cd9] || [], _0x4ff98c = _0x246e2f[_0x1f1cd9] ? new Date(_0x246e2f[_0x1f1cd9]).toLocaleDateString('en-GB') : 'Unknown';
      (_0x3db199 += '├─\x20*' + (_0x1dc784 + 1) + ". +" + _0x1f1cd9 + '*\x0a', _0x3db199 += "│  " + _0x580608.CALENDAR + " Added: " + _0x4ff98c + '\x0a', _0x48f1c8.length === 0 ? _0x3db199 += '│\x20\x20' + _0x580608.NAME_BADGE + " JID: _Not yet seen in chat_\n" : _0x48f1c8.forEach((_0x517ca, _0x5f042c) => {
        const _0x5e35bc = _0x517ca.includes('@') ? '' : "@s.whatsapp.net";
        _0x3db199 += "│  " + (_0x5f042c === 0 ? _0x580608.ID : "   ") + " JID" + (_0x48f1c8.length > 1 ? '\x20' + (_0x5f042c + 1) : '') + ": `" + _0x517ca + _0x5e35bc + '`\x0a';
      }), _0x3db199 += '│\x0a');
    }), _0x3db199 += "├─── *TOTAL: " + _0x37d817.length + '\x20sudo\x20user(s)*\x0a', _0x3db199 += "└──────────────", await _0x262096.sendMessage(_0x5e4455, {
      text: _0x3db199
    }, {
      quoted: _0x5c5471
    }));
  }
};
