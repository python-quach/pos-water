import Screen from './Screen';
import Header from './Header';
import Form from './Form';
import Field from './Field';
import Button from './Button';

// LOGIN
export const Login = () => (
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

export default Login;
