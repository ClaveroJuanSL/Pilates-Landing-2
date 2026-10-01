import Image from "next/image";
import { ESPACIOS } from "@/data/sitio";

// Cada foto ocupa un lugar distinto de la grilla, así que cada una se ve de
// un ancho distinto. Escritorio: 6 columnas de 180px. Tablet (≤1080px):
// 2 columnas por foto (~50%) y las dos chicas se ocultan. Celular (≤780px):
// la grande ocupa todo el ancho y las demás, media pantalla.
const SIZES = {
  g: "(max-width: 780px) 100vw, (max-width: 1080px) 50vw, 572px",
  v: "(max-width: 1080px) 50vw, 180px",
  w: "(max-width: 1080px) 50vw, 376px",
  s1: "180px",
  s2: "180px",
};

export default function Espacios() {
  return (
    <section className="seccion espacios" id="espacios">
      <div className="contenedor">
        <div className="espacios__head">
          <h2 data-reveal className="titulo-seccion">
            Nuestros espacios, <em>nuestra gente</em>
          </h2>
        </div>

        <div className="espacios__grid">
          {ESPACIOS.map((espacio) => (
            // La clase se arma con un template string: "foto foto--g", "foto foto--v"...
            <figure data-reveal key={espacio.variante} className={`foto foto--${espacio.variante}`}>
              <Image
                src={espacio.foto}
                alt={espacio.alt}
                sizes={SIZES[espacio.variante]}
                quality={90}
                placeholder="blur"
                style={espacio.posicion ? { objectPosition: espacio.posicion } : undefined}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
