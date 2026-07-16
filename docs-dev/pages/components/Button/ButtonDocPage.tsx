import { createSignal, type Component } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import styles from './ButtonDocPage.module.css';

/* ---------------------------------------------------------------------- */
/*  Props Table Data                                                       */
/* ---------------------------------------------------------------------- */

const propsData: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: false, desc: 'componentProps.button.text' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.button.children' },
  { name: 'type', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", required: false, desc: 'componentProps.button.type' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'solid'", required: false, desc: 'componentProps.button.variant' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", required: false, desc: 'componentProps.button.size' },
  { name: 'block', type: 'boolean', default: 'false', required: false, desc: 'componentProps.button.block' },
  { name: 'round', type: 'boolean', default: 'false', required: false, desc: 'componentProps.button.round' },
  { name: 'hairline', type: 'boolean', default: 'false', required: false, desc: 'componentProps.button.hairline' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.button.color' },
  { name: 'textColor', type: 'string', default: '—', required: false, desc: 'componentProps.button.textColor' },
  { name: 'icon', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.button.icon' },
  { name: 'iconPosition', type: "'left' | 'right'", default: "'left'", required: false, desc: 'componentProps.button.iconPosition' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.button.disabled' },
  { name: 'loading', type: 'boolean', default: 'false', required: false, desc: 'componentProps.button.loading' },
  { name: 'loadingText', type: 'string', default: '—', required: false, desc: 'componentProps.button.loadingText' },
  { name: 'nativeType', type: "'button' | 'submit' | 'reset'", default: "'button'", required: false, desc: 'componentProps.button.nativeType' },
  { name: 'href', type: 'string', default: '—', required: false, desc: 'componentProps.button.href' },
  { name: 'target', type: 'string', default: '—', required: false, desc: 'componentProps.button.target' },
  { name: 'onClick', type: '(e: MouseEvent) => void', default: '—', required: false, desc: 'componentProps.button.onClick' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.button.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.button.style' },
  { name: 'aria-label', type: 'string', default: '—', required: false, desc: 'componentProps.button.aria-label' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'events', title: 'Events' },
  { id: 'basic', title: 'Basic Usage' },
  { id: 'icons', title: 'Icon Button' },
  { id: 'states', title: 'States' },
  { id: 'link', title: 'Link Mode' },
  { id: 'custom-color', title: 'Custom Color' },
  { id: 'examples', title: 'Typical Scenarios' },
];

/* ---------------------------------------------------------------------- */
/*  Main Doc Page                                                           */
/* ---------------------------------------------------------------------- */

export const ButtonDocPage: Component = () => {
  const t = useT();
  const [loading, setLoading] = createSignal(false);
  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DocLayout>

      <div class={styles.page}>
        <h1 class={styles.h1}>Button</h1>
        <p class={styles.lead}>{t('componentIntro.ButtonIntro')}</p>

        {/* ---- Props Table ---- */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        <h2 id="css-vars" class={styles.h2}>{t('common.cssVars')}</h2>
        <PropsTable rows={[
          { name: '--sc-color-primary', type: 'color', default: 'var(--sc-color-primary, #1677ff)', required: false, desc: 'cssVars.Button.__sc_color_primary' },
          { name: '--sc-color-primary-hover', type: 'color', default: '#4995ff', required: false, desc: 'cssVars.Button.__sc_color_primary_hover' },
          { name: '--sc-color-primary-active', type: 'color', default: '#005ee2', required: false, desc: 'cssVars.Button.__sc_color_primary_active' },
          { name: '--sc-color-primary-pale', type: 'color', default: '—', required: false, desc: 'cssVars.Button.__sc_color_primary_pale' },
          { name: '--sc-color-text-inverse', type: 'color', default: '#fff', required: false, desc: 'cssVars.Button.__sc_color_text_inverse' },
          { name: '--sc-border-radius-sm', type: 'length', default: '4px', required: false, desc: 'cssVars.Button.__sc_border_radius_sm' },
          { name: '--sc-border-radius-md', type: 'length', default: '8px', required: false, desc: 'cssVars.Button.__sc_border_radius_md' },
          { name: '--sc-border-radius-lg', type: 'length', default: '12px', required: false, desc: 'cssVars.Button.__sc_border_radius_lg' },
          { name: '--sc-border-radius-full', type: 'length', default: '999px', required: false, desc: 'cssVars.Button.__sc_border_radius_full' },
        ]} />

        {/* ---- Events ---- */}
        <h2 id="events" class={styles.h2}>{t('common.events')}</h2>
      <div class={styles.tableWrap}>
        <table class={styles.table}>
          <thead>
            <tr><th>Event</th><th>Params</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td>Fires on click. Not triggered when disabled or loading.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* -- Basic Usage -- */}
      <h2 id="basic" class={styles.h2}>{t('demo.basic')}</h2>
      <DemoBlock title={t('demo.semanticType')} desc={t('demoDesc.button_types')}
        code={`<Button type="primary" text="Primary" />\n<Button type="secondary" text="Secondary" />\n<Button type="success" text="Success" />\n<Button type="warning" text="Warning" />\n<Button type="danger" text="Danger" />\n<Button type="info" text="Info" />`}
      >
        <div class={styles.row}>
          <Button type="primary" text="Primary" />
          <Button type="secondary" text="Secondary" />
          <Button type="success" text="Success" />
          <Button type="warning" text="Warning" />
          <Button type="danger" text="Danger" />
          <Button type="info" text="Info" />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.customSize')} desc={t('demoDesc.button_sizes')}
        code={`<Button size="xs">XS</Button>\n<Button size="sm">SM</Button>\n<Button size="md">MD</Button>\n<Button size="lg">LG</Button>`}
      >
        <div class={styles.row}>
          <Button type="primary" size="xs" text="XS" />
          <Button type="primary" size="sm" text="SM" />
          <Button type="primary" size="md" text="MD" />
          <Button type="primary" size="lg" text="LG" />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.variant')} desc={t('demoDesc.button_variants')}
        code={`<Button type="primary" variant="solid" text="Solid" />\n<Button type="primary" variant="outline" text="Outline" />\n<Button type="primary" variant="ghost" text="Ghost" />`}
      >
        <div class={styles.row}>
          <Button type="primary" variant="solid" text="Solid" />
          <Button type="primary" variant="outline" text="Outline" />
          <Button type="primary" variant="ghost" text="Ghost" />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.round')} desc={t('demoDesc.button_round')}
        code={`<Button type="primary" round text="Capsule" />\n<Button type="primary" variant="outline" round text="Outline" />`}
      >
        <div class={styles.row}>
          <Button type="primary" round text="Capsule" />
          <Button type="primary" variant="outline" round text="Outline" />
          <Button type="danger" variant="outline" round text="Danger" />
        </div>
      </DemoBlock>

      {/* -- Icon -- */}
      <h2 id="icons" class={styles.h2}>{t('section.iconButton')}</h2>
      <DemoBlock title={t('demo.iconText')} desc={t('demoDesc.button_icon_text')}
        code={`<Button icon="star" text="Favorite" />\n<Button icon="arrow-right" text="Next" iconPosition="right" type="primary" />\n<Button icon="edit" text="Edit" variant="outline" />\n{/* JSX also supported */}\n<Button icon={<MyCustomIcon />} text="Custom" />`}
      >
        <div class={styles.row}>
          <Button icon="star" text="Favorite" />
          <Button icon="arrow-right" text="Next" iconPosition="right" type="primary" />
          <Button icon="edit" text="Edit" variant="outline" />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.iconOnly')} desc={t('demoDesc.button_icon_only')}
        code={`<Button icon="search" aria-label="Search" variant="ghost" />\n<Button icon="settings" aria-label="Settings" variant="ghost" />\n<Button icon="close" aria-label="Close" variant="ghost" />`}
      >
        <div class={styles.row}>
          <Button icon="search" aria-label="Search" variant="ghost" />
          <Button icon="settings" aria-label="Settings" variant="ghost" />
          <Button icon="close" aria-label="Close" variant="ghost" />
        </div>
      </DemoBlock>

      {/* -- States -- */}
      <h2 id="states" class={styles.h2}>{t('section.states')}</h2>
      <DemoBlock title={t('demo.loading')}
        code={`<Button loading={loading} loadingText="Submitting..." onClick={submit}>{loading ? 'Submitting...' : 'Submit'}</Button>`}
      >
        <div class={styles.row}>
          <Button type="primary" text={loading() ? 'Submitting...' : 'Click to Submit'} loading={loading()} loadingText="Submitting..." onClick={handleLoadingDemo} />
          <Button variant="outline" text="Cancel" disabled={loading()} />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.disabled')} desc={t('demo.disabledDesc')}
        code={`<Button disabled>Disabled</Button>`}
      >
        <div class={styles.row}>
          <Button type="primary" text="Primary" disabled />
          <Button variant="outline" text="Outline" disabled />
          <Button type="danger" text="Danger" disabled />
          <Button variant="ghost" text="Ghost" disabled />
        </div>
      </DemoBlock>

      {/* -- Link Mode -- */}
      <h2 id="link" class={styles.h2}>{t('section.linkMode')}</h2>
      <DemoBlock title={t('demo.hrefLink')} desc={t('demoDesc.button_link')}
        code={`<Button href="https://github.com" target="_blank">Open Link</Button>\n<Button href="/page">Go to Page</Button>`}
      >
        <div class={styles.row}>
          <Button href="https://github.com" target="_blank" type="primary" text="Open Link" />
          <Button href="#" variant="outline" text="Go to Page" />
          <Button href="#" variant="ghost" text="Learn more →" />
        </div>
      </DemoBlock>

      {/* -- Custom Color -- */}
      <h2 id="custom-color" class={styles.h2}>{t('demo.customColor')}</h2>
      <DemoBlock title={t('demo.colorText')} desc={t('demoDesc.button_color')}
        code={`<Button color="#6366f1" text="Indigo" />\n<Button color="#ec4899" text="Pink" />\n<Button color="#f59e0b" text="Amber" />\n<Button color="#10b981" text="Emerald" />`}
      >
        <div class={styles.row}>
          <Button color="#6366f1" text="Indigo" />
          <Button color="#ec4899" text="Pink" />
          <Button color="#f59e0b" text="Amber" />
          <Button color="#10b981" text="Emerald" />
        </div>
      </DemoBlock>

      {/* -- Common Scenarios -- */}
      <h2 id="examples" class={styles.h2}>{t('section.typicalScenes')}</h2>
      <DemoBlock title={t('demo.formActions')} desc={t('demoDesc.button_form_actions')}
        code={`<div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>\n  <Button variant="outline">Cancel</Button>\n  <Button type="primary">Save</Button>\n</div>`}
      >
        <div class={styles.row} style={{ 'justify-content': 'flex-end' }}>
          <Button variant="outline" text="Cancel" />
          <Button type="primary" text="Save" />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.mobileActions')} desc={t('demoDesc.button_mobile_actions')}
        code={`<Button type="primary" block round size="lg">Buy Now</Button>\n<Button variant="outline" block>Add to Cart</Button>`}
      >
        <div style="width:320px;display:flex;flex-direction:column;gap:0.5rem;">
          <Button type="primary" block round size="lg" text="Buy Now" />
          <div style="display:flex;gap:0.5rem;">
            <Button variant="outline" block text="Add to Cart" />
            <Button variant="ghost" block text="Favorite" />
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.dangerConfirm')} desc={t('demoDesc.button_danger')}
        code={`<Button variant="outline">Cancel</Button>\n<Button type="danger">Confirm Delete</Button>`}
      >
        <div class={styles.row}>
          <Button variant="outline" text="Cancel" />
          <Button type="danger" text="Confirm Delete" />
          <Button type="danger" variant="outline" text="Delete" size="xs" />
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.submit')} desc={t('demoDesc.button_submit')}
        code={`<form onSubmit={handleSubmit}>\n  <Button nativeType="submit">Submit</Button>\n</form>`}
      >
        <div class={styles.row}>
          <Button type="primary" nativeType="submit" text="Submit" />
          <Button variant="outline" nativeType="reset" text="Reset" />
        </div>
      </DemoBlock>
      </div>
    </DocLayout>
  );
};
