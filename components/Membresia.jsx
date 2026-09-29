import Image from "next/image";
import { MARCAS } from "@/data/sitio";
import mosaico1 from "@/assets/img/membresia-mosaico-1.jpg";
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
        <div className="membresia__intro">
          {/* Ilustración de línea del aro de pilates (pendiente: agregar cuando la clienta la envíe) */}
          <h2 data-reveal className="membresia__titulo">
            Tus <span>beneficios</span>
          </h2>
          <div data-reveal className="membresia__texto">
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

        <div className="membresia__mosaico">
          <figure data-reveal className="membresia__caja membresia__caja--foto">
            <Image
              src={mosaico1}
              alt="Alumno haciendo pilates en el reformer"
              sizes={SIZES_MOSAICO}
              placeholder="blur"
            />
          </figure>
          <div data-reveal className="membresia__caja membresia__caja--texto">
            <h3>Comunidad que suma</h3>
            <p>Más de 20 marcas aliadas en bienestar, deporte y salud, con 12 beneficios nuevos cada mes para las socias.</p>
          </div>

          <div data-reveal className="membresia__marcas">
            <span className="marcas__titulo">Marcas aliadas</span>
            <CarruselMarcas />
          </div>

          <div data-reveal className="membresia__caja membresia__caja--texto">
            <h3>Grupos cuidados</h3>
            <p>Encuentros de comunidad cada trimestre y un máximo de 1 instructora cada 7 alumnas, siempre.</p>
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
