import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { Upload } from '../../../src/components/Upload';
import type { UploadFile } from '../../../src/components/Upload';
import { ToastRenderer, Toast } from '../../../src/components/Toast';

export interface UploadMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'type', type: "'image' | 'file'", desc: '展示类型，默认 image。image 缩略图网格，file 文件列表。' },
  { name: 'accept', type: 'string', desc: '接受的文件类型，同 input[accept]' },
  { name: 'multiple', type: 'boolean', desc: '是否多选' },
  { name: 'maxCount', type: 'number', desc: '最大文件数' },
  { name: 'capture', type: 'string', desc: '调用系统相机：environment | user' },
  { name: 'api', type: '(file, onProgress?) => Promise<string | undefined>', desc: '上传函数。必须返回文件 URL 用于反显。不传则只管理文件列表。' },
  { name: 'maxSize', type: 'number', desc: '单文件大小上限 (bytes)' },
  { name: 'beforeUpload', type: '(file, files) => boolean', desc: '上传前置校验' },
  { name: 'fileList', type: 'UploadFile[]', desc: '受控文件列表' },
  { name: 'defaultFileList', type: 'UploadFile[]', desc: '非受控初始列表' },
  { name: 'onChange', type: '(fileList, file) => void', desc: '列表变化回调' },
  { name: 'onDelete', type: '(file) => boolean', desc: '删除前回调' },
  { name: 'disabled', type: 'boolean', desc: '禁用' },
  { name: 'children', type: 'JSX.Element', desc: '自定义添加按钮' },
  { name: 'renderFile', type: '(file, index) => JSX', desc: '自定义文件项渲染' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '8px 16px 16px' },
};

function mockApi(file: File, onProgress?: (pct: number) => void): Promise<string> {
  return new Promise((resolve) => {
    let pct = 0;
    const timer = setInterval(() => {
      pct += Math.random() * 30;
      if (pct >= 100) {
        pct = 100;
        clearInterval(timer);
        resolve(URL.createObjectURL(file) as string);
      }
      onProgress?.(Math.min(pct, 100));
    }, 200);
  });
}

export const UploadMobile: Component<UploadMobileProps> = (props) => {
  const [files1, setFiles1] = createSignal<UploadFile[]>([]);

  return (
    <MobilePreview title="Upload 上传" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 图片上传 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>图片上传</div>
        <div style={CARD.desc}>默认 type=image，自动生成缩略图。最多 9 张。</div>
        <div style={CARD.body}>
          <Upload api={mockApi} maxCount={9} />
        </div>
      </div>

      {/* 文件上传 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>文件上传</div>
        <div style={CARD.desc}>type=file，展示为文件列表，适合文档、压缩包。</div>
        <div style={CARD.body}>
          <Upload type="file" api={mockApi} />
        </div>
      </div>

      {/* 自定义图标 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义图标</div>
        <div style={CARD.desc}>iconMap 按后缀指定图标，image/video/* 可作兜底。</div>
        <div style={CARD.body}>
          <Upload
            type="file"
            iconMap={{
              pdf: 'file-text',
              xlsx: 'dashboard',
              image: 'image',
              video: 'video',
              '*': 'file',
            }}
          />
        </div>
      </div>

      {/* 限制 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>限制 & 校验</div>
        <div style={CARD.desc}>maxCount=3，maxSize=1MB，非图片文件被过滤。</div>
        <div style={CARD.body}>
          <Upload
            maxCount={3}
            maxSize={1024 * 1024}
            beforeUpload={(f) => f.type.startsWith('image/')}
          />
        </div>
      </div>

      {/* 受控模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>受控模式</div>
        <div style={CARD.desc}>通过 fileList + onChange 接管文件列表。</div>
        <div style={CARD.body}>
          <Upload
            fileList={files1()}
            onChange={(list) => setFiles1(list)}
          />
        </div>
      </div>

      {/* 自定义按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义按钮</div>
        <div style={CARD.desc}>children 替代默认的 + 按钮。</div>
        <div style={CARD.body}>
          <Upload>
            <span style={{ display: 'inline-flex', 'align-items': 'center', gap: '4px', padding: '8px 16px', background: '#1677ff', color: '#fff', 'border-radius': '6px', 'font-size': '0.8125rem' }}>
              + 上传图片
            </span>
          </Upload>
        </div>
      </div>

      {/* 设计理念 */}
      <div style={CARD.wrapper}>
        <div style={{ padding: '16px 16px 12px', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>
          <div style={{ 'font-size': '0.85rem', 'font-weight': 600, color: 'var(--sc-color-text, #323233)' }}>设计理念</div>
        </div>
        <div style={{ padding: '12px 16px 16px', 'font-size': '0.8rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' }}>
          <p style={{ margin: '0 0 8px' }}>
            Upload 没有 <code>action</code>、<code>headers</code>、<code>data</code> 这些属性。因为请求是业务层的事，不是组件层的事。
          </p>
          <p style={{ margin: '0 0 8px' }}>
            传统组件库把 fetch 的参数摊开成 props，然后组件库自己去用这些信息去发起上传请求，看起来省事了，实际反而更加麻烦 ——
            Headers(Authorization、Content-Type) 、请求方式、 BaseUrl、请求体  ... 在最坏的情况下每种都需要专门配置，这些反而增加了用户的心智负担。
            并且用户全局的HTTP库的公共配置也无法作用于上传行为。
          </p>
          <p style={{ margin: '0 0 8px' }}>
            <strong>我们认为这是一种错误的引导。</strong>
          </p>
          <p style={{ margin: '0' }}>
            Upload 只做一件事：<strong>管理文件生命周期</strong>（选文件 → 校验 → 展示 → 删除）。上传策略通过 <code>api</code> 函数注入（控制反转 / IoC），你的 token、拦截器、请求库都不需要绕过组件层。
            测试时传个 <code>{"async () => ({ url: '...' })"}</code> 就能跑，不需要 mock 任何 HTTP 库。
          </p>
        </div>
      </div>
    </MobilePreview>
  );
};
