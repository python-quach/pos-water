import { Transition, Form } from 'semantic-ui-react';
import { useState, useContext } from 'react';
import { StoreContext } from '../../store';

// BUTTONS
export const LoginButton = () => {
    const [visible, setVisible] = useState(true);
    const { error } = useContext(StoreContext);

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                type='submit'
                content={!error ? 'Login' : error}
                color={!error ? 'blue' : 'red'}
                size='huge'
                icon='sign-in'
                labelPosition='right'
                circular
                fluid
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};
export const AdminButton = () => {
    const [visible, setVisible] = useState(true);
    const { history } = useContext(StoreContext);

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
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(() => {
                        history.push({
                            pathname: '/admin/confirm',
                            state: true,
                        });
                    }, 500);
                }}
            />
        </Transition>
    );
};
export const CloseButton = () => {
    const [visible, setVisible] = useState(true);
    const { close } = useContext(StoreContext);

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
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(close, 500);
                }}
            />
        </Transition>
    );
};
export const BackupButton = () => {
    const [visible, setVisible] = useState(true);
    const { api } = useContext(StoreContext);
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
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(api.backup, 500);
                }}
            />
        </Transition>
    );
};
export const LoginScreenButton = {
    Login: LoginButton,
    Admin: AdminButton,
    Close: CloseButton,
    Backup: BackupButton,
};
export default LoginScreenButton;
