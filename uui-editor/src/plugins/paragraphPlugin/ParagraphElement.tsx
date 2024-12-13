import React from 'react';
import { PlateElement, type PlateElementProps } from '@udecode/plate-common';

export function ParagraphElement({ children, ...props }: PlateElementProps) {
    return (
        <PlateElement { ...props } asChild>
            <p>
                {children}
            </p>
        </PlateElement>
    );
}
