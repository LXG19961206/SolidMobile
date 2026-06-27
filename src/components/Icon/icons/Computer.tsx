export function Computer(props: { size?: string | number; color?: string; class?: string; variant?: 'line' | 'fill'; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={props.variant === 'fill' ? '<path d="M13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"/>' : '<path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"/>'} />
  );
}