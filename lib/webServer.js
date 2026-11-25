import _0x5c4fcb from 'http';
import _0x3d850f from 'chalk';
import {getPlatformInfo} from './platformDetect.js';
import {BRAND, DOWNLOAD, STATUS, UTILITY} from './emojis.js';
import {initiateCharge, initializeTransaction, verifyCharge} from './paystack.js';
let _server = null;
const BOT_VERSION = "1.1.7", LOG_MAX = 300;
if (!globalThis._logBuffer) globalThis._logBuffer = [];
if (!globalThis._logSseClients) globalThis._logSseClients = new Set();
if (!globalThis._consolePatchedByWS) globalThis._consolePatchedByWS = false;
const WEB_LOG_NOISE = [/\[DM-IN\]/i, /\[DM-DROP\]/i, /heartbeat|keep.?alive|ping loop|presence update/i, /messageContextInfo|senderKeyDistributionMessage/i, /reconnect timer|retrying connection|socket state/i, /cache (hit|miss|refresh|expired)/i, /raw (message|payload|content) keys?/i, /^(debug|trace)[:\s]/i];
function _isUsefulWebLog(_0x4402d2, _0x260963) {
  if (_0x4402d2 === "error" || _0x4402d2 === "warn") return true;
  return !WEB_LOG_NOISE.some(_0x1a9071 => _0x1a9071.test(_0x260963));
}
function _pushLog(_0x3250b7, _0x51f7e6) {
  const _0x36e17b = _0x51f7e6.map(_0x163db3 => _0x163db3 instanceof Error ? _0x163db3.stack || _0x163db3.message : typeof _0x163db3 === "object" ? JSON.stringify(_0x163db3) : String(_0x163db3)).join('\x20').replace(/\x1B\[[0-?]*[ -\/]*[@-~]/g, '').replace(/\r/g, '').trim();
  if (!_0x36e17b || !_isUsefulWebLog(_0x3250b7, _0x36e17b)) return;
  const _0x4a14ce = {
    ts: Date.now(),
    level: _0x3250b7,
    text: _0x36e17b
  };
  globalThis._logBuffer.push(_0x4a14ce);
  if (globalThis._logBuffer.length > LOG_MAX) globalThis._logBuffer.shift();
  const _0x2273ee = "data: " + JSON.stringify(_0x4a14ce) + '\x0a\x0a';
  for (const _0x1cc8bd of globalThis._logSseClients) {
    try {
      _0x1cc8bd.write(_0x2273ee);
    } catch {
      globalThis._logSseClients.delete(_0x1cc8bd);
    }
  }
}
function _visibleWebLogs() {
  return globalThis._logBuffer.filter(_0xe0701b => _isUsefulWebLog(_0xe0701b.level, _0xe0701b.text));
}
function _patchConsole() {
  if (globalThis._consolePatchedByWS) return;
  globalThis._consolePatchedByWS = true;
  const _0xa85bb2 = {
    log: console.log.bind(console),
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    info: console.info.bind(console)
  };
  for (const _0x1b6be9 of ["log", "error", "warn", "info"]) {
    console[_0x1b6be9] = (..._0x2e0fcc) => {
      (_0xa85bb2[_0x1b6be9](..._0x2e0fcc), _pushLog(_0x1b6be9, _0x2e0fcc));
    };
  }
}
function getStatus() {
  const _0x4cb2a8 = globalThis._webStatus || ({}), _0x995bd8 = process.uptime(), _0x506a0e = Math.floor(_0x995bd8 / 3600), _0x5a9539 = Math.floor(_0x995bd8 % 3600 / 60), _0x29229a = Math.floor(_0x995bd8 % 60), _0xe7a6af = getPlatformInfo(), _0x134db6 = process.memoryUsage(), _0x436cff = !!globalThis._antilinkConfig?.enabled, _0x4338ed = !!globalThis._antispamConfig?.enabled, _0x3aac34 = !!globalThis._antibugConfig?.enabled, _0x483eae = !!((globalThis._antideleteEnabled ?? _0x4cb2a8.antidelete) ?? false), _0x37ee0b = !!((globalThis._antiviewonceEnabled ?? _0x4cb2a8.antiviewonce) ?? false), _0x132cad = !!((globalThis._autoreadEnabled ?? _0x4cb2a8.autoread) ?? false);
  return {
    status: _0x4cb2a8.connected ?? false ? 'ok' : 'degraded',
    botName: _0x4cb2a8.botName || global.BOT_NAME || "VIPBOT",
    version: BOT_VERSION,
    connected: _0x4cb2a8.connected ?? false,
    uptime: _0x506a0e + 'h ' + _0x5a9539 + 'm ' + _0x29229a + 's',
    uptimeSecs: Math.floor(_0x995bd8),
    platform: _0xe7a6af.icon + ' ' + _0xe7a6af.name,
    commands: _0x4cb2a8.commands || 0,
    prefix: _0x4cb2a8.prefix || '.',
    botMode: _0x4cb2a8.botMode || "public",
    owner: _0x4cb2a8.owner || "Lupin Stanley (255780470905)",
    antispam: _0x4338ed,
    antibug: _0x3aac34,
    antilink: _0x436cff,
    antidelete: _0x483eae,
    antiviewonce: _0x37ee0b,
    autoread: _0x132cad,
    memoryMB: parseFloat((_0x134db6.heapUsed / 1024 / 1024).toFixed(1)),
    memoryTotalMB: parseFloat((_0x134db6.heapTotal / 1024 / 1024).toFixed(1)),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  };
}
function getPort() {
  if (process.env.PORT) return parseInt(process.env.PORT);
  if (process.env.SERVER_PORT) return parseInt(process.env.SERVER_PORT);
  if (process.env.APP_PORT) return parseInt(process.env.APP_PORT);
  return 3000;
}
function logAuthOk(_0xff6c1b) {
  const _0x40add2 = process.env.LOG_PASSWORD;
  if (!_0x40add2) return true;
  try {
    const _0x882341 = new URL(_0xff6c1b.url, 'http://localhost').searchParams;
    return _0x882341.get("key") === _0x40add2;
  } catch {
    return false;
  }
}
function getPairingState() {
  const _0x3abc4d = globalThis._webPairingState || ({});
  return {
    status: _0x3abc4d.status || "idle",
    phone: _0x3abc4d.phone || null,
    code: _0x3abc4d.code || null,
    error: _0x3abc4d.error || null,
    startedAt: _0x3abc4d.startedAt || null,
    updatedAt: _0x3abc4d.updatedAt || null
  };
}
function readJsonBody(_0x24ee98, _0x5e94c3 = 4096) {
  return new Promise((_0x55c380, _0x1f7257) => {
    let _0x3f3d9c = '';
    (_0x24ee98.setEncoding("utf8"), _0x24ee98.on("data", _0x548933 => {
      (_0x3f3d9c += _0x548933, Buffer.byteLength(_0x3f3d9c, 'utf8') > _0x5e94c3 && (_0x1f7257(new Error("Request body is too large")), _0x24ee98.destroy()));
    }), _0x24ee98.on('end', () => {
      try {
        _0x55c380(_0x3f3d9c ? JSON.parse(_0x3f3d9c) : {});
      } catch {
        _0x1f7257(new Error("Invalid JSON body"));
      }
    }), _0x24ee98.on("error", _0x1f7257));
  });
}
function getPaymentHTML() {
  return "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>VIPBOT Payment</title>\n<style>\n:root{color-scheme:dark;font-family:system-ui,sans-serif;--bg:#070b14;--panel:#0e1628;--line:#233554;--text:#eef4ff;--muted:#93a4c3;--accent:#38bdf8;--gold:#f5c451;--error:#ff8f9b}\n*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:20px;background:var(--bg);color:var(--text)}main{width:min(100%,440px)}.card{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:26px;box-shadow:0 18px 50px #0007}h1{margin:0 0 7px;font-size:1.65rem;color:var(--gold)}p{color:var(--muted);line-height:1.5;margin:0 0 20px}.method{display:flex;gap:8px;margin-bottom:14px}.method button{flex:1;padding:10px;border:1px solid var(--line);border-radius:10px;background:transparent;color:var(--text);cursor:pointer}.method button.active{border-color:var(--accent);background:#122944;color:var(--accent)}label{display:block;margin:12px 0 6px;color:var(--muted);font-size:.84rem}input{width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;background:#08101e;color:var(--text);font:inherit}button[type=submit]{width:100%;margin-top:18px;padding:12px;border:0;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--accent));color:#06101c;font:inherit;font-weight:700;cursor:pointer}.result{display:none;margin-top:15px;padding:12px;border:1px solid var(--line);border-radius:10px;line-height:1.5;overflow-wrap:anywhere}.result.show{display:block}.error{color:var(--error)}a{color:var(--accent)}small{display:block;margin-top:18px;color:var(--muted);text-align:center}\n</style></head><body><main><section class=\"card\"><h1>💎 VIPBOT Payment</h1><p>Choose a payment method and complete your payment securely.</p>\n<div class=\"method\"><button type=\"button\" class=\"active\" data-method=\"card\">Card</button><button type=\"button\" data-method=\"mpesa\">M-PESA STK</button></div>\n<form id=\"payment-form\"><label for=\"email\">Email</label><input id=\"email\" type=\"email\" required placeholder=\"customer@example.com\"><label for=\"amount\">Amount (KES)</label><input id=\"amount\" type=\"number\" min=\"1\" step=\"1\" required placeholder=\"100\"><div id=\"phone-wrap\" hidden><label for=\"phone\">M-PESA phone</label><input id=\"phone\" inputmode=\"tel\" placeholder=\"255780470905\"></div><button type=\"submit\">Continue</button></form><div id=\"result\" class=\"result\"></div><small>Powered by VIPBOT · Lupin Stanley &amp; Paystack</small></section></main>\n<script>\nlet method='card';const buttons=[...document.querySelectorAll('[data-method]')],form=document.getElementById('payment-form'),phoneWrap=document.getElementById('phone-wrap'),phone=document.getElementById('phone'),result=document.getElementById('result');\nbuttons.forEach(b=>b.onclick=()=>{method=b.dataset.method;buttons.forEach(x=>x.classList.toggle('active',x===b));phoneWrap.hidden=method!=='mpesa';phone.required=method==='mpesa';});\nfunction show(text,error=false){result.className='result show'+(error?' error':'');result.textContent=text}\nform.onsubmit=async e=>{e.preventDefault();const submit=form.querySelector('button[type=submit]');submit.disabled=true;show('Processing payment...');const body={method,email:email.value.trim(),amount:Number(amount.value),phone:phone.value.trim()};try{const r=await fetch('/api/payments/initialize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),data=await r.json();if(!r.ok)throw new Error(data.error||'Payment request failed');if(data.authorization_url){location.href=data.authorization_url}else show(data.message||'STK Push sent. Check your phone to approve the payment.')}catch(err){show(err.message||'Payment request failed',true);submit.disabled=false}}\n</script></body></html>";
}
function publicBaseUrl(_0x4ccc52) {
  const _0x363758 = String(process.env.PUBLIC_URL || process.env.APP_URL || '').trim().replace(/\/$/, '');
  if (_0x363758) return _0x363758;
  return (_0x4ccc52.headers["x-forwarded-proto"] || "http") + "://" + _0x4ccc52.headers.host;
}
function paymentRequestAllowed(_0x476335) {
  const _0x15073f = Date.now(), _0x4b0136 = String(_0x476335.headers["x-forwarded-for"] || _0x476335.socket.remoteAddress || "unknown").split(',')[0].trim(), _0x548b2a = globalThis._paymentRequestTimes || (globalThis._paymentRequestTimes = new Map()), _0x4d28a9 = _0x548b2a.get(_0x4b0136) || 0;
  if (_0x15073f - _0x4d28a9 < 15000) return false;
  _0x548b2a.set(_0x4b0136, _0x15073f);
  if (_0x548b2a.size > 1000) {
    for (const [_0x590047, _0x312a10] of _0x548b2a) if (_0x15073f - _0x312a10 > 60000) _0x548b2a.delete(_0x590047);
  }
  return true;
}
function json(_0x1f83c4, _0x300b56, _0x879a16) {
  (_0x1f83c4.writeHead(_0x300b56, {
    'Content-Type': "application/json; charset=utf-8",
    'Cache-Control': "no-store",
    'Access-Control-Allow-Origin': '*'
  }), _0x1f83c4.end(JSON.stringify(_0x879a16)));
}
function getHTML(_0x14b569) {
  const _0x68d11b = _0x2c9b56 => String(_0x2c9b56 ?? '').replace(/&/g, '&amp;').replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#39;"), _0x1ac47f = _0x14b569.connected, _0x46991e = _0x1ac47f ? "Online" : "Offline", _0x3da335 = _0x1ac47f ? 'online' : "offline";
  return "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n  <meta http-equiv=\"refresh\" content=\"30\">\n  <title>" + _0x68d11b(_0x14b569.botName) + " · VIPBOT</title>\n  <style>\n    :root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;--bg:#080b12;--panel:#0f1522;--line:#22304a;--text:#edf2ff;--muted:#8d9cb8;--accent:#38bdf8;--gold:#f5c542;--danger:#fb7185}\n    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at top,#131d33,var(--bg) 60%);color:var(--text)}\n    main{width:min(100%,540px)}.brand{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;color:var(--muted);font-size:.8rem;letter-spacing:.08em;text-transform:uppercase}\n    .brand strong{color:var(--gold);font-size:1rem;letter-spacing:.04em}.brand .status{font-size:.72rem;padding:5px 10px}.card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.45)}\n    h1{margin:0;font-size:clamp(1.8rem,6vw,2.6rem);letter-spacing:-.04em}.subtitle{margin:8px 0 24px;color:var(--muted)}\n    .status{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;border:1px solid currentColor;border-radius:999px;font-size:.82rem;font-weight:700}.status:before{content:\"\";width:8px;height:8px;border-radius:50%;background:currentColor}.online{color:var(--accent)}.offline{color:var(--danger)}\n    .details{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;margin:24px 0;background:var(--line);border:1px solid var(--line);border-radius:12px;overflow:hidden}.detail{padding:14px;background:var(--panel)}.label{display:block;margin-bottom:5px;color:var(--muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.08em}.value{font-weight:650;overflow-wrap:anywhere}\n    .links{display:flex;flex-wrap:wrap;gap:10px}.links a{flex:1 1 140px;padding:11px 14px;border:1px solid var(--line);border-radius:10px;color:var(--text);text-align:center;text-decoration:none;font-size:.88rem}.links a:hover{border-color:var(--accent);color:var(--accent)}\n    .pair{margin-top:14px;padding-top:22px;border-top:1px solid var(--line)}.pair h2{margin:0 0 7px;font-size:1.05rem}.pair p{margin:0 0 13px;color:var(--muted);font-size:.85rem;line-height:1.5}.pair form{display:flex;gap:8px}.pair input{min-width:0;flex:1;padding:11px 12px;border:1px solid var(--line);border-radius:9px;background:#0a0f1a;color:var(--text);font:inherit}.pair button{padding:11px 14px;border:1px solid var(--accent);border-radius:9px;background:var(--accent);color:#06111e;font:inherit;font-weight:700;cursor:pointer}.pair button:disabled{opacity:.55;cursor:wait}.pair-result{display:none;margin-top:13px;padding:12px;border:1px solid var(--line);border-radius:9px;color:var(--muted);font-size:.84rem}.pair-result.show{display:block}.pair-code{display:block;margin-top:8px;color:var(--gold);font:700 1.6rem ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.16em}.pair-error{color:var(--danger)}\n    footer{margin-top:18px;color:var(--muted);font-size:.75rem;text-align:center}@media(max-width:380px){.card{padding:22px}.details{grid-template-columns:1fr}}\n  </style>\n</head>\n<body>\n  <main>\n    <div class=\"brand\"><strong>💎 VIPBOT</strong><span id=\"status-pill\" class=\"status " + _0x3da335 + '\">' + _0x46991e + "</span></div>\n    <section class=\"card\">\n      <h1>" + _0x68d11b(_0x14b569.botName) + "</h1>\n      <p class=\"subtitle\">Premium WhatsApp Automation · Owned by Lupin Stanley</p>\n      <section id=\"pair-section\" class=\"pair\" aria-labelledby=\"pair-title\">\n        <h2 id=\"pair-title\">Pair VIPBOT</h2>\n        <p>Enter your WhatsApp number in international format, without the plus sign.</p>\n        <form id=\"pair-form\"><input id=\"pair-phone\" inputmode=\"numeric\" autocomplete=\"tel\" placeholder=\"255780470905\" required><button id=\"pair-submit\" type=\"submit\">Get code</button></form>\n        <div id=\"pair-result\" class=\"pair-result\" role=\"status\"></div>\n      </section>\n      <div class=\"details\">\n        <div class=\"detail\"><span class=\"label\">Version</span><span class=\"value\">v" + _0x68d11b(_0x14b569.version) + "</span></div>\n        <div class=\"detail\"><span class=\"label\">Uptime</span><span class=\"value\">" + _0x68d11b(_0x14b569.uptime) + "</span></div>\n        <div class=\"detail\"><span class=\"label\">Platform</span><span class=\"value\">" + _0x68d11b(_0x14b569.platform) + "</span></div>\n        <div class=\"detail\"><span class=\"label\">Commands</span><span class=\"value\">" + _0x68d11b(_0x14b569.commands) + "</span></div>\n      </div>\n      <nav class=\"links\" aria-label=\"Status links\">\n        <a href=\"/health\">Health</a><a href=\"/api/status\">JSON status</a><a href=\"/logs\">Live logs</a>\n      </nav>\n    </section>\n    <footer>VIPBOT v" + _0x68d11b(_0x14b569.version) + " · Lupin Stanley · refreshes every 30s</footer>\n  </main>\n</body>\n<script>\nconst form=document.getElementById('pair-form'),phone=document.getElementById('pair-phone'),submit=document.getElementById('pair-submit'),result=document.getElementById('pair-result'),pairSection=document.getElementById('pair-section'),statusPill=document.getElementById('status-pill');\nfunction showPair(text,code,error){result.className='pair-result show'+(error?' pair-error':'');result.textContent=text;if(code){const el=document.createElement('strong');el.className='pair-code';el.textContent=code;result.appendChild(el)}}\nasync function pollPair(){try{const r=await fetch('/api/pair/status',{cache:'no-store'}),s=await r.json();if(s.status==='waiting'&&s.code){showPair('Enter this code in WhatsApp:',s.code,false);submit.disabled=false}else if(s.status==='connected'){showPair('Pairing complete. VIPBOT is connected.',null,false);submit.disabled=false}else if(s.status==='error'){showPair(s.error||'Pairing failed.',null,true);submit.disabled=false}else if(s.status==='starting'){showPair('Starting pairing request. Please wait.',null,false)}}catch{}}\nasync function pollStatus(){try{const r=await fetch('/api/status',{cache:'no-store'}),s=await r.json();const online=!!s.connected;statusPill.textContent=online?'Online':'Offline';statusPill.className='status '+(online?'online':'offline');pairSection.style.display=online?'none':''}catch{}}\nform.addEventListener('submit',async e=>{e.preventDefault();submit.disabled=true;showPair('Requesting a pairing code...',null,false);try{const r=await fetch('/api/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone.value})}),data=await r.json();if(!r.ok)showPair(data.error||'Pairing request failed.',null,true)}catch{showPair('Could not reach the pairing service.',null,true)}pollPair()});\nsetInterval(()=>{pollPair();pollStatus()},2000);pollPair();pollStatus();\n</script>\n</html>";
}
function getLogsHTML(_0x5eac91) {
  const _0x31f7b5 = JSON.stringify(_0x5eac91);
  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\"/>\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/>\n<title>" + (BRAND.VIP || BRAND.WOLF) + " VIPBOT Live Logs · v" + BOT_VERSION + "</title>\n<style>\n  *{margin:0;padding:0;box-sizing:border-box}\n  :root{\n    --bg:#080b12;--panel:#0f1522;--green:#38bdf8;--green-dim:#1e4d73;\n    --border:#22304a;--muted:#8d9cb8;--c-log:#7dd3fc;--c-error:#fb7185;\n    --c-warn:#f5c542;--c-info:#a5b4fc;--c-ts:#5e7094;\n    --font-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,\"Liberation Mono\",monospace\n  }\n  html,body{height:100%;scrollbar-color:var(--green-dim) var(--bg);scrollbar-width:thin}\n  ::-webkit-scrollbar{width:6px}\n  ::-webkit-scrollbar-track{background:var(--bg)}\n  ::-webkit-scrollbar-thumb{background:var(--green-dim);border-radius:4px}\n  body{\n    background:var(--bg);color:#e2e8f0;font-family:var(--font-mono);\n    display:flex;flex-direction:column;height:100%\n  }\n  header{\n    display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;\n    padding:14px 20px;border-bottom:1px solid var(--border);\n    background:var(--panel);flex-shrink:0\n  }\n  .hdr-left{display:flex;align-items:center;gap:14px}\n  h1{font-size:15px;letter-spacing:2px;color:#f8fafc}\n  .live-pill{\n    display:flex;align-items:center;gap:7px;\n    padding:4px 12px;border-radius:.4rem;font-size:10px;font-weight:700;letter-spacing:2px;\n    background:#0c2238;border:1px solid var(--green-dim);\n    color:var(--green)\n  }\n  .live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pd 1.8s ease-in-out infinite}\n  @keyframes pd{0%,100%{opacity:1}50%{opacity:.2}}\n  .hdr-right{display:flex;gap:8px;flex-wrap:wrap}\n  button{\n    padding:6px 14px;border-radius:.5rem;font-size:10px;font-weight:700;\n    letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;\n    font-family:var(--font-mono);transition:all .15s;border:1px solid\n  }\n  .btn-clear{background:hsla(0,84%,60%,.07);color:hsl(0,84%,65%);border-color:hsl(0,84%,40%)}\n  .btn-clear:hover{background:hsla(0,84%,60%,.18);border-color:hsl(0,84%,60%)}\n  .btn-scroll{background:#0c2238;color:var(--green);border-color:var(--green-dim)}\n  .btn-scroll:hover{background:#123354;border-color:var(--green)}\n  .btn-back{background:transparent;color:var(--muted);border-color:var(--border);text-decoration:none;display:inline-flex;align-items:center;padding:6px 14px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-family:var(--font-mono);border-radius:.5rem}\n  .btn-back:hover{color:var(--green);border-color:var(--green-dim)}\n  #console{\n    flex:1;overflow-y:auto;padding:12px 16px;\n    display:flex;flex-direction:column;gap:1px\n  }\n  .line{display:flex;gap:10px;line-height:1.55;font-size:12.5px;padding:2px 4px;border-radius:3px;word-break:break-all}\n  .line:hover{background:#111a2b}\n  .ts{color:var(--c-ts);flex-shrink:0;user-select:none;font-size:11px;padding-top:1px}\n  .lvl{flex-shrink:0;font-size:10px;font-weight:700;letter-spacing:1px;width:34px;text-align:right;padding-top:2px}\n  .lvl-log{color:var(--green)}\n  .lvl-error{color:var(--c-error)}\n  .lvl-warn{color:var(--c-warn)}\n  .lvl-info{color:var(--c-info)}\n  .msg{color:#cbd5e1;flex:1;white-space:pre-wrap}\n  .msg.error{color:var(--c-error)}\n  .msg.warn{color:var(--c-warn)}\n  .msg.info{color:var(--c-info)}\n  .empty{color:var(--muted);font-size:12px;text-align:center;margin-top:60px;letter-spacing:2px}\n  footer{\n    padding:8px 20px;border-top:1px solid var(--border);\n    font-size:10px;color:var(--muted);display:flex;justify-content:space-between;\n    letter-spacing:1px;flex-shrink:0\n  }\n  #conn-state{font-weight:700}\n  #line-count{font-variant-numeric:tabular-nums}\n</style>\n</head>\n<body>\n<header>\n  <div class=\"hdr-left\">\n    <h1>" + (BRAND.VIP || BRAND.WOLF) + " VIPBOT LIVE LOGS <span style=\"color:var(--muted);font-size:11px;letter-spacing:1px\">v" + BOT_VERSION + "</span></h1>\n    <div class=\"live-pill\"><div class=\"live-dot\"></div>STREAMING</div>\n  </div>\n  <div class=\"hdr-right\">\n    <button class=\"btn-clear\" onclick=\"clearLogs()\">CLEAR</button>\n    <button class=\"btn-scroll\" onclick=\"toggleAutoScroll()\" id=\"scroll-btn\">AUTO-SCROLL ON</button>\n    <a class=\"btn-back\" href=\"/\">← STATUS</a>\n  </div>\n</header>\n\n<div id=\"console\"><div class=\"empty\" id=\"empty-msg\">// awaiting log output...</div></div>\n\n<footer>\n  <span>VIPBOT · Lupin Stanley &nbsp;|&nbsp; <span id=\"conn-state\" style=\"color:var(--c-warn)\">CONNECTING</span></span>\n  <span><span id=\"line-count\">0</span> / 300 lines</span>\n</footer>\n\n<script>\nconst consoleEl  = document.getElementById('console');\nconst emptyMsg   = document.getElementById('empty-msg');\nconst lineCount  = document.getElementById('line-count');\nconst connState  = document.getElementById('conn-state');\nconst scrollBtn  = document.getElementById('scroll-btn');\n\nlet autoScroll = true;\nlet lines = [];\nconst MAX = 300;\n\nconst COLORS = { log:'lvl-log', error:'lvl-error', warn:'lvl-warn', info:'lvl-info' };\n\nfunction fmt(ts) {\n  const d = new Date(ts);\n  return d.toTimeString().slice(0,8) + '.' + String(d.getMilliseconds()).padStart(3,'0');\n}\n\nfunction esc(s) {\n  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');\n}\n\nfunction buildLine(entry) {\n  const div = document.createElement('div');\n  div.className = 'line';\n  div.innerHTML =\n    '<span class=\"ts\">' + fmt(entry.ts) + '</span>' +\n    '<span class=\"lvl ' + (COLORS[entry.level]||'lvl-log') + '\">' + entry.level.toUpperCase() + '</span>' +\n    '<span class=\"msg ' + (entry.level === 'log' ? '' : entry.level) + '\">' + esc(entry.text) + '</span>';\n  return div;\n}\n\nfunction appendLine(entry) {\n  if (emptyMsg.parentNode) emptyMsg.remove();\n  lines.push(entry);\n  if (lines.length > MAX) {\n    lines.shift();\n    if (consoleEl.firstChild) consoleEl.removeChild(consoleEl.firstChild);\n  }\n  consoleEl.appendChild(buildLine(entry));\n  lineCount.textContent = lines.length;\n  if (autoScroll) consoleEl.scrollTop = consoleEl.scrollHeight;\n}\n\nfunction clearLogs() {\n  lines = [];\n  consoleEl.innerHTML = '';\n  consoleEl.appendChild(emptyMsg);\n  lineCount.textContent = '0';\n  fetch('/api/logs/clear', { method:'POST' }).catch(()=>{});\n}\n\nfunction toggleAutoScroll() {\n  autoScroll = !autoScroll;\n  scrollBtn.textContent = autoScroll ? 'AUTO-SCROLL ON' : 'AUTO-SCROLL OFF';\n  if (autoScroll) consoleEl.scrollTop = consoleEl.scrollHeight;\n}\n\nconst seed = " + _0x31f7b5 + ";\nseed.forEach(appendLine);\n\nfunction connect() {\n  const es = new EventSource('/api/logs/stream');\n  es.onopen = () => {\n    connState.textContent = 'LIVE';\n    connState.style.color = 'var(--c-log)';\n  };\n  es.onmessage = e => {\n    try { appendLine(JSON.parse(e.data)); } catch {}\n  };\n  es.onerror = () => {\n    connState.textContent = 'RECONNECTING';\n    connState.style.color = 'var(--c-warn)';\n    es.close();\n    setTimeout(connect, 3000);\n  };\n}\nconnect();\n</script>\n</body>\n</html>";
}
export function setupWebServer() {
  if (_server) return Promise.resolve();
  _patchConsole();
  const _0x553202 = getPort();
  return (_server = _0x5c4fcb.createServer(async (_0x1a709f, _0x37b94c) => {
    const _0xbda5e = new URL(_0x1a709f.url, "http://" + (_0x1a709f.headers.host || "localhost")), _0x5654a1 = _0xbda5e.pathname, _0x5ba0da = getStatus();
    if (_0x5654a1 === '/pay' && _0x1a709f.method === "GET") return (_0x37b94c.writeHead(200, {
      'Content-Type': "text/html; charset=utf-8",
      'Cache-Control': 'no-store'
    }), _0x37b94c.end(getPaymentHTML()));
    if (_0x5654a1 === "/api/payments/initialize" && _0x1a709f.method === "POST") {
      if (!paymentRequestAllowed(_0x1a709f)) return json(_0x37b94c, 429, {
        error: 'Please\x20wait\x20before\x20creating\x20another\x20payment.'
      });
      readJsonBody(_0x1a709f).then(async _0x5b333e => {
        const _0xcccecd = Number(_0x5b333e.amount);
        if (!Number.isFinite(_0xcccecd) || _0xcccecd <= 0 || _0xcccecd > 1000000) return json(_0x37b94c, 400, {
          error: "Enter an amount between 1 and 1,000,000 KES."
        });
        if (!_0x5b333e.email || !String(_0x5b333e.email).includes('@')) return json(_0x37b94c, 400, {
          error: 'Enter\x20a\x20valid\x20email.'
        });
        if (_0x5b333e.method === "mpesa") {
          if (!_0x5b333e.phone) return json(_0x37b94c, 400, {
            error: "Enter an M-PESA phone number."
          });
          const _0x1bb2fe = await initiateCharge(_0x5b333e.phone, _0xcccecd);
          return json(_0x37b94c, 202, {
            message: 'STK\x20Push\x20sent.\x20Check\x20your\x20phone\x20to\x20approve\x20the\x20payment.',
            reference: _0x1bb2fe.reference || null
          });
        }
        const _0x5ba877 = publicBaseUrl(_0x1a709f), _0x56bdf2 = await initializeTransaction({
          email: _0x5b333e.email,
          amountKES: _0xcccecd,
          callbackUrl: _0x5ba877 + "/pay"
        });
        return json(_0x37b94c, 200, {
          authorization_url: _0x56bdf2.authorization_url,
          reference: _0x56bdf2.reference
        });
      }).catch(_0x2e6ffe => json(_0x37b94c, 400, {
        error: _0x2e6ffe.message || "Could not create payment."
      }));
      return;
    }
    if (_0x5654a1 === '/api/payments/status' && _0x1a709f.method === 'GET') {
      const _0x3819e6 = _0xbda5e.searchParams.get('reference');
      if (!_0x3819e6 || !(/^[a-zA-Z0-9._-]{3,100}$/).test(_0x3819e6)) return json(_0x37b94c, 400, {
        error: 'Invalid\x20payment\x20reference.'
      });
      try {
        const _0x479c92 = await verifyCharge(_0x3819e6);
        return json(_0x37b94c, 200, {
          paid: _0x479c92?.status === "success",
          status: _0x479c92?.status || "unknown",
          reference: _0x3819e6
        });
      } catch (_0x2a6feb) {
        return json(_0x37b94c, 502, {
          error: _0x2a6feb.message || "Could not verify payment."
        });
      }
    }
    if (_0x5654a1 === "/health") return (_0x37b94c.writeHead(200, {
      'Content-Type': "application/json",
      'Access-Control-Allow-Origin': '*'
    }), _0x37b94c.end(JSON.stringify({
      status: _0x5ba0da.status,
      connected: _0x5ba0da.connected,
      botName: _0x5ba0da.botName,
      version: _0x5ba0da.version,
      uptime: _0x5ba0da.uptime,
      uptimeSecs: _0x5ba0da.uptimeSecs,
      memoryMB: _0x5ba0da.memoryMB,
      memoryTotalMB: _0x5ba0da.memoryTotalMB,
      platform: _0x5ba0da.platform,
      nodeVersion: _0x5ba0da.nodeVersion,
      timestamp: _0x5ba0da.timestamp
    })));
    if (_0x5654a1 === '/api/status') return (_0x37b94c.writeHead(200, {
      'Content-Type': "application/json",
      'Access-Control-Allow-Origin': '*'
    }), _0x37b94c.end(JSON.stringify(_0x5ba0da, null, 2)));
    if (_0x5654a1 === '/api/pair/status' && _0x1a709f.method === "GET") return json(_0x37b94c, 200, getPairingState());
    if (_0x5654a1 === "/api/pair" && _0x1a709f.method === "POST") {
      readJsonBody(_0x1a709f).then(async _0x4cd745 => {
        const _0x1e536a = Date.now();
        if (globalThis._webPairingLastRequest && _0x1e536a - globalThis._webPairingLastRequest < 10000) return json(_0x37b94c, 429, {
          error: "Please wait a few seconds before requesting another code."
        });
        if (typeof globalThis.startWebPairing !== 'function') return json(_0x37b94c, 503, {
          error: "Pairing service is not ready yet."
        });
        globalThis._webPairingLastRequest = _0x1e536a;
        try {
          return (await globalThis.startWebPairing(_0x4cd745.phone), json(_0x37b94c, 202, getPairingState()));
        } catch (_0x571745) {
          return json(_0x37b94c, 400, {
            error: _0x571745.message || "Could not start pairing."
          });
        }
      }).catch(_0x3d51c8 => json(_0x37b94c, 400, {
        error: _0x3d51c8.message || "Invalid request."
      }));
      return;
    }
    if (_0x5654a1 === '/logs') {
      if (!logAuthOk(_0x1a709f)) return (_0x37b94c.writeHead(403, {
        'Content-Type': "text/plain"
      }), _0x37b94c.end("403 Forbidden — set LOG_PASSWORD env var and pass ?key=<password>"));
      return (_0x37b94c.writeHead(200, {
        'Content-Type': 'text/html;\x20charset=utf-8'
      }), _0x37b94c.end(getLogsHTML(_visibleWebLogs())));
    }
    if (_0x5654a1 === '/api/logs') {
      if (!logAuthOk(_0x1a709f)) return (_0x37b94c.writeHead(403, {
        'Content-Type': 'application/json'
      }), _0x37b94c.end(JSON.stringify({
        error: "Forbidden"
      })));
      return (_0x37b94c.writeHead(200, {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': '*'
      }), _0x37b94c.end(JSON.stringify(_visibleWebLogs())));
    }
    if (_0x5654a1 === "/api/logs/stream") {
      if (!logAuthOk(_0x1a709f)) return (_0x37b94c.writeHead(403), _0x37b94c.end());
      (_0x37b94c.writeHead(200, {
        'Content-Type': "text/event-stream",
        'Cache-Control': "no-cache",
        Connection: "keep-alive",
        'Access-Control-Allow-Origin': '*'
      }), _0x37b94c.write(": connected\n\n"), globalThis._logSseClients.add(_0x37b94c), _0x1a709f.on("close", () => globalThis._logSseClients.delete(_0x37b94c)));
      return;
    }
    if (_0x5654a1 === '/api/logs/clear' && _0x1a709f.method === "POST") {
      if (!logAuthOk(_0x1a709f)) return (_0x37b94c.writeHead(403), _0x37b94c.end());
      return (globalThis._logBuffer.length = 0, _0x37b94c.writeHead(200, {
        'Content-Type': "application/json"
      }), _0x37b94c.end(JSON.stringify({
        ok: true
      })));
    }
    (_0x37b94c.writeHead(200, {
      'Content-Type': "text/html; charset=utf-8"
    }), _0x37b94c.end(getHTML(_0x5ba0da)));
  }), new Promise(_0x4596db => {
    let _0x1aa7c0 = _0x553202;
    (_server.on('error', _0x18d613 => {
      _0x18d613.code === "EADDRINUSE" && (_0x1aa7c0 = _0x553202 + 1, _server.listen(_0x1aa7c0, '0.0.0.0'));
    }), _server.listen(_0x553202, "0.0.0.0", () => {
      const {name: _0x56644a} = getPlatformInfo(), _0x2f38cd = String(process.env.PUBLIC_URL || process.env.APP_URL || '').trim().replace(/\/$/, ''), _0x2edc1b = "http://localhost:" + _0x1aa7c0, _0x5e3ad9 = String(process.env.PUBLIC_HOST || '').trim(), _0x369340 = parseInt(process.env.PUBLIC_PORT || _0x1aa7c0, 10), _0x5bec6b = _0x5e3ad9 && _0x5e3ad9 !== "0.0.0.0" ? (process.env.PUBLIC_SCHEME || "http") + "://" + _0x5e3ad9 + ':' + _0x369340 : '', _0x86024b = _0x2f38cd || _0x5bec6b;
      globalThis._webServerAddress = _0x86024b || _0x2edc1b;
      const _0x8222a9 = "\u001b[38;2;0;255;156m", _0x1dbf4f = "\u001b[1m\u001b[38;2;0;255;156m", _0xde9ae2 = "\u001b[38;2;34;193;255m", _0x34190b = '\x1b[1m\x1b[38;2;34;193;255m', _0x4c4bda = "\u001b[38;2;250;204;21m", _0x4f6667 = "\u001b[1m\u001b[38;2;250;204;21m", _0xd29179 = "\u001b[2m\u001b[38;2;100;120;130m", _0x49854a = "\u001b[38;2;200;215;225m", _0x285fec = "\u001b[0m", _0x12ed07 = _0xd29179 + '·' + _0x285fec;
      (process.stdout.write('\n' + _0x1dbf4f + '╭┄〔 ' + (BRAND.VIP || BRAND.WOLF) + " VIPBOT CONTROL CORE 〕┄╮" + _0x285fec + '\n'), process.stdout.write(_0x1dbf4f + '┆ ✦ ' + _0x285fec + _0x4c4bda + UTILITY.CONSTRUCTION + '️' + _0x285fec + ' ' + _0x49854a + _0x56644a + _0x285fec + '  ' + _0x12ed07 + '  ' + _0x4c4bda + STATUS.PLUG + _0x285fec + ' ' + _0x49854a + _0x1aa7c0 + _0x285fec + '  ' + _0x12ed07 + '  ' + _0x4c4bda + DOWNLOAD.FOLDER_OPEN + _0x285fec + ' ' + _0x49854a + '/logs' + _0x285fec + '\n'), process.stdout.write(_0x1dbf4f + '╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯' + _0x285fec + '\n\n'), _0x4596db());
    }));
  }));
}
export function updateWebStatus(_0x388cd5) {
  globalThis._webStatus = {
    ...globalThis._webStatus || ({}),
    ..._0x388cd5
  };
}
