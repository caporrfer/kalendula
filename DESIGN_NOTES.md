# Kaléndula — Herbario contemporáneo

## Concepto y dirección artística

La propuesta presenta Kaléndula como un atelier floral de autor: cercano y artesanal, pero con una dirección editorial de gama alta. La composición combina fondos botánicos profundos, papel cálido, un acento coral y un verde lima suave. La fotografía ocupa el papel principal; los elementos de interfaz son deliberadamente sobrios.

La tesis visual es: **un herbario contemporáneo que convierte la imperfección natural de las flores en una experiencia editorial clara y cálida**.

## Investigación y referencias

- [Floom](https://www.floom.com/us): claridad del valor artesanal, proceso y compra por ocasión.
- [UrbanStems](https://urbanstems.com/): CTA inmediato, jerarquía móvil y uso de fotografía de producto.
- [Winston Flowers — Weddings & Events](https://www.winstonflowers.com/weddings-and-events): tratamiento consultivo de bodas y separación de líneas de servicio.
- [Scotts Flowers NYC](https://www.scottsflowersnyc.com/): acceso directo a contacto y servicio local.
- OpenAI `frontend-skill`: composición contenida, imagen protagonista, secciones con una única función y movimiento útil.
- OpenAI `imagegen`: generación de assets, conservación local, documentación y optimización posterior.

Estas referencias se utilizaron para identificar patrones, no para reproducir composiciones, textos o identidad visual.

## Sistema visual

- Tipografía display: Italiana.
- Tipografía de interfaz y lectura: DM Sans.
- Verde bosque: `#193329`.
- Papel cálido: `#f2eee5`.
- Terracota de acción: `#b64d3a`; coral claro sobre fondos oscuros: `#ef8c73`.
- Verde polen: `#dce69d`.
- Botones principales: rectangulares y compactos, sin sombras ornamentales.
- Fotografía: encuadres editoriales amplios, textura natural y color contenido.

## Arquitectura y UX

La página se organiza en: hero, atelier, servicios, bodas, proceso de encargo, trabajos reales, consulta y localización. Se evitó añadir ecommerce, precios, horarios, reseñas o condiciones de entrega porque no constan en el repositorio.

WhatsApp es la conversión principal. El formulario solo construye un mensaje y abre WhatsApp; no almacena ni transmite datos a un backend. Los trabajos reales se muestran en una galería independiente de las imágenes conceptuales.

## Decisiones mobile-first

- Hero concebido como una portada vertical y no como una versión comprimida de escritorio.
- Navegación inferior persistente con tres accesos y objetivos táctiles de al menos 48 px.
- Menú superior con filas de 48 px, cierre mediante enlace o tecla Escape.
- Galería horizontal con `scroll-snap`, adecuada para interacción con el pulgar.
- Servicios y proceso se convierten en listas verticales escaneables.
- Formulario de una sola columna por debajo de 800 px, controles de al menos 48 px y `inputmode="tel"`.
- Ajuste tipográfico adicional a 370 px para conservar el reflow sin overflow.

## Imágenes y procedencia

Los archivos `gallery-*.webp`, `hero.webp`, `wedding.webp` y `logo.webp` ya existían en el proyecto y su procedencia está documentada en `public/images/SOURCES.md`.

Se generaron con OpenAI ImageGen tres imágenes conceptuales para la propuesta:

- `ai-bouquet.webp`: ramo de jardín sostenido en un atelier, luz mediterránea suave.
- `ai-workshop.webp`: manos seleccionando tallos sobre una mesa de trabajo artesanal.
- `ai-wedding.webp`: mesa de boda íntima en un patio andaluz al atardecer.

Prompts finales: fotografía editorial fotorrealista, texturas naturales, color contenido, sin texto, logos ni marcas de agua. Las variantes de 768, 1280 y 1440 px se generaron localmente en WebP para `srcset`. Estas imágenes no representan trabajos reales y deben sustituirse por fotografía profesional propia cuando esté disponible.

## Accesibilidad, rendimiento y movimiento

- HTML semántico, un único `h1`, jerarquía de títulos y textos alternativos descriptivos.
- Enlace de salto, foco visible, menú operable por teclado, targets táctiles amplios y contraste alto.
- `prefers-reduced-motion` elimina animaciones y transiciones.
- Imágenes fuera del primer viewport con lazy loading; dimensiones explícitas y `srcset` para evitar descargas excesivas y layout shift.
- Sin nuevas dependencias de producción y JavaScript limitado al menú y al constructor de WhatsApp.

## Validación y posibles mejoras

La entrega se valida con build, Astro Check, revisión de diferencias, navegador Chromium en 360, 390, 430, 768, 1024, 1280 y 1440 px, comprobación de overflow y consola, y auditoría Lighthouse móvil cuando el entorno lo permite.

Mejoras futuras: sesión fotográfica profesional coherente, datos reales de horarios y área de servicio, testimonios verificables y un dominio/canonical definitivo si cambia el actual.
