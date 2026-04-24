/**
 * Test Suite: Create and Assign a Task
 *
 * Covers the primary parent flow of creating a chore and assigning it
 * to a family member using the Skylight desktop app (ourskylight.com).
 *
 * Authentication Note:
 * Skylight's login flow spans two domains (ourskylight.com and
 * app.ourskylight.com). The session cookie is HttpOnly and SameSite,
 * which prevents it from being shared across domains programmatically.
 * 
 * In a production test environment this could be resolved with a
 * dedicated auth API endpoint or same-domain test configuration.
 * For this exercise, cy.pause() allows manual login before the test proceeds.
 */

describe('Create and Assign a Task', () => {
  beforeEach(() => {
    cy.visit('https://ourskylight.com/welcome')
    cy.findByRole('button', { name: /sign in/i }).realClick()

    // Manual auth workaround, see Authentication Note above. Resume after logging in.
    cy.pause()

    // Production approach (commented until cross-domain auth is resolvable):
    // cy.get('input[type="email"]', { timeout: 10000 }).should('be.visible').type(Cypress.env('email'))
    // cy.get('input[type="password"]').type(Cypress.env('password'))
    // cy.get('button[type="submit"]').click()
    // cy.contains('Continue to Skylight').click()
  })

  it('should create a task and assign it to a family member', () => {
    // Dismiss optional "Got it" onboarding modal if present
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Got it")').length > 0) {
        cy.findByRole('button', { name: /got it/i }).click()
      }
    })

    // Navigate to Tasks
    cy.contains('Tasks', { timeout: 15000 }).should('be.visible').click()
    cy.url().should('include', '/tasks')

    // Dismiss optional Tasks introduction screen (first-time flow)
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Continue")').length > 0) {
        cy.contains('button', 'Continue').should('be.visible').click()
      }
    })

    // Intercept the create-chore request before triggering it
    cy.intercept('POST', '**/chores/create_multiple').as('createChore')

    // Open the Add Task form and fill it in
    cy.clickAddTask()
    cy.get('input[placeholder="Title"]').type('Clean room')
    cy.selectFirstFamilyMember()
    cy.contains('button', 'Add').click()

    // Verify the API confirmed creation. Visual confirmation is flaky due to individually scrolling profiles.
    cy.wait('@createChore').its('response.statusCode').should('eq', 200)

    // Verify the task exists in the DOM
    cy.contains('Clean room').should('exist')
  })
})