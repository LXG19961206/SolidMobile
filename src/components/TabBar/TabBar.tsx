import {
  createSignal, createContext, useContext, createMemo,
  mergeProps, splitProps, Show, type Component, type JSX,
} from 'solid-js';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { Badge } from '../Badge';
import { SafeArea } from '../SafeArea';
import { emitEvent } from '../../event-bus';
import type { TabBarProps, TabBarItemProps } from './types';
import styles from './TabBar.module.css';

/* ── Context ── */

interface TabBarContextValue {
  activeName: () => number | string;
  activeColor: () => string;
  inactiveColor: () => string;
  switchTo: (name: number | string) => void;
}

const TabBarContext = createContext<TabBarContextValue>();

/* ── Defaults ── */

const tabBarDefaults: Partial<TabBarProps> = {
  fixed: true,
  border: true,
  zIndex: 1,
  activeColor: 'var(--sc-color-primary, #1989fa)',
  inactiveColor: 'var(--sc-color-text-secondary, #7d7e80)',
};

/* ══════════════════════════════════════════════════════════════════
   TabBar
   ══════════════════════════════════════════════════════════════════ */

export const TabBar: Component<TabBarProps> = (rawProps) => {
  const props = mergeProps(tabBarDefaults, rawProps);
  const [local, rest] = splitProps(props, [
    'value', 'defaultValue', 'onChange',
    'fixed', 'border', 'zIndex', 'height', 'activeColor', 'inactiveColor',
    'safeArea', 'bgColor', 'placeholder', 'beforeChange',
    'children', 'class', 'style',
  ]);

  const h = () => typeof local.height === 'number' ? `${local.height}px` : (local.height || '50px');

  const isControlled = () => local.value !== undefined;
  const [innerVal, setInnerVal] = createSignal<number | string>(
    local.value ?? local.defaultValue ?? 0,
  );

  const activeName = () => (isControlled() ? local.value! : innerVal());

  const switchTo = async (name: number | string) => {
    if (name === activeName()) return;
    if (local.beforeChange) {
      const ok = await local.beforeChange(name);
      if (ok === false) return;
    }
    if (!isControlled()) setInnerVal(name);
    local.onChange?.(name);
    emitEvent({ component: 'TabBar', type: 'change', payload: name, props: props, timestamp: Date.now() });
  };

  const ctx: TabBarContextValue = {
    activeName,
    activeColor: () => local.activeColor!,
    inactiveColor: () => local.inactiveColor!,
    switchTo,
  };

  return (
    <TabBarContext.Provider value={ctx}>
      <div
        class={cn(
          styles.tabbar,
          local.fixed && styles.fixed,
          local.border && styles.border,
          local.class,
        )}
        style={{
          '--sc-tabbar-height': h(),
          height: h(),
          'z-index': local.zIndex,
          ...(local.bgColor ? { background: local.bgColor } : {}),
          ...(typeof local.style === 'object' ? local.style : {}),
        }}
        {...rest}
      >
        {local.children}
      </div>
      <Show when={local.fixed && local.placeholder}>
        <div style={{ height: `var(--sc-tabbar-height, ${h()})` }} />
      </Show>
      <Show when={local.fixed && local.safeArea}>
        <SafeArea position="bottom" />
      </Show>
    </TabBarContext.Provider>
  );
};

/* ══════════════════════════════════════════════════════════════════
   TabBarItem
   ══════════════════════════════════════════════════════════════════ */

export const TabBarItem: Component<TabBarItemProps> = (rawProps) => {
  const ctx = useContext(TabBarContext);
  if (!ctx) {
    console.warn('TabBarItem must be used inside TabBar');
    return null;
  }

  const [local] = splitProps(rawProps, ['name', 'icon', 'dot', 'badge', 'badgeProps', 'label', 'class', 'style']);

  const isActive = () => ctx.activeName() === local.name;

  const iconColor = () =>
    isActive() ? ctx.activeColor() : ctx.inactiveColor();

  const renderIcon = () => {
    if (!local.icon) return null;
    const iconEl = (
      <span class={styles.icon}>
        {typeof local.icon === 'string'
          ? <Icon name={local.icon as IconName} size={22} color={iconColor()} />
          : typeof local.icon === 'function'
            ? (local.icon as Component<{ active: boolean }>)({ active: isActive() })
            : local.icon}
      </span>
    );

    if (local.dot || local.badge != null) {
      return (
        <Badge content={local.badge} dot={local.dot} {...(local.badgeProps || {})}>
          {iconEl}
        </Badge>
      );
    }

    return iconEl;
  };

  return (
    <div
      class={cn(styles.item, local.class)}
      style={{
        color: iconColor(),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      onClick={() => ctx.switchTo(local.name)}
    >
      {renderIcon()}
      <Show when={local.label}>
        <span class={styles.label}>{local.label}</span>
      </Show>
    </div>
  );
};
