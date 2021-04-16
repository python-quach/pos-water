import { Form, Transition } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';

import Screen from './Screen';
import Header from './Header';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AdminPasswordModal = ({ history }) => {
    const [error, setError] = useState(false);
    const [visibleSubmitButton, setVisibleSubmitButton] = useState(true);
    const [visibleCancelButton, setVisibleCancelButton] = useState(true);

    const onSubmit = async (values) => {
        if (values.password === '911') {
            await sleep(500);
            history.push({ pathname: '/admin', state: true });
        } else {
            throw new Error('Invalid Password');
        }
    };

    useEffect(() => {
        if (!history.location.state) history.push('/');
    });

    useEffect(() => {
        const input = document.getElementById('password');
        if (input) input.focus();
    }, []);

    return (
        <Screen open={history.location.state ? true : false}>
            <Header />
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
                                            history.push('/');
                                        }, 500);
                                    }}
                                />
                            </Transition>
                        </Form.Group>
                    </Form>
                )}
            />
        </Screen>
    );
};

export default AdminPasswordModal;
