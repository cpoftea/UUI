import cx from 'classnames';
import * as React from 'react';

import css from './NotePluginBlock.module.scss';
import { PlateElement, type PlateElementProps } from '@udecode/plate-common';
import { NoteNodeProps } from './types';

export function NotePluginBlock({ children, nodeProps, ...props }: PlateElementProps) {
    let style;
    if (nodeProps) {
        const { borderColor, backgroundColor } = nodeProps as NoteNodeProps;
        style = {
            borderColor,
            backgroundColor,
        };
    }

    return (
        <PlateElement
            { ...props }
            nodeProps={ nodeProps }
            style={ { ...style, ...props.style } }
            className={ cx(props.className, css.wrapper) }
        >
            { children }
        </PlateElement>
    );
}
