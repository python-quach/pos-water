import { useEffect } from 'react';
import Screen from './Components/Screen';
import Header from './Components/Header';
import Form from './Components/Form';
import Field from './Components/Field';
import Button from './Components/Button';

// LOGIN CONTAINER
export const Login = () => {
    useEffect(() => document.getElementById('username').focus(), []);

    return (
        <Screen>
            <Header title='Mckee Pure Water' content='Login Screen' />
            <Form
                field={{
                    username: <Field name='username' />,
                    password: <Field name='password' />,
                }}
                button={{
                    login: <Button name='login' />,
                    admin: <Button name='admin' />,
                    close: <Button name='close' />,
                    backup: <Button name='backup' />,
                }}
            />
        </Screen>
    );
};

export default Login;
