import React from 'react';
import { NumericInput } from '@epam/uui';

export function NumEditor(props: { value: any, onValueChange: (newValue: any) => void }) {
    return <NumericInput { ...props } size="24" />;
}
