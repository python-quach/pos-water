import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../store';
import Button from '../Button';
import Field from '../Field';

export const FormLogin = ({ name }) => {
    const { component, helpers } = useContext(StoreContext);
    const {
        onSubmit,
        input: { username, password },
        button,
    } = component[name];

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Field
                        name={username}
                        onChange={(input, value) => {
                            helpers.field.resetError(input, value);
                        }}
                    />
                    <Field
                        name={password}
                        onChange={(input, value) => {
                            helpers.field.resetError(input, value);
                        }}
                    />
                    <Divider hidden />
                    <Button.Pulse
                        render={(setVisible) => (
                            <Form.Button {...button.login(setVisible)} />
                        )}
                    />
                    <Button.Pulse
                        render={(setVisible) => (
                            <Form.Button {...button.admin(setVisible)} />
                        )}
                    />
                </Form>
            )}
        />
    );
};

export default FormLogin;
