import Link from "next/link";
import { NAV, WHATSAPP_CONSULTA, INSTAGRAM, DIRECCION } from "@/data/contacto";
import Image from "next/image";
import logoIcon from "@/assets/img/logo-icon.png";

// El footer usa la misma lista que el header y le suma "Contacto" al final.
const navFooter = [...NAV, { href: "/#contacto", texto: "Contacto" }];

export default function Footer() {
  // Esto es JavaScript común dentro del componente: el año se calcula solo
  // en cada build, así el © no queda desactualizado en enero.
  const anio = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="contenedor">
        <div className="footer__inner">
          <div>
            <div className="logo">
              <Image className="logo__icon" src={logoIcon} alt="" aria-hidden="true" sizes="34px" />
              <span className="logo__texto">
                <span className="logo__nombre">Equilibrate</span>
                <span className="logo__bajada">Studio Pilates</span>
              </span>
            </div>
            <p className="footer__texto">
              Bienestar integral a través del método pilates. {DIRECCION}.
            </p>
          </div>

          <div className="footer__col">
            <span className="footer__titulo">Navegación</span>
            {navFooter.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.texto}
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <span className="footer__titulo">Seguinos</span>
            <a href={INSTAGRAM} target="_blank" rel="noopener">@equilibrate_studio_pilates</a>
            <a href={WHATSAPP_CONSULTA} target="_blank" rel="noopener">WhatsApp</a>
            <span>Lun a vie · 7 a 21 h</span>
          </div>
        </div>

        <p className="footer__lema">Más movimiento. Más Equilibrate.</p>
        <div className="footer__legal">
          <span>© {anio} Equilibrate Studio Pilates</span>
          <span>{DIRECCION}</span>
        </div>
      </div>
    </footer>
  );
}
