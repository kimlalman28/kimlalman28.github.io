import { test } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage - desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Wait for any animations or transitions
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'test-results/screenshots/homepage-desktop.png',
      fullPage: true
    });
  });

  test('homepage - tablet view', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'test-results/screenshots/homepage-tablet.png',
      fullPage: true
    });
  });

  test('homepage - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'test-results/screenshots/homepage-mobile.png',
      fullPage: true
    });
  });

  test('about section - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.click('a[href="#about"]');
    
    await page.waitForTimeout(500);
    
    const aboutSection = page.locator('#about');
    await aboutSection.screenshot({
      path: 'test-results/screenshots/about-section-desktop.png'
    });
  });

  test('navigation - sticky behavior', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: 'test-results/screenshots/scrolled-with-sticky-nav.png'
    });
  });

  test('timeline section visual', async ({ page }) => {
    await page.goto('/');
    
    const timeline = page.locator('.timeline');
    await timeline.screenshot({
      path: 'test-results/screenshots/timeline-section.png'
    });
  });

  test('footer visual', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('footer');
    await footer.screenshot({
      path: 'test-results/screenshots/footer.png'
    });
  });
});
