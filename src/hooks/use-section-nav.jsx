import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Navega a una sección del Home desde cualquier página.
 * En "/" hace scroll suave; en otra ruta navega a "/#id" y el Home
 * se encarga del scroll al montar. */
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id) => {
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${id}`);
      } else {
        navigate(`/#${id}`);
      }
    },
    [location.pathname, navigate]
  );
}

/* Devuelve el id de la sección visible para resaltar el menú. */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
