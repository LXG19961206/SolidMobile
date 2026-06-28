import type { JSX } from 'solid-js';

/** 图标变体：线性（空心）或填充（实心） */
export type IconVariant = 'line' | 'fill';

/**
 * 所有可用图标名称的联合类型。
 * 基于 Remix Icon 精选图标集，共 129 个语义图标。
 *
 * 命名规范遵循 Remix Icon 原始命名，详见 https://remixicon.com
 */
export type IconName =
  | 'account-box'
  | 'account-circle'
  | 'add'
  | 'arrow-down'
  | 'arrow-drop-down'
  | 'arrow-drop-up'
  | 'arrow-go-back'
  | 'arrow-go-forward'
  | 'arrow-left'
  | 'arrow-left-right'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-up-down'
  | 'article'
  | 'at'
  | 'attachment'
  | 'bank-card'
  | 'bar-chart'
  | 'bold'
  | 'bookmark'
  | 'calendar'
  | 'calendar-2'
  | 'camera'
  | 'chat'
  | 'check'
  | 'checkbox-blank-circle'
  | 'checkbox-circle'
  | 'clipboard'
  | 'close'
  | 'close-circle'
  | 'eye'
  | 'eye-off'
  | 'cloud'
  | 'code'
  | 'compass'
  | 'computer'
  | 'corner-down-right'
  | 'corner-up-left'
  | 'coupon'
  | 'dashboard'
  | 'delete-bin'
  | 'download'
  | 'draft'
  | 'earth'
  | 'edit'
  | 'error-warning'
  | 'exchange'
  | 'external-link'
  | 'file'
  | 'file-copy'
  | 'file-download'
  | 'file-text'
  | 'file-upload'
  | 'filter'
  | 'folder'
  | 'folder-add'
  | 'folder-open'
  | 'fullscreen'
  | 'fullscreen-exit'
  | 'group'
  | 'headphone'
  | 'heart'
  | 'history'
  | 'home'
  | 'home-2'
  | 'image'
  | 'indeterminate-circle'
  | 'information'
  | 'italic'
  | 'keyboard'
  | 'line-chart'
  | 'link'
  | 'link-unlink'
  | 'list-check'
  | 'list-ordered'
  | 'lock'
  | 'mail'
  | 'map-pin'
  | 'menu'
  | 'message'
  | 'money'
  | 'moon'
  | 'more'
  | 'more-2'
  | 'music'
  | 'notification'
  | 'notification-off'
  | 'palette'
  | 'pause'
  | 'percent'
  | 'phone'
  | 'pie-chart'
  | 'play'
  | 'price-tag'
  | 'printer'
  | 'question'
  | 'radio-button'
  | 'refresh'
  | 'safe'
  | 'search'
  | 'send'
  | 'server'
  | 'settings'
  | 'settings-3'
  | 'share'
  | 'shield'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'sort'
  | 'star'
  | 'stop'
  | 'strikethrough'
  | 'subtract'
  | 'sun'
  | 'tablet'
  | 'team'
  | 'time'
  | 'todo'
  | 'underline'
  | 'unlock'
  | 'upload'
  | 'user'
  | 'user-3'
  | 'user-add'
  | 'user-follow'
  | 'video'
  | 'volume-mute'
  | 'volume-up'
  | 'wallet'
  | 'zoom-in'
  | 'zoom-out';

export interface IconProps {
  /** 图标名称 */
  name: IconName;
  /**
   * 图标风格变体。
   * - `'line'`（默认）：线性 / 空心风格
   * - `'fill'`：填充 / 实心风格
   *
   * 注意：部分图标（如 bold、italic、link 等 Editor 类图标）仅提供单一风格，
   * 此时 `variant` 属性无效。
   */
  variant?: IconVariant;
  /**
   * 图标尺寸。传入数字时自动补 `px` 单位。
   * @default '1em'
   */
  size?: string | number;
  /**
   * 图标颜色，对应 CSS `color` 属性。
   * 会同时设置 `fill` 和 `color` 以覆盖 SVG 内联样式。
   */
  color?: string;
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
  /** 无障碍标签。纯装饰性图标无需设置，功能性图标请设置此属性。 */
  'aria-label'?: string;
  /** 点击事件 */
  onClick?: JSX.EventHandlerUnion<SVGSVGElement, MouseEvent>;
  /** 自定义 data-* 属性 */
  [key: `data-${string}`]: string | undefined;
}
