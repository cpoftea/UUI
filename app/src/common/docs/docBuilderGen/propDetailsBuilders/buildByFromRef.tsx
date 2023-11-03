import React from 'react';
import { DocBuilder, iCanRedirectDoc, iHasLabelDoc, iEditable } from '@epam/uui-docs';
import {
    IAnalyticableClick,
    ICanBeInvalid,
    IDropdownToggler,
    IHasCaption, IHasCX,
    IHasForwardedRef,
    IHasPlaceholder,
    IHasRawProps,
} from '@epam/uui-core';
import { TDetailsBuilder, TSkin } from '../types';
import { TDocsGenExportedType } from '../../../apiReference/types';
import { TTypeRef } from '../../../apiReference/sharedTypes';
import { getDocBySkin } from './shared/reusableDocs';
import { JsonEditor } from './shared/jsonEditor';
import { CssClassEditor } from './shared/cssClassEditor';

function getReactRefExamples(name: string) {
    return (ctx: any) => {
        return [
            { name: 'React.createRef<any>()', value: React.createRef<any>() },
            ctx.getCallback(name),
        ];
    };
}

const COMMON_DOCS: Record<TTypeRef | TDocsGenExportedType, (skin?: TSkin) => DocBuilder<any>> = {
    '@epam/uui-core:IDropdownToggler': () => new DocBuilder<IDropdownToggler>({ name: '' }).prop('ref', {
        examples: getReactRefExamples('ref'),
    }),
    '@epam/uui-core:IHasForwardedRef': () => new DocBuilder<IHasForwardedRef<any>>({ name: '' }).prop('forwardedRef', {
        examples: getReactRefExamples('ref'),
    }),
    '@epam/uui-core:IHasLabel': () => iHasLabelDoc,
    '@epam/uui-core:IHasCX': () => new DocBuilder<IHasCX>({ name: '' }).prop('cx', {
        renderEditor: (props) => {
            return <CssClassEditor { ...props } />;
        },
        examples: [],
    }),
    '@epam/uui-core:IHasCaption': () => new DocBuilder<IHasCaption>({ name: '' })
        .prop('caption', {
            examples: [
                { value: 'Short text', isDefault: true },
                { name: 'Long text', value: 'kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa kolbasa' },
                { name: 'Long word', value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
            ],
            type: 'string',
        }),
    '@epam/uui-core:IHasPlaceholder': () => new DocBuilder<IHasPlaceholder>({ name: '' })
        .prop('placeholder', {
            examples: ['Select country', 'Type text'],
            type: 'string',
        }),
    '@epam/uui-core:IHasRawProps': () => {
        return new DocBuilder<IHasRawProps<any>>({ name: '' })
            .prop('rawProps', {
                renderEditor: (props) => {
                    return <JsonEditor { ...props } />;
                },
                examples: [],
            });
    },
    '@epam/uui-core:ICanBeInvalid': () => new DocBuilder<ICanBeInvalid>({ name: 'isInvalid' })
        .prop('isInvalid', { examples: [true] })
        .prop('validationProps', {
            renderEditor: JsonEditor,
            examples: [],
        })
        .prop('validationMessage', {
            examples: [
                { name: 'String', value: 'This field is mandatory' },
                { name: 'ReactElement', value: (<b>This field is mandatory</b>) },
            ],
        }),
    '@epam/uui-core:IAnalyticableClick': () => new DocBuilder<IAnalyticableClick>({ name: '' })
        .prop('clickAnalyticsEvent', {
            examples: [
                { value: { name: 'test' }, name: '{ name: "test" }' },
            ],
        }),
    '@epam/uui-core:ICanRedirect': () => iCanRedirectDoc,
    '@epam/uui-core:PickerBaseOptions': (skin) => getDocBySkin(skin, 'pickerBaseOptionsDoc'),
    '@epam/uui-core:IEditable': () => {
        return new DocBuilder<any>({ name: '' }).implements([iEditable]);
    },
};

export const buildByFromRef: TDetailsBuilder = (params) => {
    const { prop, skin } = params;
    const db: DocBuilder<any> = COMMON_DOCS[prop.from]?.(skin);
    if (db) {
        const found = db.props.find((p) => p.name === prop.name);
        if (found) {
            const { name, ...details } = found;
            return details;
        }
    }
};
