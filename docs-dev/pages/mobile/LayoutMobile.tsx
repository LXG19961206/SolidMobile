import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface LayoutMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Row, Col } from '../../../src/components/Layout';

const propsData = [
  { name: 'Row.gap', type: 'string | number', desc: 'componentProps.layout.Row.gap' },
  { name: 'Row.align', type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", desc: 'componentProps.layout.Row.align' },
  { name: 'Row.justify', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", desc: 'componentProps.layout.Row.justify' },
  { name: 'Row.wrap', type: 'boolean', desc: 'componentProps.layout.Row.wrap' },
  { name: 'Col.span', type: 'number', desc: 'componentProps.layout.Col.span' },
  { name: 'Col.offset', type: 'number', desc: 'componentProps.layout.Col.offset' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const colBox = (bg: string) => ({
  background: bg,
  color: '#fff',
  padding: '8px 0',
  'text-align': 'center' as const,
  'border-radius': '4px',
  'font-size': '0.8rem',
});

export const LayoutMobile: Component<LayoutMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Layout 布局" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础栅格 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础栅格 Col.span</div>
        <div style={CARD.desc}>24 栅格系统，span 占位 1-24</div>
        <div style={CARD.body}>
          <Row gap={8}>
            <Col span={12}><div style={colBox('var(--sc-color-primary, #1677ff)')}>span=12</div></Col>
            <Col span={12}><div style={colBox('var(--sc-color-primary-hover, #5195ff)')}>span=12</div></Col>
          </Row>
          <div style={{ height: '8px' }} />
          <Row gap={8}>
            <Col span={8}><div style={colBox('var(--sc-color-primary, #1677ff)')}>span=8</div></Col>
            <Col span={8}><div style={colBox('var(--sc-color-primary-hover, #5195ff)')}>span=8</div></Col>
            <Col span={8}><div style={colBox('var(--sc-color-primary-hover, #4096ff)')}>span=8</div></Col>
          </Row>
          <div style={{ height: '8px' }} />
          <Row gap={8}>
            <Col span={6}><div style={colBox('var(--sc-color-primary, #1677ff)')}>6</div></Col>
            <Col span={6}><div style={colBox('var(--sc-color-primary-hover, #5195ff)')}>6</div></Col>
            <Col span={6}><div style={colBox('var(--sc-color-primary-hover, #4096ff)')}>6</div></Col>
            <Col span={6}><div style={colBox('var(--sc-color-primary-active, #95b8ff)')}>6</div></Col>
          </Row>
        </div>
      </div>

      {/* 偏移 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>偏移 offset</div>
        <div style={CARD.desc}>Col.offset 向右偏移若干栅格</div>
        <div style={CARD.body}>
          <Row gap={8}>
            <Col span={8}><div style={colBox('var(--sc-color-primary, #1677ff)')}>span=8</div></Col>
            <Col span={8} offset={8}><div style={colBox('var(--sc-color-primary-hover, #5195ff)')}>span=8 offset=8</div></Col>
          </Row>
          <div style={{ height: '8px' }} />
          <Row gap={8}>
            <Col span={6} offset={6}><div style={colBox('var(--sc-color-primary, #1677ff)')}>span=6 offset=6</div></Col>
            <Col span={6} offset={6}><div style={colBox('var(--sc-color-primary-hover, #5195ff)')}>span=6 offset=6</div></Col>
          </Row>
        </div>
      </div>

      {/* 对齐 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>对齐方式</div>
        <div style={CARD.desc}>justify 水平分布 / align 垂直对齐</div>
        <div style={CARD.body}>
          <div style={{ 'margin-bottom': '12px' }}>
            <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-bottom': '4px' }}>justify="between"</div>
            <Row gap={8} justify="between" style={{ background: 'var(--sc-doc-card-demo, #f9fafb)', padding: '8px', 'border-radius': '6px' }}>
              <Col span={4}><div style={colBox('var(--sc-color-primary, #1677ff)')}>左</div></Col>
              <Col span={4}><div style={colBox('var(--sc-color-primary-hover, #5195ff)')}>右</div></Col>
            </Row>
          </div>
          <div style={{ 'margin-bottom': '12px' }}>
            <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-bottom': '4px' }}>justify="center"</div>
            <Row gap={8} justify="center" style={{ background: 'var(--sc-doc-card-demo, #f9fafb)', padding: '8px', 'border-radius': '6px' }}>
              <Col span={5}><div style={colBox('var(--sc-color-primary, #1677ff)')}>中</div></Col>
              <Col span={5}><div style={colBox('var(--sc-color-primary-hover, #5195ff)')}>中</div></Col>
            </Row>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
