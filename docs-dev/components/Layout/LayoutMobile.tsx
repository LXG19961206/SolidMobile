import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Row, Col } from '../../../src/components/Layout';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useLayoutTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const box = (bg: string) => ({
  background: bg,
  color: '#fff',
  padding: '8px 0',
  'text-align': 'center' as const,
  'border-radius': '4px',
  'font-size': '0.8rem',
});

export const LayoutMobile = () => {
  const t = useT();
  const { propsTables } = useLayoutTableData();

  return (
    <MobilePreview title="Layout">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Basic Grid */}
        <Card title={t('layout.demo.grid')}>
          <Row gap={8}>
            <Col span={12}><div style={box('var(--sc-color-primary, #1677ff)')}>span=12</div></Col>
            <Col span={12}><div style={box('var(--sc-color-primary-hover, #5195ff)')}>span=12</div></Col>
          </Row>
          <div style={{ height: '8px' }} />
          <Row gap={8}>
            <Col span={8}><div style={box('var(--sc-color-primary, #1677ff)')}>span=8</div></Col>
            <Col span={8}><div style={box('var(--sc-color-primary-hover, #5195ff)')}>span=8</div></Col>
            <Col span={8}><div style={box('var(--sc-color-primary-hover, #4096ff)')}>span=8</div></Col>
          </Row>
          <div style={{ height: '8px' }} />
          <Row gap={8}>
            <Col span={6}><div style={box('var(--sc-color-primary, #1677ff)')}>6</div></Col>
            <Col span={6}><div style={box('var(--sc-color-primary-hover, #5195ff)')}>6</div></Col>
            <Col span={6}><div style={box('var(--sc-color-primary-hover, #4096ff)')}>6</div></Col>
            <Col span={6}><div style={box('var(--sc-color-primary-active, #95b8ff)')}>6</div></Col>
          </Row>
        </Card>

        {/* Offset */}
        <Card title={t('layout.demo.offset')}>
          <Row gap={8}>
            <Col span={8}><div style={box('var(--sc-color-primary, #1677ff)')}>span=8</div></Col>
            <Col span={8} offset={8}><div style={box('var(--sc-color-primary-hover, #5195ff)')}>span=8 offset=8</div></Col>
          </Row>
          <div style={{ height: '8px' }} />
          <Row gap={8}>
            <Col span={6} offset={6}><div style={box('var(--sc-color-primary, #1677ff)')}>span=6 offset=6</div></Col>
            <Col span={6} offset={6}><div style={box('var(--sc-color-primary-hover, #5195ff)')}>span=6 offset=6</div></Col>
          </Row>
        </Card>

        {/* Alignment */}
        <Card title={t('layout.demo.align')}>
          <div style={{ 'margin-bottom': '12px' }}>
            <div style={{ 'font-size': '0.75rem', color: 'var(--sc-color-text-secondary, #9ca3af)', 'margin-bottom': '4px' }}>justify="between"</div>
            <Row gap={8} justify="between" style={{ background: 'var(--sc-color-background-secondary, #f9fafb)', padding: '8px', 'border-radius': '6px' }}>
              <Col span={4}><div style={box('var(--sc-color-primary, #1677ff)')}>Left</div></Col>
              <Col span={4}><div style={box('var(--sc-color-primary-hover, #5195ff)')}>Right</div></Col>
            </Row>
          </div>
          <div>
            <div style={{ 'font-size': '0.75rem', color: 'var(--sc-color-text-secondary, #9ca3af)', 'margin-bottom': '4px' }}>justify="center"</div>
            <Row gap={8} justify="center" style={{ background: 'var(--sc-color-background-secondary, #f9fafb)', padding: '8px', 'border-radius': '6px' }}>
              <Col span={5}><div style={box('var(--sc-color-primary, #1677ff)')}>Center</div></Col>
              <Col span={5}><div style={box('var(--sc-color-primary-hover, #5195ff)')}>Center</div></Col>
            </Row>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
