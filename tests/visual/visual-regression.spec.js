import { test } from '@playwright/test';

const SCREENSHOTS_DIR = 'test-results/screenshots';

test.describe('Visual Regression Tests', () => {
  test('homepage - desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/homepage-desktop.png`,
      fullPage: true
    });
  });

  test('homepage - tablet view', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/homepage-tablet.png`,
      fullPage: true
    });
  });

  test('homepage - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/homepage-mobile.png`,
      fullPage: true
    });
  });

  test('about section - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.click('a[href="#about"]');
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(600);
    
    const aboutSection = page.locator('#about');
    await aboutSection.screenshot({
      path: `${SCREENSHOTS_DIR}/about-section-desktop.png`
    });
  });

  test('navigation - sticky behavior', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    // Wait for scroll to complete
    await page.waitForTimeout(100);
    
    await page.screenshot({
      path: `${SCREENSHOTS_DIR}/scrolled-with-sticky-nav.png`
    });
  });

  test('timeline section visual', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const timeline = page.locator('.timeline');
    await timeline.screenshot({
      path: `${SCREENSHOTS_DIR}/timeline-section.png`
    });
  });

  test('footer visual', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const footer = page.locator('footer');
    await footer.screenshot({
      path: `${SCREENSHOTS_DIR}/footer.png`
    });
  });
});
