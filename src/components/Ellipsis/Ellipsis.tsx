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
import { Dynamic } from 'solid-js/web';
import { cn, scopedStyle } from '../../utils';
import type { EllipsisProps } from './types';
import rawStyles from './Ellipsis.module.css';

const styles = scopedStyle(rawStyles, 'sc-ellipsis');

const defaultProps: Partial<EllipsisProps> = {
  lines: 1,
  as: 'div',
  showAction: true,
};

/**
 * Ellipsis 文字省略组件 — 处理文字超出隐藏。
 *
 * 核心功能：
 * - 单行 / 多行省略（`lines` 控制）
 * - 可展开/收起（`expandable` 开启后自动检测溢出，仅在超出时显示按钮）
 * - 支持受控（`expanded`）和非受控（`defaultExpanded`）两种模式
 * - 展开/收起按钮内容可通过 `expandElement` / `collapseElement` 自定义
 * - 内置 ResizeObserver，容器尺寸变化时自动重新检测溢出
 * - 展开/收起使用原生 `<button>`，支持键盘 Enter/Space 操作
 *
 * @example 单行省略
 * ```tsx
 * <Ellipsis>This is a very long text that should be truncated...</Ellipsis>
 * ```
 *
 * @example 多行省略 + 可展开
 * ```tsx
 * <Ellipsis lines={3} expandable>
 *   This is a very long multi-line text content...
 * </Ellipsis>
 * ```
 *
 * @example 受控模式，外部触发
 * ```tsx
 * <Ellipsis lines={2} expandable showAction={false}
 *   expanded={expanded()} onExpandChange={setExpanded}>
 *   {longText}
 * </Ellipsis>
 * ```
 */
export const Ellipsis: Component<EllipsisProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'lines',
    'expandable',
    'expanded',
    'defaultExpanded',
    'onExpandChange',
    'showAction',
    'expandElement',
    'collapseElement',
    'as',
    'class',
    'style',
    'children',
  ]);

  // ── 展开/收起状态 ──
  const [_expanded, _setExpanded] = createSignal(!!local.defaultExpanded);
  const isExpanded = () =>
    local.expanded !== undefined ? local.expanded : _expanded();

  const setExpanded = (val: boolean) => {
    if (local.expanded === undefined) {
      _setExpanded(val);
    }
    local.onExpandChange?.(val);
  };

  // ── 溢出检测 ──
  const [overflow, setOverflow] = createSignal(false);
  let contentEl: HTMLElement | undefined;
  let rafId = 0;
  let observer: ResizeObserver | undefined;

  const isMultiLine = () => (local.lines ?? 1) > 1;

  const checkOverflow = () => {
    const el = contentEl;
    if (!el || !local.expandable) return;
    if (isExpanded()) {
      // 已展开状态不重新测量（clamp 已解除，测量无意义），
      // 但保留之前的溢出标记，这样收起按钮才能正常显示。
      return;
    }
    // 单行模式：text-overflow:ellipsis 是水平截断，比较 scrollWidth
    // 多行模式：line-clamp 是垂直截断，比较 scrollHeight
    const overflowing = isMultiLine()
      ? el.scrollHeight > el.clientHeight
      : el.scrollWidth > el.clientWidth;
    setOverflow(overflowing);
  };

  // 设置/清除 -webkit-line-clamp
  const setLineClamp = () => {
    const el = contentEl;
    if (!el) return;
    if (!isExpanded() && isMultiLine()) {
      el.style.setProperty('-webkit-line-clamp', String(local.lines));
    } else {
      el.style.removeProperty('-webkit-line-clamp');
    }
  };

  // ref callback：保存引用、应用 line-clamp、并建立 ResizeObserver
  const contentRef = (el: HTMLElement) => {
    // 清理旧的 observer
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }

    contentEl = el;
    if (!el) return;

    setLineClamp();

    // 仅在 expandable 模式下监听尺寸变化
    if (local.expandable) {
      observer = new ResizeObserver(() => {
        scheduleCheck();
      });
      observer.observe(el);
    }
  };

  // 安排检测：双 RAF 确保浏览器完成布局后再测量
  const scheduleCheck = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        setLineClamp();
        checkOverflow();
      });
    });
  };

  onMount(() => {
    scheduleCheck();
  });

  onCleanup(() => {
    cancelAnimationFrame(rafId);
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  });

  // children / lines / expanded 变化时重新检测
  createEffect(() => {
    void local.children;
    void local.lines;
    void isExpanded();
    scheduleCheck();
  });

  // ── 派生状态 ──
  const clamped = () => !isExpanded();
  const showExpand = () => !!(local.showAction && local.expandable && overflow() && !isExpanded());
  const showCollapse = () => !!(local.showAction && local.expandable && overflow() && isExpanded());

  const handleToggle = () => {
    setExpanded(!isExpanded());
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  // ── inline style ──
  const inlineStyle = (): string | JSX.CSSProperties | undefined => {
    if (typeof local.style === 'string') return local.style;
    return local.style as JSX.CSSProperties | undefined;
  };

  return (
    <Dynamic
      component={local.as}
      class={cn(
        styles.root,
        local.expandable && styles.expandableInline,
        local.class,
      )}
      style={inlineStyle()}
      {...rest}
    >
      {/* 文字内容 */}
      <span
        ref={contentRef}
        class={cn(
          local.expandable && styles.expandableContent,
          clamped() && !isMultiLine() && styles.singleLine,
          clamped() && isMultiLine() && styles.multiLine,
        )}
      >
        {local.children}
      </span>

      {/* 展开按钮 */}
      <Show when={showExpand()}>
        <button type="button" class={styles.action} onClick={handleToggle} onKeyDown={handleKeyDown}>
          {local.expandElement ?? 'Expand'}
        </button>
      </Show>

      {/* 收起按钮 */}
      <Show when={showCollapse()}>
        <button type="button" class={styles.action} onClick={handleToggle} onKeyDown={handleKeyDown}>
          {local.collapseElement ?? 'Collapse'}
        </button>
      </Show>
    </Dynamic>
  );
};
