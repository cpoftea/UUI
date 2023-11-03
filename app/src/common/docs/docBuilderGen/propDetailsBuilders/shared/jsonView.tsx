import React from 'react';
import { Text } from '@epam/uui';

export function JsonView(props: { value: any }) {
    const { value } = props;
    if (value != null) {
        return (<Text>{ JSON.stringify(value) }</Text>);
    }
    return null;
}
