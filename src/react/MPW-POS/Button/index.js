import { useState, useContext } from 'react';
import { StoreContext } from '../store';
import { Transition } from 'semantic-ui-react';

// TRANSITION BUTTON
export const PulseTransitionButton = ({ render }) => {
    // console.log({ render });
    const [visible, setVisible] = useState(true);
    const { effect } = useContext(StoreContext);

    return (
        <Transition visible={visible} {...effect.pulse}>
            {render(setVisible)}
        </Transition>
    );
};

export const Button = {
    Pulse: PulseTransitionButton,
};

export default Button;
