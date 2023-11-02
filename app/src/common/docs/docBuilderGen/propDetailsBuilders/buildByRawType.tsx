import { PropDoc } from '@epam/uui-docs';
import { TDetailsBuilder } from '../types';

const byRawType = new Map<string, Partial<PropDoc<any, any>>>();
byRawType.set('React.CSSProperties', {
    examples: [
        { name: "{ border: '3px solid #500ff0' }", value: { border: '3px solid #500ff0' } },
        { name: "{ border: '3px solid #f5a111' }", value: { border: '3px solid #f5a111' } },
    ],
});

export const buildByRawType: TDetailsBuilder = (params) => {
    const { prop } = params;
    const found = byRawType.get(prop.typeValue.raw);
    if (found) {
        return found;
    }
};
