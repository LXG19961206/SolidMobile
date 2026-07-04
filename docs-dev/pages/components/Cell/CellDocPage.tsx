import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
import styles from './CellDocPage.module.css';

const cellProps: PropRow[] = [
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: '左侧标题。' },
  { name: 'value', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.Cell.value' },
  { name: 'description', type: 'string', default: '—', required: false, desc: 'componentProps.Cell.description' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: '自定义内容，设置后 title/value/description 被忽略。' },
  { name: 'icon', type: 'IconName | JSX.Element', default: '—', required: false, desc: 'componentProps.Cell.icon' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, desc: '尺寸。' },
  { name: 'required', type: 'boolean', default: 'false', required: false, desc: 'componentProps.Cell.required' },
  { name: 'center', type: 'boolean', default: 'false', required: false, desc: 'componentProps.Cell.center' },
  { name: 'clickable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.Cell.clickable' },
  { name: 'onClick', type: '() => void', default: '—', required: false, desc: 'componentProps.Cell.onClick' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.Cell.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.Cell.style' },
];

const groupProps: PropRow[] = [
  { name: 'title', type: 'string', default: '—', required: false, desc: 'componentProps.Cell.title' },
  { name: 'card', type: 'boolean', default: 'false', required: false, desc: 'componentProps.Cell.card' },
  { name: 'border', type: 'boolean', default: 'true', required: false, desc: 'componentProps.Cell.border' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.Cell.children' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.Cell.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.Cell.style' },
];

const tocItems: TOCItem[] = [
  { id: 'cell-props', title: 'Cell 属性' },
  { id: 'group-props', title: 'CellGroup 属性' },
  { id: 'basic', title: '基础列表' },
  { id: 'clickable', title: '可点击' },
  { id: 'icon', title: '图标 & 必填' },
  { id: 'size', title: '尺寸' },
  { id: 'card', title: '卡片模式' },
];

export const CellDocPage = () => {
  const t = useT();
  return (
    <DocLayout>

    <div class={styles.page}>
      <h1 class={styles.h1}>Cell / CellGroup 单元格</h1>
      <p class={styles.intro}>
        {t('componentIntro.CellIntro')}
      </p>

      <h2 id="cell-props" class={styles.h2}>{t('common.cellProps')}</h2>
      <PropsTable rows={cellProps} />

      <h2 id="group-props" class={styles.h2}>{t('common.cellGroupProps')}</h2>
      <PropsTable rows={groupProps} />

      {/* Basic */}
      <h2 id="basic" class={styles.h2}>{t('section.basicList')}</h2>
      <DemoBlock
        title={t('demo.cellBasic')}
        desc="Cell 由 title（左）、value（右）、description（下）三部分组成。"
        code={`<CellGroup title="基本信息">\n  <Cell title="用户名" value="张三" />\n  <Cell title="手机号" value="138****8888" />\n  <Cell title="简介" description="这是一段描述文字" />\n</CellGroup>`}
      >
        <div class={styles.demo}>
          <CellGroup title="基本信息">
            <Cell title="用户名" value="张三" />
            <Cell title="手机号" value="138****8888" />
            <Cell title="简介" description="这是一段描述文字" />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Clickable */}
      <h2 id="clickable" class={styles.h2}>{t('section.clickable')}</h2>
      <DemoBlock
        title={t('demo.cellClickable')}
        desc="设置 clickable 后右侧显示箭头，整行可点击。配合 onClick 处理跳转。"
        code={`<CellGroup title="设置">\n  <Cell title="个人资料" clickable onClick={() => {}} />\n  <Cell title="账号安全" clickable />\n  <Cell title="通知设置" clickable value="已开启" />\n</CellGroup>`}
      >
        <div class={styles.demo}>
          <CellGroup title="设置">
            <Cell title="个人资料" clickable />
            <Cell title="账号安全" clickable />
            <Cell title="通知设置" clickable value="已开启" />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Icon & Required */}
      <h2 id="icon" class={styles.h2}>{t('section.iconRequired')}</h2>
      <DemoBlock
        title={t('demo.cellIconRequired')}
        desc="icon / title / value 均支持字符串或 JSX。required 显示红色星号。"
        code={`<Cell icon="user" title="姓名" required value="张三" />\n<Cell icon="phone" title="手机号" clickable />\n<Cell icon="mail" title="邮箱" value="zhang@example.com" />\n<Cell\n  icon="palette"\n  title="主题色"\n  value={<span><span style={{ width:14,height:14,borderRadius:'50%',background:'#1677ff',display:'inline-block' }} /> 品牌蓝</span>}\n/>`}
      >
        <div class={styles.demo}>
          <CellGroup>
            <Cell icon="user" title="姓名" required value="张三" />
            <Cell icon="phone" title="手机号" clickable />
            <Cell icon="mail" title="邮箱" value="zhang@example.com" />
            <Cell
              icon="palette"
              title="主题色"
              value={<span style={{ display:'inline-flex','align-items':'center',gap:'0.4rem' }}><span style={{ width:14,height:14,'border-radius':'50%',background:'#1677ff',display:'inline-block' }} /> 品牌蓝</span>}
            />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Sizes */}
      <h2 id="size" class={styles.h2}>{t('demo.size')}</h2>
      <DemoBlock
        title="sm / md / lg"
        desc="三种尺寸，默认 md（48px）。"
        code={`<Cell size="sm" title="小号" />\n<Cell size="md" title="中号" />\n<Cell size="lg" title="大号" />`}
      >
        <div class={styles.demo}>
          <CellGroup>
            <Cell size="sm" title="小号 Cell" value="40px" />
            <Cell size="md" title="中号 Cell（默认）" value="48px" />
            <Cell size="lg" title="大号 Cell" value="56px" />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Card mode */}
      <h2 id="card" class={styles.h2}>{t('section.cardMode')}</h2>
      <DemoBlock
        title="card"
        desc="CellGroup 设置 card 获得圆角和独立背景，适合在灰色背景页面上使用。"
        code={`<CellGroup title="关于" card>\n  <Cell title="版本号" value="1.0.0" />\n  <Cell title="开源协议" value="MIT" clickable />\n</CellGroup>`}
      >
        <div class={styles.demo} style={{ background: '#eff2f5', padding: '1rem 0', 'border-radius': '8px' }}>
          <CellGroup title="关于" card>
            <Cell title="版本号" value="1.0.0" />
            <Cell title="开源协议" value="MIT" clickable />
            <Cell title="作者" value="solid-component" />
          </CellGroup>
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
