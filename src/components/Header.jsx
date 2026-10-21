import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, Moon, Sun, Store } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useActiveSection, useSectionNav } from "@/hooks/use-section-nav";
import { NAV_LINKS } from "@/components/home/data";

const SECTION_IDS = NAV_LINKS.filter((l) => l.id).map((l) => l.id);

export default function Header() {
  const location = useLocation();
  const goTo = useSectionNav();
  const active = useActiveSection(SECTION_IDS, location.pathname === "/");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("bemaker-theme") === "dark";
    } catch {
      return false;
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("bemaker-theme", isDark ? "dark" : "light");
    } catch {
      /* almacenamiento no disponible */
    }
  }, [isDark]);

  const isActive = (link) => (link.to ? location.pathname === link.to : active === link.id);

  const handleSection = (id) => {
    setOpen(false);
    goTo(id);
  };

  /* Enlace de navegación: ruta (Link) o sección del Home (botón). */
  const renderLink = (link, mobile = false) => {
    const base = mobile
      ? "min-h-[44px] flex items-center text-base"
      : "relative py-2 text-sm after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent after:transition-all after:duration-300";
    const state = isActive(link)
      ? `text-secondary-foreground font-semibold ${mobile ? "" : "after:w-full"}`
      : `text-secondary-foreground/70 hover:text-secondary-foreground ${mobile ? "" : "after:w-0 hover:after:w-full"}`;
    const className = `${base} ${state} transition-colors duration-200`;

    return link.to ? (
      <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className={className}>
        {link.label}
      </Link>
    ) : (
      <button key={link.label} onClick={() => handleSection(link.id)} className={`${className} text-left`}>
        {link.label}
      </button>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 text-secondary-foreground transition-all duration-300 ${
        scrolled
          ? "bg-secondary/85 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/40"
          : "bg-secondary border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[68px]">
        <Link to="/" className="flex items-center min-h-[44px] group" aria-label="BeMaker, inicio">
          <img
            src="/brand/LOGO%20BEMAKER-14%20copy.PNG"
            alt="BeMaker"
            className="brand-logo brand-logo-light h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <img
            src="/brand/LOGO%20BEMAKER-16%20copy.png"
            alt="BeMaker"
            className="brand-logo brand-logo-dark h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-medium" aria-label="Principal">
          {NAV_LINKS.map((link) => renderLink(link))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            aria-label="Ir a la tienda"
            title="Ir a la tienda"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-foreground/5 hover:bg-secondary-foreground/10 transition-colors duration-300"
          >
            <Store className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Cambiar tema"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-foreground/5 hover:bg-secondary-foreground/10 transition-colors duration-300"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => goTo("contacto")}
            className="group inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            Agendar demo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Cambiar tema"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-secondary-foreground/10 transition-colors duration-300"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
                className="text-secondary-foreground hover:bg-secondary-foreground/10 w-11 h-11"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-secondary text-secondary-foreground border-border/10">
              <nav className="flex flex-col gap-4 mt-10 font-medium" aria-label="Móvil">
                {NAV_LINKS.map((link) => renderLink(link, true))}
                <a
                  href="#"
                  onClick={() => setOpen(false)}
                  className="min-h-[44px] flex items-center gap-3 text-secondary-foreground/70 hover:text-secondary-foreground"
                >
                  <Store className="w-5 h-5" />
                  Ir a la tienda
                </a>
                <div className="pt-6 mt-2 border-t border-border/20">
                  <button
                    onClick={() => handleSection("contacto")}
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-accent text-accent-foreground text-sm font-semibold"
                  >
                    Agendar demo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
