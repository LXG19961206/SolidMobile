import { createSignal, type Component } from 'solid-js';


import zhCN from '../../i18n/tooltip/zh-CN';
import enUS from '../../i18n/tooltip/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { Tooltip } from '../../../src/components/Tooltip';
import { Button } from '../../../src/components/Button';
import { Icon } from '../../../src/components/Icon';

export interface TooltipMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'content', type: 'JSX.Element', desc: 'componentProps.tooltip.content' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", desc: 'componentProps.tooltip.placement' },
  { name: 'trigger', type: "'hover' | 'click' | 'focus' | 'manual'", desc: 'componentProps.tooltip.trigger' },
  { name: 'open', type: 'boolean', desc: 'componentProps.tooltip.open' },
  { name: 'defaultOpen', type: 'boolean', desc: 'componentProps.tooltip.defaultOpen' },
  { name: 'onOpenChange', type: '(open: boolean) => void', desc: 'componentProps.tooltip.onOpenChange' },
  { name: 'showArrow', type: 'boolean', desc: 'componentProps.tooltip.showArrow' },
  { name: 'delay', type: 'number | { show, hide }', desc: 'componentProps.tooltip.delay' },
  { name: 'arrowSize', type: 'number', desc: 'componentProps.tooltip.arrowSize' },
  { name: 'offset', type: 'number', desc: 'componentProps.tooltip.offset' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '12px 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

export const TooltipMobile: Component<TooltipMobileProps> = (props) => {
  const t = useT();
  const [controlled, setControlled] = createSignal(false);
  return (
    <MobilePreview title="Tooltip" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Basic Hover */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tooltipBasic')}</div>
        <div style={CARD.desc}>{t('demoDesc.tooltip_basic')}</div>
        <div style={CARD.body}>
          <Tooltip content="Hello! This is a tooltip.">
            <Button size="sm">Hover me</Button>
          </Tooltip>
        </div>
      </div>

      {/* Placements */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tooltipPlacement')}</div>
        <div style={CARD.desc}>{t('demoDesc.tooltip_placement')}</div>
        <div style={CARD.body}>
          <Tooltip content="Top" placement="top" delay={0} offset={12}><Button size="sm">Top</Button></Tooltip>
          <Tooltip content="Bottom" placement="bottom" delay={0} offset={12}><Button size="sm">Bottom</Button></Tooltip>
          <Tooltip content="Left" placement="left" delay={0} offset={12}><Button size="sm">Left</Button></Tooltip>
          <Tooltip content="Right" placement="right" delay={0} offset={12}><Button size="sm">Right</Button></Tooltip>
        </div>
      </div>

      {/* Click Trigger */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tooltipClick')}</div>
        <div style={CARD.desc}>{t('demoDesc.tooltip_click')}</div>
        <div style={CARD.body}>
          <Tooltip content="Copied!" trigger="click">
            <Button size="sm">Copy</Button>
          </Tooltip>
        </div>
      </div>

      {/* Closeable */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>Closeable</div>
        <div style={CARD.desc}>closeable shows an ✕ button. Recommended for mobile click scenarios.</div>
        <div style={CARD.body}>
          <Tooltip content="Tap ✕ to dismiss" trigger="click" closeable delay={0}>
            <Button size="sm">Click me</Button>
          </Tooltip>
        </div>
      </div>

      {/* JSX Content */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tooltipCustomContent')}</div>
        <div style={CARD.desc}>{t('demoDesc.tooltip_custom_content')}</div>
        <div style={CARD.body}>
          <Tooltip content={<span style="display:inline-flex;align-items:center;gap:4px"><Icon name="information" size={14} /> Cannot undo</span>}>
            <Button variant="outline" type="danger" size="sm">Delete</Button>
          </Tooltip>
        </div>
      </div>

      {/* Delay */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tooltipDelay')}</div>
        <div style={CARD.desc}>{t('demoDesc.tooltip_delay')}</div>
        <div style={CARD.body}>
          <Tooltip content="500ms to show..." delay={{ show: 500, hide: 200 }}>
            <Button size="sm">Slow tooltip</Button>
          </Tooltip>
        </div>
      </div>

      {/* Controlled */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tooltipControlled')}</div>
        <div style={CARD.desc}>{t('demoDesc.tooltip_controlled')}</div>
        <div style={{ ...CARD.body, gap: '12px' }}>
          <button
            onClick={() => setControlled(v => !v)}
            style="padding:6px 14px;font-size:0.85rem;cursor:pointer;border:1px solid #d1d5db;border-radius:6px;background:#fff;color:#374151"
          >
            {controlled() ? 'Hide' : 'Show'} Tooltip
          </button>
          <Tooltip
            content="Controlled by external state"
            trigger="manual"
            open={controlled()}
            onOpenChange={setControlled}
          >
            <Button size="sm">Hover trigger</Button>
          </Tooltip>
        </div>
      </div>
    </MobilePreview>
  );
};
