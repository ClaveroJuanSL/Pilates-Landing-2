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
  "Certificado avalado al finalizar cada nivel",
  "Grupos reducidos. Cupos limitados por nivel",
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

// Reseñas reales de Google Maps (5 estrellas), copiadas textuales.
// Solo nombre e inicial del apellido, como se suele mostrar en una web.
export const TESTIMONIOS = [
  {
    texto: "Hace 7 meses que voy y estoy súper contenta. Me encanta el lugar y, sobre todo, la buena onda que hay. Las profesoras son excelentes, tienen mucha paciencia y explican cada ejercicio súper bien, siempre atentas a que hagamos los movimientos correctamente. La verdad es que la paso re bien en cada clase y da gusto ir. ¡Súper recomendable!",
    autor: "Juana D.",
  },
  {
    texto: "Excelente atención, excelentes instructoras, excelente nivel, muy conforme con ellas, con la dueña, con el lugar. Siempre impecable y prolijo todo. Siempre cuidándonos!!!",
    autor: "Silvia R.",
  },
  {
    texto: "Es un excelente lugar para practicar pilates, las profes se capacitan permanentemente y son muy amables y amorosas. Fui durante mí primer embarazo y me cuidaron un montón. Seguiría yendo pero me mudé y ahora me queda muy lejos. Fue una de las mejores experiencias de actividad física que he tenido.",
    autor: "Cecilia H.",
  },
  {
    texto: "El mejor studio de pilates!! Hace 20 años hago pilates, hace casi 4 años vine a vivir a San Luis y conocí Equilibrate. La atención y el cuidado de las instructoras para con cada alumno/a es impecable, siempre atentas a los ejercicios, con una sonrisa!! Felicitaciones y a seguir muchos años más!",
    autor: "Natalia",
  },
];

// Ficha de Google Maps abierta en la pestaña de opiniones (desde ahí se
// escribe una reseña nueva). Sin los parámetros de seguimiento del link original.
export const GOOGLE_RESENAS =
  "https://www.google.com/maps/place/Equilibrate+Studio+Pilates/@-33.3061926,-66.3394199,17z/data=!4m8!3m7!1s0x95d439561e7c7413:0xc81ffc43098e8708!8m2!3d-33.3061926!4d-66.3394199!9m1!1b1!16s%2Fg%2F11hbn1nltn";
