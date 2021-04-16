import { useState, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Transition } from 'semantic-ui-react';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

export const AdminLoginForm = ({ onSubmit, cancel }) => {
    const [error, setError] = useState(false);
    const [visibleSubmitButton, setVisibleSubmitButton] = useState(true);
    const [visibleCancelButton, setVisibleCancelButton] = useState(true);

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
                <Form
                    size='huge'
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then()
                            .catch((err) => {
                                setError(true);
                                form.reset({});
                            });
                    }}>
                    <Form.Group inline>
                        <Field
                            name='password'
                            render={({ input }) => (
                                <Form.Input
                                    {...input}
                                    id='password'
                                    placeholder='password'
                                    type='password'
                                    focus
                                    error={error}
                                    onChange={(e, { value }) => {
                                        setError(false);
                                        return input.onChange(value);
                                    }}
                                />
                            )}
                        />
                        <Transition
                            visible={visibleSubmitButton}
                            animation='pulse'
                            duration='500'>
                            <Form.Button
                                size='huge'
                                content='Submit'
                                type='submit'
                                color={error ? 'red' : 'blue'}
                                onClick={() =>
                                    setVisibleSubmitButton((prev) => !prev)
                                }
                            />
                        </Transition>
                        <Transition
                            visible={visibleCancelButton}
                            animation='pulse'
                            duration='500'>
                            <Form.Button
                                size='huge'
                                content='Cancel'
                                secondary
                                onClick={(e) => {
                                    e.preventDefault();
                                    setVisibleCancelButton((prev) => !prev);
                                    setTimeout(() => {
                                        cancel();
                                    }, 500);
                                }}
                            />
                        </Transition>
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default AdminForm;
