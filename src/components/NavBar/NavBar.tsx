import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import { Icon } from '../Icon';
import { emitEvent } from '../../event-bus';
import type { NavBarProps } from './types';
import rawStyles from './NavBar.module.css';
const styles = scopedStyle(rawStyles, 'sc-nav-bar');

const defaultProps: Partial<NavBarProps> = {
  height: 46,
};

/**
 * NavBar 导航栏 — 顶部导航条。
 *
 * 提供左/中/右三区域布局，支持返回箭头、固定定位及占位元素。
 *
 * @example 基础用法
 * ```tsx
 * <NavBar title="页面标题" backArrow onBack={() => history.back()} />
 * ```
 *
 * @example 带右侧操作
 * ```tsx
 * <NavBar title="编辑" right={<Button size="sm">保存</Button>} />
 * ```
 */
export const NavBar: Component<NavBarProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'title', 'left', 'right', 'backArrow', 'onBack', 'onLeftClick', 'onRightClick',
    'fixed', 'placeholder', 'border', 'zIndex', 'background', 'color', 'height',
    'class', 'style',
  ]);

  const barStyle = () => ({
    ...(typeof local.style === 'object' ? local.style : {}),
    'z-index': local.zIndex,
    background: local.background,
    color: local.color,
    height: typeof local.height === 'number' ? `${local.height}px` : local.height,
  });

  const bar = (
    <div
      class={cn(
        styles.bar,
        local.fixed && styles.fixed,
        local.border && styles.border,
        local.class,
      )}
      style={barStyle()}
      {...rest}
    >
      {/* Left */}
      <div class={styles.left}>
        <Show when={local.backArrow}>
          <span class={styles.clickable} onClick={() => { local.onBack?.(); emitEvent({ component: 'NavBar', type: 'click', payload: { side: 'left', action: 'back' }, props: props, timestamp: Date.now() }); }}>
            <Icon name="arrow-left" size={22} />
          </span>
        </Show>
        <Show when={local.left}>
          <span class={styles.clickable} onClick={() => { local.onLeftClick?.(); emitEvent({ component: 'NavBar', type: 'click', payload: { side: 'left' }, props: props, timestamp: Date.now() }); }}>
            {local.left}
          </span>
        </Show>
      </div>

      {/* Center */}
      <div class={styles.center}>{local.title}</div>

      {/* Right */}
      <div class={styles.right}>
        <Show when={local.right}>
          <span class={styles.clickable} onClick={() => { local.onRightClick?.(); emitEvent({ component: 'NavBar', type: 'click', payload: { side: 'right' }, props: props, timestamp: Date.now() }); }}>
            {local.right}
          </span>
        </Show>
      </div>
    </div>
  );

  return (
    <>
      <Show when={local.fixed && local.placeholder}>
        <div class={styles.placeholder} style={{ height: typeof local.height === 'number' ? `${local.height}px` : local.height, 'padding-top': 'var(--sc-safe-area-top, 0px)' }} />
      </Show>
      {bar}
    </>
  );
};
