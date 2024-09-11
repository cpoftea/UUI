import * as React from 'react';
import isEqual from 'react-fast-compare';

import {
    DataSourceListProps, DataSourceState, IEditable, IHasRawProps, isMobile,
    PickerEmptyBodyReason,
} from '@epam/uui-core';

export interface PickerBodyBaseProps extends DataSourceListProps, IEditable<DataSourceState>, IHasRawProps<React.HTMLAttributes<HTMLDivElement>> {
    onKeyDown?(e: React.KeyboardEvent<HTMLElement>): void;
    renderNotFound?: () => React.ReactNode;

    /**
     * Overrides the rendering of PickerBody content when it is empty for various reasons.
     * If provided, the override should support messages for both 'not-found-records' and 'less-than-min-chars-to-search' reasons.
     * If not provided, the `renderNotFound` method is used for the 'not-found-records' reason.
     * @param reason - Specifies the reason why the PickerInput body is empty:
     *   - 'not-found-records': No data was found.
     *   - 'less-than-min-chars-to-search': The search contains fewer characters than required to start searching for data.
     */    
    renderEmpty?: (reason: PickerEmptyBodyReason) => React.ReactNode;
    rows: React.ReactNode[];
    scheduleUpdate?: () => void;
    search: IEditable<string>;
    showSearch?: boolean | 'auto';
    fixedBodyPosition?: boolean;
    searchDebounceDelay?: number;
    /**
     * Indicates whether the search does not contain enough characters to load data.
     */
    notEnoughTokensToLoadData?: boolean;
}

export abstract class PickerBodyBase<TProps extends PickerBodyBaseProps> extends React.Component<TProps> {
    needFocusSearch = this.showSearch();
    searchRef = React.createRef<HTMLInputElement>();

    componentDidUpdate(prevProps: PickerBodyBaseProps) {
        // Focusing of searchInput is done via ref.focus(), but not via autoFocus on SearchInput,
        // because otherwise, after body close, focus on PickerToggler is lost and on  press Tab, it is moved to document.body.
        if (this.needFocusSearch && !isMobile()) {
            this.searchRef.current?.focus({ preventScroll: true });
            this.needFocusSearch = false;
        }

        if (prevProps.rows.length !== this.props.rows.length || (!isEqual(prevProps.value.checked, this.props.value.checked) && !this.props.fixedBodyPosition)) {
            this.props.scheduleUpdate?.();
        }
    }

    showSearch() {
        return this.props.showSearch === 'auto' ? this.props.totalCount > 10 : Boolean(this.props.showSearch);
    }

    searchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        this.props.onKeyDown?.(e);
        if (e.shiftKey && e.key === 'Tab') e.preventDefault();
    };
}
