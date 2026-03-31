---
"@zenithui/day-picker": minor
---

1. **Fixed infinite re-render in range mode** — Selecting a second date in range mode previously triggered an endless render loop, freezing the browser tab. The root cause was a reactive effect that fired the selection callback on every render. The callback is now invoked once per click instead.

2. **Replaced runtime crash with graceful error logging** — Passing incorrect prop types (e.g., a single date in range mode) previously threw an error that crashed the entire application. It now logs a descriptive console error and renders nothing, allowing the rest of the app to continue functioning.

3. **Fixed memory leak from hover debounce** — Hovering over day cells rapidly created multiple timers that were never cleaned up. Each stale timer caused unnecessary state updates and memory consumption. Timers are now properly tracked and cancelled before creating new ones.

4. **Memoized internal context value** — The calendar's internal state was being wrapped in a new object on every render, causing all child components to re-render unnecessarily. The context value is now memoized so children only re-render when relevant values actually change.

5. **Fixed broken React key on day buttons** — Day buttons used an incorrect key that evaluated to a static function reference instead of a unique identifier. This has been replaced with a stable, date-based key for correct reconciliation.

6. **Fixed today being shown as selected when no date is picked** — When no date was selected, today's date was incorrectly highlighted as the active selection due to a fallback to the current date in the comparison logic.

7. **Fixed today being highlighted as range start with no selection** — Similar to the above, the range start indicator incorrectly fell back to today's date when no range was selected. Proper null checks now prevent any highlighting when no range exists.

8. **Added basic accessibility attributes to day buttons** — Day buttons now include descriptive labels (e.g., "Tuesday, June 10, 2025") and selection state for screen readers, improving usability for assistive technologies.

9. **Fixed state update after unmount** — If the calendar was removed from the page while a hover timer was pending, the timer would fire and attempt to update state on an unmounted component. The timer is now cleared on unmount.

10. **Optimized month list recomputation** — The month picker grid was recomputed every time the user navigated between months, even though it only depends on the year. It now only recomputes when the year changes.
