import { useState, useContext } from 'react';
import { StoreContext } from '../store';
import { Transition, Form } from 'semantic-ui-react';

// TRANSITION BUTTON
export const PulseTransitionButton = ({ render, onClick }) => {
    const [visible, setVisible] = useState(true);
    const { effect } = useContext(StoreContext);

    return (
        <Transition visible={visible} {...effect.pulse}>
            <Form.Button
                {...render}
                onClick={() => {
                    onClick(setVisible);
                }}
            />
        </Transition>
    );
};

export const Button = {
    Pulse: PulseTransitionButton,
};

export default Button;
