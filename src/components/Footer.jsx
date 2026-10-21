import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { useSectionNav } from "@/hooks/use-section-nav";
import { CONTACT, CUSTOM_SOLUTIONS, NAV_LINKS, PREBUILT_SOFTWARE } from "@/components/home/data";

const SOCIALS = [
  { label: "LinkedIn", href: CONTACT.socials.linkedin, icon: Linkedin },
  { label: "Instagram", href: CONTACT.socials.instagram, icon: Instagram },
  { label: "Facebook", href: CONTACT.socials.facebook, icon: Facebook },
];

const linkClass =
  "text-secondary-foreground/70 hover:text-primary transition-colors duration-200 min-h-[36px] inline-flex items-center text-left";

export default function Footer() {
  const goTo = useSectionNav();
  const solutions = [...PREBUILT_SOFTWARE, ...CUSTOM_SOLUTIONS.slice(0, 2)];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondary text-secondary-foreground border-t border-border/10">
      {/* Brand accent line */}
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,#010066_75%,#ED0807_75%)]" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-12 gap-10">
        <div className="col-span-2 lg:col-span-4">
          <Link to="/" className="inline-flex items-center min-h-[44px] mb-4">
            <img
              src="/brand/LOGO%20BEMAKER-14%20copy.PNG"
              alt="BeMaker"
              loading="lazy"
              className="brand-logo brand-logo-light h-8 w-auto object-contain"
            />
            <img
              src="/brand/LOGO%20BEMAKER-16%20copy.png"
              alt="BeMaker"
              loading="lazy"
              className="brand-logo brand-logo-dark h-8 w-auto object-contain"
            />
          </Link>
          <p className="text-secondary-foreground/60 text-sm max-w-sm leading-relaxed mb-6">
            Software listo para usar y desarrollo a medida para PYMEs. Tecnología
            que automatiza tu operación y te ayuda a escalar con confianza.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary-foreground/5 hover:bg-[#ED0807] hover:text-white hover:-translate-y-0.5 transition-all duration-300"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-foreground/50 mb-4">
            Navegación
          </h4>
          <ul className="space-y-1.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                ) : (
                  <button onClick={() => goTo(link.id)} className={linkClass}>
                    {link.label}
                  </button>
                )}
              </li>
            ))}
            <li>
              <a href="#" className={linkClass}>
                Ir a la tienda
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-foreground/50 mb-4">
            Soluciones
          </h4>
          <ul className="space-y-1.5 text-sm">
            {solutions.map((s) => (
              <li key={s.id}>
                <button onClick={() => goTo("servicios")} className={linkClass}>
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-secondary-foreground/50 mb-4">
            Contacto
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a href={`mailto:${CONTACT.email}`} className={`${linkClass} gap-2.5`}>
                <Mail className="w-4 h-4 text-primary" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneHref}`} className={`${linkClass} gap-2.5`}>
                <Phone className="w-4 h-4 text-primary" />
                {CONTACT.phone}
              </a>
            </li>
            <li className="text-secondary-foreground/70 min-h-[36px] inline-flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-primary" />
              {CONTACT.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} BeMaker. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
