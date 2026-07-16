export default {
    demoDesc: {
        lazyload_list: '上部 320px 是说明区，下面的文档卡片被推出视口。向下滚动后卡片逐个进入视口触发懒加载。',
        lazyload_active: '点击按钮触发 active，同样经历 Loading → 显示内容的延迟过程。',
        lazyload_gallery: '上部 280px 标题区推出网格，向下滚动后彩色卡片逐个触发。'
    },
    componentProps: {
        lazyload: {
            active: '受控模式：外部控制是否激活。',
            placeholder: '未激活时显示的占位内容。',
            children: '激活后渲染的实际内容。',
            rootMargin: '提前触发的距离。',
            height: '最小高度，占位期间撑住布局，避免加载后抖动。',
            threshold: '可见比例阈值 0-1。',
            once: '是否只触发一次，默认 true。'
        }
    }
};
