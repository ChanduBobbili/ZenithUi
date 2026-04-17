import { useEffect } from "react"
import type { SankeyEmitter } from "./sankey-events"
import type { SankeyEventMap } from "../types"

/**
 * Subscribe to a Sankey event emitter event.
 * Automatically cleans up on unmount.
 */
export function useSankeyEvent<K extends keyof SankeyEventMap>(
  emitter: SankeyEmitter | null,
  event: K,
  handler: (...args: [SankeyEventMap[K]]) => void,
): void {
  useEffect(() => {
    if (!emitter) return
    emitter.on(event, handler as (...args: unknown[]) => void)
    return () => {
      emitter.off(event, handler as (...args: unknown[]) => void)
    }
  }, [emitter, event, handler])
}
