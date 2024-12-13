import React from 'react';
import { PlateElement, type PlateElementProps, type Value } from '@udecode/plate-common';
import type { TLinkElement } from '@udecode/plate-link';

export function LinkElement(props: PlateElementProps<Value, TLinkElement>) {
    return (
        <PlateElement
            { ...props }
            asChild
            style={ { display: 'inline' } }
        >
            <a
                href={ props.element.url }
                target="_blank"
                rel="noopener noreferrer"
            >
                { props.children }
            </a>
        </PlateElement>
    );
}
