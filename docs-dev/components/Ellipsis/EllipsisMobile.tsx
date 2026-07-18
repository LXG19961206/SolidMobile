import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Ellipsis } from '../../../src/components/Ellipsis';
import { Icon } from '../../../src/components/Icon';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useEllipsisTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const singleText =
  'This is a very long piece of text used to demonstrate single-line ellipsis truncation behavior in the component.';

const multiText =
  'In software engineering, SOLID is a mnemonic acronym for five design principles ' +
  'intended to make object-oriented designs more understandable, flexible, and maintainable. ' +
  'They were introduced by Robert C. Martin and are widely recognized as foundational guidelines. ' +
  'These principles help developers build systems that are easier to extend and less prone to bugs over time.';

const demoStyle = { 'font-size': '0.9rem', color: 'var(--sc-color-text, #374151)', width: '280px', overflow: 'hidden' as const };

export const EllipsisMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useEllipsisTableData();
  const [expanded, setExpanded] = createSignal(false);

  return (
    <MobilePreview title="Ellipsis">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Single Line */}
        <Card title={t('ellipsis.demo.basic')}>
          <div style={demoStyle}>
            <Ellipsis>{singleText}</Ellipsis>
          </div>
        </Card>

        {/* Multi Line */}
        <Card title={t('ellipsis.demo.multi')}>
          <div style={demoStyle}>
            <Ellipsis lines={3}>{multiText}</Ellipsis>
          </div>
        </Card>

        {/* Expandable */}
        <Card title={t('ellipsis.demo.expand')}>
          <div style={demoStyle}>
            <Ellipsis lines={2} expandable>{multiText}</Ellipsis>
          </div>
        </Card>

        {/* Custom Expand */}
        <Card title={t('ellipsis.demo.custom')}>
          <div style={demoStyle}>
            <Ellipsis
              lines={2}
              expandable
              expandElement={<span style={{ color: '#1677ff', 'font-weight': 600, display: 'inline-flex', 'align-items': 'center', gap: '2px' }}><Icon name="arrow-down" size={14} /> More</span>}
              collapseElement={<span style={{ color: '#1677ff', 'font-weight': 600, display: 'inline-flex', 'align-items': 'center', gap: '2px' }}><Icon name="arrow-up" size={14} /> Less</span>}
            >
              {multiText}
            </Ellipsis>
          </div>
        </Card>

        {/* Controlled */}
        <Card title={t('ellipsis.demo.controlled')}>
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: '8px', width: '280px', padding: '12px 16px 16px' }}>
            <Button size="sm" onClick={() => setExpanded(v => !v)}>{expanded() ? 'Collapse' : 'Expand'} (external)</Button>
            <div style={{ 'font-size': '0.9rem', color: 'var(--sc-color-text, #374151)' }}>
              <Ellipsis lines={2} expandable expanded={expanded()} onExpandChange={setExpanded} showAction={false}>
                {multiText}
              </Ellipsis>
            </div>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
