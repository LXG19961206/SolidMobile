import { createSignal } from 'solid-js'; import { useT, registerLocale } from '../../doc-i18n'; import { Upload } from '../../../src/components/Upload'; import type { UploadFile } from '../../../src/components/Upload'; import { Toast } from '../../../src/components/Toast'; import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet'; import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useUploadTableData } from './tableData';
import { UploadDesign } from './UploadDesign';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

function mockApi(file: File, onProgress?: (pct: number) => void): Promise<string | undefined> {
  return new Promise((resolve) => { let pct = 0; const timer = setInterval(() => { pct += Math.random() * 30; if (pct >= 100) { pct = 100; clearInterval(timer); resolve(URL.createObjectURL(file)); } onProgress?.(Math.min(pct, 100)); }, 200); });
}

export const UploadMobile = () => {
  const t = useT(); const { propsTables, cssVarsTables } = useUploadTableData();
  const [files, setFiles] = createSignal<UploadFile[]>([]);

  return (<MobilePreview title="Upload"><MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
      <C t={t('upload.demo.image')} d={t('upload.demoDesc.image')}><Upload api={mockApi} maxCount={9} /></C>
      <C t={t('upload.demo.file')} d={t('upload.demoDesc.file')}><Upload type="file" api={mockApi} /></C>
      <C t={t('upload.demo.limits')} d={t('upload.demoDesc.limits')}><Upload maxCount={3} maxSize={1024 * 1024} beforeUpload={(f) => f.type.startsWith('image/')} /></C>
      <C t={t('upload.demo.controlled')} d={t('upload.demoDesc.controlled')}><Upload fileList={files()} onChange={(list) => setFiles(list)} /></C>
      <C t={t('upload.demo.customTrigger')} d={t('upload.demoDesc.customTrigger')}><Upload><button style={{ padding: '8px 16px', background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '6px', border: 'none', cursor: 'pointer', 'font-size': '0.8125rem' }}>+ Upload Image</button></Upload></C>
      <C t={t('upload.demo.customRender')} d={t('upload.demoDesc.customRender')}><Upload defaultFileList={[{ uid: '1', name: 'photo.png', size: 20480, type: 'image/png', status: 'done', url: 'https://picsum.photos/seed/u1/80/80' }]} renderFile={(f) => (<div style={{ display: 'flex', 'align-items': 'center', gap: '8px', padding: '4px 0' }}><img src={f.thumbUrl ?? f.url} style={{ width: '40px', height: '40px', 'border-radius': '4px', 'object-fit': 'cover', background: '#f0f0f0' }} /><span style={{ 'font-size': '0.8125rem', color: '#323233' }}>{f.name}</span><span style={{ 'font-size': '0.7rem', color: '#999', 'margin-left': 'auto' }}>20.0KB</span></div>)}><button style={{ padding: '8px 16px', width: '100%', background: '#f7f8fa', border: '1px dashed #dcdee0', 'border-radius': '6px', color: '#969799', cursor: 'pointer' }}>+ Select File</button></Upload></C>
      <C t={t('upload.demo.iconMap')} d={t('upload.demoDesc.iconMap')}><Upload type="file" api={mockApi} iconMap={{ pdf: 'file-text', xlsx: 'dashboard', image: 'image', video: 'video', '*': 'file' }}
        onSuccess={(file) => Toast.success(`${file.name} uploaded`)} onError={(file, msg) => Toast.error(`${file.name} failed`)} /></C>
    </div>
    <div style={{ padding: '0 12px 12px' }}><UploadDesign /></div>
  </MobilePreview>);
};
const cs = { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px' };
const ts = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const ds = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
function C(p: { t: string; d: string; children: any }) { return <div style={cs}><div style={ts}>{p.t}</div><div style={ds}>{p.d}</div>{p.children}</div>; }
