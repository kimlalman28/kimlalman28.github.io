import { test, expect } from '@playwright/test';

test.describe('Portfolio Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have LinkedIn link in footer', async ({ page }) => {
    const linkedInLink = page.locator('footer a[href*="linkedin.com"]');
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveAttribute(
      'href', 
      'https://www.linkedin.com/in/kimberlylalmansingh/'
    );
  });

  test('should have GitHub link in footer', async ({ page }) => {
    const githubLink = page.locator('footer a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      'href', 
      'https://github.com/kimlalman28'
    );
  });

  test('footer links should have correct text', async ({ page }) => {
    await expect(page.locator('footer a', { hasText: 'LinkedIn' })).toBeVisible();
    await expect(page.locator('footer a', { hasText: 'GitHub' })).toBeVisible();
    await expect(page.locator('footer a', { hasText: 'Email' })).toBeVisible();
  });

  test('Contact Me button should be visible', async ({ page }) => {
    const contactButton = page.locator('header button', { hasText: 'Contact Me' });
    await expect(contactButton).toBeVisible();
  });

  test('footer should have connection text', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText('Connect with me:');
  });
});
