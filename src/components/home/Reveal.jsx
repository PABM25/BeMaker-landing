import { motion } from "framer-motion";

/* Aparición suave al entrar en el viewport (respeta prefers-reduced-motion
 * gracias al <MotionConfig reducedMotion="user"> del Home). */
export function Reveal({ children, className = "", delay = 0, y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Encabezado estándar de sección: eyebrow + título + subtítulo. */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", className = "" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-3xl ${alignment} ${className}`}>
      <p className="inline-flex items-center gap-2 text-accent font-semibold tracking-[0.2em] text-xs uppercase mb-4">
        <span className="w-6 h-px bg-accent" />
        {eyebrow}
      </p>
      <h2 className="text-[26px] sm:text-4xl lg:text-[40px] leading-[1.18] text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 font-geo font-light text-lg sm:text-xl text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* Tarjeta con "spotlight": un halo de luz sigue al cursor. */
export function SpotlightCard({ children, className = "" }) {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handleMove}
      className={`group relative h-full rounded-2xl bg-card text-card-foreground border border-border overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_48px_-20px_hsl(var(--primary)/0.35)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), hsl(var(--primary) / 0.12), transparent 60%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
