# Portfolio Website - Testing Documentation

This repository contains a static portfolio website for Kimberly Lalmansingh with comprehensive testing infrastructure.

## Quick Start

### Installation

```bash
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:html        # HTML validation
npm run test:a11y        # Accessibility tests
npm run test:e2e         # End-to-end tests
npm run test:links       # Link validation
npm run test:lighthouse  # Performance tests
```

### Local Development

To run the site locally:

```bash
npm run serve
```

Then open http://localhost:8000 in your browser.

## Testing Documentation

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive documentation on:
- Types of tests implemented
- Testing strategies
- Tool configurations
- How to write new tests
- CI/CD setup

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests
│   ├── navigation.spec.js  # Navigation functionality
│   ├── links.spec.js       # Link validation
│   ├── responsive.spec.js  # Responsive design
│   └── content.spec.js     # Content verification
├── accessibility/          # Accessibility tests
│   └── a11y.spec.js       # WCAG compliance
├── visual/                 # Visual regression tests
│   └── visual-regression.spec.js
└── performance/            # Performance tests
    └── performance.spec.js
```

## Test Coverage

This portfolio includes tests for:

- ✅ **HTML Validation** - Ensures valid HTML5 syntax
- ✅ **Accessibility** - WCAG 2.1 Level AA compliance
- ✅ **Navigation** - Section navigation and smooth scrolling
- ✅ **Responsive Design** - Mobile, tablet, and desktop layouts
- ✅ **Links** - External and internal link functionality
- ✅ **Performance** - Page load times and resource optimization
- ✅ **Visual Regression** - UI consistency across changes

## Continuous Integration

Tests run automatically on:
- Push to `main` branch
- Pull requests to `main` branch

See `.github/workflows/test.yml` for CI configuration.

## Contributing

When making changes to the portfolio:

1. Make your changes
2. Run tests locally: `npm test`
3. Fix any failing tests
4. Commit and push
5. CI will automatically run all tests

## License

MIT
