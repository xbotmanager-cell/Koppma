import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x4dd77d from 'axios';
import {downloadContentFromMessage} from 'wolfsocket';
import _0x160f2a from 'form-data';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const XCASPER_ERASE = "https://apis.xcasper.space/api/ai/nanobanana", CATBOX_UPLOAD = "https://catbox.moe/user/api.php";
function getImageMessage(_0x3ddcc8) {
  return _0x3ddcc8.message?.imageMessage || _0x3ddcc8.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage || _0x3ddcc8.message?.viewOnceMessage?.message?.imageMessage || null;
}
async function downloadImageBuffer(_0x3c6f26) {
  const _0x1abeae = await downloadContentFromMessage(_0x3c6f26, 'image'), _0x13bf61 = [];
  for await (const _0x112472 of _0x1abeae) _0x13bf61.push(_0x112472);
  return Buffer.concat(_0x13bf61);
}
async function uploadToCatbox(_0x5aa1a2, _0x51a380 = 'image.jpg') {
  const _0x2c88dd = new _0x160f2a();
  (_0x2c88dd.append("reqtype", "fileupload"), _0x2c88dd.append("fileToUpload", _0x5aa1a2, {
    filename: _0x51a380,
    contentType: 'image/jpeg'
  }));
  const _0x48c272 = await _0x4dd77d.post(CATBOX_UPLOAD, _0x2c88dd, {
    headers: _0x2c88dd.getHeaders(),
    timeout: 20000
  }), _0xe21738 = _0x48c272.data?.trim?.() || _0x48c272.data;
  if (!_0xe21738 || !_0xe21738.startsWith("http")) throw new Error("Upload failed — no URL returned");
  return _0xe21738;
}
async function eraseObject(_0x25f820, _0x87b26c) {
  const _0x4a9e8c = {
    url: _0x25f820
  };
  if (_0x87b26c) _0x4a9e8c.prompt = _0x87b26c;
  const _0x67fdab = await _0x4dd77d.get(XCASPER_ERASE, {
    params: _0x4a9e8c,
    timeout: 90000
  });
  if (!_0x67fdab.data?.success) throw new Error(_0x67fdab.data?.error || _0x67fdab.data?.message || "Object eraser failed");
  const _0x31f252 = _0x67fdab.data?.output_base64 || _0x67fdab.data?.result;
  if (_0x31f252 && typeof _0x31f252 === "string" && _0x31f252.length > 100) return Buffer.from(_0x31f252, "base64");
  const _0x40c9d3 = _0x67fdab.data?.result_url || _0x67fdab.data?.url || _0x67fdab.data?.output;
  if (_0x40c9d3 && _0x40c9d3.startsWith("http")) {
    const _0x3fe016 = await _0x4dd77d.get(_0x40c9d3, {
      responseType: "arraybuffer",
      timeout: 30000
    });
    return Buffer.from(_0x3fe016.data);
  }
  throw new Error("No image data in API response");
}
export default {
  name: "erase",
  alias: ['eraseobj', 'removobj', 'objecterase', "airemove"],
  category: 'ai',
  description: "AI object eraser — removes objects from an image",
  async execute(_0x1532d4, _0x232a9d, _0x28b243, _0x39e5e2) {
    const _0x4ad932 = _0x232a9d.key.remoteJid, _0x115f49 = _0x47ca5d => _0x1532d4.sendMessage(_0x4ad932, {
      text: _0x47ca5d
    }, {
      quoted: _0x232a9d
    }), _0x3c39a8 = getImageMessage(_0x232a9d);
    if (!_0x3c39a8) return _0x115f49("╭─⌈ *OBJECT ERASER* ⌋\n" + '│\x0a' + "├─⊷ *Usage:* Reply to an image with\n" + ("│  " + _0x39e5e2 + "erase [what to remove]\n") + '│\x0a' + "├─⊷ *Examples:*\n" + ("│  • " + _0x39e5e2 + "erase remove the tree\n") + ("│  • " + _0x39e5e2 + "erase remove text\n") + ("│  • " + _0x39e5e2 + "erase (no prompt = auto)\n") + '│\x0a' + "├─⊷ AI detects & erases the object\n" + "│  then fills in the background\n" + '│\x0a' + ("╰⊷ " + getFooter(_0x232a9d.key.participant || _0x232a9d.key.remoteJid)));
    const _0x27944a = _0x28b243.join('\x20').trim() || null;
    await _0x1532d4.sendMessage(_0x4ad932, {
      react: {
        text: '' + STATUS.LOADING,
        key: _0x232a9d.key
      }
    });
    let _0x5ae6ab;
    try {
      _0x5ae6ab = await downloadImageBuffer(_0x3c39a8);
    } catch (_0x53e424) {
      return (await _0x1532d4.sendMessage(_0x4ad932, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x232a9d.key
        }
      }), _0x115f49(STATUS.ERROR + " Failed to download the image.\n\n_" + _0x53e424.message + '_'));
    }
    let _0x2ad33f;
    try {
      _0x2ad33f = await uploadToCatbox(_0x5ae6ab);
    } catch (_0xa073b2) {
      return (await _0x1532d4.sendMessage(_0x4ad932, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x232a9d.key
        }
      }), _0x115f49(STATUS.ERROR + " Failed to upload image for processing.\n\n_" + _0xa073b2.message + '_'));
    }
    let _0x103b16;
    try {
      _0x103b16 = await eraseObject(_0x2ad33f, _0x27944a);
    } catch (_0x2564bb) {
      return (await _0x1532d4.sendMessage(_0x4ad932, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x232a9d.key
        }
      }), _0x115f49(STATUS.ERROR + '\x20Object\x20eraser\x20failed.\x0a\x0a_' + _0x2564bb.message + '_'));
    }
    try {
      const _0x36f4ac = _0x27944a ? STATUS.SUCCESS + '\x20*Object\x20Erased*\x0a' + UI.TRASH + " _Removed: " + _0x27944a + '_\x0a' + BRAND.WOLF + '\x20_' + getOwnerName().toUpperCase() + " TECH_" : STATUS.SUCCESS + '\x20*Object\x20Erased*\x0a' + BRAND.WOLF + '\x20_' + getOwnerName().toUpperCase() + " TECH_";
      await _0x1532d4.sendMessage(_0x4ad932, {
        image: _0x103b16,
        caption: _0x36f4ac
      }, {
        quoted: _0x232a9d
      });
    } catch (_0x158bcd) {
      return (await _0x1532d4.sendMessage(_0x4ad932, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x232a9d.key
        }
      }), _0x115f49(STATUS.ERROR + " Failed to send the result image.\n\n_" + _0x158bcd.message + '_'));
    }
    await _0x1532d4.sendMessage(_0x4ad932, {
      react: {
        text: '' + STATUS.SUCCESS,
        key: _0x232a9d.key
      }
    });
  }
};
