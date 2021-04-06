import { useEffect } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';

export const LoginForm = ({ onSubmit, button, field }) => {
    useEffect(() => {
        document.getElementById('username').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, values, form }) => (
                <Form
                    onSubmit={(event) =>
                        handleSubmit(event).then().catch(form.reset)
                    }>
                    {field.username}
                    {field.password}
                    <Divider hidden />
                    {button.login(values)}
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
