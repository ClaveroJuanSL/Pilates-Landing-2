import Link from "next/link";
import { DIRECCION, MAPS } from "@/data/contacto";
import Image from "next/image";
import fotoMat from "@/assets/img/visitanos-mat.jpg";

// El "mapa" es una ilustración hecha con divs y CSS, no un mapa real:
// al hacer clic abre Google Maps.
function Mapa() {
  return (
    <a data-reveal
      className="mapa"
      href={MAPS}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir la ubicación de Equilibrate en Google Maps"
    >
      <div className="mapa__grid" />
      <div className="mapa__avenida" />
      <div className="mapa__linea" />
      <div className="mapa__calle" />
      <div className="mapa__manzana mapa__manzana--1" />
      <div className="mapa__manzana mapa__manzana--2" />
      <div className="mapa__pin">
        <div className="mapa__globo">
          <span className="punto" />
          <span>Equilibrate · Mitre 502</span>
        </div>
        <span className="mapa__tallo" />
        <span className="mapa__punto" />
      </div>
      <span className="mapa__nota">Ver ubicación en Google Maps ↗</span>
    </a>
  );
}

export default function Visitanos() {
  // DIRECCION es "Mitre 502, Edificio Don Jorge": acá va en dos renglones.
  const [calle, edificio] = DIRECCION.split(", ");

  return (
    <section className="seccion visitanos" id="visitanos">
      <div className="contenedor">
        <div className="visitanos__head">
          <h2 data-reveal className="titulo-seccion">
            Empezá <em>hoy</em> tu camino
          </h2>
        </div>

        <div className="visitanos__inner">
          <div data-reveal className="visitanos__datos">
            <div className="ficha ficha--foto">
              <Image
                className="ficha__foto"
                src={fotoMat}
                alt="Aro y pelota de pilates listos para la clase"
                sizes="(max-width: 1080px) 100vw, 481px"
                placeholder="blur"
              />
              <div className="ficha__contenido">
                <span className="ficha__label ficha__label--claro">Horarios</span>
                <div className="ficha__titulo-foto">
                  Nuestra <em>disponibilidad</em>
                </div>
                <div className="ficha__horario">
                  <span className="punto" />
                  <span>Lunes a viernes · 7:00 a 21:00 h</span>
                </div>
                <div className="ficha__horario ficha__horario--tenue">
                  <span className="punto punto--tenue" />
                  <span>Sábados: consultar disponibilidad</span>
                </div>
              </div>
            </div>

            <div className="ficha">
              <span className="ficha__label">Ubicación</span>
              <p className="ficha__dato">
                {calle}
                <br />
                {edificio}
              </p>
              <Link className="enlace-subrayado" href="/#contacto">
                Consultar horarios disponibles
              </Link>
            </div>
          </div>

          <Mapa />
        </div>
      </div>
    </section>
  );
}
