import{u as p,c1 as m,c as s,i as o,P as x,F as h,t as u,r as g,c2 as b,c3 as S}from"./index-CoKuUu0a.js";import{D as f}from"./ComponentDocLayout-Ce3t6Jis.js";import{D}from"./DocLayout-C5dfcUyU.js";var T=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TreeSelect</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":S,"en-US":b});const z=()=>{const e=p(),{propsTables:a,cssVarsTables:n}=m(),r=[{title:e("treeselect.demo.basic"),code:`const opts = [
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
/>`,desc:e("treeselect.demoDesc.customRender")}];return s(D,{get children(){var t=T(),c=t.firstChild,l=c.nextSibling,i=l.nextSibling;return o(l,()=>e("treeselect.intro")),o(t,s(x,{propsTables:a,cssVarsTables:n}),i),o(t,s(h,{each:r,children:d=>s(f,{demo:d})}),null),t}})};export{z as TreeSelectDocPage};
