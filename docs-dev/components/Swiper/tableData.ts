import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useSwiperTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'swiper.props.children' },
      { name: 'imgUrls', type: 'string[]', def: '—', desc: 'swiper.props.imgUrls' },
      { name: 'autoplay', type: 'number | string', def: '—', desc: 'swiper.props.autoplay' },
      { name: 'duration', type: 'number | string', def: '500', desc: 'swiper.props.duration' },
      { name: 'initialSwipe', type: 'number | string', def: '0', desc: 'swiper.props.initialSwipe' },
      { name: 'width', type: 'string | number', def: '100%', desc: 'swiper.props.width' },
      { name: 'height', type: 'string | number', def: "'160px'", desc: 'swiper.props.height' },
      { name: 'loop', type: 'boolean', def: 'true', desc: 'swiper.props.loop' },
      { name: 'showIndicators', type: 'boolean', def: 'true', desc: 'swiper.props.showIndicators' },
      { name: 'vertical', type: 'boolean', def: 'false', desc: 'swiper.props.vertical' },
      { name: 'touchable', type: 'boolean', def: 'true', desc: 'swiper.props.touchable' },
      { name: 'indicatorColor', type: 'string', def: "'#1989fa'", desc: 'swiper.props.indicatorColor' },
      { name: 'indicators', type: '(cur, tot) => JSX.Element', def: '—', desc: 'swiper.props.indicators' },
      { name: 'lazyRender', type: 'boolean', def: 'false', desc: 'swiper.props.lazyRender' },
      { name: 'onChange', type: '(index) => void', def: '—', desc: 'swiper.props.onChange' },
      { name: 'class', type: 'string', def: '—', desc: 'swiper.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'swiper.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Swiper',
    rows: [
      { name: '--sc-swiper-dot-size', type: 'length', def: '6px', desc: 'swiper.cssVars.--sc-swiper-dot-size' },
      { name: '--sc-swiper-dot-active-width', type: 'length', def: '18px', desc: 'swiper.cssVars.--sc-swiper-dot-active-width' },
      { name: '--sc-swiper-dot-color', type: 'color', def: 'rgba(255,255,255,0.5)', desc: 'swiper.cssVars.--sc-swiper-dot-color' },
      { name: '--sc-swiper-dot-active-color', type: 'color', def: '#1989fa', desc: 'swiper.cssVars.--sc-swiper-dot-active-color' },
      { name: '--sc-swiper-dot-gap', type: 'length', def: '6px', desc: 'swiper.cssVars.--sc-swiper-dot-gap' },
      { name: '--sc-swiper-dot-bottom', type: 'length', def: '10px', desc: 'swiper.cssVars.--sc-swiper-dot-bottom' },
      { name: '--sc-swiper-radius', type: 'length', def: '0px', desc: 'swiper.cssVars.--sc-swiper-radius' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
