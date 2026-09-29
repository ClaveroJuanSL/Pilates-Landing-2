import { CERTIFICACION_PUNTOS } from "@/data/sitio";
import { whatsappCon } from "@/data/contacto";

export default function Certificacion() {
  return (
    <section className="certificacion" id="certificacion">
      <div className="contenedor certificacion__inner">
        <div>
          <span data-reveal className="eyebrow certificacion__eyebrow">Formación profesional</span>
          <h2 data-reveal className="titulo-seccion certificacion__titulo">
            Formate como <em>instructora certificada</em>
          </h2>
          <p data-reveal className="certificacion__texto">
            14 años de experiencia dando clase nos permiten formar a la próxima generación de instructoras. Un programa
            teórico-práctico, con clases en vivo sobre alumnas reales y acompañamiento hasta tu primera clase dictada.
          </p>
          <div data-reveal className="certificacion__acciones">
            <a
              className="btn btn--primario"
              href={whatsappCon("Hola, quiero información sobre la certificación de instructoras")}
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
