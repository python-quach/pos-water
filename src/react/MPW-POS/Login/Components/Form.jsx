import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../../store';
import { useEffect } from 'react';

// FORM
export const LoginForm = ({ button, field }) => {
    const { onSubmit } = useContext(StoreContext);

    useEffect(() => document.getElementById('username').focus(), []);

    return (
        <FinalForm
            onSubmit={onSubmit.login}
            render={({ handleSubmit, form }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then()
                            .catch(() => {
                                document.getElementById('username').focus();
                                form.reset({});
                            });
                    }}>
                    {field.username}
                    {field.password}
                    <Divider hidden />
                    {button.login}
                    {button.admin}
                    <Form.Group widths={2}>
                        {button.close}
                        {button.backup}
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default LoginForm;
