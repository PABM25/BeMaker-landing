import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

const AnimatedElement = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsVisible(true);
      return;
    }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallback);
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 200px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

function ContactHero() {
  return (
    <section className="relative bg-secondary text-secondary-foreground min-h-[38vh] flex items-center">
      <div
        className="absolute -top-16 -left-14 w-[320px] h-[320px] bg-primary/25 rounded-full blur-[110px] pointer-events-none"
        style={{ animation: "floatA 9s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[110px] pointer-events-none"
        style={{ animation: "floatB 11s ease-in-out 2s infinite" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-3">
            Hablemos
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight mb-5 max-w-3xl">
            Convirtamos tu idea en{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              código real
            </span>
          </h1>
          <p className="text-secondary-foreground/70 text-base sm:text-lg max-w-xl">
            Cuéntanos sobre tu negocio y te responderemos en menos de 24
            horas con una propuesta a medida.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: "contacto@bemaker.cl" },
    { icon: Phone, label: "+56 9 3456 7890" },
    { icon: MapPin, label: "Santiago, Chile" },
    { icon: Clock, label: "Lun – Vie, 9:00 – 18:00" },
  ];

  return (
    <section className="relative bg-background py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <AnimatedElement className="lg:col-span-2">
          <div className="h-full rounded-2xl bg-secondary text-secondary-foreground p-8 sm:p-9 relative overflow-hidden">
            <div className="absolute -bottom-16 -right-10 w-52 h-52 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <h3 className="text-2xl font-bold mb-6 relative z-10">
              Información de contacto
            </h3>
            <div className="space-y-5 relative z-10">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-sm text-secondary-foreground/80">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-9 pt-8 border-t border-border/15 relative z-10">
              <p className="text-sm text-secondary-foreground/60 leading-relaxed">
                También puedes visitar nuestro{" "}
                <a
                  href="#"
                  className="text-accent font-semibold hover:underline"
                >
                  portafolio de proyectos
                </a>{" "}
                para ver casos reales de PYMEs que ya escalaron con nosotros.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement className="lg:col-span-3" delay={100}>
          <div className="h-full rounded-2xl bg-card text-card-foreground p-8 sm:p-9 border border-border/10 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">Envíanos un mensaje</h3>
            <p className="text-sm text-card-foreground/60 mb-7">
              Completa el formulario y nuestro equipo se pondrá en contacto
              contigo a la brevedad.
            </p>

            <div className={submitted ? "block" : "hidden"}>
              <div className="flex items-center gap-3 rounded-xl bg-primary/10 text-primary px-5 py-4 mb-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">
                  ¡Gracias! Recibimos tu mensaje y te contactaremos pronto.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={submitted ? "hidden" : "block space-y-5"}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-card-foreground/70 mb-1.5 block"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full min-h-[44px] rounded-lg bg-background border border-border/30 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-card-foreground/70 mb-1.5 block"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@empresa.cl"
                    className="w-full min-h-[44px] rounded-lg bg-background border border-border/30 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-xs font-semibold text-card-foreground/70 mb-1.5 block"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                  className="w-full min-h-[44px] rounded-lg bg-background border border-border/30 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-card-foreground/70 mb-1.5 block"
                >
                  Cuéntanos sobre tu proyecto
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Necesito una landing page para..."
                  className="w-full rounded-lg bg-background border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                <span className="relative z-10">Enviar mensaje</span>
                <Send className="w-4 h-4 relative z-10" />
              </button>
            </form>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "¿Cuánto tiempo toma desarrollar mi proyecto?",
      a: "Depende del alcance, pero la mayoría de nuestras landing pages y automatizaciones para PYMEs están listas entre 2 y 4 semanas.",
    },
    {
      q: "¿Trabajan con empresas fuera de Santiago?",
      a: "Sí, trabajamos de forma remota con clientes en todo Chile y Latinoamérica, con reuniones online durante todo el proceso.",
    },
    {
      q: "¿Ofrecen soporte después del lanzamiento?",
      a: "Por supuesto. Todos nuestros proyectos incluyen acompañamiento post-lanzamiento para asegurar tu crecimiento continuo.",
    },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-secondary py-20 sm:py-24 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[400px] h-[220px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <AnimatedElement className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-foreground tracking-tight">
            Preguntas frecuentes
          </h2>
        </AnimatedElement>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <AnimatedElement key={f.q} delay={i * 100}>
              <div className="rounded-xl bg-card border border-border/10 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full min-h-[44px] flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-semibold text-card-foreground text-sm sm:text-base">
                    {f.q}
                  </span>
                  <span
                    className={`text-primary text-xl transition-transform duration-300 flex-shrink-0 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${
                    open === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="text-sm text-card-foreground/65 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Contacto() {
  return (
    <div>
      <ContactHero />
      <ContactFormSection />
      <FaqSection />
    </div>
  );
}