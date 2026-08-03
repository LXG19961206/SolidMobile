import{u as p,c1 as m,c as s,i as l,P as u,F as h,t as x,r as b,c2 as g,c3 as v}from"./index-lUwCpC8j.js";import{D as S}from"./ComponentDocLayout-eHgYK--M.js";import{D as T}from"./DocLayout-DkDeAqni.js";var D=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TreeSelect</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');b({"zh-CN":v,"en-US":g});const L=()=>{const e=p(),{propsTables:a,cssVarsTables:n}=m(),r=[{title:e("treeselect.demo.basic"),code:`const opts = [
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
/>`,desc:e("treeselect.demoDesc.customRender")},{title:e("treeselect.demo.asyncLoad"),code:`const loadChildren = (node) => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      { label: node.label + '-A', value: node.value + '-a' },
      { label: node.label + '-B', value: node.value + '-b' },
    ]);
  }, 800);
});

<TreeSelect options={opts} onLoadChildren={loadChildren} />`,desc:e("treeselect.demoDesc.asyncLoad")}];return s(T,{get children(){var t=D(),d=t.firstChild,o=d.nextSibling,c=o.nextSibling;return l(o,()=>e("treeselect.intro")),l(t,s(u,{propsTables:a,cssVarsTables:n}),c),l(t,s(h,{each:r,children:i=>s(S,{demo:i})}),null),t}})};export{L as TreeSelectDocPage};
