import Header from './Header';
import Screen from './Screen';
import AdminLoginForm from './Form';
import Button from './Button';
import Field from './Field';

import { Form } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from './store';

// ADMIN PASSWORD SCREEN
export const AdminLogin = () => {
    const { component, click, resetError } = useContext(StoreContext);
    const { onSubmit, input, button } = component.adminLogin;

    return (
        <Screen name='adminLogin'>
            <Header title='Mckee Pure Water' content='Admin Login' />
            <AdminLoginForm
                onSubmit={onSubmit}
                render={() => (
                    <>
                        <Form.Group>
                            <Field name={input.username} reset={resetError} />
                            <Field name={input.password} reset={resetError} />
                            <Button.Pulse
                                attr={button.login}
                                onClick={click.login}
                            />
                            <Button.Pulse attr={button.cancel} />
                        </Form.Group>
                    </>
                )}
            />
        </Screen>
    );
};
