// Contenido del sitio, separado del diseño.
//
// Los componentes (carpeta components/) saben CÓMO se ve cada cosa; este
// archivo dice QUÉ se muestra. Para sumar una clase, una marca o un
// testimonio alcanza con agregar un elemento a la lista que corresponda:
// no hay que tocar HTML ni CSS.
//
// Lo usan solo componentes de SERVIDOR. Los datos de contacto viven en
// contacto.js y las opciones del formulario en formulario.js (ver por qué ahí).

// --- Imágenes -------------------------------------------------------------------
// Importar una imagen (en vez de escribir su ruta como texto) le permite a Next
// leer el archivo al compilar: sabe su ancho y alto reales, genera versiones
// más chicas y un placeholder borroso. Si una ruta está mal, el build falla
// en vez de mostrar una imagen rota en producción.

import clasesGeneral from "@/assets/img/clases-general.jpg";
import clasesHombres from "@/assets/img/clases-hombres.jpg";
import clasesEmbarazo from "@/assets/img/clases-embarazo.jpg";
import marcaAlondra from "@/assets/img/marcas/alondra.png";
import marcaCapafepe from "@/assets/img/marcas/capafepe.png";
import marcaFenix from "@/assets/img/marcas/fenix.png";
import marcaFisika from "@/assets/img/marcas/fisika.png";
import marcaGrandiet from "@/assets/img/marcas/grandiet.png";
import marcaJova from "@/assets/img/marcas/jova.png";
import marcaKinelift from "@/assets/img/marcas/kinelift.png";
import marcaKuva from "@/assets/img/marcas/kuva.png";
import marcaMets from "@/assets/img/marcas/mets.png";
import marcaMiDulcePaz from "@/assets/img/marcas/mi-dulce-paz.png";
import marcaNibs from "@/assets/img/marcas/nibs.png";
import marcaNutravida from "@/assets/img/marcas/nutravida.png";
import marcaOnesport from "@/assets/img/marcas/onesport.png";
import marcaVisitResto from "@/assets/img/marcas/visit-resto.png";
import espacios6 from "@/assets/img/espacios-6.jpg";
import espacios1 from "@/assets/img/espacios-1.jpg";
import espacios2 from "@/assets/img/espacios-2.jpg";
import espacios4 from "@/assets/img/espacios-4.jpg";
import espacios5 from "@/assets/img/espacios-5.jpg";

// --- Clases -------------------------------------------------------------------
// `rotulo` va en dos renglones sobre la foto: por eso es una lista de 2 textos.

export const CLASES = [
  {
    foto: clasesGeneral,
    alt: "Alumnas en una clase de pilates reformer",
    rotulo: ["Muje", "res"],
  },
  {
    foto: clasesHombres,
    alt: "Alumno haciendo pilates en el reformer",
    rotulo: ["Hom", "bres"],
  },
  {
    foto: clasesEmbarazo,
    alt: "Clase de pilates para embarazadas",
    rotulo: ["Embara", "zadas"],
  },
];

// --- Membresía ----------------------------------------------------------------

// Logos circulares con fondo transparente (PNG), ya recortados al borde.
// El orden alterna logos claros y oscuros para que la cinta tenga ritmo.
export const MARCAS = [
  { logo: marcaFisika, nombre: "Fisika · Centro del movimiento y la postura" },
  { logo: marcaNutravida, nombre: "Nutra+Vida" },
  { logo: marcaAlondra, nombre: "Alondra Medicina Estética" },
  { logo: marcaKuva, nombre: "Kuva" },
  { logo: marcaKinelift, nombre: "Kinelift" },
  { logo: marcaNibs, nombre: "Nibs · Dátiles rellenos" },
  { logo: marcaGrandiet, nombre: "Grandiet San Luis" },
  { logo: marcaFenix, nombre: "Fénix Centro Deportivo" },
  { logo: marcaMets, nombre: "Mets · Medicina traumatológica y deportiva" },
  { logo: marcaJova, nombre: "Jova Verdulería" },
  { logo: marcaOnesport, nombre: "OneSport" },
  { logo: marcaVisitResto, nombre: "Visit Resto" },
  { logo: marcaCapafepe, nombre: "Capafepe" },
  { logo: marcaMiDulcePaz, nombre: "Mi Dulce Paz" },
];

// --- Certificación ------------------------------------------------------------

export const CERTIFICACION_PUNTOS = [
  "Método reformer clásico y contemporáneo",
  "Prácticas supervisadas en nuestras salas",
  "Anatomía aplicada y biomecánica del movimiento",
  "Certificado avalado por Equilibrate al finalizar",
  "Grupos reducidos, cupos limitados por cohorte",
];

// --- Espacios -----------------------------------------------------------------
// `variante` es la posición en la grilla del CSS: .foto--g, .foto--v, etc.

export const ESPACIOS = [
  { variante: "g", foto: espacios6, alt: "Instructora dirigiendo una clase en una de nuestras salas" },
  { variante: "v", foto: espacios1, alt: "Detalle del aro y la pelota de pilates" },
  { variante: "w", foto: espacios2, alt: "Alumna elongando junto al reformer" },
  { variante: "s1", foto: espacios4, alt: "Alumna mayor en clase de pilates" },
  { variante: "s2", foto: espacios5, alt: "Alumno haciendo pilates en el reformer" },
];

// --- Testimonios --------------------------------------------------------------

export const TESTIMONIOS = [
  {
    texto: "Empecé para cuidar la espalda y hoy es la hora de la semana que más me acomoda la cabeza. Las profes te conocen de verdad.",
    autor: "Alumna, 3 años en Equilibrate",
  },
  {
    texto: "Vine embarazada y seguí después del parto. Nunca sentí que el grupo fuera para ‘otro tipo’ de cuerpo. Es para el mío, en cada etapa.",
    autor: "Alumna, clases de embarazo y postparto",
  },
  {
    texto: "Entreno rugby y sumé pilates para la prevención de lesiones. Se nota en la cancha y en cómo duermo la noche después.",
    autor: "Alumno, clases para deportistas",
  },
];
