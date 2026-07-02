import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CenterMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Center } from '../../../src/components/Center';

const propsData = [
  { name: 'flexX', type: 'boolean', desc: 'display:flex + justify-content:center。无需父级高度' },
  { name: 'flexY', type: 'boolean', desc: 'display:flex + align-items:center + height:100%。需父级有明确高度' },
  { name: 'text', type: 'boolean', desc: 'text-align: center，适合行内/文本' },
  { name: 'vertical', type: 'boolean', desc: 'inline-block + vertical-align: middle' },
  { name: 'position', type: 'boolean', desc: 'relative + absolute+transform。Center 自身填充父级，子元素绝对居中' },
  { name: 'inline', type: 'boolean', desc: '切换为 inline-flex，去掉 height:100%，适合行内场景' },
  { name: 'as', type: 'string', desc: '渲染标签，默认 div' },
  { name: '（无 props）', type: '—', desc: '默认行为：flexX + flexY 同时生效，即完全居中' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const stage = (h?: string) => ({
  background: 'var(--sc-doc-card-demo, #f8fafc)',
  border: '1px dashed #cbd5e1',
  'border-radius': '8px',
  width: '100%',
  ...(h ? { height: h } : {}),
  position: 'relative' as const,
});

const chip = {
  background: '#1677ff', color: '#fff', padding: '6px 16px',
  'border-radius': '16px', 'font-size': '0.8rem', 'font-weight': 600,
  'white-space': 'nowrap' as const,
};

export const CenterMobile: Component<CenterMobileProps> = (props) => {
  return (
    <MobilePreview title="Center 居中" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* ══ 默认行为：无 props = 完全居中 ══ */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>默认行为（无 props）</div>
        <div style={CARD.desc}>
          不传任何 props 时，默认 flexX + flexY 同时生效，即水平垂直完全居中。
          注意：flexY 需要父级有明确高度，否则 height:100% 不生效。
        </div>
        <div style={CARD.body}>
          <div style={stage('80px')}>
            <Center>
              <span style={chip}>默认完全居中</span>
            </Center>
          </div>
        </div>
      </div>

      {/* ══ flexX — 仅水平居中，不需要父级高度 ══ */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>flexX 仅水平居中</div>
        <div style={CARD.desc}>
          display:flex + justify-content:center。无需父级高度，容器高度由内容撑开。
          适合导航栏标题、按钮组等只需水平居中的场景。
        </div>
        <div style={CARD.body}>
          {/* 无需明确高度，内容自然撑开 */}
          <div style={{
            ...stage(), padding: '12px', display: 'flex' as const, gap: '8px',
          }}>
            <span style={{
              padding: '4px 10px', background: 'var(--sc-color-background-secondary, #e2e8f0)', 'border-radius': '12px',
              'font-size': '0.75rem', color: '#64748b',
            }}>标签A</span>
            <span style={{
              padding: '4px 10px', background: 'var(--sc-color-background-secondary, #e2e8f0)', 'border-radius': '12px',
              'font-size': '0.75rem', color: '#64748b',
            }}>标签B</span>
          </div>
          <div style={{ height: '8px' }} />
          <div style={stage()}>
            <Center flexX>
              <span style={chip}>仅水平居中，高度自适应</span>
            </Center>
          </div>
        </div>
      </div>

      {/* ══ flexY — 仅垂直居中，父级必须有高度 ══ */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>flexY 仅垂直居中</div>
        <div style={CARD.desc}>
          display:flex + align-items:center + height:100%。必须放在有明确高度的父容器中。
          适合列表项中让内容垂直对齐。
        </div>
        <div style={CARD.body}>
          <div style={stage('80px')}>
            <Center flexY>
              <span style={chip}>垂直居中（父级高度 80px）</span>
            </Center>
          </div>
        </div>
      </div>

      {/* ══ flexX + flexY — 完全居中 ══ */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>flexX + flexY 完全居中</div>
        <div style={CARD.desc}>和默认行为等价。弹窗内容、空状态、Loading 等场景。</div>
        <div style={CARD.body}>
          <div style={stage('120px')}>
            <Center flexX flexY>
              <div style={{ 'text-align': 'center' }}>
                <div style={{ 'font-size': '1.6rem', 'margin-bottom': '4px' }}>📦</div>
                <div style={{ 'font-size': '0.85rem', 'font-weight': 600, color: 'var(--sc-doc-card-text, #374151)' }}>暂无数据</div>
                <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>请先添加内容</div>
              </div>
            </Center>
          </div>
        </div>
      </div>

      {/* ══ text — 文字居中 ══ */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>text 文字居中</div>
        <div style={CARD.desc}>text-align: center。纯 CSS 方案，不创建 flex 容器，适合多段文字。</div>
        <div style={CARD.body}>
          <div style={{ ...stage(), padding: '16px' }}>
            <Center text>
              <div>
                <div style={{ 'font-size': '0.9rem', 'font-weight': 600, color: 'var(--sc-doc-card-text, #374151)' }}>
                  居中标题
                </div>
                <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '4px' }}>
                  使用 text 属性让这段文字居中，内部仍然是 block 元素，不会变成 flex item。
                </div>
              </div>
            </Center>
          </div>
        </div>
      </div>

      {/* ══ vertical — 行内垂直对齐 ══ */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>vertical 行内对齐</div>
        <div style={CARD.desc}>
          inline-block + vertical-align: middle。适合让图标和文字在行内垂直居中对齐。
          常配合 inline 使用。
        </div>
        <div style={CARD.body}>
          <div style={{ ...stage(), padding: '16px', 'font-size': '0.85rem', 'line-height': '32px' }}>
            <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>左侧文字</span>
            <Center vertical inline style={{ width: '48px', 'text-align': 'center' }}>
              <span style={{ 'font-size': '1.2rem' }}>⭐</span>
            </Center>
            <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>中间内容</span>
            <Center vertical inline style={{ width: '48px', 'text-align': 'center' }}>
              <span style={{ 'font-size': '1.2rem' }}>❤️</span>
            </Center>
            <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>右侧文字</span>
          </div>
        </div>
      </div>

      {/* ══ position — 绝对居中 ══ */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>position 绝对居中</div>
        <div style={CARD.desc}>
          Center 自身为定位容器（relative + 100%宽高），内部 wrapper 用 absolute +
          transform 居中。适合覆盖层、水印、角标等需要脱离文档流的场景。
        </div>
        <div style={CARD.body}>
          <div style={stage('100px')}>
            <Center position>
              <span style={{
                background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '6px 16px',
                'border-radius': '20px', 'font-size': '0.8rem',
              }}>
                🔒 覆盖层绝对居中
              </span>
            </Center>
            <div style={{
              position: 'absolute' as const, bottom: '6px', right: '10px',
              'font-size': '0.6rem', color: '#94a3b8',
            }}>
              父级 relative
            </div>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
