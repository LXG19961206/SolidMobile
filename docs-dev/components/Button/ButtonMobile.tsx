import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Button } from '../../../src/components/Button';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ButtonMobile = () => {
  const t = useT();
  return (
    <MobilePreview title="Button">
      <div style={{ padding: '8px 0', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('button.demo.types')} subtitle="primary / secondary / success">
          <Row><Button type="primary">Primary</Button><Button type="danger">Danger</Button><Button type="success">Success</Button></Row>
        </Card>
        <Card title={t('button.demo.sizes')} subtitle="xs / sm / md / lg">
          <Row><Button size="xs">XS</Button><Button size="sm">SM</Button><Button size="md">MD</Button><Button size="lg">LG</Button></Row>
        </Card>
        <Card title={t('button.demo.variant')} subtitle="solid / outline / ghost">
          <Row><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></Row>
        </Card>
        <Card title={t('button.demo.icon')}>
          <Row><Button icon="star">Favorite</Button><Button icon="arrow-right" iconPosition="right">Next</Button></Row>
        </Card>
        <Card title={t('button.demo.loading')}>
          <Row><Button type="primary" loading loadingText="Loading...">Submit</Button></Row>
          <Row style="margin-top:8px"><Button disabled>Disabled</Button><Button type="primary" disabled>Primary</Button></Row>
        </Card>
        <Card title={t('button.demo.block')}>
          <Button block round type="primary">Block Round</Button>
        </Card>
      </div>
    </MobilePreview>
  );
};

function Row(props: { children: any; style?: string }) {
  return <div style={`display:flex;gap:8px;flex-wrap:wrap;align-items:center;${props.style ?? ''}`}>{props.children}</div>;
}
