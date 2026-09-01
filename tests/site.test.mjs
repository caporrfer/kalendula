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
