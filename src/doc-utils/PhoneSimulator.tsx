import { Show } from 'solid-js';
import { cn } from '../utils';
import { NavBar } from '../components/NavBar';
import styles from './PhoneSimulator.module.css';

export interface PhoneSimulatorProps {
  children?: any;
  class?: string;
  /** 隐藏顶部标题栏 */
  hideTitle?: boolean;
}

function getTitle(): string {
  if (typeof window === 'undefined') return '';
  const hash = window.location.hash.replace('#', '');
  const map: Record<string, string> = {
    'design-tokens': '视觉规范',
    button: 'Button 按钮', icon: 'Icon 图标', center: 'Center 居中',
    divider: 'Divider 分割线', layout: 'Layout 布局',
    avatar: 'Avatar 头像', badge: 'Badge 徽标', tag: 'Tag 标签',
    image: 'Image 图片', empty: 'Empty 空状态', lazyload: 'Lazyload 懒加载',
    list: 'List 列表',
    navbar: 'NavBar 导航栏', tabs: 'Tabs 标签页', cell: 'Cell 单元格',
    toast: 'Toast 轻提示', dialog: 'Dialog 弹窗', notify: 'Notify 通知栏',
    overlay: 'Overlay 遮罩层', actionsheet: 'ActionSheet 动作面板',
    loading: 'Loading 加载', cascader: 'Cascader 级联选择',
    switch: 'Switch 开关',
  };
  return map[hash] || '';
}

/**
 * 手机模拟器容器 — 在文档中模拟移动端视口。
 * 顶部显示当前组件名称，内部使用 transform 生成新的 fixed 定位包含块。
 */
export function PhoneSimulator(props: PhoneSimulatorProps) {
  const title = getTitle();
  /** NavBar 页面自身有 fixed 导航，隐藏模拟器标题避免冲突 */
  const isNavPage = () => typeof window !== 'undefined' && window.location.hash.includes('navbar');
  const showTitle = () => title && !props.hideTitle && !isNavPage();
  return (
    <div class={cn(styles.frame, props.class)}>
      <div class={styles.screen} style="--sc-safe-area-top: 32px; --sc-safe-area-bottom: 0px;">
        <Show when={showTitle()}>
          <NavBar title={title} fixed border placeholder />
        </Show>
        <div class={styles.scroll}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
