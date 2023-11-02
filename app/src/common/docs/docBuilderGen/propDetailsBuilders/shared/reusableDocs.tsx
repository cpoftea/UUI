import { TSkin } from '../../types';
import * as uuiDocs from '../../../../../docs/_props/uui/docs';
import * as loveshipDocs from '../../../../../docs/_props/loveship/docs';
import * as promoDocs from '../../../../../docs/_props/epam-promo/docs';

const DOCS_SKIN_SPECIFIC = {
    iconWithInfoDoc: {
        [TSkin.UUI]: uuiDocs.iconWithInfoDoc,
        [TSkin.UUI3_loveship]: loveshipDocs.iconWithInfoDoc,
        [TSkin.UUI4_promo]: promoDocs.iconWithInfoDoc,
    },
    colorDoc: {
        [TSkin.UUI]: uuiDocs.colorDoc,
        [TSkin.UUI3_loveship]: loveshipDocs.colorDoc,
        [TSkin.UUI4_promo]: promoDocs.colorDoc,
    },
    pickerBaseOptionsDoc: {
        [TSkin.UUI]: uuiDocs.pickerBaseOptionsDoc,
        [TSkin.UUI3_loveship]: loveshipDocs.pickerBaseOptionsDoc,
        [TSkin.UUI4_promo]: promoDocs.pickerBaseOptionsDoc,
    },
};

export function getDocBySkin<S extends TSkin, K extends (keyof typeof DOCS_SKIN_SPECIFIC)>(skin: S, name: K): (typeof DOCS_SKIN_SPECIFIC)[K][S] {
    return DOCS_SKIN_SPECIFIC[name][skin];
}
