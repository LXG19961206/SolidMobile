import{u,c as n,i as t,N as v,t as h,O as k,P as C,F as f,r as S,Q as b,R as z}from"./index-BUBEjxef.js";import{D as $}from"./ComponentDocLayout-BLUSG-Qz.js";import{D as _}from"./DocLayout-BdRy2cRJ.js";var w=h('<div style="font-size:0.9rem;line-height:1.8;color:var(--sc-color-text, #374151)"><p></p><p style=margin-top:12px></p><h3 style="font-size:0.95rem;font-weight:600;margin:20px 0 8px"></h3><p></p><ul style="padding:0 0 0 20px;margin:0 0 16px"><li style=margin-bottom:8px><strong></strong></li><li style=margin-bottom:8px><strong></strong></li><li style=margin-bottom:8px><strong></strong></li></ul><p style="margin:16px 0 0;font-size:0.85rem;color:var(--sc-color-text-secondary, #6b7280)">');const T=typeof window<"u"&&window.top!==window.self;function D(){const e=u();return T?null:n(v,{get title(){return e("citypicker.design.cardTitle")},get children(){var s=w(),o=s.firstChild,c=o.nextSibling,i=c.nextSibling,a=i.nextSibling,l=a.nextSibling,r=l.firstChild,p=r.firstChild,d=r.nextSibling,m=d.firstChild,g=d.nextSibling,y=g.firstChild,x=l.nextSibling;return t(o,()=>e("citypicker.design.para1")),t(c,()=>e("citypicker.design.para2")),t(i,()=>e("citypicker.design.whyTitle")),t(a,()=>e("citypicker.design.whyDesc")),t(p,()=>e("citypicker.design.reason1Title")),t(r,()=>e("citypicker.design.reason1Desc"),null),t(m,()=>e("citypicker.design.reason2Title")),t(d,()=>e("citypicker.design.reason2Desc"),null),t(y,()=>e("citypicker.design.reason3Title")),t(g,()=>e("citypicker.design.reason3Desc"),null),t(x,()=>e("citypicker.design.summary")),s}})}var P=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">CityPicker</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');S({"zh-CN":z,"en-US":b});const L=()=>{const e=u(),{propsTables:s,cssVarsTables:o}=k(),c=[{title:e("citypicker.demo.region"),code:`const cityTree: PickerOption[] = [
  { text: 'Guangdong', value: 'gd', children: [
    { text: 'Guangzhou', value: 'gz', children: [
      { text: 'Tianhe', value: 'gz-th' },
      { text: 'Yuexiu', value: 'gz-yx' },
    ]},
    { text: 'Shenzhen', value: 'sz', children: [
      { text: 'Nanshan', value: 'sz-ns' },
      { text: 'Futian', value: 'sz-ft' },
    ]},
  ]},
  { text: 'Zhejiang', value: 'zj', children: [
    { text: 'Hangzhou', value: 'hz', children: [
      { text: 'Xihu', value: 'hz-xh' },
    ]},
  ]},
];

const [open, setOpen] = createSignal(false);
const [val, setVal] = createSignal<(string | number)[]>([]);
const [label, setLabel] = createSignal('Select');

<CellGroup card>
  <Cell title="Region" value={label()} clickable
    onClick={() => setOpen(true)} />
</CellGroup>

<CityPicker
  columns={cityTree}
  show={open()}
  onUpdateShow={setOpen}
  onConfirm={(v) => {
    setVal(v);
    setLabel(v.join(' / '));
    setOpen(false);
  }}
  title="Select Region"
/>`,desc:e("citypicker.demoDesc.region")},{title:e("citypicker.demo.autoMode"),code:`const cityTree: PickerOption[] = [/* ... */];
const [val, setVal] = createSignal<(string | number)[]>([]);

// Auto mode — no show prop, CityPicker renders its own Cell
<CellGroup card>
  <CityPicker
    columns={cityTree}
    value={val()}
    onChange={setVal}
    placeholder="Please select city"
  />
</CellGroup>`,desc:e("citypicker.demoDesc.autoMode")},{title:e("citypicker.demo.deepCascade"),code:`// 4-level tree: province → city → district → street
const deepTree: PickerOption[] = [
  { text: 'Guangdong', value: 'gd', children: [
    { text: 'Guangzhou', value: 'gz', children: [
      { text: 'Tianhe', value: 'gz-th', children: [
        { text: 'Shipai Street', value: 'sp' },
        { text: 'Liede Street', value: 'ld' },
  ]}]}]}];

const [open, setOpen] = createSignal(false);
const [val, setVal] = createSignal<(string | number)[]>([]);

<CellGroup card>
  <Cell title="Address" value={val().join(' / ') || 'Select'}
    clickable onClick={() => setOpen(true)} />
</CellGroup>

<CityPicker
  columns={deepTree}
  show={open()}
  onUpdateShow={setOpen}
  onConfirm={(v) => { setVal(v); setOpen(false); }}
  title="Select Address"
/>`,desc:e("citypicker.demoDesc.deepCascade")}];return n(_,{get children(){var i=P(),a=i.firstChild,l=a.nextSibling,r=l.nextSibling;return t(l,()=>e("citypicker.intro")),t(i,n(C,{propsTables:s,cssVarsTables:o}),r),t(i,n(f,{each:c,children:p=>n($,{demo:p})}),null),t(i,n(D,{}),null),i}})};export{L as CityPickerDocPage};
