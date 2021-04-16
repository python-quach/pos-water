import { useState, useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import Field from './Field';
import Button from './Button';
import api from '../Api';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// FORM
export const LoginForm = ({ history }) => {
    const [error, setError] = useState(false);

    const showLoginError = (err) => {
        setError(err);
        document.getElementById('username').focus();
    };

    const handleLogin = async (values) => {
        try {
            await sleep(500);
            history.push({
                pathname: '/dashboard',
                state: await api.login(values),
            });
        } catch (err) {
            showLoginError(err);
            throw err;
        }
    };

    useEffect(() => {
        document.getElementById('username').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={handleLogin}
            initialValues={{
                username: '',
                password: '',
            }}
            render={({ handleSubmit, form }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then()
                            .catch((err) => {
                                form.reset({});
                            });
                    }}>
                    <Field.Username
                        onChange={(value, input) => {
                            setError(false);
                            return input.onChange(value);
                        }}
                    />
                    <Field.Password
                        onChange={(value, input) => {
                            setError(false);
                            return input.onChange(value);
                        }}
                    />
                    <Button.Login
                        content={!error ? 'Login' : error}
                        color={!error ? 'blue' : 'red'}
                        onClick={(setVisible) => {
                            setVisible((prev) => !prev);
                        }}
                    />
                    <Button.Admin
                        onClick={(setVisible) => {
                            setVisible((prev) => !prev);
                            setTimeout(() => {
                                history.push({
                                    pathname: '/admin/confirm',
                                    state: true,
                                });
                            }, 500);
                        }}
                    />
                    <Form.Group widths={2}>
                        <Button.Close
                            onClick={(setVisible) => {
                                setVisible((prev) => !prev);
                                setTimeout(() => {
                                    api.closeApp();
                                }, 500);
                            }}
                        />
                        <Button.Backup
                            onClick={(setVisible) => {
                                setVisible((prev) => !prev);
                            }}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default LoginForm;
