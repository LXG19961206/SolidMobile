import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface SafeAreaMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { SafeArea } from '../../../src/components/SafeArea';
import { useT } from '../../doc-i18n';

const propsData = [
  { name: 'position', type: "'top' | 'bottom'", desc: 'componentProps.safearea.position' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const SafeAreaMobile: Component<SafeAreaMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="SafeArea 安全区域" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 说明 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>安全区域说明</div>
        <div style={CARD.desc}>
          SafeArea 用于在刘海屏、底部指示条等区域添加安全内边距。position="top" 适配顶部状态栏，
          position="bottom" 适配底部 Home 指示条。
        </div>
        <div style={CARD.body}>
          <div style={{ background: 'var(--sc-doc-card-demo, #f9fafb)', padding: '12px', 'border-radius': '8px' }}>
            <div style={{ background: '#1677ff', color: '#fff', padding: '8px 0', 'text-align': 'center', 'border-radius': '4px 4px 0 0' }}>
              <SafeArea position="top" />
              <div style={{ padding: '4px 0' }}>顶部安全区域 + 标题</div>
            </div>
            <div style={{ padding: '24px 0', 'text-align': 'center', color: 'var(--sc-doc-card-text, #374151)' }}>
              页面内容区域
            </div>
            <div style={{ background: '#1f2937', color: '#fff', padding: '8px 0', 'text-align': 'center', 'border-radius': '0 0 4px 4px' }}>
              <div style={{ padding: '4px 0' }}>底部操作栏</div>
              <SafeArea position="bottom" />
            </div>
          </div>
        </div>
      </div>

      {/* 与 NavBar 配合 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>典型场景</div>
        <div style={CARD.desc}>
          配合 NavBar 使用：顶部 SafeArea + NavBar（fixed），底部 SafeArea + 操作按钮。
        </div>
        <div style={CARD.body}>
          <div style={{ color: 'var(--sc-doc-card-desc, #6b7280)', 'font-size': '0.8rem', 'line-height': 1.6 }}>
            <code style={{ background: 'var(--sc-doc-card-placeholder, #f3f4f6)', padding: '2px 6px', 'border-radius': '3px', 'font-size': '0.75rem' }}>
              {'<SafeArea position="top" />'}
            </code>
            <br />
            <code style={{ background: 'var(--sc-doc-card-placeholder, #f3f4f6)', padding: '2px 6px', 'border-radius': '3px', 'font-size': '0.75rem' }}>
              {'<NavBar title="页面标题" fixed placeholder />'}
            </code>
            <br /><br />
            <span>... 内容区 ...</span>
            <br /><br />
            <code style={{ background: 'var(--sc-doc-card-placeholder, #f3f4f6)', padding: '2px 6px', 'border-radius': '3px', 'font-size': '0.75rem' }}>
              {'<SafeArea position="bottom" />'}
            </code>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
