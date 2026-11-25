import {STALKER} from '../../lib/emojis.js';
import _0x3b549a from 'axios';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const XWOLF_API = "https://apis.xwolf.space/api/stalk/github", DEFAULT_USER = "peace-amani";
export default {
  name: "gitstalk",
  aliases: ['githubstalk', "ghstalk"],
  description: "Stalk a GitHub user profile",
  category: "Stalker Commands",
  async execute(_0x3c04ba, _0x1b3abe, _0x3a0db8, _0x1f8f28) {
    const _0x1611c9 = _0x1b3abe.key.remoteJid;
    if (!_0x3a0db8 || !_0x3a0db8[0]) return _0x3c04ba.sendMessage(_0x1611c9, {
      text: "╭─⌈ " + STALKER.SEARCH + " *GITHUB STALKER* ⌋\n│\n" + ("├─⊷ *" + _0x1f8f28 + "gitstalk <username>*\n") + "│  └⊷ Stalk a GitHub profile\n│\n" + "├─⊷ *Example:*\n" + ('│\x20\x20└⊷\x20' + _0x1f8f28 + "gitstalk " + DEFAULT_USER + '\x0a│\x0a') + ("╰⊷ " + getFooter(_0x1b3abe.key.participant || _0x1b3abe.key.remoteJid))
    }, {
      quoted: _0x1b3abe
    });
    const _0x200da4 = _0x3a0db8[0].replace('@', '').trim();
    await _0x3c04ba.sendMessage(_0x1611c9, {
      react: {
        text: STALKER.SEARCH,
        key: _0x1b3abe.key
      }
    });
    try {
      const _0x495694 = await _0x3b549a.get(XWOLF_API, {
        params: {
          username: _0x200da4
        },
        timeout: 20000
      }), _0x484da5 = _0x495694.data, _0x193c15 = _0x484da5?.result || _0x484da5?.data || _0x484da5;
      if (!_0x193c15 || !_0x193c15.login && !_0x193c15.username) throw new Error("User not found on GitHub");
      const _0xfa48c = JSON.stringify(_0x484da5, null, 2), _0x262119 = _0xfa48c.length > 900 ? _0xfa48c.slice(0, 900) + "\n... (truncated)" : _0xfa48c, _0x1c71e6 = '```json\x0a' + _0x262119 + '\x0a```';
      let _0x313a26 = null;
      const _0x404432 = _0x193c15.avatar_url || _0x193c15.avatar;
      if (_0x404432) try {
        const _0x5a1f9e = await _0x3b549a.get(_0x404432, {
          responseType: "arraybuffer",
          timeout: 10000
        });
        if (_0x5a1f9e.data.length > 500) _0x313a26 = Buffer.from(_0x5a1f9e.data);
      } catch {}
      (_0x313a26 ? await _0x3c04ba.sendMessage(_0x1611c9, {
        image: _0x313a26,
        caption: _0x1c71e6
      }, {
        quoted: _0x1b3abe
      }) : await _0x3c04ba.sendMessage(_0x1611c9, {
        text: _0x1c71e6
      }, {
        quoted: _0x1b3abe
      }), await _0x3c04ba.sendMessage(_0x1611c9, {
        react: {
          text: STALKER.SUCCESS,
          key: _0x1b3abe.key
        }
      }));
    } catch (_0x2937f0) {
      (console.error(STALKER.ERROR + '\x20[GITSTALK]\x20Error:', _0x2937f0.message), await _0x3c04ba.sendMessage(_0x1611c9, {
        react: {
          text: STALKER.ERROR,
          key: _0x1b3abe.key
        }
      }), await _0x3c04ba.sendMessage(_0x1611c9, {
        text: STALKER.ERROR + " *GitHub Stalk Failed*\n\n" + STALKER.WARNING + '\x20' + _0x2937f0.message + '\x0a\x0a' + STALKER.INFO + " Check the username and try again."
      }, {
        quoted: _0x1b3abe
      }));
    }
  }
};
(undefined, undefined);
