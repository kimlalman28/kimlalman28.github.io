# Testing Guide for kimlalman28.github.io Portfolio

## Overview

This document provides a comprehensive guide for testing the kimlalman28.github.io portfolio website. Since this is a static single-page website built with HTML and CSS, the testing strategy focuses on aspects most relevant to static sites: HTML/CSS validation, accessibility, visual appearance, links, and performance.

## Repository Structure

The repository contains:
- `index.html` - Main portfolio page with inline CSS
- Static content including navigation, hero section, timeline, and footer

## Testable Areas

### 1. HTML Validation
**What to Test:**
- HTML syntax correctness
- Proper nesting of elements
- Valid attributes and values
- Semantic HTML structure

**Why It Matters:**
- Ensures cross-browser compatibility
- Improves SEO
- Better accessibility support

### 2. CSS Validation
**What to Test:**
- CSS syntax correctness
- Valid property values
- Cross-browser compatibility

**Why It Matters:**
- Prevents rendering issues
- Ensures consistent styling across browsers

### 3. Accessibility (A11y) Testing
**What to Test:**
- WCAG 2.1 compliance (Level A and AA)
- Proper semantic HTML usage
- Alt text for images
- Color contrast ratios
- Keyboard navigation
- ARIA labels and roles
- Focus management

**Why It Matters:**
- Makes the site usable for people with disabilities
- Improves SEO
- Legal compliance in some jurisdictions

### 4. Link Validation
**What to Test:**
- Internal anchor links (#about, #current, #outside-work)
- External links (LinkedIn, GitHub)
- Image sources

**Why It Matters:**
- Prevents broken user experiences
- Maintains professional appearance
- Good for SEO

### 5. Responsive Design Testing
**What to Test:**
- Layout on different screen sizes (mobile, tablet, desktop)
- Touch targets on mobile devices
- Viewport meta tag
- Flexible layouts

**Why It Matters:**
- Mobile devices account for >50% of web traffic
- Better user experience across devices

### 6. Performance Testing
**What to Test:**
- Page load time
- Resource optimization
- Core Web Vitals (LCP, FID, CLS)
- File sizes

**Why It Matters:**
- Affects user experience
- Impacts SEO rankings
- Critical for mobile users

### 7. Visual Regression Testing
**What to Test:**
- Visual appearance consistency
- Layout changes
- Style rendering

**Why It Matters:**
- Catches unintended visual changes
- Ensures design consistency

### 8. Cross-Browser Compatibility
**What to Test:**
- Rendering in Chrome, Firefox, Safari, Edge
- CSS property support
- JavaScript functionality (if added)

**Why It Matters:**
- Users access sites from different browsers
- Ensures consistent experience

### 9. Content Testing
**What to Test:**
- Spelling and grammar
- Broken content
- Placeholder text (e.g., "your-photo.jpg")

**Why It Matters:**
- Professional presentation
- User trust and credibility

## Testing Strategies

### Unit Testing
**Not Applicable** - Since there's no JavaScript logic, traditional unit tests aren't needed. However, if JavaScript is added in the future, unit tests would validate:
- Event handlers
- DOM manipulation
- Data transformations

### Integration Testing
**Limited Applicability** - For a static site, integration testing would validate:
- Navigation flow between sections
- Smooth scrolling behavior
- Form submissions (if added)

### End-to-End (E2E) Testing
**Recommended** - E2E tests simulate user interactions:
- Navigation between sections
- Clicking links
- Scrolling behavior
- Mobile responsiveness

### Accessibility Testing
**Highly Recommended** - Essential for inclusive web development:
- Automated scans with tools like axe-core
- Manual keyboard navigation testing
- Screen reader testing

### Performance Testing
**Recommended** - Important for user experience:
- Lighthouse audits
- WebPageTest analysis
- Load time monitoring

## Testing Tools & Setup

### 1. HTML Validation

**Tool:** W3C HTML Validator

**Setup:**
```bash
npm install --save-dev html-validator-cli
```

**Usage:**
```bash
html-validator --file=index.html --verbose
```

**Example Test:**
```json
{
  "scripts": {
    "test:html": "html-validator --file=index.html"
  }
}
```

### 2. CSS Validation

**Tool:** W3C CSS Validator or Stylelint

**Setup:**
```bash
npm install --save-dev stylelint stylelint-config-standard
```

**Configuration (.stylelintrc.json):**
```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "no-descending-specificity": null
  }
}
```

### 3. Accessibility Testing

**Tool:** axe-core, Pa11y, or Lighthouse

**Setup (Pa11y):**
```bash
npm install --save-dev pa11y pa11y-ci
```

**Configuration (.pa11yci.json):**
```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"]
  },
  "urls": [
    "http://localhost:8000/index.html"
  ]
}
```

**Usage:**
```bash
# Start a local server
npx http-server . -p 8000

# Run accessibility tests
npx pa11y-ci
```

### 4. Link Validation

**Tool:** linkinator

**Setup:**
```bash
npm install --save-dev linkinator
```

**Usage:**
```bash
npx linkinator index.html --recurse
```

### 5. End-to-End Testing

**Tool:** Playwright or Cypress

**Setup (Playwright):**
```bash
npm init playwright@latest
```

**Example Test (tests/portfolio.spec.js):**
```javascript
import { test, expect } from '@playwright/test';

test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Portfolio');
  });

  test('should navigate to About section', async ({ page }) => {
    await page.click('a[href="#about"]');
    await expect(page.locator('#about')).toBeVisible();
  });

  test('should navigate to Current section', async ({ page }) => {
    await page.click('a[href="#current"]');
    await expect(page.locator('#current')).toBeVisible();
  });

  test('should navigate to Outside Work section', async ({ page }) => {
    await page.click('a[href="#outside-work"]');
    await expect(page.locator('#outside-work')).toBeVisible();
  });

  test('should have external links in footer', async ({ page }) => {
    const linkedInLink = page.locator('a[href*="linkedin.com"]');
    const githubLink = page.locator('a[href*="github.com"]');
    
    await expect(linkedInLink).toBeVisible();
    await expect(githubLink).toBeVisible();
  });

  test('should have sticky navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toHaveCSS('position', 'sticky');
  });
});
```

### 6. Visual Regression Testing

**Tool:** Percy, BackstopJS, or Playwright

**Setup (Playwright Screenshots):**
```javascript
import { test } from '@playwright/test';

test('visual regression - desktop', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ 
    path: 'screenshots/desktop.png',
    fullPage: true 
  });
});

test('visual regression - mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.screenshot({ 
    path: 'screenshots/mobile.png',
    fullPage: true 
  });
});
```

### 7. Performance Testing

**Tool:** Lighthouse CI

**Setup:**
```bash
npm install --save-dev @lhci/cli
```

**Configuration (.lighthouserc.json):**
```json
{
  "ci": {
    "collect": {
      "staticDistDir": ".",
      "url": ["http://localhost:8000/index.html"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

### 8. Responsive Design Testing

**Tool:** Playwright with multiple viewports

**Example Test:**
```javascript
import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 }
];

viewports.forEach(({ name, width, height }) => {
  test(`responsive design on ${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check that navigation is visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });
});
```

## Example Test Suite Structure

```
kimlalman28.github.io/
├── index.html
├── package.json
├── .stylelintrc.json
├── .pa11yci.json
├── .lighthouserc.json
├── playwright.config.js
├── tests/
│   ├── e2e/
│   │   ├── navigation.spec.js
│   │   ├── links.spec.js
│   │   └── responsive.spec.js
│   ├── accessibility/
│   │   └── a11y.spec.js
│   ├── visual/
│   │   └── visual-regression.spec.js
│   └── performance/
│       └── lighthouse.spec.js
└── README.md
```

## Continuous Integration (CI) Setup

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Validate HTML
      run: npm run test:html
    
    - name: Validate CSS
      run: npm run test:css
    
    - name: Run accessibility tests
      run: npm run test:a11y
    
    - name: Run E2E tests
      run: npx playwright test
    
    - name: Run Lighthouse CI
      run: npm run test:lighthouse
    
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: test-results/
```

## Test Execution Order

1. **HTML Validation** - Fast, catches syntax errors
2. **CSS Validation** - Fast, ensures style correctness
3. **Accessibility Tests** - Automated checks for WCAG compliance
4. **Link Validation** - Verifies all links work
5. **E2E Tests** - User interaction scenarios
6. **Visual Regression** - Catches unintended UI changes
7. **Performance Tests** - Ensures site speed

## Current Issues to Address

Based on the current `index.html`, here are some testable issues:

1. **Missing Image:** `src="your-photo.jpg"` - placeholder that should be replaced
2. **Non-functional Button:** "Contact Me" button has no action
3. **Incomplete Sections:** "What I'm Doing" and "Outside Work" have placeholder text
4. **Email Link:** Footer email link points to "#" instead of actual email

## Recommendations

### High Priority
1. Implement accessibility testing (Pa11y or axe-core)
2. Add E2E tests for navigation
3. Set up HTML validation
4. Configure Lighthouse CI for performance monitoring

### Medium Priority
1. Add visual regression testing
2. Implement responsive design tests
3. Set up automated link checking
4. Add CSS validation

### Low Priority
1. Performance monitoring dashboards
2. Cross-browser testing automation
3. Advanced accessibility testing (manual screen reader tests)

## Getting Started

To implement testing for this portfolio:

1. Initialize npm project:
   ```bash
   npm init -y
   ```

2. Install testing dependencies:
   ```bash
   npm install --save-dev \
     @playwright/test \
     pa11y-ci \
     html-validator-cli \
     linkinator \
     @lhci/cli
   ```

3. Add test scripts to package.json:
   ```json
   {
     "scripts": {
       "test": "npm run test:html && npm run test:a11y && playwright test",
       "test:html": "html-validator --file=index.html",
       "test:a11y": "pa11y-ci",
       "test:links": "linkinator index.html --recurse",
       "test:lighthouse": "lhci autorun",
       "test:e2e": "playwright test"
     }
   }
   ```

4. Create test files following the structure above

5. Run tests:
   ```bash
   npm test
   ```

## Conclusion

While this is a simple static website, comprehensive testing ensures:
- Accessibility for all users
- Consistent cross-browser experience
- Professional presentation
- Optimal performance
- Future maintainability

Start with accessibility and HTML validation tests, then gradually add E2E and performance testing as the site evolves.
