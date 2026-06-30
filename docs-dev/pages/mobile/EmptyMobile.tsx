import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface EmptyMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Empty } from '../../../src/components/Empty';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'description', type: 'string', desc: '描述文字' },
  { name: 'image', type: "'default' | 'network' | 'search' | JSX.Element", desc: '图片类型或自定义 JSX，默认 default' },
  { name: 'children', type: 'JSX.Element', desc: '自定义底部内容（如按钮）' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const EmptyMobile: Component<EmptyMobileProps> = (props) => {
  return (
    <MobilePreview title="Empty 空状态" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础空状态</div>
        <div style={CARD.desc}>默认图片 + 描述文字</div>
        <div style={CARD.body}>
          <Empty description="暂无数据" />
        </div>
      </div>

      {/* 不同预设 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>预设图片类型</div>
        <div style={CARD.desc}>default / network / search 三种预设</div>
        <div style={{ ...CARD.body, display: 'flex' as const, gap: '12px', 'justify-content': 'space-around' }}>
          <div style={{ flex: 1 }}>
            <Empty image="default" description="暂无数据" />
          </div>
          <div style={{ flex: 1 }}>
            <Empty image="network" description="网络异常" />
          </div>
          <div style={{ flex: 1 }}>
            <Empty image="search" description="未找到结果" />
          </div>
        </div>
      </div>

      {/* 带操作按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>带操作按钮</div>
        <div style={CARD.desc}>children 可放置操作按钮</div>
        <div style={CARD.body}>
          <Empty description="购物车是空的">
            <Button type="primary" text="去逛逛" size="sm" style={{ 'margin-top': '8px' }} />
          </Empty>
        </div>
      </div>

      {/* 自定义图片 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义图片</div>
        <div style={CARD.desc}>image 可传入自定义 JSX</div>
        <div style={CARD.body}>
          <Empty
            image={<div style={{ 'font-size': '3rem' }}>📭</div>}
            description="自定义空状态"
          >
            <Button type="primary" text="刷新" size="sm" style={{ 'margin-top': '8px' }} />
          </Empty>
        </div>
      </div>
    </MobilePreview>
  );
};
