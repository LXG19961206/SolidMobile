import{u as h,A as g,c as o,i as t,P as u,F as C,t as m,r as v,B as x,C as w}from"./index-BUBEjxef.js";import{D as b}from"./ComponentDocLayout-BLUSG-Qz.js";import{D as S}from"./DocLayout-BdRy2cRJ.js";var y=m('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Cascader</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');v({"zh-CN":w,"en-US":x});const z=()=>{const e=h(),{propsTables:l,optionTables:n,cssVarsTables:i}=g(),r=[{title:e("cascader.demo.region"),code:`const options: CascaderOption[] = [
  { text: 'Beijing', value: 'bj', children: [
    { text: 'Chaoyang', value: 'cy', children: [
      { text: 'Wangjing', value: 'wj' },
    ]},
  ]},
  { text: 'Shanghai', value: 'sh', children: [...] },
];

<CellGroup card>
  <Cell title="Region" value={val().join(" / ") || "Select"}
    clickable onClick={() => setShow(true)} />
</CellGroup>

<Cascader
  options={options}
  show={show()}
  onUpdateShow={setShow}
  value={val()}
  onChange={setVal}
  title="Select Region"
  closeable
/>`,desc:e("cascader.demoDesc.region")},{title:e("cascader.demo.disabledOption"),code:`const options = [
  { text: 'Beijing', value: 'bj' },
  { text: 'Shanghai', value: 'sh', disabled: true },
  { text: 'Guangdong', value: 'gd' },
  { text: 'Jiangsu', value: 'js', disabled: true },
];

<CellGroup card>
  <Cell title="City" value={val().join(" / ") || "Select"}
    clickable onClick={() => setShow(true)} />
</CellGroup>

<Cascader
  options={options}
  show={show()}
  onUpdateShow={setShow}
  title="Cities"
/>`,desc:e("cascader.demoDesc.disabledOption")},{title:e("cascader.demo.customRender"),code:`const options = [
  { text: 'Beijing', value: 'bj',
    render: (
      <span style={{ display: 'flex', gap: '10px', 'align-items': 'center' }}>
        <span style={{ 'font-size': '1.3rem' }}>🏯</span>
        <span style={{ flex: 1 }}>
          <span style={{ 'font-weight': 600 }}>Beijing</span>
          <span style={{ 'font-size': '0.7rem', color: '#9ca3af', display: 'block' }}>
            Capital · Pop 21.5M
          </span>
        </span>
        <span style={{
          background: '#fef3c7', color: '#d97706',
          padding: '2px 8px', 'border-radius': '10px',
          'font-size': '0.7rem', 'font-weight': 600
        }}>N China</span>
      </span>
    ),
  },
  // ...
];

<CellGroup card>
  <Cell title="Province" value={val().join(" / ") || "Select"}
    clickable onClick={() => setShow(true)} />
</CellGroup>

<Cascader
  options={options}
  show={show()}
  onUpdateShow={setShow}
  checkmark={<Icon name="check" size={16} color="var(--sc-color-primary)" />}
/>`,desc:e("cascader.demoDesc.customRender")},{title:e("cascader.demo.asyncLoad"),code:`const loadChildren = async (option: CascaderOption) => {
  await new Promise(r => setTimeout(r, 1000));
  const map: Record<string, CascaderOption[]> = {
    __root__: [
      { text: 'Beijing', value: 'bj' },
      { text: 'Shanghai', value: 'sh' },
    ],
    bj: [{ text: 'Chaoyang', value: 'cy' }],
  };
  return map[String(option.value)] || [];
};

<CellGroup card>
  <Cell title="Region" value={val().join(" → ") || "Select"}
    clickable onClick={() => setShow(true)} />
</CellGroup>

<Cascader
  options={[]}
  onLoadChildren={loadChildren}
  show={show()}
  onUpdateShow={setShow}
  title="Async Load Region"
  closeable
  loading={<div style="text-align:center;padding:32px">
    <Loading size={24} />
    <div>Loading...</div>
  </div>}
/>`,desc:e("cascader.demo.asyncLoad")}];return o(S,{get children(){var a=y(),c=a.firstChild,s=c.nextSibling,d=s.nextSibling;return t(s,()=>e("cascader.intro")),t(a,o(u,{get propsTables(){return[...l,...n]},cssVarsTables:i}),d),t(a,o(C,{each:r,children:p=>o(b,{demo:p})}),null),a}})};export{z as CascaderDocPage};
