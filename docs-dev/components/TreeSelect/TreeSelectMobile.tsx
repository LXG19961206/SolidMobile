import { createSignal, For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Button } from '../../../src/components/Button';
import { TreeSelect } from '../../../src/components/TreeSelect';
import type { TreeSelectOption } from '../../../src/components/TreeSelect';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTreeSelectTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const opts: TreeSelectOption[] = [
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
    { label: 'Jiangsu', value: 'js' },
  ]},
  { label: 'South', value: 'south', children: [
    { label: 'Guangdong', value: 'gd' },
    { label: 'Shenzhen', value: 'sz' },
  ]},
  { label: 'North', value: 'north', children: [
    { label: 'Beijing', value: 'bj' },
    { label: 'Tianjin', value: 'tj' },
  ]},
];

const asyncOpts: TreeSelectOption[] = [
  { label: 'Region', value: 'region' },
  { label: 'City', value: 'city' },
];

// 30 regions × 60 cities = 1,800 options
const bigOpts: TreeSelectOption[] = Array.from({ length: 30 }, (_, i) => ({
  label: `Region ${String.fromCharCode(65 + i)}`,
  value: `r${i}`,
  children: Array.from({ length: 60 }, (_, j) => ({
    label: `City ${String.fromCharCode(65 + i)}-${j + 1}`,
    value: `c${i}-${j + 1}`,
  })),
}));

export const TreeSelectMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useTreeSelectTableData();
  const [v1, setV1] = createSignal<(string | number)[]>([]);
  const [v2, setV2] = createSignal<(string | number)[]>([]);
  const [v3, setV3] = createSignal<(string | number)[]>([]);
  const [v4, setV4] = createSignal<(string | number)[]>([]);
  const [v5, setV5] = createSignal<(string | number)[]>([]);
  const [v6, setV6] = createSignal<(string | number)[]>([]);
  const [v7, setV7] = createSignal<(string | number)[]>([]);
  const [v8, setV8] = createSignal<(string | number)[]>([]);
  const [v9, setV9] = createSignal<(string | number)[]>([]);
  let treeRef: any;
  const loadChildren = (node: TreeSelectOption) =>
    new Promise<TreeSelectOption[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { label: `${node.label}-A`, value: `${node.value}-a` },
          { label: `${node.label}-B`, value: `${node.value}-b` },
        ]);
      }, 800);
    });

  return (
    <MobilePreview title="TreeSelect">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('treeselect.demo.basic')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v1().length > 0 ? `Selected: ${v1().join(', ')}` : 'Tap to select'}
          </div>
          <TreeSelect options={opts} value={v1()} onChange={setV1} placeholder="Select regions" searchable={true} searchMode="global" swipeable />
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
              <TreeSelect options={opts} mode="expand" value={v3()} onChange={setV3} placeholder="Expand mode" swipeable />
            </div>
          </div>
        </Card>

        <Card title={t('treeselect.demo.customRender')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v5().length > 0 ? `Selected: ${v5().join(', ')}` : 'Tap a row to select, › to open'}
          </div>
          <TreeSelect
            options={opts}
            value={v5()}
            onChange={setV5}
            placeholder="Custom render"
            renderItem={(node, selected, expand, toggle) => (
              <div
                onClick={() => toggle?.()}
                style={{
                  display: 'flex',
                  'align-items': 'center',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  background: selected ? 'var(--sc-color-primary-pale, #eef4ff)' : 'transparent',
                }}
              >
                <span style={{ flex: 1 }}>{selected ? '✓ ' : ''}{node.label}</span>
                {node.children ? (
                  <span
                    onClick={(e) => { e.stopPropagation(); expand(); }}
                    style={{ padding: '4px 12px', background: '#eee', 'border-radius': '4px', cursor: 'pointer' }}
                  >›</span>
                ) : null}
              </div>
            )}
          />
        </Card>

        <Card title={t('treeselect.demo.asyncLoad')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v4().length > 0 ? `Selected: ${v4().join(', ')}` : 'Expand a node to lazy-load children'}
          </div>
          <TreeSelect options={asyncOpts} value={v4()} onChange={setV4} onLoadChildren={loadChildren} placeholder="Lazy load" swipeable />
        </Card>

        <Card title={t('treeselect.demo.bigData')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v6().length > 0 ? `Selected: ${v6().join(', ')}` : '1,800 options — type in the search box'}
          </div>
          <TreeSelect
            options={bigOpts}
            value={v6()}
            onChange={setV6}
            searchable
            searchMode="global"
            placeholder="Type to search 1,800 options"
          />
        </Card>

        <Card title={t('treeselect.demo.checkStrictly')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v8().length > 0 ? `Selected: ${v8().join(', ')}` : 'Check a parent to select it itself'}
          </div>
          <TreeSelect
            options={opts}
            value={v8()}
            onChange={setV8}
            checkStrictly
            placeholder="Strict mode"
          />
        </Card>

        <Card title={t('treeselect.demo.trigger')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v7().length > 0 ? `Selected: ${v7().join(', ')}` : 'Clearable + custom format'}
          </div>
          <TreeSelect
            options={opts}
            value={v7()}
            onChange={setV7}
            clearable
            format={(values) => `${values.length} selected`}
            placeholder="Tap to pick"
          />
        </Card>

        <Card title={t('treeselect.demo.ref')}>
          <div style={{ 'margin-bottom': '8px', 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
            {v9().length > 0 ? `Selected: ${v9().join(', ')}` : 'Drive it via the buttons below'}
          </div>
          <TreeSelect
            options={opts}
            ref={(r) => (treeRef = r)}
            value={v9()}
            onChange={setV9}
            placeholder="Pick regions"
          />
          <div style={{ display: 'flex', gap: '8px', 'margin-top': '10px' }}>
            <Button size="sm" type="primary" onClick={() => treeRef?.open()}>
              Open
            </Button>
            <Button size="sm" onClick={() => treeRef?.clear()}>
              Clear
            </Button>
            <Button size="sm" onClick={() => treeRef?.setValue(['zj'])}>
              Pick Zhejiang
            </Button>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
