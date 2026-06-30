import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CellMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Icon } from '../../../src/components/Icon';
import { Switch } from '../../../src/components/Switch';

const propsData = [
  { name: 'Cell.title', type: 'string | JSX.Element', desc: '左侧标题' },
  { name: 'Cell.value', type: 'string | JSX.Element', desc: '右侧内容' },
  { name: 'Cell.description', type: 'string', desc: '标题下方描述' },
  { name: 'Cell.descriptionError', type: 'boolean', desc: '描述错误状态' },
  { name: 'Cell.icon', type: 'IconName | JSX.Element', desc: '左侧图标' },
  { name: 'Cell.size', type: "'sm' | 'md' | 'lg'", desc: '尺寸，默认 md' },
  { name: 'Cell.required', type: 'boolean', desc: '显示必填星号' },
  { name: 'Cell.center', type: 'boolean', desc: '内容垂直居中' },
  { name: 'Cell.clickable', type: 'boolean', desc: '可点击，右侧显示箭头' },
  { name: 'Cell.onClick', type: '() => void', desc: '点击回调' },
  { name: 'CellGroup.title', type: 'string', desc: '分组标题' },
  { name: 'CellGroup.card', type: 'boolean', desc: '卡片模式' },
  { name: 'CellGroup.border', type: 'boolean', desc: '显示边框，默认 true' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const CellMobile: Component<CellMobileProps> = (props) => {
  return (
    <MobilePreview title="Cell 单元格" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础单元格</div>
        <div style={CARD.desc}>title 标题 + value 右侧内容</div>
        <div style={CARD.body}>
          <CellGroup title="基础信息">
            <Cell title="姓名" value="张三" />
            <Cell title="手机号" value="138****8888" />
            <Cell title="地址" value="北京市海淀区" />
          </CellGroup>
        </div>
      </div>

      {/* 可点击 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>可点击 & 图标</div>
        <div style={CARD.desc}>clickable 显示右侧箭头，icon 显示左侧图标</div>
        <div style={CARD.body}>
          <CellGroup title="个人中心">
            <Cell title="我的订单" icon="shopping-bag" clickable onClick={() => {}} />
            <Cell title="我的收藏" icon="heart" clickable onClick={() => {}} />
            <Cell title="地址管理" icon="map-pin" clickable onClick={() => {}} />
            <Cell title="设置" icon="settings" clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>

      {/* 描述 & 必填 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>描述 & 必填</div>
        <div style={CARD.desc}>description 副标题 / required 星号</div>
        <div style={CARD.body}>
          <CellGroup title="表单">
            <Cell title="用户名" value="请输入用户名" description="6-20 位字母或数字" required clickable onClick={() => {}} />
            <Cell title="密码" value="请输入密码" description="至少 8 位，含字母和数字" required clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>

      {/* 卡片模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>卡片模式 card</div>
        <div style={CARD.desc}>圆角 + 背景色的卡片风格</div>
        <div style={CARD.body}>
          <CellGroup title="卡片模式" card>
            <Cell title="版本" value="v2.0.0" />
            <Cell title="更新日志" clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>
    </MobilePreview>
  );
};
