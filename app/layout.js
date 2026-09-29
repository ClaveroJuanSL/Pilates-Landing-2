// Layout raíz: es el "marco" que envuelve a todas las páginas del sitio.
// Reemplaza al <head> del index.html viejo: acá van los metadatos, las
// fuentes y el CSS global. Lo que se ponga en <body> se repite en cada página.

import { Anton, Montserrat, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Revelar from "@/components/Revelar";
import "./globals.css";

// next/font descarga estas fuentes al compilar y las sirve desde nuestro
// propio dominio: el navegador nunca le pide nada a Google.
// Cada una queda disponible como variable CSS (ver :root en globals.css).
const anton = Anton({
  subsets: ["latin"],
  weight: "400", // Anton tiene un solo peso
  variable: "--font-anton",
});

// Montserrat y Manrope son fuentes variables: un solo archivo trae todos los pesos.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

// Equivale a <title> y <meta name="description">. Next genera las etiquetas.
// Los íconos no se declaran acá: alcanza con app/icon.png y app/apple-icon.png.
export const metadata = {
  title: "Equilibrate Studio Pilates | Mitre 502",
  description:
    "Estudio de Pilates con 14 años de trayectoria. Clases para todas las edades, embarazadas, hombres y deportistas. Membresía, certificación y comunidad. Mitre 502, Edificio Don Jorge.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${montserrat.variable} ${manrope.variable}`}
    >
      <body>
        <Header />

        {/* children = el contenido de la página actual (app/page.js) */}
        {children}

        <Footer />

        {/* No dibuja nada: anima la aparición de los [data-reveal] al hacer scroll */}
        <Revelar />
      </body>
    </html>
  );
}
