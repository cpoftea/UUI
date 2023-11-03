import React from 'react';
import { TextArea } from '@epam/uui';
import { useInputValue } from './hooks';

export function JsonEditor(props: { value: any, onValueChange: (newValue: any) => void }) {
    const inputProps = useInputValue<object, string>({
        value: props.value,
        onValueChange: props.onValueChange,
        inputToValue: (i) => i ? JSON.parse(i) : undefined,
        valueToInput: (v) => (v ? JSON.stringify(v, undefined, 1) : ''),
        validateInput: (i) => {
            let isValid;
            try {
                i && JSON.parse(i);
                isValid = true;
            } catch {
                isValid = false;
            }
            return isValid;
        },
    });

    return (
        <TextArea
            placeholder="Please provide a valid JSON"
            onValueChange={ inputProps.onInputChange }
            value={ inputProps.input }
            size="24"
            isInvalid={ !inputProps.isValid }
        />
    );
}
