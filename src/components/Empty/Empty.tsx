import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import type { EmptyProps } from './types';
import styles from './Empty.module.css';

const PRESETS: Record<string, string> = {
  default: 'image',
  network: 'earth',
  search: 'search',
};

const defaultProps: Partial<EmptyProps> = {
  image: 'default',
};

/**
 * Empty 空状态 — 数据为空时的占位提示。
 *
 * 内置三种预设图片（'default'、'network'、'search'），也可传入自定义 JSX。
 *
 * @example 基础用法
 * ```tsx
 * <Empty description="暂无数据" />
 * ```
 *
 * @example 自定义图片 + 按钮
 * ```tsx
 * <Empty description="网络异常" image="network">
 *   <Button onClick={retry}>重试</Button>
 * </Empty>
 * ```
 */
export const Empty: Component<EmptyProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['description', 'image', 'children', 'class', 'style']);

  const renderImage = () => {
    if (typeof local.image === 'string') {
      const iconName = PRESETS[local.image] || 'inbox';
      return (
        <div class={styles.image}>
          <Icon name={iconName as any} size={36} />
        </div>
      );
    }
    return <div class={styles.image}>{local.image}</div>;
  };

  return (
    <div
      class={cn(styles.empty, local.class)}
      style={typeof local.style === 'object' ? local.style : undefined}
      {...rest}
    >
      {renderImage()}
      <Show when={local.description}>
        <div class={styles.description}>{local.description}</div>
      </Show>
      <Show when={local.children}>
        <div class={styles.footer}>{local.children}</div>
      </Show>
    </div>
  );
};
