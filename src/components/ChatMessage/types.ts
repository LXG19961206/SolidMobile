import type { JSX } from 'solid-js';

export interface ChatMessageProps {
  /** 气泡位置：left（对方） | right（自己） */
  position: 'left' | 'right';
  /** 消息类型 */
  messageType: 'plainText' | 'richText' | 'image' | 'video' | 'file' | 'custom';
  /** 文本 / markdown 内容 */
  content?: string;
  /** 图片 / 视频 / 文件下载 URL */
  src?: string;
  /** 文件名，自动提取后缀匹配 iconMap */
  fileName?: string;
  /** 文件大小，如 '2.4 MB' */
  fileSize?: string;
  /** 文件图标映射：{ pdf: 'file-pdf', doc: <MyIcon />, image: 'image', '*': 'file' }。key 为后缀（无点，小写）、MIME 大类或 '*' */
  iconMap?: Record<string, string | JSX.Element>;
  /** 下载/上传进度 0-100，有值时气泡底部显示进度条 */
  progress?: number;
  /** 自定义下载回调，不传则 window.open(src) */
  onDownload?: () => void;
  /** custom 类型插槽 */
  children?: JSX.Element;
  /** 自定义渲染（所有类型均可替代默认渲染） */
  renderSlot?: JSX.Element;

  // ── 头像 ──
  /** 头像图片 URL */
  avatar?: string;
  /** 头像大小，默认 36 */
  avatarSize?: number;
  /** 头像形状，默认 circle */
  avatarShape?: 'circle' | 'rounded' | 'square';
  /** 是否显示头像，默认 true */
  showAvatar?: boolean;
  /** 自定义头像插槽，会覆盖 avatar 图片 */
  avatarSlot?: JSX.Element;

  // ── 样式 ──
  /** 气泡尖角，默认 true */
  tail?: boolean;
  /** 气泡最大宽度，默认 72% */
  maxWidth?: string;
  /** 自定义气泡背景色 */
  bgColor?: string;
  /** 自定义气泡圆角 */
  borderRadius?: string;

  // ── 元信息 ──
  /** 发送者名称（群聊） */
  name?: string;
  /** 时间戳 */
  time?: string;
  /** 发送状态 */
  status?: 'sending' | 'sent' | 'read' | 'failed';

  // ── 回调 ──
  /** 发送失败重试 */
  onRetry?: () => void;
  /** 点击头像 */
  onAvatarClick?: () => void;
  /** 长按气泡 */
  onLongPress?: () => void;
  /** 点击图片 / 文件 */
  onContentClick?: () => void;

  class?: string;
  style?: JSX.CSSProperties | string;
}
