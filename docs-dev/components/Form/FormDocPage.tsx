import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useFormTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const FormDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useFormTableData();

  const demos: DemoCode[] = [
    {
      title: t('form.demo.uncontrolled'),
      code: '// Uncontrolled: Form manages its own state\n<Form\n  defaultValue={{ username: \'hello\', phone: \'\' }}\n  onSubmit={(v) => console.log(v)}\n>\n  <FormItem name="username" label="Username">\n    <Input placeholder="Enter username" />\n  </FormItem>\n  <FormItem name="phone" label="Phone">\n    <Input type="tel" placeholder="Enter phone" maxlength={11} />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('form.demoDesc.uncontrolled'),
    },
    {
      title: t('form.demo.controlled'),
      code: '// Controlled: parent manages form state\nconst [formVal, setFormVal] = createSignal({\n  username: \'\', phone: \'\',\n});\n\n<Form value={formVal()} onChange={setFormVal} onSubmit={(v) => console.log(v)}>\n  <FormItem name="username" label="Username">\n    <Input placeholder="Enter username" />\n  </FormItem>\n  <FormItem name="phone" label="Phone">\n    <Input type="tel" placeholder="Enter phone" />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>\n\n{/* formVal() is always up-to-date */}\n<div>Current: {JSON.stringify(formVal())}</div>',
      desc: t('form.demoDesc.controlled'),
    },
    {
      title: t('form.demo.ref'),
      code: 'let formRef: any;\n\n<Form\n  ref={(r) => { formRef = r; }}\n  onSubmit={(v) => Toast.success(\'Submit: \' + JSON.stringify(v))}\n>\n  <FormItem name="name" label="Name" required\n    rules={[{ validator: (v) => (v as string)?.length >= 2, message: \'At least 2 chars\' }]}>\n    <Input placeholder="Enter name (min 2 chars)" />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\', display: \'flex\', gap: \'8px\', \'flex-wrap\': \'wrap\' }}>\n    <Button type="primary" nativeType="submit" size="sm" text="Submit" />\n    <Button size="sm" text="Reset" onClick={() => formRef?.resetFormValue()} />\n    <Button size="sm" text="Fill" onClick={() => formRef?.setFormValue({ name: \'Hello World\' })} />\n    <Button size="sm" text="Validate" onClick={async () => {\n      const ok = await formRef?.validateAll();\n      if (ok) Toast.success(\'All valid!\');\n    }} />\n  </div>\n</Form>',
      desc: t('form.demoDesc.ref'),
    },
    {
      title: t('form.demo.validation'),
      code: 'const rules = {\n  username: [{\n    validator: (v) => (v as string)?.length >= 2,\n    message: \'At least 2 characters\',\n  }],\n  email: [{\n    validator: (v) => /^[^\\s@]+@[^\\s@]+$/.test(v as string),\n    message: \'Invalid email format\',\n  }],\n  age: [{\n    validator: (v) => Number(v) >= 18,\n    message: (v) => v ? \'Must be 18+\' : \'Required\',\n  }],\n};\n\n<Form\n  validateOnBlur\n  onSubmit={(v) => console.log(v)}\n>\n  <FormItem name="username" label="User" required rules={rules.username}>\n    <Input placeholder="At least 2 chars" />\n  </FormItem>\n  <FormItem name="email" label="Email" required rules={rules.email}>\n    <Input type="email" placeholder="name@example.com" />\n  </FormItem>\n  <FormItem name="age" label="Age" required rules={rules.age}>\n    <Input type="number" placeholder="18+" />\n  </FormItem>\n  {/* Async validator: simulates server check */}\n  <FormItem name="nickname" label="Nick" required rules={[{\n    validator: async (v) => {\n      await new Promise(r => setTimeout(r, 800));\n      const taken = [\'admin\', \'root\', \'system\'];\n      return !!v && !taken.includes((v as string).toLowerCase());\n    },\n    message: (v) => v ? `"${v}" is already taken` : \'Required\',\n  }]}>\n    <Input placeholder="Try admin / root / system" />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('form.demoDesc.validation'),
    },
    {
      title: t('form.demo.full'),
      code: 'const [ctrlRight, setCtrlRight] = createSignal(true);\nlet formRef: any;\n\n<Form\n  ref={(r) => { formRef = r; }}\n  onSubmit={(v) => Toast.success(JSON.stringify(v))}\n  labelWidth="5em" colon scrollToError\n  controlAlign={ctrlRight() ? \'right\' : \'left\'}\n>\n  <div style={{ display: \'flex\', \'align-items\': \'center\', padding: \'8px 1rem\' }}>\n    <span style={{ width: \'5em\', \'font-size\': \'0.9rem\' }}>Ctrl Right:</span>\n    <div style={{ flex: 1, display: \'flex\', \'justify-content\': \'flex-end\' }}>\n      <Switch checked={ctrlRight()} onChange={setCtrlRight} />\n    </div>\n  </div>\n  <FormItem name="username" label="User" required\n    rules={[{ validator: v => (v as string)?.length >= 2, message: \'At least 2 chars\' }]}>\n    <Input placeholder="Enter username" clearable />\n  </FormItem>\n  <FormItem name="gender" label="Gender" labelAlign="top" required>\n    <RadioGroup direction="horizontal">\n      <Radio value="m" label="Male" /><Radio value="f" label="Female" />\n    </RadioGroup>\n  </FormItem>\n  <FormItem name="hobbies" label="Hobbies" labelAlign="top">\n    <CheckboxGroup direction="horizontal">\n      <Checkbox value="code" label="Code" /><Checkbox value="music" label="Music" />\n    </CheckboxGroup>\n  </FormItem>\n  <FormItem name="notify" label="Notify"><Switch /></FormItem>\n  <FormItem name="rating" label="Rating"><Rate /></FormItem>\n  <FormItem name="count" label="Count"><Stepper /></FormItem>\n  <FormItem name="city" label="City">\n    <Select options={[{ text: \'Beijing\', value: \'bj\' }, { text: \'Shanghai\', value: \'sh\' }]} />\n  </FormItem>\n  <FormItem name="birthday" label="Birthday">\n    <DatePicker placeholder="Select date" />\n  </FormItem>\n  <FormItem name="region" label="Region">\n    <CityPicker columns={cityTree} placeholder="Select region" />\n  </FormItem>\n  <FormItem name="time" label="Time">\n    <TimePicker placeholder="Select time" />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\', display: \'flex\', gap: \'12px\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n    <Button text="Reset" onClick={() => formRef?.resetFormValue()} />\n  </div>\n</Form>',
      desc: t('form.demoDesc.full'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Form</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('form.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <div style={{
          margin: '24px 0', padding: '16px 20px',
          background: 'var(--sc-card-bg, #fff)', 'border-radius': '8px',
          border: '1px solid var(--sc-color-border, #ebedf0)',
          'font-size': '0.9rem', 'line-height': 1.8,
        }}>
          <p style={{ margin: '0 0 8px', 'font-weight': 600 }}>{t('form.refApi.title')}</p>
          <p style={{ margin: '0 0 8px', color: '#6b7280' }}>{t('form.refApi.desc')}</p>
          <ul style={{ margin: 0, 'padding-left': '1.2rem', color: '#6b7280' }}>
            <li><code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px' }}>setFormValue(v)</code> — {t('form.refApi.setFormValue')}</li>
            <li><code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px' }}>resetFormValue()</code> — {t('form.refApi.resetFormValue')}</li>
            <li><code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px' }}>submit()</code> — {t('form.refApi.submit')}</li>
            <li><code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px' }}>validateAll()</code> — {t('form.refApi.validateAll')}</li>
          </ul>
        </div>

        <div style={{
          padding: '12px',
          'border-left': '3px solid var(--sc-color-primary, #1677ff)',
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent), transparent)',
          'border-radius': '0 8px 8px 0',
          'line-height': 1.8, 'font-size': '0.9rem',
        }}>
          <p style={{ margin: '0 0 12px', color: 'var(--sc-color-text, #323233)', 'font-weight': 500 }}>
            {t('form.layout.desc')}
          </p>
          <ul style={{ margin: 0, 'padding-left': '1.2rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>
            <li>{t('form.layout.item1')}</li>
            <li>{t('form.layout.item2')}</li>
            <li>{t('form.layout.item3')}</li>
            <li>{t('form.layout.item4')}</li>
            <li>{t('form.layout.item5')}</li>
          </ul>
        </div>

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
