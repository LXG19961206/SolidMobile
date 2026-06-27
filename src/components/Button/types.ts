import type { JSX } from 'solid-js';

/** 按钮语义色 / Semantic color type */
export type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/** 按钮填充方式 / Fill style */
export type ButtonVariant = 'solid' | 'outline' | 'ghost';

/** 按钮尺寸 / Size preset */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/** HTML 原生 button type 属性 */
export type ButtonNativeType = 'button' | 'submit' | 'reset';

/** 图标位置 */
export type IconPosition = 'left' | 'right';

/**
 * 按钮 Props。
 *
 * 继承标准 HTML button / anchor 属性，未显式列出的属性会透传给底层元素。
 */
export interface ButtonProps extends Omit<
  JSX.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
  'children' | 'style' | 'class' | 'id'
> {
  // ---- 内容 ----
  /** 按钮文字。与 `children` 二选一，`text` 优先。 */
  text?: string;
  /** 按钮子元素。当 `text` 未提供时生效。 */
  children?: JSX.Element;

  // ---- 外观 ----
  /**
   * 按钮语义色，默认 `'primary'`。
   *
   * - `primary`：主色（品牌蓝）
   * - `secondary`：次色（灰色）
   * - `success`：成功/确认（绿色）
   * - `warning`：警告（橙色）
   * - `danger`：危险/删除（红色）
   * - `info`：信息（蓝色）
   */
  type?: ButtonType;
  /**
   * 按钮填充方式，默认 `'solid'`。
   *
   * - `solid`：实心填充
   * - `outline`：线框风格（透明背景 + 彩色边框和文字）
   * - `ghost`：透明风格（无边框，hover 时显示背景）
   */
  variant?: ButtonVariant;
  /** 按钮尺寸，默认 `'md'` */
  size?: ButtonSize;
  /** 通栏按钮（宽度 100%） */
  block?: boolean;
  /** 胶囊形状（border-radius 使用 full 值） */
  round?: boolean;
  /** 0.5px 细线边框。当前为实验性功能。 */
  hairline?: boolean;

  // ---- 自定义颜色 ----
  /** 自定义背景色（优先级高于 `type`） */
  color?: string;
  /** 自定义文字颜色（优先级高于 `type`） */
  textColor?: string;

  // ---- 图标 ----
  /**
   * 图标。支持两种形式：
   * - 字符串：传入内置图标名，如 `icon="star"`（推荐）
   * - JSX：传入任意元素，如 `icon={<MyIcon />}`
   */
  icon?: import('../Icon/types').IconName | JSX.Element;
  /** 图标相对文字的位置，默认 `'left'` */
  iconPosition?: IconPosition;

  // ---- 状态 ----
  /** 禁用状态 */
  disabled?: boolean;
  /** 加载中状态。显示旋转动画并禁用交互。 */
  loading?: boolean;
  /** 加载中显示的文字。不设置则保留原文字。 */
  loadingText?: string;

  // ---- 行为 ----
  /** HTML `<button>` 的 `type` 属性。在 `<form>` 中决定触发提交还是重置。 */
  nativeType?: ButtonNativeType;
  /** 链接地址。设置后按钮渲染为 `<a>` 标签。 */
  href?: string;
  /** 链接打开方式。仅在 `href` 存在时生效。 */
  target?: string;

  // ---- 事件 ----
  /** 点击事件回调。禁用或加载中时不触发。 */
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement | HTMLAnchorElement, MouseEvent>;

  // ---- 其他 ----
  /** 自定义 CSS class */
  class?: string;
  /** 内联样式 */
  style?: JSX.CSSProperties | string;
  /** DOM id */
  id?: string;
  /** 无障碍标签。纯图标按钮必须设置。 */
  'aria-label'?: string;
  /** 自定义 data-* 属性 */
  [key: `data-${string}`]: string | undefined;
}
