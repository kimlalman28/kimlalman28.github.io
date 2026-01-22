# Testing Guide for Portfolio Website

This document explains what types of tests can be written for this portfolio website codebase.

## Overview

This portfolio website is a static HTML single-page application (SPA) with embedded CSS and navigation features. While it doesn't have JavaScript functionality currently, there are multiple types of tests that can be applied to ensure quality, accessibility, and proper functionality.

## Types of Tests You Can Write

### 1. **HTML Validation Tests**

**Purpose**: Ensure the HTML markup is valid and follows web standards.

**What to test**:
- Valid HTML5 syntax
- Proper DOCTYPE declaration
- Correct nesting of elements
- All required attributes are present
- No deprecated tags or attributes

**Tools**:
- W3C HTML Validator
- html-validate (npm package)
- htmlhint

**Example test scenarios**:
```javascript
// Using html-validate
describe('HTML Validation', () => {
  it('should have valid HTML5 markup', () => {
    // Validate the HTML structure
  });
  
  it('should have proper meta tags', () => {
    // Check charset, viewport tags
  });
});
```

---

### 2. **CSS Validation Tests**

**Purpose**: Ensure CSS is valid and follows best practices.

**What to test**:
- Valid CSS syntax
- No conflicting or duplicate rules
- Proper use of selectors
- Cross-browser compatibility

**Tools**:
- W3C CSS Validator
- stylelint
- CSSLint

**Example test scenarios**:
- Verify all CSS properties are valid
- Check for unused CSS rules
- Ensure color contrast ratios meet standards

---

### 3. **Accessibility (a11y) Tests**

**Purpose**: Ensure the website is accessible to all users, including those with disabilities.

**What to test**:
- Proper semantic HTML structure
- Image alt text (currently missing for the profile photo)
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (WCAG compliance)
- Screen reader compatibility
- Focus management

**Tools**:
- axe-core
- WAVE (Web Accessibility Evaluation Tool)
- pa11y
- Lighthouse (accessibility audit)
- jest-axe (for automated testing)

**Example test scenarios**:
```javascript
describe('Accessibility', () => {
  it('should have alt text for all images', () => {
    // Check img tags have alt attributes
  });
  
  it('should have proper heading hierarchy', () => {
    // Verify h1, h2, h3 are properly nested
  });
  
  it('should have sufficient color contrast', () => {
    // Test contrast between text and background
  });
  
  it('should be navigable by keyboard', () => {
    // Test tab order and keyboard interactions
  });
});
```

---

### 4. **Visual Regression Tests**

**Purpose**: Detect unintended visual changes to the website.

**What to test**:
- Layout consistency across updates
- Responsive design breakpoints
- Component appearance
- CSS styling accuracy

**Tools**:
- Percy
- BackstopJS
- Chromatic
- Playwright with screenshot comparison
- Puppeteer with pixelmatch

**Example test scenarios**:
```javascript
describe('Visual Regression', () => {
  it('should match header section snapshot', () => {
    // Take screenshot and compare with baseline
  });
  
  it('should match timeline component at mobile width', () => {
    // Test responsive design
  });
});
```

---

### 5. **Responsive Design Tests**

**Purpose**: Ensure the website works correctly on different screen sizes and devices.

**What to test**:
- Mobile viewport (320px, 375px, 414px)
- Tablet viewport (768px, 1024px)
- Desktop viewport (1280px, 1920px)
- Layout adaptations at different breakpoints
- Touch-friendly button sizes on mobile

**Tools**:
- Playwright
- Puppeteer
- Cypress
- BrowserStack
- Responsive Design Checker

**Example test scenarios**:
```javascript
describe('Responsive Design', () => {
  it('should display navigation menu on mobile', () => {
    // Test at 375px width
  });
  
  it('should maintain readability on all devices', () => {
    // Test font sizes scale appropriately
  });
  
  it('should not have horizontal scroll on mobile', () => {
    // Verify content fits viewport
  });
});
```

---

### 6. **Cross-Browser Compatibility Tests**

**Purpose**: Ensure the website works consistently across different browsers.

**What to test**:
- Chrome, Firefox, Safari, Edge compatibility
- Rendering consistency
- CSS feature support
- Smooth scrolling behavior (`scroll-behavior: smooth`)

**Tools**:
- BrowserStack
- Sauce Labs
- LambdaTest
- Playwright (multi-browser support)
- Selenium WebDriver

**Example test scenarios**:
```javascript
describe('Cross-Browser Compatibility', () => {
  ['chrome', 'firefox', 'webkit'].forEach(browser => {
    it(`should render correctly in ${browser}`, () => {
      // Test in each browser
    });
  });
});
```

---

### 7. **Link and Navigation Tests**

**Purpose**: Verify all links work and navigation functions properly.

**What to test**:
- Internal anchor links (`#about`, `#current`, `#outside-work`)
- External links (LinkedIn, GitHub)
- Smooth scrolling to sections
- Sticky navigation behavior
- Link hover states

**Tools**:
- Playwright
- Cypress
- Puppeteer
- link-check (for broken links)

**Example test scenarios**:
```javascript
describe('Navigation', () => {
  it('should scroll to About section when clicking About Me link', () => {
    // Click nav link and verify scroll
  });
  
  it('should navigate to LinkedIn when clicking LinkedIn link', () => {
    // Test external link
  });
  
  it('should keep navigation sticky on scroll', () => {
    // Verify nav position
  });
});
```

---

### 8. **Performance Tests**

**Purpose**: Ensure the website loads quickly and performs well.

**What to test**:
- Page load time
- Time to interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Total page size

**Tools**:
- Lighthouse
- WebPageTest
- Google PageSpeed Insights
- Playwright Performance API

**Example test scenarios**:
```javascript
describe('Performance', () => {
  it('should load in under 2 seconds', () => {
    // Measure page load time
  });
  
  it('should have a Lighthouse performance score above 90', () => {
    // Run Lighthouse audit
  });
});
```

---

### 9. **SEO Tests**

**Purpose**: Ensure the website is optimized for search engines.

**What to test**:
- Title tag presence and content
- Meta description (currently missing)
- Proper heading structure
- Semantic HTML usage
- Open Graph tags for social sharing
- Canonical URLs
- robots.txt and sitemap

**Tools**:
- Lighthouse SEO audit
- SEO analyzers
- Custom test scripts

**Example test scenarios**:
```javascript
describe('SEO', () => {
  it('should have a descriptive title tag', () => {
    // Check title length and content
  });
  
  it('should have meta description', () => {
    // Verify meta description exists
  });
  
  it('should use semantic HTML5 elements', () => {
    // Check for header, nav, main, footer
  });
});
```

---

### 10. **Content Tests**

**Purpose**: Verify content is present and displayed correctly.

**What to test**:
- All sections render with content
- Text content is readable
- Timeline items are in correct order
- Contact button is visible
- Footer links are present
- No broken images

**Tools**:
- Playwright
- Cypress
- Cheerio (for HTML parsing)

**Example test scenarios**:
```javascript
describe('Content', () => {
  it('should display hero section with name', () => {
    // Verify "I'm Kimberly..." is present
  });
  
  it('should display all timeline items', () => {
    // Count and verify 5 timeline items
  });
  
  it('should display footer with social links', () => {
    // Verify LinkedIn, GitHub, Email links
  });
});
```

---

### 11. **Security Tests**

**Purpose**: Identify potential security vulnerabilities.

**What to test**:
- No inline JavaScript (XSS prevention)
- External links use `rel="noopener noreferrer"`
- HTTPS usage (when deployed)
- Content Security Policy headers
- No sensitive information exposed

**Tools**:
- OWASP ZAP
- Snyk
- npm audit (if using packages)
- Security Headers checker

**Example test scenarios**:
```javascript
describe('Security', () => {
  it('should use rel="noopener noreferrer" on external links', () => {
    // Check all target="_blank" links
  });
  
  it('should not expose sensitive information', () => {
    // Scan for API keys, tokens, etc.
  });
});
```

---

### 12. **End-to-End (E2E) User Journey Tests**

**Purpose**: Test complete user workflows.

**What to test**:
- User visits homepage
- User navigates through all sections
- User clicks all navigation links
- User interacts with Contact button
- User clicks social media links

**Tools**:
- Playwright
- Cypress
- Selenium
- TestCafe

**Example test scenarios**:
```javascript
describe('User Journey', () => {
  it('should allow user to explore entire portfolio', () => {
    // Navigate homepage -> about -> current -> outside work
  });
  
  it('should allow user to contact via button', () => {
    // Click contact button (currently no functionality)
  });
});
```

---

## Recommended Testing Setup

For a static HTML portfolio like this, here's a recommended minimal testing setup:

### Quick Start with Playwright

1. **Install Playwright**:
```bash
npm init -y
npm install -D @playwright/test
npx playwright install
```

2. **Create basic test file** (`tests/portfolio.spec.js`):
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Portfolio Website Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + __dirname + '/../index.html');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Portfolio');
  });

  test('should display hero section', async ({ page }) => {
    const heading = page.locator('header h1');
    await expect(heading).toContainText("I'm Kimberly");
  });

  test('should navigate to About section', async ({ page }) => {
    await page.click('a[href="#about"]');
    await expect(page.locator('#about')).toBeVisible();
  });

  test('should have 5 timeline items', async ({ page }) => {
    const timelineItems = page.locator('.timeline-item');
    await expect(timelineItems).toHaveCount(5);
  });

  test('should have working external links', async ({ page }) => {
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kimberlylalmansingh/');
  });
});
```

3. **Add accessibility tests**:
```bash
npm install -D axe-playwright
```

```javascript
const { test, expect } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('file://' + __dirname + '/../index.html');
  await injectAxe(page);
  await checkA11y(page);
});
```

---

## Specific Issues to Test For (Current Code)

Based on the current `index.html`, here are specific items that tests could catch:

1. **Missing image**: `your-photo.jpg` is referenced but may not exist
2. **Missing alt text**: Profile image needs alt attribute
3. **Contact button has no functionality**: Should add href or onclick handler
4. **Email link is incomplete**: Footer has `<a href="#">Email</a>`
5. **No meta description**: Missing for SEO
6. **External links security**: Should add `rel="noopener noreferrer"` to external links
7. **Empty sections**: "What I'm Doing" and "Outside Work" need content

---

## Summary

For this portfolio website, you can implement:

| Test Type | Priority | Complexity | Value |
|-----------|----------|------------|-------|
| HTML Validation | High | Low | High |
| Accessibility | High | Medium | Very High |
| Link Testing | High | Low | High |
| Responsive Design | High | Medium | High |
| Visual Regression | Medium | Medium | Medium |
| Performance | Medium | Low | Medium |
| SEO | Medium | Low | High |
| Cross-Browser | Low | High | Medium |
| Security | Medium | Low | High |
| E2E User Journey | Low | Medium | Low |

**Recommendation**: Start with HTML validation, accessibility, and link testing as these provide the most value with the least effort for a static website.
