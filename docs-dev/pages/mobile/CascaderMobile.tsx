import { createSignal, Show, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CascaderMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Cascader } from '../../../src/components/Cascader';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Icon } from '../../../src/components/Icon';
import { Loading } from '../../../src/components/Loading';
import { useT } from '../../doc-i18n';
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
  { text: '北京', value: 'beijing', children: [
    { text: '朝阳区', value: 'chaoyang', children: [
      { text: '望京街道', value: 'wangjing' }, { text: '三里屯街道', value: 'sanlitun' },
      { text: '国贸', value: 'guomao' }, { text: '双井街道', value: 'shuangjing' },
    ]},
    { text: '海淀区', value: 'haidian', children: [
      { text: '中关村', value: 'zhongguancun' }, { text: '五道口', value: 'wudaokou' },
      { text: '西二旗', value: 'xierqi' },
    ]},
    { text: '西城区', value: 'xicheng' },
    { text: '东城区', value: 'dongcheng' },
  ]},
  { text: '上海', value: 'shanghai', children: [
    { text: '浦东新区', value: 'pudong', children: [
      { text: '陆家嘴', value: 'lujiazui' }, { text: '张江', value: 'zhangjiang' },
    ]},
    { text: '静安区', value: 'jingan' },
    { text: '徐汇区', value: 'xuhui' },
  ]},
  { text: '广东', value: 'guangdong', children: [
    { text: '深圳', value: 'shenzhen', children: [
      { text: '南山区', value: 'nanshan' }, { text: '福田区', value: 'futian' },
    ]},
    { text: '广州', value: 'guangzhou', children: [
      { text: '天河区', value: 'tianhe' }, { text: '越秀区', value: 'yuexiu' },
    ]},
  ]},
  { text: '浙江', value: 'zhejiang', children: [
    { text: '杭州', value: 'hangzhou', children: [
      { text: '西湖区', value: 'xihu' }, { text: '余杭区', value: 'yuhang' },
    ]},
    { text: '宁波', value: 'ningbo' },
  ]},
];

export const CascaderMobile: Component<CascaderMobileProps> = (props) => {
  const t = useT();
  /* ── 地区选择 ── */
  const [show1, setShow1] = createSignal(false);
  const [val1, setVal1] = createSignal<(string | number)[]>([]);

  /* ── 禁用选项 ── */
  const [show2, setShow2] = createSignal(false);
  const [val2, setVal2] = createSignal<(string | number)[]>([]);
  const disabledOpts: CascaderOption[] = [
    { text: '北京', value: 'beijing' },
    { text: '上海', value: 'shanghai', disabled: true },
    { text: '广东', value: 'guangdong' },
    { text: '浙江', value: 'zhejiang' },
    { text: '江苏', value: 'jiangsu', disabled: true },
  ];

  /* ── 自定义渲染 ── */
  const [show3, setShow3] = createSignal(false);
  const [val3, setVal3] = createSignal<(string | number)[]>([]);
  const renderOpts: CascaderOption[] = [
    { text: '北京', value: 'beijing', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} /> 北京</span> },
    { text: '上海', value: 'shanghai', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} /> 上海</span> },
    { text: '广东', value: 'guangdong', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} color="#22c55e" /> 广东</span> },
    { text: '浙江', value: 'zhejiang', render: <span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}><Icon name="map-pin" size={16} color="#f59e0b" /> 浙江</span> },
  ];

  /* ── 异步加载 ── */
  const [show4, setShow4] = createSignal(false);
  const [val4, setVal4] = createSignal<(string | number)[]>([]);

  const loadChildren = async (option: CascaderOption): Promise<CascaderOption[]> => {
    await new Promise(r => setTimeout(r, 1000));
    const map: Record<string, CascaderOption[]> = {
      __root__: [
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广东', value: 'guangdong' },
      ],
      beijing: [
        { text: '朝阳区', value: 'chaoyang' },
        { text: '海淀区', value: 'haidian' },
        { text: '东城区', value: 'dongcheng' },
      ],
      chaoyang: [
        { text: '望京街道', value: 'wangjing', isLeaf: true },
        { text: '三里屯街道', value: 'sanlitun', isLeaf: true },
        { text: '国贸', value: 'guomao', isLeaf: true },
      ],
    };
    return map[String(option.value)] || [];
  };

  return (
    <MobilePreview title="Cascader 级联选择" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 地区选择 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascaderRegion')}</div>
        <div style={CARD.desc}>{t('demo.cascaderRegionMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title={t('demo.selectRegion')}
              value={val1().length ? val1().join(' / ') : t('demo.pleaseSelect')}
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
            title={t('demo.selectRegion')}
            closeable
          />
        </div>
      </div>

      {/* 禁用选项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascaderDisabled')}</div>
        <div style={CARD.desc}>{t('demo.cascaderDisabledMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title={t('demo.partialDisabled')}
              value={val2().length ? val2().join(' / ') : t('demo.pleaseSelect')}
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
            title={t('demo.cityPartialDisabled')}
          />
        </div>
      </div>

      {/* 自定义渲染 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customRender')}</div>
        <div style={CARD.desc}>{t('demo.customRenderDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title={t('demo.selectProvince')}
              value={val3().length ? val3().join(' / ') : t('demo.pleaseSelect')}
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
            title={t('demo.provinceCustomRender')}
            checkmark={<Icon name="check" size={16} color="var(--sc-color-primary, #1677ff)" />}
          />
        </div>
      </div>

      {/* 异步加载 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascaderAsync')}</div>
        <div style={CARD.desc}>{t('demo.cascaderAsyncMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title={t('demo.selectRegion')}
              value={val4().length ? val4().join(' → ') : t('demo.pleaseSelect')}
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
            title={t('demo.asyncLoadRegion')}
            closeable
            loading={
              <div style={{ 'text-align': 'center', padding: '32px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
                <Loading size={24} />
                <div style={{ 'margin-top': '8px', 'font-size': '0.8rem' }}>{t('demo.loadingRegionData')}</div>
              </div>
            }
          />
        </div>
      </div>
    </MobilePreview>
  );
};
