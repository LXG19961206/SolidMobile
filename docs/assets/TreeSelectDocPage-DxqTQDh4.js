import{u as p,c1 as h,c as s,i as a,P as d,F as g,t as u,r as x,c2 as b,c3 as S}from"./index-DONPGFCP.js";import{D as f}from"./ComponentDocLayout-DUBMc7rl.js";import{D}from"./DocLayout-Opy-arK6.js";var T=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TreeSelect</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');x({"zh-CN":S,"en-US":b});const y=()=>{const e=p(),{propsTables:o,cssVarsTables:r}=h(),i=[{title:e("treeselect.demo.basic"),code:`const opts = [
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
  ]},
  { label: 'South', value: 'south', children: [...] },
];

<TreeSelect options={opts} value={sel} onChange={setSel} />`,desc:e("treeselect.demoDesc.basic")},{title:e("treeselect.demo.maxLimit"),code:"<TreeSelect options={opts} max={3} />",desc:e("treeselect.demoDesc.maxLimit")}];return s(D,{get children(){var t=T(),c=t.firstChild,l=c.nextSibling,n=l.nextSibling;return a(l,()=>e("treeselect.intro")),a(t,s(d,{propsTables:o,cssVarsTables:r}),n),a(t,s(g,{each:i,children:m=>s(f,{demo:m})}),null),t}})};export{y as TreeSelectDocPage};
