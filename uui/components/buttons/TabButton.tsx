import React from 'react';
import * as uuiComponents from '@epam/uui-components';
import { withMods } from '@epam/uui-core';
import { getIconClass } from './helper';
import { CountIndicator } from '../widgets/CountIndicator';
import { systemIcons } from '../../icons/icons';
import css from './TabButton.module.scss';

interface TabButtonMods {
    /**
     * Defines component size.
     * @default '48'
     */
    size?: '36' | '48' | '60';
    /**
     * Defines is the component showing Notify
     */
    withNotify?: boolean;
}

/** Represents the properties of a TabButton component. */
export type TabButtonProps = TabButtonMods & uuiComponents.ButtonProps;

function applyTabButtonMods(mods: TabButtonProps) {
    return [
        css.root,
        'uui-tab-button',
        css['size-' + (mods.size || '48')],
        mods.withNotify && css.withNotify,
        ...getIconClass(mods),
    ];
}

export const TabButton = withMods<uuiComponents.ButtonProps, TabButtonMods>(
    uuiComponents.Button,
    applyTabButtonMods,
    (props) => ({
        dropdownIcon: systemIcons['36'].foldingArrow,
        clearIcon: systemIcons['36'].clear,
        ...props,
        rawProps: { role: 'tab', ...(props.rawProps as any) },
        countIndicator: (countIndicatorProps) => (
            <CountIndicator
                { ...countIndicatorProps }
                color={ props.isLinkActive ? 'info' : 'neutral' }
                size="18"
            />
        ),
    }),
);
