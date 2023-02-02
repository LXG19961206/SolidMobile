import { pick } from "lodash";
import { BasePropsAndAttrs } from "../components/common/types";

export const attrsForward = function <T extends BasePropsAndAttrs>(props: T, picked: string []): Partial<T> {
  return pick(props, picked)
}