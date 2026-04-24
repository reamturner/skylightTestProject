/**
 * Test Suite: Mark a Task as Complete
 *
 * Covers the flow of a family member marking an existing chore as
 * complete using the Skylight desktop app (ourskylight.com).
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

describe('Mark a Task as Complete', () => {
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

  it('should mark an existing task as complete', () => {
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

    // Intercept the completion request before triggering it
    cy.intercept('PUT', '**/chores/*/completions').as('completeTask')

    // Scroll the "Clean room" task into view within its scrollable container
    cy.contains('Clean room').then(($el) => {
      $el[0].scrollIntoView({ block: 'center', behavior: 'instant' })
    })

    // Find the task row and click its checkbox
    cy.contains('Clean room')
      .closest(':has([role="checkbox"])')
      .find('[role="checkbox"]')
      .click()

    // Verify the API confirmed the task was marked complete
    cy.wait('@completeTask').its('response.statusCode').should('be.oneOf', [200, 204])
  })
})