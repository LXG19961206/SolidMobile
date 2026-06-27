export function CornerUpLeft(props: { size?: string | number; color?: string; class?: string; variant?: 'line' | 'fill'; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={props.variant === 'fill' ? '<path d="M19.0001 10.0001L19.0003 19L17.0003 19L17.0002 12.0001L9.41409 12V17.4142L2.99988 11L9.41409 4.58578L9.41409 10L19.0001 10.0001Z"/>' : '<path d="M19.0001 10.0001L19.0003 19L17.0003 19L17.0002 12.0001L6.82833 12L10.7781 15.9498L9.36384 17.364L2.99988 11L9.36384 4.63605L10.7781 6.05026L6.82828 10L19.0001 10.0001Z"/>'} />
  );
}