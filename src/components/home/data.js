/* ------------------------------------------------------------------
 * Contenido de la landing page.
 * Edita aquí textos, servicios, métricas y testimonios sin tocar el
 * markup de las secciones.
 * ------------------------------------------------------------------ */
import {
  Activity,
  HardHat,
  Rocket,
  LayoutDashboard,
  Workflow,
  Smartphone,
  Plug,
  Compass,
  Eye,
  HeartHandshake,
  Lightbulb,
  Users,
  ShieldCheck,
  Accessibility,
  Gem,
} from "lucide-react";

/* ---------------- Navegación ---------------- */
// `id` = sección del Home; `to` = ruta independiente.
export const NAV_LINKS = [
  { label: "Nosotros", id: "nosotros" },
  { label: "Servicios", id: "servicios" },
  { label: "Casos de éxito", id: "casos" },
  { label: "Portafolio", to: "/Portafolio" },
  { label: "Contacto", id: "contacto" },
];

/* ---------------- Contacto ---------------- */
export const CONTACT = {
  email: "contacto@bemaker.cl",
  phone: "+56 9 3456 7890",
  phoneHref: "+56934567890",
  city: "Santiago, Chile",
  hours: "Lun – Vie, 9:00 – 18:00",
  socials: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
};

/* ---------------- Sobre nosotros ---------------- */
export const ABOUT_TABS = [
  {
    value: "mision",
    label: "Misión",
    icon: Compass,
    title: "Hacer que la tecnología trabaje para tu negocio",
    text: "Facilitamos el éxito de las PYMEs con software innovador, rápido y centrado en el usuario final: herramientas que eliminan tareas repetitivas y dejan tiempo para lo que importa.",
    points: [
      "Soluciones que se entienden desde el primer uso",
      "Entregas rápidas, iterativas y medibles",
      "Acompañamiento después del lanzamiento",
    ],
  },
  {
    value: "vision",
    label: "Visión",
    icon: Eye,
    title: "Ser el socio tecnológico de confianza de las PYMEs",
    text: "Queremos que cada empresa, sin importar su tamaño, pueda transformar sus ideas en productos digitales de alto impacto y competir con las mismas herramientas que las grandes.",
    points: [
      "Tecnología accesible para empresas de todo tamaño",
      "Relaciones de largo plazo, no proyectos aislados",
      "Innovación aplicada a problemas reales",
    ],
  },
  {
    value: "valores",
    label: "Valores",
    icon: HeartHandshake,
    title: "Lo que guía cada línea de código",
    text: "Nuestros valores definen cómo trabajamos contigo y con tu equipo.",
    values: [
      { icon: Lightbulb, name: "Innovación", desc: "Buscamos la solución más simple y efectiva." },
      { icon: Users, name: "Colaboración", desc: "Construimos contigo, no solo para ti." },
      { icon: Gem, name: "Calidad", desc: "Código limpio, probado y escalable." },
      { icon: ShieldCheck, name: "Integridad", desc: "Transparencia en plazos y costos." },
      { icon: Accessibility, name: "Accesibilidad", desc: "Diseño pensado para todas las personas." },
    ],
  },
];

/* ---------------- Servicios ---------------- */
export const PREBUILT_SOFTWARE = [
  {
    id: "trazapro",
    name: "TrazaPro",
    tagline: "Trazabilidad de pedidos en tiempo real",
    icon: Activity,
    badge: "Más popular",
    badgeTone: "accent",
    meta: "Implementación rápida",
    features: [
      "Seguimiento de pedidos por estado",
      "Notificaciones automáticas a clientes",
      "Dashboard con métricas en vivo",
      "Reportes exportables",
    ],
  },
  {
    id: "gestionobra",
    name: "GestiónObra",
    tagline: "Gestión de proyectos, obras e inventario",
    icon: HardHat,
    badge: "Web + Móvil",
    badgeTone: "primary",
    meta: "Multiplataforma",
    features: [
      "Control de inventario y materiales",
      "Tableros de tareas por cuadrilla",
      "Control presupuestario",
      "Reportes automáticos de avance",
    ],
  },
  {
    id: "landing-express",
    name: "Landing Express",
    tagline: "Landing page de alta conversión",
    icon: Rocket,
    badge: "Nuevo",
    badgeTone: "primary",
    meta: "Lista para lanzar",
    features: [
      "Diseño responsive con tu marca",
      "Formularios conectados a tu correo o CRM",
      "Optimizada para velocidad y SEO",
      "Analítica de visitas y conversiones",
    ],
  },
];

export const CUSTOM_SOLUTIONS = [
  {
    id: "web-a-medida",
    name: "Desarrollo web a medida",
    icon: LayoutDashboard,
    desc: "Portales, intranets y sistemas internos diseñados alrededor de tu flujo de trabajo, no al revés.",
  },
  {
    id: "automatizacion",
    name: "Automatización de procesos",
    icon: Workflow,
    desc: "Eliminamos planillas, correos manuales y tareas repetitivas conectando tus herramientas.",
  },
  {
    id: "apps-moviles",
    name: "Apps móviles",
    icon: Smartphone,
    desc: "Aplicaciones para tu equipo en terreno o para tus clientes, en iOS y Android.",
  },
  {
    id: "integraciones",
    name: "Integraciones y APIs",
    icon: Plug,
    desc: "Conectamos tu ERP, CRM, facturación o pasarela de pagos para que los datos fluyan solos.",
  },
];

export const CUSTOM_PROCESS = [
  { number: "01", title: "Diagnóstico", desc: "Entendemos tu negocio, tus metas y los procesos que hoy te quitan tiempo." },
  { number: "02", title: "Diseño UX/UI", desc: "Prototipamos interfaces intuitivas y las validamos con tu equipo." },
  { number: "03", title: "Desarrollo", desc: "Construimos en ciclos cortos para que veas avances cada semana." },
  { number: "04", title: "Lanzamiento", desc: "Desplegamos, capacitamos y te acompañamos en el crecimiento." },
];

// Opciones del formulario de contacto (derivadas de los servicios).
export const SERVICE_OPTIONS = [
  ...PREBUILT_SOFTWARE.map((s) => s.name),
  ...CUSTOM_SOLUTIONS.map((s) => s.name),
  "Aún no lo sé",
];

/* ---------------- Prueba social ---------------- */
// TODO: reemplazar con métricas reales de BeMaker.
export const METRICS = [
  { value: 40, suffix: "%", label: "menos tiempo administrativo en nuestros clientes" },
  { value: 24, suffix: "h", label: "tiempo máximo de respuesta a consultas" },
  { value: 10, prefix: "+", label: "procesos automatizados para PYMEs" },
  { value: 100, suffix: "%", label: "proyectos responsive y accesibles" },
];

export const TESTIMONIALS = [
  {
    quote: "Gracias a BeMaker pudimos digitalizar nuestro sistema de trazabilidad en tiempo récord. El diseño es increíblemente intuitivo.",
    author: "Lavandería DeLaCruz",
    role: "Sistema de trazabilidad",
  },
  {
    quote: "Lograron entender lo que necesitábamos para gestionar inventarios y trabajos de manera eficiente. Su equipo es profesional y muy atento.",
    author: "Construcciones V&G",
    role: "Gestión de inventario y obras",
  },
  {
    quote: "Soporte rápido y código impecable. Totalmente recomendados para cualquier PYME que quiera profesionalizarse.",
    author: "Construcciones V&G",
    role: "Soporte y mantención",
  },
];

export const CLIENT_LOGOS = [
  {
    name: "Construcciones V&G",
    image_url:
      "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/ff0da3d74_bemaker_cl_Contru_436f585d.png",
  },
  {
    name: "DeLaCruz Lavandería",
    image_url:
      "https://media.base44.com/images/public/6aa31f5575f766e47f89b72f/84c97e7a6_bemaker_cl_delacruz_edb07b4f.png",
  },
];
