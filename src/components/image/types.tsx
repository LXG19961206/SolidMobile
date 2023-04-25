import { JSXElement } from "solid-js";

export interface ImageProps {
  src: string,
  fit?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down',
  position?: string,
  alt?: string,
  width?: string | number,
  height?: string | number,
  radius?: string | number,
  round?: boolean,
  block?: boolean,
  lazyLoad?: boolean,
  showLoading?: boolean,
  showError?: boolean,
  loadingIcon?: string | JSXElement,
  errorIcon?: string | JSXElement,
  iconSize?: string | number,
  onClick: (evt: Event) => unknown,
  onError: (err: Error) => unknown,
  onLoad: () => unknown
}