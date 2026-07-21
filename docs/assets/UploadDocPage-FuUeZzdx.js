import{f as m,c as t,i as a,F as c,t as u,r as f}from"./index-CjqJoD8k.js";import{D as g}from"./ComponentDocLayout-7lKpA80h.js";import{u as h,U as x,e as U,z as y}from"./UploadDesign-BefMihS0.js";import{P as b}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var z=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Upload</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');f({"zh-CN":y,"en-US":U});const w=()=>{const e=m(),{propsTables:d,cssVarsTables:i}=h(),n=[{title:e("upload.demo.image"),code:`const upload = async (file: File, onProgress?: (p: number) => void) => {
  const fd = new FormData(); fd.append('file', file);
  const res = await fetch('/upload', { method: 'POST', body: fd });
  return res.json().url; // must return URL string
};

<Upload api={upload} maxCount={9} />`,desc:e("upload.demoDesc.image")},{title:e("upload.demo.file"),code:'<Upload type="file" api={upload} />',desc:e("upload.demoDesc.file")},{title:e("upload.demo.limits"),code:`<Upload maxCount={3} maxSize={1024 * 1024}
  beforeUpload={(f) => f.type.startsWith('image/')} />`,desc:e("upload.demoDesc.limits")},{title:e("upload.demo.controlled"),code:`const [files, setFiles] = createSignal<UploadFile[]>([]);

<Upload fileList={files()} onChange={(list) => setFiles(list)} />`,desc:e("upload.demoDesc.controlled")},{title:e("upload.demo.customTrigger"),code:`<Upload>
  <button style={{ padding:'8px 16px', background:'var(--sc-color-primary)', color:'#fff', 'border-radius':'6px', border:'none' }}>
    + Upload Image
  </button>
</Upload>`,desc:e("upload.demoDesc.customTrigger")},{title:e("upload.demo.customRender"),code:`<Upload
  defaultFileList={[{ uid:'1', name:'photo.png', size:20480, type:'image/png', status:'done', url:'/photo.png' }]}
  renderFile={(f) => (
    <div style={{ display:'flex', 'align-items':'center', gap:8, padding:'4px 0' }}>
      <img src={f.url} style={{ width:40, height:40, 'border-radius':4 }} />
      <span>{f.name}</span>
      <span style={{ 'font-size':'0.7rem', color:'#999', 'margin-left':'auto' }}>{/* fmtSize(f.size) */}</span>
    </div>
  )}
/>`,desc:e("upload.demoDesc.customRender")},{title:e("upload.demo.iconMap"),code:`<Upload type="file" api={upload}
  iconMap={{ pdf: 'file-text', xlsx: 'dashboard', '*': 'file' }} />`,desc:e("upload.demoDesc.iconMap")}];return t(D,{get children(){var o=z(),p=o.firstChild,l=p.nextSibling,s=l.nextSibling;return a(l,()=>e("upload.intro")),a(o,t(b,{propsTables:d,cssVarsTables:i}),s),a(o,t(x,{}),s),a(o,t(c,{each:n,children:r=>t(g,{demo:r})}),null),o}})};export{w as UploadDocPage};
