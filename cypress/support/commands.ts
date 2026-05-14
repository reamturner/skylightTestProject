import '@testing-library/cypress/add-commands'
import 'cypress-real-events'

Cypress.Commands.add('clickAddTask', () => {
  // TODO: replace with findByRole({ name: /add task/i }) once test idea added in code. See #Project Considerations.md
  cy.get('button:has(svg path[d^="M440.39-440.39"])').click()
})

Cypress.Commands.add('selectFirstFamilyMember', () => {
  // TODO: replace with [data-testid="family-member-avatar"] once the team adds it
  cy.get('img[src*="cloudinary.com"][src*="/avatars/"]:visible', { timeout: 10000 })
    .first()
    .parents('div[id]')
    .first()
    .click()
})