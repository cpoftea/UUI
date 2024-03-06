import { act, renderHook, waitFor } from '@epam/uui-test-utils';
import { DataQueryFilter, DataRowProps, DataSourceState, IDataSourceView } from '../../../../types';
import { ArrayDataSource, ArrayDataSourceProps } from '../../ArrayDataSource';

interface TestParent {
    type: 'parent';
    id: number;
    childrenCount?: number;
    parentId?: number;
}

interface TestChild {
    type: 'child';
    id: number;
    parentId?: number;
}

type TestItem = TestParent | TestChild;
type TestItemId = [TestItem['type'], number];

describe('ArrayListView - can work with id like [string, number]', () => {
    const testData: TestItem[] = [
        { type: 'parent', id: 1, childrenCount: 1 }, { type: 'child', id: 1, parentId: 1 }, { type: 'child', id: 2, parentId: 1 },
    ];

    let currentValue: DataSourceState<DataQueryFilter<TestItem>, TestItemId>;
    const onValueChanged = (newValue: React.SetStateAction<DataSourceState<DataQueryFilter<TestItem>, TestItemId>>) => {
        if (typeof newValue === 'function') {
            currentValue = newValue(currentValue);
            return;
        }
        currentValue = newValue;
    };

    const treeDataSource = new ArrayDataSource<TestItem, TestItemId, DataQueryFilter<TestItem>>({
        items: testData,

        getId: (i) => [i.type, i.id],
        getParentId: (i) => (i.parentId ? ['parent', i.parentId] : undefined),
        cascadeSelection: true,
        complexIds: true,
    });

    beforeEach(() => {
        currentValue = { topIndex: 0, visibleCount: 3 };
    });

    function expectViewToLookLike(
        view: IDataSourceView<TestItem, TestItemId, DataQueryFilter<TestItem>>,
        rows: Partial<DataRowProps<TestItem, TestItemId>>[],
    ) {
        const viewRows = view.getRows();
        expect(viewRows).toEqual(rows.map((r) => expect.objectContaining(r)));
    }

    it('can load tree, unfold nodes, and scroll down', async () => {
        const hookResult = renderHook(
            ({ value, onValueChange, props }) => treeDataSource.useView(value, onValueChange, props),
            { initialProps: { value: currentValue, onValueChange: onValueChanged, props: {} } },
        );

        await waitFor(() => {
            const view = hookResult.result.current;
            expectViewToLookLike(view, [{ id: ['parent', 1], isFoldable: true, isFolded: true }]);
        });

        const view = hookResult.result.current;
        expect(view.getListProps().rowsCount).toEqual(1);
    });

    it('can unfold nodes', async () => {
        const hookResult = renderHook(
            ({ value, onValueChange, props }) => treeDataSource.useView(value, onValueChange, props),
            { initialProps: { value: currentValue, onValueChange: onValueChanged, props: {} } },
        );

        let view = hookResult.result.current;
        await waitFor(() => {
            view = hookResult.result.current;
            expectViewToLookLike(view, [{ id: ['parent', 1], isFoldable: true, isFolded: true }]);
        });
        expect(view.getListProps().rowsCount).toEqual(1);

        // Unfold a row
        const rows = view.getRows();
        await act(() => {
            rows[0].onFold?.(rows[0]);
        });

        hookResult.rerender({ value: { ...currentValue, visibleCount: 6 }, onValueChange: onValueChanged, props: {} });
        view = hookResult.result.current;

        await waitFor(() => {
            view = hookResult.result.current;
            expectViewToLookLike(view, [
                { id: ['parent', 1] }, { id: ['child', 1] }, { id: ['child', 2] },
            ]);
        });

        expect(view.getListProps().rowsCount).toEqual(3);
    });

    it('Checkboxes works', async () => {
        currentValue = { ...currentValue, visibleCount: 3, checked: [['child', 1]] as TestItemId[] };
        const viewProps: Partial<ArrayDataSourceProps<TestItem, TestItemId, DataQueryFilter<TestItem>>> = {
            cascadeSelection: true,
            getRowOptions: () => ({ checkbox: { isVisible: true } }),
            isFoldedByDefault: () => false,
        };

        const hookResult = renderHook(
            ({ value, onValueChange, props }) => treeDataSource.useView(value, onValueChange, props),
            { initialProps: {
                value: currentValue,
                onValueChange: onValueChanged,
                props: viewProps,
            } },
        );
        await waitFor(() => {
            const view = hookResult.result.current;
            expectViewToLookLike(
                view,
                [
                    { id: ['parent', 1], isChildrenChecked: true, isChecked: false }, { id: ['child', 1], isChecked: true }, { id: ['child', 2], isChecked: false },
                ],
            );
        });

        let view = hookResult.result.current;
        expect(view.getListProps().rowsCount).toEqual(3);

        let row = view.getRows()[2]; // -> all children checked = parent checked
        await act(() => {
            row.onCheck?.(row);
        });

        hookResult.rerender({ value: currentValue, onValueChange: onValueChanged, props: viewProps });

        await waitFor(() => {
            view = hookResult.result.current;
            expectViewToLookLike(
                view,
                [
                    { id: ['parent', 1], isChildrenChecked: true, isChecked: true }, { id: ['child', 1], isChecked: true }, { id: ['child', 2], isChecked: true },
                ],
            );
        });
        expect(view.getListProps().rowsCount).toEqual(3);

        row = view.getRows()[0];

        await act(() => {
            row.onCheck?.(row);
        });

        hookResult.rerender({ value: currentValue, onValueChange: onValueChanged, props: viewProps });

        await waitFor(() => {
            view = hookResult.result.current;
            expectViewToLookLike(
                view,
                [
                    { id: ['parent', 1], isChildrenChecked: false, isChecked: false }, { id: ['child', 1], isChecked: false }, { id: ['child', 2], isChecked: false },
                ],
            );
        });
        expect(view.getListProps().rowsCount).toEqual(3);
    });
});
