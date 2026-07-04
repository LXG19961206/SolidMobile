import { createSignal, Show, useContext } from 'solid-js';
import { Cascader } from '../../../../src/components/Cascader';
import { Cell } from '../../../../src/components/Cell';
import { Icon } from '../../../../src/components/Icon';
import { Loading } from '../../../../src/components/Loading';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import type { CascaderOption } from '../../../../src/components/Cascader/types';
import { useT } from '../../../doc-i18n';
import css from './CascaderDocPage.module.css';

const regionOptions: CascaderOption[] = [
  { text: '北京', value: 'beijing', children: [
    { text: '朝阳区', value: 'chaoyang', children: [
      { text: '望京街道', value: 'wangjing' }, { text: '三里屯街道', value: 'sanlitun' },
      { text: '国贸', value: 'guomao' }, { text: '双井街道', value: 'shuangjing' },
      { text: '劲松街道', value: 'jinsong' }, { text: '潘家园街道', value: 'panjiayuan' },
      { text: '安贞街道', value: 'anzhen' }, { text: '奥运村街道', value: 'aoyuncun' },
    ]},
    { text: '海淀区', value: 'haidian', children: [
      { text: '中关村街道', value: 'zhongguancun' }, { text: '五道口', value: 'wudaokou' },
      { text: '西二旗', value: 'xierqi' }, { text: '上地街道', value: 'shangdi' },
      { text: '清河街道', value: 'qinghe' },
    ]},
    { text: '西城区', value: 'xicheng', children: [
      { text: '金融街', value: 'jinrongjie' }, { text: '西单', value: 'xidan' },
      { text: '德胜门外', value: 'deshengmenwai' },
    ]},
    { text: '东城区', value: 'dongcheng' },
    { text: '丰台区', value: 'fengtai' },
    { text: '石景山区', value: 'shijingshan' },
    { text: '通州区', value: 'tongzhou' },
    { text: '大兴区', value: 'daxing' },
  ]},
  { text: '上海', value: 'shanghai', children: [
    { text: '浦东新区', value: 'pudong', children: [
      { text: '陆家嘴', value: 'lujiazui' }, { text: '张江', value: 'zhangjiang' },
      { text: '金桥', value: 'jinqiao' }, { text: '外高桥', value: 'waigaoqiao' },
      { text: '川沙', value: 'chuansha' },
    ]},
    { text: '静安区', value: 'jingan' },
    { text: '徐汇区', value: 'xuhui' },
    { text: '长宁区', value: 'changning' },
    { text: '杨浦区', value: 'yangpu' },
    { text: '虹口区', value: 'hongkou' },
  ]},
  { text: '广东', value: 'guangdong', children: [
    { text: '深圳', value: 'shenzhen', children: [
      { text: '南山区', value: 'nanshan' }, { text: '福田区', value: 'futian' },
      { text: '罗湖区', value: 'luohu' }, { text: '宝安区', value: 'baoan' },
      { text: '龙岗区', value: 'longgang' }, { text: '龙华区', value: 'longhua' },
    ]},
    { text: '广州', value: 'guangzhou', children: [
      { text: '天河区', value: 'tianhe' }, { text: '越秀区', value: 'yuexiu' },
      { text: '海珠区', value: 'haizhu' }, { text: '白云区', value: 'baiyun' },
    ]},
    { text: '东莞', value: 'dongguan' },
    { text: '佛山', value: 'foshan' },
    { text: '珠海', value: 'zhuhai' },
  ]},
  { text: '浙江', value: 'zhejiang', children: [
    { text: '杭州', value: 'hangzhou', children: [
      { text: '西湖区', value: 'xihu' }, { text: '滨江区', value: 'binjiang' },
      { text: '余杭区', value: 'yuhang' }, { text: '萧山区', value: 'xiaoshan' },
    ]},
    { text: '宁波', value: 'ningbo' },
    { text: '温州', value: 'wenzhou' },
  ]},
  { text: '江苏', value: 'jiangsu', children: [
    { text: '南京', value: 'nanjing', children: [
      { text: '鼓楼区', value: 'gulou' }, { text: '建邺区', value: 'jianye' },
      { text: '玄武区', value: 'xuanwu' },
    ]},
    { text: '苏州', value: 'suzhou' },
    { text: '无锡', value: 'wuxi' },
    { text: '常州', value: 'changzhou' },
  ]},
];

const propsData: PropRow[] = [
  { name: 'options', type: 'CascaderOption[]', default: '—', required: true, desc: 'componentProps.Cascader.options' },
  { name: 'value', type: '(string | number)[]', default: '—', required: false, desc: '当前选中值。' },
  { name: 'onChange', type: '(value: (string | number)[]) => void', default: '—', required: false, desc: 'componentProps.Cascader.onChange' },
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.Cascader.title' },
  { name: 'placeholder', type: 'string', default: "'请选择'", required: false, desc: '未选中的占位文字。' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.Cascader.closeable' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'componentProps.Cascader.show' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: 'componentProps.Cascader.onUpdateShow' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.Cascader.onClose' },
  { name: 'maxHeight', type: 'number | string', default: "'40vh'", required: false, desc: '弹窗固定高度。' },
  { name: 'showCheckmark', type: 'boolean', default: 'true', required: false, desc: 'componentProps.Cascader.showCheckmark' },
  { name: 'checkmark', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.Cascader.checkmark' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.Cascader.teleport' },
  { name: 'zIndex', type: 'number | string', default: '2000', required: false, desc: 'componentProps.Cascader.zIndex' },
];

const optionPropsData: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: true, desc: 'componentProps.Cascader.text' },
  { name: 'value', type: 'string | number', default: '—', required: true, desc: 'componentProps.Cascader.value' },
  { name: 'children', type: 'CascaderOption[]', default: '—', required: false, desc: 'componentProps.Cascader.children' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.Cascader.disabled' },
  { name: 'render', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.Cascader.render' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'demo', title: '示例' },
];

const CascaderDemo = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);

  return (
    <>
      <Cell title={val().length ? val().join(' / ') : '选择地区'} clickable onClick={() => setShow(true)} />
      <Cascader
        options={regionOptions}
        show={show()}
        onUpdateShow={setShow}
        value={val()}
        onChange={setVal}
        title="选择地区"
        closeable
      />
    </>
  );
};

const DisabledCascader = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  const opts: CascaderOption[] = [
    { text: '北京', value: 'beijing' },
    { text: '上海', value: 'shanghai', disabled: true },
    { text: '广东', value: 'guangdong' },
    { text: '浙江', value: 'zhejiang' },
    { text: '江苏', value: 'jiangsu', disabled: true },
  ];
  return (
    <>
      <Cell title={val().length ? val().join(' / ') : '选择城市'} clickable onClick={() => setShow(true)} />
      <Cascader options={opts} show={show()} onUpdateShow={setShow} value={val()} onChange={setVal} title="城市（部分禁用）" teleport={phoneTarget?.()} />
    </>
  );
};

const JsxCascader = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  const opts: CascaderOption[] = [
    { text: '北京', value: 'beijing', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} /> 北京</span> },
    { text: '上海', value: 'shanghai', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} /> 上海</span> },
    { text: '广东', value: 'guangdong', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} color="#22c55e" /> 广东</span> },
    { text: '浙江', value: 'zhejiang', render: <span style="display:flex;align-items:center;gap:8px"><Icon name="map-pin" size={16} color="#f59e0b" /> 浙江</span> },
  ];
  return (
    <>
      <Cell title={val().length ? val().join(' / ') : '选择省份'} clickable onClick={() => setShow(true)} />
      <Cascader options={opts} show={show()} onUpdateShow={setShow} value={val()} onChange={setVal} title="省份（自定义渲染）" checkmark={<Icon name="check" size={16} color="#1677ff" />} teleport={phoneTarget?.()} />
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
    <>
      <Cell title={val().length ? val().join(' / ') : '选择地区'} clickable onClick={() => setShow(true)} />
      <Show when={val().length}><span style="font-size:0.8rem;color:#6b7280">已选: {val().join(' → ')}</span></Show>
      <Cascader
        options={[]}
        onLoadChildren={loadChildren}
        show={show()} onUpdateShow={setShow}
        value={val()} onChange={setVal}
        title="异步加载地区"
        closeable
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
      <h1 class={css.h1}>Cascader 级联选择器</h1>
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
        desc="三级联动选择，选中叶子节点自动关闭。点击顶部 Tab 可回退到已选层级。"
        code={`<Cascader\n  options={options}\n  show={show()}\n  onUpdateShow={setShow}\n  value={val()}\n  onChange={setVal}\n  title="选择地区"\n  closeable\n/>`}
      >
        <CascaderDemo />
      </DemoBlock>

      <DemoBlock
        title="禁用选项"
        desc="设置 disabled: true 可禁用特定选项，点击无反应。"
        code={`const options = [\n  { text: '北京', value: 'beijing' },\n  { text: '上海', value: 'shanghai', disabled: true },\n  { text: '广东', value: 'guangdong' },\n];`}
      >
        <DisabledCascader />
      </DemoBlock>

      <DemoBlock
        title={t('demo.customRender')}
        desc={t('demo.customRenderDesc')}
        code={`const options = [\n  { text: '北京', value: 'beijing',\n    render: <span style="display:flex;align-items:center;gap:8px">\n      <Icon name="map-pin" size={16} /> 北京\n    </span>,\n  },\n  ...\n];`}
      >
        <JsxCascader />
      </DemoBlock>

      <DemoBlock
        title={t('demo.asyncLoading')}
        desc="options 初始为空，每级由 onLoadChildren 按需拉取。模拟 2s 网络延迟。"
        code={`const loadChildren = async (option) => {\n  const res = await fetch('/api/areas?parent=' + option.value);\n  return res.json();\n};\n\n<Cascader\n  options={[]}\n  onLoadChildren={loadChildren}\n  show={show()}\n  onUpdateShow={setShow}\n  title="异步加载地区"\n/>`}
      >
        <AsyncCascader />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
