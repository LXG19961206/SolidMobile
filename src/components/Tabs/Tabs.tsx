import {
  createSignal,
  createEffect,
  on,
  mergeProps,
  splitProps,
  For,
  Show,
  type Component,
  type JSX,
  createContext,
  useContext,
  onMount,
} from 'solid-js';
import { cn } from '../../utils';
import type { TabsProps, TabProps } from './types';
import styles from './Tabs.module.css';

/* ═══════════════════════════════════════════════════════════════════════
   Context — Tab registers itself with parent Tabs
   ═══════════════════════════════════════════════════════════════════════ */

interface TabEntry {
  title: string | JSX.Element;
  name: string;
  disabled: boolean;
  children: JSX.Element;
}

const TabsContext = createContext<{
  register: (entry: TabEntry) => void;
  activeName: () => string;
  switchTo: (name: string) => void;
  renderedNames: () => Set<string>;
}>();

/* ═══════════════════════════════════════════════════════════════════════
   Tab
   ═══════════════════════════════════════════════════════════════════════ */

export const Tab: Component<TabProps> = (rawProps) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('<Tab> must be used inside <Tabs>');

  const name = String(rawProps.name);
  onMount(() => {
    ctx.register({
      title: rawProps.title ?? name,
      name,
      disabled: !!rawProps.disabled,
      children: rawProps.children as JSX.Element,
    });
  });

  return (
    <Show when={ctx.renderedNames().has(name)}>
      <div class={cn(styles.panel, name === ctx.activeName() && styles.panelActive)}>
        {rawProps.children}
      </div>
    </Show>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   Tabs
   ═══════════════════════════════════════════════════════════════════════ */

const defaultProps: Partial<TabsProps> = {
  type: 'line',
  duration: 0.3,
  lazyRender: true,
};

export const Tabs: Component<TabsProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'active', 'defaultActive', 'onChange', 'type', 'color', 'background',
    'duration', 'animated', 'border', 'sticky', 'offsetTop',
    'lazyRender', 'titleActiveColor', 'titleInactiveColor', 'beforeChange',
    'children', 'class', 'style',
  ]);

  // ── Tab registry ──
  const [tabs, setTabs] = createSignal<TabEntry[]>([]);

  const register = (entry: TabEntry) => {
    setTabs((prev) => {
      if (prev.find((t) => t.name === entry.name)) return prev;
      return [...prev, entry];
    });
  };

  // ── Active state ──
  const isControlled = () => local.active !== undefined;
  const [internalActive, setInternalActive] = createSignal('');

  // Defer setting default active until tabs register
  createEffect(() => {
    const list = tabs();
    if (list.length === 0) return;
    if (isControlled()) {
      setInternalActive(String(local.active));
      return;
    }
    if (local.defaultActive !== undefined) {
      setInternalActive(String(local.defaultActive));
    } else if (!internalActive()) {
      setInternalActive(String(list[0].name));
    }
  });

  const activeName = () => (isControlled() ? String(local.active) : internalActive());

  createEffect(on(() => local.active, (v) => {
    if (v !== undefined) setInternalActive(String(v));
  }));

  // ── Indicator ──
  let headerRef!: HTMLDivElement;
  const [indicatorStyle, setIndicatorStyle] = createSignal<JSX.CSSProperties>({});

  const updateIndicator = () => {
    if (local.type !== 'line' || !headerRef) return;
    const idx = tabs().findIndex((t) => t.name === activeName());
    const titles = headerRef.querySelectorAll('[data-tab-title]');
    const el = titles[idx] as HTMLElement | undefined;
    if (el) {
      setIndicatorStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` });
    }
  };

  createEffect(on(activeName, updateIndicator));
  createEffect(() => { tabs(); updateIndicator(); });
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateIndicator);
  }

  // ── Switch tab ──
  const switchTo = async (name: string) => {
    if (name === activeName()) return;
    const tab = tabs().find((t) => t.name === name);
    if (!tab || tab.disabled) return;

    if (local.beforeChange) {
      const ok = await local.beforeChange(name);
      if (ok === false) return;
    }

    if (!isControlled()) setInternalActive(name);
    local.onChange?.(name);
  };

  // ── Lazy render set ──
  const renderedNames = (): Set<string> => {
    const set = new Set<string>();
    const list = tabs();
    if (!local.lazyRender) {
      list.forEach((t) => set.add(t.name));
    } else {
      const idx = list.findIndex((t) => t.name === activeName());
      if (idx >= 0) set.add(list[idx].name);
    }
    return set;
  };

  const ctx = { register, activeName, switchTo, renderedNames };

  return (
    <TabsContext.Provider value={ctx}>
      <div
        class={cn(styles.tabs, local.animated && styles.animated, local.class)}
        style={typeof local.style === 'object' ? local.style : undefined}
        {...rest}
      >
        {/* Header */}
        <div
          class={cn(
            styles.header,
            local.sticky && styles.sticky,
            local.type === 'line' && (local.border ? styles.line : ''),
            local.type === 'card' && styles.card,
          )}
          style={{
            ...(local.background ? { background: local.background } : {}),
            ...(local.sticky && local.offsetTop !== undefined
              ? { top: typeof local.offsetTop === 'number' ? `${local.offsetTop}px` : local.offsetTop }
              : {}),
          }}
          ref={headerRef!}
        >
          <div class={styles.nav}>
            <For each={tabs()}>
              {(tab) => {
                const isActive = () => tab.name === activeName();
                return (
                  <div
                    data-tab-title={tab.name}
                    class={cn(
                      styles.tabTitle,
                      isActive() && styles.active,
                      tab.disabled && styles.disabled,
                    )}
                    style={{
                      ...(isActive() && local.titleActiveColor ? { color: local.titleActiveColor } : {}),
                      ...(!isActive() && local.titleInactiveColor ? { color: local.titleInactiveColor } : {}),
                      ...(isActive() && local.color ? { color: local.color, 'border-bottom-color': local.color } : {}),
                    }}
                    onClick={() => switchTo(tab.name)}
                  >
                    {tab.title}
                  </div>
                );
              }}
            </For>
          </div>
          <Show when={local.type === 'line'}>
            <div class={styles.indicator} style={{
              ...indicatorStyle(),
              ...(local.color ? { background: local.color } : {}),
            }} />
          </Show>
        </div>

        {/* Content rendered by Tab components themselves */}
        <div class={styles.content}>
          {local.children}
        </div>
      </div>
    </TabsContext.Provider>
  );
};
