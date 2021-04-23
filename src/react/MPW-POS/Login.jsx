import Screen from './Screen';
import Header from './Header';
import LoginForm from './Form';
import Button from './Button';
import Field from './Field';

import { Form, Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from './store';

// LOGIN SCREEN
export const Login = () => {
    const { component, click, resetError } = useContext(StoreContext);
    const {
        onSubmit,
        input: { username, password },
        button: { login, admin, close, backup },
    } = component.login;

    return (
        <Screen name='login'>
            <Header title='Mckee Pure Water' content='User Login' />
            <LoginForm
                onSubmit={onSubmit}
                render={() => (
                    <>
                        <Field name={username} reset={resetError} />
                        <Field name={password} reset={resetError} />
                        <Divider hidden />
                        <Button.Pulse attr={login} />
                        <Button.Pulse attr={admin} onClick={click.admin} />
                        <Form.Group widths={2}>
                            <Button.Pulse attr={close} onClick={click.close} />
                            <Button.Pulse
                                attr={backup}
                                onClick={click.backup}
                            />
                        </Form.Group>
                    </>
                )}
            />
        </Screen>
    );
};

export default Login;
