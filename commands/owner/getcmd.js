import _0x1ab336 from 'fs';
import _0x53ecec from 'path';
import _0x25e5c3 from 'os';
import {fileURLToPath} from 'url';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
import _0x5dd77e from '../../lib/emojis.js';
const __filename = fileURLToPath(import.meta.url), __dirname = _0x53ecec.dirname(__filename), COMMANDS_DIR = _0x53ecec.resolve(__dirname, "../../commands"), BLOCKED_FILES = ["update.js", "restart.js", "start.js", "getcmd.js"], PRIVATE_PATTERNS = [/nk-apex\/n7/i, /WOLFTECH-Ke\/silentwolf/i, /peace-amani\/norah/i, /silentwolf\.git/i, /archive\/refs\/heads.*\.zip/i, /zipball/i, /api\.github\.com\/repos\/nk-apex/i];
function stripComments(_0x16c7cc) {
  return _0x16c7cc.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\n{3,}/g, '\x0a\x0a').trim();
}
function normalizeCommandName(_0x4e4df3) {
  return String(_0x4e4df3 || '').trim().toLocaleLowerCase("en-US").replace(/^\.+/, '').replace(/\.js$/i, '');
}
function findCommandFile(_0x15b26d) {
  const _0x81db89 = normalizeCommandName(_0x15b26d), _0x2e670e = {
    scanned: 0,
    unreadable: 0,
    root: COMMANDS_DIR
  };
  function _0x15933b(_0x98c402) {
    let _0x37d44a;
    try {
      _0x37d44a = _0x1ab336.readdirSync(_0x98c402, {
        withFileTypes: true
      });
    } catch (_0x407187) {
      return (_0x2e670e.unreadable++, null);
    }
    for (const _0x1334d8 of _0x37d44a) {
      const _0x3be1aa = _0x53ecec.join(_0x98c402, _0x1334d8.name);
      if (_0x1334d8.isDirectory()) {
        const _0x1e9651 = _0x15933b(_0x3be1aa);
        if (_0x1e9651) return _0x1e9651;
        continue;
      }
      if (!_0x1334d8.isFile() || !_0x1334d8.name.toLowerCase().endsWith(".js")) continue;
      _0x2e670e.scanned++;
      try {
        const _0x234491 = _0x1ab336.readFileSync(_0x3be1aa, 'utf8'), _0x4341a5 = stripComments(_0x234491), _0x3df59c = _0x1334d8.name, _0x354675 = normalizeCommandName(_0x3df59c);
        if (_0x354675 === _0x81db89) return {
          filePath: _0x3be1aa,
          fileName: _0x3df59c,
          content: _0x234491
        };
        const _0x149f65 = _0x4341a5.match(/\bname\s*:\s*['"`]([^'"`]+)['"`]/);
        if (_0x149f65 && normalizeCommandName(_0x149f65[1]) === _0x81db89) return {
          filePath: _0x3be1aa,
          fileName: _0x3df59c,
          content: _0x234491
        };
        const _0x27cd77 = _0x4341a5.match(/\balias(?:es)?\s*:\s*\[([^\]]*)\]/s);
        if (_0x27cd77) {
          const _0x45087e = [..._0x27cd77[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map(_0x30eea5 => normalizeCommandName(_0x30eea5[1]));
          if (_0x45087e.includes(_0x81db89)) return {
            filePath: _0x3be1aa,
            fileName: _0x3df59c,
            content: _0x234491
          };
        }
      } catch (_0x58fd46) {
        _0x2e670e.unreadable++;
      }
    }
    return null;
  }
  const _0x42c27e = _0x1ab336.existsSync(COMMANDS_DIR) ? _0x15933b(COMMANDS_DIR) : null;
  return {
    result: _0x42c27e,
    stats: _0x2e670e
  };
}
export default {
  name: 'getcmd',
  alias: ['getcommand', "cmdcode", "sourcecmd"],
  desc: "Get the source code of a command",
  category: "owner",
  ownerOnly: true,
  async execute(_0x29d363, _0x5b4874, _0x2e6d81, _0x3e562e) {
    const _0x30fdca = _0x5b4874.key.remoteJid;
    if (!_0x2e6d81[0]) {
      await _0x29d363.sendMessage(_0x30fdca, {
        text: "╭─⌈ " + _0x5dd77e.SEARCH + " *GETCMD* ⌋\n│\n├─⊷ *" + _0x3e562e + "getcmd <command>*\n│  └⊷ Get source code of a command\n├─⊷ *Example:* " + _0x3e562e + "getcmd song\n│\n╰⊷ " + getFooter(_0x5b4874.key.participant || _0x5b4874.key.remoteJid)
      }, {
        quoted: _0x5b4874
      });
      return;
    }
    const _0xc2051 = normalizeCommandName(_0x2e6d81[0]), {result: _0x68b587} = findCommandFile(_0xc2051);
    if (!_0x68b587) {
      await _0x29d363.sendMessage(_0x30fdca, {
        text: _0x5dd77e.ERROR + " Command *" + _0xc2051 + "* not found."
      }, {
        quoted: _0x5b4874
      });
      return;
    }
    const {fileName: _0xdeef4, content: _0x253b06} = _0x68b587;
    if (BLOCKED_FILES.includes(_0xdeef4)) {
      await _0x29d363.sendMessage(_0x30fdca, {
        text: _0x5dd77e.LOCKED + '\x20*' + _0xc2051 + "* — source code is protected."
      }, {
        quoted: _0x5b4874
      });
      return;
    }
    if (PRIVATE_PATTERNS.some(_0x572b7f => _0x572b7f.test(_0x253b06))) {
      await _0x29d363.sendMessage(_0x30fdca, {
        text: _0x5dd77e.ERROR + '\x20*' + _0xc2051 + '*\x20—\x20not\x20available.'
      }, {
        quoted: _0x5b4874
      });
      return;
    }
    const _0x48a656 = stripComments(_0x253b06);
    if (_0x48a656.length > 3000) {
      const _0x43a512 = _0x1ab336.mkdtempSync(_0x53ecec.join(_0x25e5c3.tmpdir(), 'getcmd-')), _0x3e963b = _0x53ecec.join(_0x43a512, _0xdeef4);
      try {
        (_0x1ab336.writeFileSync(_0x3e963b, _0x48a656, 'utf8'), await _0x29d363.sendMessage(_0x30fdca, {
          document: _0x1ab336.readFileSync(_0x3e963b),
          fileName: _0xdeef4,
          mimetype: "application/javascript",
          caption: _0x5dd77e.FILE + '\x20*' + _0xdeef4 + '*\x20—\x20' + _0xc2051 + " command source"
        }, {
          quoted: _0x5b4874
        }));
      } finally {
        try {
          _0x1ab336.rmSync(_0x43a512, {
            recursive: true,
            force: true
          });
        } catch {}
      }
      return;
    }
    await _0x29d363.sendMessage(_0x30fdca, {
      text: "╭─⌈ " + _0x5dd77e.FILE + '\x20*' + _0xdeef4 + "* ⌋\n```\n" + _0x48a656 + "\n```\n╰⊷ " + getFooter(_0x5b4874.key.participant || _0x5b4874.key.remoteJid)
    }, {
      quoted: _0x5b4874
    });
  }
};
