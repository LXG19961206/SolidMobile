import type { JSX } from 'solid-js';

export interface SkeletonProps {
  /** Show skeleton placeholder when true, show children when false */
  loading?: boolean;
  /** Enable shimmer animation */
  animated?: boolean;
  /** Preset size */
  size?: 'small' | 'normal' | 'large';
  /** Shape of each skeleton bar */
  shape?: 'square' | 'round' | 'circle';
  /** Animation duration in seconds */
  duration?: number;
  /** Number of skeleton rows */
  rows?: number;
  /** Custom width, overrides size */
  width?: string | number;
  /** Custom height, overrides size */
  height?: string | number;
  /** Content to display when visible=true */
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}
