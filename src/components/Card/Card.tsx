import { mergeProps, splitProps, Show, type Component, type JSX } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { CardProps } from './types';
import rawStyles from './Card.module.css';

const styles = scopedStyle(rawStyles, 'sc-card');

const defaultProps: Partial<CardProps> = {
  shadow: true,
  border: true,
  padding: 16,
};

/**
 * Card 卡片 — 通用的内容容器。
 *
 * 常用于分组展示 demo、设置面板、信息区块等场景。
 *
 * @example
 * ```tsx
 * <Card title="Basic Usage" subtitle="Default button types">
 *   <Button>Primary</Button>
 * </Card>
 * ```
 */
export const Card: Component<CardProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'title', 'subtitle', 'shadow', 'border', 'padding',
    'class', 'style', 'children',
  ]);

  const inlineStyle = (): JSX.CSSProperties => {
    const userStyle = typeof local.style === 'object' ? (local.style as JSX.CSSProperties) : {};
    return {
      padding: typeof local.padding === 'number' ? `${local.padding}px` : local.padding,
      ...userStyle,
    };
  };

  return (
    <div
      class={cn(
        styles.card,
        local.border && styles.border,
        local.shadow && styles.shadow,
        local.class,
      )}
      style={inlineStyle()}
      {...rest}
    >
      <Show when={local.title || local.subtitle}>
        <div class={styles.header}>
          <Show when={local.title}><div class={styles.title}>{local.title}</div></Show>
          <Show when={local.subtitle}><div class={styles.subtitle}>{local.subtitle}</div></Show>
        </div>
      </Show>
      <div class={styles.body}>{local.children}</div>
    </div>
  );
};
