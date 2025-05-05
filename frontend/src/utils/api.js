const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Low-level helper for all API calls.
 * @param {string} path  – your endpoint, e.g. '/api/encode'
 * @param {object} opts  – fetch init (method, headers, body, etc)
 */
async function request(path, opts = {}) {
  const url = `${BASE_URL}${path}`;
  const init = {
    headers: {
      'Content-Type': 'application/json',
      ...opts.headers,
    },
    ...opts,
  };
  if (opts.body && typeof opts.body !== 'string') {
    init.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, init);
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const msg = data?.message || res.statusText;
    throw new Error(msg);
  }
  return data;
}


/** POST /api/encode */
export function apiEncode(longUrl) {
  return request('/encode', {
    method: 'POST',
    body: { longUrl },
  });
}

/** Get /api/decode/:path */
export function apiDecode(urlPath) {
  return request('/decode', {
    method: 'POST',
    body: { urlPath },
  });
}

/** GET /api/statistic/:path */
export function apiStats(code) {
  return request(`/statistic/${encodeURIComponent(code)}`);
}

/** GET /api/list */
export function apiList() {
  return request('/list');
}

/** GET /:urlPath (Redirect URL) */
export function apiRedirect(urlPath) {
  return request(`/${encodeURIComponent(urlPath)}`);
}
