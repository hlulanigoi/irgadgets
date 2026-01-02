# Contributing to IrGadgets

Thank you for considering contributing to IrGadgets! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/irgadgets.git
   cd irgadgets
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/hlulanigoi/irgadgets.git
   ```
4. **Install dependencies**:
   ```bash
   yarn install
   ```
5. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

## Development Workflow

### 1. Create a Branch

Create a descriptive branch name:

```bash
git checkout -b feature/add-email-notifications
# or
git checkout -b fix/inquiry-form-validation
# or
git checkout -b docs/update-api-documentation
```

### 2. Make Changes

- Write clean, maintainable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run type checking
yarn check

# Run tests
yarn test

# Test the application locally
yarn dev
```

### 4. Commit Your Changes

Write clear, concise commit messages:

```bash
git add .
git commit -m "feat: add email notifications for inquiries"
```

**Commit Message Format:**

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/add-email-notifications
```

Then create a Pull Request on GitHub.

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Avoid `any` type - use proper types or `unknown`
- Export types for reusability
- Use interfaces for object shapes

### React

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and prop names
- Add `data-testid` attributes for testing

### Backend

- Validate all inputs with Zod schemas
- Use async/await over promises
- Handle errors properly
- Add logging for important operations

### General

- Keep functions small (< 50 lines)
- Use descriptive variable names
- Add comments for complex logic
- Remove commented-out code
- No console.log in production code (use logger)

## Submitting Changes

### Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass (`yarn test`)
- [ ] Type checking passes (`yarn check`)
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] PR description explains the changes

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List key changes
- Made in this PR

## Testing
Describe how you tested these changes.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Related Issues
Closes #123
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged

## Reporting Bugs

### Before Reporting

- Check existing issues to avoid duplicates
- Try to reproduce the bug in the latest version
- Gather relevant information

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [e.g., Ubuntu 22.04]
- Node version: [e.g., 20.10.0]
- Browser: [e.g., Chrome 120]

## Additional Context
Any other relevant information.
```

## Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature.

## Problem It Solves
What problem does this feature address?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've thought about.

## Additional Context
Any mockups, examples, or references.
```

## Questions?

If you have questions:

- Check the [README](README.md)
- Search existing issues
- Create a new issue with the `question` label
- Reach out on our community channels

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to IrGadgets! 🚀
