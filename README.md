# Skylight QA Test Project

This project contains exploratory testing findings and automated end-to-end tests for the Skylight desktop app at [ourskylight.com](https://ourskylight.com), focused on the Tasks feature.

---

## Project Structure
 
```
skylightTestProject/
├── cypress/
│   ├── e2e/
│   │   ├── completeTask.cy.ts        # Test: Mark a task as complete
│   │   └── createTask.cy.ts          # Test: Create and assign a task
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.ts               # Custom commands (clickAddTask, selectFirstFamilyMember)
│       └── e2e.js                    # Imports testing library and real-events plugins
├── .gitignore
├── Authentication Approaches.md      # Notes on cross-domain auth challenges
├── Bugs.md                           # Documented bugs from Step 1 exploration
├── cypress.config.ts
├── cypress.env.json                  # Local only, not committed to GitHub
├── package-lock.json
├── package.json
├── Project Considerations.md         # Design decisions and tradeoffs
├── README.md
└── tsconfig.json
```

---

## Setup

### Prerequisites
- Node.js (LTS version, 18 or higher recommended)
- npm (bundled with Node.js)
- A valid Skylight account with an existing family frame

### Installation

Clone the repo and install all dependencies:

```bash
git clone https://github.com/reamturner/skylightTestProject.git
cd skylightTestProject
npm install
```

`npm install` reads `package.json` and installs Cypress along with the following plugins:

- [`@testing-library/cypress`](https://testing-library.com/docs/cypress-testing-library/intro/), provides semantic queries like `findByRole()` for more resilient, accessibility-aware selectors
- [`cypress-real-events`](https://github.com/dmtrKovalenko/cypress-real-events), simulates true browser-level pointer events, required for React Native for Web components that don't respond to Cypress's synthetic click events
Both are registered in `cypress/support/commands.ts`.

### Environment Variables

Create a `cypress.env.json` file in the root of the project (this file is gitignored and should never be committed):

```json
{
  "email": "your-skylight-email@example.com",
  "password": "your-skylight-password"
}
```

> **Note:** These credentials are currently referenced in the `beforeEach` block for future use. The active authentication flow uses `cy.pause()` for manual login (see [Authentication Approaches.md](./Authentication%20Approaches.md) for details).

---

## Running the Tests

**Open Cypress interactively:**
```bash
npx cypress open
```

Select **E2E Testing**, choose a browser, then click a spec file to run it.

### What to expect during a run

Each test begins by navigating to the Skylight login page. Because authentication spans two domains (`ourskylight.com` and `app.ourskylight.com`), the session cookie cannot be shared across them programmatically. The test pauses at `cy.pause()` after clicking "Sign In".

**When the test pauses:**
1. Log in manually with the credentials in `cypress.env.json`
2. Wait for the app to fully load
3. Click the **Resume** button in the Cypress test runner to continue

The test then proceeds through the full automated flow. See [Authentication Approaches.md](./Authentication%20Approaches.md) for what was attempted and what would resolve this in a production setup.

---

## Automated Test Flows

### 1. Create and Assign a Task (`createTask.cy.ts`)
Simulates a parent creating a new chore and assigning it to a family member. Verifies the task appears in the task list after saving.

### 2. Mark a Task as Complete (`completeTask.cy.ts`)
Simulates a family member locating an existing task and marking it as complete. Verifies the task reflects a completed state.

## Additional Documentation

- [Authentication Approaches.md](./Authentication%20Approaches.md), cross-domain authentication challenges and mitigation strategies
- [Bugs.md](./Bugs.md), documented bugs discovered during exploratory testing
- [Project Considerations.md](./Project%20Considerations.md), design decisions and tradeoffs made throughout the project