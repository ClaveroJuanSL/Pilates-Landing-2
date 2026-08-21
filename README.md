# Equilibrate Studio Pilates — sitio + backend

Landing page estática (`index.html` + `assets/`) con el formulario de
consultas conectado a una **Vercel Serverless Function** (`api/contact.js`)
que envía el aviso por email usando **Resend**. Los botones de WhatsApp del
sitio son links `wa.me` estáticos (decisión tomada a propósito, ver más
abajo).

## 1. Medidas de seguridad aplicadas y por qué

- **Sin secretos en el código.** `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y
  `CONTACT_FROM_EMAIL` se leen de `process.env.*` en [`api/contact.js`](api/contact.js).
  Nunca están escritos en el repo — `.gitignore` excluye `.env`, `.env.local`
  y `.env.*.local` para que sea imposible subirlos a GitHub por accidente.
- **Validación y saneo server-side** ([`api/_lib/validate.js`](api/_lib/validate.js)).
  Todo dato que llega del frontend se recorta a un largo máximo, se le
  quitan caracteres de control y tags HTML, y se valida formato (teléfono,
  email). Los campos `horario` y `nivel` además se validan contra una
  whitelist exacta de las opciones del `<select>`/radio del formulario —
  así alguien que le pegue directo a la API sin pasar por el HTML no puede
  meter datos arbitrarios. El HTML del email que recibe el estudio escapa
  cada valor (`escapeHtml`) para que un mensaje no pueda inyectar HTML en
  el correo.
- **CORS estricto** ([`api/_lib/cors.js`](api/_lib/cors.js)). El endpoint
  sólo agrega `Access-Control-Allow-Origin` cuando el `Origin` de la
  petición está en la lista `ALLOWED_ORIGIN` (variable de entorno,
  separada por comas). Esto evita que otro sitio web use JavaScript para
  llamar a tu API de contacto desde el navegador de un visitante. (CORS es
  una restricción que impone el navegador — no frena un `curl` directo;
  para eso están la validación y el rate limiting.)
- **Errores genéricos al cliente.** Cualquier excepción se loguea en
  detalle server-side con `console.error` (visible en los logs de Vercel),
  pero la respuesta HTTP siempre es un mensaje genérico (`"No pudimos
  procesar tu solicitud..."`), sin stack trace ni detalles internos.
- **Rate limiting best-effort** ([`api/_lib/rateLimit.js`](api/_lib/rateLimit.js)).
  Por defecto, 5 solicitudes cada 10 minutos por IP. **Limitación real:**
  en Vercel cada invocación puede correr en una instancia distinta y una
  instancia "fría" arranca sin memoria de lo anterior, así que esto es una
  mitigación contra abuso casual, no un límite duro garantizado. Si el
  sitio empieza a recibir tráfico real y este endpoint se vuelve un
  objetivo, migrar el store en memoria (`Map`) a algo compartido como
  [Upstash Redis + `@upstash/ratelimit`](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)
  o Vercel KV — la función `isRateLimited(req)` tiene la firma lista para
  ese reemplazo.
- **Cabeceras HTTP de seguridad** ([`vercel.json`](vercel.json)):
  `Content-Security-Policy` (sólo permite scripts propios, estilos propios
  + Google Fonts, y `fetch` al propio origen — nada de terceros no
  esperados), `Strict-Transport-Security` (fuerza HTTPS), `X-Frame-Options:
  DENY` (no se puede embeber el sitio en un `<iframe>` ajeno, mitiga
  clickjacking), `X-Content-Type-Options: nosniff`, `Referrer-Policy` y
  `Permissions-Policy` (desactiva cámara/micrófono/geolocalización, que el
  sitio no usa).

### Sobre WhatsApp

Los 5 botones de WhatsApp del sitio (`Reservar`, `Reservar mi primera
clase`, `Quiero la membresía`, el link en la sección "gracias" y el del
footer) son links estáticos `https://wa.me/5492664969113` generados en el
propio HTML — **no pasan por el backend**. Fue una decisión explícita: el
número de WhatsApp de un estudio no es información sensible (está público
en su Instagram), y un link `wa.me` directo es más simple y no tiene nada
que pueda fallar del lado del servidor. Si en el futuro quisieran enviar
mensajes automáticos reales (no sólo abrir el chat), eso requeriría dar de
alta una cuenta de WhatsApp Business Cloud API con Meta — quedó fuera de
alcance a pedido del usuario.

## 2. Cómo correr en local

El sitio usa funciones serverless de Vercel (`api/*.js`), así que **no
alcanza con abrir `index.html` en el navegador ni con un servidor estático
genérico** — necesitás el runtime de Vercel para que `/api/contact`
funcione en local.

```bash
npm install -g vercel
vercel dev
```

La primera vez te va a pedir loguearte y linkear el proyecto (podés crear
uno nuevo, no hace falta que ya exista en Vercel). Después:

```bash
cp .env.example .env.local
```

y completá `.env.local` con tus valores de prueba (ver sección 4 para
Resend). `vercel dev` levanta el sitio típicamente en `http://localhost:3000`
— confirmá el puerto exacto en la consola y usalo como uno de los valores
de `ALLOWED_ORIGIN`.

## 3. Variables de entorno en Vercel (antes de desplegar)

En el dashboard de Vercel: **Project Settings → Environment Variables**,
cargar (para Production, Preview y Development):

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | API key generada en Resend (ver sección 4) |
| `CONTACT_TO_EMAIL` | El mail institucional que va a recibir las consultas |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend (`onboarding@resend.dev` hasta que verifiques un dominio propio) |
| `ALLOWED_ORIGIN` | Ver más abajo — el huevo y la gallina |

**`ALLOWED_ORIGIN` tiene un detalle:** Vercel recién te asigna la URL
`https://tu-proyecto.vercel.app` en el primer deploy, así que el orden es:

1. Desplegar una primera vez (`vercel` o conectando el repo desde el
   dashboard) — el endpoint va a fallar el chequeo de CORS hasta el paso 3,
   pero el sitio estático se sirve igual.
2. Copiar la URL `.vercel.app` que Vercel te dio.
3. Cargar `ALLOWED_ORIGIN=https://tu-proyecto.vercel.app` (agregá también
   `http://localhost:3000` separado por coma si querés seguir probando en
   local contra el mismo proyecto).
4. Volver a desplegar (o "Redeploy" desde el dashboard) para que la
   función tome la variable nueva.

Si más adelante comprás un dominio propio, agregalo a la misma lista
separada por comas.

## 4. Resend — configuración

1. Crear cuenta en [resend.com](https://resend.com).
2. Dashboard → **API Keys** → crear una y copiarla a `RESEND_API_KEY`.
3. **Mientras no tengas el mail institucional / dominio propio verificado**:
   Resend sólo te deja mandar mails con `from: onboarding@resend.dev`, y
   únicamente **al mismo email con el que creaste la cuenta de Resend**
   (es una limitación de las cuentas sin dominio verificado, no un bug).
   Usá esa dirección como `CONTACT_TO_EMAIL` para probar de punta a punta.
4. **Cuando tengas el mail institucional definitivo**: Dashboard →
   **Domains** → agregar tu dominio y cargar los registros DNS que te pide
   Resend (TXT/DKIM). Una vez verificado, `CONTACT_FROM_EMAIL` puede ser
   cualquier dirección `@tudominio.com` y `CONTACT_TO_EMAIL` puede ser
   cualquier casilla, no sólo la del owner de la cuenta.

## 5. Subir a GitHub

`.gitignore` ya excluye `.env`, `.env.local` y `.vercel`. Antes de tu
primer `git push`, corré `git status` y confirmá que ninguno de esos
archivos aparece en el listado — sólo `.env.example` (que está vacío)
debería estar trackeado.
