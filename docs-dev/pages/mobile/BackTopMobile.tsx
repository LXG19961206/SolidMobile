import { type Component } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { BackTop } from '../../../src/components/BackTop';
import { Cell, CellGroup } from '../../../src/components/Cell';

export interface BackTopMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'threshold', type: 'number', desc: 'componentProps.backtop.threshold' },
  { name: 'target', type: 'HTMLElement', desc: 'componentProps.backtop.target' },
];

export const BackTopMobile: Component<BackTopMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="BackTop" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <div style={{ padding: '8px 16px 16px', 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'line-height': 1.6 }}>
        {t('componentIntro.BackTopIntro')}
      </div>

      <CellGroup>
        {Array.from({ length: 24 }, (_, i) => (
          <Cell title={`Item ${i + 1}`} value={`Value ${i + 1}`} />
        ))}
      </CellGroup>

      <BackTop threshold={200} inset={{ right: 16, bottom: 60 }} zIndex={1100} />
    </MobilePreview>
  );
};
