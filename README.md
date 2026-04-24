# Skylight QA Test Project

This project contains exploratory testing findings and automated end-to-end tests for the Skylight desktop app at [ourskylight.com](https://ourskylight.com), focused on the Tasks feature.

---

## Project Structure
 
```
skylightTestProject/
├── cypress/
│   ├── e2e/
│   │   ├── createTask.cy.ts       # Test: Create and assign a task
│   │   └── completeTask.cy.ts     # Test: Mark a task as complete
│   ├── fixtures/
│   └── support/
│       └── commands.ts            # Imports testing library and real-events plugins
├── cypress.config.js
├── cypress.env.json               # Local only, not committed to GitHub
├── tsconfig.json
├── package.json
└── README.md
```

---

## Setup

### Prerequisites
- Node.js (LTS)
- npm

### Installation

```bash
npm install
```

This project uses the following additional Cypress plugins:
 
- [`@testing-library/cypress`](https://testing-library.com/docs/cypress-testing-library/intro/) — provides semantic queries like `findByRole()` for more resilient, accessibility-aware selectors
- [`cypress-real-events`](https://github.com/dmtrKovalenko/cypress-real-events) — simulates true browser-level pointer events, required for React Native for Web components that don't respond to Cypress's synthetic click events
Both are included in `package.json` and will be installed automatically with `npm install`. They are registered in `cypress/support/commands.ts`.

### Environment Variables

Create a `cypress.env.json` file in the root of the project (this file is gitignored and should never be committed):

```json
{
  "email": "your-skylight-email@example.com",
  "password": "your-skylight-password"
}
```

---

## Running the Tests

**Open Cypress interactively:**
```bash
npx cypress open
```

**Run tests headlessly:**
```bash
npx cypress run
```

---

## Automated Test Flows

### 1. Create and Assign a Task (`createTask.cy.ts`)
Simulates a parent creating a new chore and assigning it to a family member. Verifies the task appears in the task list after saving.

### 2. Mark a Task as Complete (`completeTask.cy.ts`)
Simulates a family member locating an existing task and marking it as complete. Verifies the task reflects a completed state.
