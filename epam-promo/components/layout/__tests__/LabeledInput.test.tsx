import React from 'react';
import renderer from 'react-test-renderer';
import { LabeledInput } from '../LabeledInput';
import { TextInput } from '../../inputs';

describe('LabeledInput', () => {
    it('should be rendered correctly', () => {
        const tree = renderer
            .create(<LabeledInput>
                <TextInput value={ null } onValueChange={ () => {} } />
            </LabeledInput>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should be rendered correctly with props', () => {
        const tree = renderer
            .create(<LabeledInput
                label='Test label'
                size='36'
                info='Test'
                isInvalid
                validationMessage='Test invalid message'
                labelPosition='left'
            >
                <TextInput value={ null } onValueChange={ () => {} } />
            </LabeledInput>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});