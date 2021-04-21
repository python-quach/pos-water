import Screen from '../Screen';
import Header from '../Header';
import Form from '../Form';
import Field from '../Field';
import Button from '../Button';

// LOGIN CONTAINER
export const Login = () => (
    <Screen name='login'>
        <Header title='Mckee Pure Water' content='User Login' />
        <Form.Login
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
