import * as React from 'react';
import * as uui from '@epam/uui';
import { createSkinComponent } from '@epam/uui-core';
import { ReactComponent as SuccessIcon } from '../../icons/notification-check_circle-fill-24.svg';
import { ReactComponent as WarningIcon } from '../../icons/notification-warning-fill-24.svg';
import { ReactComponent as ErrorIcon } from '../../icons/notification-error-fill-24.svg';
import { ReactComponent as HintIcon } from '../../icons/notification-help-fill-24.svg';
import { EpamPrimaryColor } from '../types';

export interface AlertMods {
    /** @default 'blue' */
    color?: EpamPrimaryColor;
}

export type AlertProps = uui.AlertCoreProps & AlertMods;

export const Alert = createSkinComponent<uui.AlertProps, AlertProps>(
    uui.Alert,
    (props) => ({
        ...props,
        color: props.color ?? 'blue',
    }),
);

export const WarningAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ WarningIcon } color="amber" ref={ ref } { ...props } />);

export const SuccessAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ SuccessIcon } color="green" ref={ ref } { ...props } />);

export const HintAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ HintIcon } color="blue" ref={ ref } { ...props } />);

export const ErrorAlert = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'color'>>((props, ref) => <Alert icon={ ErrorIcon } color="red" ref={ ref } { ...props } />);
