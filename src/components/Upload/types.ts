import type { JSX } from 'solid-js';

/* ── UploadFile ── */

export interface UploadFile {
  /** 唯一标识 */
  uid: string;
  /** 文件名 */
  name: string;
  /** 文件大小（bytes） */
  size: number;
  /** MIME type */
  type: string;
  /** 本地预览地址（createObjectURL，图片类型自动生成） */
  thumbUrl?: string;
  /** 上传完成后的远程地址 */
  url?: string;
  /** 状态: pending（待上传）| uploading | done | error */
  status: 'pending' | 'uploading' | 'done' | 'error';
  /** 上传进度 0‑100 */
  percent?: number;
  /** 原始 File 对象 */
  originFile?: File;
  /** 服务器返回的原始响应 */
  response?: unknown;
  /** 错误信息 */
  error?: string;
}

/* ── UploadProps ── */

export interface UploadProps {
  /**
   * 展示类型。
   * - `image`（默认）: 缩略图网格，适合图片上传
   * - `file`    : 文件列表，不生成缩略图，适合文档 / 压缩包等
   */
  type?: 'image' | 'file';
  /** 接受的文件类型，同 <input accept>。type=image 时默认 image/* */
  accept?: string;
  /** 是否允许多选 */
  multiple?: boolean;
  /** 最大文件数，达到后隐藏添加按钮 */
  maxCount?: number;
  /** 调用系统相机，同 <input capture> */
  capture?: 'environment' | 'user';

  /**
   * 上传函数。
   *
   * **必须返回上传后的文件 URL（字符串）**，组件用此 URL 进行缩略图反显和预览。
   * 返回 undefined 则不上传，仅管理文件列表。
   *
   * Upload 不做 HTTP 请求，由你通过此函数注入。
   * 组件层与 HTTP 解耦的设计理由见「设计理念」章节。
   *
   * @example
   * ```tsx
   * <Upload api={(file, onProgress) =>
   *   request.post('/upload', { body: file, onProgress }).then(r => r.data.url)
   * } />
   * ```
   */
  api?: (file: File, onProgress?: (percent: number) => void) => Promise<string | undefined>;

  /** 单文件大小上限（bytes），超限的文件被过滤 */
  maxSize?: number;
  /**
   * 上传前置校验。
   * - return false / throw → 跳过该文件
   * - 异步可用 async/await
   */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;

  /** 文件列表（受控，传此属性后列表由你管理） */
  fileList?: UploadFile[];
  /** 文件列表（非受控，初始值） */
  defaultFileList?: UploadFile[];

  /** 自定义添加按钮，不传使用默认 "+" 按钮 */
  children?: JSX.Element;
  /** 自定义文件项渲染，覆盖默认的缩略图 / 文件列表 */
  renderFile?: (file: UploadFile, index: number) => JSX.Element;

  /**
   * 文件类型图标映射。key 为文件后缀（如 'pdf'、'doc'），
   * value 为图标名（传入 Icon 组件）或自定义 JSX。
   *
   * 特殊 key:
   * - `'image'` | `'video'` | `'audio'` — 匹配对应 MIME 类别
   * - `'*'` — 兜底（未匹配时的默认图标）
   *
   * @example
   * ```tsx
   * <Upload type="file" iconMap={{ pdf: 'file-pdf', doc: 'file-text', '*': 'file' }} />
   * ```
   */
  iconMap?: Record<string, string | JSX.Element>;

  /** 文件列表变化时触发（添加 / 删除 / 进度 / 状态变更） */
  onChange?: (fileList: UploadFile[], file: UploadFile) => void;
  /** 单个文件上传成功时触发 */
  onSuccess?: (file: UploadFile, response: unknown) => void;
  /** 单个文件上传失败时触发 */
  onError?: (file: UploadFile, error: string) => void;
  /**
   * 删除前回调。
   * - return false → 阻止删除
   * - 异步可用 async/await
   */
  onDelete?: (file: UploadFile) => boolean | Promise<boolean>;

  /** 禁用上传 */
  disabled?: boolean;

  class?: string;
  style?: JSX.CSSProperties | string;
}
