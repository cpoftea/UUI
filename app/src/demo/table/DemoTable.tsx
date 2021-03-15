import React, { useCallback, useState } from "react";
import css from './DemoTable.scss';
import { DataSourceState, useLens, IEditable, ArrayDataSource, LazyDataSource, DataRowProps, LazyDataSourceApi, DataRowOptions } from '@epam/uui';
import { PersonGroup } from '@epam/uui-docs';
import { FlexRow, FlexCell, SearchInput, Text, PickerInput, DataTable, DataTableRow, IconButton } from '@epam/promo';
import filterIcon from "@epam/assets/icons/common/content-filter_list-24.svg";

import { svc } from '../../services';
import { filters, presets } from "./data";
import { PersonTableFilter, PersonTableRecord, PersonTableRecordId } from './types';
import { getColumns } from './columns';
import { Panel } from "./Panel";
import { Presets } from "./Presets";

export const api: LazyDataSourceApi<PersonTableRecord, PersonTableRecordId, PersonTableFilter> = (request, ctx) => {
    let { ids: clientIds, filter: { groupBy, ...filter }, ...rq } = request;

    let ids = clientIds && clientIds.map(clientId => clientId[1]) as any[];

    if (groupBy && !ctx.parent) {
        return svc.api.demo.personGroups({
            ...rq,
            filter: { groupBy },
            search: null,
            itemsRequest: { filter, search: rq.search },
            ids,
        } as any);
    } else {
        const parentFilter = ctx.parent && { [groupBy + 'Id']: ctx.parent.id };
        return svc.api.demo.persons({ ...rq, filter: { ...filter, ...parentFilter }, ids });
    }
};

interface PersonsTableState extends DataSourceState {
    isFolded?: boolean;
}

export const DemoTable: React.FC = () => {
    const [value, onValueChange] = React.useState<PersonsTableState>(() => ({
        topIndex: 0,
        visibleCount: 100,
        sorting: [{ field: 'name' }],
        isFolded: true,
    }));
    const [isPanelOpened, setIsPanelOpened] = useState(false);
    const openPanel = useCallback(() => setIsPanelOpened(true), []);
    const closePanel = useCallback(() => setIsPanelOpened(false), []);

    const editable: IEditable<DataSourceState> = { value, onValueChange };

    let dataSource = React.useMemo(() => new LazyDataSource({
        api,
        getId: (i) => [i.__typename, i.id] as PersonTableRecordId,
        getChildCount: (item: PersonTableRecord) =>
            item.__typename === 'PersonGroup' ? item.count : null,
    }), []);

    const rowOptions: DataRowOptions<PersonTableRecord, PersonTableRecordId> = {
        checkbox: { isVisible: true },
    };

    const tableLens = useLens(useLens(editable, b => b), b => b.onChange((o, n) => ({ ...n, topIndex: 0 })));

    const columnsSet = React.useMemo(() => getColumns(filters), []);

    const renderRow = (props: DataRowProps<PersonTableRecord, PersonTableRecordId>) => {
        let columns = (props.isLoading || props.value?.__typename === 'Person') ? props.columns : columnsSet.groupColumns;
        return <DataTableRow key={ props.rowKey } { ...props } size='36' columns={ columns }/>;
    };

    const personsDataView = dataSource.useView(value, onValueChange, {
        rowOptions,
        isFoldedByDefault: () => value.isFolded,
        cascadeSelection: true,
    });

    return (
        <FlexRow alignItems="top">
            { isPanelOpened && <Panel filters={ filters } close={ closePanel }/> }

            <div className={ css.container }>
                <FlexRow>
                    { !isPanelOpened && (
                        <div className={ css.icon_container }>
                            <IconButton icon={ filterIcon } color="gray50" cx={ [css.icon] } onClick={ openPanel }/>
                        </div>
                    ) }
                    <Presets presets={ presets }/>
                </FlexRow>

                <DataTable
                    headerTextCase='upper'
                    getRows={ () => personsDataView.getVisibleRows() }
                    columns={ columnsSet.personColumns }
                    renderRow={ renderRow }
                    selectAll={ { value: false, isDisabled: true, onValueChange: null } }
                    showColumnsConfig
                    { ...tableLens }
                    { ...personsDataView.getListProps() }
                />
            </div>
        </FlexRow>
    );
};

//        <FlexRow spacing='12' padding='24' vPadding='12' borderBottom={ true } >
//  <FlexCell width={ 200 }>
//                 <SearchInput { ...useLens(editable, b => b.prop('search')) } size='30' />
//             </FlexCell>
//             <FlexCell width='auto'>
//                 <Text size='30'>Group By:</Text>
//             </FlexCell>
//             <FlexCell width={ 130 }>
//                 <PickerInput { ...useLens(editable, b => b.prop('filter').prop('groupBy')) } dataSource={ groupingDataSource } selectionMode='single' valueType='id' size='30' />
//             </FlexCell>
//         </FlexRow>