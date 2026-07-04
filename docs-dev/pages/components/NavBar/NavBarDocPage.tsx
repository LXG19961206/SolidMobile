import { NavBar } from '../../../../src/components/NavBar';
import { Button } from '../../../../src/components/Button';
import { Icon } from '../../../../src/components/Icon';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './NavBarDocPage.module.css';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.NavBar.title' },
  { name: 'left', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.NavBar.left' },
  { name: 'right', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.NavBar.right' },
  { name: 'backArrow', type: 'boolean', default: 'false', required: false, desc: 'componentProps.NavBar.backArrow' },
  { name: 'onBack', type: '() => void', default: '—', required: false, desc: 'componentProps.NavBar.onBack' },
  { name: 'onLeftClick', type: '() => void', default: '—', required: false, desc: 'componentProps.NavBar.onLeftClick' },
  { name: 'onRightClick', type: '() => void', default: '—', required: false, desc: 'componentProps.NavBar.onRightClick' },
  { name: 'fixed', type: 'boolean', default: 'false', required: false, desc: 'componentProps.NavBar.fixed' },
  { name: 'placeholder', type: 'boolean', default: 'false', required: false, desc: 'componentProps.NavBar.placeholder' },
  { name: 'border', type: 'boolean', default: 'false', required: false, desc: 'componentProps.NavBar.border' },
  { name: 'zIndex', type: 'number | string', default: '1000', required: false, desc: 'componentProps.NavBar.zIndex' },
  { name: 'background', type: 'string', default: '—', required: false, desc: 'componentProps.NavBar.background' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.NavBar.color' },
  { name: 'height', type: 'number | string', default: '46', required: false, desc: 'componentProps.NavBar.height' },
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
