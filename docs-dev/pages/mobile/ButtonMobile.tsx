import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ButtonMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { useT } from '../../doc-i18n';
import { Button } from '../../../src/components/Button';
import { Icon } from '../../../src/components/Icon';

const propsData = [
  { name: 'text', type: 'string', desc: '按钮文字' },
  { name: 'type', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", desc: '语义色，默认 primary' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost'", desc: '填充方式，默认 solid' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", desc: '尺寸，默认 md' },
  { name: 'block', type: 'boolean', desc: '通栏按钮' },
  { name: 'round', type: 'boolean', desc: '胶囊形状' },
  { name: 'icon', type: 'IconName | JSX.Element', desc: '图标，支持内置图标名或 JSX' },
  { name: 'iconPosition', type: "'left' | 'right'", desc: '图标位置，默认 left' },
  { name: 'disabled', type: 'boolean', desc: '禁用状态' },
  { name: 'loading', type: 'boolean', desc: '加载中状态' },
  { name: 'loadingText', type: 'string', desc: '加载中文字' },
  { name: 'color', type: 'string', desc: '自定义背景色' },
  { name: 'textColor', type: 'string', desc: '自定义文字色' },
  { name: 'href', type: 'string', desc: '链接地址，渲染为 a 标签' },
  { name: 'target', type: 'string', desc: '链接打开方式' },
  { name: 'nativeType', type: "'button' | 'submit' | 'reset'", desc: 'HTML button type' },
  { name: 'onClick', type: '(e: MouseEvent) => void', desc: '点击回调' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px', 'align-items': 'center' as const },
};

export const ButtonMobile: Component<ButtonMobileProps> = (props) => {
  const t = useT();
  const [loading, setLoading] = createSignal(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <MobilePreview title="Button 按钮" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 语义色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>语义色 type</div>
        <div style={CARD.desc}>六种语义色: primary / secondary / success / warning / danger / info</div>
        <div style={CARD.body}>
          <Button type="primary" text="Primary" />
          <Button type="secondary" text="Secondary" />
          <Button type="success" text="Success" />
          <Button type="warning" text="Warning" />
          <Button type="danger" text="Danger" />
          <Button type="info" text="Info" />
        </div>
      </div>

      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>尺寸 size</div>
        <div style={CARD.desc}>xs (28px) / sm (32px) / md (40px) / lg (48px)</div>
        <div style={CARD.body}>
          <Button type="primary" size="xs" text="XS" />
          <Button type="primary" size="sm" text="SM" />
          <Button type="primary" size="md" text="MD" />
          <Button type="primary" size="lg" text="LG" />
        </div>
      </div>

      {/* 填充方式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>填充方式 variant</div>
        <div style={CARD.desc}>solid（实心）/ outline（线框）/ ghost（透明）</div>
        <div style={CARD.body}>
          <Button type="primary" variant="solid" text="Solid" />
          <Button type="primary" variant="outline" text="Outline" />
          <Button type="primary" variant="ghost" text="Ghost" />
        </div>
      </div>

      {/* 胶囊 & 通栏 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>胶囊 & 通栏</div>
        <div style={CARD.desc}>round 胶囊形状 / block 通栏按钮</div>
        <div style={{ ...CARD.body, 'flex-direction': 'column' as const }}>
          <div style={{ display: 'flex' as const, gap: '8px' }}>
            <Button type="primary" round text="胶囊" />
            <Button type="danger" variant="outline" round text="Danger" />
            <Button variant="ghost" round text="Ghost" />
          </div>
          <div style={{ width: '100%' }}>
            <Button type="primary" block round size="lg" text="立即购买" />
          </div>
          <div style={{ width: '100%', display: 'flex' as const, gap: '8px' }}>
            <Button variant="outline" block text="加入购物车" />
            <Button variant="ghost" block text="收藏" />
          </div>
        </div>
      </div>

      {/* 图标按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>图标按钮</div>
        <div style={CARD.desc}>icon 属性支持内置图标名，iconPosition 控制位置</div>
        <div style={CARD.body}>
          <Button icon="star" text="收藏" />
          <Button icon="arrow-right" text="下一步" iconPosition="right" type="primary" />
          <Button icon="edit" text="编辑" variant="outline" />
          <Button icon="search" aria-label="搜索" variant="ghost" />
          <Button icon="settings" aria-label="设置" variant="ghost" />
        </div>
      </div>

      {/* 状态 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>加载与禁用</div>
        <div style={CARD.desc}>loading 旋转动画 / disabled 置灰不可点击</div>
        <div style={CARD.body}>
          <Button type="primary" text={loading() ? '提交中...' : '点击提交'} loading={loading()} loadingText="提交中..." onClick={handleLoading} />
          <Button type="primary" text="Disabled" disabled />
          <Button variant="outline" text="Disabled" disabled />
          <Button type="danger" text="Disabled" disabled />
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customColor')}</div>
        <div style={CARD.desc}>{t('demo.customColorDesc')}</div>
        <div style={CARD.body}>
          <Button color="#6366f1" text="Indigo" />
          <Button color="#ec4899" text="Pink" />
          <Button color="#f59e0b" text="Amber" />
          <Button color="#10b981" text="Emerald" />
        </div>
      </div>
    </MobilePreview>
  );
};
