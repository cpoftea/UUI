import * as React from 'react';
import { TextInput } from '@epam/uui';
import { CX } from '@epam/uui-core';
import { useInputValue } from './hooks';

export function CssClassEditor(props: { value?: CX, onValueChange: (newValue?: CX) => void }) {
    const inputProps = useInputValue<CX, string>({
        value: props.value,
        onValueChange: props.onValueChange,
        inputToValue: (i) => i,
        valueToInput: (v) => (v ? String(v).trim() : ''),
        validateInput: (i) => {
            return i.split(' ').every((s) => {
                if (s.trim()) {
                    const matches = s.trim().match(new RegExp(/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/g));
                    return matches?.length > 0;
                }
                return true;
            });
        },
    });

    return (
        <TextInput
            placeholder="Please provide a valid CSS class"
            onValueChange={ inputProps.onInputChange }
            value={ inputProps.input }
            size="24"
            isInvalid={ !inputProps.isValid }
        />
    );
}
