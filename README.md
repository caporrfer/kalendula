# Kaléndula Atelier

Web corporativa estática para Kaléndula Atelier, floristería y decoración de eventos en Corrales (Huelva). Dirección visual editorial, mobile first y conversión principal mediante WhatsApp.

## Tecnología

- Astro + TypeScript
- CSS propio sin framework ni JavaScript de terceros
- Sitemap, metadatos sociales y JSON-LD `Florist`/`LocalBusiness`
- Imagen Docker multi-stage (Node para compilar + Nginx para servir)

## Desarrollo

```bash
npm install
npm run check
npm run build
```

No hace falta levantar un servidor para generar la web. El resultado estático se escribe en `dist/`.

## Docker

```bash
docker compose build
docker compose up -d
```

El contenedor publica Nginx en el puerto `8080` del host. Puede cambiarse en `docker-compose.yml`.

## Estructura

- `src/pages/index.astro`: contenido y estructura de la página principal.
- `src/components/Header.astro`: cabecera responsive y navegación móvil.
- `src/layouts/`: metadatos, Schema.org y plantillas legales.
- `src/styles/global.css`: sistema visual y breakpoints.
- `public/images/`: imágenes y registro de procedencia.

## Antes de publicar

1. Sustituir las imágenes provisionales por fotografías autorizadas del negocio, manteniendo los nombres. Consultar `public/images/SOURCES.md`.
2. Confirmar el dominio final y cambiar `site` en `astro.config.mjs`, canonical, sitemap y `robots.txt` si fuese distinto.
3. Completar los datos legales del titular y encargar revisión jurídica de los textos legales.
4. Verificar que teléfono, dirección y servicios siguen vigentes.

Los datos visibles del negocio están centralizados en `src/pages/index.astro`, `src/components/Header.astro` y el JSON-LD de `src/layouts/BaseLayout.astro`.

## Despliegue

Cada `push` a `main` ejecuta `.github/workflows/deploy-pages.yml`, comprueba el proyecto, genera `dist/index.html` y publica ese directorio en GitHub Pages. La URL configurada es:

`https://caporrfer.github.io/kalendula/`

En la configuración del repositorio, **Settings → Pages → Source** debe estar seleccionado **GitHub Actions**. También puede desplegarse en cualquier hosting que sirva `dist/` o mediante `docker build -t kalendula .`.

La compilación usa `/` como ruta base por defecto, por lo que funciona directamente en Vercel. El workflow de GitHub Pages define `BASE_PATH=/kalendula/` y `SITE_URL=https://caporrfer.github.io` durante su propia compilación.
