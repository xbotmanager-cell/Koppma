import _0x245acc from 'axios';
import {APIX_BASE, getApixKey} from './apixConfig.js';
const TIMEOUT = 30000, HEADERS = {
  'User-Agent': "VIPBOT/1.0",
  Accept: "application/json"
};
export async function askUncensored(_0x3f4a3b) {
  const _0x2956b5 = [{
    method: "post",
    url: 'https://uncensored.chat/run/predict',
    data: {
      data: [_0x3f4a3b, [], '']
    },
    extract: _0x67e674 => _0x67e674?.data?.[0]
  }, {
    method: "get",
    url: "https://uncensored.chat/api/chat",
    params: {
      q: _0x3f4a3b
    },
    extract: _0x2c95fe => {
      if (typeof _0x2c95fe === "string") return _0x2c95fe.trim() || null;
      return _0x2c95fe?.result || _0x2c95fe?.response || _0x2c95fe?.text || _0x2c95fe?.output || _0x2c95fe?.reply || null;
    }
  }, {
    method: "get",
    url: "https://api.bk9.dev/ai/wormgpt",
    params: {
      q: _0x3f4a3b
    },
    extract: _0x44ed08 => _0x44ed08?.BK9 || _0x44ed08?.result || _0x44ed08?.response || null
  }];
  for (const _0x34483b of _0x2956b5) {
    try {
      const _0x37222d = _0x34483b.method === 'post' ? await _0x245acc.post(_0x34483b.url, _0x34483b.data, {
        timeout: TIMEOUT,
        headers: HEADERS
      }) : await _0x245acc.get(_0x34483b.url, {
        params: _0x34483b.params,
        timeout: TIMEOUT,
        headers: HEADERS
      }), _0x59ee4f = _0x34483b.extract(_0x37222d.data);
      if (_0x59ee4f && typeof _0x59ee4f === "string" && _0x59ee4f.trim().length > 2) return _0x59ee4f.trim();
    } catch {}
  }
  throw new Error("WormGPT: all uncensored sources failed. Try again later.");
}
function extractText(_0x5e2df7) {
  if (!_0x5e2df7) return null;
  if (typeof _0x5e2df7 === 'string') {
    const _0x17cdbf = _0x5e2df7.trim();
    if (_0x17cdbf.startsWith('<') || _0x17cdbf.length < 2) return null;
    return _0x17cdbf;
  }
  for (const _0x4c49fe of ["BK9", "result", "response", "answer", "text", "output", "message", "content", "reply"]) {
    if (_0x5e2df7[_0x4c49fe] && typeof _0x5e2df7[_0x4c49fe] === "string" && _0x5e2df7[_0x4c49fe].trim().length > 2) return _0x5e2df7[_0x4c49fe].trim();
  }
  return null;
}
export async function callAI(_0x173722, _0x3ea20d, _0x2dc6ab = null) {
  const _0x54fec2 = String(_0x173722 || '').replace(/^\/+|\/+$/g, '');
  if (!_0x54fec2) throw new Error("AI model endpoint is required");
  const _0x449a81 = getApixKey(), _0x59b96f = [{
    url: APIX_BASE + "/api/ai/" + _0x54fec2,
    params: {
      q: _0x3ea20d,
      key: _0x449a81
    }
  }, ..._0x2dc6ab ? [{
    url: _0x2dc6ab,
    params: {
      q: _0x3ea20d,
      key: _0x449a81
    }
  }] : [], {
    url: 'https://apis.xwolf.space/api/ai/' + _0x54fec2,
    params: {
      q: _0x3ea20d,
      key: _0x449a81
    }
  }, {
    url: "https://apis-e3qq.onrender.com/api/ai/" + _0x54fec2,
    params: {
      q: _0x3ea20d,
      key: _0x449a81
    }
  }, ..._0x54fec2 === "gemini" ? [{
    url: "https://api.bk9.dev/ai/gemini",
    params: {
      q: _0x3ea20d
    }
  }] : []];
  for (const {url: _0x143a76, params: _0x1fd069} of _0x59b96f) {
    try {
      const _0x31a6c4 = await _0x245acc.get(_0x143a76, {
        params: _0x1fd069,
        timeout: TIMEOUT,
        headers: HEADERS
      }), _0x3a855e = extractText(_0x31a6c4.data);
      if (_0x3a855e) return _0x3a855e;
    } catch {}
  }
  throw new Error("All AI providers failed for query: " + _0x3ea20d.slice(0, 60));
}
