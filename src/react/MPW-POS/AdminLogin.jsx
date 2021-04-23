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
    const { component, resetError } = useContext(StoreContext);
    const {
        screen,
        form: { onSubmit, input, button, click },
    } = component.adminLogin;

    return (
        <Screen screen={screen}>
            <Header title='Mckee Pure Water' content='Admin Login' />
            <AdminLoginForm
                onSubmit={onSubmit}
                render={() => (
                    <Form.Group>
                        <Field name={input.password} reset={resetError} />
                        <Button.Pulse attr={button.submit} />
                        <Button.Pulse
                            attr={button.cancel}
                            onClick={click.close.adminLogin}
                        />
                    </Form.Group>
                )}
            />
        </Screen>
    );
};

export default AdminLogin;
