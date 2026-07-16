import { type Component } from 'solid-js';


import zhCN from '../../i18n/ellipsis/zh-CN';
import enUS from '../../i18n/ellipsis/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { Ellipsis } from '../../../src/components/Ellipsis';
import { Icon } from '../../../src/components/Icon';

export interface EllipsisMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'lines', type: 'number', desc: 'componentProps.ellipsis.lines' },
  { name: 'expandable', type: 'boolean', desc: 'componentProps.ellipsis.expandable' },
  { name: 'expanded', type: 'boolean', desc: 'componentProps.ellipsis.expanded' },
  { name: 'defaultExpanded', type: 'boolean', desc: 'componentProps.ellipsis.defaultExpanded' },
  { name: 'onExpandChange', type: '(expanded: boolean) => void', desc: 'componentProps.ellipsis.onExpandChange' },
  { name: 'showAction', type: 'boolean', desc: 'componentProps.ellipsis.showAction' },
  { name: 'expandElement', type: 'JSX.Element', desc: 'componentProps.ellipsis.expandElement' },
  { name: 'collapseElement', type: 'JSX.Element', desc: 'componentProps.ellipsis.collapseElement' },
  { name: 'as', type: 'string', desc: 'componentProps.ellipsis.as' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '12px 16px 16px', 'font-size': '0.9rem', color: 'var(--sc-doc-card-text, #374151)' },
};

const singleLineText =
  'This is a very long piece of text used to demonstrate single-line ellipsis truncation behavior.';

const multiLineText =
  `In software engineering, SOLID is a mnemonic acronym for five design principles ` +
  `intended to make object-oriented designs more understandable, flexible, and maintainable. ` +
  `They were introduced by Robert C. Martin and are widely recognized as foundational guidelines.`;

export const EllipsisMobile: Component<EllipsisMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Ellipsis" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Single Line */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.ellipsisSingleLine')}</div>
        <div style={CARD.desc}>{t('demoDesc.ellipsis_single_line')}</div>
        <div style={CARD.body}>
          <Ellipsis>{singleLineText}</Ellipsis>
        </div>
      </div>

      {/* Multi Line */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.ellipsisMultiLine')}</div>
        <div style={CARD.desc}>{t('demoDesc.ellipsis_multi_line')}</div>
        <div style={CARD.body}>
          <Ellipsis lines={3}>{multiLineText}</Ellipsis>
        </div>
      </div>

      {/* Single Line Expandable */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.ellipsisSingleExpand')}</div>
        <div style={CARD.desc}>{t('demoDesc.ellipsis_single_expand')}</div>
        <div style={CARD.body}>
          <Ellipsis expandable>{singleLineText}</Ellipsis>
        </div>
      </div>

      {/* Multi Line Expandable */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.ellipsisMultiExpand')}</div>
        <div style={CARD.desc}>{t('demoDesc.ellipsis_multi_expand')}</div>
        <div style={CARD.body}>
          <Ellipsis lines={2} expandable>{multiLineText}</Ellipsis>
        </div>
      </div>

      {/* Custom Expand/Collapse */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.ellipsisCustomExpand')}</div>
        <div style={CARD.desc}>{t('demoDesc.ellipsis_custom_expand')}</div>
        <div style={CARD.body}>
          <Ellipsis
            lines={2}
            expandable
            expandElement={<span style="color:#1677ff;font-weight:600;display:inline-flex;align-items:center;gap:2px"><Icon name="arrow-down" size={14} /> More</span>}
            collapseElement={<span style="color:#1677ff;font-weight:600;display:inline-flex;align-items:center;gap:2px"><Icon name="arrow-up" size={14} /> Less</span>}
          >
            {multiLineText}
          </Ellipsis>
        </div>
      </div>

      {/* No Overflow */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.ellipsisNoOverflow')}</div>
        <div style={CARD.desc}>{t('demoDesc.ellipsis_no_overflow')}</div>
        <div style={CARD.body}>
          <Ellipsis lines={2} expandable>
            Short text — the expand button will not appear.
          </Ellipsis>
        </div>
      </div>

    </MobilePreview>
  );
};
