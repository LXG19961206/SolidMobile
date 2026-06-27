export function Pause(props: { size?: string | number; color?: string; class?: string; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={'<path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"/>'} />
  );
}