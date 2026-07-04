import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface NavBarMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { NavBar } from '../../../src/components/NavBar';
import { Icon } from '../../../src/components/Icon';
import { useT } from '../../doc-i18n';

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
    <MobilePreview title="NavBar 导航栏" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础标题</div>
        <div style={CARD.desc}>仅标题，无左右按钮</div>
        <div style={CARD.body}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar title="页面标题" border />
          </div>
        </div>
      </div>

      {/* 返回箭头 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>返回箭头</div>
        <div style={CARD.desc}>backArrow + onBack 实现返回</div>
        <div style={CARD.body}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar title="详情页" backArrow onBack={() => {}} border />
          </div>
        </div>
      </div>

      {/* 左右内容 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>左右内容</div>
        <div style={CARD.desc}>left / right 插槽自定义</div>
        <div style={{ ...CARD.body, display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px' }}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar
              title="消息"
              left={<Icon name="user" size={20} />}
              right={<Icon name="settings" size={20} />}
              border
            />
          </div>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar
              title="编辑"
              left={<span style={{ 'font-size': '0.9rem', color: '#1677ff' }}>取消</span>}
              right={<span style={{ 'font-size': '0.9rem', color: '#1677ff' }}>完成</span>}
              border
            />
          </div>
        </div>
      </div>

      {/* 自定义样式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义样式</div>
        <div style={CARD.desc}>background / color 控制外观</div>
        <div style={CARD.body}>
          <div style={{ border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' }}>
            <NavBar title="品牌色导航" background="#1677ff" color="#fff" backArrow onBack={() => {}} />
          </div>
        </div>
      </div>

      {/* 固定模式说明 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>固定模式 fixed</div>
        <div style={CARD.desc}>
          设置 fixed + placeholder 后，NavBar 固定在页面顶部，并自动生成等高的占位元素，
          防止内容被 NavBar 遮挡。
        </div>
      </div>
    </MobilePreview>
  );
};
