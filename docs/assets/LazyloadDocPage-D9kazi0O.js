import{f as m,c as a,i as t,F as c,t as p,r as y}from"./index-CjqJoD8k.js";import{D as z}from"./ComponentDocLayout-7lKpA80h.js";import{u as g,e as h,z as L}from"./tableData-4OWS2jGD.js";import{P as f}from"./PropsAttrs-BEGKasrA.js";import{D as u}from"./DocLayout-BMuVmMAz.js";var x=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Lazyload</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');y({"zh-CN":L,"en-US":h});const _=()=>{const e=m(),{propsTables:d}=g(),r=[{title:e("lazyload.demo.list"),code:`<Lazyload rootMargin="100px" placeholder={<div>Loading...</div>}>
  <div>Actual content</div>
</Lazyload>`,desc:e("lazyload.demoDesc.list")},{title:e("lazyload.demo.gallery"),code:`<div style={{ display: "grid", "grid-template-columns": "1fr 1fr", gap: "8px" }}>
  <For each={items}>{(item) =>
    <Lazyload height={100} placeholder={<Skeleton />}>
      <GalleryCard item={item} />
    </Lazyload>
  }</For>
</div>`,desc:e("lazyload.demoDesc.gallery")},{title:e("lazyload.demo.controlled"),code:`<Button onClick={() => setLoaded(true)}>Load</Button>
<Lazyload active={loaded()} placeholder={<Skeleton />}>
  <div>Loaded content</div>
</Lazyload>`,desc:e("lazyload.demoDesc.controlled")}];return a(u,{get children(){var o=x(),i=o.firstChild,l=i.nextSibling,n=l.nextSibling;return t(l,()=>e("lazyload.intro")),t(o,a(f,{propsTables:d}),n),t(o,a(c,{each:r,children:s=>a(z,{demo:s})}),null),o}})};export{_ as LazyloadDocPage};
