import { createSignal, For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { TreeSelect } from '../../../src/components/TreeSelect';
import type { TreeSelectOption } from '../../../src/components/TreeSelect';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTreeSelectTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const opts: TreeSelectOption[] = [
  { label: '华东', value: 'east', children: [
    { label: '上海', value: 'sh' },
    { label: '浙江', value: 'zj' },
    { label: '江苏', value: 'js' },
  ]},
  { label: '华南', value: 'south', children: [
    { label: '广东', value: 'gd' },
    { label: '深圳', value: 'sz' },
  ]},
  { label: '华北', value: 'north', children: [
    { label: '北京', value: 'bj' },
    { label: '天津', value: 'tj' },
  ]},
];

export const TreeSelectMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useTreeSelectTableData();
  const [v1, setV1] = createSignal<(string | number)[]>([]);
  const [v2, setV2] = createSignal<(string | number)[]>([]);
  const [v3, setV3] = createSignal<(string | number)[]>([]);

  return (
    <MobilePreview title="TreeSelect">
      <div class="doc-wip-banner" style="margin: 0 12px;">
        <span class="doc-wip-icon">&#x26a0;</span>
        <span>{t('treeselect.wipBanner')}</span>
      </div>
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('treeselect.demo.basic')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v1().length > 0 ? `Selected: ${v1().join(', ')}` : 'Tap to select'}
          </div>
          <TreeSelect options={opts} value={v1()} onChange={setV1} placeholder="Select regions" searchable={true} searchMode="global" />
        </Card>

        <Card title={t('treeselect.demo.maxLimit')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            Max 3 — {v2().length > 0 ? `${v2().join(', ')}` : 'undefined'}
          </div>
          <TreeSelect options={opts} value={v2()} onChange={setV2} max={3} placeholder="Max 3" />
        </Card>

        <Card title={t('treeselect.demo.modeExpand')}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ 'margin-bottom': '6px', 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-align': 'center' }}>
                select (click to select)
              </div>
              <TreeSelect options={opts} value={v1()} onChange={setV1} placeholder="Select mode" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ 'margin-bottom': '6px', 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-align': 'center' }}>
                expand (click to expand)
              </div>
              <TreeSelect options={opts} mode="expand" value={v3()} onChange={setV3} placeholder="Expand mode" />
            </div>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
