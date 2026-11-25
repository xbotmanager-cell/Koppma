import {AUTOMATION} from '../../lib/emojis.js';
import _0x4ee5b9 from '../../lib/database.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const CONFIG_DB_KEY = "reactowner_config";
function loadConfig() {
  try {
    return _0x4ee5b9.getConfigSync(CONFIG_DB_KEY, {
      enabled: false,
      emoji: '' + AUTOMATION.U1F43A
    });
  } catch {}
  return {
    enabled: false,
    emoji: '' + AUTOMATION.U1F43A
  };
}
function saveConfig(_0x11ccfa) {
  try {
    _0x4ee5b9.setConfig(CONFIG_DB_KEY, _0x11ccfa).catch(() => {});
  } catch {}
}
export function isReactOwnerEnabled() {
  return loadConfig().enabled;
}
export function getReactOwnerEmoji() {
  return loadConfig().emoji || '' + AUTOMATION.U1F43A;
}
export async function handleReactOwner(_0x4529a2, _0xae0b28) {
  try {
    const _0x5ce6d3 = loadConfig();
    if (!_0x5ce6d3.enabled) return;
    if (!_0xae0b28?.key || !_0xae0b28.message) return;
    if (_0xae0b28.message.reactionMessage) return;
    const _0x5c861e = _0xae0b28.messageTimestamp ? Number(_0xae0b28.messageTimestamp) * 1000 : 0;
    if (_0x5c861e > 0 && Date.now() - _0x5c861e > 30000) return;
    const _0x18d8bd = _0xae0b28.key.remoteJid || '';
    if (!_0x18d8bd.endsWith("@g.us")) return;
    const _0x74ac89 = _0xae0b28.key.participant || '';
    if (!_0x74ac89) return;
    const _0x1f7d89 = _0xae0b28.key.fromMe;
    if (!_0x1f7d89) return;
    await _0x4529a2.sendMessage(_0x18d8bd, {
      react: {
        text: _0x5ce6d3.emoji || '' + AUTOMATION.U1F43A,
        key: _0xae0b28.key
      }
    });
  } catch {}
}
export default {
  name: 'reactowner',
  alias: ["ownerreact", "autoreactowner"],
  category: "automation",
  description: "Auto-react to owner messages in groups with a wolf emoji",
  ownerOnly: true,
  async execute(_0x218515, _0x4cd50f, _0xaf6201) {
    const _0x49476e = _0x4cd50f.key.remoteJid, _0xeec562 = loadConfig();
    if (!_0xaf6201[0]) {
      const _0x5b5657 = _0xeec562.enabled ? AUTOMATION.U2705 + " ON" : AUTOMATION.U274C + " OFF", _0x41c8e5 = _0xeec562.emoji || '' + AUTOMATION.U1F43A;
      return await _0x218515.sendMessage(_0x49476e, {
        text: "╭─⌈ " + AUTOMATION.U1F43A + " *REACT OWNER* ⌋\n│\n│ Status: " + _0x5b5657 + '\x0a│\x20Emoji:\x20' + _0x41c8e5 + "\n│\n├─⊷ *reactowner on*\n│  └⊷ Enable auto-react\n├─⊷ *reactowner off*\n│  └⊷ Disable auto-react\n├─⊷ *reactowner emoji <emoji>*\n│  └⊷ Change emoji\n╰⊷ " + getFooter(_0x4cd50f.key.participant || _0x4cd50f.key.remoteJid)
      });
    }
    const _0x1446d5 = _0xaf6201[0].toLowerCase();
    if (_0x1446d5 === 'on' || _0x1446d5 === "enable") return (_0xeec562.enabled = true, saveConfig(_0xeec562), await _0x218515.sendMessage(_0x49476e, {
      text: AUTOMATION.U2705 + " *React Owner enabled!*\n\nEmoji: " + (_0xeec562.emoji || "${AUTOMATION.U1F43A}") + '\x0a_Bot\x20will\x20react\x20to\x20your\x20group\x20messages_'
    }));
    if (_0x1446d5 === "off" || _0x1446d5 === "disable") return (_0xeec562.enabled = false, saveConfig(_0xeec562), await _0x218515.sendMessage(_0x49476e, {
      text: AUTOMATION.U274C + '\x20*React\x20Owner\x20disabled!*'
    }));
    if (_0x1446d5 === "emoji" || _0x1446d5 === "set") {
      const _0x157d39 = _0xaf6201.slice(1).join('\x20').trim();
      if (!_0x157d39) return await _0x218515.sendMessage(_0x49476e, {
        text: "╭─⌈ " + AUTOMATION.U26A0_FE0F + " *REACT OWNER* ⌋\n│\n├─⊷ *reactowner emoji " + AUTOMATION.U1F43A + "*\n│  └⊷ Provide an emoji\n╰⊷ " + getFooter(_0x4cd50f.key.participant || _0x4cd50f.key.remoteJid)
      });
      return (_0xeec562.emoji = _0x157d39, saveConfig(_0xeec562), await _0x218515.sendMessage(_0x49476e, {
        text: AUTOMATION.U2705 + " *React Owner emoji updated!*\n\nNew emoji: " + _0x157d39
      }));
    }
    return await _0x218515.sendMessage(_0x49476e, {
      text: "╭─⌈ " + AUTOMATION.U26A0_FE0F + " *REACT OWNER* ⌋\n│\n├─⊷ *reactowner on*\n│  └⊷ Enable\n├─⊷ *reactowner off*\n│  └⊷ Disable\n├─⊷ *reactowner emoji <emoji>*\n│  └⊷ Change emoji\n╰⊷ " + getFooter(_0x4cd50f.key.participant || _0x4cd50f.key.remoteJid)
    });
  }
};
