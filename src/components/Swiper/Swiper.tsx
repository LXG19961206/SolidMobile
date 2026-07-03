import {
  createSignal, createEffect, createMemo, on, onMount, onCleanup,
  mergeProps, splitProps, For, Show, batch, type Component, type JSX,
} from 'solid-js';
import { cn } from '../../utils';
import { emitEvent } from '../../event-bus';
import type { SwiperProps } from './types';
import styles from './Swiper.module.css';

/* ── Helpers ── */

function toPx(v: string | number | undefined, fallback: string): string {
  if (v == null) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

function toNum(v: string | number | undefined, fallback: number): number {
  if (v == null) return fallback;
  return typeof v === 'number' ? v : parseFloat(v) || fallback;
}

/* ── Defaults ── */

const defaultProps: Partial<SwiperProps> = {
  duration: 500,
  initialSwipe: 0,
  loop: true,
  showIndicators: true,
  vertical: false,
  touchable: true,
  stopPropagation: true,
  lazyRender: false,
  indicatorColor: '#1989fa',
};

/* ══════════════════════════════════════════════════════════════════
   Swiper
   ══════════════════════════════════════════════════════════════════ */

export const Swiper: Component<SwiperProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'autoplay', 'duration', 'initialSwipe', 'width', 'height',
    'loop', 'showIndicators', 'vertical', 'touchable', 'stopPropagation',
    'lazyRender', 'indicatorColor', 'indicators', 'imgUrls',
    'onChange', 'children', 'class', 'style',
  ]);

  const rawTotal = createMemo(() => (local.imgUrls?.length || (local.children as any)?.length || 0));
  const total = () => rawTotal();
  // Loop mode: add 2 clones (first at end, last at start), actual total is +2
  const virtualTotal = () => (local.loop && total() > 1 ? total() + 2 : total());
  const loopOffset = () => (local.loop && total() > 1 ? 1 : 0);

  const [current, setCurrent] = createSignal(toNum(local.initialSwipe, 0));
  const [translate, setTranslate] = createSignal(0);
  const [transitioning, setTransitioning] = createSignal(false);
  /** Actual rendered slide width (horizontal) or height (vertical), in pixels */
  const [slideStep, setSlideStep] = createSignal(0);

  const duration = () => toNum(local.duration, 500);
  const isVertical = () => !!local.vertical;

  /* ── Track ref ── */
  let trackEl!: HTMLDivElement;
  let autoplayTimer: ReturnType<typeof setInterval> | null = null;
  const dragState = { startX: 0, startY: 0, startT: 0, moved: false };
  let lastTouchTime = 0; // timestamp of last touchend — guards against synthesized mouse events

  /* ── Measure the actual rendered slide size ── */
  function measureSlideStep(): number {
    if (!trackEl) return 0;
    const slide = trackEl.firstElementChild;
    if (!slide) return 0;
    const rect = slide.getBoundingClientRect();
    return Math.round(isVertical() ? rect.height : rect.width);
  }

  /* ── Swipe to index ── */
  function swipeTo(idx: number, animate = true) {
    const N = total();
    const step = slideStep();
    if (N === 0 || step <= 0) return;
    const prevTarget = current();

    // Wrap to valid range
    let target = local.loop ? ((idx % N) + N) % N : Math.max(0, Math.min(N - 1, idx));

    // Loop: determine virtIdx to animate through the clone slide
    let virtIdx = target;
    if (local.loop && N > 1) {
      if (prevTarget === N - 1 && target === 0) {
        // Wrapping forward: animate to temp0 clone (at position N+1)
        virtIdx = N + 1;
      } else if (prevTarget === 0 && target === N - 1) {
        // Wrapping backward: animate to temp2 clone (at position 0)
        virtIdx = 0;
      } else {
        virtIdx = target + 1;
      }
    } else {
      virtIdx = target;
    }

    setTransitioning(animate);
    setCurrent(target);
    setTranslate(-virtIdx * step);

    if (animate) {
      setTimeout(() => {
        batch(() => {
          setTransitioning(false);
          // After clone animation, jump to real position silently
          if (local.loop && N > 1) {
            setTranslate(-(target + 1) * step);
          }
        });
      }, duration() + 20);
    }

    local.onChange?.(target);
    emitEvent({ component: 'Slider', type: 'change', payload: target, timestamp: Date.now() });
  }

  function next() { swipeTo(current() + 1); }
  function prev() { swipeTo(current() - 1); }

  /* ── Autoplay ── */
  function startAutoplay() {
    stopAutoplay();
    const ms = toNum(local.autoplay, 0);
    if (ms <= 0 || rawTotal() <= 1) return;
    autoplayTimer = setInterval(next, ms);
  }
  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }

  createEffect(on(total, () => { if (local.autoplay) startAutoplay(); }));
  onMount(() => {
    // Measure the first slide to get the pixel step
    const step = measureSlideStep();
    if (step > 0) setSlideStep(step);

    // Set initial translate
    const initIdx = toNum(local.initialSwipe, 0);
    const N = total();
    if (N > 0) {
      const virtIdx = local.loop && N > 1 ? initIdx + 1 : initIdx;
      setTranslate(-virtIdx * (step > 0 ? step : 1));
    }

    // Watch for container resizes → recalc step & reposition
    const ro = new ResizeObserver(() => {
      const s = measureSlideStep();
      if (s > 0) {
        const cur = current();
        const off = local.loop && total() > 1 ? cur + 1 : cur;
        setSlideStep(s);
        setTranslate(-off * s);
      }
    });
    ro.observe(trackEl);
    onCleanup(() => {
      stopAutoplay();
      window.removeEventListener('mousemove', onMouseDragMove);
      window.removeEventListener('mouseup', onMouseDragEnd);
      ro.disconnect();
    });
    if (local.autoplay) startAutoplay();
  });

  /* ── Touch ── */
  function onTouchStart(e: TouchEvent) {
    if (!local.touchable) return;
    if (transitioning()) {
      batch(() => {
        setTransitioning(false);
        const N = total();
        if (local.loop && N > 1) {
          const step = slideStep();
          if (step > 0) setTranslate(-(current() + 1) * step);
        }
      });
    }
    stopAutoplay();
    const t = e.touches[0];
    dragState.startX = t.clientX;
    dragState.startY = t.clientY;
    dragState.startT = translate();
    dragState.moved = false;
    if (local.stopPropagation) { e.stopPropagation(); e.preventDefault(); }
  }

  function onTouchMove(e: TouchEvent) {
    if (!local.touchable) return;
    const t = e.touches[0];
    const dx = t.clientX - dragState.startX;
    const dy = t.clientY - dragState.startY;
    const delta = isVertical() ? dy : dx;
    if (Math.abs(delta) < 5) return;
    dragState.moved = true;
    if (local.stopPropagation) { e.stopPropagation(); e.preventDefault(); }

    // Drag offset is already in pixels, translate is in pixels
    let newT = dragState.startT + delta;

    const step = slideStep();
    const maxT = 0;
    const minT = -(virtualTotal() - 1) * (step > 0 ? step : 1);
    if (newT > maxT) newT = maxT + (newT - maxT) * 0.3;
    else if (newT < minT) newT = minT + (newT - minT) * 0.3;

    setTranslate(newT);
  }

  function onTouchEnd(_e: TouchEvent) {
    lastTouchTime = Date.now();
    if (!local.touchable) return;
    if (!dragState.moved) { startAutoplay(); return; }

    const delta = translate() - dragState.startT;
    const step = slideStep();
    const threshold = step > 0 && Math.abs(delta) > step * 0.2
      ? (delta > 0 ? -1 : 1) : 0;
    swipeTo(current() + threshold);
    startAutoplay();
  }

  /* ── Mouse ── */
  function onMouseDown(e: MouseEvent) {
    if (!local.touchable || e.button !== 0) return;
    // Ignore synthesized mouse events that follow a touch gesture
    if (Date.now() - lastTouchTime < 300) return;

    if (transitioning()) {
      batch(() => {
        setTransitioning(false);
        if (local.loop && total() > 1) {
          const step = slideStep();
          if (step > 0) setTranslate(-(current() + 1) * step);
        }
      });
    }
    stopAutoplay();
    dragState.startX = e.clientX;
    dragState.startY = e.clientY;
    dragState.startT = translate();
    dragState.moved = false;
    if (local.stopPropagation) { e.stopPropagation(); e.preventDefault(); }

    window.addEventListener('mousemove', onMouseDragMove);
    window.addEventListener('mouseup', onMouseDragEnd);
  }

  function onMouseDragMove(e: MouseEvent) {
    if (!local.touchable) return;

    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    const delta = isVertical() ? dy : dx;
    if (Math.abs(delta) < 5) return;
    dragState.moved = true;
    if (local.stopPropagation) { e.stopPropagation(); e.preventDefault(); }

    let newT = dragState.startT + delta;
    const step = slideStep();
    const maxT = 0;
    const minT = -(virtualTotal() - 1) * (step > 0 ? step : 1);
    if (newT > maxT) newT = maxT + (newT - maxT) * 0.3;
    else if (newT < minT) newT = minT + (newT - minT) * 0.3;
    setTranslate(newT);
  }

  function onMouseDragEnd(_e: MouseEvent) {
    window.removeEventListener('mousemove', onMouseDragMove);
    window.removeEventListener('mouseup', onMouseDragEnd);
    if (!local.touchable) return;

    if (!dragState.moved) { startAutoplay(); return; }
    const delta = translate() - dragState.startT;
    const step = slideStep();
    const threshold = step > 0 && Math.abs(delta) > step * 0.2
      ? (delta > 0 ? -1 : 1) : 0;
    swipeTo(current() + threshold);
    startAutoplay();
  }

  /* ── Slides ── */
  const slides = createMemo(() => {
    const N = total();
    if (local.imgUrls) {
      const items = local.imgUrls.map((url) => ({ type: 'img' as const, url }));
      if (local.loop && N > 1) {
        // Clone: last at beginning, first at end
        return [
          { type: 'img' as const, url: local.imgUrls[N - 1], clone: true },
          ...items,
          { type: 'img' as const, url: local.imgUrls[0], clone: true },
        ];
      }
      return items;
    }
    return [];
  });

  const hasChildren = () => !local.imgUrls && local.children;
  const loopChildren = createMemo(() => {
    const N = total();
    if (!hasChildren() || !local.loop || N <= 1) return null;
    const arr = Array.from({ length: N }, (_, i) => (local.children as any)?.[i]);
    return [arr[N - 1], ...arr, arr[0]];
  });

  /**
   * Map a rendered position to the real child index.
   * In loop mode positions are [lastClone, 0, 1, ..., N-1, firstClone].
   * In non-loop mode the identity mapping applies.
   */
  function childIndex(pos: number): number {
    const N = total();
    if (local.loop && N > 1) {
      if (pos === 0) return N - 1;       // clone of last
      if (pos >= N + 1) return 0;        // clone of first
      return pos - 1;                     // real slide
    }
    return pos;
  }

  /* ── Render ── */
  const trackStyle = (): JSX.CSSProperties => ({
    transform: isVertical()
      ? `translate3d(0, ${translate()}px, 0)`
      : `translate3d(${translate()}px, 0, 0)`,
    transition: transitioning() ? `transform ${duration()}ms ease` : 'none',
  });

  return (
    <div
      class={cn(styles.wrapper, local.class)}
      style={{
        width: toPx(local.width, '100%'),
        height: toPx(local.height, '160px'),
        'touch-action': isVertical() ? 'pan-x' : 'pan-y',
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
    >
      <div
        ref={trackEl!}
        class={cn(styles.track, isVertical() && styles.trackVertical)}
        style={trackStyle()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <Show when={hasChildren()} fallback={
          <For each={slides()}>
            {(slide) => (
              <div class={styles.slide}>
                <img src={slide.url} alt="" style={{ width: '100%', height: '100%', 'object-fit': 'cover' as const, 'pointer-events': 'none' }} />
              </div>
            )}
          </For>
        }>
          <For each={loopChildren() || Array.from({ length: total() })}>
            {(_, i) => (
              <div class={styles.slide}>
                {local.lazyRender && i() !== current() + loopOffset()
                  ? null
                  : (local.children as any)?.[childIndex(i())]}
              </div>
            )}
          </For>
        </Show>
      </div>

      {/* Indicators */}
      <Show when={local.showIndicators && total() > 1}>
        {local.indicators ? (
          <div class={styles.indicators}>
            {local.indicators(current(), total())}
          </div>
        ) : (
          <div class={styles.indicators}>
            <For each={Array.from({ length: total() })}>
              {(_, i) => (
                <span
                  class={cn(styles.dot, i() === current() && styles.dotActive)}
                  style={{
                    'background-color': i() === current() ? local.indicatorColor : undefined,
                  }}
                  onClick={() => swipeTo(i())}
                />
              )}
            </For>
          </div>
        )}
      </Show>
    </div>
  );
};
