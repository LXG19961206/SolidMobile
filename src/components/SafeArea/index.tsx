import { type Component } from 'solid-js';
import { cn } from '../../utils';

export interface SafeAreaProps {
  /** 安全区域位置 */
  position?: 'top' | 'bottom';
  /** 内容 */children?: any;
  /** 自定义类名 */
  class?: string;
}

/**
 * SafeArea — 安全区域容器。
 *
 * 在移动端刘海屏／挖孔屏／Home Indicator 区域自动撑开间距，
 * 避免内容被设备物理特征遮挡。
 *
 * 顶部安全区在 children 上方添加 padding-top，
 * 底部安全区在 children 下方添加 padding-bottom。
 *
 * padding 读取 CSS 变量：
 * - `--sc-safe-area-top` 默认回退 `env(safe-area-inset-top, 0px)`
 * - `--sc-safe-area-bottom` 默认回退 `env(safe-area-inset-bottom, 0px)`
 *
 * @example 顶部安全区 + 导航栏
 * ```tsx
 * <SafeArea position="top">
 *   <NavBar title="首页" />
 * </SafeArea>
 * ```
 *
 * @example 底部安全区 + 标签栏
 * ```tsx
 * <SafeArea position="bottom">
 *   <Tabbar />
 * </SafeArea>
 * ```
 */
export const SafeArea: Component<SafeAreaProps> = (rawProps) => {
  const props = { ...rawProps };
  const position = props.position ?? 'bottom';
  const cssVar = position === 'top'
    ? 'var(--sc-safe-area-top, env(safe-area-inset-top, 0px))'
    : 'var(--sc-safe-area-bottom, env(safe-area-inset-bottom, 0px))';

  // 无 children 时保持原有占位行为（向下兼容）
  if (!props.children) {
    return (
      <div
        class={cn(props.class)}
        style={{
          width: '100%',
          height: cssVar,
          'flex-shrink': 0,
        }}
      />
    );
  }

  // 有 children 时作为容器，自动加 safe-area padding
  return (
    <div
      class={cn(props.class)}
      style={{
        width: '100%',
        'flex-shrink': 0,
        'padding-top': position === 'top' ? cssVar : undefined,
        'padding-bottom': position === 'bottom' ? cssVar : undefined,
        'box-sizing': 'border-box',
      }}
    >
      {props.children}
    </div>
  );
};
