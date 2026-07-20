import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Radio, RadioGroup } from '../../../src/components/Radio';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { Toast } from '../../../src/components/Toast';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useRadioTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const LikeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" /><path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" />
  </svg>
);
const MehIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" /><line x1="8" y1="15" x2="16" y2="15" />
  </svg>
);
const BadIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" /><path d="M8 16.5c0 0 1.5-2.5 4-2.5s4 2.5 4 2.5" />
  </svg>
);

export const RadioMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useRadioTableData();

  const [basicVal, setBasicVal] = createSignal('a');
  const [disabledVal, setDisabledVal] = createSignal('a');
  const [shapeVal, setShapeVal] = createSignal('a');
  const [colorVal, setColorVal] = createSignal('a');
  const [hVal, setHVal] = createSignal('a');
  const [iconVal, setIconVal] = createSignal('like');
  const [standaloneChecked, setStandaloneChecked] = createSignal(false);

  return (
    <MobilePreview title="Radio">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.basic')}</div>
          <div style={descStyle}>{t('radio.demoDesc.basic')}</div>
          <RadioGroup value={basicVal()} onChange={setBasicVal}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
          </RadioGroup>
          <div style={statusStyle}>Current: {basicVal()}</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.disabled')}</div>
          <div style={descStyle}>{t('radio.demoDesc.disabled')}</div>
          <RadioGroup value={disabledVal()} onChange={setDisabledVal}>
            <Radio value="a" label="Normal" />
            <Radio value="b" label="Disabled" disabled />
            <Radio value="c" label="Also Normal" />
          </RadioGroup>
          <div style={statusStyle}>Current: {disabledVal()}</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.shape')}</div>
          <div style={descStyle}>{t('radio.demoDesc.shape')}</div>
          <RadioGroup value={shapeVal()} onChange={setShapeVal}>
            <Radio value="a" label="Round (default)" />
            <Radio value="b" label="Square" shape="square" />
            <Radio value="c" label="Dot" shape="dot" />
          </RadioGroup>
          <div style={statusStyle}>Current: {shapeVal()}</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.color')}</div>
          <div style={descStyle}>{t('radio.demoDesc.color')}</div>
          <RadioGroup value={colorVal()} onChange={setColorVal} checkedColor="#22c55e">
            <Radio value="a" label="Green" />
            <Radio value="b" label="Green" />
            <Radio value="c" label="Green" />
          </RadioGroup>
          <div style={statusStyle}>Current: {colorVal()}</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.horizontal')}</div>
          <div style={descStyle}>{t('radio.demoDesc.horizontal')}</div>
          <RadioGroup direction="horizontal" value={hVal()} onChange={setHVal}>
            <Radio value="a" label="Light" />
            <Radio value="b" label="Dark" />
          </RadioGroup>
          <div style={statusStyle}>Current: {hVal()}</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.customIcon')}</div>
          <div style={descStyle}>{t('radio.demoDesc.customIcon')}</div>
          <RadioGroup value={iconVal()} onChange={setIconVal} iconSize="28px" checkedColor="var(--sc-color-primary, #1677ff)">
            <Radio value="like" label="Good" checkedIcon={<LikeIcon />} uncheckedIcon={<LikeIcon />} />
            <Radio value="normal" label="Average" checkedIcon={<MehIcon />} uncheckedIcon={<MehIcon />} />
            <Radio value="bad" label="Poor" checkedIcon={<BadIcon />} uncheckedIcon={<BadIcon />} />
          </RadioGroup>
          <div style={statusStyle}>Mood: {iconVal() === 'like' ? 'Good' : iconVal() === 'normal' ? 'Average' : 'Poor'}</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.standalone')}</div>
          <div style={descStyle}>{t('radio.demoDesc.standalone')}</div>
          <Radio value="standalone" label="Tap to toggle (standalone)" checked={standaloneChecked()} onChange={setStandaloneChecked} />
          <div style={statusStyle}>Selected: {String(standaloneChecked())}</div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>{t('radio.demo.form')}</div>
          <div style={descStyle}>{t('radio.demoDesc.form')}</div>
          <Form controlAlign="right" onSubmit={(v) => { Toast.success('Submit: ' + JSON.stringify(v)); }}>
            <FormItem name="lang" label="Language" required rules={[{ validator: (v: unknown) => !!v, message: 'Please select' }]}>
              <RadioGroup direction="horizontal">
                <Radio value="zh" label="Chinese" />
                <Radio value="en" label="English" />
                <Radio value="ja" label="Japanese" />
              </RadioGroup>
            </FormItem>
            <div style={{ padding: '8px 0' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="Submit" />
            </div>
          </Form>
        </div>
      </div>
    </MobilePreview>
  );
};

const cardStyle = {
  background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden',
  'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px',
};
const titleStyle = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const descStyle = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
const statusStyle = { 'font-size': '0.75rem', color: '#9ca3af', 'margin-top': '8px' };
