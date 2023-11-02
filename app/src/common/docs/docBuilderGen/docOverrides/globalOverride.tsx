import { TDocOverrideBySkin, TSkin } from '../types';
import * as uuiDocs from '../../../../docs/_props/uui/docs';
import * as promoDocs from '../../../../docs/_props/epam-promo/docs';
import * as loveshipDocs from '../../../../docs/_props/loveship/docs';

/**
 * This override is applied to each skin individually
 * @param doc
 * @param skin
 */
export const applyGlobalOverride: TDocOverrideBySkin = (doc, skin) => {
    switch (skin) {
        case TSkin.UUI4_promo: {
            doc.withContexts(promoDocs.DefaultContext);
            break;
        }
        case TSkin.UUI3_loveship: {
            doc.withContexts(loveshipDocs.DefaultContext);
            break;
        }
        case TSkin.UUI: {
            doc.withContexts(uuiDocs.DefaultContext);
            break;
        }
    }
};
