import {STATUS, UI, MEDIA, SOCIAL, BRAND} from '../../lib/emojis.js';
import _0x1843c6 from 'axios';
import {downloadMediaMessage} from 'wolfsocket';
import _0x245fa1 from 'fs';
import _0x221712 from 'path';
import {exec} from 'child_process';
import {promisify} from 'util';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import _0x4e96c4 from 'form-data';
const execAsync = promisify(exec);
async function groqTranscribe(_0x9ee04d) {
  const _0x4cb3b6 = process.env.GROQ_API_KEY;
  if (!_0x4cb3b6) throw new Error('GROQ_API_KEY\x20not\x20set');
  const _0x4aebe5 = new _0x4e96c4();
  (_0x4aebe5.append('file', _0x9ee04d, {
    filename: "audio.mp3",
    contentType: "audio/mpeg"
  }), _0x4aebe5.append("model", "whisper-large-v3"), _0x4aebe5.append('response_format', "json"));
  const _0xf90113 = await _0x1843c6.post("https://api.groq.com/openai/v1/audio/transcriptions", _0x4aebe5, {
    headers: {
      ..._0x4aebe5.getHeaders(),
      Authorization: "Bearer " + _0x4cb3b6
    },
    timeout: 60000
  }), _0x560e30 = _0xf90113.data?.text?.trim();
  if (!_0x560e30) throw new Error("Groq returned empty transcription");
  return {
    text: _0x560e30,
    language: _0xf90113.data?.language || '',
    duration: _0xf90113.data?.duration || 0
  };
}
async function keithTranscribeUrl(_0xc51522) {
  const _0x3ff153 = await _0x1843c6.get("https://apiskeith.top/ai/transcribe", {
    params: {
      url: _0xc51522
    },
    timeout: 60000
  });
  if (!_0x3ff153.data?.status) throw new Error(_0x3ff153.data?.err || "Keith API returned no result");
  const _0x6648b6 = _0x3ff153.data?.result?.text?.trim();
  if (!_0x6648b6) throw new Error('Empty\x20transcription');
  return {
    text: _0x6648b6,
    language: _0x3ff153.data?.result?.language || '',
    duration: _0x3ff153.data?.result?.duration || 0
  };
}
const XCASPER_TRANSCRIPT = "https://apis.xcasper.space/api/tools/transcript", YT_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_\-]{11})/;
function extractYtId(_0x522068) {
  const _0x1fa018 = _0x522068.match(YT_REGEX);
  return _0x1fa018 ? _0x1fa018[1] : null;
}
async function fetchYtTranscript(_0x19098a, _0x2f7ae9 = 'en') {
  const _0xd93dd = (/^[A-Za-z0-9_\-]{11}$/).test(_0x19098a), _0x212bea = _0xd93dd ? {
    id: _0x19098a,
    lang: _0x2f7ae9
  } : {
    url: _0x19098a,
    lang: _0x2f7ae9
  }, _0xd521cc = await _0x1843c6.get(XCASPER_TRANSCRIPT, {
    params: _0x212bea,
    timeout: 30000
  });
  if (!_0xd521cc.data?.success) throw new Error(_0xd521cc.data?.error || _0xd521cc.data?.message || "Transcript fetch failed");
  return _0xd521cc.data;
}
async function convertToMp3(_0x3524d5) {
  const _0x358bd4 = _0x221712.join(process.cwd(), "tmp", 'transcribe');
  if (!_0x245fa1.existsSync(_0x358bd4)) _0x245fa1.mkdirSync(_0x358bd4, {
    recursive: true
  });
  const _0x41660b = Date.now(), _0x5ed903 = _0x221712.join(_0x358bd4, "input_" + _0x41660b + '.ogg'), _0x4193e3 = _0x221712.join(_0x358bd4, "output_" + _0x41660b + ".mp3");
  _0x245fa1.writeFileSync(_0x5ed903, _0x3524d5);
  try {
    await execAsync("ffmpeg -i \"" + _0x5ed903 + "\" -ar 16000 -ac 1 -b:a 64k -y \"" + _0x4193e3 + '\x22', {
      timeout: 30000
    });
    const _0x2be5f3 = _0x245fa1.readFileSync(_0x4193e3);
    try {
      _0x245fa1.unlinkSync(_0x5ed903);
    } catch {}
    try {
      _0x245fa1.unlinkSync(_0x4193e3);
    } catch {}
    return _0x2be5f3;
  } catch {
    try {
      _0x245fa1.unlinkSync(_0x5ed903);
    } catch {}
    return _0x3524d5;
  }
}
export default {
  name: 'totext',
  alias: ["transcribe", "speech2text", "audio2text", "whisper", "stt", "transcript", "yttranscript"],
  category: 'ai',
  description: "Convert audio to text OR extract YouTube transcript",
  async execute(_0xca3a57, _0x2b2cee, _0x14fb24, _0x4119e1) {
    const _0x49a6a0 = _0x2b2cee.key.remoteJid, _0x2a071d = _0x3e8df => _0xca3a57.sendMessage(_0x49a6a0, {
      text: _0x3e8df
    }, {
      quoted: _0x2b2cee
    }), _0x1f7e0b = _0x14fb24.join('\x20').trim(), _0x4e5675 = _0x2b2cee.message?.extendedTextMessage?.contextInfo?.quotedMessage, _0x354c02 = _0x1f7e0b ? extractYtId(_0x1f7e0b) : null;
    if (_0x354c02 || _0x1f7e0b && (/^[A-Za-z0-9_\-]{11}$/).test(_0x1f7e0b)) {
      const _0x2311bc = _0x354c02 || _0x1f7e0b, _0x3bafec = _0x14fb24.find(_0x135239 => (/^[a-z]{2}(-[A-Z]{2})?$/).test(_0x135239) && _0x135239 !== _0x2311bc) || 'en';
      await _0xca3a57.sendMessage(_0x49a6a0, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x2b2cee.key
        }
      });
      let _0x381eb0;
      try {
        _0x381eb0 = await fetchYtTranscript(_0x2311bc, _0x3bafec);
      } catch (_0x37e768) {
        return (await _0xca3a57.sendMessage(_0x49a6a0, {
          react: {
            text: '' + STATUS.ERROR,
            key: _0x2b2cee.key
          }
        }), _0x2a071d(STATUS.ERROR + " Failed to fetch transcript.\n\n_" + _0x37e768.message + '_'));
      }
      const {fullText: _0x4d0b9e, wordCount: _0x3b1afc, segmentCount: _0x547512, language: _0xada579, thumbnail: _0x4f6ca3, videoId: _0x11d752} = _0x381eb0, _0x3f5b5f = _0x4d0b9e?.length > 3800 ? _0x4d0b9e.slice(0, 3800) + '\x0a…' : _0x4d0b9e;
      if (_0x4f6ca3) try {
        const _0xed2c47 = await _0x1843c6.get(_0x4f6ca3, {
          responseType: "arraybuffer",
          timeout: 10000
        });
        await _0xca3a57.sendMessage(_0x49a6a0, {
          image: Buffer.from(_0xed2c47.data),
          caption: UI.DOCUMENT + " *YouTube Transcript*\n" + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + (UI.ID + " *Video:* " + _0x11d752 + '\x0a') + (SOCIAL.GLOBE + " *Lang:* " + _0xada579 + '\x0a') + (UI.CHART + " *Words:* " + _0x3b1afc + "  •  *Segments:* " + _0x547512 + '\x0a') + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n\n" + (_0x3f5b5f + '\x0a\x0a') + (BRAND.WOLF + '\x20_' + getOwnerName().toUpperCase() + " TECH_")
        }, {
          quoted: _0x2b2cee
        });
      } catch {
        await _0x2a071d(UI.DOCUMENT + " *YouTube Transcript*\n" + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + (UI.ID + '\x20*Video:*\x20' + _0x11d752 + '\x0a') + (SOCIAL.GLOBE + " *Lang:* " + _0xada579 + '\x0a') + (UI.CHART + " *Words:* " + _0x3b1afc + '\x20\x20•\x20\x20*Segments:*\x20' + _0x547512 + '\x0a') + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n\n" + (_0x3f5b5f + '\x0a\x0a') + (BRAND.WOLF + '\x20_' + getOwnerName().toUpperCase() + " TECH_"));
      } else await _0x2a071d(UI.DOCUMENT + " *YouTube Transcript*\n" + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n" + (UI.ID + " *Video:* " + _0x11d752 + '\x0a') + (SOCIAL.GLOBE + " *Lang:* " + _0xada579 + '\x0a') + (UI.CHART + '\x20*Words:*\x20' + _0x3b1afc + "  •  *Segments:* " + _0x547512 + '\x0a') + "┈┄┈┄✦┈┄┈┄✦┈┄┈┄\n\n" + (_0x3f5b5f + '\x0a\x0a') + (BRAND.WOLF + '\x20_' + getOwnerName().toUpperCase() + " TECH_"));
      await _0xca3a57.sendMessage(_0x49a6a0, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x2b2cee.key
        }
      });
      return;
    }
    if (!_0x4e5675) return _0x2a071d('╭┄〔 \x20*TRANSCRIBE*\x20 〕┄╮\x0a' + '┆\x0a' + "┆ ✦ *Audio → Text:*\n" + "┆  Reply to a voice note / audio\n" + ("┆  " + _0x4119e1 + 'totext\x0a') + '┆\x0a' + "┆ ✦ *YouTube Transcript:*\n" + ('┆ \x20' + _0x4119e1 + "totext <YouTube URL>\n") + ("┆  " + _0x4119e1 + "totext <video ID>\n") + ('┆ \x20' + _0x4119e1 + 'totext\x20<URL>\x20fr\x20\x20←\x20with\x20language\x0a') + '┆\x0a' + ("╰┄ " + getFooter(_0x2b2cee.key.participant || _0x2b2cee.key.remoteJid)));
    if (!_0x4e5675.audioMessage && !_0x4e5675.videoMessage) return _0x2a071d(STATUS.ERROR + " Please reply to an audio message or voice note.");
    try {
      await _0xca3a57.sendMessage(_0x49a6a0, {
        react: {
          text: '' + STATUS.LOADING,
          key: _0x2b2cee.key
        }
      });
      const _0x369a93 = {
        key: {
          id: _0x2b2cee.message.extendedTextMessage.contextInfo.stanzaId,
          remoteJid: _0x49a6a0,
          participant: _0x2b2cee.message.extendedTextMessage.contextInfo.participant
        },
        message: _0x4e5675
      }, _0x3971af = await downloadMediaMessage(_0x369a93, "buffer", {});
      if (!_0x3971af || _0x3971af.length === 0) throw new Error("Failed to download audio");
      const _0x50134e = await convertToMp3(_0x3971af);
      let _0x3f54cf = '', _0x48d765 = '', _0x2b26a0 = 0;
      try {
        console.log(MEDIA.MIC + '\x20[TOTEXT]\x20Trying\x20Groq\x20Whisper...');
        const _0x607272 = await groqTranscribe(_0x50134e);
        (_0x3f54cf = _0x607272.text, _0x48d765 = _0x607272.language, _0x2b26a0 = _0x607272.duration, console.log(STATUS.SUCCESS + " [TOTEXT] Groq success. Lang: " + _0x48d765));
      } catch (_0x3da2a8) {
        console.warn(STATUS.WARNING + " [TOTEXT] Groq failed: " + _0x3da2a8.message);
      }
      if (!_0x3f54cf) try {
        console.log(MEDIA.MIC + '\x20[TOTEXT]\x20Trying\x20Keith\x20URL\x20API...');
        const _0x3cfe60 = _0x221712.join(process.cwd(), "tmp"), _0x6f21d5 = _0x221712.join(_0x3cfe60, "wolf_stt_" + Date.now() + ".mp3");
        _0x245fa1.writeFileSync(_0x6f21d5, _0x50134e);
        const _0xf0a566 = "https://" + process.env.REPLIT_DEV_DOMAIN + "/tmp/wolf_stt_" + _0x221712.basename(_0x6f21d5), _0x1ba908 = await keithTranscribeUrl(_0xf0a566);
        (_0x3f54cf = _0x1ba908.text, _0x48d765 = _0x1ba908.language, _0x2b26a0 = _0x1ba908.duration);
        try {
          _0x245fa1.unlinkSync(_0x6f21d5);
        } catch {}
        console.log(STATUS.SUCCESS + " [TOTEXT] Keith success. Lang: " + _0x48d765);
      } catch (_0x9f517f) {
        console.warn(STATUS.WARNING + " [TOTEXT] Keith failed: " + _0x9f517f.message);
      }
      if (!_0x3f54cf) return (await _0xca3a57.sendMessage(_0x49a6a0, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x2b2cee.key
        }
      }), _0x2a071d("╭⌈ " + STATUS.ERROR + " *TRANSCRIPTION FAILED* 〕┄╮\n" + '┆ ✦ \x20No\x20working\x20transcription\x20service\x20available.\x0a' + '┆\x0a' + ("┆ ✦ " + UI.KEY + '\x20*Fix:*\x20Add\x20a\x20free\x20Groq\x20API\x20key:\x0a') + "┆   1. Go to console.groq.com\n" + '┆ \x20\x202.\x20Create\x20a\x20free\x20account\x0a' + '┆ \x20\x203.\x20Generate\x20an\x20API\x20key\x0a' + '┆ \x20\x204.\x20Add\x20it\x20as\x20*GROQ_API_KEY*\x20in\x20Secrets\x0a' + '┆\x0a' + ('╰┄ \x20' + getFooter(_0x2b2cee.key.participant || _0x2b2cee.key.remoteJid))));
      const _0x5ac0c4 = _0x3f54cf.split(/\s+/).filter(_0x22e8bc => _0x22e8bc.length > 0).length, _0x5944cf = _0x2b26a0 ? UI.TIMER + '\x20' + Math.round(_0x2b26a0) + "s  •  " : '';
      (await _0x2a071d("╭⌈ " + MEDIA.MIC + '\x20*TRANSCRIPTION*\x20 〕┄╮\x0a' + (_0x48d765 ? "┆ ✦ Language : *" + _0x48d765 + '*\x0a' : '') + ("┆ ✦ " + _0x5944cf + UI.CHART + '\x20' + _0x5ac0c4 + '\x20words\x0a') + '┆\x0a' + (_0x3f54cf + '\x0a') + '┆\x0a' + ("╰┄ " + getFooter(_0x2b2cee.key.participant || _0x2b2cee.key.remoteJid))), await _0xca3a57.sendMessage(_0x49a6a0, {
        react: {
          text: '' + STATUS.SUCCESS,
          key: _0x2b2cee.key
        }
      }));
    } catch (_0x14f04b) {
      (await _0xca3a57.sendMessage(_0x49a6a0, {
        react: {
          text: '' + STATUS.ERROR,
          key: _0x2b2cee.key
        }
      }), await _0x2a071d(STATUS.ERROR + " Transcription failed: " + _0x14f04b.message));
    }
  }
};
