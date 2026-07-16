export default {
    demo: {
        avatarIcon: '图标',
        avatarIconDesc: 'Icon avatar.',
        avatarImage: '图片',
        avatarImageDesc: 'Image avatar.',
        avatarSize: '尺寸',
        avatarSizeDesc: 'Preset sizes.',
        avatarSquare: '方形',
        avatarSquareDesc: '方形头像。',
        avatarText: '文字',
        avatarTextDesc: 'Text avatar.',
        avatarRoundSquare: 'Avatar Round Square',
        avatarRoundSquareDesc: 'Avatar Round Square Description',
        avatarSizeMobileDesc: 'Avatar Size  (Mobile) Description',
        avatarSizeTitle: 'Avatar Size Title',
        avatarTextIcon: 'Avatar Text Icon',
        avatarTextIconDesc: "Avatar 文字 图标 描述"
    },
    demoDesc: {
        avatar_icon_fallback: '不传 src 时显示 icon 图标。',
        avatar_text_fallback: '不传 src 和 icon 时，取 text 的第一个字符。',
        avatar_square: 'square 替代 round，适合品牌 logo。'
    },
    componentProps: {
        avatar: {
            src: '头像图片地址。',
            alt: '替代文本（无障碍）。',
            size: '尺寸，预设 xs/sm/md/lg/xl 或自定义 px。',
            round: '完全圆形（与 square 互斥）。',
            square: '方形。传数字控制圆角大小。',
            icon: '无 src 或加载失败时显示的图标。',
            text: '无 src 且无 icon 时的文字（取首字符）。',
            color: '自定义背景色。'
        }
    }
};
