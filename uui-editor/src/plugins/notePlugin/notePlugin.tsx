import { createPluginFactory, type PlatePlugin } from '@udecode/plate-common';
import { NotePluginBlock } from './NotePluginBlock';
import { defaultNotesConfig, NODE_PLUGIN_KEY } from './constants';
import type { NoteConfigItem, NoteNodeProps, NotePluginOptions } from './types';
import { NoteButton } from './NoteBar';

const createPlugin = (config: NoteConfigItem) => {
    return {
        key: config.type,
        type: config.type,
        isElement: true,
        component: NotePluginBlock,
        props: () => ({
            nodeProps: {
                borderColor: config.borderColor,
                backgroundColor: config.backgroundColor,
                toolbarIcon: config.toolbarIcon,
            } as NoteNodeProps,
        }),
    } satisfies PlatePlugin;
};

export const notePlugin = createPluginFactory<NotePluginOptions>({
    key: NODE_PLUGIN_KEY,
    component: NotePluginBlock,
    options: {
        bottomBarButton: NoteButton,
        notes: defaultNotesConfig,
    },
    then: (_editor, plugin) => ({
        plugins: plugin.options.notes.map((config) => createPlugin(config)),
    }),
});
