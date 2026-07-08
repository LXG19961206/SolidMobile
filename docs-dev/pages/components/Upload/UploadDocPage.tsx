import { createSignal, type Component, type JSX } from 'solid-js';
import { Upload } from '../../../../src/components/Upload';
import type { UploadFile } from '../../../../src/components/Upload';
import { useT } from '../../../doc-i18n';
import { ToastRenderer, Toast } from '../../../../src/components/Toast';
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
        <ToastRenderer />
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Upload 文件上传</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.UploadIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Props</h2>
        <PropsTable rows={uploadProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.design')}</h2>

        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '16px' }}>
          在最理想的构想中，用户只需传一个 URL 就能完成上传：<code>{'<Upload action="/api/upload" />'}</code>。
          然而在实际企业级工程中，method 一定是 POST 吗？binary 还是 form-data？额外的头如何传递？
          BaseURL 从哪来？异常怎么处理？稍微一想，问题就来了——都做成 props 吗？
        </p>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '24px' }}>
          一个成熟的工程，有自己的通用 HTTP 基础设施。传统组件库的范式让组件库完全无法受益于它——
          拦截器、中间件、token 刷新、超时重试……每次使用 Upload，都可能造成一次和全局 HTTP 库不统一的隐患。
          这真的是"简单"吗？我们认为不是。你很难靠几个 props 去描述一个 HTTP 请求的全貌；就算勉强做到，和你全局的通用处理也一定是冗余的。
          了解一个 HTTP 请求的全貌并不难——组件库该做的是<strong>引导用户更强</strong>，而非让他陷入不知所以然的泥潭。
        </p>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>{t('section.noHttp')}</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          Upload 组件<strong>不提供</strong> <code>action</code>、<code>headers</code>、<code>data</code>、<code>withCredentials</code> 等请求相关属性。
          原因很简单：<strong>请求是业务层的事，不是组件层的事。</strong>
        </p>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          传统组件库把这些参数摊成 props 替你去发请求，看似省事，实则每个项目的 Authorization、BaseURL、超时、重试策略都不一样——props 永远列不完。更关键的是，你全局的 HTTP 拦截器和 token 刷新逻辑本来就能正常工作，何必让组件再绕一层？
        </p>
        <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.8125rem', 'line-height': 1.7, 'margin-bottom': '12px' }}>
          <thead><tr style={{ 'border-bottom': '1px solid #e5e7eb', 'text-align': 'left' }}>
            <th style={{ padding: '8px 12px' }}>理由</th>
            <th style={{ padding: '8px 12px' }}>展开说</th>
          </tr></thead>
          <tbody>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>解耦 HTTP 库</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>fetch、axios、ky 还是 wx.uploadFile？Upload 不关心。你传一个 api 函数，里面怎么发请求完全由你控制。</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>Token / 拦截器</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>项目中已封装好的 request 实例（统一拦截、错误处理、loading 态）直接传给 api 即可，Upload 不绕过你的基础设施。</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>OSS 直传</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>阿里云 / AWS S3 需要先获取签名、拼表单、有时还要回调通知。传统的 action + data 模型根本无法表达这个流程。</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>测试友好</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>传一个 <code>{"async () => ({ url: '...' })"}</code> 就能跑通测试，无需 mock 任何 HTTP 库。</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>{t('section.ioc')}</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          Upload 只做一件事：<strong>管理文件的生命周期</strong>（选文件 → 校验 → 展示 → 删除）。「怎么上传」是一个<strong>策略</strong>，由你通过 <code>api</code> 属性注入（控制反转 / IoC）：你写一个返回 Promise 的函数，Upload 调用它。token、拦截器、请求库都在你自己掌控之中。
        </p>
        <CodeBlock code={`// 你的 IoC 容器 — 封装好的请求实例
import { request } from '@/services/http';

// 注入给 Upload。api 必须返回文件 URL 字符串，组件用于反显和预览
<Upload
  api={(file, onProgress) =>
    request.post('/upload', { body: file, onProgress })
      .then(res => res.data.url)
  }
/>`} />
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '12px' }}>
          如果不传 <code>api</code>，Upload 退化为「文件选择器 + 列表管理器」。
        </p>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '12px' }}>
          我们不提供 <code>action</code>，是因为我们相信：一个成熟的工程，本就有自己的 HTTP 基础设施。
          Upload 不替代它，而是<strong>融入它</strong>。你只需要一个返回 Promise 的函数——剩下的，全由你掌控。
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>示例</h2>

        <DemoBlock title={t('demo.imageUpload')} desc={t('demo.imageUploadDesc')} code={`// api 返回上传后的文件 URL，组件用于反显和预览
const uploadFile = async (file: File, onProgress?: (pct: number) => void) => {
  const form = new FormData();
  form.append('file', file);

  // 如果你用 XHR，可在 upload.onprogress 里调 onProgress
  const res = await fetch('/upload', { method: 'POST', body: form });
  return res.json().url; // <-- 必须返回 URL 字符串
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
  onSuccess={(file, url) => Toast.success(\`\${file.name} 上传成功\`)}
  onError={(file, msg) => Toast.error(\`\${file.name} 失败: \${msg}\`)}
/>`}>
          <Upload
            api={mockApi}
            onSuccess={(file) => Toast.success(`${file.name} 上传成功`)}
            onError={(file, msg) => Toast.error(`${file.name} 失败: ${msg}`)}
          />
        </DemoBlock>

        <DemoBlock title={t('demo.customTrigger')} desc={t('demoDesc.upload_custom_button')} code={`<Upload>\n  <button style={{ padding: '8px 16px', background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '6px', border: 'none', 'white-space': 'nowrap' }}>\n    + 上传图片\n  </button>\n</Upload>`}>
          <Upload>
            <button style={{ padding: '8px 16px', background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '6px', border: 'none', cursor: 'pointer', 'font-size': '0.8125rem', 'white-space': 'nowrap' }}>
              + 上传图片
            </button>
          </Upload>
        </DemoBlock>

        <DemoBlock title={t('demo.customRender')} desc={t('demoDesc.upload_custom_render')} code={`<Upload\n  defaultFileList={[\n    { uid:'1', name:'photo.png', size:20480, type:'image/png', status:'done', url:'/photo.png' },\n  ]}\n  renderFile={(f) => (\n    <div style={{ display:'flex', 'align-items':'center', gap:8, padding:'4px 0' }}>\n      <img src={f.url} style={{ width:40, height:40, 'border-radius':4, 'object-fit':'cover', background:'#f0f0f0' }} />\n      <span style={{ 'font-size':'0.8125rem' }}>{f.name}</span>\n      <span style={{ 'font-size':'0.7rem', color:'#999', 'margin-left':'auto' }}>{fmtSize(f.size)}</span>\n    </div>\n  )}\n>\n  <button style={{ padding:'8px 16px', width:'100%', background:'#f7f8fa', border:'1px dashed #dcdee0', 'border-radius':'6px', color:'#969799', cursor:'pointer' }}>\n    + 选择文件\n  </button>\n</Upload>`}>
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
              + 选择文件
            </button>
          </Upload>
        </DemoBlock>

      </div>
    </DocLayout>
  );
};
