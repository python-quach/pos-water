import { Modal, Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Field from '../Field';
import Button from '../Button';
import { useContext } from 'react';
import { StoreContext } from '../store';

export const UserModal = () => {
    const { modal, form, input, button, onSubmit, user } = useContext(
        StoreContext
    ).component.userModal;

    console.log('UserModal', { modal });
    return (
        <Modal {...modal}>
            <Modal.Content>
                <FinalForm
                    onSubmit={onSubmit}
                    initialValues={{ ...user }}
                    render={({ handleSubmit }) => (
                        <Form {...form} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Input type='hidden' width={4} />
                                <Field name={input.username.attr} />
                                <Field name={input.password.attr} />
                                <Button.Pulse attr={button.submit.attr} />
                                <Button.Pulse
                                    attr={button.cancel.attr}
                                    onClick={button.cancel.onClick}
                                />
                            </Form.Group>
                        </Form>
                    )}
                />
            </Modal.Content>
        </Modal>
    );
};

export default UserModal;
