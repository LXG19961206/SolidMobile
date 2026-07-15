import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface TabsMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Tabs, Tab } from '../../../src/components/Tabs';
import { Icon } from '../../../src/components/Icon';

const propsData = [
  { name: 'active', type: 'number | string', desc: 'componentProps.tabs.active' },
  { name: 'defaultActive', type: 'number | string', desc: 'componentProps.tabs.defaultActive' },
  { name: 'onChange', type: '(name) => void', desc: 'componentProps.tabs.onChange' },
  { name: 'type', type: "'line' | 'card'", desc: 'componentProps.tabs.type' },
  { name: 'color', type: 'string', desc: 'componentProps.tabs.color' },
  { name: 'background', type: 'string', desc: 'componentProps.tabs.background' },
  { name: 'animated', type: 'boolean', desc: 'componentProps.tabs.animated' },
  { name: 'border', type: 'boolean', desc: 'componentProps.tabs.border' },
  { name: 'sticky', type: 'boolean', desc: 'componentProps.tabs.sticky' },
  { name: 'swipeable', type: 'boolean', desc: 'componentProps.tabs.swipeable' },
  { name: 'lazyRender', type: 'boolean', desc: 'componentProps.tabs.lazyRender' },
  { name: 'beforeChange', type: '(name) => boolean', desc: 'componentProps.tabs.beforeChange' },
  { name: 'titleActiveColor', type: 'string', desc: 'componentProps.tabs.titleActiveColor' },
  { name: 'titleInactiveColor', type: 'string', desc: 'componentProps.tabs.titleInactiveColor' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const TabsMobile: Component<TabsMobileProps> = (props) => {
  const t = useT();
  const [active1, setActive1] = createSignal(0);
  const [active2, setActive2] = createSignal(0);
  const [active3, setActive3] = createSignal('a');

  return (
    <MobilePreview title={t('demo.tabsMobileTitle')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Line Mode */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.lineMode')}</div>
        <div style={CARD.desc}>{t('demo.lineModeDesc')}</div>
        <div style={CARD.body}>
          <Tabs active={active1()} onChange={setActive1}>
            <Tab name={0} title="Tab 1">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content 1</div>
            </Tab>
            <Tab name={1} title="Tab 2">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content 2</div>
            </Tab>
            <Tab name={2} title="Tab 3">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content 3</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Scrollable */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tabsScrollable')}</div>
        <div style={CARD.desc}>Tab titles overflow horizontally — swipe or use trackpad to scroll.</div>
        <div style={CARD.body}>
          <Tabs active={active3()} onChange={setActive3}>
            <Tab name={0} title="First"><div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content A</div></Tab>
            <Tab name={1} title="Second"><div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content B</div></Tab>
            <Tab name={2} title="Third"><div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content C</div></Tab>
            <Tab name={3} title="Fourth"><div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content D</div></Tab>
            <Tab name={4} title="Fifth"><div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content E</div></Tab>
            <Tab name={5} title="Sixth"><div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Content F</div></Tab>
          </Tabs>
        </div>
      </div>

      {/* Card Mode */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cardMode')}</div>
        <div style={CARD.desc}>{t('demo.cardModeDesc')}</div>
        <div style={CARD.body}>
          <Tabs type="card" active={active2()} onChange={setActive2}>
            <Tab name={0} title="Option A">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Card content A</div>
            </Tab>
            <Tab name={1} title="Option B">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Card content B</div>
            </Tab>
            <Tab name={2} title="Option C">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Card content C</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Custom Color */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tabsCustomColor')}</div>
        <div style={CARD.desc}>{t('demo.tabsCustomColorDesc')}</div>
        <div style={CARD.body}>
          <Tabs active={active3()} onChange={setActive3} color="#22c55e" border>
            <Tab name="a" title="All">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>All Orders</div>
            </Tab>
            <Tab name="b" title="Pending Payment">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Pending Orders</div>
            </Tab>
            <Tab name="c" title="Completed">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Completed Orders</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Icon Titles */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tabsIconTitle')}</div>
        <div style={CARD.desc}>{t('demo.tabsIconTitleDesc')}</div>
        <div style={CARD.body}>
          <Tabs defaultActive={0}>
            <Tab name={0} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="home" size={16} /> Home</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Home content</div>
            </Tab>
            <Tab name={1} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="heart" size={16} /> Favorites</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Favorites content</div>
            </Tab>
            <Tab name={2} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="user" size={16} /> Profile</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>Profile content</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Disabled */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tabsDisabled')}</div>
        <div style={CARD.desc}>{t('demo.tabsDisabledDesc')}</div>
        <div style={CARD.body}>
          <Tabs defaultActive={0}>
            <Tab name={0} title="Normal" />
            <Tab name={1} title="Disabled" disabled />
            <Tab name={2} title="Normal" />
          </Tabs>
        </div>
      </div>
    </MobilePreview>
  );
};
