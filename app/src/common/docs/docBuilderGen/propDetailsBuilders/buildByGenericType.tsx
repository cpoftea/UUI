import React from 'react';
import { PropDoc } from '@epam/uui-docs';
import { TDetailsBuilder } from '../types';
import { TPropEditorType } from '../../../apiReference/sharedTypes';
import { getDocBySkin } from './shared/reusableDocs';
import { NumEditor } from './shared/numEditor';

const boolDetailsBuilder: TDetailsBuilder = (params) => {
    const { prop } = params;
    const editor = prop.editor;
    if (editor.type === TPropEditorType.bool) {
        const res: Partial<PropDoc<any, any>> = { examples: [{ value: true }, { value: false }] };
        return res;
    }
    throw new Error('Unsupported type');
};

const componentDetailsBuilder: TDetailsBuilder = (params) => {
    const { prop, skin } = params;
    const editor = prop.editor;
    const SampleReactComponents = {
        SimpleComponent: () => (<div>ReactComponent</div>),
    };
    const NAMES = ['icon', 'indeterminateIcon', 'clearIcon', 'dropdownIcon', 'acceptIcon', 'cancelIcon'];

    if (editor.type === TPropEditorType.component) {
        if (NAMES.indexOf(prop.name) !== -1) {
            const { name, ...rest } = getDocBySkin(skin, 'iconWithInfoDoc').getProp('icon');
            return rest;
        }
        return { examples: [SampleReactComponents.SimpleComponent] };
    }
    throw new Error('Unsupported type');
};

const funcDetailsBuilder: TDetailsBuilder = (params) => {
    const { prop } = params;
    const editor = prop.editor;
    if (editor.type === TPropEditorType.func) {
        return { examples: (ctx: any) => [ctx.getCallback(prop.name)] };
    }
    throw new Error('Unsupported type');
};

const numberDetailsBuilder: TDetailsBuilder = (params) => {
    const { prop } = params;
    const editor = prop.editor;
    if (editor.type === TPropEditorType.number) {
        return {
            renderEditor: (props) => {
                return <NumEditor { ...props } />;
            },
            examples: [],
        };
    }
    throw new Error('Unsupported type');
};

const oneOfDetailsBuilder: TDetailsBuilder = (params) => {
    const { prop, skin } = params;
    const editor = prop.editor;
    if (editor.type === TPropEditorType.oneOf) {
        if (['color'].indexOf(prop.name) !== -1) {
            const { name, examples, ...rest } = getDocBySkin(skin, 'colorDoc').getProp('color');
            return {
                ...rest,
                examples: editor.options,
            };
        } else {
            return { examples: editor.options };
        }
    }
    throw new Error('Unsupported type');
};

const stringDetailsBuilder: TDetailsBuilder = (params) => {
    const { prop } = params;
    const editor = prop.editor;
    if (editor.type === TPropEditorType.string) {
        return {
            examples: [
                { name: 'empty', value: '' },
                { name: 'short text', value: 'test' },
                { name: 'long text', value: 'test 1 test 2 test 3 test 4' },
            ],
            type: 'string',
        };
    }
    throw new Error('Unsupported type');
};

const genericTypesMap: Map<TPropEditorType, TDetailsBuilder> = new Map();
genericTypesMap.set(TPropEditorType.oneOf, oneOfDetailsBuilder);
genericTypesMap.set(TPropEditorType.string, stringDetailsBuilder);
genericTypesMap.set(TPropEditorType.bool, boolDetailsBuilder);
genericTypesMap.set(TPropEditorType.func, funcDetailsBuilder);
genericTypesMap.set(TPropEditorType.component, componentDetailsBuilder);
genericTypesMap.set(TPropEditorType.number, numberDetailsBuilder);

export const buildByGenericType: TDetailsBuilder = (params) => {
    const { prop, docs, skin } = params;
    const peType = prop.editor?.type;
    const builder = genericTypesMap.get(peType);
    if (builder) {
        return builder({ prop, docs, skin });
    }
};
