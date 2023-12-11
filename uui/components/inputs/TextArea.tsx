import { devLogger, withMods } from '@epam/uui-core';
import { TextArea as uuiTextArea, TextAreaProps as UuiTextAreaProps } from '@epam/uui-components';
import * as types from '../types';
import css from './TextArea.module.scss';

const defaultSize = '36';
const defaultMode = types.EditMode.FORM;

export interface TextAreaMods extends types.IHasEditMode {
    /**
     * @default '36'
     * Size '48' is deprecated, and will be removed in future release
     * */
    size?: types.ControlSize;
}

export function applyTextAreaMods(mods: TextAreaMods) {
    return [
        css.root, css['size-' + (mods.size || defaultSize)], css['mode-' + (mods.mode || defaultMode)],
    ];
}

export type TextAreaProps = UuiTextAreaProps & TextAreaMods;

export const TextArea = withMods<UuiTextAreaProps, TextAreaMods>(
    uuiTextArea,
    applyTextAreaMods,
    (props) => {
        if (__DEV__) {
            devLogger.warnAboutDeprecatedPropValue<TextAreaProps, 'size'>({
                component: 'TextArea',
                propName: 'size',
                propValue: '48',
                propValueUseInstead: '42',
                condition: () => props.size === '48',
            });
        }
        return {
            autoSize: props.mode === types.EditMode.CELL ? true : props.autoSize,
            maxLength: props.mode === types.EditMode.CELL ? undefined : props.maxLength,
        };
    },
);
