# Esurpys Technical Overview

## 1. Purpose

This document describes the technical structure, current technologies, engineering principles, and potential future development of Esurpys.

It will be updated as the application evolves and technical decisions are verified against the implementation.

## 2. Product Overview

Esurpys is a web application designed to help users explore international destinations and discover potentially relevant visa options through a test-based Visa Navigator.

The platform includes country-specific sections and an international navigator experience. Its interface supports English and Russian.

The application is under active development. Visa-related results are intended to support initial exploration and should not be treated as official immigration advice or confirmation of eligibility.

## 3. Current Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Web application framework |
| React | User interface development |
| TypeScript | Typed application code |
| Vercel | Deployment and hosting |
| GitHub | Source control and project collaboration |
| npm | Dependency management and project scripts |

The web application is located in the `web/` directory of the repository.

Repository: https://github.com/VictorZubarev/Esurpys

Production website: https://esurpys.vercel.app/

## 4. Main Application Components

### Web Interface

The web interface provides the landing page, navigation, country-specific sections, and access to the application's main features.

The interface is designed to help users explore the available options and navigate the platform.

### Visa Navigator

The Visa Navigator guides users through a series of questions and presents visa or destination options based on their answers.

The application includes country-specific routes and an international navigator section.

The selection logic and results should be evaluated against the implemented code and verified requirements. Results should not be described as guaranteed or legally verified immigration recommendations without appropriate evidence.

### Localization

The interface includes English and Russian content.

Localization should be maintained consistently across navigation, questions, instructions, and results as the application develops.

### Deployment

The application is deployed through Vercel and maintained in a GitHub repository.

The Vercel project uses `web/` as its Root Directory. Deployment behavior depends on the project's Vercel configuration and connected GitHub branch.

## 5. Repository Structure

The repository includes the web application and project-level documentation.

```text
Esurpys/
├── web/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── shared/
│   ├── public/
│   ├── package.json
│   └── ...
├── docs/
├── README.md
├── CONTRIBUTING.md
└── SECURITY.md
```

This is a high-level overview. The exact directory contents and responsibilities should be verified against the current repository.

## 6. Development Workflow

### Local Development

From the repository root, navigate to the web application directory:

```bash
cd web
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Production Build

From the `web/` directory, run:

```bash
npm run build
```

Build results should be reviewed before changes are considered ready for deployment.

### Version Control

GitHub is used to maintain source code and track changes. Significant changes should be associated with meaningful commit messages and, where appropriate, supporting test results or documentation.

## 7. Engineering Principles

- Maintain readable, maintainable, and consistently structured code.
- Use TypeScript to improve type safety where applicable.
- Keep user-facing behavior consistent across supported routes and languages.
- Test core navigation and Visa Navigator flows after relevant changes.
- Protect credentials, secrets, and sensitive information.
- Consider accessibility, privacy, security, and responsive design throughout development.
- Document significant implementation decisions.
- Distinguish implemented and tested features from planned improvements.
- Treat visa-related information carefully and direct users to official sources for current requirements.

## 8. Future Technical Considerations

Potential future work may include:

- Improving automated tests and error handling.
- Reviewing application performance and accessibility.
- Expanding supported destinations where appropriate.
- Improving localization consistency.
- Evaluating analytics when there is a clear purpose and appropriate privacy safeguards.
- Assessing mobile application development if justified by user needs.
- Evaluating third-party integrations based on specific product requirements.

These items are possible future directions, not claims of existing functionality.

## 9. Technical Decisions and Verification

| Area | Current Understanding |
|---|---|
| Web framework | Next.js |
| UI library | React |
| Programming language | TypeScript |
| Deployment platform | Vercel |
| Source control | GitHub |
| Dependency management | npm |
| Backend services | Verify against the current implementation |
| Data storage | Verify whether the current implementation requires or uses persistent storage |
| Automated testing | Verify available test scripts and coverage |
| Mobile application | Not established as part of the current web application |

Technical details should be updated when verified through source code, configuration files, package scripts, or test results.

## 10. Verification and Evidence

Technical claims should be supported by appropriate evidence, such as:

- Source code and configuration files.
- Relevant Git commits and release records.
- Successful build results.
- Test results and reproducible verification steps.
- Deployment records.
- Documented technical decisions.

A successful build alone does not establish that every user flow works correctly. Functional claims should be supported by suitable tests or direct verification.

## 11. Document Maintenance

This document should be reviewed when significant changes are made to the application architecture, technology stack, development workflow, or deployment configuration.

Updates should distinguish current implementation details from proposed changes and future plans.

## Current Status

**Status:** Active Development.

This document provides a technical overview of the existing Esurpys web application and identifies areas that require further verification as development progresses. It does not claim that the application has a fully documented or independently audited architecture.