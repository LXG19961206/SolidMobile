import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface NavBarMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { NavBar } from '../../../src/components/NavBar';
import { Icon } from '../../../src/components/Icon';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from '../../i18n/navbar/zh-CN';
import enUS from '../../i18n/navbar/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const propsData = [
  { name: 'title', type: 'string | JSX.Element', desc: 'componentProps.navbar.title' },
  { name: 'left', type: 'JSX.Element', desc: 'componentProps.navbar.left' },
  { name: 'right', type: 'JSX.Element', desc: 'componentProps.navbar.right' },
  { name: 'backArrow', type: 'boolean', desc: 'componentProps.navbar.backArrow' },
  { name: 'onBack', type: '() => void', desc: 'componentProps.navbar.onBack' },
  { name: 'onLeftClick', type: '() => void', desc: 'componentProps.navbar.onLeftClick' },
  { name: 'onRightClick', type: '() => void', desc: 'componentProps.navbar.onRightClick' },
  { name: 'fixed', type: 'boolean', desc: 'componentProps.navbar.fixed' },
  { name: 'placeholder', type: 'boolean', desc: 'componentProps.navbar.placeholder' },
  { name: 'border', type: 'boolean', desc: 'componentProps.navbar.border' },
  { name: 'background', type: 'string', desc: 'componentProps.navbar.background' },
  { name: 'color', type: 'string', desc: 'componentProps.navbar.color' },
  { name: 'height', type: 'number | string', desc: 'componentProps.navbar.height' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const NavBarMobile: Component<NavBarMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="NavBar" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.basicTitle')}</div>
        <div style={CARD.desc}>{t('demo.basicTitleDesc')}</div>
        <div style={CARD.body}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar title="Page Title" border />
          </div>
        </div>
      </div>

      {/* 返回箭头 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.navBackArrow')}</div>
        <div style={CARD.desc}>{t('demo.navBackArrowDesc')}</div>
        <div style={CARD.body}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar title="Details" backArrow onBack={() => {}} border />
          </div>
        </div>
      </div>

      {/* 左右内容 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.navCustomSides')}</div>
        <div style={CARD.desc}>{t('demo.navCustomSidesDesc')}</div>
        <div style={{ ...CARD.body, display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px' }}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar
              title="Messages"
              left={<Icon name="user" size={20} />}
              right={<Icon name="settings" size={20} />}
              border
            />
          </div>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar
              title="Edit"
              left={<span style={{ 'font-size': '0.9rem', color: 'var(--sc-color-primary, #1677ff)' }}>Cancel</span>}
              right={<span style={{ 'font-size': '0.9rem', color: 'var(--sc-color-primary, #1677ff)' }}>Done</span>}
              border
            />
          </div>
        </div>
      </div>

      {/* 自定义样式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customNavStyle')}</div>
        <div style={CARD.desc}>{t('demo.customNavStyleDesc')}</div>
        <div style={CARD.body}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar title="Brand NavBar" background="#1677ff" color="#fff" backArrow onBack={() => {}} />
          </div>
        </div>
      </div>

      {/* 固定模式说明 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.navFixedTop')}</div>
        <div style={CARD.desc}>{t('demo.navFixedTopDesc')}</div>
      </div>
    </MobilePreview>
  );
};
