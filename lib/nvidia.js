const KEY_URL = "https://7-w.vercel.app/nvidia.json", API_BASE = 'https://integrate.api.nvidia.com/v1', IMAGE_API_BASE = 'https://ai.api.nvidia.com/v1/genai', DEFAULT_MODEL = "google/gemma-3-27b-it", KEY_TTL_MS = 30 * 60 * 1000, REQUEST_TIMEOUT = 90 * 1000;
let _cachedKey = null, _cachedKeyAt = 0;
async function fetchKey(_0x4972cc = false) {
  if (!_0x4972cc && _cachedKey && Date.now() - _cachedKeyAt < KEY_TTL_MS) return _cachedKey;
  const _0x219db5 = new AbortController(), _0x405048 = setTimeout(() => _0x219db5.abort(), 15000);
  try {
    const _0x425c8c = await fetch(KEY_URL, {
      signal: _0x219db5.signal,
      headers: {
        'User-Agent': 'VIPBOT/1.0',
        Accept: 'application/json'
      },
      cache: 'no-store'
    });
    if (!_0x425c8c.ok) throw new Error("Key endpoint HTTP " + _0x425c8c.status);
    const _0x1d4f07 = await _0x425c8c.json(), _0x68e0ad = _0x1d4f07?.NVIDIA_API_KEY || _0x1d4f07?.key || _0x1d4f07?.apiKey;
    if (!_0x68e0ad || typeof _0x68e0ad !== "string" || !_0x68e0ad.startsWith("nvapi-")) throw new Error("Key endpoint returned no usable NVIDIA_API_KEY");
    return (_cachedKey = _0x68e0ad, _cachedKeyAt = Date.now(), _0x68e0ad);
  } finally {
    clearTimeout(_0x405048);
  }
}
export function invalidateKey() {
  (_cachedKey = null, _cachedKeyAt = 0);
}
async function postChat(_0x4dde99, {retried: retried = false, timeoutMs: timeoutMs = REQUEST_TIMEOUT} = {}) {
  const _0x3c1a3f = await fetchKey(), _0x1e830c = new AbortController(), _0x2e9084 = setTimeout(() => _0x1e830c.abort(), timeoutMs);
  let _0xecb5d4;
  try {
    _0xecb5d4 = await fetch(API_BASE + "/chat/completions", {
      method: "POST",
      signal: _0x1e830c.signal,
      headers: {
        Authorization: "Bearer " + _0x3c1a3f,
        Accept: "application/json",
        'Content-Type': 'application/json',
        'User-Agent': "VIPBOT/1.0"
      },
      body: JSON.stringify(_0x4dde99)
    });
  } finally {
    clearTimeout(_0x2e9084);
  }
  if (_0xecb5d4.status === 401 && !retried) return (invalidateKey(), postChat(_0x4dde99, {
    retried: true,
    timeoutMs: timeoutMs
  }));
  if (!_0xecb5d4.ok) {
    const _0x1c4923 = await _0xecb5d4.text().catch(() => '');
    throw new Error("NVIDIA API " + _0xecb5d4.status + ':\x20' + (_0x1c4923.slice(0, 300) || _0xecb5d4.statusText));
  }
  return _0xecb5d4.json();
}
export async function chat(_0x2e04de, _0xe54e9a = {}) {
  if (!_0x2e04de || !_0x2e04de.trim()) throw new Error("Empty prompt");
  const _0x502264 = [];
  if (_0xe54e9a.system) _0x502264.push({
    role: "system",
    content: _0xe54e9a.system
  });
  _0x502264.push({
    role: "user",
    content: _0x2e04de
  });
  const _0x1aca4c = await postChat({
    model: _0xe54e9a.model || DEFAULT_MODEL,
    messages: _0x502264,
    temperature: _0xe54e9a.temperature ?? 0.6,
    top_p: _0xe54e9a.topP ?? 0.95,
    max_tokens: _0xe54e9a.maxTokens ?? 1024,
    stream: false
  }, {
    timeoutMs: _0xe54e9a.timeoutMs
  }), _0x258cb9 = _0x1aca4c?.choices?.[0]?.message, _0x1738bd = _0x258cb9?.content && _0x258cb9.content.trim() ? _0x258cb9.content : _0x258cb9?.reasoning_content;
  if (!_0x1738bd || !_0x1738bd.trim()) throw new Error('NVIDIA\x20returned\x20an\x20empty\x20response');
  return _0x1738bd.trim();
}
export async function chatRaw(_0x3df657, _0x4670ce = {}) {
  if (!Array.isArray(_0x3df657) || _0x3df657.length === 0) throw new Error("messages[] required");
  const _0x5b6979 = await postChat({
    model: _0x4670ce.model || DEFAULT_MODEL,
    messages: _0x3df657,
    temperature: _0x4670ce.temperature ?? 0.6,
    top_p: _0x4670ce.topP ?? 0.95,
    max_tokens: _0x4670ce.maxTokens ?? 1024,
    stream: false,
    ..._0x4670ce.extra
  }, {
    timeoutMs: _0x4670ce.timeoutMs
  });
  return _0x5b6979;
}
export async function vision(_0x612f30, _0xe817ca, _0xc48e18 = {}) {
  let _0x4e025a;
  if (Buffer.isBuffer(_0xe817ca)) _0x4e025a = "data:image/jpeg;base64," + _0xe817ca.toString("base64"); else {
    if (typeof _0xe817ca === "string") _0x4e025a = _0xe817ca; else throw new Error("image must be a Buffer, data URL, or https URL");
  }
  const _0xae6064 = [{
    role: "user",
    content: [{
      type: "text",
      text: _0x612f30 || "Describe this image."
    }, {
      type: "image_url",
      image_url: {
        url: _0x4e025a
      }
    }]
  }], _0x405e2d = await chatRaw(_0xae6064, _0xc48e18), _0xfa69f7 = _0x405e2d?.choices?.[0]?.message, _0x4eca95 = _0xfa69f7?.content && _0xfa69f7.content.trim() ? _0xfa69f7.content : _0xfa69f7?.reasoning_content;
  if (!_0x4eca95 || !_0x4eca95.trim()) throw new Error('NVIDIA\x20returned\x20an\x20empty\x20response');
  return _0x4eca95.trim();
}
export async function visionMulti(_0x515914, _0x1c5c04, _0x151f4f = {}) {
  if (!Array.isArray(_0x1c5c04) || _0x1c5c04.length === 0) throw new Error("images[] required and must be non-empty");
  const _0x256665 = [{
    type: "text",
    text: _0x515914 || "Describe these images."
  }];
  for (const _0x1c3379 of _0x1c5c04) {
    let _0x590abf;
    if (Buffer.isBuffer(_0x1c3379)) _0x590abf = 'data:image/jpeg;base64,' + _0x1c3379.toString('base64'); else {
      if (typeof _0x1c3379 === "string") _0x590abf = _0x1c3379; else throw new Error("each image must be a Buffer, data URL, or https URL");
    }
    _0x256665.push({
      type: "image_url",
      image_url: {
        url: _0x590abf
      }
    });
  }
  const _0x4b26de = await chatRaw([{
    role: "user",
    content: _0x256665
  }], _0x151f4f), _0x4b78fe = _0x4b26de?.choices?.[0]?.message, _0x50726f = _0x4b78fe?.content && _0x4b78fe.content.trim() ? _0x4b78fe.content : _0x4b78fe?.reasoning_content;
  if (!_0x50726f || !_0x50726f.trim()) throw new Error('NVIDIA\x20returned\x20an\x20empty\x20response');
  return _0x50726f.trim();
}
export async function image(_0x5e3fde, _0x49e1b0 = {}) {
  if (!_0x5e3fde || !_0x5e3fde.trim()) throw new Error("Empty prompt");
  const _0x1093b6 = _0x49e1b0.model || "black-forest-labs/flux.1-dev", _0x32a3f1 = _0x49e1b0.timeoutMs ?? 120000, _0x52d49e = Number.isInteger(_0x49e1b0.seed) ? _0x49e1b0.seed : Math.floor(Math.random() * 2147483647), _0x223442 = (/klein/i).test(_0x1093b6), _0x4e6821 = _0x223442 ? 4 : 30, _0x2ec14a = _0x223442 ? 1 : 3.5, _0x264672 = {
    prompt: _0x5e3fde,
    width: _0x49e1b0.width ?? 1024,
    height: _0x49e1b0.height ?? 1024,
    steps: _0x49e1b0.steps ?? _0x4e6821,
    cfg_scale: _0x49e1b0.cfgScale ?? _0x2ec14a,
    seed: _0x52d49e
  };
  if (_0x49e1b0.aspectRatio) _0x264672.aspect_ratio = _0x49e1b0.aspectRatio;
  const _0xb47370 = await fetchKey(), _0x54f54e = new AbortController(), _0x297beb = setTimeout(() => _0x54f54e.abort(), _0x32a3f1);
  let _0x43c227;
  try {
    _0x43c227 = await fetch(IMAGE_API_BASE + '/' + _0x1093b6, {
      method: "POST",
      signal: _0x54f54e.signal,
      headers: {
        Authorization: "Bearer " + _0xb47370,
        Accept: "application/json",
        'Content-Type': "application/json",
        'User-Agent': 'VIPBOT/1.0'
      },
      body: JSON.stringify(_0x264672)
    });
  } finally {
    clearTimeout(_0x297beb);
  }
  if (_0x43c227.status === 401) {
    invalidateKey();
    throw new Error("NVIDIA API 401 — key invalidated, please retry");
  }
  if (!_0x43c227.ok) {
    const _0x3c8f26 = await _0x43c227.text().catch(() => '');
    throw new Error('NVIDIA\x20image\x20API\x20' + _0x43c227.status + ':\x20' + (_0x3c8f26.slice(0, 300) || _0x43c227.statusText));
  }
  const _0x3a2137 = await _0x43c227.json(), _0x452fd3 = _0x3a2137?.artifacts?.[0]?.base64 || _0x3a2137?.image || _0x3a2137?.data?.[0]?.b64_json;
  if (!_0x452fd3) throw new Error("NVIDIA image API returned no image data");
  return Buffer.from(_0x452fd3, "base64");
}
const ASSETS_API = "https://api.nvcf.nvidia.com/v2/nvcf/assets";
function detectImageMime(_0x168160) {
  if (!Buffer.isBuffer(_0x168160) || _0x168160.length < 12) return 'image/jpeg';
  if (_0x168160[0] === 255 && _0x168160[1] === 216 && _0x168160[2] === 255) return 'image/jpeg';
  if (_0x168160[0] === 137 && _0x168160[1] === 80 && _0x168160[2] === 78 && _0x168160[3] === 71) return "image/png";
  if (_0x168160[0] === 71 && _0x168160[1] === 73 && _0x168160[2] === 70) return "image/gif";
  if (_0x168160[0] === 82 && _0x168160[1] === 73 && _0x168160[2] === 70 && _0x168160[3] === 70 && _0x168160[8] === 87 && _0x168160[9] === 69 && _0x168160[10] === 66 && _0x168160[11] === 80) return 'image/webp';
  return "image/jpeg";
}
async function uploadAsset(_0x366cea, _0x514afa = "image/jpeg", _0x515948 = "input image") {
  if (!Buffer.isBuffer(_0x366cea)) throw new Error("uploadAsset: buffer required");
  const _0x12dc34 = await fetchKey();
  console.log("[NVCF-ASSET] Reserving slot: contentType=" + _0x514afa + ',\x20size=' + _0x366cea.length + 'b');
  const _0x3ea72d = await fetch(ASSETS_API, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + _0x12dc34,
      'Content-Type': 'application/json',
      Accept: "application/json",
      'User-Agent': "VIPBOT/1.0"
    },
    body: JSON.stringify({
      contentType: _0x514afa,
      description: _0x515948
    })
  });
  if (!_0x3ea72d.ok) {
    const _0xeb6c5b = await _0x3ea72d.text().catch(() => '');
    throw new Error('NVCF\x20asset\x20reserve\x20' + _0x3ea72d.status + ':\x20' + (_0xeb6c5b.slice(0, 200) || _0x3ea72d.statusText));
  }
  const _0x5aa003 = await _0x3ea72d.json();
  console.log("[NVCF-ASSET] Reserve response keys: " + Object.keys(_0x5aa003).join(','));
  const {uploadUrl: _0x2cf992, assetId: _0x223973} = _0x5aa003;
  if (!_0x2cf992 || !_0x223973) throw new Error("NVCF asset reserve missing fields: " + JSON.stringify(_0x5aa003).slice(0, 200));
  console.log('[NVCF-ASSET]\x20Reserved\x20assetId=' + _0x223973);
  const _0x131ba7 = await fetch(_0x2cf992, {
    method: "PUT",
    headers: {
      'Content-Type': _0x514afa,
      'x-amz-meta-nvcf-asset-description': _0x515948
    },
    body: _0x366cea
  });
  console.log("[NVCF-ASSET] PUT status=" + _0x131ba7.status);
  if (!_0x131ba7.ok) {
    const _0x23ad71 = await _0x131ba7.text().catch(() => '');
    throw new Error("NVCF asset upload " + _0x131ba7.status + ':\x20' + (_0x23ad71.slice(0, 200) || _0x131ba7.statusText));
  }
  return _0x223973;
}
export async function imageEdit(_0x5172f1, _0x3aaa66, _0x145b8c = {}) {
  if (!_0x5172f1 || !_0x5172f1.trim()) throw new Error('Empty\x20prompt');
  if (!Buffer.isBuffer(_0x3aaa66)) throw new Error("image must be a Buffer");
  const _0x4511be = _0x145b8c.model || "black-forest-labs/flux.1-kontext-dev", _0x14a349 = _0x145b8c.timeoutMs ?? 180000, _0x30528b = _0x145b8c.contentType || detectImageMime(_0x3aaa66), _0x5a7834 = Number.isInteger(_0x145b8c.seed) ? _0x145b8c.seed : Math.floor(Math.random() * 2147483647);
  console.log("[FLUX-KONTEXT] Detected MIME=" + _0x30528b + ',\x20prompt=\x22' + _0x5172f1.slice(0, 60) + '\x22');
  const _0x2be1b7 = await uploadAsset(_0x3aaa66, _0x30528b, "flux-kontext input"), _0x47becc = {
    prompt: _0x5172f1,
    image: 'data:' + _0x30528b + ";example_id," + _0x2be1b7
  };
  if (_0x145b8c.cfgScale != null) _0x47becc.cfg_scale = _0x145b8c.cfgScale;
  if (_0x145b8c.steps != null) _0x47becc.steps = _0x145b8c.steps;
  if (_0x145b8c.seed != null) _0x47becc.seed = _0x5a7834;
  if (_0x145b8c.aspectRatio) _0x47becc.aspect_ratio = _0x145b8c.aspectRatio;
  console.log("[FLUX-KONTEXT] Body: " + JSON.stringify({
    ..._0x47becc,
    image: _0x47becc.image
  }).slice(0, 300));
  const _0xa1e45e = await fetchKey(), _0xffd7ed = new AbortController(), _0x224111 = setTimeout(() => _0xffd7ed.abort(), _0x14a349);
  let _0x505bcc;
  try {
    _0x505bcc = await fetch(IMAGE_API_BASE + '/' + _0x4511be, {
      method: "POST",
      signal: _0xffd7ed.signal,
      headers: {
        Authorization: 'Bearer\x20' + _0xa1e45e,
        Accept: 'application/json',
        'Content-Type': "application/json",
        'NVCF-INPUT-ASSET-REFERENCES': _0x2be1b7,
        'User-Agent': "VIPBOT/1.0"
      },
      body: JSON.stringify(_0x47becc)
    });
  } finally {
    clearTimeout(_0x224111);
  }
  console.log("[FLUX-KONTEXT] Generation status=" + _0x505bcc.status);
  if (_0x505bcc.status === 401) {
    invalidateKey();
    throw new Error("NVIDIA API 401 — key invalidated, please retry");
  }
  if (!_0x505bcc.ok) {
    const _0x4a2bbb = await _0x505bcc.text().catch(() => '');
    console.log("[FLUX-KONTEXT] Error response body: " + _0x4a2bbb.slice(0, 500));
    throw new Error('NVIDIA\x20flux-kontext\x20API\x20' + _0x505bcc.status + ':\x20' + (_0x4a2bbb.slice(0, 300) || _0x505bcc.statusText));
  }
  const _0x2d3fcd = await _0x505bcc.json();
  console.log("[FLUX-KONTEXT] Success response keys: " + Object.keys(_0x2d3fcd).join(','));
  const _0x5173e5 = _0x2d3fcd?.artifacts?.[0]?.base64 || _0x2d3fcd?.image || _0x2d3fcd?.data?.[0]?.b64_json || _0x2d3fcd?.images?.[0];
  if (!_0x5173e5) throw new Error("NVIDIA flux-kontext returned no image. Response: " + JSON.stringify(_0x2d3fcd).slice(0, 300));
  return Buffer.from(_0x5173e5, "base64");
}
export const NVIDIA = {
  KEY_URL: KEY_URL,
  API_BASE: API_BASE,
  IMAGE_API_BASE: IMAGE_API_BASE,
  DEFAULT_MODEL: DEFAULT_MODEL
};
export default {
  chat: chat,
  chatRaw: chatRaw,
  vision: vision,
  visionMulti: visionMulti,
  image: image,
  imageEdit: imageEdit,
  invalidateKey: invalidateKey,
  NVIDIA: NVIDIA
};
