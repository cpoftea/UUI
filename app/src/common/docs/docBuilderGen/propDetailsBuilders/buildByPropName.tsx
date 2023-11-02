import { PropDoc } from '@epam/uui-docs';
import { TDetailsBuilder } from '../types';
import { JsonEditor } from './shared/jsonEditor';
import React from 'react';
import { CssClassEditor } from './shared/cssClassEditor';

const byName = new Map<string, Partial<PropDoc<any, any>>>();
byName.set('captionCX', {
    renderEditor: (props) => {
        return <CssClassEditor { ...props } />;
    },
    examples: [],
});
byName.set('rawProps', {
    renderEditor: (props) => {
        return <JsonEditor { ...props } />;
    },
    examples: [],
});
byName.set('portalTarget', {
    examples: [
        { value: document.body, name: 'document.body' },
    ],
});
byName.set('boundaryElement', {
    examples: [
        { value: document.body, name: 'document.body' },
    ],
});

export const buildByPropName: TDetailsBuilder = (params) => {
    const { prop } = params;
    const found = byName.get(prop.name);
    if (found) {
        return found;
    }
};
