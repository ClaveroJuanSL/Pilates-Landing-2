// Opciones del formulario de contacto.
//
// ÚNICA fuente de verdad: las usa el formulario (para dibujar los
// desplegables y botones de opción) y también el servidor (para validar lo
// que llega). En la versión anterior estaban escritas dos veces, una en el
// HTML y otra en el validador, y se desincronizaron: el formulario mandaba
// "Próxima capacitación" pero el validador esperaba "Próxima cohorte", así
// que TODAS las consultas de certificación con esa opción se rechazaban.
// Con una sola lista, eso ya no puede pasar.

export const TIPOS = ["clases", "certificacion"];

export const HORARIOS = [
  "Mañana (7 a 12 h)",
  "Mediodía (12 a 15 h)",
  "Tarde (15 a 18 h)",
  "Noche (18 a 21 h)",
  "Flexible",
];

export const NIVELES = ["Nunca hice", "Algo de experiencia", "Practico hace años"];

export const INICIO_CERTIFICACION = [
  "Próxima capacitación",
  "En los próximos 3 meses",
  "Todavía estoy averiguando",
];

export const EXPERIENCIA_CERTIFICACION = [
  "Sin experiencia previa",
  "Practico pilates hace tiempo",
  "Ya doy clases de otra disciplina",
];
