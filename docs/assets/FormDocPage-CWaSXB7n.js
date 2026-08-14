import{u as h,ab as y,c as l,i as t,P as F,F as x,t as I,r as S,ac as C,ad as k}from"./index--XDqPdTM.js";import{D as R}from"./ComponentDocLayout-D2M36JDU.js";import{D as T}from"./DocLayout-BCNyCNa1.js";var w=I('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Form</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><div style="padding:12px;border-left:3px solid var(--sc-color-primary, #1677ff);background:linear-gradient(135deg, color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent), transparent);border-radius:0 8px 8px 0;line-height:1.8;font-size:0.9rem"><p style="margin:0 0 12px;color:var(--sc-color-text, #323233);font-weight:500"></p><ul style="margin:0;padding-left:1.2rem;color:var(--sc-color-text-secondary, #6b7280)"><li></li><li></li><li></li><li></li><li></li></ul></div><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');S({"zh-CN":k,"en-US":C});const D=()=>{const e=h(),{propsTables:c,cssVarsTables:u}=y(),p=[{title:e("form.demo.uncontrolled"),code:`// Uncontrolled: Form manages its own state
<Form
  defaultValue={{ username: 'hello', phone: '' }}
  onSubmit={(v) => console.log(v)}
>
  <FormItem name="username" label="Username">
    <Input placeholder="Enter username" />
  </FormItem>
  <FormItem name="phone" label="Phone">
    <Input type="tel" placeholder="Enter phone" maxlength={11} />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("form.demoDesc.uncontrolled")},{title:e("form.demo.controlled"),code:`// Controlled: parent manages form state
const [formVal, setFormVal] = createSignal({
  username: '', phone: '',
});

<Form value={formVal()} onChange={setFormVal} onSubmit={(v) => console.log(v)}>
  <FormItem name="username" label="Username">
    <Input placeholder="Enter username" />
  </FormItem>
  <FormItem name="phone" label="Phone">
    <Input type="tel" placeholder="Enter phone" />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>

{/* formVal() is always up-to-date */}
<div>Current: {JSON.stringify(formVal())}</div>`,desc:e("form.demoDesc.controlled")},{title:e("form.demo.ref"),code:`let formRef: any;

<Form
  ref={(r) => { formRef = r; }}
  onSubmit={(v) => Toast.success('Submit: ' + JSON.stringify(v))}
>
  <FormItem name="name" label="Name" required
    rules={[{ validator: (v) => (v as string)?.length >= 2, message: 'At least 2 chars' }]}>
    <Input placeholder="Enter name (min 2 chars)" />
  </FormItem>
  <div style={{ padding: '12px 1rem', display: 'flex', gap: '8px', 'flex-wrap': 'wrap' }}>
    <Button type="primary" nativeType="submit" size="sm" text="Submit" />
    <Button size="sm" text="Reset" onClick={() => formRef?.resetFormValue()} />
    <Button size="sm" text="Fill" onClick={() => formRef?.setFormValue({ name: 'Hello World' })} />
    <Button size="sm" text="Validate" onClick={async () => {
      const ok = await formRef?.validateAll();
      if (ok) Toast.success('All valid!');
    }} />
  </div>
</Form>`,desc:e("form.demoDesc.ref")},{title:e("form.demo.validation"),code:`const rules = {
  username: [{
    validator: (v) => (v as string)?.length >= 2,
    message: 'At least 2 characters',
  }],
  email: [{
    validator: (v) => /^[^\\s@]+@[^\\s@]+$/.test(v as string),
    message: 'Invalid email format',
  }],
  age: [{
    validator: (v) => Number(v) >= 18,
    message: (v) => v ? 'Must be 18+' : 'Required',
  }],
};

<Form
  validateOnBlur
  onSubmit={(v) => console.log(v)}
>
  <FormItem name="username" label="User" required rules={rules.username}>
    <Input placeholder="At least 2 chars" />
  </FormItem>
  <FormItem name="email" label="Email" required rules={rules.email}>
    <Input type="email" placeholder="name@example.com" />
  </FormItem>
  <FormItem name="age" label="Age" required rules={rules.age}>
    <Input type="number" placeholder="18+" />
  </FormItem>
  {/* Async validator: simulates server check */}
  <FormItem name="nickname" label="Nick" required rules={[{
    validator: async (v) => {
      await new Promise(r => setTimeout(r, 800));
      const taken = ['admin', 'root', 'system'];
      return !!v && !taken.includes((v as string).toLowerCase());
    },
    message: (v) => v ? \`"\${v}" is already taken\` : 'Required',
  }]}>
    <Input placeholder="Try admin / root / system" />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("form.demoDesc.validation")},{title:e("form.demo.full"),code:`const [ctrlRight, setCtrlRight] = createSignal(true);
let formRef: any;

<Form
  ref={(r) => { formRef = r; }}
  onSubmit={(v) => Toast.success(JSON.stringify(v))}
  labelWidth="5em" colon scrollToError
  controlAlign={ctrlRight() ? 'right' : 'left'}
>
  <div style={{ display: 'flex', 'align-items': 'center', padding: '8px 1rem' }}>
    <span style={{ width: '5em', 'font-size': '0.9rem' }}>Ctrl Right:</span>
    <div style={{ flex: 1, display: 'flex', 'justify-content': 'flex-end' }}>
      <Switch checked={ctrlRight()} onChange={setCtrlRight} />
    </div>
  </div>
  <FormItem name="username" label="User" required
    rules={[{ validator: v => (v as string)?.length >= 2, message: 'At least 2 chars' }]}>
    <Input placeholder="Enter username" clearable />
  </FormItem>
  <FormItem name="gender" label="Gender" labelAlign="top" required>
    <RadioGroup direction="horizontal">
      <Radio value="m" label="Male" /><Radio value="f" label="Female" />
    </RadioGroup>
  </FormItem>
  <FormItem name="hobbies" label="Hobbies" labelAlign="top">
    <CheckboxGroup direction="horizontal">
      <Checkbox value="code" label="Code" /><Checkbox value="music" label="Music" />
    </CheckboxGroup>
  </FormItem>
  <FormItem name="notify" label="Notify"><Switch /></FormItem>
  <FormItem name="rating" label="Rating"><Rate /></FormItem>
  <FormItem name="count" label="Count"><Stepper /></FormItem>
  <FormItem name="city" label="City">
    <Select options={[{ text: 'Beijing', value: 'bj' }, { text: 'Shanghai', value: 'sh' }]} />
  </FormItem>
  <FormItem name="birthday" label="Birthday">
    <DatePicker placeholder="Select date" />
  </FormItem>
  <FormItem name="region" label="Region">
    <CityPicker columns={cityTree} placeholder="Select region" />
  </FormItem>
  <FormItem name="time" label="Time">
    <TimePicker placeholder="Select time" />
  </FormItem>
  <div style={{ padding: '12px 1rem', display: 'flex', gap: '12px' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
    <Button text="Reset" onClick={() => formRef?.resetFormValue()} />
  </div>
</Form>`,desc:e("form.demoDesc.full")}];return l(T,{get children(){var r=w(),g=r.firstChild,a=g.nextSibling,o=a.nextSibling,m=o.firstChild,f=m.nextSibling,i=f.firstChild,n=i.nextSibling,s=n.nextSibling,d=s.nextSibling,v=d.nextSibling;return o.nextSibling,t(a,()=>e("form.intro")),t(r,l(F,{propsTables:c,cssVarsTables:u}),o),t(m,()=>e("form.layout.desc")),t(i,()=>e("form.layout.item1")),t(n,()=>e("form.layout.item2")),t(s,()=>e("form.layout.item3")),t(d,()=>e("form.layout.item4")),t(v,()=>e("form.layout.item5")),t(r,l(x,{each:p,children:b=>l(R,{demo:b})}),null),r}})};export{D as FormDocPage};
