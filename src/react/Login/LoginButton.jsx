import { Form, Transition } from 'semantic-ui-react';
import React from 'react';

const LoginButton = ({ errorMessage, username, password }) => {
    return !errorMessage ? (
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
};

export default LoginButton;

//  <div className='disabled field LoginButton'>
//             <button
//                 type='submit'
//                 id='LoginButton'
//                 className='ui blue huge circular fluid icon primary disabled right labeled button'
//                 disabled=''
//                 tabIndex='-1'>
//                 <i aria-hidden='true' className='sign in icon'></i>Login
//             </button>
//         </div>
