import _0x49f07d from 'axios';
import _0x43a54f from 'form-data';
import {downloadContentFromMessage} from 'wolfsocket';
import {STATUS, UI, BRAND} from '../../lib/emojis.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const IMAGE_EDIT_API = 'https://apis.keithsite.lol/ai/imageedit', IMAGE_UPLOAD_API = "https://catbox.moe/user/api.php";
function findImageMessage(_0x7d714e) {
  return _0x7d714e.message?.imageMessage || _0x7d714e.message?.viewOnceMessage?.message?.imageMessage || _0x7d714e.message?.viewOnceMessageV2?.message?.imageMessage || _0x7d714e.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage || _0x7d714e.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessage?.message?.imageMessage || _0x7d714e.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.imageMessage || null;
}
async function downloadImage(_0x1d6c50) {
  const _0x25b6dd = await downloadContentFromMessage(_0x1d6c50, "image"), _0x42827e = [];
  for await (const _0x186cf5 of _0x25b6dd) _0x42827e.push(_0x186cf5);
  const _0x14994b = Buffer.concat(_0x42827e);
  if (!_0x14994b.length) throw new Error('The\x20image\x20download\x20was\x20empty.');
  return _0x14994b;
}
async function uploadImage(_0x5c1605) {
  const _0x5e8602 = new _0x43a54f();
  (_0x5e8602.append('reqtype', 'fileupload'), _0x5e8602.append("fileToUpload", _0x5c1605, {
    filename: 'imageedit.jpg',
    contentType: "image/jpeg"
  }));
  const _0x505553 = await _0x49f07d.post(IMAGE_UPLOAD_API, _0x5e8602, {
    headers: _0x5e8602.getHeaders(),
    timeout: 30000,
    maxBodyLength: 15 * 1024 * 1024
  }), _0x44726c = String(_0x505553.data || '').trim();
  if (!(/^https?:\/\//i).test(_0x44726c)) throw new Error("Could not create a public image URL.");
  return _0x44726c;
}
function findResultUrl(_0x59905c, _0x3c8b5d = 0) {
  if (_0x3c8b5d > 5 || _0x59905c == null) return null;
  if (typeof _0x59905c === 'string') {
    const _0x54fa7f = _0x59905c.trim();
    if ((/^https?:\/\//i).test(_0x54fa7f)) return _0x54fa7f;
    if (_0x54fa7f.startsWith('{') || _0x54fa7f.startsWith('[')) try {
      return findResultUrl(JSON.parse(_0x54fa7f), _0x3c8b5d + 1);
    } catch {}
    return null;
  }
  if (Array.isArray(_0x59905c)) {
    for (const _0x2892df of _0x59905c) {
      const _0xe41a4 = findResultUrl(_0x2892df, _0x3c8b5d + 1);
      if (_0xe41a4) return _0xe41a4;
    }
    return null;
  }
  if (typeof _0x59905c === "object") for (const _0x32f3c2 of ["url", 'image', "imageUrl", "image_url", 'result', 'output', "data"]) {
    const _0x3ca7cd = findResultUrl(_0x59905c[_0x32f3c2], _0x3c8b5d + 1);
    if (_0x3ca7cd) return _0x3ca7cd;
  }
  return null;
}
async function editImage(_0x53e198, _0x23e914) {
  const _0x4821d5 = await _0x49f07d.get(IMAGE_EDIT_API, {
    params: {
      q: _0x23e914,
      url: _0x53e198
    },
    responseType: "arraybuffer",
    timeout: 180000,
    maxContentLength: 25 * 1024 * 1024
  }), _0x1d1274 = String(_0x4821d5.headers["content-type"] || '').toLowerCase();
  if (_0x1d1274.startsWith('image/')) return Buffer.from(_0x4821d5.data);
  let _0x4d4094;
  try {
    _0x4d4094 = JSON.parse(Buffer.from(_0x4821d5.data).toString("utf8"));
  } catch {
    throw new Error("The image edit API returned an unreadable response.");
  }
  const _0x28d950 = _0x4d4094?.image_base64 || _0x4d4094?.output_base64 || _0x4d4094?.base64;
  if (typeof _0x28d950 === 'string' && _0x28d950.length > 100) return Buffer.from(_0x28d950.replace(/^data:image\/[^;]+;base64,/i, ''), "base64");
  const _0x29cb78 = findResultUrl(_0x4d4094);
  if (!_0x29cb78) throw new Error(_0x4d4094?.error || _0x4d4094?.message || "The API did not return an edited image.");
  const _0x27f8d3 = await _0x49f07d.get(_0x29cb78, {
    responseType: 'arraybuffer',
    timeout: 60000,
    maxContentLength: 25 * 1024 * 1024
  }), _0x5c5b6b = String(_0x27f8d3.headers["content-type"] || '').toLowerCase();
  if (_0x5c5b6b && !_0x5c5b6b.startsWith('image/')) throw new Error("The API result URL did not contain an image.");
  return Buffer.from(_0x27f8d3.data);
}
export default {
  name: "imageedit",
  alias: ["imgedit", "editimage"],
  category: 'ai',
  description: "Edit an image with an AI prompt",
  async execute(_0x550e6b, _0x5cd14e, _0x3122d3, _0x307495) {
    const _0x492b66 = _0x5cd14e.key.remoteJid, _0x50fceb = _0x53c0fa => _0x550e6b.sendMessage(_0x492b66, {
      text: _0x53c0fa
    }, {
      quoted: _0x5cd14e
    }), _0x580783 = findImageMessage(_0x5cd14e), _0x4faed1 = _0x3122d3.join('\x20').trim();
    if (!_0x580783 || !_0x4faed1) return _0x50fceb((UI.IMAGE || '🖼️') + " *AI IMAGE EDIT*\n\n" + ("Reply to an image with *" + _0x307495 + 'imageedit\x20<instruction>*,\x20or\x20send\x20an\x20image\x20with\x20the\x20command\x20in\x20its\x20caption.\x0a\x0a') + ('Example:\x20*' + _0x307495 + "imageedit make him brown*\n") + ('' + getFooter(_0x5cd14e.key.participant || _0x492b66)));
    try {
      await _0x550e6b.sendMessage(_0x492b66, {
        react: {
          text: STATUS.LOADING,
          key: _0x5cd14e.key
        }
      });
    } catch {}
    try {
      const _0x4958bf = await downloadImage(_0x580783), _0x3e06d9 = await uploadImage(_0x4958bf), _0x369036 = await editImage(_0x3e06d9, _0x4faed1);
      if (!_0x369036?.length) throw new Error("The API returned an empty image.");
      await _0x550e6b.sendMessage(_0x492b66, {
        image: _0x369036,
        caption: STATUS.SUCCESS + '\x20*Image\x20edited*\x0a' + UI.NOTE + '\x20_' + _0x4faed1 + '_\x0a' + BRAND.WOLF + '\x20_' + getOwnerName().toUpperCase() + '\x20TECH_'
      }, {
        quoted: _0x5cd14e
      });
      try {
        await _0x550e6b.sendMessage(_0x492b66, {
          react: {
            text: STATUS.SUCCESS,
            key: _0x5cd14e.key
          }
        });
      } catch {}
    } catch (_0x38141e) {
      console.error("[IMAGEEDIT] Failed:", _0x38141e?.message || _0x38141e);
      try {
        await _0x550e6b.sendMessage(_0x492b66, {
          react: {
            text: STATUS.ERROR,
            key: _0x5cd14e.key
          }
        });
      } catch {}
      return _0x50fceb(STATUS.ERROR + " Image editing failed. " + (_0x38141e?.message || "Please try again later."));
    }
  }
};
