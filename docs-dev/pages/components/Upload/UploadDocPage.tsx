import { createSignal, type Component, type JSX } from 'solid-js';
import { Upload } from '../../../../src/components/Upload';
import type { UploadFile } from '../../../../src/components/Upload';
import { ToastRenderer, Toast } from '../../../../src/components/Toast';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
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
  { name: 'type', type: "'image' | 'file'", default: "'image'", required: false, desc: '展示类型。image 缩略图网格，file 文件列表。' },
  { name: 'accept', type: 'string', default: "'image/*'(type=image)", required: false, desc: '接受的文件类型，同 <input accept>。' },
  { name: 'multiple', type: 'boolean', default: 'false', required: false, desc: '是否允许多选。' },
  { name: 'maxCount', type: 'number', default: '—', required: false, desc: '最大文件数，达到后隐藏添加按钮。' },
  { name: 'capture', type: "'environment' | 'user'", default: '—', required: false, desc: '调用系统相机。' },
  { name: 'maxSize', type: 'number', default: '—', required: false, desc: '单文件大小上限 (bytes)。' },
  { name: 'beforeUpload', type: '(file, files) => boolean | Promise<boolean>', default: '—', required: false, desc: '上传前置校验，return false 跳过该文件。' },
  { name: 'api', type: '(file, onProgress?) => Promise<string | undefined>', default: '—', required: false, desc: '上传函数。必须返回文件 URL 用于反显。不传则只管理文件列表。设计理由见下方。' },
  { name: 'fileList', type: 'UploadFile[]', default: '—', required: false, desc: '受控文件列表。' },
  { name: 'defaultFileList', type: 'UploadFile[]', default: '—', required: false, desc: '非受控初始列表。' },
  { name: 'onChange', type: '(fileList, file) => void', default: '—', required: false, desc: '列表变化回调（添加 / 删除 / 状态变更 / 进度更新）。' },
  { name: 'onSuccess', type: '(file, url) => void', default: '—', required: false, desc: '单个文件上传成功回调。' },
  { name: 'onError', type: '(file, error) => void', default: '—', required: false, desc: '单个文件上传失败回调。' },
  { name: 'onDelete', type: '(file) => boolean | Promise<boolean>', default: '—', required: false, desc: '删除前回调，return false 阻止删除。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用上传。' },
  { name: 'iconMap', type: 'Record<string, string | JSX>', default: '—', required: false, desc: '文件后缀→图标映射。' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: '自定义添加按钮。' },
  { name: 'renderFile', type: '(file, index) => JSX.Element', default: '—', required: false, desc: '自定义文件项渲染。' },
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
  const [fileList, setFileList] = createSignal<UploadFile[]>([]);

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <ToastRenderer />
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Upload 文件上传</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          文件选择、预览与上传组件。支持图片缩略图网格和文件列表两种展示模式，通过 api 属性注入上传策略。
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Props</h2>
        <PropsTable rows={uploadProps} />

        <DemoBlock title="图片上传" desc="默认 type=image，选择后自动生成缩略图。api 需返回图片 URL 用于反显。" code={`// api 返回上传后的文件 URL，组件用于反显和预览
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

        <DemoBlock title="文件上传" desc="type=file 展示为文件列表，适合文档、压缩包等非图片文件。" code={`const uploadFile = async (file: File, onProgress?: (pct: number) => void) => {
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

        <DemoBlock title="自定义图标" desc="iconMap 按文件后缀指定图标，支持内置图标名或自定义 JSX。特殊 key image/video/audio 匹配 MIME 类别，* 为兜底。" code={`const iconMap = {\n  pdf: 'file-text',\n  image: 'image',\n  video: 'video',\n  '*': 'file',\n};\n\n<Upload type="file" iconMap={iconMap} />`}>
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

        <DemoBlock title="限制与校验" desc="maxCount 限制数量，maxSize 限制单文件大小，beforeUpload 自定义校验。" code={`<Upload\n  maxCount={3}\n  maxSize={1024 * 1024}\n  beforeUpload={(f) => f.type.startsWith('image/')}\n/>`}>
          <Upload
            maxCount={3}
            maxSize={1024 * 1024}
            beforeUpload={(f) => f.type.startsWith('image/')}
          />
        </DemoBlock>

        <DemoBlock title="受控模式" desc="通过 fileList + onChange 完全接管文件列表。" code={`const [files, setFiles] = createSignal<UploadFile[]>([]);\n\n<Upload\n  fileList={files()}\n  onChange={(list, file) => setFiles(list)}\n/>`}>
          <Upload
            fileList={fileList()}
            onChange={(list) => setFileList(list)}
          />
        </DemoBlock>

        <DemoBlock title="上传回调" desc="onSuccess / onError 监听单个文件的上传结果，适合做提示或埋点。" code={`<Upload
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

        <DemoBlock title="自定义按钮" desc="传入 children 替代默认的 + 按钮。" code={`<Upload>\n  <button style={{ padding: '8px 16px', background: '#1677ff', color: '#fff', 'border-radius': '6px', border: 'none', 'white-space': 'nowrap' }}>\n    + 上传图片\n  </button>\n</Upload>`}>
          <Upload>
            <button style={{ padding: '8px 16px', background: '#1677ff', color: '#fff', 'border-radius': '6px', border: 'none', cursor: 'pointer', 'font-size': '0.8125rem', 'white-space': 'nowrap' }}>
              + 上传图片
            </button>
          </Upload>
        </DemoBlock>

        <DemoBlock title="自定义渲染" desc="renderFile + children 完全接管文件项和添加按钮的渲染。" code={`<Upload\n  defaultFileList={[\n    { uid:'1', name:'photo.png', size:20480, type:'image/png', status:'done', url:'/photo.png' },\n  ]}\n  renderFile={(f) => (\n    <div style={{ display:'flex', 'align-items':'center', gap:8, padding:'4px 0' }}>\n      <img src={f.url} style={{ width:40, height:40, 'border-radius':4, 'object-fit':'cover', background:'#f0f0f0' }} />\n      <span style={{ 'font-size':'0.8125rem' }}>{f.name}</span>\n      <span style={{ 'font-size':'0.7rem', color:'#999', 'margin-left':'auto' }}>{fmtSize(f.size)}</span>\n    </div>\n  )}\n>\n  <button style={{ padding:'8px 16px', width:'100%', background:'#f7f8fa', border:'1px dashed #dcdee0', 'border-radius':'6px', color:'#969799', cursor:'pointer' }}>\n    + 选择文件\n  </button>\n</Upload>`}>
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

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>设计理念</h2>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>不做 HTTP 请求</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          Upload 组件<strong>不提供</strong> <code>action</code>、<code>headers</code>、<code>data</code>、<code>withCredentials</code> 等请求相关属性。
          原因很简单：<strong>请求是业务层的事，不是组件层的事。</strong>
        </p>
        <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.8125rem', 'line-height': 1.7, 'margin-bottom': '12px' }}>
          <thead><tr style={{ 'border-bottom': '1px solid #e5e7eb', 'text-align': 'left' }}>
            <th style={{ padding: '8px 12px' }}>理由</th>
            <th style={{ padding: '8px 12px' }}>展开说</th>
          </tr></thead>
          <tbody>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>解耦 HTTP 库</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>fetch、axios、ky 还是 wx.uploadFile？Upload 不知道也不该知道。你传一个 api 函数，里面怎么发完全由你控制。</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>Token / 拦截器</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>项目中通常有一个封装好的 request 实例（统一拦截、错误处理、loading）。传给 api 就行，Upload 不绕开你的基础设施。</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>OSS 直传</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>阿里云 / AWS S3 需要先拿签名、再拼表单、有时还要回调通知。action + data 的模型根本表达不了这个流程。</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', 'font-weight': 600, 'white-space': 'nowrap' }}>测试</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>传一个 <code> {"async () => ({ url: '...' })"}</code> 就能跑测试，不用 mock 任何 HTTP 库。</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>控制反转（IoC）</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          Upload 只做一件事：<strong>管理文件的生命周期</strong>（选文件 → 校验 → 展示 → 删除）。「怎么上传」是一个<strong>策略</strong>，由你通过 <code>api</code> 属性注入：
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
          如果不需要上传（只选文件、本地管理列表），不传 <code>api</code> 即可。Upload 退化为「文件选择器 + 列表管理器」。
        </p>
      </div>
    </DocLayout>
  );
};
