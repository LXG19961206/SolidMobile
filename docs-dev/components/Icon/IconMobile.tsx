import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Icon } from '../../../src/components/Icon';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useIconTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const IconMobile = () => {
  const t = useT();
  const { propsTables } = useIconTableData();

  return (
    <MobilePreview title="Icon">
      <MobilePropsSheet propsTables={propsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('icon.demo.basic')} subtitle="name prop + variant">
          <Row><Icon name="arrow-up" size={24} /><Icon name="star" size={24} variant="fill" /><Icon name="heart" size={24} color="#fc000a" /></Row>
        </Card>
        <Card title={t('icon.demo.size')} subtitle="16 / 24 / 2rem">
          <Row><Icon name="star" size={16} /><Icon name="star" size={24} /><Icon name="star" size="2rem" /></Row>
        </Card>
        <Card title={t('icon.demo.color')} subtitle="set via color prop">
          <Row><Icon name="heart" color="#fc000a" size={24} /><Icon name="heart" color="#22c55e" size={24} /><Icon name="heart" color="#1677ff" size={24} /></Row>
        </Card>
        <Card title={t('icon.demo.line')} subtitle="line vs fill">
          <Row><Icon name="star" variant="line" size={24} /><Icon name="star" variant="fill" size={24} /><Icon name="heart" variant="line" size={24} /><Icon name="heart" variant="fill" size={24} /></Row>
        </Card>
        <Card title={t('icon.demo.clickable')}>
          <Icon name="search" aria-label="Search" size={28} style={{ cursor: 'pointer', padding: '4px', background: '#f5f5f5', 'border-radius': '8px' }} />
        </Card>
      </div>
    </MobilePreview>
  );
};

function Row(props: { children: any }) {
  return <div style={{ display: 'flex', gap: '12px', 'flex-wrap': 'wrap', 'align-items': 'center' }}>{props.children}</div>;
}
