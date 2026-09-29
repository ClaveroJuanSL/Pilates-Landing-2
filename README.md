# Equilibrate Studio Pilates — landing

Sitio de Equilibrate (Mitre 502, Edificio Don Jorge), hecho con **Next.js 16** (App Router, JavaScript) y publicado en Vercel.

## Correr en local

```bash
npm install
npm run dev
```

Abre en http://localhost:3000. Para probar la versión de producción: `npm run build` y después `npm run start`.

## Dónde está cada cosa

| Carpeta | Qué tiene |
|---|---|
| `app/` | `layout.js` (estructura común, fuentes, metadatos), `page.js` (la página), `globals.css` (estilos) y `api/contact/route.js` (recibe el formulario) |
| `components/` | Una pieza por sección. Solo `Header`, `FormularioContacto` y `Revelar` corren en el navegador (`"use client"`) |
| `data/` | El contenido: `sitio.js` (clases, marcas, testimonios…), `contacto.js` (WhatsApp, Instagram, dirección, menú), `formulario.js` (opciones del formulario, compartidas con el servidor) |
| `lib/` | Código del servidor: validación, límite de envíos y envío del email con Resend |
| `assets/img/` | Imágenes. Se importan desde el código y Next las optimiza |

Para cambiar textos, marcas o testimonios, en general alcanza con editar `data/`.

## Variables de entorno

Van en `.env.local` (nunca se sube a Git) y en Vercel → Settings → Environment Variables:

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Clave de Resend para mandar el email |
| `CONTACT_TO_EMAIL` | A quién le llegan las consultas |
| `CONTACT_FROM_EMAIL` | Remitente (dominio verificado en Resend) |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` | Opcionales. Por defecto: 5 envíos cada 10 minutos por IP |

## Seguridad

Los encabezados de seguridad (Content-Security-Policy y otros) están en `next.config.mjs`.
