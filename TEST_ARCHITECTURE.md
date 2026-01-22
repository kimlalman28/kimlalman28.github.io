# Testing Architecture Overview

## Visual Test Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Portfolio Website                        │
│                  (index.html - Static HTML/CSS)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Testing Infrastructure                    │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
    ┌──────────────────┐         ┌──────────────────┐
    │  Local Testing   │         │   CI/CD (GitHub  │
    │   (Developer)    │         │     Actions)     │
    └──────────────────┘         └──────────────────┘
                │                           │
                └─────────────┬─────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────┐
        │       Test Execution Layer          │
        └─────────────────────────────────────┘
                              │
        ┌─────────────────────┼────────────────────────┐
        │                     │                        │
        ▼                     ▼                        ▼
┌──────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Validation  │    │  Functional      │    │  Quality        │
│  Tests       │    │  Tests           │    │  Assurance      │
└──────────────┘    └──────────────────┘    └─────────────────┘
        │                     │                        │
        ▼                     ▼                        ▼
┌──────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ • HTML       │    │ • Navigation     │    │ • Accessibility │
│ • CSS        │    │ • Links          │    │ • Performance   │
│ • Links      │    │ • Responsive     │    │ • Visual Reg    │
└──────────────┘    │ • Content        │    └─────────────────┘
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Test Results    │
                    │  & Reports       │
                    └──────────────────┘
```

## Test Categories & Tools

### 1. Validation Tests
```
HTML Validation
├─ Tool: html-validator-cli
├─ Command: npm run test:html
└─ Checks: HTML5 syntax, nesting, attributes

CSS Validation  
├─ Tool: stylelint (optional)
├─ Command: npm run test:css
└─ Checks: CSS syntax, valid properties

Link Validation
├─ Tool: linkinator
├─ Command: npm run test:links
└─ Checks: Internal anchors, external URLs
```

### 2. Functional Tests (E2E)
```
Navigation Tests
├─ Tool: Playwright
├─ File: tests/e2e/navigation.spec.js
└─ Tests:
    ├─ Page loads correctly
    ├─ Navigation menu visible
    ├─ Section navigation works
    ├─ Smooth scrolling
    └─ Sticky navigation

Link Tests
├─ Tool: Playwright
├─ File: tests/e2e/links.spec.js
└─ Tests:
    ├─ LinkedIn link
    ├─ GitHub link
    ├─ Email link
    └─ Contact button

Responsive Tests
├─ Tool: Playwright
├─ File: tests/e2e/responsive.spec.js
└─ Tests:
    ├─ Mobile (375x667)
    ├─ Tablet (768x1024)
    └─ Desktop (1920x1080)

Content Tests
├─ Tool: Playwright
├─ File: tests/e2e/content.spec.js
└─ Tests:
    ├─ Sections exist
    ├─ Timeline structure
    └─ Work experience entries
```

### 3. Quality Assurance Tests
```
Accessibility Tests
├─ Tool: axe-core + Playwright
├─ File: tests/accessibility/a11y.spec.js
├─ Standard: WCAG 2.1 Level AA
└─ Tests:
    ├─ No violations
    ├─ Heading hierarchy
    ├─ Alt text
    ├─ Color contrast
    └─ Keyboard navigation

Performance Tests
├─ Tool: Playwright + Lighthouse CI
├─ File: tests/performance/performance.spec.js
└─ Tests:
    ├─ Page load time < 3s
    ├─ Minimal resource count
    ├─ Smooth navigation
    └─ Lightweight page size

Visual Regression Tests
├─ Tool: Playwright Screenshots
├─ File: tests/visual/visual-regression.spec.js
└─ Tests:
    ├─ Desktop screenshots
    ├─ Tablet screenshots
    ├─ Mobile screenshots
    └─ Section screenshots
```

## Test Execution Flow

```
Developer Makes Changes
        │
        ▼
    git push
        │
        ▼
GitHub Actions Triggered
        │
        ├─ Setup Node.js
        ├─ Install Dependencies (npm ci)
        ├─ Install Playwright Browsers
        │
        ├─ Run HTML Validation ───────► Pass/Fail
        │
        ├─ Run E2E Tests ─────────────► Pass/Fail
        │   ├─ Navigation Tests
        │   ├─ Link Tests
        │   ├─ Responsive Tests
        │   └─ Content Tests
        │
        ├─ Run Accessibility Tests ───► Pass/Fail
        │
        ├─ Run Link Validation ───────► Pass/Fail
        │
        └─ Run Lighthouse CI ─────────► Pass/Fail
                │
                ▼
        Upload Artifacts
        ├─ Playwright Report
        ├─ Test Results
        └─ Screenshots
                │
                ▼
        Test Summary
        (Pass/Fail Status)
```

## File Dependencies

```
package.json
├─ Defines test scripts
├─ Lists dependencies
└─ Used by: npm commands

playwright.config.js
├─ Configures Playwright
├─ Sets up browsers
├─ Defines test settings
└─ Used by: All Playwright tests

.pa11yci.json
├─ Configures Pa11y
├─ Sets WCAG standard
└─ Used by: npm run test:a11y

.lighthouserc.json
├─ Configures Lighthouse
├─ Sets score thresholds
└─ Used by: npm run test:lighthouse

.github/workflows/test.yml
├─ Defines CI/CD pipeline
├─ Runs on push/PR
└─ Executes all tests
```

## Test Data Flow

```
Input: Portfolio HTML/CSS
        │
        ▼
Test Execution
        │
        ├─ Browser Automation (Playwright)
        │   ├─ Opens page in browser
        │   ├─ Interacts with elements
        │   ├─ Takes screenshots
        │   └─ Collects metrics
        │
        ├─ Accessibility Scanner (axe)
        │   ├─ Analyzes DOM
        │   ├─ Checks WCAG rules
        │   └─ Reports violations
        │
        └─ Performance Analyzer (Lighthouse)
            ├─ Measures load time
            ├─ Calculates scores
            └─ Generates report
                │
                ▼
        Test Results
        ├─ Pass/Fail per test
        ├─ Screenshots (on failure)
        ├─ Error messages
        └─ Performance scores
                │
                ▼
        Reports & Artifacts
        ├─ HTML Report (Playwright)
        ├─ JSON Results
        ├─ Screenshots
        └─ Lighthouse Report
```

## Browser Coverage

```
Playwright Configuration
        │
        ├─ Desktop Browsers
        │   ├─ Chromium
        │   ├─ Firefox
        │   └─ WebKit (Safari)
        │
        └─ Mobile Browsers
            ├─ Mobile Chrome (Pixel 5)
            └─ Mobile Safari (iPhone 12)

Each test runs on ALL configured browsers
Total: 5 browser configurations per test
```

## Test Lifecycle

```
1. Setup Phase
   ├─ Install dependencies
   ├─ Start local server (http://localhost:8000)
   └─ Initialize browsers

2. Execution Phase
   ├─ For each test file:
   │   ├─ beforeEach: Navigate to page
   │   ├─ Run test
   │   └─ Collect results
   └─ Parallel execution (where possible)

3. Reporting Phase
   ├─ Generate HTML report
   ├─ Save screenshots (failures only)
   ├─ Upload artifacts (CI)
   └─ Display summary

4. Cleanup Phase
   ├─ Close browsers
   ├─ Stop local server
   └─ Exit with status code
```

## Adding New Tests

```
1. Create Test File
   tests/[category]/[name].spec.js

2. Import Playwright
   import { test, expect } from '@playwright/test';

3. Write Test
   test('description', async ({ page }) => {
     await page.goto('/');
     await expect(page.locator('selector')).toBeVisible();
   });

4. Run Locally
   npm run test:e2e

5. Commit & Push
   Tests run automatically in CI
```

## Monitoring & Maintenance

```
Weekly
├─ Review test results
├─ Update dependencies
└─ Check for flaky tests

Monthly
├─ Update visual regression baselines
├─ Review accessibility standards
└─ Optimize test performance

Per Release
├─ Run full test suite
├─ Verify all tests pass
└─ Update documentation
```

## Success Metrics

```
Code Quality
├─ HTML/CSS: Valid syntax
├─ Accessibility: WCAG 2.1 AA compliant
└─ Links: No broken links

Performance
├─ Load Time: < 3 seconds
├─ Lighthouse Score: > 90
└─ Resource Count: < 10 requests

Test Coverage
├─ E2E Tests: All user flows covered
├─ Responsive: Mobile/Tablet/Desktop tested
└─ Cross-browser: 5 browser configs
```

## Quick Reference

| Test Type | Tool | Command | Duration |
|-----------|------|---------|----------|
| HTML | html-validator | `npm run test:html` | ~5s |
| Accessibility | Pa11y | `npm run test:a11y` | ~30s |
| E2E | Playwright | `npm run test:e2e` | ~60s |
| Links | linkinator | `npm run test:links` | ~10s |
| Performance | Lighthouse | `npm run test:lighthouse` | ~60s |
| All Tests | - | `npm test` | ~120s |

## Resources

- Full Documentation: `TESTING_GUIDE.md`
- Quick Reference: `TESTING_SUMMARY.md`
- Future Examples: `FUTURE_TESTING_EXAMPLES.md`
- Getting Started: `README.md`
