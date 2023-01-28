import { NoLimitFunc, Position, Size, ThemeType } from "../../@types/common"
import { BasePropsAndAttrs } from "../common/types"

import { Component, JSXElement, Accessor, JSX } from 'solid-js'


export type ButtonNativeTypes = 'submit' | 'reset'

export interface ButtonProps extends BasePropsAndAttrs {
    type: ThemeType, 
    action: NoLimitFunc,
    size: Size,
    text: string,
    color: string, 
    textColor: string,
    icon: string,
    iconClass: string,
    iconPosition: Position, // todo
    nativeType: ButtonNativeTypes,
    block: boolean,
    plain: boolean,
    round: boolean,
    disabled: boolean,
    hairline: boolean,
    loadingStatus: boolean
}

