export function Filter(props: { size?: string | number; color?: string; class?: string; variant?: 'line' | 'fill'; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={props.variant === 'fill' ? '<path d="M21 4V6H20L14 15V22H10V15L4 6H3V4H21Z"/>' : '<path d="M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.4037 6L11 12.8944V20H13V12.8944L17.5963 6H6.4037Z"/>'} />
  );
}