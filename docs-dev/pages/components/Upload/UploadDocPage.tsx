import { createSignal, type Component, type JSX } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { Upload } from '../../../../src/components/Upload';
import type { UploadFile } from '../../../../src/components/Upload';
import { Toast } from '../../../../src/components/Toast';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import Prism from 'prismjs';

/* ── CodeBlock ── */
function CodeBlock(props: { code: string; lang?: string }): JSX.Element {
  const lang = props.lang || 'tsx';
  const html = Prism.highlight(props.code, Prism.languages[lang] || Prism.languages.tsx, lang);
  return (
    <div class="doc-code-block">
      <pre class={`language-${lang}`}>
        <code class={`language-${lang}`} innerHTML={html} />
      </pre>
    </div>
  );
}

const uploadProps: PropRow[] = [
  { name: 'type', type: "'image' | 'file'", default: "'image'", required: false, desc: 'componentProps.upload.type' },
  { name: 'accept', type: 'string', default: "'image/*'(type=image)", required: false, desc: 'componentProps.upload.accept' },
  { name: 'multiple', type: 'boolean', default: 'false', required: false, desc: 'componentProps.upload.multiple' },
  { name: 'maxCount', type: 'number', default: '—', required: false, desc: 'componentProps.upload.maxCount' },
  { name: 'capture', type: "'environment' | 'user'", default: '—', required: false, desc: 'componentProps.upload.capture' },
  { name: 'maxSize', type: 'number', default: '—', required: false, desc: 'componentProps.upload.maxSize' },
  { name: 'beforeUpload', type: '(file, files) => boolean | Promise<boolean>', default: '—', required: false, desc: 'componentProps.upload.beforeUpload' },
  { name: 'api', type: '(file, onProgress?) => Promise<string | undefined>', default: '—', required: false, desc: 'componentProps.upload.api' },
  { name: 'fileList', type: 'UploadFile[]', default: '—', required: false, desc: 'componentProps.upload.fileList' },
  { name: 'defaultFileList', type: 'UploadFile[]', default: '—', required: false, desc: 'componentProps.upload.defaultFileList' },
  { name: 'onChange', type: '(fileList, file) => void', default: '—', required: false, desc: 'componentProps.upload.onChange' },
  { name: 'onSuccess', type: '(file, url) => void', default: '—', required: false, desc: 'componentProps.upload.onSuccess' },
  { name: 'onError', type: '(file, error) => void', default: '—', required: false, desc: 'componentProps.upload.onError' },
  { name: 'onDelete', type: '(file) => boolean | Promise<boolean>', default: '—', required: false, desc: 'componentProps.upload.onDelete' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.upload.disabled' },
  { name: 'iconMap', type: 'Record<string, string | JSX>', default: '—', required: false, desc: 'componentProps.upload.iconMap' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.upload.children' },
  { name: 'renderFile', type: '(file, index) => JSX.Element', default: '—', required: false, desc: 'componentProps.upload.renderFile' },
];

/* ── Simulated upload api ── */

function mockApi(file: File, onProgress?: (pct: number) => void): Promise<string | undefined> {
  return new Promise((resolve) => {
    let pct = 0;
    const timer = setInterval(() => {
      pct += Math.random() * 30;
      if (pct >= 100) {
        pct = 100;
        clearInterval(timer);
        resolve(URL.createObjectURL(file));
      }
      onProgress?.(Math.min(pct, 100));
    }, 200);
  });
}

export const UploadDocPage: Component = () => {
  const t = useT();
  const [fileList, setFileList] = createSignal<UploadFile[]>([]);

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Upload</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.UploadIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Props</h2>
        <PropsTable rows={uploadProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.design')}</h2>

        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          The ideal: upload with a single URL:
        </p>
        <CodeBlock code={`<Upload action="/api/upload" />`} />
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin': '12px 0' }}>
          But in real enterprise projects, things are far more complex:
        </p>
        <ul style={{ color: '#6b7280', 'line-height': 2, 'padding-left': '1.5rem', 'margin': '0 0 16px', 'font-size': '0.85rem' }}>
          <li>Is the method always POST?</li>
          <li>Binary or form-data, or another encoding?</li>
          <li>How are extra headers (Authorization, Content-Type, etc.) passed?</li>
          <li>Where does the BaseURL come from?</li>
          <li>How are timeout and retry strategies configured?</li>
          <li>How are errors handled? How is progress reported?</li>
        </ul>
        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>{t('section.noHttp')}</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          Traditional component libraries send upload requests on behalf of developers. It seems convenient, but it bakes request logic into props, making it difficult to leverage your existing global HTTP configuration (interceptors, token refresh, unified error handling, etc.). Even if you manage to piece together the same config through props, redundancy with existing infrastructure is inevitable — miss an update on either side and you have a bug. <strong>Requests belong to the business layer, not the component layer.</strong>
        </p>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          Therefore, Upload <strong>does not construct or initiate requests</strong>. It does not provide action, headers, data, withCredentials, or any request-related props. Upload requests are initiated by you; the library stays out of it.
        </p>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>Inversion of Control (IoC) — Program to an interface, not an implementation</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          Upload does one thing: <strong>manage the file lifecycle</strong> (select → validate → display → delete). "How to upload" is a <strong>strategy</strong>, injected by you through the api prop — you write a function that returns a Promise, and Upload calls it. This is Inversion of Control: the component defines an <strong>interface</strong> (a function returning a Promise), and you provide the <strong>implementation</strong>. Tokens, interceptors, and HTTP libraries are all under your control.
        </p>
        <CodeBlock code={`// Your IoC container — wrapped request instance
import { request } from '@/services/http';

// 注入给 Upload。api 必须返回文件 URL 字符串，组件用于反显和预览
<Upload
  api={(file, onProgress) =>
    request.post('/upload', { body: file, onProgress })
      .then(res => res.data.url)
  }
/>`} />
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '12px' }}>
          Without the api prop, Upload degrades to a "file picker + list manager".
        </p>

        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '12px' }}>
          Behind this design is a belief: a mature project already has its own HTTP infrastructure.
          Upload does not replace it — it <strong>integrates with it</strong>.
        </p>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>This means:</h3>
        <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.8125rem', 'line-height': 1.7, 'margin-bottom': '12px' }}>
          <thead><tr style={{ 'border-bottom': '1px solid #e5e7eb', 'text-align': 'left' }}>
            <th style={{ padding: '8px 12px', 'width': '25%' }}></th>
            <th style={{ padding: '8px 12px' }}></th>
          </tr></thead>
          <tbody>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>No HTTP library lock-in</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>Upload only manages the file lifecycle; network requests are fully under your control. fetch, axios, ky, wx.uploadFile — you choose, and the component stays fully decoupled from the HTTP layer.</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>Doesn't bypass infrastructure</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>Your request instance — interceptors, token refresh, unified error handling, loading state — all work as usual.</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>Any Upload Flow</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>OSS signatures, COS auth headers, callback notifications — all achievable through a single async function. The traditional <code>action + data</code> model cannot describe such scenarios.</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>Naturally Testable</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>Pass <code>{`async () => ({ url: "/fake" })`}</code> — no HTTP mocking required. Upload logic is fully decoupled from UI; tests verify UI behavior only.</td>
            </tr>
          </tbody>
        </table>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Examples</h2>

        <DemoBlock title={t('demo.imageUpload')} desc={t('demo.imageUploadDesc')} code={`// api 返回上传后的文件 URL，组件用于反显和预览
const uploadFile = async (file: File, onProgress?: (pct: number) => void) => {
  const form = new FormData();
  form.append('file', file);

  // If 你用 XHR，可在 upload.onprogress 里调 onProgress
  const res = await fetch('/upload', { method: 'POST', body: form });
  return res.json().url; // <-- must return URL string
};

<Upload api={uploadFile} maxCount={9} />`}>
          <Upload api={mockApi} maxCount={9} />
        </DemoBlock>

        <DemoBlock title={t('demo.fileUpload')} desc={t('demo.fileUploadDesc')} code={`const uploadFile = async (file: File, onProgress?: (pct: number) => void) => {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/upload', { method: 'POST', body: form });
  return res.json().url;
};

<Upload type="file" api={uploadFile} />`}>
          <div style={{ width: '100%' }}>
            <Upload type="file" api={mockApi} />
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.customIcon')} desc={t('demoDesc.upload_iconmap')} code={`const iconMap = {\n  pdf: 'file-text',\n  image: 'image',\n  video: 'video',\n  '*': 'file',\n};\n\n<Upload type="file" iconMap={iconMap} />`}>
          <div style={{ width: '100%' }}>
            <Upload
              type="file"
              api={mockApi}
              iconMap={{
                pdf: 'file-text',
                xlsx: 'dashboard',
                image: 'image',
                video: 'video',
                '*': 'file',
              }}
            />
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.limits')} desc={t('demoDesc.upload_limits')} code={`<Upload\n  maxCount={3}\n  maxSize={1024 * 1024}\n  beforeUpload={(f) => f.type.startsWith('image/')}\n/>`}>
          <Upload
            maxCount={3}
            maxSize={1024 * 1024}
            beforeUpload={(f) => f.type.startsWith('image/')}
          />
        </DemoBlock>

        <DemoBlock title={t('demo.controlled')} desc={t('demoDesc.upload_controlled')} code={`const [files, setFiles] = createSignal<UploadFile[]>([]);\n\n<Upload\n  fileList={files()}\n  onChange={(list, file) => setFiles(list)}\n/>`}>
          <Upload
            fileList={fileList()}
            onChange={(list) => setFileList(list)}
          />
        </DemoBlock>

        <DemoBlock title={t('demo.callbacks')} desc={t('demoDesc.upload_callbacks')} code={`<Upload
  api={uploadFile}
  onSuccess={(file, url) => Toast.success(\`\${file.name} upload success\`)}
  onError={(file, msg) => Toast.error(\`\${file.name} failed: \${msg}\`)}
/>`}>
          <Upload
            api={mockApi}
            onSuccess={(file) => Toast.success(`${file.name} upload success`)}
            onError={(file, msg) => Toast.error(`${file.name} failed: ${msg}`)}
          />
        </DemoBlock>

        <DemoBlock title={t('demo.customTrigger')} desc={t('demoDesc.upload_custom_button')} code={`<Upload>\n  <button style={{ padding: '8px 16px', background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '6px', border: 'none', 'white-space': 'nowrap' }}>\n    + Upload Image\n  </button>\n</Upload>`}>
          <Upload>
            <button style={{ padding: '8px 16px', background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '6px', border: 'none', cursor: 'pointer', 'font-size': '0.8125rem', 'white-space': 'nowrap' }}>
              + Upload Image
            </button>
          </Upload>
        </DemoBlock>

        <DemoBlock title={t('demo.customRender')} desc={t('demoDesc.upload_custom_render')} code={`<Upload\n  defaultFileList={[\n    { uid:'1', name:'photo.png', size:20480, type:'image/png', status:'done', url:'/photo.png' },\n  ]}\n  renderFile={(f) => (\n    <div style={{ display:'flex', 'align-items':'center', gap:8, padding:'4px 0' }}>\n      <img src={f.url} style={{ width:40, height:40, 'border-radius':4, 'object-fit':'cover', background:'#f0f0f0' }} />\n      <span style={{ 'font-size':'0.8125rem' }}>{f.name}</span>\n      <span style={{ 'font-size':'0.7rem', color:'#999', 'margin-left':'auto' }}>{fmtSize(f.size)}</span>\n    </div>\n  )}\n>\n  <button style={{ padding:'8px 16px', width:'100%', background:'#f7f8fa', border:'1px dashed #dcdee0', 'border-radius':'6px', color:'#969799', cursor:'pointer' }}>\n    + Select File\n  </button>\n</Upload>`}>
          <Upload
            defaultFileList={[
              { uid: '1', name: 'photo.png', size: 20480, type: 'image/png', status: 'done', url: 'https://picsum.photos/seed/u1/80/80' },
            ]}
            renderFile={(f) => (
              <div style={{ display: 'flex', 'align-items': 'center', gap: '8px', padding: '4px 0' }}>
                <img src={f.url} style={{ width: '40px', height: '40px', 'border-radius': '4px', 'object-fit': 'cover', background: '#f0f0f0' }} />
                <span style={{ 'font-size': '0.8125rem', color: '#323233' }}>{f.name}</span>
                <span style={{ 'font-size': '0.7rem', color: '#999', 'margin-left': 'auto' }}>20.0KB</span>
              </div>
            )}
          >
            <button style={{ padding: '8px 16px', width: '100%', background: '#f7f8fa', border: '1px dashed #dcdee0', 'border-radius': '6px', color: '#969799', cursor: 'pointer', 'font-size': '0.8125rem' }}>
              + Select File
            </button>
          </Upload>
        </DemoBlock>

      </div>
    </DocLayout>
  );
};
