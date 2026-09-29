"use client";

// "use client" = este archivo se ejecuta en el NAVEGADOR (además de en el
// servidor para el HTML inicial). Hace falta porque usa useEffect y APIs
// del navegador como IntersectionObserver, que en el servidor no existen.

import { useEffect } from "react";

// Anima la aparición de los elementos marcados con `data-reveal` cuando entran
// en pantalla. No dibuja nada (devuelve null): solo observa.
//
// El CSS arranca esos elementos invisibles ([data-reveal] → opacity 0) y los
// muestra cuando valen "shown". Este componente es el que hace ese cambio.
// Reemplaza a initReveal() del app.js viejo.
export default function Revelar() {
  // useEffect corre DESPUÉS de que la página se muestra, y solo en el navegador.
  // El [] del final significa "correr una sola vez, al aparecer el componente".
  useEffect(() => {
    const elementos = document.querySelectorAll("[data-reveal]:not([data-reveal='shown'])");

    function mostrar(el) {
      // Escalonado: si aparecen varios hermanos juntos (las 3 tarjetas de
      // clases, por ejemplo), cada uno arranca 90ms después del anterior.
      const hermanos = [...el.parentElement.querySelectorAll(":scope > [data-reveal]")];
      const posicion = Math.max(0, hermanos.indexOf(el));
      el.style.transitionDelay = `${Math.min(posicion * 90, 450)}ms`;
      el.setAttribute("data-reveal", "shown");
    }

    // Si la persona configuró su sistema para reducir el movimiento, no hay
    // animación: todo se muestra de una.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elementos.forEach((el) => el.setAttribute("data-reveal", "shown"));
      return;
    }

    // IntersectionObserver avisa cuando un elemento entra en pantalla, sin
    // tener que medir todo en cada movimiento del scroll como hacía app.js.
    // El -10% de abajo hace que aparezcan un poco antes de llegar al borde.
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            mostrar(entrada.target);
            observador.unobserve(entrada.target); // se anima una sola vez
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    elementos.forEach((el) => observador.observe(el));

    // Lo que devuelve useEffect es la "limpieza": corre si el componente
    // desaparece. Deja de observar para no dejar trabajo colgado.
    return () => observador.disconnect();
  }, []);

  return null;
}
