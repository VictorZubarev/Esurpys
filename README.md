# Esurpys

### A Visa Navigator for Exploring Countries and Visa Opportunities

> Discover destinations and explore visa options based on your goals.

---

## About the Project

**Esurpys** is an independent software project focused on helping people explore international destinations and discover visa options that may match their goals.

The platform includes a test-based Visa Navigator that guides users through questions and helps them explore relevant visa options and destinations. Users can also explore country-specific and international test sections.

Esurpys aims to make the initial exploration of international opportunities more accessible through a simple, user-friendly web experience.

**Important:** Esurpys provides informational guidance and is not a substitute for official immigration advice. Visa eligibility and requirements must always be verified through the relevant government or immigration authority.

## Vision and Goals

- Make visa and destination exploration more accessible.
- Help users identify potentially relevant visa options through a guided test.
- Provide an intuitive interface for exploring countries and international opportunities.
- Improve usability, clarity, and reliability based on user feedback.
- Expand country coverage and platform capabilities as development progresses.
- Build a transparent and maintainable software project.

## Core Features

- **Visa Navigator:** A test-based experience designed to help users explore visa options based on their answers and goals.
- **Country Exploration:** Dedicated sections for exploring supported countries.
- **International Tests:** An area for exploring international options beyond individual country sections.
- **Multilingual Interface:** English and Russian interface content.
- **Responsive Web Experience:** A web interface designed for convenient access across supported screen sizes.

Feature availability and coverage may evolve as the project develops.

## Technology Stack

- **Next.js** — web application framework.
- **React** — user interface library.
- **TypeScript** — typed application development.
- **Vercel** — deployment and hosting.
- **GitHub** — source code and project collaboration.

The web application is located in the `web/` directory.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js, compatible with the project configuration.
- npm.
- Git.

### Installation

Clone the repository:

```bash
git clone https://github.com/VictorZubarev/Esurpys.git
cd Esurpys
```

Navigate to the web application directory:

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

Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

### Production Build

From the `web/` directory, run:

```bash
npm run build
```

To run the production build locally, if supported by the project's scripts:

```bash
npm run start
```

## Project Structure

The repository contains the web application and project-level files.

```text
Esurpys/
├── web/
│   ├── src/
│   │   ├── app/          # Application pages and routes
│   │   ├── components/   # Reusable UI components
│   │   └── shared/       # Shared navigation and application logic
│   ├── public/           # Static assets, if present
│   ├── package.json      # Web application scripts and dependencies
│   └── ...
├── docs/                 # Project documentation, if present
├── README.md
├── CONTRIBUTING.md
└── SECURITY.md
```

The exact contents may change as the project evolves.

## Deployment

Esurpys is deployed using Vercel.

The web application resides in `web/`, which should be configured as the Vercel project's Root Directory when deploying this repository.

For deployments connected to GitHub, pushing changes to the configured branch can trigger an automatic deployment, depending on the Vercel project settings.

Before deploying, verify that the production build completes successfully.

## Development Roadmap

### Phase 1 — Core Web Experience

- [x] Establish the web application foundation.
- [x] Implement the initial site navigation and main sections.
- [x] Develop the test-based Visa Navigator experience.
- [x] Publish an initial deployment.
- [ ] Continue testing the user experience.

### Phase 2 — Quality and Documentation

- [ ] Improve usability and accessibility.
- [ ] Review and refine visa-related content.
- [ ] Maintain accurate technical documentation.
- [ ] Improve testing and error handling.
- [ ] Gather and evaluate user feedback.

### Phase 3 — Growth and Expansion

- [ ] Evaluate demand for additional countries and destinations.
- [ ] Improve discoverability through search engines.
- [ ] Explore responsible promotion and community outreach.
- [ ] Evaluate additional languages and platform capabilities.
- [ ] Consider mobile applications if justified by user needs.

Roadmap items may change based on development priorities, feasibility, and user feedback.

## Project Documentation

Additional documentation is maintained in the repository as the project develops.

- `CONTRIBUTING.md` — contribution guidelines.
- `SECURITY.md` — security reporting guidance.
- `docs/` — supplementary technical and project documentation, where available.

## Contributing

Ideas, constructive feedback, bug reports, and technical suggestions are welcome.

Please review [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting changes. Use GitHub Issues to report bugs, suggest improvements, or discuss potential features.

## Security

If you discover a potential security vulnerability, please follow the reporting instructions in [`SECURITY.md`](SECURITY.md).

Avoid publishing sensitive information, credentials, or details that could expose users or compromise the application.

## Project Status

**Status:** Active Development

Esurpys is an evolving independent software project. Features, country coverage, documentation, and future plans may change as the application is tested and improved.

Visa information and eligibility can change. Users should verify current requirements with official government and immigration sources before making travel or immigration decisions.

## Authorship and License

Esurpys is developed as an independent software project. The repository's Git history records changes to the codebase over time.

No open-source license is implied unless a license file is explicitly included in the repository. Check the repository's `LICENSE` file, if present, for the applicable terms.

## Contact

For general questions, bug reports, feature suggestions, and project discussions, open an issue in the [Esurpys GitHub repository](https://github.com/ViktorZubarev/Esurpys).

---

### Building Esurpys Step by Step

*Our goal is to make exploring international opportunities clearer and more accessible through practical tools, continuous improvement, and user feedback.*
