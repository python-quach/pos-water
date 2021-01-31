import { Form, Transition } from 'semantic-ui-react';

const LoginButton = ({ errorMessage, username, password }) =>
    !errorMessage ? (
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
            }}
        />
    ) : (
        <Transition animation='shake' duration={500} unmountOnHide={true}>
            <Form.Button
                content='Invalid Login'
                circular
                fluid
                size='huge'
                id='LoginButton'
                color='red'
                icon='warning sign'
                labelPosition='right'
                onClick={(event) => {
                    event.preventDefault();
                }}
            />
        </Transition>
    );

export default LoginButton;
