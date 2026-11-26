import fs from 'node:fs';
import { execSync } from 'node:child_process';

let ffmpegPath = '/usr/bin/ffmpeg';

try {
  if (fs.existsSync('/usr/bin/ffmpeg')) {
    ffmpegPath = '/usr/bin/ffmpeg';
  } else if (fs.existsSync('/usr/local/bin/ffmpeg')) {
    ffmpegPath = '/usr/local/bin/ffmpeg';
  } else {
    const whichFfmpeg = execSync('which ffmpeg', { encoding: 'utf8' }).trim();
    if (whichFfmpeg && fs.existsSync(whichFfmpeg)) {
      ffmpegPath = whichFfmpeg;
    }
  }
} catch {
  // fallback to ffmpeg-static if present
  try {
    const ffmpegStatic = await import('ffmpeg-static');
    if (ffmpegStatic.default) ffmpegPath = ffmpegStatic.default;
  } catch {}
}

console.log(`[ffmpegPath] resolved → ${ffmpegPath}`);
export default ffmpegPath;
export { ffmpegPath };
