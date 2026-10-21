import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { Reveal, SectionHeading } from "./Reveal";
import { ABOUT_TABS } from "./data";

/* ---------------- Sobre Nosotros: Misión / Visión / Valores en pestañas ---------------- */
export default function AboutSection() {
  const [tab, setTab] = useState(ABOUT_TABS[0].value);

  return (
    <section id="nosotros" className="relative scroll-mt-20 bg-background py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="Sobre nosotros"
            title="Mentes apasionadas construyendo el futuro digital de las PYMEs"
            subtitle="Creemos en el diseño accesible para resolver problemas reales y en la tecnología para escalar negocios. Somos un equipo de diseño, desarrollo y automatización que trabaja codo a codo contigo."
          />
          <Reveal delay={0.15} className="mt-10">
            <div className="group relative flex items-end gap-5 rounded-3xl bg-[#F2E6D8] dark:bg-card dark:border dark:border-border px-6 pt-6 overflow-hidden">
              <img
                src="/brand/mascota-frente.png"
                alt="Mascota de BeMaker"
                width={334}
                height={461}
                loading="lazy"
                className="w-24 sm:w-28 h-auto -mb-3 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-3"
              />
              <p className="pb-6 text-sm sm:text-base text-[#010066] dark:text-card-foreground leading-relaxed">
                <strong className="block font-bold">Cercanos, innovadores y directos.</strong>
                Así acompañamos a cada cliente, desde la primera idea hasta el soporte post-lanzamiento.
              </p>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,#010066_75%,#ED0807_75%)]" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Tabs.Root value={tab} onValueChange={setTab} className="rounded-3xl bg-card border border-border shadow-sm p-3 sm:p-4">
            <Tabs.List className="grid grid-cols-3 w-full h-auto rounded-2xl bg-muted p-1.5">
              {ABOUT_TABS.map((t) => (
                <Tabs.Trigger
                  key={t.value}
                  value={t.value}
                  className="relative inline-flex items-center justify-center whitespace-nowrap min-h-[44px] rounded-xl gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm font-semibold text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                >
                  {tab === t.value && (
                    <motion.span
                      layoutId="about-tab-pill"
                      className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <t.icon className="relative w-4 h-4 hidden sm:block" />
                  <span className="relative">{t.label}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {ABOUT_TABS.map((t) => (
              <Tabs.Content key={t.value} value={t.value} className="focus-visible:outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="p-5 sm:p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <t.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-card-foreground mb-4">
                    {t.title}
                  </h3>
                  <p className="text-card-foreground/70 leading-relaxed mb-7">{t.text}</p>

                  {t.points && (
                    <ul className="space-y-3">
                      {t.points.map((p, i) => (
                        <motion.li
                          key={p}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.08 }}
                          className="flex items-start gap-3 text-sm sm:text-base text-card-foreground/85"
                        >
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-accent" />
                          </span>
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {t.values && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {t.values.map((v, i) => (
                        <motion.div
                          key={v.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                          className="group flex items-start gap-3 rounded-xl border border-border p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors duration-300"
                        >
                          <v.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                          <div>
                            <p className="font-semibold text-card-foreground">{v.name}</p>
                            <p className="text-sm text-card-foreground/65 leading-snug mt-0.5">{v.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Reveal>
      </div>
    </section>
  );
}
