import React, { useEffect, useState } from 'react';
import { Button, FlexRow, FlexSpacer, TabButton } from '@epam/uui';
import { TMode } from '../../docsConstants';
import { ReactComponent as ActionAlignRightOutlineIcon } from '@epam/assets/icons/action-align_right-outline.svg';
import css from './tabsNav.module.scss';

type TTabsNavProps = {
    mode: TMode;
    supportedModes: TMode[];
    onChangeMode: (mode: TMode) => void;
    renderSkinSwitcher: () => React.ReactNode;
    handleMobSidebarBtnClick: () => void;
};

type TabType = {
    caption: string,
    tooltip: string,
};

export function TabsNav(props: TTabsNavProps) {
    const { mode, onChangeMode, supportedModes } = props;
    const [pageWidth, setPageWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setPageWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const allTabs: Partial<Record<TMode, TabType>> = {
        [TMode.doc]: {
            caption: 'Documentation',
            tooltip: '',
        },
    };

    if (supportedModes.length > 1) {
        allTabs[TMode.propsEditor] = {
            caption: 'Property Explorer',
            tooltip: '',
        };
    }

    return (
        <FlexRow
            rawProps={ { role: 'tablist' } }
            padding="12"
            cx={ [css.secondaryNavigation] }
            borderBottom
        >
            { pageWidth <= 768 && (
                <Button
                    rawProps={ { style: { marginInlineStart: '6px', marginInlineEnd: '12px' } } }
                    fill="none"
                    icon={ ActionAlignRightOutlineIcon }
                    onClick={ props.handleMobSidebarBtnClick }
                >
                </Button>
            ) }
            {
                Object.keys(allTabs).reduce<React.ReactNode[]>((acc, tm) => {
                    if (supportedModes.includes(tm as TMode) || (tm as TMode) === mode) {
                        const data = allTabs[tm as TMode];
                        acc.push((
                            <TabButton
                                key={ tm }
                                size="60"
                                caption={ data.caption }
                                isLinkActive={ mode === tm }
                                rawProps={ { title: data.tooltip } }
                                onClick={ () => onChangeMode(tm as TMode) }
                            />
                        ));
                    }
                    return acc;
                }, [])
            }
            <FlexSpacer />
        </FlexRow>
    );
}
