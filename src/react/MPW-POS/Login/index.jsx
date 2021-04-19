import { useEffect } from 'react';
import Screen from './Components/Screen';
import Header from './Components/Header';
import Form from './Components/Form';
import Field from './Components/Field';
import { Button } from './Components/Button';

// LOGIN CONTAINER
export const Login = () => {
    useEffect(() => document.getElementById('username').focus(), []);

    return (
        <Screen>
            <Header title='Mckee Pure Water' content='Login Screen' />
            <Form
                field={{
                    username: <Field.Username />,
                    password: <Field.Password />,
                }}
                button={{
                    login: <Button.Login />,
                    admin: <Button.Admin />,
                    close: <Button.Close />,
                    backup: <Button.Backup />,
                }}
            />
        </Screen>
    );
};

export default Login;
