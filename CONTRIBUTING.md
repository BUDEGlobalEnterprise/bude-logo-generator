# Contributing to BUDE Logo Generator

First off, thank you for considering contributing to BUDE Logo Generator! 🎉

It's people like you that make this project such a great tool for the community.

> [!NOTE]
> This project is a fork of [FOSS United's Campus Logo Generator](https://github.com/FOSSUnited/foss-club-logo-generator). We maintain this fork to serve the BUDE Global community while honoring the original work.

**💬 Join our [WhatsApp Community](https://chat.whatsapp.com/CkBNXSwAC6lCBNtHT7XqLt) to connect with other contributors!**

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting a bug, include:**

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Browser and OS information
- Screenshots if applicable

**Bug Report Template:**

```markdown
**Description:**
A clear description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Enter '...'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
```

### Suggesting Features

Feature suggestions are welcome! Please provide:

- A clear description of the feature
- The problem it solves
- Possible implementation approach
- Any mockups or examples (if applicable)

### Pull Requests

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bude-logo-generator.git
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Write clean, readable code
   - Follow the style guidelines
   - Test your changes locally

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Fill out the PR template
   - Link related issues
   - Request review from maintainers

---

## Development Setup

### Requirements

- Modern web browser
- Code editor (VS Code recommended)
- Local web server (optional)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/BUDEGlobalEnterprise/bude-logo-generator.git
   cd bude-logo-generator
   ```

2. Start a local server (choose one):
   ```bash
   # Python 3
   python -m http.server 8080

   # Node.js
   npx serve .

   # VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

3. Open `http://localhost:8080` in your browser

---

## Style Guidelines

### HTML

- Use semantic HTML5 elements
- Include proper `alt` attributes for images
- Maintain consistent indentation (2 spaces)

### CSS

- Use meaningful class names
- Group related styles together
- Add comments for complex selectors
- Follow mobile-first responsive design

### JavaScript

- Use `const` and `let` (avoid `var`)
- Write descriptive function names
- Add JSDoc comments for functions
- Avoid global variables when possible

**Example:**
```javascript
/**
 * Downloads the generated logo in the specified format.
 * @param {string} imgURI - The image URI to download
 */
function triggerDownload(imgURI) {
    // Implementation
}
```

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, missing semicolons, etc. |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or updating tests |
| `chore` | Build process or auxiliary tools |

**Examples:**
```
feat: add custom color picker
fix: resolve PNG download issue on Safari
docs: update installation instructions
style: format CSS with Prettier
```

---

## Questions?

Feel free to open an issue for any questions or join our community discussions!

Thank you for contributing! 🙌
