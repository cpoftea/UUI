import { createPluginFactory } from '@udecode/plate-common';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { PARAGRAPH_TYPE, PARAGRAPH_KEY } from './constants';

export const paragraphPlugin = createPluginFactory(
    createParagraphPlugin({
        key: PARAGRAPH_KEY,
        type: PARAGRAPH_TYPE,
    }),
);
