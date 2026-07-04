import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { PullRefresh } from '../../../src/components/PullRefresh';
import { useT } from '../../doc-i18n';

export interface PullRefreshMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'loading', type: 'boolean', desc: 'componentProps.pullrefresh.loading' },
  { name: 'onRefresh', type: '() => void | Promise', desc: 'componentProps.pullrefresh.onRefresh' },
  { name: 'pullDistance', type: 'number', desc: 'componentProps.pullrefresh.pullDistance' },
  { name: 'headHeight', type: 'number', desc: 'componentProps.pullrefresh.headHeight' },
  { name: 'successDuration', type: 'number', desc: 'componentProps.pullrefresh.successDuration' },
  { name: 'animationDuration', type: 'number', desc: 'componentProps.pullrefresh.animationDuration' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.pullrefresh.disabled' },
  { name: 'pullingText', type: 'string', desc: 'componentProps.pullrefresh.pullingText' },
  { name: 'loosingText', type: 'string', desc: 'componentProps.pullrefresh.loosingText' },
  { name: 'loadingText', type: 'string', desc: 'componentProps.pullrefresh.loadingText' },
  { name: 'successText', type: 'string', desc: 'componentProps.pullrefresh.successText' },
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
  const t = useT();
  const [count, setCount] = createSignal(0);

  return (
    <MobilePreview title="PullRefresh 下拉刷新" props={propsData} components={_props.components} onNavigate={_props.onNavigate}>
      {/* 基础用法 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.basic')}</div>
        <div style={CARD.desc}>{t('demo.basicDesc')}</div>
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
