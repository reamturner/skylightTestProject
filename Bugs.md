## Step One: Exploratory Testing Findings

### Testing Scope
Explored the Tasks feature of the Skylight desktop app as a primary parent managing chores and routines for a family of four.

Videos of bugs can be found in the Google Drive folder: [Skylight Bugs](https://drive.google.com/drive/folders/1ghWxm1qHKgYFnXMQSJfnKPOzTh190r93?usp=share_link)

---

### Bug 1: Submission can be attempted before all required fields are met
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** High

**Description:** When creating a new task, as long as one field contains new data, the `Add` button highlights, indicating you can save. It isn't until the user taps the `Add` button that missing required information is brought to the user's attention.

**Steps to Reproduce:**
1. Navigate to Tasks
2. Click Add Task
3. Leave the task name field empty
4. Select a Profile
5. Click Add

**Expected:** Submission should be blocked until all required fields contain data. Required fields should be known to the user ahead of time.

**Actual:** The user can attempt to add task after one required field has been met. Only then will an inline error appear.

See Video attachment in email for `SkylightBug#1`

---

### Bug 2: Adding a task to the `Task Box` requires profile assignment
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** Medium

**Description:** I want to be able to add a task to the task box to be assigned at a later date.

**Steps to Reproduce:**
1. Navigate to Tasks
2. Click Add Task
3. Add Title for task
4. Uncheck the Date box button
5. Check the Task Box button
6. Click `Add`

**Expected:** The newly created task is added to the `Task Box` for anyone to pick up at a later date.

**Actual:** I must assign this new task to a profile before adding it, which makes it appear under that profile for all days until completed.

See Video attachment in email for `SkylightBug#2`

---
### Bug 3: Unhandled TypeError after chore creation - found via automated test
**Browsers:** Chrome Version 147.0.7727.101

**Severity:** Medium 

**Description:** Task creation succeeds visually, but a silent error is thrown and reported to Sentry on every chore save. This creates noise in error monitoring and suggests a broken assumption in the response handler that may cause downstream features (analytics, counters, achievement logic) to silently fail.

**Steps to Reproduce:**
1. Log into the app
2. Navigate to Tasks
3. Click Add Task
4. Add a title for the task
5. Select a Profile
6. Click Add
7. Open browser DevTools Console (or observe Sentry logs).

**Expected:** The task saves successfully and the response is processed without errors.

**Actual:** After successfully creating a chore via the Add Task form, the Skylight app throws an unhandled promise rejection: `TypeError: Cannot read properties of undefined (reading 'numChoresCreated')`. The POST to `/api/frames/{frameId}/chores/create_multiple` returns 200 and the task appears in the list as expected, but the client-side response handler fails when attempting to read `numChoresCreated` on an undefined object. The error is captured by Sentry.

---

### Bug 4: Task Checkbox Missing `aria-checked` Attribute (Accessibility)
**Browsers:** Chrome Version 147.0.7727.101 

**Severity:** Medium

**Description:** The task completion checkbox uses `role="checkbox"` but does not include an `aria-checked` attribute to communicate its state to assistive technologies. When a user checks or unchecks a task, only a CSS class changes — screen readers have no way to detect or announce the state change.

**Steps to Reproduce:**
1. Navigate to Tasks
2. Inspect the checkbox element on any task
3. Check and uncheck the checkbox
4. Observe that `aria-checked` is never set on the element

**Expected:** The element should include `aria-checked="false"` when unchecked and `aria-checked="true"` when checked, in line with ARIA best practices for `role="checkbox"`.

**Actual:** No `aria-checked` attribute is present in either state, making the checkbox invisible to screen readers and breaking automated test assertions that rely on semantic state.

---

### Bug 5: Profile list flickers and shows artifacts when resizing browser window
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** Medium

**Description:** Strange artifact and `All Profiles` list appear when shrinking browser window, user can still horizontally scroll to see individual profiles.

**Steps to Reproduce:**
1. Navigate to Tasks
2. Shrink the browser window

**Expected:** Resizing should be smooth and no artifacts should be observed. If `All Profiles` is expected, regular profiles should be hidden from view until the screen is expanded and `All Profiles` is hidden again.

**Actual:** On Chrome, transition is not smooth. Profiles flicker in and out as `All Profiles` comes and goes.
On Safari, transition is jumpier than Chrome. `All Profiles` is viewed as well as individual profiles.

See Video attachments in email for `SkylightBug#5_Safari` and `SkylightBug#5_Chrome`

---

### Bug 6: Dark Mode / Light Mode transition requires page refresh to fully apply
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** Medium

**Description:** Transition to/from Dark Mode/Light Mode is not complete until a refresh.

**Steps to Reproduce:**
1. Navigate to Tasks
2. Change device settings between light and dark mode

**Expected:** Transition should be smooth and appropriate contrast should occur immediately.

**Actual:** Transition is slow, and contrast updates are not immediate. Requires a refresh for all text contrast to occur.

See Video attachments in email for `SkylightBug#6_Safari` and `SkylightBug#6_Chrome`

---

### Bug 7: Task creation form pre-populates with data from previous task
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** Low

**Description:** When creating subsequent tasks, some fields are pre-populated with details from the last task created.

**Steps to Reproduce:**
*Precondition:* Just completed adding a new task to the task box.
1. Navigate to Tasks
2. Click Add Task
3. View pre-filled data

**Expected:** All fields should return to a clean slate.

**Actual:** The profile and `Save to task box` are already selected upon entering the task creation form.

See Video attachment in email for `SkylightBug#7`