import {
  mergeProps,
  splitProps,
  createSignal,
  onMount,
  onCleanup,
  Show,
  type Component,
  type JSX,
} from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import { FloatingBall } from '../FloatingBall';
import { Icon } from '../Icon';
import type { BackTopProps } from './types';
import rawStyles from './BackTop.module.css';

const styles = scopedStyle(rawStyles, 'sc-back-top');

const defaultProps: Partial<BackTopProps> = {
  threshold: 200,
  draggable: false,
};

/**
 * BackTop 回到顶部 — 基于 FloatingBall，滚动超过阈值自动出现，点击平滑回到顶部。
 *
 * @example
 * ```tsx
 * <BackTop />
 * ```
 *
 * @example 自定义阈值
 * ```tsx
 * <BackTop threshold={400}>
 *   <span>UP</span>
 * </BackTop>
 * ```
 */
export const BackTop: Component<BackTopProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'threshold', 'target', 'class', 'style', 'children',
  ]);

  const [visible, setVisible] = createSignal(false);
  let rafId = 0;

  let target: HTMLElement | Window | null = null;

  // ── 滚动监听 ──
  const checkScroll = () => {
    if (!target) return;
    let st: number;
    if (target === window) {
      st = window.scrollY || document.documentElement.scrollTop;
    } else {
      st = (target as HTMLElement).scrollTop;
    }
    setVisible(st > (local.threshold ?? 200));
  };

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      checkScroll();
    });
  };

  // ── 回到顶部 ──
  const backToTop = () => {
    if (!target) return;
    if (target === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (target as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  let anchorRef!: HTMLDivElement;

  onMount(() => {
    // 从 anchor 元素向上查找可滚动容器
    let el: HTMLElement | null = anchorRef?.parentElement ?? null;
    while (el) {
      const s = getComputedStyle(el);
      if (s.overflowY === 'auto' || s.overflowY === 'scroll') {
        target = el;
        break;
      }
      el = el.parentElement;
    }
    if (!target) target = window;

    target.addEventListener('scroll', onScroll, { passive: true });
    checkScroll();
  });

  onCleanup(() => {
    cancelAnimationFrame(rafId);
    if (target) target.removeEventListener('scroll', onScroll);
  });

  // ── inline style ──
  const inlineStyle = (): JSX.CSSProperties | undefined => {
    if (typeof local.style === 'string') return undefined;
    return local.style as JSX.CSSProperties | undefined;
  };

  return (
    <>
      {/* 不可见的 anchor，提供 DOM 起点用于向上查找可滚动祖先 */}
      <div ref={anchorRef!} style="display:none" aria-hidden="true" />
      <Show when={visible()}>
      <FloatingBall
        class={cn(styles.backTop, local.class)}
        style={inlineStyle()}
        {...rest}
      >
        <span onClick={backToTop} style={{ display: 'inline-flex', 'align-items': 'center', 'justify-content': 'center' }}>
          {local.children || <Icon name="arrow-up" size={22} />}
        </span>
      </FloatingBall>
    </Show>
    </>
  );
};
