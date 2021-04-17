import { Screen, Header, Form, Field, Button } from './Components';

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
