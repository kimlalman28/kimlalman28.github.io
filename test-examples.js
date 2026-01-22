/**
 * Example Test Suite for Portfolio Website
 * 
 * This file demonstrates practical examples of tests you can write
 * for the portfolio website. Choose a testing framework (Jest, Mocha, etc.)
 * and adapt these examples to your needs.
 */

// ============================================
// Example 1: HTML Structure Tests (using Jest + jsdom)
// ============================================

describe('HTML Structure Tests', () => {
  let document;

  beforeEach(() => {
    // Load the HTML file using jsdom
    const fs = require('fs');
    const { JSDOM } = require('jsdom');
    const html = fs.readFileSync('./index.html', 'utf8');
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('should have required meta tags', () => {
    const charset = document.querySelector('meta[charset]');
    const viewport = document.querySelector('meta[name="viewport"]');
    
    expect(charset).toBeTruthy();
    expect(charset.getAttribute('charset')).toBe('UTF-8');
    expect(viewport).toBeTruthy();
  });

  test('should have a title tag', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent).toBeTruthy();
  });

  test('should have semantic HTML5 elements', () => {
    expect(document.querySelector('header')).toBeTruthy();
    expect(document.querySelector('nav')).toBeTruthy();
    expect(document.querySelector('main')).toBeTruthy();
    expect(document.querySelector('footer')).toBeTruthy();
  });

  test('should have all required sections', () => {
    expect(document.querySelector('#about')).toBeTruthy();
    expect(document.querySelector('#current')).toBeTruthy();
    expect(document.querySelector('#outside-work')).toBeTruthy();
  });

  test('image should have alt attribute', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      expect(img.hasAttribute('alt')).toBe(true);
    });
  });
});

// ============================================
// Example 2: Navigation Tests (using Puppeteer)
// ============================================

describe('Navigation Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const puppeteer = require('puppeteer');
    browser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:8000/index.html');
  });

  test('should navigate to About section when clicking About Me link', async () => {
    await page.click('a[href="#about"]');
    // Wait for URL to update
    await page.waitForFunction(() => window.location.hash === '#about');
    
    const url = await page.url();
    expect(url).toContain('#about');
  });

  test('should navigate to Current section when clicking What I\'m Doing link', async () => {
    await page.click('a[href="#current"]');
    // Wait for URL to update
    await page.waitForFunction(() => window.location.hash === '#current');
    
    const url = await page.url();
    expect(url).toContain('#current');
  });

  test('should navigate to Outside Work section', async () => {
    await page.click('a[href="#outside-work"]');
    // Wait for URL to update
    await page.waitForFunction(() => window.location.hash === '#outside-work');
    
    const url = await page.url();
    expect(url).toContain('#outside-work');
  });

  test('should have sticky navigation', async () => {
    // Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Check if nav is still visible and positioned at top
    const navPosition = await page.$eval('nav', el => {
      const style = window.getComputedStyle(el);
      return style.position;
    });
    
    expect(navPosition).toBe('sticky');
  });
});

// ============================================
// Example 3: Accessibility Tests (using axe-core)
// ============================================

describe('Accessibility Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const puppeteer = require('puppeteer');
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:8000/index.html');
  });

  test('should have no accessibility violations', async () => {
    const { AxePuppeteer } = require('@axe-core/puppeteer');
    
    const results = await new AxePuppeteer(page).analyze();
    
    expect(results.violations).toHaveLength(0);
  });

  test('should have proper heading hierarchy', async () => {
    const headings = await page.evaluate(() => {
      const h1Count = document.querySelectorAll('h1').length;
      const h2Count = document.querySelectorAll('h2').length;
      const h3Count = document.querySelectorAll('h3').length;
      
      return { h1Count, h2Count, h3Count };
    });
    
    // Should have exactly one h1
    expect(headings.h1Count).toBe(1);
    // Should have h2 headings for sections
    expect(headings.h2Count).toBeGreaterThan(0);
  });

  test('all links should be accessible via keyboard', async () => {
    // Focus on first link
    await page.keyboard.press('Tab');
    
    // Get focused element
    const focusedElement = await page.evaluate(() => {
      return document.activeElement.tagName.toLowerCase();
    });
    
    // Should be able to focus on interactive elements
    expect(['a', 'button']).toContain(focusedElement);
  });
});

// ============================================
// Example 4: Responsive Design Tests
// ============================================

describe('Responsive Design Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const puppeteer = require('puppeteer');
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display correctly on mobile (375x667)', async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:8000/index.html');
    
    // Check that navigation is visible
    const navVisible = await page.$eval('nav', el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    
    expect(navVisible).toBe(true);
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'screenshots/mobile.png' });
  });

  test('should display correctly on tablet (768x1024)', async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:8000/index.html');
    
    await page.screenshot({ path: 'screenshots/tablet.png' });
  });

  test('should display correctly on desktop (1920x1080)', async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8000/index.html');
    
    await page.screenshot({ path: 'screenshots/desktop.png' });
  });

  test('profile image should scale appropriately', async () => {
    page = await browser.newPage();
    
    // Test on mobile
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:8000/index.html');
    
    const mobileImageSize = await page.$eval('header img', el => {
      return { width: el.offsetWidth, height: el.offsetHeight };
    });
    
    // Test on desktop
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8000/index.html');
    
    const desktopImageSize = await page.$eval('header img', el => {
      return { width: el.offsetWidth, height: el.offsetHeight };
    });
    
    // Image should maintain aspect ratio
    expect(mobileImageSize.width).toBe(mobileImageSize.height);
    expect(desktopImageSize.width).toBe(desktopImageSize.height);
  });
});

// ============================================
// Example 5: Link Validation Tests
// ============================================

describe('Link Validation Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const puppeteer = require('puppeteer');
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:8000/index.html');
  });

  test('all internal navigation links should have valid targets', async () => {
    const internalLinks = await page.$$eval('nav a[href^="#"]', links => 
      links.map(link => link.getAttribute('href'))
    );
    
    for (const href of internalLinks) {
      const target = await page.$(href);
      expect(target).toBeTruthy();
    }
  });

  test('LinkedIn link should be valid', async () => {
    const linkedinHref = await page.$eval('a[href*="linkedin.com"]', el => el.href);
    expect(linkedinHref).toContain('linkedin.com');
    // Verify it's a valid LinkedIn profile URL format
    expect(linkedinHref).toMatch(/linkedin\.com\/in\/.+/);
  });

  test('GitHub link should be valid', async () => {
    const githubHref = await page.$eval('a[href*="github.com"]', el => el.href);
    expect(githubHref).toContain('github.com');
    // Verify it's a valid GitHub profile URL format
    expect(githubHref).toMatch(/github\.com\/.+/);
  });

  test('all external links should use HTTPS', async () => {
    const externalLinks = await page.$$eval('footer a', links => 
      links.map(link => link.href)
    );
    
    externalLinks.forEach(href => {
      if (!href.startsWith('http://localhost') && href.startsWith('http')) {
        expect(href).toMatch(/^https:/);
      }
    });
  });
});

// ============================================
// Example 6: Visual Regression Tests (using BackstopJS)
// ============================================

/*
 * BackstopJS Configuration Example
 * Create a file named: backstop.json
 */

const backstopConfig = {
  "id": "portfolio_visual_tests",
  "viewports": [
    {
      "label": "phone",
      "width": 375,
      "height": 667
    },
    {
      "label": "tablet",
      "width": 768,
      "height": 1024
    },
    {
      "label": "desktop",
      "width": 1920,
      "height": 1080
    }
  ],
  "scenarios": [
    {
      "label": "Full Homepage",
      "url": "http://localhost:8000/index.html",
      "selectors": ["document"],
      "delay": 500
    },
    {
      "label": "Header Section",
      "url": "http://localhost:8000/index.html",
      "selectors": ["header"]
    },
    {
      "label": "Navigation",
      "url": "http://localhost:8000/index.html",
      "selectors": ["nav"]
    },
    {
      "label": "About Section",
      "url": "http://localhost:8000/index.html#about",
      "selectors": ["#about"],
      "delay": 500
    },
    {
      "label": "Timeline",
      "url": "http://localhost:8000/index.html#about",
      "selectors": [".timeline"]
    },
    {
      "label": "Footer",
      "url": "http://localhost:8000/index.html",
      "selectors": ["footer"]
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "html_report": "backstop_data/html_report"
  },
  "report": ["browser"],
  "engine": "puppeteer"
};

// To use: 
// 1. npm install -g backstopjs
// 2. backstop init
// 3. Update backstop.json with above config
// 4. backstop reference (create baseline)
// 5. backstop test (compare against baseline)

// ============================================
// Example 7: Performance Tests
// ============================================

describe('Performance Tests', () => {
  test('page load time should be under 3 seconds', async () => {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const startTime = Date.now();
    await page.goto('http://localhost:8000/index.html', { 
      waitUntil: 'networkidle0' 
    });
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
    
    await browser.close();
  });

  test('page size should be reasonable', async () => {
    const fs = require('fs');
    const stats = fs.statSync('./index.html');
    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
    
    // HTML file should be under 50KB
    expect(fileSizeInKB).toBeLessThan(50);
  });
});

// ============================================
// Setup Instructions
// ============================================

/*
To run these tests:

1. Install dependencies:
   npm install --save-dev jest puppeteer @axe-core/puppeteer jsdom

   Note: jsdom is required for parsing HTML in the Node.js test environment

2. Add to package.json:
   {
     "scripts": {
       "test": "jest",
       "test:watch": "jest --watch",
       "test:coverage": "jest --coverage"
     },
     "jest": {
       "testEnvironment": "node",
       "testTimeout": 30000
     }
   }

3. Create screenshots directory:
   mkdir -p screenshots

4. Start local server:
   npx http-server -p 8000

5. Run tests:
   npm test

For visual regression testing with BackstopJS:
   npm install -g backstopjs
   backstop init
   backstop reference
   backstop test
*/
