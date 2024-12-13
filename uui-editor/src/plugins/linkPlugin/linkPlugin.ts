import { createPluginFactory, isElement } from '@udecode/plate-common';
import { type LinkPlugin, createLinkPlugin, withLink } from '@udecode/plate-link';
import type { WithToolbarButton } from '../../implementation/Toolbars';
import { LINK_TYPE, LINK_KEY } from './constants';
import { normalizeLinkElement } from '../../migrations';
import { LinkElement } from './LinkElement';
import { LinkToolbarButton } from './LinkToolbarButton';

type LinkPluginOptions = WithToolbarButton & LinkPlugin;

export const linkPlugin = createPluginFactory<LinkPluginOptions>(createLinkPlugin<LinkPluginOptions>({
    key: LINK_KEY,
    type: LINK_TYPE,
    component: LinkElement,
    options: {
        keepSelectedTextOnPaste: false,
        floatingBarButton: LinkToolbarButton,
    },
    // move to common function / plugin
    withOverrides: (editor, plugin) => {
        const { normalizeNode } = editor;

        // eslint-disable-next-line no-param-reassign
        editor = withLink(editor, plugin);

        editor.normalizeNode = (entry) => {
            const [node] = entry;

            if (isElement(node) && node.type === LINK_TYPE) {
                normalizeLinkElement(editor, entry);
            }

            normalizeNode(entry);
        };

        return editor;
    },
}));
