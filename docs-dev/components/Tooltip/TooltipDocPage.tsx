import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTooltipTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const TooltipDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useTooltipTableData();

  const demos: DemoCode[] = [
    {
      title: t('tooltip.demo.basic'),
      code: '<Tooltip content="Hello! This is a tooltip.">\n  <Button>Hover me</Button>\n</Tooltip>',
      desc: t('tooltip.demoDesc.basic'),
    },
    {
      title: t('tooltip.demo.placement'),
      code: '<Tooltip content="Top" placement="top">\n  <Button>Top</Button>\n</Tooltip>\n<Tooltip content="Bottom" placement="bottom">\n  <Button>Bottom</Button>\n</Tooltip>\n<Tooltip content="Left" placement="left">\n  <Button>Left</Button>\n</Tooltip>\n<Tooltip content="Right" placement="right">\n  <Button>Right</Button>\n</Tooltip>',
      desc: t('tooltip.demoDesc.placement'),
    },
    {
      title: t('tooltip.demo.trigger'),
      code: '<Tooltip content="Copied!" trigger="click">\n  <Button>Copy</Button>\n</Tooltip>',
      desc: t('tooltip.demoDesc.trigger'),
    },
    {
      title: t('tooltip.demo.custom'),
      code: '<Tooltip content={<span>⚠️ This action cannot be undone</span>}>\n  <Button type="danger">Delete</Button>\n</Tooltip>',
      desc: t('tooltip.demoDesc.custom'),
    },
    {
      title: t('tooltip.demo.closeable'),
      code: '<Tooltip content="Tap ✕ to dismiss" trigger="click" closeable>\n  <Button>Click me</Button>\n</Tooltip>',
      desc: t('tooltip.demoDesc.closeable'),
    },
    {
      title: t('tooltip.demo.delay'),
      code: '<Tooltip content="500ms to appear..." delay={{ show: 500, hide: 200 }}>\n  <Button>Slow</Button>\n</Tooltip>',
      desc: t('tooltip.demoDesc.delay'),
    },
    {
      title: t('tooltip.demo.controlled'),
      code: 'const [open, setOpen] = createSignal(false);\n\n<Button onClick={() => setOpen(v => !v)}>\n  {open() ? "Hide" : "Show"}\n</Button>\n\n<Tooltip\n  content="Controlled by external state"\n  trigger="manual"\n  open={open()}\n  onOpenChange={setOpen}\n>\n  <Button>Trigger</Button>\n</Tooltip>',
      desc: t('tooltip.demoDesc.controlled'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Tooltip</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('tooltip.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
