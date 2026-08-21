/**
 * CORS estricto: sólo se refleja el header Access-Control-Allow-Origin si
 * el Origin de la petición está en la whitelist de ALLOWED_ORIGIN (lista
 * separada por comas, para poder tener a la vez el localhost de dev y la
 * URL de producción/preview de Vercel).
 *
 * Nota: CORS es una restricción que el propio navegador hace cumplir. No
 * bloquea peticiones directas (curl, scripts server-to-server) — eso lo
 * cubren la validación de inputs y el rate limiting.
 */

function getAllowedOrigins() {
  return String(process.env.ALLOWED_ORIGIN || '')
    .split(',')
    .map(function (o) { return o.trim(); })
    .filter(Boolean);
}

function applyCors(req, res) {
  var origin = req.headers.origin;
  var allowed = getAllowedOrigins();

  if (origin && allowed.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function handlePreflight(req, res) {
  if (req.method === 'OPTIONS') {
    applyCors(req, res);
    res.status(204).end();
    return true;
  }
  return false;
}

module.exports = { applyCors: applyCors, handlePreflight: handlePreflight };
