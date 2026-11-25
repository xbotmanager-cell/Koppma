import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x853384 from 'axios';
import {downloadContentFromMessage} from 'wolfsocket';
import _0x53e093 from 'form-data';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const XCASPER_ENLARGER = "https://apis.xcasper.space/api/ai/enlarger", CATBOX_UPLOAD = 'https://catbox.moe/user/api.php';
function getImageMessage(_0x7e830d) {
  return _0x7e830d.message?.imageMessage || _0x7e830d.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage || _0x7e830d.message?.viewOnceMessage?.message?.imageMessage || null;
}
async function downloadImageBuffer(_0x4471d2) {
  const _0x22ad0c = await downloadContentFromMessage(_0x4471d2, "image"), _0xe7c050 = [];
  for await (const _0x35e937 of _0x22ad0c) _0xe7c050.push(_0x35e937);
  return Buffer.concat(_0xe7c050);
}
async function uploadToCatbox(_0x44d7ea, _0x5e12d7 = "image.jpg") {
  const _0x34bdfb = new _0x53e093();
  (_0x34bdfb.append('reqtype', "fileupload"), _0x34bdfb.append("fileToUpload", _0x44d7ea, {
    filename: _0x5e12d7,
    contentType: 'image/jpeg'
  }));
  const _0x3f2443 = await _0x853384.post(CATBOX_UPLOAD, _0x34bdfb, {
    headers: _0x34bdfb.getHeaders(),
    timeout: 20000
  }), _0x26e20b = _0x3f2443.data?.trim?.() || _0x3f2443.data;
  if (!_0x26e20b || !_0x26e20b.startsWith('http')) throw new Error("Upload failed — no URL returned");
  return _0x26e20b;
}
async function enlargeImage(_0x27472c) {
  const _0x592be9 = await _0x853384.get(XCASPER_ENLARGER, {
    params: {
      url: _0x27472c
    },
    timeout: 60000
  });
  if (!_0x592be9.data?.success) throw new Error(_0x592be9.data?.error || _0x592be9.data?.message || "Enlarger API failed");
  const _0x44ae5f = _0x592be9.data?.output_base64;
  if (!_0x44ae5f) throw new Error("No image data returned by API");
  return Buffer.from(_0x44ae5f, "base64");
}
export default {
  name: "enlarger",
  alias: ['enhance', "upscale", "aienlarge", 'hdimage', "enlargeimg"],
  category: 'ai',
  description: "AI-enlarge / upscale an image using xcasper API",
  async execute(_0x3f59fa, _0x33687f, _0x10f8bf, _0x25aacb) {
    const _0x1aad52 = _0x33687f.key.remoteJid, _0x4a19c7 = _0x5824c8 => _0x3f59fa.sendMessage(_0x1aad52, {
      text: _0x5824c8
    }, {
      quoted: _0x33687f
    }), _0x1d3e23 = getImageMessage(_0x33687f);
    if (!_0x1d3e23) return _0x4a19c7("╭─⌈ *ENLARGER* ⌋\n" + '│\x0a' + "├─⊷ *Usage:* Reply to an image with\n" + ("│  " + _0x25aacb + "enlarger\n") + '│\x0a' + "├─⊷ AI upscales & enhances the image\n" + "│  resolution using xcasper AI\n" + '│\x0a' + ("╰⊷ " + getFooter(_0x33687f.key.participant || _0x33687f.key.remoteJid)));
    await _0x3f59fa.sendMessage(_0x1aad52, {
      react: {
        text: '' + STATUS.LOADING,
        key: _0x33687f.key
      }
    });
    let _0x56f4b2;
    try {
      _0x56f4b2 = await downloadImageBuffer(_0x1d3e23);
    } catch (_0x1d8f58) {
      return (await _0x3f59fa.sendMessage(_0x1aad52, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x33687f.key
        }
      }), _0x4a19c7(STATUS.ERROR + " Failed to download the image.\n\n_" + _0x1d8f58.message + '_'));
    }
    let _0x33a174;
    try {
      _0x33a174 = await uploadToCatbox(_0x56f4b2);
    } catch (_0x2aa5f8) {
      return (await _0x3f59fa.sendMessage(_0x1aad52, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x33687f.key
        }
      }), _0x4a19c7(STATUS.ERROR + " Failed to upload image for processing.\n\n_" + _0x2aa5f8.message + '_'));
    }
    let _0x1d9484;
    try {
      _0x1d9484 = await enlargeImage(_0x33a174);
    } catch (_0x3c7791) {
      return (await _0x3f59fa.sendMessage(_0x1aad52, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x33687f.key
        }
      }), _0x4a19c7(STATUS.ERROR + " Image enlargement failed.\n\n_" + _0x3c7791.message + '_'));
    }
    try {
      await _0x3f59fa.sendMessage(_0x1aad52, {
        image: _0x1d9484,
        caption: STATUS.SUCCESS + " *Image Enlarged*\n" + getFooter(_0x33687f.key.participant || _0x33687f.key.remoteJid)
      }, {
        quoted: _0x33687f
      });
    } catch (_0x3887ca) {
      return (await _0x3f59fa.sendMessage(_0x1aad52, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x33687f.key
        }
      }), _0x4a19c7(STATUS.ERROR + " Failed to send the enlarged image.\n\n_" + _0x3887ca.message + '_'));
    }
    await _0x3f59fa.sendMessage(_0x1aad52, {
      react: {
        text: '' + STATUS.SUCCESS,
        key: _0x33687f.key
      }
    });
  }
};
