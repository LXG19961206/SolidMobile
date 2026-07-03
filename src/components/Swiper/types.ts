import type { JSX } from 'solid-js';

export interface SwiperProps {
  /** 自动轮播间隔 (ms)，不传则不自动播放 */
  autoplay?: number | string;
  /** 动画时长 (ms)，默认 500 */
  duration?: number | string;
  /** 初始位置索引，默认 0 */
  initialSwipe?: number | string;
  /** 滑块宽度 (px)，默认 auto */
  width?: number | string;
  /** 滑块高度 (px)，默认 auto */
  height?: number | string;
  /** 是否开启循环播放，默认 true */
  loop?: boolean;
  /** 是否显示指示器，默认 true */
  showIndicators?: boolean;
  /** 是否为纵向滚动，默认 false */
  vertical?: boolean;
  /** 是否可以通过手势滑动，默认 true */
  touchable?: boolean;
  /** 是否阻止滑动事件冒泡，默认 true */
  stopPropagation?: boolean;
  /** 是否延迟渲染未展示的轮播项，默认 false */
  lazyRender?: boolean;
  /** 指示器颜色，默认 #1989fa */
  indicatorColor?: string;
  /** 自定义指示器渲染 (current, active) => JSX */
  indicators?: (current: number, total: number) => JSX.Element;
  /** 快捷图片地址数组，传此属性后无需写 SwiperItem */
  imgUrls?: string[];
  /** 每一页轮播结束后触发 */
  onChange?: (index: number) => void;
  /** 子元素（SwiperItem 或任意内容） */
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}
