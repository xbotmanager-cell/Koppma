import _0x512572 from 'axios';
import {getBotName} from '../../lib/botname.js';
import _0x4a9f41 from 'moment-timezone';
import {getFooter, getMenuImageBuffer} from '../../lib/menuHelper.js';
import {sendInteractiveWithImage} from '../../lib/buttonHelper.js';
import _0x2ab968 from '../../lib/emojis.js';
import {OWNER, REPO, REPO_GIT, FORK_URL} from '../../lib/repoConfig.js';
let giftedBtns;
try {
  giftedBtns = await import("wolfbtns");
} catch {}
const NODEX_URL = "https://nodex.wolvarex.com", PAIRSITE_URL = "https://pairwolf.wolvarex.com";
async function sendRepoCard(_0x75417a, _0x4e347e, _0x2ff4f0, _0xc06e23) {
  let _0x51876a = null;
  try {
    const _0xcb4d14 = await getMenuImageBuffer();
    _0x51876a = _0xcb4d14?.buffer || null;
  } catch {}
  const _0x31ae4a = [{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Deploy Free at nodeX",
      url: NODEX_URL,
      merchant_url: NODEX_URL
    })
  }, {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Fork Repo",
      url: FORK_URL,
      merchant_url: FORK_URL
    })
  }, {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Pair Site",
      url: PAIRSITE_URL,
      merchant_url: PAIRSITE_URL
    })
  }];
  if (_0x51876a) try {
    await sendInteractiveWithImage(_0x75417a, _0x4e347e, {
      bodyText: _0x2ff4f0,
      footerText: _0x2ab968.WOLF + '\x20' + getBotName(),
      buttons: _0x31ae4a,
      imageBuffer: _0x51876a,
      mimetype: 'image/jpeg'
    });
    return;
  } catch {}
  if (giftedBtns?.sendInteractiveMessage) try {
    await giftedBtns.sendInteractiveMessage(_0x75417a, _0x4e347e, {
      text: _0x2ff4f0,
      footer: _0x2ab968.WOLF + '\x20' + getBotName(),
      buttons: _0x31ae4a,
      quoted: _0xc06e23
    });
    return;
  } catch {}
  if (_0x51876a) return _0x75417a.sendMessage(_0x4e347e, {
    image: _0x51876a,
    caption: _0x2ff4f0,
    mimetype: "image/jpeg"
  }, {
    quoted: _0xc06e23
  });
  await _0x75417a.sendMessage(_0x4e347e, {
    text: _0x2ff4f0
  }, {
    quoted: _0xc06e23
  });
}
export default {
  name: "repo",
  aliases: ['r', 'sc', "source", "github", "git", "viprepo", "wolfrepo", "botrepo"],
  description: "Shows bot GitHub repository information",
  async execute(_0x5f0705, _0xc5bb20, _0x1fecf9, _0xd8a9c8) {
    try {
      const _0x5e7614 = _0xc5bb20.key.remoteJid;
      try {
        const {data: _0x51244d} = await _0x512572.get("https://api.github.com/repos/" + OWNER + '/' + REPO, {
          timeout: 10000,
          headers: {
            'User-Agent': "VIPBOT",
            Accept: "application/vnd.github.v3+json"
          }
        });
        let _0xe78e62;
        const _0x2d5ef7 = _0x51244d.size;
        _0xe78e62 = _0x2d5ef7 > 1024 ? (_0x2d5ef7 / 1024).toFixed(2) + " MB" : _0x2d5ef7 + " KB";
        let _0x4b7b27 = "╭┄〔 `VIPBOT REPO` 〕┄╮\n";
        (_0x4b7b27 += '┆\n', _0x4b7b27 += '┆ ' + _0x2ab968.DECORATIVE_STAR + " *Name* : " + (_0x51244d.name || 'VIPBOT') + '\n', _0x4b7b27 += '┆ ' + _0x2ab968.DECORATIVE_STAR + " *Owner* : " + OWNER + '\n', _0x4b7b27 += '┆ ' + _0x2ab968.DECORATIVE_STAR + " *Stars* : " + (_0x51244d.stargazers_count || 0) + ' ' + _0x2ab968.STAR + '\n', _0x4b7b27 += '┆ ' + _0x2ab968.DECORATIVE_STAR + " *Forks* : " + (_0x51244d.forks_count || 0) + ' ' + _0x2ab968.FORK + '\n', _0x4b7b27 += '┆ ' + _0x2ab968.DECORATIVE_STAR + " *Size* : " + _0xe78e62 + '\n', _0x4b7b27 += "┆ _*Don't forget*_ " + _0x2ab968.CELEBRATE + '\n', _0x4b7b27 += "┆ *to fork and star the repo!* " + _0x2ab968.STAR + '\n', _0x4b7b27 += '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯', await sendRepoCard(_0x5f0705, _0x5e7614, _0x4b7b27, _0xc5bb20), await _0x5f0705.sendMessage(_0x5e7614, {
          react: {
            text: '' + _0x2ab968.SUCCESS,
            key: _0xc5bb20.key
          }
        }));
      } catch (_0x3a2146) {
        console.error("GitHub API Error:", _0x3a2146);
        const _0x33edae = "╭┄〔 *VIPBOT REPO* 〕┄╮\n" + '┆\n' + ('┆ ' + _0x2ab968.DECORATIVE_STAR + ' *Name* : VIPBOT\n') + ('┆ ' + _0x2ab968.DECORATIVE_STAR + " *Owner* : " + OWNER + '\n') + ('┆ ' + _0x2ab968.DECORATIVE_STAR + " *Status* : " + _0x2ab968.SUCCESS + " NEW CLEAN REPOSITORY\n") + ('┆ ' + _0x2ab968.DECORATIVE_STAR + " *Size* : ~1.5 MB (Optimized)\n") + '┆\n' + "┆ *Features* :\n" + '┆ ✦ 400+ Commands\n' + ("┆ ✦ Clean modular core " + _0x2ab968.SUCCESS + '\n') + "┆ ✦ Clean and optimized\n" + "┆ ✦ Fast and reliable\n" + '┆\n' + "┆ _This repository is clean and optimized!_\n" + ('┆ _*Don\'t forget to fork and star the repo!*_ ' + _0x2ab968.STAR + '\n') + ("╰┄ " + getFooter(_0xc5bb20.key.participant || _0xc5bb20.key.remoteJid));
        (await sendRepoCard(_0x5f0705, _0x5e7614, _0x33edae, _0xc5bb20), await _0x5f0705.sendMessage(_0x5e7614, {
          react: {
            text: '' + _0x2ab968.WARNING,
            key: _0xc5bb20.key
          }
        }));
      }
    } catch (_0x4478a3) {
      console.error("General Error:", _0x4478a3);
      const _0x235336 = "*VIPBOT REPO*\n\n" + ('✦ *New Repository* : ' + _0x2ab968.SUCCESS + " YES\n") + ("✦ *URL* : " + REPO_GIT + '\n') + "✦ *Status* : Clean and optimized\n" + "✦ *Size* : ~1.5 MB\n\n" + "_Thank you for choosing VIPBOT by Lupin Stanley!_";
      await sendRepoCard(_0x5f0705, _0xc5bb20.key.remoteJid, _0x235336, _0xc5bb20);
    }
  }
};
