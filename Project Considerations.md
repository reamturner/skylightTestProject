## Testability Recommendations

During automation, several elements were found to lack stable, semantic selectors. The app is built with React Native for Web, which generates dynamic `unistyles_` class names that can change with any new deployment, making them unreliable as test selectors.

The following `data-testid` attributes would significantly improve test stability and are considered best practice for testable UI components:

| Element | Recommended `data-testid` |
|---|---|
| Add Task button (plus icon) | `data-testid="add-task-button"` |
| Family member list items | `data-testid="family-member"` |
| Individual task cards | `data-testid="task-item"` |
| Task completion checkbox | `data-testid="task-checkbox"` |
| Task completion checkbox selected state | `data-testid="data-testid="task-checkbox-selected"` or `data-selected="true"` |
| Bottom sheet backdrop | `data-testid="bottom-sheet-backdrop"` |
| Task title input | `data-testid="task-title-input"` |
| Family member avatar (assign) | `data-testid="family-member-avatar"` |
| Family member avatar selected state | `data-testid="family-member-avatar-selected"` or `data-selected="true"` |

Adding these attributes is a low-effort change that would unlock reliable, maintainable automation across the Tasks feature and beyond.

### Overall Findings Summary

Overall, Skylight Tasks does what it needs to do: parents can set up chores, assign them to the right family members, and see what's getting done. The design feels friendly and simple, which makes sense for the audience.

Where it starts to feel a little rough is in the small moments. Dismissing a modal, latent feedback on required fields during creation, you're sometimes left wondering if something worked. For parents who aren't super comfortable with tech, that uncertainty can add up to a less than stellar experience. Smoothing out these edges are worth prioritizing.

On the automation side, the lack of test-id and selection state inconsistency between the task list avatar component and the assignee picker component is itself a concern. Two different implementations of "select a family member" likely mean divergent behavior, duplicated code, and double the places bugs can hide.The cross-domain auth setup makes writing reliable tests genuinely tricky. A dedicated test environment would go a long way toward making that workable.