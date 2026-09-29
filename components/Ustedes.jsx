import { TESTIMONIOS } from "@/data/sitio";

export default function Ustedes() {
  return (
    <section className="seccion ustedes" id="ustedes">
      <div className="contenedor">
        <div className="ustedes__head">
          <h2 data-reveal className="titulo-seccion">
            Lo que <em>nos cuentan</em>
          </h2>
        </div>

        <div className="ustedes__grid">
          {TESTIMONIOS.map((t) => (
            <blockquote data-reveal key={t.autor} className="testimonio">
              <p>“{t.texto}”</p>
              <footer>{t.autor}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
