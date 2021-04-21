import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../store';
import { useEffect } from 'react';
import Field from '../Field';
import Button from '../Button';

export const FormWrapper = ({ name, form }) => {
    const { onSubmit } = useContext(StoreContext);
    return <FinalForm onSubmit={onSubmit[name]} render={form} />;
};

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

export const FindForm = ({ button, field }) => {
    const { onSubmit } = useContext(StoreContext);

    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={onSubmit.find}
            render={({ handleSubmit, form, values }) => (
                <Form onSubmit={handleSubmit}>
                    {field.phone(form)}
                    {field.account(form)}
                    {field.firstName(form)}
                    {field.lastName(form)}
                    {button.find(values, form)}
                    {button.add}
                    {button.report}
                    {button.logout}
                </Form>
            )}
        />
    );
};

const MPW_POS_FORM = {
    Login: () => <FormWrapper name='login' form={LoginForm} />,
    Find: FindForm,
};

export default MPW_POS_FORM;
