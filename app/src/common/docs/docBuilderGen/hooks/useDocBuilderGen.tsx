import { convertToGenericFormat, TDocConfig, TSkin } from '../types';
import { TDocsGenExportedType } from '../../../apiReference/types';
import { IComponentDocs } from '@epam/uui-docs';
import React, { useEffect } from 'react';
import { docBuilderGen } from '../docBuilderGen';
import { loadPropsFile } from '../../componentEditor/loadPropsFile';

interface IUseDocBuilderGenParams {
    oldConfig?: { [key in TSkin]?: string };
    docsGenType?: TDocsGenExportedType,
    config?: TDocConfig;
    skin: TSkin;
    generateDocs: boolean;
}
interface IUseDocBuilderGenReturn {
    docs?: IComponentDocs<any>,
    isLoaded: boolean
    isGenerateDocSupported: boolean
    isGenerated?: boolean;
    generatedFromType?: TDocsGenExportedType;
}

export function useDocBuilderGen(params: IUseDocBuilderGenParams): IUseDocBuilderGenReturn {
    const {
        skin,
        config,
        oldConfig,
        docsGenType,
        generateDocs,
    } = params;

    const [res, setRes] = React.useState<{
        isLoaded: boolean;
        isGenerated?: boolean;
        generatedFromType?: TDocsGenExportedType;
        docs?: IComponentDocs<any>;
    }>({ isLoaded: false });

    const oldConfigSkin = oldConfig?.[skin];
    const newConfigSkin = convertToGenericFormat(config)?.bySkin?.[skin];

    const isGenerateDocSupported = Boolean(newConfigSkin || (docsGenType && oldConfigSkin && skin === TSkin.UUI));

    useEffect(() => {
        if (generateDocs && config) {
            const _config = convertToGenericFormat(config);
            const generatedFromType = _config.bySkin[skin]?.type;
            docBuilderGen({ config: _config, skin }).then((docs) => {
                setRes({
                    isLoaded: true,
                    isGenerated: true,
                    generatedFromType,
                    docs,
                });
            });
        } else if (generateDocs && skin === TSkin.UUI && docsGenType && oldConfigSkin) {
            // Temporary code. We try to build the new config using old config
            loadPropsFile(oldConfigSkin).then(({ component, name }) => {
                const _newConfig: TDocConfig = {
                    name,
                    type: docsGenType,
                    component,
                };
                return docBuilderGen({ config: convertToGenericFormat(_newConfig), skin }).then((docs) => {
                    setRes({
                        isLoaded: true,
                        isGenerated: true,
                        generatedFromType: docsGenType,
                        docs,
                    });
                });
            });
        } else if (oldConfigSkin) {
            // Temporary code
            loadPropsFile(oldConfigSkin).then((docs) => {
                setRes({
                    isLoaded: true,
                    docs,
                });
            });
        } else {
            setRes({
                isLoaded: true,
                docs: undefined,
            });
        }
    }, [docsGenType, config, oldConfigSkin, skin, generateDocs, isGenerateDocSupported]);

    return {
        ...res,
        isGenerateDocSupported,
    };
}
