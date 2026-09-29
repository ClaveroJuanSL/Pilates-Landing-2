import Image from "next/image";
import { CLASES } from "@/data/sitio";

// Ancho con el que se VE cada foto, según el ancho de pantalla (sale del CSS):
// en celular la grilla es un carrusel de tarjetas al 72%, en tablet son 3
// columnas (~30% cada una) y en escritorio la grilla topea en 1000px (~307px
// por tarjeta). El navegador usa esto para bajar la versión justa.
const SIZES = "(max-width: 780px) 72vw, (max-width: 1080px) 30vw, 307px";

// Una tarjeta. Recibe los datos de UNA clase como "props" (propiedades):
// es como pasarle parámetros a una función.
function ClaseCard({ foto, alt, rotulo }) {
  return (
    <figure data-reveal className="clase-card">
      <Image src={foto} alt={alt} sizes={SIZES} placeholder="blur" />
      <figcaption className="clase-card__rotulo">
        {rotulo[0]}
        <br />
        {rotulo[1]}
      </figcaption>
    </figure>
  );
}

export default function Clases() {
  return (
    <section className="clases" id="clases">
      <div className="contenedor">
        <h2 className="sr-only">Nuestras clases</h2>
        <div className="clases__grid">
          {/* .map recorre la lista y devuelve una tarjeta por cada clase.
              `key` le sirve a React para distinguir cada elemento de la lista:
              tiene que ser un texto o número único (acá, el alt). */}
          {CLASES.map((clase) => (
            <ClaseCard key={clase.alt} {...clase} />
          ))}
        </div>
        <p data-reveal className="clases__pill">
          Clases para mujeres de todas las edades, hombres, embarazadas y deportistas de diferentes categorías
        </p>
      </div>
    </section>
  );
}
