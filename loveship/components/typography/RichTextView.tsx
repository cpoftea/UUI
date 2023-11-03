import style from './RichTextView.module.scss';
import * as uuiComponents from '@epam/uui-components';
import { withMods } from '@epam/uui-core';

export interface RichTextViewMods {
    /**
     * @default '14'
     */
    size?: '12' | '14' | '16';
}

export interface RichTextViewProps extends uuiComponents.RichTextViewProps, RichTextViewMods {}

export const RichTextView = withMods<uuiComponents.RichTextViewProps, RichTextViewMods>(
    uuiComponents.RichTextView,
    (mods: RichTextViewMods) => [style.typographyLoveship, style['typography-' + (mods.size || '14')]],
);
