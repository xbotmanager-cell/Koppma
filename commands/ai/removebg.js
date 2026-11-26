import _0x1c40f8 from 'axios';
import _0x14710f from 'fs';
import _0x42a891 from 'path';
import {fileURLToPath} from 'url';
import {downloadMediaMessage} from 'wolfsocket';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x42a891.dirname(__filename);
export default {
  name: 'removebg',
  description: "Remove background from replied image",
  category: 'ai',
  aliases: ["rmbg", "bgremove", "nobg", "transparentbg"],
  async execute(_0x18c237, _0x1e0712, _0x43b2ff, _0x32c4b0, _0x2482c9) {
    const _0x2cf632 = _0x1e0712.key.remoteJid;
    try {
      const _0x20b142 = _0x1e0712.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!_0x20b142?.imageMessage) return _0x18c237.sendMessage(_0x2cf632, {
        text: "╭┄〔 🎨 *REMOVE BG* 〕┄╮\n┆ ✦ Reply to image with *" + _0x32c4b0 + 'removebg*\x0a┆ \x20╰┄ \x20Remove\x20image\x20background\x0a┆ ✦ *' + _0x32c4b0 + "rmbg*\n┆   └─ Alias for removebg\n╰┄ " + getFooter(_0x1e0712.key.participant || _0x1e0712.key.remoteJid)
      }, {
        quoted: _0x1e0712
      });
      await _0x18c237.sendMessage(_0x2cf632, {
        react: {
          text: '⏳',
          key: _0x1e0712.key
        }
      });
      let _0x35620c;
      try {
        console.log("📥 Downloading image for removebg...");
        const _0x509ba0 = {
          key: _0x1e0712.key,
          message: {
            ..._0x20b142
          }
        };
        _0x35620c = await downloadMediaMessage(_0x509ba0, "buffer", {}, {
          reuploadRequest: _0x18c237.updateMediaMessage,
          logger: console
        });
        if (!_0x35620c || _0x35620c.length === 0) throw new Error('Received\x20empty\x20image\x20buffer');
        console.log("✅ Downloaded " + _0x35620c.length + '\x20bytes\x20for\x20removebg');
      } catch (_0x22c93d) {
        return (console.error('❌\x20RemoveBG\x20Download\x20Error:', _0x22c93d.message), _0x18c237.sendMessage(_0x2cf632, {
          text: '❌\x20*Failed\x20to\x20download\x20image*\x0a\x0a' + "Possible reasons:\n" + "• Image might be too old\n" + "• Media encryption issue\n" + "• Try sending the image again\n\n" + "💡 *Tip:* Send a fresh image for best results"
        }, {
          quoted: _0x1e0712
        }));
      }
      const _0xcf5903 = _0x35620c.length / (1024 * 1024);
      if (_0xcf5903 > 5) return _0x18c237.sendMessage(_0x2cf632, {
        text: "❌ *File Too Large*\n\n" + ("Size: " + _0xcf5903.toFixed(2) + " MB\n") + 'Limit:\x205\x20MB\x0a\x0a' + '💡\x20*Solution:*\x0a' + '•\x20Compress\x20the\x20image\x0a' + "• Use smaller image\n" + '•\x20Crop\x20unnecessary\x20areas'
      }, {
        quoted: _0x1e0712
      });
      console.log("🌐 Uploading to image hosting...");
      const _0x794981 = await uploadToFreeImageHosting(_0x35620c);
      if (!_0x794981 || !_0x794981.startsWith('http')) throw new Error("Failed to upload image to hosting service");
      (console.log("✅ Image uploaded: " + _0x794981), console.log('🔗\x20Calling\x20removebg\x20API\x20with\x20URL:\x20' + _0x794981));
      let _0x497e1e = '';
      try {
        const _0x34e669 = await _0x1c40f8({
          method: 'GET',
          url: 'https://apiskeith.vercel.app/ai/removebg',
          params: {
            url: _0x794981
          },
          timeout: 60000,
          headers: {
            Accept: "application/json",
            'User-Agent': "WhatsApp-Bot/1.0"
          }
        });
        console.log("✅ RemoveBG API response status: " + _0x34e669.status);
        if (_0x34e669.data && typeof _0x34e669.data === "object") {
          const _0x4958df = _0x34e669.data;
          if (_0x4958df.status === true && _0x4958df.result) _0x497e1e = _0x4958df.result; else {
            if (_0x4958df.url) _0x497e1e = _0x4958df.url; else {
              if (_0x4958df.image) _0x497e1e = _0x4958df.image; else {
                if (_0x4958df.error) throw new Error(_0x4958df.error); else {
                  const _0x45b50c = JSON.stringify(_0x4958df), _0x49f711 = _0x45b50c.match(/https?:\/\/[^\s"']+/);
                  _0x49f711 && (_0x497e1e = _0x49f711[0]);
                }
              }
            }
          }
        }
      } catch (_0x447bd7) {
        console.error("❌ RemoveBG API Error:", _0x447bd7.message);
        try {
          const _0x2fb6d2 = await _0x1c40f8.get("https://apiskeith.vercel.app/ai/removebg?image=" + encodeURIComponent(_0x794981), {
            timeout: 60000
          });
          _0x2fb6d2.data?.status === true && _0x2fb6d2.data?.result && (_0x497e1e = _0x2fb6d2.data.result);
        } catch (_0x1080d8) {
          throw new Error("API failed: " + _0x447bd7.message + " | Alternative: " + _0x1080d8.message);
        }
      }
      if (!_0x497e1e || !_0x497e1e.startsWith("http")) throw new Error("No valid image URL returned from API");
      (console.log("✅ RemoveBG result: " + _0x497e1e), await _0x18c237.sendMessage(_0x2cf632, {
        image: {
          url: _0x497e1e
        },
        caption: '✨\x20*Background\x20removed\x20successfully!*\x0a' + "✅ AI processing completed\n" + '⚡\x20Powered\x20by\x20Keith\x20API'
      }, {
        quoted: _0x1e0712
      }), await _0x18c237.sendMessage(_0x2cf632, {
        react: {
          text: '✅',
          key: _0x1e0712.key
        }
      }));
    } catch (_0x41862f) {
      (console.error("❌ [RemoveBG] ERROR:", _0x41862f), await _0x18c237.sendMessage(_0x2cf632, {
        react: {
          text: '❌',
          key: _0x1e0712.key
        }
      }));
      let _0x2eb6ef = "❌ *Background removal failed*\n\n";
      if (_0x41862f.message?.includes("413")) (_0x2eb6ef += "• Image too large for API\n", _0x2eb6ef += "• Try smaller image (<2MB)\n"); else {
        if (_0x41862f.code === "ECONNREFUSED" || _0x41862f.code === "ENOTFOUND") (_0x2eb6ef += "• RemoveBG API is unavailable\n", _0x2eb6ef += "• Please try again later\n"); else {
          if (_0x41862f.code === "ETIMEDOUT") (_0x2eb6ef += "• Request timed out (60s)\n", _0x2eb6ef += "• Try a smaller image\n"); else {
            if (_0x41862f.message?.includes("No valid image")) (_0x2eb6ef += "• API returned invalid response\n", _0x2eb6ef += "• Try a different image\n"); else {
              if (_0x41862f.message?.includes('Failed\x20to\x20upload')) (_0x2eb6ef += '•\x20Image\x20hosting\x20service\x20failed\x0a', _0x2eb6ef += "• Try again in a minute\n"); else _0x41862f.message && (_0x2eb6ef += '•\x20' + _0x41862f.message + '\x0a');
            }
          }
        }
      }
      (_0x2eb6ef += "\n💡 *Tips for better results:*\n", _0x2eb6ef += "• Use images <2MB\n", _0x2eb6ef += "• Clear foreground objects\n", _0x2eb6ef += '•\x20Simple\x20backgrounds\x0a', _0x2eb6ef += "• Good lighting\n", _0x2eb6ef += "• PNG format works best\n\n", _0x2eb6ef += '🔄\x20*Try\x20again:*\x20Reply\x20to\x20image\x20with\x20`' + _0x32c4b0 + "removebg`", await _0x18c237.sendMessage(_0x2cf632, {
        text: _0x2eb6ef
      }, {
        quoted: _0x1e0712
      }));
    }
  }
};
async function uploadToFreeImageHosting(_0x5e234c) {
  const _0x43039e = [uploadToPtPImg, uploadToImgBB, uploadToFreeImageHost];
  for (const _0x3a9fbc of _0x43039e) {
    try {
      console.log('Trying\x20' + _0x3a9fbc.name + "...");
      const _0x47c27f = await _0x3a9fbc(_0x5e234c);
      if (_0x47c27f && _0x47c27f.startsWith("http")) return (console.log('✅\x20Success\x20with\x20' + _0x3a9fbc.name + ':\x20' + _0x47c27f), _0x47c27f);
    } catch (_0x21b81d) {
      console.log('❌\x20' + _0x3a9fbc.name + " failed: " + _0x21b81d.message);
      continue;
    }
  }
  throw new Error("All image hosting services failed");
}
async function uploadToPtPImg(_0xfeb74d) {
  try {
    const _0x58fa10 = _0xfeb74d.toString("base64"), _0x4b95cb = new URLSearchParams();
    _0x4b95cb.append("file-upload[0]", _0x58fa10);
    const _0x54df2c = await _0x1c40f8.post('https://ptpimg.me/upload.php', _0x4b95cb.toString(), {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      timeout: 30000
    });
    if (_0x54df2c.data && Array.isArray(_0x54df2c.data) && _0x54df2c.data[0]?.code) return "https://ptpimg.me/" + _0x54df2c.data[0].code + '.' + _0x54df2c.data[0].ext;
    return null;
  } catch (_0x58b18e) {
    throw new Error('PtPImg:\x20' + _0x58b18e.message);
  }
}
async function uploadToImgBB(_0x40578a) {
  try {
    const _0x144279 = _0x40578a.toString("base64"), _0x4db535 = "60c3e5e339bbed1a90470b2938feab62", _0xc1baf7 = new URLSearchParams();
    (_0xc1baf7.append("key", _0x4db535), _0xc1baf7.append("image", _0x144279), _0xc1baf7.append("expiration", "600"));
    const _0x1f96ff = await _0x1c40f8.post("https://api.imgbb.com/1/upload", _0xc1baf7.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: "application/json"
      },
      timeout: 30000
    });
    if (_0x1f96ff.data?.success && _0x1f96ff.data?.data?.url) return _0x1f96ff.data.data.url;
    return null;
  } catch (_0x413cf2) {
    throw new Error("ImgBB: " + _0x413cf2.message);
  }
}
async function uploadToFreeImageHost(_0x243fd4) {
  try {
    const _0x3eb23e = new FormData();
    _0x3eb23e.append("source", Buffer.from(_0x243fd4));
    const _0x1c8936 = await _0x1c40f8.post("https://freeimage.host/api/1/upload", _0x3eb23e, {
      headers: {
        ..._0x3eb23e.getHeaders(),
        Accept: 'application/json'
      },
      params: {
        key: "6d207e02198a847aa98d0a2a901485a5"
      },
      timeout: 30000
    });
    if (_0x1c8936.data?.image?.url) return _0x1c8936.data.image.url;
    return null;
  } catch (_0x3e1096) {
    throw new Error("FreeImage: " + _0x3e1096.message);
  }
}
