# Testing Guide for Portfolio Website

This document explains the different types of tests you can write for this portfolio website code to ensure quality, reliability, and maintainability.

## Table of Contents
1. [HTML Validation Tests](#html-validation-tests)
2. [CSS Validation Tests](#css-validation-tests)
3. [Accessibility Tests](#accessibility-tests)
4. [Visual Regression Tests](#visual-regression-tests)
5. [Cross-Browser Compatibility Tests](#cross-browser-compatibility-tests)
6. [Responsive Design Tests](#responsive-design-tests)
7. [Performance Tests](#performance-tests)
8. [SEO Tests](#seo-tests)
9. [Link and Navigation Tests](#link-and-navigation-tests)
10. [Security Tests](#security-tests)

---

## HTML Validation Tests

### Purpose
Ensure your HTML markup follows W3C standards and is well-formed.

### What to Test
- **Valid HTML5 syntax**: No unclosed tags, proper nesting, valid attributes
- **Semantic HTML**: Proper use of semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **Required attributes**: All `<img>` tags have `alt` attributes, proper `<meta>` tags in `<head>`

### Tools & Examples
```bash
# Using the W3C HTML Validator
npm install -g html-validate
html-validate index.html

# Using HTMLHint
npm install -g htmlhint
htmlhint index.html
```

### Sample Test Cases
- ✓ All opening tags have corresponding closing tags
- ✓ All required meta tags are present (charset, viewport)
- ✓ Image has alt text for accessibility
- ✓ Links have valid href attributes

---

## CSS Validation Tests

### Purpose
Verify CSS is syntactically correct and follows best practices.

### What to Test
- **Valid CSS syntax**: No syntax errors, proper property values
- **Browser compatibility**: CSS properties work across target browsers
- **No unused styles**: All defined styles are actually used
- **Color contrast**: Sufficient contrast ratios for readability

### Tools & Examples
```bash
# Using stylelint
npm install -g stylelint stylelint-config-standard
stylelint "**/*.css" --config-basedir .

# For embedded styles in HTML
stylelint index.html --syntax html
```

### Sample Test Cases
- ✓ All CSS properties have valid values
- ✓ No duplicate selectors with conflicting properties
- ✓ Colors meet WCAG contrast requirements (4.5:1 for normal text)
- ✓ All vendor prefixes are properly applied

---

## Accessibility Tests

### Purpose
Ensure the website is usable by people with disabilities and meets WCAG 2.1 guidelines.

### What to Test
- **Semantic HTML**: Proper heading hierarchy (h1→h2→h3)
- **Keyboard navigation**: All interactive elements are keyboard accessible
- **Screen reader compatibility**: Proper ARIA labels and alt text
- **Color contrast**: Text readable for users with visual impairments
- **Focus indicators**: Visible focus states for interactive elements

### Tools & Examples
```bash
# Using axe-core
npm install -g @axe-core/cli
axe index.html

# Using pa11y
npm install -g pa11y
pa11y http://localhost:8000/index.html

# Using Lighthouse (includes accessibility audit)
npm install -g lighthouse
lighthouse http://localhost:8000/index.html --only-categories=accessibility
```

### Sample Test Cases
- ✓ Heading hierarchy is logical (h1 → h2, no skipped levels)
- ✓ All images have descriptive alt text
- ✓ Color contrast ratio meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- ✓ Navigation is keyboard accessible (Tab, Enter, Space)
- ✓ Focus states are visible on all interactive elements
- ✓ Links have descriptive text (not just "click here")

---

## Visual Regression Tests

### Purpose
Detect unintended visual changes when updating code.

### What to Test
- **Layout consistency**: Elements render in correct positions
- **Typography**: Fonts, sizes, and spacing remain consistent
- **Colors**: Color scheme remains unchanged
- **Responsive breakpoints**: Design adapts correctly at different screen sizes

### Tools & Examples
```javascript
// Using BackstopJS
npm install -g backstopjs
backstop init

// backstop.json configuration
{
  "scenarios": [
    {
      "label": "Homepage",
      "url": "http://localhost:8000/index.html",
      "selectors": ["document"],
      "viewports": [
        { "label": "phone", "width": 375, "height": 667 },
        { "label": "tablet", "width": 768, "height": 1024 },
        { "label": "desktop", "width": 1920, "height": 1080 }
      ]
    },
    {
      "label": "About Section",
      "url": "http://localhost:8000/index.html#about",
      "selectors": ["#about"]
    }
  ]
}

// Using Percy or Chromatic for visual testing
npm install --save-dev @percy/cli
percy snapshot index.html
```

### Sample Test Cases
- ✓ Header section displays correctly with profile image centered
- ✓ Navigation bar stays sticky at the top when scrolling
- ✓ Timeline items have proper spacing and bullet points
- ✓ Footer links are properly aligned
- ✓ Color scheme matches design specifications

---

## Cross-Browser Compatibility Tests

### Purpose
Ensure the website works correctly across different browsers and versions.

### What to Test
- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **CSS features**: Flexbox, smooth scrolling, box-shadow all render correctly
- **Fallbacks**: Graceful degradation for older browsers

### Tools & Examples
```javascript
// Using Playwright for cross-browser testing
const { chromium, firefox, webkit } = require('playwright');

async function testCrossBrowser() {
  for (const browserType of [chromium, firefox, webkit]) {
    const browser = await browserType.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8000/index.html');
    
    // Test navigation
    await page.click('a[href="#about"]');
    await page.waitForTimeout(1000);
    
    // Take screenshot
    await page.screenshot({ path: `${browserType.name()}-about.png` });
    
    await browser.close();
  }
}

// Using BrowserStack or LambdaTest for real device testing
```

### Sample Test Cases
- ✓ Smooth scrolling works in Chrome, Firefox, Safari, and Edge
- ✓ Sticky navigation works across all browsers
- ✓ Border-radius on profile image displays correctly
- ✓ Flexbox layout works properly in all browsers
- ✓ Box-shadow renders correctly

---

## Responsive Design Tests

### Purpose
Verify the website adapts properly to different screen sizes and devices.

### What to Test
- **Breakpoints**: Design adapts at mobile, tablet, and desktop sizes
- **Touch targets**: Buttons and links are large enough for touch (minimum 44x44px)
- **Viewport meta tag**: Proper scaling on mobile devices
- **Images**: Images scale appropriately without overflow

### Tools & Examples
```javascript
// Using Puppeteer to test responsive behavior
const puppeteer = require('puppeteer');

async function testResponsive() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Test mobile view
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:8000/index.html');
  
  // Test navigation is accessible
  const navVisible = await page.$eval('nav', el => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none';
  });
  
  // Test tablet view
  await page.setViewport({ width: 768, height: 1024 });
  await page.reload();
  
  // Test desktop view
  await page.setViewport({ width: 1920, height: 1080 });
  await page.reload();
  
  await browser.close();
}

// Using Chrome DevTools device emulation
```

### Sample Test Cases
- ✓ Navigation menu is accessible on mobile (320px width)
- ✓ Profile image scales appropriately on tablets
- ✓ Timeline layout doesn't break on small screens
- ✓ Text remains readable at all viewport sizes
- ✓ Touch targets are at least 44x44px on mobile
- ✓ No horizontal scrolling on mobile devices

---

## Performance Tests

### Purpose
Ensure the website loads quickly and performs well.

### What to Test
- **Page load time**: Initial page loads quickly (< 3 seconds)
- **Asset optimization**: Images are compressed, CSS is minified
- **Render performance**: No layout shifts, smooth animations
- **Bundle size**: Overall page size is reasonable

### Tools & Examples
```bash
# Using Lighthouse
lighthouse http://localhost:8000/index.html --view

# Using WebPageTest
# Visit https://www.webpagetest.org/

# Using Chrome DevTools Performance tab
# Record while loading the page and analyze metrics
```

### Sample Test Cases
- ✓ First Contentful Paint (FCP) < 1.8 seconds
- ✓ Largest Contentful Paint (LCP) < 2.5 seconds
- ✓ Total Blocking Time (TBT) < 200ms
- ✓ Cumulative Layout Shift (CLS) < 0.1
- ✓ Page size < 1MB
- ✓ Images are properly optimized
- ✓ CSS is embedded efficiently (or could be external and cached)

---

## SEO Tests

### Purpose
Ensure the website is optimized for search engines.

### What to Test
- **Meta tags**: Title, description, and other essential meta tags
- **Semantic HTML**: Proper heading structure and semantic elements
- **Content**: Meaningful content in headings and alt text
- **Mobile-friendly**: Responsive design with proper viewport tag

### Tools & Examples
```bash
# Using Lighthouse SEO audit
lighthouse http://localhost:8000/index.html --only-categories=seo

# Using SEO checkers
npm install -g seo-checker
seo-checker http://localhost:8000/index.html
```

### Sample Test Cases
- ✓ Page has a `<title>` tag with descriptive text
- ✓ Meta description is present and meaningful
- ✓ Heading hierarchy is logical (single h1, proper h2/h3 structure)
- ✓ Images have descriptive alt attributes
- ✓ Links have descriptive text
- ✓ Viewport meta tag is present for mobile optimization
- ✓ Language is declared in HTML tag (`lang="en"`)

---

## Link and Navigation Tests

### Purpose
Verify all links work correctly and navigation behaves as expected.

### What to Test
- **Internal links**: Hash links (#about, #current) scroll to correct sections
- **External links**: LinkedIn, GitHub, Email links are valid
- **Broken links**: No 404 errors
- **Navigation behavior**: Smooth scrolling works properly

### Tools & Examples
```javascript
// Using Puppeteer to test navigation
const puppeteer = require('puppeteer');

async function testNavigation() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/index.html');
  
  // Test internal navigation
  await page.click('a[href="#about"]');
  await page.waitForTimeout(500);
  const url = page.url();
  console.assert(url.includes('#about'), 'Should navigate to #about');
  
  // Test external links
  const linkedinLink = await page.$eval('a[href*="linkedin.com"]', el => el.href);
  console.assert(linkedinLink.includes('linkedin.com'), 'LinkedIn link is valid');
  
  await browser.close();
}

// Using broken-link-checker
npm install -g broken-link-checker
blc http://localhost:8000/index.html -ro
```

### Sample Test Cases
- ✓ Clicking "About Me" navigates to #about section
- ✓ Clicking "What I'm Doing" navigates to #current section
- ✓ Clicking "Outside Work" navigates to #outside-work section
- ✓ LinkedIn link points to correct profile
- ✓ GitHub link points to correct profile
- ✓ Smooth scroll behavior works for hash navigation
- ✓ All navigation links have valid targets

---

## Security Tests

### Purpose
Identify potential security vulnerabilities in the website.

### What to Test
- **Content Security Policy**: Proper CSP headers (if applicable)
- **HTTPS**: Website should be served over HTTPS
- **External resources**: All external links use HTTPS
- **Input validation**: If adding forms later, validate all inputs

### Tools & Examples
```bash
# Using Mozilla Observatory
# Visit https://observatory.mozilla.org/

# Using Security Headers checker
# Visit https://securityheaders.com/

# Check for mixed content
# Ensure all resources use HTTPS when site is served via HTTPS
```

### Sample Test Cases
- ✓ No inline JavaScript that could be vulnerable to XSS
- ✓ External links (LinkedIn, GitHub) use HTTPS
- ✓ No sensitive information exposed in HTML comments
- ✓ Images load from secure sources
- ✓ No mixed content warnings (HTTP resources on HTTPS page)

---

## Additional Testing Considerations

### Unit Tests for Future JavaScript
If you add JavaScript functionality (e.g., for the "Contact Me" button), you can write unit tests:

```javascript
// Using Jest
describe('Contact Button', () => {
  test('should open contact modal when clicked', () => {
    // Test implementation
  });
  
  test('should validate email format', () => {
    // Test implementation
  });
});
```

### End-to-End Tests
For complete user flows:

```javascript
// Using Cypress
describe('Portfolio Navigation', () => {
  it('should navigate through all sections', () => {
    cy.visit('http://localhost:8000/index.html');
    cy.get('a[href="#about"]').click();
    cy.url().should('include', '#about');
    cy.get('#about').should('be.visible');
  });
});
```

### Smoke Tests
Quick tests to verify basic functionality:

```javascript
// Basic smoke test
describe('Portfolio Smoke Test', () => {
  it('should load the homepage', async () => {
    const response = await fetch('http://localhost:8000/index.html');
    expect(response.status).toBe(200);
  });
  
  it('should have all required sections', () => {
    // Check for header, nav, about, current, outside-work, footer
  });
});
```

---

## Testing Workflow Example

Here's a recommended testing workflow:

1. **Before Committing Code**
   ```bash
   # Validate HTML
   html-validate index.html
   
   # Check accessibility
   pa11y http://localhost:8000/index.html
   
   # Run Lighthouse audit
   lighthouse http://localhost:8000/index.html --view
   ```

2. **Before Deploying**
   ```bash
   # Full accessibility audit
   axe index.html
   
   # Check for broken links
   blc http://localhost:8000/index.html -ro
   
   # Visual regression tests
   backstop test
   
   # Performance audit
   lighthouse http://localhost:8000/index.html --only-categories=performance
   ```

3. **After Deployment**
   - Test on real devices (mobile, tablet, desktop)
   - Check in different browsers (Chrome, Firefox, Safari, Edge)
   - Verify all external links work
   - Test on slow network connections

---

## Getting Started with Testing

To start testing this portfolio website:

1. **Install a local server**:
   ```bash
   npx http-server -p 8000
   ```

2. **Install basic testing tools**:
   ```bash
   npm install -g lighthouse pa11y html-validate
   ```

3. **Run your first tests**:
   ```bash
   # Validate HTML
   html-validate index.html
   
   # Test accessibility
   pa11y http://localhost:8000/index.html
   
   # Run Lighthouse audit
   lighthouse http://localhost:8000/index.html --view
   ```

---

## Conclusion

While this portfolio website is primarily static HTML/CSS, there are numerous types of tests you can implement to ensure quality:

- **HTML/CSS validation** ensures code correctness
- **Accessibility tests** make the site usable by everyone
- **Visual regression tests** catch unintended UI changes
- **Performance tests** ensure fast loading times
- **Cross-browser tests** verify compatibility
- **SEO tests** improve search engine visibility
- **Link tests** ensure navigation works properly

Start with the basics (HTML validation, accessibility, and performance) and gradually add more comprehensive testing as the site evolves.
