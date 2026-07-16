import {
  mergeProps,
  splitProps,
  createSignal,
  onCleanup,
  type Component,
  type JSX,
} from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { FloatingBallProps } from './types';
import rawStyles from './FloatingBall.module.css';

const styles = scopedStyle(rawStyles, 'sc-floating-ball');

const defaultProps: Partial<FloatingBallProps> = {
  inset: { right: 16, bottom: 24 },
  draggable: true,
  snapToEdge: true,
  zIndex: 999,
};

const DRAG_THRESHOLD = 5; // px，小于此值视为点击

/**
 * FloatingBall 悬浮球 — 固定定位在视口的可拖动浮块。
 *
 * 核心特性：
 * - `position: fixed` + `transform: translate` 拖动，60fps 流畅
 * - 移动 < 5px 视为点击，>= 5px 视为拖动，防止误触
 * - 松手自动吸附到最近边缘
 * - touch + mouse 双支持（Pointer Events）
 * - 所有样式通过 --sc-floating-ball-* CSS 变量控制
 *
 * @example 回到顶部
 * ```tsx
 * <FloatingBall>
 *   <Icon name="arrow-up" size={24} onClick={scrollToTop} />
 * </FloatingBall>
 * ```
 */
export const FloatingBall: Component<FloatingBallProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'inset', 'draggable', 'snapToEdge', 'zIndex',
    'class', 'style', 'children',
  ]);

  const hasLeft = () => local.inset?.left != null;
  const hasTop = () => local.inset?.top != null;
  const r = () => local.inset?.right ?? 16;
  const b = () => local.inset?.bottom ?? 24;
  const l = () => local.inset?.left ?? 0;
  const t = () => local.inset?.top ?? 0;
  // 是否吸附到初始 edge
  const snapToHome = () => (hasLeft() ? 'left' as const : 'right' as const);

  // translate 偏移量（手指移动的累积量）
  const [dx, setDx] = createSignal(0);
  const [dy, setDy] = createSignal(0);
  const [dragging, setDragging] = createSignal(false);
  const [snapping, setSnapping] = createSignal(false);

  let ballEl!: HTMLDivElement;
  let startX = 0;
  let startY = 0;
  let startDx = 0;
  let startDy = 0;
  let moved = false;

  // 获取 fixed 的包含块（可能是 transform 祖先，也可能是视口）
  const getContainer = (): DOMRect => {
    // 找到 transform 祖先作为包含块；没有则用视口
    let el: HTMLElement | null = ballEl?.parentElement ?? null;
    while (el) {
      const style = getComputedStyle(el);
      if (style.transform !== 'none' || style.perspective !== 'none') {
        return el.getBoundingClientRect();
      }
      el = el.parentElement;
    }
    // fallback to viewport
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
  };

  // ── 吸附到最近边缘 ──
  const snap = () => {
    if (!local.snapToEdge || !ballEl) return;
    const size = ballEl.offsetWidth;
    const rect = ballEl.getBoundingClientRect();
    const container = getContainer();
    const centerX = rect.left + size / 2;
    const pad = 8;

    setSnapping(true);

    if (centerX < container.left + container.width / 2) {
      // 左半边 → 吸附到容器左边缘 + pad
      setDx(dx() + (container.left + pad) - rect.left);
    } else if (snapToHome() === 'right') {
      // 右半边 + right inset → 恢复初始右边距（dx=0）
      setDx(0);
    } else {
      // 右半边 + left inset → 吸附到容器右边缘 + pad
      setDx(dx() + (container.right - pad - size) - rect.left);
    }

    // 垂直约束
    if (rect.top < container.top + pad) setDy(dy() + (container.top + pad) - rect.top);
    if (rect.bottom > container.bottom - pad) setDy(dy() + (container.bottom - pad) - rect.bottom);

    setTimeout(() => setSnapping(false), 320);
  };

  // ── 指针事件 ──
  const onPointerDown = (e: PointerEvent) => {
    if (!local.draggable) return;
    e.preventDefault();
    ballEl.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startY = e.clientY;
    startDx = dx();
    startDy = dy();
    moved = false;
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging()) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    if (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD) {
      moved = true;
    }
    if (moved) {
      setDx(startDx + deltaX);
      setDy(startDy + deltaY);
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    e.preventDefault();
    setDragging(false);
    if (moved) snap();
  };

  onCleanup(() => {
    // pointer capture auto-released
  });

  // ── inline style ──
  const ballStyle = (): JSX.CSSProperties => {
    const userStyle =
      typeof local.style === 'string' ? {} : (local.style as JSX.CSSProperties) || {};
    const pos: Record<string, string> = {};
    if (hasLeft()) pos.left = `${l()}px`; else pos.right = `${r()}px`;
    if (hasTop())  pos.top  = `${t()}px`; else pos.bottom = `${b()}px`;

    return {
      ...pos,
      transform: `translate(${dx()}px, ${dy()}px)`,
      'z-index': local.zIndex,
      ...userStyle,
    } as JSX.CSSProperties;
  };

  return (
    <div
      ref={ballEl!}
      class={cn(
        styles.ball,
        dragging() && styles.dragging,
        snapping() && styles.snapping,
        local.class,
      )}
      style={ballStyle()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      {...rest}
    >
      {local.children}
    </div>
  );
};
