import { Tooltip } from '../../../../src/components/Tooltip';
import { Button } from '../../../../src/components/Button';
import { Icon } from '../../../../src/components/Icon';
import { createSignal } from 'solid-js';

import zhCN from '../../../i18n/tooltip/zh-CN';
import enUS from '../../../i18n/tooltip/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import styles from './TooltipDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'content', type: 'JSX.Element', default: '—', required: true, desc: 'componentProps.tooltip.content' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", required: false, desc: 'componentProps.tooltip.placement' },
  { name: 'trigger', type: "'hover' | 'click' | 'focus' | 'manual'", default: "'hover'", required: false, desc: 'componentProps.tooltip.trigger' },
  { name: 'open', type: 'boolean', default: '—', required: false, desc: 'componentProps.tooltip.open' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tooltip.defaultOpen' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', required: false, desc: 'componentProps.tooltip.onOpenChange' },
  { name: 'showArrow', type: 'boolean', default: 'true', required: false, desc: 'componentProps.tooltip.showArrow' },
  { name: 'delay', type: 'number | { show?: number; hide?: number }', default: '200', required: false, desc: 'componentProps.tooltip.delay' },
  { name: 'arrowSize', type: 'number', default: '5', required: false, desc: 'componentProps.tooltip.arrowSize' },
  { name: 'offset', type: 'number', default: '6', required: false, desc: 'componentProps.tooltip.offset' },
  { name: 'maxWidth', type: 'number | string', default: '—', required: false, desc: 'componentProps.tooltip.maxWidth' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tooltip.closeable' },
  { name: 'teleport', type: 'Node | string', default: 'document.body', required: false, desc: 'componentProps.tooltip.teleport' },
  { name: 'zIndex', type: 'number', default: '1000', required: false, desc: 'componentProps.tooltip.zIndex' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.tooltip.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.tooltip.style' },
];

const cssVarsData: PropRow[] = [
  { name: '--sc-tooltip-bg', type: 'color', default: '#1f2937', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_bg' },
  { name: '--sc-tooltip-color', type: 'color', default: '#fff', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_color' },
  { name: '--sc-tooltip-font-size', type: 'length', default: '0.8rem', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_font_size' },
  { name: '--sc-tooltip-padding', type: 'length', default: '6px 10px', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_padding' },
  { name: '--sc-tooltip-radius', type: 'length', default: '6px', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_radius' },
  { name: '--sc-tooltip-max-width', type: 'length', default: '240px', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_max_width' },
  { name: '--sc-tooltip-arrow-size', type: 'length', default: '5px', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_arrow_size' },
  { name: '--sc-tooltip-z-index', type: 'number', default: '1000', required: false, desc: 'cssVars.Tooltip.__sc_tooltip_z_index' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'css-vars', title: 'CSS Variables' },
  { id: 'basic', title: 'Basic Usage' },
];

export const TooltipDocPage = () => {
  const t = useT();
  const [controlledOpen, setControlledOpen] = createSignal(false);

  return (
    <DocLayout>
      <div class={styles.page}>
        <h1 class={styles.h1}>Tooltip</h1>
        <p class={styles.intro}>
          {t('componentIntro.TooltipIntro')}
        </p>

        {/* Props */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* CSS Variables */}
        <h2 id="css-vars" class={styles.h2}>{t('common.cssVars')}</h2>
        <PropsTable rows={cssVarsData} />

        {/* Basic Usage */}
        <h2 id="basic" class={styles.h2}>{t('section.tooltipBasic')}</h2>

        <DemoBlock
          title={t('demo.tooltipBasic')}
          desc={t('demoDesc.tooltip_basic')}
          code={`<Tooltip content="Hello! This is a tooltip.">\n  <Button>Hover me</Button>\n</Tooltip>`}
        >
          <div class={styles.row}>
            <Tooltip content="Hello! This is a tooltip.">
              <Button>Hover me</Button>
            </Tooltip>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.tooltipPlacement')}
          desc={t('demoDesc.tooltip_placement')}
          code={`<Tooltip content="Top" placement="top">\n  <Button>Top</Button>\n</Tooltip>\n<Tooltip content="Bottom" placement="bottom">\n  <Button>Bottom</Button>\n</Tooltip>\n<Tooltip content="Left" placement="left">\n  <Button>Left</Button>\n</Tooltip>\n<Tooltip content="Right" placement="right">\n  <Button>Right</Button>\n</Tooltip>`}
        >
          <div class={styles.row}>
            <Tooltip content="Top" placement="top" delay={0} offset={12}><Button size="sm">Top</Button></Tooltip>
            <Tooltip content="Bottom" placement="bottom" delay={0} offset={12}><Button size="sm">Bottom</Button></Tooltip>
            <Tooltip content="Left" placement="left" delay={0} offset={12}><Button size="sm">Left</Button></Tooltip>
            <Tooltip content="Right" placement="right" delay={0} offset={12}><Button size="sm">Right</Button></Tooltip>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.tooltipClick')}
          desc={t('demoDesc.tooltip_click')}
          code={`<Tooltip content="Copied!" trigger="click" delay={0}>\n  <Button>Copy</Button>\n</Tooltip>`}
        >
          <div class={styles.row}>
            <Tooltip content="Copied!" trigger="click" delay={0}>
              <Button size="sm">Copy</Button>
            </Tooltip>
          </div>
        </DemoBlock>

        <DemoBlock
          title="Closeable"
          desc="closeable — adds an ✕ button for mobile click scenarios."
          code={`<Tooltip content="Tap the ✕ to dismiss" trigger="click" closeable delay={0}>\n  <Button>Click me</Button>\n</Tooltip>`}
        >
          <div class={styles.row}>
            <Tooltip content="Tap the ✕ to dismiss" trigger="click" closeable delay={0}>
              <Button size="sm">Click me</Button>
            </Tooltip>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.tooltipCustomContent')}
          desc={t('demoDesc.tooltip_custom_content')}
          code={`<Tooltip content={<><Icon name="information" size={14} /> This action cannot be undone</>}>\n  <Button variant="outline" type="danger">Delete</Button>\n</Tooltip>`}
        >
          <div class={styles.row}>
            <Tooltip content={<span style="display:inline-flex;align-items:center;gap:4px"><Icon name="information" size={14} /> This action cannot be undone</span>}>
              <Button variant="outline" type="danger" size="sm">Delete</Button>
            </Tooltip>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.tooltipDelay')}
          desc={t('demoDesc.tooltip_delay')}
          code={`<Tooltip content="I took 500ms to appear..." delay={{ show: 500, hide: 200 }}>\n  <Button>Slow tooltip</Button>\n</Tooltip>`}
        >
          <div class={styles.row}>
            <Tooltip content="I took 500ms to appear..." delay={{ show: 500, hide: 200 }}>
              <Button size="sm">Slow tooltip</Button>
            </Tooltip>
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.tooltipControlled')}
          desc={t('demoDesc.tooltip_controlled')}
          code={`const [open, setOpen] = createSignal(false);\n\n<button onClick={() => setOpen(v => !v)}>\n  {open() ? 'Hide' : 'Show'} Tooltip\n</button>\n\n<Tooltip\n  content="Controlled by external state"\n  trigger="manual"\n  open={open()}\n  onOpenChange={setOpen}\n>\n  <Button>Hover trigger</Button>\n</Tooltip>`}
        >
          <div style="display:flex;align-items:center;gap:12px">
            <button
              onClick={() => setControlledOpen(v => !v)}
              style="padding:4px 12px;font-size:0.8rem;cursor:pointer;border:1px solid #d1d5db;border-radius:4px;background:#fff;color:#374151"
            >
              {controlledOpen() ? 'Hide' : 'Show'} Tooltip
            </button>
            <Tooltip
              content="Controlled by external state"
              trigger="manual"
              open={controlledOpen()}
              onOpenChange={setControlledOpen}
            >
              <Button size="sm">Hover trigger</Button>
            </Tooltip>
          </div>
        </DemoBlock>

      </div>
    </DocLayout>
  );
};
