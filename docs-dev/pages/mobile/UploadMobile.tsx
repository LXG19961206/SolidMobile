import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';
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
  const [files1, setFiles1] = createSignal<UploadFile[]>([]);

  return (
    <MobilePreview title="Upload 上传" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 图片上传 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageUpload')}</div>
        <div style={CARD.desc}>{t('demo.imageUploadDesc')}</div>
        <div style={CARD.body}>
          <Upload api={mockApi} maxCount={9} />
        </div>
      </div>

      {/* 文件上传 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.fileUpload')}</div>
        <div style={CARD.desc}>{t('demo.fileUploadDesc')}</div>
        <div style={CARD.body}>
          <Upload type="file" api={mockApi} />
        </div>
      </div>

      {/* 自定义图标 */}
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

      {/* 限制 */}
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

      {/* 受控模式 */}
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

      {/* 自定义按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customTrigger')}</div>
        <div style={CARD.desc}>{t('demo.customTriggerDesc')}</div>
        <div style={CARD.body}>
          <Upload>
            <span style={{ display: 'inline-flex', 'align-items': 'center', gap: '4px', padding: '8px 16px', background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '6px', 'font-size': '0.8125rem' }}>
              + 上传图片
            </span>
          </Upload>
        </div>
      </div>

      {/* 设计理念 */}
      <div style={CARD.wrapper}>
        <div style={{ padding: '16px 16px 12px', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>
          <div style={{ 'font-size': '0.85rem', 'font-weight': 600, color: 'var(--sc-color-text, #323233)' }}>{t('demo.design')}</div>
        </div>
        <div style={{ padding: '12px 16px 16px', 'font-size': '0.8rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' }}>
          <p style={{ margin: '0 0 8px' }}>
            Upload 没有 <code>action</code>、<code>headers</code>、<code>data</code> 这些属性 —— 因为 HTTP 请求是<strong>业务层</strong>的事，不是组件层的事。
          </p>
          <p style={{ margin: '0 0 8px' }}>
            传统组件库把这些参数摊成 props 替你去发请求，看似省事，实则更麻烦：Authorization、Content-Type、BaseURL、超时、重试……每个项目的封装方式都不一样，props 永远列不完。更关键的是，你全局 HTTP 库的拦截器、token 刷新逻辑本来就能正常工作，何必让组件再绕一层？
          </p>
          <p style={{ margin: '0 0 8px' }}>
            <strong>Upload 只做一件事：管理文件生命周期。</strong>（选文件 → 校验 → 展示 → 删除）
          </p>
          <p style={{ margin: '0' }}>
            上传策略通过 <code>api</code> 函数注入（控制反转 / IoC）：你写一个返回 Promise 的函数，组件调用它。token、拦截器、请求库都是你自己掌控的，不需要绕过任何组件层逻辑。测试时传个 <code>{"async () => ({ url: '...' })"}</code> 就能跑，零 mock。
          </p>
        </div>
      </div>
    </MobilePreview>
  );
};
