const { test, expect } = require('@playwright/test');
const { getFileUrl } = require('./helpers/test-utils');

test.describe('Portfolio Website - Basic Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the local HTML file
    await page.goto(getFileUrl());
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Portfolio');
  });

  test('should display the hero section with name', async ({ page }) => {
    const heading = page.locator('header h1');
    await expect(heading).toContainText("I'm Kimberly");
  });

  test('should display tagline in hero section', async ({ page }) => {
    const tagline = page.locator('header p');
    await expect(tagline).toContainText('software engineer');
  });

  test('should have visible Contact Me button', async ({ page }) => {
    const button = page.locator('header button');
    await expect(button).toBeVisible();
    await expect(button).toContainText('Contact Me');
  });

  test('should display navigation bar', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have all navigation links', async ({ page }) => {
    const aboutLink = page.locator('nav a[href="#about"]');
    const currentLink = page.locator('nav a[href="#current"]');
    const outsideWorkLink = page.locator('nav a[href="#outside-work"]');
    
    await expect(aboutLink).toBeVisible();
    await expect(currentLink).toBeVisible();
    await expect(outsideWorkLink).toBeVisible();
  });

  test('should have all three main sections', async ({ page }) => {
    const aboutSection = page.locator('#about');
    const currentSection = page.locator('#current');
    const outsideWorkSection = page.locator('#outside-work');
    
    await expect(aboutSection).toBeVisible();
    await expect(currentSection).toBeVisible();
    await expect(outsideWorkSection).toBeVisible();
  });

  test('should display 5 timeline items in About section', async ({ page }) => {
    const timelineItems = page.locator('.timeline-item');
    await expect(timelineItems).toHaveCount(5);
  });

  test('should have footer with social links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    const linkedinLink = page.locator('footer a[href*="linkedin.com"]');
    const githubLink = page.locator('footer a[href*="github.com"]');
    
    await expect(linkedinLink).toBeVisible();
    await expect(githubLink).toBeVisible();
  });

  test('should have correct external links in footer', async ({ page }) => {
    const linkedinLink = page.locator('footer a[href*="linkedin.com"]');
    const githubLink = page.locator('footer a[href*="github.com"]');
    
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kimberlylalmansingh/');
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/kimlalman28');
  });
});

test.describe('Portfolio Website - Navigation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(getFileUrl());
  });

  test('should scroll to About section when clicking About Me link', async ({ page }) => {
    await page.click('nav a[href="#about"]');
    // Wait for smooth scroll animation to complete
    await page.waitForFunction(() => !window.scrolling, { timeout: 2000 }).catch(() => {});
    
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('should scroll to Current section when clicking What Im Doing link', async ({ page }) => {
    await page.click('nav a[href="#current"]');
    await page.waitForFunction(() => !window.scrolling, { timeout: 2000 }).catch(() => {});
    
    const currentSection = page.locator('#current');
    await expect(currentSection).toBeInViewport();
  });

  test('should scroll to Outside Work section when clicking Outside Work link', async ({ page }) => {
    await page.click('nav a[href="#outside-work"]');
    await page.waitForFunction(() => !window.scrolling, { timeout: 2000 }).catch(() => {});
    
    const outsideWorkSection = page.locator('#outside-work');
    await expect(outsideWorkSection).toBeInViewport();
  });

  test('navigation should stay sticky when scrolling', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Check initial position
    const initialPosition = await nav.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top, position: window.getComputedStyle(el).position };
    });
    
    expect(initialPosition.position).toBe('sticky');
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Nav should still be visible at top
    await expect(nav).toBeInViewport();
  });
});

test.describe('Portfolio Website - Content Verification', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(getFileUrl());
  });

  test('should display Rhino experience', async ({ page }) => {
    const rhinoHeading = page.locator('.timeline-item h3').filter({ hasText: 'Rhino' });
    await expect(rhinoHeading).toBeVisible();
  });

  test('should display SyncIoT Technologies experience', async ({ page }) => {
    const synciotHeading = page.locator('.timeline-item h3').filter({ hasText: 'SyncIoT Technologies' });
    await expect(synciotHeading).toBeVisible();
  });

  test('should display Queens Library internship', async ({ page }) => {
    const queensLibraryHeading = page.locator('.timeline-item h3').filter({ hasText: 'Queens Library' });
    await expect(queensLibraryHeading).toBeVisible();
  });

  test('should display NYC Tech Talent Pipeline', async ({ page }) => {
    const nycHeading = page.locator('.timeline-item h3').filter({ hasText: 'NYC Tech Talent Pipeline' });
    await expect(nycHeading).toBeVisible();
  });

  test('should display Queens College education', async ({ page }) => {
    const queensCollegeHeading = page.locator('.timeline-item h3').filter({ hasText: 'Queens College' });
    await expect(queensCollegeHeading).toBeVisible();
  });

  test('should have proper section headings', async ({ page }) => {
    const aboutHeading = page.locator('#about h2');
    const currentHeading = page.locator('#current h2');
    const outsideWorkHeading = page.locator('#outside-work h2');
    
    await expect(aboutHeading).toHaveText('About Me');
    await expect(currentHeading).toHaveText("What I'm Doing");
    await expect(outsideWorkHeading).toHaveText('Outside Work');
  });
});

test.describe('Portfolio Website - HTML Structure', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(getFileUrl());
  });

  test('should have proper HTML5 semantic structure', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have meta charset UTF-8', async ({ page }) => {
    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(charset).toBe('UTF-8');
  });

  test('should have viewport meta tag', async ({ page }) => {
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });

  test('should use proper heading hierarchy', async ({ page }) => {
    // Should have one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Should have h2 tags for sections
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });
});
