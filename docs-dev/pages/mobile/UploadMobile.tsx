import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { CodeBlock } from '../../doc-utils';
import { useT, useLocale } from '../../doc-i18n';
import { Upload } from '../../../src/components/Upload';
import type { UploadFile } from '../../../src/components/Upload';
import { ToastRenderer, Toast } from '../../../src/components/Toast';

export interface UploadMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'type', type: "'image' | 'file'", desc: 'componentProps.upload.type' },
  { name: 'accept', type: 'string', desc: 'componentProps.upload.accept' },
  { name: 'multiple', type: 'boolean', desc: 'componentProps.upload.multiple' },
  { name: 'maxCount', type: 'number', desc: 'componentProps.upload.maxCount' },
  { name: 'capture', type: 'string', desc: 'componentProps.upload.capture' },
  { name: 'api', type: '(file, onProgress?) => Promise<string | undefined>', desc: 'componentProps.upload.api' },
  { name: 'maxSize', type: 'number', desc: 'componentProps.upload.maxSize' },
  { name: 'beforeUpload', type: '(file, files) => boolean', desc: 'componentProps.upload.beforeUpload' },
  { name: 'fileList', type: 'UploadFile[]', desc: 'componentProps.upload.fileList' },
  { name: 'defaultFileList', type: 'UploadFile[]', desc: 'componentProps.upload.defaultFileList' },
  { name: 'onChange', type: '(fileList, file) => void', desc: 'componentProps.upload.onChange' },
  { name: 'onDelete', type: '(file) => boolean', desc: 'componentProps.upload.onDelete' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.upload.disabled' },
  { name: 'children', type: 'JSX.Element', desc: 'componentProps.upload.children' },
  { name: 'renderFile', type: '(file, index) => JSX', desc: 'componentProps.upload.renderFile' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '8px 16px 16px' },
};

const designTableRow = { padding: '6px 8px', 'font-size': '0.75rem', 'line-height': 1.6, 'border-bottom': '1px solid var(--sc-doc-card-divider, #f3f4f6)' };

const designReasons = [
  { titleKey: 'uploadDesignDecoupleTitle', descKey: 'uploadDesignDecoupleDesc' },
  { titleKey: 'uploadDesignTokenTitle', descKey: 'uploadDesignTokenDesc' },
  { titleKey: 'uploadDesignOssTitle', descKey: 'uploadDesignOssDesc' },
  { titleKey: 'uploadDesignTestTitle', descKey: 'uploadDesignTestDesc' },
];

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
  const t = useT();
  const isEn = () => useLocale() === 'en-US';
  const [files1, setFiles1] = createSignal<UploadFile[]>([]);

  return (
    <MobilePreview title="Upload 上传" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* Design */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.design')}</div>
        <div style={{ padding: '0 16px 12px', 'font-size': '0.8rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' }}>
          <p style={{ margin: '0 0 6px' }}>
            {isEn() ? 'Ideal world, a single URL to upload:' : '最理想的构想，一个 URL 即可完成上传：'}
          </p>
          <CodeBlock lang="tsx" code={`<Upload action="/api/upload" />`} />

          <p style={{ margin: '10px 0 0' }}>
            {isEn() ? 'But in real enterprise projects:' : '但在实际企业级工程中，情况远不止于此：'}
          </p>
          <ul style={{ margin: '0 0 10px', 'padding-left': '1.5rem', 'line-height': 2 }}>
            {isEn() ? (
              <><li>Is method always POST?</li><li>Binary, form-data, or other encoding?</li><li>Extra headers (Authorization, Content-Type)?</li><li>BaseURL — where from?</li><li>Timeout? Retry strategy?</li><li>Error handling? Progress feedback?</li></>
            ) : (
              <><li>method 一定是 POST 吗？</li><li>binary 还是 form-data，或是其他编码格式？</li><li>额外的请求头（Authorization、Content-Type 等）如何传递？</li><li>BaseURL 从哪来？</li><li>超时、重试策略如何配置？</li><li>上传异常如何处理？进度如何反馈？</li></>
            )}
          </ul>

          <h3 style={{ 'font-size': '0.85rem', 'font-weight': 600, margin: '16px 0 8px' }}>{t('section.noHttp')}</h3>
          <p style={{ margin: '0 0 8px' }}>
            {isEn() ? (
              <>Traditional component libraries send upload requests on behalf of the developer. This appears convenient but hard-codes the request logic at the props level, making it difficult to leverage the project's global HTTP configuration (interceptors, token refresh, unified error handling). <strong>HTTP requests belong to the business layer, not the component layer.</strong></>
            ) : (
              <>传统组件库替开发者代发上传请求，看似方便，实则将请求逻辑固化在 props 层面，难以充分利用项目已有的全局 HTTP 配置（拦截器、Token 刷新、统一错误处理等）。<strong>请求应归属业务层，而非组件层。</strong></>
            )}
          </p>
          <p style={{ margin: '0 0 8px' }}>
            {isEn() ? (
              <>Therefore Upload <strong>does not construct or send upload requests</strong> — it provides no action, headers, data, withCredentials or other request-related props. Upload requests are entirely initiated by the developer; the component library does not participate in this process.</>
            ) : (
              <>因此 Upload <strong>不做请求的构造与发起</strong>，不提供 action、headers、data、withCredentials 等请求相关属性。上传请求由开发者自行发起，组件库不介入这一过程。</>
            )}
          </p>

          <h3 style={{ 'font-size': '0.85rem', 'font-weight': 600, margin: '16px 0 8px' }}>{isEn() ? 'Inversion of Control — Interface, Not Implementation' : '控制反转（IoC）— 面向接口，而非实现'}</h3>
          <p style={{ margin: '0 0 8px' }}>
            {isEn() ? (
              <>Upload does one thing: <strong>manage the file lifecycle</strong> (select → validate → display → delete). "How to upload" is a <strong>strategy</strong>, injected via the api prop — you write a function that returns a Promise, and Upload calls it. This is Inversion of Control: the component defines an <strong>interface</strong> (a function returning a Promise), and you provide the <strong>implementation</strong>. Tokens, interceptors, and HTTP libraries are all under your control.</>
            ) : (
              <>Upload 只做一件事：<strong>管理文件的生命周期</strong>（选文件 → 校验 → 展示 → 删除）。「怎么上传」是一个<strong>策略</strong>，由你通过 api 属性注入——你写一个返回 Promise 的函数，Upload 调用它。这就是控制反转：组件定义<strong>接口</strong>（一个返回 Promise 的函数），你提供<strong>实现</strong>。token、拦截器、请求库都在你自己掌控之中。</>
            )}
          </p>
          <CodeBlock lang="tsx" code={`// 你的 IoC 容器 — 封装好的请求实例
import { request } from '@/services/http';

// 注入给 Upload。api 必须返回文件 URL 字符串
<Upload
  api={(file, onProgress) =>
    request.post('/upload', { body: file, onProgress })
      .then(res => res.data.url)
  }
/>`} />
          <p style={{ margin: '0 0 8px' }}>
            {isEn() ? 'Without api, Upload degrades to a "file picker + list manager".' : '如果不传 api，Upload 退化为「文件选择器 + 列表管理器」。'}
          </p>
          <p style={{ margin: '0 0 10px' }}>
            {isEn() ? (
              <>Behind this design is a belief: a mature project already has its own HTTP infrastructure. Upload doesn't replace it — it <strong>integrates into it</strong>.</>
            ) : (
              <>这一设计的背后，是我们相信：一个成熟的工程，本就有自己的 HTTP 基础设施。Upload 不替代它，而是<strong>融入它</strong>。</>
            )}
          </p>

          <h3 style={{ 'font-size': '0.85rem', 'font-weight': 600, margin: '16px 0 8px' }}>{isEn() ? 'This Means' : '这意味着'}</h3>
          <div style={{ 'border-radius': '6px', overflow: 'hidden' as const, border: '1px solid var(--sc-doc-card-border, #e5e7eb)' }}>
            {designReasons.map((r, i) => (
              <div style={{ ...designTableRow, background: i % 2 === 0 ? 'transparent' : 'var(--sc-doc-card-placeholder, #f9fafb)', 'border-bottom': i < designReasons.length - 1 ? designTableRow['border-bottom'] : 'none' }}>
                <div style={{ 'font-weight': 600, 'margin-bottom': '2px', color: 'var(--sc-doc-card-text, #374151)' }}>{t(`demo.${r.titleKey}`)}</div>
                <div style={{ color: 'var(--sc-doc-card-desc, #6b7280)' }}>{t(`demo.${r.descKey}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageUpload')}</div>
        <div style={CARD.desc}>{t('demo.imageUploadDesc')}</div>
        <div style={CARD.body}>
          <Upload api={mockApi} maxCount={9} />
        </div>
      </div>

      {/* File Upload */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.fileUpload')}</div>
        <div style={CARD.desc}>{t('demo.fileUploadDesc')}</div>
        <div style={CARD.body}>
          <Upload type="file" api={mockApi} />
        </div>
      </div>

      {/* Custom Icon */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customIcon')}</div>
        <div style={CARD.desc}>{t('demo.customIconDesc')}</div>
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

      {/* Limits */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.limits')}</div>
        <div style={CARD.desc}>{t('demo.limitsDesc')}</div>
        <div style={CARD.body}>
          <Upload
            maxCount={3}
            maxSize={1024 * 1024}
            beforeUpload={(f) => f.type.startsWith('image/')}
          />
        </div>
      </div>

      {/* Controlled Mode */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.controlled')}</div>
        <div style={CARD.desc}>{t('demo.controlledDesc')}</div>
        <div style={CARD.body}>
          <Upload
            fileList={files1()}
            onChange={(list) => setFiles1(list)}
          />
        </div>
      </div>

      {/* Custom Trigger */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customTrigger')}</div>
        <div style={CARD.desc}>{t('demo.customTriggerDesc')}</div>
        <div style={CARD.body}>
          <Upload>
            <span style={{ display: 'inline-flex', 'align-items': 'center', gap: '4px', padding: '8px 16px', background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '6px', 'font-size': '0.8125rem' }}>
              + Upload Image
            </span>
          </Upload>
        </div>
      </div>
    </MobilePreview>
  );
};
