import * as types from '../../types';
import { withMods } from '@epam/uui-core';
import * as uui from '@epam/uui';

export interface RowMods extends uui.RowMods, types.RowSizeMod {
    /**
     * @default 'none'
     */
    background?: 'white' | 'gray5' | 'none';
}
export type FlexRowProps = uui.FlexRowProps & RowMods;

export const FlexRow = withMods<uui.FlexRowProps, RowMods>(uui.FlexRow, (props) => {
    return [`flex-row-background-${props.background || 'none'}`];
});
