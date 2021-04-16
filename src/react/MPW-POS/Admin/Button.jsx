import { useState } from 'react';
import { Form, Transition } from 'semantic-ui-react';

export const DeleteButton = ({ remove }) => {
    const [visible, setVisible] = useState(true);

    const removeUser = () => {
        setVisible((prev) => !prev);
        setTimeout(remove, 500);
    };

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Delete'
                floated='right'
                negative
                size='huge'
                onClick={removeUser}
            />
        </Transition>
    );
};

export const TransitionPulseButton = ({ button }) => {
    const [visible, setVisible] = useState(true);

    const handleClick = (event) => {
        setVisible((prev) => !prev);
        setTimeout(event, 500);
    };
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            {button(handleClick)}
        </Transition>
    );
};

export const EditButton = () => {};

const Buttons = {
    Delete: DeleteButton,
    Edit: EditButton,
    TransitionPulseButton,
};

export default Buttons;
