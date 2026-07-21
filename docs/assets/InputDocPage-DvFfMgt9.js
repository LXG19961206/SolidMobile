import{u as c,ai as d,c as t,i as n,P as m,F as h,t as C,r as v,aj as g,ak as b}from"./index-DO-B6k_y.js";import{D as I}from"./ComponentDocLayout-idRjphWL.js";import{D as f}from"./DocLayout-BcF6F-9v.js";var x=C('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Input</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');v({"zh-CN":b,"en-US":g});const z=()=>{const e=c(),{propsTables:o,cssVarsTables:r}=d(),s=[{title:e("input.demo.standalone"),code:`const [val, setVal] = createSignal('');

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
</Form>`,desc:e("input.demoDesc.form")}];return t(f,{get children(){var l=x(),p=l.firstChild,a=p.nextSibling,i=a.nextSibling;return n(a,()=>e("input.intro")),n(l,t(m,{propsTables:o,cssVarsTables:r}),i),n(l,t(h,{each:s,children:u=>t(I,{demo:u})}),null),l}})};export{z as InputDocPage};
