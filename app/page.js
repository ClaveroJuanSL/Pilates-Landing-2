// Página de inicio (ruta "/"). Se lee como un índice: el orden de las
// secciones es el orden en que aparecen en pantalla. Cada una vive en su
// propio archivo dentro de components/, y el contenido en data/sitio.js.
//
// El header y el footer no están acá: son parte del marco común del sitio,
// así que viven en app/layout.js.

import Hero from "@/components/Hero";
import Franja from "@/components/Franja";
import Clases from "@/components/Clases";
import Membresia from "@/components/Membresia";
import Certificacion from "@/components/Certificacion";
import Espacios from "@/components/Espacios";
import Ustedes from "@/components/Ustedes";
import Visitanos from "@/components/Visitanos";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <main>
      <Hero />
      <Franja />
      <Clases />
      <Membresia />
      <Certificacion />
      <Espacios />
      <Ustedes />
      <Visitanos />
      <Contacto />
    </main>
  );
}
