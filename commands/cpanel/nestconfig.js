import {CPANEL} from '../../lib/emojis.js';
import {loadConfig, saveConfig, listNests, listEggs, listNodes, listLocations} from '../../lib/cpanel.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "nestconfig",
  alias: ['nestconfiguration', "nestcfg", "cpanelnest"],
  category: "cpanel",
  description: "Configure the Pterodactyl Nest/Egg/Node template for createpanel",
  ownerOnly: true,
  sudoAllowed: true,
  async execute(_0x9f716, _0x586544, _0x4b7fe7, _0x26e88e, _0x7607c0) {
    const _0x54cae5 = _0x586544.key.remoteJid, _0x290410 = getOwnerName().toUpperCase(), {jidManager: _0x28b65c} = _0x7607c0;
    if (!_0x28b65c.isOwner(_0x586544) && !_0x7607c0?.isSudo?.()) return _0x9f716.sendMessage(_0x54cae5, {
      text: CPANEL.U274C + " Owner only."
    }, {
      quoted: _0x586544
    });
    const _0x5accb7 = loadConfig(), _0x457af0 = _0x5accb7.nest, _0x24fadd = (_0x4b7fe7[0] || '').toLowerCase();
    if (!_0x24fadd || _0x24fadd === "show") return _0x9f716.sendMessage(_0x54cae5, {
      text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F3D7_FE0F + " *NEST CONFIG* " + CPANEL.U230B + '\x0a' + (CPANEL.U2502 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20' + CPANEL.U1FABA + " *Current Settings*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U251C + "⊷ Nest: " + (_0x457af0.nestId ?? '—') + "  Egg: " + (_0x457af0.eggId ?? '—') + "  Node: " + (_0x457af0.nodeId ?? '—') + '\x0a') + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Location: " + (_0x457af0.locationId ?? '—') + "  CPU: " + _0x457af0.cpu + "%  RAM: " + _0x457af0.memory + 'MB\x20\x20Disk:\x20' + _0x457af0.disk + "MB\n") + (CPANEL.U2502 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x26e88e + "nestconfig nests*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ List all available nests\n") + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20*' + _0x26e88e + "nestconfig eggs <nestId>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ List eggs inside a nest\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x26e88e + 'nestconfig\x20nodes*\x0a') + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + '⊷\x20List\x20all\x20nodes\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20*' + _0x26e88e + "nestconfig locations*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ List all locations\n") + (CPANEL.U2502 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20*' + _0x26e88e + "nestconfig nest <id>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Set the nest\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x26e88e + "nestconfig egg <id>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Set the egg\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x26e88e + "nestconfig node <id>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Set the node\n") + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x26e88e + "nestconfig location <id>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + '⊷\x20Set\x20the\x20location\x0a') + (CPANEL.U2502 + '\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x26e88e + "nestconfig cpu <value>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + '⊷\x20Set\x20CPU\x20limit\x20(e.g.\x20100)\x0a') + ('' + CPANEL.U251C + CPANEL.U2500 + "⊷ *" + _0x26e88e + "nestconfig ram <value>*\n") + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + "⊷ Set RAM in MB (e.g. 512)\n") + ('' + CPANEL.U251C + CPANEL.U2500 + '⊷\x20*' + _0x26e88e + 'nestconfig\x20disk\x20<value>*\x0a') + (CPANEL.U2502 + '\x20\x20' + CPANEL.U2514 + '⊷\x20Set\x20disk\x20in\x20MB\x20(e.g.\x202048)\x0a') + (CPANEL.U2502 + '\x0a') + (CPANEL.U2570 + '⊷\x20' + getFooter(_0x586544.key.participant || _0x586544.key.remoteJid))
    }, {
      quoted: _0x586544
    });
    const _0x2894c5 = {
      nests: null,
      eggs: _0x4b7fe7[1],
      nodes: null,
      locations: null
    };
    if (_0x24fadd === "nests") {
      await _0x9f716.sendMessage(_0x54cae5, {
        react: {
          text: '' + CPANEL.U23F3,
          key: _0x586544.key
        }
      });
      try {
        const _0x48a63e = await listNests();
        if (!_0x48a63e.length) return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + " No nests found."
        }, {
          quoted: _0x586544
        }));
        const _0xac8997 = _0x48a63e.map(_0x3d57a3 => "  • *" + _0x3d57a3.attributes.id + "* — " + _0x3d57a3.attributes.name).join('\x0a');
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U2705,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1FABA + '\x20*NESTS*\x20' + CPANEL.U230B + '\x0a' + _0xac8997 + '\x0a' + CPANEL.U2570 + "⊷ *" + _0x26e88e + "nestconfig nest <id>* to set"
        }, {
          quoted: _0x586544
        }));
      } catch (_0x4be82b) {
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + '\x20' + _0x4be82b.message
        }, {
          quoted: _0x586544
        }));
      }
    }
    if (_0x24fadd === "eggs") {
      if (!_0x4b7fe7[1]) return _0x9f716.sendMessage(_0x54cae5, {
        text: "Usage: `" + _0x26e88e + 'nestconfig\x20eggs\x20<nestId>`'
      }, {
        quoted: _0x586544
      });
      await _0x9f716.sendMessage(_0x54cae5, {
        react: {
          text: '' + CPANEL.U23F3,
          key: _0x586544.key
        }
      });
      try {
        const _0x2285ed = await listEggs(_0x4b7fe7[1]);
        if (!_0x2285ed.length) return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + " No eggs found in that nest."
        }, {
          quoted: _0x586544
        }));
        const _0x19057f = _0x2285ed.map(_0x528e33 => "  • *" + _0x528e33.attributes.id + "* — " + _0x528e33.attributes.name).join('\x0a');
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U2705,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F95A + " *EGGS (Nest " + _0x4b7fe7[1] + ')*\x20' + CPANEL.U230B + '\x0a' + _0x19057f + '\x0a' + CPANEL.U2570 + '⊷\x20*' + _0x26e88e + "nestconfig egg <id>* to set"
        }, {
          quoted: _0x586544
        }));
      } catch (_0x1d6efc) {
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + '\x20' + _0x1d6efc.message
        }, {
          quoted: _0x586544
        }));
      }
    }
    if (_0x24fadd === "nodes") {
      await _0x9f716.sendMessage(_0x54cae5, {
        react: {
          text: '' + CPANEL.U23F3,
          key: _0x586544.key
        }
      });
      try {
        const _0x4df71f = await listNodes();
        if (!_0x4df71f.length) return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + '\x20No\x20nodes\x20found.'
        }, {
          quoted: _0x586544
        }));
        const _0x41a891 = _0x4df71f.map(_0x1f3142 => "  • *" + _0x1f3142.attributes.id + "* — " + _0x1f3142.attributes.name + " (loc " + _0x1f3142.attributes.location_id + ')').join('\x0a');
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U2705,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F5A5_FE0F + '\x20*NODES*\x20' + CPANEL.U230B + '\x0a' + _0x41a891 + '\x0a' + CPANEL.U2570 + '⊷\x20*' + _0x26e88e + "nestconfig node <id>* to set"
        }, {
          quoted: _0x586544
        }));
      } catch (_0x41b4ca) {
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + '\x20' + _0x41b4ca.message
        }, {
          quoted: _0x586544
        }));
      }
    }
    if (_0x24fadd === "locations") {
      await _0x9f716.sendMessage(_0x54cae5, {
        react: {
          text: '' + CPANEL.U23F3,
          key: _0x586544.key
        }
      });
      try {
        const _0x153614 = await listLocations();
        if (!_0x153614.length) return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + " No locations found."
        }, {
          quoted: _0x586544
        }));
        const _0x6c4f55 = _0x153614.map(_0x2e004c => "  • *" + _0x2e004c.attributes.id + '*\x20—\x20' + (_0x2e004c.attributes.long || _0x2e004c.attributes.short)).join('\x0a');
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U2705,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: '' + CPANEL.U256D + CPANEL.U2500 + CPANEL.U2308 + '\x20' + CPANEL.U1F4CD + " *LOCATIONS* " + CPANEL.U230B + '\x0a' + _0x6c4f55 + '\x0a' + CPANEL.U2570 + "⊷ *" + _0x26e88e + 'nestconfig\x20location\x20<id>*\x20to\x20set'
        }, {
          quoted: _0x586544
        }));
      } catch (_0x181a88) {
        return (await _0x9f716.sendMessage(_0x54cae5, {
          react: {
            text: '' + CPANEL.U274C,
            key: _0x586544.key
          }
        }), _0x9f716.sendMessage(_0x54cae5, {
          text: CPANEL.U274C + '\x20' + _0x181a88.message
        }, {
          quoted: _0x586544
        }));
      }
    }
    const _0x4d6f9c = {
      nest: _0x153cff => {
        _0x457af0.nestId = Number(_0x153cff);
      },
      egg: _0x4e05af => {
        _0x457af0.eggId = Number(_0x4e05af);
      },
      node: _0x5d05a2 => {
        _0x457af0.nodeId = Number(_0x5d05a2);
      },
      location: _0x46c019 => {
        _0x457af0.locationId = Number(_0x46c019);
      },
      cpu: _0x25aa96 => {
        _0x457af0.cpu = Number(_0x25aa96);
      },
      ram: _0xea5a05 => {
        _0x457af0.memory = Number(_0xea5a05);
      },
      disk: _0x123bda => {
        _0x457af0.disk = Number(_0x123bda);
      },
      dbs: _0x2a59ac => {
        _0x457af0.databases = Number(_0x2a59ac);
      },
      backups: _0x1eb62e => {
        _0x457af0.backups = Number(_0x1eb62e);
      },
      startup: () => {
        _0x457af0.startupCommand = _0x4b7fe7.slice(1).join('\x20');
      },
      image: () => {
        _0x457af0.dockerImage = _0x4b7fe7.slice(1).join('\x20');
      }
    };
    if (!_0x4d6f9c[_0x24fadd]) return _0x9f716.sendMessage(_0x54cae5, {
      text: CPANEL.U2753 + " Unknown option: *" + _0x24fadd + "*\n\nRun `" + _0x26e88e + "nestconfig` for help."
    }, {
      quoted: _0x586544
    });
    const _0x5aca1e = _0x4b7fe7[1];
    if (!_0x5aca1e) return _0x9f716.sendMessage(_0x54cae5, {
      text: "Usage: `" + _0x26e88e + "nestconfig " + _0x24fadd + '\x20<value>`'
    }, {
      quoted: _0x586544
    });
    (_0x4d6f9c[_0x24fadd](_0x5aca1e), _0x5accb7.nest = _0x457af0, saveConfig(_0x5accb7));
    const _0x19c989 = _0x24fadd === "startup" || _0x24fadd === 'image' ? _0x4b7fe7.slice(1).join('\x20') : _0x5aca1e;
    (await _0x9f716.sendMessage(_0x54cae5, {
      react: {
        text: '' + CPANEL.U2705,
        key: _0x586544.key
      }
    }), await _0x9f716.sendMessage(_0x54cae5, {
      text: CPANEL.U2705 + '\x20*' + _0x24fadd + "* → `" + _0x19c989 + '`'
    }, {
      quoted: _0x586544
    }));
  }
};
