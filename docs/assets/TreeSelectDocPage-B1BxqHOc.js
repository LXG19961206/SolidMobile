import{u as p,c1 as m,c as o,i as s,P as h,F as u,t as x,r as g,c2 as b,c3 as v}from"./index-D9w_pilX.js";import{D as S}from"./ComponentDocLayout-CYrlUVA4.js";import{D as T}from"./DocLayout-4FwNpK7T.js";var D=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TreeSelect</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":v,"en-US":b});const L=()=>{const e=p(),{propsTables:a,cssVarsTables:n}=m(),r=[{title:e("treeselect.demo.basic"),code:`const opts = [
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
  ]},
  { label: 'South', value: 'south', children: [...] },
];

<TreeSelect options={opts} value={sel} onChange={setSel} />`,desc:e("treeselect.demoDesc.basic")},{title:e("treeselect.demo.maxLimit"),code:"<TreeSelect options={opts} max={3} />",desc:e("treeselect.demoDesc.maxLimit")},{title:e("treeselect.demo.modeExpand"),code:`<TreeSelect options={opts}
  mode="expand"
/>`,desc:e("treeselect.demoDesc.modeExpand")},{title:e("treeselect.demo.customRender"),code:`<TreeSelect options={opts}
  renderItem={(node, selected, expand, toggle) => (
    <div onClick={() => toggle?.()}
      style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer' }}>
      <span style={{ flex: 1 }}>{selected ? '✓ ' : ''}{node.label}</span>
      {node.children && (
        <span onClick={(e) => { e.stopPropagation(); expand(); }}
          style={{ padding: '4px 12px', background: '#eee', borderRadius: 4 }}>›</span>
      )}
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

<TreeSelect options={opts} onLoadChildren={loadChildren} />`,desc:e("treeselect.demoDesc.asyncLoad")}];return o(T,{get children(){var t=D(),d=t.firstChild,l=d.nextSibling,c=l.nextSibling;return s(l,()=>e("treeselect.intro")),s(t,o(h,{propsTables:a,cssVarsTables:n}),c),s(t,o(u,{each:r,children:i=>o(S,{demo:i})}),null),t}})};export{L as TreeSelectDocPage};
