import React from 'react';
import { useUuiContext } from '@epam/uui-core';

import { ToolbarButton } from '../../implementation/ToolbarButton';

import { type PlateEditor, someNode } from '@udecode/plate-common';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { useIsPluginActive } from '../../helpers';
import { ReactComponent as LinkIcon } from '../../icons/link.svg';
import { AddLinkModal } from './AddLinkModal';
import { LINK_TYPE } from './constants';

interface ToolbarLinkButtonProps {
    editor: PlateEditor;
}

export function LinkToolbarButton({ editor }: ToolbarLinkButtonProps) {
    const context = useUuiContext();

    if (!useIsPluginActive(ELEMENT_LINK)) return null;

    const isLink = !!editor?.selection && someNode(editor, { match: { type: LINK_TYPE } });

    return (
        <ToolbarButton
            onClick={ async (event) => {
                if (!editor) return;

                event.preventDefault();
                context.uuiModals.show<string>((modalProps): any => (
                    <AddLinkModal
                        editor={ editor }
                        { ...modalProps }
                    />
                )).catch(() => null);
            } }
            icon={ LinkIcon }
            isActive={ !!editor?.selection && isLink }
        />
    );
}
