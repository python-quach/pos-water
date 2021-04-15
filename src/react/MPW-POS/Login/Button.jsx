import { Transition, Form } from 'semantic-ui-react';
import { useState } from 'react';

// BUTTONS
export const LoginButton = ({ error, onClick }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content={!error ? 'Login' : error}
                type='submit'
                color={!error ? 'blue' : 'red'}
                size='huge'
                icon='sign-in'
                labelPosition='right'
                circular
                fluid
                onClick={() => onClick(setVisible)}
                // onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};
export const AdminButton = ({ login, onClick }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Admin'
                type='button'
                color='yellow'
                size='huge'
                icon='database'
                labelPosition='right'
                circular
                fluid
                onClick={() => onClick(setVisible)}
                // onClick={() => {
                //     setVisible((visible) => !visible);
                //     login();
                // }}
            />
        </Transition>
    );
};
export const CloseButton = ({ closeApp, onClick }) => {
    return (
        <Transition visible={true} animation='pulse' duration='500'>
            <Form.Button
                content='Close'
                type='button'
                color='black'
                size='huge'
                icon='close'
                labelPosition='right'
                circular
                fluid
                onClick={onClick}
                // onClick={closeApp}
            />
        </Transition>
    );
};
export const BackupButton = ({ onClick }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Backup'
                type='button'
                size='huge'
                icon='file'
                labelPosition='right'
                circular
                color='pink'
                fluid
                onClick={() => onClick(setVisible)}
                // onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};

const LoginScreenButton = {
    Login: LoginButton,
    Admin: AdminButton,
    Close: CloseButton,
    Backup: BackupButton,
};

export default LoginScreenButton;
