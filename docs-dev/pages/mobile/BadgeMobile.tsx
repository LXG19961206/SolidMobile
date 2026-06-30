import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface BadgeMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Badge } from '../../../src/components/Badge';

const propsData = [
  { name: 'content', type: 'string | number', desc: '徽标内容' },
  { name: 'dot', type: 'boolean', desc: '只显示小红点（忽略 content）' },
  { name: 'max', type: 'number', desc: '数字上限，超出显示 "max+"' },
  { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", desc: '位置，默认 top-right' },
  { name: 'color', type: 'string', desc: '自定义背景色' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '16px', 'align-items': 'center' as const },
};

const box: Record<string, string> = {
  width: '40px', height: '40px', background: '#e5e7eb', 'border-radius': '8px',
};

export const BadgeMobile: Component<BadgeMobileProps> = (props) => {
  return (
    <MobilePreview title="Badge 徽标" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础用法 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础数字徽标</div>
        <div style={CARD.desc}>content 传入数字或字符串</div>
        <div style={CARD.body}>
          <Badge content={5}><div style={box} /></Badge>
          <Badge content={99}><div style={box} /></Badge>
          <Badge content="新"><div style={box} /></Badge>
          <Badge content="热门"><div style={box} /></Badge>
        </div>
      </div>

      {/* 小红点 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>小红点 dot</div>
        <div style={CARD.desc}>不显示具体数字，仅红色圆点提示</div>
        <div style={CARD.body}>
          <Badge dot><div style={box} /></Badge>
          <Badge dot color="#22c55e"><div style={box} /></Badge>
          <Badge dot color="#1677ff"><div style={box} /></Badge>
        </div>
      </div>

      {/* 数字上限 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>数字上限 max</div>
        <div style={CARD.desc}>超过 max 显示 "max+"</div>
        <div style={CARD.body}>
          <Badge content={10} max={9}><div style={box} /></Badge>
          <Badge content={99} max={99}><div style={box} /></Badge>
          <Badge content={100} max={99}><div style={box} /></Badge>
          <Badge content={999} max={99}><div style={box} /></Badge>
        </div>
      </div>

      {/* 位置 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>位置 position</div>
        <div style={CARD.desc}>四个角落：top-right（默认）/ top-left / bottom-right / bottom-left</div>
        <div style={CARD.body}>
          <Badge content="右上" position="top-right"><div style={box} /></Badge>
          <Badge content="左上" position="top-left"><div style={box} /></Badge>
          <Badge content="右下" position="bottom-right"><div style={box} /></Badge>
          <Badge content="左下" position="bottom-left"><div style={box} /></Badge>
        </div>
      </div>
    </MobilePreview>
  );
};
