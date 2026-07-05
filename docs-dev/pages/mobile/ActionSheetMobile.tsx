import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ActionSheetMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { useT } from '../../doc-i18n';
import { ActionSheet } from '../../../src/components/ActionSheet';
import type { ActionSheetItem } from '../../../src/components/ActionSheet';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Image } from '../../../src/components/Image';

const propsData = [
  { name: 'open', type: 'boolean', desc: 'componentProps.actionsheet.open' },
  { name: 'onClose', type: '() => void', desc: 'componentProps.actionsheet.onClose' },
  { name: 'items', type: 'ActionSheetItem[]', desc: 'componentProps.actionsheet.items' },
  { name: 'children', type: 'JSX.Element', desc: 'componentProps.actionsheet.children' },
  { name: 'title', type: 'string', desc: 'componentProps.actionsheet.title' },
  { name: 'closeable', type: 'boolean', desc: 'componentProps.actionsheet.closeable' },
  { name: 'description', type: 'string', desc: 'componentProps.actionsheet.description' },
  { name: 'cancelText', type: 'string', desc: 'componentProps.actionsheet.cancelText' },
  { name: 'onSelect', type: '(item, index) => void', desc: 'componentProps.actionsheet.onSelect' },
  { name: 'closeOnSelect', type: 'boolean', desc: 'componentProps.actionsheet.closeOnSelect' },
  { name: 'closeOnOverlayClick', type: 'boolean', desc: 'componentProps.actionsheet.closeOnOverlayClick' },
  { name: 'round', type: 'boolean', desc: 'componentProps.actionsheet.round' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const ActionSheetMobile: Component<ActionSheetMobileProps> = (props) => {
  const t = useT();
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(false);
  const [show3, setShow3] = createSignal(false);
  const [show4, setShow4] = createSignal(false);
  const [show5, setShow5] = createSignal(false);
  const [show6, setShow6] = createSignal(false);

  const basicItems: ActionSheetItem[] = [
    { name: t('demo.edit') },
    { name: t('demo.share') },
    { name: t('demo.delete') },
  ];

  const twoLineItems: ActionSheetItem[] = [
    { name: t('demo.actionSheetFromAlbum'), subname: t('demo.actionSheetFromAlbumDesc') },
    { name: t('demo.actionSheetTakePhoto'), subname: t('demo.actionSheetTakePhotoDesc') },
    { name: t('demo.actionSheetFromChat'), subname: t('demo.actionSheetFromChatDesc') },
  ];

  const disabledItems: ActionSheetItem[] = [
    { name: t('demo.optionA') },
    { name: t('demo.optionBDisabled'), disabled: true },
    { name: t('demo.optionC') },
    { name: t('demo.optionDDisabled'), disabled: true },
  ];

  return (
    <MobilePreview title={t('nav.actionsheet')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 选项列表 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.actionOptions')}</div>
        <div style={CARD.desc}>{t('demo.actionSheetOptionsDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.actionOptions')} clickable onClick={() => setShow1(true)} />
          </CellGroup>
          <ActionSheet open={show1()} onClose={() => setShow1(false)} items={basicItems} />
        </div>
      </div>

      {/* 标题 & 取消 & 描述 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.actionSheetFullHeader')}</div>
        <div style={CARD.desc}>{t('demo.actionSheetFullHeaderDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.actionSheetFullHeaderCell')} clickable onClick={() => setShow2(true)} />
          </CellGroup>
          <ActionSheet
            open={show2()} onClose={() => setShow2(false)}
            title={t('demo.confirmDelete')}
            description={t('demo.confirmDeleteDesc')}
            closeable
            items={[{ name: t('demo.deleteDirectly') }, { name: t('demo.exportThenDelete') }]}
            cancelText={t('demo.cancel')}
            onSelect={() => setShow2(false)}
          />
        </div>
      </div>

      {/* 双行选项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.actionTwoLine')}</div>
        <div style={CARD.desc}>{t('demo.actionSheetTwoLineDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.actionSheetUploadMethod')} clickable onClick={() => setShow3(true)} />
          </CellGroup>
          <ActionSheet
            open={show3()} onClose={() => setShow3(false)}
            title={t('demo.actionSheetUploadMethod')}
            closeable
            items={twoLineItems}
            cancelText={t('demo.cancel')}
            onSelect={() => setShow3(false)}
          />
        </div>
      </div>

      {/* 禁用项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.actionDisabled')}</div>
        <div style={CARD.desc}>{t('demo.actionSheetDisabledDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.actionSheetWithDisabled')} clickable onClick={() => setShow4(true)} />
          </CellGroup>
          <ActionSheet
            open={show4()} onClose={() => setShow4(false)}
            items={disabledItems}
            cancelText={t('demo.cancel')}
          />
        </div>
      </div>

      {/* 选中不关闭 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.actionSheetNoAutoClose')}</div>
        <div style={CARD.desc}>{t('demo.actionSheetNoAutoCloseDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.actionSheetContinuousSelect')} clickable onClick={() => setShow5(true)} />
          </CellGroup>
          <ActionSheet
            open={show5()} onClose={() => setShow5(false)}
            title={t('demo.selectTag')}
            closeable
            closeOnSelect={false}
            items={[{ name: t('demo.frontend') }, { name: t('demo.backend') }, { name: t('demo.designField') }, { name: t('demo.product') }]}
            cancelText={t('demo.done')}
            onSelect={() => {}}
          />
        </div>
      </div>

      {/* 关于 Solid */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.actionSheetCustomContent')}</div>
        <div style={CARD.desc}>{t('demo.actionSheetCustomContentDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.actionSheetAboutSolidjs')} clickable onClick={() => setShow6(true)} />
          </CellGroup>
          <ActionSheet
            open={show6()} onClose={() => setShow6(false)}
            title="About SolidJS"
            closeable
          >
            <div style={{ padding: '20px', display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '16px' }}>
              <Image src="./solidjs-logo.png" width={72} height={72} round />
              <div style={{ 'text-align': 'center' }}>
                <div style={{ 'font-size': '1rem', 'font-weight': 600, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '8px' }}>SolidJS</div>
                <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'line-height': 1.6 }}>
                  A declarative, efficient and flexible JavaScript library for building user interfaces.
                  Fine-grained reactivity goes beyond virtual DOM — no diffing, no overhead.
                </div>
              </div>
            </div>
          </ActionSheet>
        </div>
      </div>
    </MobilePreview>
  );
};
