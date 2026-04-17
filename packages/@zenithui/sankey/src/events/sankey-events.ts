import EventEmitter from "eventemitter3"
import type { SankeyEventMap } from "../types"

export type SankeyEmitter = EventEmitter<SankeyEventMap>

/**
 * Create a typed event emitter for chart interactions.
 * Each <SankeyChart /> instance gets its own emitter.
 */
export function createSankeyEmitter(): SankeyEmitter {
  return new EventEmitter<SankeyEventMap>()
}
