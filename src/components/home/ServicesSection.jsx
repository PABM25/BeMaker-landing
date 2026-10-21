import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Boxes, Check, Clock, Wrench } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { Reveal, SectionHeading, SpotlightCard } from "./Reveal";
import { CUSTOM_PROCESS, CUSTOM_SOLUTIONS, PREBUILT_SOFTWARE } from "./data";

const CATEGORIES = [
  { value: "prefabricado", label: "Software listo para usar", short: "Listo para usar", icon: Boxes },
  { value: "a-medida", label: "Soluciones a medida", short: "A medida", icon: Wrench },
];

const BADGE_TONES = {
  accent: "bg-accent text-accent-foreground",
  primary: "bg-primary/10 text-primary",
};

/* Botón "Solicitar información" reutilizado por todas las tarjetas. */
function RequestButton({ service, onRequest, variant = "solid" }) {
  const styles =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
      : "border border-border text-foreground hover:border-primary hover:text-primary";
  return (
    <button
      onClick={() => onRequest(service)}
      className={`group/btn inline-flex items-center justify-center gap-2 w-full min-h-[44px] px-5 rounded-full text-sm font-semibold active:scale-95 transition-all duration-300 ${styles}`}
    >
      Solicitar información
      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
    </button>
  );
}

/* ---------------- Software prefabricado ---------------- */
function PrebuiltGrid({ onRequest }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PREBUILT_SOFTWARE.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpotlightCard>
            <article className="flex flex-col h-full p-7 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#010066] to-[#1B65A6] flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                  <s.icon className="w-6 h-6 text-white" />
                </span>
                <span className={`text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1 ${BADGE_TONES[s.badgeTone]}`}>
                  {s.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-card-foreground">{s.name}</h3>
              <p className="text-sm text-card-foreground/65 mt-1 mb-6">{s.tagline}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-card-foreground/85">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
                <Clock className="w-3.5 h-3.5" />
                {s.meta}
              </p>
              <RequestButton service={s.name} onRequest={onRequest} />
            </article>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Soluciones a medida ---------------- */
function CustomGrid({ onRequest }) {
  return (
    <div className="space-y-14">
      <div className="grid sm:grid-cols-2 gap-6">
        {CUSTOM_SOLUTIONS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <SpotlightCard>
              <article className="flex flex-col sm:flex-row gap-5 h-full p-7">
                <span className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:bg-accent group-hover:scale-110">
                  <s.icon className="w-5 h-5 text-accent transition-colors duration-500 group-hover:text-accent-foreground" />
                </span>
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{s.name}</h3>
                  <p className="text-sm text-card-foreground/70 leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <div className="sm:max-w-[240px]">
                    <RequestButton service={s.name} onRequest={onRequest} variant="outline" />
                  </div>
                </div>
              </article>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Cómo personalizamos: proceso en 4 pasos */}
      <div className="rounded-3xl bg-[#010066] text-white p-8 sm:p-12 relative overflow-hidden">
        <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#4AB0D9]/25 blur-[100px]" />
        <h3 className="relative text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Cómo adaptamos el software a tu empresa
        </h3>
        <p className="relative text-white/65 mb-10 max-w-2xl">
          Partimos de tus procesos reales y construimos en ciclos cortos para que veas avances cada semana.
        </p>
        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOM_PROCESS.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.08] hover:border-[#4AB0D9]/50 transition-colors duration-300"
            >
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#4AB0D9] to-white/40">
                {step.number}
              </span>
              <h4 className="text-lg font-bold mt-3 mb-2">{step.title}</h4>
              <p className="text-sm text-white/65 leading-relaxed">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------------- Sección de servicios ---------------- */
export default function ServicesSection({ onRequestInfo }) {
  const [category, setCategory] = useState(CATEGORIES[0].value);

  return (
    <section id="servicios" className="relative scroll-mt-20 bg-muted/40 py-24 sm:py-32 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Servicios y software"
          title="Elige cómo quieres digitalizar tu negocio"
          subtitle="Empieza hoy con software probado o construyamos juntos la herramienta exacta que tu empresa necesita."
          className="mb-12"
        />

        <Tabs.Root value={category} onValueChange={setCategory}>
          <Reveal className="flex justify-center mb-12">
            <Tabs.List className="inline-flex items-center rounded-full bg-card border border-border p-1.5 shadow-sm">
              {CATEGORIES.map((c) => (
                <Tabs.Trigger
                  key={c.value}
                  value={c.value}
                  className="relative inline-flex items-center justify-center whitespace-nowrap min-h-[44px] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-4 sm:px-6 gap-2 text-sm font-semibold text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-white dark:data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                >
                  {category === c.value && (
                    <motion.span
                      layoutId="services-tab-pill"
                      className="absolute inset-0 rounded-full bg-[#010066] dark:bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <c.icon className="relative w-4 h-4" />
                  <span className="relative hidden sm:inline">{c.label}</span>
                  <span className="relative sm:hidden">{c.short}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Reveal>

          <Tabs.Content value="prefabricado" className="focus-visible:outline-none">
            <PrebuiltGrid onRequest={onRequestInfo} />
          </Tabs.Content>
          <Tabs.Content value="a-medida" className="focus-visible:outline-none">
            <CustomGrid onRequest={onRequestInfo} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>
  );
}
