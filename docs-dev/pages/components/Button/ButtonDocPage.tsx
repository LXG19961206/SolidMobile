import zhCN from '../../../i18n/button/zh-CN';
import enUS from '../../../i18n/button/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { PropsTable, DocLayout } from '../../../doc-utils';
import styles from './ButtonDocPage.module.css';

const propsRows = [
  ['type', 'string', '—', 'componentProps.button.type'],
  ['variant', "'solid' | 'outline' | 'ghost'", "'solid'", 'componentProps.button.variant'],
  ['size', "'xs' | 'sm' | 'md' | 'lg'", "'md'", 'componentProps.button.size'],
  ['block', 'boolean', 'false', 'componentProps.button.block'],
  ['round', 'boolean', 'false', 'componentProps.button.round'],
  ['disabled', 'boolean', 'false', 'componentProps.button.disabled'],
  ['loading', 'boolean', 'false', 'componentProps.button.loading'],
  ['icon', 'string | JSX.Element', '—', 'componentProps.button.icon'],
  ['iconPosition', "'left' | 'right'", "'left'", 'componentProps.button.iconPosition'],
  ['color', 'string', '—', 'componentProps.button.color'],
  ['textColor', 'string', '—', 'componentProps.button.textColor'],
  ['href', 'string', '—', 'componentProps.button.href'],
  ['onClick', '(e: MouseEvent) => void', '—', 'componentProps.button.onClick'],
];

const cssRows = [
  ['--sc-color-primary', 'color', 'var(--sc-color-primary, #1677ff)', 'cssVars.Button.__sc_color_primary'],
  ['--sc-color-primary-hover', 'color', '#4995ff', 'cssVars.Button.__sc_color_primary_hover'],
  ['--sc-color-primary-active', 'color', '#005ee2', 'cssVars.Button.__sc_color_primary_active'],
  ['--sc-color-primary-pale', 'color', '—', 'cssVars.Button.__sc_color_primary_pale'],
  ['--sc-border-radius-sm', 'length', '4px', 'cssVars.Button.__sc_border_radius_sm'],
  ['--sc-border-radius-md', 'length', '8px', 'cssVars.Button.__sc_border_radius_md'],
  ['--sc-border-radius-lg', 'length', '12px', 'cssVars.Button.__sc_border_radius_lg'],
  ['--sc-border-radius-full', 'length', '999px', 'cssVars.Button.__sc_border_radius_full'],
];

export const ButtonDocPage = () => {
  const t = useT();
  return (
    <DocLayout>
      <div class={styles.page}>
        <h1 class={styles.h1}>Button</h1>
        <p class={styles.intro}>{t('componentIntro.ButtonIntro')}</p>

        <h2 class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsRows.map(([name, type, def, desc]) => ({ name, type, default: def, required: false, desc }))} />

        <h2 class={styles.h2}>{t('common.cssVars')}</h2>
        <PropsTable rows={cssRows.map(([name, type, def, desc]) => ({ name, type, default: def, required: false, desc }))} />
      </div>
    </DocLayout>
  );
};
