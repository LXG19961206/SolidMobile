import { NavBar } from '../../../../src/components/NavBar';
import { Button } from '../../../../src/components/Button';
import { Icon } from '../../../../src/components/Icon';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './NavBarDocPage.module.css';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: '标题。' },
  { name: 'left', type: 'JSX.Element', default: '—', required: false, desc: '左侧自定义内容。' },
  { name: 'right', type: 'JSX.Element', default: '—', required: false, desc: '右侧自定义内容。' },
  { name: 'backArrow', type: 'boolean', default: 'false', required: false, desc: '是否显示返回箭头。' },
  { name: 'onBack', type: '() => void', default: '—', required: false, desc: '返回箭头点击回调。' },
  { name: 'onLeftClick', type: '() => void', default: '—', required: false, desc: '左侧区域点击回调。' },
  { name: 'onRightClick', type: '() => void', default: '—', required: false, desc: '右侧区域点击回调。' },
  { name: 'fixed', type: 'boolean', default: 'false', required: false, desc: '是否固定在顶部。' },
  { name: 'placeholder', type: 'boolean', default: 'false', required: false, desc: '固定时生成占位元素，避免内容被遮挡。' },
  { name: 'border', type: 'boolean', default: 'false', required: false, desc: '是否显示底部边框。' },
  { name: 'zIndex', type: 'number | string', default: '1000', required: false, desc: 'z-index。' },
  { name: 'background', type: 'string', default: '—', required: false, desc: '背景色。' },
  { name: 'color', type: 'string', default: '—', required: false, desc: '文字颜色。' },
  { name: 'height', type: 'number | string', default: '46', required: false, desc: '导航栏高度。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'demo', title: '示例' },
];

export const NavBarDocPage = () => {
  const t = useT();
  return (
  <DocLayout>
    <div class={css.page}>
      <h1 class={css.h1}>NavBar 导航栏</h1>
      <p class={css.intro}>
        {t('componentIntro.NavBarIntro')}
      </p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="demo" class={css.h2}>{t('demo.examples')}</h2>

      <DemoBlock flush
        title={t('demo.navFixedTop')}
        desc="fixed + placeholder。手机模拟器的 transform 会创建新的定位上下文，fixed 自动局限在手机屏幕内。"
        code={`<NavBar title="固定导航" fixed placeholder border />`}
      >
        <div class={css.demoBox}>
          <NavBar title="固定导航" fixed placeholder border />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.basic')} desc="最简单的导航栏，只有标题。" code={'<NavBar title="页面标题" />'}>
        <div class={css.demoBox}><NavBar title="页面标题" /></div>
      </DemoBlock>

      <DemoBlock title={t('demo.navBackArrow')} desc="设置 backArrow 显示返回图标，onBack 处理点击。" code={'<NavBar title="详情" backArrow onBack={() => history.back()} />'}>
        <div class={css.demoBox}><NavBar title="详情" backArrow onBack={() => { }} /></div>
      </DemoBlock>

      <DemoBlock title={t('demo.navRightAction')} desc="right 可传入按钮、图标或任意 JSX。" code={'<NavBar\n  title="编辑资料"\n  backArrow\n  right={<Button size="sm">保存</Button>}\n/>'}>
        <div class={css.demoBox}><NavBar title="编辑资料" backArrow right={<Button size="sm">保存</Button>} /></div>
      </DemoBlock>

      <DemoBlock title={t('demo.navCustomSides')} desc="left 和 right 同时自定义，适合复杂操作栏。" code={'<NavBar\n  title="消息"\n  left={<Icon name="settings" size={20} />}\n  right={<Icon name="search" size={20} />}\n/>'}>
        <div class={css.demoBox}><NavBar title="消息" left={<Icon name="settings" size={20} />} right={<Icon name="search" size={20} />} /></div>
      </DemoBlock>


    </div>
  </DocLayout>
  );
};
