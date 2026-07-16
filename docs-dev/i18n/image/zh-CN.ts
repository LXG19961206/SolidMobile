export default {
    demo: {
        imageCarousel: 'Carousel',
        imageCarouselDesc: 'Image carousel.',
        imageChildrenButton: 'Children',
        imageChildrenButtonDesc: 'Children button.',
        imageCustomJSXDesc: 'Custom JSX.',
        imageFit: 'Fit',
        imageFitDesc: 'Fit modes.',
        imageFixedSize: 'Fixed',
        imageFixedSizeDesc: 'Fixed size.',
        imageGallery: 'Gallery',
        imageGalleryDesc: 'Gallery.',
        imageLogo: 'Logo',
        imageLogoDesc: 'Logo.',
        imagePreview: 'Preview',
        imagePreviewDesc: 'Preview.',
        imageRadius: 'Radius',
        imageRadiusDesc: 'Radius/round.',
        imageUpload: 'Image Upload',
        imageUploadDesc: 'Image upload.',
        imageGalleryLoadDesc: 'Image Gallery Load Desc',
        imageGalleryLoadHint: 'Image Gallery Load Hint',
        imageFitMobileDesc: 'cover / contain / fill / none comparison (container 100x50, 2:1 ratio)',
        imageRadiusMobileDesc: 'radius controls corner rounding / round for full circle',
        imageBlockMobile: 'Block & Aspect Ratio',
        imageBlockMobileDesc: 'Custom aspect ratio + block full-width mode',
        imageCustomSize: '100x60 custom size',
        imageBlockFull: 'block full width',
        imagePreviewMobileDesc: 'preview prop enables full-screen preview, tap images below',
        imageFallbackMobile: 'Fallback on Error',
        imageFallbackMobileDesc: 'Shows fallback placeholder when src is invalid'
    },
    nav: {
        image: 'Image 图片'
    },
    demoDesc: {
        image_logo: 'solid-mobile 官方 logo。',
        image_fit: '通过 fit 控制 object-fit 行为。容器为正方形，源图 4:3。',
        image_placeholder: '加载中显示占位内容，可自定义。',
        image_fallback: '加载失败时显示兜底内容。'
    },
    componentProps: {
        image: {
            src: '图片地址。',
            alt: '替代文本。',
            width: '宽度。',
            height: '高度。',
            fit: '填充方式：cover / contain / fill / none / scale-down。',
            position: 'object-position 值。',
            radius: '圆角大小。',
            round: '完全圆形。',
            block: '块级元素，宽度撑满。',
            lazy: '启用懒加载。',
            placeholder: '加载中占位。',
            fallback: '加载失败兜底。',
            iconSize: '加载失败时图标大小。',
            onLoad: '加载成功回调。',
            onError: '加载失败回调。',
            preview: '点击预览大图。'
        }
    },
    component: {
        image: {
            title: 'Image 图片',
            intro: '增强的图片组件，支持懒加载、加载占位、失败兜底、多种填充方式及圆角/圆形。',
            fit: '填充方式',
            shape: '圆角 & 圆形',
            'shape-desc': 'radius 设置圆角大小，round 为完全圆形。',
            preview: '点击预览',
            'preview-desc': '设置 preview，点击图片后全屏遮罩展示大图，点击遮罩关闭。',
            state: '加载 & 失败',
            placeholder: '加载中占位',
            'placeholder-desc': '加载中显示占位内容，可自定义。',
            fallback: '加载失败兜底',
            'fallback-desc': '加载失败时显示兜底内容。',
            props: {
                src: '图片地址。',
                alt: '替代文本。',
                width: '宽度。',
                height: '高度。',
                fit: '填充方式（object-fit）。可选 \'cover\' | \'contain\' | \'fill\' | \'none\' | \'scale-down\'。',
                position: 'object-position。',
                radius: '圆角大小。',
                round: '圆形（头像等）。',
                block: '块级元素，宽 100%。',
                lazy: '启用懒加载（IntersectionObserver）。',
                placeholder: '加载中占位内容。',
                fallback: '加载失败兜底内容。',
                iconSize: '占位图标尺寸。',
                onLoad: '加载完成回调。',
                onError: '加载失败回调。',
                preview: '开启点击预览，全屏遮罩展示大图。'
            }
        }
    }
};
