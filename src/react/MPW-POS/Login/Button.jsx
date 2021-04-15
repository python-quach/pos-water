import { Transition, Form } from 'semantic-ui-react';
import { useState } from 'react';

// BUTTONS
export const LoginButton = ({ color, content, onClick }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                type='submit'
                content={content}
                color={color}
                size='huge'
                icon='sign-in'
                labelPosition='right'
                circular
                fluid
                onClick={() => onClick(setVisible)}
            />
        </Transition>
    );
};
export const AdminButton = ({ onClick }) => {
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
            />
        </Transition>
    );
};
export const CloseButton = ({ onClick }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Close'
                type='button'
                color='black'
                size='huge'
                icon='close'
                labelPosition='right'
                circular
                fluid
                onClick={() => onClick(setVisible)}
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
