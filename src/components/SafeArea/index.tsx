import { type Component } from 'solid-js';
import { cn } from '../../utils';

export interface SafeAreaProps {
  /** 安全区域位置 */
  position?: 'top' | 'bottom';
  /** 自定义类名 */
  class?: string;
}

/**
 * SafeArea — 安全区域占位组件。
 *
 * 在移动端刘海屏／挖孔屏／Home Indicator 区域自动撑开间距，
 * 避免内容被设备物理特征遮挡。
 *
 * 高度读取 CSS 变量：
 * - `--sc-safe-area-top` 默认回退 `env(safe-area-inset-top, 0px)`
 * - `--sc-safe-area-bottom` 默认回退 `env(safe-area-inset-bottom, 0px)`
 *
 * @example 顶部安全区
 * ```tsx
 * <SafeArea position="top" />
 * ```
 *
 * @example 底部安全区（Home Indicator）
 * ```tsx
 * <SafeArea position="bottom" />
 * ```
 */
export const SafeArea: Component<SafeAreaProps> = (rawProps) => {
  const props = { ...rawProps };
  const position = props.position ?? 'bottom';

  return (
    <div
      class={cn(props.class)}
      style={{
        width: '100%',
        height: position === 'top'
          ? 'var(--sc-safe-area-top, env(safe-area-inset-top, 0px))'
          : 'var(--sc-safe-area-bottom, env(safe-area-inset-bottom, 0px))',
        'flex-shrink': 0,
      }}
    />
  );
};
