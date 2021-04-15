import { useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Transition } from 'semantic-ui-react';

export const EditButton = ({ onClick }) => {
    const [visible, setVisible] = useState(true);

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Edit'
                color='blue'
                onClick={() => {
                    onClick(setVisible);
                }}
            />
            ;
        </Transition>
    );
};

export const DeleteButton = ({ onClick }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Delete'
                color='red'
                onClick={() => {
                    onClick(setVisible);
                }}
            />
        </Transition>
    );
};

export const AdminForm = ({ user }) => {
    const [edit, setEdit] = useState(false);
    const [del, setDelete] = useState(false);

    const onSubmit = async (values) => {
        console.log({ values });
    };

    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={{ ...user }}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group inline>
                        <Field
                            name='username'
                            render={({ input }) => (
                                <Form.Input {...input} readOnly={edit} />
                            )}
                        />
                        <Field
                            name='password'
                            render={({ input }) => (
                                <Form.Input {...input} readOnly={del} />
                            )}
                        />
                        <EditButton
                            onClick={(setVisible) => {
                                setVisible((prev) => !prev);
                                setEdit(true);
                            }}
                        />
                        <DeleteButton
                            onClick={(setVisible) => {
                                setVisible((prev) => !prev);
                                setDelete(true);
                            }}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default AdminForm;
