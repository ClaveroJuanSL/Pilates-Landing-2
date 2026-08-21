/**
 * Validación y saneo de los datos que llegan del formulario de contacto.
 * Nada de esto confía en lo que mande el frontend: el <select>/radio del
 * HTML se vuelve a validar acá por whitelist, porque cualquiera puede
 * pegarle directo al endpoint sin pasar por el formulario.
 */

var HORARIOS = [
  'Mañana (7 a 12 h)',
  'Mediodía (12 a 15 h)',
  'Tarde (15 a 18 h)',
  'Noche (18 a 21 h)',
  'Flexible'
];

var NIVELES = ['Nunca hice', 'Algo de experiencia', 'Practico hace años'];

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PHONE_RE = /^[0-9+()\-\s]{6,30}$/;
var CONTROL_CHARS_RE = new RegExp('[\\x00-\\x1F\\x7F]', 'g');

function sanitizeText(value, maxLen) {
  if (typeof value !== 'string') return '';
  var cleaned = value
    .replace(CONTROL_CHARS_RE, '')
    .replace(/<[^>]*>/g, '')
    .trim();
  return cleaned.slice(0, maxLen);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/**
 * @returns {{ ok: true, data: object } | { ok: false }}
 */
function validateContactPayload(body) {
  if (!body || typeof body !== 'object') return { ok: false };

  var nombre = sanitizeText(body.nombre, 100);
  var tel = sanitizeText(body.tel, 30);
  var email = sanitizeText(body.email, 150);
  var horario = sanitizeText(body.horario, 40);
  var nivel = sanitizeText(body.nivel, 40);
  var mensaje = sanitizeText(body.mensaje, 1000);

  if (!nombre || !tel) return { ok: false };
  if (!PHONE_RE.test(tel)) return { ok: false };
  if (email && !EMAIL_RE.test(email)) return { ok: false };
  if (horario && HORARIOS.indexOf(horario) === -1) return { ok: false };
  if (nivel && NIVELES.indexOf(nivel) === -1) return { ok: false };

  return {
    ok: true,
    data: { nombre: nombre, tel: tel, email: email, horario: horario, nivel: nivel, mensaje: mensaje }
  };
}

module.exports = {
  sanitizeText: sanitizeText,
  escapeHtml: escapeHtml,
  validateContactPayload: validateContactPayload
};
