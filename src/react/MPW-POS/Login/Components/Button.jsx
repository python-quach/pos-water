import { Transition, Form } from 'semantic-ui-react';
import { useState, useContext } from 'react';
import { StoreContext } from '../../store';

// TRANSITION
export const PulseTransition = ({ button }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            {button(setVisible)}
        </Transition>
    );
};

// BUTTONS
export const LoginButton = () => {
    const { error } = useContext(StoreContext);

    return (
        <PulseTransition
            button={(setVisible) => (
                <Form.Button
                    type='submit'
                    content={!error ? 'Login' : error}
                    color={!error ? 'blue' : 'red'}
                    size='huge'
                    icon='sign-in'
                    labelPosition='right'
                    circular
                    fluid
                    onClick={() => setVisible((visible) => !visible)}
                />
            )}
        />
    );
};

export const AdminButton = () => {
    const { open } = useContext(StoreContext);

    return (
        <PulseTransition
            button={(setVisible) => (
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
            )}
        />
    );
};

export const CloseButton = () => {
    const { api } = useContext(StoreContext);

    return (
        <PulseTransition
            button={(setVisible) => (
                <Form.Button
                    content='Close'
                    type='button'
                    color='black'
                    size='huge'
                    icon='close'
                    labelPosition='right'
                    circular
                    fluid
                    onClick={() => api.close(setVisible)}
                />
            )}
        />
    );
};
export const BackupButton = () => {
    const { api, loading, fileSave } = useContext(StoreContext);

    return (
        <PulseTransition
            button={(setVisible) => (
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
            )}
        />
    );
};

export const LoginScreenButton = {
    Login: LoginButton,
    Admin: AdminButton,
    Close: CloseButton,
    Backup: BackupButton,
};

export default LoginScreenButton;
