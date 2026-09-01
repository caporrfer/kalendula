# Kaléndula Atelier

Web corporativa de Kaléndula Atelier, floristería y estudio de decoración floral en Corrales (Huelva). El proyecto prioriza la consulta por WhatsApp y una experiencia mobile-first entre 320 y 430 px.

## Páginas

- `/`: presentación, servicios, selección de trabajos y acceso rápido a consultas.
- `/servicios/`: ramos, flor preservada y decoración de espacios.
- `/bodas-eventos/`: bodas, celebraciones y datos necesarios para solicitar una propuesta.
- `/contacto/`: teléfono, ubicación, Instagram y formulario que prepara la consulta en WhatsApp.
- `/aviso-legal/`, `/privacidad/`, `/cookies/` y `/404.html`.

## Tecnología

- Astro 7 + TypeScript.
- CSS propio sin framework de componentes.
- Sitemap, metadatos sociales y JSON-LD `Florist`/`LocalBusiness`.
- Pruebas estáticas con `node:test` y QA visual con Playwright.
- Imagen Docker multi-stage para servir el sitio estático con Nginx.

## Desarrollo

```bash
npm ci
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:4321`.

## Verificación

```bash
npm run check
npm test
npm run qa:visual
```

`npm test` genera el sitio y comprueba rutas, metadatos móviles, SEO y vías de contacto reales. `npm run qa:visual` requiere que el servidor esté activo en `http://127.0.0.1:4321`; revisa cuatro rutas en 320, 360, 375, 390, 412, 430, 768 y 1440 px, abre y cierra el menú móvil, detecta overflow horizontal y registra errores de consola.

Para instalar Chromium en un equipo nuevo:

```bash
npx playwright install chromium
```

## Contenido del negocio

Los datos reutilizados están centralizados en `src/data/site.ts`. Antes de publicar, confirma:

1. teléfono, dirección, servicios y perfil de Instagram;
2. derechos de publicación de las fotografías, especialmente las de eventos;
3. dominio final en `astro.config.mjs`, canonical, sitemap y `robots.txt`;
4. datos del titular y revisión jurídica de los textos legales.

La procedencia conocida de las imágenes está documentada en `public/images/SOURCES.md`.

## Despliegue

```bash
npm run build
```

El resultado se escribe en `dist/`. También puede construirse con Docker:

```bash
docker compose build
docker compose up -d
```

El contenedor publica Nginx en el puerto `8080`. El workflow de GitHub Pages compila con `/kalendula/` como ruta base; una compilación normal usa `/` para funcionar en hosting propio o Vercel.
