import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const routes = [
  'dist/index.html',
  'dist/servicios/index.html',
  'dist/bodas-eventos/index.html',
  'dist/contacto/index.html',
  'dist/404.html',
];

test('build produces every customer-facing route', () => {
  for (const route of routes) {
    assert.equal(existsSync(route), true, `Missing ${route}`);
  }
});

test('every customer-facing page has core mobile and SEO metadata', () => {
  for (const route of routes.slice(0, -1)) {
    const html = readFileSync(route, 'utf8');
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
    assert.match(html, /<link rel="canonical"/);
    assert.match(html, /<meta property="og:image"/);
    assert.match(html, /Saltar al contenido/);
  }
});

test('primary routes expose a real contact path without fake checkout UI', () => {
  for (const route of routes.slice(0, -1)) {
    const html = readFileSync(route, 'utf8');
    assert.match(html, /wa\.me\/34623164848/);
    assert.doesNotMatch(html, /Añadir al carrito|Finalizar compra|Comprar ahora/);
  }
});

test('visible link marks use CSS instead of emoji-style arrow glyphs', () => {
  for (const route of routes) {
    const html = readFileSync(route, 'utf8');
    assert.doesNotMatch(html, /↗/);
    assert.match(html, /class="link-mark"/);
  }
});

test('mobile identity keeps the real logo and an icon-only WhatsApp control', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.match(html, /images\/logo-header\.webp/);
  assert.match(html, /class="mobile-whatsapp"[^>]*aria-label="Escribir por WhatsApp"[^>]*>\s*<svg/);
  assert.doesNotMatch(html, /class="hero-note"|class="feature-caption"/);
  const css = readFileSync('src/styles/global.css', 'utf8');
  assert.match(css, /touch-action:\s*manipulation/);
});

test('mobile navigation has no duplicate WhatsApp action and uses the daisy pattern', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const navigation = html.match(/<nav id="main-navigation"[\s\S]*?<\/nav>/)?.[0] ?? '';
  assert.doesNotMatch(navigation, /WhatsApp/);
  const css = readFileSync('src/styles/global.css', 'utf8');
  assert.match(css, /\.site-header\s*\{[^}]*position:\s*fixed/);
  assert.match(css, /daisy-pattern\.svg/);
  assert.match(css, /scroll-padding-top:\s*76px/);
});
