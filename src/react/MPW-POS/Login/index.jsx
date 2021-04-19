import { useEffect, useContext } from 'react';
import Screen from './Components/Screen';
import Header from './Components/Header';
import Form from './Components/Form';
import { Button } from './Components/Button';
import Field from './Components/Field';
import { StoreContext } from '../store';

// LOGIN CONTAINER
export const Login = () => {
    const { button } = useContext(StoreContext);

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
                    login: <Button.Pulse render={button.login} />,
                    admin: <Button.Pulse render={button.admin} />,
                    close: <Button.Pulse render={button.close} />,
                    backup: <Button.Pulse render={button.backup} />,
                }}
            />
        </Screen>
    );
};

export default Login;
