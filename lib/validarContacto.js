// Validación y limpieza de los datos que llegan del formulario de contacto.
//
// Nada de esto confía en lo que manda el navegador: cualquiera puede pegarle
// directo a /api/contact sin pasar por el formulario. Por eso los valores de
// los desplegables y botones de opción se vuelven a comprobar acá, contra
// las MISMAS listas que usa el formulario para dibujarse.

import {
  TIPOS,
  HORARIOS,
  NIVELES,
  INICIO_CERTIFICACION,
  EXPERIENCIA_CERTIFICACION,
} from "@/data/formulario";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_RE = /^[0-9+()\-\s]{6,30}$/;
// Caracteres invisibles de control (tabulación, salto de línea, etc.).
const CARACTERES_DE_CONTROL_RE = /[\x00-\x1F\x7F]/g;

// Deja solo texto: saca caracteres invisibles y etiquetas HTML, recorta
// espacios y corta en un largo máximo. Si no es texto, devuelve "".
//
// Con `multilinea`, conserva los saltos de línea (los demás caracteres de
// control se van igual). Solo el mensaje lo usa: en el nombre, por ejemplo,
// un salto de línea no tiene sentido y además termina en el asunto del email.
function limpiarTexto(valor, largoMaximo, { multilinea = false } = {}) {
  if (typeof valor !== "string") return "";
  let texto = valor.replace(/\r\n?/g, "\n"); // saltos de Windows/Mac viejo → "\n"
  texto = multilinea
    ? texto.split("\n").map((linea) => linea.replace(CARACTERES_DE_CONTROL_RE, "")).join("\n")
    : texto.replace(CARACTERES_DE_CONTROL_RE, "");
  return texto
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, largoMaximo);
}

// Un campo opcional es válido si viene vacío o si es una de las opciones permitidas.
const opcionValida = (valor, opciones) => !valor || opciones.includes(valor);

/**
 * @returns {{ ok: true, datos: object } | { ok: false }}
 */
export function validarConsulta(cuerpo) {
  if (!cuerpo || typeof cuerpo !== "object") return { ok: false };

  const datos = {
    tipo: TIPOS.includes(cuerpo.tipo) ? cuerpo.tipo : "clases",
    nombre: limpiarTexto(cuerpo.nombre, 100),
    tel: limpiarTexto(cuerpo.tel, 30),
    email: limpiarTexto(cuerpo.email, 150),
    horario: limpiarTexto(cuerpo.horario, 40),
    nivel: limpiarTexto(cuerpo.nivel, 40),
    experiencia: limpiarTexto(cuerpo.experiencia, 60),
    disponibilidad: limpiarTexto(cuerpo.disponibilidad, 40),
    mensaje: limpiarTexto(cuerpo.mensaje, 1000, { multilinea: true }),
  };

  if (!datos.nombre || !datos.tel) return { ok: false };
  if (!TELEFONO_RE.test(datos.tel)) return { ok: false };
  if (datos.email && !EMAIL_RE.test(datos.email)) return { ok: false };
  if (!opcionValida(datos.horario, HORARIOS)) return { ok: false };
  if (!opcionValida(datos.nivel, NIVELES)) return { ok: false };
  if (!opcionValida(datos.experiencia, EXPERIENCIA_CERTIFICACION)) return { ok: false };
  if (!opcionValida(datos.disponibilidad, INICIO_CERTIFICACION)) return { ok: false };

  return { ok: true, datos };
}
