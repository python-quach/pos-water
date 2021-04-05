import { Form, Transition } from 'semantic-ui-react';
import React from 'react';

export const LoginButton = ({ errorMessage, disabled, visible }) =>
    !errorMessage ? (
        <Form.Button
            type='submit'
            id='LoginButton'
            content='Login'
            className='LoginButton'
            size='huge'
            color='blue'
            icon='sign in'
            labelPosition='right'
            primary
            circular
            fluid
            disabled={disabled}
        />
    ) : (
        <Transition
            animation='shake'
            duration={500}
            visible={visible}
            unmountOnHide={true}>
            <Form.Button
                content='Invalid Login'
                circular
                fluid
                size='huge'
                id='LoginButton'
                color='red'
                icon='warning sign'
                labelPosition='right'
            />
        </Transition>
    );

export default LoginButton;
