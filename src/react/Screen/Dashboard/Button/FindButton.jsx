import { Transition, Form } from 'semantic-ui-react';

export const FindButton = ({ errorMessage, disabled, visible }) =>
    !errorMessage ? (
        <Form.Button
            id='find'
            type='submit'
            content='Find Membership'
            size='huge'
            color='blue'
            icon='search'
            labelPosition='right'
            primary
            circular
            fluid
            disabled={disabled}
        />
    ) : (
        <Transition
            animation='pulse'
            duration={500}
            visible={visible}
            unmountOnHide>
            <Form.Button
                content='Find Membership'
                color='red'
                icon='warning sign'
                labelPosition='right'
                size='huge'
                circular
                fluid
            />
        </Transition>
    );

export default FindButton;
