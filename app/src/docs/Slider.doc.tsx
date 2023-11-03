import * as React from 'react';
import {
    BaseDocsBlock, DocExample, EditableDocContent, TSkin,
} from '../common';
import { TDocConfig } from '../common/docs/docBuilderGen/types';
import { DocBuilder } from '@epam/uui-docs';
import * as loveshipDocs from './_props/loveship/docs';
import * as loveship from '@epam/loveship';

export class SliderDoc extends BaseDocsBlock {
    title = 'Slider';

    override config: TDocConfig = {
        name: 'Slider',
        bySkin: {
            [TSkin.UUI3_loveship]: {
                type: '@epam/loveship:SliderProps',
                component: loveship.Slider,
                doc: (doc: DocBuilder<loveship.SliderProps>) => {
                    doc.withContexts(loveshipDocs.ResizableContext, loveshipDocs.FormContext);
                    doc.merge('min', { examples: [{ value: 0, isDefault: true }] });
                    doc.merge('max', { examples: [{ value: 100, isDefault: true }] });
                    doc.merge('step', { examples: [{ value: 1, isDefault: true }] });
                    doc.merge('splitAt', { examples: [{ value: 25, isDefault: true }] });
                    doc.merge('value', { examples: [{ value: 10, isDefault: true }] });
                    doc.merge('renderLabel', { examples: [{ name: 'Label', value: (value: number) => (value + '%') }] });
                },
            },
        },
    };

    renderContent() {
        return (
            <>
                <EditableDocContent fileName="slider-descriptions" />
                {this.renderSectionTitle('Examples')}
                <DocExample title="Basic" path="./_examples/slider/Basic.example.tsx" />
            </>
        );
    }
}
