// Datos de contacto y navegación.
//
// Está separado de sitio.js a propósito: lo usan componentes de CLIENTE
// (Header, FormularioContacto), y todo lo que un componente de cliente
// importa viaja al navegador. sitio.js importa las 16 fotos del sitio; si
// estos datos vivieran ahí, el navegador se llevaría también esas fotos
// (sus datos, no los archivos) sin usarlas. Este archivo no importa nada.

export const WHATSAPP = "https://wa.me/5492665322868";
export const INSTAGRAM = "https://www.instagram.com/equilibrate_studio_pilates/";
export const DIRECCION = "Mitre 502, Edificio Don Jorge";
export const MAPS = "https://maps.app.goo.gl/49hoSt6GWdT3udZRA";

// Arma un link de WhatsApp con un mensaje ya escrito.
// encodeURIComponent convierte "Hola, quiero…" en "Hola%2C%20quiero…",
// que es como tiene que ir el texto dentro de una URL.
export function whatsappCon(mensaje) {
  return `${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

// Los links que se repiten en varios botones, ya con su mensaje.
// Para cambiar un texto, se cambia acá y se actualiza en todos lados.
export const WHATSAPP_RESERVA = whatsappCon("Buenas! Quiero reservar mi primera clase");
export const WHATSAPP_CONSULTA = whatsappCon("Hola! Tengo una consulta sobre el estudio");

// Una sola lista para el header (partido en dos), el menú móvil y el footer.
// Antes esos 5 links estaban escritos 3 veces en el HTML.
export const NAV = [
  { href: "/#clases", texto: "Clases" },
  { href: "/#membresia", texto: "Membresía" },
  { href: "/#certificacion", texto: "Certificación" },
  { href: "/#espacios", texto: "Espacios" },
  { href: "/#ustedes", texto: "Ustedes" },
];
