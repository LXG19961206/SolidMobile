import { BasePropsAndAttrs } from "../common/types";

export interface IconProps extends BasePropsAndAttrs {
  name: string,
  size?: string | number,
  color?: string
}