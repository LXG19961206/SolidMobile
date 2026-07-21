import{u as m,aJ as u,c as l,i as t,P as v,F as C,t as k,r as b,aK as h,aL as f}from"./index-DgmvoJ5y.js";import{D as x}from"./ComponentDocLayout-Dv2yqQbp.js";import{D as w}from"./DocLayout-Bs01Q_bc.js";var g=k('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Picker</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');b({"zh-CN":f,"en-US":h});const y=()=>{const e=m(),{propsTables:i,optionTables:a,cssVarsTables:s}=u(),r=[{title:e("picker.demo.city"),code:`const [open, setOpen] = createSignal("");
const [label, setLabel] = createSignal("Select");

<CellGroup card>
  <Cell title="City" value={label()} clickable
    onClick={() => setOpen("city")} />
</CellGroup>

<Picker
  show={open() === "city"}
  onUpdateShow={(v) => { if (!v) setOpen(""); }}
  onConfirm={(items, vals) => setLabel(vals.join(" / "))}
  title="City"
  columns={cityTree}
/>`,desc:e("picker.demoDesc.city")},{title:e("picker.demo.date"),code:`const dateCols = [
  [{ text: "2024", value: 2024 }, { text: "2025", value: 2025 }],
  [{ text: "Jan", value: 1 }, { text: "Feb", value: 2 }],
];

<CellGroup card>
  <Cell title="Date" value={label()} clickable
    onClick={() => setOpen("date")} />
</CellGroup>

<Picker
  show={open() === "date"}
  onUpdateShow={(v) => { if (!v) setOpen(""); }}
  onConfirm={(items, vals) => setLabel(vals.join(" / "))}
  title="Date"
  columns={dateCols}
/>`,desc:e("picker.demoDesc.date")},{title:e("picker.demo.time"),code:`const timeCols = [
  hours.map(h => ({ text: h, value: h })),
  mins.map(m => ({ text: m, value: m })),
];

<CellGroup card>
  <Cell title="Time" value={label()} clickable
    onClick={() => setOpen("time")} />
</CellGroup>

<Picker
  show={open() === "time"}
  onUpdateShow={(v) => { if (!v) setOpen(""); }}
  onConfirm={(items, vals) => setLabel(vals.map(String).join(":"))}
  title="Time"
  columns={timeCols}
/>`,desc:e("picker.demoDesc.time")},{title:e("picker.demo.disabled"),code:`const cols = [
  { text: "A", value: 1 },
  { text: "B", value: 2, disabled: true },
  { text: "C", value: 3 },
];

<CellGroup card>
  <Cell title="Options" value={label()} clickable
    onClick={() => setOpen("d")} />
</CellGroup>

<Picker show={open() === "d"} onUpdateShow={(v) => { if (!v) setOpen(""); }}
  onConfirm={(items, vals) => setLabel(vals.join(", "))}
  columns={[cols]} />`,desc:e("picker.demoDesc.disabled")},{title:e("picker.demo.controlled"),code:`<CellGroup card>
  <Cell title="City" value="Beijing / Haidian" clickable
    onClick={() => setOpen("c")} />
</CellGroup>

{/* Preset value via value prop */}
<Picker
  show={open() === "c"}
  onUpdateShow={(v) => { if (!v) setOpen(""); }}
  value={["bj", "hd"]}
  columns={cityTree}
/>`,desc:e("picker.demoDesc.controlled")},{title:e("picker.renderDemo"),code:`const cols = [
  { text: "", value: "solid",
    render: <span>◈ SolidJS</span> },
  { text: "", value: "react",
    render: <span>◇ React</span> },
];

<CellGroup card>
  <Cell title="Framework" value={label()} clickable
    onClick={() => setOpen("r")} />
</CellGroup>

<Picker show={open() === "r"} onUpdateShow={(v) => { if (!v) setOpen(""); }}
  onConfirm={(items, vals) => setLabel(vals.join(", "))}
  title="Framework" columns={[cols]} />`,desc:e("picker.renderDesc")},{title:e("picker.inertia"),code:`<CellGroup card>
  <Cell title="ratio=0.3 slow" value={label()} clickable
    onClick={() => setOpen("i")} />
</CellGroup>

<Picker
  show={open() === "i"}
  onUpdateShow={(v) => { if (!v) setOpen(""); }}
  onConfirm={(items, vals) => setLabel(vals.map(String).join(":"))}
  ratio={0.3}
  swipeDuration={2}
  columns={timeCols}
/>`,desc:e("picker.inertiaDesc")}];return l(w,{get children(){var n=g(),c=n.firstChild,o=c.nextSibling,p=o.nextSibling;return t(o,()=>e("picker.intro")),t(n,l(v,{get propsTables(){return[...i,...a]},cssVarsTables:s}),p),t(n,l(C,{each:r,children:d=>l(x,{demo:d})}),null),n}})};export{y as PickerDocPage};
