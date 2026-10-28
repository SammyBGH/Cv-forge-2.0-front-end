const TOKEN_KEY = 'cvforge_token';

// If VITE_API_URL is unset (e.g. standard local dev using Vite proxy), use relative path
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getToken();

  if (token) headers.set('Authorization', `Bearer ${token}`);

  if (!headers.has('Content-Type') && options.body && typeof options.body === 'object') {
    headers.set('Content-Type', 'application/json');
  }

  const body =
    options.body && typeof options.body === 'object' && !(options.body instanceof FormData)
      ? JSON.stringify(options.body)
      : options.body;

  const url = `${API_BASE}/api${path}`;
  const res = await fetch(url, {
    ...options,
    headers,
    body,
  });

  const text = await res.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg = data?.error || res.statusText || 'Request failed';
    const err = new Error(msg);
    err.status = res.status;
    err.details = data?.details;
    throw err;
  }

  return data;
}

export const api = {
  login: (body) => request('/auth/login', { method: 'POST', body }),
  register: (body) => request('/auth/register', { method: 'POST', body }),
  devLogin: (body) => request('/auth/dev-login', { method: 'POST', body }),
  googleLogin: (idToken) => request('/auth/google', { method: 'POST', body: { idToken } }),
  me: () => request('/auth/me'),
  listCvs: () => request('/cvs'),
  getCv: (id) => request(`/cvs/${id}`),
  createCv: (body) => request('/cvs', { method: 'POST', body }),
  patchCv: (id, body) => request(`/cvs/${id}`, { method: 'PATCH', body }),
  duplicateCv: (id) => request(`/cvs/${id}/duplicate`, { method: 'POST' }),
  deleteCv: (id) => request(`/cvs/${id}`, { method: 'DELETE' }),
  paymentConfig: () => request('/payments/config'),
  initPayment: (body) => request('/payments/initialize', { method: 'POST', body }),
  verifyPayment: (reference) =>
    request(`/payments/verify?reference=${encodeURIComponent(reference)}`),
  downloadStatus: (cvId) => request(`/downloads/status/${cvId}`),
  authorizeDownload: (cvId) => request(`/downloads/authorize/${cvId}`),
  retryTranslation: (cvId) => request(`/cvs/${cvId}/translations/retry`, { method: 'POST' }),
  templates: () => request('/templates'),
};
