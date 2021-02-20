import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../Screen/LoginScreen';
import { Form, Transition } from 'semantic-ui-react';
import React from 'react';

const LoginButton = ({ username, password }) => {
    const [visible, setVisible] = useState(false);
    const { state, handle } = useContext(LoginContext);

    useEffect(() => {
        if (state.errorMessage) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [state.errorMessage]);

    return !state.errorMessage || username || password ? (
        <Form.Button
            content='Login'
            className='LoginButton'
            primary
            circular
            fluid
            size='huge'
            id='LoginButton'
            color='blue'
            icon='sign in'
            labelPosition='right'
            type='submit'
            disabled={!username || !password}
            onClick={() => {
                document.getElementById('username').focus();
                handle.errorMessage(false);
            }}
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
};

export default LoginButton;
