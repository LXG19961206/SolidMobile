import { mergeProps, splitProps, Show, type Component, type JSX } from 'solid-js';
import { cn } from '../../utils';
import { Overlay } from '../Overlay';
import type { LoadingProps, LoadingType } from './types';
import styles from './Loading.module.css';

const defaultProps: Partial<LoadingProps> = {
  type: 'spinner',
  vertical: false,
};

/**
 * 加载组件 — 展示加载中状态的视觉反馈。
 *
 * 内置三种动画类型：spinner（旋转圆环）、circular（弧形旋转）、dots（三点弹跳）。
 * 支持自定义图标、文字提示、纵向布局以及全屏遮罩模式。
 *
 * @example 基础用法
 * ```tsx
 * <Loading />
 * <Loading type="dots" text="加载中..." />
 * ```
 *
 * @example 全屏遮罩
 * ```tsx
 * <Loading overlay text="正在处理..." />
 * ```
 *
 * @example 自定义颜色和尺寸
 * ```tsx
 * <Loading color="#1677ff" size={32} />
 * ```
 *
 * @example 自定义图标
 * ```tsx
 * <Loading icon={<Icon name="refresh" size={24} />} text="刷新中" />
 * ```
 */
export const Loading: Component<LoadingProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'text',
    'children',
    'type',
    'size',
    'color',
    'textColor',
    'vertical',
    'overlay',
    'mount',
    'icon',
    'class',
    'style',
    'id',
  ]);

  // ── Content ──
  const displayText = () => local.text ?? local.children;

  // ── Spinner element ──
  const spinnerSize = () =>
    typeof local.size === 'number' ? `${local.size}px` : local.size;

  const spinnerStyle = (): JSX.CSSProperties => {
    const s: JSX.CSSProperties = {};
    if (spinnerSize()) {
      s['font-size'] = spinnerSize();
    }
    if (local.color) {
      s['color'] = local.color;
    }
    return s;
  };

  const renderSpinner = (): JSX.Element => {
    // Custom icon
    if (local.icon) {
      return <span class={styles.customIcon} style={spinnerStyle()}>{local.icon}</span>;
    }

    // Built-in types
    const type = local.type!;
    switch (type) {
      case 'circular':
        return <span class={styles.circular} style={spinnerStyle()} role="status" aria-label="加载中" />;
      case 'dots':
        return (
          <span class={styles.dots} style={spinnerStyle()} role="status" aria-label="加载中">
            <span class={styles.dot} />
            <span class={styles.dot} />
            <span class={styles.dot} />
          </span>
        );
      case 'spinner':
      default:
        return <span class={styles.spinner} style={spinnerStyle()} role="status" aria-label="加载中" />;
    }
  };

  const isVertical = () => local.vertical;

  // ── Content node ──
  const content = (
    <div
      class={cn(
        styles.loading,
        isVertical() && styles.vertical,
        !local.overlay && local.class,
      )}
      style={
        local.overlay
          ? undefined
          : typeof local.style === 'object'
            ? local.style
            : undefined
      }
      id={local.id}
      {...rest}
    >
      {renderSpinner()}
      <Show when={displayText()}>
        <span
          class={styles.text}
          style={local.textColor ? { color: local.textColor } : undefined}
        >
          {displayText()}
        </span>
      </Show>
    </div>
  );

  // ── Overlay mode ──
  return (
    <Show
      when={local.overlay}
      fallback={content}
    >
      <Overlay open={true} lockScroll mount={local.mount}>
        <div
          class={cn(
            styles.overlayContent,
            !isVertical() && local.text && styles.horizontal,
            local.class,
          )}
          style={
            typeof local.style === 'object' ? local.style as JSX.CSSProperties : undefined
          }
          id={local.id}
          {...rest}
        >
          {renderSpinner()}
          <Show when={displayText()}>
            <span
              class={styles.overlayText}
              style={local.textColor ? { color: local.textColor } : undefined}
            >
              {displayText()}
            </span>
          </Show>
        </div>
      </Overlay>
    </Show>
  );
};
