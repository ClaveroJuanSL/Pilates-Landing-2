// Envía el aviso de nueva consulta por email, usando la API de Resend.
//
// Las claves salen de variables de entorno (archivo .env.local en tu compu,
// panel de Vercel en producción). Este archivo solo lo importa la API, que
// corre en el servidor: la clave de Resend nunca llega al navegador.
// Por eso las variables NO llevan el prefijo NEXT_PUBLIC_: con ese prefijo,
// Next las copiaría al JavaScript del navegador y cualquiera podría verlas.

// Convierte los caracteres especiales de HTML en texto inofensivo, para que
// nadie pueda meter etiquetas en el email escribiendo en el formulario.
function escaparHtml(valor) {
  return String(valor).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

export async function enviarEmailNotificacion(datos) {
  const apiKey = process.env.RESEND_API_KEY;
  const para = process.env.CONTACT_TO_EMAIL;
  const de = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !para || !de) {
    throw new Error("Faltan variables de entorno de email (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
  }

  const esc = escaparHtml;
  const esCertificacion = datos.tipo === "certificacion";

  const camposEspecificos = esCertificacion
    ? `<p><strong>Disponibilidad para empezar:</strong> ${esc(datos.disponibilidad || "-")}</p>
       <p><strong>Experiencia con pilates:</strong> ${esc(datos.experiencia || "-")}</p>`
    : `<p><strong>Horario preferido:</strong> ${esc(datos.horario || "-")}</p>
       <p><strong>Experiencia previa:</strong> ${esc(datos.nivel || "-")}</p>`;

  const html = `
    <h2>Nueva consulta desde la web (${esCertificacion ? "Certificación de profesorado" : "Clases"})</h2>
    <p><strong>Nombre:</strong> ${esc(datos.nombre)}</p>
    <p><strong>WhatsApp:</strong> ${esc(datos.tel)}</p>
    <p><strong>Email:</strong> ${esc(datos.email || "-")}</p>
    ${camposEspecificos}
    <p><strong>Mensaje:</strong><br>${esc(datos.mensaje || "-").replace(/\n/g, "<br>")}</p>`;

  const asunto = `Nueva consulta de ${esCertificacion ? "certificación de profesorado" : "clases"} — ${datos.nombre}`;

  const respuesta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: de,
      to: para,
      reply_to: datos.email || undefined, // al tocar "Responder", le contestás a la persona
      subject: asunto,
      html,
    }),
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text().catch(() => "");
    throw new Error(`Resend respondió ${respuesta.status}: ${detalle}`);
  }
}
