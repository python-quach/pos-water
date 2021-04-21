import { useState, useContext } from 'react';
import { StoreContext } from '../../store';
import { Transition, Form } from 'semantic-ui-react';

// TRANSITION BUTTON
export const PulseTransitionButton = ({ name, values }) => {
    const [visible, setVisible] = useState(true);
    const { effect, button } = useContext(StoreContext);

    return (
        <Transition visible={visible} {...effect.pulse}>
            <Form.Button {...button[name](setVisible, values)} />
        </Transition>
    );
};

export default PulseTransitionButton;
