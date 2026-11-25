import _0x5eaebc from 'axios';
import _0x546710 from 'ws';
import {getOwnerName, getFooter} from '../../lib/menuHelper.js';
export default {
  name: "pair",
  alias: ["getcode", "paircode"],
  description: "Generate a pairing code for linking a new WhatsApp device",
  category: "owner",
  ownerOnly: true,
  async execute(_0x368490, _0x2a8eda, _0x4895b1, _0x401477, _0x522a10) {
    const _0x486dde = _0x2a8eda.key.remoteJid, _0x832be = _0x4895b1.join('').replace(/[^0-9]/g, '');
    if (!_0x832be || _0x832be.length < 6 || _0x832be.length > 20) {
      (await _0x368490.sendMessage(_0x486dde, {
        text: "╭┄〔 " + _0x2cbe5e.WARNING + " *PAIR DEVICE* 〕┄╮\n┆\n┆ ✦ *" + _0x401477 + "pair <number>*\n┆   ◦ Full number, no +\n╰┄ " + getFooter(_0x2a8eda.key.participant || _0x2a8eda.key.remoteJid)
      }, {
        quoted: _0x2a8eda
      }), await _0x368490.sendMessage(_0x486dde, {
        react: {
          text: '' + _0x2cbe5e.WARNING,
          key: _0x2a8eda.key
        }
      }));
      return;
    }
    (await _0x368490.sendMessage(_0x486dde, {
      react: {
        text: '' + _0x2cbe5e.LOADING,
        key: _0x2a8eda.key
      }
    }), await _0x368490.sendMessage(_0x486dde, {
      text: _0x2cbe5e.REFRESH + " *Generating pair code for " + _0x832be + "...*"
    }, {
      quoted: _0x2a8eda
    }));
    const _0x352fc0 = "pair.xwolf.space";
    try {
      console.log("[PAIR] Starting pair for " + _0x832be);
      const _0x18bb79 = await new Promise((_0x239a5f, _0x2e51ef) => {
        let _0x289260, _0x3d2463 = null, _0x292473 = false;
        try {
          _0x289260 = new _0x546710("wss://" + _0x352fc0 + "/ws");
        } catch (_0x293091) {
          (console.log("[PAIR] WS create error: " + _0x293091.message), _0x2e51ef(new Error("Failed to create WebSocket connection")));
          return;
        }
        const _0x3c1cf4 = setTimeout(() => {
          if (!_0x292473) {
            (console.log("[PAIR] Timeout after 90s"), _0x292473 = true);
            try {
              _0x289260.close();
            } catch {}
            _0x2e51ef(new Error("Timed out waiting for pairing code (90s)"));
          }
        }, 90000), _0x408e34 = () => {
          clearTimeout(_0x3c1cf4);
          try {
            _0x289260.close();
          } catch {}
        };
        (_0x289260.on("open", async () => {
          console.log("[PAIR] WebSocket connected");
          try {
            const _0x34b69c = await _0x5eaebc.post("https://" + _0x352fc0 + "/api/generate-session", {
              phoneNumber: _0x832be,
              method: "pairing"
            }, {
              timeout: 30000,
              headers: {
                'Content-Type': 'application/json'
              }
            });
            (console.log("[PAIR] API response:", JSON.stringify(_0x34b69c.data)), _0x3d2463 = _0x34b69c.data?.sessionId);
            if (!_0x3d2463) {
              (_0x408e34(), _0x292473 = true, _0x2e51ef(new Error(_0x34b69c.data?.error || "No session ID returned from API")));
              return;
            }
            (console.log('[PAIR]\x20Got\x20sessionId:\x20' + _0x3d2463 + ", subscribing..."), _0x289260.send(JSON.stringify({
              type: "subscribe",
              sessionId: _0x3d2463
            })));
          } catch (_0x31a7cd) {
            (console.log("[PAIR] API error: " + _0x31a7cd.message), _0x408e34(), !_0x292473 && (_0x292473 = true, _0x2e51ef(new Error(_0x31a7cd.response?.data?.error || _0x31a7cd.message))));
          }
        }), _0x289260.on("message", _0x4014d7 => {
          if (_0x292473) return;
          try {
            const _0x107401 = JSON.parse(_0x4014d7.toString());
            console.log('[PAIR]\x20WS\x20message:', JSON.stringify(_0x107401));
            if (_0x107401.event === 'pairing_code') {
              const _0x4673a3 = _0x107401.data?.code || _0x107401.code;
              if (_0x4673a3) {
                (_0x292473 = true, _0x408e34(), _0x239a5f({
                  pairingCode: _0x4673a3,
                  credentialsBase64: null,
                  status: "pairing_code"
                }));
                return;
              }
            }
            if (_0x107401.event === "credentials_sent" || _0x107401.event === 'connected') {
              const _0x45f2d0 = _0x107401.data || ({});
              if (_0x45f2d0.credentialsBase64) {
                (_0x292473 = true, _0x408e34(), _0x239a5f({
                  pairingCode: null,
                  credentialsBase64: _0x45f2d0.credentialsBase64,
                  status: "connected"
                }));
                return;
              }
            }
            if (_0x107401.event === "status") {
              const _0x16fa35 = _0x107401.data || ({});
              if (_0x16fa35.pairingCode) {
                (_0x292473 = true, _0x408e34(), _0x239a5f({
                  pairingCode: _0x16fa35.pairingCode,
                  credentialsBase64: _0x16fa35.credentialsBase64 || null,
                  status: _0x16fa35.status
                }));
                return;
              }
              if (_0x16fa35.credentialsBase64 && _0x16fa35.status === 'connected') {
                (_0x292473 = true, _0x408e34(), _0x239a5f({
                  pairingCode: null,
                  credentialsBase64: _0x16fa35.credentialsBase64,
                  status: "connected"
                }));
                return;
              }
              if (_0x16fa35.status === "failed") {
                (_0x292473 = true, _0x408e34(), _0x2e51ef(new Error(_0x16fa35.message || "Pairing failed on server")));
                return;
              }
            }
            if (_0x107401.pairingCode || _0x107401.pairing_code || _0x107401.code) {
              const _0x47436a = _0x107401.pairingCode || _0x107401.pairing_code || _0x107401.code;
              (_0x292473 = true, _0x408e34(), _0x239a5f({
                pairingCode: _0x47436a,
                credentialsBase64: _0x107401.credentialsBase64 || null,
                status: 'pairing_code'
              }));
              return;
            }
          } catch (_0x153e30) {
            console.log('[PAIR]\x20WS\x20parse\x20error:\x20' + _0x153e30.message);
          }
        }), _0x289260.on("error", _0x5de001 => {
          (console.log("[PAIR] WS error: " + _0x5de001.message), _0x408e34(), !_0x292473 && (_0x292473 = true, _0x2e51ef(new Error("WebSocket error: " + _0x5de001.message))));
        }), _0x289260.on('close', (_0x4e1073, _0xc1c9dd) => {
          (console.log("[PAIR] WS closed: code=" + _0x4e1073 + ',\x20reason=' + _0xc1c9dd), !_0x292473 && (_0x292473 = true, _0x2e51ef(new Error("WebSocket closed before pairing code received"))));
        }));
      }), _0xdaadc9 = _0x18bb79.pairingCode || '', _0x1bb10d = _0xdaadc9 ? _0xdaadc9.match(/.{1,4}/g)?.join('-') || _0xdaadc9 : '', _0xe98675 = new Date().toLocaleTimeString();
      let _0x2ec447 = "╭┄〔 " + _0x2cbe5e.WOLF + " *VIPBOT PAIRING* 〕┄╮\n┆\n";
      _0x2ec447 += "┆ " + _0x2cbe5e.PHONE + " *Number:* " + _0x832be + '\n';
      _0x1bb10d && (_0x2ec447 += "┆ " + _0x2cbe5e.LOCK_WITH_KEY + " *Pair Code:* `" + _0x1bb10d + '`\n');
      _0x2ec447 += "┆\n";
      _0x1bb10d && (_0x2ec447 += "┆ " + _0x2cbe5e.PIN + " *How to Link:*\n" + ("┆ 1. Open WhatsApp " + _0x2cbe5e.ARROW_RIGHT + " *Settings*\n") + "┆ 2. Tap *Linked Devices*\n" + "┆ 3. Tap *Link a Device*\n" + ("┆ 4. Enter code: *" + _0x1bb10d + '*\n') + ("┆ 5. Wait for connection " + _0x2cbe5e.SUCCESS + "\n┆\n") + ("┆ " + _0x2cbe5e.TIMER + " Code expires in 60 seconds!\n"));
      (_0x2ec447 += "┆\n╰┄ _VIPBOT • " + _0xe98675 + "_ ┄╯", await _0x368490.sendMessage(_0x486dde, {
        react: {
          text: '' + _0x2cbe5e.LOCK_WITH_KEY,
          key: _0x2a8eda.key
        }
      }));
      if (_0xdaadc9) try {
        const {createRequire: _0x4fcd82} = await import("module"), _0x488b6b = _0x4fcd82(import.meta.url), {sendInteractiveMessage: _0x200c1e} = await import("wolfbtns");
        await _0x200c1e(_0x368490, _0x486dde, {
          text: _0x2ec447,
          footer: _0x2cbe5e.WOLF + " VIPBOT · Lupin Stanley",
          interactiveButtons: [{
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: _0x2cbe5e.LOCK_WITH_KEY + " Copy Pair Code",
              copy_code: _0xdaadc9
            })
          }]
        });
      } catch (_0x282045) {
        (console.log('[PAIR]\x20Buttons\x20failed:\x20' + _0x282045.message), await _0x368490.sendMessage(_0x486dde, {
          text: _0x2ec447
        }, {
          quoted: _0x2a8eda
        }));
      } else await _0x368490.sendMessage(_0x486dde, {
        text: _0x2ec447
      }, {
        quoted: _0x2a8eda
      });
      await _0x368490.sendMessage(_0x486dde, {
        react: {
          text: '' + _0x2cbe5e.SUCCESS,
          key: _0x2a8eda.key
        }
      });
    } catch (_0x5214e6) {
      (console.log('[PAIR]\x20Error:\x20' + _0x5214e6.message), await _0x368490.sendMessage(_0x486dde, {
        text: _0x2cbe5e.ERROR + " *Pairing Failed*\n\n" + _0x5214e6.message + "\n\n_Try again or check that the number is correct._"
      }, {
        quoted: _0x2a8eda
      }), await _0x368490.sendMessage(_0x486dde, {
        react: {
          text: '' + _0x2cbe5e.ERROR,
          key: _0x2a8eda.key
        }
      }));
    }
  }
};
import _0x2cbe5e from '../../lib/emojis.js';
