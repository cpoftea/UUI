import * as React from 'react';
import {
    BaseDocsBlock, DocExample, EditableDocContent, TSkin,
} from '../common';
import { TDocConfig } from '../common/docs/docBuilderGen/types';
import { DocBuilder } from '@epam/uui-docs';
import * as loveshipDocs from './_props/loveship/docs';
import * as loveship from '@epam/loveship';

export class SliderRatingDoc extends BaseDocsBlock {
    title = 'SliderRating';

    override config: TDocConfig = {
        name: 'SliderRating',
        bySkin: {
            [TSkin.UUI3_loveship]: {
                type: '@epam/loveship:SliderRatingProps',
                component: loveship.SliderRating,
                doc: (doc: DocBuilder<loveship.SliderRatingProps<any>>) => {
                    doc.withContexts(loveshipDocs.FormContext);
                    const renderFn = (v: any) => (
                        <loveship.RichTextView size="14">
                            <p>
                                {`Selected value is ${v}.`}
                                <br />
                                {'You can use '}
                                <b>markup</b>
                                { ' via RichTextView here.'}
                            </p>
                        </loveship.RichTextView>
                    );
                    doc.merge('renderTooltip', { examples: [{ name: 'Custom Tooltip', value: renderFn }] });
                    doc.merge('value', { examples: [0, 1, 2, 3, 4, 5] });
                },
            },
        },
    };

    renderContent() {
        return (
            <>
                <EditableDocContent fileName="sliderRating-descriptions" />
                {this.renderSectionTitle('Examples')}
                <DocExample title="Basic" path="./_examples/sliderRating/Basic.example.tsx" />
            </>
        );
    }
}
