import {CPANEL} from '../../lib/emojis.js';
import {loadConfig, isConfigured} from '../../lib/cpanel.js';
export default {
  name: "deleteallusers",
  alias: ['removeusers', "nukeusers"],
  category: 'cpanel',
  desc: 'Delete\x20all\x20panel\x20users\x20except\x20the\x20main\x20admin',
  ownerOnly: true,
  async execute(_0x1e64dc, _0x2afcc5, _0x2d7062, _0x4a82ba, _0x5128d9) {
    const _0x4cc99f = _0x2afcc5.key.remoteJid;
    if (!_0x5128d9?.jidManager?.isOwner(_0x2afcc5) && !_0x5128d9?.isSudo?.()) return _0x1e64dc.sendMessage(_0x4cc99f, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x2afcc5
    });
    if (!isConfigured()) return _0x1e64dc.sendMessage(_0x4cc99f, {
      text: CPANEL.U274C + " Not configured. Run " + _0x4a82ba + "setkey and " + _0x4a82ba + "setlink first."
    }, {
      quoted: _0x2afcc5
    });
    const {apiKey: _0x164802, panelUrl: _0x3db816} = loadConfig(), _0x2eba65 = _0x3db816.replace(/\/+$/, ''), _0x3f48cd = {
      Authorization: "Bearer " + _0x164802,
      'Content-Type': 'application/json',
      Accept: "application/json"
    };
    await _0x1e64dc.sendMessage(_0x4cc99f, {
      react: {
        text: '' + CPANEL.U23F3,
        key: _0x2afcc5.key
      }
    });
    try {
      let _0x1e0e01 = 1;
      const _0x46d72d = [];
      while (true) {
        const _0x41a0d6 = await fetch(_0x2eba65 + "/api/application/users?per_page=100&page=" + _0x1e0e01, {
          headers: _0x3f48cd
        }), _0x5e3973 = await _0x41a0d6.json().catch(() => ({}));
        console.log("[deleteallusers] page " + _0x1e0e01 + '\x20—\x20HTTP\x20' + _0x41a0d6.status + " — users: " + (_0x5e3973?.data?.length ?? "N/A"));
        const _0x1001f9 = _0x5e3973?.data || [];
        _0x46d72d.push(..._0x1001f9);
        const _0x4eae83 = _0x5e3973?.meta?.pagination?.total_pages ?? 1;
        if (_0x1e0e01 >= _0x4eae83 || _0x1001f9.length < 100) break;
        _0x1e0e01++;
      }
      _0x46d72d.sort((_0x36e480, _0x47e987) => _0x36e480.attributes.id - _0x47e987.attributes.id);
      const _0x559bda = _0x46d72d[0], _0x2b0af5 = _0x46d72d.slice(1);
      let _0x553ca7 = 0;
      for (const _0x2909de of _0x2b0af5) {
        const _0x580c54 = _0x2909de.attributes.id;
        try {
          const _0x21fcbc = await fetch(_0x2eba65 + "/api/application/users/" + _0x580c54, {
            method: "DELETE",
            headers: _0x3f48cd
          });
          _0x21fcbc.ok || _0x21fcbc.status === 204 ? (_0x553ca7++, console.log('[deleteallusers]\x20Deleted\x20user\x20' + _0x580c54 + '\x20' + CPANEL.U2705)) : console.log('[deleteallusers]\x20Failed\x20user\x20' + _0x580c54 + ':\x20' + _0x21fcbc.status);
        } catch (_0x56a5a3) {
          console.log("[deleteallusers] Error user " + _0x580c54 + ':\x20' + _0x56a5a3.message);
        }
      }
      (await _0x1e64dc.sendMessage(_0x4cc99f, {
        react: {
          text: '' + CPANEL.U2705,
          key: _0x2afcc5.key
        }
      }), await _0x1e64dc.sendMessage(_0x4cc99f, {
        text: CPANEL.U2705 + " *Done*\n\n" + (CPANEL.U1F5D1_FE0F + '\x20Deleted\x20:\x20' + _0x553ca7 + " user(s)\n") + (CPANEL.U1F451 + " Kept    : " + (_0x559bda?.attributes?.username ?? '—') + " (Main Admin)")
      }, {
        quoted: _0x2afcc5
      }));
    } catch (_0x294724) {
      (console.log("[deleteallusers] Fatal: " + _0x294724.message), await _0x1e64dc.sendMessage(_0x4cc99f, {
        react: {
          text: '' + CPANEL.U274C,
          key: _0x2afcc5.key
        }
      }), await _0x1e64dc.sendMessage(_0x4cc99f, {
        text: CPANEL.U274C + '\x20' + _0x294724.message
      }, {
        quoted: _0x2afcc5
      }));
    }
  }
};
