import React from 'react';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { PlatePluginComponent } from '@udecode/plate-common';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { PARAGRAPH_KEY, ParagraphElement } from './plugins/paragraphPlugin';
import { HeaderElement } from './plugins/headerPlugin/HeaderElement';

export type DefaultPluginKey =
    | typeof ELEMENT_H1
    | typeof ELEMENT_H2
    | typeof ELEMENT_H3
    | typeof ELEMENT_H4
    | typeof ELEMENT_H5
    | typeof ELEMENT_H6
    | typeof PARAGRAPH_KEY
    | typeof MARK_BOLD
    | typeof MARK_CODE
    | typeof MARK_ITALIC
    | typeof MARK_SUPERSCRIPT
    | typeof MARK_UNDERLINE;

export const createPlateUI = <T extends string = string>(
    overrideByKey?: Partial<
    Record<DefaultPluginKey | T, PlatePluginComponent>
    >,
) => {
    const components: { [key: string]: PlatePluginComponent } = {
        [ELEMENT_H1]: (props) => <HeaderElement variant="h1" { ...props } />,
        [ELEMENT_H2]: (props) => <HeaderElement variant="h2" { ...props } />,
        [ELEMENT_H3]: (props) => <HeaderElement variant="h3" { ...props } />,
        [ELEMENT_H4]: (props) => <HeaderElement variant="h4" { ...props } />,
        [ELEMENT_H5]: (props) => <HeaderElement variant="h5" { ...props } />,
        [ELEMENT_H6]: (props) => <HeaderElement variant="h6" { ...props } />,
        [PARAGRAPH_KEY]: ParagraphElement,
        [MARK_BOLD]: (props) => <strong { ...props.attributes }>{ props.children }</strong>,
        [MARK_CODE]: (props) => <code { ...props.attributes }>{ props.children }</code>,
        [MARK_ITALIC]: (props) => <em { ...props.attributes }>{ props.children }</em>,
        [MARK_SUPERSCRIPT]: (props) => <sup { ...props.attributes }>{ props.children }</sup>,
        [MARK_UNDERLINE]: (props) => <u { ...props.attributes }>{ props.children }</u>,
    };

    if (overrideByKey) {
        Object.keys(overrideByKey).forEach((k) => {
            const key = k as DefaultPluginKey;
            components[key] = overrideByKey[key]!; // TODO: improve typing
        });
    }

    return components;
};
