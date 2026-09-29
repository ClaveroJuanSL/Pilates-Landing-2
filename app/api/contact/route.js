// Route Handler: el "backend" del formulario de contacto.
//
// La ruta del archivo ES la URL: app/api/contact/route.js responde en
// /api/contact. Cada función exportada con el nombre de un método HTTP
// atiende ese método: acá solo POST. Si alguien prueba con GET, PUT, etc.,
// Next responde solo "405 Method Not Allowed".
//
// Este código corre SIEMPRE en el servidor. Reemplaza a api/contact.js
// (la función serverless de Vercel de la versión anterior).

import { validarConsulta } from "@/lib/validarContacto";
import { ipDe, superaLimite } from "@/lib/limiteDeEnvios";
import { enviarEmailNotificacion } from "@/lib/email";

export async function POST(request) {
  // 1. ¿Esta IP ya mandó demasiadas consultas en los últimos minutos?
  if (superaLimite(ipDe(request))) {
    return Response.json({ error: "Demasiadas solicitudes. Probá de nuevo en unos minutos." }, { status: 429 });
  }

  // 2. Leer el cuerpo. Si no es JSON válido, ni seguimos.
  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return Response.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // 3. Validar y limpiar: nunca confiar en lo que manda el navegador.
  const resultado = validarConsulta(cuerpo);
  if (!resultado.ok) {
    return Response.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // 4. Mandar el email. Si falla, el detalle queda en el log del servidor
  //    y al visitante le llega un mensaje genérico (sin datos internos).
  try {
    await enviarEmailNotificacion(resultado.datos);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Error enviando email:", error);
    return Response.json({ error: "No pudimos procesar tu solicitud. Intentá nuevamente más tarde." }, { status: 500 });
  }
}
