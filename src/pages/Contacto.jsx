import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/components/home/data";

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
  const contactInfo = [
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: CONTACT.phone, href: `tel:${CONTACT.phoneHref}` },
    { icon: MapPin, label: CONTACT.city },
    { icon: Clock, label: CONTACT.hours },
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
              {contactInfo.map((c) => {
                const content = (
                  <>
                    <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-sm text-secondary-foreground/80">
                      {c.label}
                    </span>
                  </>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="flex items-center gap-3 hover:text-primary">
                    {content}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-center gap-3">
                    {content}
                  </div>
                );
              })}
            </div>
            <div className="mt-9 pt-8 border-t border-border/15 relative z-10">
              <p className="text-sm text-secondary-foreground/60 leading-relaxed">
                También puedes visitar nuestro{" "}
                <Link
                  to="/Portafolio"
                  className="text-accent font-semibold hover:underline"
                >
                  portafolio de proyectos
                </Link>{" "}
                para ver casos reales de PYMEs que ya escalaron con nosotros.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement className="lg:col-span-3" delay={100}>
          <ContactForm />
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