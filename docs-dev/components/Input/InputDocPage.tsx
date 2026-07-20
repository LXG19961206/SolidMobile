import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useInputTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const InputDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useInputTableData();

  const demos: DemoCode[] = [
    {
      title: t('input.demo.standalone'),
      code: 'const [val, setVal] = createSignal(\'\');\n\n<Input value={val()} onChange={setVal} placeholder="Type here..." clearable />\n\n<div>Value: {val()}</div>',
      desc: t('input.demoDesc.standalone'),
    },
    {
      title: t('input.demo.types'),
      code: '<CellGroup>\n  <Cell title="Text" value={<Input placeholder="Enter text" />} />\n  <Cell title="Password" value={<Input type="password" placeholder="Password" showPasswordToggle />} />\n  <Cell title="Number" value={<Input type="number" placeholder="Number" />} />\n  <Cell title="Tel" value={<Input type="tel" placeholder="Phone number" />} />\n  <Cell title="Email" value={<Input type="email" placeholder="Email" />} />\n</CellGroup>',
      desc: t('input.demoDesc.types'),
    },
    {
      title: t('input.demo.clearable'),
      code: '<CellGroup>\n  <Cell title="Clearable" value={<Input clearable placeholder="Type something..." />} />\n  <Cell title="Password" value={<Input type="password" placeholder="Password" showPasswordToggle />} />\n  <Cell title="Default" value={<Input clearable defaultValue="Tap X to clear" />} />\n</CellGroup>',
      desc: t('input.demoDesc.clearable'),
    },
    {
      title: t('input.demo.affix'),
      code: '<CellGroup>\n  <Cell title="Username" value={<Input placeholder="Enter text" prefix={<span style={{color:"#999"}}>@</span>} />} />\n  <Cell title="Email" value={<Input placeholder="example" suffix={<span style={{color:"#999","font-size":"0.85rem"}}>@gmail.com</span>} />} />\n</CellGroup>',
      desc: t('input.demoDesc.affix'),
    },
    {
      title: t('input.demo.count'),
      code: '<CellGroup>\n  <Cell title="Bio" value={<Input showCount maxlength={20} placeholder="Max 20 chars" />} />\n  <Cell title="Sig" value={<Input showCount maxlength={50} placeholder="Your signature" />} />\n</CellGroup>',
      desc: t('input.demoDesc.count'),
    },
    {
      title: t('input.demo.states'),
      code: '<CellGroup>\n  <Cell title="Disabled" value={<Input disabled value="Not editable" />} />\n  <Cell title="Readonly" value={<Input readonly value="Focusable, copyable" />} />\n  <Cell title="Error" value={<Input error value="Invalid format" />} />\n</CellGroup>',
      desc: t('input.demoDesc.states'),
    },
    {
      title: t('input.demo.size'),
      code: '<Input placeholder="Small (sm)" size="sm" />\n<Input placeholder="Medium (md)" size="md" />\n<Input placeholder="Large (lg)" size="lg" />',
      desc: t('input.demoDesc.size'),
    },
    {
      title: t('input.demo.search'),
      code: '<Input placeholder="Search articles" clearable prefix={<Icon name="search" color="#999" />}\n  style={{ "border-radius": "16px", border: "none", padding: "0 16px" }} />',
      desc: t('input.demoDesc.search'),
    },
    {
      title: t('input.demo.sms'),
      code: 'const [countdown, setCountdown] = createSignal(0);\nlet timer: any;\n\nconst send = () => {\n  if (countdown() > 0) return;\n  setCountdown(60);\n  timer = setInterval(() => {\n    setCountdown(c => {\n      if (c <= 1) { clearInterval(timer); return 0; }\n      return c - 1;\n    });\n  }, 1000);\n};\n\nconst btn = () => (\n  <span onClick={send} style={{\n    "font-size": "0.8rem", "white-space": "nowrap",\n    color: countdown() > 0 ? "#999" : "var(--sc-color-primary, #1677ff)",\n    cursor: countdown() > 0 ? "default" : "pointer",\n  }}>\n    {countdown() > 0 ? `${countdown()}s` : "Send Code"}\n  </span>\n);\n\n<CellGroup>\n  <Cell title="Phone" value={<Input type="tel" maxlength={11} placeholder="Enter phone" suffix={btn()} />} />\n</CellGroup>',
      desc: t('input.demoDesc.sms'),
    },
    {
      title: t('input.demo.form'),
      code: '<Form controlAlign="right" onSubmit={(v) => console.log(v)}>\n  <FormItem name="username" label="Username" rules={[{\n    validator: (v) => (v as string)?.length >= 2,\n    message: "At least 2 characters",\n  }]}>\n    <Input placeholder="Enter username" clearable />\n  </FormItem>\n  <FormItem name="email" label="Email">\n    <Input type="email" placeholder="Enter email" clearable />\n  </FormItem>\n  <div style={{ padding: "12px 1rem" }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('input.demoDesc.form'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Input</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('input.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
