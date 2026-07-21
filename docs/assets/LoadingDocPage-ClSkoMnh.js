import{f as g,c as n,i as t,F as c,t as m,r as p}from"./index-CjqJoD8k.js";import{D as f}from"./ComponentDocLayout-7lKpA80h.js";import{u as L,e as x,z as u}from"./tableData-ChPjAefK.js";import{P as y}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var h=m('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Loading</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":u,"en-US":x});const w=()=>{const e=g(),{propsTables:a}=L(),s=[{title:e("loading.demo.types"),code:`<Loading type="spinner" />
<Loading type="circular" />
<Loading type="dots" />`,desc:e("loading.demoDesc.types")},{title:e("loading.demo.text"),code:`<Loading text="Loading..." />
<Loading text="Loading..." type="circular" vertical />
<Loading text="Please wait..." type="dots" />`,desc:e("loading.demoDesc.text")},{title:e("loading.demo.sizeColor"),code:`<Loading size={32} color="#1677ff" />
<Loading size={28} color="#22c55e" />
<Loading size={36} color="#f59e0b" />`,desc:e("loading.demoDesc.sizeColor")},{title:e("loading.demo.overlay"),code:`const [loading, setLoading] = createSignal(false);

<button onClick={async () => {
  setLoading(true);
  await fetchData();
  setLoading(false);
}}>Submit</button>

{loading() && <Loading overlay text="Processing..." />}`,desc:e("loading.demoDesc.overlay")},{title:e("loading.jsxDemo"),code:`<Button onClick={() => {
  setLoading(true);
  setTimeout(() => setLoading(false), 1500);
}}>
  {loading()
    ? <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
        <Loading size={16} color="#fff" /> Saving
      </span>
    : "Save"
  }
</Button>`,desc:e("loading.jsxDesc")}];return n(D,{get children(){var o=h(),d=o.firstChild,i=d.nextSibling,l=i.nextSibling;return t(i,()=>e("loading.intro")),t(o,n(y,{propsTables:a}),l),t(o,n(c,{each:s,children:r=>n(f,{demo:r})}),null),o}})};export{w as LoadingDocPage};
