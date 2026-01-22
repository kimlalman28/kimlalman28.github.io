# Portfolio Website

A personal portfolio website showcasing my professional experience, current activities, and interests.

## 📁 Project Structure

```
.
├── index.html          # Main portfolio page
├── TESTING.md         # Comprehensive testing guide
└── README.md          # This file
```

## 🚀 Quick Start

### Running Locally

The easiest way to view the website locally is to use a simple HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

## 🧪 Testing

This project includes comprehensive testing documentation. See **[TESTING.md](TESTING.md)** for detailed information about:

- HTML & CSS Validation
- Accessibility Testing
- Visual Regression Testing
- Cross-Browser Compatibility
- Responsive Design Testing
- Performance Testing
- SEO Testing
- Security Testing

### Quick Test Commands

```bash
# Install testing tools
npm install -g lighthouse pa11y html-validate

# Validate HTML
html-validate index.html

# Test accessibility
pa11y http://localhost:8000/index.html

# Run Lighthouse audit
lighthouse http://localhost:8000/index.html --view
```

## 📝 Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Navigation**: Sticky navigation bar with smooth scrolling
- **Timeline Layout**: Professional experience displayed in an interactive timeline
- **Accessible**: Built with accessibility best practices
- **Clean Code**: Semantic HTML5 with embedded CSS

## 🎨 Sections

1. **Hero/Header**: Introduction with photo and tagline
2. **About Me**: Professional timeline with experience and education
3. **What I'm Doing**: Current activities and projects
4. **Outside Work**: Personal interests and hobbies
5. **Footer**: Social media links and contact information

## 🔗 Links

- [LinkedIn](https://www.linkedin.com/in/kimberlylalmansingh/)
- [GitHub](https://github.com/kimlalman28)

## 📚 Technologies Used

- HTML5
- CSS3 (Flexbox, CSS Variables)
- Semantic HTML
- Responsive Design

## 🛠️ Future Enhancements

Potential improvements and features:

- Add JavaScript interactivity for "Contact Me" button
- Implement a contact form
- Add project portfolio gallery
- Include blog section
- Add animations and transitions
- Implement dark mode toggle
- Add loading animations
- Include downloadable resume

## 📄 License

This is a personal portfolio website. All rights reserved.
