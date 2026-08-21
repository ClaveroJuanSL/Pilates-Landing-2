var cors = require('./_lib/cors');
var rateLimit = require('./_lib/rateLimit');
var validate = require('./_lib/validate');

var GENERIC_ERROR = { error: 'No pudimos procesar tu solicitud. Intentá nuevamente más tarde.' };

module.exports = async function handler(req, res) {
  if (cors.handlePreflight(req, res)) return;
  cors.applyCors(req, res);

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido.' });
    return;
  }

  if (rateLimit.isRateLimited(req)) {
    res.status(429).json({ error: 'Demasiadas solicitudes. Probá de nuevo en unos minutos.' });
    return;
  }

  var result = validate.validateContactPayload(req.body);
  if (!result.ok) {
    res.status(400).json({ error: 'Datos inválidos.' });
    return;
  }

  var datos = result.data;

  try {
    await enviarEmailNotificacion(datos);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[api/contact] Error enviando email:', err);
    res.status(500).json(GENERIC_ERROR);
  }
};

async function enviarEmailNotificacion(datos) {
  var apiKey = process.env.RESEND_API_KEY;
  var to = process.env.CONTACT_TO_EMAIL;
  var from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error('Faltan variables de entorno de email (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).');
  }

  var esc = validate.escapeHtml;
  var html =
    '<h2>Nueva consulta desde la web</h2>' +
    '<p><strong>Nombre:</strong> ' + esc(datos.nombre) + '</p>' +
    '<p><strong>WhatsApp:</strong> ' + esc(datos.tel) + '</p>' +
    '<p><strong>Email:</strong> ' + esc(datos.email || '-') + '</p>' +
    '<p><strong>Horario preferido:</strong> ' + esc(datos.horario || '-') + '</p>' +
    '<p><strong>Experiencia previa:</strong> ' + esc(datos.nivel || '-') + '</p>' +
    '<p><strong>Mensaje:</strong><br>' + esc(datos.mensaje || '-').replace(/\n/g, '<br>') + '</p>';

  var response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: from,
      to: to,
      reply_to: datos.email || undefined,
      subject: 'Nueva consulta de ' + datos.nombre,
      html: html
    })
  });

  if (!response.ok) {
    var detail = await response.text().catch(function () { return ''; });
    throw new Error('Resend respondió ' + response.status + ': ' + detail);
  }
}
