import{u as p,c1 as m,c as o,i as l,P as g,F as h,t as b,r as u,c2 as x,c3 as v}from"./index-GzI4Y0WN.js";import{D as S}from"./ComponentDocLayout-DDqqeXxz.js";import{D as C}from"./DocLayout-BkN0zLBR.js";var f=b('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TreeSelect</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');u({"zh-CN":v,"en-US":x});const L=()=>{const e=p(),{propsTables:a,cssVarsTables:r}=m(),n=[{title:e("treeselect.demo.basic"),code:`const opts = [
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

<TreeSelect options={opts} onLoadChildren={loadChildren} />`,desc:e("treeselect.demoDesc.asyncLoad")},{title:e("treeselect.demo.bigData"),code:`// 30 regions × 60 cities = 1,800 options
const bigOpts = Array.from({ length: 30 }, (_, i) => ({
  label: 'Region ' + String.fromCharCode(65 + i),
  value: 'r' + i,
  children: Array.from({ length: 60 }, (_, j) => ({
    label: 'City ' + String.fromCharCode(65 + i) + '-' + (j + 1),
    value: 'c' + i + '-' + (j + 1),
  })),
}));

<TreeSelect options={bigOpts} searchable searchMode="global" placeholder="Type to search" />`,desc:e("treeselect.demoDesc.bigData")}];return o(C,{get children(){var t=f(),c=t.firstChild,s=c.nextSibling,i=s.nextSibling;return l(s,()=>e("treeselect.intro")),l(t,o(g,{propsTables:a,cssVarsTables:r}),i),l(t,o(h,{each:n,children:d=>o(S,{demo:d})}),null),t}})};export{L as TreeSelectDocPage};
