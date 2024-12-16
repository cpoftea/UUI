import React from 'react';
import { PlateElement, createPrimitiveElement, type PlateElementProps } from '@udecode/plate-common';

interface Props extends PlateElementProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function HeaderElement({ children, variant, ...props }: Props) {
    const Component = createPrimitiveElement(variant);

    return (
        <PlateElement { ...props } asChild>
            <Component>
                {children}
            </Component>
        </PlateElement>
    );
}
