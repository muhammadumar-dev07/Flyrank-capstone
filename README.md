# Flyrank Capstone

A capstone repository for the **AI-Assisted Development** track at Flyrank.Ai. This project documents the setup, workflow, and practices used to build software with AI tooling while maintaining professional engineering standards.

---

## Overview

This repository serves as the foundation for learning and applying AI-assisted software development. The focus is on combining modern development tools with AI to write clean, maintainable code, follow Git best practices, and produce clear documentation.

## Objectives

- Learn AI-assisted software development workflows
- Use AI tools effectively during planning, coding, and review
- Follow Git best practices and [Conventional Commits](https://www.conventionalcommits.org/)
- Write readable, modular, and well-documented code

## Tech Stack

| Category | Tools |
|----------|-------|
| Runtime | [Node.js](https://nodejs.org/) (LTS) |
| Version Control | [Git](https://git-scm.com/) & [GitHub](https://github.com/) |
| IDE | [Cursor](https://cursor.com/) |
| Language | Modern JavaScript (ES6+) |

## Prerequisites

Before you begin, ensure the following are installed:

- **Node.js** (LTS) — [Download](https://nodejs.org/)
- **Git** — [Download](https://git-scm.com/downloads)
- **Cursor IDE** — [Download](https://cursor.com/)

Verify your setup:

```bash
node --version
git --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/muhammadumar-dev07/Flyrank-capstone.git
cd Flyrank-capstone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site and contact form.

For auto-restart on file changes:

```bash
npm run dev
```

### 4. Environment configuration

Create a local environment file when required:

```bash
cp .env.example .env
```

> **Note:** Never commit secrets or `.env` files. They are excluded via `.gitignore`.

## Development Workflow

1. Create a feature branch from `main`
2. Develop with AI assistance in Cursor, following project conventions
3. Write clear, descriptive commit messages using Conventional Commits
4. Open a pull request for review before merging

### Coding Conventions

- Use modern JavaScript (ES6+)
- Write readable, modular code with descriptive variable names
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Keep documentation updated as the project evolves

### Commit Message Format

```
<type>: <short description>

Examples:
feat: add user authentication module
fix: resolve null reference in data parser
docs: update README with setup instructions
```

## Project Structure

```
Flyrank-capstone/
├── public/              # Static frontend (HTML, CSS, JS)
│   ├── css/
│   ├── js/
│   └── index.html
├── src/                 # Server-side modules
│   └── validateContact.js
├── data/                # Contact submissions (gitignored)
├── server.js            # Express server & contact API
├── package.json
├── .env.example         # Environment variable template
├── README.md            # Project documentation
├── .gitignore           # Ignored files and directories
├── cursor_rules         # AI assistant and coding guidelines
└── License              # Project license
```

## Project Status

| Phase | Status |
|-------|--------|
| Repository initialization | Complete |
| Development environment setup | Complete |
| Core application development | In progress |
| Contact form | Complete |

## License

See the [License](./License) file for details.

## Author

**Muhammad Umar** — [GitHub](https://github.com/muhammadumar-dev07)

---

Built as part of the Flyrank.Ai AI-Assisted Development capstone program.
