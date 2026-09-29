"use client";

// Componente de cliente: las pestañas, el envío y el "Gracias" cambian lo
// que se ve según lo que hace la persona. Reemplaza a initFormTabs() e
// initContactForm() del app.js viejo.
//
// Todo lo que este archivo importa también viaja al navegador. Por eso el
// título de la sección quedó afuera, en Contacto.jsx (que sigue en el servidor).

import { useState } from "react";
import { HORARIOS, NIVELES, INICIO_CERTIFICACION, EXPERIENCIA_CERTIFICACION } from "@/data/formulario";
import { WHATSAPP_CONSULTA } from "@/data/contacto";

// ---------------------------------------------------------------------------
// Piezas que se repiten en los dos formularios (iguales que en la etapa 2)
// ---------------------------------------------------------------------------

// Nombre, WhatsApp y email: idénticos en ambos formularios.
function CamposContacto() {
  return (
    <>
      <label className="campo">
        <span className="campo__label">Nombre y apellido</span>
        <input name="nombre" type="text" placeholder="Tu nombre" required />
      </label>
      <label className="campo">
        <span className="campo__label">WhatsApp</span>
        <input name="tel" type="tel" placeholder="+54 9 ..." required />
      </label>
      <label className="campo">
        <span className="campo__label">Email</span>
        <input name="email" type="email" placeholder="hola@correo.com" />
      </label>
    </>
  );
}

// Un desplegable. Las opciones llegan como lista.
function Selector({ etiqueta, name, opciones }) {
  return (
    <label className="campo">
      <span className="campo__label">{etiqueta}</span>
      <select name={name}>
        {opciones.map((opcion) => (
          <option key={opcion}>{opcion}</option>
        ))}
      </select>
    </label>
  );
}

// Grupo de botones de opción (radio), también armado desde una lista.
function Opciones({ etiqueta, name, opciones }) {
  return (
    <div className="campo campo--full">
      <span className="campo__label">{etiqueta}</span>
      <div className="opciones">
        {opciones.map((opcion) => (
          <label key={opcion} className="opcion">
            <input type="radio" name={name} value={opcion} />
            {opcion}
          </label>
        ))}
      </div>
    </div>
  );
}

function Mensaje({ etiqueta, placeholder }) {
  return (
    <label className="campo campo--full">
      <span className="campo__label">{etiqueta}</span>
      <textarea name="mensaje" rows={3} placeholder={placeholder} />
    </label>
  );
}

// ---------------------------------------------------------------------------
// Envío
// ---------------------------------------------------------------------------

// Manda los datos al servidor (app/api/contact/route.js). Si la respuesta
// no es "ok" (datos inválidos, demasiados envíos, falla del email), lanza
// un error y el formulario muestra el mensaje de error.
async function enviarConsulta(datos) {
  const respuesta = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!respuesta.ok) throw new Error("No se pudo enviar la consulta.");
}

// Un formulario con su propio estado de envío. Los campos llegan como
// `children`: lo que se escribe entre <Formulario> y </Formulario>.
//
// Cuando el envío sale bien no decide qué mostrar: avisa hacia arriba
// llamando a `alEnviar`, y el componente padre cambia a la pantalla de gracias.
function Formulario({ tipo, visible, alEnviar, children }) {
  // "listo" → "enviando" → (bien: avisa al padre) / (mal: "error")
  const [estado, setEstado] = useState("listo");

  async function manejarEnvio(evento) {
    evento.preventDefault(); // sin esto, el navegador recargaría la página
    // Los datos se leen ANTES del await: después, React ya soltó el evento.
    const datos = Object.fromEntries(new FormData(evento.currentTarget));
    setEstado("enviando");
    try {
      await enviarConsulta(datos);
      alEnviar(datos.nombre);
    } catch {
      setEstado("error");
    }
  }

  const enviando = estado === "enviando";

  return (
    // `hidden` oculta el formulario pero lo deja armado: si cambiás de
    // pestaña y volvés, lo que escribiste sigue ahí.
    <form className="form" aria-labelledby={`tab-${tipo}`} hidden={!visible} noValidate onSubmit={manejarEnvio}>
      {children}
      <input type="hidden" name="tipo" value={tipo} />
      <div className="form__pie">
        <span className="form__aviso">Respondemos en menos de 24 h hábiles.</span>
        <button className="btn btn--oscuro" type="submit" disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar consulta"}
        </button>
      </div>
      <p className="form__error" hidden={estado !== "error"}>
        No pudimos enviar tu consulta. Probá de nuevo en un momento o escribinos por WhatsApp.
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------

const PESTANAS = [
  { id: "clases", texto: "Quiero empezar clases" },
  { id: "certificacion", texto: "Certificación de profesorado" },
];

export default function FormularioContacto() {
  const [pestana, setPestana] = useState("clases");
  // null = todavía no se envió nada. Cuando se envía, guarda el nombre.
  const [nombreEnviado, setNombreEnviado] = useState(null);

  // Renderizado condicional: si ya se envió, en vez del formulario va el gracias.
  if (nombreEnviado !== null) {
    const primerNombre = nombreEnviado.trim().split(" ")[0];
    return (
      <div className="gracias">
        <span className="gracias__titulo">
          Gracias, <span>{primerNombre}</span>
        </span>
        <p>Recibimos tu mensaje. Te escribimos dentro de las próximas 24 horas hábiles.</p>
        <a className="enlace-subrayado" href={WHATSAPP_CONSULTA} target="_blank" rel="noopener">
          O escribinos ahora por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-tabs" role="tablist" aria-label="Tipo de consulta">
        {PESTANAS.map((p) => {
          const activa = pestana === p.id;
          return (
            <button
              key={p.id}
              className={activa ? "form-tabs__btn is-active" : "form-tabs__btn"}
              type="button"
              id={`tab-${p.id}`}
              role="tab"
              aria-selected={activa}
              onClick={() => setPestana(p.id)}
            >
              {p.texto}
            </button>
          );
        })}
      </div>

      <Formulario tipo="clases" visible={pestana === "clases"} alEnviar={setNombreEnviado}>
        <CamposContacto />
        <Selector etiqueta="Horario que preferís" name="horario" opciones={HORARIOS} />
        <Opciones etiqueta="¿Hiciste pilates antes?" name="nivel" opciones={NIVELES} />
        <Mensaje
          etiqueta="Tu objetivo o lo que quieras contarnos"
          placeholder="Dolor de espalda, embarazo, volver a moverme, preparación deportiva…"
        />
      </Formulario>

      <Formulario tipo="certificacion" visible={pestana === "certificacion"} alEnviar={setNombreEnviado}>
        <CamposContacto />
        <Selector etiqueta="¿Cuándo te gustaría empezar?" name="disponibilidad" opciones={INICIO_CERTIFICACION} />
        <Opciones etiqueta="Tu experiencia con pilates" name="experiencia" opciones={EXPERIENCIA_CERTIFICACION} />
        <Mensaje
          etiqueta="Contanos por qué te querés certificar"
          placeholder="Tu experiencia, tu disponibilidad horaria, qué te gustaría lograr…"
        />
      </Formulario>
    </div>
  );
}
