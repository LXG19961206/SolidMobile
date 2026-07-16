import { createSignal, Show, useContext } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { Cascader } from '../../../../src/components/Cascader';
import { Cell } from '../../../../src/components/Cell';
import { Icon } from '../../../../src/components/Icon';
import { Loading } from '../../../../src/components/Loading';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import type { CascaderOption } from '../../../../src/components/Cascader/types';
import css from './CascaderDocPage.module.css';

const regionOptions: CascaderOption[] = [
  { text: 'Beijing', value: 'beijing', children: [
    { text: 'Chaoyang', value: 'chaoyang', children: [
      { text: 'Wangjing', value: 'wangjing' }, { text: 'Sanlitun', value: 'sanlitun' },
      { text: 'Guomao', value: 'guomao' }, { text: 'Shuangjing', value: 'shuangjing' },
      { text: 'Jinsong', value: 'jinsong' }, { text: 'Panjiayuan', value: 'panjiayuan' },
      { text: 'Anzhen', value: 'anzhen' }, { text: 'Olympic Village', value: 'aoyuncun' },
    ]},
    { text: 'Haidian', value: 'haidian', children: [
      { text: 'Zhongguancun', value: 'zhongguancun' }, { text: 'Wudaokou', value: 'wudaokou' },
      { text: 'Xi Erqi', value: 'xierqi' }, { text: 'Shangdi', value: 'shangdi' },
      { text: 'Qinghe', value: 'qinghe' },
    ]},
    { text: 'Xicheng', value: 'xicheng', children: [
      { text: 'Financial Street', value: 'jinrongjie' }, { text: 'Xidan', value: 'xidan' },
      { text: 'Deshengmen', value: 'deshengmenwai' },
    ]},
    { text: 'Dongcheng', value: 'dongcheng' },
    { text: 'Fengtai', value: 'fengtai' },
    { text: 'Shijingshan', value: 'shijingshan' },
    { text: 'Tongzhou', value: 'tongzhou' },
    { text: 'Daxing', value: 'daxing' },
  ]},
  { text: 'Shanghai', value: 'shanghai', children: [
    { text: 'Pudong', value: 'pudong', children: [
      { text: 'Lujiazui', value: 'lujiazui' }, { text: 'Zhangjiang', value: 'zhangjiang' },
      { text: 'Jinqiao', value: 'jinqiao' }, { text: 'Waigaoqiao', value: 'waigaoqiao' },
      { text: 'Chuansha', value: 'chuansha' },
    ]},
    { text: "Jing'an", value: 'jingan' },
    { text: 'Xuhui', value: 'xuhui' },
    { text: 'Changning', value: 'changning' },
    { text: 'Yangpu', value: 'yangpu' },
    { text: 'Hongkou', value: 'hongkou' },
  ]},
  { text: 'Guangdong', value: 'guangdong', children: [
    { text: 'Shenzhen', value: 'shenzhen', children: [
      { text: 'Nanshan', value: 'nanshan' }, { text: 'Futian', value: 'futian' },
      { text: 'Luohu', value: 'luohu' }, { text: 'Bao\'an', value: 'baoan' },
      { text: 'Longgang', value: 'longgang' }, { text: 'Longhua', value: 'longhua' },
    ]},
    { text: 'Guangzhou', value: 'guangzhou', children: [
      { text: 'Tianhe', value: 'tianhe' }, { text: 'Yuexiu', value: 'yuexiu' },
      { text: 'Haizhu', value: 'haizhu' }, { text: 'Baiyun', value: 'baiyun' },
    ]},
    { text: 'Dongguan', value: 'dongguan' },
    { text: 'Foshan', value: 'foshan' },
    { text: 'Zhuhai', value: 'zhuhai' },
  ]},
  { text: 'Zhejiang', value: 'zhejiang', children: [
    { text: 'Hangzhou', value: 'hangzhou', children: [
      { text: 'Xihu', value: 'xihu' }, { text: 'Binjiang', value: 'binjiang' },
      { text: 'Yuhang', value: 'yuhang' }, { text: 'Xiaoshan', value: 'xiaoshan' },
    ]},
    { text: 'Ningbo', value: 'ningbo' },
    { text: 'Wenzhou', value: 'wenzhou' },
  ]},
  { text: 'Jiangsu', value: 'jiangsu', children: [
    { text: 'Nanjing', value: 'nanjing', children: [
      { text: 'Gulou', value: 'gulou' }, { text: 'Jianye', value: 'jianye' },
      { text: 'Xuanwu', value: 'xuanwu' },
    ]},
    { text: 'Suzhou', value: 'suzhou' },
    { text: 'Wuxi', value: 'wuxi' },
    { text: 'Changzhou', value: 'changzhou' },
  ]},
];

const propsData: PropRow[] = [
  { name: 'options', type: 'CascaderOption[]', default: '—', required: true, desc: 'componentProps.cascader.options' },
  { name: 'value', type: '(string | number)[]', default: '—', required: false, desc: 'componentProps.cascader.value' },
  { name: 'onChange', type: '(value: (string | number)[]) => void', default: '—', required: false, desc: 'componentProps.cascader.onChange' },
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.cascader.title' },
  { name: 'placeholder', type: 'string', default: "'Please Select'", required: false, desc: 'componentProps.cascader.placeholder' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.cascader.closeable' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'componentProps.cascader.show' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: 'componentProps.cascader.onUpdateShow' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.cascader.onClose' },
  { name: 'maxHeight', type: 'number | string', default: "'40vh'", required: false, desc: 'componentProps.cascader.maxHeight' },
  { name: 'showCheckmark', type: 'boolean', default: 'true', required: false, desc: 'componentProps.cascader.showCheckmark' },
  { name: 'checkmark', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.cascader.checkmark' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.cascader.teleport' },
  { name: 'zIndex', type: 'number | string', default: '2000', required: false, desc: 'componentProps.cascader.zIndex' },
];

const optionPropsData: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: true, desc: 'componentProps.cascader.text' },
  { name: 'value', type: 'string | number', default: '—', required: true, desc: 'componentProps.cascader.value' },
  { name: 'children', type: 'CascaderOption[]', default: '—', required: false, desc: 'componentProps.cascader.children' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.cascader.disabled' },
  { name: 'render', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.cascader.render' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'demo', title: 'Examples' },
];

const CascaderDemo = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);

  return (
    <>
      <Cell title={val().length ? val().join(' / ') : 'Select Region'} clickable onClick={() => setShow(true)} />
      <Cascader
        options={regionOptions}
        show={show()}
        onUpdateShow={setShow}
        value={val()}
        onChange={setVal}
        title="Select Region"
        closeable
        teleport={phoneTarget?.()}
      />
    </>
  );
};

const DisabledCascader = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  const opts: CascaderOption[] = [
    { text: 'Beijing', value: 'beijing' },
    { text: 'Shanghai', value: 'shanghai', disabled: true },
    { text: 'Guangdong', value: 'guangdong' },
    { text: 'Zhejiang', value: 'zhejiang' },
    { text: 'Jiangsu', value: 'jiangsu', disabled: true },
  ];
  return (
    <>
      <Cell title={val().length ? val().join(' / ') : 'Select City'} clickable onClick={() => setShow(true)} />
      <Cascader options={opts} show={show()} onUpdateShow={setShow} value={val()} onChange={setVal} title="City (Partial Disabled)" teleport={phoneTarget?.()} />
    </>
  );
};

const JsxCascader = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  const opts: CascaderOption[] = [
    { text: 'Beijing', value: 'beijing', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} /> Beijing</span> },
    { text: 'Shanghai', value: 'shanghai', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} /> Shanghai</span> },
    { text: 'Guangdong', value: 'guangdong', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} color="#22c55e" /> Guangdong</span> },
    { text: 'Zhejiang', value: 'zhejiang', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} color="#f59e0b" /> Zhejiang</span> },
  ];
  return (
    <>
      <Cell title={val().length ? val().join(' / ') : 'Select Province'} clickable onClick={() => setShow(true)} />
      <Cascader options={opts} show={show()} onUpdateShow={setShow} value={val()} onChange={setVal} title="省份（自定义渲染）" checkmark={<Icon name="check" size={16} color="var(--sc-color-primary, #1677ff)" />} teleport={phoneTarget?.()} />
    </>
  );
};

const AsyncCascader = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);

  const loadChildren = async (option: CascaderOption): Promise<CascaderOption[]> => {
    await new Promise(r => setTimeout(r, 2000));
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
    <>
      <Cell title={val().length ? val().join(' / ') : 'Select Region'} clickable onClick={() => setShow(true)} />
      <Show when={val().length}><span style="font-size:0.8rem;color:#6b7280">Selected: {val().join(' → ')}</span></Show>
      <Cascader
        options={[]}
        onLoadChildren={loadChildren}
        show={show()} onUpdateShow={setShow}
        value={val()} onChange={setVal}
        title="Async Load Region"
        closeable
        teleport={phoneTarget?.()}
        loading={<div style="text-align:center;padding:32px;color:#9ca3af"><Loading size={24} /><div style="margin-top:8px;font-size:0.8rem">加载地区数据中...</div></div>}
      />
    </>
  );
};

export const CascaderDocPage = () => {
  const t = useT();
  return (
    <DocLayout>
    <div class={css.page}>
      <h1 class={css.h1}>Cascader</h1>
      <p class={css.intro}>
        {t('componentIntro.CascaderIntro')}
      </p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h3 style="margin-top:1.5rem;font-size:1rem;font-weight:600">CascaderOption</h3>
      <PropsTable rows={optionPropsData} />

      <h2 id="demo" class={css.h2}>{t('demo.examples')}</h2>

      <DemoBlock
        title={t('demo.cascaderRegion')}
        desc={t('demoDesc.cascader_basic')}
        code={`<Cascader\n  options={options}\n  show={show()}\n  onUpdateShow={setShow}\n  value={val()}\n  onChange={setVal}\n  title="Select Region"\n  closeable\n/>`}
      >
        <CascaderDemo />
      </DemoBlock>

      <DemoBlock
        title="Disabled Options"
        desc={t('demoDesc.cascader_disabled')}
        code={`const options = [\n  { text: 'Beijing', value: 'beijing' },\n  { text: 'Shanghai', value: 'shanghai', disabled: true },\n  { text: 'Guangdong', value: 'guangdong' },\n];`}
      >
        <DisabledCascader />
      </DemoBlock>

      <DemoBlock
        title={t('demo.customRender')}
        desc={t('demo.customRenderDesc')}
        code={`const options = [\n  { text: 'Beijing', value: 'beijing',\n    render: <span style="display:flex;align-items:center;gap:8px">\n      <Icon name="map-pin" size={16} /> 北京\n    </span>,\n  },\n  ...\n];`}
      >
        <JsxCascader />
      </DemoBlock>

      <DemoBlock
        title={t('demo.cascaderAsync')}
        desc={t('demoDesc.cascader_async')}
        code={`const loadChildren = async (option) => {\n  const res = await fetch('/api/areas?parent=' + option.value);\n  return res.json();\n};\n\n<Cascader\n  options={[]}\n  onLoadChildren={loadChildren}\n  show={show()}\n  onUpdateShow={setShow}\n  title="Async Load Region"\n/>`}
      >
        <AsyncCascader />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
