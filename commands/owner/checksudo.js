import _0x81d55d from '../../lib/emojis.js';
import {isSudoNumber} from '../../lib/sudo-store.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
function resolveRealNumber(_0x44b4a2, _0xa0af34) {
  if (!_0x44b4a2) return null;
  if (!_0x44b4a2.includes("@lid")) {
    const _0x41ed10 = _0x44b4a2.split('@')[0].split(':')[0].replace(/[^0-9]/g, '');
    if (_0x41ed10 && _0x41ed10.length >= 7 && _0x41ed10.length <= 15) return _0x41ed10;
    return null;
  }
  if (_0xa0af34) try {
    if (_0xa0af34.signalRepository?.lidMapping?.getPNForLID) {
      const _0x4d2126 = _0xa0af34.signalRepository.lidMapping.getPNForLID(_0x44b4a2);
      if (_0x4d2126) {
        const _0x225caa = String(_0x4d2126).split('@')[0].replace(/[^0-9]/g, '');
        if (_0x225caa.length >= 7) return _0x225caa;
      }
    }
  } catch {}
  return null;
}
export default {
  name: "checksudo",
  alias: ['issudo'],
  category: 'owner',
  description: 'Check\x20if\x20a\x20number\x20is\x20a\x20sudo\x20user',
  ownerOnly: true,
  async execute(_0x2720c3, _0x5e1962, _0x5baa7a, _0x42a893, _0x4e6588) {
    const _0x52989e = _0x5e1962.key.remoteJid;
    let _0x144d8d = null;
    const _0x43c947 = _0x5e1962.message?.extendedTextMessage?.contextInfo?.participant;
    if (_0x43c947) (_0x144d8d = resolveRealNumber(_0x43c947, _0x2720c3), !_0x144d8d && (_0x144d8d = _0x43c947.split('@')[0].split(':')[0])); else {
      if (_0x5baa7a[0]) _0x144d8d = _0x5baa7a[0].replace(/[^0-9]/g, ''); else {
        if (_0x5e1962.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
          const _0x523a8b = _0x5e1962.message.extendedTextMessage.contextInfo.mentionedJid[0];
          (_0x144d8d = resolveRealNumber(_0x523a8b, _0x2720c3), !_0x144d8d && (_0x144d8d = _0x523a8b.split('@')[0].split(':')[0]));
        }
      }
    }
    if (!_0x144d8d || _0x144d8d.length < 7) return _0x2720c3.sendMessage(_0x52989e, {
      text: '╭─⌈\x20' + _0x81d55d.CLIPBOARD + '\x20*CHECK\x20SUDO*\x20⌋\x0a│\x0a├─⊷\x20*' + _0x42a893 + "checksudo <number>*\n│  └⊷ Check by number\n├─⊷ *Reply + " + _0x42a893 + "checksudo*\n│  └⊷ Check via reply\n╰⊷ " + getFooter(_0x5e1962.key.participant || _0x5e1962.key.remoteJid)
    }, {
      quoted: _0x5e1962
    });
    const _0x4b57ab = isSudoNumber(_0x144d8d);
    await _0x2720c3.sendMessage(_0x52989e, {
      text: _0x81d55d.SEARCH + " *Sudo Check*\n\n" + _0x81d55d.PERSON + '\x20Number:\x20+' + _0x144d8d + '\x0a' + _0x81d55d.KEY + '\x20Status:\x20' + (_0x4b57ab ? _0x81d55d.SUCCESS + " *SUDO USER*" : _0x81d55d.ERROR + " *NOT A SUDO USER*")
    }, {
      quoted: _0x5e1962
    });
  }
};
