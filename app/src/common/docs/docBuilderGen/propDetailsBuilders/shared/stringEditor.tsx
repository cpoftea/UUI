import React from 'react';
import { TextInput } from '@epam/uui';

export function StringEditor(props: { value: any, onValueChange: (newValue: any) => void }) {
    return <TextInput { ...props } size="24" placeholder="Please provide some text" />;
}
