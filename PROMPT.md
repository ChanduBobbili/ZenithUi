# Grid Layout — ZenithUI Implementation Prompt

## Context

Analyse the `grid-layout` component from the `anthra-labs` internal codebase
(`src/components/ui/grid-layout/`) and port it as a standalone, publishable
package `@zenithui/grid-layout` inside the ZenithUI monorepo
(`packages/@zenithui/grid-layout`).

---

## Source Component Analysis (`anthra-labs`)

### File Map

| File | Responsibility |
|------|---------------|
| `types.ts` | `GridCell<T>`, `GridRow<T>`, `GridLayoutConfig<T>` interfaces |
| `utils.ts` | Pure layout-mutation helpers (swap, resize, snap-to-grid, move, insert) |
| `handlers.tsx` | `ColResizeHandle` & `RowResizeHandle` – animated drag handles via `framer-motion` |
| `cell.tsx` | `GridItem<T>` – single draggable/droppable cell with optional drag-handle overlay |
| `row.tsx` | `GridRowLine<T>` – horizontal row of cells with column-resize support and 12-column grid guides |
| `layout.tsx` | `GridLayout<T>` – top-level orchestrator; owns all drag-and-drop and resize state |
| `index.ts` | Barrel export |

### Core Features

1. **Drag-and-Drop Cells** — swap, insert-left, insert-right (25 % edge threshold), or eject to a new row via drop-zone strips between rows.
2. **Drag-and-Drop Rows** — swap full rows by dragging the row handle.
3. **Column Resize** — live mouse-drag resize between adjacent cells; delta converted to percentage of row width; snaps to nearest 12-column grid unit on release.
4. **Row Resize** — vertical mouse-drag resize; minimum height respected.
5. **12-Column Snap Grid** — visual column guides during resize; snaps on `mouseup`.
6. **Render Props API** — `renderItem`, `renderDragHandle`, `renderRowControls`, `renderEmptyState`, `rowResizeHandle`, `colResizeHandle` for full UI customisation.
7. **Readonly Mode** — single boolean disables all interactions.
8. **Per-cell / per-row flags** — `reorderable` and `resizable` opt specific cells or rows out of interactions.
9. **Configurable gaps** — `columnGapPx` / `rowGapPx` props.
10. **Framer-motion handles** — spring-animated indicator dot that follows the cursor along the resize rail.

### State Machine (inside `GridLayout`)

```
draggedId / draggedType ("row" | "cell" | null)
dragTargetId / dragTargetPosition ("left" | "right" | "swap" | "newRow" | null)
isResizing
colResizingRowId
```

---

## Target Package: `@zenithui/grid-layout`

### Monorepo Location

```
packages/@zenithui/grid-layout/
```

### Package Conventions (match existing `@zenithui/*` packages)

- **Build**: `rslib` (`rslib.config.ts`) with `pluginReact`, `pluginCssMinimizer`, `pluginDts`
- **Lint / Format**: `biome` (`biome.json`)
- **TypeScript**: strict, ESNext modules, `moduleResolution: bundler`
- **Peer deps**: `react >=17`, `react-dom >=17`
- **Runtime deps**: `@zenithui/utils` (workspace), `framer-motion` ≥11
- **Exports**: single `"."` entry → `./dist/index.js` + `./dist/index.d.ts`
- **Scripts**: `build`, `dev`, `check`, `lint`, `clean`, `prepublishOnly`, `prepack`, `postpublish`

### Adaptation Notes

| anthra-labs | @zenithui/grid-layout |
|-------------|----------------------|
| `import { cn } from "@/lib/utils"` | `import { cn } from "@zenithui/utils"` |
| Tailwind class strings | Same (Tailwind v4 compatible) |
| `framer-motion` motion primitives | Keep — add as direct dep |
| Internal barrel `index.ts` | Export everything: types, utils, cell, row, handlers, layout |

### Source File Structure

```
src/
├── index.ts          — barrel export
├── types.ts          — GridCell<T>, GridRow<T>, GridLayoutConfig<T>
├── utils.ts          — pure layout helpers
├── handlers.tsx      — ColResizeHandle, RowResizeHandle
├── cell.tsx          — GridItem<T>
├── row.tsx           — GridRowLine<T>
└── layout.tsx        — GridLayout<T>  (main component)
```

### Key Acceptance Criteria

- [ ] `GridLayout` renders correctly with zero rows (empty state) and N rows.
- [ ] Cells drag-and-drop across rows and within the same row (swap + insert).
- [ ] Rows drag-and-drop (swap).
- [ ] Column resize updates cell widths and snaps to 12-col grid on release.
- [ ] Row resize respects `minHeight`.
- [ ] `readonly={true}` disables all interactions.
- [ ] Custom `renderItem`, `renderDragHandle`, `renderRowControls` props work.
- [ ] Package builds cleanly with `pnpm build` and exports correct types.
- [ ] No implicit `any` TypeScript errors.
