import type { EventBusEvent, EventBusHandler } from './types';
export type { EventBusEvent, EventBusHandler, EventBusComponent, EventBusEventType } from './types';

/** Module-level handler — null by default (zero cost when unused). */
let globalHandler: EventBusHandler | null = null;

/**
 * Fire an event on the global EventBus.
 * Components call this after their normal callback dispatch.
 * No-op when no handler is registered (just a null check).
 */
export function emitEvent(event: EventBusEvent): void {
  globalHandler?.(event);
}

/**
 * Register the global event handler. Call once at app startup.
 * Pass `null` to unregister.
 *
 * @example
 * ```ts
 * import { setEventBusHandler } from 'solid-mobile';
 *
 * setEventBusHandler((event) => {
 *   console.log(`[${event.component}] ${event.type}`, event.payload);
 * });
 * ```
 */
export function setEventBusHandler(h: EventBusHandler | null): void {
  globalHandler = h;
}

/**
 * Returns the currently registered handler (or null).
 * Primarily for debugging or testing.
 */
export function getEventBusHandler(): EventBusHandler | null {
  return globalHandler;
}
