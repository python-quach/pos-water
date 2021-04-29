import { useState } from 'react';
import { Transition } from 'semantic-ui-react';

export const TransitionPulseButton = ({ render }) => {
    const [visible, setVisible] = useState(true);

    return (
        <Transition visible={visible} animation='pulse'>
            {render(setVisible)}
        </Transition>
    );
};

export default TransitionPulseButton;
