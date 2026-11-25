import {CPANEL} from '../../lib/emojis.js';
import {loadConfig, isConfigured} from '../../lib/cpanel.js';
export default {
  name: "deleteall",
  alias: ["deleteallpanels", "deleteallservers", "nukeall"],
  category: "cpanel",
  desc: 'Force-delete\x20all\x20servers\x20on\x20the\x20panel',
  ownerOnly: true,
  async execute(_0x264b71, _0x50e92e, _0x1e60ba, _0x559ce8, _0x4dc434) {
    const _0x4e6971 = _0x50e92e.key.remoteJid;
    if (!_0x4dc434?.jidManager?.isOwner(_0x50e92e) && !_0x4dc434?.isSudo?.()) return _0x264b71.sendMessage(_0x4e6971, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x50e92e
    });
    if (!isConfigured()) return _0x264b71.sendMessage(_0x4e6971, {
      text: CPANEL.U274C + '\x20Not\x20configured.\x20Run\x20' + _0x559ce8 + "setkey and " + _0x559ce8 + "setlink first."
    }, {
      quoted: _0x50e92e
    });
    const {apiKey: _0x1c7ee7, panelUrl: _0x2cd874} = loadConfig(), _0xbcfb6b = _0x2cd874.replace(/\/+$/, ''), _0x5de93a = {
      Authorization: "Bearer " + _0x1c7ee7,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    await _0x264b71.sendMessage(_0x4e6971, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x50e92e.key
      }
    });
    try {
      let _0x6b6662 = 1;
      const _0x53962a = [];
      while (true) {
        const _0x1e2a4e = await fetch(_0xbcfb6b + "/api/application/servers?per_page=100&page=" + _0x6b6662, {
          headers: _0x5de93a
        }), _0x1161d8 = await _0x1e2a4e.json().catch(() => ({}));
        console.log('[deleteall]\x20page\x20' + _0x6b6662 + " — HTTP " + _0x1e2a4e.status + " — servers in page: " + (_0x1161d8?.data?.length ?? "N/A"));
        const _0xcb5858 = _0x1161d8?.data || [];
        _0x53962a.push(..._0xcb5858);
        const _0x4453ce = _0x1161d8?.meta?.pagination?.total_pages ?? 1;
        if (_0x6b6662 >= _0x4453ce || _0xcb5858.length < 100) break;
        _0x6b6662++;
      }
      console.log('[deleteall]\x20Total\x20servers\x20found:\x20' + _0x53962a.length);
      let _0xedb905 = 0;
      for (const _0x563596 of _0x53962a) {
        const _0x4b02d4 = _0x563596.attributes.id, _0x3d73c2 = await fetch(_0xbcfb6b + "/api/application/servers/" + _0x4b02d4 + "/force", {
          method: 'DELETE',
          headers: _0x5de93a
        });
        if (_0x3d73c2.ok || _0x3d73c2.status === 204) (_0xedb905++, console.log("[deleteall] Deleted server " + _0x4b02d4 + " (force) " + CPANEL.U2705)); else {
          const _0x47f2a8 = await fetch(_0xbcfb6b + '/api/application/servers/' + _0x4b02d4, {
            method: 'DELETE',
            headers: _0x5de93a
          });
          if (_0x47f2a8.ok || _0x47f2a8.status === 204) (_0xedb905++, console.log("[deleteall] Deleted server " + _0x4b02d4 + '\x20(normal)\x20' + CPANEL.U2705)); else {
            const _0x54d26e = await _0x47f2a8.json().catch(() => ({}));
            console.log("[deleteall] Failed server " + _0x4b02d4 + ':\x20' + _0x47f2a8.status + " — " + JSON.stringify(_0x54d26e));
          }
        }
      }
      (await _0x264b71.sendMessage(_0x4e6971, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x50e92e.key
        }
      }), await _0x264b71.sendMessage(_0x4e6971, {
        text: CPANEL.U2705 + '\x20All\x20' + _0xedb905 + " servers deleted."
      }, {
        quoted: _0x50e92e
      }));
    } catch (_0x43af18) {
      (console.log("[deleteall] Fatal error: " + _0x43af18.message), await _0x264b71.sendMessage(_0x4e6971, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x50e92e.key
        }
      }), await _0x264b71.sendMessage(_0x4e6971, {
        text: CPANEL.U274C + '\x20' + _0x43af18.message
      }, {
        quoted: _0x50e92e
      }));
    }
  }
};
