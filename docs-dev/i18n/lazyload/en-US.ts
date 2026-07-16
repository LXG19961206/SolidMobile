export default {
    componentIntro: {
        LazyloadIntro: 'Lazy-loads content when scrolled into viewport.'
    },
    nav: {
        lazyload: 'Lazyload'
    },
    demoDesc: {
        lazyload_list: 'Top 320px is description; scroll down for lazy-load cards.',
        lazyload_active: 'Click to toggle active, showing Loading → content lifecycle.',
        lazyload_gallery: 'Top 280px pushes grid out; scroll for colored cards.'
    },
    componentProps: {
        lazyload: {
            active: 'Controlled mode: manually activate.',
            placeholder: 'Placeholder shown when inactive.',
            children: 'Content rendered when active.',
            rootMargin: 'Trigger offset from viewport.',
            height: 'Min height before activation, prevents layout shift.',
            threshold: 'Visibility ratio threshold 0-1.',
            once: 'Trigger only once, default true.'
        }
    }
};
