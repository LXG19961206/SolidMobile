export function BarChart(props: { size?: string | number; color?: string; class?: string; variant?: 'line' | 'fill'; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={props.variant === 'fill' ? '<path d="M3 12H7V21H3V12ZM17 8H21V21H17V8ZM10 2H14V21H10V2Z"/>' : '<path d="M3 12H5V21H3V12ZM19 8H21V21H19V8ZM11 2H13V21H11V2Z"/>'} />
  );
}