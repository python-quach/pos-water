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
    const { open } = useContext(StoreContext);

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
                    open.admin();
                }}
            />
        </Transition>
    );
};
export const CloseButton = () => {
    const [visible, setVisible] = useState(true);
    const { api } = useContext(StoreContext);

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
                    setTimeout(api.close, 500);
                }}
            />
        </Transition>
    );
};
export const BackupButton = () => {
    const [visible, setVisible] = useState(true);
    const { api, loading, fileSave } = useContext(StoreContext);

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content={fileSave}
                loading={loading}
                type='button'
                size='huge'
                icon='save'
                circular
                color='pink'
                fluid
                onClick={() => api.backup(setVisible)}
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
