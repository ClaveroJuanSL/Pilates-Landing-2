import FormularioContacto from "@/components/FormularioContacto";

// La sección sigue siendo de servidor: el título y la bajada son texto fijo.
// Solo la parte interactiva (pestañas, envío, gracias) es de cliente y vive
// en FormularioContacto.jsx. Así viaja al navegador el menor JavaScript posible.
export default function Contacto() {
  return (
    <section className="seccion contacto" id="contacto">
      <div className="contenedor">
        <div className="contacto__head">
          <h2 data-reveal className="titulo-seccion">
            ¿Dudas? <em>Te acompañamos</em>
          </h2>
          <p data-reveal className="contacto__intro">
            Contanos un poco de vos y te escribimos con los horarios que mejor te queden.
          </p>
        </div>

        <FormularioContacto />
      </div>
    </section>
  );
}
