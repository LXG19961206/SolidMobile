import{f as d,c as i,i as s,F as c,t as p,r as h}from"./index-CjqJoD8k.js";import{D as f}from"./ComponentDocLayout-7lKpA80h.js";import{u as L,e as g,z as x}from"./tableData-Cxi2FazS.js";import{P as u}from"./PropsAttrs-BEGKasrA.js";import{D as v}from"./DocLayout-BMuVmMAz.js";var D=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">List</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":x,"en-US":g});const _=()=>{const e=d(),{propsTables:o}=L(),a=[{title:e("list.demo.static"),code:`<List data={items}>
  {(item) => (
    <Cell title={item.name} description={item.desc}
      icon={<Avatar size="sm" text={item.name[0]} />} />
  )}
</List>`,desc:e("list.demoDesc.static")},{title:e("list.demo.autoload"),code:`<List onLoad={onLoad} finished={finished}
  loadMoreText="Loading..." finishedText="No more">
  {(item) => <Cell title={item.name} description={item.desc} />}
</List>`,desc:e("list.demoDesc.autoload")},{title:e("list.demo.virtual"),code:`<List virtual itemHeight={60} data={items}>
  {(item) => (
    <div style={{ height: 60, display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar size="md" text={item.name[0]} />
      <div>{item.name}</div>
    </div>
  )}
</List>`,desc:e("list.demoDesc.virtual")},{title:e("list.demo.empty"),code:`<List data={[]} empty="No records">
  {(item) => <Cell title={item.name} />}
</List>`,desc:e("list.demoDesc.empty")},{title:e("list.demo.refresh"),code:`<List
  data={items()}
  pullRefresh
  onRefresh={async () => {
    await fetch("/api/refresh");
  }}
>
  {(item) => <Cell title={item} />}
</List>`,desc:e("list.demoDesc.refresh")}];return i(v,{get children(){var t=D(),m=t.firstChild,n=m.nextSibling,l=n.nextSibling;return s(n,()=>e("list.intro")),s(t,i(u,{propsTables:o}),l),s(t,i(c,{each:a,children:r=>i(f,{demo:r})}),null),t}})};export{_ as ListDocPage};
