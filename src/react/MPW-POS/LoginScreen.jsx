import { useEffect, useState } from 'react';
import { Component } from './Component';
import api from './Api';

const { Header, Form, Field, Button, Screen } = Component.LoginScreen;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Login = ({ history, header }) => {
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
        <Screen.Login
            open={history ? true : false}
            header={<Header {...header} />}
            form={
                <Form
                    onSubmit={handleLogin}
                    field={{
                        username: <Field.Username setError={setError} />,
                        password: <Field.Password setError={setError} />,
                    }}
                    button={{
                        login: <Button.Login error={error} />,
                        admin: (values, form, initialValues) => (
                            <Button.Admin
                                login={() =>
                                    handleAdminLogin(
                                        values,
                                        form,
                                        initialValues
                                    )
                                }
                            />
                        ),
                        close: <Button.Close closeApp={api.closeApp} />,
                        backup: <Button.Backup />,
                    }}
                />
            }
        />
    );
};

Login.defaultProps = {
    header: {
        title: 'Mckee Pure Water',
        content: 'Version 1.0',
    },
};

export default Login;
