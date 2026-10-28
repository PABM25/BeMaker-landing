# BeMaker — sitio web

Sitio de [bemaker.cl](https://bemaker.cl): portada con servicios, casos de éxito, portafolio y contacto.

## Stack

- React 18 + Vite
- Tailwind CSS y componentes de shadcn/ui (Radix)
- Framer Motion para las animaciones
- React Router (`/`, `/Portafolio`, `/Contacto`)

## Desarrollo

```bash
npm install
cp .env.example .env    # configura el formulario de contacto
npm run dev
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor local con recarga en caliente |
| `npm run build` | Compila el sitio en `dist/` |
| `npm run lint` | Revisa el código con ESLint |
| `npm run preview` | Sirve la versión compilada |

## Formulario de contacto

El formulario de la portada y el de `/Contacto` son el mismo componente: `src/components/ContactForm.jsx`. El envío está en `src/lib/sendContact.js`.

- Con `VITE_CONTACT_ENDPOINT` configurada, envía los datos por POST (JSON) a esa URL. Funciona con [Formspree](https://formspree.io) sin cambios.
- Sin la variable, abre el cliente de correo del visitante con el mensaje ya escrito para `contacto@bemaker.cl`.

En el hosting (Vercel, Netlify, etc.) agrega `VITE_CONTACT_ENDPOINT` en las variables de entorno del proyecto.

## Datos del sitio

Textos, servicios, métricas y datos de contacto están en `src/components/home/data.js`.
