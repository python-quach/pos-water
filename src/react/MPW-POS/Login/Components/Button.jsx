import { Transition, Form } from 'semantic-ui-react';
import { useState, useContext } from 'react';
import { StoreContext } from '../../store';

// TRANSITION
export const PulseTransition = ({ button }) => {
    const [visible, setVisible] = useState(true);
    const { effect } = useContext(StoreContext);
    return (
        <Transition visible={visible} {...effect.pulse}>
            {button(setVisible)}
        </Transition>
    );
};

// BUTTONS
export const LoginButton = () => {
    const { button } = useContext(StoreContext);
    return (
        <PulseTransition
            button={(setVisible) => (
                <Form.Button {...button.login(setVisible)} />
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
