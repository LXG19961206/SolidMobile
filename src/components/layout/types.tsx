import { BasePropsAndAttrs } from "../common/types";

export interface RowProps extends BasePropsAndAttrs {
  
  gutter: string | number,

  justify: 'start' | 'end' | 'center' | 'around' | 'between',

  align: 'top' | 'center' | 'bottom' | 'start' | 'end',

  wrap: boolean

}

export interface ColProps extends BasePropsAndAttrs {
  
  span: 2 | 4 | 6 | 8 | 12 | 24,

  offset: 2 | 4 | 6 | 8 | 12 | 24

}