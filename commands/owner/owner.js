import {getBotName} from '../../lib/botname.js';
import {getOwnerName} from '../../lib/menuHelper.js';
import _0x4f6afa from 'fs';
import _0x58ee65 from 'path';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
let giftedBtns;
try {
  giftedBtns = await import("wolfbtns");
} catch {}
const CONTACT_FILE = _0x58ee65.join(process.cwd(), "bot_owner_contact.json");
function getOwnerContact() {
  try {
    if (_0x4f6afa.existsSync(CONTACT_FILE)) {
      const _0x3d75b0 = JSON.parse(_0x4f6afa.readFileSync(CONTACT_FILE, "utf8"));
      if (_0x3d75b0.number) return _0x3d75b0.number;
    }
  } catch {}
  return '255780470905';
}
function saveOwnerContact(_0x379a52) {
  _0x4f6afa.writeFileSync(CONTACT_FILE, JSON.stringify({
    number: _0x379a52
  }, null, 2));
}
export default {
  name: 'owner',
  alias: ['creator', 'dev', 'developer'],
  description: 'Show\x20or\x20update\x20bot\x20owner\x20contact',
  category: 'owner',
  async execute(_0x17e6a1, _0x41bc6b, _0xcbb8bd, _0x29cd6b, _0x3219d3) {
    const _0x32a420 = _0x41bc6b.key.remoteJid, {jidManager: _0x25d962} = _0x3219d3 || ({}), _0x1ecc2d = _0x25d962?.isOwner(_0x41bc6b) || false;
    if (_0xcbb8bd[0]) {
      if (!_0x1ecc2d) return _0x17e6a1.sendMessage(_0x32a420, {
        text: _0x1bbdb0.ERROR + " *Owner Only Command!*"
      }, {
        quoted: _0x41bc6b
      });
      const _0x4e911a = _0xcbb8bd[0].replace(/\D/g, '');
      if (_0x4e911a.length < 7) return _0x17e6a1.sendMessage(_0x32a420, {
        text: _0x1bbdb0.ERROR + " Invalid number. Example: `" + _0x29cd6b + "owner 255780470905`"
      }, {
        quoted: _0x41bc6b
      });
      return (saveOwnerContact(_0x4e911a), _0x17e6a1.sendMessage(_0x32a420, {
        text: _0x1bbdb0.SUCCESS + " *Owner number updated*\n`+" + _0x4e911a + '`'
      }, {
        quoted: _0x41bc6b
      }));
    }
    const _0x376a96 = getOwnerContact(), _0x4fc6e2 = _0x376a96 + "@s.whatsapp.net";
    try {
      await _0x17e6a1.sendMessage(_0x32a420, {
        react: {
          text: '' + _0x1bbdb0.CROWN,
          key: _0x41bc6b.key
        }
      });
    } catch {}
    const _0x2cce5c = "BEGIN:VCARD\n" + "VERSION:3.0\n" + ("FN:" + getOwnerName() + '\x20(Bot\x20Owner)\x0a') + ('ORG:' + getBotName() + ';\x0a') + ('TEL;type=CELL;type=VOICE;waid=' + _0x376a96 + ':+' + _0x376a96 + '\x0a') + "END:VCARD";
    if (giftedBtns?.sendInteractiveMessage) try {
      (await giftedBtns.sendInteractiveMessage(_0x17e6a1, _0x32a420, {
        text: _0x1bbdb0.CROWN + '\x20*' + getBotName() + '\x20OWNER*\x0a\x0a' + _0x1bbdb0.PHONE + '\x20*+' + _0x376a96 + '*',
        footer: _0x1bbdb0.WOLF + '\x20' + getBotName(),
        interactiveButtons: [{
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: _0x1bbdb0.CLIPBOARD + '\x20Copy\x20Number',
            copy_code: '+' + _0x376a96
          })
        }, {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: _0x1bbdb0.CHAT + '\x20Message\x20Owner',
            url: "https://wa.me/" + _0x376a96
          })
        }]
      }), await _0x17e6a1.sendMessage(_0x32a420, {
        contacts: {
          displayName: getOwnerName() + " (Bot Owner)",
          contacts: [{
            vcard: _0x2cce5c
          }]
        }
      }, {
        quoted: _0x41bc6b
      }));
      return;
    } catch {}
    (await _0x17e6a1.sendMessage(_0x32a420, {
      text: _0x1bbdb0.CROWN + '\x20*' + getBotName() + " OWNER*\n\n" + _0x1bbdb0.PHONE + " *+" + _0x376a96 + "*\n\n" + _0x1bbdb0.CHAT + " https://wa.me/" + _0x376a96
    }, {
      quoted: _0x41bc6b
    }), await _0x17e6a1.sendMessage(_0x32a420, {
      contacts: {
        displayName: getOwnerName() + " (Bot Owner)",
        contacts: [{
          vcard: _0x2cce5c
        }]
      }
    }, {
      quoted: _0x41bc6b
    }));
  }
};
import _0x1bbdb0 from '../../lib/emojis.js';
