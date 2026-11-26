import _0x5a9d45 from 'fs';
import _0x3531c0 from 'path';
import {fileURLToPath} from 'url';
import _0x2798dd from 'dotenv';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const __dirname = _0x3531c0.dirname(fileURLToPath(import.meta.url));
_0x2798dd.config({
  path: _0x3531c0.join(__dirname, '../../.env')
});
export default {
  name: "setsetting",
  alias: ['configset', 'changeconfig', "updateconfig"],
  description: "Change bot settings",
  category: "owner",
  usage: 'setsetting\x20<key>\x20<value>',
  example: "setsetting BOT_NAME \"VIPBOT\"\nsetsetting PREFIX !",
  async execute(_0x1fa871, _0x3e1fc8, _0x255af7) {
    const {remoteJid: _0x2b4a6f} = _0x3e1fc8.key, _0x2b6b63 = _0x3e1fc8.key.participant || _0x2b4a6f, _0xedc929 = _0x1fa871.user.id;
    if (_0x255af7.length < 2) return await _0x1fa871.sendMessage(_0x2b4a6f, {
      text: "╭┄〔 " + _0x4b345f.SETTINGS + " *SET SETTING* 〕┄╮\n┆\n┆ ✦ *.setsetting <key> <value>*\n┆  ╰┄ Update a bot setting\n┆ ✦ *.getsettings*\n┆  ╰┄ See all available settings\n╰┄ " + getFooter(_0x3e1fc8.key.participant || _0x3e1fc8.key.remoteJid)
    }, {
      quoted: _0x3e1fc8
    });
    const _0x40c6a4 = _0x255af7[0].toUpperCase(), _0xdb43db = _0x255af7.slice(1).join('\x20');
    try {
      const _0xec051d = await this.updateSetting(_0x40c6a4, _0xdb43db, _0x1fa871);
      await _0x1fa871.sendMessage(_0x2b4a6f, {
        text: _0xec051d
      }, {
        quoted: _0x3e1fc8
      });
    } catch (_0x43f3be) {
      (console.error("Set setting error:", _0x43f3be), await _0x1fa871.sendMessage(_0x2b4a6f, {
        text: _0x4b345f.ERROR + " Failed to update setting: " + _0x43f3be.message
      }, {
        quoted: _0x3e1fc8
      }));
    }
  },
  async updateSetting(_0x48360b, _0x3075aa, _0x681c48) {
    const _0x52c514 = _0x3531c0.join(__dirname, "../../.env");
    if (_0x48360b === "PREFIX") return await this.updatePrefix(_0x3075aa);
    if (_0x5a9d45.existsSync(_0x52c514)) {
      let _0x24e6f5 = _0x5a9d45.readFileSync(_0x52c514, "utf8");
      const _0xb39dcb = _0x24e6f5.split('\x0a');
      let _0x25341b = false;
      const _0x437697 = _0xb39dcb.map(_0xebd90f => {
        if (_0xebd90f.startsWith(_0x48360b + '=')) return (_0x25341b = true, _0x48360b + '=' + _0x3075aa);
        return _0xebd90f;
      });
      return (!_0x25341b && _0x437697.push(_0x48360b + '=' + _0x3075aa), _0x5a9d45.writeFileSync(_0x52c514, _0x437697.join('\x0a')), delete process.env[_0x48360b], _0x2798dd.config({
        path: _0x52c514,
        override: true
      }), _0x4b345f.SUCCESS + " Setting updated:\n" + _0x48360b + '=' + _0x3075aa + '\x0a\x0a' + _0x4b345f.WARNING + " Restart bot for changes to take effect");
    } else return _0x4b345f.ERROR + " .env file not found at: " + _0x52c514;
  },
  async updatePrefix(_0x124803) {
    const _0x2d18d9 = _0x3531c0.join(__dirname, '../../data/prefix.json'), _0x25671a = _0x3531c0.join(__dirname, '../../data');
    if (_0x124803.length < 1 || _0x124803.length > 3) return _0x4b345f.ERROR + " Prefix must be 1-3 characters";
    if (_0x124803.includes('\x20') || _0x124803.includes('\x0a')) return _0x4b345f.ERROR + " Prefix cannot contain spaces or newlines";
    !_0x5a9d45.existsSync(_0x25671a) && _0x5a9d45.mkdirSync(_0x25671a, {
      recursive: true
    });
    try {
      _0x5a9d45.writeFileSync(_0x2d18d9, JSON.stringify({
        prefix: _0x124803
      }, null, 2));
      const _0x11e43b = _0x3531c0.join(__dirname, "../../.env");
      if (_0x5a9d45.existsSync(_0x11e43b)) {
        let _0x2b5dea = _0x5a9d45.readFileSync(_0x11e43b, "utf8");
        const _0x4e729b = _0x2b5dea.split('\x0a'), _0x4b71c7 = _0x4e729b.map(_0x69391 => _0x69391.startsWith("PREFIX=") ? "PREFIX=" + _0x124803 : _0x69391);
        _0x5a9d45.writeFileSync(_0x11e43b, _0x4b71c7.join('\x0a'));
      }
      return _0x4b345f.SUCCESS + '\x20Prefix\x20updated\x20to:\x20*' + _0x124803 + '*\x0a\x0aChanges\x20take\x20effect\x20immediately!\x0aTry:\x20*' + _0x124803 + "ping*";
    } catch (_0x563a4f) {
      return (console.error("Prefix update error:", _0x563a4f), _0x4b345f.ERROR + " Failed to update prefix: " + _0x563a4f.message);
    }
  }
};
import _0x4b345f from '../../lib/emojis.js';
