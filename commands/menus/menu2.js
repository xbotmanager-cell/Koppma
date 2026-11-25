import {createRequire} from 'module';
import {getBotName, getOwnerName, getBotMode, getBotVersion, formatUptime, getRAMUsage, getMenuMedia} from '../../lib/menuHelper.js';
import {isButtonModeEnabled} from '../../lib/buttonMode.js';
import {getPlatformInfo} from '../../lib/platformDetect.js';
import {GROUP} from '../../lib/emojis.js';
const require = createRequire(import.meta.url);
let giftedBtns;
try {
  giftedBtns = await import("wolfbtns");
} catch (_0x402a3a) {}
export default {
  name: "menu2",
  alias: ['menulist', "categories", "allmenu", "menus"],
  desc: "Shows all category menus with buttons",
  category: 'Menu',
  usage: '.menu2',
  async execute(_0x15ea11, _0xc96e03, _0x3d6f83, _0x5b7b10) {
    const _0x1d0a12 = _0xc96e03.key.remoteJid, _0x1d32b3 = _0x5b7b10 || global.prefix || '.', _0x1e8b0a = getBotName();
    (await _0x15ea11.sendMessage(_0x1d0a12, {
      text: "menu2 loading..."
    }, {
      quoted: _0xc96e03
    }), await new Promise(_0x349512 => setTimeout(_0x349512, 800)));
    const _0x5f2bfb = [{
      name: "aimenu",
      icon: GROUP.BOT,
      desc: "AI commands & models"
    }, {
      name: "animemenu",
      icon: GROUP.SPARKLE,
      desc: "Anime reactions & waifus"
    }, {
      name: 'automenu',
      icon: GROUP.SETTINGS,
      desc: "Automation settings"
    }, {
      name: "downloadmenu",
      icon: GROUP.DOWNLOAD,
      desc: "Media downloads"
    }, {
      name: "ephotomenu",
      icon: GROUP.SPARKLE,
      desc: "Ephoto effects"
    }, {
      name: "funmenu",
      icon: GROUP.ART,
      desc: "Fun & entertainment"
    }, {
      name: "gamemenu",
      icon: GROUP.CELEBRATE,
      desc: "Games & quizzes"
    }, {
      name: "gitmenu",
      icon: GROUP.PACKAGE,
      desc: "GitHub tools"
    }, {
      name: "groupmenu",
      icon: GROUP.HOME,
      desc: "Group management"
    }, {
      name: "imagemenu",
      icon: GROUP.IMAGE,
      desc: "Image generation"
    }, {
      name: "logomenu",
      icon: GROUP.ART,
      desc: "Logo design studio"
    }, {
      name: 'mediamenu',
      icon: GROUP.REFRESH,
      desc: "Media conversion"
    }, {
      name: "musicmenu",
      icon: GROUP.MUSIC,
      desc: "Music & audio"
    }, {
      name: "cpanelmenu",
      icon: GROUP.TOOL,
      desc: "Pterodactyl panel commands"
    }, {
      name: 'ownermenu',
      icon: GROUP.ADMIN,
      desc: 'Owner\x20controls'
    }, {
      name: "securitymenu",
      icon: GROUP.SHIELD,
      desc: "Security & hacking"
    }, {
      name: "stalkermenu",
      icon: GROUP.EYE,
      desc: "Stalker commands"
    }, {
      name: "sportsmenu",
      icon: GROUP.CELEBRATE,
      desc: "Live sports scores"
    }, {
      name: 'toolsmenu',
      icon: GROUP.SPARKLE,
      desc: "Tools & utilities"
    }, {
      name: "valentinemenu",
      icon: GROUP.HEART,
      desc: 'Valentine\x20effects'
    }, {
      name: "videomenu",
      icon: GROUP.VIDEO,
      desc: "AI video effects"
    }], _0x536e67 = isButtonModeEnabled();
    if (_0x536e67 && giftedBtns?.sendInteractiveMessage) {
      const _0x33ba2b = Math.ceil(_0x5f2bfb.length / 2), _0x496e8e = [{
        title: GROUP.FOLDER + " Categories (1)",
        rows: _0x5f2bfb.slice(0, _0x33ba2b).map(_0x4e6ac0 => ({
          id: '' + _0x1d32b3 + _0x4e6ac0.name,
          title: _0x4e6ac0.icon + '\x20' + (_0x4e6ac0.name.replace("menu", '').charAt(0).toUpperCase() + _0x4e6ac0.name.replace("menu", '').slice(1)),
          description: _0x4e6ac0.desc
        }))
      }, {
        title: GROUP.FOLDER + " Categories (2)",
        rows: _0x5f2bfb.slice(_0x33ba2b).map(_0x11d86 => ({
          id: '' + _0x1d32b3 + _0x11d86.name,
          title: _0x11d86.icon + '\x20' + (_0x11d86.name.replace("menu", '').charAt(0).toUpperCase() + _0x11d86.name.replace('menu', '').slice(1)),
          description: _0x11d86.desc
        }))
      }], _0x59f8f2 = [{
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: GROUP.CLIPBOARD + " Browse Categories",
          sections: _0x496e8e
        })
      }, {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: GROUP.WOLF + " Main Menu",
          id: _0x1d32b3 + "menu"
        })
      }, {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: GROUP.TARGET + " Ping",
          id: _0x1d32b3 + "ping"
        })
      }];
      try {
        await giftedBtns.sendInteractiveMessage(_0x15ea11, _0x1d0a12, {
          text: GROUP.WOLF + '\x20*' + _0x1e8b0a + " CATEGORY MENU*\n\nSelect a category from the list below to explore its commands.",
          footer: GROUP.WOLF + '\x20' + _0x1e8b0a,
          interactiveButtons: _0x59f8f2
        });
        return;
      } catch (_0x3a1b82) {}
    }
    const _0x254d29 = getPlatformInfo(), _0x3c9a98 = getRAMUsage(), _0x3991f9 = getOwnerName(), _0x139d9d = getBotMode(), _0x25bbc3 = getBotVersion(), _0x4aa746 = 10, _0x2252ed = Math.round(_0x3c9a98.percent / 100 * _0x4aa746), _0x6d3731 = ('█').repeat(_0x2252ed) + ('░').repeat(_0x4aa746 - _0x2252ed), _0x6f9719 = "╭┄〔 `" + _0x1e8b0a + "` 〕┄╮\n┆ Owner: " + _0x3991f9 + "\n┆ Mode: " + _0x139d9d + "\n┆ Prefix: [ " + _0x1d32b3 + " ]\n┆ Version: " + _0x25bbc3 + "\n┆ Platform: " + _0x254d29.icon + " " + _0x254d29.name + "\n┆ Status: " + _0x254d29.status + "\n┆ Uptime: " + formatUptime(process.uptime()) + "\n┆ RAM: " + _0x6d3731 + " " + _0x3c9a98.percent + "%\n┆ Memory: " + _0x3c9a98.usedMB + "MB / " + _0x3c9a98.totalMB + "MB\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯";
    let _0x37e64b = '';
    _0x5f2bfb.forEach(_0x5963f9 => {
      _0x37e64b += "┆ ✦ *" + _0x1d32b3 + _0x5963f9.name + "*\n┆   ◦ " + _0x5963f9.icon + " " + _0x5963f9.desc + "\n";
    });
    const _0x1b96b8 = _0x6f9719 + "\n\n╭┄〔 " + GROUP.CLIPBOARD + " *CATEGORY MENUS* 〕┄╮\n┆\n" + _0x37e64b + "┆\n╰┄ *" + GROUP.WOLF + " " + _0x1e8b0a + "*", _0x3f68f4 = await getMenuMedia();
    _0x3f68f4 ? _0x3f68f4.type === 'gif' && _0x3f68f4.mp4Buffer ? await _0x15ea11.sendMessage(_0x1d0a12, {
      video: _0x3f68f4.mp4Buffer,
      gifPlayback: true,
      caption: _0x1b96b8,
      mimetype: "video/mp4"
    }, {
      quoted: _0xc96e03
    }) : await _0x15ea11.sendMessage(_0x1d0a12, {
      image: _0x3f68f4.buffer,
      caption: _0x1b96b8,
      mimetype: "image/jpeg"
    }, {
      quoted: _0xc96e03
    }) : await _0x15ea11.sendMessage(_0x1d0a12, {
      text: _0x1b96b8
    }, {
      quoted: _0xc96e03
    });
  }
};
