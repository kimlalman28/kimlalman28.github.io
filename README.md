# Portfolio Website - Testing Documentation

This repository contains a personal portfolio website and comprehensive test examples demonstrating what types of tests can be written for this code.

## Documentation

- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Comprehensive guide explaining all types of tests that can be written for this portfolio website, including:
  - HTML Validation Tests
  - CSS Validation Tests
  - Accessibility Tests
  - Visual Regression Tests
  - Responsive Design Tests
  - Cross-Browser Compatibility Tests
  - Link and Navigation Tests
  - Performance Tests
  - SEO Tests
  - Content Tests
  - Security Tests
  - End-to-End User Journey Tests

## Test Examples

This repository includes practical test examples using Playwright to demonstrate the concepts from the testing guide:

### Test Files

- **`tests/basic.spec.js`** - Basic functionality, navigation, content verification, and HTML structure tests
- **`tests/accessibility.spec.js`** - Accessibility (a11y) tests using axe-playwright
- **`tests/responsive.spec.js`** - Responsive design and cross-device rendering tests

### Setup and Running Tests

#### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

#### Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

#### Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests with UI mode (interactive):
```bash
npm run test:ui
```

Run specific test suites:
```bash
npm run test:accessibility
```

Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

#### Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

### Test Coverage

The example tests demonstrate:

✅ **60+ test cases** covering:
- Basic HTML structure and content
- Navigation and smooth scrolling
- Accessibility compliance
- Responsive design (mobile, tablet, desktop)
- Cross-device rendering
- Keyboard navigation
- Color contrast
- Semantic HTML
- Link functionality

### Development Workflow

1. **Write tests first** - Define expected behavior
2. **Run tests** - See what passes/fails
3. **Fix issues** - Update HTML/CSS as needed
4. **Verify** - Re-run tests to ensure fixes work
5. **Iterate** - Continue improving

### Additional Testing Tools

Beyond the included Playwright tests, you can also use:

- **HTML Validation**: `npm run lint:html`
- **CSS Linting**: `npm run lint:css` (requires setup)
- **Lighthouse Audit**: `npm run lighthouse` (requires local server)
- **Local Server**: `npm run serve` (serves on http://localhost:8000)

## Why Testing Matters

Even for a simple static portfolio website, testing provides:

1. **Confidence** - Know your site works across devices and browsers
2. **Accessibility** - Ensure everyone can use your site
3. **Professionalism** - Demonstrate quality engineering practices
4. **Documentation** - Tests serve as living documentation
5. **Regression Prevention** - Catch issues before they reach users
6. **Learning** - Great way to learn testing best practices

## Key Takeaways from the Testing Guide

For this static portfolio website, the most valuable tests are:

| Priority | Test Type | Value |
|----------|-----------|-------|
| **High** | Accessibility | Ensures site is usable by everyone |
| **High** | Responsive Design | Works on all devices |
| **High** | Link Testing | All navigation works |
| **Medium** | HTML Validation | Proper markup |
| **Medium** | Performance | Fast loading |
| **Medium** | SEO | Discoverable by search engines |

## Current Test Status

The example tests are fully functional and can be run against the `index.html` file. They demonstrate:

- ✅ All navigation links work
- ✅ Content is properly structured
- ✅ Responsive design works across screen sizes
- ⚠️ Some accessibility improvements needed (alt text for images)
- ⚠️ Some links are placeholders (email link)

## Next Steps

1. Review the [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing concepts
2. Run the example tests to see them in action
3. Fix any failing tests by updating `index.html`
4. Add additional tests for new features
5. Consider adding visual regression tests
6. Set up continuous integration (CI) to run tests automatically

## Contributing

This testing setup is designed to be educational and demonstrate best practices for testing static websites. Feel free to:

- Add more test cases
- Improve existing tests
- Add new testing tools
- Update documentation

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs - Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing)
- [axe Accessibility Testing](https://www.deque.com/axe/)

## License

MIT
