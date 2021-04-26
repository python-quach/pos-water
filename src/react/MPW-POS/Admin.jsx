import Screen from './Screen';
import Header from './Header';
import Form from './Form';
import Button from './Button';
import Field from './Field';

import { Form as Layout } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from './store';

// ADMIN PASSWORD SCREEN
export const Admin = () => {
    const { screen, header, onSubmit, input, button } = useContext(
        StoreContext
    ).component.admin;

    return (
        <Screen screen={screen}>
            <Header {...header} />
            <Form
                onSubmit={onSubmit}
                render={() => (
                    <Layout.Group>
                        <Field
                            name={input.password.attr}
                            onChange={input.password.onChange}
                        />
                        <Button.Pulse attr={button.submit.attr} />
                        <Button.Pulse
                            attr={button.cancel.attr}
                            onClick={button.cancel.onClick}
                        />
                    </Layout.Group>
                )}
            />
        </Screen>
    );
};

export default Admin;
