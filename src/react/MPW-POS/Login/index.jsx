import Screen from './Screen';
import Header from './Header';
import Form from './Form';
import Field from './Field';
import Button from './Button';
import StoreProvider from './store';

// LOGIN
export const Login = () => (
    <StoreProvider>
        <Screen>
            <Header />
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
    </StoreProvider>
);

export default Login;
