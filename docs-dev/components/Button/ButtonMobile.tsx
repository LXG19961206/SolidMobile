import { registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Button } from '../../../src/components/Button';
import zhCN from './zh-CN';
import enUS from './en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ButtonMobile = () => (
  <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
    <Card title="Types" subtitle="primary / secondary / success / warning / danger / info">
      <Row><Button type="primary">Primary</Button><Button type="danger">Danger</Button><Button type="success">Success</Button></Row>
    </Card>
    <Card title="Sizes" subtitle="xs / sm / md / lg">
      <Row><Button size="xs">XS</Button><Button size="sm">SM</Button><Button size="md">MD</Button><Button size="lg">LG</Button></Row>
    </Card>
    <Card title="Variants" subtitle="solid / outline / ghost">
      <Row><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></Row>
    </Card>
    <Card title="Icon">
      <Row><Button icon="star">Favorite</Button><Button icon="arrow-right" iconPosition="right">Next</Button></Row>
    </Card>
    <Card title="Loading & Disabled">
      <Row><Button type="primary" loading loadingText="Loading...">Submit</Button></Row>
      <Row style="margin-top:8px"><Button disabled>Disabled</Button><Button type="primary" disabled>Primary</Button></Row>
    </Card>
    <Card title="Block & Round">
      <Button block round type="primary">Block Round</Button>
    </Card>
  </div>
);

function Row(props: { children: any; style?: string }) {
  return <div style={`display:flex;gap:8px;flex-wrap:wrap;align-items:center;${props.style ?? ''}`}>{props.children}</div>;
}
