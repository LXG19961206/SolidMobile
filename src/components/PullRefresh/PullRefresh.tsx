import {
  createSignal, mergeProps, splitProps, Show, batch,
  onMount, onCleanup,
  type Component, type JSX,
} from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import { useT } from '../../i18n';
import { emitEvent } from '../../event-bus';
import type { PullRefreshProps } from './types';
import rawStyles from './PullRefresh.module.css';
const styles = scopedStyle(rawStyles, 'sc-pull-refresh');

/* ── Defaults ── */

const defaultProps: Partial<PullRefreshProps> = {
  pullDistance: 80,
  headHeight: 60,
  successDuration: 500,
  animationDuration: 300,
  disabled: false,
};

/* ══════════════════════════════════════════════════════════════════
   PullRefresh
   ══════════════════════════════════════════════════════════════════ */

export const PullRefresh: Component<PullRefreshProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const t = useT();
  const [local] = splitProps(props, [
    'loading', 'onRefresh',
    'pullDistance', 'headHeight', 'successDuration', 'animationDuration',
    'disabled',
    'successText', 'pullingText', 'loosingText', 'loadingText',
    'scrollContainer',
    'children', 'class', 'style',
  ]);

  /* ── State ── */

  type State = 'idle' | 'pulling' | 'loosing' | 'loading' | 'success';
  const [state, setState] = createSignal<State>('idle');
  const [pull, setPull] = createSignal(0);

  const isControlled = () => local.loading !== undefined;
  const isLoading = () => (isControlled() ? local.loading! : state() === 'loading');
  const effectiveState = (): State => {
    if (isControlled() && local.loading) return 'loading';
    return state();
  };

  /* ── Refs ── */

  let wrapperEl!: HTMLDivElement;
  let startY = 0;
  let startPull = 0;
  let lastTouchTime = 0;
  let loadingPromise: Promise<void> | null = null;

  function getScrollTop(): number {
    if (local.scrollContainer) return local.scrollContainer.scrollTop;
    const p = wrapperEl?.parentElement;
    return p ? p.scrollTop : window.scrollY || document.documentElement.scrollTop || 0;
  }

  /* ── Damping ── */

  function damp(px: number): number {
    const threshold = local.pullDistance!;
    if (px < 0) return 0;
    if (px <= threshold) return px * 0.6;
    return threshold * 0.6 + (px - threshold) * 0.2;
  }

  /* ── Snap back ── */

  function snapBack(animate = true) {
    const el = wrapperEl?.querySelector('[data-pulltrack]') as HTMLElement | null;
    if (el) {
      el.style.transition = animate ? `transform ${local.animationDuration!}ms ease` : 'none';
      el.style.transform = 'translate3d(0, 0, 0)';
    }
    setPull(0);
  }

  function snapToHead(animate = true) {
    const el = wrapperEl?.querySelector('[data-pulltrack]') as HTMLElement | null;
    if (el) {
      el.style.transition = animate ? `transform ${local.animationDuration!}ms ease` : 'none';
      el.style.transform = `translate3d(0, ${local.headHeight}px, 0)`;
    }
    setPull(local.headHeight!);
  }

  /* ── Update track position ── */

  function applyPull(p: number) {
    const el = wrapperEl?.querySelector('[data-pulltrack]') as HTMLElement | null;
    if (el) {
      el.style.transition = 'none';
      el.style.transform = `translate3d(0, ${damp(p)}px, 0)`;
    }
    setPull(p);
  }

  /* ── Refresh trigger ── */

  async function triggerRefresh() {
    batch(() => {
      setState('loading');
      setPull(local.headHeight!);
    });
    snapToHead(true);

    try {
      const result = local.onRefresh?.();
      emitEvent({ component: 'PullRefresh', type: 'refresh', payload: undefined, props: props, timestamp: Date.now() });
      if (result instanceof Promise) {
        loadingPromise = result;
        await result;
      }
    } finally {
      loadingPromise = null;
    }

    if (!isControlled()) {
      showSuccess();
    }
  }

  function showSuccess() {
    setState('success');
    setTimeout(() => {
      batch(() => {
        setState('idle');
        setPull(0);
      });
      snapBack(true);
    }, local.successDuration);
  }

  /* ── Touch ── */

  function onTouchStart(e: TouchEvent) {
    if (local.disabled) return;
    if (state() === 'loading' || state() === 'success') return;
    const st = getScrollTop();
    if (st > 5) return; // 不在顶部不处理
    const t = e.touches[0];
    startY = t.clientY;
    startPull = pull();
    wrapperEl.style.touchAction = 'none';
    addMove(); // 动态挂载 move/end 监听
  }

  function onTouchMove(e: TouchEvent) {
    if (local.disabled || state() === 'loading' || state() === 'success') return;
    const t = e.touches[0];
    const dy = t.clientY - startY;
    if (dy <= 0) return; // not pulling down

    e.preventDefault();
    applyPull(dy);

    const s = dy >= local.pullDistance! ? 'loosing' : 'pulling';
    setState(s);
  }

  function onTouchEnd() {
    removeMove();
    if (local.disabled) return;
    wrapperEl.style.touchAction = '';
    lastTouchTime = Date.now();

    const s = state();
    if (s === 'loosing') {
      triggerRefresh();
    } else if (s === 'pulling') {
      setState('idle');
      snapBack(true);
    }
  }

  /* ── Mouse (PC) ── */

  let isMouseDown = false;

  function onMouseDown(e: MouseEvent) {
    if (local.disabled || e.button !== 0) return;
    if (Date.now() - lastTouchTime < 300) return;
    if (state() === 'loading' || state() === 'success') return;

    const st = getScrollTop();
    if (st > 5) return;

    isMouseDown = true;
    startY = e.clientY;
    startPull = pull();

    window.addEventListener('mousemove', onMouseDragMove);
    window.addEventListener('mouseup', onMouseDragEnd);
  }

  function onMouseDragMove(e: MouseEvent) {
    if (!isMouseDown || local.disabled) return;
    if (state() === 'loading' || state() === 'success') return;

    const dy = e.clientY - startY;
    if (dy < 0) return;

    e.preventDefault();
    applyPull(dy);

    const s = dy >= local.pullDistance! ? 'loosing' : 'pulling';
    setState(s);
  }

  function onMouseDragEnd() {
    window.removeEventListener('mousemove', onMouseDragMove);
    window.removeEventListener('mouseup', onMouseDragEnd);
    isMouseDown = false;

    if (local.disabled) return;
    const s = state();
    if (s === 'loosing') {
      triggerRefresh();
    } else if (s === 'pulling') {
      setState('idle');
      snapBack(true);
    }
  }

  /* ── Controlled loading — sync head position ── */

  if (isControlled() && local.loading && pull() < local.headHeight!) {
    setPull(local.headHeight!);
  }

  /* ── Render helpers ── */

  const headText = () => {
    const s = effectiveState();
    switch (s) {
      case 'pulling': return local.pullingText ?? t('component.pullRefresh.pulling');
      case 'loosing': return local.loosingText ?? t('component.pullRefresh.loosing');
      case 'loading': return local.loadingText ?? t('component.pullRefresh.loading');
      case 'success': return local.successText ?? t('component.pullRefresh.success');
      default: return '';
    }
  };

  const showArrow = () => {
    const s = effectiveState();
    return s === 'pulling' || s === 'loosing';
  };
  const arrowDir = () => effectiveState() === 'loosing' ? styles.arrowUp : styles.arrowDown;

  /* ── 动态 touch 监听 ── */
  // touchstart 始终挂载（passive:false 才能 cancel 原生滚动）。
  // touchmove / touchend 仅在准备下拉（pullReady）时动态挂载，
  // 避免在非顶部滚动时干扰浏览器原生滚动。
  const addMove = () => {
    wrapperEl.addEventListener('touchmove', onTouchMove, { passive: false });
    wrapperEl.addEventListener('touchend', onTouchEnd, { passive: false });
  };
  const removeMove = () => {
    wrapperEl.removeEventListener('touchmove', onTouchMove);
    wrapperEl.removeEventListener('touchend', onTouchEnd);
  };

  onMount(() => {
    wrapperEl.addEventListener('touchstart', onTouchStart, { passive: false });
  });
  onCleanup(() => {
    wrapperEl.removeEventListener('touchstart', onTouchStart);
    removeMove();
  });

  /* ── Render ── */

  return (
    <div
      ref={wrapperEl!}
      class={cn(styles.wrapper, local.class)}
      style={local.style as JSX.CSSProperties | undefined}
      onMouseDown={onMouseDown}
    >
      <div data-pulltrack class={styles.track}>
        {/* Head indicator */}
        <div class={styles.head} style={{ height: `${local.headHeight}px`, 'margin-top': `-${local.headHeight}px` }}>
          <Show when={effectiveState() === 'loading'}>
            <div class={styles.spinner} />
          </Show>
          <Show when={effectiveState() === 'success'}>
            <span class={styles.checkmark}>✓</span>
          </Show>
          <Show when={showArrow()}>
            <span class={cn(styles.arrow, arrowDir())}>↓</span>
          </Show>
          <span>{headText()}</span>
        </div>

        {/* Content */}
        {local.children}
      </div>
    </div>
  );
};
