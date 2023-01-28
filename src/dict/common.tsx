import { ThemeType } from "../@types/common";

export const ThemeTypeAndColor = new Map<ThemeType, string>()

export const ThemeTypeDict = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger'
} as const


export const SizeDict = {
  small: 'small',
  normal: 'normal',
  large: 'large',
  mini: 'mini'
} as const 

export const PositionDict = {
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  top: 'top',
  middle: 'middle'
}

