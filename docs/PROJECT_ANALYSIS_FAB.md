# ZenithUi Project Analysis — FAB Component

**Date:** February 3, 2025  
**Scope:** Monorepo structure, component patterns, and FAB package readiness.

---

## 1. Repository overview

- **Name:** ZenithUi  
- **Structure:** Turborepo monorepo with **pnpm** workspaces  
- **Apps:** `react-test-app` (Vite), `zenithui-docs` (Next.js)  
- **Packages:** Under `packages/@zenithui/` (day-picker, fab, light-box, time-picker, toast, tooltip, utils) and `zenithui-primitive`  
- **Build:** `turbo run build`, per-package `rslib build` for libs  

---

## 2. Package patterns

### 2.1 Shared conventions

| Aspect | Pattern |
|--------|--------|
| **Build** | `@rslib/core` + `rsbuild-plugin-dts`, ESM output to `dist/` |
| **Lint/format** | Biome (`check`, `format`, `lint`, `lint:fix`) |
| **Exports** | Single entry `"."` → `dist/index.js` + `dist/index.d.ts` |
| **Peer deps** | `react`, `react-dom` (>=17) |
| **Styling** | No built-in CSS; consumers use `className` / Tailwind; `cn()` from `@zenithui/utils` |
| **Naming** | Compound components: `Root`, `Trigger`, `Content` (and domain-specific like `Arrow`, `Provider`) |

### 2.2 Component architecture

- **Compound components:** Context + subcomponents (e.g. Tooltip: `Provider` → `Root` → `Trigger` / `Content` / `Arrow`).
- **Primitives:** Headless behavior; styling and DOM structure are left to the app (e.g. docs wrap with Tailwind + `cn()`).
- **State:** Custom hooks (e.g. `useTooltipState`, `useFabState`) own refs, position, open state, and event handlers.

### 2.3 Tooltip (reference pattern)

- Uses **@floating-ui/react**: `useFloating`, `FloatingPortal`, `autoUpdate`, `flip`, `shift`, `offset`, `arrow`, `useHover`, `useDismiss`, etc.
- **Provider** (optional) for `delayDuration`.
- **Root** composes provider + hook and exposes context.
- **Trigger** supports `asChild` and merges refs with `useMergeRefs`.
- **Content** uses `floatingStyles`, optional animation (fade/slide/zoom), and **FloatingPortal** for body rendering.
- No Tailwind in the package; docs apply `className` in `registry/ui/tooltip.tsx`.

### 2.4 Utils usage

From `@zenithui/utils`:

- **`cn()`** — class merging (used in FAB and elsewhere).
- **`useEventListener`** — document/window events (FAB: mousedown, keydown, resize).
- **`useIsomorphicLayoutEffect`** — imported in FAB state but **not used** in current code (dead import).

---

## 3. FAB package deep dive

### 3.1 Current layout

```
packages/@zenithui/fab/
├── package.json
├── rslib.config.ts
├── src/
│   ├── index.ts              # Re-exports Root, Trigger, Content
│   └── components/
│       ├── fab.tsx           # FabRoot, FabTrigger, FabContent
│       ├── state.ts          # useFabState, FabContext, placement math
│       └── types.ts          # POSITION, PLACEMENT, FAB_* types
```

### 3.2 Public API

- **FabRoot (Root):** `open`, `onOpenChange`, `position`, `xOffset`, `yOffset`, `dismissOutsideClick`, `dismissOnEsc`, `children`.
- **FabTrigger (Trigger):** `children`, `asChild`, button props; renders via **createPortal** to `document.body`.
- **FabContent (Content):** `placement`, `offset`, `className`, `children`; also portaled to body when `open`.

### 3.3 Behavior summary

- **Position:** Fixed FAB in one of 9 positions (e.g. `bottom-right`, `top-center`). Trigger position is computed in `calculateTriggerPlacement` from viewport and offsets.
- **Content placement:** Content position is computed in `getBestPlacement` / `calculateContentPlacement` with flip/overlap logic and viewport clamping; **@floating-ui is not used** (custom math).
- **Dismissal:** Click outside (optional) and Escape (optional) close the content.
- **Rendering:** Trigger and Content are portaled to `document.body`; inline styles for `position: fixed`, `left`, `top`, `zIndex: 9999`; hardcoded placeholder styles (e.g. `backgroundColor: "cornflowerblue"`).

### 3.4 Issues identified

1. **Controlled state ignored**  
   `FabRoot` accepts `open` and `onOpenChange`, but `useFabState` does not. The hook always uses `useState(true)`, so the component is effectively **uncontrolled** and the props have no effect. The context exposes `stateOpen`/`setOpen` from the hook, not from props.

2. **Default open**  
   Hook initial state is `true`, so content starts open; usually FAB starts closed.

3. **setOffset no-op**  
   `setOffset` in context is `() => {}`, so `FabContent`’s `offset` cannot update the state used for positioning.

4. **Stale closure in updateCoords**  
   `updateCoords` is a plain function that reads refs and calls `setTriggerCoords` / `setContentCoords`. It’s used in `useEffect` and as a resize/DOMContentLoaded listener. When content isn’t mounted yet (e.g. first open), `contentRef.current` can be null and content position isn’t set; no scheduling of a second pass after content mount.

5. **Debug leftover**  
   `console.log(contentCords)` in `state.ts` should be removed for production.

6. **Package metadata**  
   `package.json` description and keywords still refer to “Light Box”; should be updated to FAB.

7. **Unused import**  
   `useIsomorphicLayoutEffect` is imported in `state.ts` but never used.

8. **asChild not implemented**  
   `FabTrigger` declares `asChild` but always renders a `<button>`; no `React.cloneElement`/slot pattern like in Tooltip.

9. **Accessibility**  
   No `aria-expanded`, `aria-haspopup`, or focus management for the floating content (focus trap, return focus on close).

---

## 4. Docs app integration

- **Registry:** `apps/zenithui-docs/registry.json` lists UI blocks (e.g. time-picker, tooltip, light-box). **FAB is not listed** yet.
- **Preview component:** `src/components/fab/basic.tsx` uses `@zenithui/fab` with controlled `open`/`onOpenChange` (which currently don’t drive the internal state).
- **Pattern for other components:**  
  - Add entry in `registry.json` for `fab`.  
  - Add `registry/ui/fab.tsx` that re-exports/wraps primitives with Tailwind classes (and `cn()`).  
  - Add docs content under `src/content/` and link from sidebar/nav.

---

## 5. Recommendations for building the FAB component

### 5.1 State and API

- Support **controlled and uncontrolled** usage:
  - If `open` and `onOpenChange` are provided, use them; otherwise use internal `useState(false)`.
  - Sync internal state with `open` when it changes (e.g. `useEffect` or derived state).
- Default **open** to `false` when uncontrolled.
- Implement **setOffset** (and optionally **setPlacement**) in the hook so Content’s `offset`/`placement` props actually update positioning.

### 5.2 Positioning and layout

- Consider **@floating-ui/react** for Content (like Tooltip): `useFloating`, `FloatingPortal`, `flip`, `shift`, so that edge cases and RTL are handled and less custom math is maintained. Trigger position can stay custom (fixed screen corners) or also use floating-ui with a virtual reference.
- Alternatively, keep custom placement but fix content positioning when it mounts (e.g. run `updateCoords` after content is visible, or use a layout effect that depends on `open` and content ref).

### 5.3 Styling and structure

- Remove hardcoded colors/sizes (e.g. `cornflowerblue`, `minWidth: "400px"`). Use `className` (and optionally `style`) so the docs app can apply Tailwind or design tokens.
- Keep trigger and content as minimal wrappers (e.g. `div`/`button`) and let consumers pass `className` and children (icons, labels, lists).

### 5.4 Trigger

- Implement **asChild** for `FabTrigger` (clone single child, merge ref and props) so an icon button or custom element can be the trigger.

### 5.5 A11y and UX

- Set **aria-expanded** (and **aria-haspopup**) on the trigger from `open`.
- Consider **focus trap** inside Content and **focus return** to trigger on close (e.g. optional or behind a prop).

### 5.6 Cleanup

- Remove `console.log(contentCords)`.
- Remove unused `useIsomorphicLayoutEffect` or use it where a layout effect is needed (e.g. measuring after open).
- Fix **package.json** description and keywords for FAB.
- Optionally remove **@floating-ui/react** from dependencies if you keep fully custom positioning; otherwise keep and use it for Content.

### 5.7 Docs

- Add FAB to **registry.json** and create **registry/ui/fab.tsx** with styled Root/Trigger/Content.
- Add a FAB doc page and demos (basic, placement, with list of actions, etc.).

---

## 6. File reference summary

| Purpose | Path |
|--------|------|
| FAB entry | `packages/@zenithui/fab/src/index.ts` |
| FAB components | `packages/@zenithui/fab/src/components/fab.tsx` |
| FAB state & placement | `packages/@zenithui/fab/src/components/state.ts` |
| FAB types | `packages/@zenithui/fab/src/components/types.ts` |
| FAB package config | `packages/@zenithui/fab/package.json` |
| Docs FAB demo | `apps/zenithui-docs/src/components/fab/basic.tsx` |
| Docs registry | `apps/zenithui-docs/registry.json` |
| Tooltip (pattern) | `packages/@zenithui/tooltip/src/tooltip/index.tsx`, `useTooltipState.ts` |
| Utils | `packages/@zenithui/utils/src/index.ts`, `lib/utils.ts` |

---

This report is intended as a single reference for understanding the project and the current FAB implementation before implementing the fixes and enhancements above.
