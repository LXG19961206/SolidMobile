import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
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

      {/* Design — moved to front */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.design')}</div>
        <div style={{ padding: '0 16px 12px', 'font-size': '0.8rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' }}>
          <p style={{ margin: '0 0 10px' }}>
            {isEn() ? (
              <>Ideal world — upload with a single URL: <code>{'<Upload action="/api/upload" />'}</code>. But in real projects:</>
            ) : (
              <>最理想的构想，一个 URL 搞定上传：<code>{'<Upload action="/api/upload" />'}</code>。但实际工程中：</>
            )}
          </p>
          <ul style={{ margin: '0 0 10px', 'padding-left': '1.5rem', 'line-height': 2 }}>
            {isEn() ? (
              <><li>Is method always POST?</li><li>Binary, form-data, or other encoding?</li><li>Extra headers (Authorization, Content-Type)?</li><li>BaseURL — where from?</li><li>Timeout? Retry strategy?</li><li>Error handling? Progress feedback?</li></>
            ) : (
              <><li>method 一定是 POST 吗？</li><li>binary 还是 form-data，或是其他编码格式？</li><li>额外的请求头（Authorization、Content-Type 等）如何传递？</li><li>BaseURL 从哪来？</li><li>超时、重试策略如何配置？</li><li>上传异常如何处理？进度如何反馈？</li></>
            )}
          </ul>
          <p style={{ margin: '0 0 10px' }}>
            {isEn() ? (
              <>When the component sends upload requests on your behalf, each upload bypasses your global HTTP infrastructure — interceptors, middleware, token refresh are all lost. Therefore Upload <strong>does not assemble and send upload requests for you</strong> — it provides no action, headers, or data props. The project's global HTTP configuration (interceptors, token refresh, unified error handling) remains fully utilized. <strong>HTTP requests belong to the business layer, not the component layer.</strong></>
            ) : (
              <>由组件库代为发起上传请求，意味着每次上传都在绕开项目全局的 HTTP 基础设施——拦截器、中间件、token 刷新等全部无法生效。Upload <strong>不代为拼凑发起上传请求</strong>，不提供 action、headers、data 等属性。上传请求由开发者自行发起，组件库不介入这一过程，项目的全局 HTTP 配置（拦截器、Token 刷新、统一错误处理）得以充分利用。<strong>请求应归属业务层，而非组件层。</strong></>
            )}
          </p>
          <p style={{ margin: '10px 0 0' }}>
            {isEn() ? (
              <><strong>Upload does one thing: manage the file lifecycle</strong> (select file → validate → display → delete). "How to upload" is a <strong>strategy</strong>, injected by you via the api prop (Inversion of Control / IoC): you write a function that returns a Promise, and Upload calls it. Tokens, interceptors, and HTTP libraries are all under your control. If you do not pass api, Upload degrades to a "file picker + list manager".</>
            ) : (
              <><strong>Upload 只做一件事：管理文件的生命周期</strong>（选文件 → 校验 → 展示 → 删除）。「怎么上传」是一个<strong>策略</strong>，由你通过 api 属性注入（控制反转 / IoC）：你写一个返回 Promise 的函数，Upload 调用它。token、拦截器、请求库都在你自己掌控之中。如果不传 api，Upload 退化为「文件选择器 + 列表管理器」。</>
            )}
          </p>
          <p style={{ margin: '10px 0 0' }}>
            {isEn() ? (
              <>We don't provide <code>action</code> because we believe a mature project already has its own HTTP infrastructure. Upload doesn't replace it — it <strong>integrates into it</strong>.</>
            ) : (
              <>我们不提供 <code>action</code>，是因为我们相信：一个成熟的工程，本就有自己的 HTTP 基础设施。Upload 不替代它，而是<strong>融入它</strong>。</>
            )}
          </p>
          <div style={{ 'border-radius': '6px', overflow: 'hidden' as const, border: '1px solid var(--sc-doc-card-border, #e5e7eb)', margin: '10px 0' }}>
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
