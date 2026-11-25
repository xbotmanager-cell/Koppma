import {AUTOMATION} from '../../lib/emojis.js';
import _0x36da94 from '../../lib/database.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
const CONFIG_DB_KEY = 'autoread_config', DEFAULT_SETTINGS = {
  enabled: false,
  mode: "both",
  delay: 2000,
  whitelist: [],
  blacklist: [],
  silent: true
};
try {
  const _initAutoread = _0x36da94.getConfigSync(CONFIG_DB_KEY, DEFAULT_SETTINGS);
  globalThis._autoreadEnabled = !!_initAutoread?.enabled;
} catch {
  globalThis._autoreadEnabled = false;
}
function loadSettings() {
  try {
    return {
      ...DEFAULT_SETTINGS,
      ..._0x36da94.getConfigSync(CONFIG_DB_KEY, DEFAULT_SETTINGS)
    };
  } catch {
    return {
      ...DEFAULT_SETTINGS
    };
  }
}
function saveSettings(_0x4806b2) {
  try {
    (_0x36da94.setConfig(CONFIG_DB_KEY, _0x4806b2).catch(() => {}), globalThis._autoreadEnabled = !!_0x4806b2?.enabled);
  } catch (_0x10fcdf) {
    console.error("Error saving autoread settings:", _0x10fcdf);
  }
}
function cleanJid(_0x270206) {
  if (!_0x270206) return _0x270206;
  const _0x3cd50c = _0x270206.split(':')[0];
  return _0x3cd50c.includes('@') ? _0x3cd50c : _0x3cd50c + "@s.whatsapp.net";
}
async function markAsRead(_0x3de20d, _0x4463a2, _0x3bb724, _0x5e7ba9) {
  try {
    const _0x378e66 = {
      remoteJid: _0x4463a2,
      id: _0x3bb724,
      fromMe: false
    };
    if (_0x5e7ba9) _0x378e66.participant = _0x5e7ba9;
    return (await _0x3de20d.readMessages([_0x378e66]), true);
  } catch (_0x31f5c2) {
    return (console.error('[AUTOREAD]\x20readMessages\x20error:', _0x31f5c2?.message || _0x31f5c2), false);
  }
}
let autoreadActive = false, _autoReadHookedSock = null;
function setupAutoread(_0x5a0b57) {
  if (autoreadActive && _autoReadHookedSock === _0x5a0b57) return;
  if (_autoReadHookedSock !== _0x5a0b57) autoreadActive = false;
  const _0x4c207 = loadSettings();
  (!_0x4c207.silent && console.log(AUTOMATION.U1F527 + " Setting up auto-read feature..."), _0x5a0b57.ev.on('messages.upsert', async ({messages: _0x42776d, type: _0x5cb5a0}) => {
    try {
      const _0x34c13a = loadSettings();
      if (!_0x34c13a.enabled || _0x34c13a.mode === "off") return;
      for (const _0x43a747 of _0x42776d) {
        if (_0x43a747.key.fromMe) continue;
        const _0x4f5c39 = cleanJid(_0x43a747.key.remoteJid), _0xb69738 = _0x4f5c39.endsWith('@g.us'), _0xa79f7c = _0x43a747.key.id, _0x535319 = _0xb69738 ? _0x43a747.key.participant || _0x43a747.participant : undefined;
        if (_0x34c13a.whitelist.includes(_0x4f5c39)) continue;
        const _0x3d71c6 = _0x34c13a.blacklist.includes(_0x4f5c39);
        let _0x227fd3 = false;
        if (_0x3d71c6) _0x227fd3 = true; else {
          if (_0x34c13a.mode === "both") _0x227fd3 = true; else {
            if (_0x34c13a.mode === 'groups' && _0xb69738) _0x227fd3 = true; else _0x34c13a.mode === "dms" && !_0xb69738 && (_0x227fd3 = true);
          }
        }
        _0x227fd3 && setTimeout(async () => {
          await markAsRead(_0x5a0b57, _0x4f5c39, _0xa79f7c, _0x535319);
        }, _0x34c13a.delay);
      }
    } catch (_0x1a104d) {}
  }), autoreadActive = true, _autoReadHookedSock = _0x5a0b57, !_0x4c207.silent && console.log(AUTOMATION.U2705 + " Auto-read feature activated!"));
}
async function getGroupName(_0x835b41, _0x86111f) {
  try {
    const _0x2661bf = await _0x835b41.groupMetadata(_0x86111f);
    return _0x2661bf.subject;
  } catch (_0x2a3b80) {
    return null;
  }
}
async function getContactName(_0x2b4081, _0x582700) {
  try {
    const _0x3d58b1 = await _0x2b4081.getContact(_0x582700);
    return _0x3d58b1.name || _0x3d58b1.notify || _0x582700.split('@')[0];
  } catch (_0x63345d) {
    return _0x582700.split('@')[0];
  }
}
export default {
  name: 'autoread',
  description: "Automatically mark messages as read",
  category: "utility",
  async execute(_0x22ca87, _0x7dfc95, _0x4b62e9, _0x21dda6) {
    const _0x406714 = _0x7dfc95.key.remoteJid, _0x4e28c1 = loadSettings(), _0x51ded6 = _0x4b62e9[0]?.toLowerCase(), _0xd6e8a = _0x4b62e9[1]?.toLowerCase();
    !autoreadActive && setupAutoread(_0x22ca87);
    if (!_0x51ded6 || _0x51ded6 === "status") {
      let _0x1c147c = "╭─⌈ " + AUTOMATION.U1F4D6 + " *AUTO-READ* ⌋\n│\n";
      (_0x1c147c += '├─⊷\x20*.autoread\x20groups*\x0a│\x20\x20└⊷\x20Groups\x20only\x0a', _0x1c147c += '├─⊷\x20*.autoread\x20dms*\x0a│\x20\x20└⊷\x20DMs\x20only\x0a', _0x1c147c += '├─⊷\x20*.autoread\x20both*\x0a│\x20\x20└⊷\x20Read\x20all\x20messages\x0a', _0x1c147c += "├─⊷ *.autoread off*\n│  └⊷ Disable auto-read\n", _0x1c147c += "╰───", await _0x22ca87.sendMessage(_0x406714, {
        text: _0x1c147c
      }, {
        quoted: _0x7dfc95
      }));
    } else {
      if (_0x51ded6 === "groups") (_0x4e28c1.enabled = true, _0x4e28c1.mode = "groups", saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
        text: AUTOMATION.U2705 + " *Auto-Read: Groups Only*\n\nOnly group messages will be automatically marked as read."
      }, {
        quoted: _0x7dfc95
      })); else {
        if (_0x51ded6 === "dms") (_0x4e28c1.enabled = true, _0x4e28c1.mode = 'dms', saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
          text: AUTOMATION.U2705 + '\x20*Auto-Read:\x20DMs\x20Only*\x0a\x0aOnly\x20direct\x20messages\x20will\x20be\x20automatically\x20marked\x20as\x20read.'
        }, {
          quoted: _0x7dfc95
        })); else {
          if (_0x51ded6 === 'both') (_0x4e28c1.enabled = true, _0x4e28c1.mode = "both", saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
            text: AUTOMATION.U2705 + " *Auto-Read: All Messages*\n\nAll messages (groups and DMs) will be automatically marked as read."
          }, {
            quoted: _0x7dfc95
          })); else {
            if (_0x51ded6 === "off") (_0x4e28c1.enabled = false, _0x4e28c1.mode = "off", saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
              text: AUTOMATION.U274C + " *Auto-Read Disabled*\n\nMessages will no longer be automatically marked as read."
            }, {
              quoted: _0x7dfc95
            })); else {
              if (_0x51ded6 === 'delay') {
                const _0xb49b60 = parseInt(_0x4b62e9[1]);
                isNaN(_0xb49b60) || _0xb49b60 < 0 ? await _0x22ca87.sendMessage(_0x406714, {
                  text: AUTOMATION.U26A0_FE0F + " Please specify a valid delay in milliseconds.\nExample: `.autoread delay 3000` for 3 seconds."
                }, {
                  quoted: _0x7dfc95
                }) : (_0x4e28c1.delay = _0xb49b60, saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
                  text: AUTOMATION.U2705 + " *Delay Updated*\n\nAuto-read delay set to " + _0xb49b60 + "ms (" + _0xb49b60 / 1000 + " seconds)."
                }, {
                  quoted: _0x7dfc95
                }));
              } else {
                if (_0x51ded6 === "whitelist") {
                  const _0x582092 = _0x4b62e9[1]?.toLowerCase();
                  if (!_0x582092) {
                    if (_0x4e28c1.whitelist.length === 0) await _0x22ca87.sendMessage(_0x406714, {
                      text: AUTOMATION.U1F4DD + '\x20*Whitelist\x20(Excluded\x20Chats)*\x0a\x0aNo\x20chats\x20in\x20whitelist.\x20Messages\x20from\x20all\x20chats\x20will\x20be\x20auto-read.'
                    }, {
                      quoted: _0x7dfc95
                    }); else {
                      let _0x3fda77 = AUTOMATION.U1F4DD + '\x20*Whitelist\x20(Excluded\x20Chats)*\x0a\x0a';
                      for (let _0x33d52f = 0; _0x33d52f < _0x4e28c1.whitelist.length; _0x33d52f++) {
                        const _0x23fb99 = _0x4e28c1.whitelist[_0x33d52f], _0x1bd451 = _0x23fb99.endsWith("@g.us"), _0x3cd9a3 = _0x1bd451 ? await getGroupName(_0x22ca87, _0x23fb99) || "Unknown Group" : await getContactName(_0x22ca87, _0x23fb99);
                        (_0x3fda77 += _0x33d52f + 1 + '.\x20' + _0x3cd9a3 + '\x0a', _0x3fda77 += '\x20\x20\x20' + _0x23fb99 + '\x0a\x0a');
                      }
                      (_0x3fda77 += AUTOMATION.U1F4A1 + " Use:\n", _0x3fda77 += '•\x20`.autoread\x20whitelist\x20add`\x20-\x20Add\x20current\x20chat\x0a', _0x3fda77 += "• `.autoread whitelist remove [number]` - Remove from list\n", _0x3fda77 += "• `.autoread whitelist clear` - Clear all", await _0x22ca87.sendMessage(_0x406714, {
                        text: _0x3fda77
                      }, {
                        quoted: _0x7dfc95
                      }));
                    }
                  } else {
                    if (_0x582092 === 'add') {
                      const _0x136629 = cleanJid(_0x406714);
                      if (_0x4e28c1.whitelist.includes(_0x136629)) await _0x22ca87.sendMessage(_0x406714, {
                        text: AUTOMATION.U26A0_FE0F + " This chat is already in the whitelist."
                      }, {
                        quoted: _0x7dfc95
                      }); else {
                        (_0x4e28c1.whitelist.push(_0x136629), saveSettings(_0x4e28c1));
                        const _0x3150b4 = _0x406714.endsWith("@g.us") ? await getGroupName(_0x22ca87, _0x406714) || "Group" : await getContactName(_0x22ca87, _0x406714);
                        await _0x22ca87.sendMessage(_0x406714, {
                          text: AUTOMATION.U2705 + " Added to whitelist:\n" + _0x3150b4 + '\x0a\x0aMessages\x20from\x20this\x20chat\x20will\x20NOT\x20be\x20auto-read.'
                        }, {
                          quoted: _0x7dfc95
                        });
                      }
                    } else {
                      if (_0x582092 === "remove") {
                        const _0x5b2fe6 = parseInt(_0x4b62e9[2]) - 1;
                        if (isNaN(_0x5b2fe6) || _0x5b2fe6 < 0 || _0x5b2fe6 >= _0x4e28c1.whitelist.length) await _0x22ca87.sendMessage(_0x406714, {
                          text: AUTOMATION.U26A0_FE0F + " Please specify a valid number (1-" + _0x4e28c1.whitelist.length + ').'
                        }, {
                          quoted: _0x7dfc95
                        }); else {
                          const _0x46c299 = _0x4e28c1.whitelist.splice(_0x5b2fe6, 1)[0];
                          (saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
                            text: AUTOMATION.U2705 + " Removed from whitelist:\n" + _0x46c299
                          }, {
                            quoted: _0x7dfc95
                          }));
                        }
                      } else _0x582092 === "clear" && (_0x4e28c1.whitelist = [], saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
                        text: AUTOMATION.U2705 + " Whitelist cleared! All chats will be auto-read based on mode."
                      }, {
                        quoted: _0x7dfc95
                      }));
                    }
                  }
                } else {
                  if (_0x51ded6 === "blacklist") {
                    const _0x45ae51 = _0x4b62e9[1]?.toLowerCase();
                    if (!_0x45ae51) {
                      if (_0x4e28c1.blacklist.length === 0) await _0x22ca87.sendMessage(_0x406714, {
                        text: AUTOMATION.U1F4DD + " *Blacklist (Force Read Chats)*\n\nNo chats in blacklist."
                      }, {
                        quoted: _0x7dfc95
                      }); else {
                        let _0xf8dad0 = AUTOMATION.U1F4DD + '\x20*Blacklist\x20(Force\x20Read\x20Chats)*\x0a\x0a';
                        for (let _0x55d361 = 0; _0x55d361 < _0x4e28c1.blacklist.length; _0x55d361++) {
                          const _0x1c99ce = _0x4e28c1.blacklist[_0x55d361], _0x3e1de6 = _0x1c99ce.endsWith("@g.us"), _0x2d5f0b = _0x3e1de6 ? await getGroupName(_0x22ca87, _0x1c99ce) || 'Unknown\x20Group' : await getContactName(_0x22ca87, _0x1c99ce);
                          (_0xf8dad0 += _0x55d361 + 1 + '.\x20' + _0x2d5f0b + '\x0a', _0xf8dad0 += "   " + _0x1c99ce + '\x0a\x0a');
                        }
                        (_0xf8dad0 += AUTOMATION.U1F4A1 + '\x20Use:\x0a', _0xf8dad0 += "• `.autoread blacklist add` - Add current chat\n", _0xf8dad0 += '•\x20`.autoread\x20blacklist\x20remove\x20[number]`\x20-\x20Remove\x20from\x20list\x0a', _0xf8dad0 += "• `.autoread blacklist clear` - Clear all", await _0x22ca87.sendMessage(_0x406714, {
                          text: _0xf8dad0
                        }, {
                          quoted: _0x7dfc95
                        }));
                      }
                    } else {
                      if (_0x45ae51 === "add") {
                        const _0x432fc1 = cleanJid(_0x406714);
                        if (_0x4e28c1.blacklist.includes(_0x432fc1)) await _0x22ca87.sendMessage(_0x406714, {
                          text: AUTOMATION.U26A0_FE0F + " This chat is already in the blacklist."
                        }, {
                          quoted: _0x7dfc95
                        }); else {
                          (_0x4e28c1.blacklist.push(_0x432fc1), saveSettings(_0x4e28c1));
                          const _0x101790 = _0x406714.endsWith("@g.us") ? await getGroupName(_0x22ca87, _0x406714) || "Group" : await getContactName(_0x22ca87, _0x406714);
                          await _0x22ca87.sendMessage(_0x406714, {
                            text: AUTOMATION.U2705 + " Added to blacklist:\n" + _0x101790 + "\n\nMessages from this chat will ALWAYS be auto-read."
                          }, {
                            quoted: _0x7dfc95
                          });
                        }
                      } else {
                        if (_0x45ae51 === 'remove') {
                          const _0x1e6cab = parseInt(_0x4b62e9[2]) - 1;
                          if (isNaN(_0x1e6cab) || _0x1e6cab < 0 || _0x1e6cab >= _0x4e28c1.blacklist.length) await _0x22ca87.sendMessage(_0x406714, {
                            text: AUTOMATION.U26A0_FE0F + " Please specify a valid number (1-" + _0x4e28c1.blacklist.length + ').'
                          }, {
                            quoted: _0x7dfc95
                          }); else {
                            const _0x10bfbb = _0x4e28c1.blacklist.splice(_0x1e6cab, 1)[0];
                            (saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
                              text: AUTOMATION.U2705 + " Removed from blacklist:\n" + _0x10bfbb
                            }, {
                              quoted: _0x7dfc95
                            }));
                          }
                        } else _0x45ae51 === "clear" && (_0x4e28c1.blacklist = [], saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
                          text: AUTOMATION.U2705 + " Blacklist cleared!"
                        }, {
                          quoted: _0x7dfc95
                        }));
                      }
                    }
                  } else {
                    if (_0x51ded6 === 'silent') {
                      const _0x135f2e = _0x4b62e9[1]?.toLowerCase();
                      if (_0x135f2e === 'on') (_0x4e28c1.silent = true, saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
                        text: AUTOMATION.U1F507 + '\x20*Silent\x20Mode\x20Enabled*\x0a\x0aNo\x20terminal\x20messages\x20will\x20be\x20shown\x20for\x20auto-read\x20operations.'
                      }, {
                        quoted: _0x7dfc95
                      })); else {
                        if (_0x135f2e === "off") (_0x4e28c1.silent = false, saveSettings(_0x4e28c1), await _0x22ca87.sendMessage(_0x406714, {
                          text: AUTOMATION.U1F50A + " *Silent Mode Disabled*\n\nAuto-read operations will show messages in terminal."
                        }, {
                          quoted: _0x7dfc95
                        })); else {
                          const _0x17c218 = _0x4e28c1.silent ? "enabled" : "disabled";
                          await _0x22ca87.sendMessage(_0x406714, {
                            text: "Silent mode is currently *" + _0x17c218 + '*.\x0a\x0aUse:\x20`.autoread\x20silent\x20on/off`'
                          }, {
                            quoted: _0x7dfc95
                          });
                        }
                      }
                    } else {
                      if (_0x51ded6 === "test") {
                        const _0x2c3cc1 = _0x406714.endsWith("@g.us"), _0x4cfb4d = _0x2c3cc1 ? await getGroupName(_0x22ca87, _0x406714) || "Group" : await getContactName(_0x22ca87, _0x406714);
                        let _0x289c54 = AUTOMATION.U1F9EA + " *Auto-Read Test*\n\n";
                        (_0x289c54 += "• Current chat: " + _0x4cfb4d + '\x0a', _0x289c54 += "• Type: " + (_0x2c3cc1 ? "Group" : 'DM') + '\x0a', _0x289c54 += "• Mode: " + _0x4e28c1.mode + '\x0a', _0x289c54 += "• Enabled: " + _0x4e28c1.enabled + '\x0a', _0x289c54 += '•\x20In\x20Whitelist:\x20' + (_0x4e28c1.whitelist.includes(_0x406714) ? "${AUTOMATION.U2705} Yes" : '${AUTOMATION.U274C}\x20No') + '\x0a', _0x289c54 += '•\x20In\x20Blacklist:\x20' + (_0x4e28c1.blacklist.includes(_0x406714) ? '${AUTOMATION.U2705}\x20Yes' : "${AUTOMATION.U274C} No") + '\x0a\x0a');
                        let _0x55ceae = false;
                        if (_0x4e28c1.blacklist.includes(_0x406714)) (_0x55ceae = true, _0x289c54 += AUTOMATION.U1F535 + " *Result:* Will auto-read (forced by blacklist)"); else {
                          if (_0x4e28c1.whitelist.includes(_0x406714)) (_0x55ceae = false, _0x289c54 += AUTOMATION.U1F534 + " *Result:* Will NOT auto-read (excluded by whitelist)"); else {
                            if (!_0x4e28c1.enabled) (_0x55ceae = false, _0x289c54 += AUTOMATION.U1F534 + '\x20*Result:*\x20Will\x20NOT\x20auto-read\x20(disabled)'); else {
                              if (_0x4e28c1.mode === 'both') (_0x55ceae = true, _0x289c54 += AUTOMATION.U1F7E2 + " *Result:* Will auto-read (mode: both)"); else {
                                if (_0x4e28c1.mode === 'groups' && _0x2c3cc1) (_0x55ceae = true, _0x289c54 += AUTOMATION.U1F7E2 + " *Result:* Will auto-read (mode: groups)"); else _0x4e28c1.mode === "dms" && !_0x2c3cc1 ? (_0x55ceae = true, _0x289c54 += AUTOMATION.U1F7E2 + " *Result:* Will auto-read (mode: dms)") : (_0x55ceae = false, _0x289c54 += AUTOMATION.U1F534 + " *Result:* Will NOT auto-read");
                              }
                            }
                          }
                        }
                        (_0x289c54 += '\x0a\x0a' + AUTOMATION.U23F1_FE0F + " Delay: " + _0x4e28c1.delay + 'ms', _0x289c54 += '\x0a' + AUTOMATION.U1F507 + " Silent Mode: " + (_0x4e28c1.silent ? "${AUTOMATION.U2705} Yes" : '${AUTOMATION.U274C}\x20No'), await _0x22ca87.sendMessage(_0x406714, {
                          text: _0x289c54
                        }, {
                          quoted: _0x7dfc95
                        }));
                      } else {
                        const _0x1c23e6 = "╭─⌈ " + AUTOMATION.U1F4D6 + " *AUTO-READ* ⌋\n│\n├─⊷ *.autoread groups*\n│  └⊷ Groups only\n├─⊷ *.autoread dms*\n│  └⊷ DMs only\n├─⊷ *.autoread both*\n│  └⊷ Read all messages\n├─⊷ *.autoread off*\n│  └⊷ Disable auto-read\n╰⊷ " + getFooter(_0x7dfc95.key.participant || _0x7dfc95.key.remoteJid);
                        await _0x22ca87.sendMessage(_0x406714, {
                          text: _0x1c23e6
                        }, {
                          quoted: _0x7dfc95
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
export function startAutoread(_0x5a6a8a) {
  (!autoreadActive || _autoReadHookedSock !== _0x5a6a8a) && setupAutoread(_0x5a6a8a);
}
globalThis._autoReadInit = _0x4fd3ec => {
  const _0x3c046b = loadSettings();
  _0x3c046b.enabled && _0x3c046b.mode !== 'off' && setupAutoread(_0x4fd3ec);
};
