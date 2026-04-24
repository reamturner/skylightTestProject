// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err) => {
  // Known Skylight bug - TypeError on 'numChoresCreated' after chore creation.
  // Filed in Bugs.md. Test should not fail on this app-side error.
  if (err.message.includes('numChoresCreated')) {
    return false
  }
  // Let all other uncaught errors fail the test as normal
})