import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Reveal, SectionHeading } from "./Reveal";
import { CONTACT } from "./data";

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
