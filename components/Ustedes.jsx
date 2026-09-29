import { TESTIMONIOS, GOOGLE_RESENAS } from "@/data/sitio";

// Cinco estrellas en SVG: todas las reseñas elegidas son de 5.
function Estrellas() {
  return (
    <span className="testimonio__estrellas" role="img" aria-label="5 de 5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" />
        </svg>
      ))}
    </span>
  );
}

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
              <footer>
                <span>{t.autor}</span>
                <span className="testimonio__fuente">
                  <Estrellas />
                  Google
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div data-reveal className="ustedes__cta">
          <p>¿Ya entrenaste con nosotras? Contanos cómo te fue.</p>
          <a className="btn btn--primario" href={GOOGLE_RESENAS} target="_blank" rel="noopener">
            Haz tu reseña
          </a>
        </div>
      </div>
    </section>
  );
}
