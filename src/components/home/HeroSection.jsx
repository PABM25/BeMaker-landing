import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Bell, CheckCircle2, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useSectionNav } from "@/hooks/use-section-nav";

const ROTATING_WORDS = ["tu PYME", "tus ventas", "tu operación", "tu equipo"];
const BARS = [38, 52, 45, 64, 58, 72, 66, 84, 78, 92];

/* ---------------- Titular con palabra rotativa ---------------- */
function RotatingWord() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <span className="relative block h-[1.2em] overflow-hidden" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 lg:right-auto whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#4AB0D9] via-white to-[#4AB0D9] bg-[length:200%_auto] animate-gradient-x"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Desplazamiento de una capa según la posición del cursor (parallax). */
function useParallax(sx, sy, depth) {
  const x = useTransform(sx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(sy, [-0.5, 0.5], [-depth, depth]);
  return { x, y };
}

/* ---------------- Panel interactivo del hero ---------------- */
function HeroVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const near = useParallax(sx, sy, 28);
  const far = useParallax(sx, sy, -18);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="relative mx-auto w-full max-w-[520px] py-10 [perspective:1200px]"
      aria-hidden="true"
    >
      {/* Panel principal */}
      <motion.div
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-5 sm:p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED0807]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4AB0D9]/80" />
          </div>
          <span className="text-[11px] font-medium text-white/50 tracking-wide">panel.bemaker.cl</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Pedidos", value: "1.284" },
            { label: "Leads", value: "312" },
            { label: "Ahorro", value: "36 h" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50">{kpi.label}</p>
              <p className="text-base sm:text-xl font-bold text-white mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Gráfico de barras animado */}
        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-white/80">Rendimiento mensual</p>
            <span className="text-[11px] font-semibold text-[#4AB0D9]">+38%</span>
          </div>
          <div className="flex items-end gap-1.5 h-24 sm:h-28">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`flex-1 rounded-t-md ${
                  i === BARS.length - 1
                    ? "bg-gradient-to-t from-[#ED0807] to-[#ff6b5e]"
                    : "bg-gradient-to-t from-[#1B65A6] to-[#4AB0D9]"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tarjeta flotante: crecimiento */}
      <motion.div style={near} className="absolute -top-1 right-0 sm:-right-6 z-10">
        <div
          className="flex items-center gap-3 rounded-xl bg-white text-[#010066] px-4 py-3 shadow-2xl"
          style={{ animation: "floatA 7s ease-in-out infinite" }}
        >
          <span className="w-9 h-9 rounded-lg bg-[#4AB0D9]/15 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#1B65A6]" />
          </span>
          <div>
            <p className="text-[11px] text-[#010066]/60 leading-none">Ventas este mes</p>
            <p className="text-sm font-bold mt-1">+38% vs. anterior</p>
          </div>
        </div>
      </motion.div>

      {/* Tarjeta flotante: automatización */}
      <motion.div style={far} className="absolute top-2 -left-2 sm:-left-10 z-10 hidden sm:block">
        <div
          className="flex items-center gap-2.5 rounded-full bg-[#010066] border border-[#4AB0D9]/40 px-4 py-2.5 shadow-xl shadow-[#4AB0D9]/20"
          style={{ animation: "floatB 8s ease-in-out 1s infinite" }}
        >
          <Zap className="w-4 h-4 text-[#4AB0D9]" />
          <span className="text-xs font-semibold text-white">Automatización activa</span>
          <span className="w-2 h-2 rounded-full bg-[#4AB0D9]" style={{ animation: "pulseGreen 2s infinite" }} />
        </div>
      </motion.div>

      {/* Mascota BeMaker con globo de diálogo */}
      <motion.div style={far} className="absolute -bottom-14 -left-3 sm:-bottom-20 sm:-left-16 z-20 w-28 sm:w-40">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 120, damping: 12 }}
          whileHover={{ rotate: [0, -6, 6, -3, 0], transition: { duration: 0.6 } }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
            className="absolute -top-9 left-[68%] whitespace-nowrap rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[11px] sm:text-xs font-semibold text-[#010066] shadow-xl origin-bottom-left"
          >
            ¡Hola! ¿Automatizamos algo?
          </motion.span>
          <img
            src="/brand/bebo.png"
            alt=""
            width={700}
            height={942}
            className="w-full h-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]"
            style={{ animation: "floatB 6s ease-in-out infinite" }}
          />
        </motion.div>
      </motion.div>

      {/* Tarjeta flotante: notificación */}
      <motion.div style={near} className="absolute -bottom-2 right-0 sm:right-4 z-10">
        <div
          className="flex items-start gap-3 rounded-xl bg-white text-[#010066] px-4 py-3 shadow-2xl max-w-[240px]"
          style={{ animation: "floatC 9s ease-in-out 0.5s infinite" }}
        >
          <span className="w-9 h-9 rounded-lg bg-[#ED0807]/10 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-[#ED0807]" />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">Nuevo cliente potencial</p>
            <p className="text-[11px] text-[#010066]/60 mt-1">Formulario web · hace 2 min</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
export default function HeroSection() {
  const goTo = useSectionNav();

  return (
    <section className="relative overflow-hidden bg-[#010066] text-white">
      {/* Fondo: cuadrícula + halos de marca */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#1B65A6]/50 blur-[140px]"
        style={{ animation: "drift 12s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -right-32 w-[520px] h-[520px] rounded-full bg-[#ED0807]/25 blur-[150px]"
        style={{ animation: "drift 14s ease-in-out infinite reverse" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-2 gap-14 lg:gap-10 items-center lg:min-h-[min(calc(100svh-68px),880px)]">
        {/* Columna de texto */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-white/80 mb-7"
          >
            <Sparkles className="w-4 h-4 text-[#4AB0D9]" />
            Software y automatización para PYMEs
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[30px] leading-[1.15] sm:text-5xl lg:text-[52px] mb-6"
          >
            Tecnología que hace crecer
            <span className="sr-only"> tu PYME</span>
            <RotatingWord />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-geo font-light text-lg sm:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
          >
            Software listo para usar o desarrollado a tu medida: automatizamos tus
            procesos, digitalizamos tu operación y te ayudamos a vender más, sin
            complicaciones técnicas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <button
              onClick={() => goTo("contacto")}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full bg-[#ED0807] text-white font-semibold shadow-[0_12px_32px_-8px_rgba(237,8,7,0.6)] hover:shadow-[0_16px_40px_-8px_rgba(237,8,7,0.75)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Agendar demo gratuita</span>
              <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => goTo("servicios")}
              className="inline-flex items-center justify-center min-h-[52px] px-8 rounded-full border border-white/25 text-white font-semibold hover:bg-white hover:text-[#010066] active:scale-95 transition-all duration-300"
            >
              Ver soluciones
            </button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-white/65"
          >
            {["Respuesta en menos de 24 h", "Sin costos ocultos", "Soporte local en Chile"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4AB0D9]" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Columna visual */}
        <HeroVisual />
      </div>
    </section>
  );
}
