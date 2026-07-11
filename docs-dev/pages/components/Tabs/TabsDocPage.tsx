import { createSignal } from 'solid-js';
import { Tabs, Tab } from '../../../../src/components/Tabs';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import { useT } from '../../../doc-i18n';
import css from './TabsDocPage.module.css';

const tabsProps: PropRow[] = [
  { name: 'active', type: 'number | string', default: '—', required: false, desc: 'componentProps.tabs.active' },
  { name: 'defaultActive', type: 'number | string', default: 'First tab', required: false, desc: 'componentProps.tabs.defaultActive' },
  { name: 'onChange', type: '(name: number | string) => void', default: '—', required: false, desc: 'componentProps.tabs.onChange' },
  { name: 'type', type: "'line' | 'card'", default: "'line'", required: false, desc: 'componentProps.tabs.type' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.tabs.color' },
  { name: 'background', type: 'string', default: '—', required: false, desc: 'componentProps.tabs.background' },
  { name: 'duration', type: 'number', default: '0.3', required: false, desc: 'componentProps.tabs.duration' },
  { name: 'animated', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tabs.animated' },
  { name: 'border', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tabs.border' },
  { name: 'sticky', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tabs.sticky' },
  { name: 'lazyRender', type: 'boolean', default: 'true', required: false, desc: 'componentProps.tabs.lazyRender' },
  { name: 'titleActiveColor', type: 'string', default: '—', required: false, desc: 'componentProps.tabs.titleActiveColor' },
  { name: 'titleInactiveColor', type: 'string', default: '—', required: false, desc: 'componentProps.tabs.titleInactiveColor' },
  { name: 'beforeChange', type: '(name) => boolean | Promise<boolean>', default: '—', required: false, desc: 'componentProps.tabs.beforeChange' },
];

const tabProps: PropRow[] = [
  { name: 'title', type: 'string | JSX.Element', default: '—', required: true, desc: 'componentProps.tabs.title' },
  { name: 'name', type: 'number | string', default: '—', required: true, desc: 'componentProps.tabs.name' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tabs.disabled' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.tabs.children' },
];

const tocItems: TOCItem[] = [
  { id: 'tabs-props', title: 'Tabs Props' },
  { id: 'tab-props', title: 'Tab Props' },
  { id: 'basic', title: 'Basic Usage' },
  { id: 'styles', title: 'Style' },
  { id: 'controlled', title: 'Controlled' },
];

export const TabsDocPage = () => {
  const t = useT();
  const [active, setActive] = createSignal('tab1');

  return (
    <DocLayout>

      <div class={css.page}>
        <h1 class={css.h1}>Tabs</h1>
        <p class={css.intro}>
          {t('componentIntro.TabsIntro')}
        </p>

        <h2 id="tabs-props" class={css.h2}>Tabs {t('common.props')}</h2>
        <PropsTable rows={tabsProps} />
        <h2 id="tab-props" class={css.h2}>Tab {t('common.props')}</h2>
        <PropsTable rows={tabProps} />

        <h2 id="basic" class={css.h2}>{t('demo.basic')}</h2>
        <DemoBlock title={t('demo.lineMode')} desc={t('demoDesc.tabs_line')} code={`<Tabs>\n  <Tab title="Tab 1" name="a"><div>Content 1</div></Tab>\n  <Tab title="Tab 2" name="b"><div>Content 2</div></Tab>\n  <Tab title="Tab 3" name="c"><div>Content 3</div></Tab>\n</Tabs>`}>
          <Tabs>
            <Tab title="Tab 1" name="a"><div class={css.demoPanel}>Content 1</div></Tab>
            <Tab title="Tab 2" name="b"><div class={css.demoPanel}>Content 2</div></Tab>
            <Tab title="Tab 3" name="c"><div class={css.demoPanel}>Content 3</div></Tab>
          </Tabs>
        </DemoBlock>

        <DemoBlock title={t('demo.jsxTitle')} desc={t('demoDesc.tabs_jsx')} code={`<Tabs>\n  <Tab title={<span>🔔 Notifications</span>} name="a"><div>Notification content</div></Tab>\n  <Tab title={<span>⚙ Settings</span>} name="b"><div>Settings content</div></Tab>\n  <Tab title="Account" name="c"><div>Account content</div></Tab>\n</Tabs>`}>
          <Tabs>
            <Tab title={<span>🔔 Notifications</span>} name="a"><div class={css.demoPanel}>Notification content</div></Tab>
            <Tab title={<span>⚙ Settings</span>} name="b"><div class={css.demoPanel}>Settings content</div></Tab>
            <Tab title="Account" name="c"><div class={css.demoPanel}>Account content</div></Tab>
          </Tabs>
        </DemoBlock>

        <h2 id="styles" class={css.h2}>{t('section.styles')}</h2>
        <DemoBlock title={t('demo.cardMode')} desc={t('demoDesc.tabs_card')} code={`<Tabs type="card">\n  <Tab title="Option 1" name="a"><div>Content 1</div></Tab>\n  <Tab title="Option 2" name="b"><div>Content 2</div></Tab>\n  <Tab title="Option 3" name="c"><div>Content 3</div></Tab>\n</Tabs>`}>
          <Tabs type="card">
            <Tab title="Option 1" name="a"><div class={css.demoPanel}>Content 1</div></Tab>
            <Tab title="Option 2" name="b"><div class={css.demoPanel}>Content 2</div></Tab>
            <Tab title="Option 3" name="c"><div class={css.demoPanel}>Content 3</div></Tab>
          </Tabs>
        </DemoBlock>

        <DemoBlock title={t('demo.customColor')} desc={t('demo.customColorDesc')} code={`<Tabs color="#22c55e" titleActiveColor="#22c55e">\n  <Tab title="绿色主题" name="a"><div>绿色</div></Tab>\n  <Tab title="标签" name="b"><div>标签</div></Tab>\n</Tabs>`}>
          <Tabs color="#22c55e" titleActiveColor="#22c55e">
            <Tab title="绿色主题" name="a"><div class={css.demoPanel}>绿色</div></Tab>
            <Tab title="标签" name="b"><div class={css.demoPanel}>标签</div></Tab>
          </Tabs>
        </DemoBlock>

        <h2 id="controlled" class={css.h2}>{t('demo.controlled')}</h2>
        <DemoBlock title={t('demo.activeOnChange')} desc={t('demoDesc.tabs_controlled')} code={`const [active, setActive] = createSignal('tab1');\n\n<Tabs active={active()} onChange={setActive}>\n  <Tab title="Tab1" name="tab1"><div>Content 1</div></Tab>\n  <Tab title="Tab2" name="tab2"><div>Content 2</div></Tab>\n  <Tab title="Tab3（禁用）" name="tab3" disabled><div>Content 3</div></Tab>\n</Tabs>\n\n<div>当前激活: {active()}</div>`}>
          <Tabs active={active()} onChange={setActive}>
            <Tab title="Tab1" name="tab1"><div class={css.demoPanel}>Content 1</div></Tab>
            <Tab title="Tab2" name="tab2"><div class={css.demoPanel}>Content 2</div></Tab>
            <Tab title="Tab3（禁用）" name="tab3" disabled><div class={css.demoPanel}>Content 3</div></Tab>
          </Tabs>
          <div style="margin-top:0.75rem;font-size:0.85rem;color:#6b7280">
            当前激活: <code>{active()}</code>
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
