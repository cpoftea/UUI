import { PropDoc, IPropSamplesCreationContext, PropExample } from '@epam/uui-docs';
import { ArrayDataSource } from '@epam/uui-core';
import { Button, FlexCell, IconButton, PickerInput, RadioInput, TextInput } from '@epam/uui';
import { MultiSwitch, Tooltip } from '@epam/promo';
import * as React from 'react';
import { ReactComponent as InfoIcon } from '@epam/assets/icons/common/notification-help-fill-18.svg';

interface IPropEditor {
    prop: PropDoc<any, any>;
    onGetPropExampleId: (name: string) => string;
    onGetPropValue: (propName: string) => any;
    onPropExampleChange: (props: { propName: string, exampleId: string, propValue?: string, remountOnChange: boolean }) => void;
    propSamplesCreationContext: IPropSamplesCreationContext;
}
export function PropEditor(props: IPropEditor): React.ReactElement {
    const { prop, propSamplesCreationContext, onPropExampleChange, onGetPropExampleId, onGetPropValue } = props;
    const { remountOnChange, name, examples, type, renderEditor } = prop;

    const _onPropExampleChange = (exampleId: string, propValue?: string) => {
        let exampleIdEffective = exampleId;
        if (!propExamplesList.find(({ id }) => id === exampleIdEffective)) {
            const found = propExamplesList.find((e) => {
                return e.value === exampleIdEffective;
            });
            if (found) {
                exampleIdEffective = found.id;
            } else {
                exampleIdEffective = undefined;
            }
        }
        onPropExampleChange({ propName: prop.name, exampleId: exampleIdEffective, propValue, remountOnChange });
    };

    const propExamplesList = (() => {
        if (typeof examples === 'function') {
            return examples(propSamplesCreationContext);
        } else if (examples.length) {
            return examples;
        }
        return [];
    })();

    const exampleId = onGetPropExampleId(name);

    const exampleProps: TExampleProps = {
        prop,
        onGetPropValue,
        exampleId,
        examples: propExamplesList,
        onExampleChange: _onPropExampleChange,
    };

    if (renderEditor) {
        return <ExamplesCustom { ...exampleProps } />;
    } else if (propExamplesList.length > 1) {
        if (type === 'string') {
            return <ExamplesMultiString { ...exampleProps } />;
        }
        return <ExamplesMultiUnknown { ...exampleProps } />;
    } else if (propExamplesList.length === 1) {
        return <ExamplesSingleUnknown { ...exampleProps } />;
    }

    return null;
}

type TExampleProps = {
    prop: PropDoc<any, any>;
    exampleId?: string;
    examples: PropExample<any>[];
    onGetPropValue: (propName: string) => any;
    onExampleChange: (exampleId: string, propValue?: string) => void
};

function ExamplesCustom(props: TExampleProps) {
    const { prop, examples, onExampleChange, onGetPropValue } = props;
    const { renderEditor } = prop;

    const node = renderEditor(
        {
            value: onGetPropValue(prop.name),
            onValueChange: (newValue) => onExampleChange(undefined, newValue),
        },
        examples && examples.map((ex) => ex.value),
    );

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {node}
            <PropDescription description={ prop.description } />
        </>
    );
}

function ExamplesSingleUnknown(props: TExampleProps) {
    const { prop, exampleId, examples, onExampleChange } = props;
    const { description } = prop;
    const { id, name, value } = examples[0];
    return (
        <React.Fragment>
            <RadioInput
                value={ !!exampleId }
                onValueChange={ () => onExampleChange(id, value) }
                size="18"
                label={ name }
            />
            <PropDescription description={ description } />
        </React.Fragment>
    );
}

function ExamplesMultiUnknown(props: TExampleProps) {
    const { prop, exampleId, examples, onExampleChange, onGetPropValue } = props;
    const { description } = prop;
    const items = examples.map((example) => ({
        caption: example.name,
        id: example.id,
    }));
    const getExampleValue = (id: any) => examples.find((li) => li.id === id).value;
    let valueNode: React.ReactNode = null;
    if (!exampleId) {
        const value = onGetPropValue(prop.name);
        if (value != null && value !== '') {
            const str = stringifyUnknown(value);
            valueNode = (
                <Tooltip content={ <pre>{str}</pre> }>
                    <Button
                        mode="solid"
                        size="24"
                        caption={ str }
                        rawProps={ { style: { wordBreak: 'break-word', minWidth: '70px' } } }
                    />
                </Tooltip>
            );
        }
    }

    return (
        <React.Fragment>
            { valueNode }
            <MultiSwitch
                items={ items }
                onValueChange={ (id) => {
                    const existingExample = examples.find((e) => e.id === id);
                    if (existingExample) {
                        onExampleChange(id, getExampleValue(id));
                    }
                } }
                value={ exampleId }
                size="24"
                rawProps={ { style: { flexWrap: 'wrap' } } }
            />
            <PropDescription description={ description } />
        </React.Fragment>
    );
}

function ExamplesMultiString(props: TExampleProps) {
    const { prop, exampleId, examples, onExampleChange, onGetPropValue } = props;
    const { name, description } = prop;
    const getPropsDataSource = (exampleItems: { id: string, value: string }[]) => new ArrayDataSource({ items: exampleItems, getId: (i) => i.id });
    const propValue = onGetPropValue(name);
    const getExampleIdByValue = (value: string) => examples.find((li) => li.value === value)?.id;
    const firstPh = typeof exampleId !== 'undefined' ? examples[Number(exampleId)]?.value : 'Please select value';
    return (
        <>
            <FlexCell minWidth={ 150 }>
                <PickerInput
                    size="24"
                    dataSource={ getPropsDataSource(examples) }
                    selectionMode="single"
                    value={ exampleId }
                    onValueChange={ (id) => onExampleChange(id, examples[Number(id)]?.value) }
                    valueType="id"
                    entityName={ name }
                    placeholder={ firstPh }
                />
            </FlexCell>
            <FlexCell minWidth={ 150 }>
                <TextInput
                    onCancel={ () => onExampleChange(undefined, '') }
                    size="24"
                    onValueChange={ (inputValue) => onExampleChange(getExampleIdByValue(inputValue), inputValue) }
                    value={ propValue }
                />
            </FlexCell>
            <PropDescription description={ description } />
        </>
    );
}

function PropDescription(props: { description: string }) {
    if (props.description) {
        return (
            <Tooltip placement="top" content={ props.description }>
                <IconButton icon={ InfoIcon } color="default" rawProps={ { style: { minWidth: '18px' } } } />
            </Tooltip>
        );
    }
    return null;
}

function stringifyUnknown(value: unknown) {
    if (value != null && value !== '') {
        const isArr = Array.isArray(value);
        const isObject = !isArr && typeof value === 'object';
        let effective: string | number | boolean = '';
        if (isArr || isObject) {
            try { effective = JSON.stringify(value, undefined, 1); } catch {}
        } else if (['number', 'boolean', 'string'].indexOf(typeof value) !== -1) {
            effective = value as (string | number | boolean);
        }
        return effective;
    }
}
