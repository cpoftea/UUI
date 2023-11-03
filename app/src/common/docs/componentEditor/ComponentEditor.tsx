import * as React from 'react';
import { IHasCX } from '@epam/uui-core';
import { IComponentDocs, IPropSamplesCreationContext, PropDoc, PropExample } from '@epam/uui-docs';
import { FlexRow, Panel } from '@epam/promo';
import { svc } from '../../../services';
import { ComponentEditorView } from './ComponentEditorView';
import { TDocConfig, TSkin } from '../docBuilderGen/types';
import { TDocsGenExportedType } from '../../apiReference/types';
import { useEffect, useState } from 'react';
import { useDocBuilderGen } from '../docBuilderGen/hooks/useDocBuilderGen';

export function ComponentEditorWrapper(props: {
    title: string;
    docsGenType?: TDocsGenExportedType;
    skin: TSkin;
    oldConfig?: {
        [key in TSkin]?: string;
    };
    config: TDocConfig;
    onRedirectBackToDocs: () => void;
}) {
    const {
        title,
        skin,
        config,
        oldConfig,
        docsGenType,
        onRedirectBackToDocs,
    } = props;
    const [generateDocs, setGenerateDocs] = useState(false);
    const { isLoaded, docs, isGenerateDocSupported, generatedFromType } = useDocBuilderGen({
        config,
        docsGenType,
        skin,
        oldConfig,
        generateDocs,
    });

    const hasOldConfig = !!oldConfig;
    useEffect(() => {
        setGenerateDocs(!hasOldConfig);
    }, [skin, hasOldConfig]);

    useEffect(() => {
        if (!config && !oldConfig) {
            onRedirectBackToDocs();
        }
    }, [config, oldConfig, onRedirectBackToDocs]);

    return (
        <ComponentEditor
            isLoaded={ isLoaded }
            onRedirectBackToDocs={ onRedirectBackToDocs }
            docs={ docs }
            title={ title }
            skin={ skin }
            onDocGenerateToggle={ () => setGenerateDocs((prev) => !prev) }
            hideDocGenerateToggle={ !hasOldConfig }
            generateDoc={ generateDocs }
            isGenerateDocSupported={ isGenerateDocSupported }
            generatedFromType={ generatedFromType }
        />
    );
}

interface ComponentEditorProps extends IHasCX {
    docs?: IComponentDocs<any>;
    skin: TSkin;
    title: string;
    generateDoc: boolean;
    isLoaded: boolean;
    isGenerateDocSupported: boolean;
    onRedirectBackToDocs: () => void;
    generatedFromType?: TDocsGenExportedType;
    hideDocGenerateToggle: boolean;
    onDocGenerateToggle: () => void;
}

interface ComponentEditorState {
    showCode: boolean;
    isInited: boolean;
    selectedContext?: string;
    selectedExamplesIds: { [name: string]: string };
    inputValues: { [name: string]: any };
    componentKey?: string;
}

const getInitialState = (): ComponentEditorState => ({
    showCode: false,
    selectedExamplesIds: {},
    inputValues: {},
    componentKey: undefined,
    isInited: false,
});

export class ComponentEditor extends React.Component<ComponentEditorProps, ComponentEditorState> {
    propSamplesCreationContext = new PropSamplesCreationContext(this);
    initialProps: any;
    state = getInitialState();

    componentDidMount() {
        this.initProps();
    }

    componentDidUpdate(prevProps:Readonly<ComponentEditorProps>) {
        const docsChanged = prevProps.docs !== this.props.docs;
        if (docsChanged) {
            this.initProps();
        }
        const skinChanged = prevProps.skin !== this.props.skin;
        if (skinChanged) {
            this.setState({ selectedContext: undefined });
        }
    }

    handleResetDocs = (onAfterReset?: () => void) => {
        this.initialProps = undefined;
        this.setState(() => getInitialState(), onAfterReset);
    };

    initProps() {
        const { docs, isLoaded } = this.props;
        this.handleResetDocs(() => {
            if (docs && isLoaded) {
                const selectedExamplesIds: ComponentEditorState['selectedExamplesIds'] = {};
                const inputValues: ComponentEditorState['inputValues'] = {};
                docs.props.forEach((prop) => {
                    const defaultExample = this.getPropExampleByPropValue(prop);
                    if (defaultExample) {
                        selectedExamplesIds[prop.name] = defaultExample.id;
                    }

                    const value = defaultExample?.value;
                    if (typeof value !== 'undefined') {
                        inputValues[prop.name] = value;
                    }
                });
                this.initialProps = selectedExamplesIds;
                this.setState({ selectedExamplesIds, inputValues, isInited: true });
            }
        });
    }

    getPropExamples = (prop: PropDoc<any, any>) => {
        const { examples } = prop;
        let ex = [];
        if (typeof examples === 'function') {
            ex = examples(this.propSamplesCreationContext);
        } else if (examples.length) {
            ex = examples;
        }
        return ex;
    };

    getPropExampleByPropValue = (prop: PropDoc<any, any>, propValue?: any): PropExample<any> => {
        const propExamples = this.getPropExamples(prop);
        let exampleResolved;
        if (typeof propValue !== 'undefined') {
            exampleResolved = propExamples.find((i) => i.value === propValue);
        } else {
            exampleResolved = propExamples.find((i) => i.isDefault);
            if (!exampleResolved && prop.isRequired) {
                exampleResolved = propExamples[0];
            }
        }

        return exampleResolved;
    };

    getInputValues = () => {
        return this.state.inputValues;
    };

    getProps() {
        const { selectedExamplesIds, inputValues, componentKey: key, isInited } = this.state;
        const { isLoaded, docs } = this.props;
        const isPropsReady = isLoaded && docs && isInited;
        if (!isPropsReady) {
            return {};
        }

        const props: { [name: string]: any } = {
            ...inputValues,
            key,
        };

        Object.keys(selectedExamplesIds).forEach((propName: string) => {
            const exampleId = selectedExamplesIds[propName];
            const propValue = inputValues[propName];
            const docComponent = this.props.docs.props.find((doc) => doc.name === propName);
            const propExamples = docComponent ? this.getPropExamples(docComponent) : [];
            const hasAnyExamples = propExamples.length > 0;
            const isSomeExampleSelected = hasAnyExamples && typeof exampleId !== 'undefined';
            const isInputValueEmpty = propValue == null || propValue === '';

            if (!isInputValueEmpty && !isSomeExampleSelected) {
                props[propName] = propValue;
            } else if (docComponent) {
                if (isSomeExampleSelected) {
                    props[propName] = propExamples.find((e) => e.id === exampleId).value;
                } else {
                    const selectedExample = this.getPropExampleByPropValue(docComponent);
                    if (selectedExample) {
                        props[propName] = selectedExample.value;
                    }
                }
            }
        });

        return props;
    }

    getSelectedDemoContext() {
        const { selectedContext } = this.state;
        const { docs } = this.props;
        if (docs) {
            const defaultContext = docs.contexts[0];
            if (!selectedContext) {
                return defaultContext.context;
            } else {
                return docs.contexts.filter((ctx) => ctx.name === selectedContext)[0].context;
            }
        }
    }

    handleChangeValueOfPropertyValue = (newValue: any) => {
        const propertyName = 'value';
        const prop = this.props.docs.props.find((p) => p.name === propertyName);
        const selectedExample = prop && this.getPropExampleByPropValue(prop, newValue);

        this.setState((prev) => {
            return {
                inputValues: { ...prev.inputValues, [propertyName]: newValue },
                selectedExamplesIds: { ...prev.selectedExamplesIds, [propertyName]: selectedExample?.id },
            };
        });
    };

    handleResetProp = (name: string) => this.setState((prev) => {
        const result: Pick<ComponentEditorState, 'selectedExamplesIds' | 'inputValues'> = {
            selectedExamplesIds: { ...prev.selectedExamplesIds },
            inputValues: { ...prev.inputValues },
        };
        delete result.selectedExamplesIds[name];
        delete result.inputValues[name];

        return result;
    });

    handleReset = () => {
        this.initProps();
    };

    handlePropExampleChange = (params: { propName: string, exampleId: string, propValue?: string, remountOnChange: boolean }) => {
        const {
            propName,
            exampleId,
            propValue,
            remountOnChange,
        } = params;

        const newStateValues: ComponentEditorState = {
            ...this.state,
            selectedExamplesIds: { ...this.state.selectedExamplesIds, [propName]: exampleId },
            inputValues: { ...this.state.inputValues, [propName]: propValue },
        };

        if (remountOnChange) {
            newStateValues.componentKey = new Date().getTime().toString();
        }

        this.setState(newStateValues);
    };

    handleChangeContext = (selectedContext: string) => {
        this.setState({ selectedContext });
    };

    handleToggleShowCode = () => this.setState((prev) => {
        return { showCode: !prev.showCode };
    });

    render() {
        const { title, cx: propsCx, skin, onDocGenerateToggle,
            hideDocGenerateToggle, isGenerateDocSupported, docs, isLoaded, onRedirectBackToDocs, generatedFromType } = this.props;
        const { showCode, selectedExamplesIds, selectedContext, inputValues, isInited } = this.state;
        const currentTheme = getTheme(skin);
        const selectedDemoCtx = this.getSelectedDemoContext();
        const { component: DemoComponent, name: tagName, contexts, props } = docs || {};
        const availableCtxNames = contexts?.map((i) => i.name) || [];
        const selectedCtxName = selectedContext || (contexts?.length > 0 ? contexts[0].name : undefined);
        const canReset = Object.keys(selectedExamplesIds).length > 0;
        const demoComponentProps = this.getProps() || {};
        const isDocUnsupportedForSkin = isLoaded && !docs;

        return (
            <ComponentEditorView
                isInited={ isInited }
                generatedFromType={ generatedFromType }
                isDocUnsupportedForSkin={ isDocUnsupportedForSkin }
                onRedirectBackToDocs={ onRedirectBackToDocs }
                isGenerateDocSupported={ isGenerateDocSupported }
                hideDocGenerateToggle={ hideDocGenerateToggle }
                onDocGenerateToggle={ onDocGenerateToggle }
                availableCtxNames={ availableCtxNames }
                canReset={ canReset }
                currentTheme={ currentTheme }
                DemoComponent={ DemoComponent }
                demoComponentProps={ demoComponentProps }
                propDoc={ props }
                propsCx={ propsCx }
                selectedCtxName={ selectedCtxName }
                SelectedDemoContext={ selectedDemoCtx }
                showCode={ showCode }
                tagName={ tagName }
                title={ title }
                onChangeSelectedCtx={ this.handleChangeContext }
                onGetPropExampleId={ (name: string) => selectedExamplesIds[name] }
                onGetPropValue={ (name: string) => inputValues[name] }
                onPropExampleChange={ this.handlePropExampleChange }
                onReset={ this.handleReset }
                onResetProp={ this.handleResetProp }
                onToggleShowCode={ this.handleToggleShowCode }
                propSamplesCreationContext={ this.propSamplesCreationContext }
            />
        );
    }
}

class PropSamplesCreationContext implements IPropSamplesCreationContext<any> {
    constructor(
        private reactClassComponent: {
            forceUpdate: () => void;
            getInputValues: () => { [p: string]: any },
            handleChangeValueOfPropertyValue: (newValue: string) => void
        },
    ) {
    }

    getCallback = (name: string) => {
        function callbackFn(...args: any[]) {
            svc.uuiNotifications
                .show(
                    () => (
                        <Panel background="white" shadow={ true }>
                            <FlexRow padding="12" borderBottom={ true }>
                                <pre>
                                    {name}
                                    (
                                    {args.length}
                                    {' '}
                                    args)
                                </pre>
                            </FlexRow>
                        </Panel>
                    ),
                    { position: 'bot-right' },
                )
                .catch(() => null);
            // eslint-disable-next-line no-console
            console.log(`${name} (`, args, ')');
        }
        Object.defineProperty(callbackFn, 'name', { value: 'callback' });
        return callbackFn;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getChangeHandler = (_propName: string) => {
        return (newValue: string) => {
            this.reactClassComponent.handleChangeValueOfPropertyValue(newValue);
        };
    };

    getSelectedProps = () => this.reactClassComponent.getInputValues();

    forceUpdate = () => {
        this.reactClassComponent.forceUpdate();
    };

    demoApi = svc.api.demo;
}

function getTheme(skin: TSkin) {
    switch (skin) {
        case TSkin.UUI:
            return 'uui-theme-vanilla_thunder';
        case TSkin.UUI4_promo:
            return 'uui-theme-promo';
        case TSkin.UUI3_loveship:
            return 'uui-theme-loveship';
        default:
            return '';
    }
}
