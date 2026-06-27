import { createContext, createSignal, onCleanup, type JSX } from 'solid-js';
import { PhoneSimulator } from './PhoneSimulator';
import styles from './DocLayout.module.css';

// Context so DemoBlock knows where to portal its demo preview.
export const PhoneTargetContext = createContext<() => HTMLDivElement | undefined>();
// Whether we're on mobile (demos should render inline)
export const IsMobileContext = createContext<() => boolean>();

export interface DocLayoutProps {
  children?: JSX.Element;
}

const MOBILE_BP = 1024;

/**
 * 文档布局 — PC：左侧文档 + 右侧手机模拟器（demo 分离到手机）。
 * 移动端：全部原地渲染（demo + 代码在一起）。
 */
export function DocLayout(props: DocLayoutProps) {
  const [phoneTarget, setPhoneTarget] = createSignal<HTMLDivElement>();
  const [isMobile, setIsMobile] = createSignal(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BP : false,
  );

  if (typeof window !== 'undefined') {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BP);
    window.addEventListener('resize', onResize);
    onCleanup(() => window.removeEventListener('resize', onResize));
  }

  return (
    <PhoneTargetContext.Provider value={phoneTarget}>
      <IsMobileContext.Provider value={isMobile}>
        <div class={styles.layout}>
          <div class={styles.left}>
            {props.children}
          </div>
          <div class={styles.right} style={{ display: isMobile() ? 'none' : '' }}>
            <div class={styles.phoneSticky}>
              <PhoneSimulator>
                <div ref={setPhoneTarget} class={styles.phoneInner} />
              </PhoneSimulator>
            </div>
          </div>
        </div>
      </IsMobileContext.Provider>
    </PhoneTargetContext.Provider>
  );
}
