import { useState, useContext } from 'react';
import { StoreContext } from '../../store';
import { Transition, Form } from 'semantic-ui-react';

// TRANSITION BUTTON
export const PulseTransition = ({ name }) => {
    const [visible, setVisible] = useState(true);
    const { effect, button } = useContext(StoreContext);

    return (
        <Transition visible={visible} {...effect.pulse}>
            <Form.Button {...button[name](setVisible)} />
        </Transition>
    );
};

export const Button = {
    Pulse: PulseTransition,
    Login: () => <PulseTransition name='login' />,
    Admin: () => <PulseTransition name='admin' />,
    Close: () => <PulseTransition name='close' />,
    Backup: () => <PulseTransition name='backup' />,
};

export default Button;
