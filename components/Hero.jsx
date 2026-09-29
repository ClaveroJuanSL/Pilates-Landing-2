import Image from "next/image";
import { WHATSAPP_RESERVA } from "@/data/contacto";
import fotoHero from "@/assets/img/hero.jpg";
import logoEquilibrate from "@/assets/img/logo-equilibrate.png";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__foto">
        {/* Es lo primero que se ve y lo más grande de la página (el "LCP"):
            se pide de inmediato y con prioridad alta, en vez de esperar.
            Calidad 85 (el resto usa 75): a 75 la piel se veía "plastificada".
            Para que funcione, 85 tiene que estar en images.qualities de
            next.config.mjs; si no, Next la baja a 75 sin avisar. */}
        <Image
          src={fotoHero}
          alt="Alumna sonriendo mientras entrena con el aro de pilates en Equilibrate"
          sizes="100vw"
          quality={85}
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
        />
      </div>

      <div className="contenedor hero__inner">
        <div className="hero__marca">
          <div data-reveal className="hero__linea">
            <span className="hero__kicker">Studio Pilates</span>
            <a className="hero__cta" href={WHATSAPP_RESERVA} target="_blank" rel="noopener">
              Reservar mi primera clase
            </a>
          </div>
          <h1 data-reveal className="hero__titulo">
            <Image
              className="hero__titulo-logo"
              src={logoEquilibrate}
              alt="Equilibrate, Studio Pilates"
              sizes="(max-width: 900px) 100vw, 820px"
              loading="eager"
            />
          </h1>
        </div>
      </div>
    </section>
  );
}
