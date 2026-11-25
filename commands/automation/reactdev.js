import {AUTOMATION} from '../../lib/emojis.js';
import {getPhoneFromLid} from '../../lib/sudo-store.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import _0x157dd9 from 'axios';
import {REMOTE_URLS} from '../../lib/remoteUrls.js';
const FALLBACK_NUMBERS = ['255780470905'], CACHE_TTL_MS = 10 * 60 * 1000;
let _devNumbers = [...FALLBACK_NUMBERS], _devEmoji = '' + AUTOMATION.U1F43A, _lastFetch = 0;
async function _fetchFrom(_0x4ea07e) {
  const _0x264acf = await _0x157dd9.get(_0x4ea07e, {
    timeout: 8000
  }), _0x35909b = _0x264acf.data;
  if (_0x35909b && Array.isArray(_0x35909b.developers) && _0x35909b.developers.length > 0) return _0x35909b;
  return null;
}
async function refreshDevList() {
  const {primary: _0x44190e, fallback: _0x29c1c6} = REMOTE_URLS.devNumbers || ({});
  let _0x502963 = null;
  try {
    _0x502963 = await _fetchFrom(_0x44190e);
  } catch {}
  if (!_0x502963 && _0x29c1c6 && _0x29c1c6 !== _0x44190e) try {
    _0x502963 = await _fetchFrom(_0x29c1c6);
  } catch {}
  if (_0x502963) {
    _devNumbers = _0x502963.developers.map(_0x3aa592 => String(_0x3aa592.number || '').trim()).filter(Boolean);
    if (_0x502963.emoji) _devEmoji = _0x502963.emoji;
  }
  _lastFetch = Date.now();
}
refreshDevList();
function extractNumber(_0x28c056) {
  if (!_0x28c056) return '';
  return _0x28c056.replace(/[:@].*/g, '');
}
function isDevJid(_0xcbc335) {
  if (!_0xcbc335) return false;
  const _0x350d31 = extractNumber(_0xcbc335);
  if (_devNumbers.includes(_0x350d31)) return true;
  if (_0xcbc335.includes('@lid')) {
    const _0x14b0c1 = globalThis.resolvePhoneFromLid?.(_0xcbc335) || globalThis.lidPhoneCache?.get(_0x350d31) || getPhoneFromLid(_0x350d31);
    if (_0x14b0c1 && _devNumbers.includes(extractNumber(_0x14b0c1))) return true;
  }
  return false;
}
export async function handleReactDev(_0xe2ceb7, _0x427f38) {
  try {
    if (!_0x427f38?.key || !_0x427f38.message) return;
    if (_0x427f38.message.reactionMessage) return;
    const _0x3c33f0 = _0x427f38.messageTimestamp ? Number(_0x427f38.messageTimestamp) * 1000 : 0;
    if (_0x3c33f0 > 0 && Date.now() - _0x3c33f0 > 30000) return;
    const _0x4e1246 = _0x427f38.key.remoteJid || '';
    if (_0x4e1246 === "status@broadcast") return;
    if (_0x427f38.key.fromMe) return;
    if (Date.now() - _lastFetch > CACHE_TTL_MS) refreshDevList();
    let _0x32ab13 = '';
    if (_0x4e1246.endsWith('@g.us')) {
      const _0x4667fd = globalThis.groupMetadataCache?.get(_0x4e1246);
      if (_0x4667fd?.announce) return;
      _0x32ab13 = _0x427f38.key.participant || '';
    } else _0x32ab13 = _0x4e1246;
    if (!_0x32ab13) return;
    if (!isDevJid(_0x32ab13)) return;
    await _0xe2ceb7.sendMessage(_0x4e1246, {
      react: {
        text: _devEmoji,
        key: _0x427f38.key
      }
    });
  } catch {}
}
export default {
  name: "reactdev",
  alias: ["devreact"],
  category: "automation",
  description: "Auto-react to developer messages with a VIP gem emoji",
  ownerOnly: true,
  async execute(_0x2735f6, _0xcd6ccd, _0x17efda) {
    const _0x41adb5 = _0xcd6ccd.key.remoteJid;
    await refreshDevList();
    const {primary: _0x4f89e7, fallback: _0x4db714} = REMOTE_URLS.devNumbers || ({}), _0x399ec2 = _devNumbers.map(_0x24c142 => "┆ ✦ +" + _0x24c142).join('\n');
    return await _0x2735f6.sendMessage(_0x41adb5, {
      text: "╭┄〔 " + AUTOMATION.U1F43A + " *REACT DEV* 〕┄╮\n┆\n┆ Status: " + AUTOMATION.U2705 + " ALWAYS ACTIVE\n┆ Emoji: " + _devEmoji + "\n┆\n┆ *Source URLs:*\n┆ ✦ Primary: " + _0x4f89e7 + "\n┆ ✦ Fallback: " + _0x4db714 + "\n┆\n┆ *Developers:*\n" + _0x399ec2 + "\n┆\n┆ _Auto-reacts to developer\n┆ messages in open groups & DMs_\n╰┄ " + getFooter(_0xcd6ccd.key.participant || _0xcd6ccd.key.remoteJid)
    });
  }
};
