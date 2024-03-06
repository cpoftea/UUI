import { renderHook, waitFor } from '@epam/uui-test-utils';
import { useAsyncTree } from '../useAsyncTree';
import { DataQueryFilter, DataSourceState } from '../../../../../../../../types';
import { LocationItem } from '../../../../../../__tests__/mocks';
import { demoData } from '@epam/uui-docs';
import { FAILED_RECORD, NOT_FOUND_RECORD, TreeStructure, newMap } from '../../../../newTree';
import { ItemsStorage } from '../../../../ItemsStorage';
import { RecordStatus } from '../../../../types';

describe('useAsyncTree', () => {
    let dataSourceState: DataSourceState<DataQueryFilter<LocationItem>, string>;
    const setDataSourceState = (newDsState: React.SetStateAction<DataSourceState<DataQueryFilter<LocationItem>, string>>) => {
        if (typeof newDsState === 'function') {
            dataSourceState = newDsState(dataSourceState);
            return;
        }
        dataSourceState = newDsState;
    };

    const api = jest.fn().mockImplementation(() => Promise.resolve(demoData.locations));
    const getId = ({ id }: LocationItem) => id;
    const getParentId = ({ parentId }: LocationItem) => parentId;

    beforeEach(() => {
        jest.clearAllMocks();
        dataSourceState = { topIndex: 0, visibleCount: 3 };
    });

    it('should path through minimal props', async () => {
        const hookResult = renderHook(
            (props) => useAsyncTree({
                type: 'async',
                api,
                getId,
                mode: 'client',
                dataSourceState,
                setDataSourceState,
                ...props,
            }, []),
            { initialProps: {} },
        );

        await waitFor(() => {
            const tree = hookResult.result.current;
            expect(tree.isFetching).toBeTruthy();
        });

        let tree = hookResult.result.current;
        expect(tree.isLoading).toBeTruthy();

        await waitFor(() => {
            tree = hookResult.result.current;
            expect(tree.isFetching).toBeFalsy();
        });

        expect(tree).toEqual(expect.objectContaining({
            dataSourceState,
            setDataSourceState,
            totalCount: 42,
            getId,
            getParentId: undefined,
            rowOptions: undefined,
            getRowOptions: undefined,
            isFoldedByDefault: undefined,
            cascadeSelection: undefined,
            selectAll: undefined,
            showOnlySelected: undefined,

            isFetching: false,
            isLoading: false,
        }));

        expect(tree.tree instanceof TreeStructure).toBeTruthy();
        expect(tree.selectionTree instanceof TreeStructure).toBeTruthy();
        expect(typeof tree.getItemStatus).toBe('function');
        expect(typeof tree.reload).toBe('function');
        expect(typeof tree.getChildCount).toBe('function');
    });

    it('should path through maximum props', async () => {
        const rowOptions = { checkbox: { isVisible: true } };
        const getRowOptions = () => ({ isReadonly: true });
        const cascadeSelection = 'explicit';
        const isFoldedByDefault = () => true;
        const selectAll = true;
        const showOnlySelected = true;

        const hookResult = renderHook(
            (props) => useAsyncTree({
                type: 'async',
                api,
                getId,
                getParentId,
                rowOptions,
                getRowOptions,
                cascadeSelection,
                isFoldedByDefault,
                showOnlySelected,
                selectAll,
                mode: 'client',
                dataSourceState,
                setDataSourceState,
                ...props,
            }, []),
            { initialProps: {} },
        );

        const tree = hookResult.result.current;

        expect(tree).toEqual(expect.objectContaining({
            dataSourceState,
            setDataSourceState,
            totalCount: 0,
            getId,
            getParentId,
            rowOptions,
            getRowOptions,
            isFoldedByDefault,
            cascadeSelection,
            showOnlySelected,
            selectAll,

            isFetching: false,
            isLoading: false,
        }));

        expect(tree.tree instanceof TreeStructure).toBeTruthy();
        expect(tree.selectionTree instanceof TreeStructure).toBeTruthy();
        expect(typeof tree.getItemStatus).toBe('function');
        expect(typeof tree.reload).toBe('function');
        expect(typeof tree.getChildCount).toBe('function');
    });

    it('should defined itemsMap/setItems inside hook if not passed to props', async () => {
        const hookResult = renderHook(
            (props) => useAsyncTree({
                type: 'async',
                api,
                getId,
                mode: 'client',
                dataSourceState,
                setDataSourceState,
                ...props,
            }, []),
            { initialProps: {} },
        );

        await waitFor(() => {
            const tree = hookResult.result.current;

            expect(tree.isFetching).toBeFalsy();
        });

        const tree = hookResult.result.current;

        const itemFromVisibleTree = tree.tree.getById('BJ');
        expect(itemFromVisibleTree).toEqual(expect.objectContaining({ id: 'BJ', parentId: 'c-AF' }));

        const itemFromSelectionTree = tree.selectionTree.getById('BJ');
        expect(itemFromSelectionTree).toEqual(expect.objectContaining({ id: 'BJ', parentId: 'c-AF' }));

        const unknownItemFromVisibleTree = tree.tree.getById('GW');
        expect(unknownItemFromVisibleTree).toBe(NOT_FOUND_RECORD);

        const unknownItemFromSelectionTree = tree.tree.getById('GW');
        expect(unknownItemFromSelectionTree).toBe(NOT_FOUND_RECORD);
    });

    it('should use outer itemsMap/setItems inside hook if passed to props', async () => {
        const newItem: LocationItem = {
            id: 'GW',
            parentId: 'c-AF',
            childCount: 0,
            type: 'country',
            __typename: 'Location',
            name: 'Guinea-Bissau',
        };

        const itemsStorage = new ItemsStorage({
            items: [newItem],
            params: { getId },
        });

        const hookResult = renderHook(
            (props) => useAsyncTree({
                type: 'async',
                api,
                getId,
                mode: 'client',
                dataSourceState,
                setDataSourceState,
                itemsMap: itemsStorage.getItemsMap(),
                setItems: itemsStorage.setItems,
                ...props,
            }, []),
            { initialProps: {} },
        );

        await waitFor(() => {
            const tree = hookResult.result.current;

            expect(tree.isFetching).toBeFalsy();
        });

        const tree = hookResult.result.current;

        const itemFromVisibleTree = tree.tree.getById('GW');
        const itemFromSelectionTree = tree.selectionTree.getById('GW');
        expect(itemFromVisibleTree).toEqual(newItem);
        expect(itemFromSelectionTree).toEqual(newItem);
    });

    it('should use inner itemsStatusMap if not passed to props', async () => {
        dataSourceState.checked = ['GW'];
        const hookResult = renderHook(
            (props) => useAsyncTree({
                type: 'async',
                api,
                getId,
                mode: 'client',
                dataSourceState,
                setDataSourceState,
                ...props,
            }, []),
            { initialProps: {} },
        );

        await waitFor(() => {
            const tree = hookResult.result.current;

            expect(tree.isFetching).toBeFalsy();
        });

        const tree = hookResult.result.current;

        const itemFromVisibleTree = tree.tree.getById('GW');
        const itemFromSelectionTree = tree.selectionTree.getById('GW');
        expect(itemFromVisibleTree).toEqual(NOT_FOUND_RECORD);
        expect(itemFromSelectionTree).toEqual(NOT_FOUND_RECORD);

        expect(typeof tree.getItemStatus).toBe('function');
        expect(tree.getItemStatus!('GW')).toBe(NOT_FOUND_RECORD);
    });

    it('should use outer itemsStatusMap if passed to props', async () => {
        const itemsStatusMap = newMap<string, RecordStatus>({ getId });
        itemsStatusMap.set('GW', FAILED_RECORD);

        const hookResult = renderHook(
            (props) => useAsyncTree({
                type: 'async',
                api,
                getId,
                mode: 'client',
                dataSourceState,
                setDataSourceState,
                itemsStatusMap,
                ...props,
            }, []),
            { initialProps: {} },
        );

        await waitFor(() => {
            const tree = hookResult.result.current;

            expect(tree.isFetching).toBeFalsy();
        });

        const tree = hookResult.result.current;

        const itemFromVisibleTree = tree.tree.getById('GW');
        const itemFromSelectionTree = tree.selectionTree.getById('GW');
        expect(itemFromVisibleTree).toEqual(NOT_FOUND_RECORD);
        expect(itemFromSelectionTree).toEqual(NOT_FOUND_RECORD);

        expect(typeof tree.getItemStatus).toBe('function');
        expect(tree.getItemStatus!('GW')).toBe(FAILED_RECORD);
    });
});
