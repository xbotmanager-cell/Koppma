import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import {downloadMediaMessage} from 'wolfsocket';
import {chat, vision, visionMulti} from '../../lib/nvidia.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import {spawn} from 'node:child_process';
import {promises as _0x251745} from 'node:fs';
import {tmpdir} from 'node:os';
import _0x40ff57 from 'node:path';
import {randomBytes} from 'node:crypto';
import _0x4576f6 from '../../lib/ffmpegPath.js';
const MODEL = "nvidia/nemotron-nano-12b-v2-vl", MAX_VIDEO_BYTES = 30 * 1024 * 1024, MAX_VIDEO_SECS = 180;
function runCmd(_0x309252, _0x39dbf2, _0xf7223f = 30000) {
  return new Promise((_0x3a7df6, _0x4069de) => {
    const _0x7184ba = spawn(_0x309252, _0x39dbf2);
    let _0x5fff81 = '', _0x1451be = '';
    const _0x3031d0 = setTimeout(() => {
      (_0x7184ba.kill('SIGKILL'), _0x4069de(new Error(_0x309252 + " timed out")));
    }, _0xf7223f);
    (_0x7184ba.stdout.on("data", _0x1d9132 => {
      _0x5fff81 += _0x1d9132.toString();
    }), _0x7184ba.stderr.on("data", _0x1f15ed => {
      _0x1451be += _0x1f15ed.toString();
    }), _0x7184ba.on('error', _0x5ab518 => {
      (clearTimeout(_0x3031d0), _0x4069de(_0x5ab518));
    }), _0x7184ba.on("close", _0x51db6f => {
      clearTimeout(_0x3031d0);
      if (_0x51db6f === 0) _0x3a7df6({
        stdout: _0x5fff81,
        stderr: _0x1451be
      }); else _0x4069de(new Error(_0x309252 + " exited " + _0x51db6f + ':\x20' + _0x1451be.slice(0, 300)));
    }));
  });
}
async function probeDuration(_0x2e2cf4) {
  const {stdout: _0x5a73fe} = await runCmd("ffprobe", ['-v', "error", "-show_entries", 'format=duration', "-of", "default=noprint_wrappers=1:nokey=1", _0x2e2cf4], 15000), _0x3f5113 = parseFloat(_0x5a73fe.trim());
  if (!Number.isFinite(_0x3f5113) || _0x3f5113 <= 0) throw new Error("Could not read video duration");
  return _0x3f5113;
}
function pickFrameCount(_0x5e02e5) {
  if (_0x5e02e5 < 5) return 4;
  if (_0x5e02e5 < 15) return 6;
  return 8;
}
async function extractFrames(_0x27db9f, _0x4de2b4, _0x34d828, _0x37af7f) {
  const _0x1d6113 = _0x4de2b4 / _0x34d828, _0x526fc0 = _0x40ff57.join(_0x37af7f, "frame_%02d.jpg");
  await runCmd(_0x4576f6, ['-y', '-i', _0x27db9f, "-vf", "fps=" + _0x1d6113.toFixed(6) + ",scale=640:-2:force_original_aspect_ratio=decrease", "-frames:v", String(_0x4de2b4), '-q:v', '5', _0x526fc0], 60000);
  const _0x26be61 = [];
  for (let _0x2b0867 = 1; _0x2b0867 <= _0x4de2b4; _0x2b0867++) {
    const _0x482bbb = _0x40ff57.join(_0x37af7f, "frame_" + String(_0x2b0867).padStart(2, '0') + '.jpg');
    try {
      _0x26be61.push(await _0x251745.readFile(_0x482bbb));
    } catch {}
  }
  if (_0x26be61.length === 0) throw new Error('ffmpeg\x20produced\x20no\x20frames');
  return _0x26be61;
}
export default {
  name: 'nemotron',
  description: "NVIDIA Nemotron Nano 12B VL — text chat, image & video understanding",
  category: 'ai',
  aliases: ["nemo", "nemoai", 'nvai', "vlm"],
  usage: "nemotron [question] | reply to an image/video with .nemotron <question>",
  async execute(_0x4855a7, _0x47887f, _0x413fb3, _0x196dce) {
    const _0x394b69 = _0x47887f.key.remoteJid, _0x29f73d = getOwnerName().toUpperCase(), _0x43af20 = _0x413fb3.length > 0 ? _0x413fb3.join('\x20') : '', _0x8ba390 = _0x47887f.message?.extendedTextMessage?.contextInfo?.quotedMessage, _0x5e0dd8 = _0x8ba390?.imageMessage, _0x516fa0 = _0x8ba390?.videoMessage, _0xf47da0 = (_0x43af20.match(/\bhttps?:\/\/\S+\.(?:jpe?g|png|webp|gif|bmp)(?:\?\S*)?/i) || [])[0];
    if (!_0x43af20 && !_0x5e0dd8 && !_0x516fa0) return _0x4855a7.sendMessage(_0x394b69, {
      text: "╭┄〔 " + MEDIA.DESIGN + " *NEMOTRON VL* 〕┄╮\n" + ("┆ ✦ *" + _0x196dce + "nemo <question>*\n") + "┆   └─ Chat, or reply to image/video\n" + ("╰┄ " + getFooter(_0x47887f.key.participant || _0x47887f.key.remoteJid))
    }, {
      quoted: _0x47887f
    });
    let _0x2050ed = null;
    try {
      await _0x4855a7.sendMessage(_0x394b69, {
        react: {
          text: '' + MEDIA.DESIGN,
          key: _0x47887f.key
        }
      });
      let _0x49cf04, _0x1764c0 = "TEXT";
      if (_0x516fa0) {
        _0x1764c0 = "VIDEO";
        const _0xe924a7 = Number(_0x516fa0.fileLength) || 0;
        if (_0xe924a7 > MAX_VIDEO_BYTES) throw new Error("Video too large (" + (_0xe924a7 / 1048576).toFixed(1) + '\x20MB\x20>\x2030\x20MB\x20cap)');
        const _0x20175a = await downloadMediaMessage({
          key: _0x47887f.key,
          message: _0x8ba390
        }, "buffer", {}, {
          reuploadRequest: _0x4855a7.updateMediaMessage,
          logger: console
        });
        if (!_0x20175a || _0x20175a.length === 0) throw new Error("Could not download the video from WhatsApp");
        if (_0x20175a.length > MAX_VIDEO_BYTES) throw new Error("Video too large (" + (_0x20175a.length / 1048576).toFixed(1) + " MB > 30 MB cap)");
        const _0x5ede71 = randomBytes(6).toString("hex");
        (_0x2050ed = _0x40ff57.join(tmpdir(), "nemo_vid_" + _0x5ede71), await _0x251745.mkdir(_0x2050ed, {
          recursive: true
        }));
        const _0x4e41d5 = _0x40ff57.join(_0x2050ed, "in.mp4");
        await _0x251745.writeFile(_0x4e41d5, _0x20175a);
        const _0x5de2ea = await probeDuration(_0x4e41d5);
        if (_0x5de2ea > MAX_VIDEO_SECS) throw new Error("Video too long (" + _0x5de2ea.toFixed(0) + " s > 180 s cap)");
        const _0x2f6613 = pickFrameCount(_0x5de2ea), _0x51b3f1 = await extractFrames(_0x4e41d5, _0x2f6613, _0x5de2ea, _0x2050ed), _0x3fa794 = _0x43af20?.trim() || 'Describe\x20what\x20is\x20happening\x20in\x20this\x20video.', _0x583304 = "These are " + _0x51b3f1.length + '\x20sequential\x20frames\x20sampled\x20evenly\x20from\x20a\x20' + _0x5de2ea.toFixed(1) + "-second video. " + ("Treat them as a timeline (frame 1 = start, frame " + _0x51b3f1.length + '\x20=\x20end).\x20') + ('' + _0x3fa794);
        _0x49cf04 = await visionMulti(_0x583304, _0x51b3f1, {
          model: MODEL,
          maxTokens: 2048,
          timeoutMs: 120000
        });
      } else {
        if (_0x5e0dd8) {
          _0x1764c0 = "IMAGE";
          const _0x5352d4 = await downloadMediaMessage({
            key: _0x47887f.key,
            message: _0x8ba390
          }, "buffer", {}, {
            reuploadRequest: _0x4855a7.updateMediaMessage,
            logger: console
          });
          if (!_0x5352d4 || _0x5352d4.length === 0) throw new Error("Could not download the image from WhatsApp");
          _0x49cf04 = await vision(_0x43af20 || 'Describe\x20this\x20image\x20in\x20detail.', _0x5352d4, {
            model: MODEL,
            maxTokens: 2048,
            timeoutMs: 90000
          });
        } else {
          if (_0xf47da0) {
            _0x1764c0 = "IMAGE";
            const _0x4fd227 = _0x43af20.replace(_0xf47da0, '').trim() || "Describe this image in detail.";
            _0x49cf04 = await vision(_0x4fd227, _0xf47da0, {
              model: MODEL,
              maxTokens: 2048,
              timeoutMs: 90000
            });
          } else _0x49cf04 = await chat(_0x43af20, {
            model: MODEL,
            system: 'You\x20are\x20Nemotron,\x20a\x20helpful\x20and\x20concise\x20AI\x20assistant\x20by\x20NVIDIA.',
            maxTokens: 2048,
            timeoutMs: 90000
          });
        }
      }
      _0x49cf04 = _0x49cf04.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      if (_0x49cf04.length > 4000) _0x49cf04 = _0x49cf04.substring(0, 4000) + '\x0a\x0a_...(truncated)_';
      (await _0x4855a7.sendMessage(_0x394b69, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x47887f.key
        }
      }), await _0x4855a7.sendMessage(_0x394b69, {
        text: MEDIA.DESIGN + " *NEMOTRON VL* — " + _0x1764c0 + '\x0a' + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + (_0x49cf04 + '\x0a') + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + ('' + getFooter(_0x47887f.key.participant || _0x47887f.key.remoteJid))
      }, {
        quoted: _0x47887f
      }));
    } catch (_0x147c6e) {
      (console.error('[NEMOTRON]\x20Error:', _0x147c6e.message), await _0x4855a7.sendMessage(_0x394b69, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x47887f.key
        }
      }), await _0x4855a7.sendMessage(_0x394b69, {
        text: STATUS.ERROR + " *Nemotron Error*\n\n" + _0x147c6e.message + "\n\nPlease try again."
      }, {
        quoted: _0x47887f
      }));
    } finally {
      _0x2050ed && _0x251745.rm(_0x2050ed, {
        recursive: true,
        force: true
      }).catch(() => {});
    }
  }
};
