import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { CLIENT_LOGOS, METRICS, TESTIMONIALS } from "./data";

/* Contador animado que arranca al entrar en pantalla. */
function CountUp({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) {
      setDisplay(value);
      return;
    }
    let frame;
    const run = () => {
      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3)))); // ease-out cúbico
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        run();
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reduceMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ---------------- Prueba social: métricas, testimonios y logos ---------------- */
export default function SocialProofSection() {
  // Se repiten los logos para que el carrusel infinito no tenga huecos.
  const marquee = Array.from({ length: 6 }, () => CLIENT_LOGOS).flat();

  return (
    <section id="casos" className="relative scroll-mt-20 bg-background py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Casos de éxito"
          title="Empresas que ya dieron el salto digital"
          subtitle="Resultados concretos para PYMEs que decidieron trabajar de forma más inteligente."
          className="mb-16"
        />

        {/* Métricas */}
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-3xl border border-border bg-card overflow-hidden mb-16">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`p-6 sm:p-8 text-center border-border ${i % 2 === 0 ? "border-r" : ""} ${
                  i < 2 ? "border-b lg:border-b-0" : ""
                } ${i === 1 ? "lg:border-r" : ""}`}
              >
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#010066] to-[#1B65A6] dark:from-[#4AB0D9] dark:to-white">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </dd>
                <dd className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug" aria-hidden="true">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Testimonios */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="group h-full flex flex-col justify-between rounded-2xl bg-card border border-border p-8 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                <div>
                  <Quote className="w-8 h-8 text-accent/30 group-hover:text-accent transition-colors duration-500 mb-5" />
                  <blockquote className="text-card-foreground/85 leading-relaxed mb-8">“{t.quote}”</blockquote>
                </div>
                <figcaption className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#010066] to-[#1B65A6] text-white text-sm font-bold flex items-center justify-center">
                    {t.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-card-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Logos de clientes */}
      <div className="relative mt-20 py-6 overflow-hidden" aria-label="Clientes">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex items-center w-max motion-safe:animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {marquee.map((logo, i) => (
            <img
              key={i}
              src={logo.image_url}
              alt={i < CLIENT_LOGOS.length ? logo.name : ""}
              loading="lazy"
              className="h-16 sm:h-20 w-auto mx-10 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-12 px-6">
        <Link
          to="/Portafolio"
          className="group inline-flex items-center gap-2 min-h-[48px] px-8 rounded-full bg-foreground text-background font-semibold hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-300"
        >
          Ver portafolio completo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
