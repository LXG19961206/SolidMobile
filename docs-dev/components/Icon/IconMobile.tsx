import { Show } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Icon } from '../../../src/components/Icon';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import { IconLibrary } from './IconLibrary';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useIconTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const inIframe = typeof window !== 'undefined' && window.top !== window.self;

export const IconMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useIconTableData();

  return (
    <MobilePreview title="Icon">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('icon.demo.basic')} subtitle="fill + color">
          <Row>
            <Icon name="star" variant="fill" color="#1677ff" size={26} />
            <Icon name="heart" variant="fill" color="#fc000a" size={26} />
            <Icon name="sun" variant="fill" color="#f59e0b" size={26} />
            <Icon name="settings" variant="fill" color="#22c55e" size={26} />
            <Icon name="mail" variant="fill" color="#8b5cf6" size={26} />
          </Row>
        </Card>
        <Card title={t('icon.demo.size')} subtitle="16 / 24 / 36">
          <Row>
            <Icon name="star" variant="fill" color="#1677ff" size={16} />
            <Icon name="star" variant="fill" color="#1677ff" size={24} />
            <Icon name="star" variant="fill" color="#1677ff" size={36} />
          </Row>
        </Card>
        <Card title={t('icon.demo.color')} subtitle="set via color prop">
          <Row>
            <Icon name="heart" variant="fill" size={26} color="#fc000a" />
            <Icon name="heart" variant="fill" size={26} color="#22c55e" />
            <Icon name="heart" variant="fill" size={26} color="#1677ff" />
            <Icon name="heart" variant="fill" size={26} color="#f59e0b" />
            <Icon name="heart" variant="fill" size={26} color="#8b5cf6" />
          </Row>
        </Card>
        <Card title={t('icon.demo.line')} subtitle="line vs fill">
          <Row>
            <Icon name="star" size={24} color="#f59e0b" variant="line" />
            <Icon name="star" size={24} color="#f59e0b" variant="fill" />
            <Icon name="heart" size={24} color="#fc000a" variant="line" />
            <Icon name="heart" size={24} color="#fc000a" variant="fill" />
          </Row>
        </Card>
        <Card title={t('icon.demo.clickable')}>
          <Row>
            <Icon name="close" aria-label="Close" size={26} style={{ cursor: 'pointer', color: '#6b7280', padding: '4px', background: '#f5f5f5', 'border-radius': '8px' }} />
            <Icon name="settings" aria-label="Settings" size={26} style={{ cursor: 'pointer', color: '#1677ff', padding: '4px', background: '#f0f5ff', 'border-radius': '8px' }} />
            <Icon name="search" aria-label="Search" size={26} style={{ cursor: 'pointer', color: '#22c55e', padding: '4px', background: '#f0fdf4', 'border-radius': '8px' }} />
          </Row>
        </Card>
      </div>
      <Show when={!inIframe}>
        <div style={{ padding: '0 12px' }}>
          <Card title={t('icon.library.title')}>
            <IconLibrary />
          </Card>
        </div>
      </Show>
    </MobilePreview>
  );
};

function Row(props: { children: any }) {
  return <div style={{ display: 'flex', gap: '12px', 'flex-wrap': 'wrap', 'align-items': 'center' }}>{props.children}</div>;
}
