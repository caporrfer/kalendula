import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.BASE_URL || 'http://127.0.0.1:4321';
const routes = ['/', '/servicios/', '/bodas-eventos/', '/contacto/'];
const viewports = [320, 360, 375, 390, 412, 430].map((width) => ({ name: `mobile-${width}`, width, height: width <= 360 ? 720 : 844 })).concat([{ name: 'tablet-768', width: 768, height: 1024 }, { name: 'desktop-1440', width: 1440, height: 1000 }]);
mkdirSync('artifacts/visual-qa', { recursive: true });
const browser = await chromium.launch({ headless: true });
const failures = [];
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  for (const route of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((image) => { image.loading = 'eager'; });
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * .8) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      await Promise.all([...document.images].map((image) => image.complete ? image.decode().catch(() => {}) : new Promise((resolve) => image.addEventListener('load', resolve, { once: true }))));
      window.scrollTo(0, 0);
    });
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      undersizedControls: [...document.querySelectorAll('a,button,input,select,textarea')].filter((el) => {
        const box = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return style.display !== 'none' && box.width > 0 && box.height > 0 && (box.height < 44 || box.width < 44);
      }).map((el) => `${el.tagName}:${el.textContent?.trim().slice(0, 28)}`),
    }));
    const slug = route === '/' ? 'home' : route.replaceAll('/', '');
    if (['mobile-320', 'mobile-390', 'desktop-1440'].includes(viewport.name)) await page.screenshot({ path: `artifacts/visual-qa/${slug}-${viewport.name}.png`, fullPage: true });
    if (!response?.ok()) failures.push(`${route} ${viewport.name}: HTTP ${response?.status()}`);
    if (metrics.scrollWidth > metrics.innerWidth) failures.push(`${route} ${viewport.name}: horizontal overflow ${metrics.scrollWidth}/${metrics.innerWidth}`);
    if (errors.length) failures.push(`${route} ${viewport.name}: ${errors.join(' | ')}`);
    if (viewport.width <= 430) {
      const toggle = page.locator('.nav-toggle');
      if (await toggle.count() === 0) {
        failures.push(`${route} ${viewport.name}: mobile menu control is missing`);
      } else {
        await toggle.click();
        if (!(await page.locator('.main-nav').isVisible())) failures.push(`${route} ${viewport.name}: mobile menu did not open`);
        if (!(await page.locator('.main-nav a').first().evaluate((link) => link === document.activeElement))) failures.push(`${route} ${viewport.name}: focus did not enter the mobile menu`);
        await page.keyboard.press('Shift+Tab');
        if (!(await toggle.evaluate((button) => button === document.activeElement))) failures.push(`${route} ${viewport.name}: Shift+Tab did not reach the menu button`);
        await page.keyboard.press('Shift+Tab');
        if (!(await page.locator('.main-nav a').last().evaluate((link) => link === document.activeElement))) failures.push(`${route} ${viewport.name}: reverse focus trap did not wrap to the last link`);
        await page.keyboard.press('Tab');
        if (!(await toggle.evaluate((button) => button === document.activeElement))) failures.push(`${route} ${viewport.name}: forward focus trap did not wrap to the menu button`);
        await page.keyboard.press('Escape');
        if (await page.locator('.main-nav').isVisible()) failures.push(`${route} ${viewport.name}: mobile menu did not close with Escape`);
        if (!(await toggle.evaluate((button) => button === document.activeElement))) failures.push(`${route} ${viewport.name}: focus did not return to the menu button`);
        if (route === '/' && viewport.name === 'mobile-390') {
          await toggle.click();
          await page.setViewportSize({ width: 1024, height: 844 });
          if (await page.locator('body').evaluate((body) => body.classList.contains('menu-open'))) failures.push(`${route} mobile-390: resizing to desktop left page scrolling locked`);
        }
      }
    }
    if (route === '/contacto/' && viewport.name === 'mobile-390') {
      await page.locator('input[name="nombre"]').fill('Prueba QA');
      await page.locator('input[name="telefono"]').fill('600000000');
      await page.locator('select[name="servicio"]').selectOption({ label: 'Boda' });
      await page.locator('textarea[name="mensaje"]').fill('Consulta de prueba automatizada');
      await page.locator('.consent input').check();
      const [popup] = await Promise.all([page.waitForEvent('popup'), page.locator('.inquiry-form button[type="submit"]').click()]);
      if (!popup.url().includes('phone=34623164848')) failures.push(`/contacto/ mobile-390: form did not open the expected WhatsApp destination`);
      await popup.close();
    }
    await page.close();
  }
  await context.close();
}
await browser.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Visual QA passed for ${routes.length} routes at ${viewports.length} viewports; mobile menu, overflow and console checked.`);
