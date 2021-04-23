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
    const { component, resetError } = useContext(StoreContext);
    const {
        screen,
        header,
        form: { onSubmit, input, button, click },
    } = component.login;

    return (
        <Screen screen={screen}>
            <Header {...header} />
            <LoginForm
                onSubmit={onSubmit}
                render={() => (
                    <>
                        <Field name={input.username} reset={resetError} />
                        <Field name={input.password} reset={resetError} />
                        <Divider hidden />
                        <Button.Pulse attr={button.login} />
                        <Button.Pulse
                            attr={button.admin}
                            onClick={click.open.adminLogin}
                        />
                        <Form.Group widths={2}>
                            <Button.Pulse
                                attr={button.close}
                                onClick={click.close.app}
                            />
                            <Button.Pulse
                                attr={button.backup}
                                onClick={click.open.backup}
                            />
                        </Form.Group>
                    </>
                )}
            />
        </Screen>
    );
};

export default Login;
