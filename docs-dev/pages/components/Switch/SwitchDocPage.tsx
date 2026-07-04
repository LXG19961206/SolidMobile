import { createSignal } from 'solid-js';
import { Switch } from '../../../../src/components/Switch';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
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
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
  { id: 'controlled', title: '受控模式' },
  { id: 'color', title: '自定义颜色' },
  { id: 'size', title: '尺寸' },
  { id: 'disabled', title: '禁用状态' },
];

export const SwitchDocPage = () => {
  const t = useT();
  const [controlledOn, setControlledOn] = createSignal(false);

  return (
    <DocLayout>

      <div class={styles.page}>
        <h1 class={styles.h1}>Switch 开关</h1>
        <p class={styles.intro}>
          {t('componentIntro.SwitchIntro')}
        </p>

        {/* Props */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* Basic */}
        <h2 id="basic" class={styles.h2}>{t('demo.basic')}</h2>
        <DemoBlock
          title={t('demo.basic')}
          desc={t('demoDesc.switch_uncontrolled')}
          code={`<Switch defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch />
            <Switch defaultChecked />
          </div>
        </DemoBlock>

        {/* Controlled */}
        <h2 id="controlled" class={styles.h2}>{t('demo.controlled')}</h2>
        <DemoBlock
          title={t('demo.controlled')}
          desc={t('demo.controlledDesc')}
          code={`const [on, setOn] = createSignal(false);\n\n<Switch checked={on()} onChange={setOn} />\n{/* value 是 checked 的别名 */}\n<Switch value={on()} onChange={setOn} />`}
        >
          <div class={styles.demoArea}>
            <Switch checked={controlledOn()} onChange={setControlledOn} />
            <span class={styles.result}>
              当前状态: {controlledOn() ? '开' : '关'}
            </span>
          </div>
        </DemoBlock>

        {/* Color */}
        <h2 id="color" class={styles.h2}>{t('demo.customColor')}</h2>
        <DemoBlock
          title={t('demo.customColor')}
          desc={t('demo.customColorDesc')}
          code={`<Switch activeColor="#22c55e" defaultChecked />\n<Switch activeColor="#ef4444" inactiveColor="#fecaca" defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch activeColor="#22c55e" defaultChecked />
            <Switch activeColor="#ef4444" inactiveColor="#fecaca" defaultChecked />
            <Switch activeColor="#f59e0b" />
          </div>
        </DemoBlock>

        {/* Size */}
        <h2 id="size" class={styles.h2}>{t('demo.size')}</h2>
        <DemoBlock
          title="size"
          desc={t('demoDesc.switch_size')}
          code={`<Switch size={20} />\n<Switch size={28} defaultChecked />\n<Switch size={36} defaultChecked />\n<Switch size="2.5rem" defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch size={20} />
            <Switch size={28} defaultChecked />
            <Switch size={36} defaultChecked />
            <Switch size="2.5rem" defaultChecked />
          </div>
        </DemoBlock>

        {/* Text */}
        <h2 id="text" class={styles.h2}>{t('section.text')}</h2>
        <DemoBlock
          title="activeText / inactiveText"
          desc={t('demoDesc.switch_text_label')}
          code={`<Switch activeText="ON" inactiveText="OFF" defaultChecked />\n<Switch activeText="开" inactiveText="关" activeColor="#22c55e" />\n{/* 左 label 布局 */}\n<label style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>\n  <span>开启通知</span>\n  <Switch />\n</label>`}
        >
          <div class={styles.demoArea}>
            <Switch activeText="ON" inactiveText="OFF" defaultChecked />
            <Switch activeText="开" inactiveText="关" activeColor="#22c55e" />
            <label style={{ display: 'flex', 'align-items': 'center', gap: '0.5rem', 'font-size': '0.875rem', cursor: 'pointer' }}>
              <span>开启通知</span>
              <Switch />
            </label>
          </div>
        </DemoBlock>

        {/* Disabled */}
        <h2 id="disabled" class={styles.h2}>{t('demo.disabled')}</h2>
        <DemoBlock
          title="disabled"
          desc={t('demoDesc.switch_disabled')}
          code={`<Switch disabled />\n<Switch disabled defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch disabled />
            <Switch disabled defaultChecked />
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
