import type { HeadingsPlugin } from '@udecode/plate-heading';
import { WithToolbarButton } from '../../implementation/Toolbars';
import type { HeadersConfig } from './constants';

export type HeaderPluginOptions = WithToolbarButton & HeadingsPlugin & HeadersConfig;
