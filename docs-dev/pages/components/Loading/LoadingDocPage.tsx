import { createSignal, useContext } from 'solid-js';
import { Loading } from '../../../../src/components/Loading';
import { Icon } from '../../../../src/components/Icon';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import styles from './LoadingDocPage.module.css';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: false, desc: 'componentProps.loading.text' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.loading.children' },
  { name: 'type', type: "'spinner' | 'circular' | 'dots'", default: "'spinner'", required: false, desc: 'componentProps.loading.type' },
  { name: 'size', type: 'string | number', default: '—', required: false, desc: 'componentProps.loading.size' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.loading.color' },
  { name: 'textColor', type: 'string', default: '—', required: false, desc: 'componentProps.loading.textColor' },
  { name: 'vertical', type: 'boolean', default: 'false', required: false, desc: 'componentProps.loading.vertical' },
  { name: 'overlay', type: 'boolean', default: 'false', required: false, desc: 'componentProps.loading.overlay' },
  { name: 'icon', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.loading.icon' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.loading.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.loading.style' },
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
          {t('componentIntro.LoadingIntro')}
        </p>

        {/* Props */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* Types */}
        <h2 id="types" class={styles.h2}>{t('section.builtinTypes')}</h2>
        <DemoBlock
          title={t('demo.loadingTypes')}
          desc={t('demoDesc.loading_types')}
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
          desc={t('demoDesc.loading_pure')}
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
          desc={t('demoDesc.loading_size_color')}
          code={`<Loading size={32} color="#1677ff" />\n<Loading size="2rem" color="#22c55e" text="加载中" />\n<Loading size={16} color="#f59e0b" />`}
        >
          <div class={styles.demoArea}>
            <Loading size={32} color="var(--sc-color-primary, #1677ff)" />
            <Loading size="2rem" color="#22c55e" text="加载中" />
            <Loading size={16} color="#f59e0b" />
          </div>
        </DemoBlock>

        {/* Vertical */}
        <h2 id="vertical" class={styles.h2}>{t('section.verticalLayout')}</h2>
        <DemoBlock
          title={t('demo.centerVertical')}
          desc={t('demoDesc.loading_vertical')}
          code={`<Loading vertical text="正在加载数据..." />\n<Loading vertical type="dots" text="搜索中..." />`}
        >
          <div class={styles.demoArea}>
            <Loading vertical text="正在加载数据..." />
            <Loading vertical type="dots" text="搜索中..." color="var(--sc-color-primary, #1677ff)" />
          </div>
        </DemoBlock>

        {/* Custom icon */}
        <h2 id="custom" class={styles.h2}>{t('demo.customIcon')}</h2>
        <DemoBlock
          title={t('demo.loadingIconProp')}
          desc={t('demoDesc.loading_custom_icon')}
          code={`<Loading icon={<Icon name="refresh" size={24} />} text="刷新中..." />`}
        >
          <div class={styles.demoArea}>
            <Loading
              icon={
                <span style={{ animation: 'spin 0.8s linear infinite', display: 'inline-flex' }}>
                  <Icon name="refresh" size={24} color="var(--sc-color-primary, #1677ff)" />
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
          desc={t('demoDesc.loading_overlay')}
          code={`import { createSignal } from 'solid-js';\nimport { Loading } from 'solid-mobile';\n\nfunction Demo() {\n  const [loading, setLoading] = createSignal(false);\n\n  const handleSubmit = async () => {\n    setLoading(true);\n    await fetchData();\n    setLoading(false);\n  };\n\n  return (\n    <>\n      <button onClick={handleSubmit}>提交</button>\n      {loading() && <Loading overlay text="正在处理..." />}\n    </>\n  );\n}`}
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
