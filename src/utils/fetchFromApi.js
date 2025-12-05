// Use Vite env variable `VITE_API_BASE` when provided.
// If not provided and the caller uses a path starting with `/api`, fetch will be made
// as a relative request so Vite's dev proxy can forward it to the backend.
const envBase = import.meta.env && import.meta.env.VITE_API_BASE;
const fallbackBase = 'https://fakestoreapi.com';

async function fetchFromApi(path, options) {
  // normalize path
  const raw = String(path || '').trim();

  let url;
  if (envBase) {
    url = `${envBase.replace(/\/$/, '')}/${raw.replace(/^\//, '')}`;
  } else {
    // no env base provided — if caller requested an /api path, keep it relative
    if (raw.startsWith('/api')) {
      url = raw; // relative path -> Vite proxy will handle during dev
    } else if (raw.startsWith('api')) {
      url = '/' + raw; // convert to relative
    } else {
      // fall back to fakestore API for other external calls
      url = `${fallbackBase.replace(/\/$/, '')}/${raw.replace(/^\//, '')}`;
    }
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data;
}

export default fetchFromApi;
