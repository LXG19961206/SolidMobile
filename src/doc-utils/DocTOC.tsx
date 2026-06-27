import { createSignal, onMount, onCleanup, For } from 'solid-js';
import styles from './DocTOC.module.css';

export interface TOCItem {
  id: string;
  title: string;
}

export interface DocTOCProps {
  items: TOCItem[];
}

/**
 * 右侧锚点导航组件。追踪当前滚动到的章节并高亮，点击平滑滚动。
 * 每个文档页传入自己的章节列表即可复用。
 */
export function DocTOC(props: DocTOCProps) {
  const [activeId, setActiveId] = createSignal<string>('');

  // Scroll spy: track which section heading is closest to the top
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const headings = props.items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      // Find the last heading that's above the viewport top + offset
      const offset = 80; // px from top
      let current = '';
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= offset) {
          current = h.id;
        }
      }
      setActiveId(current);
      ticking = false;
    });
  };

  onMount(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial
  });
  onCleanup(() => window.removeEventListener('scroll', onScroll));

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav class={styles.nav}>
      <span class={styles.navTitle}>目录</span>
      <ul class={styles.list}>
        <For each={props.items}>
          {(item) => (
            <li>
              <a
                class={styles.link}
                classList={{ [styles.active!]: activeId() === item.id }}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.title}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
