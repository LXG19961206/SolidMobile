import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Slider } from '../../../src/components/Slider';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useSliderTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SliderMobile = () => {
  const t = useT(); const { propsTables, cssVarsTables } = useSliderTableData();
  const [val, setVal] = createSignal<number>(50);
  const [rangeVal, setRangeVal] = createSignal<number[]>([20, 80]);
  const [stepVal, setStepVal] = createSignal<number>(50);
  const [colorVal, setColorVal] = createSignal<number>(40);

  return (<MobilePreview title="Slider"><MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
      <C t={t('slider.demo.basic')} d={t('slider.demoDesc.basic')}><Slider value={val()} onChange={(v) => setVal(v as number)} /><S>Value: {val()}</S></C>
      <C t={t('slider.demo.range')} d={t('slider.demoDesc.range')}><Slider count={2} value={rangeVal()} onChange={(v) => setRangeVal(v as number[])} /><S>Range: [{rangeVal().join(', ')}]</S></C>
      <C t={t('slider.demo.step')} d={t('slider.demoDesc.step')}><Slider value={stepVal()} onChange={(v) => setStepVal(v as number)} step={10} /><S>Value: {stepVal()} (step=10)</S></C>
      <C t={t('slider.demo.color')} d={t('slider.demoDesc.color')}><Slider value={colorVal()} onChange={(v) => setColorVal(v as number)} activeColor="#22c55e" inactiveColor="#e5e7eb" /><S>Green: {colorVal()}</S></C>
      <C t={t('slider.demo.disabled')} d={t('slider.demoDesc.disabled')}><Slider value={60} disabled /><div style={{ 'margin-top': '8px' }}><Slider value={60} readonly /></div></C>
      <C t={t('slider.demo.form')} d={t('slider.demoDesc.form')}><Form controlAlign="right" onSubmit={(v) => console.log(v)}><FormItem name="range" label="Volume"><Slider /></FormItem><div style={{ padding: '8px 0' }}><Button type="primary" block nativeType="submit" size="sm" text="Submit" /></div></Form></C>
    </div>
  </MobilePreview>);
};

const cs = { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px' };
const ts = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const ds = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
const ss = { 'font-size': '0.75rem', color: '#9ca3af', 'margin-top': '4px' };
function C(p: { t: string; d: string; children: any }) { return <div style={cs}><div style={ts}>{p.t}</div><div style={ds}>{p.d}</div>{p.children}</div>; }
function S(p: { children: any }) { return <div style={ss}>{p.children}</div>; }
