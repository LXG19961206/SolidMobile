import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { Toast } from '../../../src/components/Toast';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCheckboxTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CheckboxMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCheckboxTableData();

  const [basicVals, setBasicVals] = createSignal<unknown[]>([]);
  const [disabledVals, setDisabledVals] = createSignal<unknown[]>([]);
  const [shapeVals, setShapeVals] = createSignal<unknown[]>([]);
  const [colorVals, setColorVals] = createSignal<unknown[]>([]);
  const [hVals, setHVals] = createSignal<unknown[]>([]);
  const [maxVals, setMaxVals] = createSignal<unknown[]>([]);
  const [standaloneChecked, setStandaloneChecked] = createSignal(false);

  const [indeterminateVals, setIndeterminateVals] = createSignal<unknown[]>([]);
  const all = ['a', 'b', 'c'];
  const isAll = () => indeterminateVals().length === all.length;
  const isInd = () => indeterminateVals().length > 0 && indeterminateVals().length < all.length;

  return (
    <MobilePreview title="Checkbox">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.basic')}</div>
          <div style={ds}>{t('checkbox.demoDesc.basic')}</div>
          <CheckboxGroup value={basicVals()} onChange={setBasicVals}>
            <Checkbox value="code" label="Code" />
            <Checkbox value="music" label="Music" />
            <Checkbox value="read" label="Read" />
          </CheckboxGroup>
          <div style={ss}>Selected: {basicVals().join(', ') || '(none)'}</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.disabled')}</div>
          <div style={ds}>{t('checkbox.demoDesc.disabled')}</div>
          <CheckboxGroup value={disabledVals()} onChange={setDisabledVals}>
            <Checkbox value="a" label="Normal" />
            <Checkbox value="b" label="Disabled" disabled />
            <Checkbox value="c" label="Also Normal" />
          </CheckboxGroup>
          <div style={ss}>Selected: {disabledVals().join(', ')}</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.shape')}</div>
          <div style={ds}>{t('checkbox.demoDesc.shape')}</div>
          <CheckboxGroup value={shapeVals()} onChange={setShapeVals}>
            <Checkbox value="a" label="Square (default)" />
            <Checkbox value="b" label="Round" shape="round" />
          </CheckboxGroup>
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.color')}</div>
          <div style={ds}>{t('checkbox.demoDesc.color')}</div>
          <CheckboxGroup value={colorVals()} onChange={setColorVals} checkedColor="#22c55e">
            <Checkbox value="a" label="Green" />
            <Checkbox value="b" label="Green" />
            <Checkbox value="c" label="Green" />
          </CheckboxGroup>
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.horizontal')}</div>
          <div style={ds}>{t('checkbox.demoDesc.horizontal')}</div>
          <CheckboxGroup direction="horizontal" value={hVals()} onChange={setHVals}>
            <Checkbox value="a" label="A" />
            <Checkbox value="b" label="B" />
            <Checkbox value="c" label="C" />
          </CheckboxGroup>
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.max')}</div>
          <div style={ds}>{t('checkbox.demoDesc.max')}</div>
          <CheckboxGroup max={2} value={maxVals()} onChange={setMaxVals}>
            <Checkbox value="a" label="Option A" />
            <Checkbox value="b" label="Option B" />
            <Checkbox value="c" label="Option C" />
            <Checkbox value="d" label="Option D" />
          </CheckboxGroup>
          <div style={ss}>Selected ({maxVals().length}/2): {maxVals().join(', ') || '(none)'}</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.indeterminate')}</div>
          <div style={ds}>{t('checkbox.demoDesc.indeterminate')}</div>
          <Checkbox
            value="all"
            label={isAll() ? 'Deselect All' : 'Select All'}
            checked={isAll()}
            indeterminate={isInd()}
            onChange={(checked) => setIndeterminateVals(checked ? all : [])}
          />
          <CheckboxGroup value={indeterminateVals()} onChange={setIndeterminateVals}>
            <Checkbox value="a" label="Option A" />
            <Checkbox value="b" label="Option B" />
            <Checkbox value="c" label="Option C" />
          </CheckboxGroup>
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.standalone')}</div>
          <div style={ds}>{t('checkbox.demoDesc.standalone')}</div>
          <Checkbox value="agree" label="I agree to the terms" checked={standaloneChecked()} onChange={setStandaloneChecked} />
        </div>

        <div style={cs}>
          <div style={ts}>{t('checkbox.demo.form')}</div>
          <div style={ds}>{t('checkbox.demoDesc.form')}</div>
          <Form controlAlign="right" onSubmit={(v) => { Toast.success('Submit: ' + JSON.stringify(v)); }}>
            <FormItem name="hobbies" label="Hobbies" labelAlign="top" required
              rules={[{ validator: (v: unknown) => (v as unknown[])?.length > 0, message: 'Select at least one' }]}>
              <CheckboxGroup direction="horizontal">
                <Checkbox value="code" label="Code" />
                <Checkbox value="music" label="Music" />
                <Checkbox value="read" label="Read" />
              </CheckboxGroup>
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

const cs = { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px' };
const ts = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const ds = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
const ss = { 'font-size': '0.75rem', color: '#9ca3af', 'margin-top': '8px' };
