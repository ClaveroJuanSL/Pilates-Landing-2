import { CERTIFICACION_PUNTOS } from "@/data/sitio";
import { whatsappCon } from "@/data/contacto";

export default function Certificacion() {
  return (
    <section className="certificacion" id="certificacion">
      <div className="contenedor certificacion__inner">
        <div>
          <span data-reveal className="eyebrow certificacion__eyebrow">Formación profesional</span>
          <h2 data-reveal className="titulo-seccion certificacion__titulo">
            Formate como <em>instructor certificado</em>
          </h2>
          <p data-reveal className="certificacion__texto">
            Mas de 10 años de experiencia dando clases nos permiten formar a la próxima generación de instructores. Un programa teórico-práctico, con clases en vivo, practicas en nuestro estudio, beneficios en nuestras clases y acompañamiento hasta tu primera clase dictada.
          </p>
          <div data-reveal className="certificacion__acciones">
            <a
              className="btn btn--primario"
              href={whatsappCon("Hola, quiero información sobre la certificación de instructores")}
              target="_blank"
              rel="noopener"
            >
              Quiero información de la certificación
            </a>
          </div>
        </div>

        <ul data-reveal className="certificacion__lista">
          {CERTIFICACION_PUNTOS.map((punto) => (
            <li key={punto}>
              <span className="certificacion__check">✓</span>
              {punto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
