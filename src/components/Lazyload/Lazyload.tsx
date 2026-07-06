import {
  createSignal,
  onMount,
  onCleanup,
  mergeProps,
  splitProps,
  Show,
  type Component,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cn, scopedStyle } from '../../utils';
import type { LazyloadProps } from './types';
import rawStyles from './Lazyload.module.css';
const styles = scopedStyle(rawStyles, 'sc-lazyload');

const defaultProps: Partial<LazyloadProps> = {
  rootMargin: '50px',
  threshold: 0,
  once: true,
  as: 'div',
};

/** Check if IntersectionObserver is available */
const hasObserver = () =>
  typeof window !== 'undefined' && 'IntersectionObserver' in window;

/**
 * Lazyload 懒加载容器 — 当元素进入视口时才渲染内容。
 *
 * 默认使用 IntersectionObserver 实现高性能检测，不支持的浏览器自动降级为
 * scroll + getBoundingClientRect 方案。
 *
 * @example 基础用法
 * ```tsx
 * <Lazyload placeholder={<div>加载中...</div>}>
 *   <HeavyComponent />
 * </Lazyload>
 * ```
 *
 * @example 图片懒加载
 * ```tsx
 * <Lazyload placeholder={<div class="skeleton" />}>
 *   <img src="large-photo.jpg" />
 * </Lazyload>
 * ```
 */
export const Lazyload: Component<LazyloadProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'active',
    'placeholder',
    'children',
    'root',
    'rootMargin',
    'threshold',
    'once',
    'disableObserver',
    'as',
    'height',
    'class',
    'style',
  ]);

  // Controlled mode: use external active state
  const isControlled = () => local.active !== undefined;

  const [visible, setVisible] = createSignal(isControlled() ? local.active! : false);
  let wrapperEl!: HTMLElement;
  let observer: IntersectionObserver | undefined;
  let scrollEl: Element | Window | undefined;
  let scrollHandler: (() => void) | undefined;

  // ── IntersectionObserver ──
  const useObserver = () => !local.disableObserver && hasObserver();

  const setupObserver = () => {
    if (!wrapperEl || !useObserver()) return;

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          if (local.once) {
            observer?.disconnect();
            observer = undefined;
          }
        } else if (!local.once) {
          setVisible(false);
        }
      },
      {
        root: local.root || null,
        rootMargin: local.rootMargin,
        threshold: local.threshold,
      },
    );

    observer.observe(wrapperEl);
  };

  // ── Scroll fallback ──
  const setupScrollFallback = () => {
    if (useObserver()) return;

    const check = () => {
      if (!wrapperEl) return;
      const rect = wrapperEl.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const margin = parseFloat(local.rootMargin!) || 50;
      const isInView = rect.top <= winH + margin && rect.bottom >= -margin;

      if (isInView) {
        setVisible(true);
        if (local.once && scrollEl && scrollHandler) {
          scrollEl.removeEventListener('scroll', scrollHandler);
          scrollHandler = undefined;
        }
      } else if (!local.once) {
        setVisible(false);
      }
    };

    scrollHandler = check;
    scrollEl = local.root || window;
    scrollEl.addEventListener('scroll', check, { passive: true });
    // Initial check
    setTimeout(check, 100);
  };

  onMount(() => {
    if (isControlled()) return;

    if (useObserver()) {
      setupObserver();
    } else {
      setupScrollFallback();
    }
  });

  onCleanup(() => {
    observer?.disconnect();
    if (scrollEl && scrollHandler) {
      scrollEl.removeEventListener('scroll', scrollHandler);
    }
  });

  return (
    <Dynamic
      component={local.as}
      ref={(el: HTMLElement) => {
        wrapperEl = el;
      }}
      class={cn(styles.wrapper, local.class)}
      style={{
        ...(local.height != null ? { 'min-height': typeof local.height === 'number' ? `${local.height}px` : local.height } : {}),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      {...rest}
    >
      <Show when={isControlled() ? local.active! : visible()} fallback={local.placeholder}>
        {local.children}
      </Show>
    </Dynamic>
  );
};
