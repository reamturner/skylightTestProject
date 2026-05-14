## Exploratory Testing Findings: Customer Empathy Pass

### Testing Scope
Re-examined the Tasks feature of the Skylight desktop app through the lens of our target customer: a busy mom juggling multiple things at once. Her job-to-be-done is creating tasks for her family so they work better together as a team. Her tasks span recurring routines (brushing teeth, making the bed) and one-off chores (sweeping, laundry). The new "Up for Grabs" feature lets her create tasks anyone in the family can claim.

---

## Updated Summary
The Tasks feature is close to a refined experience, but it falls short of the polish a premium product demands. The bugs and flow issues I found aren't deal breakers, but they leave a finish that doesn't match the price point. The biggest impact lands on new users, the ones still evaluating the product, who need a near effortless experience to get things done and feel delighted. A few small tweaks could decide whether someone becomes a long-term Skylight customer and an enthusiastic referrer, or just another short-term user who drops off.

---

## New Findings Through the Customer Empathy Lens

Through this lens, the following are not "true bugs" but ways in which Skylight can make routine and chore creation easier for a busy mom, and deliver a more premium experience.

### Finding A: Icons are inconsistent throughout app
**Severity:** High

**Customer impact:** On the main task view, the sun/moon icons represent a filter for routines and the broom represents a filter for chores. Very similar icons appear on the Task Box screen, but there, they function as “add” buttons, not filters. Users will expect buttons with similar design to have similar actions. 

**Recommendation:** Change the behavior of the Task Box icons at the top of the page to be filters. Add the same blue plus button already used elsewhere in the app to this screen to add tasks. Users are already trained on it, and it clearly signals “add.” They can choose between a Routine or Chore in the Add Task flow.

---

### Finding B: No bulk-create or template flow for routines
**Severity:** High

**Customer impact:** A morning routine is six or seven tasks: brush teeth, make bed, get dressed, eat breakfast, pack backpack, brush hair, put shoes on, etc. To add each of these routines, Mom has to create each task individually, choose the same profile(s), date, stars (if subscriber), and recurrence selections for each task.

**Recommendation:** Investigate a Routine or Template builder that lets her stage multiple tasks at once, assign them to one or more profiles, and set recurrence in a single flow. As an interim fix, an "Add another" option that preserves profile, date, and recurrence (only clears the title and description) would dramatically reduce clicks. Note this would need to coexist with the fix for Bug 7, since intentional carry-over needs to be distinguishable from unintentional pre-population.

---

### Finding C: Reassignment path after incorrect date
**Severity:** Medium

**Customer impact:** When Mom sees a task with wrong date (a mistake Bug 7 potentially makes), the recovery flow takes too many clicks: open the task, click the 3-dot menu, click edit, click the section that needs changing, click the save button. Friction here punishes her for a mistake the product may have helped her make.

**Recommendation:** Make every field directly editable on the task detail screen so she can update her mistake in a single click. If every field is editable inline, the 3-dot menu can be removed. The only item that would be left is the "Delete" button which could be added to the bottom of the task detail screen. There's enough real estate across all device types to support this.

---

### Finding D: Adding tasks to the Task Box requires profile assignment
**Severity:** Medium

**Customer impact:** Especially as a new user adding their first tasks, Mom opens the app to dump every task she can think of into the Task Box, planning to assign and schedule them later. Instead she hits a wall. Each task forces a profile assignment before it can save to the Task Box. This forces a new user, who is already unfamiliar and uncomfortable with the product, to experience friction early in the product adoption cycle.

**Recommendation:** Remove the required profile assignment whenever Task Box is toggled on.

---

### Finding E: “All filtered out” state looks like “all done”
**Severity:** Medium

**Customer impact:** When active filters hide all tasks, the resulting empty screen gives the strong visual impression that every task is complete. Specifically the large Check icon, and the same language used when tasks are actually complete is misleading.

**Recommendation:** The empty state needs a clear indicator that tasks exist but are hidden by filters, not that the list is genuinely finished. 



## Related Bugs from [Bugs.md](./Bugs.md)

I've updated a few bug severities based on friction that compounds when mom is creating tasks in a hurry or planning ahead. I've also added "Customer Impact" to each bug.

• Bug 1 stays High because each failed submission feels like the product wasting her time. 
• Bug 6 drops to Low since she's most likely on the Skylight tablet, not toggling system themes.
• Bug 7 jumped to High because a silent wrong-date assignment is hard to catch and harder to undo. 


### Bug 1: No upfront indication of required fields when adding a task
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** High

**Customer impact:** She's setting up morning routines between making coffee and packing lunches. She fills in a couple of fields, clicks `Add`, and gets thrown back with an inline error. Now she has to find the missing field, fix it, and re-click. Every interruption multiplies when she's trying to add five or six tasks in a row. The product feels like it's wasting her time instead of saving it.

**Steps to Reproduce:**
1. Navigate to Tasks
2. Click Add Task
3. Leave the task name field empty
4. Select a Profile
5. Click Add

**Expected:** Required fields are clearly marked the moment the form opens. The `Add` button stays disabled until those fields are met, or fields validate inline as she fills them out.

**Actual:** No required-field indicators. The `Add` button highlights as soon as any one field has data, then errors only surface after she click Add.

See Video attachment in email for `SkylightBug#1`

---

### Bug 7: Task creation form pre-populates with data from the previous task
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** High (raised from Low)

**Customer impact:** Mom is batch-creating routines for the week. After saving one task, she clicks Add Task again and the form opens with the previous task's profile, date, and `Save to task box` state still selected. Profile is easy enough to fix (and she can multi-select anyway), but the date silently carrying over is a problem. A task she meant for Wednesday lands on Friday. The mistake is invisible until something is missed the next morning, and by then she has to untangle which tasks went where.

**Steps to Reproduce:**
*Precondition:* Just completed adding a new task to the task box.
1. Navigate to Tasks
2. Click Add Task
3. View pre-filled data

**Expected:** All fields return to a clean slate, or the form clearly signals which fields are carrying over from the previous task.

**Actual:** The profile, date and `Save to task box` are already selected upon entering the task creation form, with no obvious visual cue.

See Video attachment in email for `SkylightBug#7`

---

### Bug 6: Dark Mode / Light Mode transition requires page refresh
**Browsers:** Chrome Version 147.0.7727.101, Safari Version 26.2 (21623.1.14.11.9)

**Severity:** Low (lowered from Medium)

**Customer impact:** Brief visual inconsistency, not a blocker for any setup workflow. She likely changes modes infrequently. Worth fixing for polish.

**Steps to Reproduce:**
1. Navigate to Tasks
2. Change device settings between light and dark mode

**Expected:** Smooth transition with immediate contrast updates.

**Actual:** Transition is slow, contrast updates require a refresh.

See Video attachments in email for `SkylightBug#6_Safari` and `SkylightBug#6_Chrome`

---