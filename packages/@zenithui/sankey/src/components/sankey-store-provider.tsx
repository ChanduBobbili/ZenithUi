import { createContext, useContext, useRef, type ReactNode } from "react"
import { createSankeyStore, type SankeyStore } from "../store/sankey-store"
import {
  createSankeyEmitter,
  type SankeyEmitter,
} from "../events/sankey-events"

// ─── Context ─────────────────────────────────────────────────────────

interface SankeyContextValue {
  store: SankeyStore
  emitter: SankeyEmitter
}

const SankeyContext = createContext<SankeyContextValue | null>(null)

export function useSankeyContext(): SankeyContextValue {
  const ctx = useContext(SankeyContext)
  if (!ctx) {
    throw new Error(
      "useSankeyContext must be used within a <SankeyStoreProvider />",
    )
  }
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────

interface SankeyStoreProviderProps {
  children: ReactNode
}

/**
 * Creates a per-instance store + emitter and provides them via context.
 */
export function SankeyStoreProvider({ children }: SankeyStoreProviderProps) {
  const storeRef = useRef<SankeyStore | null>(null)
  const emitterRef = useRef<SankeyEmitter | null>(null)

  if (!storeRef.current) {
    storeRef.current = createSankeyStore()
  }
  if (!emitterRef.current) {
    emitterRef.current = createSankeyEmitter()
  }

  return (
    <SankeyContext.Provider
      value={{ store: storeRef.current, emitter: emitterRef.current }}
    >
      {children}
    </SankeyContext.Provider>
  )
}
