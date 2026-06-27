export function LineChart(props: { size?: string | number; color?: string; class?: string; variant?: 'line' | 'fill'; }) {
  const s = () => typeof props.size === 'number' ? `${props.size}px` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={props.variant === 'fill' ? '<path d="M5 3V19H21V21H3V3H5ZM19.9393 5.93934L22.0607 8.06066L16 14.1213L13 11.121L9.06066 15.0607L6.93934 12.9393L13 6.87868L16 9.879L19.9393 5.93934Z"/>' : '<path d="M5 3V19H21V21H3V3H5ZM20.2929 6.29289L21.7071 7.70711L16 13.4142L13 10.415L8.70711 14.7071L7.29289 13.2929L13 7.58579L16 10.585L20.2929 6.29289Z"/>'} />
  );
}