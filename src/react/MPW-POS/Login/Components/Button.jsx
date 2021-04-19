import { Transition, Form } from 'semantic-ui-react';
import { useState, useContext } from 'react';
import { StoreContext } from '../../store';

// TRANSITION BUTTON
export const PulseTransition = ({ render }) => {
    const [visible, setVisible] = useState(true);
    const { effect } = useContext(StoreContext);

    return (
        <Transition visible={visible} {...effect.pulse}>
            <Form.Button {...render(setVisible)} />
        </Transition>
    );
};

export const Button = {
    Pulse: PulseTransition,
};

export default PulseTransition;
