// Límite de envíos por IP, guardado en memoria (rate limiting).
//
// LIMITACIÓN IMPORTANTE: en Vercel la API puede correr en varias copias a
// la vez, y una copia recién arrancada empieza con la memoria vacía. Así
// que esto NO es un límite global garantizado: frena a bots simples y al
// que aprieta "Enviar" veinte veces, no a un atacante decidido.
//
// Para un límite robusto con tráfico real habría que guardar los contadores
// en un almacenamiento compartido (por ejemplo Upstash Redis), manteniendo
// la misma función superaLimite(ip).

const MAXIMO = Number(process.env.RATE_LIMIT_MAX) || 5;
const VENTANA_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000; // 10 minutos

// Por cada IP: cuándo empezó su ventana y cuántos envíos lleva.
const envios = new Map();

// La IP real del visitante. Vercel la pone en el encabezado x-forwarded-for
// (si hay varias, la primera es la del visitante).
export function ipDe(request) {
  const reenviada = request.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "desconocida";
}

export function superaLimite(ip) {
  const ahora = Date.now();
  const registro = envios.get(ip);

  if (!registro || ahora - registro.inicio > VENTANA_MS) {
    envios.set(ip, { inicio: ahora, cantidad: 1 });
    return false;
  }

  registro.cantidad += 1;
  return registro.cantidad > MAXIMO;
}
