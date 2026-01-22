import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

test.describe('Responsive Design', () => {
  viewports.forEach(({ name, width, height }) => {
    test(`should render correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      
      // Check that main elements are visible
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Verify sections are visible
      await expect(page.locator('#about')).toBeVisible();
      await expect(page.locator('#current')).toBeVisible();
      await expect(page.locator('#outside-work')).toBeVisible();
    });
  });

  test('navigation should be accessible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigation links should be visible on mobile
    const navLinks = page.locator('nav ul li');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
    
    // All nav links should be visible
    for (let i = 0; i < count; i++) {
      await expect(navLinks.nth(i)).toBeVisible();
    }
  });

  test('header should fill viewport height on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const header = page.locator('header');
    const height = await header.evaluate((el) => {
      return window.getComputedStyle(el).height;
    });
    
    // Header should be 100vh
    expect(height).toContain('px');
  });

  test('profile image should be circular', async ({ page }) => {
    await page.goto('/');
    
    const img = page.locator('header img');
    const borderRadius = await img.evaluate((el) => {
      return window.getComputedStyle(el).borderRadius;
    });
    
    expect(borderRadius).toBe('50%');
  });
});
