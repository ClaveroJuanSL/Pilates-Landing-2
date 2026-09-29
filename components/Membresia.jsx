import Image from "next/image";
import { MARCAS } from "@/data/sitio";
import CarruselEventos from "@/components/CarruselEventos";
import mosaico2 from "@/assets/img/membresia-mosaico-2.jpg";

// Mosaico: 2 columnas de 570px en escritorio, mitad de pantalla en tablet
// y una sola columna en celular.
const SIZES_MOSAICO = "(max-width: 780px) 100vw, (max-width: 1240px) 50vw, 570px";

// Cada logo mide 124px (96px en celular) y al pasar el mouse se agranda un 22%:
// pedimos la versión de ~152px para que el zoom no se vea borroso.
const SIZES_LOGO = "(max-width: 780px) 96px, 152px";

// Carrusel infinito de logos. El CSS desplaza la cinta un 50% y vuelve a
// empezar; para que el salto no se note, la cinta tiene que traer los logos
// dos veces. Antes lo hacía app.js copiando el HTML; acá simplemente
// recorremos la lista dos veces. La segunda copia es decorativa: se oculta
// a los lectores de pantalla para que no lean cada marca dos veces.
function CarruselMarcas() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {MARCAS.map((marca) => (
          <div key={marca.nombre} className="marquee__item">
            <Image src={marca.logo} alt={marca.nombre} sizes={SIZES_LOGO} />
          </div>
        ))}
        {MARCAS.map((marca) => (
          <div key={`copia-${marca.nombre}`} className="marquee__item" aria-hidden="true">
            <Image src={marca.logo} alt="" sizes={SIZES_LOGO} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Membresia() {
  return (
    <section className="membresia" id="membresia">
      <div className="contenedor">
        <div className="membresia__mosaico">
          <div data-reveal className="membresia__caja membresia__caja--carrusel">
            <CarruselEventos />
          </div>
          <div data-reveal className="membresia__caja membresia__caja--intro">
            {/* Ilustración de línea del aro de pilates (pendiente: agregar cuando la clienta la envíe) */}
            <h2 className="membresia__titulo">
              Tus <span>beneficios</span>
            </h2>
            <div className="membresia__texto">
              <p>
                Todos los meses, al ser parte de Equilibrate, nuestros alumnos cuentan con un sistema de membresía que
                brinda beneficios en salud, bienestar y deporte.
              </p>
              <p>
                Y la posibilidad de presenciar con ingreso exclusivo los eventos organizados mensualmente, en donde los
                protagonistas son las marcas de la membresía.
              </p>
            </div>
          </div>

          <div data-reveal className="membresia__marcas">
            <span className="marcas__titulo">Marcas aliadas</span>
            <CarruselMarcas />
          </div>

          <div data-reveal className="membresia__caja membresia__caja--intro">
            <h3 className="membresia__titulo">Grupos cuidados</h3>
            <div className="membresia__texto">
              <p>Contamos con instructoras certificadas y capacitadas para llevar adelante clases adaptadas a tu capacidad fisica. Nuestras clases cuentan con cupos máximos de 8 personas por sala. Para brindar un entrenamiento cuidado</p>
            </div>
          </div>
          <figure data-reveal className="membresia__caja membresia__caja--foto">
            <Image
              src={mosaico2}
              alt="Clase grupal de pilates en Equilibrate"
              sizes={SIZES_MOSAICO}
              placeholder="blur"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
