export default {
    demo: {
        tagA: 'Tag A',
        tagB: 'Tag B',
        tagCloud: 'Cloud',
        tagCloudDesc: 'Tag cloud.',
        tagDict: 'Dict',
        tagDictDesc: 'Key-value.',
        tagFilter: '筛选',
        tagFilterDesc: 'Tag filter.',
        tagOutlineRound: '线框',
        tagOutlineRoundDesc: 'Outline & round.',
        tagTypes: '类型',
        tagTypesDesc: 'Tag types.',
        tagCapsule: 'Tag Capsule',
        tagClosable: 'Tag Closable',
        tagClosableLabel: 'Tag Closable Label',
        tagClosableMobileDesc: 'Tag Closable  (Mobile) Description',
        tagDanger: 'Tag Danger',
        tagInfo: 'Tag Info',
        tagLabel1: 'Tag Label1',
        tagLabel2: 'Tag Label2',
        tagLabel3: 'Tag Label3',
        tagMediumMD: 'Tag Medium M D',
        tagMobileTitle: 'Tag  (Mobile) Title',
        tagPrimary: 'Tag Primary',
        tagSizeRound: 'Tag Size Round',
        tagSizeRoundMobileDesc: 'Tag Size Round  (Mobile) Description',
        tagSmallCapsule: 'Tag Small Capsule',
        tagSmallSM: 'Tag Small S M',
        tagSuccess: 'Tag Success',
        tagTypesMobileDesc: 'Tag Types  (Mobile) Description',
        tagVariantMobileDesc: 'Tag Variant  (Mobile) Description',
        tagWarning: 'Tag Warning'
    },
    componentIntro: {
        TagIntro: '用于标记和分类的小型标签，支持多种语义色和填充方式。'
    },
    demoDesc: {
        tag_dict: '用 outline variant 模拟 key-value 字典效果。',
        tag_cloud: '不同语义色搭配 round 胶囊样式，模拟文章标签或筛选条件。',
        tag_filter: 'closeable 标签模拟已选筛选条件，可逐个移除。'
    },
    componentProps: {
        tag: {
            type: '语义色：primary / secondary / success / warning / danger / info。',
            variant: '填充方式：solid / outline / ghost。',
            size: '尺寸：xs / sm / md / lg。',
            round: '胶囊圆角。',
            closeable: '是否可关闭。',
            onClose: '关闭回调。',
            color: '自定义颜色。'
        }
    }
};
