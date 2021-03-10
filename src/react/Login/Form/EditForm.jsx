import { useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { api } from '../../../api/api';

const EditDeleteForm = (props) => {
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (values) => {
        const { admin } = values;
        if (admin !== '911') {
            setError(true);
        } else {
            api.editUser(values, (response) => {
                console.log('Edit User Response from Server', response);
                if (response) {
                    setError(false);
                }
            });
        }
    };
    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={{
                user_id: props.user ? props.user.user_id : '',
                username: props.user ? props.user.username : '',
                password: props.user ? props.user.password : '',
            }}
            render={({ handleSubmit, form, values }) => {
                return (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event);
                        }}>
                        <Form.Group inline>
                            <Field
                                name='username'
                                render={({ input }) => (
                                    <Form.Input {...input} id='username' />
                                )}
                            />
                            <Field
                                type={showPassword ? 'input' : 'password'}
                                name='password'
                                render={({ input }) => (
                                    <Form.Input {...input} id='password' />
                                )}
                            />
                            <Field
                                name='admin'
                                type='password'
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        error={error}
                                        onFocus={() => {
                                            console.log('focus');
                                            setError(false);
                                        }}
                                        id='admin'
                                        placeholder={
                                            error
                                                ? 'Wrong Password'
                                                : 'Enter Admin Password'
                                        }
                                    />
                                )}
                            />
                            <Form.Button
                                color={showPassword ? 'black' : 'green'}
                                content={showPassword ? 'Hide' : 'Show'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (values.admin === '911') {
                                        setShowPassword((prev) => !prev);
                                        setError(false);
                                    } else {
                                        setError(true);
                                    }
                                }}
                            />
                            <Form.Button primary content='Save' />
                            <Form.Button
                                negative
                                content='Delete'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (values.admin === '911') {
                                        api.deleteUser(
                                            {
                                                user_id: values.user_id,
                                                username: values.username,
                                                password: values.password,
                                            },
                                            (response) => {
                                                console.log(
                                                    'Delete User Response from Server:',
                                                    response
                                                );
                                                props.removeUser(
                                                    values.user_id
                                                );
                                                setError(false);
                                            }
                                        );
                                    } else {
                                        setError(true);
                                    }
                                }}
                            />
                        </Form.Group>
                    </Form>
                );
            }}
        />
    );
};

export default EditDeleteForm;
