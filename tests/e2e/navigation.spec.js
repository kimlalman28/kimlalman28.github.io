import { test, expect } from '@playwright/test';

test.describe('Portfolio Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the page successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Portfolio');
  });

  test('should have main header with name', async ({ page }) => {
    const heading = page.locator('header h1');
    await expect(heading).toContainText("I'm Kimberly");
  });

  test('should have navigation menu', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check all navigation links
    await expect(page.locator('nav a[href="#about"]')).toBeVisible();
    await expect(page.locator('nav a[href="#current"]')).toBeVisible();
    await expect(page.locator('nav a[href="#outside-work"]')).toBeVisible();
  });

  test('should navigate to About Me section', async ({ page }) => {
    await page.click('nav a[href="#about"]');
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(500);
    
    // Verify the section is in viewport
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.locator('h2')).toContainText('About Me');
  });

  test('should navigate to What I\'m Doing section', async ({ page }) => {
    await page.click('nav a[href="#current"]');
    
    await page.waitForTimeout(500);
    
    const currentSection = page.locator('#current');
    await expect(currentSection).toBeVisible();
    await expect(currentSection.locator('h2')).toContainText('What I\'m Doing');
  });

  test('should navigate to Outside Work section', async ({ page }) => {
    await page.click('nav a[href="#outside-work"]');
    
    await page.waitForTimeout(500);
    
    const outsideWorkSection = page.locator('#outside-work');
    await expect(outsideWorkSection).toBeVisible();
    await expect(outsideWorkSection.locator('h2')).toContainText('Outside Work');
  });

  test('should have sticky navigation', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Verify sticky positioning
    const position = await nav.evaluate((el) => {
      return window.getComputedStyle(el).position;
    });
    
    expect(position).toBe('sticky');
  });

  test('should scroll smoothly', async ({ page }) => {
    // Check that smooth scroll is enabled
    const scrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });
    
    expect(scrollBehavior).toBe('smooth');
  });
});
