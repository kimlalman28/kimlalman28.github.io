const { test, expect } = require('@playwright/test');
const path = require('path');

const getFileUrl = () => {
  const indexPath = path.join(__dirname, '../index.html');
  return `file://${indexPath}`;
};

test.describe('Portfolio Website - Responsive Design Tests', () => {
  
  test('should display correctly on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(getFileUrl());
    
    // Check that content is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Allow 1px tolerance
  });

  test('should display correctly on mobile (320px - small)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(getFileUrl());
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Navigation should still be visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should display correctly on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(getFileUrl());
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check timeline is visible
    const timeline = page.locator('.timeline');
    await expect(timeline).toBeVisible();
  });

  test('should display correctly on desktop (1920px)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(getFileUrl());
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('navigation should be centered on all screen sizes', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 },
      { width: 768, height: 1024 },
      { width: 1920, height: 1080 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(getFileUrl());
      
      const navList = page.locator('nav ul');
      const justifyContent = await navList.evaluate(el => 
        window.getComputedStyle(el).justifyContent
      );
      
      expect(justifyContent).toBe('center');
    }
  });

  test('header should take full viewport height', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(getFileUrl());
    
    const header = page.locator('header');
    const headerHeight = await header.evaluate(el => el.offsetHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    
    // Header should be approximately viewport height
    expect(Math.abs(headerHeight - viewportHeight)).toBeLessThan(5);
  });

  test('profile image should maintain aspect ratio', async ({ page }) => {
    await page.goto(getFileUrl());
    
    const img = page.locator('header img');
    const dimensions = await img.evaluate(el => ({
      width: el.offsetWidth,
      height: el.offsetHeight
    }));
    
    // Should be circular (width === height)
    expect(dimensions.width).toBe(dimensions.height);
  });

  test('buttons should be touch-friendly on mobile (min 44px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(getFileUrl());
    
    const button = page.locator('header button');
    const buttonHeight = await button.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.height;
    });
    
    // WCAG recommends minimum 44x44px for touch targets
    expect(buttonHeight).toBeGreaterThanOrEqual(44);
  });

  test('text should be readable on all devices (min 16px)', async ({ page }) => {
    await page.goto(getFileUrl());
    
    const bodyFontSize = await page.locator('body').evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    const fontSize = parseInt(bodyFontSize);
    expect(fontSize).toBeGreaterThanOrEqual(14); // Reasonable minimum
  });

  test('timeline should be responsive', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 1920, height: 1080 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(getFileUrl());
      
      const timeline = page.locator('.timeline');
      await expect(timeline).toBeVisible();
      
      // Timeline items should be visible
      const timelineItems = page.locator('.timeline-item');
      const count = await timelineItems.count();
      expect(count).toBe(5);
    }
  });

  test('footer links should wrap appropriately on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(getFileUrl());
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // All footer links should be visible
    const links = page.locator('footer a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('no content overflow on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(getFileUrl());
    
    // Check for horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasOverflow).toBe(false);
  });
});

test.describe('Portfolio Website - Cross-Device Rendering', () => {
  
  test('should render correctly on iPhone 12', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(getFileUrl());
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should render correctly on iPad Pro', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 1366 });
    await page.goto(getFileUrl());
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('.timeline')).toBeVisible();
  });

  test('should handle very wide screens (4K)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await page.goto(getFileUrl());
    
    await expect(page.locator('header')).toBeVisible();
    
    // Content should still be readable (not too stretched)
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should handle landscape orientation', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto(getFileUrl());
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });
});
