import { createSignal, For, Show, type Component } from 'solid-js';
import { NavBar } from '../../components/NavBar';
import { SafeArea } from '../../components/SafeArea';
import { Icon } from '../../components/Icon';
import styles from './MobilePreview.module.css';

export interface ComponentEntry {
  name: string;
  key: string;
}

export interface MobilePreviewProps {
  /** 组件名称 */
  title: string;
  /** 属性列表 */
  props?: { name: string; type: string; desc: string }[];
  /** 组件列表（左抽屉用） */
  components?: ComponentEntry[];
  /** 切换组件回调 */
  onNavigate?: (key: string) => void;
  children: any;
}

export const MobilePreview: Component<MobilePreviewProps> = (props) => {
  const [showProps, setShowProps] = createSignal(false);
  const [drawerOpen, setDrawerOpen] = createSignal(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div class={styles.shell}>
      <SafeArea position="top" />
      <NavBar
        title={props.title}
        fixed
        border
        placeholder
        left={
          props.components ? (
            <span class={styles.navBtn} onClick={openDrawer}>
              <Icon name="menu" size={20} />
            </span>
          ) : undefined
        }
        right={
          <span class={styles.navBtn} onClick={() => setShowProps(!showProps())}>
            <Icon name="information" size={20} />
          </span>
        }
      />

      {/* Scrollable demo area */}
      <div class={styles.body}>
        {props.children}
      </div>

      {/* ══ Left Drawer — Component Menu ══ */}
      <Show when={props.components}>
        {/* Overlay */}
        <div
          class={styles.overlay}
          classList={{ [styles.overlayVisible!]: drawerOpen() }}
          onClick={closeDrawer}
        />
        {/* Drawer */}
        <div
          class={styles.drawer}
          classList={{ [styles.drawerOpen!]: drawerOpen() }}
        >
          <div class={styles.drawerHeader}>
            <span class={styles.drawerTitle}>组件 / Components</span>
            <button class={styles.drawerCloseBtn} onClick={closeDrawer}>✕</button>
          </div>
          <div class={styles.drawerBody}>
            <For each={props.components!}>
              {(item) => (
                <div
                  class={styles.drawerItem}
                  onClick={() => { closeDrawer(); props.onNavigate?.(item.key); }}
                >
                  <span>{item.name}</span>
                  <span class={styles.drawerItemArrow}>›</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* ══ Bottom Sheet — Props ══ */}
      <Show when={showProps()}>
        <div
          class={styles.overlay}
          classList={{ [styles.overlayVisible!]: true }}
          onClick={() => setShowProps(false)}
        />
        <div class={styles.sheet}>
          <div class={styles.sheetHeader}>
            <span class={styles.sheetTitle}>属性 / Props</span>
            <button class={styles.closeBtn} onClick={() => setShowProps(false)}>✕</button>
          </div>
          <div class={styles.sheetBody}>
            {props.props?.length ? (
              <table class={styles.propsTable}>
                <thead>
                  <tr><th>属性</th><th>类型</th><th>说明</th></tr>
                </thead>
                <tbody>
                  {props.props.map((p) => (
                    <tr>
                      <td class={styles.propName}>{p.name}</td>
                      <td class={styles.propType}>{p.type}</td>
                      <td class={styles.propDesc}>{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div class={styles.empty}>暂无属性</div>
            )}
          </div>
        </div>
      </Show>

      <SafeArea position="bottom" />
    </div>
  );
};
