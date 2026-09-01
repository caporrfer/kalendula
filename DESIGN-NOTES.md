# Dirección de diseño y referencias

## Punto de partida

Kaléndula no funciona como una tienda online con stock y entrega inmediata. El encargo se concreta por conversación, por lo que la web debe enseñar trabajo real, explicar el alcance y conducir a WhatsApp sin fingir carrito, precios ni disponibilidad.

La superficie principal es **decidir/explorar**: la portada orienta y muestra el trabajo; las páginas interiores ayudan a elegir un servicio y preparar una consulta.

## Referencias examinadas

Las referencias se utilizaron para estudiar principios, no para reproducir identidades o layouts:

1. [Saison](https://saison-florist.com/) — tratamiento de estudio creativo, tipografía de alto contraste y fotografía como material principal.
2. [Still Life Flowers](https://www.stilllifeflowers.co.uk/) — separación clara entre bodas, eventos y trabajos editoriales.
3. [24 Seasons of Flowers](https://www.24-seasons-of-flowers.de/) — recorrido de consulta para floristería de bodas.
4. [Biancospino Flowers](https://www.biancospinoflowers.com/) — narrativa visual basada en lugar, textura y escala.
5. [Steph Lovell Flowers](https://www.stephlovellflowers.com/) — entrada directa a bodas, eventos y portfolio.
6. [Flourish and Grace](https://flourishandgrace.com/) — jerarquía editorial y proceso previo a la consulta.
7. [Angie Flowers Studio](https://www.angieflowers.rs/) — información práctica para clientes que planifican un evento.
8. [Daydream Florals](https://daydreamflorals.com/) — paleta suave y fotografía a gran formato.
9. [Moss Floral](https://mossfloralfw.com/) — combinación contenida de rosa, verde, blanco y serif editorial.
10. [Bridal Wild, caso de estudio](https://threegirlsmedia.co.uk/portfolio/florist-bridal-wild/) — galerías de trabajo real antes que promesas genéricas y formulario de consulta corto.

## Decisiones aplicadas

- Mobile-first real: la composición base se diseña entre 320 y 430 px y se amplía después.
- Dirección editorial, no “app móvil”: títulos alineados a la izquierda, filas de servicio y galerías asimétricas.
- Paleta pastel con tinta oscura: papel cálido, melocotón, salvia, lila grisáceo y burdeos.
- `Newsreader` para titulares y `Manrope` para navegación y texto funcional.
- Fotografía real de Kaléndula como protagonista. El wordmark tipográfico evita agrandar el logo rasterizado de 150 px.
- Conversión honesta por WhatsApp: cada CTA corresponde a una conversación real; no hay carrito ni confirmaciones falsas.
- Datos empresariales centralizados para evitar contradicciones entre páginas.
- Páginas específicas para servicios, bodas/eventos y contacto, además de legales y 404.

## Auditoría anti-IA

Se evitaron deliberadamente:

- hero centrado con degradado y dos botones equivalentes;
- secuencias repetidas de tres tarjetas con iconos;
- glassmorphism, blobs, brillos y degradados tecnológicos;
- radios idénticos en cada bloque;
- estadísticas, testimonios, premios o disponibilidad inventados;
- copy intercambiable con cualquier floristería;
- componentes de librería sin adaptar;
- texto centrado en todas las secciones;
- decoración que compita con las fotografías;
- animaciones de entrada que retrasen el contenido.

La composición se apoya en escala tipográfica, líneas, contraste de superficies y ritmos fotográficos. El objetivo no es parecer lujosa por acumulación de efectos, sino ordenada, específica y segura de su material.

## Tokens principales

- Papel: `#f5f0e8`
- Tinta: `#26332b`
- Salvia: `#bcc8b4`
- Melocotón: `#e7c3b5`
- Lila: `#c9c6d8`
- Burdeos: `#713d4b`

Los tokens completos y sus usos viven en `src/styles/global.css`.
