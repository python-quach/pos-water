import { useEffect } from 'react';
import { Form, Divider } from 'semantic-ui-react';
import Field from '../Field';
import Button from '../Button';

export const LoginForm = ({ handleSubmit, form }) => {
    useEffect(() => document.getElementById('username').focus(), []);

    const onSubmit = (event) => {
        handleSubmit(event)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                document.getElementById('username').focus();
                form.reset({});
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            <Field name='username' type='login' />
            <Field name='password' type='login' />
            <Divider hidden />
            <Button.Pulse name='login' type='login' />
            <Button.Pulse name='admin' type='login' />
            <Form.Group widths={2}>
                <Button.Pulse name='close' type='login' />
                <Button.Pulse name='backup' type='login' />
            </Form.Group>
        </Form>
    );
};

export default LoginForm;
