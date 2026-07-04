import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface DividerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Divider } from '../../../src/components/Divider';

const propsData = [
  { name: 'direction', type: "'horizontal' | 'vertical'", desc: 'componentProps.divider.direction' },
  { name: 'text', type: 'string', desc: 'componentProps.divider.text' },
  { name: 'dashed', type: 'boolean', desc: 'componentProps.divider.dashed' },
  { name: 'color', type: 'string', desc: 'componentProps.divider.color' },
  { name: 'size', type: 'string | number', desc: 'componentProps.divider.size' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const DividerMobile: Component<DividerMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Divider 分割线" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础水平 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础水平分割</div>
        <div style={CARD.desc}>默认实线，1px 粗细</div>
        <div style={CARD.body}>
          <div style={{ padding: '12px 0' }}>上方内容</div>
          <Divider />
          <div style={{ padding: '12px 0' }}>下方内容</div>
        </div>
      </div>

      {/* 带文字 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>带文字分割</div>
        <div style={CARD.desc}>text 属性在中间嵌入文字</div>
        <div style={CARD.body}>
          <Divider text="我是分割线" />
          <div style={{ height: '16px' }} />
          <Divider text="或者这样" />
          <div style={{ height: '16px' }} />
          <Divider text="没有更多了" />
        </div>
      </div>

      {/* 虚线 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>虚线分割</div>
        <div style={CARD.desc}>dashed 属性切换为虚线风格</div>
        <div style={CARD.body}>
          <Divider dashed />
          <div style={{ height: '16px' }} />
          <Divider dashed text="虚线文字" />
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义颜色 & 粗细</div>
        <div style={CARD.desc}>color 和 size 属性控制外观</div>
        <div style={CARD.body}>
          <Divider color="#1677ff" size={2} />
          <div style={{ height: '16px' }} />
          <Divider color="#ef4444" text="红色警告" size={2} />
          <div style={{ height: '16px' }} />
          <Divider color="#22c55e" dashed text="绿色虚线" />
        </div>
      </div>

      {/* 垂直分割 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>垂直分割</div>
        <div style={CARD.desc}>direction="vertical"，需父级有高度</div>
        <div style={{ ...CARD.body, display: 'flex' as const, 'align-items': 'center' as const, height: '40px', gap: '12px' }}>
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>文字一</span>
          <Divider direction="vertical" />
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>文字二</span>
          <Divider direction="vertical" dashed color="#1677ff" />
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>文字三</span>
          <Divider direction="vertical" color="#ef4444" size={2} />
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>文字四</span>
        </div>
      </div>
    </MobilePreview>
  );
};
