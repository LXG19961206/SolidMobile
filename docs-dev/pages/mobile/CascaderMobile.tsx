import { createSignal, Show, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface CascaderMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Cascader } from '../../../src/components/Cascader';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Icon } from '../../../src/components/Icon';
import { Loading } from '../../../src/components/Loading';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from '../../i18n/cascader/zh-CN';
import enUS from '../../i18n/cascader/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import type { CascaderOption } from '../../../src/components/Cascader';

const propsData = [
  { name: 'options', type: 'CascaderOption[]', desc: 'componentProps.cascader.options' },
  { name: 'value', type: '(string | number)[]', desc: 'componentProps.cascader.value' },
  { name: 'onChange', type: '(value) => void', desc: 'componentProps.cascader.onChange' },
  { name: 'title', type: 'string | JSX.Element', desc: 'componentProps.cascader.title' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.cascader.placeholder' },
  { name: 'closeable', type: 'boolean', desc: 'componentProps.cascader.closeable' },
  { name: 'show', type: 'boolean', desc: 'componentProps.cascader.show' },
  { name: 'onUpdateShow', type: '(show) => void', desc: 'componentProps.cascader.onUpdateShow' },
  { name: 'showCheckmark', type: 'boolean', desc: 'componentProps.cascader.showCheckmark' },
  { name: 'checkmark', type: 'JSX.Element', desc: 'componentProps.cascader.checkmark' },
  { name: 'onLoadChildren', type: '(opt) => Promise<CascaderOption[]>', desc: 'componentProps.cascader.onLoadChildren' },
  { name: 'loading', type: 'JSX.Element', desc: 'componentProps.cascader.loading' },
  { name: 'maxHeight', type: 'number | string', desc: 'componentProps.cascader.maxHeight' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

/* ── Data ── */

const regionOptions: CascaderOption[] = [
  { text: 'Beijing', value: 'beijing', children: [
    { text: 'Chaoyang', value: 'chaoyang', children: [
      { text: 'Wangjing', value: 'wangjing' }, { text: 'Sanlitun', value: 'sanlitun' },
      { text: 'Guomao', value: 'guomao' }, { text: 'Shuangjing', value: 'shuangjing' },
    ]},
    { text: 'Haidian', value: 'haidian', children: [
      { text: 'Zhongguancun', value: 'zhongguancun' }, { text: 'Wudaokou', value: 'wudaokou' },
      { text: 'Xierqi', value: 'xierqi' },
    ]},
    { text: 'Xicheng', value: 'xicheng' },
    { text: 'Dongcheng', value: 'dongcheng' },
  ]},
  { text: 'Shanghai', value: 'shanghai', children: [
    { text: 'Pudong', value: 'pudong', children: [
      { text: 'Lujiazui', value: 'lujiazui' }, { text: 'Zhangjiang', value: 'zhangjiang' },
    ]},
    { text: "Jing'an", value: 'jingan' },
    { text: 'Xuhui', value: 'xuhui' },
  ]},
  { text: 'Guangdong', value: 'guangdong', children: [
    { text: 'Shenzhen', value: 'shenzhen', children: [
      { text: 'Nanshan', value: 'nanshan' }, { text: 'Futian', value: 'futian' },
    ]},
    { text: 'Guangzhou', value: 'guangzhou', children: [
      { text: 'Tianhe', value: 'tianhe' }, { text: 'Yuexiu', value: 'yuexiu' },
    ]},
  ]},
  { text: 'Zhejiang', value: 'zhejiang', children: [
    { text: 'Hangzhou', value: 'hangzhou', children: [
      { text: 'Xihu', value: 'xihu' }, { text: 'Yuhang', value: 'yuhang' },
    ]},
    { text: 'Ningbo', value: 'ningbo' },
  ]},
];

export const CascaderMobile: Component<CascaderMobileProps> = (props) => {
  const t = useT();
  /* ── Region Selection ── */
  const [show1, setShow1] = createSignal(false);
  const [val1, setVal1] = createSignal<(string | number)[]>([]);

  /* ── Disabled Options ── */
  const [show2, setShow2] = createSignal(false);
  const [val2, setVal2] = createSignal<(string | number)[]>([]);
  const disabledOpts: CascaderOption[] = [
    { text: 'Beijing', value: 'beijing' },
    { text: 'Shanghai', value: 'shanghai', disabled: true },
    { text: 'Guangdong', value: 'guangdong' },
    { text: 'Zhejiang', value: 'zhejiang' },
    { text: 'Jiangsu', value: 'jiangsu', disabled: true },
  ];

  /* ── Custom Render ── */
  const [show3, setShow3] = createSignal(false);
  const [val3, setVal3] = createSignal<(string | number)[]>([]);
  const renderOpts: CascaderOption[] = [
    { text: 'Beijing', value: 'beijing', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} /> Beijing</span> },
    { text: 'Shanghai', value: 'shanghai', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} /> Shanghai</span> },
    { text: 'Guangdong', value: 'guangdong', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} color="#22c55e" /> Guangdong</span> },
    { text: 'Zhejiang', value: 'zhejiang', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} color="#f59e0b" /> Zhejiang</span> },
  ];

  /* ── Async Load ── */
  const [show4, setShow4] = createSignal(false);
  const [val4, setVal4] = createSignal<(string | number)[]>([]);

  const loadChildren = async (option: CascaderOption): Promise<CascaderOption[]> => {
    await new Promise(r => setTimeout(r, 1000));
    const map: Record<string, CascaderOption[]> = {
      __root__: [
        { text: 'Beijing', value: 'beijing' },
        { text: 'Shanghai', value: 'shanghai' },
        { text: 'Guangdong', value: 'guangdong' },
      ],
      beijing: [
        { text: 'Chaoyang', value: 'chaoyang' },
        { text: 'Haidian', value: 'haidian' },
        { text: 'Dongcheng', value: 'dongcheng' },
      ],
      chaoyang: [
        { text: 'Wangjing', value: 'wangjing', isLeaf: true },
        { text: 'Sanlitun', value: 'sanlitun', isLeaf: true },
        { text: 'Guomao', value: 'guomao', isLeaf: true },
      ],
    };
    return map[String(option.value)] || [];
  };

  return (
    <MobilePreview title="Cascader" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Region Selection */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascaderRegion')}</div>
        <div style={CARD.desc}>{t('demo.cascaderRegionMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Select Region"
              value={val1().length ? val1().join(' / ') : 'Please select'}
              clickable
              onClick={() => setShow1(true)}
            />
          </CellGroup>
          <Cascader
            options={regionOptions}
            show={show1()}
            onUpdateShow={setShow1}
            value={val1()}
            onChange={setVal1}
            title="Select Region"
            closeable
          />
        </div>
      </div>

      {/* Disabled Options */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascaderDisabled')}</div>
        <div style={CARD.desc}>{t('demo.cascaderDisabledMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Partial Disabled"
              value={val2().length ? val2().join(' / ') : 'Please select'}
              clickable
              onClick={() => setShow2(true)}
            />
          </CellGroup>
          <Cascader
            options={disabledOpts}
            show={show2()}
            onUpdateShow={setShow2}
            value={val2()}
            onChange={setVal2}
            title="Cities (Partial Disabled)"
          />
        </div>
      </div>

      {/* Custom Render */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customRender')}</div>
        <div style={CARD.desc}>{t('demo.customRenderDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Select Province"
              value={val3().length ? val3().join(' / ') : 'Please select'}
              clickable
              onClick={() => setShow3(true)}
            />
          </CellGroup>
          <Cascader
            options={renderOpts}
            show={show3()}
            onUpdateShow={setShow3}
            value={val3()}
            onChange={setVal3}
            title="Province (Custom Render)"
            checkmark={<Icon name="check" size={16} color="var(--sc-color-primary, #1677ff)" />}
          />
        </div>
      </div>

      {/* Async Load */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascaderAsync')}</div>
        <div style={CARD.desc}>{t('demo.cascaderAsyncMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Select Region"
              value={val4().length ? val4().join(' → ') : 'Please select'}
              clickable
              onClick={() => setShow4(true)}
            />
          </CellGroup>
          <Cascader
            options={[]}
            onLoadChildren={loadChildren}
            show={show4()}
            onUpdateShow={setShow4}
            value={val4()}
            onChange={setVal4}
            title="Async Load Region"
            closeable
            loading={
              <div style={{ 'text-align': 'center', padding: '32px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
                <Loading size={24} />
                <div style={{ 'margin-top': '8px', 'font-size': '0.8rem' }}>Loading region data...</div>
              </div>
            }
          />
        </div>
      </div>
    </MobilePreview>
  );
};
