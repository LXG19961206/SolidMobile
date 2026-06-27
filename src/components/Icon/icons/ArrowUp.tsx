export function ArrowUp(props: { size?: string | number; color?: string; class?: string; variant?: 'line' | 'fill'; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={props.variant === 'fill' ? '<path d="M13 12V20H11V12H4L12 4L20 12H13Z"/>' : '<path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"/>'} />
  );
}