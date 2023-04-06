import * as React from 'react';
import css from './FlexRowContext.scss';
import { DemoComponentProps } from '@epam/uui-docs';
import { FlexRow, FlexCell, TextInput } from '@epam/promo';

export class FlexRowContext extends React.Component<DemoComponentProps> {
    public static displayName = "Default";

    render() {
        const { DemoComponent, props } = this.props;

        return (
            <FlexRow cx={ css.root } background='white' spacing='18'>
                <FlexCell width={ 150 } grow={ 1 }>
                    <TextInput value={ null } onValueChange={ null } placeholder='Placeholder' />
                </FlexCell>
                <DemoComponent { ...props } />
            </FlexRow>
        );
    }
}