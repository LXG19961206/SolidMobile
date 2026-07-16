import { createSignal } from 'solid-js';
import { Switch as Toggle } from '../../../../src/components/Switch';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import { useT, loadLocale } from '../../../doc-i18n';
loadLocale('switch');
import styles from './SwitchDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'checked', type: 'boolean', default: '—', required: false, desc: 'componentProps.switch.checked' },
  { name: 'value', type: 'boolean', default: '—', required: false, desc: 'componentProps.switch.value' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', required: false, desc: 'componentProps.switch.defaultChecked' },
  { name: 'onChange', type: '(checked: boolean) => void', default: '—', required: false, desc: 'componentProps.switch.onChange' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.switch.disabled' },
  { name: 'size', type: 'string | number', default: '28', required: false, desc: 'componentProps.switch.size' },
  { name: 'activeColor', type: 'string', default: '—', required: false, desc: 'componentProps.switch.activeColor' },
  { name: 'inactiveColor', type: 'string', default: '—', required: false, desc: 'componentProps.switch.inactiveColor' },
  { name: 'activeText', type: 'string', default: '—', required: false, desc: 'componentProps.switch.activeText' },
  { name: 'inactiveText', type: 'string', default: '—', required: false, desc: 'componentProps.switch.inactiveText' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.switch.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.switch.style' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'basic', title: 'Basic Usage' },
  { id: 'controlled', title: 'Controlled' },
  { id: 'color', title: 'Custom Color' },
  { id: 'size', title: 'Size' },
  { id: 'disabled', title: 'Disabled' },
];

export const SwitchDocPage = () => {
  const t = useT();
  const [controlledOn, setControlledOn] = createSignal(false);

  return (
    <DocLayout>

      <div class={styles.page}>
        <h1 class={styles.h1}>Switch</h1>
        <p class={styles.intro}>
          {t('componentIntro.SwitchIntro')}
        </p>
        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', 'border-radius': '6px', padding: '10px 14px', 'font-size': '0.85rem', 'line-height': 1.6, margin: '12px 0', color: '#856404' }}>
          To avoid conflict with the built-in Solid.js <code>&lt;Switch&gt;/&lt;Match&gt;</code> component, <strong>use the <code>Toggle</code> alias</strong> for import:<br />
          <code>import {'{ Toggle }'} from 'solid-mobile';</code> &nbsp;（<code>Switch</code> still works but requires manual conflict resolution)
        </div>

        {/* Props */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* Basic */}
        <h2 id="basic" class={styles.h2}>{t('demo.basic')}</h2>
        <DemoBlock
          title={t('demo.basic')}
          desc={t('demoDesc.switch_uncontrolled')}
          code={`<Toggle defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Toggle />
            <Toggle defaultChecked />
          </div>
        </DemoBlock>

        {/* Controlled */}
        <h2 id="controlled" class={styles.h2}>{t('demo.controlled')}</h2>
        <DemoBlock
          title={t('demo.controlled')}
          desc={t('demo.controlledDesc')}
          code={`const [on, setOn] = createSignal(false);\n\n<Toggle checked={on()} onChange={setOn} />\n{/* value 是 checked 的别名 */}\n<Toggle value={on()} onChange={setOn} />`}
        >
          <div class={styles.demoArea}>
            <Toggle checked={controlledOn()} onChange={setControlledOn} />
            <span class={styles.result}>
              Current: {controlledOn() ? 'On' : 'Off'}
            </span>
          </div>
        </DemoBlock>

        {/* Color */}
        <h2 id="color" class={styles.h2}>{t('demo.customColor')}</h2>
        <DemoBlock
          title={t('demo.customColor')}
          desc={t('demo.customColorDesc')}
          code={`<Toggle activeColor="#22c55e" defaultChecked />\n<Toggle activeColor="#ef4444" inactiveColor="#fecaca" defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Toggle activeColor="#22c55e" defaultChecked />
            <Toggle activeColor="#ef4444" inactiveColor="#fecaca" defaultChecked />
            <Toggle activeColor="#f59e0b" />
          </div>
        </DemoBlock>

        {/* Size */}
        <h2 id="size" class={styles.h2}>{t('demo.size')}</h2>
        <DemoBlock
          title="size"
          desc={t('demoDesc.switch_size')}
          code={`<Toggle size={20} />\n<Toggle size={28} defaultChecked />\n<Toggle size={36} defaultChecked />\n<Toggle size="2.5rem" defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Toggle size={20} />
            <Toggle size={28} defaultChecked />
            <Toggle size={36} defaultChecked />
            <Toggle size="2.5rem" defaultChecked />
          </div>
        </DemoBlock>

        {/* Text */}
        <h2 id="text" class={styles.h2}>{t('section.text')}</h2>
        <DemoBlock
          title="activeText / inactiveText"
          desc={t('demoDesc.switch_text_label')}
          code={`<Toggle activeText="ON" inactiveText="OFF" defaultChecked />\n<Toggle activeText="On" inactiveText="Off" activeColor="#22c55e" />\n{/* 左 label 布局 */}\n<label style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>\n  <span>Notifications</span>\n  <Toggle />\n</label>`}
        >
          <div class={styles.demoArea}>
            <Toggle activeText="ON" inactiveText="OFF" defaultChecked />
            <Toggle activeText="On" inactiveText="Off" activeColor="#22c55e" />
            <label style={{ display: 'flex', 'align-items': 'center', gap: '0.5rem', 'font-size': '0.875rem', cursor: 'pointer' }}>
              <span>Notifications</span>
              <Toggle />
            </label>
          </div>
        </DemoBlock>

        {/* Disabled */}
        <h2 id="disabled" class={styles.h2}>{t('demo.disabled')}</h2>
        <DemoBlock
          title="disabled"
          desc={t('demoDesc.switch_disabled')}
          code={`<Toggle disabled />\n<Toggle disabled defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Toggle disabled />
            <Toggle disabled defaultChecked />
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
