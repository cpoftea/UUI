import { TDetailsBuilder } from '../types';
import { buildCommonDetails } from './buildCommonDetails';
import { buildByFromRef } from './buildByFromRef';
import { buildByAlias } from './buildByAlias';
import { buildByGenericType } from './buildByGenericType';
import { buildByPropName } from './buildByPropName';
import { buildByRawType } from './buildByRawType';
import React from 'react';

export function FALLBACK_RENDER_EDITOR() {
    return (<div style={ { color: 'red' } }>Can't resolve</div>);
}

export const buildPropDetails: TDetailsBuilder = (params) => {
    const { prop, docs, skin } = params;
    const common = buildCommonDetails({ docs, prop, skin });
    const specific = buildSpecificDetails({ docs, prop, skin });
    if (specific) {
        return {
            ...common,
            ...specific,
        };
    }
};

export const buildPropFallbackDetails: TDetailsBuilder = (params) => {
    const { prop, docs, skin } = params;

    return {
        ...buildCommonDetails({ docs, prop, skin }),
        examples: [],
    };
};

const buildSpecificDetails: TDetailsBuilder = (params) => {
    const byFromRef = buildByFromRef(params);
    if (byFromRef) {
        return byFromRef;
    }
    const byAliasType = buildByAlias(params);
    if (byAliasType) {
        return byAliasType;
    }
    const byGenericType = buildByGenericType(params);
    if (byGenericType) {
        return byGenericType;
    }
    const byRawType = buildByRawType(params);
    if (byRawType) {
        return byRawType;
    }
    const byPropName = buildByPropName(params);
    if (byPropName) {
        return byPropName;
    }
};
