import { test, expect } from '@playwright/test';

test.describe('Content Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all main sections', async ({ page }) => {
    // Header
    await expect(page.locator('header')).toBeVisible();
    
    // Navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Main sections
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#current')).toBeVisible();
    await expect(page.locator('#outside-work')).toBeVisible();
    
    // Footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display timeline in About section', async ({ page }) => {
    const timeline = page.locator('.timeline');
    await expect(timeline).toBeVisible();
    
    // Should have timeline items
    const timelineItems = page.locator('.timeline-item');
    const count = await timelineItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have work experience entries', async ({ page }) => {
    // Check for Rhino experience
    await expect(page.locator('text=Rhino')).toBeVisible();
    
    // Check for SyncIoT Technologies
    await expect(page.locator('text=SyncIoT Technologies')).toBeVisible();
    
    // Check for Queens Library
    await expect(page.locator('text=Queens Library')).toBeVisible();
    
    // Check for Education
    await expect(page.locator('text=Queens College')).toBeVisible();
  });

  test('should have professional description', async ({ page }) => {
    const description = page.locator('header p');
    await expect(description).toContainText('software engineer');
  });

  test('timeline items should have proper structure', async ({ page }) => {
    const firstTimelineItem = page.locator('.timeline-item').first();
    
    // Should have a heading
    const heading = firstTimelineItem.locator('h3');
    await expect(heading).toBeVisible();
    
    // Should have description
    const description = firstTimelineItem.locator('p');
    await expect(description).toBeVisible();
  });
});
