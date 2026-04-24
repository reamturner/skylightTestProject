## Authentication Approach & Known Limitation

I ran into issues during authentication getting Cypress to flow between the two separate domains. Cypress is the tool I decided to use for this project. There may be other tools that would be able to navigate the log in flow without issue. After spending significant time to find a solution, I decided it was more important to show my expertise in testing the Tasks page, as you will see in `createTask.cy.ts` and `completeTask.cy.ts`. 

I opted to insert a `cy.pause` after the sign in screen in order to move past the login flow. Clicking `Play` in the Cypress player after login will resume the test beyond this point. The test files are structured to run completely once authentication is resolved, and all test logic, selectors, and assertions are production-ready.

Skylight's authentication flow spans two separate domains:
- `ourskylight.com` — the main app
- `app.ourskylight.com` — the authentication service

Listed below are the approaches I attempted as well as suggestions for testing this in a production environment.

**What I tried:**
- Having the test click through the login screen the same way a person would, including handling the jump between the two Skylight web addresses.
- Letting Cypress save and reuse the login token between tests so it doesn't have to log in every time.
- Writing the login token directly into the test, pretending the user had already signed in.
- Skipping the login page entirely and asking Skylight's servers to hand over the token after the test submitted credentials behind the scenes.

**What would actually fix this on the Skylight side:**
- Use a different testing tool that handles logins across two different web addresses more gracefully.
- Have the Skylight dev team build a small, test-only shortcut that hands the test a ready-to-use login token instead of making it go through the login page.
- Set up the test environment so the whole login process happens on a single web address instead of bouncing between two.
- Adjust Skylight's server settings so the login token is allowed to be shared between the two web addresses.