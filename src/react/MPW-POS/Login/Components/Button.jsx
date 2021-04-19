import { useState, useContext } from 'react';
import { StoreContext } from '../../store';
import { Transition, Form } from 'semantic-ui-react';

// TRANSITION BUTTON
export const PulseTransitionButton = ({ name }) => {
    const [visible, setVisible] = useState(true);
    const { effect, button } = useContext(StoreContext);

    return (
        <Transition visible={visible} {...effect.pulse}>
            <Form.Button {...button[name](setVisible)} />
        </Transition>
    );
};

export const LoginScreenButton = {
    Login: () => <PulseTransitionButton name='login' />,
    Admin: () => <PulseTransitionButton name='admin' />,
    Close: () => <PulseTransitionButton name='close' />,
    Backup: () => <PulseTransitionButton name='backup' />,
};

export default LoginScreenButton;
