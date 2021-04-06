import { Form, Transition } from 'semantic-ui-react';

const DoneButton = ({ disabled, visible, onClick }) => {
    return (
        <Transition visible={visible} animation='pulse'>
            <Form.Button
                primary
                size='huge'
                type='submit'
                content='Done'
                style={{ marginTop: '30px' }}
                disabled={disabled}
                onClick={onClick}
            />
        </Transition>
    );
};

export default DoneButton;
