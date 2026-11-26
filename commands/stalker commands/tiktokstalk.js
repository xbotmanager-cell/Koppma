import {STALKER} from '../../lib/emojis.js';
import _0x8bcb0f from 'axios';
import {getBotName} from '../../lib/botname.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const API_PRIMARY = "https://apis.xwolf.space/api/stalk/tiktok", API_FALLBACK = "https://api.giftedtech.co.ke/api/stalk/tiktokstalk";
async function fetchProfile(_0x20b254) {
  try {
    const _0x1ac23b = await _0x8bcb0f.get(API_PRIMARY, {
      params: {
        username: _0x20b254
      },
      timeout: 15000
    }), _0xf43349 = _0x1ac23b.data;
    if (_0xf43349?.success && _0xf43349?.username) return {
      name: _0xf43349.nickname || _0xf43349.username,
      username: _0xf43349.username,
      bio: _0xf43349.bio || "N/A",
      avatar: _0xf43349.avatar || null,
      followers: _0xf43349.followers ?? 0,
      following: _0xf43349.following ?? 0,
      likes: _0xf43349.likes ?? 0,
      videos: _0xf43349.videos ?? null,
      verified: _0xf43349.verified ?? false,
      private: _0xf43349.privateAccount ?? false,
      profileUrl: _0xf43349.profileUrl || null,
      source: "xwolf"
    };
  } catch {}
  const _0x2cb911 = await _0x8bcb0f.get(API_FALLBACK, {
    params: {
      apikey: "gifted",
      username: _0x20b254
    },
    timeout: 20000
  });
  if (!_0x2cb911.data?.success || !_0x2cb911.data?.result) throw new Error("User not found");
  const _0x35b208 = _0x2cb911.data.result;
  return {
    name: _0x35b208.name || _0x35b208.username,
    username: _0x35b208.username || _0x20b254,
    bio: _0x35b208.bio || "N/A",
    avatar: _0x35b208.avatar || null,
    followers: _0x35b208.followers ?? 0,
    following: _0x35b208.following ?? 0,
    likes: _0x35b208.likes ?? 0,
    videos: null,
    verified: _0x35b208.verified ?? false,
    private: _0x35b208.private ?? false,
    profileUrl: _0x35b208.website?.link || null,
    source: "gifted"
  };
}
export default {
  name: "tiktokstalk",
  aliases: ['ttstalk', "tikstalk", "tiktokinfo"],
  description: 'Stalk\x20a\x20TikTok\x20user\x20profile',
  category: "Stalker Commands",
  async execute(_0x29f4eb, _0x3b7256, _0x180afc, _0x34ba3c) {
    const _0x2d5c62 = _0x3b7256.key.remoteJid;
    if (!_0x180afc || !_0x180afc[0]) return _0x29f4eb.sendMessage(_0x2d5c62, {
      text: "╭─⌈ " + STALKER.SEARCH + " *TIKTOK STALKER* ⌋\n│\n├─⊷ *" + _0x34ba3c + "tiktokstalk <username>*\n│  └⊷ Stalk a TikTok profile\n│\n├─⊷ *Example:*\n│  └⊷ " + _0x34ba3c + "tiktokstalk maskedwolf908\n│\n╰───────────────\n> *" + getBotName() + " STALKER*"
    }, {
      quoted: _0x3b7256
    });
    const _0x17bcbc = _0x180afc[0].replace('@', '').trim();
    await _0x29f4eb.sendMessage(_0x2d5c62, {
      react: {
        text: STALKER.SEARCH,
        key: _0x3b7256.key
      }
    });
    try {
      const _0x5ab345 = await fetchProfile(_0x17bcbc);
      let _0x222d6a = null;
      if (_0x5ab345.avatar) try {
        const _0x3d2d6e = await _0x8bcb0f.get(_0x5ab345.avatar, {
          responseType: "arraybuffer",
          timeout: 10000
        });
        if (_0x3d2d6e.data.length > 500) _0x222d6a = Buffer.from(_0x3d2d6e.data);
      } catch {}
      const _0x59ca22 = ["╭─⌈ " + STALKER.MUSIC + " *TIKTOK PROFILE* ⌋", '│', "├─⊷ *" + STALKER.PERSON + " Name:* " + _0x5ab345.name, "├─⊷ *" + STALKER.TAG + " Username:* @" + _0x5ab345.username, '├─⊷\x20*' + STALKER.NOTE + " Bio:* " + _0x5ab345.bio, '├─⊷\x20*' + STALKER.PEOPLE + '\x20Followers:*\x20' + Number(_0x5ab345.followers).toLocaleString(), '├─⊷\x20*' + STALKER.PERSON + " Following:* " + Number(_0x5ab345.following).toLocaleString(), "├─⊷ *" + STALKER.HEART + " Likes:* " + Number(_0x5ab345.likes).toLocaleString()];
      if (_0x5ab345.videos !== null) _0x59ca22.push("├─⊷ *" + STALKER.VIDEO + " Videos:* " + _0x5ab345.videos);
      (_0x59ca22.push("├─⊷ *" + STALKER.SUCCESS + '\x20Verified:*\x20' + (_0x5ab345.verified ? "Yes " + STALKER.CHECK : 'No')), _0x59ca22.push('├─⊷\x20*' + STALKER.LOCKED + " Private:* " + (_0x5ab345.private ? "Yes" : 'No')));
      if (_0x5ab345.profileUrl) _0x59ca22.push('├─⊷\x20*' + STALKER.LINK + " Profile:* " + _0x5ab345.profileUrl);
      _0x59ca22.push('│', '╰⊷\x20' + getFooter(_0x3b7256.key.participant || _0x3b7256.key.remoteJid), '>\x20' + STALKER.WOLF + '\x20*' + getBotName() + " STALKER*");
      const _0xa2889 = _0x59ca22.join('\x0a');
      (_0x222d6a ? await _0x29f4eb.sendMessage(_0x2d5c62, {
        image: _0x222d6a,
        caption: _0xa2889
      }, {
        quoted: _0x3b7256
      }) : await _0x29f4eb.sendMessage(_0x2d5c62, {
        text: _0xa2889
      }, {
        quoted: _0x3b7256
      }), await _0x29f4eb.sendMessage(_0x2d5c62, {
        react: {
          text: STALKER.SUCCESS,
          key: _0x3b7256.key
        }
      }));
    } catch (_0x3dc0a8) {
      (console.error(STALKER.ERROR + '\x20[TIKTOKSTALK]\x20Error:', _0x3dc0a8.message), await _0x29f4eb.sendMessage(_0x2d5c62, {
        react: {
          text: STALKER.ERROR,
          key: _0x3b7256.key
        }
      }), await _0x29f4eb.sendMessage(_0x2d5c62, {
        text: STALKER.ERROR + " *TikTok Stalk Failed*\n\n" + STALKER.WARNING + '\x20' + _0x3dc0a8.message + '\x0a\x0a' + STALKER.INFO + " Check the username and try again."
      }, {
        quoted: _0x3b7256
      }));
    }
  }
};
(undefined, undefined);
