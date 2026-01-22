# Testing Documentation and Examples

This directory contains comprehensive testing documentation and example test files for the portfolio website.

## Files in this Directory

- **basic.spec.js** - Tests for basic functionality, navigation, content, and HTML structure
- **accessibility.spec.js** - Accessibility (a11y) tests including WCAG compliance
- **responsive.spec.js** - Responsive design tests across various screen sizes and devices

## Running These Tests

See the main [README.md](../README.md) for installation and usage instructions.

## Test Organization

### basic.spec.js
- Page title and meta tags
- Hero section content
- Navigation structure
- Section content
- Timeline items
- Footer and social links
- Smooth scrolling behavior
- Sticky navigation

### accessibility.spec.js
- No critical a11y violations (using axe-core)
- ARIA landmarks
- Proper heading hierarchy
- Color contrast ratios
- Alt text for images
- Keyboard navigation
- Focus visibility
- Screen reader compatibility

### responsive.spec.js
- Mobile devices (320px, 375px, 390px)
- Tablets (768px, 1024px, 1366px)
- Desktops (1920px, 3840px)
- No horizontal overflow
- Touch-friendly targets
- Readable text sizes
- Landscape orientation

## Adding New Tests

When adding new tests, follow these patterns:

1. **Group related tests** using `test.describe()`
2. **Use descriptive test names** that explain what is being tested
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Keep tests independent** - each test should work in isolation
5. **Use appropriate selectors** - prefer role-based and accessible selectors

## Example Test Pattern

```javascript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
    await page.goto(getFileUrl());
  });

  test('should do something specific', async ({ page }) => {
    // Arrange
    const element = page.locator('selector');
    
    // Act
    await element.click();
    
    // Assert
    await expect(element).toHaveText('expected text');
  });
});
```

## Best Practices

1. **Wait appropriately** - Use Playwright's auto-waiting instead of arbitrary timeouts
2. **Use strict locators** - Be specific to avoid flaky tests
3. **Test user behavior** - Focus on what users actually do
4. **Avoid implementation details** - Test outcomes, not internals
5. **Keep tests maintainable** - DRY principle applies to tests too

## Debugging Tests

Run tests in debug mode:
```bash
npx playwright test --debug
```

Run specific test:
```bash
npx playwright test tests/basic.spec.js
```

Run with headed browser:
```bash
npx playwright test --headed
```

## Resources

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [axe-core Accessibility Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
