import{f as r,c as n,i as l,F as m,t as x,r as h}from"./index-CjqJoD8k.js";import{D as u}from"./ComponentDocLayout-7lKpA80h.js";import{u as E,e as g,z as f}from"./tableData-ClfD2XeJ.js";import{P as b}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var C=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Ellipsis</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":f,"en-US":g});const L=()=>{const e=r(),{propsTables:i,cssVarsTables:o}=E(),a=[{title:e("ellipsis.demo.basic"),code:"<Ellipsis>Long text that needs to be truncated...</Ellipsis>",desc:e("ellipsis.demoDesc.basic")},{title:e("ellipsis.demo.multi"),code:`<Ellipsis lines={3}>
  Multi-line text content that will be
  truncated after the third line...
</Ellipsis>`,desc:e("ellipsis.demoDesc.multi")},{title:e("ellipsis.demo.expand"),code:`<Ellipsis lines={2} expandable>
  Long text that can be expanded
  to show full content
</Ellipsis>`,desc:e("ellipsis.demoDesc.expand")},{title:e("ellipsis.demo.custom"),code:`<Ellipsis
  lines={2}
  expandable
  expandElement={<span>▼ More</span>}
  collapseElement={<span>▲ Less</span>}
>
  Text with custom expand/collapse
  button content
</Ellipsis>`,desc:e("ellipsis.demoDesc.custom")},{title:e("ellipsis.demo.controlled"),code:`const [expanded, setExpanded] = createSignal(false);

<Button onClick={() => setExpanded(v => !v)}>
  {expanded() ? "Collapse" : "Expand"}
</Button>

<Ellipsis
  lines={2}
  expandable
  expanded={expanded()}
  onExpandChange={setExpanded}
  showAction={false}
>
  {longText}
</Ellipsis>`,desc:e("ellipsis.demoDesc.controlled")}];return n(D,{get children(){var s=C(),p=s.firstChild,t=p.nextSibling,d=t.nextSibling;return l(t,()=>e("ellipsis.intro")),l(s,n(b,{propsTables:i,cssVarsTables:o}),d),l(s,n(m,{each:a,children:c=>n(u,{demo:c})}),null),s}})};export{L as EllipsisDocPage};
