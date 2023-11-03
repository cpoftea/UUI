import * as React from 'react';
import {
    RichTextView, FlexRow, MultiSwitch, FlexSpacer, TabButton, ScrollBars,
} from '@epam/promo';
import { svc } from '../../services';
import { getQuery } from '../../helpers';
import { analyticsEvents } from '../../analyticsEvents';
import css from './BaseDocsBlock.module.scss';
import { TDocsGenExportedType } from '../apiReference/types';
import { TypeRefSection } from '../apiReference/TypeRefSection';
import { convertToGenericFormat, TDocConfig, TSkin } from './docBuilderGen/types';
import { ComponentEditorWrapper } from './componentEditor/ComponentEditor';

export { TSkin };

enum TMode {
    doc = 'doc',
    propsEditor = 'propsEditor'
}

const DEFAULT_SKIN = TSkin.UUI4_promo;
const DEFAULT_MODE = TMode.doc;

export const UUI3 = TSkin.UUI3_loveship;
export const UUI4 = TSkin.UUI4_promo;
export const UUI = TSkin.UUI;

const items: { id: TSkin; caption: string }[] = [
    { caption: 'UUI3 [Loveship]', id: TSkin.UUI3_loveship }, { caption: 'UUI4 [Promo]', id: TSkin.UUI4_promo }, { caption: 'UUI [Themebale]', id: TSkin.UUI },
];

export type TDocsGenType = TDocsGenExportedType;
type DocPath = {
    [key in TSkin]?: string;
};

interface BaseDocsBlockState {}

export abstract class BaseDocsBlock extends React.Component<any, BaseDocsBlockState> {
    constructor(props: any) {
        super(props);

        const { category, id } = svc.uuiRouter.getCurrentLink().query;
        svc.uuiAnalytics.sendEvent(analyticsEvents.document.pv(id, category));
    }

    private getSkin(): TSkin {
        return getQuery('skin') || DEFAULT_SKIN;
    }

    private getMode(): TMode {
        return getQuery('mode') || DEFAULT_MODE;
    }

    abstract title: string;
    abstract renderContent(): React.ReactNode;
    protected getPropsDocPath(): DocPath {
        return null;
    }

    protected getDocsGenType(): TDocsGenType | undefined {
        return undefined;
    }

    config: TDocConfig;

    componentDidMount() {
        this.handleMountOrUpdate();
    }

    componentDidUpdate() {
        this.handleMountOrUpdate();
    }

    private handleMountOrUpdate = () => {
        changeBodyTheme(this.getSkin());
        if (this.getMode() === TMode.propsEditor && !this.isPropEditorSupported()) {
            this.handleChangeMode(TMode.doc);
        }
    };

    private renderApiBlock = () => {
        let docsGenType = this.getDocsGenType();
        if (!docsGenType) {
            if (this.config) {
                const configGeneric = convertToGenericFormat(this.config).bySkin;
                /**
                 * API block is always based on the "UUI" TS type.
                 * But if it's not defined for some reason, then the first available skin is used instead.
                 */
                const skinSpecific = configGeneric[TSkin.UUI] || configGeneric[Object.keys(configGeneric)[0] as TSkin];
                docsGenType = skinSpecific?.type;
            }
        }
        if (docsGenType) {
            return (
                <>
                    { this.renderSectionTitle('Api') }
                    <TypeRefSection showCode={ true } typeRef={ docsGenType } />
                </>
            );
        }
    };

    protected renderSkinSwitcher() {
        return (
            <MultiSwitch<TSkin>
                size="36"
                items={ items.filter((i) => (!isLocalServer() ? i.id !== TSkin.UUI : true)) }
                value={ this.getSkin() }
                onValueChange={ (newValue: TSkin) => this.handleChangeSkin(newValue) }
            />
        );
    }

    private renderTabsNav() {
        return (
            <FlexRow rawProps={ { role: 'tablist' } } background="white" padding="12" cx={ css.secondaryNavigation } borderBottom>
                <TabButton
                    size="60"
                    caption="Documentation"
                    isLinkActive={ this.getMode() === TMode.doc }
                    onClick={ () => this.handleChangeMode(TMode.doc) }
                />
                <TabButton
                    size="60"
                    caption="Property Explorer"
                    isLinkActive={ this.getMode() === TMode.propsEditor }
                    onClick={ () => this.handleChangeMode(TMode.propsEditor) }
                />
                <FlexSpacer />
                {this.getMode() === TMode.propsEditor && this.renderSkinSwitcher()}
            </FlexRow>
        );
    }

    private isPropEditorSupported = () => {
        const hasOldPropsDocPath = !!this.getPropsDocPath();
        const hasNewDocConfig = !!this.config;
        return hasNewDocConfig || hasOldPropsDocPath;
    };

    private renderPropsEditor() {
        const skin = this.getSkin();
        return (
            <ComponentEditorWrapper
                onRedirectBackToDocs={ () => this.handleChangeMode(TMode.doc) }
                oldConfig={ this.getPropsDocPath() }
                config={ this.config }
                title={ this.title }
                skin={ skin }
                docsGenType={ this.getDocsGenType() }
            />
        );
    }

    protected renderSectionTitle(title: string) {
        return (
            <RichTextView>
                <h2>{title}</h2>
            </RichTextView>
        );
    }

    protected renderDocTitle() {
        return (
            <RichTextView>
                <h1>{this.title}</h1>
            </RichTextView>
        );
    }

    private renderDoc() {
        return (
            <ScrollBars>
                <div className={ css.widthWrapper }>
                    {this.renderDocTitle()}
                    {this.renderContent()}
                    {this.renderApiBlock()}
                </div>
            </ScrollBars>
        );
    }

    componentWillUnmount() {
        changeBodyTheme(TSkin.UUI4_promo);
    }

    private handleChangeSkin(skin: TSkin) {
        this.handleNav({ skin });
    }

    private handleChangeMode(mode: TMode) {
        this.handleNav({ mode });
    }

    private handleNav = (params: { mode?: TMode, skin?: TSkin }) => {
        const mode: TMode = params.mode ? params.mode : this.getMode();
        const skin: TSkin = params.skin ? params.skin : this.getSkin();

        svc.uuiRouter.redirect({
            pathname: '/documents',
            query: {
                category: 'components',
                id: getQuery('id'),
                mode,
                skin,
            },
        });
    };

    render() {
        return (
            <div className={ css.container }>
                {this.isPropEditorSupported() && this.renderTabsNav()}
                {this.getMode() === TMode.propsEditor ? this.renderPropsEditor() : this.renderDoc()}
            </div>
        );
    }
}

function isLocalServer() {
    return window.location.host.includes('localhost');
}

function changeBodyTheme(skin: TSkin) {
    const theme = document.body.classList.value.match(/uui-theme-(\S+)\s*/)[1];
    if (theme === skin.split('_')[1]) return;
    document.body.classList.remove(`uui-theme-${theme}`);
    document.body.classList.add(`uui-theme-${skin === UUI3 ? 'loveship' : 'promo'}`);
}
