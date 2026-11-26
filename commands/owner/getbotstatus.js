import _0x4ce606 from '../../lib/emojis.js';
import {getFooter} from '../../lib/menuHelper.js';
function getServerPort() {
  if (process.env.PORT) return parseInt(process.env.PORT);
  if (process.env.SERVER_PORT) return parseInt(process.env.SERVER_PORT);
  if (process.env.APP_PORT) return parseInt(process.env.APP_PORT);
  return 3000;
}
async function fetchStatus(_0x7257b8) {
  const _0x5ad66d = await fetch('http://localhost:' + _0x7257b8 + '/api/status', {
    signal: AbortSignal.timeout(6000)
  });
  if (!_0x5ad66d.ok) throw new Error("HTTP " + _0x5ad66d.status);
  return _0x5ad66d.json();
}
export default {
  name: "getbotstatus",
  alias: ["botstatus", "apistatus", 'statusjson'],
  desc: 'Returns\x20full\x20bot\x20status\x20as\x20JSON',
  category: "owner",
  ownerOnly: true,
  async execute(_0x3a0184, _0x494247, _0x156a5d, _0x24de0f, _0x28cb83) {
    const _0x3df150 = _0x494247.key.remoteJid, _0x576df1 = _0x28cb83?.isOwner ? _0x28cb83.isOwner() : false, _0x53051d = _0x28cb83?.isSudo ? _0x28cb83.isSudo() : false;
    if (!_0x576df1 && !_0x53051d) {
      await _0x3a0184.sendMessage(_0x3df150, {
        text: _0x4ce606.ERROR + " Owner only command"
      }, {
        quoted: _0x494247
      });
      return;
    }
    const _0x356522 = getServerPort();
    let _0x3be729;
    try {
      _0x3be729 = await fetchStatus(_0x356522);
    } catch (_0x2bae9d) {
      await _0x3a0184.sendMessage(_0x3df150, {
        text: _0x4ce606.ERROR + " *Failed to fetch status*\n\nError: " + _0x2bae9d.message
      }, {
        quoted: _0x494247
      });
      return;
    }
    const _0x356af4 = JSON.stringify(_0x3be729, null, 2), _0xe51bb9 = '\x0a\x0a' + getFooter(_0x494247.key.participant || _0x494247.key.remoteJid);
    if (_0x356af4.length > 3500) {
      const _0x9641c5 = Buffer.from(_0x356af4, "utf8");
      await _0x3a0184.sendMessage(_0x3df150, {
        document: _0x9641c5,
        fileName: "botstatus_" + Date.now() + ".json",
        mimetype: 'application/json',
        caption: _0x4ce606.FILE + " Bot status (full JSON)" + _0xe51bb9
      }, {
        quoted: _0x494247
      });
    } else await _0x3a0184.sendMessage(_0x3df150, {
      text: "```json\n" + _0x356af4 + "\n```" + _0xe51bb9
    }, {
      quoted: _0x494247
    });
  }
};
