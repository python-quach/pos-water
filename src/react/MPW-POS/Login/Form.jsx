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
    const handleLogin = async (values, form) => {
        try {
            await sleep(500);
            history.push({
                pathname: '/dashboard',
                state: await api.login(values),
            });
        } catch (err) {
            setTimeout(() => {
                showLoginError(err);
                form.reset();
            }, 100);
        }
    };

    const handleAdminLogin = async (values, form, initialValues) => {
        console.log('handleAdminLogin', values);
        try {
            await sleep(500);
            history.push({
                pathname: '/admin',
                state: await api.login(values),
            });
        } catch (err) {
            showLoginError(err);
            form.reset(initialValues);
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
            render={({ handleSubmit, form, initialValues, values }) => (
                <Form onSubmit={handleSubmit}>
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
                            handleAdminLogin(values, form, initialValues);
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
