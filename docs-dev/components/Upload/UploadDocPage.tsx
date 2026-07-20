import { For } from 'solid-js'; import { useT, registerLocale } from '../../doc-i18n'; import { DocLayout, PropsAttrs } from '../../doc-utils'; import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout'; import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useUploadTableData } from './tableData'; import { UploadDesign } from './UploadDesign';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
export const UploadDocPage = () => {
  const t = useT(); const { propsTables, cssVarsTables } = useUploadTableData();
  const demos: DemoCode[] = [
    { title: t('upload.demo.image'), code: 'const upload = async (file: File, onProgress?: (p: number) => void) => {\n  const fd = new FormData(); fd.append(\'file\', file);\n  const res = await fetch(\'/upload\', { method: \'POST\', body: fd });\n  return res.json().url; // must return URL string\n};\n\n<Upload api={upload} maxCount={9} />', desc: t('upload.demoDesc.image') },
    { title: t('upload.demo.file'), code: '<Upload type="file" api={upload} />', desc: t('upload.demoDesc.file') },
    { title: t('upload.demo.limits'), code: '<Upload maxCount={3} maxSize={1024 * 1024}\n  beforeUpload={(f) => f.type.startsWith(\'image/\')} />', desc: t('upload.demoDesc.limits') },
    { title: t('upload.demo.controlled'), code: 'const [files, setFiles] = createSignal<UploadFile[]>([]);\n\n<Upload fileList={files()} onChange={(list) => setFiles(list)} />', desc: t('upload.demoDesc.controlled') },
    { title: t('upload.demo.customTrigger'), code: '<Upload>\n  <button style={{ padding:\'8px 16px\', background:\'var(--sc-color-primary)\', color:\'#fff\', \'border-radius\':\'6px\', border:\'none\' }}>\n    + Upload Image\n  </button>\n</Upload>', desc: t('upload.demoDesc.customTrigger') },
    { title: t('upload.demo.customRender'), code: '<Upload\n  defaultFileList={[{ uid:\'1\', name:\'photo.png\', size:20480, type:\'image/png\', status:\'done\', url:\'/photo.png\' }]}\n  renderFile={(f) => (\n    <div style={{ display:\'flex\', \'align-items\':\'center\', gap:8, padding:\'4px 0\' }}>\n      <img src={f.url} style={{ width:40, height:40, \'border-radius\':4 }} />\n      <span>{f.name}</span>\n      <span style={{ \'font-size\':\'0.7rem\', color:\'#999\', \'margin-left\':\'auto\' }}>{/* fmtSize(f.size) */}</span>\n    </div>\n  )}\n/>', desc: t('upload.demoDesc.customRender') },
    { title: t('upload.demo.iconMap'), code: '<Upload type="file" api={upload}\n  iconMap={{ pdf: \'file-text\', xlsx: \'dashboard\', \'*\': \'file\' }} />', desc: t('upload.demoDesc.iconMap') },
  ];
  return (<DocLayout><div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
    <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Upload</h1>
    <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('upload.intro')}</p>
    <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <UploadDesign />
    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
    <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
  </div></DocLayout>);
};
