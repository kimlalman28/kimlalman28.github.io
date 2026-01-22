const { test, expect } = require('@playwright/test');
const { injectAxe, checkA11y, getViolations } = require('axe-playwright');
const { getFileUrl } = require('./helpers/test-utils');

test.describe('Portfolio Website - Accessibility Tests', () => {
  
  test('should have no critical accessibility violations', async ({ page }) => {
    await page.goto(getFileUrl());
    await injectAxe(page);
    
    // Check for violations, but allow some warnings
    const violations = await getViolations(page, null, {
      includedImpacts: ['critical', 'serious']
    });
    
    expect(violations).toEqual([]);
  });

  test('should have proper ARIA landmarks', async ({ page }) => {
    await page.goto(getFileUrl());
    
    // Check for semantic HTML5 elements which provide implicit ARIA roles
    const header = page.locator('header');
    const nav = page.locator('nav');
    const main = page.locator('main');
    const footer = page.locator('footer');
    
    await expect(header).toBeVisible();
    await expect(nav).toBeVisible();
    await expect(main).toBeVisible();
    await expect(footer).toBeVisible();
  });

  test('should have descriptive link text', async ({ page }) => {
    await page.goto(getFileUrl());
    
    // Get all links
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      
      // Links should have text content (not just # or empty)
      if (href !== '#') {
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto(getFileUrl());
    
    // Get all headings in order
    const headings = await page.evaluate(() => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headingElements).map(h => ({
        level: parseInt(h.tagName[1]),
        text: h.textContent?.trim()
      }));
    });
    
    // Should start with h1
    expect(headings[0].level).toBe(1);
    
    // Check no skipped levels
    for (let i = 1; i < headings.length; i++) {
      const diff = headings[i].level - headings[i-1].level;
      // Can go down any number, but only up by 1
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto(getFileUrl());
    await injectAxe(page);
    
    const violations = await getViolations(page, null, {
      runOnly: ['color-contrast']
    });
    
    expect(violations).toEqual([]);
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto(getFileUrl());
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Alt attribute should exist (even if empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto(getFileUrl());
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check if focus is on a navigation link
    let focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tagName: el?.tagName,
        href: el?.getAttribute('href')
      };
    });
    
    expect(focusedElement.tagName).toBe('A');
  });

  test('should have focus visible styles', async ({ page }) => {
    await page.goto(getFileUrl());
    
    // Tab to first link
    await page.keyboard.press('Tab');
    
    // Check if focused element is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('sections should have descriptive headings', async ({ page }) => {
    await page.goto(getFileUrl());
    
    // Each section should have a heading
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    
    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      const heading = section.locator('h2').first();
      await expect(heading).toBeVisible();
      
      const headingText = await heading.textContent();
      expect(headingText?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should have proper document language', async ({ page }) => {
    await page.goto(getFileUrl());
    
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('navigation links should have role and accessible names', async ({ page }) => {
    await page.goto(getFileUrl());
    
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const text = await link.textContent();
      
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});

test.describe('Portfolio Website - Accessibility Recommendations', () => {
  
  test('buttons should have descriptive text', async ({ page }) => {
    await page.goto(getFileUrl());
    
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should not have empty links', async ({ page }) => {
    await page.goto(getFileUrl());
    
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      
      // Skip placeholder links
      if (href === '#') continue;
      
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});
