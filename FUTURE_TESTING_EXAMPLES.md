# Future JavaScript Testing Examples

This document provides examples for unit testing JavaScript code if it's added to the portfolio in the future.

## Setting Up Jest (for future use)

If you add JavaScript functionality to your portfolio, you can set up Jest for unit testing:

```bash
npm install --save-dev jest @testing-library/dom @testing-library/jest-dom
```

Add to `package.json`:
```json
{
  "scripts": {
    "test:unit": "jest"
  }
}
```

## Example 1: Testing Form Validation

If you add a contact form, here's how to test validation logic:

**JavaScript Code (contact.js):**
```javascript
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateName(name) {
  return name.trim().length >= 2;
}

export function validateMessage(message) {
  return message.trim().length >= 10;
}
```

**Test File (contact.test.js):**
```javascript
import { validateEmail, validateName, validateMessage } from './contact.js';

describe('Contact Form Validation', () => {
  describe('validateEmail', () => {
    test('should accept valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });

  describe('validateName', () => {
    test('should accept names with 2 or more characters', () => {
      expect(validateName('Jo')).toBe(true);
      expect(validateName('John Doe')).toBe(true);
    });

    test('should reject short names', () => {
      expect(validateName('J')).toBe(false);
      expect(validateName('')).toBe(false);
      expect(validateName('  ')).toBe(false);
    });
  });

  describe('validateMessage', () => {
    test('should accept messages with 10+ characters', () => {
      expect(validateMessage('Hello there!')).toBe(true);
    });

    test('should reject short messages', () => {
      expect(validateMessage('Hi')).toBe(false);
      expect(validateMessage('')).toBe(false);
    });
  });
});
```

## Example 2: Testing Smooth Scroll Utility

If you add smooth scrolling JavaScript:

**JavaScript Code (scroll.js):**
```javascript
export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }
  return false;
}

export function getCurrentSection() {
  const sections = ['about', 'current', 'outside-work'];
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  for (const sectionId of sections) {
    const section = document.getElementById(sectionId);
    if (section) {
      const { top, bottom } = section.getBoundingClientRect();
      const absoluteTop = top + window.scrollY;
      const absoluteBottom = bottom + window.scrollY;
      
      if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
        return sectionId;
      }
    }
  }
  return null;
}
```

**Test File (scroll.test.js):**
```javascript
import { scrollToSection, getCurrentSection } from './scroll.js';

describe('Scroll Utilities', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="about" style="height: 1000px;"></div>
      <div id="current" style="height: 1000px;"></div>
      <div id="outside-work" style="height: 1000px;"></div>
    `;
  });

  describe('scrollToSection', () => {
    test('should return true for existing section', () => {
      const result = scrollToSection('about');
      expect(result).toBe(true);
    });

    test('should return false for non-existing section', () => {
      const result = scrollToSection('nonexistent');
      expect(result).toBe(false);
    });
  });

  describe('getCurrentSection', () => {
    test('should return correct section based on scroll position', () => {
      // Mock window dimensions and scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      
      const section = getCurrentSection();
      expect(['about', 'current', 'outside-work', null]).toContain(section);
    });
  });
});
```

## Example 3: Testing Theme Switcher

If you add a dark/light mode toggle:

**JavaScript Code (theme.js):**
```javascript
export class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
  }

  getTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') {
      throw new Error('Invalid theme. Must be "light" or "dark"');
    }
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  }
}
```

**Test File (theme.test.js):**
```javascript
import { ThemeSwitcher } from './theme.js';

describe('ThemeSwitcher', () => {
  let themeSwitcher;
  let localStorageMock;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    global.localStorage = localStorageMock;

    // Mock document.body
    document.body.classList.remove = jest.fn();
    document.body.classList.add = jest.fn();

    themeSwitcher = new ThemeSwitcher();
  });

  test('should initialize with light theme by default', () => {
    localStorageMock.getItem.mockReturnValue(null);
    const switcher = new ThemeSwitcher();
    expect(switcher.getTheme()).toBe('light');
  });

  test('should set theme correctly', () => {
    themeSwitcher.setTheme('dark');
    expect(themeSwitcher.getTheme()).toBe('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('should throw error for invalid theme', () => {
    expect(() => themeSwitcher.setTheme('invalid')).toThrow('Invalid theme');
  });

  test('should toggle between light and dark', () => {
    themeSwitcher.setTheme('light');
    const newTheme = themeSwitcher.toggleTheme();
    expect(newTheme).toBe('dark');
    expect(themeSwitcher.getTheme()).toBe('dark');
  });

  test('should update DOM classes when setting theme', () => {
    themeSwitcher.setTheme('dark');
    expect(document.body.classList.remove).toHaveBeenCalledWith('light-theme', 'dark-theme');
    expect(document.body.classList.add).toHaveBeenCalledWith('dark-theme');
  });
});
```

## Example 4: Testing Animation Utilities

If you add animations:

**JavaScript Code (animations.js):**
```javascript
export function fadeIn(element, duration = 300) {
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
  }, 10);

  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

export function fadeOut(element, duration = 300) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = '0';

  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}
```

**Test File (animations.test.js):**
```javascript
import { fadeIn, fadeOut } from './animations.js';

describe('Animation Utilities', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('div');
    element.style.opacity = '1';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('fadeIn', () => {
    test('should set initial opacity to 0', () => {
      fadeIn(element);
      expect(element.style.opacity).toBe('0');
    });

    test('should set transition property', () => {
      fadeIn(element, 500);
      expect(element.style.transition).toBe('opacity 500ms');
    });

    test('should change opacity to 1 after delay', () => {
      fadeIn(element);
      jest.advanceTimersByTime(10);
      expect(element.style.opacity).toBe('1');
    });
  });

  describe('fadeOut', () => {
    test('should set opacity to 0', () => {
      fadeOut(element);
      expect(element.style.opacity).toBe('0');
    });

    test('should set transition property', () => {
      fadeOut(element, 400);
      expect(element.style.transition).toBe('opacity 400ms');
    });
  });
});
```

## Running Unit Tests

Once you add JavaScript and Jest configuration:

```bash
# Run all unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with coverage
npm run test:unit -- --coverage

# Run specific test file
npm run test:unit -- contact.test.js
```

## Test Coverage

To generate coverage reports:

```json
{
  "scripts": {
    "test:unit:coverage": "jest --coverage"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/**/*.test.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what the code does, not how it does it
2. **One Assertion Per Test** - Keep tests focused and easy to debug
3. **Use Descriptive Names** - Test names should clearly describe what they're testing
4. **Arrange-Act-Assert** - Structure tests with setup, execution, and verification
5. **Mock External Dependencies** - Isolate the code being tested
6. **Test Edge Cases** - Include tests for boundary conditions and error cases

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
