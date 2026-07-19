import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Cascader } from '../../../src/components/Cascader';
import type { CascaderOption } from '../../../src/components/Cascader';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Icon } from '../../../src/components/Icon';
import { Loading } from '../../../src/components/Loading';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCascaderTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

/* ── Region data ── */
const regionOptions: CascaderOption[] = [
  { text: 'Beijing', value: 'bj', children: [
    { text: 'Chaoyang', value: 'cy', children: [
      { text: 'Wangjing', value: 'wj' }, { text: 'Sanlitun', value: 'slt' },
      { text: 'Guomao', value: 'gm' }, { text: 'Shuangjing', value: 'sj' },
      { text: 'Jinsong', value: 'js' }, { text: 'Panjiayuan', value: 'pjy' },
    ]},
    { text: 'Haidian', value: 'hd', children: [
      { text: 'Zhongguancun', value: 'zgc' }, { text: 'Wudaokou', value: 'wdk' },
      { text: 'Xi Erqi', value: 'xeq' }, { text: 'Shangdi', value: 'shd' },
    ]},
    { text: 'Xicheng', value: 'xc', children: [
      { text: 'Financial Street', value: 'jrxj' }, { text: 'Xidan', value: 'xd' },
    ]},
    { text: 'Dongcheng', value: 'dc' },
    { text: 'Fengtai', value: 'ft' },
  ]},
  { text: 'Shanghai', value: 'sh', children: [
    { text: 'Pudong', value: 'pd', children: [
      { text: 'Lujiazui', value: 'ljz' }, { text: 'Zhangjiang', value: 'zj' },
      { text: 'Jinqiao', value: 'jq' },
    ]},
    { text: "Jing'an", value: 'ja' },
    { text: 'Xuhui', value: 'xh' },
    { text: 'Changning', value: 'cn' },
  ]},
  { text: 'Guangdong', value: 'gd', children: [
    { text: 'Shenzhen', value: 'sz', children: [
      { text: 'Nanshan', value: 'ns' }, { text: 'Futian', value: 'ft' },
      { text: 'Luohu', value: 'lh' }, { text: 'Bao\'an', value: 'ba' },
    ]},
    { text: 'Guangzhou', value: 'gz', children: [
      { text: 'Tianhe', value: 'th' }, { text: 'Yuexiu', value: 'yx' },
      { text: 'Haizhu', value: 'hz' },
    ]},
    { text: 'Dongguan', value: 'dg' },
    { text: 'Foshan', value: 'fs' },
  ]},
  { text: 'Zhejiang', value: 'zj', children: [
    { text: 'Hangzhou', value: 'hz', children: [
      { text: 'Xihu', value: 'xh' }, { text: 'Binjiang', value: 'bj' },
      { text: 'Yuhang', value: 'yh' },
    ]},
    { text: 'Ningbo', value: 'nb' },
  ]},
  { text: 'Jiangsu', value: 'js', children: [
    { text: 'Nanjing', value: 'nj', children: [
      { text: 'Gulou', value: 'gl' }, { text: 'Jianye', value: 'jy' },
    ]},
    { text: 'Suzhou', value: 'sz' },
    { text: 'Wuxi', value: 'wx' },
  ]},
];

export const CascaderMobile = () => {
  const t = useT();
  const { propsTables, optionTables, cssVarsTables } = useCascaderTableData();

  /* ── Region ── */
  const [show1, setShow1] = createSignal(false);
  const [val1, setVal1] = createSignal<(string | number)[]>([]);

  /* ── Disabled ── */
  const [show2, setShow2] = createSignal(false);
  const [val2, setVal2] = createSignal<(string | number)[]>([]);
  const disabledOpts: CascaderOption[] = [
    { text: 'Beijing', value: 'bj' },
    { text: 'Shanghai', value: 'sh', disabled: true },
    { text: 'Guangdong', value: 'gd' },
    { text: 'Zhejiang', value: 'zj' },
    { text: 'Jiangsu', value: 'js', disabled: true },
  ];

  /* ── Custom Render ── */
  const [show3, setShow3] = createSignal(false);
  const [val3, setVal3] = createSignal<(string | number)[]>([]);
  const renderOpts: CascaderOption[] = [
    {
      text: 'Beijing', value: 'bj',
      render: (
        <span style={{ display: 'flex', 'align-items': 'center', gap: '10px', width: '100%' }}>
          <span style={{ 'font-size': '1.3rem' }}>🏯</span>
          <span style={{ flex: 1 }}>
            <span style={{ 'font-weight': 600 }}>Beijing</span>
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af', display: 'block' }}>Capital · Pop 21.5M</span>
          </span>
          <span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', 'border-radius': '10px', 'font-size': '0.7rem', 'font-weight': 600 }}>N China</span>
        </span>
      ),
    },
    {
      text: 'Shanghai', value: 'sh',
      render: (
        <span style={{ display: 'flex', 'align-items': 'center', gap: '10px', width: '100%' }}>
          <span style={{ 'font-size': '1.3rem' }}>🌃</span>
          <span style={{ flex: 1 }}>
            <span style={{ 'font-weight': 600 }}>Shanghai</span>
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af', display: 'block' }}>Financial Hub · Pop 24.8M</span>
          </span>
          <span style={{ background: '#dbeafe', color: '#2563eb', padding: '2px 8px', 'border-radius': '10px', 'font-size': '0.7rem', 'font-weight': 600 }}>E China</span>
        </span>
      ),
    },
    {
      text: 'Guangdong', value: 'gd',
      render: (
        <span style={{ display: 'flex', 'align-items': 'center', gap: '10px', width: '100%' }}>
          <span style={{ 'font-size': '1.3rem' }}>🌴</span>
          <span style={{ flex: 1 }}>
            <span style={{ 'font-weight': 600 }}>Guangdong</span>
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af', display: 'block' }}>Tech Hub · Pop 126M</span>
          </span>
          <span style={{ background: '#d1fae5', color: '#059669', padding: '2px 8px', 'border-radius': '10px', 'font-size': '0.7rem', 'font-weight': 600 }}>S China</span>
        </span>
      ),
    },
    {
      text: 'Zhejiang', value: 'zj',
      render: (
        <span style={{ display: 'flex', 'align-items': 'center', gap: '10px', width: '100%' }}>
          <span style={{ 'font-size': '1.3rem' }}>🏞️</span>
          <span style={{ flex: 1 }}>
            <span style={{ 'font-weight': 600 }}>Zhejiang</span>
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af', display: 'block' }}>E-commerce · Pop 65M</span>
          </span>
          <span style={{ background: '#ede9fe', color: '#7c3aed', padding: '2px 8px', 'border-radius': '10px', 'font-size': '0.7rem', 'font-weight': 600 }}>E China</span>
        </span>
      ),
    },
    {
      text: 'Jiangsu', value: 'js',
      render: (
        <span style={{ display: 'flex', 'align-items': 'center', gap: '10px', width: '100%' }}>
          <span style={{ 'font-size': '1.3rem' }}>🏛️</span>
          <span style={{ flex: 1 }}>
            <span style={{ 'font-weight': 600 }}>Jiangsu</span>
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af', display: 'block' }}>Manufacturing · Pop 85M</span>
          </span>
          <span style={{ background: '#fce7f3', color: '#db2777', padding: '2px 8px', 'border-radius': '10px', 'font-size': '0.7rem', 'font-weight': 600 }}>E China</span>
        </span>
      ),
    },
  ];

  /* ── Async Load ── */
  const [show4, setShow4] = createSignal(false);
  const [val4, setVal4] = createSignal<(string | number)[]>([]);
  const loadChildren = async (option: CascaderOption): Promise<CascaderOption[]> => {
    await new Promise(r => setTimeout(r, 1000));
    const map: Record<string, CascaderOption[]> = {
      __root__: [
        { text: 'Beijing', value: 'bj' },
        { text: 'Shanghai', value: 'sh' },
        { text: 'Guangdong', value: 'gd' },
      ],
      bj: [
        { text: 'Chaoyang', value: 'cy' },
        { text: 'Haidian', value: 'hd' },
        { text: 'Dongcheng', value: 'dc' },
      ],
      cy: [
        { text: 'Wangjing', value: 'wj', isLeaf: true },
        { text: 'Sanlitun', value: 'slt', isLeaf: true },
        { text: 'Guomao', value: 'gm', isLeaf: true },
      ],
    };
    return map[String(option.value)] || [];
  };

  return (
    <MobilePreview title="Cascader">
      <MobilePropsSheet propsTables={[...propsTables, ...optionTables]} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        <CellGroup card>
          <Cell title={t('cascader.demo.region')} value={val1().length ? val1().join(' / ') : 'Select'} clickable onClick={() => setShow1(true)} />
          <Cell title={t('cascader.demo.disabledOption')} value={val2().length ? val2().join(' / ') : 'Select'} clickable onClick={() => setShow2(true)} />
          <Cell title={t('cascader.demo.customRender')} value={val3().length ? val3().join(' / ') : 'Select'} description="Icon + JSX render" clickable onClick={() => setShow3(true)} />
          <Cell title={t('cascader.demo.asyncLoad')} value={val4().length ? val4().join(' → ') : 'Select'} description="onLoadChildren" clickable onClick={() => setShow4(true)} />
        </CellGroup>

        <Cascader
          options={regionOptions}
          show={show1()} onUpdateShow={(v) => { if (!v) setShow1(false); }}
          value={val1()} onChange={setVal1}
          title="Select Region" closeable
        />
        <Cascader
          options={disabledOpts}
          show={show2()} onUpdateShow={(v) => { if (!v) setShow2(false); }}
          value={val2()} onChange={setVal2}
          title="Cities (Disabled)"
        />
        <Cascader
          options={renderOpts}
          show={show3()} onUpdateShow={(v) => { if (!v) setShow3(false); }}
          value={val3()} onChange={setVal3}
          title="Province" closeable
          checkmark={<Icon name="check" size={16} color="var(--sc-color-primary, #1677ff)" />}
        />
        <Cascader
          options={[]}
          onLoadChildren={loadChildren}
          show={show4()} onUpdateShow={(v) => { if (!v) setShow4(false); }}
          value={val4()} onChange={setVal4}
          title="Async Load Region" closeable
          loading={
            <div style={{ 'text-align': 'center', padding: '32px', color: '#9ca3af' }}>
              <Loading size={24} />
              <div style={{ 'margin-top': '8px', 'font-size': '0.8rem' }}>Loading region data...</div>
            </div>
          }
        />
      </div>
    </MobilePreview>
  );
};
