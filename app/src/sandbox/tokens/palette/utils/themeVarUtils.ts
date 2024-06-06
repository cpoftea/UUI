import { IThemeVarUI, IThemeVarUIError, TThemeVarUiErr } from '../types/types';
import { TTheme } from '../../../../common/docs/docsConstants';
import { TFigmaThemeName, TVarType } from '../types/sharedTypes';
import { normalizeColor } from './colorUtils';

/**
 * The Figma theme names (i.e. the values) are hardcoded here.
 * Make sure they are updated when modes in "public/docs/figmaTokensGen/Theme.json" are changed.
 */
const THEME_MAP: Record<TTheme, TFigmaThemeName | undefined> = {
    [TTheme.electric]: 'Electric',
    [TTheme.promo]: 'Promo',
    [TTheme.loveship]: 'Loveship-Light',
    [TTheme.loveship_dark]: 'Loveship-Dark',
    [TTheme.vanilla_thunder]: undefined,
};

export function getFigmaTheme(theme: TTheme) {
    return THEME_MAP[theme];
}

function isActualEqualsExpected(token: IThemeVarUI) {
    const { browser, figma } = token.value;
    if (figma !== undefined) {
        if (token.type === TVarType.COLOR) {
            const expectedNorm = normalizeColor(figma.value as string);
            const actualNorm = normalizeColor(browser);
            return expectedNorm.localeCompare(actualNorm) === 0;
        }
        return String(figma.value) === browser;
    }
    return true;
}

export function validateActualTokenValue(token: IThemeVarUI): IThemeVarUIError[] {
    //
    const { browser } = token.value;
    const errors: IThemeVarUIError[] = [];
    if (browser === '') {
        errors.push({
            type: TThemeVarUiErr.VAR_ABSENT,
            message: `CSS variable ${token.cssVar} is not defined`,
        });
    } else if (!isActualEqualsExpected(token)) {
        errors.push({
            type: TThemeVarUiErr.VALUE_MISMATCHED,
            message: 'Actual value doesn\'t match expected value',
        });
    }
    return errors;
}
