export default {
    demo: {
        avatarIcon: 'Icon',
        avatarIconDesc: 'Icon avatar.',
        avatarImage: 'Image',
        avatarImageDesc: 'Image avatar.',
        avatarSize: 'Size',
        avatarSizeDesc: 'Preset sizes.',
        avatarSquare: 'Square',
        avatarSquareDesc: 'Square avatar.',
        avatarText: 'Text',
        avatarTextDesc: 'Text avatar.',
        avatarRoundSquare: 'Avatar Round Square',
        avatarRoundSquareDesc: 'Avatar Round Square Description',
        avatarSizeMobileDesc: 'Avatar Size  (Mobile) Description',
        avatarSizeTitle: 'Avatar Size Title',
        avatarTextIcon: 'Avatar Text Icon',
        avatarTextIconDesc: 'Avatar Text Icon Description'
    },
    componentIntro: {
        AvatarIntro: 'User avatar with fallback: image to icon to first letter.'
    },
    demoDesc: {
        avatar_icon_fallback: 'Shows icon when src is not provided.',
        avatar_text_fallback: 'When no src or icon, shows first character of text.',
        avatar_square: 'Square shape for brand logos instead of round.'
    },
    componentProps: {
        avatar: {
            src: 'Avatar image URL.',
            alt: 'Alt text (accessibility).',
            size: 'Size: preset xs/sm/md/lg/xl or custom px.',
            round: 'Fully round (mutually exclusive with square).',
            square: 'Square shape. Number controls border-radius.',
            icon: 'Icon shown when no src or load fails.',
            text: 'Text shown when no src/icon (first character).',
            color: 'Custom background color.'
        }
    }
};
