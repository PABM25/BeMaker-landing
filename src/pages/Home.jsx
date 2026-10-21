import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import ContactSection from "@/components/home/ContactSection";

/* Landing principal:
 * Hero → Sobre nosotros → Servicios → Casos de éxito → Contacto */
export default function Home() {
  const location = useLocation();
  // Servicio elegido desde una tarjeta; `at` permite re-seleccionar el mismo.
  const [preselected, setPreselected] = useState(null);

  // Si se llega con /#seccion desde otra página, hacer scroll a ella.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.hash]);

  const handleRequestInfo = useCallback((service) => {
    setPreselected({ name: service, at: Date.now() });
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col bg-background text-foreground font-sans selection:bg-primary/30">
        <HeroSection />
        <AboutSection />
        <ServicesSection onRequestInfo={handleRequestInfo} />
        <SocialProofSection />
        <ContactSection preselected={preselected} />
      </div>
    </MotionConfig>
  );
}
