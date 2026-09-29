"use client";

// Carrusel de fotos de los eventos de la membresía.
// "use client" porque cambia de foto solo (useState/useEffect) y responde a
// clics y deslizamientos, cosas que pasan en el navegador.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import evento02 from "@/assets/img/eventos/evento-02.jpg";
import evento03 from "@/assets/img/eventos/evento-03.jpg";
import evento04 from "@/assets/img/eventos/evento-04.jpg";
import evento05 from "@/assets/img/eventos/evento-05.jpg";
import evento06 from "@/assets/img/eventos/evento-06.jpg";
import evento07 from "@/assets/img/eventos/evento-07.jpg";
import evento08 from "@/assets/img/eventos/evento-08.jpg";
import evento09 from "@/assets/img/eventos/evento-09.jpg";
import evento10 from "@/assets/img/eventos/evento-10.jpg";

const FOTOS = [
  { src: evento02, alt: "Grupo de alumnas festejando en la sala de reformers de Equilibrate" },
  { src: evento03, alt: "Dos asistentes posando junto al banner de Equilibrate en un evento al aire libre" },
  { src: evento04, alt: "Clase al aire libre con alumnas en la playa y la bandera de Equilibrate" },
  { src: evento05, alt: "Frascos y bowl de dátiles de una marca aliada" },
  { src: evento06, alt: "Mesa con flores, frutas y productos de una marca aliada" },
  { src: evento07, alt: "Asistente sacando una foto con el celular en un evento al aire libre" },
  { src: evento08, alt: "Mesa de desayuno con café y flores en un evento de la membresía" },
  { src: evento09, alt: "Panificados de una marca aliada servidos en un evento" },
  { src: evento10, alt: "Charla de un invitado en la sala de reformers de Equilibrate" },
];

const INTERVALO = 5000; // ms que queda cada foto
// Misma columna que las cajas del mosaico: pantalla completa en celular,
// mitad en tablet y 570px en escritorio.
const SIZES = "(max-width: 780px) 100vw, (max-width: 1240px) 50vw, 570px";

export default function CarruselEventos() {
  const [actual, setActual] = useState(0);
  // La foto que se va queda visible debajo mientras la nueva se funde encima;
  // si las dos se transparentaran a la vez, en el medio se vería lavado.
  const [anterior, setAnterior] = useState(null);
  const [pausado, setPausado] = useState(false);
  const inicioToque = useRef(null);

  const ir = useCallback(
    (i) => {
      const destino = (i + FOTOS.length) % FOTOS.length;
      if (destino === actual) return;
      setAnterior(actual);
      setActual(destino);
    },
    [actual]
  );

  // Cuando termina el fundido, la anterior ya no hace falta.
  useEffect(() => {
    if (anterior === null) return;
    const id = setTimeout(() => setAnterior(null), 1200);
    return () => clearTimeout(id);
  }, [anterior]);

  // Avance automático. Se reinicia cada vez que cambia la foto, así un clic
  // en las flechas no hace que la siguiente pase enseguida. No avanza si la
  // persona pidió reducir el movimiento en su sistema.
  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => ir(actual + 1), INTERVALO);
    return () => clearTimeout(id);
  }, [actual, pausado, ir]);

  // Deslizar con el dedo en celular.
  function alTocar(e) {
    inicioToque.current = e.touches[0].clientX;
  }
  function alSoltar(e) {
    if (inicioToque.current === null) return;
    const dx = e.changedTouches[0].clientX - inicioToque.current;
    if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
    inicioToque.current = null;
  }

  return (
    <div
      className="carrusel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Fotos de los eventos de la membresía"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      onTouchStart={alTocar}
      onTouchEnd={alSoltar}
    >
      {FOTOS.map((foto, i) => (
        <div
          key={i}
          className={`carrusel__slide${i === actual ? " carrusel__slide--activa" : ""}${i === anterior ? " carrusel__slide--saliente" : ""}`}
          aria-hidden={i !== actual}
        >
          <Image src={foto.src} alt={foto.alt} sizes={SIZES} quality={90} placeholder="blur" />
        </div>
      ))}

      <div className="carrusel__pie">
        <div className="carrusel__puntos">
          {FOTOS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carrusel__punto${i === actual ? " carrusel__punto--activo" : ""}`}
              aria-label={`Ver foto ${i + 1} de ${FOTOS.length}`}
              aria-current={i === actual}
              onClick={() => ir(i)}
            />
          ))}
        </div>
        <div className="carrusel__flechas">
          <button type="button" className="carrusel__flecha" aria-label="Foto anterior" onClick={() => ir(actual - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="carrusel__flecha" aria-label="Foto siguiente" onClick={() => ir(actual + 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
