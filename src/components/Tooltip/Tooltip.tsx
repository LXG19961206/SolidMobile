import {
  mergeProps,
  splitProps,
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  Show,
  type Component,
  type JSX,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn, scopedStyle } from '../../utils';
import type { TooltipProps, TooltipPlacement } from './types';
import rawStyles from './Tooltip.module.css';

const styles = scopedStyle(rawStyles, 'sc-tooltip');

const defaultProps: Partial<TooltipProps> = {
  placement: 'top',
  trigger: 'hover',
  showArrow: true,
  delay: 200,
  offset: 6,
  zIndex: 1000,
};

type DelayNorm = { show: number; hide: number };
const normDelay = (d: number | { show?: number; hide?: number }): DelayNorm => {
  if (typeof d === 'number') return { show: d, hide: d };
  return { show: d.show ?? 200, hide: d.hide ?? 200 };
};

// ── 定位计算 ──

interface PositionResult {
  top: number;
  left: number;
  actualPlacement: TooltipPlacement;
}

function computePosition(
  triggerRect: DOMRect,
  bubbleW: number,
  bubbleH: number,
  pref: TooltipPlacement,
  arrowSize: number,
  offset: number,
): PositionResult {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const gap = offset + arrowSize;
  const PAD = 8; // viewport 安全边距

  let top: number;
  let left: number;
  let actual: TooltipPlacement = pref;

  const centerX = triggerRect.left + triggerRect.width / 2;
  const centerY = triggerRect.top + triggerRect.height / 2;

  // 尝试首选方向，空间不足则翻转
  switch (pref) {
    case 'top':
      top = triggerRect.top - bubbleH - gap;
      left = centerX - bubbleW / 2;
      if (top < PAD) { actual = 'bottom'; top = triggerRect.bottom + gap; }
      break;
    case 'bottom':
      top = triggerRect.bottom + gap;
      left = centerX - bubbleW / 2;
      if (top + bubbleH > vh - PAD) { actual = 'top'; top = triggerRect.top - bubbleH - gap; }
      break;
    case 'left':
      top = centerY - bubbleH / 2;
      left = triggerRect.left - bubbleW - gap;
      if (left < PAD) { actual = 'right'; left = triggerRect.right + gap; }
      // 左右方向 Y 轴溢出时回退到底部
      if (top < PAD || top + bubbleH > vh - PAD) {
        actual = 'bottom';
        top = triggerRect.bottom + gap;
        left = centerX - bubbleW / 2;
      }
      break;
    case 'right':
      top = centerY - bubbleH / 2;
      left = triggerRect.right + gap;
      if (left + bubbleW > vw - PAD) { actual = 'left'; left = triggerRect.left - bubbleW - gap; }
      // 左右方向 Y 轴溢出时回退到底部
      if (top < PAD || top + bubbleH > vh - PAD) {
        actual = 'bottom';
        top = triggerRect.bottom + gap;
        left = centerX - bubbleW / 2;
      }
      break;
  }

  // 贴边约束
  top  = Math.max(PAD, Math.min(top,  vh - bubbleH - PAD));
  left = Math.max(PAD, Math.min(left, vw - bubbleW - PAD));

  return { top, left, actualPlacement: actual };
}

/** 箭头相对于气泡的偏移（让箭头指向触发元素中心） */
function arrowOffset(
  triggerRect: DOMRect,
  bubble: { left: number; top: number; width: number; height: number },
  placement: TooltipPlacement,
  minPad = 8,
): JSX.CSSProperties {
  const tcX = triggerRect.left + triggerRect.width / 2;
  const tcY = triggerRect.top + triggerRect.height / 2;

  if (placement === 'top' || placement === 'bottom') {
    const l = tcX - bubble.left;
    return { left: `${Math.max(minPad, Math.min(l, bubble.width - minPad))}px` };
  }
  const t = tcY - bubble.top;
  return { top: `${Math.max(minPad, Math.min(t, bubble.height - minPad))}px` };
}

// ── 组件 ──

/**
 * Tooltip 气泡提示 — hover / click / focus 时在触发元素旁弹出气泡。
 *
 * 核心特性：
 * - 包裹 children 作为触发器，通过 Portal 将气泡渲染到 body
 * - 12 种 placement 自动翻转（viewport 碰撞检测）
 * - 4 种触发方式：hover（默认）、click、focus、manual
 * - 可配置 show/hide delay，防止误触
 * - CSS 三角箭头，方向随 placement 自动变化
 * - 所有颜色/尺寸均通过 --sc-tooltip-* CSS 变量控制
 */
export const Tooltip: Component<TooltipProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'content', 'placement', 'trigger', 'open', 'defaultOpen',
    'onOpenChange', 'showArrow', 'delay', 'arrowSize', 'offset',
    'teleport', 'zIndex', 'maxWidth', 'closeable',
    'class', 'style', 'children',
  ]);

  // ── 状态 ──
  const [_open, _setOpen] = createSignal(!!local.defaultOpen);
  const isOpen = () => local.open !== undefined ? local.open : _open();

  const setOpen = (v: boolean) => {
    if (local.open === undefined) _setOpen(v);
    local.onOpenChange?.(v);
  };

  // 动画双信号
  const [mounted, setMounted] = createSignal(false);
  const [visible, setVisible] = createSignal(false);

  // 定位
  const [bubbleStyle, setBubbleStyle] = createSignal<JSX.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = createSignal<JSX.CSSProperties>({});
  const [actualPlacement, setActualPlacement] = createSignal<TooltipPlacement>(local.placement!);

  // DOM refs
  let triggerEl!: HTMLSpanElement;
  let bubbleEl!: HTMLDivElement;
  let showTimer = 0;
  let hideTimer = 0;
  let unmountTimer = 0;
  let showAnimTimer = 0;
  let observer: ResizeObserver | undefined;

  const delay = () => normDelay(local.delay!);
  const arrowSz = () => local.arrowSize ?? 5;
  const isControlled = () => local.open !== undefined;

  // ── 定位逻辑 ──
  const updatePosition = () => {
    if (!triggerEl || !bubbleEl) return;
    const tRect = triggerEl.getBoundingClientRect();
    const bRect = bubbleEl.getBoundingClientRect();

    const pos = computePosition(tRect, bRect.width, bRect.height, local.placement!, arrowSz(), local.offset!);
    setActualPlacement(pos.actualPlacement);

    setBubbleStyle({
      top: `${pos.top}px`,
      left: `${pos.left}px`,
      'z-index': local.zIndex,
    });

    if (local.showArrow) {
      setArrowStyle(arrowOffset(tRect, {
        left: pos.left, top: pos.top, width: bRect.width, height: bRect.height,
      }, pos.actualPlacement));
    }
  };

  // ── 延迟开关 ──
  const clearTimers = () => {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    clearTimeout(unmountTimer);
    clearTimeout(showAnimTimer);
  };

  const doShow = () => {
    clearTimers();
    // click / manual 模式无需延迟
    const noDelay = local.trigger === 'click' || local.trigger === 'manual';
    const d = noDelay ? { show: 0, hide: 0 } : delay();
    if (d.show <= 0) {
      openBubble();
    } else {
      showTimer = window.setTimeout(openBubble, d.show);
    }
  };

  const doHide = () => {
    clearTimers();
    const noDelay = local.trigger === 'click' || local.trigger === 'manual';
    const d = noDelay ? { show: 0, hide: 0 } : delay();
    if (d.hide <= 0) {
      closeBubble();
    } else {
      hideTimer = window.setTimeout(closeBubble, d.hide);
    }
  };

  const openBubble = () => {
    clearTimeout(unmountTimer); // 取消挂起的卸载，防止快速切换
    setMounted(true);
    requestAnimationFrame(() => {
      updatePosition();
      // timeout 让浏览器先 paint 一次 (opacity:0 / scale:0.9)，再触发 CSS transition
      showAnimTimer = window.setTimeout(() => setVisible(true), 16);
    });
    if (!isControlled()) setOpen(true);
  };

  const closeBubble = () => {
    setVisible(false);
    // 等 CSS transition 结束再卸载 (200ms transition + buffer)
    unmountTimer = window.setTimeout(() => {
      setMounted(false);
    }, 220);
    if (!isControlled()) setOpen(false);
  };

  const toggleBubble = () => {
    if (mounted() && visible()) {
      closeBubble();
    } else {
      doShow();
    }
  };

  // ── 触发器事件 ──
  const triggerHandlers = (): JSX.HTMLAttributes<HTMLSpanElement> => {
    switch (local.trigger) {
      case 'hover':
        return {
          onMouseEnter: doShow,
          onMouseLeave: doHide,
        };
      case 'click':
        return {
          onClick: (e: MouseEvent) => {
            e.stopPropagation();
            toggleBubble();
          },
        };
      case 'focus':
        return {
          onFocusIn: doShow,
          onFocusOut: doHide,
        };
      default:
        return {};
    }
  };

  // ── 外部点击关闭（click 模式）──
  const handleDocumentClick = (e: MouseEvent) => {
    if (local.trigger !== 'click') return;
    if (!mounted()) return;
    const target = e.target as Node;
    if (triggerEl?.contains(target) || bubbleEl?.contains(target)) return;
    closeBubble();
  };

  // ── 受控模式同步 ──
  let isMounted = false;

  createEffect(() => {
    if (!isControlled()) return;
    const shouldOpen = local.open;
    // 首次渲染跳过，defer 到 onMount（DOM ref 就绪后再执行）
    if (!isMounted) return;
    if (shouldOpen) {
      openBubble();
    } else {
      closeBubble();
    }
  });

  // ── 滚动时更新位置（气泡打开期间监听，RAF 节流）──
  let scrollRafId = 0;
  const onScroll = () => {
    if (scrollRafId) return;
    scrollRafId = requestAnimationFrame(() => {
      scrollRafId = 0;
      updatePosition();
    });
  };

  createEffect(() => {
    if (mounted()) {
      window.addEventListener('scroll', onScroll, true);
    } else {
      window.removeEventListener('scroll', onScroll, true);
    }
  });

  // ── 生命周期 ──
  onMount(() => {
    isMounted = true;
    document.addEventListener('click', handleDocumentClick, true);

    // 首次受控同步（DOM / ref 已就绪）
    if (isControlled()) {
      if (local.open) {
        openBubble();
      }
    }

    if (triggerEl) {
      observer = new ResizeObserver(() => {
        if (mounted()) updatePosition();
      });
      observer.observe(triggerEl);
    }
  });

  onCleanup(() => {
    clearTimers();
    cancelAnimationFrame(scrollRafId);
    window.removeEventListener('scroll', onScroll, true);
    document.removeEventListener('click', handleDocumentClick, true);
    observer?.disconnect();
  });

  // ── bubble ref callback ──
  const bubbleRef = (el: HTMLDivElement) => {
    bubbleEl = el;
    if (el && mounted()) updatePosition();
  };

  // ── CSS 变量 ──
  const arrowSizeStyle = (): JSX.CSSProperties | undefined => {
    if (!local.showArrow) return undefined;
    return { '--sc-tooltip-arrow-size': `${arrowSz()}px` } as JSX.CSSProperties;
  };

  // ── 箭头类名 ──
  const arrowClass = () => {
    switch (actualPlacement()) {
      case 'top': return styles.arrowBottom;   // 气泡在上，箭头在底部朝下
      case 'bottom': return styles.arrowTop;   // 气泡在下，箭头在顶部朝上
      case 'left': return styles.arrowRight;   // 气泡在左，箭头在右边朝右
      case 'right': return styles.arrowLeft;   // 气泡在右，箭头在左边朝左
    }
  };

  return (
    <>
      {/* 触发元素包裹器 */}
      <span
        ref={triggerEl}
        class={styles.trigger}
        {...triggerHandlers()}
        {...rest}
      >
        {local.children}
      </span>

      {/* 气泡 → Portal 到 body */}
      <Show when={mounted()}>
        <Portal mount={local.teleport as Node ?? (typeof document !== 'undefined' ? document.body : undefined)}>
          <div
            ref={bubbleRef}
            class={cn(
              styles.bubble,
              visible() && styles.bubbleVisible,
              local.class,
            )}
            style={{
              ...bubbleStyle(),
              ...arrowSizeStyle(),
              ...(local.closeable ? { 'padding-right': '26px' } : {}),
              ...(local.maxWidth != null ? { 'max-width': typeof local.maxWidth === 'number' ? `${local.maxWidth}px` : local.maxWidth } : {}),
              ...(typeof local.style === 'object' ? local.style : {}),
            }}
          >
            <Show when={local.closeable}>
              <button type="button" class={styles.close} onClick={() => { closeBubble(); setOpen(false); }} aria-label="Close">
                ✕
              </button>
            </Show>
            {local.content}
            <Show when={local.showArrow}>
              <div class={cn(styles.arrow, arrowClass())} style={arrowStyle()} />
            </Show>
          </div>
        </Portal>
      </Show>
    </>
  );
};
