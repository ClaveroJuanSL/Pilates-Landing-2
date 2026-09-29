const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy: la lista de orígenes desde donde el navegador puede
// cargar cosas. Si alguien lograra inyectar un <script> de otro sitio, el
// navegador lo bloquea.
//
// Diferencias con la del sitio estático (vercel.json viejo):
// - script-src 'unsafe-inline': Next mete scripts chiquitos dentro del HTML
//   para "hidratar" los componentes de cliente. Sin esto, el menú, el
//   formulario y las animaciones no funcionan. (La alternativa, "nonces",
//   obliga a generar la página en cada visita; para una landing no vale la pena.)
// - 'unsafe-eval' solo en desarrollo: lo necesita el recargado en caliente.
// - img-src data: el placeholder borroso de next/image es una imagen "data:".
// - Sin fonts.googleapis.com: next/font descarga las fuentes al compilar y las
//   sirve desde nuestro propio dominio.
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

// Mismos encabezados de seguridad que tenía el sitio publicado.
const encabezadosDeSeguridad = [
  { key: "Content-Security-Policy", value: csp.replace(/\s{2,}/g, " ").trim() },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Calidades de compresión permitidas para next/image.
    // Next 16 solo permite 75 por defecto, y si un <Image> pide otra que no
    // está en esta lista, la baja a la más cercana SIN AVISAR.
    // 75 → todas las fotos. 95 → el hero, que es la foto más grande y a 75 se
    // le perdía la textura de la piel. 90 → el carrusel de eventos.
    qualities: [75, 90, 95],
  },

  // Se aplican a todas las rutas: páginas, imágenes y la API.
  async headers() {
    return [{ source: "/(.*)", headers: encabezadosDeSeguridad }];
  },
};

export default nextConfig;
