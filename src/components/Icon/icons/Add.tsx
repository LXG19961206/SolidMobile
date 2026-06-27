export function Add(props: { size?: string | number; color?: string; class?: string; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={'<path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"/>'} />
  );
}