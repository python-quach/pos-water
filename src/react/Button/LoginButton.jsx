import { useState, useEffect } from 'react';
import { Form, Transition } from 'semantic-ui-react';
import React from 'react';

const LoginButton = ({ errorMessage, username, password, clear }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [errorMessage]);

    return !errorMessage || username || password ? (
        <Form.Button
            content='Login'
            className='LoginButton'
            primary
            circular
            fluid
            size='huge'
            // size='massive'
            id='LoginButton'
            color='blue'
            icon='sign in'
            labelPosition='right'
            type='submit'
            disabled={!username || !password}
            onClick={() => {
                document.getElementById('username').focus();
                clear(false);
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
                // size='massive'
                id='LoginButton'
                color='red'
                icon='warning sign'
                labelPosition='right'
                // onClick={(event) => {
                //     event.preventDefault();
                //     clear(false);
                // }}
            />
        </Transition>
    );
};

export default LoginButton;
