/**
 * Rate limiting best-effort en memoria, por IP.
 *
 * LIMITACIÓN IMPORTANTE: en Vercel cada función serverless puede ejecutar
 * en instancias distintas (y una instancia "fría" arranca con el mapa
 * vacío), así que esto NO es un límite global garantizado — es una
 * mitigación best-effort contra abuso casual/bots simples, no contra un
 * atacante decidido.
 *
 * Para un límite robusto de verdad en producción con tráfico real, migrar
 * esta función a un store compartido (Upstash Redis + @upstash/ratelimit,
 * o Vercel KV), manteniendo la misma firma `check(ip)`.
 */

var hits = new Map();

var MAX = Number(process.env.RATE_LIMIT_MAX) || 5;
var WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000;

function getClientIp(req) {
  var forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

function isRateLimited(req) {
  var ip = getClientIp(req);
  var now = Date.now();
  var entry = hits.get(ip);

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX;
}

module.exports = { isRateLimited: isRateLimited };
