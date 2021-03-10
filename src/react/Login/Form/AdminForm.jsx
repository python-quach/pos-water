import { useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { api } from '../../../api/api';

const AdminForm = (props) => {
    const [error, setError] = useState(false);

    const handleAddNewUser = async (values) => {
        const { admin } = values;
        if (admin !== '911') {
            setError(true);
        } else {
            api.addUser(values, (response) => {
                // console.log('Add New User Response from Server:', response);
                props.addUser(response);
                setError(false);
            });
        }
    };

    return (
        <FinalForm
            onSubmit={handleAddNewUser}
            render={({ handleSubmit, form, values }) => (
                <Form
                    onSubmit={(event) => {
                        if (values.admin !== '911') {
                            setError(true);
                        } else {
                            setError(false);
                            handleSubmit(event)
                                .then(form.reset)
                                .catch((err) => console.log(err));
                        }
                    }}>
                    <Form.Group inline>
                        <Field
                            name='username'
                            render={({ input }) => (
                                <Form.Input
                                    id='username'
                                    label='Username'
                                    {...input}
                                />
                            )}
                        />
                        <Field
                            name='password'
                            render={({ input }) => (
                                <Form.Input
                                    id='password'
                                    label='Password'
                                    {...input}
                                />
                            )}
                        />
                        <Field
                            name='admin'
                            type='password'
                            render={({ input }) => (
                                <Form.Input
                                    {...input}
                                    id='admin'
                                    onFocus={() => {
                                        setError(false);
                                    }}
                                    labelPosition='left'
                                    error={error ? true : false}
                                    placeholder={
                                        error
                                            ? 'Wrong Password'
                                            : 'Enter Admin Password'
                                    }
                                />
                            )}
                        />
                        <Form.Button type='submit' content='Add' primary />
                        <Form.Button
                            type='button'
                            negative
                            onClick={(e) => {
                                props.setOpen(false);
                            }}>
                            Close
                        </Form.Button>
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default AdminForm;
