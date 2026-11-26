import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {callAI} from '../../lib/aiHelper.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "orca",
  description: "Microsoft Orca AI",
  category: 'ai',
  aliases: ["orcaai", "orca2"],
  usage: "orca [question]",
  async execute(_0x44e4c4, _0x2ed94b, _0x2dabd7, _0x59d17e) {
    const _0x4dbd5b = _0x2ed94b.key.remoteJid;
    let _0x350954 = _0x2dabd7.length > 0 ? _0x2dabd7.join('\x20') : _0x2ed94b.quoted?.text || '';
    if (!_0x350954) return _0x44e4c4.sendMessage(_0x4dbd5b, {
      text: '╭┄〔 \x20' + MEDIA.WHALE + '\x20*ORCA\x20AI*\x20 〕┄╮\x0a┆ ✦ *' + _0x59d17e + "orca <question>*\n┆   └─ Microsoft Orca AI\n╰┄ " + getFooter(_0x2ed94b.key.participant || _0x2ed94b.key.remoteJid)
    }, {
      quoted: _0x2ed94b
    });
    try {
      await _0x44e4c4.sendMessage(_0x4dbd5b, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x2ed94b.key
        }
      });
      let _0x456775 = await callAI("orca", _0x350954);
      if (_0x456775.length > 4000) _0x456775 = _0x456775.substring(0, 4000) + "\n\n_...(truncated)_";
      (await _0x44e4c4.sendMessage(_0x4dbd5b, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x2ed94b.key
        }
      }), await _0x44e4c4.sendMessage(_0x4dbd5b, {
        text: MEDIA.WHALE + '\x20*ORCA\x20AI*\x0a┈┄┈┄✦┈┄┈┄✦┈┄┈┄\x0a' + _0x456775 + "\n┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + getFooter(_0x2ed94b.key.participant || _0x2ed94b.key.remoteJid)
      }, {
        quoted: _0x2ed94b
      }));
    } catch (_0x409c3a) {
      (console.error("[ORCA] Error:", _0x409c3a.message), await _0x44e4c4.sendMessage(_0x4dbd5b, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x2ed94b.key
        }
      }), await _0x44e4c4.sendMessage(_0x4dbd5b, {
        text: STATUS.ERROR + '\x20*orca\x20AI\x20Error*\x0a\x0a' + _0x409c3a.message + '\x0a\x0aPlease\x20try\x20again\x20later.'
      }, {
        quoted: _0x2ed94b
      }));
    }
  }
};
