import{u as h,c1 as g,c as s,i as l,P as u,F as b,t as S,r as f,c2 as v,c3 as D}from"./index-CTbp0wPn.js";import{D as T}from"./ComponentDocLayout-BqpnM9M1.js";import{D as y}from"./DocLayout-BK8LaGqR.js";var C=S('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><div class=doc-wip-banner><span class=doc-wip-icon>&#x26a0;</span><span></span></div><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TreeSelect</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');f({"zh-CN":D,"en-US":v});const z=()=>{const e=h(),{propsTables:a,cssVarsTables:r}=g(),i=[{title:e("treeselect.demo.basic"),code:`const opts = [
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
  ]},
  { label: 'South', value: 'south', children: [...] },
];

<TreeSelect options={opts} value={sel} onChange={setSel} />`,desc:e("treeselect.demoDesc.basic")},{title:e("treeselect.demo.maxLimit"),code:"<TreeSelect options={opts} max={3} />",desc:e("treeselect.demoDesc.maxLimit")},{title:e("treeselect.demo.modeExpand"),code:`<TreeSelect options={opts}
  mode="expand"
/>`,desc:e("treeselect.demoDesc.modeExpand")},{title:e("treeselect.demo.customRender"),code:`<TreeSelect options={opts}
  renderItem={(node, selected, expand) => (
    <div style={{display:"flex",alignItems:"center",padding:"12px 16px"}}>
      <span style={{flex:1}}>{selected ? '✓ ' : ''}{node.label}</span>
      {!node.children ? null :
        <span onClick={expand} style={{padding:"4px 12px",background:"#eee",borderRadius:4,cursor:"pointer"}}>›</span>
      }
    </div>
  )}
/>`,desc:e("treeselect.demoDesc.customRender")}];return s(y,{get children(){var t=C(),n=t.firstChild,c=n.firstChild,d=c.nextSibling,p=n.nextSibling,o=p.nextSibling,m=o.nextSibling;return l(d,()=>e("treeselect.wipBanner")),l(o,()=>e("treeselect.intro")),l(t,s(u,{propsTables:a,cssVarsTables:r}),m),l(t,s(b,{each:i,children:x=>s(T,{demo:x})}),null),t}})};export{z as TreeSelectDocPage};
