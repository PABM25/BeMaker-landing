import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

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

function PortfolioHero() {
  return (
    <section className="relative bg-secondary text-secondary-foreground min-h-[42vh] flex items-center">
      <div
        className="absolute -top-20 -right-16 w-[360px] h-[360px] bg-primary/25 rounded-full blur-[110px] pointer-events-none"
        style={{ animation: "floatA 9s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[110px] pointer-events-none"
        style={{ animation: "floatB 11s ease-in-out 2s infinite" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-accent font-semibold tracking-widest text-xs uppercase mb-3">
            Nuestro Trabajo
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight mb-5 max-w-3xl">
            Proyectos que{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              transforman
            </span>{" "}
            negocios
          </h1>
          <p className="text-secondary-foreground/70 text-base sm:text-lg max-w-xl">
            Cada proyecto es una historia de digitalización real. Estas son
            algunas de las PYMEs que ya escalaron su operación con nosotros.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const staticFallback = [
    {
      name: "Lavandería DeLaCruz",
      category: "Sistema de Trazabilidad",
      description:
        "Digitalización completa del flujo de trabajo de lavandería industrial, con seguimiento de pedidos en tiempo real y notificaciones automáticas a clientes.",
      image_url:
        "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/84c97e7a6_bemaker_cl_delacruz_edb07b4f.png",
    },
    {
      name: "Construcciones V&G",
      category: "Gestión de Inventario y Obras",
      description:
        "Plataforma web para gestionar inventarios, cuadrillas y avances de obra en tiempo real, reduciendo tiempos administrativos en un 40%.",
      image_url:
        "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/ff0da3d74_bemaker_cl_Contru_436f585d.png",
    },
    {
      name: "TrazaPro",
      category: "Automatización & Dashboard",
      description:
        "Dashboard de trazabilidad con métricas en vivo, pensado para PYMEs de servicios que necesitan visibilidad total de sus operaciones diarias.",
      image_url:
        "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/e8d4cf5a7_generated_7e720f2c.jpg",
    },
    {
      name: "GestiónObra",
      category: "App de Gestión de Proyectos",
      description:
        "Aplicación móvil y web para equipos de construcción, con tableros de tareas, control presupuestario y reportes automáticos de avance.",
      image_url:
        "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/0b5ebe1fa_generated_27c668eb.jpg",
    },
  ];

  const items = staticFallback;
  const categories = ["Todos", ...new Set(items.map((i) => i.category))];
  const filtered =
    activeFilter === "Todos"
      ? items
      : items.filter((i) => i.category === activeFilter);

  return (
    <section
      className="relative bg-background py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`min-h-[44px] px-5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25"
                  : "bg-card text-card-foreground/70 border-border/20 hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {filtered.map((project, index) => (
            <AnimatedElement key={project.id || index} delay={index * 100}>
              <div className="group h-full rounded-2xl bg-card text-card-foreground overflow-hidden border border-border/10 shadow-sm hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500">
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={project.image_url}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                  <p className="text-sm text-card-foreground/65 leading-relaxed">
                    {project.description}
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

function StatsSection() {
  const stats = [
    { value: "150+", label: "Proyectos desplegados" },
    { value: "40%", label: "Reducción en tiempos admin." },
    { value: "98%", label: "Clientes satisfechos" },
    { value: "24/7", label: "Soporte y acompañamiento" },
  ];
  return (
    <section className="relative bg-secondary py-16 sm:py-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                  {s.value}
                </p>
                <p className="text-sm text-secondary-foreground/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative bg-background py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedElement>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent to-primary text-accent-foreground px-8 sm:px-16 py-14 sm:py-20 text-center shadow-2xl shadow-accent/30">
            <div
              className="absolute -bottom-16 -right-10 w-56 h-56 bg-accent-foreground/10 rounded-full blur-3xl pointer-events-none"
              style={{ animation: "floatC 10s ease-in-out infinite" }}
            />
            <Sparkles className="relative z-10 w-8 h-8 mx-auto mb-5" />
            <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-tight mb-5">
              ¿Tu proyecto es el próximo?
            </h2>
            <p className="relative z-10 text-accent-foreground/90 text-base sm:text-lg max-w-xl mx-auto mb-9">
              Cuéntanos tu idea y te ayudamos a convertirla en una plataforma
              digital real.
            </p>
            <Link
              to="/Contacto"
              className="relative z-10 inline-flex items-center gap-2 min-h-[44px] px-8 py-3.5 rounded-full bg-foreground text-background font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              Empezar proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default function Portafolio() {
  return (
    <div>
      <PortfolioHero />
      <ProjectsGrid />
      <StatsSection />
      <CTASection />
    </div>
  );
}