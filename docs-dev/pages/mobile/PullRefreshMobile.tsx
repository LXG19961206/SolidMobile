import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { PullRefresh } from '../../../src/components/PullRefresh';

export interface PullRefreshMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'loading', type: 'boolean', desc: '受控加载状态' },
  { name: 'onRefresh', type: '() => void | Promise', desc: '刷新回调' },
  { name: 'pullDistance', type: 'number', desc: '触发刷新的下拉距离 (px)，默认 80' },
  { name: 'headHeight', type: 'number', desc: '顶部提示区高度 (px)，默认 60' },
  { name: 'successDuration', type: 'number', desc: '成功状态展示时长 (ms)，默认 500' },
  { name: 'animationDuration', type: 'number', desc: '回弹动画时长 (ms)，默认 300' },
  { name: 'disabled', type: 'boolean', desc: '禁用' },
  { name: 'pullingText', type: 'string', desc: '下拉文案' },
  { name: 'loosingText', type: 'string', desc: '释放文案' },
  { name: 'loadingText', type: 'string', desc: '加载文案' },
  { name: 'successText', type: 'string', desc: '成功文案' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0' },
};

async function mockRefresh(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1200));
}

export const PullRefreshMobile: Component<PullRefreshMobileProps> = (_props) => {
  const [count, setCount] = createSignal(0);

  return (
    <MobilePreview title="PullRefresh 下拉刷新" props={propsData} components={_props.components} onNavigate={_props.onNavigate}>
      {/* 基础用法 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础用法</div>
        <div style={CARD.desc}>下拉触发刷新，松手后自动回弹。</div>
        <div style={CARD.body}>
          <PullRefresh onRefresh={mockRefresh}>
            <div style={{ padding: '80px 16px', 'text-align': 'center', color: '#969799', 'font-size': '0.8125rem' }}>
              <div style={{ 'font-size': '0.9rem', color: '#323233', 'margin-bottom': '8px' }}>下拉刷新</div>
              <div>刷新次数: {count()}</div>
            </div>
          </PullRefresh>
        </div>
      </div>

      {/* 自定义文案 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义文案</div>
        <div style={CARD.desc}>自定义各状态文案。</div>
        <div style={CARD.body}>
          <PullRefresh
            onRefresh={mockRefresh}
            pullingText="再用力一点"
            loosingText="松手刷新"
            loadingText="加载中..."
            successText="完成了"
          >
            <div style={{ padding: '80px 16px', 'text-align': 'center', color: '#323233', 'font-size': '0.9rem' }}>
              自定义文案
            </div>
          </PullRefresh>
        </div>
      </div>
    </MobilePreview>
  );
};
