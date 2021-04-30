import { useState } from 'react';
import { Transition } from 'semantic-ui-react';

const TransitionPulseButton = ({ render }) => {
    const [visible, setVisible] = useState(true);

    return (
        <Transition visible={visible} animation='pulse'>
            {render(setVisible)}
        </Transition>
    );
};

export default TransitionPulseButton;
