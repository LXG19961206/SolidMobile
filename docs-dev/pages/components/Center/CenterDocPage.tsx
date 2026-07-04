import { Center } from '../../../../src/components/Center';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
import styles from './CenterDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'flexX', type: 'boolean', default: '—', required: false, desc: 'Flexbox 水平居中 (justify-content: center)。' },
  { name: 'flexY', type: 'boolean', default: '—', required: false, desc: 'Flexbox 垂直居中 (align-items: center)。父级需有高度。' },
  { name: 'text', type: 'boolean', default: '—', required: false, desc: 'text-align: center。适合行内 / 行内块内容。' },
  { name: 'vertical', type: 'boolean', default: '—', required: false, desc: 'vertical-align: middle。适合行内元素。' },
  { name: 'position', type: 'boolean', default: '—', required: false, desc: 'absolute + transform 居中。父级需 position: relative。' },
  { name: 'inline', type: 'boolean', default: 'false', required: false, desc: '行内模式（flex → inline-flex）。' },
  { name: 'as', type: 'string', default: "'div'", required: false, desc: '渲染的 HTML 标签。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
  { name: 'style', type: 'CSSProperties', default: '—', required: false, desc: '内联样式。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'flex', title: 'Flex 居中' },
  { id: 'text', title: 'Text 居中' },
  { id: 'position', title: '绝对居中' },
];

const Box = (props: { children?: any }) => <div class={styles.demoBox}>{props.children}</div>;

export const CenterDocPage = () => {
  const t = useT();
  return (
    <DocLayout>

    <div class={styles.page}>
      <h1 class={styles.h1}>Center 居中</h1>
      <p class={styles.intro}>
        {t('componentIntro.CenterIntro')}
      </p>

      {/* Props */}
      <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      {/* Flex */}
      <h2 id="flex" class={styles.h2}>{t('section.flexCenter')}</h2>
      <DemoBlock
        title={t('demo.centerDefault')}
        desc="不传任何参数时，默认 flex 水平 + 垂直居中。这是最常用的场景。"
        code={`<Center>\n  <div>居中的内容</div>\n</Center>`}
      >
        <div class={styles.demoContainer}>
          <Center><Box>两轴居中</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerFlexX')}
        desc="只居中水平方向。"
        code={`<Center flexX>\n  <div>水平居中</div>\n</Center>`}
      >
        <div class={styles.demoContainer}>
          <Center flexX><Box>水平居中</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerFlexY')}
        desc="只居中垂直方向（父级需有高度）。"
        code={`<div style={{ height: 160 }}>\n  <Center flexY>\n    <div>垂直居中</div>\n  </Center>\n</div>`}
      >
        <div class={styles.demoContainer}>
          <Center flexY><Box>垂直居中</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerInline')}
        desc="加 inline 变为 inline-flex，不换行。"
        code={`<Center flexX inline>\n  <span>行内</span>\n</Center>`}
      >
        <span>
          前面文字 <Center flexX inline><span style="background:#1677ff;color:#fff;padding:'2px 8px';border-radius:4px;font-size:0.8rem">行内居中</span></Center> 后面文字
        </span>
      </DemoBlock>

      {/* Text */}
      <h2 id="text" class={styles.h2}>{t('section.textCenter')}</h2>
      <DemoBlock
        title={t('demo.centerText')}
        desc="text-align: center，适合行内或行内块内容。"
        code={`<Center text>\n  <span>这段文字会居中</span>\n</Center>`}
      >
        <div class={styles.demoContainer}>
          <Center text><Box>text-align: center</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerVertical')}
        desc="vertical-align: middle，适合行内元素对齐。"
        code={`<div style="line-height: 3">\n  大文字 <Center vertical inline>\n    <span>对齐我</span>\n  </Center>\n</div>`}
      >
        <div style="line-height: 3">
          大文字 <Center vertical inline><Box>对齐我</Box></Center>
        </div>
      </DemoBlock>

      {/* Position */}
      <h2 id="position" class={styles.h2}>{t('section.absoluteCenter')}</h2>
      <DemoBlock
        title={t('demo.centerPosition')}
        desc={'absolute + transform 居中。Center 自身作为定位容器，父级只需给高度即可。'}
        code={`<div style={{ height: 160 }}>\n  <Center position>\n    <div>绝对居中</div>\n  </Center>\n</div>`}
      >
        <div class={styles.demoContainer}>
          <Center position><Box>绝对居中</Box></Center>
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
