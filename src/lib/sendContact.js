/**
 * Envía el formulario de contacto.
 *
 * Usa VITE_CONTACT_ENDPOINT (por ejemplo, la URL de un formulario de Formspree:
 * https://formspree.io/f/xxxxxxx). Cualquier servicio que acepte un POST con
 * JSON y responda 2xx sirve.
 *
 * Si la variable no está configurada, abre el cliente de correo del visitante
 * con el mensaje ya escrito, para no perder la consulta.
 */
export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export function buildMailto(to, values) {
  const subject = `Consulta web: ${values.service || "contacto"}`;
  const body = [
    `Nombre: ${values.name}`,
    `Correo: ${values.email}`,
    values.company && `Empresa: ${values.company}`,
    values.phone && `Teléfono: ${values.phone}`,
    values.service && `Servicio: ${values.service}`,
    "",
    values.message,
  ]
    .filter((line) => line !== undefined && line !== false && line !== "")
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * @returns {Promise<"sent" | "mailto">}
 * @throws {Error} si el servicio responde con error o no hay conexión.
 */
export async function sendContact(values, { fallbackEmail } = {}) {
  if (!CONTACT_ENDPOINT) {
    window.location.href = buildMailto(fallbackEmail, values);
    return "mailto";
  }

  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      nombre: values.name,
      email: values.email,
      empresa: values.company,
      telefono: values.phone,
      servicio: values.service,
      mensaje: values.message,
      _subject: `Consulta web: ${values.service || "contacto"}`,
      _gotcha: values._gotcha, // campo trampa contra bots (Formspree lo descarta)
    }),
  });

  if (!response.ok) {
    throw new Error(`El servicio de contacto respondió ${response.status}`);
  }
  return "sent";
}
