import{u as T,a8 as w,c as l,i as t,P as V,F as z,t as B,r as D,a9 as q,aa as N}from"./index-zzIybHw_.js";import{D as P}from"./ComponentDocLayout-DH2w8NsB.js";import{D as E}from"./DocLayout-dzaL4NuS.js";var U=B('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Form</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><div style="margin:24px 0;padding:16px 20px;background:var(--sc-card-bg, #fff);border-radius:8px;border:1px solid var(--sc-color-border, #ebedf0);font-size:0.9rem;line-height:1.8"><p style="margin:0 0 8px;font-weight:600"></p><p style="margin:0 0 8px;color:#6b7280"></p><ul style=margin:0;padding-left:1.2rem;color:#6b7280><li><code style="background:#f3f4f6;padding:1px 4px;border-radius:3px">setFormValue(v)</code> — </li><li><code style="background:#f3f4f6;padding:1px 4px;border-radius:3px">resetFormValue()</code> — </li><li><code style="background:#f3f4f6;padding:1px 4px;border-radius:3px">submit()</code> — </li><li><code style="background:#f3f4f6;padding:1px 4px;border-radius:3px">validateAll()</code> — </li></ul></div><div style="padding:12px;border-left:3px solid var(--sc-color-primary, #1677ff);background:linear-gradient(135deg, color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent), transparent);border-radius:0 8px 8px 0;line-height:1.8;font-size:0.9rem"><p style="margin:0 0 12px;color:var(--sc-color-text, #323233);font-weight:500"></p><ul style="margin:0;padding-left:1.2rem;color:var(--sc-color-text-secondary, #6b7280)"><li></li><li></li><li></li><li></li><li></li></ul></div><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');D({"zh-CN":N,"en-US":q});const J=()=>{const e=T(),{propsTables:x,cssVarsTables:h}=w(),y=[{title:e("form.demo.uncontrolled"),code:`// Uncontrolled: Form manages its own state
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
</Form>`,desc:e("form.demoDesc.full")}];return l(E,{get children(){var r=U(),F=r.firstChild,n=F.nextSibling,o=n.nextSibling,s=o.firstChild,d=s.nextSibling,I=d.nextSibling,a=I.firstChild,S=a.firstChild;S.nextSibling;var i=a.nextSibling,C=i.firstChild;C.nextSibling;var m=i.nextSibling,k=m.firstChild;k.nextSibling;var c=m.nextSibling,$=c.firstChild;$.nextSibling;var p=o.nextSibling,u=p.firstChild,R=u.nextSibling,f=R.firstChild,g=f.nextSibling,b=g.nextSibling,v=b.nextSibling,_=v.nextSibling;return p.nextSibling,t(n,()=>e("form.intro")),t(r,l(V,{propsTables:x,cssVarsTables:h}),o),t(s,()=>e("form.refApi.title")),t(d,()=>e("form.refApi.desc")),t(a,()=>e("form.refApi.setFormValue"),null),t(i,()=>e("form.refApi.resetFormValue"),null),t(m,()=>e("form.refApi.submit"),null),t(c,()=>e("form.refApi.validateAll"),null),t(u,()=>e("form.layout.desc")),t(f,()=>e("form.layout.item1")),t(g,()=>e("form.layout.item2")),t(b,()=>e("form.layout.item3")),t(v,()=>e("form.layout.item4")),t(_,()=>e("form.layout.item5")),t(r,l(z,{each:y,children:A=>l(P,{demo:A})}),null),r}})};export{J as FormDocPage};
