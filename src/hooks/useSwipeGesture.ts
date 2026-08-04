/**
 * Lightweight horizontal-swipe detector for rows / panels.
 *
 * Reuses the same intent-gating idea as SwipeCell: once movement exceeds
 * `axisThreshold` px we decide horizontal vs vertical. A vertical gesture
 * hands back to the container's native scroll (nothing is prevented); a
 * horizontal gesture is owned by the caller.
 *
 * When a swipe completes, the matching callback fires and the synthetic
 * `click` that follows is flagged — the owner reads `consumeClick()` at the
 * top of its onClick handler to skip the tap action (e.g. "tap to select").
 * The flag is reset on the next pointerdown, so a swipe that re-renders its
 * element away never leaks a stale suppression into a later unrelated tap.
 */
export interface UseSwipeGestureOptions {
  /** Fired when a left swipe completes. */
  onSwipeLeft?: () => void;
  /** Fired when a right swipe completes. */
  onSwipeRight?: () => void;
  /** Disable gesture handling entirely. May be a reactive accessor. */
  disabled?: boolean | (() => boolean);
  /** Movement (px) before horizontal/vertical intent is decided. Default 8. */
  axisThreshold?: number;
  /** Net horizontal distance (px) required to fire a swipe. Default 60. */
  swipeThreshold?: number;
}

export interface SwipeGestureHandlers {
  onPointerDown: (e: PointerEvent) => void;
  onPointerMove: (e: PointerEvent) => void;
  onPointerUp: (e: PointerEvent) => void;
  onPointerCancel: (e: PointerEvent) => void;
}

export function useSwipeGesture(options: UseSwipeGestureOptions): {
  handlers: SwipeGestureHandlers;
  consumeClick: () => boolean;
} {
  const axisThreshold = options.axisThreshold ?? 8;
  const swipeThreshold = options.swipeThreshold ?? 60;

  const isDisabled = () =>
    typeof options.disabled === 'function'
      ? (options.disabled as () => boolean)()
      : !!options.disabled;

  let startX = 0;
  let startY = 0;
  let curX = 0;
  let horizontal: boolean | null = null;
  let swiped = false;

  /** True if the gesture just completed a swipe; consumes the flag. */
  const consumeClick = () => {
    const s = swiped;
    swiped = false;
    return s;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (isDisabled()) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX = e.clientX;
    startY = e.clientY;
    curX = startX;
    horizontal = null;
    swiped = false;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (isDisabled() || horizontal === false) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (horizontal === null) {
      if (Math.abs(dx) < axisThreshold && Math.abs(dy) < axisThreshold) return;
      // Vertical scroll takes priority — hands off and let the container scroll.
      horizontal = Math.abs(dx) > Math.abs(dy);
      if (!horizontal) return;
    }
    curX = e.clientX;
    // Stop text-selection / horizontal scroll interference during the drag.
    e.preventDefault();
  };

  const finish = () => {
    if (horizontal === true) {
      const dx = curX - startX;
      if (Math.abs(dx) >= swipeThreshold) {
        swiped = true;
        if (dx < 0) options.onSwipeLeft?.();
        else options.onSwipeRight?.();
      }
    }
    horizontal = null;
  };

  const onPointerUp = () => finish();
  // Interrupted by the browser (e.g. scroll takeover) — not a deliberate swipe.
  const onPointerCancel = () => {
    horizontal = null;
  };

  return { handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel }, consumeClick };
}
