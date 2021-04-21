import Screen from './Components/Screen';
import Header from './Components/Header';
import Form from './Components/Form';
import Field from '../Field';
import Button from '../Button';

// LOGIN CONTAINER
export const Login = () => (
    <Screen>
        <Header title='Mckee Pure Water' content='Login Screen' />
        <Form
            field={{
                username: <Field name='username' />,
                password: <Field name='password' />,
            }}
            button={{
                login: <Button.Pulse name='login' />,
                admin: <Button.Pulse name='admin' />,
                close: <Button.Pulse name='close' />,
                backup: <Button.Pulse name='backup' />,
            }}
        />
    </Screen>
);

export default Login;
