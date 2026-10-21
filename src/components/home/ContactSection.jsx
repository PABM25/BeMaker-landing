import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { CONTACT, SERVICE_OPTIONS } from "./data";

const EMPTY_FORM = { name: "", email: "", company: "", phone: "", service: "", message: "" };
const MESSAGE_MAX = 1000;
const FIELD_ORDER = ["name", "email", "phone", "service", "message"];

/* Reglas de validación: devuelve { campo: "mensaje de error" }. */
function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Ingresa tu nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Ingresa un correo válido.";
  if (values.phone && !/^\+?[\d\s()-]{8,}$/.test(values.phone.trim())) errors.phone = "Ingresa un teléfono válido.";
  if (!values.service) errors.service = "Selecciona un servicio de interés.";
  if (values.message.trim().length < 10) errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  return errors;
}

const inputClass = (hasError) =>
  `w-full min-h-[48px] rounded-xl bg-background border px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 transition-all duration-200 ${
    hasError
      ? "border-accent focus:ring-accent/40"
      : "border-border hover:border-primary/40 focus:border-primary focus:ring-primary/30"
  }`;

/* Etiqueta + control + mensaje de error accesible. */
function Field({ id, label, optional = false, error = undefined, children }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-center justify-between text-xs font-semibold text-card-foreground/75 mb-1.5">
        {label}
        {optional && <span className="font-normal text-muted-foreground">Opcional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-xs text-accent mt-1.5"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Formulario ---------------- */
function ContactForm({ preselected }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const formRef = useRef(null);

  // Al pulsar "Solicitar información" en una tarjeta, se marca ese servicio.
  useEffect(() => {
    if (preselected) {
      setValues((v) => ({ ...v, service: preselected.name }));
      setTouched((t) => ({ ...t, service: false }));
    }
  }, [preselected]);

  const errors = validate(values);
  const showError = (field) => (touched[field] ? errors[field] : undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("sending");
    // TODO: conectar con el backend o servicio de correo (p. ej. Formspree, Resend o una API propia).
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("sent");
  };

  const reset = () => {
    setValues(EMPTY_FORM);
    setTouched({});
    setStatus("idle");
  };

  const a11y = (field) => ({
    "aria-invalid": Boolean(showError(field)),
    "aria-describedby": showError(field) ? `${field}-error` : undefined,
  });

  return (
    <div className="relative h-full rounded-3xl bg-card text-card-foreground border border-border shadow-sm p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="h-full min-h-[420px] flex flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
              className="relative mb-6"
            >
              <img src="/brand/mascota-frente.png" alt="" width={334} height={461} className="w-28 h-auto" />
              <span className="absolute -right-2 top-6 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5" />
              </span>
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">¡Mensaje enviado, {values.name.split(" ")[0]}!</h3>
            <p className="text-card-foreground/70 max-w-sm mb-8">
              Recibimos tu consulta sobre <strong>{values.service}</strong>. Te responderemos en menos de 24 horas
              a <strong>{values.email}</strong>.
            </p>
            <button
              onClick={reset}
              className="min-h-[44px] px-6 rounded-full border border-border text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="name" label="Nombre completo" error={showError("name")}>
                <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Tu nombre" className={inputClass(showError("name"))} {...a11y("name")} />
              </Field>
              <Field id="email" label="Correo electrónico" error={showError("email")}>
                <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="tu@empresa.cl" className={inputClass(showError("email"))} {...a11y("email")} />
              </Field>
              <Field id="company" label="Empresa" optional>
                <input id="company" name="company" type="text" autoComplete="organization" value={values.company} onChange={handleChange} placeholder="Nombre de tu empresa" className={inputClass(false)} />
              </Field>
              <Field id="phone" label="Teléfono" optional error={showError("phone")}>
                <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+56 9 1234 5678" className={inputClass(showError("phone"))} {...a11y("phone")} />
              </Field>
            </div>

            {/* Selección de servicio como chips (radio buttons accesibles) */}
            <fieldset aria-describedby={showError("service") ? "service-error" : undefined}>
              <legend className="text-xs font-semibold text-card-foreground/75 mb-2.5">Servicio de interés</legend>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((option) => {
                  const checked = values.service === option;
                  return (
                    <label
                      key={option}
                      className={`cursor-pointer select-none inline-flex items-center min-h-[40px] px-4 rounded-full border text-sm font-medium transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40 ${
                        checked
                          ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/25"
                          : "border-border text-card-foreground/80 hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={option}
                        checked={checked}
                        onChange={(e) => {
                          handleChange(e);
                          setTouched((t) => ({ ...t, service: true }));
                        }}
                        className="sr-only"
                      />
                      {checked && <CheckCircle2 className="w-4 h-4 mr-1.5" />}
                      {option}
                    </label>
                  );
                })}
              </div>
              <AnimatePresence>
                {showError("service") && (
                  <motion.p id="service-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-xs text-accent mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.service}
                  </motion.p>
                )}
              </AnimatePresence>
            </fieldset>

            <Field id="message" label="Cuéntanos sobre tu proyecto" error={showError("message")}>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={MESSAGE_MAX}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Necesito automatizar el seguimiento de pedidos de mi empresa..."
                className={`${inputClass(showError("message"))} py-3 resize-none`}
                {...a11y("message")}
              />
              <p className="text-right text-[11px] text-muted-foreground mt-1">
                {values.message.length}/{MESSAGE_MAX}
              </p>
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-10 rounded-full bg-accent text-accent-foreground font-semibold shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:pointer-events-none transition-all duration-300"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar solicitud
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Sección de contacto ---------------- */
export default function ContactSection({ preselected }) {
  const contactItems = [
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: CONTACT.phone, href: `tel:${CONTACT.phoneHref}` },
    { icon: MapPin, label: CONTACT.city },
    { icon: Clock, label: CONTACT.hours },
  ];

  return (
    <section id="contacto" className="relative scroll-mt-20 bg-muted/40 py-24 sm:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Contacto"
          title="Convirtamos tu idea en software real"
          subtitle="Cuéntanos qué necesitas y te enviaremos una propuesta a medida, sin compromiso."
          className="mb-14"
        />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Datos de contacto + mapa */}
          <Reveal className="lg:col-span-2">
            <div className="h-full flex flex-col rounded-3xl bg-[#010066] text-white p-8 sm:p-10 relative overflow-hidden">
              <div aria-hidden="true" className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-[#1B65A6]/60 blur-[100px]" />
              <h3 className="relative text-2xl font-bold mb-2">Hablemos directo</h3>
              <p className="relative text-white/65 text-sm mb-8">Respondemos en menos de 24 horas hábiles.</p>
              <ul className="relative space-y-4 mb-8">
                {contactItems.map((c) => {
                  const content = (
                    <>
                      <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#ED0807]">
                        <c.icon className="w-4 h-4 text-[#4AB0D9] group-hover:text-white transition-colors" />
                      </span>
                      <span className="text-sm text-white/85">{c.label}</span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="group flex items-center gap-4 min-h-[44px] hover:text-white">
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 min-h-[44px]">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="relative mt-auto rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]">
                <iframe
                  title="Ubicación de BeMaker en Santiago, Chile"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-70.70%2C-33.48%2C-70.58%2C-33.40&layer=mapnik"
                  loading="lazy"
                  className="w-full h-full grayscale-[40%] contrast-[1.05]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.1}>
            <ContactForm preselected={preselected} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
