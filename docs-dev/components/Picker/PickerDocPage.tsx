import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { usePickerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const PickerDocPage = () => {
  const t = useT();
  const { propsTables, optionTables, cssVarsTables } = usePickerTableData();

  const demos: DemoCode[] = [
    {
      title: t('picker.demo.city'),
      code: 'const [open, setOpen] = createSignal("");\nconst [label, setLabel] = createSignal("Select");\n\n<CellGroup card>\n  <Cell title="City" value={label()} clickable\n    onClick={() => setOpen("city")} />\n</CellGroup>\n\n<Picker\n  show={open() === "city"}\n  onUpdateShow={(v) => { if (!v) setOpen(""); }}\n  onConfirm={(items, vals) => setLabel(vals.join(" / "))}\n  title="City"\n  columns={cityTree}\n/>',
      desc: t('picker.demoDesc.city'),
    },
    {
      title: t('picker.demo.date'),
      code: 'const dateCols = [\n  [{ text: "2024", value: 2024 }, { text: "2025", value: 2025 }],\n  [{ text: "Jan", value: 1 }, { text: "Feb", value: 2 }],\n];\n\n<CellGroup card>\n  <Cell title="Date" value={label()} clickable\n    onClick={() => setOpen("date")} />\n</CellGroup>\n\n<Picker\n  show={open() === "date"}\n  onUpdateShow={(v) => { if (!v) setOpen(""); }}\n  onConfirm={(items, vals) => setLabel(vals.join(" / "))}\n  title="Date"\n  columns={dateCols}\n/>',
      desc: t('picker.demoDesc.date'),
    },
    {
      title: t('picker.demo.time'),
      code: 'const timeCols = [\n  hours.map(h => ({ text: h, value: h })),\n  mins.map(m => ({ text: m, value: m })),\n];\n\n<CellGroup card>\n  <Cell title="Time" value={label()} clickable\n    onClick={() => setOpen("time")} />\n</CellGroup>\n\n<Picker\n  show={open() === "time"}\n  onUpdateShow={(v) => { if (!v) setOpen(""); }}\n  onConfirm={(items, vals) => setLabel(vals.map(String).join(":"))}\n  title="Time"\n  columns={timeCols}\n/>',
      desc: t('picker.demoDesc.time'),
    },
    {
      title: t('picker.demo.disabled'),
      code: 'const cols = [\n  { text: "A", value: 1 },\n  { text: "B", value: 2, disabled: true },\n  { text: "C", value: 3 },\n];\n\n<CellGroup card>\n  <Cell title="Options" value={label()} clickable\n    onClick={() => setOpen("d")} />\n</CellGroup>\n\n<Picker show={open() === "d"} onUpdateShow={(v) => { if (!v) setOpen(""); }}\n  onConfirm={(items, vals) => setLabel(vals.join(", "))}\n  columns={[cols]} />',
      desc: t('picker.demoDesc.disabled'),
    },
    {
      title: t('picker.demo.controlled'),
      code: '<CellGroup card>\n  <Cell title="City" value="Beijing / Haidian" clickable\n    onClick={() => setOpen("c")} />\n</CellGroup>\n\n{/* Preset value via value prop */}\n<Picker\n  show={open() === "c"}\n  onUpdateShow={(v) => { if (!v) setOpen(""); }}\n  value={["bj", "hd"]}\n  columns={cityTree}\n/>',
      desc: t('picker.demoDesc.controlled'),
    },
    {
      title: t('picker.renderDemo'),
      code: 'const cols = [\n  { text: "", value: "solid",\n    render: <span>◈ SolidJS</span> },\n  { text: "", value: "react",\n    render: <span>◇ React</span> },\n];\n\n<CellGroup card>\n  <Cell title="Framework" value={label()} clickable\n    onClick={() => setOpen("r")} />\n</CellGroup>\n\n<Picker show={open() === "r"} onUpdateShow={(v) => { if (!v) setOpen(""); }}\n  onConfirm={(items, vals) => setLabel(vals.join(", "))}\n  title="Framework" columns={[cols]} />',
      desc: t('picker.renderDesc'),
    },
    {
      title: t('picker.inertia'),
      code: '<CellGroup card>\n  <Cell title="ratio=0.3 slow" value={label()} clickable\n    onClick={() => setOpen("i")} />\n</CellGroup>\n\n<Picker\n  show={open() === "i"}\n  onUpdateShow={(v) => { if (!v) setOpen(""); }}\n  onConfirm={(items, vals) => setLabel(vals.map(String).join(":"))}\n  ratio={0.3}\n  swipeDuration={2}\n  columns={timeCols}\n/>',
      desc: t('picker.inertiaDesc'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Picker</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('picker.intro')}</p>

        <PropsAttrs propsTables={[...propsTables, ...optionTables]} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
