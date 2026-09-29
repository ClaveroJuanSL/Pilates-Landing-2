"use client";

// Componente de cliente: tiene ESTADO (¿el menú está abierto? ¿la página
// está scrolleada?) y reacciona a clics y al scroll. Eso solo puede pasar en
// el navegador. Reemplaza a initNav() del app.js viejo.

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV, WHATSAPP_RESERVA } from "@/data/contacto";
import logoIcon from "@/assets/img/logo-icon.png";

// El header parte la navegación en dos, con el isotipo en el medio:
// los 3 primeros links a la izquierda y el resto a la derecha.
const navIzquierda = NAV.slice(0, 3);
const navDerecha = NAV.slice(3);

export default function Header() {
  // useState guarda un valor que, cuando cambia, hace que React vuelva a
  // dibujar el componente. Devuelve [valorActual, funciónParaCambiarlo].
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);

  // Escuchar el scroll: se engancha una vez al aparecer el header.
  useEffect(() => {
    function actualizar() {
      setConScroll(window.scrollY > 20);
    }
    actualizar(); // por si la página se abre ya scrolleada
    window.addEventListener("scroll", actualizar, { passive: true });
    // Limpieza: se desengancha si el header desaparece.
    return () => window.removeEventListener("scroll", actualizar);
  }, []);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    // La clase depende del estado: con scroll suma "is-scrolled" (la sombra).
    <header className={conScroll ? "header is-scrolled" : "header"}>
      <div className="contenedor header__inner">
        <nav className="nav nav--izq" aria-label="Secciones">
          {navIzquierda.map((item) => (
            <Link key={item.href} className="nav__link" href={item.href}>
              {item.texto}
            </Link>
          ))}
        </nav>

        <Link className="logo-marca" href="/#inicio" aria-label="Equilibrate Studio Pilates, inicio">
          {/* Está arriba de todo: se carga ya, sin esperar al scroll */}
          <Image className="logo-marca__icono" src={logoIcon} alt="" sizes="42px" loading="eager" />
        </Link>

        <nav className="nav nav--der" aria-label="Más secciones">
          {navDerecha.map((item) => (
            <Link key={item.href} className="nav__link" href={item.href}>
              {item.texto}
            </Link>
          ))}
          <a className="btn btn--primario btn--compacto" href={WHATSAPP_RESERVA} target="_blank" rel="noopener">
            Reserva
          </a>
        </nav>

        {/* onClick: al tocar el botón, el estado pasa al contrario (abierto ↔ cerrado) */}
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={menuAbierto}
          aria-controls="nav-movil"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          Menú
        </button>
      </div>

      {/* `inert` cuando está cerrado: además de invisible, sus links no se
          pueden alcanzar con el teclado (con Tab) ni con lectores de pantalla. */}
      <nav
        className={menuAbierto ? "nav-movil is-open" : "nav-movil"}
        id="nav-movil"
        aria-label="Menú"
        inert={!menuAbierto}
      >
        {NAV.map((item) => (
          <Link key={item.href} className="nav__link" href={item.href} onClick={cerrarMenu}>
            {item.texto}
          </Link>
        ))}
        <a className="btn btn--primario" href={WHATSAPP_RESERVA} target="_blank" rel="noopener" onClick={cerrarMenu}>
          Reserva
        </a>
      </nav>
    </header>
  );
}
