import { registerLocale } from '../../doc-i18n';
import { Button } from '../../../src/components/Button';
import zhCN from './zh-CN';
import enUS from './en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ButtonMobile = () => (
  <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '16px' }}>
    <Row><Button type="primary">Primary</Button><Button type="danger">Danger</Button><Button type="success">Success</Button></Row>
    <Row><Button size="xs">XS</Button><Button size="sm">SM</Button><Button size="md">MD</Button><Button size="lg">LG</Button></Row>
    <Row><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></Row>
    <Row><Button icon="star">Favorite</Button><Button icon="arrow-right" iconPosition="right">Next</Button></Row>
    <Row><Button type="primary" loading loadingText="Loading...">Submit</Button></Row>
    <Row><Button disabled>Disabled</Button><Button type="primary" disabled>Primary</Button></Row>
  </div>
);

function Row(props: { children: any }) {
  return <div style={{ display: 'flex', gap: '8px', 'flex-wrap': 'wrap', 'align-items': 'center' }}>{props.children}</div>;
}
