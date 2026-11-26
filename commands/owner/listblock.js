import _0x59b335 from '../../lib/emojis.js';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "listblock",
  description: "List all blocked WhatsApp contacts",
  category: "owner",
  aliases: ["blocklist", "blocked"],
  async execute(_0x28a483, _0x34a982, _0x3b9c70) {
    const _0x17329a = _0x34a982.key.remoteJid;
    try {
      await _0x28a483.sendMessage(_0x17329a, {
        react: {
          text: _0x59b335.LOADING,
          key: _0x34a982.key
        }
      });
    } catch {}
    try {
      let _0xd2336 = [];
      try {
        _0xd2336 = await _0x28a483.fetchBlocklist();
      } catch (_0x285d3f) {
        console.error('[LISTBLOCK]\x20fetchBlocklist\x20error:', _0x285d3f?.message);
        try {
          await _0x28a483.sendMessage(_0x17329a, {
            react: {
              text: _0x59b335.ERROR,
              key: _0x34a982.key
            }
          });
        } catch {}
        return _0x28a483.sendMessage(_0x17329a, {
          text: _0x59b335.ERROR + " Failed to fetch block list.\n\n_Error: " + (_0x285d3f?.message || 'Unknown') + '_'
        }, {
          quoted: _0x34a982
        });
      }
      if (!_0xd2336 || _0xd2336.length === 0) {
        await _0x28a483.sendMessage(_0x17329a, {
          text: '╭┄〔\x20' + _0x59b335.BLOCKED + " *BLOCK LIST* 〕┄╮\n┆\n┆ ✦ *Status:* Empty\n┆  ╰┄ No contacts are currently blocked.\n╰┄ " + getFooter(_0x34a982.key.participant || _0x34a982.key.remoteJid)
        }, {
          quoted: _0x34a982
        });
        try {
          await _0x28a483.sendMessage(_0x17329a, {
            react: {
              text: _0x59b335.SUCCESS,
              key: _0x34a982.key
            }
          });
        } catch {}
        return;
      }
      const _0x464f76 = globalThis.resolvePhoneFromLidAsync, _0x53058f = await Promise.all(_0xd2336.map(async _0x46878e => {
        try {
          if (!_0x46878e || typeof _0x46878e !== "string") return {
            jid: String(_0x46878e || ''),
            num: '',
            mentionJid: null,
            isLid: false
          };
          const _0x59b6a7 = _0x46878e.split('@')[0].split(':')[0];
          if (_0x46878e.endsWith("@s.whatsapp.net")) return {
            jid: _0x46878e,
            num: _0x59b6a7,
            mentionJid: _0x46878e,
            isLid: false
          };
          if (_0x46878e.endsWith("@lid") && typeof _0x464f76 === "function") {
            try {
              const _0x22fb37 = await _0x464f76(_0x46878e);
              if (_0x22fb37 && _0x22fb37.length >= 7) return {
                jid: _0x46878e,
                num: _0x22fb37,
                mentionJid: _0x22fb37 + "@s.whatsapp.net",
                isLid: false
              };
            } catch {}
            return {
              jid: _0x46878e,
              num: _0x59b6a7,
              mentionJid: _0x46878e,
              isLid: true
            };
          }
          return {
            jid: _0x46878e,
            num: _0x59b6a7,
            mentionJid: _0x46878e,
            isLid: false
          };
        } catch {
          return {
            jid: String(_0x46878e || ''),
            num: '',
            mentionJid: null,
            isLid: false
          };
        }
      })), _0x413ef9 = 50, _0xdd5b99 = Math.max(1, parseInt(_0x3b9c70[0]) || 1), _0x6b5b17 = _0x53058f.length, _0x3342da = Math.ceil(_0x6b5b17 / _0x413ef9), _0x711eba = (_0xdd5b99 - 1) * _0x413ef9, _0x59c611 = _0x53058f.slice(_0x711eba, _0x711eba + _0x413ef9);
      let _0x9e48b0 = "╭─⌈ " + _0x59b335.BLOCKED + " *BLOCK LIST* ⌋\n│\n";
      _0x9e48b0 += "├─⊷ *Total blocked:* " + _0x6b5b17 + '\x0a';
      if (_0x3342da > 1) _0x9e48b0 += '├─⊷\x20*Page:*\x20' + _0xdd5b99 + '/' + _0x3342da + '\x0a';
      _0x9e48b0 += '│\x0a';
      const _0x503e3b = [];
      _0x59c611.forEach((_0x59f43a, _0x2a5d96) => {
        let _0x38d850;
        if (_0x59f43a.isLid) _0x38d850 = "(unresolved LID: " + _0x59f43a.num + ')'; else _0x59f43a.num ? _0x38d850 = '@' + _0x59f43a.num : _0x38d850 = '(unknown)';
        _0x9e48b0 += "├─⊷ " + (_0x711eba + _0x2a5d96 + 1) + '.\x20' + _0x38d850 + '\x0a';
        if (_0x59f43a.mentionJid) _0x503e3b.push(_0x59f43a.mentionJid);
      });
      _0x3342da > 1 && _0xdd5b99 < _0x3342da && (_0x9e48b0 += "│\n├─⊷ More: *listblock " + (_0xdd5b99 + 1) + '*\x0a');
      (_0x9e48b0 += "╰⊷ " + getFooter(_0x34a982.key.participant || _0x34a982.key.remoteJid), await _0x28a483.sendMessage(_0x17329a, {
        text: _0x9e48b0,
        mentions: _0x503e3b
      }, {
        quoted: _0x34a982
      }));
      try {
        await _0x28a483.sendMessage(_0x17329a, {
          react: {
            text: _0x59b335.SUCCESS,
            key: _0x34a982.key
          }
        });
      } catch {}
    } catch (_0x260089) {
      console.error("[LISTBLOCK] unexpected error:", _0x260089?.message);
      try {
        await _0x28a483.sendMessage(_0x17329a, {
          react: {
            text: _0x59b335.ERROR,
            key: _0x34a982.key
          }
        });
      } catch {}
      try {
        await _0x28a483.sendMessage(_0x17329a, {
          text: _0x59b335.ERROR + " Failed to display block list.\n\n_Error: " + (_0x260089?.message || "Unknown") + '_'
        }, {
          quoted: _0x34a982
        });
      } catch {}
    }
  }
};
