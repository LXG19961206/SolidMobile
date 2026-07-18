import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Tooltip } from '../../../src/components/Tooltip';
import { Button } from '../../../src/components/Button';
import { Card } from '../../../src/components/Card';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Icon } from '../../../src/components/Icon';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTooltipTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const TooltipMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useTooltipTableData();
  const [controlled, setControlled] = createSignal(false);

  return (
    <MobilePreview title="Tooltip">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <style>{'.sc-cell-cells .sc-tooltip-trigger { display:flex; } .sc-cell-cells .sc-tooltip-trigger .sc-cell-cell { width:100%; border-bottom:1px solid var(--sc-color-border,#ebedf0); } .sc-cell-cells .sc-tooltip-trigger:last-child .sc-cell-cell { border-bottom:none; }'}</style>

      <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px', 'padding-top': '12px' }}>
        {/* Basic — hover over the cell to see tooltip */}
        <CellGroup card>
          <Tooltip content="Hello! This is a tooltip.">
            <Cell title={t('tooltip.demo.basic')} description="Hover over this row to see the tooltip" />
          </Tooltip>
        </CellGroup>

        {/* Placements */}
        <CellGroup card>
          <Tooltip content="Tooltip on top" placement="top" delay={0} offset={12}>
            <Cell title={t('tooltip.demo.placement')} description="placement=&quot;top&quot; — tooltip appears above" />
          </Tooltip>
          <Tooltip content="Tooltip on bottom" placement="bottom" delay={0} offset={12}>
            <Cell title={t('tooltip.demo.placement')} description="placement=&quot;bottom&quot; — tooltip appears below" />
          </Tooltip>
        </CellGroup>

        {/* Click & Closeable */}
        <CellGroup card>
          <Tooltip content="Copied!" trigger="click">
            <Cell title={t('tooltip.demo.trigger')} description="Click this row to toggle tooltip" />
          </Tooltip>
          <Tooltip content="Tap ✕ to dismiss" trigger="click" closeable delay={0}>
            <Cell title={t('tooltip.demo.closeable')} description="Tooltip with close button, tap ✕ to dismiss" />
          </Tooltip>
        </CellGroup>

        {/* Custom Content */}
        <CellGroup card>
          <Tooltip content={<span style={{ display: 'inline-flex', 'align-items': 'center', gap: '4px' }}><Icon name="information" size={14} /> This action cannot be undone</span>}>
            <Cell title={t('tooltip.demo.custom')} description="Tooltip supports JSX with icons and rich formatting" />
          </Tooltip>
        </CellGroup>

        {/* Delay */}
        <CellGroup card>
          <Tooltip content="500ms to appear..." delay={{ show: 500, hide: 200 }}>
            <Cell title={t('tooltip.demo.delay')} description="Hover and hold — tooltip appears after 500ms delay" />
          </Tooltip>
        </CellGroup>

        {/* Controlled */}
        <CellGroup card>
          <Tooltip content="Controlled by external state" trigger="manual" open={controlled()} onOpenChange={setControlled}>
            <Cell
              title={t('tooltip.demo.controlled')}
              description='trigger="manual" — click to toggle'
              value={<Button size="sm" variant="outline" onClick={() => setControlled(v => !v)}>{controlled() ? 'Hide' : 'Show'}</Button>}
            />
          </Tooltip>
        </CellGroup>
      </div>
    </MobilePreview>
  );
};
