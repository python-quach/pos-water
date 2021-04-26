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
    const { screen, header, onSubmit, input, button } = useContext(
        StoreContext
    ).component.login;

    return (
        <Screen screen={screen}>
            <Header {...header} />
            <LoginForm
                onSubmit={onSubmit}
                render={() => (
                    <>
                        <Field
                            name={input.username.attr}
                            onChange={input.username.onChange}
                        />
                        <Field
                            name={input.password.attr}
                            onChange={input.password.onChange}
                        />
                        <Divider hidden />
                        <Button.Pulse
                            attr={button.login.attr}
                            onClick={button.login.onClick}
                        />
                        <Button.Pulse
                            attr={button.admin.attr}
                            onClick={button.admin.onClick}
                        />
                        <Form.Group widths={2}>
                            <Button.Pulse
                                attr={button.close.attr}
                                onClick={button.close.onClick}
                            />
                            <Button.Pulse
                                attr={button.backup.attr}
                                onClick={button.backup.onClick}
                            />
                        </Form.Group>
                    </>
                )}
            />
        </Screen>
    );
};

export default Login;
