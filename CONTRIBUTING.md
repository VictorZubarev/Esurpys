# Contributing to Esurpys

## 1. Purpose

This document explains how to contribute to Esurpys and outlines the principles for maintaining a transparent, secure, and collaborative development process.

Esurpys is an independent software project focused on helping users explore countries and discover potentially relevant visa options through a test-based Visa Navigator.

All contributions should support the project's goals of usability, reliability, accessibility, and responsible presentation of visa-related information.

## 2. Project Status and Structure

Esurpys is actively under development. Features, supported countries, and development practices may evolve over time.

The web application is located in the `web/` directory and uses Next.js, React, and TypeScript.

Before contributing:

- Read the repository's `README.md`.
- Review the relevant source files and documentation.
- Check existing GitHub Issues and Pull Requests.
- Confirm that your proposed changes fit the project's current scope.

## 3. Types of Contributions

Contributions may include:

- Bug reports with reproducible steps.
- Feature suggestions and improvements.
- Documentation corrections and additions.
- Code contributions.
- Tests and reliability improvements.
- Accessibility and usability improvements.
- Translation and localization improvements.
- Improvements to visa-related content and its clarity.

Contributions should be accurate, focused, and relevant to the project.

## 4. Reporting Issues

Before opening an issue, check whether the problem has already been reported.

Include the following information when applicable:

- A clear and descriptive title.
- A description of the problem or proposed improvement.
- Steps to reproduce the issue.
- Expected and actual behavior.
- The affected page, feature, or route.
- Browser, operating system, and other relevant environment details.
- Error messages or logs, with sensitive information removed.

For visual issues, screenshots may help explain the problem. Do not include passwords, access tokens, private keys, or unnecessary personal information.

## 5. Development Environment

### Prerequisites

You will generally need:

- Node.js compatible with the project configuration.
- npm.
- Git.
- Access to the GitHub repository.

GitHub Codespaces may also be used for development.

### Setup

Clone the repository:

```bash id="m3xq7f"
git clone https://github.com/VictorZubarev/Esurpys.git
cd Esurpys
```

Navigate to the web application:

```bash id="a9k2pd"
cd web
```

Install dependencies:

```bash id="z8x4nb"
npm install
```

Start the development server:

```bash id="t2r5vk"
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:3000`.

### Build Verification

Before submitting changes, run the production build from the `web/` directory:

```bash id="v6c1we"
npm run build
```

Resolve any errors introduced by your changes.

If the project defines additional linting or testing scripts in `web/package.json`, run the relevant checks as well.

## 6. Proposing Changes

For substantial changes, open a GitHub Issue first to discuss the proposed approach.

Pull Requests should:

- Explain the problem or need being addressed.
- Describe the implementation.
- Keep changes focused and reviewable.
- Include tests when appropriate.
- Update documentation when behavior or project instructions change.
- Identify relevant limitations or risks.
- Avoid unrelated changes.

Do not introduce changes to visa-selection logic, navigation, or supported routes without understanding their existing behavior.

## 7. Code Quality

Contributions should prioritize:

- Readable and maintainable code.
- Clear naming and consistent formatting.
- Appropriate error handling.
- Accessibility and responsive design.
- Security and privacy.
- Reliable behavior and meaningful testing.
- Minimal, focused changes.

Follow the conventions used by the existing codebase.

Avoid adding dependencies unless they provide clear value and are compatible with the project.

## 8. Visa Information and Responsible Content

Esurpys helps users explore visa options; it does not replace official immigration guidance.

Changes involving visa-related information should:

- Use reliable sources whenever factual claims are introduced.
- Avoid presenting unverified information as fact.
- Avoid guaranteeing visa approval or eligibility.
- Clearly distinguish general guidance from official requirements.
- Encourage users to verify current requirements with the relevant government or immigration authority.

Do not introduce misleading claims about the capabilities or accuracy of the Visa Navigator.

## 9. Security and Privacy

Never commit or publish:

- Passwords or access tokens.
- API keys or private keys.
- Environment files containing secrets.
- Private user information.
- Sensitive production logs or credentials.

Use environment variables for secrets and follow the project's existing configuration practices.

Report suspected vulnerabilities privately according to the instructions in `SECURITY.md`. Do not publish exploitable vulnerability details in public issues or Pull Requests.

## 10. Review Process

Contributions may be reviewed for:

- Correctness and reliability.
- Code quality and maintainability.
- Security and privacy.
- Accessibility and usability.
- Compatibility with existing functionality.
- Alignment with project goals.

Changes may require revisions before they are accepted. Submitting a Pull Request does not guarantee acceptance or inclusion in a release.

## 11. Attribution and Licensing

Contributions should accurately reflect the work performed by their authors.

By submitting a contribution, you confirm that you have the right to contribute the submitted material.

Contributions are subject to the licensing terms applicable to the repository. Check the repository's `LICENSE` file, if present, before contributing.

## 12. Deployment

Esurpys uses Vercel for deployment.

Changes merged or pushed to the configured deployment branch may trigger an automatic deployment, depending on the repository integration and Vercel settings.

Contributors should verify that their changes build successfully before submitting them. Production deployment settings and credentials should only be modified by authorized maintainers.

## 13. Communication

Use GitHub Issues for bug reports, feature requests, and project discussions.

Use Pull Requests to propose and review code or documentation changes.

Keep discussions respectful, constructive, and focused on improving Esurpys.

## 14. Updates to These Guidelines

These guidelines may be updated as the project grows and adopts more specific testing, release, security, and collaboration practices.

Thank you for helping improve Esurpys.

