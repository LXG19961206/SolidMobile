import{f as c,c as t,i as n,F as d,t as m,r as h}from"./index-CjqJoD8k.js";import{D as C}from"./ComponentDocLayout-7lKpA80h.js";import{u as v,e as g,z as b}from"./tableData-Bl1ID83i.js";import{P as f}from"./PropsAttrs-BEGKasrA.js";import{D as I}from"./DocLayout-BMuVmMAz.js";var x=m('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Input</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":b,"en-US":g});const S=()=>{const e=c(),{propsTables:a,cssVarsTables:r}=v(),s=[{title:e("input.demo.standalone"),code:`const [val, setVal] = createSignal('');

<Input value={val()} onChange={setVal} placeholder="Type here..." clearable />

<div>Value: {val()}</div>`,desc:e("input.demoDesc.standalone")},{title:e("input.demo.types"),code:`<CellGroup>
  <Cell title="Text" value={<Input placeholder="Enter text" />} />
  <Cell title="Password" value={<Input type="password" placeholder="Password" showPasswordToggle />} />
  <Cell title="Number" value={<Input type="number" placeholder="Number" />} />
  <Cell title="Tel" value={<Input type="tel" placeholder="Phone number" />} />
  <Cell title="Email" value={<Input type="email" placeholder="Email" />} />
</CellGroup>`,desc:e("input.demoDesc.types")},{title:e("input.demo.clearable"),code:`<CellGroup>
  <Cell title="Clearable" value={<Input clearable placeholder="Type something..." />} />
  <Cell title="Password" value={<Input type="password" placeholder="Password" showPasswordToggle />} />
  <Cell title="Default" value={<Input clearable defaultValue="Tap X to clear" />} />
</CellGroup>`,desc:e("input.demoDesc.clearable")},{title:e("input.demo.affix"),code:`<CellGroup>
  <Cell title="Username" value={<Input placeholder="Enter text" prefix={<span style={{color:"#999"}}>@</span>} />} />
  <Cell title="Email" value={<Input placeholder="example" suffix={<span style={{color:"#999","font-size":"0.85rem"}}>@gmail.com</span>} />} />
</CellGroup>`,desc:e("input.demoDesc.affix")},{title:e("input.demo.count"),code:`<CellGroup>
  <Cell title="Bio" value={<Input showCount maxlength={20} placeholder="Max 20 chars" />} />
  <Cell title="Sig" value={<Input showCount maxlength={50} placeholder="Your signature" />} />
</CellGroup>`,desc:e("input.demoDesc.count")},{title:e("input.demo.states"),code:`<CellGroup>
  <Cell title="Disabled" value={<Input disabled value="Not editable" />} />
  <Cell title="Readonly" value={<Input readonly value="Focusable, copyable" />} />
  <Cell title="Error" value={<Input error value="Invalid format" />} />
</CellGroup>`,desc:e("input.demoDesc.states")},{title:e("input.demo.size"),code:`<Input placeholder="Small (sm)" size="sm" />
<Input placeholder="Medium (md)" size="md" />
<Input placeholder="Large (lg)" size="lg" />`,desc:e("input.demoDesc.size")},{title:e("input.demo.search"),code:`<Input placeholder="Search articles" clearable prefix={<Icon name="search" color="#999" />}
  style={{ "border-radius": "16px", border: "none", padding: "0 16px" }} />`,desc:e("input.demoDesc.search")},{title:e("input.demo.sms"),code:`const [countdown, setCountdown] = createSignal(0);
let timer: any;

const send = () => {
  if (countdown() > 0) return;
  setCountdown(60);
  timer = setInterval(() => {
    setCountdown(c => {
      if (c <= 1) { clearInterval(timer); return 0; }
      return c - 1;
    });
  }, 1000);
};

const btn = () => (
  <span onClick={send} style={{
    "font-size": "0.8rem", "white-space": "nowrap",
    color: countdown() > 0 ? "#999" : "var(--sc-color-primary, #1677ff)",
    cursor: countdown() > 0 ? "default" : "pointer",
  }}>
    {countdown() > 0 ? \`\${countdown()}s\` : "Send Code"}
  </span>
);

<CellGroup>
  <Cell title="Phone" value={<Input type="tel" maxlength={11} placeholder="Enter phone" suffix={btn()} />} />
</CellGroup>`,desc:e("input.demoDesc.sms")},{title:e("input.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="username" label="Username" rules={[{
    validator: (v) => (v as string)?.length >= 2,
    message: "At least 2 characters",
  }]}>
    <Input placeholder="Enter username" clearable />
  </FormItem>
  <FormItem name="email" label="Email">
    <Input type="email" placeholder="Enter email" clearable />
  </FormItem>
  <div style={{ padding: "12px 1rem" }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("input.demoDesc.form")}];return t(I,{get children(){var l=x(),p=l.firstChild,o=p.nextSibling,i=o.nextSibling;return n(o,()=>e("input.intro")),n(l,t(f,{propsTables:a,cssVarsTables:r}),i),n(l,t(d,{each:s,children:u=>t(C,{demo:u})}),null),l}})};export{S as InputDocPage};
