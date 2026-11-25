const ENABLED = false;
import {OWNER, PROFILE_URL, REPO_URL, AVATAR_URL} from './repoConfig.js';
import {BRAND, GITHUB, MEDIA, STATUS, UI} from './emojis.js';
const NEW_GITHUB_PROFILE = PROFILE_URL, NEW_GITHUB_REPO = REPO_URL;
export async function sendMigrationNotice(_0x3be27f, _0x3db5f7) {
  if (!ENABLED) return;
  try {
    const _0x556f3c = STATUS.WARNING + '️ *Important Notice from VIPBOT*\n\n' + ("Our previous GitHub account has been *flagged* and is no longer accessible. " + STATUS.BLOCKED + '\n\n') + (UI.PIN + ' *Please use our official repository going forward:*\n') + (GITHUB.GITHUB + " Profile: " + NEW_GITHUB_PROFILE + '\n') + (MEDIA.PACKAGE + " Repo: " + NEW_GITHUB_REPO + '\n\n') + "All future updates, releases, and source code will be published here.\n" + ("Thanks for your continued support! " + (BRAND.VIP || BRAND.WOLF));
    await _0x3be27f.sendMessage(_0x3db5f7, {
      text: _0x556f3c,
      contextInfo: {
        externalAdReply: {
          title: STATUS.WARNING + '️\x20Account\x20Migrated\x20—\x20Follow\x20the\x20New\x20One',
          body: "github.com/" + OWNER,
          mediaType: 1,
          thumbnailUrl: AVATAR_URL,
          sourceUrl: NEW_GITHUB_REPO,
          mediaUrl: NEW_GITHUB_REPO,
          renderLargerThumbnail: false
        }
      }
    });
  } catch {}
}
