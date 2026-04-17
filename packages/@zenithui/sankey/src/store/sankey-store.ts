import { create, type StoreApi } from "zustand"
import { immer } from "zustand/middleware/immer"
import type {
  SankeyItemIdentifier,
  SankeyLayout,
  SankeyLayoutLink,
  SankeyLayoutNode,
} from "../types"

// ─── State Shape ─────────────────────────────────────────────────────

export interface SankeyStoreState {
  // Layout
  layout: SankeyLayout

  // Interaction
  hoveredItem: SankeyLayoutNode | SankeyLayoutLink | null
  highlightedItem: SankeyItemIdentifier | null

  // Actions
  setLayout: (layout: SankeyLayout) => void
  setHoveredItem: (item: SankeyLayoutNode | SankeyLayoutLink | null) => void
  setHighlightedItem: (item: SankeyItemIdentifier | null) => void
  clearInteraction: () => void
}

// ─── Store Type ─────────────────────────────────────────────────────

export type SankeyStore = StoreApi<SankeyStoreState> & {
  (): SankeyStoreState
  <T>(selector: (state: SankeyStoreState) => T): T
}

// ─── Store Factory ──────────────────────────────────────────────────

/**
 * Create a per-instance Sankey store.
 * Each <SankeyChart /> gets its own store — no global singleton.
 */
export function createSankeyStore(): SankeyStore {
  return create<SankeyStoreState>()(
    immer((set) => ({
      // Initial state
      layout: { nodes: [], links: [] },
      hoveredItem: null,
      highlightedItem: null,

      // Actions
      setLayout: (layout) =>
        set((state) => {
          state.layout = layout
        }),

      setHoveredItem: (item) =>
        set((state) => {
          state.hoveredItem = item
        }),

      setHighlightedItem: (item) =>
        set((state) => {
          state.highlightedItem = item
        }),

      clearInteraction: () =>
        set((state) => {
          state.hoveredItem = null
          state.highlightedItem = null
        }),
    })),
  ) as SankeyStore
}
