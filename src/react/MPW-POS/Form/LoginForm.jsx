import { useEffect } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import Field from '../Field';
import Button from '../Button';

export const LoginForm = ({ handleSubmit, form }) => {
    useEffect(() => document.getElementById('username').focus(), []);

    const onSubmit = (event) => {
        handleSubmit(event)
            .then()
            .catch(() => {
                document.getElementById('username').focus();
                form.reset({});
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            <Field name='username' />
            <Field name='password' />
            <Divider hidden />
            <Button.Pulse name='login' />
            <Button.Pulse name='admin' />
            <Form.Group widths={2}>
                <Button.Pulse name='close' />
                <Button.Pulse name='backup' />
            </Form.Group>
        </Form>
    );
};

export default LoginForm;
