import { createSignal, useContext } from 'solid-js';
import { Loading } from '../../../../src/components/Loading';
import { Icon } from '../../../../src/components/Icon';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import styles from './LoadingDocPage.module.css';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: false, desc: '加载文字。与 children 二选一，text 优先。' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: '子元素，text 未提供时生效。' },
  { name: 'type', type: "'spinner' | 'circular' | 'dots'", default: "'spinner'", required: false, desc: '内置动画类型。' },
  { name: 'size', type: 'string | number', default: '—', required: false, desc: '动画尺寸，数字自动补 px。' },
  { name: 'color', type: 'string', default: '—', required: false, desc: '动画颜色。' },
  { name: 'textColor', type: 'string', default: '—', required: false, desc: '文字颜色。' },
  { name: 'vertical', type: 'boolean', default: 'false', required: false, desc: '文字与动画是否纵向排列。' },
  { name: 'overlay', type: 'boolean', default: 'false', required: false, desc: '是否为全屏遮罩模式。' },
  { name: 'icon', type: 'JSX.Element', default: '—', required: false, desc: '自定义图标，设置后忽略 type。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: '内联样式。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'types', title: '内置类型' },
  { id: 'size-color', title: '尺寸 & 颜色' },
  { id: 'vertical', title: '纵向布局' },
  { id: 'custom', title: '自定义图标' },
  { id: 'overlay', title: '全屏遮罩' },
];

const LoadingDocInner = () => {
  const t = useT();
  const phoneTarget = useContext(PhoneTargetContext);
  const phoneMount = () => phoneTarget?.();
  const [overlayOpen, setOverlayOpen] = createSignal(false);

  return (
    <>

      <div class={styles.page}>
        <h1 class={styles.h1}>Loading 加载</h1>
        <p class={styles.intro}>
          展示加载中状态的视觉反馈。内置三种动画类型，支持自定义图标、文字、纵向布局及全屏遮罩模式。
        </p>

        {/* Props */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* Types */}
        <h2 id="types" class={styles.h2}>{t('section.builtinTypes')}</h2>
        <DemoBlock
          title={t('demo.loadingTypes')}
          desc="三种内置动画：spinner 经典旋转圆环、circular 弧形旋转、dots 三点弹跳。"
          code={`<Loading type="spinner" text="加载中..." />\n<Loading type="circular" text="加载中..." />\n<Loading type="dots" text="加载中..." />`}
        >
          <div class={styles.demoArea}>
            <Loading type="spinner" text="加载中..." />
            <Loading type="circular" text="加载中..." />
            <Loading type="dots" text="加载中..." />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.loadingPure')}
          desc="不传 text / children 时只显示动画，适合按钮内或行内场景。"
          code={`<Loading />\n<Loading type="circular" />\n<Loading type="dots" />`}
        >
          <div class={styles.demoArea}>
            <Loading />
            <Loading type="circular" />
            <Loading type="dots" />
          </div>
        </DemoBlock>

        {/* Size & Color */}
        <h2 id="size-color" class={styles.h2}>{t('section.sizeColor')}</h2>
        <DemoBlock
          title={t('demo.loadingSizeColor')}
          desc="size 支持数字（px）或 CSS 字符串，color 设置动画颜色。"
          code={`<Loading size={32} color="#1677ff" />\n<Loading size="2rem" color="#22c55e" text="加载中" />\n<Loading size={16} color="#f59e0b" />`}
        >
          <div class={styles.demoArea}>
            <Loading size={32} color="#1677ff" />
            <Loading size="2rem" color="#22c55e" text="加载中" />
            <Loading size={16} color="#f59e0b" />
          </div>
        </DemoBlock>

        {/* Vertical */}
        <h2 id="vertical" class={styles.h2}>{t('section.verticalLayout')}</h2>
        <DemoBlock
          title={t('demo.centerVertical')}
          desc="设为 true 时文字显示在动画下方，适合卡片或全屏加载场景。"
          code={`<Loading vertical text="正在加载数据..." />\n<Loading vertical type="dots" text="搜索中..." />`}
        >
          <div class={styles.demoArea}>
            <Loading vertical text="正在加载数据..." />
            <Loading vertical type="dots" text="搜索中..." color="#1677ff" />
          </div>
        </DemoBlock>

        {/* Custom icon */}
        <h2 id="custom" class={styles.h2}>{t('demo.customIcon')}</h2>
        <DemoBlock
          title={t('demo.loadingIconProp')}
          desc="传入自定义 JSX 替代内置动画。适合配合 Icon 组件实现旋转刷新等交互。"
          code={`<Loading icon={<Icon name="refresh" size={24} />} text="刷新中..." />`}
        >
          <div class={styles.demoArea}>
            <Loading
              icon={
                <span style={{ animation: 'spin 0.8s linear infinite', display: 'inline-flex' }}>
                  <Icon name="refresh" size={24} color="#1677ff" />
                </span>
              }
              text="刷新中..."
            />
          </div>
        </DemoBlock>

        {/* Overlay */}
        <h2 id="overlay" class={styles.h2}>{t('section.overlay')}</h2>
        <DemoBlock
          title={t('demo.loadingOverlayMode')}
          desc="设为 true 时渲染全屏半透明遮罩并锁定滚动，适合阻止用户操作的等待场景。"
          code={`import { createSignal } from 'solid-js';\nimport { Loading } from 'solid-component';\n\nfunction Demo() {\n  const [loading, setLoading] = createSignal(false);\n\n  const handleSubmit = async () => {\n    setLoading(true);\n    await fetchData();\n    setLoading(false);\n  };\n\n  return (\n    <>\n      <button onClick={handleSubmit}>提交</button>\n      {loading() && <Loading overlay text="正在处理..." />}\n    </>\n  );\n}`}
        >
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => {
              setOverlayOpen(true);
              setTimeout(() => setOverlayOpen(false), 2000);
            }}>
              演示遮罩加载（2s 后自动关闭）
            </button>
            {overlayOpen() && <Loading overlay mount={phoneMount()} text="正在处理..." />}
          </div>
        </DemoBlock>
      </div>
    </>
  );
};

export const LoadingDocPage = () => (
  <DocLayout><LoadingDocInner /></DocLayout>
);
