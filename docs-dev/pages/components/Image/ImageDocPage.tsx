import { useT } from '../../../doc-i18n';
import { Image } from '../../../../src/components/Image';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './ImageDocPage.module.css';

const SRC = 'https://picsum.photos/seed/sc1/400/300';

export const ImageDocPage = () => {
  const t = useT();

  const propsData: PropRow[] = [
    { name: 'src', type: 'string', default: '—', required: true, desc: 'component.image.props.src' },
    { name: 'alt', type: 'string', default: "''", required: false, desc: 'component.image.props.alt' },
    { name: 'width', type: 'string | number', default: '—', required: false, desc: 'component.image.props.width' },
    { name: 'height', type: 'string | number', default: '—', required: false, desc: 'component.image.props.height' },
    { name: 'fit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", default: "'fill'", required: false, desc: 'component.image.props.fit' },
    { name: 'position', type: 'string', default: '—', required: false, desc: 'component.image.props.position' },
    { name: 'radius', type: 'string | number', default: '—', required: false, desc: 'component.image.props.radius' },
    { name: 'round', type: 'boolean', default: 'false', required: false, desc: 'component.image.props.round' },
    { name: 'block', type: 'boolean', default: 'false', required: false, desc: 'component.image.props.block' },
    { name: 'lazy', type: 'boolean', default: 'false', required: false, desc: 'component.image.props.lazy' },
    { name: 'placeholder', type: 'JSX.Element', default: '—', required: false, desc: 'component.image.props.placeholder' },
    { name: 'fallback', type: 'JSX.Element', default: '—', required: false, desc: 'component.image.props.fallback' },
    { name: 'iconSize', type: 'string | number', default: '—', required: false, desc: 'component.image.props.iconSize' },
    { name: 'onLoad', type: '() => void', default: '—', required: false, desc: 'component.image.props.onLoad' },
    { name: 'onError', type: '() => void', default: '—', required: false, desc: 'component.image.props.onError' },
    { name: 'preview', type: 'boolean', default: 'false', required: false, desc: 'component.image.props.preview' },
  ];

  const tocItems: TOCItem[] = [
    { id: 'props', title: t('common.props') },
    { id: 'basic', title: t('common.basic') },
    { id: 'fit', title: t('component.image.fit') },
    { id: 'shape', title: t('component.image.shape') },
    { id: 'preview', title: t('component.image.preview') },
    { id: 'state', title: t('component.image.state') },
  ];

  return (
    <DocLayout>

      <div class={css.page}>
        <h1 class={css.h1}>{t('component.image.title')}</h1>
        <p class={css.intro}>{t('component.image.intro')}</p>

        <h2 id="props" class={css.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        <h2 id="basic" class={css.h2}>{t('common.basic')}</h2>
        <DemoBlock title={t('demo.imageLogo')} desc="solid-mobile 官方 logo。" code={`<Image src="./logo.jpg" width={100} height={100} fit="cover" radius={16} />`}>
          <Image src="./logo.jpg" width={100} height={100} fit="cover" radius={16} />
        </DemoBlock>

        <DemoBlock title={t('demo.imageFixedSize')} code={'<Image src="photo.jpg" width={300} height={200} />'}>
          <Image src={SRC} width={300} height={200} />
        </DemoBlock>

        <h2 id="fit" class={css.h2}>{t('component.image.fit')}</h2>
        <DemoBlock title={t('demo.imageFit')} desc="通过 fit 控制 object-fit 行为。容器为正方形，源图 4:3。" code={'<Image src="..." width={100} height={100} fit="cover" />\n<Image src="..." width={100} height={100} fit="contain" />\n<Image src="..." width={100} height={100} fit="fill" />'}>
          <div class={css.row}>
            <Image src={SRC} width={100} height={100} fit="cover" />
            <Image src={SRC} width={100} height={100} fit="contain" />
            <Image src={SRC} width={100} height={100} fit="fill" />
          </div>
        </DemoBlock>

        <h2 id="shape" class={css.h2}>{t('component.image.shape')}</h2>
        <DemoBlock title={t('demo.imageRadius')} desc={t('component.image.shape-desc')} code={'<Image src="..." width={80} height={80} radius={12} />\n<Image src="..." width={80} height={80} round />'}>
          <div class={css.row}>
            <Image src={SRC} width={80} height={80} radius={12} />
            <Image src={SRC} width={80} height={80} round />
          </div>
        </DemoBlock>

        <h2 id="preview" class={css.h2}>{t('component.image.preview')}</h2>
        <DemoBlock title={t('demo.imagePreview')} desc={t('component.image.preview-desc')} code={'<Image src="photo.jpg" width={200} height={150} preview />'}>
          <div class={css.row}>
            <Image src={SRC} width={200} height={150} preview />
          </div>
        </DemoBlock>

        <h2 id="state" class={css.h2}>{t('component.image.state')}</h2>
        <DemoBlock title={t('component.image.placeholder')} desc="加载中显示占位内容，可自定义。" code={'<Image src="..." width={200} height={150} placeholder={<div style={{background:'#f3f4f6'}}>加载中...</div>} />'}>
          <Image src={SRC} width={200} height={150} placeholder={<div style="display:flex;align-items:center;justify-content:center;width:200px;height:150px;background:#f3f4f6;color:#999;font-size:0.8rem">加载中...</div>} />
        </DemoBlock>
        <DemoBlock title={t('component.image.fallback')} desc="加载失败时显示兜底内容。" code={'<Image src="invalid.jpg" width={200} height={150} fallback={<div style={{background:'#f3f4f6',color:'#ef4444'}}>加载失败</div>} />'}>
          <Image src="invalid.jpg" width={200} height={150} fallback={<div style="display:flex;align-items:center;justify-content:center;width:200px;height:150px;background:#f3f4f6;color:#ef4444;font-size:0.8rem">加载失败</div>} />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
