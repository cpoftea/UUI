import { createSkinComponent } from '@epam/uui-core';
import * as uui from '@epam/uui';

export interface CountIndicatorMods {
    /** Property is required */
    color: 'gray' | 'white' | 'blue' | 'green' | 'amber' | 'red';
}

export type CountIndicatorProps = uui.CountIndicatorCoreProps & CountIndicatorMods;

export const CountIndicator = createSkinComponent<uui.CountIndicatorProps, CountIndicatorProps>(uui.CountIndicator);
