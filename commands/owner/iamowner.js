import _0x387975 from '../../lib/emojis.js';
import _0x522c60 from 'fs';
import _0x40f350 from 'path';
import {fileURLToPath} from 'url';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x40f350.dirname(__filename), OWNER_FILE = _0x40f350.join(__dirname, '..', "owner.json"), MAPPING_FILE = _0x40f350.join(__dirname, '..', "lid_owner_mappings.json");
function loadOwnerInfo() {
  try {
    if (_0x522c60.existsSync(OWNER_FILE)) {
      const _0x3fd3d0 = _0x522c60.readFileSync(OWNER_FILE, "utf8");
      return JSON.parse(_0x3fd3d0);
    }
  } catch (_0x18d199) {
    console.error("Error loading owner.json:", _0x18d199);
  }
  return {
    number: "255780470905"
  };
}
function loadMappings() {
  try {
    if (_0x522c60.existsSync(MAPPING_FILE)) {
      const _0x44be25 = _0x522c60.readFileSync(MAPPING_FILE, "utf8");
      return JSON.parse(_0x44be25);
    }
  } catch (_0x374646) {
    console.log("Error loading mappings:", _0x374646.message);
  }
  return {
    lidToPhone: {},
    directDMs: {},
    lastUpdated: new Date().toISOString()
  };
}
function saveMappings(_0x3ccc21) {
  try {
    return (_0x522c60.writeFileSync(MAPPING_FILE, JSON.stringify(_0x3ccc21, null, 2)), true);
  } catch (_0x27d037) {
    return (console.error('Error\x20saving\x20mappings:', _0x27d037), false);
  }
}
export default {
  name: 'iamowner',
  description: "Force verify yourself as bot owner",
  category: "config",
  async execute(_0x107eb6, _0x42df68, _0xc61a64) {
    const _0x8fa8a5 = _0x42df68.key.remoteJid, _0x272a16 = _0x42df68.key.participant || _0x8fa8a5;
    try {
      (console.log('\x0a===\x20I\x20AM\x20OWNER\x20COMMAND\x20==='), console.log("Sender:", _0x272a16));
      const _0x14ebc7 = loadOwnerInfo(), _0x2fdd2c = _0x14ebc7.number.replace(/\D/g, '');
      console.log('Owner\x20phone:', _0x2fdd2c);
      if (!_0xc61a64[0]) {
        await _0x107eb6.sendMessage(_0x8fa8a5, {
          text: "╭┄〔 " + _0x387975.LOCK_WITH_KEY + " *VERIFY OWNERSHIP* 〕┄╮\n┆\n┆ ✦ *.iamowner <full_owner_phone>*\n┆   ◦ Verify with number\n╰┄ " + getFooter(_0x42df68.key.participant || _0x42df68.key.remoteJid)
        }, {
          quoted: _0x42df68
        });
        return;
      }
      const _0xf8addd = _0xc61a64[0].replace(/\D/g, '');
      if (_0xf8addd !== _0x2fdd2c) {
        await _0x107eb6.sendMessage(_0x8fa8a5, {
          text: _0x387975.ERROR + " *Incorrect Phone*\n\nProvided: " + _0xf8addd + "\nExpected: " + _0x2fdd2c + "\n\nTry again with the correct owner phone number."
        }, {
          quoted: _0x42df68
        });
        return;
      }
      const _0x3273f9 = loadMappings();
      (_0x3273f9.directDMs[_0x2fdd2c] = _0x272a16, _0x272a16.endsWith("@lid") && (_0x3273f9.lidToPhone[_0x272a16] = _0x2fdd2c), _0x3273f9.lastUpdated = new Date().toISOString(), saveMappings(_0x3273f9), await _0x107eb6.sendMessage(_0x8fa8a5, {
        text: _0x387975.SUCCESS + " *OWNERSHIP VERIFIED!*\n\n" + _0x387975.CROWN + " *You are now verified as:* " + (_0x14ebc7.name || "Lupin Stanley") + '\x0a' + _0x387975.PHONE + " *Phone:* " + _0x2fdd2c + '\x0a' + _0x387975.CHAT + " *Your ID:* " + _0x272a16 + '\x0a' + _0x387975.LOCKED + " *Verified at:* " + new Date().toLocaleString() + '\x0a\x0a' + _0x387975.SETTINGS + " *Owner commands now unlocked:*\n• .setprefix - Change prefix\n• .restart - Restart bot\n• .broadcast - Broadcast messages"
      }, {
        quoted: _0x42df68
      }), console.log(_0x387975.SUCCESS + " User " + _0x272a16 + " force-verified as owner " + _0x2fdd2c));
    } catch (_0x2f7a1d) {
      (console.error(_0x387975.ERROR + " Iamowner error:", _0x2f7a1d), await _0x107eb6.sendMessage(_0x8fa8a5, {
        text: _0x387975.ERROR + " Error: " + _0x2f7a1d.message
      }, {
        quoted: _0x42df68
      }));
    }
  }
};
