import { Fragment } from "react";
import Image from "next/image";
import logoIcon from "@/assets/img/logo-icon.png";

const CIFRAS = ["Mas de 10 años de experiencia", "Instructoras certificadas", "2 salas"];

export default function Franja() {
  return (
    <section className="franja">
      <div className="contenedor franja__inner">
        <Image className="franja__icono" src={logoIcon} alt="" sizes="74px" />
        <p className="franja__texto">
          {CIFRAS.map((cifra, i) => (
            // Un fragmento con key: agrupa el separador y la cifra sin
            // agregar un elemento extra al HTML.
            <Fragment key={cifra}>
              {i > 0 && <span className="franja__separador" aria-hidden="true">|</span>}
              <span>{cifra}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
