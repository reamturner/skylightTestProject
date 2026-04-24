## Authentication Approach & Known Limitation

Skylight's authentication flow spans two separate domains:
- `ourskylight.com` — the main app
- `app.ourskylight.com` — the authentication service

Cypress is the tool I am most comfortable using, and after spending more than the suggested time attempting to find a solution, I decided it was more important to show my expertise in testing the Tasks page here. I opted to insert a `cy.pause` after the sign in screen in order to move past the login flow. Clicking `Play` in the Cypress player after login will resume the test beyond this point. The test files are structured to run completely once authentication is resolved, and all test logic, selectors, and assertions are production-ready.

The session cookie set by `app.ourskylight.com` is `HttpOnly` and `SameSite`, which means browsers (and Cypress) cannot programmatically share it with `ourskylight.com`. This makes standard Cypress authentication patterns — including `cy.session()`, `cy.setCookie()`, and UI-based login — unable to produce an authenticated state on the main app domain.

Listed below are the approaches I attempted as well as suggestions for solving testing this in a production environment.

**Approaches attempted:**
- UI login flow with `cy.origin()` for cross-domain navigation
- `cy.session()` to cache and restore cookies
- Direct cookie injection via `cy.setCookie()`
- Programmatic login via `cy.request()` with CSRF token extraction

**What would solve this in a production test environment:**
- A different testing framework that can navigate authentication between URLs more easily
- A dedicated test auth API endpoint that returns a usable session token
- A same-domain authentication configuration for the test environment
- Server-side CORS/cookie configuration that allows cross-domain session sharing
