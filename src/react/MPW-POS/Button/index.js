import { useState, useContext } from 'react';
import { StoreContext } from '../store';
import { Transition, Form } from 'semantic-ui-react';

// TRANSITION BUTTON
export const PulseTransitionButton = ({ name, values, type }) => {
    const [visible, setVisible] = useState(true);
    // const { effect, button, onClick } = useContext(StoreContext);
    const { effect, component, onClick } = useContext(StoreContext);
    const { button } = component[type];

    return (
        <Transition visible={visible} {...effect.pulse}>
            <Form.Button
                {...button[name](values)}
                onClick={() => {
                    onClick[name] && onClick[name](setVisible);
                }}
            />
        </Transition>
    );
};

export const Button = {
    Pulse: PulseTransitionButton,
};

export default Button;
