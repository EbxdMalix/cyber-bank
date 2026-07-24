import { test, expect } from '@playwright/test';

test.describe('Cyber Bank Hero Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForSelector('video', { state: 'attached' });
  });

  test('video has correct attributes (muted, playsinline, preload, no autoplay)', async ({ page }) => {
    const video = page.locator('video');
    await expect(video).toHaveAttribute('muted', '');
    await expect(video).toHaveAttribute('playsinline', '');
    await expect(video).toHaveAttribute('preload', 'auto');
    await expect(video).not.toHaveAttribute('autoplay');
  });

  test('character indicator follows mouse directly', async ({ page }) => {
    const indicator = page.locator('.character-indicator');
    const width = page.viewport()!.width;
    
    // Mouse left edge → character near 0%
    await page.mouse.move(1, page.viewport()!.height / 2);
    await page.waitForTimeout(200);
    const leftStyle1 = await indicator.getAttribute('style');
    const left1 = parseFloat(leftStyle1!.replace(/[^0-9.]/g, ''));
    expect(left1).toBeLessThan(5);
    
    // Mouse right edge → character near 100%
    await page.mouse.move(width - 1, page.viewport()!.height / 2);
    await page.waitForTimeout(200);
    const leftStyle2 = await indicator.getAttribute('style');
    const left2 = parseFloat(leftStyle2!.replace(/[^0-9.]/g, ''));
    expect(left2).toBeGreaterThan(95);
  });

  test('video scrubs: left → start, right → end', async ({ page }) => {
    const video = page.locator('video');
    const width = page.viewport()!.width;
    
    // Wait for duration to be available
    await expect(video).toHaveJSProperty('duration', 10, { timeout: 20000 });
    const duration = await video.evaluate((el: HTMLVideoElement) => el.duration);
    
    // Left edge → start
    await page.mouse.move(1, 360);
    await page.waitForTimeout(300);
    let time = await video.evaluate((el: HTMLVideoElement) => el.currentTime);
    expect(time).toBeLessThan(0.5);
    
    // Right edge → end
    await page.mouse.move(width - 1, 360);
    await page.waitForTimeout(300);
    time = await video.evaluate((el: HTMLVideoElement) => el.currentTime);
    expect(time).toBeGreaterThan(duration - 0.5);
  });

  test('loading spinner visible then hidden', async ({ page }) => {
    const spinner = page.locator('.loading-spinner');
    // Spinner should be visible initially
    await expect(spinner).toBeVisible({ timeout: 2000 });
    // After video loads, spinner hidden
    await expect(spinner).toBeHidden({ timeout: 20000 });
  });

  test('hero content fades in after load', async ({ page }) => {
    const content = page.locator('.hero-content');
    // Initially hidden
    await expect(content).toHaveCSS('opacity', '0');
    // After load, visible
    await expect(content).toHaveCSS('opacity', '1', { timeout: 10000 });
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });
});
